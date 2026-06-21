import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import {
  ArrowLeft, Clock, Calendar, BookOpen, ExternalLink,
  AlertTriangle, BarChart3, FlaskConical, Tag,
} from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog-posts'

export const revalidate = 86400

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Article Not Found | PeptideWiki' }

  return {
    title: post.seoTitle,
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle,
      description: post.seo.description,
      url: `https://peptide-wiki.org${post.seo.canonicalPath}`,
      siteName: 'PeptideWiki',
      type: 'article',
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      modifiedTime: `${post.updatedAt}T00:00:00Z`,
      authors: [post.author],
      images: [
        {
          url: post.seo.ogImage,
          width: 1376,
          height: 768,
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seo.description,
      images: [post.seo.ogImage],
    },
    alternates: {
      canonical: `https://peptide-wiki.org${post.seo.canonicalPath}`,
    },
    other: {
      'article:published_time': `${post.publishedAt}T00:00:00Z`,
      'article:modified_time': `${post.updatedAt}T00:00:00Z`,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    },
  }
}

const researchData = [
  { label: 'GI / Gut Health', studies: 180, color: 'bg-blue-500' },
  { label: 'Tendon & Ligament', studies: 95, color: 'bg-emerald-500' },
  { label: 'Muscle & Bone', studies: 60, color: 'bg-purple-500' },
  { label: 'Neurology / CNS', studies: 45, color: 'bg-amber-500' },
  { label: 'Cardiovascular', studies: 30, color: 'bg-rose-500' },
]
const maxStudies = 180

const timeline = [
  { year: '1993', event: 'BPC-157 first isolated from human gastric juice by Sikirić et al., University of Zagreb' },
  { year: '2003', event: 'Tendon healing acceleration documented; VEGF/angiogenesis mechanism proposed' },
  { year: '2013', event: 'Gut-brain axis modulatory effects demonstrated in dopaminergic models' },
  { year: '2021', event: 'PMC wound healing review published; 400+ preclinical study milestone reached' },
  { year: '2024', event: 'First interstitial cystitis human pilot (n=12): 80–100% symptom resolution' },
  { year: '2025', event: 'IV safety pilot published; ACG abstract S808 presented at annual meeting' },
  { year: 'Feb 2026', event: 'FDA reclassification: BPC-157 moves from Category 2 back to Category 1 compounding list', highlight: true },
]

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seo.articleSchema.headline,
    datePublished: post.seo.articleSchema.datePublished,
    dateModified: post.seo.articleSchema.dateModified,
    author: {
      '@type': 'Organization',
      name: post.seo.articleSchema.author,
    },
    publisher: {
      '@type': 'Organization',
      name: post.seo.articleSchema.publisher,
      url: 'https://peptide-wiki.org',
    },
    description: post.seo.articleSchema.description,
    image: post.seo.ogImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://peptide-wiki.org${post.seo.canonicalPath}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-zinc-950">
        <div className="container mx-auto px-4 py-8 max-w-4xl">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/blog" className="hover:text-zinc-300 flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Blog
            </Link>
            <span>/</span>
            <span className="text-zinc-400 truncate">{post.title}</span>
          </div>

          {/* Category + Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-semibold">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-zinc-300 text-lg leading-relaxed mb-6 border-l-2 border-blue-500 pl-4">
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500 mb-8 pb-8 border-b border-zinc-800">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <span className="text-zinc-600">{post.sources.length} sources cited</span>
          </div>

          {/* ── HERO IMAGE ── */}
          <div className="rounded-2xl overflow-hidden mb-8 border border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt={post.heroImageAlt}
              className="w-full object-cover"
            />
            <p className="text-xs text-zinc-600 px-4 py-2 bg-zinc-900 text-center">
              {post.heroImageAlt}
            </p>
          </div>

          {/* ── ARTICLE CONTENT ── */}
          <div className="prose prose-invert prose-zinc max-w-none mb-10
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-white
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-ul:text-zinc-300 prose-li:my-1
            prose-blockquote:border-blue-500 prose-blockquote:text-zinc-400
            prose-hr:border-zinc-800">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* ── LAB IMAGE ── */}
          <div className="rounded-2xl overflow-hidden mb-10 border border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.labImage}
              alt={post.labImageAlt}
              className="w-full object-cover"
            />
            <p className="text-xs text-zinc-600 px-4 py-2 bg-zinc-900 text-center">
              {post.labImageAlt}
            </p>
          </div>

          {/* ── RESEARCH DATA VISUALIZATION ── */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-10">
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              BPC-157 Research Overview
            </h2>
            <p className="text-zinc-500 text-sm mb-6">Estimated study distribution across therapeutic areas (400+ published preclinical studies)</p>

            {/* Bar chart */}
            <div className="space-y-4 mb-8">
              {researchData.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1.5 text-sm">
                    <span className="text-zinc-300 font-medium">{item.label}</span>
                    <span className="text-zinc-500 font-mono text-xs">{item.studies}+ studies</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${item.color}`}
                      style={{ width: `${(item.studies / maxStudies) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Research Timeline */}
            <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-blue-400" />
              Key Research Timeline
            </h3>
            <div className="relative space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-[3.25rem] top-7 bottom-0 w-px bg-zinc-800" />
                  )}
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${
                      item.highlight
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'text-zinc-500'
                    }`}>
                      {item.year}
                    </span>
                  </div>
                  {/* Dot */}
                  <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${
                    item.highlight ? 'bg-blue-400 ring-2 ring-blue-400/30' : 'bg-zinc-600'
                  }`} />
                  {/* Event */}
                  <p className={`text-sm pb-5 ${item.highlight ? 'text-blue-300 font-medium' : 'text-zinc-400'}`}>
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── BODY SYSTEMS IMAGE ── */}
          <div className="rounded-2xl overflow-hidden mb-10 border border-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.bodyImage}
              alt={post.bodyImageAlt}
              className="w-full object-cover"
            />
            <p className="text-xs text-zinc-600 px-4 py-2 bg-zinc-900 text-center">
              {post.bodyImageAlt}
            </p>
          </div>

          {/* ── DISCLAIMER ── */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mb-10">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-400 mb-1">Research Use Disclaimer</p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  BPC-157 is sold as a research compound only. It is not FDA-approved for human use and
                  is not intended to diagnose, treat, cure, or prevent any disease. This article is for
                  educational purposes. Always consult a qualified healthcare professional. Laws governing
                  research peptides vary by jurisdiction.
                </p>
              </div>
            </div>
          </div>

          {/* ── SOURCES ── */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Sources & References
            </h2>
            <ol className="space-y-3">
              {post.sources.map((source, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-500 text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-zinc-300 leading-snug mb-0.5">{source.citation}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center gap-1 transition-colors"
                    >
                      {source.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── BACK LINK ── */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Research Blog
            </Link>
            <Link
              href="/peptides/bpc-157"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View BPC-157 full profile <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
