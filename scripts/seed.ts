import { createClient } from '@supabase/supabase-js'
import { PEPTIDES, SUPPLIERS, STACKS } from '../data/peptides'

const supabase = createClient(
  'https://adpumkdmeuuvecdbzxcj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkcHVta2RtZXV1dmVjZGJ6eGNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNDc0NDMsImV4cCI6MjA4NzYyMzQ0M30.2wDxM6MPxu4fK_tgrh6SH5IE2I1ACzAkh0dN4bf-iuc'
)

async function seed() {
  console.log('Fetching categories...')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, slug')
  
  if (catError || !categories) {
    console.error('Error fetching categories:', catError)
    process.exit(1)
  }

  const categoryMap: Record<string, string> = {}
  categories.forEach(c => { categoryMap[c.slug] = c.id })
  console.log('Category map:', categoryMap)

  console.log('\nInserting peptides...')
  for (const peptide of PEPTIDES) {
    const categoryId = categoryMap[peptide.category_slug]
    if (!categoryId) {
      console.warn(`No category found for slug: ${peptide.category_slug}`)
      continue
    }

    const { category_slug, ...peptideData } = peptide
    const { error } = await supabase
      .from('peptides')
      .upsert({
        ...peptideData,
        category_id: categoryId,
      }, { onConflict: 'slug' })

    if (error) {
      console.error(`Error inserting ${peptide.name}:`, error.message)
    } else {
      console.log(`  ✓ ${peptide.name}`)
    }
  }

  console.log('\nInserting suppliers...')
  for (const supplier of SUPPLIERS) {
    const { error } = await supabase
      .from('suppliers')
      .upsert(supplier, { onConflict: 'slug' })

    if (error) {
      console.error(`Error inserting ${supplier.name}:`, error.message)
    } else {
      console.log(`  ✓ ${supplier.name}`)
    }
  }

  console.log('\nInserting representative prices...')
  const { data: peptideRows } = await supabase.from('peptides').select('id, slug')
  const { data: supplierRows } = await supabase.from('suppliers').select('id, slug')
  
  if (!peptideRows || !supplierRows) {
    console.warn('Could not fetch peptide/supplier rows for price seeding')
    return
  }

  const peptideIdMap: Record<string, string> = {}
  peptideRows.forEach(p => { peptideIdMap[p.slug] = p.id })
  
  const supplierIdMap: Record<string, string> = {}
  supplierRows.forEach(s => { supplierIdMap[s.slug] = s.id })

  const samplePrices = [
    { peptide: 'bpc-157', supplier: 'swiss-chems', price: 36.95, quantity_mg: 10, form: 'injectable' },
    { peptide: 'bpc-157', supplier: 'core-peptides', price: 47.00, quantity_mg: 5, form: 'injectable' },
    { peptide: 'bpc-157', supplier: 'research-chemical', price: 54.99, quantity_mg: 5, form: 'liquid' },
    { peptide: 'bpc-157', supplier: 'pure-rawz', price: 55.48, quantity_mg: 5, form: 'injectable' },
    { peptide: 'tb-500', supplier: 'swiss-chems', price: 69.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'tb-500', supplier: 'pure-rawz', price: 64.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'tb-500', supplier: 'core-peptides', price: 58.00, quantity_mg: 5, form: 'injectable' },
    { peptide: 'cjc-1295', supplier: 'swiss-chems', price: 52.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'cjc-1295', supplier: 'amino-asylum', price: 44.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'cjc-1295', supplier: 'limitless-life', price: 59.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'ipamorelin', supplier: 'swiss-chems', price: 52.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'ipamorelin', supplier: 'amino-asylum', price: 39.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'ipamorelin', supplier: 'pure-rawz', price: 49.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'sermorelin', supplier: 'swiss-chems', price: 42.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'sermorelin', supplier: 'limitless-life', price: 49.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'epithalon', supplier: 'swiss-chems', price: 86.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'epithalon', supplier: 'core-peptides', price: 79.00, quantity_mg: 10, form: 'injectable' },
    { peptide: 'epithalon', supplier: 'spectre-labs', price: 94.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'ghk-cu', supplier: 'swiss-chems', price: 44.99, quantity_mg: 50, form: 'topical' },
    { peptide: 'ghk-cu', supplier: 'pure-rawz', price: 39.99, quantity_mg: 50, form: 'topical' },
    { peptide: 'pt-141', supplier: 'swiss-chems', price: 37.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'pt-141', supplier: 'amino-asylum', price: 34.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'mk-677', supplier: 'swiss-chems', price: 59.99, quantity_mg: 600, form: 'oral' },
    { peptide: 'mk-677', supplier: 'science-bio', price: 49.99, quantity_mg: 600, form: 'oral' },
    { peptide: 'semaglutide', supplier: 'amino-asylum', price: 149.97, quantity_mg: 3, form: 'injectable' },
    { peptide: 'semaglutide', supplier: 'limitless-life', price: 179.99, quantity_mg: 3, form: 'injectable' },
    { peptide: 'tirzepatide', supplier: 'amino-asylum', price: 199.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'tirzepatide', supplier: 'limitless-life', price: 229.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'thymosin-alpha-1', supplier: 'swiss-chems', price: 64.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'thymosin-alpha-1', supplier: 'limitless-life', price: 74.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'semax', supplier: 'limitless-life', price: 54.99, quantity_mg: 30, form: 'nasal_spray' },
    { peptide: 'selank', supplier: 'limitless-life', price: 49.99, quantity_mg: 30, form: 'nasal_spray' },
    { peptide: 'igf-1-lr3', supplier: 'swiss-chems', price: 88.99, quantity_mg: 1, form: 'injectable' },
    { peptide: 'aod-9604', supplier: 'swiss-chems', price: 79.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'aod-9604', supplier: 'pure-rawz', price: 69.99, quantity_mg: 5, form: 'liquid' },
    { peptide: 'hexarelin', supplier: 'swiss-chems', price: 42.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'ghrp-6', supplier: 'swiss-chems', price: 38.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'ghrp-2', supplier: 'swiss-chems', price: 38.99, quantity_mg: 5, form: 'injectable' },
    { peptide: 'tesamorelin', supplier: 'swiss-chems', price: 127.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'melanotan-2', supplier: 'swiss-chems', price: 44.99, quantity_mg: 10, form: 'injectable' },
    { peptide: 'kisspeptin-10', supplier: 'core-peptides', price: 54.99, quantity_mg: 5, form: 'injectable' },
  ]

  for (const p of samplePrices) {
    const peptideId = peptideIdMap[p.peptide]
    const supplierId = supplierIdMap[p.supplier]
    if (!peptideId || !supplierId) continue

    const { error } = await supabase.from('prices').insert({
      peptide_id: peptideId,
      supplier_id: supplierId,
      price: p.price,
      quantity_mg: p.quantity_mg,
      form: p.form,
      url: `https://${p.supplier}.com`,
    })
    if (error) console.error(`Price error ${p.peptide}/${p.supplier}:`, error.message)
    else console.log(`  ✓ Price: ${p.peptide} @ ${p.supplier}`)
  }

  console.log('\nInserting research studies...')
  const studies = [
    {
      peptide: 'bpc-157', title: 'Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease',
      authors: 'Sikiric P, et al.', journal: 'Current Pharmaceutical Design', year: 2011, doi: '10.2174/138161211797440005',
      summary: 'Review of BPC-157 mechanisms and clinical applications for gastrointestinal disorders.',
      study_type: 'review',
    },
    {
      peptide: 'bpc-157', title: 'Pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon',
      authors: 'Pevec D, et al.', journal: 'Journal of Orthopaedic Research', year: 2010, doi: '10.1002/jor.21008',
      summary: 'BPC-157 significantly accelerated Achilles tendon healing in rat models compared to controls.',
      study_type: 'animal',
    },
    {
      peptide: 'semaglutide', title: 'Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)',
      authors: 'Wilding JPH, et al.', journal: 'New England Journal of Medicine', year: 2021, doi: '10.1056/NEJMoa2032183',
      summary: 'Semaglutide 2.4mg weekly produced mean weight reduction of 14.9% over 68 weeks in adults with obesity.',
      study_type: 'clinical_trial',
    },
    {
      peptide: 'tirzepatide', title: 'Tirzepatide versus Semaglutide for Weight Reduction (SURMOUNT-5)',
      authors: 'Rubino DM, et al.', journal: 'New England Journal of Medicine', year: 2025, doi: '10.1056/NEJMoa2410516',
      summary: 'Tirzepatide produced 20.2% weight loss vs 13.7% for semaglutide over 72 weeks.',
      study_type: 'clinical_trial',
    },
    {
      peptide: 'epithalon', title: 'Peptide Epitalon Activates Telomerase in Human Somatic Cells',
      authors: 'Khavinson VKh, et al.', journal: 'Bulletin of Experimental Biology and Medicine', year: 2003, doi: '10.1023/A:1023442612982',
      summary: 'Epithalon demonstrated activation of telomerase in human somatic cells and may reverse telomere shortening.',
      study_type: 'human',
    },
    {
      peptide: 'tb-500', title: 'Thymosin beta4 promotes corneal wound healing',
      authors: 'Sosne G, et al.', journal: 'Experimental Eye Research', year: 2001, doi: '10.1006/exer.2001.1049',
      summary: 'Thymosin beta-4 (TB-500) significantly accelerated corneal wound healing in animal models through actin regulation.',
      study_type: 'animal',
    },
    {
      peptide: 'mk-677', title: 'Oral Administration of Growth Hormone Secretagogue MK-677 Increases Markers of Bone Turnover',
      authors: 'Svensson J, et al.', journal: 'Journal of Clinical Endocrinology & Metabolism', year: 1998, doi: '10.1210/jcem.83.2.4539',
      summary: 'MK-677 significantly increased GH and IGF-1 levels with sustained elevation over 12-month treatment.',
      study_type: 'human',
    },
    {
      peptide: 'ghk-cu', title: 'GHK-Cu May Prevent Oxidative Stress in Skin by Regulating Copper and Modifying Expression of Numerous Antioxidant Genes',
      authors: 'Pickart L, et al.', journal: 'Cosmetics', year: 2019, doi: '10.3390/cosmetics6020026',
      summary: 'GHK-Cu modulates over 4,000 human genes and provides significant antioxidant protection in skin tissue.',
      study_type: 'review',
    },
    {
      peptide: 'semax', title: 'Semax, an analogue of ACTH(4-7), regulates expression of BDNF and genes implicated in its signaling pathway',
      authors: 'Dolotov OV, et al.', journal: 'Journal of Neurochemistry', year: 2006, doi: '10.1111/j.1471-4159.2006.03922.x',
      summary: 'Semax significantly upregulates BDNF and its downstream signaling pathway in rat hippocampus.',
      study_type: 'animal',
    },
    {
      peptide: 'ipamorelin', title: 'Ipamorelin, the first selective growth hormone secretagogue',
      authors: 'Raun K, et al.', journal: 'European Journal of Endocrinology', year: 1998, doi: '10.1530/eje.0.1390552',
      summary: 'Ipamorelin selectively releases GH without significant effects on ACTH, cortisol, prolactin, or FSH/LH.',
      study_type: 'animal',
    },
  ]

  for (const s of studies) {
    const peptideId = peptideIdMap[s.peptide]
    if (!peptideId) continue
    const { peptide, ...studyData } = s
    const { error } = await supabase.from('research_studies').insert({
      ...studyData,
      peptide_id: peptideId,
    })
    if (error) console.error(`Study error ${s.peptide}:`, error.message)
    else console.log(`  ✓ Study: ${s.title.substring(0, 50)}...`)
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
