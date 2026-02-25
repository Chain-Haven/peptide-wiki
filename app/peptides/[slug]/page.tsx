import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, FlaskConical, CheckCircle, AlertTriangle, BookOpen,
  DollarSign, Layers, Clock, ExternalLink, Microscope, BarChart3,
  Globe, Shield, Thermometer, Droplets, Tag, Copy, Award,
  Zap, Activity, Lock, Info,
} from 'lucide-react'
import { getResearchStatusColor, getResearchStatusLabel, formatPrice, cn } from '@/lib/utils'
import type { Peptide, Price, ResearchStudy } from '@/lib/types'
import PeptideCard from '@/components/PeptideCard'
import MoleculeViewer from '@/components/MoleculeViewer'
import ClinicalTrialCard from '@/components/ClinicalTrialCard'

export const revalidate = 3600

export async function generateStaticParams() {
  const { data } = await supabase.from('peptides').select('slug')
  return (data || []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data } = await supabase.from('peptides').select('name, summary').eq('slug', slug).single()
  if (!data) return { title: 'Peptide Not Found' }
  return {
    title: `${data.name} — Mechanism, Dosage, Research & Where to Buy`,
    description: data.summary,
  }
}

async function getPeptide(slug: string) {
  const { data, error } = await supabase
    .from('peptides')
    .select(`
      *,
      category:categories(*),
      prices(*, supplier:suppliers(id, name, slug, url, affiliate_url, discount_code, has_coa, rating, ships_internationally, payment_methods)),
      research_studies(*)
    `)
    .eq('slug', slug)
    .single()
  if (error || !data) return null
  return data
}

async function getRelatedPeptides(categoryId: string, currentSlug: string) {
  const { data } = await supabase
    .from('peptides')
    .select('id, name, slug, research_status, administration_routes, aliases, summary, category:categories(*)')
    .eq('category_id', categoryId)
    .neq('slug', currentSlug)
    .limit(4)
  return data || []
}

// Vendor metadata for the "Where to Buy" section
const VENDOR_META: Record<string, { badge: string; badgeColor: string; description: string }> = {
  'felix-chem': {
    badge: 'Top Rated',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    description: 'GLP-1 specialist · Free BAC water included',
  },
  'vandl-labs': {
    badge: 'Widest Selection',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    description: '95+ products · Sprays, capsules & injectables',
  },
  'peptide-tech': {
    badge: 'Best Value',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    description: 'QR-code COA on every vial · 65+ compounds',
  },
  'modified-aminos': {
    badge: 'US-Made',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
    description: '3rd-party tested · Same-day shipping before 2PM',
  },
  'modern-aminos': {
    badge: 'Budget-Friendly',
    badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
    description: '112+ products · Free shipping over $250',
  },
}

export default async function PeptideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const peptide = await getPeptide(slug)
  if (!peptide) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const related: any[] = await getRelatedPeptides(peptide.category_id, slug)

  const sortedPrices = [...(peptide.prices || [])].sort((a: Price, b: Price) => a.price - b.price)
  const lowestPrice = sortedPrices.length ? sortedPrices[0].price : null

  const dosage = peptide.dosage_info as {
    min_dose?: number | null; max_dose?: number | null; unit?: string
    frequency?: string; notes?: string; weight_based?: boolean
  }

  const sortedStudies = [...(peptide.research_studies || [])].sort((a: ResearchStudy, b: ResearchStudy) => {
    const typeOrder: Record<string, number> = { clinical_trial: 0, human: 1, animal: 2, in_vitro: 3, review: 4 }
    return (typeOrder[a.study_type] ?? 5) - (typeOrder[b.study_type] ?? 5) || (b.year || 0) - (a.year || 0)
  })

  const clinicalTrials = sortedStudies.filter(s => s.study_type === 'clinical_trial')
  const otherStudies = sortedStudies.filter(s => s.study_type !== 'clinical_trial')

  const statusColor = getResearchStatusColor(peptide.research_status)
  const statusLabel = getResearchStatusLabel(peptide.research_status)

  // Group prices by supplier to show best price per vendor
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pricesBySupplier = sortedPrices.reduce((acc: Record<string, any[]>, price: Price) => {
    const sid = (price.supplier as { slug?: string } | null)?.slug || 'unknown'
    if (!acc[sid]) acc[sid] = []
    acc[sid].push(price)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/peptides" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Peptides
          </Link>
          <span>/</span>
          {peptide.category && (
            <>
              <Link href={`/peptides?category=${peptide.category.slug}`} className="hover:text-zinc-300 transition-colors">
                {peptide.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-zinc-300">{peptide.name}</span>
        </div>

        {/* ═══════════ HERO HEADER ═══════════ */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {/* Type + Status badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${statusColor}`}>
                  <Shield className="h-3.5 w-3.5" />
                  {statusLabel}
                </span>
                {peptide.peptide_type && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-300">
                    <Zap className="h-3.5 w-3.5 text-blue-400" />
                    {peptide.peptide_type}
                  </span>
                )}
                {peptide.wada_banned && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/25 rounded-full text-sm text-red-400">
                    <Lock className="h-3.5 w-3.5" /> WADA Banned
                  </span>
                )}
                {peptide.category && (
                  <Link href={`/peptides?category=${peptide.category.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                    <span>{peptide.category.icon}</span> {peptide.category.name}
                  </Link>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{peptide.name}</h1>
              {peptide.aliases?.length > 0 && (
                <p className="text-sm text-zinc-500 mb-4">Also known as: {peptide.aliases.join(' · ')}</p>
              )}
              <p className="text-zinc-300 text-lg leading-relaxed mb-6">{peptide.summary}</p>

              {/* Quick stat chips */}
              <div className="flex flex-wrap gap-3">
                {peptide.amino_acid_count != null && peptide.amino_acid_count > 0 && (
                  <div className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-400">
                    <span className="text-zinc-300 font-medium">{peptide.amino_acid_count} AAs</span>
                  </div>
                )}
                {peptide.molecular_weight && (
                  <div className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-mono text-zinc-400">
                    MW: <span className="text-zinc-300">{peptide.molecular_weight}</span>
                  </div>
                )}
                {peptide.half_life && (
                  <div className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    t½: <span className="text-zinc-300 ml-1">{peptide.half_life}</span>
                  </div>
                )}
                {peptide.cas_number && (
                  <div className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-mono text-zinc-500">
                    CAS: {peptide.cas_number}
                  </div>
                )}
              </div>
            </div>

            {/* Right: price + CTA */}
            {lowestPrice && (
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-5 text-center">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">From</p>
                  <p className="text-3xl font-black text-white mb-1">{formatPrice(lowestPrice)}</p>
                  <p className="text-xs text-zinc-500 mb-4">{sortedPrices.length} vendor option{sortedPrices.length !== 1 ? 's' : ''}</p>
                  <a href="#where-to-buy"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors">
                    <DollarSign className="h-4 w-4" /> Shop with Discount
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════ MAIN GRID ═══════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

          {/* ─── MAIN COLUMN (3/4) ─── */}
          <div className="xl:col-span-3 space-y-6">

            {/* Mechanism */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Microscope className="h-5 w-5 text-blue-400" />
                Mechanism of Action
              </h2>
              <p className="text-zinc-300 leading-relaxed">{peptide.mechanism}</p>

              {/* Amino acid sequence */}
              {peptide.amino_acid_sequence && peptide.amino_acid_count != null && peptide.amino_acid_count <= 50 && (
                <div className="mt-4 p-4 bg-zinc-800/60 border border-zinc-700 rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Amino Acid Sequence ({peptide.amino_acid_count} AAs)</p>
                  <p className="font-mono text-xs text-emerald-400 leading-relaxed break-all">{peptide.amino_acid_sequence}</p>
                </div>
              )}
            </section>

            {/* Benefits & Side Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                  Benefits
                </h2>
                <ul className="space-y-2.5">
                  {peptide.benefits?.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  Side Effects & Risks
                </h2>
                <ul className="space-y-2.5">
                  {peptide.side_effects?.map((effect: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      {effect}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ═══════════ WHERE TO BUY ═══════════ */}
            {sortedPrices.length > 0 && (
              <section id="where-to-buy" className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                      Where to Buy {peptide.name}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {Object.keys(pricesBySupplier).length} vendor{Object.keys(pricesBySupplier).length !== 1 ? 's' : ''} · Affiliate links — use codes below to save
                    </p>
                  </div>
                  {lowestPrice && (
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Best price</p>
                      <p className="text-xl font-black text-emerald-400">{formatPrice(lowestPrice)}</p>
                    </div>
                  )}
                </div>

                {/* Vendor cards */}
                <div className="divide-y divide-zinc-800/60">
                  {Object.entries(pricesBySupplier).map(([supplierSlug, vendorPrices]) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const prices = vendorPrices as any[]
                    const supplier = prices[0].supplier!
                    const meta = VENDOR_META[supplierSlug]
                    const affiliateUrl = (supplier as (typeof supplier & { affiliate_url?: string }))?.affiliate_url || supplier.url
                    const discountCode = (supplier as (typeof supplier & { discount_code?: string }))?.discount_code
                    const lowestVendorPrice = Math.min(...prices.map((p: Price) => p.price))
                    // Stock summary for this vendor
                    const anyInStock = prices.some((p: Price & { in_stock?: boolean; stock_source?: string; last_checked_at?: string | null }) =>
                      p.in_stock !== false || p.stock_source === 'login_gated' || !p.last_checked_at
                    )
                    const lastChecked = prices
                      .map((p: Price & { last_checked_at?: string | null }) => p.last_checked_at)
                      .filter(Boolean)
                      .sort()
                      .pop() as string | undefined

                    return (
                      <div key={supplierSlug} className="px-6 py-4 hover:bg-zinc-800/20 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          {/* Vendor info */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-semibold text-white">{supplier.name}</span>
                              {meta?.badge && (
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${meta.badgeColor}`}>
                                  {meta.badge}
                                </span>
                              )}
                              {supplier.has_coa && (
                                <span className="flex items-center gap-1 text-xs text-emerald-400">
                                  <CheckCircle className="h-3 w-3" /> COA
                                </span>
                              )}
                              {!anyInStock && (
                                <span className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                                  Out of Stock
                                </span>
                              )}
                              {lastChecked && (
                                <span className="text-xs text-zinc-600" title={new Date(lastChecked).toLocaleString()}>
                                  Checked {Math.round((Date.now() - new Date(lastChecked).getTime()) / 3_600_000)}h ago
                                </span>
                              )}
                            </div>
                            {meta?.description && (
                              <p className="text-xs text-zinc-500 mb-2">{meta.description}</p>
                            )}
                            {/* Size options with stock status */}
                            <div className="flex flex-wrap gap-1.5">
                              {prices.map((price: Price & { in_stock?: boolean; last_checked_at?: string | null; stock_source?: string }) => {
                                const isLoginGated = price.stock_source === 'login_gated'
                                const unchecked = !price.last_checked_at && !isLoginGated
                                const outOfStock = !price.in_stock && !isLoginGated && !unchecked

                                return (
                                  <a key={price.id} href={outOfStock ? undefined : affiliateUrl}
                                    target={outOfStock ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className={cn(
                                      'text-xs px-2.5 py-1 border rounded-lg transition-colors',
                                      outOfStock
                                        ? 'bg-red-500/5 border-red-500/20 text-zinc-500 cursor-not-allowed line-through'
                                        : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-500 text-zinc-300'
                                    )}>
                                    {price.quantity_mg}mg — <span className={cn('font-semibold', outOfStock ? 'text-zinc-600' : 'text-white')}>{formatPrice(price.price)}</span>
                                    <span className="text-zinc-500 ml-1 capitalize">({price.form?.replace('_', ' ')})</span>
                                    {outOfStock && <span className="ml-1 text-red-400 no-underline not-italic text-xs">Out of stock</span>}
                                    {unchecked && <span className="ml-1 text-zinc-600 text-xs">⏱</span>}
                                  </a>
                                )
                              })}
                            </div>
                          </div>

                          {/* Discount code + CTA */}
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            {discountCode && (
                              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <Tag className="h-3.5 w-3.5 text-blue-400" />
                                <span className="text-xs text-zinc-400">Code:</span>
                                <span className="font-mono font-bold text-blue-300">{discountCode}</span>
                              </div>
                            )}
                            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shadow-lg shadow-blue-500/20">
                              Buy from {supplier.name} <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="px-6 py-3 bg-zinc-950/40 border-t border-zinc-800/50">
                  <p className="text-xs text-zinc-600">
                    Affiliate disclosure: PeptideWiki earns a commission from purchases through these links at no extra cost to you.
                    All vendors are COA-verified. Prices shown are current research rates and may change.
                  </p>
                </div>
              </section>
            )}

            {/* Storage & Reconstitution Guide */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-400" />
                Storage & Reconstitution Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-800/60 border border-zinc-700 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-cyan-400" />
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Storage Temperature</p>
                  </div>
                  <p className="text-sm text-white font-medium">
                    {peptide.storage_temp || '-20°C (lyophilized)'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {peptide.storage_duration || '24 months (lyophilized), 28 days (reconstituted)'}
                  </p>
                </div>
                <div className="p-4 bg-zinc-800/60 border border-zinc-700 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Reconstitution Solvent</p>
                  </div>
                  <p className="text-sm text-white font-medium">
                    {peptide.reconstitution_solvent || 'Bacteriostatic water (BAC water)'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">Swirl gently — do not shake or vortex</p>
                </div>
                <div className="p-4 bg-zinc-800/60 border border-zinc-700 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-amber-400" />
                    <p className="text-xs text-zinc-400 uppercase tracking-wider">Handling Notes</p>
                  </div>
                  <p className="text-sm text-zinc-300 text-xs leading-relaxed">
                    Protect lyophilized peptide from moisture and light. Once reconstituted, keep refrigerated.
                    Discard if solution becomes cloudy or discolored. Use insulin syringe for precise dosing.
                  </p>
                </div>
              </div>
              {/* Reconstitution steps */}
              <div className="mt-4 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-xl">
                <p className="text-sm font-semibold text-white mb-3">Step-by-Step Reconstitution</p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { step: '1', title: 'Gather supplies', desc: 'BAC water, insulin syringe, alcohol swabs, vial' },
                    { step: '2', title: 'Disinfect tops', desc: 'Swab rubber stoppers of both vials with alcohol' },
                    { step: '3', title: 'Draw BAC water', desc: 'Pull desired mL of BAC water into syringe' },
                    { step: '4', title: 'Inject slowly', desc: 'Inject BAC water down the side of the peptide vial, swirl gently to dissolve' },
                  ].map(s => (
                    <div key={s.step} className="flex gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">{s.step}</span>
                      <div>
                        <p className="font-medium text-zinc-200 mb-0.5">{s.title}</p>
                        <p className="text-zinc-500 leading-snug">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link href="/calculator"
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  Use the Reconstitution Calculator to find exact draw volumes →
                </Link>
              </div>
            </section>

            {/* Clinical Trials */}
            {clinicalTrials.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Clinical Trials & Human Studies
                  <span className="text-xs font-normal text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                    {clinicalTrials.length} trial{clinicalTrials.length !== 1 ? 's' : ''}
                  </span>
                </h2>
                <div className="space-y-4">
                  {clinicalTrials.map((study: ResearchStudy) => (
                    <ClinicalTrialCard key={study.id} study={study} />
                  ))}
                </div>
              </section>
            )}

            {/* Preclinical Research */}
            {otherStudies.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Preclinical Research & Reviews
                  <span className="text-xs font-normal text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                    {otherStudies.length}
                  </span>
                </h2>
                <div className="space-y-4">
                  {otherStudies.map((study: ResearchStudy) => (
                    <ClinicalTrialCard key={study.id} study={study} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ─── SIDEBAR (1/4) ─── */}
          <div className="space-y-4">

            {/* Molecular Structure */}
            {peptide.pubchem_cid && (
              <MoleculeViewer
                pubchemCid={peptide.pubchem_cid}
                peptideName={peptide.name}
                molecularFormula={peptide.molecular_formula}
                molecularWeight={peptide.molecular_weight}
                casNumber={peptide.cas_number}
                iupacName={peptide.iupac_name}
                aminoAcidCount={peptide.amino_acid_count}
                wikipediaUrl={peptide.wikipedia_url}
              />
            )}

            {/* Dosage Protocol */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                Research Protocol
              </h2>
              <dl className="space-y-2.5 text-sm">
                {dosage?.min_dose != null && (
                  <div className="flex justify-between py-1.5 border-b border-zinc-800">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider">Dose Range</dt>
                    <dd className="text-zinc-200 font-medium text-xs">
                      {dosage.min_dose}{dosage.max_dose && dosage.max_dose !== dosage.min_dose && `–${dosage.max_dose}`}{' '}
                      {dosage.unit}{dosage.weight_based && '/kg'}
                    </dd>
                  </div>
                )}
                {dosage?.frequency && (
                  <div className="py-1.5 border-b border-zinc-800">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Frequency</dt>
                    <dd className="text-zinc-200 text-xs">{dosage.frequency}</dd>
                  </div>
                )}
                {peptide.cycle_length && (
                  <div className="flex justify-between py-1.5 border-b border-zinc-800">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider">Cycle</dt>
                    <dd className="text-zinc-200 text-xs text-right max-w-32">{peptide.cycle_length}</dd>
                  </div>
                )}
                {peptide.half_life && (
                  <div className="flex justify-between py-1.5 border-b border-zinc-800">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider">Half-Life</dt>
                    <dd className="text-zinc-200 text-xs">{peptide.half_life}</dd>
                  </div>
                )}
                {peptide.administration_routes?.length > 0 && (
                  <div className="py-1.5 border-b border-zinc-800">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider mb-1.5">Routes</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {peptide.administration_routes.map((route: string) => (
                        <span key={route} className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-2 py-0.5 text-zinc-300 capitalize">
                          {route}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
                {dosage?.notes && (
                  <div className="py-1.5">
                    <dt className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">Notes</dt>
                    <dd className="text-xs text-zinc-400 leading-relaxed">{dosage.notes}</dd>
                  </div>
                )}
              </dl>
              <Link href="/calculator"
                className="flex items-center justify-center gap-1.5 w-full mt-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-medium rounded-lg transition-colors">
                Open Dosage Calculator →
              </Link>
            </section>

            {/* Legal & Regulatory Status */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-blue-400" />
                Legal & Regulatory Status
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">Research Status</span>
                  <span className={`px-2 py-0.5 rounded-full border text-xs ${statusColor}`}>{statusLabel}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">WADA Status</span>
                  {peptide.wada_banned ? (
                    <span className="flex items-center gap-1 text-red-400"><Lock className="h-3 w-3" /> Prohibited</span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-400"><CheckCircle className="h-3 w-3" /> Not Listed</span>
                  )}
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span className="text-zinc-500">FDA Classification</span>
                  <span className="text-zinc-400">
                    {peptide.research_status === 'fda_approved' ? '✅ FDA Approved' :
                     peptide.research_status === 'prescription' ? 'Rx Required' :
                     peptide.research_status === 'clinical_trials' ? 'In Clinical Trials' :
                     'Not Approved'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-zinc-500">Origin</span>
                  <span className="text-zinc-400 capitalize">{peptide.origin || 'Synthetic'}</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
                <p className="text-xs text-amber-400/80 leading-relaxed">
                  Sold for research purposes only. Not for human use. Laws vary by country.
                </p>
              </div>
            </section>

            {/* Stack With */}
            {peptide.stack_with?.length > 0 && (
              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h2 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                  <Layers className="h-4 w-4 text-blue-400" />
                  Commonly Stacked With
                </h2>
                <div className="flex flex-wrap gap-2">
                  {peptide.stack_with.map((stackSlug: string) => (
                    <Link key={stackSlug} href={`/peptides/${stackSlug}`}
                      className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors capitalize">
                      {stackSlug.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
                <Link href="/stacks" className="block mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  View all peptide stacks →
                </Link>
              </section>
            )}

            {/* External Resources */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-blue-400" />
                External Resources
              </h2>
              <div className="space-y-1">
                {peptide.pubchem_cid && (
                  <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${peptide.pubchem_cid}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                    <span>🔬</span> PubChem Database <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
                {peptide.cas_number && (
                  <a href={`https://commonchemistry.cas.org/detail?cas_rn=${peptide.cas_number}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                    <span>🧪</span> CAS Registry <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
                {peptide.wikipedia_url && (
                  <a href={peptide.wikipedia_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                    <span>📖</span> Wikipedia <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                )}
                <a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(peptide.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                  <span>📚</span> PubMed Research <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
                <a href={`https://clinicaltrials.gov/search?term=${encodeURIComponent(peptide.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800">
                  <span>🏥</span> ClinicalTrials.gov <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </div>
            </section>

            {/* Scientific props (if no PubChem CID) */}
            {!peptide.pubchem_cid && (peptide.cas_number || peptide.molecular_weight) && (
              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h2 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
                  <FlaskConical className="h-4 w-4 text-blue-400" />
                  Chemical Properties
                </h2>
                <dl className="space-y-2 text-xs">
                  {peptide.cas_number && (
                    <div className="flex justify-between py-1.5 border-b border-zinc-800">
                      <dt className="text-zinc-500">CAS Number</dt>
                      <dd className="font-mono text-zinc-200">{peptide.cas_number}</dd>
                    </div>
                  )}
                  {peptide.molecular_weight && (
                    <div className="flex justify-between py-1.5 border-b border-zinc-800">
                      <dt className="text-zinc-500">Mol. Weight</dt>
                      <dd className="text-zinc-200">{peptide.molecular_weight}</dd>
                    </div>
                  )}
                  {peptide.molecular_formula && (
                    <div className="flex justify-between py-1.5">
                      <dt className="text-zinc-500">Formula</dt>
                      <dd className="font-mono text-zinc-200 break-all text-right max-w-32">{peptide.molecular_formula}</dd>
                    </div>
                  )}
                </dl>
              </section>
            )}
          </div>
        </div>

        {/* Related Peptides */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-400" />
              More in {peptide.category?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p: Peptide) => (
                <PeptideCard key={p.id} peptide={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
