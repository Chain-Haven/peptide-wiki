import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  FlaskConical,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  DollarSign,
  Layers,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { getResearchStatusColor, getResearchStatusLabel, formatPrice } from '@/lib/utils'
import type { Peptide, Price, ResearchStudy } from '@/lib/types'

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
    title: data.name,
    description: data.summary,
  }
}

async function getPeptide(slug: string) {
  const { data, error } = await supabase
    .from('peptides')
    .select('*, category:categories(*), prices(*, supplier:suppliers(*)), research_studies(*)')
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

const studyTypeColors: Record<string, string> = {
  clinical_trial: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  human: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  animal: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  in_vitro: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  review: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
}

const studyTypeLabels: Record<string, string> = {
  clinical_trial: 'Clinical Trial',
  human: 'Human Study',
  animal: 'Animal Study',
  in_vitro: 'In Vitro',
  review: 'Review',
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
  const lowestPrice = peptide.prices?.length
    ? Math.min(...peptide.prices.map((p: Price) => p.price))
    : null

  const sortedPrices = [...(peptide.prices || [])].sort((a: Price, b: Price) => a.price - b.price)
  const dosage = peptide.dosage_info as {
    min_dose?: number | null
    max_dose?: number | null
    unit?: string
    frequency?: string
    notes?: string
    weight_based?: boolean
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <FlaskConical className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{peptide.name}</h1>
              {peptide.aliases?.length > 0 && (
                <p className="text-sm text-zinc-500">
                  Also known as: {peptide.aliases.join(', ')}
                </p>
              )}
            </div>
          </div>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl">{peptide.summary}</p>
        </div>
        <div className="flex flex-col gap-3 md:min-w-48">
          <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full border text-sm font-medium ${getResearchStatusColor(peptide.research_status)}`}>
            {getResearchStatusLabel(peptide.research_status)}
          </span>
          {lowestPrice && (
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
              <div className="text-xs text-zinc-500 mb-0.5">From</div>
              <div className="text-xl font-bold text-white">{formatPrice(lowestPrice)}</div>
              <div className="text-xs text-zinc-500">{sortedPrices.length} vendors</div>
            </div>
          )}
          {peptide.category && (
            <Link
              href={`/peptides?category=${peptide.category.slug}`}
              className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors"
            >
              <span className="text-lg">{peptide.category.icon}</span>
              <span className="text-sm text-zinc-300">{peptide.category.name}</span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mechanism */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-400" />
              Mechanism of Action
            </h2>
            <p className="text-zinc-300 leading-relaxed">{peptide.mechanism}</p>
          </section>

          {/* Benefits & Side Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Benefits */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                Benefits
              </h2>
              <ul className="space-y-2">
                {peptide.benefits?.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            {/* Side Effects */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Side Effects
              </h2>
              <ul className="space-y-2">
                {peptide.side_effects?.map((effect: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {effect}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Research Studies */}
          {peptide.research_studies?.length > 0 && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Research Studies
              </h2>
              <div className="space-y-4">
                {peptide.research_studies.map((study: ResearchStudy) => (
                  <div key={study.id} className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-medium text-white text-sm leading-snug flex-1">{study.title}</h3>
                      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border ${studyTypeColors[study.study_type] || studyTypeColors.review}`}>
                        {studyTypeLabels[study.study_type] || study.study_type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 mb-2">
                      {study.authors} · {study.journal} ({study.year})
                    </p>
                    <p className="text-sm text-zinc-400">{study.summary}</p>
                    {study.doi && (
                      <a
                        href={`https://doi.org/${study.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                      >
                        View paper <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prices */}
          {sortedPrices.length > 0 && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-400" />
                Price Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
                      <th className="pb-2 pr-4">Vendor</th>
                      <th className="pb-2 pr-4">Form</th>
                      <th className="pb-2 pr-4">Quantity</th>
                      <th className="pb-2 pr-4">Price</th>
                      <th className="pb-2">COA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {sortedPrices.map((price: Price) => (
                      <tr key={price.id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3 pr-4">
                          <a
                            href={price.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            {price.supplier?.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </td>
                        <td className="py-3 pr-4 text-zinc-400 capitalize">{price.form?.replace('_', ' ')}</td>
                        <td className="py-3 pr-4 text-zinc-400">{price.quantity_mg}mg</td>
                        <td className="py-3 pr-4 font-semibold text-white">{formatPrice(price.price)}</td>
                        <td className="py-3 text-xs">
                          {price.supplier?.has_coa ? (
                            <span className="text-emerald-400">✓ COA</span>
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Dosage Info */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Dosage Protocol
            </h2>
            <dl className="space-y-3">
              {dosage?.min_dose != null && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Dose Range</dt>
                  <dd className="text-sm text-zinc-200">
                    {dosage.min_dose}
                    {dosage.max_dose && dosage.max_dose !== dosage.min_dose && `–${dosage.max_dose}`}{' '}
                    {dosage.unit}
                    {dosage.weight_based && '/kg'}
                  </dd>
                </div>
              )}
              {dosage?.frequency && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Frequency</dt>
                  <dd className="text-sm text-zinc-200">{dosage.frequency}</dd>
                </div>
              )}
              {peptide.cycle_length && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Cycle Length</dt>
                  <dd className="text-sm text-zinc-200">{peptide.cycle_length}</dd>
                </div>
              )}
              {peptide.half_life && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Half-Life</dt>
                  <dd className="text-sm text-zinc-200">{peptide.half_life}</dd>
                </div>
              )}
              {peptide.administration_routes?.length > 0 && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Administration</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {peptide.administration_routes.map((route: string) => (
                      <span key={route} className="text-xs bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-300 capitalize">
                        {route}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {dosage?.notes && (
                <div>
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Notes</dt>
                  <dd className="text-xs text-zinc-400 leading-relaxed">{dosage.notes}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Molecular Info */}
          {(peptide.molecular_formula || peptide.half_life) && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4 text-sm">Molecular Information</h2>
              <dl className="space-y-2">
                {peptide.molecular_formula && (
                  <div>
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Molecular Formula</dt>
                    <dd className="text-sm text-zinc-200 font-mono">{peptide.molecular_formula}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {/* Stack With */}
          {peptide.stack_with?.length > 0 && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
                <Layers className="h-4 w-4 text-blue-400" />
                Commonly Stacked With
              </h2>
              <div className="flex flex-wrap gap-2">
                {peptide.stack_with.map((stackSlug: string) => (
                  <Link
                    key={stackSlug}
                    href={`/peptides/${stackSlug}`}
                    className="text-xs px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors capitalize"
                  >
                    {stackSlug.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
              <Link href="/stacks" className="block mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                View all stacks →
              </Link>
            </section>
          )}

          {/* Disclaimer */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <p className="text-xs text-amber-400/80 leading-relaxed">
              <strong>Research Use Only.</strong> This information is for educational purposes. Not medical advice. Consult a healthcare professional before using any peptide.
            </p>
          </div>
        </div>
      </div>

      {/* Related Peptides */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-400" />
            Related Peptides in {peptide.category?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <PeptideCard key={p.id} peptide={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Import needed for related peptide cards
import PeptideCard from '@/components/PeptideCard'
