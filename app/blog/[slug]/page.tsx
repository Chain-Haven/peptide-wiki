import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ArrowLeft, Calendar, Clock, Tag, ExternalLink, BookOpen,
  CheckCircle, AlertTriangle, ChevronDown, FlaskConical,
} from 'lucide-react'

export const revalidate = 3600

interface Section {
  heading: string
  content: string
  image_url?: string
  image_alt?: string
  type?: 'text' | 'warning' | 'callout'
}

interface FaqItem {
  question: string
  answer: string
}

interface Source {
  title: string
  url: string
  description?: string
  year?: number
  type?: string
}

interface InternalLink {
  text: string
  href: string
  description?: string
}

interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  category: string
  read_time: string
  tags: string[]
  featured: boolean
  intro: string
  sections: Section[]
  conclusion: string
  key_takeaways: string[]
  faq_items: FaqItem[]
  sources: Source[]
  internal_links: InternalLink[]
  related_peptide_slugs: string[]
  hero_image_url: string | null
  hero_image_alt: string | null
  seo_keywords: string[]
  schema_data: Record<string, unknown> | null
  published_at: string
  word_count: number
}

export async function generateStaticParams() {
  const { data } = await supabase.from('blog_posts').select('slug').eq('status', 'published')
  return (data || []).map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from('blog_posts')
    .select('title, description, hero_image_url, seo_keywords, published_at')
    .eq('slug', slug)
    .single()
  if (!data) return { title: 'Article Not Found' }

  return {
    title: data.title,
    description: data.description,
    keywords: data.seo_keywords || [],
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://peptide-wiki.org/blog/${slug}`,
      type: 'article',
      publishedTime: data.published_at,
      images: data.hero_image_url ? [{ url: data.hero_image_url, width: 1344, height: 768 }] : [],
    },
    alternates: { canonical: `https://peptide-wiki.org/blog/${slug}` },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const mdComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-white mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-zinc-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-1.5 mb-4 pl-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-1.5 mb-4 pl-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="flex items-start gap-2 text-zinc-300 text-sm">
      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-zinc-300">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-xs font-mono text-emerald-400">{children}</code>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-4 bg-blue-500/5 rounded-r-lg italic text-zinc-300">{children}</blockquote>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-zinc-700">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-zinc-800 text-zinc-300">{children}</thead>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <tbody className="divide-y divide-zinc-800">{children}</tbody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="hover:bg-zinc-800/50 transition-colors">{children}</tr>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-zinc-400">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-zinc-300">{children}</td>
  ),
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) notFound()
  const post = data as BlogPost

  // Fetch related peptides if any
  let relatedPeptides: Array<{ name: string; slug: string; summary: string }> = []
  if (post.related_peptide_slugs?.length > 0) {
    const { data: peptides } = await supabase
      .from('peptides')
      .select('name, slug, summary')
      .in('slug', post.related_peptide_slugs)
    relatedPeptides = peptides || []
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Organization', name: 'PeptideWiki Research Team' },
    publisher: {
      '@type': 'Organization',
      name: 'PeptideWiki',
      url: 'https://peptide-wiki.org',
    },
    image: post.hero_image_url || undefined,
    keywords: post.seo_keywords?.join(', '),
    url: `https://peptide-wiki.org/blog/${slug}`,
    ...(post.schema_data || {}),
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      {post.hero_image_url && (
        <div className="relative h-80 md:h-[440px] overflow-hidden">
          <Image
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/blog" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-300 truncate">{post.title}</span>
        </div>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            {post.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs rounded-full">
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-5">{post.description}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500 pb-5 border-b border-zinc-800">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.read_time}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-600">
              By PeptideWiki Research Team
            </span>
          </div>
        </header>

        {/* Key takeaways */}
        {post.key_takeaways?.length > 0 && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mb-8">
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Key Takeaways
            </h2>
            <ul className="space-y-2">
              {post.key_takeaways.map((tk, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  {tk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of contents */}
        {post.sections?.length > 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> In This Article
            </h2>
            <ol className="space-y-1.5">
              {post.sections.map((section, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-sm text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-xs text-zinc-600 font-mono w-4">{i + 1}.</span>
                    {section.heading}
                  </a>
                </li>
              ))}
              {post.faq_items?.length > 0 && (
                <li>
                  <a href="#faq" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="text-xs text-zinc-600 font-mono w-4">{(post.sections?.length || 0) + 1}.</span>
                    Frequently Asked Questions
                  </a>
                </li>
              )}
            </ol>
          </div>
        )}

        {/* Intro */}
        {post.intro && (
          <div className="text-zinc-300 leading-relaxed text-lg mb-8 prose-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
              {post.intro}
            </ReactMarkdown>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-10">
          {post.sections?.map((section, i) => (
            <section key={i} id={`section-${i}`}>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-start gap-3">
                <span className="flex-shrink-0 text-blue-400 text-sm font-mono mt-1.5">0{i + 1}</span>
                {section.heading}
              </h2>

              {section.image_url && (
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-5 border border-zinc-800">
                  <Image
                    src={section.image_url}
                    alt={section.image_alt || section.heading}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              {section.type === 'warning' ? (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : section.type === 'callout' ? (
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mb-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
                    {section.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
                  {section.content}
                </ReactMarkdown>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion */}
        {post.conclusion && (
          <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Conclusion</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
              {post.conclusion}
            </ReactMarkdown>
          </div>
        )}

        {/* FAQ */}
        {post.faq_items?.length > 0 && (
          <section id="faq" className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ChevronDown className="h-6 w-6 text-blue-400" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {post.faq_items.map((faq, i) => (
                <details key={i} className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-zinc-800/50 transition-colors">
                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 border-t border-zinc-800/50">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, unknown>}>
                      {faq.answer}
                    </ReactMarkdown>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related peptides */}
        {relatedPeptides.length > 0 && (
          <section className="mt-10 pt-8 border-t border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-blue-400" /> Explore These Peptides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPeptides.map(p => (
                <Link key={p.slug} href={`/peptides/${p.slug}`}
                  className="group bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-blue-500/40 transition-all flex items-start gap-3">
                  <FlaskConical className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">{p.name}</p>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{p.summary}</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-zinc-600 group-hover:text-blue-400 rotate-180 ml-auto transition-colors flex-shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        {post.internal_links?.length > 0 && (
          <section className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">Related Reading</h3>
            <div className="space-y-2">
              {post.internal_links.map((link, i) => (
                <Link key={i} href={link.href}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-blue-400 transition-colors py-1">
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-blue-400 flex-shrink-0" />
                  {link.text}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sources */}
        {post.sources?.length > 0 && (
          <section className="mt-10 pt-8 border-t border-zinc-800">
            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" /> Sources & References
            </h2>
            <ol className="space-y-3">
              {post.sources.map((source, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-zinc-600 font-mono text-xs mt-0.5 flex-shrink-0 w-5">{i + 1}.</span>
                  <div>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-medium">
                        {source.title}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="text-zinc-300 font-medium">{source.title}</span>
                    )}
                    {source.description && (
                      <p className="text-zinc-500 text-xs mt-0.5">{source.description}</p>
                    )}
                    {source.year && (
                      <span className="text-zinc-600 text-xs">{source.year}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400/80 leading-relaxed">
              <strong className="text-amber-400">Research Disclaimer:</strong> All information on PeptideWiki is for educational and research purposes only.
              The peptides discussed are not FDA-approved for human use unless otherwise noted.
              Nothing on this page constitutes medical advice. Consult a licensed healthcare provider before using any peptide compound.
              Laws governing peptide research vary by jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
