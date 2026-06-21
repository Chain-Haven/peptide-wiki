import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllBlogPosts } from '@/data/blog-posts'
import { Clock, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Peptide Research Blog — PeptideWiki',
  description:
    'In-depth guides, protocol breakdowns, and research summaries on peptides for healing, body composition, anti-aging, and more. Cited science, no hype.',
  openGraph: {
    title: 'Peptide Research Blog — PeptideWiki',
    description: 'In-depth guides on peptide science, protocols, and research.',
    url: 'https://peptide-wiki.org/blog',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Peptide Research Blog</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Deep-dive guides, protocol breakdowns, and clinical research summaries. Every claim cited. No supplement marketing.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {post.category}
                </span>
              </div>

              <div className="p-5">
                <h2 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-4">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime} min read
                  </span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 mt-4 text-blue-400 text-sm font-medium">
                  Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 text-zinc-500">
            <p>No posts yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
