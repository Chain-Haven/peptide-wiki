import { supabase } from '@/lib/supabase'
import DosageCalculatorClient from '@/components/DosageCalculator'

export const revalidate = 3600

export const metadata = {
  title: 'Peptide Calculator — Reconstitution, Dosage & Protocol Guide',
  description:
    'Complete peptide calculator: reconstitution calculator, dosage calculator, injection volume calculator, per-peptide protocol guides, and full reference table.',
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
