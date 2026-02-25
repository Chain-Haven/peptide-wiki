'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  ExternalLink, CheckCircle, Star, Copy, Check, Tag,
  Globe, ShieldCheck, Zap, TrendingDown, FlaskConical, ChevronRight
} from 'lucide-react'
import type { Supplier } from '@/lib/types'
import Link from 'next/link'

const VENDOR_METADATA: Record<string, {
  badge?: string
  badgeColor?: string
  highlight?: string
  specialty: string
  bestFor: string[]
  featuredProducts: string[]
}> = {
  'felix-chem': {
    badge: 'Top Rated',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    highlight: 'Premium GLP-1 specialist — semaglutide, tirzepatide, retatrutide, cagrilintide, and novel triple agonists. Free BAC water with every order.',
    specialty: 'GLP-1 & Weight Loss Peptides',
    bestFor: ['Semaglutide', 'Tirzepatide', 'Retatrutide', 'Cagrilintide', 'Mazdutide', 'Survodutide'],
    featuredProducts: ['semaglutide', 'tirzepatide', 'retatrutide', 'cagrilintide'],
  },
  'vandl-labs': {
    badge: 'Widest Selection',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    highlight: '95+ products — peptides, capsules, sprays, topicals, and liquids. Carries rare compounds including Orforglipron, BAM15, and hair loss topicals.',
    specialty: 'Broadest Catalog (95+ products)',
    bestFor: ['Capsule forms', 'Nasal sprays', 'Topicals (finasteride, minoxidil)', 'BAM15', 'Orforglipron'],
    featuredProducts: ['bpc-157', 'tb-500', 'ipamorelin', 'epithalon'],
  },
  'peptide-tech': {
    badge: 'Best Value',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    highlight: 'Deepest peptide catalog — 65+ compounds. HPLC/UPLC tested, QR code COA on every vial. Bioregulators, rare peptides, and competitive pricing on GLP-1s.',
    specialty: 'Deepest Research Catalog',
    bestFor: ['Khavinson bioregulators', 'BPC-157', 'TB-500', 'Tirzepatide', 'Rare peptides'],
    featuredProducts: ['bpc-157', 'tb-500', 'tirzepatide', 'humanin'],
  },
  'modified-aminos': {
    badge: 'US-Made COA',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    highlight: 'US-manufactured with 3rd-party testing via Freedom Diagnostics. Batch/lot tracking with QR codes. Specializes in capsules, sprays, and oral forms. Same-day shipping before 2PM CST.',
    specialty: 'Capsules, Sprays & Oral Forms',
    bestFor: ['Capsule blends', 'Nasal sprays', 'BPC-157 capsules', 'Semax/Selank sprays'],
    featuredProducts: ['bpc-157', 'semax', 'selank', 'kpv'],
  },
  'modern-aminos': {
    badge: 'Budget-Friendly',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    highlight: '112+ products at competitive prices. Free shipping over $250. Same-day shipping before 12PM CST. Covers peptides, SARMs, powders, and cognitive compounds.',
    specialty: 'Competitive Pricing + Large Catalog',
    bestFor: ['Budget GLP-1s', 'SARMs', 'Cognitive compounds', 'Peptide powders'],
    featuredProducts: ['semaglutide', 'tirzepatide', 'retatrutide', 'mk-677'],
  },
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all group"
    >
      <span className="font-mono font-bold text-white text-sm tracking-wider">{code}</span>
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
      )}
    </button>
  )
}

export default function VendorsPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    supabase.from('suppliers').select('*').order('rating', { ascending: false }).then(({ data }) => {
      if (data) setSuppliers(data)
    })
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/30">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-blue-400" />
            <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">Affiliate Partners</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Trusted Peptide Vendors</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            5 vetted affiliate vendors — use our exclusive discount codes to save on every order. All vendors carry COA-tested research peptides.
          </p>
          <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl max-w-2xl">
            <p className="text-sm text-blue-400/90">
              <strong className="text-blue-300">Disclosure:</strong> PeptideWiki earns a commission when you purchase through our links at no extra cost to you. Our codes unlock exclusive discounts.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">

        {/* Vendor Cards */}
        <div className="space-y-6 mb-16">
          {suppliers.map((supplier, index) => {
            const meta = VENDOR_METADATA[supplier.slug]
            const affiliateUrl = supplier.affiliate_url || supplier.url
            const hasCrypto = supplier.payment_methods?.some(
              m => m.toLowerCase().includes('crypto') || m.toLowerCase().includes('bitcoin') || m.toLowerCase().includes('ethereum')
            )

            return (
              <div key={supplier.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">

                {/* Vendor header */}
                <div className="p-6 border-b border-zinc-800">
                  <div className="flex flex-col md:flex-row md:items-start gap-5">
                    {/* Left: Name + info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400 flex-shrink-0">
                          {index + 1}
                        </span>
                        <h2 className="text-xl font-bold text-white">{supplier.name}</h2>
                        {meta?.badge && (
                          <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${meta.badgeColor}`}>
                            {meta.badge}
                          </span>
                        )}
                        {supplier.has_coa && (
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <ShieldCheck className="h-3 w-3" /> COA Verified
                          </span>
                        )}
                        {supplier.ships_internationally && (
                          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <Globe className="h-3 w-3" /> Ships Worldwide
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(supplier.rating) ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{supplier.rating.toFixed(1)}</span>
                        <span className="text-zinc-600 text-xs">/5.0</span>
                      </div>

                      {meta?.highlight && (
                        <p className="text-zinc-400 text-sm leading-relaxed mb-3">{meta.highlight}</p>
                      )}

                      {/* Specialty + Best For */}
                      {meta && (
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-xs text-zinc-500">Best for:</span>
                          {meta.bestFor.slice(0, 4).map(item => (
                            <span key={item} className="text-xs bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full text-zinc-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Discount code + CTA */}
                    <div className="flex flex-col gap-3 md:min-w-56">
                      {supplier.discount_code && (
                        <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl">
                          <p className="text-xs text-blue-400/80 mb-1.5 font-medium uppercase tracking-wider">
                            {supplier.discount_description || 'Exclusive Discount'}
                          </p>
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            <span className="text-xs text-zinc-400">Code:</span>
                            <CopyCodeButton code={supplier.discount_code} />
                          </div>
                        </div>
                      )}

                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                      >
                        Shop {supplier.name} <ExternalLink className="h-4 w-4" />
                      </a>

                      <p className="text-center text-xs text-zinc-600">
                        {affiliateUrl.replace('https://', '').split('/')[0].split('?')[0]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products + Payment methods row */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                  {/* Featured products */}
                  {meta?.featuredProducts && (
                    <div className="px-6 py-4">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <FlaskConical className="h-3.5 w-3.5" /> Featured Products
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {meta.featuredProducts.map(slug => (
                          <Link key={slug} href={`/peptides/${slug}`}
                            className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-blue-400 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-all capitalize">
                            {slug.replace(/-/g, ' ')}
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                        ))}
                        <a href={affiliateUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                          View all <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Payment methods */}
                  <div className="px-6 py-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Payment Methods</p>
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.payment_methods?.map(method => (
                        <span key={method}
                          className="text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick comparison table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">Quick Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-950/50">
                  <th className="text-left px-6 py-3">Vendor</th>
                  <th className="text-left px-6 py-3">Code</th>
                  <th className="text-center px-6 py-3">Rating</th>
                  <th className="text-center px-6 py-3">COA</th>
                  <th className="text-center px-6 py-3">Intl. Ship</th>
                  <th className="text-center px-6 py-3">Crypto</th>
                  <th className="text-left px-6 py-3">Specialty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {suppliers.map(supplier => {
                  const meta = VENDOR_METADATA[supplier.slug]
                  const hasCrypto = supplier.payment_methods?.some(
                    m => m.toLowerCase().includes('crypto') || m.toLowerCase().includes('bitcoin')
                  )
                  const affiliateUrl = supplier.affiliate_url || supplier.url
                  return (
                    <tr key={supplier.id} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <a href={affiliateUrl} target="_blank" rel="noopener noreferrer"
                          className="font-medium text-white hover:text-blue-400 flex items-center gap-1 transition-colors">
                          {supplier.name} <ExternalLink className="h-3 w-3 text-zinc-600" />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {supplier.discount_code && (
                          <span className="font-mono text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full">
                            {supplier.discount_code}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-white text-sm font-medium">{supplier.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {supplier.has_coa
                          ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                          : <span className="text-zinc-600 text-xs">—</span>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {supplier.ships_internationally
                          ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                          : <span className="text-zinc-600 text-xs">US Only</span>}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {hasCrypto
                          ? <CheckCircle className="h-4 w-4 text-emerald-400 mx-auto" />
                          : <span className="text-zinc-600 text-xs">—</span>}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400 max-w-48">
                        {meta?.specialty || '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <p className="text-amber-400/80 text-sm leading-relaxed">
            <strong>Research Use Only:</strong> All vendors sell peptides for research purposes only. Pricing and availability change frequently — verify on vendor sites. PeptideWiki receives affiliate commissions through these links. Always verify COA documentation before purchasing any research compound. Not medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
