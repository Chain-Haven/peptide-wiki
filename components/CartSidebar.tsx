'use client'

import { useState } from 'react'
import {
  ShoppingCart, X, Trash2, ExternalLink, Tag, ShoppingBag,
  CheckCircle, ChevronRight, AlertCircle
} from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'
import type { CartItem } from '@/components/PeptideCard'
import Link from 'next/link'

interface CartSidebarProps {
  items: CartItem[]
  onRemove: (cartId: string) => void
  onClear: () => void
}

// Group cart items by vendor for the checkout view
function groupByVendor(items: CartItem[]): Record<string, CartItem[]> {
  return items.reduce((acc: Record<string, CartItem[]>, item) => {
    if (!acc[item.vendorName]) acc[item.vendorName] = []
    acc[item.vendorName].push(item)
    return acc
  }, {})
}

export default function CartSidebar({ items, onRemove, onClear }: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price, 0)
  const count = items.length
  const grouped = groupByVendor(items)

  const handleCheckout = () => {
    setCheckingOut(true)
    // Open each unique buy URL with staggered delays to help bypass popup blockers
    const uniqueUrls = [...new Set(items.map(i => i.buyUrl))]
    uniqueUrls.forEach((url, idx) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, idx * 400)
    })
    setTimeout(() => {
      setCheckingOut(false)
      setCheckedOut(true)
      setTimeout(() => setCheckedOut(false), 3000)
    }, uniqueUrls.length * 400 + 200)
  }

  return (
    <>
      {/* Floating cart button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-20 left-4 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-2xl transition-all duration-200',
          count > 0
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30'
            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700'
        )}
        aria-label="Open cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <>
            <span className="font-semibold text-sm">{count} item{count !== 1 ? 's' : ''}</span>
            <span className="text-blue-200 text-sm">·</span>
            <span className="font-bold text-sm">{formatPrice(total)}</span>
          </>
        )}
        {count === 0 && <span className="text-sm">Cart</span>}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <div className={cn(
        'fixed top-0 right-0 h-full z-50 w-full max-w-sm bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-blue-400" />
            <h2 className="font-bold text-white">Cart</h2>
            {count > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {count}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-zinc-800"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear all
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {count === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-12 w-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-medium mb-1">Your cart is empty</p>
            <p className="text-zinc-600 text-sm">
              Click "Add" next to any vendor option on the peptide list to add it to your cart.
            </p>
          </div>
        )}

        {/* Cart items */}
        {count > 0 && (
          <div className="flex-1 overflow-y-auto">
            {/* Group by vendor */}
            {Object.entries(grouped).map(([vendorName, vendorItems]) => (
              <div key={vendorName} className="border-b border-zinc-800/60 last:border-0">
                <div className="px-5 py-2.5 bg-zinc-900/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {vendorName}
                  </span>
                  <span className="text-xs text-zinc-600">
                    {formatPrice(vendorItems.reduce((s, i) => s + i.price, 0))}
                  </span>
                </div>

                {vendorItems.map(item => (
                  <div key={item.cartId} className="px-5 py-3 flex items-start gap-3 hover:bg-zinc-900/40 transition-colors">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/peptides/${item.peptideSlug}`}
                        className="text-sm font-medium text-white hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.peptideName}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-zinc-500 capitalize">
                          {item.quantityMg}mg · {item.form.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-bold text-white">{formatPrice(item.price)}</span>
                        {item.discountCode && (
                          <span className="flex items-center gap-0.5 text-xs text-blue-400">
                            <Tag className="h-2.5 w-2.5" />
                            <span className="font-mono font-bold">{item.discountCode}</span>
                          </span>
                        )}
                      </div>
                      {/* Direct buy link */}
                      <a
                        href={item.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-1 transition-colors"
                      >
                        Buy at {item.vendorName} <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                    <button
                      onClick={() => onRemove(item.cartId)}
                      className="p-1 text-zinc-600 hover:text-red-400 transition-colors rounded flex-shrink-0 mt-0.5"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ))}

            {/* Discount codes summary */}
            {items.some(i => i.discountCode) && (
              <div className="mx-4 my-3 p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl">
                <p className="text-xs font-semibold text-blue-400 mb-2 flex items-center gap-1">
                  <Tag className="h-3 w-3" /> Discount Codes
                </p>
                <div className="space-y-1">
                  {[...new Set(items.filter(i => i.discountCode).map(i => `${i.vendorName}:${i.discountCode}`))].map(key => {
                    const [vendor, code] = key.split(':')
                    return (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{vendor}</span>
                        <span className="font-mono font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                          {code}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <p className="text-xs text-zinc-600 mt-1.5">Apply code at checkout on each vendor's site</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {count > 0 && (
          <div className="border-t border-zinc-800 p-5 bg-zinc-900/40 space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
              <span className="text-xl font-black text-white">{formatPrice(total)}</span>
            </div>

            {/* Popup warning */}
            <div className="flex gap-2 p-2.5 bg-amber-500/5 border border-amber-500/15 rounded-lg text-xs text-amber-400/80">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <span>Checkout opens each vendor in a new tab. Allow popups if prompted.</span>
            </div>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={checkingOut || checkedOut}
              className={cn(
                'w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2',
                checkedOut
                  ? 'bg-emerald-600 text-white'
                  : checkingOut
                    ? 'bg-zinc-700 text-zinc-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              )}
            >
              {checkedOut ? (
                <><CheckCircle className="h-4 w-4" /> Tabs opened! Apply codes at checkout</>
              ) : checkingOut ? (
                <>Opening tabs...</>
              ) : (
                <><ShoppingCart className="h-4 w-4" /> Checkout — {formatPrice(total)} <ChevronRight className="h-4 w-4" /></>
              )}
            </button>

            {/* Per-vendor buy links as fallback */}
            <div className="space-y-1.5">
              <p className="text-xs text-zinc-600 text-center">Or click individual vendor links:</p>
              {Object.entries(grouped).map(([vendorName, vendorItems]) => {
                const url = vendorItems[0].buyUrl
                const code = vendorItems[0].discountCode
                return (
                  <a
                    key={vendorName}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-lg text-xs text-zinc-300 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3 text-blue-400" />
                      {vendorName}
                      {code && <span className="font-mono text-blue-400">({code})</span>}
                    </span>
                    <span className="text-zinc-500">
                      {vendorItems.length} item{vendorItems.length !== 1 ? 's' : ''}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
