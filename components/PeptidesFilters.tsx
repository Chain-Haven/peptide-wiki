'use client'

import { useState, useMemo, useCallback } from 'react'
import PeptideCard, { type CartItem } from '@/components/PeptideCard'
import PriceComparisonTable from '@/components/PriceComparisonTable'
import CartSidebar from '@/components/CartSidebar'
import { Search, X, LayoutGrid, Table2, ArrowUpDown, Tag, Store } from 'lucide-react'
import type { Category, Peptide } from '@/lib/types'
import { cn } from '@/lib/utils'

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

type SortBy = 'name' | 'lowest_price' | 'most_vendors'
type ViewMode = 'cards' | 'prices'
type PriceDisplay = 'total' | 'per_mg'

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
  const [vendorFilter, setVendorFilter] = useState('')

  // ─── View / sort / display state ─────────────────────────────────────────
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [sortBy, setSortBy] = useState<SortBy>('name')
  const [priceDisplay, setPriceDisplay] = useState<PriceDisplay>('total')

  // ─── Cart state ───────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      if (prev.some(c => c.cartId === item.cartId)) return prev
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((cartId: string) => {
    setCartItems(prev => prev.filter(c => c.cartId !== cartId))
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  // ─── Derive vendor list from price data ───────────────────────────────────
  const allVendors = useMemo(() => {
    const seen = new Map<string, string>()
    peptides.forEach(p =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      p.prices?.forEach((pr: any) => {
        if (pr.supplier?.slug) seen.set(pr.supplier.slug, pr.supplier.name)
      })
    )
    return [...seen.entries()]
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [peptides])

  // ─── Filter ───────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return peptides.filter(p => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary?.toLowerCase().includes(search.toLowerCase()) ||
        p.aliases?.some(a => a.toLowerCase().includes(search.toLowerCase()))

      const matchesCategory = !category || p.category?.slug === category
      const matchesStatus = !status || p.research_status === status
      const matchesVendor =
        !vendorFilter ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        p.prices?.some((pr: any) => pr.supplier?.slug === vendorFilter)

      return matchesSearch && matchesCategory && matchesStatus && matchesVendor
    })
  }, [peptides, search, category, status, vendorFilter])

  // ─── Sort ─────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'lowest_price') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aMin = a.prices?.length ? Math.min(...a.prices.map((p: any) => p.price)) : Infinity
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bMin = b.prices?.length ? Math.min(...b.prices.map((p: any) => p.price)) : Infinity
        return aMin - bMin
      }
      if (sortBy === 'most_vendors') {
        return (b.prices?.length || 0) - (a.prices?.length || 0)
      }
      return a.name.localeCompare(b.name)
    })
  }, [filtered, sortBy])

  const clearFilters = () => {
    setSearch('')
    setCategory('')
    setStatus('')
    setVendorFilter('')
  }

  const hasActiveFilters = search || category || status || vendorFilter

  return (
    <div>
      {/* ─── Control bar ─── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* View mode toggle */}
        <div className="flex rounded-lg overflow-hidden border border-zinc-800">
          <button
            onClick={() => setViewMode('cards')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors',
              viewMode === 'cards'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Cards
          </button>
          <button
            onClick={() => setViewMode('prices')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors border-l border-zinc-800',
              viewMode === 'prices'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            )}
          >
            <Table2 className="h-3.5 w-3.5" /> Price Table
          </button>
        </div>

        {/* Price display toggle */}
        <div className="flex rounded-lg overflow-hidden border border-zinc-800">
          <button
            onClick={() => setPriceDisplay('total')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors',
              priceDisplay === 'total'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            )}
          >
            <Tag className="h-3 w-3" /> Total
          </button>
          <button
            onClick={() => setPriceDisplay('per_mg')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors border-l border-zinc-800',
              priceDisplay === 'per_mg'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            )}
          >
            /mg
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortBy)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="name">Sort: Name A–Z</option>
            <option value="lowest_price">Sort: Lowest Price</option>
            <option value="most_vendors">Sort: Most Vendors</option>
          </select>
        </div>

        {/* Vendor filter */}
        <div className="flex items-center gap-1.5">
          <Store className="h-3.5 w-3.5 text-zinc-500" />
          <select
            value={vendorFilter}
            onChange={e => setVendorFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs text-zinc-300 focus:outline-none focus:border-zinc-600"
          >
            <option value="">All Vendors</option>
            {allVendors.map(v => (
              <option key={v.slug} value={v.slug}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

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
          className={cn(
            'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
            !category
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
          )}
        >
          All ({peptides.length})
        </button>
        {categories.map(cat => {
          const count = peptides.filter(p => p.category?.slug === cat.slug).length
          return (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                category === cat.slug
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
              )}
            >
              {cat.icon} {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* ─── Results count ─── */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500">
          Showing {sorted.length} of {peptides.length} peptides
          {hasActiveFilters && ' (filtered)'}
          {sortBy !== 'name' && (
            <span className="ml-2 text-xs text-blue-400">
              · sorted by {sortBy === 'lowest_price' ? 'lowest price' : 'most vendors'}
            </span>
          )}
        </p>
        {cartItems.length > 0 && (
          <p className="text-xs text-blue-400">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </p>
        )}
      </div>

      {/* ─── Main content ─── */}
      {sorted.length > 0 ? (
        viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sorted.map(peptide => (
              <PeptideCard
                key={peptide.id}
                peptide={peptide}
                onAddToCart={addToCart}
                cartItems={cartItems}
                priceDisplay={priceDisplay}
              />
            ))}
          </div>
        ) : (
          <PriceComparisonTable
            peptides={sorted}
            priceDisplay={priceDisplay}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        )
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-lg">No peptides match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
            Clear filters
          </button>
        </div>
      )}

      {/* ─── Cart sidebar ─── */}
      <CartSidebar
        items={cartItems}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </div>
  )
}
