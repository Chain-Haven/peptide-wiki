import { supabase } from '@/lib/supabase'
import DosageCalculatorClient from '@/components/DosageCalculator'

export const revalidate = 3600

export const metadata = {
  title: 'Dosage Calculator',
  description: 'Calculate peptide dosages based on body weight. Supports weight-based dosing for BPC-157 and other peptides.',
}

async function getPeptides() {
  const { data } = await supabase
    .from('peptides')
    .select('id, name, slug, dosage_info, administration_routes, cycle_length, research_status')
    .order('name')
  return data || []
}

export default async function CalculatorPage() {
  const peptides = await getPeptides()
  return <DosageCalculatorClient peptides={peptides} />
}
