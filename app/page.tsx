import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PeptideCard from '@/components/PeptideCard'
import { ArrowRight, FlaskConical, Search, BookOpen, DollarSign, Layers } from 'lucide-react'
import type { Category, Peptide } from '@/lib/types'

export const revalidate = 3600

async function getHomeData() {
  const [categoriesRes, peptides1Res, peptides2Res] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase
      .from('peptides')
      .select('*, category:categories(*)')
      .in('slug', ['bpc-157', 'semaglutide', 'ipamorelin', 'epithalon', 'tb-500', 'mk-677'])
      .order('name'),
    supabase
      .from('peptides')
      .select('*, category:categories(*)')
      .in('research_status', ['fda_approved', 'clinical_trials'])
      .limit(3),
  ])

  return {
    categories: categoriesRes.data || [],
    featuredPeptides: peptides1Res.data || [],
    approvedPeptides: peptides2Res.data || [],
  }
}

export default async function HomePage() {
  const { categories, featuredPeptides, approvedPeptides } = await getHomeData()

  const stats = [
    { label: 'Peptides', value: '40+', icon: FlaskConical },
    { label: 'Categories', value: '9', icon: Layers },
    { label: 'Vendors Tracked', value: '8', icon: DollarSign },
    { label: 'Research Studies', value: '14+', icon: BookOpen },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
              <FlaskConical className="h-3.5 w-3.5" />
              The Complete Peptide Research Database
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Everything you need to know about{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                peptides
              </span>
            </h1>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              Comprehensive research database covering 40+ peptides with mechanisms, dosage protocols,
              clinical evidence, vendor pricing, and stack recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/peptides"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
              >
                Browse All Peptides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/stacks"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors border border-zinc-700"
              >
                View Popular Stacks
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div className="flex justify-center mb-2">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
              <p className="text-zinc-400 text-sm mt-1">Find peptides by their primary use case</p>
            </div>
            <Link href="/peptides" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat: Category) => (
              <Link
                key={cat.slug}
                href={`/peptides?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-center"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Peptides */}
      <section className="py-16 border-b border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">Most Researched Peptides</h2>
              <p className="text-zinc-400 text-sm mt-1">The most popular peptides in the research community</p>
            </div>
            <Link href="/peptides" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPeptides.map((peptide: Peptide) => (
              <PeptideCard key={peptide.id} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* FDA Approved / Clinical Trials */}
      {approvedPeptides.length > 0 && (
        <section className="py-16 border-b border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Clinically Validated</h2>
                <p className="text-zinc-400 text-sm mt-1">FDA-approved or in clinical trials</p>
              </div>
              <Link
                href="/peptides?status=fda_approved"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedPeptides.map((peptide: Peptide) => (
                <PeptideCard key={peptide.id} peptide={peptide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features / CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔬',
                title: 'Evidence-Based',
                desc: 'Every peptide entry includes mechanism of action, clinical research, and study references.',
              },
              {
                icon: '💰',
                title: 'Price Comparison',
                desc: 'Compare prices across 8+ top vendors to find the best value for your research.',
              },
              {
                icon: '📊',
                title: 'Dosage Protocols',
                desc: 'Detailed dosage information and a calculator to help plan your research protocols.',
              },
            ].map(f => (
              <div key={f.title} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
