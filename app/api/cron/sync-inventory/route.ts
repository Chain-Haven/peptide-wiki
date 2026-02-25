/**
 * Inventory Sync Cron Job
 *
 * Triggered every 6 hours by Vercel Cron.
 * Checks stock status for all products with product_url set.
 * Updates prices.in_stock, last_checked_at, check_error via Supabase RPC.
 *
 * Protected by CRON_SECRET — Vercel automatically sets this header.
 * Can also be manually triggered from /admin/inventory.
 */
import { createClient } from '@supabase/supabase-js'
import { checkProductStock, runWithConcurrency } from '@/lib/scraper'

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 minutes max (Vercel Pro limit)

// Supabase client — use anon key (RPC functions have SECURITY DEFINER)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type PriceRow = {
  id: string
  product_url: string | null
  supplier_slug: string
  stock_source: string | null
  peptide_name: string
}

type UpdatePayload = {
  id: string
  in_stock: string  // 'true' | 'false' — JSON requires string for RPC
  error?: string
  source: string
}

export async function GET(request: Request) {
  const startMs = Date.now()

  // ── Auth check ──────────────────────────────────────────────────────────
  // Vercel Cron sends: Authorization: Bearer <CRON_SECRET>
  // Manual triggers from /api/admin/trigger-sync use the same secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // If CRON_SECRET isn't set yet (dev mode), allow the request
    if (process.env.NODE_ENV === 'production') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const triggeredBy = request.headers.get('x-triggered-by') || 'cron'

  // ── Fetch all scrapeable price rows ─────────────────────────────────────
  const { data: prices, error: fetchError } = await supabase
    .from('prices')
    .select(`
      id,
      product_url,
      stock_source,
      supplier:suppliers!inner(slug)
    `)
    .not('product_url', 'is', null)
    .neq('stock_source', 'login_gated')
    .order('last_checked_at', { ascending: true, nullsFirst: true })

  if (fetchError || !prices) {
    return Response.json({ error: 'Failed to fetch prices', details: fetchError?.message }, { status: 500 })
  }

  // Flatten supplier data (Supabase returns supplier as array for joined tables)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: PriceRow[] = (prices as any[]).map((p) => ({
    id: p.id,
    product_url: p.product_url,
    supplier_slug: Array.isArray(p.supplier) ? p.supplier[0]?.slug : p.supplier?.slug,
    stock_source: p.stock_source,
    peptide_name: '',
  }))

  console.log(`[inventory-sync] Checking ${rows.length} products across vendors`)

  // ── Check stock concurrently (max 4 at once, rate-limited per domain) ──
  let inStockCount = 0
  let outOfStockCount = 0
  let errorCount = 0

  const updates: UpdatePayload[] = []

  await runWithConcurrency(rows, async (row) => {
    const result = await checkProductStock(row.product_url, row.supplier_slug)

    if (result.source === 'error' || result.source === 'timeout') {
      errorCount++
    } else if (result.inStock) {
      inStockCount++
    } else {
      outOfStockCount++
    }

    updates.push({
      id: row.id,
      in_stock: String(result.inStock),
      error: result.error ?? undefined,
      source: result.source,
    })

    console.log(`[inventory-sync] ${row.supplier_slug} | ${row.product_url?.split('/').slice(-2, -1)[0]} | ${result.inStock ? '✅' : '❌'} | ${result.source}${result.error ? ` | ${result.error}` : ''}`)
  }, 4) // max 4 concurrent requests

  // ── Batch update via RPC (bypasses RLS) ────────────────────────────────
  // Chunk updates into batches of 50 to avoid large payloads
  const CHUNK_SIZE = 50
  let totalUpdated = 0

  for (let i = 0; i < updates.length; i += CHUNK_SIZE) {
    const chunk = updates.slice(i, i + CHUNK_SIZE)

    const { data: rpcResult, error: rpcError } = await supabase
      .rpc('update_price_stock_status', {
        updates: chunk.map(u => ({
          id: u.id,
          in_stock: u.in_stock === 'true',
          error: u.error ?? null,
          source: u.source,
        })),
      })

    if (rpcError) {
      console.error('[inventory-sync] RPC error:', rpcError.message)
    } else {
      totalUpdated += (rpcResult as { updated?: number })?.updated ?? 0
    }
  }

  // ── Log this run ────────────────────────────────────────────────────────
  const durationMs = Date.now() - startMs

  await supabase.rpc('log_inventory_run', {
    p_total: rows.length,
    p_in_stock: inStockCount,
    p_out_of_stock: outOfStockCount,
    p_errors: errorCount,
    p_duration_ms: durationMs,
    p_triggered_by: triggeredBy,
  })

  const summary = {
    success: true,
    checked: rows.length,
    updated: totalUpdated,
    in_stock: inStockCount,
    out_of_stock: outOfStockCount,
    errors: errorCount,
    duration_ms: durationMs,
    triggered_by: triggeredBy,
    timestamp: new Date().toISOString(),
  }

  console.log('[inventory-sync] Complete:', JSON.stringify(summary))
  return Response.json(summary)
}
