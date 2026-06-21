import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Tag, ArrowRight, FlaskConical } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Research Blog — Peptide Guides, Science & Protocols',
  description:
    'In-depth research guides on peptides: mechanisms of action, clinical evidence, dosage protocols, and sourcing. Evidence-based content for researchers and healthcare professionals.',
  openGraph: {
    title: 'PeptideWiki Research Blog — Peptide Science & Protocols',
    description:
      'Deep dives on research peptides — mechanisms, clinical data, dosage protocols, and vendor sourcing.',
    url: 'https://peptide-wiki.org/blog',
    siteName: 'PeptideWiki',
    type: 'website',
  },
}

interface BlogPostCard {
  id: string
  slug: string
  title: string
  description: string
  category: string
  read_time: string
  tags: string[]
  featured: boolean
  hero_image_url: string | null
  hero_image_alt: string | null
  published_at: string
  word_count: number
}

export default async function BlogListingPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select(
      'id, slug, title, description, category, read_time, tags, featured, hero_image_url, hero_image_alt, published_at, word_count'
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const allPosts: BlogPostCard[] = posts || []
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0]
  const regularPosts = allPosts.filter((p) => p.id !== featuredPost?.id)

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="h-6 w-6 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Research Blog</h1>
          </div>
          <p className="text-zinc-400 text-lg max-w-2xl">
            In-depth guides on research peptides — mechanisms of action, clinical evidence,
            dosage protocols, and vendor sourcing. Evidence-based content for serious researchers.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="group block mb-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {featuredPost.hero_image_url && (
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={featuredPost.hero_image_url}
                      alt={featuredPost.hero_image_alt || featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/25 rounded-full text-xs text-blue-300 font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-medium">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {featuredPost.read_time}
                      </span>
                      <span>
                        {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span className="text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post Grid */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">All Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300 h-full flex flex-col">
                    {post.hero_image_url && (
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <Image
                          src={post.hero_image_url}
                          alt={post.hero_image_alt || post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400">
                          {post.category}
                        </span>
                        {post.tags?.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 bg-zinc-800 rounded-full text-xs text-zinc-500 flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800 mt-auto">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Clock className="h-3 w-3" /> {post.read_time}
                        </div>
                        <span className="text-xs text-zinc-500">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {allPosts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">No blog posts published yet.</div>
        )}
      </div>
    </div>
  )
}
