import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import { GUIDES, GUIDE_CATEGORIES } from '@/data/guides'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Peptide Guides — Dosage, Reconstitution, Stacks & Comparisons',
  description:
    'In-depth, evidence-based peptide guides: how to reconstitute and dose peptides, the best peptides for weight loss and recovery, stack protocols, and head-to-head comparisons.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Peptide Guides — PeptideWiki',
    description: 'Evidence-based guides on peptide dosing, reconstitution, stacks, and comparisons.',
    url: '/guides',
    type: 'website',
  },
}

const CATEGORY_BLURB: Record<string, string> = {
  'How-To': 'Step-by-step process guides',
  Dosage: 'Research dosing protocols',
  'Best Peptides': 'Evidence-based roundups by goal',
  Comparison: 'Head-to-head breakdowns',
  Stacks: 'Combination protocols',
}

export default function GuidesPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/guides')}#webpage`,
    url: absoluteUrl('/guides'),
    name: 'Peptide Guides',
    description: metadata.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    hasPart: GUIDES.map(g => ({
      '@type': 'Article',
      headline: g.title,
      url: absoluteUrl(`/guides/${g.slug}`),
    })),
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <JsonLd id="schema-guides-index" data={collectionSchema} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-7 w-7 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Peptide Guides</h1>
          </div>
          <p className="text-zinc-400 max-w-2xl">
            Evidence-based, research-focused guides on dosing, reconstitution, stacks, and
            head-to-head comparisons — written to be genuinely useful and properly cited.
          </p>
        </div>

        {GUIDE_CATEGORIES.map(category => {
          const guides = GUIDES.filter(g => g.category === category)
          if (guides.length === 0) return null
          return (
            <section key={category} className="mb-12">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <span className="text-sm text-zinc-500">{CATEGORY_BLURB[category]}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map(guide => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all"
                  >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="h-3 w-3" /> {guide.readingTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
