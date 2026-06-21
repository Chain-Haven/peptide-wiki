import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, Clock, Tag, User, Calendar, FlaskConical, ExternalLink, BookOpen } from 'lucide-react'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog-data'

export async function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }

  const publishedTime = new Date(post.publishedAt).toISOString()

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime,
      authors: [post.author],
      tags: post.tags,
      url: `https://peptide-wiki.org/blog/${post.slug}`,
      ...(post.heroImage && post.heroImage.startsWith('http')
        ? { images: [{ url: post.heroImage, alt: post.heroImageAlt, width: 1344, height: 768 }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://peptide-wiki.org/blog/${post.slug}`,
    },
  }
}

function ArticleJsonLd({ post }: { post: ReturnType<typeof getBlogPost> }) {
  if (!post) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://peptide-wiki.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeptideWiki',
      url: 'https://peptide-wiki.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://peptide-wiki.org/icon',
      },
    },
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peptide-wiki.org/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    ...(post.heroImage && post.heroImage.startsWith('http')
      ? { image: { '@type': 'ImageObject', url: post.heroImage, width: 1344, height: 768 } }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function BreadcrumbJsonLd({ post }: { post: ReturnType<typeof getBlogPost> }) {
  if (!post) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://peptide-wiki.org' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://peptide-wiki.org/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://peptide-wiki.org/blog/${post.slug}`,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd post={post} />

      <div className="min-h-screen bg-zinc-950">

        {/* Hero image */}
        {post.heroImage && post.heroImage.startsWith('http') && (
          <div className="relative w-full h-72 md:h-96 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
            <Link href="/blog" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-400 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            {/* Category badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 font-medium">
                <FlaskConical className="h-3 w-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-zinc-300 text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>

            {/* Author + date row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 pb-6 border-b border-zinc-800">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-zinc-600" />
                <span className="text-zinc-300">{post.author}</span>
                {post.authorTitle && <span className="text-zinc-600">· {post.authorTitle}</span>}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-zinc-600" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>
              {post.updatedAt !== post.publishedAt && (
                <span className="text-zinc-600 text-xs">
                  Updated {new Date(post.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-400"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article body */}
          <article className="prose-blog">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-extrabold text-white mt-12 mb-4 leading-tight">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-white mt-10 mb-4 pb-2 border-b border-zinc-800 leading-snug">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mt-8 mb-3 leading-snug">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base font-semibold text-zinc-200 mt-6 mb-2">{children}</h4>
                ),
                p: ({ children }) => (
                  <p className="text-zinc-300 leading-relaxed mb-5 text-base">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 mb-5 pl-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 mb-5 pl-4 list-decimal">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-zinc-300 text-base flex gap-2 items-start">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span className="leading-relaxed">{children}</span>
                  </li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors inline-flex items-center gap-0.5"
                  >
                    {children}
                    {href?.startsWith('http') && <ExternalLink className="h-3 w-3 flex-shrink-0 inline" />}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="text-zinc-300 italic">{children}</em>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  return isBlock ? (
                    <code className="block bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-xs font-mono text-emerald-400 overflow-x-auto mb-5">
                      {children}
                    </code>
                  ) : (
                    <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 overflow-x-auto mb-6 text-sm font-mono text-emerald-400">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-500/5 rounded-r-lg mb-5 text-zinc-300 italic">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="border-zinc-800 my-8" />,
                img: ({ src, alt }) => (
                  <figure className="my-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={alt || ''}
                      className="w-full rounded-xl border border-zinc-800 object-cover"
                      style={{ maxHeight: '480px' }}
                    />
                    {alt && (
                      <figcaption className="text-center text-xs text-zinc-500 mt-2 italic">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-6 rounded-xl border border-zinc-800">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-zinc-800/80">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-zinc-800/60">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-zinc-800/40 transition-colors">{children}</tr>
                ),
                th: ({ children }) => (
                  <th className="text-left px-4 py-3 text-xs text-zinc-400 uppercase tracking-wider font-medium">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-zinc-300">{children}</td>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Footer CTA */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/peptides/bpc-157"
                className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-blue-500/40 transition-colors group"
              >
                <FlaskConical className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    BPC-157 Database Entry
                  </p>
                  <p className="text-xs text-zinc-500">Full research profile, pricing & vendor comparison</p>
                </div>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-600 transition-colors group"
              >
                <BookOpen className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors">
                    More Research Articles
                  </p>
                  <p className="text-xs text-zinc-500">Back to the blog</p>
                </div>
              </Link>
            </div>

            <p className="mt-6 text-xs text-zinc-600 leading-relaxed text-center">
              This article is for educational and research purposes only. It does not constitute medical advice.
              Consult a licensed healthcare professional before using any research compound.
              All vendor links may be affiliate links — PeptideWiki may earn a commission at no extra cost to you.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
