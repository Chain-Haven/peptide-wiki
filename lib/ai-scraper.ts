/**
 * AI-Powered Inventory Scraper
 *
 * Tier 2 scraper that uses Claude via Vercel AI Gateway to analyze product pages.
 * Determines: listing active, correct product, in stock, current price.
 * Auto-applies corrections and self-improves from its decision history.
 */

import { createGateway } from '@ai-sdk/gateway'
import { generateObject } from 'ai'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Structured output schema ──────────────────────────────────────────────

export const AIScraperResultSchema = z.object({
  listing_active: z.boolean().describe('Is this page an active product listing (not 404, not homepage redirect, not category page)?'),
  correct_product: z.boolean().describe('Does the product on this page match the expected peptide name?'),
  in_stock: z.boolean().describe('Is the product currently in stock and available to purchase?'),
  detected_price: z.number().nullable().describe('The current price shown on the page in USD, or null if not found'),
  detected_product_name: z.string().describe('The product name as displayed on the page'),
  page_title: z.string().describe('The HTML page title or main heading'),
  action: z.enum([
    'KEEP',
    'MARK_OOS',
    'MARK_INSTOCK',
    'UPDATE_PRICE',
    'FLAG_WRONG',
    'REMOVE_DEAD',
  ]).describe('The recommended action based on analysis'),
  confidence: z.number().min(0).max(1).describe('Confidence in this analysis from 0.0 to 1.0'),
  reasoning: z.string().describe('Brief explanation of the decision (1-2 sentences)'),
})

export type AIScraperResult = z.infer<typeof AIScraperResultSchema>

// ─── HTML excerpt extraction ───────────────────────────────────────────────

const MAX_EXCERPT_CHARS = 3000

export function extractPageExcerpt(html: string): string {
  let text = html

  // Remove script and style blocks
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '')
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '')
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  text = text.replace(/<!--[\s\S]*?-->/g, '')

  // Extract title
  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''

  // Extract JSON-LD structured data (extremely useful for price/stock)
  const jsonLdMatches = text.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)
  let jsonLd = ''
  if (jsonLdMatches) {
    jsonLd = jsonLdMatches.map(m => {
      const content = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim()
      try {
        const parsed = JSON.parse(content)
        return JSON.stringify(parsed, null, 0)
      } catch {
        return content.substring(0, 500)
      }
    }).join('\n')
  }

  // Extract meta description
  const metaDescMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i)
  const metaDesc = metaDescMatch ? metaDescMatch[1] : ''

  // Extract OG price if present
  const ogPriceMatch = text.match(/<meta[^>]*property=["']product:price:amount["'][^>]*content=["']([^"']*?)["']/i)
  const ogPrice = ogPriceMatch ? `OG Price: $${ogPriceMatch[1]}` : ''

  // Extract price-related elements
  const pricePatterns = [
    /<[^>]*class="[^"]*price[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
    /<[^>]*class="[^"]*woocommerce-Price-amount[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
    /<[^>]*itemprop="price"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
  ]
  let priceElements = ''
  for (const pattern of pricePatterns) {
    const matches = text.match(pattern)
    if (matches) {
      priceElements += matches.slice(0, 5).join(' ') + '\n'
    }
  }

  // Extract stock-related elements
  const stockPatterns = [
    /<[^>]*class="[^"]*stock[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
    /<[^>]*class="[^"]*availability[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi,
  ]
  let stockElements = ''
  for (const pattern of stockPatterns) {
    const matches = text.match(pattern)
    if (matches) {
      stockElements += matches.slice(0, 3).join(' ') + '\n'
    }
  }

  // Extract add-to-cart button area
  const cartBtnMatch = text.match(/<form[^>]*class="[^"]*cart[^"]*"[\s\S]*?<\/form>/i)
  const cartForm = cartBtnMatch ? cartBtnMatch[0].substring(0, 500) : ''

  // Get H1
  const h1Match = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''

  // Strip remaining HTML tags for body text
  const bodyText = text
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 800)

  // Build focused excerpt
  const parts = [
    `PAGE TITLE: ${title}`,
    h1 ? `H1: ${h1}` : '',
    metaDesc ? `META DESC: ${metaDesc}` : '',
    ogPrice,
    jsonLd ? `JSON-LD DATA:\n${jsonLd}` : '',
    priceElements ? `PRICE ELEMENTS:\n${priceElements}` : '',
    stockElements ? `STOCK ELEMENTS:\n${stockElements}` : '',
    cartForm ? `CART FORM:\n${cartForm}` : '',
    `BODY TEXT EXCERPT: ${bodyText}`,
  ].filter(Boolean).join('\n\n')

  return parts.substring(0, MAX_EXCERPT_CHARS)
}

// ─── System prompt with learning notes ─────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are an AI inventory verification agent for PeptideWiki, a peptide research database.

Your job: Analyze HTML excerpts from vendor product pages and determine:
1. Is the listing active (not a 404, not redirected to homepage, not a category page)?
2. Does the product match the expected peptide name?
3. Is the product in stock?
4. What is the current listed price?

VENDOR CONTEXT:
- PeptideTech (peptidetech.co): WooCommerce store. Uses standard WC stock/price classes.
- Vandl Labs (vandl-labs.com): WooCommerce store. Some products are marked "Sold Out" or "Coming Soon".
- Modified Aminos (modifiedaminos.shop): Shopify store. Stock in variants.available field.
- Modern Aminos (modernaminos.com): WooCommerce store. Some items JS-rendered.
- FelixChem (felixchem.is): Login-gated. Should not appear in your queue.

DECISION RULES:
- KEEP: Page is active, correct product, in stock, price matches (within 10%).
- MARK_OOS: Product is correct but out of stock ("Out of stock", "Sold Out", disabled cart button, etc).
- MARK_INSTOCK: Product was previously out of stock but is now available.
- UPDATE_PRICE: Product is correct and in stock, but price differs by >10% from expected.
- FLAG_WRONG: The page exists but shows a different product than expected.
- REMOVE_DEAD: Page is a 404, redirects to homepage, shows "page not found", or is not a product page at all.

CONFIDENCE GUIDELINES:
- 0.95+: Clear signals (JSON-LD data, explicit stock classes, exact product name match)
- 0.80-0.94: Strong signals but some ambiguity
- 0.60-0.79: Moderate confidence, some signals missing
- Below 0.60: Low confidence, recommend manual review

Be conservative: if unsure, prefer KEEP over destructive actions.`

export async function getSystemPrompt(): Promise<string> {
  let prompt = BASE_SYSTEM_PROMPT

  // Fetch accumulated learning notes
  const { data: notes } = await supabase
    .from('scraper_learning')
    .select('note, created_at')
    .order('created_at', { ascending: true })
    .limit(20)

  if (notes && notes.length > 0) {
    prompt += '\n\nACCUMULATED LEARNING NOTES (from past experience):\n'
    prompt += notes.map((n: { note: string; created_at: string }) =>
      `- ${n.note}`
    ).join('\n')
  }

  return prompt
}

// ─── AI analysis ───────────────────────────────────────────────────────────

export async function analyzeWithAI(
  excerpt: string,
  expectedPeptideName: string,
  expectedVendor: string,
  expectedPrice: number,
  currentInStock: boolean,
  systemPrompt: string
): Promise<AIScraperResult> {
  const userMessage = `Analyze this product page excerpt and determine its status.

EXPECTED:
- Peptide: ${expectedPeptideName}
- Vendor: ${expectedVendor}
- Expected price: $${expectedPrice.toFixed(2)}
- Currently marked as: ${currentInStock ? 'IN STOCK' : 'OUT OF STOCK'}

PAGE EXCERPT:
---
${excerpt}
---

Analyze the above and return your structured assessment.`

  const { object } = await generateObject({
    model: gateway('anthropic/claude-sonnet-4-5'),
    schema: AIScraperResultSchema,
    system: systemPrompt,
    prompt: userMessage,
    temperature: 0.1,
    maxOutputTokens: 500,
  })

  return object
}

// ─── Self-review ───────────────────────────────────────────────────────────

export async function runSelfReview(): Promise<string[]> {
  // Fetch recent AI decisions
  const { data: decisions } = await supabase
    .from('scraper_ai_log')
    .select('action, confidence, reasoning, supplier_slug, peptide_name, was_overridden, detected_stock, detected_price, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (!decisions || decisions.length < 10) {
    return ['Not enough decisions to review yet (need at least 10).']
  }

  // Fetch existing learning notes to avoid duplicates
  const { data: existingNotes } = await supabase
    .from('scraper_learning')
    .select('note')
    .limit(30)

  const existingText = (existingNotes || []).map((n: { note: string }) => n.note).join('\n')

  const reviewPrompt = `You are the self-improvement module of an AI inventory scraper for PeptideWiki.

Review these recent ${decisions.length} scraping decisions and identify patterns, issues, or improvements.

EXISTING LEARNING NOTES (do not duplicate these):
${existingText || '(none yet)'}

RECENT DECISIONS:
${decisions.map((d: { action: string; confidence: number; reasoning: string; supplier_slug: string; peptide_name: string; was_overridden: boolean }, i: number) =>
    `[${i + 1}] ${d.supplier_slug} | ${d.peptide_name} | ${d.action} (conf: ${d.confidence?.toFixed(2)}) | ${d.was_overridden ? 'OVERRIDDEN BY ADMIN' : 'accepted'} | ${d.reasoning}`
  ).join('\n')}

STATISTICS:
- Total decisions: ${decisions.length}
- Overridden by admin: ${decisions.filter((d: { was_overridden: boolean }) => d.was_overridden).length}
- Low confidence (<0.7): ${decisions.filter((d: { confidence: number }) => d.confidence < 0.7).length}
- Actions: ${JSON.stringify(decisions.reduce((acc: Record<string, number>, d: { action: string }) => { acc[d.action] = (acc[d.action] || 0) + 1; return acc }, {}))}

Generate 1-3 concise, actionable learning notes that will improve future scraping accuracy. Each note should be a single sentence. Focus on:
1. Vendor-specific patterns (how each vendor indicates stock status, pricing, etc.)
2. Common mistakes or low-confidence patterns
3. Any admin overrides that suggest the AI made wrong decisions

Only generate genuinely NEW insights not already in the existing notes.`

  const { object } = await generateObject({
    model: gateway('anthropic/claude-sonnet-4-5'),
    schema: z.object({
      notes: z.array(z.string()).min(1).max(3).describe('1-3 concise learning notes'),
      summary: z.string().describe('Brief summary of the review'),
    }),
    prompt: reviewPrompt,
    temperature: 0.3,
    maxOutputTokens: 400,
  })

  // Insert new learning notes
  const insertedNotes: string[] = []
  for (const note of object.notes) {
    const trimmed = note.trim()
    if (trimmed.length > 10 && !existingText.includes(trimmed)) {
      await supabase.rpc('add_learning_note', { p_note: trimmed, p_source: 'ai_self_review' })
      insertedNotes.push(trimmed)
    }
  }

  return insertedNotes.length > 0 ? insertedNotes : ['No new insights to add at this time.']
}

// ─── Fetch with timeout (reuse from scraper.ts pattern) ────────────────────

const FETCH_TIMEOUT_MS = 12_000

export async function fetchPageHTML(url: string): Promise<{ html: string | null; status: number; error?: string }> {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PeptideWikiBot/2.0; +https://peptide-wiki.org/bot)',
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      redirect: 'follow',
    })
    const html = await res.text()
    return { html, status: res.status }
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      return { html: null, status: 0, error: 'Timeout' }
    }
    return { html: null, status: 0, error: err instanceof Error ? err.message : 'Unknown' }
  } finally {
    clearTimeout(tid)
  }
}
