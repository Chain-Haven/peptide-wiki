import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PeptideCard from '@/components/PeptideCard'
import HomeChatPanel from '@/components/HomeChatPanel'
import {
  ArrowRight,
  FlaskConical,
  BookOpen,
  DollarSign,
  Layers,
  CheckCircle,
  XCircle,
  Star,
  BarChart3,
  Calculator,
  Syringe,
  GitCompare,
  ExternalLink,
  Microscope,
  Shield,
  TrendingDown,
  Award,
  Users,
  Globe,
  Sparkles,
} from 'lucide-react'
import type { Category, Peptide, Supplier } from '@/lib/types'
import { STACKS } from '@/data/peptides'

export const revalidate = 3600

async function getHomeData() {
  const [categoriesRes, featuredRes, approvedRes, suppliersRes, studiesRes, peptideCountRes] =
    await Promise.all([
      supabase.from('categories').select('*').order('name'),
      supabase
        .from('peptides')
        .select('*, category:categories(*)')
        .in('slug', ['bpc-157', 'semaglutide', 'ipamorelin', 'epithalon', 'tb-500', 'mk-677'])
        .order('name'),
      supabase
        .from('peptides')
        .select('*, category:categories(*)')
        .in('research_status', ['fda_approved', 'prescription'])
        .order('name')
        .limit(4),
      supabase.from('suppliers').select('*').order('rating', { ascending: false }),
      supabase.from('research_studies').select('id', { count: 'exact', head: true }),
      supabase.from('peptides').select('id', { count: 'exact', head: true }),
    ])

  // Get category peptide counts
  const { data: catCounts } = await supabase
    .from('peptides')
    .select('category_id')

  const countMap: Record<string, number> = {}
  catCounts?.forEach((p: { category_id: string }) => {
    if (p.category_id) countMap[p.category_id] = (countMap[p.category_id] || 0) + 1
  })

  return {
    categories: categoriesRes.data || [],
    featuredPeptides: featuredRes.data || [],
    approvedPeptides: approvedRes.data || [],
    suppliers: suppliersRes.data || [],
    studyCount: studiesRes.count || 0,
    peptideCount: peptideCountRes.count || 0,
    categoryCountMap: countMap,
  }
}

// ─── Clinical Trial Highlight Data ───────────────────────────────────────────

const TRIAL_HIGHLIGHTS = [
  {
    peptide: 'Semaglutide',
    slug: 'semaglutide',
    trial: 'STEP 1 (NEJM 2021)',
    sample: 'n=1,961',
    stat: '−14.9%',
    statLabel: 'body weight',
    detail: 'vs −2.4% placebo',
    badge: 'FDA Approved',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    statColor: 'text-emerald-400',
    icon: TrendingDown,
  },
  {
    peptide: 'Tirzepatide',
    slug: 'tirzepatide',
    trial: 'SURMOUNT-1 (NEJM 2022)',
    sample: 'n=2,539',
    stat: '−22.5%',
    statLabel: 'body weight at 15mg',
    detail: '63% achieved ≥20% loss',
    badge: 'FDA Approved',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    statColor: 'text-emerald-400',
    icon: TrendingDown,
  },
  {
    peptide: 'Tesamorelin',
    slug: 'tesamorelin',
    trial: 'NEJM 2010 (n=816)',
    sample: 'Phase 3 RCT',
    stat: '−13.1%',
    statLabel: 'visceral fat (VAT)',
    detail: 'p<0.001 vs placebo',
    badge: 'FDA Approved',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    statColor: 'text-emerald-400',
    icon: TrendingDown,
  },
  {
    peptide: 'PT-141',
    slug: 'pt-141',
    trial: 'RECONNECT Trials 2019',
    sample: 'n=1,267',
    stat: '85%',
    statLabel: 'erection induction',
    detail: 'vs 15% placebo (p<0.001)',
    badge: 'FDA Approved',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    statColor: 'text-blue-400',
    icon: Award,
  },
  {
    peptide: 'Thymosin Alpha-1',
    slug: 'thymosin-alpha-1',
    trial: 'J Viral Hepatitis 1999',
    sample: 'Phase 3 (n=131)',
    stat: '26%',
    statLabel: 'sustained HBV response',
    detail: 'vs 7% placebo (p<0.05)',
    badge: '37 countries approved',
    badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    statColor: 'text-blue-400',
    icon: Shield,
  },
  {
    peptide: 'Larazotide',
    slug: 'larazotide',
    trial: 'Gastroenterology 2013',
    sample: 'Phase 2b (n=342)',
    stat: '26%',
    statLabel: 'fewer symptomatic days',
    detail: 'celiac disease (p=0.017)',
    badge: 'Phase 3 ongoing',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
    statColor: 'text-purple-400',
    icon: BarChart3,
  },
]

// ─── Tools Data ───────────────────────────────────────────────────────────────

const TOOLS = [
  {
    href: '/calculator',
    icon: Syringe,
    title: 'Syringe Calculator',
    desc: 'Visual draw calculator with 4 syringe types, vial reconstitution, per-mark reference table, and clinical citations.',
    badge: 'New',
    color: 'from-blue-600/10 to-cyan-600/10 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    href: '/calculator',
    icon: Calculator,
    title: 'Dosage Calculator',
    desc: 'Weight-based dosing for all 61 peptides. Conservative / standard / higher protocols. Monthly supply calculator.',
    color: 'from-emerald-600/10 to-green-600/10 border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    href: '/compare',
    icon: GitCompare,
    title: 'Peptide Comparison',
    desc: 'Side-by-side comparison of up to 3 peptides — dosing, half-life, prices, benefits, and side effects.',
    color: 'from-amber-600/10 to-orange-600/10 border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    href: '/stacks',
    icon: Layers,
    title: 'Stack Guide',
    desc: 'Curated peptide stacks for every goal — with rationale, protocols, and phase-by-phase guidance.',
    color: 'from-purple-600/10 to-violet-600/10 border-purple-500/20',
    iconColor: 'text-purple-400',
  },
]

export default async function HomePage() {
  const { categories, featuredPeptides, approvedPeptides, suppliers, studyCount, peptideCount, categoryCountMap } =
    await getHomeData()

  const topStacks = STACKS.slice(0, 3)

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-cyan-500/3 rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 pt-16 pb-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-sm mb-7 shadow-inner">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI-powered · {peptideCount}+ peptides · Real clinical data</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight">
              The complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">
                peptide research
              </span>{' '}
              database
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {peptideCount}+ peptides with mechanisms, clinical trial data, dosage protocols, vendor pricing, molecular structures, and AI-powered answers.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
              <Link href="/peptides"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                Browse All Peptides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-800/80 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors border border-zinc-700">
                <Syringe className="h-4 w-4" /> Syringe Calculator
              </Link>
              <Link href="/vendors"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-800/80 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors border border-zinc-700">
                Compare Vendors
              </Link>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
              {[
                { label: 'Peptides', value: `${peptideCount}+`, icon: FlaskConical },
                { label: 'Categories', value: String(categories.length), icon: Layers },
                { label: 'Vendors', value: String(suppliers.length), icon: DollarSign },
                { label: 'Research Studies', value: `${studyCount}+`, icon: BookOpen },
                { label: 'Clinical Trials', value: '16+', icon: BarChart3 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-center">
                  <Icon className="h-4 w-4 text-blue-400 mx-auto mb-1.5" />
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── AI CHAT ──────────────────── */}
      <section className="py-16 border-b border-zinc-800 bg-gradient-to-b from-zinc-950 to-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs mb-4">
                <Sparkles className="h-3 w-3" /> AI-Powered
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Ask PeptideWiki AI</h2>
              <p className="text-zinc-400">
                Instantly answer any question about peptides — mechanisms, dosing, reconstitution, stacks, vendors, and clinical data — powered by our full database.
              </p>
            </div>
            <HomeChatPanel />
          </div>
        </div>
      </section>

      {/* ──────────────────── CLINICAL DATA ──────────────────── */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">Evidence-Based</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Landmark Clinical Trial Results</h2>
              <p className="text-zinc-400 text-sm mt-1">Real data from peer-reviewed trials and FDA submissions</p>
            </div>
            <Link href="/peptides" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors flex-shrink-0">
              Browse all peptide research <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRIAL_HIGHLIGHTS.map(trial => {
              const Icon = trial.icon
              return (
                <Link
                  key={trial.slug}
                  href={`/peptides/${trial.slug}`}
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all overflow-hidden"
                >
                  {/* Background number */}
                  <div className="absolute right-3 bottom-2 text-6xl font-black text-zinc-800/60 group-hover:text-zinc-700/60 transition-colors select-none pointer-events-none leading-none">
                    {trial.stat}
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${trial.badgeColor}`}>
                        {trial.badge}
                      </span>
                      <Icon className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>

                    <div className={`text-4xl font-black mb-1 ${trial.statColor}`}>
                      {trial.stat}
                    </div>
                    <p className="text-sm font-medium text-white mb-0.5">{trial.statLabel}</p>
                    <p className="text-xs text-zinc-500">{trial.detail}</p>

                    <div className="mt-4 pt-3 border-t border-zinc-800">
                      <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{trial.peptide}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{trial.trial} · {trial.sample}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── CATEGORIES ──────────────────── */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
              <p className="text-zinc-400 text-sm mt-1">Find peptides by their primary use case</p>
            </div>
            <Link href="/peptides" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
              All peptides <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat: Category) => {
              const count = categoryCountMap[cat.id] || 0
              return (
                <Link
                  key={cat.slug}
                  href={`/peptides?category=${cat.slug}`}
                  className="group flex flex-col items-center gap-2 p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-center"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors leading-tight">
                    {cat.name}
                  </span>
                  {count > 0 && (
                    <span className="text-xs text-zinc-600 group-hover:text-zinc-500 transition-colors">
                      {count} peptide{count !== 1 ? 's' : ''}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── VENDORS ──────────────────── */}
      <section className="py-16 border-b border-zinc-800 bg-zinc-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-400" />
                <span className="text-xs text-blue-400 uppercase tracking-wider font-medium">Price Comparison</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Trusted Peptide Vendors</h2>
              <p className="text-zinc-400 text-sm mt-1">
                {suppliers.length} vetted vendors — ranked by rating, COA testing, and reliability
              </p>
            </div>
            <Link href="/vendors"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0">
              Full Vendor Comparison <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier: Supplier, i: number) => {
              const hasCrypto = supplier.payment_methods?.some(
                m => m.toLowerCase().includes('crypto') || m.toLowerCase().includes('bitcoin')
              )
              return (
                <div key={supplier.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-400 flex-shrink-0">
                        #{i + 1}
                      </div>
                      <div>
                        <a href={supplier.url} target="_blank" rel="noopener noreferrer"
                          className="font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-1">
                          {supplier.name}
                          <ExternalLink className="h-3 w-3 text-zinc-600" />
                        </a>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {supplier.url?.replace('https://', '').replace('http://', '')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-white">{supplier.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {supplier.has_coa && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="h-3 w-3" /> COA Verified
                      </span>
                    )}
                    {supplier.ships_internationally && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Globe className="h-3 w-3" /> Ships Worldwide
                      </span>
                    )}
                    {hasCrypto && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                        ₿ Crypto
                      </span>
                    )}
                  </div>

                  {/* Payment methods preview */}
                  <div className="text-xs text-zinc-500 mb-4">
                    {supplier.payment_methods?.slice(0, 3).join(' · ')}
                    {(supplier.payment_methods?.length || 0) > 3 && ` +${(supplier.payment_methods?.length || 0) - 3} more`}
                  </div>

                  {/* CTA */}
                  <a href={supplier.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-xs font-medium rounded-lg transition-colors">
                    Visit {supplier.name} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )
            })}
          </div>

          <p className="text-center text-xs text-zinc-600 mt-6">
            Vendor ratings and data are for informational purposes only. Always verify COA before purchasing.
          </p>
        </div>
      </section>

      {/* ──────────────────── FEATURED PEPTIDES ──────────────────── */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Most Researched Peptides</h2>
              <p className="text-zinc-400 text-sm mt-1">Most-studied compounds in the research community</p>
            </div>
            <Link href="/peptides" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
              View all {peptideCount}+ <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPeptides.map((peptide: Peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── POPULAR STACKS ──────────────────── */}
      <section className="py-16 border-b border-zinc-800 bg-zinc-900/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Popular Peptide Stacks</h2>
              <p className="text-zinc-400 text-sm mt-1">Curated combinations for specific goals</p>
            </div>
            <Link href="/stacks" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
              View all stacks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topStacks.map(stack => (
              <Link key={stack.slug} href="/stacks"
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition-all">
                <h3 className="font-semibold text-white mb-1.5 group-hover:text-blue-400 transition-colors">
                  {stack.name}
                </h3>
                <p className="text-xs text-blue-400 mb-3">{stack.goal}</p>
                <p className="text-sm text-zinc-400 mb-5 leading-relaxed line-clamp-2">{stack.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.peptides.map(peptideSlug => (
                    <span key={peptideSlug}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 capitalize">
                      <FlaskConical className="h-2.5 w-2.5 text-blue-400" />
                      {peptideSlug.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── TOOLS ──────────────────── */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Research Tools</h2>
            <p className="text-zinc-400">Everything you need to plan and execute peptide research protocols</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map(tool => {
              const Icon = tool.icon
              return (
                <Link key={tool.href + tool.title} href={tool.href}
                  className={`group relative bg-gradient-to-br ${tool.color} border rounded-xl p-6 hover:scale-[1.02] transition-all overflow-hidden`}>
                  {tool.badge && (
                    <span className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full font-bold">
                      {tool.badge}
                    </span>
                  )}
                  <Icon className={`h-8 w-8 mb-4 ${tool.iconColor}`} />
                  <h3 className="font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{tool.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Open tool <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────── FDA APPROVED ──────────────────── */}
      {approvedPeptides.length > 0 && (
        <section className="py-16 border-b border-zinc-800 bg-zinc-900/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 uppercase tracking-wider font-medium">Clinically Validated</span>
                </div>
                <h2 className="text-2xl font-bold text-white">FDA Approved & Prescription Peptides</h2>
                <p className="text-zinc-400 text-sm mt-1">
                  These peptides have passed rigorous clinical trials and regulatory review
                </p>
              </div>
              <Link href="/peptides?status=fda_approved"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors flex-shrink-0">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {approvedPeptides.map((peptide: Peptide) => (
                <PeptideCard key={peptide.id} peptide={peptide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────── TRUST / INFO ──────────────────── */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Microscope,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10 border-blue-500/20',
                title: 'Evidence-Based Database',
                desc: 'Every entry is backed by peer-reviewed research. Clinical trial data includes sample sizes, p-values, confidence intervals, and DOI links.',
              },
              {
                icon: BarChart3,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10 border-emerald-500/20',
                title: 'Real Clinical Trial Data',
                desc: `${studyCount}+ research studies including Phase 2 and Phase 3 RCTs from NEJM, JAMA, The Lancet, and other top journals.`,
              },
              {
                icon: Shield,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10 border-amber-500/20',
                title: 'Research Use Only',
                desc: 'All information is for educational and research purposes. Always consult a qualified healthcare professional before using any compound.',
              },
            ].map(f => {
              const Icon = f.icon
              return (
                <div key={f.title} className={`p-6 rounded-xl border ${f.bg}`}>
                  <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/60 via-zinc-900 to-blue-950/60 border border-blue-500/20 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Start your peptide research
              </h2>
              <p className="text-zinc-400 mb-7 max-w-xl mx-auto">
                Browse {peptideCount}+ peptides with full scientific profiles, or ask PeptideWiki AI for personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/peptides"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                  Browse Peptide Database <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/calculator"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors border border-zinc-700">
                  Open Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
