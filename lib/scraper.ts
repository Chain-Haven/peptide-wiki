/**
 * Inventory Scraper — Pure fetch, zero external dependencies.
 * Supports WooCommerce, Shopify, and gracefully handles login-gated sites.
 */

export type StockResult = {
  inStock: boolean
  source: 'woocommerce' | 'shopify' | 'login_gated' | 'error' | 'timeout' | 'no_url'
  error?: string
  httpStatus?: number
  checkedAt: string
}

const FETCH_TIMEOUT_MS = 12_000
const USER_AGENT = 'Mozilla/5.0 (compatible; PeptideWikiBot/1.0; +https://peptide-wiki.org/bot)'

// ─── WooCommerce out-of-stock detection strings ────────────────────────────

const WOOCOMMERCE_OUT_OF_STOCK_PATTERNS = [
  // Class attributes
  'class="stock out-of-stock"',
  '"stock out-of-stock"',
  "class='stock out-of-stock'",
  // Text content
  '>Out of stock<',
  '>Out Of Stock<',
  'Out of stock</p>',
  // JSON-LD structured data
  '"availability":"OutOfStock"',
  '"availability": "OutOfStock"',
  // WooCommerce template
  'out-of-stock"',
  // BackOrder (treat as out of stock)
  '"availability":"BackOrder"',
]

const WOOCOMMERCE_DISABLED_CART = [
  'single_add_to_cart_button button disabled',
  '"is_in_stock":false',
  '"is_in_stock": false',
  'soldOut',
  'sold_out',
  '"sold_out":true',
]

const WOOCOMMERCE_IN_STOCK_PATTERNS = [
  'class="stock in-stock"',
  '"availability":"InStock"',
  '"availability": "InStock"',
  '"is_in_stock":true',
  '"is_in_stock": true',
  'single_add_to_cart_button button"',
  'add-to-cart',
]

// ─── Fetch with timeout ────────────────────────────────────────────────────

async function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response | null> {
  const controller = new AbortController()
  const tid = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
      },
      redirect: 'follow',
    })
    return res
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') return null
    throw err
  } finally {
    clearTimeout(tid)
  }
}

// ─── WooCommerce scraper ───────────────────────────────────────────────────

export async function scrapeWooCommerce(productUrl: string): Promise<StockResult> {
  const now = new Date().toISOString()
  try {
    const res = await fetchWithTimeout(productUrl)
    if (!res) {
      return { inStock: true, source: 'timeout', error: `Timeout after ${FETCH_TIMEOUT_MS}ms`, checkedAt: now }
    }

    const httpStatus = res.status

    // 404 = product removed → treat as out of stock
    if (httpStatus === 404) {
      return { inStock: false, source: 'woocommerce', error: 'Product page not found (404)', httpStatus, checkedAt: now }
    }

    // Non-200/301/302 → error
    if (httpStatus >= 400) {
      return { inStock: true, source: 'error', error: `HTTP ${httpStatus}`, httpStatus, checkedAt: now }
    }

    const html = await res.text()

    // Check for explicit out-of-stock signals
    for (const pattern of WOOCOMMERCE_OUT_OF_STOCK_PATTERNS) {
      if (html.includes(pattern)) {
        return { inStock: false, source: 'woocommerce', httpStatus, checkedAt: now }
      }
    }

    // Check for disabled add-to-cart (implies out of stock)
    for (const pattern of WOOCOMMERCE_DISABLED_CART) {
      if (html.includes(pattern)) {
        return { inStock: false, source: 'woocommerce', httpStatus, checkedAt: now }
      }
    }

    // Product page loaded and no out-of-stock signals → assume in stock
    return { inStock: true, source: 'woocommerce', httpStatus, checkedAt: now }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { inStock: true, source: 'error', error: message, checkedAt: now }
  }
}

// ─── Shopify scraper ───────────────────────────────────────────────────────
// Modified Aminos uses Shopify — we use the /products/{handle}.json endpoint
// which is always public and returns reliable availability data.

export async function scrapeShopify(productPageUrl: string): Promise<StockResult> {
  const now = new Date().toISOString()
  try {
    // Convert product page URL to the Shopify JSON API endpoint
    // e.g. https://modifiedaminos.shop/products/bpc-157 → .../products/bpc-157.json
    const jsonUrl = productPageUrl.endsWith('.json')
      ? productPageUrl
      : productPageUrl.replace(/\/$/, '') + '.json'

    const res = await fetchWithTimeout(jsonUrl)
    if (!res) {
      return { inStock: true, source: 'timeout', error: `Timeout after ${FETCH_TIMEOUT_MS}ms`, checkedAt: now }
    }

    if (res.status === 404) {
      return { inStock: false, source: 'shopify', error: 'Product not found (404)', httpStatus: 404, checkedAt: now }
    }

    if (!res.ok) {
      return { inStock: true, source: 'error', error: `HTTP ${res.status}`, httpStatus: res.status, checkedAt: now }
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('json')) {
      // Fallback: page redirected to non-JSON (login page, etc.)
      return { inStock: true, source: 'error', error: 'Non-JSON response from Shopify endpoint', checkedAt: now }
    }

    const data = await res.json() as {
      product?: {
        variants?: Array<{ available: boolean; inventory_quantity?: number }>
        published_at?: string | null
      }
    }

    if (!data.product) {
      return { inStock: false, source: 'shopify', error: 'No product in response', checkedAt: now }
    }

    // If product has no published_at, it's likely unpublished (hidden)
    if (data.product.published_at === null) {
      return { inStock: false, source: 'shopify', error: 'Product unpublished', checkedAt: now }
    }

    const variants = data.product.variants ?? []
    const anyAvailable = variants.some(v => v.available === true)

    return { inStock: anyAvailable, source: 'shopify', httpStatus: res.status, checkedAt: now }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { inStock: true, source: 'error', error: message, checkedAt: now }
  }
}

// ─── Per-vendor dispatcher ─────────────────────────────────────────────────

export type VendorType = 'woocommerce' | 'shopify' | 'login_gated'

export const VENDOR_TYPES: Record<string, VendorType> = {
  'peptide-tech': 'woocommerce',
  'vandl-labs': 'woocommerce',
  'modern-aminos': 'woocommerce',
  'modified-aminos': 'shopify',
  'felix-chem': 'login_gated',
}

export async function checkProductStock(
  productUrl: string | null,
  supplierSlug: string
): Promise<StockResult> {
  const now = new Date().toISOString()
  const vendorType = VENDOR_TYPES[supplierSlug] ?? 'woocommerce'

  if (vendorType === 'login_gated') {
    return { inStock: true, source: 'login_gated', checkedAt: now }
  }

  if (!productUrl) {
    return { inStock: true, source: 'no_url', checkedAt: now }
  }

  if (vendorType === 'shopify') {
    return scrapeShopify(productUrl)
  }

  return scrapeWooCommerce(productUrl)
}

// ─── Concurrency limiter ───────────────────────────────────────────────────

export async function runWithConcurrency<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  maxConcurrent = 5
): Promise<R[]> {
  const results: R[] = []
  let i = 0

  async function runNext(): Promise<void> {
    if (i >= items.length) return
    const idx = i++
    results[idx] = await worker(items[idx])
    await runNext()
  }

  const workers = Array.from({ length: Math.min(maxConcurrent, items.length) }, runNext)
  await Promise.all(workers)
  return results
}

// ─── Per-domain rate limiter ───────────────────────────────────────────────
// Adds a small delay between consecutive requests to the same domain

const domainLastRequest: Map<string, number> = new Map()
const MIN_DOMAIN_INTERVAL_MS = 800

export async function rateLimitedFetch(productUrl: string, supplierSlug: string): Promise<StockResult> {
  try {
    const domain = new URL(productUrl).hostname
    const last = domainLastRequest.get(domain) ?? 0
    const now = Date.now()
    const wait = Math.max(0, MIN_DOMAIN_INTERVAL_MS - (now - last))
    if (wait > 0) await new Promise(r => setTimeout(r, wait))
    domainLastRequest.set(domain, Date.now())
  } catch {
    // Bad URL — will be caught by checkProductStock
  }

  return checkProductStock(productUrl, supplierSlug)
}
