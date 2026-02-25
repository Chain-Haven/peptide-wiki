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
  Microscope,
  BarChart3,
  Globe,
  Shield,
} from 'lucide-react'
import { getResearchStatusColor, getResearchStatusLabel, formatPrice } from '@/lib/utils'
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
  const { data } = await supabase
    .from('peptides')
    .select('name, summary, cas_number, molecular_weight')
    .eq('slug', slug)
    .single()
  if (!data) return { title: 'Peptide Not Found' }
  return {
    title: `${data.name} — Mechanism, Dosage & Research`,
    description: data.summary,
  }
}

async function getPeptide(slug: string) {
  const { data, error } = await supabase
    .from('peptides')
    .select(`
      *,
      category:categories(*),
      prices(*, supplier:suppliers(*)),
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

  // Sort research studies: clinical trials first, then by year descending
  const sortedStudies = [...(peptide.research_studies || [])].sort((a: ResearchStudy, b: ResearchStudy) => {
    const typeOrder: Record<string, number> = { clinical_trial: 0, human: 1, animal: 2, in_vitro: 3, review: 4 }
    const aOrder = typeOrder[a.study_type] ?? 5
    const bOrder = typeOrder[b.study_type] ?? 5
    if (aOrder !== bOrder) return aOrder - bOrder
    return (b.year || 0) - (a.year || 0)
  })

  const clinicalTrials = sortedStudies.filter(s => s.study_type === 'clinical_trial')
  const otherStudies = sortedStudies.filter(s => s.study_type !== 'clinical_trial')

  const statusColor = getResearchStatusColor(peptide.research_status)
  const statusLabel = getResearchStatusLabel(peptide.research_status)

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/peptides" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Peptides
        </Link>
        <span>/</span>
        {peptide.category && (
          <>
            <Link
              href={`/peptides?category=${peptide.category.slug}`}
              className="hover:text-zinc-300 transition-colors"
            >
              {peptide.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-zinc-300">{peptide.name}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <FlaskConical className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{peptide.name}</h1>
              {peptide.aliases?.length > 0 && (
                <p className="text-sm text-zinc-500 mt-0.5">
                  Also known as: {peptide.aliases.join(', ')}
                </p>
              )}
            </div>
          </div>

          <p className="text-zinc-300 text-lg leading-relaxed max-w-3xl mb-4">{peptide.summary}</p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-3">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${statusColor}`}>
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              {statusLabel}
            </span>
            {peptide.category && (
              <Link
                href={`/peptides?category=${peptide.category.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
              >
                <span>{peptide.category.icon}</span>
                {peptide.category.name}
              </Link>
            )}
            {peptide.amino_acid_count != null && peptide.amino_acid_count > 0 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-400">
                {peptide.amino_acid_count}-amino acid peptide
              </span>
            )}
            {peptide.molecular_weight && (
              <span className="inline-flex items-center px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-400 font-mono">
                MW: {peptide.molecular_weight}
              </span>
            )}
            {lowestPrice && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300">
                From <strong className="text-white">{formatPrice(lowestPrice)}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Main column (3/4 width) */}
        <div className="xl:col-span-3 space-y-6">

          {/* Mechanism of Action */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Microscope className="h-5 w-5 text-blue-400" />
              Mechanism of Action
            </h2>
            <p className="text-zinc-300 leading-relaxed">{peptide.mechanism}</p>
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

          {/* Clinical Trials Section */}
          {clinicalTrials.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Clinical Trials & Human Studies
                <span className="text-xs font-normal text-zinc-500 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-full">
                  {clinicalTrials.length} {clinicalTrials.length === 1 ? 'trial' : 'trials'}
                </span>
              </h2>
              <div className="space-y-4">
                {clinicalTrials.map((study: ResearchStudy) => (
                  <ClinicalTrialCard key={study.id} study={study} />
                ))}
              </div>
            </section>
          )}

          {/* Other Research Studies */}
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

          {/* Price Comparison */}
          {sortedPrices.length > 0 && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-400" />
                Price Comparison
                <span className="text-xs font-normal text-zinc-500 ml-1">
                  {sortedPrices.length} vendor{sortedPrices.length !== 1 ? 's' : ''}
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800 uppercase tracking-wider">
                      <th className="pb-3 pr-4">Vendor</th>
                      <th className="pb-3 pr-4">Form</th>
                      <th className="pb-3 pr-4">Quantity</th>
                      <th className="pb-3 pr-4">Price</th>
                      <th className="pb-3 pr-4">Per mg</th>
                      <th className="pb-3">COA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {sortedPrices.map((price: Price, i: number) => {
                      const perMg = price.quantity_mg > 0 ? price.price / price.quantity_mg : null
                      const isBest = i === 0
                      return (
                        <tr
                          key={price.id}
                          className={`hover:bg-zinc-800/30 transition-colors ${isBest ? 'bg-emerald-500/3' : ''}`}
                        >
                          <td className="py-3 pr-4">
                            <a
                              href={price.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                            >
                              {price.supplier?.name}
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          </td>
                          <td className="py-3 pr-4 text-zinc-400 capitalize text-xs">{price.form?.replace('_', ' ')}</td>
                          <td className="py-3 pr-4 text-zinc-300">{price.quantity_mg}mg</td>
                          <td className="py-3 pr-4">
                            <span className="font-semibold text-white">{formatPrice(price.price)}</span>
                            {isBest && (
                              <span className="ml-1.5 text-xs text-emerald-400 font-medium">Best</span>
                            )}
                          </td>
                          <td className="py-3 pr-4 text-zinc-400 text-xs">
                            {perMg ? `${formatPrice(perMg)}/mg` : '—'}
                          </td>
                          <td className="py-3 text-xs">
                            {price.supplier?.has_coa ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> COA
                              </span>
                            ) : (
                              <span className="text-zinc-600">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link href="/vendors" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                  Compare all vendors → /vendors
                </Link>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar (1/4 width) */}
        <div className="space-y-4">

          {/* Molecular Structure Viewer */}
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

          {/* For peptides without PubChem CID, still show scientific properties */}
          {!peptide.pubchem_cid && (peptide.cas_number || peptide.molecular_weight || peptide.wikipedia_url) && (
            <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-blue-400" />
                Scientific Properties
              </h2>
              <dl className="space-y-3 text-sm">
                {peptide.cas_number && (
                  <div className="py-2 border-b border-zinc-800">
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">CAS Number</dt>
                    <dd className="text-zinc-200 font-mono text-xs">{peptide.cas_number}</dd>
                  </div>
                )}
                {peptide.molecular_weight && (
                  <div className="py-2 border-b border-zinc-800">
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Molecular Weight</dt>
                    <dd className="text-zinc-200 text-xs">{peptide.molecular_weight}</dd>
                  </div>
                )}
                {peptide.molecular_formula && (
                  <div className="py-2 border-b border-zinc-800">
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Mol. Formula</dt>
                    <dd className="text-zinc-200 font-mono text-xs break-all">{peptide.molecular_formula}</dd>
                  </div>
                )}
                {peptide.amino_acid_count != null && peptide.amino_acid_count > 0 && (
                  <div className="py-2 border-b border-zinc-800">
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Amino Acids</dt>
                    <dd className="text-zinc-200 text-xs">{peptide.amino_acid_count} amino acids</dd>
                  </div>
                )}
                {peptide.wikipedia_url && (
                  <div className="py-2">
                    <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Wikipedia</dt>
                    <dd>
                      <a
                        href={peptide.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" /> View article <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {/* Dosage Protocol */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              Research Protocol
            </h2>
            <dl className="space-y-3">
              {dosage?.min_dose != null && (
                <div className="py-2 border-b border-zinc-800">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Dose Range</dt>
                  <dd className="text-sm text-zinc-200 font-medium">
                    {dosage.min_dose}
                    {dosage.max_dose && dosage.max_dose !== dosage.min_dose && `–${dosage.max_dose}`}{' '}
                    {dosage.unit}
                    {dosage.weight_based && '/kg'}
                  </dd>
                </div>
              )}
              {dosage?.frequency && (
                <div className="py-2 border-b border-zinc-800">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Frequency</dt>
                  <dd className="text-sm text-zinc-200">{dosage.frequency}</dd>
                </div>
              )}
              {peptide.cycle_length && (
                <div className="py-2 border-b border-zinc-800">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Cycle Length</dt>
                  <dd className="text-sm text-zinc-200">{peptide.cycle_length}</dd>
                </div>
              )}
              {peptide.half_life && (
                <div className="py-2 border-b border-zinc-800">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Half-Life</dt>
                  <dd className="text-sm text-zinc-200">{peptide.half_life}</dd>
                </div>
              )}
              {peptide.administration_routes?.length > 0 && (
                <div className="py-2 border-b border-zinc-800">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5">Administration</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {peptide.administration_routes.map((route: string) => (
                      <span
                        key={route}
                        className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-2.5 py-1 text-zinc-300 capitalize"
                      >
                        {route}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {dosage?.notes && (
                <div className="py-2">
                  <dt className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Notes</dt>
                  <dd className="text-xs text-zinc-400 leading-relaxed">{dosage.notes}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4">
              <Link
                href={`/calculator`}
                className="flex items-center justify-center gap-1.5 w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-xs font-medium rounded-lg transition-colors"
              >
                Open Dosage Calculator →
              </Link>
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

          {/* External Resources */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-blue-400" />
              External Resources
            </h2>
            <div className="space-y-2">
              {peptide.pubchem_cid && (
                <a
                  href={`https://pubchem.ncbi.nlm.nih.gov/compound/${peptide.pubchem_cid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
                >
                  <span className="text-base">🔬</span>
                  PubChem Database
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {peptide.cas_number && (
                <a
                  href={`https://commonchemistry.cas.org/detail?cas_rn=${peptide.cas_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
                >
                  <span className="text-base">🧪</span>
                  CAS Registry
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {peptide.wikipedia_url && (
                <a
                  href={peptide.wikipedia_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
                >
                  <span className="text-base">📖</span>
                  Wikipedia
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(peptide.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
              >
                <span className="text-base">📚</span>
                PubMed Search
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
              <a
                href={`https://clinicaltrials.gov/search?term=${encodeURIComponent(peptide.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
              >
                <span className="text-base">🏥</span>
                ClinicalTrials.gov
                <ExternalLink className="h-3 w-3 ml-auto" />
              </a>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <p className="text-xs text-amber-400/80 leading-relaxed">
              <strong>Research Use Only.</strong> All information is for educational purposes only. Not medical advice. Consult a healthcare professional before using any peptide.
            </p>
          </div>
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
  )
}
