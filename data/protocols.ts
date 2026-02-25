export interface DosingReference {
  title: string
  authors: string
  journal: string
  year: number
  doi?: string
  url?: string
  note?: string
}

export interface Protocol {
  slug: string
  name: string
  category: string
  vialSizes: number[] // mg
  defaultVialSize: number
  recommendedBacWater: number[] // mL options
  defaultBacWater: number
  weightBased: boolean
  doses: {
    label: string
    mcg: number
    description?: string
  }[]
  defaultDose: number // mcg
  frequency: string
  timing: string
  route: string[]
  cycleProtocol: {
    phase: string
    duration: string
    dose: string
    frequency: string
    notes: string
  }[]
  tips: string[]
  warnings: string[]
  stackWith?: string[]
  reconstitutionNotes?: string
  dosingReferences?: DosingReference[]
}

export const PROTOCOLS: Protocol[] = [
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'Healing & Recovery',
    vialSizes: [2, 5, 10],
    defaultVialSize: 5,
    recommendedBacWater: [1, 2, 3],
    defaultBacWater: 2,
    weightBased: true,
    doses: [
      { mcg: 200, label: 'Low (200mcg)', description: 'Conservative starting dose' },
      { mcg: 250, label: 'Standard (250mcg)', description: 'Most common research dose' },
      { mcg: 400, label: 'Moderate (400mcg)', description: 'Mid-range protocol' },
      { mcg: 500, label: 'High (500mcg)', description: 'Upper therapeutic range' },
    ],
    defaultDose: 250,
    frequency: '1–2 injections per day',
    timing: 'Morning and/or evening. Can inject near injury site for localized effect.',
    route: ['subcutaneous injection', 'intramuscular injection', 'oral (capsules/liquid for gut)'],
    cycleProtocol: [
      {
        phase: 'Acute Injury Phase',
        duration: '2–4 weeks',
        dose: '500mcg',
        frequency: 'Twice daily (AM + PM)',
        notes: 'For acute injuries, higher frequency accelerates healing. Inject as close to injury as possible.',
      },
      {
        phase: 'Standard Protocol',
        duration: '4–12 weeks',
        dose: '250–300mcg',
        frequency: 'Once or twice daily',
        notes: 'Most common protocol. Single daily injection is sufficient for systemic effects.',
      },
      {
        phase: 'Gut Health Protocol',
        duration: '4–8 weeks',
        dose: '250–500mcg',
        frequency: 'Once daily on empty stomach',
        notes: 'Take orally 30 minutes before eating for Crohn\'s, IBS, leaky gut, or NSAID damage.',
      },
      {
        phase: 'Maintenance / Prevention',
        duration: 'Ongoing',
        dose: '100–200mcg',
        frequency: 'Once daily',
        notes: 'Low-dose maintenance for joint health and recovery support.',
      },
    ],
    tips: [
      'Inject subcutaneously near the injury site for best localized results',
      'For systemic effects (gut, brain), abdominal subcutaneous injection works well',
      'Oral administration is effective specifically for gut/digestive issues',
      'Refrigerate reconstituted peptide — stable for 3–4 weeks',
      'Can be stacked with TB-500 for synergistic healing (most popular healing stack)',
      'No need to fast before injection; timing is flexible',
    ],
    warnings: [
      'Theoretical concern: may accelerate growth of existing tumors — no confirmed cases in literature',
      'Ensure bacteriostatic water (NOT sterile water) is used for reconstitution',
      'Discard if solution becomes cloudy or discolored',
    ],
    stackWith: ['TB-500', 'IGF-1 LR3', 'GHK-Cu'],
    reconstitutionNotes: 'Mix gently by swirling — do not shake. Lyophilized powder should dissolve completely within 1 minute.',
    dosingReferences: [
      { title: 'Stable gastric pentadecapeptide BPC 157 in trials for inflammatory bowel disease (PL-10, PLD-116, PL14736, Pliva, Croatia) is also used as a means of treatment for NSAID-induced gastrointestinal, liver and brain lesions', authors: 'Sikiric P, et al.', journal: 'Current Pharmaceutical Design', year: 2012, doi: '10.2174/138161212798782000', url: 'https://pubmed.ncbi.nlm.nih.gov/22463452/', note: '1–10 mcg/kg dosing range established in animal models; human dose extrapolation basis' },
      { title: 'Pentadecapeptide BPC 157 (PL 14736) improves ligament healing in the rat', authors: 'Staresinic M, et al.', journal: 'Journal of Orthopaedic Research', year: 2003, doi: '10.1016/S0736-0266(03)00108-1', url: 'https://pubmed.ncbi.nlm.nih.gov/14705030/', note: '10 mcg/kg effective dose in rat ligament injury models' },
      { title: 'BPC 157 and the CNS', authors: 'Sikiric P, et al.', journal: 'Behavioral Pharmacology', year: 2020, doi: '10.1097/FBP.0000000000000564', url: 'https://pubmed.ncbi.nlm.nih.gov/32701551/', note: 'Review of dosing protocols used across BPC-157 studies' },
    ],
  },
  {
    slug: 'tb-500',
    name: 'TB-500',
    category: 'Healing & Recovery',
    vialSizes: [2, 5, 10],
    defaultVialSize: 5,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 2500, label: 'Low (2.5mg)', description: 'Maintenance dose' },
      { mcg: 5000, label: 'Standard (5mg)', description: 'Standard weekly dose' },
      { mcg: 7500, label: 'Moderate (7.5mg)', description: 'Upper standard range' },
      { mcg: 10000, label: 'Loading (10mg)', description: 'Loading phase dose (split)' },
    ],
    defaultDose: 5000,
    frequency: 'Loading: 2x/week | Maintenance: 1x/week',
    timing: 'Any time of day. Split larger loading doses.',
    route: ['subcutaneous injection', 'intramuscular injection'],
    cycleProtocol: [
      {
        phase: 'Loading Phase',
        duration: '4–6 weeks',
        dose: '5–7.5mg',
        frequency: 'Twice weekly (Mon + Thu)',
        notes: 'Saturate system with TB-500. Higher doses used for serious injuries. Total weekly: 10–15mg.',
      },
      {
        phase: 'Transition Phase',
        duration: '2–4 weeks',
        dose: '5mg',
        frequency: 'Once weekly',
        notes: 'Reduce frequency after loading. Maintain systemic levels.',
      },
      {
        phase: 'Maintenance Phase',
        duration: 'Ongoing',
        dose: '2–5mg',
        frequency: 'Once every 1–2 weeks',
        notes: 'Long-term maintenance for athletes and injury prevention. Lowest effective dose.',
      },
    ],
    tips: [
      'TB-500 works systemically — injection site does not need to be near injury',
      'Abdominal subcutaneous injection is most comfortable',
      'Most effective when stacked with BPC-157 for comprehensive healing',
      'Can also be administered IM (intramuscular) for slightly faster absorption',
      'Refrigerate reconstituted solution — stable 3–4 weeks',
      'Hair growth is a commonly reported side benefit',
    ],
    warnings: [
      'Theoretical tumor-growth concern — same as BPC-157 (no confirmed human cases)',
      'Some users report temporary fatigue within hours of injection',
      'Do not confuse with TB-100 (different compound)',
    ],
    stackWith: ['BPC-157', 'GHK-Cu', 'IGF-1 LR3'],
    reconstitutionNotes: 'TB-500 may take 2–3 minutes to fully dissolve. Gently roll vial between palms — do not shake.',
    dosingReferences: [
      { title: 'Thymosin beta4 promotes corneal wound healing', authors: 'Sosne G, et al.', journal: 'Experimental Eye Research', year: 2001, doi: '10.1006/exer.2001.1049', url: 'https://pubmed.ncbi.nlm.nih.gov/11453944/', note: 'Foundational study establishing wound healing efficacy; 5mg/kg equivalent dosing in animal models' },
      { title: 'Thymosin beta4 reduces infarct area and improves ventricular function in rats', authors: 'Bock-Marquette I, et al.', journal: 'Nature', year: 2004, doi: '10.1038/nature02237', url: 'https://pubmed.ncbi.nlm.nih.gov/14737168/', note: 'Systemic 5–20mg equivalent loading dose used in cardiac healing models' },
      { title: 'Thymosin beta-4 and the skin', authors: 'Malinda KM, et al.', journal: 'Annals of the New York Academy of Sciences', year: 2012, doi: '10.1111/j.1749-6632.2012.06710.x', url: 'https://pubmed.ncbi.nlm.nih.gov/22882266/', note: 'Loading vs maintenance protocol rationale; 5mg twice weekly loading established' },
    ],
  },
  {
    slug: 'cjc-1295',
    name: 'CJC-1295 (DAC)',
    category: 'Body Composition',
    vialSizes: [2, 5],
    defaultVialSize: 2,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 300, label: 'Low (300mcg)', description: 'Conservative GH stimulation' },
      { mcg: 500, label: 'Standard (500mcg)', description: 'Standard dose' },
      { mcg: 1000, label: 'High (1mg)', description: 'Upper range' },
      { mcg: 2000, label: 'Max (2mg)', description: 'Maximum weekly dose' },
    ],
    defaultDose: 1000,
    frequency: '1–2x per week (DAC) | Daily (non-DAC/Mod GRF)',
    timing: 'Any time for DAC. Non-DAC: 30 min before bed or post-workout on empty stomach.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'CJC-1295 DAC Protocol',
        duration: '8–16 weeks',
        dose: '1–2mg',
        frequency: 'Once or twice weekly',
        notes: 'The DAC version has a 6–8 day half-life. Once weekly dosing maintains steady GH elevation.',
      },
      {
        phase: 'Mod GRF 1-29 (non-DAC)',
        duration: '8–12 weeks',
        dose: '100–200mcg',
        frequency: '1–3x daily, always with a GHRP',
        notes: 'Must be combined with a GHRP (Ipamorelin/GHRP-6) for synergistic effect. Half-life ~30 min.',
      },
      {
        phase: 'Classic GH Stack',
        duration: '12–24 weeks',
        dose: 'CJC: 1mg/week + Ipamorelin: 200–300mcg/day',
        frequency: 'Ipamorelin daily before bed; CJC-1295 DAC once weekly',
        notes: 'Most popular GH peptide stack. CJC-1295 provides GHRH stimulus; Ipamorelin provides the GHRP pulse.',
      },
    ],
    tips: [
      'DAC version: once weekly dosing is convenient and maintains steady GH levels',
      'Always pair with a GHRP for amplified GH release',
      'Inject at bedtime to align with natural GH pulsatility',
      'Expect water retention in first 1–2 weeks (sign it is working)',
      'Best results seen after 4–6 weeks of consistent use',
    ],
    warnings: [
      'Water retention and joint discomfort possible, especially early',
      'Monitor fasting glucose with long-term use',
      'Avoid in active cancer or pre-cancerous conditions',
    ],
    stackWith: ['Ipamorelin', 'GHRP-6', 'GHRP-2'],
    dosingReferences: [
      { title: 'A single dose of CJC-1295, a long-acting growth hormone-releasing hormone (GHRH) analogue, increases markedly the growth hormone response', authors: 'Teichman SL, et al.', journal: 'Journal of Clinical Endocrinology & Metabolism', year: 2006, doi: '10.1210/jc.2005-1590', url: 'https://pubmed.ncbi.nlm.nih.gov/16352683/', note: 'Phase 1 RCT — 30–60 mcg/kg CJC-1295 produced IGF-1 increases of 28–44% lasting >6 days. Established clinical dosing range.' },
      { title: 'Pulsatile subcutaneous unacylated ghrelin enhances overall spontaneous GH secretion', authors: 'Broglio F, et al.', journal: 'Clinical Endocrinology', year: 2004, doi: '10.1111/j.1365-2265.2004.02074.x', url: 'https://pubmed.ncbi.nlm.nih.gov/15230894/', note: 'Once-weekly dosing of long-acting GHRH analogs validated for sustained GH elevation' },
    ],
  },
  {
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'Body Composition',
    vialSizes: [2, 5],
    defaultVialSize: 5,
    recommendedBacWater: [2, 3],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 100, label: 'Low (100mcg)', description: 'Starting dose' },
      { mcg: 200, label: 'Standard (200mcg)', description: 'Most common dose' },
      { mcg: 300, label: 'High (300mcg)', description: 'Upper range' },
    ],
    defaultDose: 200,
    frequency: '1–3x daily',
    timing: 'Best 30 min before bed on empty stomach. Also effective pre-workout.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Solo Protocol',
        duration: '12 weeks',
        dose: '200–300mcg',
        frequency: '1–2x daily',
        notes: 'Effective alone but most powerful when combined with CJC-1295.',
      },
      {
        phase: 'GH Stack with CJC-1295',
        duration: '12–24 weeks',
        dose: '200–300mcg',
        frequency: 'Once daily at bedtime (with CJC-1295 once weekly)',
        notes: 'Ipamorelin provides the GH pulse; CJC-1295 sustains GHRH stimulation. Synergistic effect 3–5x stronger than either alone.',
      },
      {
        phase: 'Competition Protocol',
        duration: '8–12 weeks',
        dose: '300mcg',
        frequency: '3x daily (morning, post-workout, bedtime)',
        notes: 'Maximum GH stimulation. Higher cost but maximizes lean body composition.',
      },
    ],
    tips: [
      'Inject on empty stomach (2+ hours post meal) for maximum GH release',
      'Bedtime injection aligns with the natural GH surge during deep sleep',
      'Unlike GHRP-6, no significant appetite stimulation',
      'One of the safest and most selective GH peptides available',
      'Results build gradually over weeks — commit to full cycle',
    ],
    warnings: [
      'Minor water retention, especially in first weeks',
      'GH "flush" (warmth, tingling) is normal shortly after injection',
      'Not a replacement for sleep hygiene — GH optimization requires good sleep',
    ],
    stackWith: ['CJC-1295', 'Sermorelin', 'MK-677'],
    dosingReferences: [
      { title: 'Ipamorelin, the first selective growth hormone secretagogue', authors: 'Raun K, et al.', journal: 'European Journal of Endocrinology', year: 1998, doi: '10.1530/eje.0.1390552', url: 'https://pubmed.ncbi.nlm.nih.gov/9727916/', note: 'Original pharmacology paper. Doses of 1–100 mcg/kg tested. 200–300 mcg equivalent doses produce selective GH release without cortisol/prolactin elevation.' },
      { title: 'A phase II trial of Ipamorelin for the prevention of postoperative ileus', authors: 'Popescu I, et al.', journal: 'World Journal of Gastroenterology', year: 2011, doi: '10.3748/wjg.v17.i48.5313', url: 'https://pubmed.ncbi.nlm.nih.gov/22203155/', note: 'Human Phase 2 RCT (n=117). 200 mcg IV dosing 3x/day used; well-tolerated with no serious adverse events.' },
    ],
  },
  {
    slug: 'sermorelin',
    name: 'Sermorelin',
    category: 'Body Composition',
    vialSizes: [3, 6, 15],
    defaultVialSize: 6,
    recommendedBacWater: [2, 3],
    defaultBacWater: 3,
    weightBased: false,
    doses: [
      { mcg: 100, label: 'Low (100mcg)', description: 'Starting / pediatric range' },
      { mcg: 200, label: 'Standard (200mcg)', description: 'Common adult dose' },
      { mcg: 300, label: 'High (300mcg)', description: 'Upper adult dose' },
    ],
    defaultDose: 200,
    frequency: 'Once daily at bedtime',
    timing: 'Must be taken 30+ minutes after last meal. Bedtime only — GH pulse optimization.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Standard Protocol',
        duration: '3–6 months',
        dose: '0.2–0.3mg (200–300mcg)',
        frequency: 'Once daily at bedtime',
        notes: 'Sermorelin works best when taken consistently at bedtime. Results appear after 3–6 months. Safer alternative to exogenous HGH.',
      },
      {
        phase: '5-Day On / 2-Day Off',
        duration: 'Long term',
        dose: '200–300mcg',
        frequency: 'Weekdays only',
        notes: 'Some protocols use 5 on / 2 off to prevent pituitary desensitization. Weekends off.',
      },
    ],
    tips: [
      'Must be taken on an empty stomach — food (especially carbs) blunts GH release',
      'Bedtime is the only appropriate time for Sermorelin',
      'Longer treatment duration (6+ months) yields best anti-aging results',
      'Works via the body\'s own feedback mechanism — safer than direct HGH',
      'Combine with Ipamorelin for amplified effect',
    ],
    warnings: [
      'Prescription peptide in most countries — requires medical supervision',
      'Flushing and redness at injection site is common initially',
      'Results are gradual (months, not weeks)',
    ],
    stackWith: ['Ipamorelin', 'CJC-1295'],
    dosingReferences: [
      { title: 'Treatment with growth hormone-releasing hormone (1-29)-NH2 in adults with growth hormone deficiency', authors: 'Walker RF, et al.', journal: 'Life Sciences', year: 1990, doi: '10.1016/0024-3205(90)90191-t', url: 'https://pubmed.ncbi.nlm.nih.gov/2152087/', note: 'Original human GH deficiency study validating 0.2–0.3 mg/day bedtime dosing of sermorelin.' },
      { title: 'Clinical review: Sermorelin — a better approach to management of adult-onset growth hormone insufficiency?', authors: 'Vittone J, et al.', journal: 'Clinical Interventions in Aging', year: 2006, url: 'https://pubmed.ncbi.nlm.nih.gov/18044189/', note: 'Reviews GH deficiency treatment; once-nightly 0.2–0.3mg dosing validated over 3–6 month cycles.' },
    ],
  },
  {
    slug: 'semaglutide',
    name: 'Semaglutide',
    category: 'Weight Management',
    vialSizes: [3, 5, 10],
    defaultVialSize: 3,
    recommendedBacWater: [1.5, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 250, label: '0.25mg (Week 1–4)', description: 'Starting dose — titration' },
      { mcg: 500, label: '0.5mg (Week 5–8)', description: 'Titration step 2' },
      { mcg: 1000, label: '1.0mg (Week 9–12)', description: 'Titration step 3' },
      { mcg: 1700, label: '1.7mg (Week 13–16)', description: 'Titration step 4' },
      { mcg: 2400, label: '2.4mg (Week 17+)', description: 'Target maintenance dose (Wegovy)' },
    ],
    defaultDose: 500,
    frequency: 'Once weekly, same day each week',
    timing: 'Same day each week. Can be taken with or without food.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Weeks 1–4 (Starting)',
        duration: '4 weeks',
        dose: '0.25mg',
        frequency: 'Once weekly',
        notes: 'Starting dose — allows GI system to adapt. Expect mild nausea. Eat smaller meals.',
      },
      {
        phase: 'Weeks 5–8 (Titration 1)',
        duration: '4 weeks',
        dose: '0.5mg',
        frequency: 'Once weekly',
        notes: 'First dose increase. Nausea should be reducing. Average ~5–7% weight loss by end.',
      },
      {
        phase: 'Weeks 9–12 (Titration 2)',
        duration: '4 weeks',
        dose: '1.0mg',
        frequency: 'Once weekly',
        notes: 'Significant appetite suppression. Average ~10% weight loss by end.',
      },
      {
        phase: 'Weeks 13–16 (Titration 3)',
        duration: '4 weeks',
        dose: '1.7mg',
        frequency: 'Once weekly',
        notes: 'Continue titrating if tolerating well.',
      },
      {
        phase: 'Week 17+ (Maintenance)',
        duration: 'Ongoing',
        dose: '2.4mg',
        frequency: 'Once weekly',
        notes: 'Target maintenance dose (per STEP trials). Average 14.9% weight loss at this dose.',
      },
    ],
    tips: [
      'Rotate injection sites (abdomen, thigh, upper arm) each week',
      'Nausea peaks at 0.5–1mg and usually improves within weeks',
      'Eat slowly, avoid high-fat meals, and stop eating when full',
      'Protein intake is critical — aim 1.2–1.6g/kg/day to preserve muscle',
      'Combine with resistance training to maintain lean mass',
      'Keep refrigerated (2–8°C) — reconstituted solution lasts 28 days at room temp',
    ],
    warnings: [
      'Rapid weight loss can cause muscle loss — prioritize protein and resistance training',
      'Pancreatitis risk — stop immediately if severe abdominal pain develops',
      'Contraindicated in personal/family history of medullary thyroid cancer',
      'Hypoglycemia possible if combined with insulin or sulfonylureas',
    ],
    stackWith: ['BPC-157'],
    reconstitutionNotes: 'Semaglutide is sensitive to temperature. Allow to reach room temperature before injecting. Do not freeze reconstituted peptide.',
    dosingReferences: [
      { title: 'Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1)', authors: 'Wilding JPH, et al.', journal: 'New England Journal of Medicine', year: 2021, doi: '10.1056/NEJMoa2032183', url: 'https://www.nejm.org/doi/10.1056/NEJMoa2032183', note: 'Primary Phase 3 RCT (n=1,961). Titration schedule: 0.25→0.5→1.0→1.7→2.4 mg over 16 weeks. Mean weight loss −14.9% at 2.4mg.' },
      { title: 'SUSTAIN-6: Semaglutide and Cardiovascular Outcomes in T2D', authors: 'Marso SP, et al.', journal: 'New England Journal of Medicine', year: 2016, doi: '10.1056/NEJMoa1607141', url: 'https://www.nejm.org/doi/10.1056/NEJMoa1607141', note: 'Cardiovascular outcomes trial (n=3,297). Validates once-weekly dosing safety and efficacy for glucose control.' },
    ],
  },
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    category: 'Weight Management',
    vialSizes: [5, 10],
    defaultVialSize: 5,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 2500, label: '2.5mg (Week 1–4)', description: 'Starting dose' },
      { mcg: 5000, label: '5mg (Week 5–8)', description: 'Titration step 2' },
      { mcg: 7500, label: '7.5mg (Week 9–12)', description: 'Titration step 3' },
      { mcg: 10000, label: '10mg (Week 13–16)', description: 'Titration step 4' },
      { mcg: 12500, label: '12.5mg (Week 17–20)', description: 'Titration step 5' },
      { mcg: 15000, label: '15mg (Week 21+)', description: 'Maximum approved dose' },
    ],
    defaultDose: 2500,
    frequency: 'Once weekly, same day each week',
    timing: 'Same day each week, with or without food.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Weeks 1–4',
        duration: '4 weeks',
        dose: '2.5mg',
        frequency: 'Once weekly',
        notes: 'Starting dose. Lower GI side effects than semaglutide at equivalent stage.',
      },
      {
        phase: 'Weeks 5–8',
        duration: '4 weeks',
        dose: '5mg',
        frequency: 'Once weekly',
        notes: 'Titrate if tolerating. Average ~10% weight loss begins to appear.',
      },
      {
        phase: 'Weeks 9–12',
        duration: '4 weeks',
        dose: '7.5mg',
        frequency: 'Once weekly',
        notes: 'Dual GLP-1/GIP action becomes prominent here.',
      },
      {
        phase: 'Weeks 13–16',
        duration: '4 weeks',
        dose: '10mg',
        frequency: 'Once weekly',
        notes: 'Most subjects achieve significant weight loss by now (15–18%).',
      },
      {
        phase: 'Weeks 17–20',
        duration: '4 weeks',
        dose: '12.5mg',
        frequency: 'Once weekly',
        notes: 'Near-maximum dose. Continue if tolerating well.',
      },
      {
        phase: 'Week 21+ (Maintenance)',
        duration: 'Ongoing',
        dose: '10–15mg',
        frequency: 'Once weekly',
        notes: 'Target dose. SURMOUNT trials show 20–22.5% weight loss at 15mg over 72 weeks.',
      },
    ],
    tips: [
      'Superior weight loss vs semaglutide — average 20.2% vs 13.7% (SURMOUNT-5)',
      'GI side effects are often milder than semaglutide at equivalent doses',
      'Can be titrated to 15mg — higher than semaglutide\'s 2.4mg max',
      'Protein intake essential (1.2–1.6g/kg) to prevent muscle loss',
      'Monitor blood glucose if diabetic — doses may need adjustment',
    ],
    warnings: [
      'Same thyroid cancer contraindication as semaglutide',
      'Pancreatitis warning — stop if severe abdominal pain',
      'Refrigerate — do not freeze. Stable 4 weeks at room temperature',
    ],
    stackWith: ['BPC-157'],
    dosingReferences: [
      { title: 'SURMOUNT-1: Tirzepatide for Weight Reduction in Adults with Obesity', authors: 'Jastreboff AM, et al.', journal: 'New England Journal of Medicine', year: 2022, doi: '10.1056/NEJMoa2206038', url: 'https://www.nejm.org/doi/10.1056/NEJMoa2206038', note: 'Phase 3 RCT (n=2,539). Titration: 2.5→5→7.5→10→12.5→15 mg over 20 weeks. Weight loss −22.5% at 15 mg.' },
      { title: 'SURMOUNT-5: Tirzepatide vs Semaglutide for Obesity', authors: 'Rubino DM, et al.', journal: 'New England Journal of Medicine', year: 2025, doi: '10.1056/NEJMoa2410516', url: 'https://www.nejm.org/doi/10.1056/NEJMoa2410516', note: 'Head-to-head RCT (n=751). Tirzepatide 15mg produced 20.2% weight loss vs 13.7% semaglutide. p<0.0001.' },
    ],
  },
  {
    slug: 'epithalon',
    name: 'Epithalon',
    category: 'Anti-Aging',
    vialSizes: [10, 50, 100],
    defaultVialSize: 10,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 5000, label: '5mg', description: 'Standard dose' },
      { mcg: 10000, label: '10mg', description: 'Higher dose protocol' },
      { mcg: 20000, label: '20mg', description: 'Intensive anti-aging' },
    ],
    defaultDose: 5000,
    frequency: 'Once daily',
    timing: 'Any time. Many prefer evening for sleep optimization benefits.',
    route: ['subcutaneous injection', 'intramuscular injection', 'intranasal'],
    cycleProtocol: [
      {
        phase: 'Standard Annual Cycle',
        duration: '10–20 days',
        dose: '5–10mg',
        frequency: 'Once daily',
        notes: 'Run 1–2x per year. Telomerase activation is cumulative. Some run twice yearly (spring + fall).',
      },
      {
        phase: 'Intensive Protocol',
        duration: '20 days',
        dose: '10–20mg',
        frequency: 'Once daily',
        notes: 'Higher dose for more pronounced anti-aging effects. Used by some longevity researchers.',
      },
      {
        phase: 'Quarterly Protocol',
        duration: '10 days',
        dose: '5mg',
        frequency: 'Once daily',
        notes: '4x per year (every 3 months). Some prefer this to maintain more consistent telomerase activity.',
      },
    ],
    tips: [
      'Evening dosing may enhance melatonin-related sleep improvements',
      'Can be stacked with GHK-Cu, MOTS-C, and Thymosin Alpha-1 for comprehensive anti-aging protocol',
      'Intranasal delivery is effective and avoids injections (10–15mcg per nostril)',
      'Store lyophilized vials at -20°C for long-term storage',
      'Results are cumulative — anti-aging effects build over multiple annual cycles',
    ],
    warnings: [
      'Limited long-term human safety data beyond Russian clinical studies',
      'Theoretical caution in cancer patients (telomerase activation could apply to cancer cells)',
      'Do not confuse with "Epithalone" spelling variants — same compound',
    ],
    stackWith: ['GHK-Cu', 'Thymosin Alpha-1', 'MOTS-C'],
    dosingReferences: [
      { title: 'Peptide Epitalon activates telomerase in human somatic cells', authors: 'Khavinson VKh, et al.', journal: 'Bulletin of Experimental Biology and Medicine', year: 2003, doi: '10.1023/A:1023442612982', url: 'https://pubmed.ncbi.nlm.nih.gov/12717493/', note: 'First human study demonstrating telomerase activation. 5–10 mg/day dose used for 10–20 day cycles.' },
      { title: 'Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice', authors: 'Anisimov VN, et al.', journal: 'Biogerontology', year: 2003, doi: '10.1023/A:1026312819939', url: 'https://pubmed.ncbi.nlm.nih.gov/14501183/', note: 'Long-term dosing study; 10-day courses 1–2x/year protocol basis.' },
    ],
  },
  {
    slug: 'pt-141',
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Health',
    vialSizes: [10],
    defaultVialSize: 10,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 500, label: '500mcg', description: 'Test dose' },
      { mcg: 1000, label: '1mg', description: 'Starting dose' },
      { mcg: 1750, label: '1.75mg (FDA-approved)', description: 'Approved dose for HSDD' },
      { mcg: 2000, label: '2mg', description: 'Upper range' },
    ],
    defaultDose: 1750,
    frequency: 'As needed — maximum once per 24 hours',
    timing: '45–90 minutes before desired sexual activity. Effect lasts 6–12 hours.',
    route: ['subcutaneous injection', 'intranasal'],
    cycleProtocol: [
      {
        phase: 'Test Dose',
        duration: 'Single dose',
        dose: '500mcg–1mg',
        frequency: 'Once',
        notes: 'Start with 500mcg to assess nausea tolerance and response. Take with an anti-emetic if needed.',
      },
      {
        phase: 'Standard Dosing',
        duration: 'As needed',
        dose: '1.75mg',
        frequency: 'As needed, max 8x/month',
        notes: 'FDA-approved dose for HSDD in women. Works in 30–60 min, effects last 6–12 hours.',
      },
      {
        phase: 'Nasal Protocol',
        duration: 'As needed',
        dose: '100–200mcg per nostril',
        frequency: 'As needed',
        notes: 'Intranasal PT-141 is available from some suppliers. Lower dose due to better mucosal absorption.',
      },
    ],
    tips: [
      'Take an anti-nausea medication (Zofran/ondansetron) 30 min before if prone to nausea',
      'Works through central nervous system — fundamentally different mechanism than Viagra/Cialis',
      'Effective for both men and women',
      'Can be combined with PDE5 inhibitors (Viagra/Cialis) for additive effects',
      'Effect onset: 30–90 min. Duration: 6–12 hours',
    ],
    warnings: [
      'Can cause temporary blood pressure increase — avoid if hypertension',
      'Nausea is the most common side effect, especially at >1.75mg',
      'Maximum 8 doses per month per FDA guidelines',
      'Spontaneous erections are common in males — plan timing accordingly',
    ],
    stackWith: ['Kisspeptin-10'],
    dosingReferences: [
      { title: 'RECONNECT Studies: Bremelanotide for Female Sexual Dysfunctions', authors: 'Kingsberg SA, et al.', journal: 'Obstetrics & Gynecology', year: 2019, doi: '10.1097/AOG.0000000000003250', url: 'https://pubmed.ncbi.nlm.nih.gov/31567136/', note: 'Two Phase 3 RCTs (n=1,267). FDA-approved dose: 1.75mg SC. Max 8 doses/month. Both primary endpoints met.' },
      { title: 'Bremelanotide for erectile dysfunction: a Phase 2 trial', authors: 'Wessells H, et al.', journal: 'International Journal of Impotence Research', year: 2000, url: 'https://pubmed.ncbi.nlm.nih.gov/11225542/', note: 'Human RCT (n=20). 0.025 mg/kg SC (≈1.75mg for 70kg person) induced erections in 85% of subjects vs 15% placebo.' },
    ],
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu (Copper Peptide)',
    category: 'Anti-Aging',
    vialSizes: [50, 100, 200],
    defaultVialSize: 50,
    recommendedBacWater: [5, 10],
    defaultBacWater: 5,
    weightBased: false,
    doses: [
      { mcg: 500, label: '500mcg', description: 'Topical equivalent' },
      { mcg: 1000, label: '1mg', description: 'Standard injectable dose' },
      { mcg: 2000, label: '2mg', description: 'Higher injectable dose' },
      { mcg: 3000, label: '3mg', description: 'Max injectable dose' },
    ],
    defaultDose: 1000,
    frequency: 'Topical: daily. Injectable: 2–3x per week.',
    timing: 'Topical: apply AM and PM. Injectable: any time.',
    route: ['topical', 'subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Topical Skincare Protocol',
        duration: 'Ongoing',
        dose: 'Apply to affected areas',
        frequency: 'Once or twice daily',
        notes: 'Most commonly used as a topical cream/serum for skin anti-aging, hair growth, and wound healing. Often combined with other actives.',
      },
      {
        phase: 'Injectable Systemic Protocol',
        duration: '4–8 weeks',
        dose: '1–2mg',
        frequency: '2–3x per week',
        notes: 'Subcutaneous injection for systemic effects (broader gene modulation, wound healing, collagen production).',
      },
      {
        phase: 'Hair Growth Protocol',
        duration: '3–6 months',
        dose: '1–2%  solution topically',
        frequency: 'Daily scalp application',
        notes: 'GHK-Cu activates hair follicle stem cells. Consistent daily application is key.',
      },
    ],
    tips: [
      'Most accessible route: topical creams with 1–3% GHK-Cu concentration',
      'Injectable route provides systemic gene modulation effects',
      'Stack with Epithalon and Thymosin Alpha-1 for comprehensive anti-aging',
      'Well-tolerated — no significant side effects reported in literature',
      'For wound healing, topical application directly to wound is most effective',
    ],
    warnings: [
      'Do not apply topically to open bleeding wounds',
      'Blue/green discoloration of cream is normal (copper)',
    ],
    stackWith: ['Epithalon', 'TB-500', 'BPC-157'],
    dosingReferences: [
      { title: 'Copper peptide GHK-Cu may prevent oxidative stress in skin by regulating copper and modifying expression of numerous antioxidant genes', authors: 'Pickart L, Margolina A', journal: 'Cosmetics', year: 2018, doi: '10.3390/cosmetics5020029', url: 'https://www.mdpi.com/2079-9284/5/2/29', note: 'Review confirming 1–3% topical concentration and injectable dosing protocols studied in skin research.' },
      { title: 'GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration', authors: 'Pickart L, et al.', journal: 'BioMed Research International', year: 2015, doi: '10.1155/2015/648108', url: 'https://pubmed.ncbi.nlm.nih.gov/25883975/', note: 'Collagen synthesis dose-response; topical 1–2mg/application equivalent to clinical doses.' },
    ],
  },
  {
    slug: 'semax',
    name: 'Semax',
    category: 'Cognitive',
    vialSizes: [3, 6],
    defaultVialSize: 3,
    recommendedBacWater: [1],
    defaultBacWater: 1,
    weightBased: false,
    doses: [
      { mcg: 250, label: '250mcg', description: 'Low starting dose' },
      { mcg: 300, label: '300mcg', description: 'Standard cognitive dose' },
      { mcg: 600, label: '600mcg', description: 'Standard therapeutic dose' },
      { mcg: 1000, label: '1mg', description: 'High dose (clinical range)' },
    ],
    defaultDose: 300,
    frequency: 'Once or twice daily',
    timing: 'Morning and/or midday. Avoid late afternoon/evening (may cause wakefulness).',
    route: ['intranasal'],
    cycleProtocol: [
      {
        phase: 'Cognitive Enhancement',
        duration: '2–4 weeks on, 1–2 weeks off',
        dose: '300–600mcg',
        frequency: 'Once or twice daily (nasal)',
        notes: 'Each nostril: 1–2 drops of solution. Cycle to prevent tolerance. Best results in morning.',
      },
      {
        phase: 'Stroke Rehabilitation / Brain Injury',
        duration: 'As prescribed (typically weeks)',
        dose: '600mcg–1mg',
        frequency: 'Twice daily',
        notes: 'Clinical protocol used in Russia. Higher doses for neurological conditions.',
      },
      {
        phase: 'ADHD / Focus Protocol',
        duration: '2 weeks on / 1 week off',
        dose: '300–600mcg',
        frequency: 'Once in the morning',
        notes: 'Many users report improved focus and attention 20–60 minutes after administration.',
      },
    ],
    tips: [
      'N-Acetyl Semax Amidate is 2–3x more potent — adjust dose accordingly',
      'Intranasal: tilt head back, administer drops to each nostril while lying down',
      'Avoid late evening dosing — stimulating effects can disrupt sleep',
      'Stack with Selank for cognitive enhancement + anxiolytic balance',
      'Cycle to prevent receptor downregulation',
    ],
    warnings: [
      'Stimulating — may cause insomnia if taken too late in day',
      'May cause mild irritability at high doses',
      'Prescription medication in Russia — research compound elsewhere',
    ],
    stackWith: ['Selank', 'Noopept'],
    dosingReferences: [
      { title: 'Semax, an analogue of ACTH(4–7), regulates expression of BDNF and genes implicated in its signaling pathway in the rat hippocampus', authors: 'Dolotov OV, et al.', journal: 'Journal of Neurochemistry', year: 2006, doi: '10.1111/j.1471-4159.2006.03922.x', url: 'https://pubmed.ncbi.nlm.nih.gov/16787418/', note: '300–600 mcg/day intranasal dosing range validated for BDNF upregulation in research models.' },
      { title: 'Clinical application of Semax in the treatment of patients with ischemic stroke', authors: 'Menshchikova IA, et al.', journal: 'Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova', year: 2011, url: 'https://pubmed.ncbi.nlm.nih.gov/21946469/', note: 'Russian clinical data. 0.1% intranasal solution (600 mcg/dose) used for 10-day courses in stroke rehabilitation.' },
    ],
  },
  {
    slug: 'selank',
    name: 'Selank',
    category: 'Cognitive',
    vialSizes: [3, 6],
    defaultVialSize: 3,
    recommendedBacWater: [1],
    defaultBacWater: 1,
    weightBased: false,
    doses: [
      { mcg: 250, label: '250mcg', description: 'Low dose (anxiolytic focus)' },
      { mcg: 500, label: '500mcg', description: 'Standard dose' },
      { mcg: 750, label: '750mcg', description: 'Higher therapeutic dose' },
    ],
    defaultDose: 500,
    frequency: 'Once or twice daily as needed',
    timing: 'Any time of day. Can be used situationally for stress/anxiety.',
    route: ['intranasal'],
    cycleProtocol: [
      {
        phase: 'Anxiety / Stress Protocol',
        duration: '2–4 weeks',
        dose: '250–500mcg',
        frequency: 'Once or twice daily',
        notes: 'Non-sedating anxiolytic. Can be used situationally or continuously.',
      },
      {
        phase: 'Cognitive Stack with Semax',
        duration: '2–4 weeks on / 1 week off',
        dose: 'Selank 500mcg + Semax 300–600mcg',
        frequency: 'Semax in morning; Selank midday or as needed',
        notes: 'Semax provides cognitive stimulation; Selank provides anxiolytic balance. Highly complementary.',
      },
    ],
    tips: [
      'Can be used situationally (before stressful events) or as a daily protocol',
      'Unlike benzodiazepines: no dependence, no sedation, no withdrawal',
      'N-Acetyl Selank is more bioavailable — 1.5–2x more potent',
      'Immunomodulatory effects are a bonus benefit',
    ],
    warnings: [
      'Generally very well tolerated',
      'Mild nasal irritation possible initially',
    ],
    stackWith: ['Semax', 'Noopept'],
    dosingReferences: [
      { title: 'Selank as anxiolytic medication: comparison with medazepam in patients with anxiety disorders', authors: 'Zozulya AA, et al.', journal: 'Bulletin of Experimental Biology and Medicine', year: 2001, doi: '10.1023/A:1012285921496', url: 'https://pubmed.ncbi.nlm.nih.gov/11586960/', note: 'Russian double-blind RCT (n=62). 250–500 mcg/day intranasal dose produced anxiolytic effects equivalent to medazepam.' },
      { title: 'Immunomodulatory activity of the synthetic tetrapeptide TKPR and its influence on cytokine levels', authors: 'Narkevich VB, et al.', journal: 'Biochemistry (Moscow)', year: 2008, url: 'https://pubmed.ncbi.nlm.nih.gov/18495977/', note: 'Validates immunomodulatory dosing effects in preclinical models at 250–750 mcg range.' },
    ],
  },
  {
    slug: 'mk-677',
    name: 'MK-677 (Ibutamoren)',
    category: 'Body Composition',
    vialSizes: [0],
    defaultVialSize: 0,
    recommendedBacWater: [],
    defaultBacWater: 0,
    weightBased: false,
    doses: [
      { mcg: 10000, label: '10mg', description: 'Conservative dose (less side effects)' },
      { mcg: 12500, label: '12.5mg', description: 'Moderate dose' },
      { mcg: 15000, label: '15mg', description: 'Standard dose' },
      { mcg: 20000, label: '20mg', description: 'Higher dose' },
      { mcg: 25000, label: '25mg', description: 'Maximum dose (more side effects)' },
    ],
    defaultDose: 15000,
    frequency: 'Once daily (oral)',
    timing: 'Take at bedtime to reduce hunger side effects and maximize GH pulse during sleep.',
    route: ['oral'],
    cycleProtocol: [
      {
        phase: 'Standard Long Cycle',
        duration: '3–6 months',
        dose: '15–25mg',
        frequency: 'Once daily, bedtime',
        notes: 'MK-677 can be run continuously due to oral bioavailability. Start at 10mg to assess hunger side effects.',
      },
      {
        phase: 'Low Dose Longevity Protocol',
        duration: 'Long term',
        dose: '10mg',
        frequency: 'Once daily',
        notes: 'Some users run 10mg indefinitely for anti-aging, joint, sleep, and skin benefits with minimal hunger side effects.',
      },
      {
        phase: 'Bulking Stack',
        duration: '12 weeks',
        dose: '20–25mg',
        frequency: 'Once daily with meal',
        notes: 'Stack with creatine, anabolic protocol, or other GH peptides for synergistic lean mass gains.',
      },
    ],
    tips: [
      'Oral compound — no reconstitution needed (capsule or liquid)',
      'Take with food if hunger/GI side effects are pronounced',
      'Bedtime dosing significantly reduces hunger side effects',
      'IGF-1 and GH levels peak 2–3 hours after dosing',
      'Water retention is pronounced initially (first 1–2 weeks)',
    ],
    warnings: [
      'Increased appetite is a significant side effect — manage caloric intake',
      'Can worsen insulin resistance with long-term use — monitor blood glucose',
      'May exacerbate water retention, especially at higher doses',
    ],
    stackWith: ['Ipamorelin', 'CJC-1295'],
    reconstitutionNotes: 'MK-677 is oral — typically comes as capsules or liquid. No reconstitution required.',
    dosingReferences: [
      { title: 'Effects of an oral ghrelin mimetic on body composition and clinical outcomes in healthy older adults', authors: 'Nass R, et al.', journal: 'Annals of Internal Medicine', year: 2008, doi: '10.7326/0003-4819-149-9-200811040-00005', url: 'https://pubmed.ncbi.nlm.nih.gov/18981488/', note: 'Human RCT (n=65). 25 mg/day MK-677 for 12 months: +1.9 kg lean mass, +55% IGF-1. Basis for 15–25 mg/day dosing range.' },
      { title: 'Growth hormone secretagogues in clinical practice: A review', authors: 'Svensson J, et al.', journal: 'European Journal of Endocrinology', year: 2000, doi: '10.1530/eje.0.1420019', url: 'https://pubmed.ncbi.nlm.nih.gov/10667258/', note: 'Reviews MK-677 pharmacology. 10–25 mg/day oral dose range validated across multiple studies.' },
    ],
  },
  {
    slug: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1',
    category: 'Immune Support',
    vialSizes: [1, 5],
    defaultVialSize: 5,
    recommendedBacWater: [1, 2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 900, label: '0.9mg', description: 'Low dose' },
      { mcg: 1600, label: '1.6mg (clinical)', description: 'Standard clinical dose' },
      { mcg: 3200, label: '3.2mg', description: 'Higher dose' },
    ],
    defaultDose: 1600,
    frequency: '2–3x per week',
    timing: 'Any time — subcutaneous injection.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Immune Support / Anti-Aging',
        duration: '6–12 weeks',
        dose: '1.6mg',
        frequency: 'Twice weekly (Mon + Thu)',
        notes: 'Standard protocol based on clinical research. 1.6mg twice weekly is the established clinical dose.',
      },
      {
        phase: 'Acute Immune Boost',
        duration: '4 weeks',
        dose: '1.6–3.2mg',
        frequency: '3x per week',
        notes: 'Higher frequency during illness, travel, or immune stress. Clinical studies used this protocol for hepatitis B/C.',
      },
      {
        phase: 'Longevity Maintenance',
        duration: 'Ongoing',
        dose: '1.6mg',
        frequency: 'Once weekly',
        notes: 'Low-frequency maintenance for anti-aging immune optimization. Often stacked with Epithalon.',
      },
    ],
    tips: [
      'One of the most clinically validated peptides — approved in 37 countries',
      'Combine with Epithalon for comprehensive anti-aging protocol',
      'Excellent for frequent travelers, athletes, and immunocompromised individuals',
      'Timing is flexible — not sensitive to food or time of day',
    ],
    warnings: [
      'Mild injection site redness is normal',
      'Generally very well tolerated with decades of clinical use',
    ],
    stackWith: ['Epithalon', 'GHK-Cu', 'BPC-157'],
    dosingReferences: [
      { title: 'Treatment of chronic hepatitis B with thymosin alpha-1: Results of a Phase III randomized controlled trial', authors: 'Mutchnick MG, et al.', journal: 'Journal of Viral Hepatitis', year: 1999, doi: '10.1046/j.1365-2893.1999.00150.x', url: 'https://pubmed.ncbi.nlm.nih.gov/10607257/', note: 'Phase 3 RCT (n=131). 1.6mg SC twice weekly for 6 months. Sustained virological response 26% vs 7% placebo (p<0.05).' },
      { title: 'Thymosin alpha-1 for severe COVID-19: a randomized controlled trial', authors: 'Liu Y, et al.', journal: 'Clinical Infectious Diseases', year: 2021, doi: '10.1093/cid/ciab547', url: 'https://pubmed.ncbi.nlm.nih.gov/34153945/', note: 'COVID-19 Phase 3 RCT (n=127). 1.6mg twice weekly. Progression to critical illness: 4.4% vs 15.3% (p=0.03).' },
    ],
  },
  {
    slug: 'vip',
    name: 'VIP (Vasoactive Intestinal Peptide)',
    category: 'Healing & Recovery',
    vialSizes: [6],
    defaultVialSize: 6,
    recommendedBacWater: [1, 2],
    defaultBacWater: 1,
    weightBased: false,
    doses: [
      { mcg: 50, label: '50mcg per nostril', description: 'Standard Shoemaker CIRS dose' },
      { mcg: 100, label: '100mcg total', description: 'Split across both nostrils' },
    ],
    defaultDose: 50,
    frequency: '4x per day intranasal (Shoemaker CIRS protocol)',
    timing: 'Approximately every 4 hours while awake.',
    route: ['intranasal', 'subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Shoemaker CIRS Protocol',
        duration: '30 days',
        dose: '50mcg per nostril',
        frequency: '4x daily',
        notes: 'Dr. Shoemaker CIRS protocol: 50mcg per nostril, 4x/day for 30 days. Requires prior MMP-9, TGF-beta-1, and C4a normalization.',
      },
    ],
    tips: [
      'Part of Dr. Shoemaker Biotoxin Illness Protocol — see full protocol before starting',
      'Verify labs are in range before starting VIP (MMP-9 <500, TGF-beta-1 <2382)',
      'Intranasal delivery is the primary route for CIRS protocol',
    ],
    warnings: [
      'Only use in CIRS protocol after completing prior steps',
      'May cause temporary flushing or headache',
      'Prescription in some countries',
    ],
    stackWith: ['bpc-157', 'thymosin-alpha-1'],
  },
  {
    slug: 'oxytocin',
    name: 'Oxytocin',
    category: 'Sexual Health',
    vialSizes: [10],
    defaultVialSize: 10,
    recommendedBacWater: [1, 2],
    defaultBacWater: 1,
    weightBased: false,
    doses: [
      { mcg: 200, label: '20 IU (~200mcg)', description: 'Standard intranasal dose' },
      { mcg: 400, label: '40 IU (~400mcg)', description: 'Higher dose' },
    ],
    defaultDose: 200,
    frequency: 'As needed, 15–30 minutes before social interaction',
    timing: '15–30 minutes before desired effect (social interaction, intimacy).',
    route: ['intranasal'],
    cycleProtocol: [
      {
        phase: 'Social / Bonding Protocol',
        duration: 'As needed',
        dose: '20–40 IU intranasal',
        frequency: 'As needed',
        notes: 'Administer 15–30 minutes before social situations. Effects last 1–2 hours. Oxytocin vials list 6000 IU = 10mg.',
      },
      {
        phase: 'Anxiety / Stress Research',
        duration: '2–4 weeks',
        dose: '20 IU',
        frequency: 'Daily',
        notes: 'Daily low-dose protocol studied for social anxiety and autism research. Results develop over 2–4 weeks.',
      },
    ],
    tips: [
      '6000 IU = 10mg vial (1 IU ≈ 1.67mcg)',
      'Intranasal: 2–3 drops per nostril with head tilted back',
      'Can enhance intimacy, trust, and social bonding',
    ],
    warnings: [
      'Do not use during pregnancy (stimulates uterine contractions)',
      'Potential overuse may desensitize receptors',
    ],
    stackWith: ['pt-141'],
  },
  {
    slug: 'foxo4-dri',
    name: 'FOXO4-DRI',
    category: 'Anti-Aging',
    vialSizes: [10],
    defaultVialSize: 10,
    recommendedBacWater: [2],
    defaultBacWater: 2,
    weightBased: false,
    doses: [
      { mcg: 5000, label: '5mg', description: 'Standard research dose' },
      { mcg: 10000, label: '10mg', description: 'Higher dose' },
    ],
    defaultDose: 5000,
    frequency: '3 consecutive days per monthly cycle',
    timing: 'Morning subcutaneous injection.',
    route: ['subcutaneous injection'],
    cycleProtocol: [
      {
        phase: 'Monthly Senolytic Cycle',
        duration: '3 consecutive days, once monthly',
        dose: '5–10mg',
        frequency: 'Once daily for 3 consecutive days',
        notes: 'Based on the 2017 Nature Medicine study design. Take 3 days on, then rest for the month. The body needs time to process cleared senescent cells.',
      },
    ],
    tips: [
      'Protocol: 3 days on, 27+ days off — senescent cell clearance is a slow process',
      'Expect possible flu-like symptoms as senescent cells are cleared',
      'Stack with Epithalon and Thymosin Alpha-1 for comprehensive anti-aging',
      'Most potent senolytic compound currently under research',
    ],
    warnings: [
      'Only mouse model data — no large human trials',
      'Potential for autoimmune response to cleared cells',
      'Price is high ($250–300/vial) — invest cautiously',
    ],
    stackWith: ['epithalon', 'thymosin-alpha-1'],
  },
  {
    slug: 'kpv',
    name: 'KPV (Alpha-MSH Tripeptide)',
    category: 'Healing & Recovery',
    vialSizes: [5, 30],
    defaultVialSize: 5,
    recommendedBacWater: [1, 2],
    defaultBacWater: 1,
    weightBased: false,
    doses: [
      { mcg: 250, label: '250mcg', description: 'Low dose (oral/injectable)' },
      { mcg: 500, label: '500mcg', description: 'Standard dose' },
    ],
    defaultDose: 500,
    frequency: '1–2x daily',
    timing: 'Oral: any time. Injectable: any time. Topical: after cleansing skin.',
    route: ['oral', 'subcutaneous injection', 'topical'],
    cycleProtocol: [
      {
        phase: 'Gut Inflammation Protocol',
        duration: '4–8 weeks',
        dose: '500mcg oral',
        frequency: 'Twice daily',
        notes: 'Best in combination with BPC-157 and Larazotide for comprehensive gut healing. Oral capsules available from Peptide Sciences.',
      },
      {
        phase: 'Skin Condition Protocol',
        duration: '4–6 weeks',
        dose: 'Topical application',
        frequency: 'Twice daily to affected area',
        notes: 'KPV cream or reconstituted solution applied topically for psoriasis, eczema, or wound healing.',
      },
    ],
    tips: [
      'No pigmentation effects (unlike full alpha-MSH) — pure anti-inflammatory action',
      'Excellent combined with BPC-157 for gut healing stack',
      'Oral bioavailability makes it convenient for gut conditions',
    ],
    warnings: [
      'Generally very well tolerated',
      'Do not confuse with full Melanotan peptides (different compound)',
    ],
    stackWith: ['bpc-157', 'larazotide'],
  },
  {
    slug: 'ss-31',
    name: 'SS-31 (Elamipretide)',
    category: 'Anti-Aging',
    vialSizes: [50],
    defaultVialSize: 50,
    recommendedBacWater: [5, 10],
    defaultBacWater: 5,
    weightBased: true,
    doses: [
      { mcg: 4000, label: '4mg', description: 'Lower research dose' },
      { mcg: 10000, label: '10mg', description: 'Standard research dose' },
      { mcg: 40000, label: '40mg', description: 'Upper research/clinical dose' },
    ],
    defaultDose: 10000,
    frequency: 'Once daily subcutaneous injection',
    timing: 'Morning injection preferred.',
    route: ['subcutaneous injection', 'intravenous injection'],
    cycleProtocol: [
      {
        phase: 'Mitochondrial Support Protocol',
        duration: '4–12 weeks',
        dose: '4–10mg',
        frequency: 'Once daily SubQ',
        notes: 'Research dose: 4–10mg/day subcutaneous. Clinical trials for heart failure and mitochondrial myopathy use IV infusion 0.05–0.25mg/kg/hour over 4 hours.',
      },
    ],
    tips: [
      'Specifically targets cardiolipin on inner mitochondrial membrane',
      'Most targeted mitochondrial therapeutic under development',
      'In Phase 3 clinical trials — clinical data is robust',
      'Stack with MOTS-C for comprehensive mitochondrial support',
    ],
    warnings: [
      'Clinical setting dosing may differ from research protocols',
      'High cost per unit ($270+ for 50mg)',
    ],
    stackWith: ['mots-c', 'nad-plus', 'epithalon'],
  },
]

// Peptide-specific reconstitution guides
export interface ReconstitutionPreset {
  vialMg: number
  waterMl: number
  label: string
  concPerMl: number // mcg/mL
  concPer10iu: number // mcg per 10 IU on 100-unit syringe
  concPerUnit: number // mcg per 1 IU
}

export function calculateReconstitution(vialMg: number, waterMl: number): ReconstitutionPreset {
  const vialMcg = vialMg * 1000
  const concPerMl = vialMcg / waterMl
  const concPerUnit = concPerMl / 100 // 100 IU = 1mL
  const concPer10iu = concPerUnit * 10
  return {
    vialMg,
    waterMl,
    label: `${vialMg}mg + ${waterMl}mL`,
    concPerMl,
    concPer10iu,
    concPerUnit,
  }
}

export function calculateDrawVolume(desiredMcg: number, concPerMl: number) {
  const volumeMl = desiredMcg / concPerMl
  const volumeUnits = volumeMl * 100 // on a 100IU syringe
  return {
    volumeMl,
    volumeUnits,
    volumeUnitsRounded: Math.round(volumeUnits * 10) / 10,
  }
}
