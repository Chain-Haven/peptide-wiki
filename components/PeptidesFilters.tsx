'use client'

import { useState, useMemo, useCallback } from 'react'
import PeptideCard, { type CartItem } from '@/components/PeptideCard'
import CartSidebar from '@/components/CartSidebar'
import { Search, X } from 'lucide-react'
import type { Category, Peptide } from '@/lib/types'
import { getResearchStatusLabel } from '@/lib/utils'

interface PeptidesFiltersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peptides: (Peptide & { prices?: any[] })[]
  categories: Category[]
  initialCategory?: string
  initialStatus?: string
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'fda_approved', label: 'FDA Approved' },
  { value: 'prescription', label: 'Prescription' },
  { value: 'clinical_trials', label: 'Clinical Trials' },
  { value: 'research_only', label: 'Research Only' },
]

export default function PeptidesFilters({
  peptides,
  categories,
  initialCategory = '',
  initialStatus = '',
}: PeptidesFiltersProps) {
  // ─── Filter state ─────────────────────────────────────────────────────────
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [status, setStatus] = useState(initialStatus)

  // ─── Cart state ───────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      // Prevent exact duplicates
      if (prev.some(c => c.cartId === item.cartId)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((cartId: string) => {
    setCartItems(prev => prev.filter(c => c.cartId !== cartId))
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return peptides.filter(p => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase()) ||
        p.aliases?.some(a => a.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = !category || p.category?.slug === category
      const matchesStatus = !status || p.research_status === status

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [peptides, search, category, status])

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setStatus('')
  }

  const hasActiveFilters = search || category || status

  return (
    <div>
      {/* ─── Search + filter bar ─── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search peptides by name, alias, or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.slug} value={cat.slug}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {/* ─── Category quick-tabs ─── */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setCategory('')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            !category
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
          }`}
        >
          All ({peptides.length})
        </button>
        {categories.map(cat => {
          const count = peptides.filter(p => p.category?.slug === cat.slug).length
          return (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                category === cat.slug
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
            >
              {cat.icon} {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* ─── Results count ─── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500">
          Showing {filtered.length} of {peptides.length} peptides
          {hasActiveFilters && ' (filtered)'}
        </p>
        {cartItems.length > 0 && (
          <p className="text-xs text-blue-400">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </p>
        )}
      </div>

      {/* ─── Peptide grid ─── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(peptide => (
            <PeptideCard
              key={peptide.id}
              peptide={peptide}
              onAddToCart={addToCart}
              cartItems={cartItems}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">No peptides match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
            Clear filters
          </button>
        </div>
      )}

      {/* ─── Cart sidebar (floating) ─── */}
      <CartSidebar
        items={cartItems}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  )
}
