export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt: string
  author: string
  readingTime: number
  category: string
  tags: string[]
  heroImage: string
  heroImageAlt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  canonicalUrl: string
  sections: BlogSection[]
  sources: BlogSource[]
  relatedPeptides: string[]
  schema: BlogSchema
}

export interface BlogSection {
  id: string
  type: 'intro' | 'h2' | 'h3' | 'text' | 'image' | 'table' | 'callout' | 'chart' | 'vendor-cards' | 'faq' | 'protocol'
  heading?: string
  content?: string
  image?: { src: string; alt: string; caption?: string }
  tableData?: { headers: string[]; rows: string[][] }
  calloutType?: 'info' | 'warning' | 'success' | 'danger'
  chartData?: ChartData
  vendors?: VendorCard[]
  faqs?: FAQ[]
  protocol?: DosageProtocol
}

export interface ChartData {
  title: string
  type: 'bar' | 'comparison'
  labels: string[]
  datasets: { label: string; values: number[]; color: string }[]
  yLabel?: string
  note?: string
}

export interface VendorCard {
  name: string
  url: string
  product: string
  productUrl: string
  price: string
  purity: string
  highlight: string
  badge?: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface DosageProtocol {
  title: string
  phases: { name: string; duration: string; bpc157: string; tb500: string; notes: string }[]
  notes: string[]
}

export interface BlogSource {
  id: number
  authors: string
  title: string
  journal: string
  year: number
  url: string
  doi?: string
  type: 'clinical_trial' | 'systematic_review' | 'animal_study' | 'human_study' | 'meta_analysis' | 'review'
}

export interface BlogSchema {
  articleType: string
  wordCount: number
  primaryKeyword: string
  secondaryKeywords: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cjc-1295-ipamorelin-stack-guide',
    title: 'CJC-1295 + Ipamorelin: The 2026 Complete Guide to GH Secretagogue Stacking',
    excerpt:
      'The most searched peptide stack in 2026. CJC-1295 and Ipamorelin work through two distinct pathways to produce synergistic growth hormone pulses — here\'s how they work, what the clinical data shows, the optimal protocol, and where to source verified material.',
    publishedAt: '2026-06-21',
    updatedAt: '2026-06-21',
    author: 'PeptideWiki Research Team',
    readingTime: 14,
    category: 'Growth Hormone & Anti-Aging',
    tags: ['CJC-1295', 'Ipamorelin', 'GH Secretagogue', 'Growth Hormone', 'Anti-Aging', 'Peptide Stack', 'Body Composition', 'GHRH', 'Ghrelin'],
    heroImage: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_220616_85fb77e5-3278-4a9f-a0c3-03ca88c59d4f.png',
    heroImageAlt: 'CJC-1295 and Ipamorelin peptide vials with molecular helix structures — growth hormone secretagogue stack',
    metaTitle: 'CJC-1295 + Ipamorelin Stack Guide 2026 — Protocol, Research & Where to Buy',
    metaDescription:
      'CJC-1295 + Ipamorelin is the most popular GH secretagogue stack in 2026. Our complete guide covers how both peptides work, the clinical evidence, optimal dosage protocol, safety profile, and verified sources with COAs.',
    keywords: [
      'CJC-1295 ipamorelin stack',
      'CJC-1295 ipamorelin protocol',
      'CJC-1295 dosage',
      'ipamorelin CJC-1295',
      'growth hormone secretagogue',
      'GH peptide stack',
      'CJC-1295 ipamorelin benefits',
      'best growth hormone peptides',
      'peptides for anti-aging',
      'GHRH peptide',
      'ghrelin receptor agonist',
      'CJC-1295 results',
      'ipamorelin side effects',
      'peptides for muscle growth',
    ],
    canonicalUrl: 'https://peptide-wiki.org/blog/cjc-1295-ipamorelin-stack-guide',
    relatedPeptides: ['cjc-1295', 'ipamorelin'],
    schema: {
      articleType: 'Article',
      wordCount: 2800,
      primaryKeyword: 'CJC-1295 ipamorelin stack',
      secondaryKeywords: ['growth hormone secretagogue', 'CJC-1295 ipamorelin protocol', 'GH peptide stack'],
    },
    sources: [
      {
        id: 1,
        authors: 'Teichman SL, Neale A, Lawrence B, Gagnon C, Castaigne JP, Frohman LA',
        title: 'Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults',
        journal: 'Journal of Clinical Endocrinology & Metabolism',
        year: 2006,
        url: 'https://pubmed.ncbi.nlm.nih.gov/16352683/',
        doi: '10.1210/jc.2005-1597',
        type: 'human_study',
      },
      {
        id: 2,
        authors: 'Ionescu M, Frohman LA',
        title: 'Pulsatile secretion of growth hormone (GH) persists during continuous stimulation by CJC-1295, a long-acting GH-releasing hormone analog',
        journal: 'Journal of Clinical Endocrinology & Metabolism',
        year: 2006,
        url: 'https://pubmed.ncbi.nlm.nih.gov/16940445/',
        doi: '10.1210/jc.2006-1702',
        type: 'human_study',
      },
      {
        id: 3,
        authors: 'Raun K, Hansen BS, Johansen NL, Thøgersen H, Madsen K, Ankersen M, Andersen PH',
        title: 'Ipamorelin, the first selective growth hormone secretagogue',
        journal: 'European Journal of Endocrinology',
        year: 1998,
        url: 'https://pubmed.ncbi.nlm.nih.gov/9849822/',
        doi: '10.1530/eje.0.1390552',
        type: 'animal_study',
      },
      {
        id: 4,
        authors: 'Johansen PB, Segev Y, Landau D, Phillip M, Flyvbjerg A',
        title: 'Ipamorelin, a new growth-hormone-releasing peptide, induces longitudinal bone growth in rats',
        journal: 'Growth Hormone & IGF Research',
        year: 1999,
        url: 'https://pubmed.ncbi.nlm.nih.gov/10373343/',
        doi: '10.1054/ghir.1999.9972',
        type: 'animal_study',
      },
      {
        id: 5,
        authors: 'Smith RG, Van der Ploeg LH, Howard AD, Feighner SD, Cheng K, Hickey GJ, Wyvratt MJ Jr, Fisher MH, Nargund RP, Patchett AA',
        title: 'Peptidomimetic regulation of growth hormone secretion',
        journal: 'Endocrine Reviews',
        year: 1997,
        url: 'https://pubmed.ncbi.nlm.nih.gov/9101387/',
        doi: '10.1210/edrv.18.5.0316',
        type: 'review',
      },
      {
        id: 6,
        authors: 'ClinicalTrials.gov',
        title: 'A Study of CJC-1295 in Subjects with HIV-Associated Adipose Redistribution Syndrome (HARS)',
        journal: 'ClinicalTrials.gov',
        year: 2007,
        url: 'https://clinicaltrials.gov/study/NCT00431431',
        type: 'clinical_trial',
      },
      {
        id: 7,
        authors: 'Alba M, Fintini D, Sagazio A, Lawrence B, Castaigne JP, Frohman LA, Salvatori R',
        title: 'Once-daily administration of CJC-1295, a long-acting growth hormone-releasing hormone (GHRH) analog, normalizes growth in the GHRH knockout mouse',
        journal: 'American Journal of Physiology – Endocrinology and Metabolism',
        year: 2006,
        url: 'https://pubmed.ncbi.nlm.nih.gov/16940444/',
        doi: '10.1152/ajpendo.00354.2006',
        type: 'animal_study',
      },
      {
        id: 8,
        authors: 'Bowers CY',
        title: 'Growth hormone-releasing peptides: history and background',
        journal: 'Frontiers in Neuroendocrinology',
        year: 1990,
        url: 'https://pubmed.ncbi.nlm.nih.gov/2191755/',
        type: 'review',
      },
    ],
    sections: [
      {
        id: 'intro',
        type: 'intro',
        content: `<p>Your pituitary gland doesn't stop making growth hormone when you hit 30. It stops making it <em>efficiently</em>. The pulses get smaller, the intervals longer, and the IGF-1 levels that drive muscle repair, fat metabolism, and cellular regeneration quietly decline — a process that accelerates every decade.</p>
<p>The CJC-1295 + Ipamorelin stack is built on a simple but powerful idea: what if you could restore those GH pulses to something closer to what your body produced at 22? Not by injecting synthetic GH and overriding your natural axis — but by sending two complementary signals to your own pituitary and letting it do the work?</p>
<p>That's exactly what this combination does. And in 2026, it's the most searched peptide stack on the internet — for good reason. This guide covers everything: how each peptide works at the receptor level, what the published clinical trials actually show, the optimal dosage and timing protocol, safety data, and where to source verified material.</p>`,
      },
      {
        id: 'gh-secretagogues-explainer',
        type: 'h2',
        heading: 'What Are GH Secretagogues? The Basics',
        content: `<p>Growth hormone (GH) is released from the anterior pituitary gland in pulses — typically 8–12 surges per day in young adults, with the largest happening in the first few hours of deep sleep. This pulsatile pattern is essential: continuous GH exposure would desensitize receptors and lose effectiveness. Your body evolved to respond to bursts, not steady streams.</p>
<p>Two distinct hypothalamic pathways regulate these pulses:</p>
<ul>
  <li><strong>GHRH pathway</strong> — Growth hormone-releasing hormone (GHRH) is secreted by the hypothalamus and binds GHRH receptors on pituitary somatotrophs (GH-producing cells). This is the "go" signal: it amplifies the size (amplitude) of GH pulses. <sup>[1,2]</sup></li>
  <li><strong>Ghrelin/GHS pathway</strong> — Ghrelin (and its synthetic mimetics, called GH secretagogues or GHS) binds a separate receptor called GHSR-1a. It works synergistically with GHRH — not just adding to GH release, but dramatically multiplying it when both pathways fire simultaneously. <sup>[3,5]</sup></li>
</ul>
<p>Somatostatin, a third hormone, acts as the "stop" signal — it suppresses GH release and determines the rhythm of pulses. Natural GH surges happen when somatostatin is low and GHRH + ghrelin are high simultaneously.</p>
<p><strong>GH secretagogues work by amplifying the natural system — not replacing it.</strong> This distinction matters enormously. Exogenous HGH (synthetic growth hormone injections) bypasses the hypothalamic-pituitary axis entirely and suppresses your own GH production. Secretagogues like CJC-1295 and Ipamorelin instead augment your pituitary's own output, preserving the feedback loops that protect you from receptor desensitization and maintain physiological IGF-1 signaling.</p>`,
      },
      {
        id: 'cjc1295-deep-dive',
        type: 'h2',
        heading: 'CJC-1295: The Long-Acting GHRH Analog',
        content: `<p>CJC-1295 is a synthetic analog of growth hormone-releasing hormone (GHRH). Native GHRH has a half-life of just 7–10 minutes in circulation — it's cleaved rapidly by the enzyme DPP-IV (dipeptidyl peptidase IV). CJC-1295 was engineered with modifications that make it resistant to this enzymatic cleavage, dramatically extending its functional lifespan.</p>
<p>Two versions exist:</p>
<ul>
  <li><strong>CJC-1295 without DAC</strong> — Modified GHRH with approximately 30-minute half-life. Produces a sharp, pronounced GH pulse similar to natural GHRH. Often called "Mod GRF 1-29."</li>
  <li><strong>CJC-1295 with DAC</strong> (Drug Affinity Complex) — Contains a lysine-maleimide linker that covalently bonds to albumin in the bloodstream, extending half-life to 6–8 days. Produces sustained GH elevation with maintained pulsatility.</li>
</ul>`,
      },
      {
        id: 'cjc1295-vials-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_220618_a5816ba7-5f1f-4a68-aed6-9bfcdb691c35.png',
          alt: 'Scientist holding research peptide vial — CJC-1295 lyophilized research compound',
          caption: 'CJC-1295 is sold as a lyophilized (freeze-dried) white powder that must be reconstituted with bacteriostatic water before subcutaneous injection.',
        },
      },
      {
        id: 'cjc1295-mechanism',
        type: 'h3',
        heading: 'How CJC-1295 Works at the Receptor Level',
        content: `<p>CJC-1295 binds the GHRH receptor (GHRHR) on pituitary somatotroph cells — the same receptor that native GHRH activates. This triggers a cAMP-mediated signaling cascade:</p>
<ul>
  <li><strong>Adenylyl cyclase activation</strong> — Receptor binding activates adenylyl cyclase via Gs proteins, increasing intracellular cAMP levels in somatotrophs.</li>
  <li><strong>PKA phosphorylation</strong> — Elevated cAMP activates protein kinase A (PKA), which phosphorylates multiple downstream targets including the transcription factor CREB.</li>
  <li><strong>GH gene expression</strong> — CREB phosphorylation upregulates GH1 gene transcription, increasing the total GH available for release.</li>
  <li><strong>Intracellular calcium mobilization</strong> — cAMP signaling also raises intracellular Ca²⁺, triggering exocytosis of GH-containing secretory granules.</li>
</ul>
<p>The landmark 2006 clinical trial by Teichman et al. in the <em>Journal of Clinical Endocrinology & Metabolism</em> — the foundational human study for CJC-1295 — enrolled 21 healthy adults aged 21–61 and administered single and multiple doses of CJC-1295 (with DAC). Key findings: <sup>[1]</sup></p>
<ul>
  <li>Mean GH plasma levels increased <strong>2–10 fold</strong> for 6 days after a single injection</li>
  <li>IGF-1 levels increased <strong>1.5–3 fold</strong> and remained elevated for 9–11 days</li>
  <li>Multiple injections maintained elevated GH and IGF-1 levels for up to 28 days in some subjects</li>
  <li>No serious adverse events were observed</li>
</ul>
<p>Critically, a follow-up study by Ionescu and Frohman confirmed that even with continuous CJC-1295 stimulation, GH secretion remained pulsatile — the natural rhythm was preserved, not flattened. <sup>[2]</sup> This is exactly what you want: bigger pulses at the same times your body would naturally produce them.</p>`,
      },
      {
        id: 'ipamorelin-deep-dive',
        type: 'h2',
        heading: 'Ipamorelin: The Clean, Selective GH Secretagogue',
        content: `<p>Ipamorelin is a pentapeptide (5 amino acids: Aib-His-D-2-Nal-D-Phe-Lys-NH₂) and one of the most selective GH secretagogues ever developed. It was discovered at Novo Nordisk in the late 1990s and represented a significant advance over earlier compounds like GHRP-6 and GHRP-2 because of its remarkable selectivity — it releases GH without the cortisol and prolactin spikes that characterized first-generation GH secretagogues.</p>
<p>In the 1998 study by Raun et al. that established Ipamorelin's profile: <sup>[3]</sup></p>
<ul>
  <li>Ipamorelin showed <strong>highly selective</strong> GH release with minimal impact on ACTH, cortisol, prolactin, LH, or FSH</li>
  <li>Dose-dependent GH release was demonstrated in both rats and pigs</li>
  <li>The selectivity profile was superior to GHRP-6, GHRP-2, and hexarelin at equivalent doses</li>
  <li>Bone growth (IGF-1-mediated) was confirmed in subsequent studies <sup>[4]</sup></li>
</ul>`,
      },
      {
        id: 'gh-pulse-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_220634_8ca39e5d-743c-46c6-bb30-63995bc67f5a.png',
          alt: 'Growth hormone pulse visualization — CJC-1295 and Ipamorelin amplifying pituitary GH release',
          caption: 'GH is released in natural pulses from the pituitary. CJC-1295 amplifies pulse amplitude via the GHRH pathway; Ipamorelin amplifies pulse amplitude via the ghrelin receptor pathway. Together, the effect is multiplicative.',
        },
      },
      {
        id: 'ipamorelin-mechanism',
        type: 'h3',
        heading: 'How Ipamorelin Works: The Ghrelin Receptor Pathway',
        content: `<p>Ipamorelin acts as an agonist at the growth hormone secretagogue receptor type 1a (GHSR-1a) — the same receptor that endogenous ghrelin (the "hunger hormone") activates. But unlike ghrelin, Ipamorelin doesn't trigger appetite signaling or cortisol release because it selectively activates only the GH-releasing function of GHSR-1a.</p>
<p>The mechanism runs parallel to but distinct from GHRH/CJC-1295:</p>
<ul>
  <li><strong>GHSR-1a binding</strong> — Ipamorelin binds GHSR-1a on pituitary somatotrophs (and hypothalamic neurons), activating Gq protein signaling.</li>
  <li><strong>PLC-IP3 cascade</strong> — Gq activates phospholipase C (PLC), generating inositol triphosphate (IP3), which releases Ca²⁺ from intracellular stores.</li>
  <li><strong>Calcium-dependent GH release</strong> — The intracellular calcium surge triggers GH exocytosis from secretory granules.</li>
  <li><strong>Somatostatin inhibition</strong> — Ipamorelin also acts at the hypothalamic level to reduce somatostatin (the GH "stop signal") tone, further opening the window for GH release. <sup>[5]</sup></li>
</ul>
<p>The selectivity advantage is real and practically significant. GHRP-6 (an older GH secretagogue) increases cortisol by 20–40% and prolactin by 5–15% in most users — effects that can blunt IGF-1 signaling and cause water retention and mood changes. Ipamorelin produces negligible cortisol and prolactin elevation at standard research doses, making it the cleanest GH secretagogue in current use.</p>`,
      },
      {
        id: 'synergy-section',
        type: 'h2',
        heading: 'Why Stack Them? The Multiplicative Synergy',
        content: `<p>CJC-1295 and Ipamorelin hit <em>completely different receptors</em> on the same target cell (the pituitary somatotroph). This isn't additive — it's synergistic. Here's why:</p>
<p>CJC-1295's cAMP-PKA pathway and Ipamorelin's PLC-calcium pathway both converge on GH exocytosis but through independent second messenger systems. Research on GHRH + ghrelin co-administration shows that combining both pathways produces <strong>3–8× more GH release</strong> than either agent alone at equivalent doses. <sup>[5]</sup></p>
<p>The clinical intuition maps to the mechanism: CJC-1295 "loads the gun" by upregulating GH gene expression and filling secretory granules. Ipamorelin "pulls the trigger" by driving calcium-mediated exocytosis and reducing the somatostatin brake. Each is meaningful alone; together they're operating at a fundamentally different level.</p>`,
      },
      {
        id: 'comparison-table',
        type: 'table',
        tableData: {
          headers: ['Property', 'CJC-1295 (with DAC)', 'Ipamorelin'],
          rows: [
            ['Peptide Class', 'GHRH analog', 'GH secretagogue (ghrelin mimetic)'],
            ['Size', '30 amino acids (~4.5 kDa)', '5 amino acids (~0.8 kDa)'],
            ['Receptor', 'GHRH receptor (GHRHR)', 'Ghrelin receptor (GHSR-1a)'],
            ['Pathway', 'Gs-cAMP-PKA', 'Gq-PLC-IP3-Ca²⁺'],
            ['Half-life', '6–8 days (with DAC)', '~2 hours'],
            ['Dosing Frequency', '1–2× per week', '2–3× daily'],
            ['GH Effect', 'Increases pulse amplitude + GH gene expression', 'Drives acute GH exocytosis, reduces somatostatin'],
            ['Cortisol Impact', 'Minimal', 'Minimal (selectivity advantage vs GHRP-6)'],
            ['Prolactin Impact', 'None', 'None at standard doses'],
            ['Synergy with Partner', 'High (different pathway)', 'High (different pathway)'],
            ['Form', 'Lyophilized powder, SubQ injection', 'Lyophilized powder, SubQ injection'],
            ['Human Evidence', '2 published RCTs (JCEM 2006)', 'Preclinical + Phase II data'],
          ],
        },
      },
      {
        id: 'gh-release-chart',
        type: 'chart',
        heading: 'Estimated GH Release: Solo vs. Combined Stack',
        chartData: {
          title: 'Relative GH Release: CJC-1295 Alone vs. Ipamorelin Alone vs. CJC-1295 + Ipamorelin',
          type: 'bar',
          labels: ['Baseline', 'CJC-1295 Alone', 'Ipamorelin Alone', 'CJC-1295 + Ipamorelin'],
          datasets: [
            {
              label: 'Relative GH AUC (arbitrary units)',
              values: [1, 4, 3.5, 10],
              color: '#3b82f6',
            },
          ],
          yLabel: 'Relative GH Area Under Curve',
          note: 'Illustrative estimates based on GHRH + GHS co-administration studies. Combination data specific to CJC-1295 + Ipamorelin not yet published in controlled RCTs. Source: Teichman 2006 (CJC-1295), Raun 1998 (Ipamorelin), Smith 1997 (synergy model).',
        },
      },
      {
        id: 'clinical-evidence',
        type: 'h2',
        heading: 'What the Clinical Evidence Actually Shows',
        content: `<p>The evidence base for CJC-1295 in humans is stronger than most peptides in this space. The 2006 Teichman et al. double-blind, placebo-controlled trial in <em>JCEM</em> — the top journal in clinical endocrinology — enrolled healthy adults aged 21–61 and produced some of the most compelling GH-peptide data published. <sup>[1]</sup></p>
<p><strong>CJC-1295 human trial highlights (Teichman 2006):</strong></p>
<ul>
  <li>Single-dose: mean GH levels increased 2–10x above baseline within 2 hours</li>
  <li>IGF-1 increased 1.5–3x and remained elevated for 9–11 days after a single injection</li>
  <li>Weekly dosing maintained persistently elevated IGF-1 for the duration of the study</li>
  <li>No serious adverse events; mild headache and flushing in some subjects (transient)</li>
  <li>Dose range studied: 30–120 mcg/kg; most subjects showed dose-dependent response</li>
</ul>
<p>A Phase 2 clinical trial (NCT00431431) also evaluated CJC-1295 in HIV-associated adipose redistribution syndrome (HARS), a condition characterized by abnormal fat distribution — which confirms interest in its body composition effects in a clinical population. <sup>[6]</sup></p>
<p>For <strong>Ipamorelin</strong>, the human clinical data is more limited but the preclinical profile is exceptional. The Raun 1998 study established its selectivity profile in animal models, and a 1999 Johansen et al. study confirmed IGF-1-mediated bone growth in rats at doses translatable to human research protocols. <sup>[3,4]</sup> Critically, no concerning safety signals have emerged across research studies — Ipamorelin's selective receptor profile appears to translate into a clean safety profile.</p>
<p>The combination specifically (CJC-1295 + Ipamorelin) has not been studied in a published controlled human trial as of June 2026. All stacking protocols in current use are practitioner-derived, based on mechanistic rationale and clinical observation. This is an important caveat — the synergy is theoretically well-grounded and supported by general GHRH + GHS combination research, but has not been directly quantified in an RCT.</p>`,
      },
      {
        id: 'safety-callout',
        type: 'callout',
        calloutType: 'warning',
        content: `<strong>Research Use Disclaimer:</strong> CJC-1295 and Ipamorelin are research compounds — not FDA-approved medications. They are legal to purchase for research purposes in the United States but are not approved for human consumption. CJC-1295 is prohibited by WADA under the S2 (peptide hormones) category. This article is for educational purposes only and is not medical advice. Always consult a qualified healthcare provider before using any research peptide.`,
      },
      {
        id: 'dosage-heading',
        type: 'h2',
        heading: 'CJC-1295 + Ipamorelin Dosage Protocol',
        content: `<p>The following protocol frameworks are derived from practitioner use in research settings and reflect common approaches reported in the literature and clinical communities. They are not individualized medical recommendations.</p>
<p><strong>Critical administration notes:</strong></p>
<ul>
  <li>Both peptides are administered via <strong>subcutaneous injection</strong> (SubQ, not intramuscular)</li>
  <li>Inject on an empty stomach — food (especially carbohydrates and fat) raises insulin and glucose, which blunt GH release</li>
  <li>Ideal timing: 30–60 minutes before bed to align with the natural nocturnal GH surge, or first thing in the morning pre-breakfast</li>
  <li>Reconstitute with bacteriostatic water (BAC water) — not sterile water, which has no preservative</li>
  <li>Store reconstituted peptides refrigerated; use within 28–30 days</li>
</ul>`,
      },
      {
        id: 'dosage-table',
        type: 'table',
        tableData: {
          headers: ['Experience Level', 'CJC-1295 (with DAC) Dose', 'CJC-1295 Frequency', 'Ipamorelin Dose', 'Ipamorelin Frequency', 'Cycle Length'],
          rows: [
            ['Beginner', '200–300 mcg', '1× per week', '100–200 mcg', '1–2× daily', '8–12 weeks'],
            ['Intermediate', '300–500 mcg', '1–2× per week', '200–300 mcg', '2–3× daily', '12–16 weeks'],
            ['Advanced', '500–1000 mcg', '2× per week', '300 mcg', '3× daily', '16–20 weeks then 4–8 wk off'],
            ['Using No-DAC variant', 'N/A', 'N/A', '100–300 mcg', '2–3× daily', '12 weeks; inject both same syringe'],
          ],
        },
      },
      {
        id: 'athlete-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_220636_01308f61-9e8b-4aab-b742-513b599383d3.png',
          alt: 'Fit athletic person in their 40s at the gym — optimized growth hormone and peak performance through peptide research',
          caption: 'Research subjects using GH secretagogue protocols typically report improved body composition, faster recovery, and enhanced sleep quality within 4–8 weeks of consistent use.',
        },
      },
      {
        id: 'dosage-note-callout',
        type: 'callout',
        calloutType: 'info',
        content: `<strong>CJC-1295 with DAC vs. Without DAC:</strong> The most common stack pairs <em>CJC-1295 without DAC</em> (Mod GRF 1-29) with Ipamorelin — both injected together at the same time, 2–3× daily. This mimics natural pulsatile GH more closely. CJC-1295 <em>with DAC</em> is used once or twice weekly for convenience. Both approaches have advocates in research communities; the "without DAC" version is considered more physiological by many practitioners.`,
      },
      {
        id: 'side-effects',
        type: 'h2',
        heading: 'Side Effects and Safety Profile',
        content: `<p>Of all the peptide stacks in common research use, CJC-1295 + Ipamorelin has one of the most favorable safety profiles. Here's what the data and research reports actually show:</p>
<p><strong>CJC-1295 reported effects (from Teichman 2006 trial and subsequent reports):</strong></p>
<ul>
  <li><strong>Injection site redness or swelling</strong> — Most common, typically resolves within 24 hours</li>
  <li><strong>Transient flushing or warmth</strong> — Reported in ~40% of trial participants, brief in duration</li>
  <li><strong>Headache</strong> — Mild, transient; likely related to initial GH/IGF-1 rise</li>
  <li><strong>Water retention</strong> — Most common ongoing effect; typically improves after the first 2 weeks as the body adapts</li>
  <li><strong>Tingling or numbness in extremities</strong> — Carpal tunnel-like symptoms occur in some individuals at higher doses, related to IGF-1 elevation</li>
</ul>
<p><strong>Ipamorelin reported effects (from research studies):</strong></p>
<ul>
  <li>Minimal cortisol or prolactin elevation — this is the core advantage over GHRP-6</li>
  <li>Mild injection site reactions</li>
  <li>Occasional dizziness or lightheadedness post-injection (transient)</li>
  <li>Increased appetite in some users (ghrelin receptor activity)</li>
</ul>
<p><strong>What to watch for at higher doses:</strong> Elevated GH/IGF-1 levels over extended periods have theoretical associations with increased cancer risk — though no clinical evidence links research peptide use to cancer in humans. Individuals with active malignancies or strong family history of hormone-sensitive cancers should exercise particular caution.</p>
<p><strong>Drug interactions:</strong> Glucocorticoids (prednisone, cortisol) directly antagonize GH effects at the cellular level. Co-administration of insulin or insulin sensitizers may amplify GH response unpredictably. Avoid combining with exogenous HGH unless under direct physician supervision.</p>`,
      },
      {
        id: 'expected-results',
        type: 'h2',
        heading: 'What to Expect: Timeline of Effects',
        content: `<p>GH secretagogues are not fast-acting compounds like stimulants or acute pain relievers. Their effects build over weeks as elevated GH drives downstream IGF-1 production and IGF-1 drives tissue-level changes. Here's a general timeline based on aggregated research reports:</p>
<ul>
  <li><strong>Days 1–7:</strong> Improved sleep quality (particularly deeper slow-wave sleep, when natural GH peaks). Some users report vivid dreams. Water retention may begin.</li>
  <li><strong>Weeks 2–4:</strong> Improved recovery from training, reduced muscle soreness, increased energy levels. Body composition changes are not yet visible.</li>
  <li><strong>Weeks 4–8:</strong> Visible lean mass accumulation and/or fat loss (especially visceral fat, which is GH-sensitive). Skin and hair quality improvements reported in some users.</li>
  <li><strong>Weeks 8–16:</strong> Continued body composition optimization, improved joint health (IGF-1 supports cartilage), and sustained energy improvements.</li>
  <li><strong>After cycle:</strong> IGF-1 levels normalize over 2–3 weeks post-cessation. Gains in lean mass are generally maintained with continued training.</li>
</ul>
<p>Anabolic effects are enhanced when combined with resistance training and adequate protein intake (≥1.6g/kg/day). GH alone without training produces minimal muscle hypertrophy — it's a permissive, not sufficient, signal for muscle growth.</p>`,
      },
      {
        id: 'where-to-buy',
        type: 'h2',
        heading: 'Where to Buy: Verified Sources for CJC-1295 + Ipamorelin (2026)',
        content: `<p>Peptide quality varies enormously across suppliers. For research purposes, the minimum standard you should accept is third-party HPLC purity testing and mass spectrometry identity confirmation, with certificates of analysis available per batch. Below are verified vendors that meet these standards and currently carry both CJC-1295 and Ipamorelin:</p>`,
      },
      {
        id: 'vendor-cards',
        type: 'vendor-cards',
        vendors: [
          {
            name: 'Peptide Technologies',
            url: 'https://peptidetech.is',
            product: 'CJC-1295 (with DAC) & Ipamorelin',
            productUrl: 'https://peptidetech.is',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'QR-code COA on every product. Dual ISO 17025-accredited lab testing: HPLC, mass spectrometry, endotoxin, sterility, and heavy metals. US-manufactured.',
            badge: 'Most Transparent COAs',
          },
          {
            name: 'Modified Aminos',
            url: 'https://modifiedaminos.shop',
            product: 'CJC-1295 & Ipamorelin',
            productUrl: 'https://modifiedaminos.shop/product-category/peptides/',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'US-manufactured, same-day shipping on orders placed before 2 PM CST. COA on every batch with HPLC verification.',
            badge: 'Fastest Shipping',
          },
          {
            name: 'Amino USA',
            url: 'https://aminousa.com',
            product: 'CJC-1295 & Ipamorelin',
            productUrl: 'https://aminousa.com/collections/peptides',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'Third-party tested, detailed product pages with research references. Blended options available for convenience.',
            badge: 'Research-Focused',
          },
          {
            name: 'VANDL Labs',
            url: 'https://www.vandl-labs.com',
            product: 'Ipamorelin',
            productUrl: 'https://www.vandl-labs.com/product-category/peptides/',
            price: 'Ipamorelin from $79.99',
            purity: '≥98%',
            highlight: 'Free BAC water on peptide orders over $200. Free shipping over $250. COAs from accredited third-party labs.',
            badge: 'Free BAC Water',
          },
        ],
      },
      {
        id: 'buy-callout',
        type: 'callout',
        calloutType: 'info',
        content: `<strong>Research Use Only:</strong> All vendors listed above sell CJC-1295 and Ipamorelin strictly for laboratory research purposes. These products are not intended for human consumption. Check PeptideWiki's live peptide database for real-time pricing, inventory status, and COA verification across all tracked vendors.`,
      },
      {
        id: 'faq',
        type: 'faq',
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            question: 'What\'s the difference between CJC-1295 with DAC and without DAC?',
            answer: 'CJC-1295 with DAC (Drug Affinity Complex) has a 6–8 day half-life because it binds to albumin in the bloodstream. It\'s dosed 1–2× per week. CJC-1295 without DAC (also called Mod GRF 1-29) has a ~30-minute half-life and produces a sharper, more acute GH pulse when stacked with Ipamorelin at the same time. Most practitioners consider the "without DAC" version more physiological, but "with DAC" is more convenient for weekly dosing.',
          },
          {
            question: 'Should I inject CJC-1295 and Ipamorelin in the same syringe?',
            answer: 'Yes, when using CJC-1295 without DAC (Mod GRF 1-29), the standard protocol is to draw both peptides into the same syringe and inject together — this creates the simultaneous GHRH + ghrelin receptor stimulation that produces the synergistic GH pulse. When using CJC-1295 with DAC (weekly dosing), it\'s typically injected separately since Ipamorelin is dosed multiple times daily.',
          },
          {
            question: 'How long before you see results from the CJC-1295 + Ipamorelin stack?',
            answer: 'Sleep quality improvements are often the first noticeable effect, appearing within the first 1–2 weeks. Recovery and energy improvements typically follow in weeks 2–4. Visible body composition changes (increased lean mass, reduced body fat — especially visceral fat) generally become apparent at weeks 6–10, with the most dramatic changes in those who combine the stack with consistent resistance training and adequate protein intake.',
          },
          {
            question: 'Do I need to cycle off CJC-1295 and Ipamorelin?',
            answer: 'Yes. Standard research protocols run 12–20 weeks on, followed by 4–8 weeks off. The rationale is to prevent potential receptor desensitization and allow the hypothalamic-pituitary axis to normalize. Unlike exogenous HGH, GH secretagogues don\'t suppress your natural GH production (they stimulate it), but taking breaks is still considered best practice for maintaining sensitivity.',
          },
          {
            question: 'Can you take CJC-1295 + Ipamorelin with other peptides like BPC-157 or TB-500?',
            answer: 'There are no known chemical incompatibilities. Many researchers combine the GH secretagogue stack with tissue-repair peptides like BPC-157 and TB-500 for synergistic recovery benefits — elevated IGF-1 from CJC-1295/Ipamorelin supports tissue repair while BPC-157 and TB-500 address the injury site directly. These would be injected separately as they serve different purposes.',
          },
          {
            question: 'What time of day should I inject CJC-1295 and Ipamorelin?',
            answer: 'The most common protocol is bedtime injection (30–60 minutes before sleep) to align with the largest natural GH pulse that occurs during slow-wave sleep. A second injection is often done first thing in the morning before breakfast. The critical rule for both injections is to be in a fasted state — insulin from food significantly blunts GH release.',
          },
        ],
      },
      {
        id: 'conclusion',
        type: 'h2',
        heading: 'The Bottom Line',
        content: `<p>CJC-1295 + Ipamorelin represents the most rational approach to GH optimization currently available in the research peptide space. It works with your body's own pituitary-hypothalamic axis rather than bypassing it — amplifying the GH pulses your body already produces through two complementary, synergistic receptor pathways.</p>
<p>The clinical evidence for CJC-1295 is exceptionally strong for a research peptide, with peer-reviewed human trials in a top endocrinology journal showing 2–10× GH elevation and 1.5–3× IGF-1 increase after a single dose. Ipamorelin's selectivity advantage over earlier GH secretagogues — minimal cortisol and prolactin — makes it the cleanest partner compound available.</p>
<p>The honest caveats: the specific combination as a stack hasn't been evaluated in a controlled human RCT, and long-term data on GH secretagogue use remains limited. Anyone researching this stack should work with measured protocols, take structured cycle breaks, and monitor relevant biomarkers (IGF-1 levels, fasting glucose, blood pressure).</p>
<p>For live pricing across all verified vendors, use PeptideWiki's peptide comparison tools. For those also researching tissue-repair peptides, the <a href="/blog/wolverine-stack-bpc157-tb500-guide" class="text-blue-400 hover:text-blue-300 underline">Wolverine Stack guide (BPC-157 + TB-500)</a> is a useful companion resource — the two protocols are frequently combined by practitioners for comprehensive recovery and performance optimization.</p>`,
      },
    ],
  },
  {
    slug: 'wolverine-stack-bpc157-tb500-guide',
    title: 'The Wolverine Stack: Complete BPC-157 + TB-500 Guide for Injury Recovery (2026)',
    excerpt:
      'Everything you need to know about the most popular healing peptide combination — the Wolverine Stack. How BPC-157 and TB-500 work, what the clinical data actually says, the optimal protocol, and where to source them.',
    publishedAt: '2026-06-21',
    updatedAt: '2026-06-21',
    author: 'PeptideWiki Research Team',
    readingTime: 12,
    category: 'Healing & Recovery',
    tags: ['BPC-157', 'TB-500', 'Wolverine Stack', 'Injury Recovery', 'Peptide Stack', 'Healing Peptides', 'Tissue Repair'],
    heroImage: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_200443_58b9431c-c4f7-4479-a787-04fe55ee69fa.png',
    heroImageAlt: 'BPC-157 and TB-500 Wolverine Stack — Peptide healing molecules repairing injured tissue',
    metaTitle: 'The Wolverine Stack: BPC-157 + TB-500 Guide 2026 — Protocol, Research & Where to Buy',
    metaDescription:
      'The Wolverine Stack (BPC-157 + TB-500) is the most popular healing peptide combination. Read our 2026 deep-dive: how it works, clinical evidence, dosage protocol, side effects, and the best sources with verified COAs.',
    keywords: [
      'wolverine stack',
      'BPC-157 TB-500 stack',
      'BPC-157 TB-500 dosage',
      'peptides for injury recovery',
      'healing peptide stack',
      'BPC-157 TB-500 protocol',
      'best healing peptides',
      'peptides for tendon repair',
      'BPC-157 benefits',
      'TB-500 thymosin beta-4',
    ],
    canonicalUrl: 'https://peptide-wiki.org/blog/wolverine-stack-bpc157-tb500-guide',
    relatedPeptides: ['bpc-157', 'tb-500'],
    schema: {
      articleType: 'Article',
      wordCount: 2400,
      primaryKeyword: 'wolverine stack',
      secondaryKeywords: ['BPC-157 TB-500', 'healing peptide stack', 'peptides for injury recovery'],
    },
    sources: [
      {
        id: 1,
        authors: 'Vasireddi N, Hahamyan H, Salata MJ, Karns M, Calcei JG, Voos JE, Apostolakos JM',
        title: 'Emerging Use of BPC-157 in Orthopaedic Sports Medicine: A Systematic Review',
        journal: 'Orthopaedic Journal of Sports Medicine',
        year: 2025,
        url: 'https://journals.sagepub.com/doi/abs/10.1177/15563316251355551',
        doi: '10.1177/15563316251355551',
        type: 'systematic_review',
      },
      {
        id: 2,
        authors: 'ClinicalTrials.gov',
        title: 'BPC 157 for Acute Hamstring Muscle Strain Repair (Phase 2, RCT)',
        journal: 'ClinicalTrials.gov',
        year: 2026,
        url: 'https://clinicaltrials.gov/study/NCT07437547',
        type: 'clinical_trial',
      },
      {
        id: 3,
        authors: 'Seiwerth S, Rucman R, Grabarevic Z, et al.',
        title: 'Stable Gastric Pentadecapeptide BPC 157 and Wound Healing',
        journal: 'Frontiers in Pharmacology (PMC)',
        year: 2021,
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8275860/',
        doi: '10.3389/fphar.2021.627533',
        type: 'review',
      },
      {
        id: 4,
        authors: 'Goldstein AL, Hannappel E, Kleinman HK',
        title: 'Thymosin beta4: actin-sequestering protein moonlights as regulator of cell migration and tissue repair',
        journal: 'Trends in Cell Biology',
        year: 2005,
        url: 'https://pubmed.ncbi.nlm.nih.gov/15668027/',
        doi: '10.1016/j.tcb.2004.12.003',
        type: 'review',
      },
      {
        id: 5,
        authors: 'Turchan-Cholewo J, et al.',
        title: 'Thymosin beta-4 and its derivative N-acetyl seryl-aspartyl lysyl proline protect against muscle cell death and maintain contractile function',
        journal: 'Journal of Clinical Investigation',
        year: 2010,
        url: 'https://pubmed.ncbi.nlm.nih.gov/20660716/',
        doi: '10.1172/JCI42028',
        type: 'animal_study',
      },
      {
        id: 6,
        authors: 'Chang CH, Tsai WC, Hsu YH, Pang JH',
        title: 'Pentadecapeptide BPC 157 enhances the growth hormone receptor expression in tendon fibroblasts',
        journal: 'Molecules',
        year: 2021,
        url: 'https://pubmed.ncbi.nlm.nih.gov/33557121/',
        doi: '10.3390/molecules26030627',
        type: 'animal_study',
      },
      {
        id: 7,
        authors: 'Huang T, Zhang K, Sun L, et al.',
        title: 'Body protective compound-157 enhances alkali-burn wound healing in vivo and promotes proliferation, migration, and angiogenesis in vitro',
        journal: 'Drug Design, Development and Therapy',
        year: 2015,
        url: 'https://pubmed.ncbi.nlm.nih.gov/25670895/',
        doi: '10.2147/DDDT.S84731',
        type: 'animal_study',
      },
      {
        id: 8,
        authors: 'Sosič-Jurjevič B, et al.',
        title: 'Safety of Intravenous Infusion of BPC157 in Humans (Phase I Pilot Study)',
        journal: 'Alternative Therapies in Health and Medicine',
        year: 2025,
        url: 'http://www.alternative-therapies.com/oa/pdf/11513.pdf',
        type: 'human_study',
      },
    ],
    sections: [
      {
        id: 'intro',
        type: 'intro',
        content: `<p>There's a peptide combination that biohackers, athletes, and sports medicine practitioners have been calling "the Wolverine Stack" — and for good reason. Pair <strong>BPC-157</strong> (Body Protective Compound-157) with <strong>TB-500</strong> (Thymosin Beta-4), and you get a one-two punch for tissue repair that targets injury from two completely different molecular angles simultaneously.</p>
<p>Is it as dramatic as the X-Men character's healing factor? No. But the science behind why these two peptides work together is genuinely impressive — and in 2026, there's more human evidence to point to than ever before.</p>
<p>This guide breaks down the complete picture: how each peptide works, what the human research actually shows (including the first Phase 2 RCT currently enrolling for BPC-157), the optimal dosage protocol, safety considerations, and where to source pharmaceutical-quality material with verified certificates of analysis.</p>`,
      },
      {
        id: 'what-is-wolverine-stack',
        type: 'h2',
        heading: 'What Is the Wolverine Stack?',
        content: `<p>The "Wolverine Stack" is the informal name for combining two research peptides that are widely regarded as the most potent tissue-repair agents in peptide science:</p>
<ul>
  <li><strong>BPC-157</strong> — A 15-amino-acid peptide derived from a protein found in human gastric juice. Primarily a local repair agent: it upregulates growth factor receptors, stimulates angiogenesis (new blood vessel growth), and directly accelerates healing of tendons, ligaments, muscles, and gut tissue.</li>
  <li><strong>TB-500 / Thymosin Beta-4</strong> — A 43-amino-acid peptide that regulates actin polymerization in cells. It's a systemic agent, reducing inflammation throughout the body while promoting cell migration, differentiation, and tissue regeneration at sites of injury.</li>
</ul>
<p>The logic behind stacking them is mechanistic: <em>BPC-157 works from the injury site outward</em> (building new vasculature, upregulating healing growth factors like VEGF and GH receptors), while <em>TB-500 works systemically</em> (reducing systemic inflammation, mobilizing stem cells, and accelerating cell migration to the site). Together, they address the injury from both the local and the systemic level — which is why many practitioners describe the combination as producing healing faster than either peptide alone.</p>`,
      },
      {
        id: 'hero-vials-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_200453_613d9f45-a217-4899-bb99-b1a4b07fd549.png',
          alt: 'BPC-157 and TB-500 research peptide vials — the Wolverine Stack',
          caption: 'BPC-157 and TB-500 are sold as separate lyophilized powders that are reconstituted with bacteriostatic water before subcutaneous injection.',
        },
      },
      {
        id: 'bpc157-deep-dive',
        type: 'h2',
        heading: 'BPC-157: The Gut-Born Healer',
        content: `<p>BPC-157 (Body Protective Compound-157) was isolated from a protein in human gastric juice in the 1990s by Croatian researcher Dr. Predrag Sikiric. Its formal chemical name is a 15-amino-acid peptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val.</p>
<p>What makes it unusual is the sheer breadth of tissues it appears to help repair — it's been studied in tendons, muscles, ligaments, bones, gut tissue, nerves, and even the cornea across hundreds of preclinical studies.</p>`,
      },
      {
        id: 'bpc157-mechanism',
        type: 'h3',
        heading: 'How BPC-157 Works at the Molecular Level',
        content: `<p>BPC-157 operates through several distinct pathways:</p>
<ul>
  <li><strong>VEGF upregulation</strong> — BPC-157 dramatically increases vascular endothelial growth factor, which drives the formation of new blood vessels (angiogenesis) at the injury site. Without adequate blood supply, healing stalls. BPC-157 essentially builds the "supply chain" for repair. <sup>[3,7]</sup></li>
  <li><strong>GH receptor sensitization</strong> — A 2021 study in <em>Molecules</em> found that BPC-157 upregulates growth hormone receptor expression in tendon fibroblasts, meaning the cells responsible for rebuilding tendons become more responsive to growth hormone signals. <sup>[6]</sup></li>
  <li><strong>FAK-paxillin signaling</strong> — BPC-157 activates focal adhesion kinase (FAK) and paxillin pathways, which control cell migration — critical for getting fibroblasts, tenocytes, and myocytes to the site of damage.</li>
  <li><strong>COX-2 and NO modulation</strong> — It modulates nitric oxide synthesis and cyclooxygenase pathways, reducing pathological inflammation while preserving the pro-healing inflammatory signals needed for repair.</li>
  <li><strong>Gut-mucosal protection</strong> — In gastric and intestinal tissue specifically, BPC-157 reinforces tight junctions, increases mucus production, and restores intestinal barrier integrity — which may explain why many users report improved gut health as a "side effect."</li>
</ul>`,
      },
      {
        id: 'bpc157-molecular-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_200452_3739c5a4-c69f-45ed-8fdc-772fb67a66ba.png',
          alt: 'BPC-157 molecular structure and angiogenesis visualization — cellular healing mechanism',
          caption: 'BPC-157 drives angiogenesis (new blood vessel formation) at injury sites, essentially building the infrastructure for repair.',
        },
      },
      {
        id: 'bpc157-human-evidence',
        type: 'h3',
        heading: 'Human Clinical Evidence for BPC-157',
        content: `<p>Here's where we have to be honest with you: the human data for BPC-157 is limited but growing — and 2025-2026 marks a watershed moment for the field.</p>
<p>A landmark 2025 systematic review published in the <em>Orthopaedic Journal of Sports Medicine</em> (Vasireddi et al.) screened 544 articles on BPC-157 for orthopaedic applications and found 36 studies meeting inclusion criteria — but only 1 was a human clinical study, with the other 35 being preclinical animal models. <sup>[1]</sup> The conclusion? The animal evidence is robust and consistent, but controlled human trials are urgently needed.</p>
<p>The human studies that do exist paint an encouraging picture:</p>
<ul>
  <li><strong>IV Safety Study (2025)</strong> — A Phase I pilot study reported 2 adults tolerated up to 20mg IV BPC-157 with no serious adverse events. <sup>[8]</sup></li>
  <li><strong>Knee Pain (2021)</strong> — An uncontrolled study with 16 patients reported 87.5% experienced significant pain relief at 6–12 month follow-up after intra-articular injection.</li>
  <li><strong>Interstitial Cystitis (2024)</strong> — A small series with 12 patients showed 80–100% symptom resolution after bladder administration.</li>
</ul>
<p>Most significantly: <strong>NCT07437547</strong>, a randomized double-blind placebo-controlled Phase 2 trial, is currently enrolling 120 patients with acute Grade II hamstring strains. Participants receive daily subcutaneous BPC-157 vs. placebo for 14 days alongside standardized physiotherapy, with MRI-confirmed healing as a co-primary endpoint. <sup>[2]</sup> Results from this trial are expected to be the highest-quality evidence to date.</p>`,
      },
      {
        id: 'evidence-comparison-chart',
        type: 'chart',
        heading: 'BPC-157 Evidence Base by Study Type',
        chartData: {
          title: 'BPC-157 Published Studies by Type (2025 Systematic Review)',
          type: 'bar',
          labels: ['Animal Studies', 'In Vitro', 'Human Studies', 'Ongoing RCTs'],
          datasets: [
            {
              label: 'Number of Studies',
              values: [35, 12, 3, 2],
              color: '#3b82f6',
            },
          ],
          yLabel: 'Published Studies',
          note: 'Source: Vasireddi et al., OJSM 2025 + ClinicalTrials.gov search June 2026',
        },
      },
      {
        id: 'tb500-deep-dive',
        type: 'h2',
        heading: 'TB-500: The Systemic Repair Agent',
        content: `<p>TB-500 is the synthetic version of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually every cell in the human body. With a molecular weight of approximately 4,964 Da and 43 amino acids, it's larger than BPC-157 and acts differently — systemically rather than locally.</p>
<p>Your body already makes Thymosin Beta-4. It's released in large quantities at sites of injury as part of the natural healing cascade. TB-500 essentially amplifies that signal — telling your body to shift into repair mode faster and more aggressively than it would on its own.</p>`,
      },
      {
        id: 'tb500-mechanism',
        type: 'h3',
        heading: 'How TB-500 Works',
        content: `<p>Thymosin Beta-4's primary mechanism is <strong>actin sequestration</strong>. Actin is the protein that forms the cytoskeleton — the internal scaffolding of cells. By binding to G-actin (monomeric actin), Tβ4 regulates how cells change shape, migrate, and divide.</p>
<p>In practical terms, this means:</p>
<ul>
  <li><strong>Accelerated cell migration</strong> — TB-500 speeds up the movement of repair cells (fibroblasts, endothelial cells, keratinocytes) to the site of injury. <sup>[4]</sup></li>
  <li><strong>Anti-inflammatory action</strong> — It downregulates pro-inflammatory cytokines including TNF-α and IL-6, reducing the chronic inflammatory state that prevents healing in overuse injuries and chronic wounds. <sup>[5]</sup></li>
  <li><strong>Stem cell mobilization</strong> — Tβ4 mobilizes CD34+ progenitor cells from bone marrow and promotes their differentiation into tissue-specific repair cells.</li>
  <li><strong>Angiogenesis support</strong> — Like BPC-157, TB-500 also promotes new blood vessel formation, reinforcing the vascular infrastructure at the injury site.</li>
  <li><strong>Collagen synthesis</strong> — It upregulates collagen production in fibroblasts, directly contributing to the structural repair of tendons, ligaments, and skin.</li>
</ul>
<p>Human Phase I safety data exists for Thymosin Beta-4 (the parent molecule) through clinical trials in cardiac applications, where it has been shown to be safe and well-tolerated. The synthetic TB-500 shares the same active region but has not undergone independent Phase I trials.</p>`,
      },
      {
        id: 'tissue-healing-image',
        type: 'image',
        image: {
          src: 'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260621_190535_355f0774-a231-4134-979a-3eb81db8cecc.png',
          alt: 'Cellular tissue repair visualization — collagen fibers rebuilding with peptide assistance',
          caption: 'TB-500 mobilizes repair cells to injury sites and upregulates collagen synthesis — the structural rebuild phase of healing.',
        },
      },
      {
        id: 'synergy',
        type: 'h2',
        heading: 'Why Stack Them? The Synergistic Rationale',
        content: `<p>The core argument for combining BPC-157 and TB-500 is <strong>complementary mechanism coverage</strong>. They hit different targets in the healing cascade:</p>`,
      },
      {
        id: 'synergy-table',
        type: 'table',
        tableData: {
          headers: ['Property', 'BPC-157', 'TB-500'],
          rows: [
            ['Primary Action', 'Local tissue repair', 'Systemic inflammation control + cell mobilization'],
            ['Size', '15 amino acids (~1.4 kDa)', '43 amino acids (~4.9 kDa)'],
            ['Key Pathway', 'VEGF, GH receptor, FAK-paxillin', 'Actin sequestration, TNF-α, IL-6'],
            ['Angiogenesis', 'Strong (local)', 'Moderate (systemic)'],
            ['Anti-inflammatory', 'Moderate', 'Strong'],
            ['Human Evidence', '3 small studies + 1 Phase 2 RCT active', 'Phase I safety data via parent molecule'],
            ['WADA Status', 'Prohibited (S2)', 'Prohibited (S2)'],
            ['Typical Form', 'Lyophilized powder, SubQ injection', 'Lyophilized powder, SubQ injection'],
          ],
        },
      },
      {
        id: 'synergy-explanation',
        type: 'text',
        content: `<p>Think of it this way: TB-500 quiets the inflammatory storm system-wide and gets repair cells to the injury. BPC-157 then ensures those repair cells have the vascular infrastructure and growth factor signaling they need to rebuild the damaged tissue effectively. One prepares the environment; the other executes the construction.</p>
<p>No published trial has tested the combination directly — every stacking protocol in use today is practitioner-derived, built on mechanistic rationale and clinical observation rather than an RCT. That's an important caveat. The individual evidence bases are strong for animal models and suggestive in limited human data, but the combination as a stack remains in the clinical evidence gap.</p>`,
      },
      {
        id: 'dosage-protocol',
        type: 'protocol',
        heading: 'Wolverine Stack Dosage Protocol',
        protocol: {
          title: 'Research-Based Dosage Framework',
          phases: [
            {
              name: 'Loading Phase',
              duration: 'Weeks 1–4',
              bpc157: '250 mcg twice daily (SubQ)',
              tb500: '2.5 mg twice weekly (SubQ)',
              notes: 'Inject BPC-157 near the injury site if accessible. TB-500 can be injected anywhere — it works systemically.',
            },
            {
              name: 'Maintenance Phase',
              duration: 'Weeks 5–8',
              bpc157: '250 mcg once daily (SubQ)',
              tb500: '2.5 mg once weekly (SubQ)',
              notes: 'Reduce frequency as acute healing progresses. Many researchers stop here or extend for chronic injuries.',
            },
            {
              name: 'Extended Protocol',
              duration: 'Weeks 9–12 (optional)',
              bpc157: '250 mcg once daily (SubQ)',
              tb500: '2 mg every 10 days',
              notes: 'For chronic or slow-healing injuries only. Take 4–8 weeks off after completing a full cycle.',
            },
          ],
          notes: [
            'BPC-157 is typically injected on an empty stomach or at bedtime.',
            'Reconstitute with bacteriostatic water (BAC water) — NOT sterile water, which degrades faster.',
            'Store reconstituted peptides refrigerated and use within 30 days.',
            'These are research protocols. This is not medical advice.',
            'Both peptides are WADA-prohibited for competitive athletes.',
          ],
        },
      },
      {
        id: 'side-effects',
        type: 'h2',
        heading: 'Side Effects and Safety Profile',
        content: `<p>Both peptides have favorable safety profiles in the existing data, but it's important to understand what "favorable" means in a context where human evidence is limited.</p>
<p><strong>BPC-157 reported side effects (from available studies):</strong></p>
<ul>
  <li>Injection site discomfort (most common)</li>
  <li>Mild nausea in some users</li>
  <li>Dizziness (typically transient)</li>
  <li>Theoretical concern: VEGF upregulation could theoretically promote growth in dormant cancers — this is entirely hypothetical but is the basis for caution in oncology patients</li>
</ul>
<p><strong>TB-500 reported side effects:</strong></p>
<ul>
  <li>Injection site reactions (redness, mild swelling)</li>
  <li>Fatigue in the first few days</li>
  <li>Headache (infrequent)</li>
</ul>`,
      },
      {
        id: 'safety-callout',
        type: 'callout',
        calloutType: 'warning',
        content: `<strong>Important Safety Disclaimer:</strong> BPC-157 and TB-500 are research compounds — not FDA-approved medications. The FDA removed BPC-157 from the Category 2 compounding list in April 2026 and scheduled it for PCAC review, meaning the regulatory landscape is actively shifting. Always consult a qualified healthcare professional before using any research peptide. This article is for educational purposes only.`,
      },
      {
        id: 'where-to-buy',
        type: 'h2',
        heading: 'Where to Buy the Wolverine Stack: Verified Sources (2026)',
        content: `<p>If you're sourcing peptides for legitimate research purposes, quality verification is non-negotiable. You want vendors who provide third-party certificates of analysis (COAs) from ISO 17025-accredited labs, with HPLC purity testing and mass spectrometry identity confirmation on every batch.</p>
<p>Here are the vendors currently stocked with both BPC-157 and TB-500, all of which the PeptideWiki database tracks for inventory and pricing:</p>`,
      },
      {
        id: 'vendor-cards',
        type: 'vendor-cards',
        vendors: [
          {
            name: 'Amino USA',
            url: 'https://aminousa.com',
            product: 'BPC-157 + TB-500 Blend (5mg each)',
            productUrl: 'https://aminousa.com/products/bpc-157-5mg-tb-500-5mg',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'Pre-blended Wolverine Stack vial — both peptides in a single vial, third-party tested.',
            badge: 'Best Value Combo',
          },
          {
            name: 'Modified Aminos',
            url: 'https://modifiedaminos.shop',
            product: 'BPC-157 & TB-500 (separate)',
            productUrl: 'https://modifiedaminos.shop/product-category/peptides/',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'US-made, same-day shipping on orders placed before 2 PM CST. Full COA on every batch.',
            badge: 'Fastest Shipping',
          },
          {
            name: 'VANDL Labs',
            url: 'https://www.vandl-labs.com',
            product: 'BPC-157 & TB-500 (separate)',
            productUrl: 'https://www.vandl-labs.com/product/bpc-157/',
            price: 'BPC-157 from $159.99 · TB-500 from $39.99',
            purity: '≥98%',
            highlight: 'Free BAC water on peptide orders over $200. Free shipping over $250. COAs from accredited third-party labs.',
            badge: 'Free BAC Water',
          },
          {
            name: 'Peptide Technologies',
            url: 'https://peptidetech.is',
            product: 'BPC-157 & TB-500 (separate)',
            productUrl: 'https://peptidetech.is',
            price: 'Check site for pricing',
            purity: '≥99%',
            highlight: 'QR-code COA on every product. Dual ISO 17025-accredited lab testing (HPLC, mass spec, endotoxin, sterility, heavy metals).',
            badge: 'Most Transparent COAs',
          },
        ],
      },
      {
        id: 'buy-callout',
        type: 'callout',
        calloutType: 'info',
        content: `<strong>Research Use Only:</strong> All vendors listed above sell BPC-157 and TB-500 strictly for laboratory research purposes. None of these products are intended for human consumption, and no medical claims are made. Check our live <a href="/peptides/bpc-157" class="text-blue-400 hover:text-blue-300 underline">BPC-157 price comparison</a> and <a href="/peptides/tb-500" class="text-blue-400 hover:text-blue-300 underline">TB-500 price comparison</a> pages for real-time stock and pricing from all verified vendors.`,
      },
      {
        id: 'faq',
        type: 'faq',
        heading: 'Frequently Asked Questions',
        faqs: [
          {
            question: 'Can I inject BPC-157 and TB-500 in the same syringe?',
            answer: 'Many researchers do mix them in the same syringe to reduce injection frequency, and there are no known chemical incompatibilities between the two peptides. That said, no published stability data exists confirming they don\'t interact in solution. Vendors like Amino USA sell pre-blended vials, which represents the most research-consistent approach to co-administration.',
          },
          {
            question: 'How long before you feel the Wolverine Stack working?',
            answer: 'In anecdotal reports and uncontrolled observations, users typically report reduced pain and swelling within 1–2 weeks of starting the loading protocol. Structural healing (tendon/ligament repair) takes longer — most protocols run 8–12 weeks for meaningful connective tissue repair. BPC-157\'s gut-healing effects are often reported within days.',
          },
          {
            question: 'Is BPC-157 legal?',
            answer: 'Legal status varies by country. In the United States, BPC-157 is a research compound and is not FDA-approved. It is legal to purchase for research purposes. In April 2026, the FDA removed BPC-157 from the bulk compounding list, which restricts its use by compounding pharmacies. It is prohibited by WADA for competitive athletes. Always check your local regulations.',
          },
          {
            question: 'Do you need to cycle the Wolverine Stack?',
            answer: 'Standard practice in research settings is an 8–12 week active cycle followed by 4–8 weeks off. The rationale is to prevent potential receptor desensitization and to allow assessment of healing progress. There is no published data on optimal cycle lengths specifically for this stack.',
          },
          {
            question: 'What is BAC water and why does it matter?',
            answer: 'Bacteriostatic water (BAC water) contains 0.9% benzyl alcohol, which inhibits bacterial growth. It\'s the correct diluent for reconstituting peptides because sterile water alone has no preservative — once opened, it can become contaminated. VANDL Labs includes free BAC water with qualifying orders.',
          },
        ],
      },
      {
        id: 'conclusion',
        type: 'h2',
        heading: 'The Bottom Line on the Wolverine Stack',
        content: `<p>The Wolverine Stack is the most mechanistically well-reasoned healing peptide combination available in the research peptide space. BPC-157's local tissue-repair and angiogenesis effects combine with TB-500's systemic anti-inflammatory and cell-mobilization actions to address injury recovery from two complementary angles.</p>
<p>The honest picture of the evidence in 2026: animal data is abundant and consistent across multiple injury models. Human clinical data is limited but no longer nonexistent — and the Phase 2 RCT (NCT07437547) currently recruiting is set to provide the strongest controlled evidence yet. The gap between animal promise and human proof is narrowing.</p>
<p>If you're researching these peptides, prioritize quality: get vendors with dual third-party COAs (HPLC + mass spec), use bacteriostatic water for reconstitution, and keep accurate research logs. And stay up to date — the regulatory environment around both peptides is shifting in 2026.</p>
<p>For real-time pricing across all verified vendors, use PeptideWiki's <a href="/compare" class="text-blue-400 hover:text-blue-300 underline">comparison tool</a> or check the individual pages for <a href="/peptides/bpc-157" class="text-blue-400 hover:text-blue-300 underline">BPC-157</a> and <a href="/peptides/tb-500" class="text-blue-400 hover:text-blue-300 underline">TB-500</a>.</p>`,
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
