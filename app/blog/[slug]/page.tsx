import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, Clock, BookOpen, CheckCircle,
  AlertTriangle, ExternalLink, ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

export async function generateStaticParams() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  return (data || []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from('blog_posts')
    .select('title, description, hero_image_url, seo_keywords, canonical_url, published_at, tags')
    .eq('slug', slug)
    .single()
  if (!data) return { title: 'Blog Post Not Found' }
  return {
    title: data.title,
    description: data.description,
    keywords: data.seo_keywords || [],
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.hero_image_url ? [{ url: data.hero_image_url, width: 1376, height: 768 }] : [],
      type: 'article',
      publishedTime: data.published_at,
      tags: data.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.hero_image_url ? [data.hero_image_url] : [],
    },
    alternates: data.canonical_url ? { canonical: data.canonical_url } : undefined,
  }
}

interface BlogSection {
  heading: string
  content: string
  image_url?: string
  image_alt?: string
  type?: 'text' | 'callout' | 'warning'
}

interface FaqItem {
  question: string
  answer: string
}

interface Source {
  title: string
  url?: string
  authors?: string
  journal?: string
  year?: number
}

interface InternalLink {
  text: string
  url: string
}

// Renders markdown with site-consistent dark-theme styling
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold text-white mb-3 mt-5 first:mt-0">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-zinc-100 mb-2 mt-4 first:mt-0">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-zinc-300 leading-relaxed mb-4 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="text-white font-semibold">{children}</strong>
        ),
        em: ({ children }) => <em className="text-zinc-200 italic">{children}</em>,
        ul: ({ children }) => <ul className="space-y-1.5 mb-4 last:mb-0">{children}</ul>,
        ol: ({ children }) => (
          <ol className="space-y-1.5 mb-4 last:mb-0 list-decimal list-inside">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed">
            <span className="text-blue-400 mt-1.5 flex-shrink-0 text-xs">▸</span>
            <span>{children}</span>
          </li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="font-mono text-xs bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-blue-500 pl-4 my-4 text-zinc-400 italic">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4 rounded-lg border border-zinc-800">
            <table className="w-full text-sm border-collapse">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-zinc-800/60 border-b border-zinc-700">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-zinc-800/60">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-zinc-800/20 transition-colors">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2.5 text-left text-xs text-zinc-400 uppercase tracking-wider font-medium whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2.5 text-zinc-300 text-sm">{children}</td>
        ),
        hr: () => <hr className="border-zinc-800 my-6" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) notFound()

  const post = data
  const sections: BlogSection[] = Array.isArray(post.sections) ? post.sections : []
  const faqItems: FaqItem[] = Array.isArray(post.faq_items) ? post.faq_items : []
  const sources: Source[] = Array.isArray(post.sources) ? post.sources : []
  const keyTakeaways: string[] = Array.isArray(post.key_takeaways) ? post.key_takeaways : []
  const internalLinks: InternalLink[] = Array.isArray(post.internal_links) ? post.internal_links : []

  const publishDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* JSON-LD Schema */}
      {post.schema_data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema_data) }}
        />
      )}

      {/* Hero Image */}
      {post.hero_image_url && (
        <div className="relative w-full h-64 md:h-[420px] overflow-hidden">
          <Image
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
      )}

      <div
        className="container mx-auto px-4 max-w-5xl pb-20"
        style={{
          marginTop: post.hero_image_url ? '-100px' : '0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 pt-8">
          <Link
            href="/blog"
            className="hover:text-zinc-300 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Blog
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{post.category}</span>
        </div>

        {/* Title Block */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/25 rounded-full text-xs text-blue-300 font-medium">
              {post.category}
            </span>
            {post.tags?.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-5 max-w-3xl">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {post.read_time}
            </span>
            <span>{publishDate}</span>
            {post.word_count > 0 && (
              <span>{post.word_count.toLocaleString()} words</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Main Content ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Intro */}
            {post.intro && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
                <MarkdownContent content={post.intro} />
              </div>
            )}

            {/* Sections */}
            {sections.map((section: BlogSection, idx: number) => {
              const isCallout = section.type === 'callout'
              const isWarning = section.type === 'warning'

              return (
                <section
                  key={idx}
                  id={`section-${idx}`}
                  className={cn(
                    'rounded-xl border p-6 md:p-8',
                    isCallout && 'bg-blue-500/5 border-blue-500/20',
                    isWarning && 'bg-amber-500/5 border-amber-500/20',
                    !isCallout && !isWarning && 'bg-zinc-900 border-zinc-800'
                  )}
                >
                  <h2
                    className={cn(
                      'text-xl md:text-2xl font-bold mb-5',
                      isCallout && 'text-blue-300',
                      isWarning && 'text-amber-300',
                      !isCallout && !isWarning && 'text-white'
                    )}
                  >
                    {section.heading}
                  </h2>

                  {section.image_url && (
                    <div className="relative w-full h-52 md:h-72 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={section.image_url}
                        alt={section.image_alt || section.heading}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <MarkdownContent content={section.content} />
                </section>
              )
            })}

            {/* Conclusion */}
            {post.conclusion && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-4">The Bottom Line</h2>
                <MarkdownContent content={post.conclusion} />
              </div>
            )}

            {/* FAQ */}
            {faqItems.length > 0 && (
              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-5">
                  {faqItems.map((faq: FaqItem, idx: number) => (
                    <div
                      key={idx}
                      className="border-b border-zinc-800 pb-5 last:border-0 last:pb-0"
                    >
                      <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                        <span className="text-blue-400 flex-shrink-0 font-mono text-sm mt-0.5">
                          Q
                        </span>
                        {faq.question}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed pl-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Sources */}
            {sources.length > 0 && (
              <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Sources & Citations
                </h2>
                <ol className="space-y-4">
                  {sources.map((source: Source, idx: number) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-zinc-600 flex-shrink-0 font-mono text-xs mt-0.5 w-6">
                        [{idx + 1}]
                      </span>
                      <div>
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
                          >
                            {source.title}
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <span className="text-zinc-300">{source.title}</span>
                        )}
                        {(source.authors || source.journal) && (
                          <p className="text-zinc-500 text-xs mt-0.5">
                            {source.authors && <span>{source.authors}</span>}
                            {source.authors && source.journal && <span> · </span>}
                            {source.journal && <em>{source.journal}</em>}
                            {source.year && <span> ({source.year})</span>}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400/80 leading-relaxed">
                <strong className="text-amber-400">Research purposes only.</strong> Nothing in this
                article constitutes medical advice. Consult a qualified healthcare professional
                before initiating any research protocol. All compounds sold for research use only.
              </p>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4 lg:col-span-1">

            {/* Table of Contents */}
            {sections.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 lg:sticky lg:top-24">
                <h3 className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wider">
                  Contents
                </h3>
                <nav className="space-y-0.5">
                  {sections.map((section: BlogSection, idx: number) => (
                    <a
                      key={idx}
                      href={`#section-${idx}`}
                      className="block text-xs text-zinc-400 hover:text-white transition-colors py-1.5 border-l-2 border-transparent hover:border-blue-500 pl-3 leading-snug"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Key Takeaways */}
            {keyTakeaways.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2.5">
                  {keyTakeaways.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                      <ChevronRight className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Reading */}
            {internalLinks.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">
                  Related Reading
                </h3>
                <div className="space-y-1">
                  {internalLinks.map((link: InternalLink, idx: number) => (
                    <Link
                      key={idx}
                      href={link.url}
                      className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-zinc-800"
                    >
                      <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
