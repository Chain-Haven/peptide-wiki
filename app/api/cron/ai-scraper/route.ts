/**
 * AI Scraper Cron — Tier 2 Intelligent Inventory Verification
 *
 * Runs daily at 3 AM UTC. Fetches product pages, sends HTML excerpts to AI,
 * auto-applies corrections (stock status, price, dead links, wrong products).
 * Logs every decision with reasoning for self-improvement.
 *
 * Priority queue: never-verified > Tier 1 errors > oldest verified
 * Processes up to 50 items per run to stay within 5-min Vercel timeout.
 */

import { createClient } from '@supabase/supabase-js'
import {
  fetchPageHTML,
  extractPageExcerpt,
  analyzeWithAI,
  getSystemPrompt,
} from '@/lib/ai-scraper'
import { runWithConcurrency } from '@/lib/scraper'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const MAX_ITEMS_PER_RUN = 50
const AI_CONCURRENCY = 2 // conservative to avoid rate limits

type PriceItem = {
  id: string
  product_url: string
  price: number
  in_stock: boolean
  peptide_name: string
  peptide_slug: string
  supplier_name: string
  supplier_slug: string
  ai_verified_at: string | null
  check_error: string | null
}

export async function GET(request: Request) {
  const startMs = Date.now()

  // Auth
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    if (process.env.NODE_ENV === 'production') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const triggeredBy = request.headers.get('x-triggered-by') || 'cron'

  // Fetch items to check, with priority queue
  // 1. Never AI-verified (ai_verified_at IS NULL)
  // 2. Tier 1 errors (check_error IS NOT NULL)
  // 3. Oldest ai_verified_at
  const { data: rawPrices, error: fetchErr } = await supabase
    .from('prices')
    .select(`
      id, product_url, price, in_stock, ai_verified_at, check_error,
      peptide:peptides!inner(name, slug),
      supplier:suppliers!inner(name, slug)
    `)
    .not('product_url', 'is', null)
    .neq('stock_source', 'login_gated')
    .order('ai_verified_at', { ascending: true, nullsFirst: true })
    .limit(MAX_ITEMS_PER_RUN)

  if (fetchErr || !rawPrices) {
    return Response.json({ error: 'Failed to fetch prices', details: fetchErr?.message }, { status: 500 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: PriceItem[] = (rawPrices as any[]).map(p => ({
    id: p.id,
    product_url: p.product_url,
    price: Number(p.price),
    in_stock: p.in_stock,
    peptide_name: Array.isArray(p.peptide) ? p.peptide[0]?.name : p.peptide?.name,
    peptide_slug: Array.isArray(p.peptide) ? p.peptide[0]?.slug : p.peptide?.slug,
    supplier_name: Array.isArray(p.supplier) ? p.supplier[0]?.name : p.supplier?.name,
    supplier_slug: Array.isArray(p.supplier) ? p.supplier[0]?.slug : p.supplier?.slug,
    ai_verified_at: p.ai_verified_at,
    check_error: p.check_error,
  }))

  console.log(`[ai-scraper] Processing ${items.length} items (triggered by: ${triggeredBy})`)

  // Load system prompt with learning notes
  const systemPrompt = await getSystemPrompt()

  // Track stats
  let keepCount = 0
  let oosCount = 0
  let instockCount = 0
  let priceUpdateCount = 0
  let flaggedCount = 0
  let removedCount = 0
  let errorCount = 0

  // Process items with limited concurrency
  await runWithConcurrency(items, async (item) => {
    try {
      // Step 1: Fetch HTML
      const { html, status, error: fetchError } = await fetchPageHTML(item.product_url)

      if (!html || status === 0) {
        // Timeout or network error — skip, don't penalize
        console.log(`[ai-scraper] SKIP ${item.supplier_slug}/${item.peptide_slug}: ${fetchError || 'no HTML'}`)
        errorCount++
        return
      }

      // Step 2: Extract focused excerpt
      const excerpt = extractPageExcerpt(html)

      // Step 3: AI analysis
      const result = await analyzeWithAI(
        excerpt,
        item.peptide_name,
        item.supplier_name,
        item.price,
        item.in_stock,
        systemPrompt
      )

      // Step 4: Apply action
      await supabase.rpc('apply_ai_action', {
        p_price_id: item.id,
        p_action: result.action,
        p_confidence: result.confidence,
        p_detected_price: result.detected_price,
        p_error_msg: result.action === 'FLAG_WRONG' ? `AI: Expected "${item.peptide_name}", found "${result.detected_product_name}"` : null,
      })

      // Step 5: Log decision
      await supabase.rpc('log_ai_decision', {
        p_price_id: item.id,
        p_peptide_name: item.peptide_name,
        p_supplier_slug: item.supplier_slug,
        p_product_url: item.product_url,
        p_action: result.action,
        p_confidence: result.confidence,
        p_reasoning: result.reasoning,
        p_page_title: result.page_title,
        p_detected_price: result.detected_price,
        p_detected_stock: result.in_stock,
        p_detected_product_name: result.detected_product_name,
        p_html_excerpt: excerpt.substring(0, 2000), // truncate for storage
      })

      // Track stats
      switch (result.action) {
        case 'KEEP': keepCount++; break
        case 'MARK_OOS': oosCount++; break
        case 'MARK_INSTOCK': instockCount++; break
        case 'UPDATE_PRICE': priceUpdateCount++; break
        case 'FLAG_WRONG': flaggedCount++; break
        case 'REMOVE_DEAD': removedCount++; break
      }

      console.log(`[ai-scraper] ${result.action} (${result.confidence.toFixed(2)}) ${item.supplier_slug}/${item.peptide_slug}: ${result.reasoning}`)

    } catch (err: unknown) {
      errorCount++
      const msg = err instanceof Error ? err.message : 'Unknown error'
      console.error(`[ai-scraper] ERROR ${item.supplier_slug}/${item.peptide_slug}: ${msg}`)
    }
  }, AI_CONCURRENCY)

  const durationMs = Date.now() - startMs

  // Log the run
  await supabase.rpc('log_inventory_run', {
    p_total: items.length,
    p_in_stock: keepCount + instockCount + priceUpdateCount,
    p_out_of_stock: oosCount,
    p_errors: errorCount + flaggedCount + removedCount,
    p_duration_ms: durationMs,
    p_triggered_by: `ai_${triggeredBy}`,
  })

  const summary = {
    success: true,
    type: 'ai_scraper',
    processed: items.length,
    actions: {
      keep: keepCount,
      mark_oos: oosCount,
      mark_instock: instockCount,
      update_price: priceUpdateCount,
      flag_wrong: flaggedCount,
      remove_dead: removedCount,
      errors: errorCount,
    },
    duration_ms: durationMs,
    triggered_by: triggeredBy,
    timestamp: new Date().toISOString(),
  }

  console.log('[ai-scraper] Complete:', JSON.stringify(summary))
  return Response.json(summary)
}
