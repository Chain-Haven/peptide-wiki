import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Peptide Research Blog — Science-Backed Guides | PeptideWiki',
  description:
    'In-depth, science-backed research guides on peptides — covering mechanisms of action, clinical trial data, safety profiles, and sourcing. Updated with the latest published research.',
  keywords: [
    'peptide research blog',
    'BPC-157 guide',
    'research peptides science',
    'peptide clinical trials',
    'GHK-Cu research',
    'TB-500 benefits',
    'peptide blog 2026',
  ],
  openGraph: {
    title: 'Peptide Research Blog | PeptideWiki',
    description:
      'In-depth, science-backed guides on research peptides — mechanisms, clinical data, safety profiles, and sourcing.',
    url: 'https://peptide-wiki.org/blog',
    siteName: 'PeptideWiki',
    type: 'website',
  },
  alternates: {
    canonical: 'https://peptide-wiki.org/blog',
  },
}

export default function BlogPage() {
  const posts = BLOG_POSTS

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Research Library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Peptide Research{' '}
            <span className="text-blue-400">Deep Dives</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive, science-backed guides written for researchers, clinicians, and the
            scientifically curious. Every claim cited. No hype.
          </p>
        </div>

        {/* Blog post grid */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-200"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Hero image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600/90 rounded-full text-xs font-semibold text-white backdrop-blur-sm">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 leading-relaxed mb-5 text-base">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>{post.sources.length} sources cited</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm text-blue-400 font-medium group-hover:gap-2.5 transition-all">
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            <BookOpen className="h-10 w-10 mx-auto mb-4 opacity-30" />
            <p>No articles yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
