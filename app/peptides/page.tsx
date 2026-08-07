import { supabase } from '@/lib/supabase'
import PeptideCard from '@/components/PeptideCard'
import PeptidesFilters from '@/components/PeptidesFilters'
import type { Category, Peptide } from '@/lib/types'
import { FlaskConical } from 'lucide-react'

export const revalidate = 3600

export const metadata = {
  title: 'Browse All Peptides — Database of 60+ Research Compounds',
  description:
    'Browse 60+ research peptides with mechanisms, dosage protocols, clinical-trial data, side effects, and live vendor price comparisons. Filter by category, research status, and vendor.',
  alternates: { canonical: '/peptides' },
  openGraph: {
    title: 'Browse All Peptides — PeptideWiki',
    description: 'Filterable database of 60+ research peptides with mechanisms, dosages, and vendor prices.',
    url: '/peptides',
    type: 'website',
  },
}

async function getPeptidesData() {
  const [peptidesRes, categoriesRes] = await Promise.all([
    supabase
      .from('peptides')
      .select(`
        *,
        category:categories(*),
        prices(
          id, price, quantity_mg, form, product_url, in_stock, stock_source,
          supplier:suppliers(id, name, slug, affiliate_url, discount_code, has_coa, display_order)
        )
      `)
      .order('name'),
    supabase.from('categories').select('*').order('name'),
  ])
  return {
    peptides: peptidesRes.data || [],
    categories: categoriesRes.data || [],
  }
}

export default async function PeptidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; status?: string; route?: string; search?: string }>
}) {
  const params = await searchParams
  const { peptides, categories } = await getPeptidesData()

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FlaskConical className="h-7 w-7 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Peptide Database</h1>
        </div>
        <p className="text-zinc-400">
          {peptides.length} peptides across {categories.length} categories. Click any peptide to view full details.
        </p>
      </div>

      <PeptidesFilters
        peptides={peptides as Peptide[]}
        categories={categories as Category[]}
        initialCategory={params.category}
        initialStatus={params.status}
        initialSearch={params.search}
      />
    </div>
  )
}
