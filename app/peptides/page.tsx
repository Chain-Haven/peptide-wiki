import { supabase } from '@/lib/supabase'
import PeptideCard from '@/components/PeptideCard'
import PeptidesFilters from '@/components/PeptidesFilters'
import type { Category, Peptide } from '@/lib/types'
import { FlaskConical } from 'lucide-react'

export const revalidate = 3600

export const metadata = {
  title: 'Browse Peptides',
  description: 'Browse our comprehensive database of 40+ research peptides with detailed information on mechanisms, dosages, and research.',
}

async function getPeptidesData() {
  const [peptidesRes, categoriesRes] = await Promise.all([
    supabase
      .from('peptides')
      .select('*, category:categories(*)')
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
  searchParams: Promise<{ category?: string; status?: string; route?: string }>
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
      />
    </div>
  )
}
