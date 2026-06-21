import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Clock, Calendar, FlaskConical, HelpCircle } from 'lucide-react'
import { GUIDES, getGuide } from '@/data/guides'
import { supabase } from '@/lib/supabase'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, SITE_NAME, absoluteUrl } from '@/lib/site'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return { title: 'Guide Not Found', robots: { index: false, follow: false } }
  const canonical = `/guides/${slug}`
  return {
    title: guide.metaTitle ?? guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle ?? guide.title,
      description: guide.description,
    },
  }
}

async function getRelatedPeptideNames(slugs: string[]): Promise<{ name: string; slug: string }[]> {
  if (slugs.length === 0) return []
  try {
    const { data } = await supabase.from('peptides').select('name, slug').in('slug', slugs)
    // Preserve the order declared in the guide.
    return slugs
      .map(s => (data ?? []).find((p: { slug: string }) => p.slug === s))
      .filter(Boolean) as { name: string; slug: string }[]
  } catch {
    return []
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const related = await getRelatedPeptideNames(guide.relatedPeptides)
  const canonicalUrl = absoluteUrl(`/guides/${slug}`)
  const modified = '2026-06-21'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: absoluteUrl('/guides') },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: guide.title,
    description: guide.description,
    inLanguage: 'en-US',
    url: canonicalUrl,
    datePublished: modified,
    dateModified: modified,
    mainEntityOfPage: canonicalUrl,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    keywords: guide.keywords.join(', '),
  }

  const faqSchema =
    guide.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: guide.faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null

  const schema = [breadcrumbSchema, articleSchema, ...(faqSchema ? [faqSchema] : [])]

  return (
    <div className="min-h-screen bg-zinc-950">
      <JsonLd id="schema-guide" data={schema} />
      <article className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/guides" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Guides
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{guide.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            {guide.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{guide.title}</h1>
          <p className="text-lg text-zinc-400 leading-relaxed">{guide.description}</p>
          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-zinc-500">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {guide.readingTime} read</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Updated {guide.updated}</span>
            <span>By the {SITE_NAME} Research Team</span>
          </div>
        </header>

        {/* Body */}
        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{guide.content}</ReactMarkdown>
        </div>

        {/* FAQ */}
        {guide.faqs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-400" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {guide.faqs.map((f, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2">{f.q}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related peptides */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-zinc-800">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-400" /> Peptides in this guide
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/peptides/${p.slug}`}
                  className="text-sm px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-amber-500/5 border border-amber-500/15 rounded-xl">
          <p className="text-xs text-amber-400/80 leading-relaxed">
            For research and educational purposes only. Not medical advice and not for human
            consumption. Always consult a qualified healthcare professional. See our{' '}
            <Link href="/medical-disclaimer" className="underline">Medical Disclaimer</Link>.
          </p>
        </div>
      </article>
    </div>
  )
}
