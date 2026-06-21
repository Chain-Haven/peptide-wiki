import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar, Clock, Tag, ArrowRight, BookOpen, FlaskConical } from 'lucide-react'
import Image from 'next/image'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Peptide Research Blog — Guides, Protocols & News',
  description: 'In-depth peptide research guides, stack protocols, regulatory updates, and clinical evidence breakdowns. Stay current on BPC-157, TB-500, GLP-1s, and more.',
  openGraph: {
    title: 'Peptide Research Blog — PeptideWiki',
    description: 'Deep-dive guides on research peptides: mechanisms, protocols, clinical evidence, and regulatory news.',
    url: 'https://peptide-wiki.org/blog',
    type: 'website',
  },
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
  hero_image_url: string | null
  hero_image_alt: string | null
  published_at: string
  word_count: number
}

async function getPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, description, category, read_time, tags, featured, hero_image_url, hero_image_alt, published_at, word_count')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (error) return []
  return data || []
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts.find(p => p.featured) || posts[0]
  const rest = posts.filter(p => p.slug !== featured?.slug)

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
            <BookOpen className="h-4 w-4" />
            Research Blog
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Peptide Research Guides</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            Evidence-based deep dives on research peptides — mechanisms, protocols, clinical data, and regulatory updates.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {featured.hero_image_url && (
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={featured.hero_image_url}
                      alt={featured.hero_image_alt || featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/20" />
                  </div>
                )}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.description}</p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(featured.published_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {featured.read_time}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-sm font-medium">
                    Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="h-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 flex flex-col">
                  {post.hero_image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.hero_image_url}
                        alt={post.hero_image_alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">{post.description}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-600 mt-auto">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.read_time}
                      </span>
                    </div>
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="flex items-center gap-0.5 px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-500 text-xs rounded-full">
                            <Tag className="h-2.5 w-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <FlaskConical className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500">No articles published yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
