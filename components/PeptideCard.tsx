'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getResearchStatusLabel, getResearchStatusColor, formatPrice, formatPricePerMg, buildBuyUrl, cn } from '@/lib/utils'
import type { Peptide } from '@/lib/types'
import {
  ChevronDown, ChevronUp, FlaskConical, ExternalLink,
  ShoppingCart, Tag, CheckCircle, ChevronRight, ShieldCheck
} from 'lucide-react'

const routeIcons: Record<string, string> = {
  'subcutaneous injection': '💉',
  'intramuscular injection': '💉',
  'oral': '💊',
  'intranasal': '👃',
  'topical': '🧴',
  'sublingual': '💊',
  'intravenous injection': '💉',
}

const VENDOR_BADGES: Record<string, { label: string; color: string }> = {
  'peptide-tech':   { label: 'Best Value',        color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  'modified-aminos':{ label: 'US-Made',           color: 'bg-purple-500/15 text-purple-400 border-purple-500/25' },
  'vandl-labs':     { label: 'Widest Selection',  color: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
  'felix-chem':     { label: 'Top Rated',         color: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  'modern-aminos':  { label: 'Budget-Friendly',   color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25' },
}

export type CartItem = {
  cartId: string
  peptideId: string
  peptideName: string
  peptideSlug: string
  vendorName: string
  vendorSlug: string
  price: number
  quantityMg: number
  form: string
  buyUrl: string
  discountCode: string | null
}

interface PeptideCardProps {
  peptide: Peptide & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prices?: any[]
  }
  onAddToCart?: (item: CartItem) => void
  cartItems?: CartItem[]
  priceDisplay?: 'total' | 'per_mg'
}

export default function PeptideCard({ peptide, onAddToCart, cartItems = [], priceDisplay = 'total' }: PeptideCardProps) {
  const [vendorsOpen, setVendorsOpen] = useState(true)
  const statusColor = getResearchStatusColor(peptide.research_status)
  const statusLabel = getResearchStatusLabel(peptide.research_status)

  // Sort prices lowest first, filter out login-gated without product_url
  const sortedPrices = [...(peptide.prices || [])]
    .sort((a, b) => a.price - b.price)

  const hasPrices = sortedPrices.length > 0
  const lowestPrice = hasPrices ? sortedPrices[0].price : null

  // Check if a price is already in cart
  const isInCart = (priceId: string) =>
    cartItems.some(c => c.cartId === `${peptide.id}-${priceId}`)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors">
      {/* ─── Card header ─── */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-2 bg-zinc-800 rounded-lg flex-shrink-0">
              <FlaskConical className="h-4 w-4 text-blue-400" />
            </div>
            <div className="min-w-0">
              <Link
                href={`/peptides/${peptide.slug}`}
                className="font-semibold text-white hover:text-blue-400 transition-colors leading-tight block"
              >
                {peptide.name}
              </Link>
              {peptide.aliases && peptide.aliases.length > 0 && (
                <p className="text-xs text-zinc-500 truncate">{peptide.aliases[0]}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {lowestPrice && (
              <span className="text-xs font-bold text-emerald-400">
                from {priceDisplay === 'per_mg' && sortedPrices[0]
                  ? formatPricePerMg(sortedPrices[0].price, sortedPrices[0].quantity_mg)
                  : formatPrice(lowestPrice)}
              </span>
            )}
            <Link
              href={`/peptides/${peptide.slug}`}
              className="p-1 text-zinc-600 hover:text-zinc-400 transition-colors"
              title="View full profile"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
          {peptide.summary}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor}`}>
            {statusLabel}
          </span>
          {sortedPrices.length >= 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full border bg-pink-500/15 text-pink-400 border-pink-500/25 font-medium">
              Popular
            </span>
          )}
          {peptide.administration_routes?.slice(0, 2).map(route => (
            <span key={route} className="text-xs text-zinc-500">
              {routeIcons[route] || '💊'}{' '}
              {route === 'subcutaneous injection' ? 'SubQ' :
               route === 'intramuscular injection' ? 'IM' :
               route.charAt(0).toUpperCase() + route.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* ─── Vendor dropdown ─── */}
      {hasPrices && (
        <div className="border-t border-zinc-800">
          {/* Toggle header */}
          <button
            onClick={() => setVendorsOpen(v => !v)}
            className="w-full flex items-center justify-between px-5 py-2.5 bg-zinc-800/40 hover:bg-zinc-800/70 transition-colors text-xs"
          >
            <span className="text-zinc-400 font-medium flex items-center gap-1.5">
              <ShoppingCart className="h-3.5 w-3.5 text-blue-400" />
              {sortedPrices.length} vendor option{sortedPrices.length !== 1 ? 's' : ''}
              {cartItems.filter(c => c.peptideId === peptide.id).length > 0 && (
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                  {cartItems.filter(c => c.peptideId === peptide.id).length} in cart
                </span>
              )}
            </span>
            {vendorsOpen
              ? <ChevronUp className="h-3.5 w-3.5 text-zinc-500" />
              : <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />}
          </button>

          {/* Vendor rows */}
          {vendorsOpen && (
            <div className="divide-y divide-zinc-800/60">
              {sortedPrices.map((price, idx) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const supplier = price.supplier as any
                if (!supplier) return null

                const supplierSlug: string = supplier.slug || ''
                const affiliateUrl: string = supplier.affiliate_url || '#'
                const discountCode: string | null = supplier.discount_code || null
                const badge = VENDOR_BADGES[supplierSlug]
                const buyUrl = buildBuyUrl(price.product_url || null, supplierSlug, affiliateUrl)
                const cartId = `${peptide.id}-${price.id}`
                const outOfStock = price.in_stock === false && price.stock_source !== 'login_gated' && price.last_checked_at
                const alreadyInCart = isInCart(price.id)
                const isBest = idx === 0

                return (
                  <div
                    key={price.id}
                    className={cn(
                      'px-4 py-3 flex items-center gap-3',
                      isBest && 'bg-emerald-500/5',
                      outOfStock && 'opacity-50'
                    )}
                  >
                    {/* Price */}
                    <div className="w-24 flex-shrink-0">
                      <div className="flex flex-col">
                        {isBest && (
                          <span className="text-xs text-emerald-400 font-semibold leading-tight">Best</span>
                        )}
                        <span className={cn('font-bold text-sm', isBest ? 'text-emerald-400' : 'text-white')}>
                          {priceDisplay === 'per_mg'
                            ? formatPricePerMg(price.price, price.quantity_mg)
                            : formatPrice(price.price)}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {priceDisplay === 'per_mg'
                            ? `${price.quantity_mg}mg vial`
                            : `${price.quantity_mg}mg`}
                        </span>
                      </div>
                    </div>

                    {/* Vendor info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-semibold text-zinc-200">{supplier.name}</span>
                        {badge && (
                          <span className={cn('text-xs px-1.5 py-0.5 rounded-full border', badge.color)}>
                            {badge.label}
                          </span>
                        )}
                        {supplier.has_coa && (
                          <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle className="h-2.5 w-2.5" /> COA
                          </span>
                        )}
                        {outOfStock && (
                          <span className="text-xs text-red-400">Out of stock</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs text-zinc-500 capitalize">
                          {price.form?.replace('_', ' ')}
                        </span>
                        {discountCode && (
                          <span className="flex items-center gap-1 text-xs bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-md">
                            <Tag className="h-2.5 w-2.5 text-blue-400" />
                            <span className="text-zinc-300">10% off code:</span>
                            <span className="font-mono font-bold text-blue-300">{discountCode}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Direct buy link */}
                      {!outOfStock && (
                        <a
                          href={buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Buy at ${supplier.name}`}
                          className="p-1.5 text-zinc-500 hover:text-blue-400 transition-colors rounded-lg hover:bg-zinc-800"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}

                      {/* Add to cart */}
                      {onAddToCart && !outOfStock && (
                        <button
                          onClick={() => {
                            onAddToCart({
                              cartId,
                              peptideId: peptide.id,
                              peptideName: peptide.name,
                              peptideSlug: peptide.slug,
                              vendorName: supplier.name,
                              vendorSlug: supplierSlug,
                              price: price.price,
                              quantityMg: price.quantity_mg,
                              form: price.form || 'injectable',
                              buyUrl,
                              discountCode,
                            })
                          }}
                          className={cn(
                            'flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all',
                            alreadyInCart
                              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                              : 'bg-blue-600 hover:bg-blue-500 text-white'
                          )}
                          disabled={alreadyInCart}
                        >
                          <ShoppingCart className="h-3 w-3" />
                          {alreadyInCart ? 'Added' : 'Add'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* No prices fallback with link to detail page */}
          {!hasPrices && (
            <div className="px-5 py-3 text-xs text-zinc-600">
              <Link href={`/peptides/${peptide.slug}`} className="text-blue-400 hover:text-blue-300">
                View full profile for pricing →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
