export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  author: string
  authorTitle: string
  category: string
  tags: string[]
  heroImage: string
  heroImageAlt: string
  readingTimeMin: number
  featured: boolean
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'bpc-157-tb-500-fda-hearing-july-2026',
    title: 'BPC-157 & TB-500 Head to FDA: What Researchers Need to Know Before the July 2026 Hearing',
    excerpt:
      'On July 23–24, 2026, the FDA\'s Pharmacy Compounding Advisory Committee will formally review BPC-157, TB-500, and five other peptides for 503A inclusion. Here\'s the complete science briefing, regulatory context, and what it means for research access.',
    publishedAt: '2026-06-23',
    updatedAt: '2026-06-23',
    author: 'PeptideWiki Research Team',
    authorTitle: 'Research & Editorial',
    category: 'Regulatory & Research',
    tags: ['BPC-157', 'TB-500', 'FDA', 'PCAC', 'compounding', 'regulation', '2026', 'healing', 'recovery'],
    heroImage:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260623_210516_5a9a0106-4151-47fd-8d57-8fc15ef162dc.png',
    heroImageAlt: 'Biomedical research laboratory with peptide vials and FDA regulatory documentation screens',
    readingTimeMin: 10,
    featured: true,
  },
]
