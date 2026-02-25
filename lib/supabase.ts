import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*, peptides(count)')
    .order('name')
  if (error) throw error
  return data
}

export async function getPeptides(options?: {
  category?: string
  search?: string
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('peptides')
    .select('*, category:categories(*)')
    .order('name')

  if (options?.category) {
    query = query.eq('categories.slug', options.category)
  }
  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,summary.ilike.%${options.search}%`)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 20) - 1)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getPeptideBySlug(slug: string) {
  const { data, error } = await supabase
    .from('peptides')
    .select('*, category:categories(*), prices(*, supplier:suppliers(*)), research_studies(*)')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function getSuppliers() {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('rating', { ascending: false })
  if (error) throw error
  return data
}

export async function getPeptidesByCategory(categorySlug: string) {
  const { data, error } = await supabase
    .from('peptides')
    .select('*, category:categories!inner(*)')
    .eq('categories.slug', categorySlug)
    .order('name')
  if (error) throw error
  return data
}
