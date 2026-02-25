export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  peptide_count?: number
}

export interface Peptide {
  id: string
  name: string
  slug: string
  aliases: string[]
  category_id: string
  category?: Category
  summary: string
  mechanism: string
  benefits: string[]
  side_effects: string[]
  dosage_info: DosageInfo
  cycle_length: string | null
  stack_with: string[]
  research_status: 'fda_approved' | 'clinical_trials' | 'research_only' | 'prescription'
  administration_routes: string[]
  molecular_formula: string | null
  half_life: string | null
  created_at: string
  updated_at: string
  prices?: Price[]
  research_studies?: ResearchStudy[]
}

export interface DosageInfo {
  min_dose: number | null
  max_dose: number | null
  unit: string
  frequency: string
  notes: string
  weight_based: boolean
}

export interface Supplier {
  id: string
  name: string
  slug: string
  url: string
  has_coa: boolean
  rating: number
  payment_methods: string[]
  ships_internationally: boolean
  logo_url: string | null
  created_at: string
}

export interface Price {
  id: string
  peptide_id: string
  supplier_id: string
  supplier?: Supplier
  price: number
  quantity_mg: number
  form: string
  url: string
  last_updated: string
}

export interface ResearchStudy {
  id: string
  peptide_id: string
  title: string
  authors: string
  journal: string
  year: number
  doi: string | null
  url: string | null
  summary: string
  study_type: 'animal' | 'human' | 'in_vitro' | 'clinical_trial' | 'review'
}

export interface Stack {
  name: string
  slug: string
  description: string
  peptides: string[]
  goal: string
  protocol: string
}
