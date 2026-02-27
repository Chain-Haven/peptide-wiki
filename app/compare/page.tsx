import { supabase } from '@/lib/supabase'
import CompareClient from '@/components/CompareClient'

export const revalidate = 3600

export const metadata = {
  title: 'Compare Peptides',
  description: 'Compare peptides side-by-side to find the best option for your research goals.',
}

async function getPeptides() {
  const { data } = await supabase
    .from('peptides')
    .select('*, category:categories(*), prices(id, price, quantity_mg, form, product_url, in_stock, stock_source, supplier:suppliers(id, name, slug, affiliate_url, discount_code, has_coa, display_order))')
    .order('name')
  return data || []
}

export default async function ComparePage() {
  const peptides = await getPeptides()
  return <CompareClient peptides={peptides} />
}
