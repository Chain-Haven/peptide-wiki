import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock, Tag, ArrowRight, FlaskConical } from 'lucide-react'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/blogs'

export const metadata: Metadata = {
  title: 'Research Blog — Peptides, Regulation & Science',
  description:
    'In-depth articles on peptide research, regulatory developments, clinical evidence, and best practices for researchers. Stay current with the latest in BPC-157, TB-500, GLP-1s, and more.',
  keywords: ['peptide research', 'BPC-157', 'TB-500', 'FDA peptide regulation', 'peptide blog', 'research peptides 2026'],
  openGraph: {
    title: 'PeptideWiki Research Blog',
    description: 'Expert-level articles on peptides, clinical evidence, and regulatory developments.',
    url: 'https://peptide-wiki.org/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured)
  const rest = BLOG_POSTS.filter((p) => !p.featured)

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-7 w-7 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Research Blog</h1>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          Evidence-based articles on peptide research, regulatory updates, clinical studies, and sourcing guidance.
        </p>
      </div>

      {/* Featured post */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="block group mb-12">
          <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-blue-500/50 transition-colors">
            <div className="relative h-72 md:h-96 w-full">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1 text-xs font-medium text-blue-300">
                  <FlaskConical className="h-3 w-3" /> Featured
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-zinc-500">
                <span>{featured.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readingTimeMin} min read</span>
                <span>·</span>
                <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-4 max-w-3xl">{featured.excerpt}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {featured.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    <Tag className="h-2.5 w-2.5" />{tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:gap-2.5 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </article>
        </Link>
      )}

      {/* Remaining posts */}
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="h-full rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-zinc-600 transition-colors">
                <div className="relative h-44 w-full">
                  <Image
                    src={post.heroImage}
                    alt={post.heroImageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTimeMin} min</span>
                  </div>
                  <h2 className="font-semibold text-white text-base leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {BLOG_POSTS.length === 0 && (
        <p className="text-zinc-500 text-center py-20">No articles yet. Check back soon.</p>
      )}
    </div>
  )
}
