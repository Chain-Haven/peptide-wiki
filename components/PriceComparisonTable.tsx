'use client'

import Link from 'next/link'
import { ExternalLink, ShoppingCart, CheckCircle, Tag, TrendingDown } from 'lucide-react'
import { formatPrice, formatPricePerMg, buildBuyUrl, cn } from '@/lib/utils'
import type { Peptide } from '@/lib/types'
import type { CartItem } from '@/components/PeptideCard'

interface PriceComparisonTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peptides: (Peptide & { prices?: any[] })[]
  priceDisplay: 'total' | 'per_mg'
  onAddToCart?: (item: CartItem) => void
  cartItems?: CartItem[]
}

export default function PriceComparisonTable({
  peptides,
  priceDisplay,
  onAddToCart,
  cartItems = [],
}: PriceComparisonTableProps) {
  // Derive unique vendors from data, sorted by display_order
  const vendorMap = new Map<string, { name: string; slug: string; affiliateUrl: string; discountCode: string | null; hasCoa: boolean; displayOrder: number }>()
  peptides.forEach(p =>
    p.prices?.forEach((pr: { supplier?: { slug?: string; name?: string; affiliate_url?: string; discount_code?: string; has_coa?: boolean; display_order?: number } }) => {
      const s = pr.supplier
      if (s?.slug && !vendorMap.has(s.slug)) {
        vendorMap.set(s.slug, {
          name: s.name || s.slug,
          slug: s.slug,
          affiliateUrl: s.affiliate_url || '#',
          discountCode: s.discount_code || null,
          hasCoa: s.has_coa || false,
          displayOrder: s.display_order ?? 99,
        })
      }
    })
  )
  const vendors = [...vendorMap.values()].sort((a, b) => a.displayOrder - b.displayOrder)

  if (vendors.length === 0 || peptides.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500">
        No price data available.
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Legend */}
      <div className="px-4 py-3 bg-zinc-950/40 border-b border-zinc-800 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-emerald-400" /> Best price highlighted in green</span>
        <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3 text-emerald-400" /> COA verified</span>
        <span>— = not stocked</span>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-max">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/30">
              {/* Peptide column */}
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider sticky left-0 bg-zinc-950/80 backdrop-blur z-10 min-w-48">
                Peptide
              </th>
              {/* One column per vendor */}
              {vendors.map(v => (
                <th key={v.slug} className="text-center px-4 py-3 min-w-36">
                  <a
                    href={v.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-blue-400">{v.name}</span>
                    <div className="flex items-center gap-1">
                      {v.hasCoa && (
                        <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle className="h-2.5 w-2.5" /> COA
                        </span>
                      )}
                      {v.discountCode && (
                        <span className="flex items-center gap-0.5 text-xs text-blue-400">
                          <Tag className="h-2.5 w-2.5" />
                          {v.discountCode}
                        </span>
                      )}
                    </div>
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {peptides.map(peptide => {
              // Build a map of vendor slug → best price for this peptide
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const priceByVendor = new Map<string, any>()
              peptide.prices?.forEach((pr: { supplier?: { slug?: string }; price?: number; quantity_mg?: number; product_url?: string; in_stock?: boolean; stock_source?: string; id?: string; form?: string }) => {
                const slug = pr.supplier?.slug
                if (!slug) return
                const existing = priceByVendor.get(slug)
                // Keep lowest total price per vendor
                if (!existing || (pr.price ?? 0) < existing.price) {
                  priceByVendor.set(slug, pr)
                }
              })

              // Find overall best price for highlighting
              const prices = [...priceByVendor.values()]
              const globalBestPrice = prices.length
                ? Math.min(...prices.map(p => p.price))
                : null

              const isPopular = (peptide.prices?.length || 0) >= 4

              return (
                <tr
                  key={peptide.id}
                  className="hover:bg-zinc-800/20 transition-colors group"
                >
                  {/* Peptide name + link */}
                  <td className="px-4 py-3 sticky left-0 bg-zinc-900 group-hover:bg-zinc-800/20 z-10">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/peptides/${peptide.slug}`}
                          className="font-medium text-white hover:text-blue-400 transition-colors text-xs leading-snug"
                        >
                          {peptide.name}
                        </Link>
                        {isPopular && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/25 leading-none">
                            Hot
                          </span>
                        )}
                      </div>
                      {peptide.aliases?.[0] && (
                        <span className="text-xs text-zinc-600 truncate max-w-44">{peptide.aliases[0]}</span>
                      )}
                    </div>
                  </td>

                  {/* Price cell per vendor */}
                  {vendors.map(vendor => {
                    const pr = priceByVendor.get(vendor.slug)
                    const isOutOfStock = pr?.in_stock === false && pr?.stock_source !== 'login_gated' && pr?.last_checked_at
                    const isBestCell = pr && globalBestPrice !== null && pr.price === globalBestPrice
                    const buyUrl = pr ? buildBuyUrl(pr.product_url || null, vendor.slug, vendor.affiliateUrl) : vendor.affiliateUrl
                    const cartId = pr ? `${peptide.id}-${pr.id}` : ''
                    const alreadyInCart = cartItems.some(c => c.cartId === cartId)

                    if (!pr) {
                      return (
                        <td key={vendor.slug} className="px-4 py-3 text-center">
                          <span className="text-zinc-700 text-xs">—</span>
                        </td>
                      )
                    }

                    return (
                      <td
                        key={vendor.slug}
                        className={cn(
                          'px-4 py-3 text-center',
                          isBestCell && 'bg-emerald-500/5',
                          isOutOfStock && 'opacity-40'
                        )}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          {/* Price display */}
                          <span className={cn(
                            'font-bold text-sm',
                            isBestCell ? 'text-emerald-400' : 'text-white',
                            isOutOfStock && 'line-through text-zinc-600'
                          )}>
                            {priceDisplay === 'per_mg'
                              ? formatPricePerMg(pr.price, pr.quantity_mg)
                              : formatPrice(pr.price)}
                          </span>
                          <span className="text-xs text-zinc-600">{pr.quantity_mg}mg</span>

                          {isOutOfStock && (
                            <span className="text-xs text-red-400">Out of stock</span>
                          )}

                          {/* Action buttons */}
                          {!isOutOfStock && (
                            <div className="flex items-center gap-1">
                              <a
                                href={buyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-zinc-600 hover:text-blue-400 transition-colors rounded"
                                title={`Buy at ${vendor.name}`}
                              >
                                <ExternalLink className="h-3 w-3" />
                              </a>
                              {onAddToCart && (
                                <button
                                  onClick={() => onAddToCart({
                                    cartId,
                                    peptideId: peptide.id,
                                    peptideName: peptide.name,
                                    peptideSlug: peptide.slug,
                                    vendorName: vendor.name,
                                    vendorSlug: vendor.slug,
                                    price: pr.price,
                                    quantityMg: pr.quantity_mg,
                                    form: pr.form || 'injectable',
                                    buyUrl,
                                    discountCode: vendor.discountCode,
                                  })}
                                  disabled={alreadyInCart}
                                  className={cn(
                                    'p-1 rounded transition-all',
                                    alreadyInCart
                                      ? 'text-emerald-400 cursor-default'
                                      : 'text-zinc-600 hover:text-blue-400'
                                  )}
                                  title={alreadyInCart ? 'In cart' : 'Add to cart'}
                                >
                                  <ShoppingCart className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <div className="px-4 py-2.5 bg-zinc-950/40 border-t border-zinc-800 text-xs text-zinc-600">
        Prices updated automatically via AI scraper. All links are affiliate links — PeptideWiki earns a commission at no extra cost to you.
      </div>
    </div>
  )
}
