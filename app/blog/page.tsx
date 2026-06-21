import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, Tag, FlaskConical } from 'lucide-react'
import { getAllBlogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Peptide Research Blog — PeptideWiki',
  description:
    'In-depth guides, research breakdowns, and practical protocols for peptides. Backed by peer-reviewed studies, clinical trial data, and expert analysis.',
  alternates: {
    canonical: 'https://peptide-wiki.org/blog',
  },
  openGraph: {
    title: 'Peptide Research Blog — PeptideWiki',
    description:
      'In-depth guides, research breakdowns, and practical protocols for peptides. Backed by peer-reviewed studies, clinical trial data, and expert analysis.',
    url: 'https://peptide-wiki.org/blog',
    type: 'website',
  },
}

export default function BlogListingPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-sm text-blue-400 font-medium uppercase tracking-wider">Research Blog</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Peptide Research &amp; Guides
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Evidence-based deep dives into the world of research peptides. Every article is
            backed by peer-reviewed studies, clinical trial data, and up-to-date regulatory context.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Hero image */}
                  {post.heroImage && post.heroImage.startsWith('http') && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.heroImage}
                      alt={post.heroImageAlt}
                      className="w-full h-56 object-cover"
                    />
                  )}

                  <div className="p-6 md:p-8">
                    {/* Category + reading time */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 font-medium">
                        <FlaskConical className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                      <time className="text-xs text-zinc-600">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-zinc-400 leading-relaxed mb-4 text-sm md:text-base">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-400"
                        >
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm text-blue-400 font-medium group-hover:gap-3 transition-all">
                      Read full article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center">
          <FlaskConical className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Explore the Peptide Database</h3>
          <p className="text-zinc-400 text-sm mb-4 max-w-md mx-auto">
            Browse 61+ peptides with complete research profiles, dosing protocols, vendor pricing, and AI-powered chat.
          </p>
          <Link
            href="/peptides"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Browse All Peptides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
