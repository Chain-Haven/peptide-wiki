import type { FC } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/blogs'
import BpcTb500FdaPost from '@/components/blog/BpcTb500FdaPost'

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
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://peptide-wiki.org/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.heroImage, width: 1344, height: 768, alt: post.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
    alternates: {
      canonical: `https://peptide-wiki.org/blog/${post.slug}`,
    },
  }
}

const POST_COMPONENTS: Record<string, FC> = {
  'bpc-157-tb-500-fda-hearing-july-2026': BpcTb500FdaPost,
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const PostContent = POST_COMPONENTS[slug]
  if (!PostContent) notFound()

  // post is guaranteed non-null here (notFound() throws above)
  const p = post!

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: p.title,
            description: p.excerpt,
            image: p.heroImage,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            author: {
              '@type': 'Organization',
              name: p.author,
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://peptide-wiki.org/blog/${p.slug}`,
            },
          }),
        }}
      />
      <PostContent />
    </>
  )
}
