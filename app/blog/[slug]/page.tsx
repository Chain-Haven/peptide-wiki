import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts, getBlogPost, type BlogSection, type BlogPost } from '@/data/blog-posts'
import { Clock, Calendar, ChevronLeft, ExternalLink, AlertTriangle, Info, CheckCircle, ShieldAlert } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: post.canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [{ url: post.heroImage, alt: post.heroImageAlt, width: 1376, height: 768 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.heroImage],
    },
    alternates: { canonical: post.canonicalUrl },
  }
}

function EvidenceChart({ data }: { data: NonNullable<BlogSection['chartData']> }) {
  const max = Math.max(...data.datasets.flatMap((d) => d.values))

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 my-6">
      <h3 className="text-white font-semibold mb-5 text-center">{data.title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, i) => {
          const value = data.datasets[0].values[i]
          const pct = (value / max) * 100
          return (
            <div key={label} className="flex items-center gap-3">
              <div className="w-32 text-sm text-zinc-400 text-right shrink-0">{label}</div>
              <div className="flex-1 bg-zinc-800 rounded-full h-8 relative overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                  style={{ width: `${Math.max(pct, 8)}%`, backgroundColor: data.datasets[0].color }}
                >
                  <span className="text-white text-sm font-bold">{value}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {data.note && <p className="text-zinc-500 text-xs mt-4 text-center italic">{data.note}</p>}
    </div>
  )
}

function VendorCards({ vendors }: { vendors: NonNullable<BlogSection['vendors']> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 my-6">
      {vendors.map((vendor) => (
        <div key={vendor.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-white font-bold text-lg">{vendor.name}</h4>
            {vendor.badge && (
              <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full shrink-0 ml-2">
                {vendor.badge}
              </span>
            )}
          </div>
          <p className="text-zinc-300 text-sm font-medium mb-1">{vendor.product}</p>
          <p className="text-green-400 text-sm font-semibold mb-3">{vendor.price}</p>
          <p className="text-zinc-400 text-sm mb-4">{vendor.highlight}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Purity: {vendor.purity}</span>
            <a
              href={vendor.productUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 font-medium ml-auto"
            >
              View Product <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

function Callout({ type, content }: { type: BlogSection['calloutType']; content: string }) {
  const styles = {
    info: { bg: 'bg-blue-950/40 border-blue-500/30', icon: <Info className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" /> },
    warning: { bg: 'bg-amber-950/40 border-amber-500/30', icon: <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" /> },
    success: { bg: 'bg-green-950/40 border-green-500/30', icon: <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" /> },
    danger: { bg: 'bg-red-950/40 border-red-500/30', icon: <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /> },
  }
  const s = styles[type ?? 'info']

  return (
    <div className={`flex gap-3 border rounded-xl p-4 my-6 ${s.bg}`}>
      {s.icon}
      <div className="text-sm text-zinc-300" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

function DosageTable({ protocol }: { protocol: NonNullable<BlogSection['protocol']> }) {
  return (
    <div className="my-6">
      <h3 className="text-white font-semibold text-xl mb-4">{protocol.title}</h3>
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-800/80">
              <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Phase</th>
              <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Duration</th>
              <th className="px-4 py-3 text-left text-zinc-300 font-semibold">BPC-157</th>
              <th className="px-4 py-3 text-left text-zinc-300 font-semibold">TB-500</th>
              <th className="px-4 py-3 text-left text-zinc-300 font-semibold hidden lg:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody>
            {protocol.phases.map((phase, i) => (
              <tr key={phase.name} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/60'}>
                <td className="px-4 py-3 text-blue-400 font-semibold">{phase.name}</td>
                <td className="px-4 py-3 text-zinc-300">{phase.duration}</td>
                <td className="px-4 py-3 text-green-400">{phase.bpc157}</td>
                <td className="px-4 py-3 text-purple-400">{phase.tb500}</td>
                <td className="px-4 py-3 text-zinc-400 hidden lg:table-cell">{phase.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-1.5">
        {protocol.notes.map((note, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className="text-blue-400 mt-0.5">•</span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DataTable({ data }: { data: NonNullable<BlogSection['tableData']> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 my-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-800/80">
            {data.headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-zinc-300 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-900/60'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FAQSection({ faqs }: { faqs: NonNullable<BlogSection['faqs']> }) {
  return (
    <div className="my-6 space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      ))}
    </div>
  )
}

function renderSection(section: BlogSection) {
  switch (section.type) {
    case 'intro':
      return (
        <div
          key={section.id}
          className="text-zinc-300 leading-relaxed text-lg space-y-4 [&_strong]:text-white [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
          dangerouslySetInnerHTML={{ __html: section.content ?? '' }}
        />
      )

    case 'h2':
      return (
        <section key={section.id} className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4 scroll-mt-20" id={section.id}>
            {section.heading}
          </h2>
          {section.content && (
            <div
              className="text-zinc-300 leading-relaxed space-y-4 [&_ul]:list-none [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['→'] [&_li]:before:text-blue-400 [&_li]:before:mt-0.5 [&_li]:before:shrink-0 [&_strong]:text-white [&_sup]:text-blue-400 [&_sup]:text-xs [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </section>
      )

    case 'h3':
      return (
        <section key={section.id} className="mt-7">
          <h3 className="text-xl font-semibold text-white mb-3 scroll-mt-20" id={section.id}>
            {section.heading}
          </h3>
          {section.content && (
            <div
              className="text-zinc-300 leading-relaxed space-y-3 [&_ul]:list-none [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['•'] [&_li]:before:text-blue-400 [&_li]:before:mt-0.5 [&_li]:before:shrink-0 [&_strong]:text-white [&_sup]:text-blue-400 [&_sup]:text-xs [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </section>
      )

    case 'text':
      return (
        <div
          key={section.id}
          className="text-zinc-300 leading-relaxed space-y-4 mt-4 [&_strong]:text-white [&_a]:text-blue-400 [&_a:hover]:text-blue-300"
          dangerouslySetInnerHTML={{ __html: section.content ?? '' }}
        />
      )

    case 'image':
      return section.image ? (
        <figure key={section.id} className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image src={section.image.src} alt={section.image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {section.image.caption && (
            <figcaption className="text-zinc-500 text-sm text-center mt-2 italic">{section.image.caption}</figcaption>
          )}
        </figure>
      ) : null

    case 'table':
      return section.tableData ? <DataTable key={section.id} data={section.tableData} /> : null

    case 'chart':
      return section.chartData ? (
        <div key={section.id}>
          {section.heading && <h3 className="text-xl font-semibold text-white mb-2 mt-8">{section.heading}</h3>}
          <EvidenceChart data={section.chartData} />
        </div>
      ) : null

    case 'callout':
      return <Callout key={section.id} type={section.calloutType} content={section.content ?? ''} />

    case 'vendor-cards':
      return section.vendors ? (
        <div key={section.id}>
          {section.heading && <h3 className="text-xl font-semibold text-white mb-3 mt-6">{section.heading}</h3>}
          <VendorCards vendors={section.vendors} />
        </div>
      ) : null

    case 'faq':
      return section.faqs ? (
        <div key={section.id} className="mt-10">
          {section.heading && (
            <h2 className="text-2xl font-bold text-white mb-4" id={section.id}>
              {section.heading}
            </h2>
          )}
          <FAQSection faqs={section.faqs} />
        </div>
      ) : null

    case 'protocol':
      return section.protocol ? (
        <div key={section.id} className="mt-10">
          {section.heading && (
            <h2 className="text-2xl font-bold text-white mb-4" id={section.id}>
              {section.heading}
            </h2>
          )}
          <DosageTable protocol={section.protocol} />
        </div>
      ) : null

    default:
      return null
  }
}

function StructuredData({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metaTitle,
    description: post.metaDescription,
    image: post.heroImage,
    author: { '@type': 'Organization', name: post.author, url: 'https://peptide-wiki.org' },
    publisher: {
      '@type': 'Organization',
      name: 'PeptideWiki',
      url: 'https://peptide-wiki.org',
      logo: { '@type': 'ImageObject', url: 'https://peptide-wiki.org/icon' },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': post.canonicalUrl },
    keywords: post.keywords.join(', '),
    wordCount: post.schema.wordCount,
  }

  const faqSection = post.sections.find((s) => s.type === 'faq')
  const faqSchema = faqSection?.faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSection.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
    </>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const tocSections = post.sections.filter((s) => (s.type === 'h2' || s.type === 'protocol' || s.type === 'faq') && s.heading)

  return (
    <>
      <StructuredData post={post} />

      <div className="min-h-screen bg-zinc-950">
        <div className="relative w-full aspect-[3/1] overflow-hidden max-h-[420px]">
          <Image src={post.heroImage} alt={post.heroImageAlt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-8 max-w-4xl">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-4 py-5 border-b border-zinc-800 text-sm text-zinc-400">
            <Link href="/blog" className="flex items-center gap-1 hover:text-white transition-colors">
              <ChevronLeft className="h-4 w-4" /> All Articles
            </Link>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
            <span className="ml-auto text-zinc-500">By {post.author}</span>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10 items-start">
            <article className="min-w-0">
              <p className="text-lg text-zinc-300 leading-relaxed mb-8 font-medium border-l-4 border-blue-500 pl-4">{post.excerpt}</p>

              {post.sections.map((section) => renderSection(section))}

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <h2 className="text-xl font-bold text-white mb-5">Sources & References</h2>
                <ol className="space-y-3">
                  {post.sources.map((source) => (
                    <li key={source.id} className="flex gap-3 text-sm">
                      <span className="text-blue-400 font-bold shrink-0 w-5 text-right">{source.id}.</span>
                      <div>
                        <span className="text-zinc-300">{source.authors}. </span>
                        <em className="text-zinc-200">"{source.title}"</em>
                        <span className="text-zinc-400">
                          {' '}
                          — {source.journal}, {source.year}.
                        </span>
                        {source.doi && <span className="text-zinc-500"> DOI: {source.doi}.</span>}
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 ml-2"
                          >
                            View source <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-500">
                <strong className="text-zinc-400">Research Disclaimer:</strong> This article is for educational and research purposes only.
                All peptides mentioned are research compounds not approved by the FDA for human use. Nothing in this article constitutes
                medical advice. Consult a qualified healthcare professional before using any research peptide.
              </div>
            </article>

            <aside className="hidden lg:block sticky top-24 self-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Contents</h3>
                <nav className="space-y-1">
                  {tocSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 px-2 py-1.5 rounded transition-colors"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {post.relatedPeptides.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mt-4">
                  <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">Related Peptides</h3>
                  <div className="space-y-2">
                    {post.relatedPeptides.map((slug) => (
                      <Link
                        key={slug}
                        href={`/peptides/${slug}`}
                        className="block text-sm text-blue-400 hover:text-blue-300 hover:bg-zinc-800 px-2 py-1.5 rounded transition-colors capitalize"
                      >
                        {slug.replace(/-/g, ' ').toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
