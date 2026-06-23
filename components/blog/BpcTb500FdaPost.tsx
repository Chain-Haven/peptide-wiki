import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, BookOpen, AlertTriangle, Info, Clock, Tag } from 'lucide-react'

const HERO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260623_210516_5a9a0106-4151-47fd-8d57-8fc15ef162dc.png'
const IMG_MOLECULE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260623_210517_439ea476-b5a9-4787-862a-5d4aedf8d5ed.png'
const IMG_RECOVERY =
  'https://d8j0ntlcm91z4.cloudfront.net/user_3D31vyGqZTfX0pQqE7yfnKjzKma/hf_20260623_210519_7f8d729d-41f9-4d5c-9278-7f37cb14f235.png'

function Callout({ type, children }: { type: 'info' | 'warning'; children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  }
  const Icon = type === 'warning' ? AlertTriangle : Info
  return (
    <div className={`flex gap-3 rounded-xl border p-4 my-6 ${styles[type]}`}>
      <Icon className="h-5 w-5 mt-0.5 shrink-0" />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function Citation({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-2 text-sm transition-colors"
    >
      {children} <ExternalLink className="h-3 w-3 shrink-0" />
    </a>
  )
}

function VendorCard({
  name,
  product,
  href,
  purity,
  format,
  badge,
}: {
  name: string
  product: string
  href: string
  purity: string
  format: string
  badge?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col gap-2 rounded-xl border border-zinc-700 bg-zinc-800/60 p-4 hover:border-blue-500/50 hover:bg-zinc-800 transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-zinc-400 mb-0.5">{name}</p>
          <p className="font-semibold text-white text-sm leading-snug">{product}</p>
        </div>
        {badge && (
          <span className="shrink-0 rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-xs text-blue-300">
            {badge}
          </span>
        )}
      </div>
      <div className="flex gap-3 text-xs text-zinc-400">
        <span>Purity: <span className="text-green-400 font-medium">{purity}</span></span>
        <span>·</span>
        <span>{format}</span>
      </div>
      <span className="text-xs text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors">
        View product <ExternalLink className="h-3 w-3" />
      </span>
    </a>
  )
}

export default function BpcTb500FdaPost() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <div className="relative w-full h-[420px] md:h-[520px]">
        <Image
          src={HERO}
          alt="Biomedical research laboratory with peptide vials and FDA regulatory screens"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/10" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Research Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 px-3 py-1 text-blue-300">
              Regulatory &amp; Research
            </span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />10 min read</span>
            <span>·</span>
            <span>June 23, 2026</span>
            <span>·</span>
            <span>PeptideWiki Research Team</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            BPC-157 &amp; TB-500 Head to FDA: What Researchers Need to Know Before the July 2026 Hearing
          </h1>
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['BPC-157', 'TB-500', 'FDA', 'PCAC 2026', 'Compounding', 'Healing', 'Recovery'].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>

          {/* Intro */}
          <p className="text-xl text-zinc-300 leading-relaxed mb-6 font-light">
            One month from today — <strong className="text-white font-semibold">July 23rd, 2026</strong> — a panel of
            pharmacology experts, compounding industry representatives, and regulatory scientists will convene in Silver
            Spring, Maryland to decide the fate of BPC-157, TB-500, and five other peptides that millions of researchers,
            clinicians, and biohackers have been using for years.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The FDA&apos;s Pharmacy Compounding Advisory Committee (PCAC) will spend two days reviewing whether these
            substances qualify for the 503A Bulk Drug Substances List — a decision that would either open a legal,
            prescription-only pathway for compounded peptides, or leave access in the same regulatory gray zone it has
            occupied since 2021.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-10">
            This is the most consequential regulatory event in the peptide space since Ozempic&apos;s approval reshaped
            the GLP-1 landscape. Here&apos;s the full science briefing, the regulatory context, and what it means for
            your research access.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-12 pt-4 border-t border-zinc-800">
            What Is the PCAC Hearing and Why Does It Matter?
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Under Section 503A of the Federal Food, Drug, and Cosmetic Act, compounding pharmacies can prepare
            customized medications for individual patients — but <em>only</em> using substances on the FDA&apos;s
            approved Bulk Drug Substances List. If a compound isn&apos;t on that list, a licensed 503A pharmacy
            cannot legally compound it for patient use.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            For years, BPC-157 and TB-500 existed in a murky gray zone — nominally under review on the FDA&apos;s
            &quot;Category 2&quot; list, but not explicitly prohibited for compounding. That changed in April 2026,
            when HHS Secretary RFK Jr. confirmed the removal of 12 peptides from Category 2 following withdrawal of
            their prior nominations, including BPC-157, TB-500, MOTS-C, and GHK-Cu.
          </p>
          <Callout type="info">
            <strong>Key distinction:</strong> Removal from Category 2 is <em>not</em> the same as prohibition. It
            simply means they&apos;re no longer in the prior review queue — unless formally nominated for 503A
            inclusion, which is exactly what&apos;s happening now.
          </Callout>

          {/* Table 1 */}
          <h3 className="text-lg font-semibold text-white mb-4">The Seven Peptides on the Docket</h3>
          <div className="overflow-x-auto mb-8 rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/60 text-left">
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Day</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Peptide</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Primary Research Focus</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  { day: 'Jul 23', name: 'BPC-157', focus: 'GI healing, musculoskeletal repair', status: 'Under review' },
                  { day: 'Jul 23', name: 'KPV', focus: 'Inflammatory bowel disease', status: 'Under review' },
                  { day: 'Jul 23', name: 'TB-500', focus: 'Tissue repair, wound healing', status: 'Under review' },
                  { day: 'Jul 23', name: 'MOTS-C', focus: 'Metabolic regulation, longevity', status: 'Under review' },
                  { day: 'Jul 24', name: 'Emideltide (DSIP)', focus: 'Sleep, stress response', status: 'Under review' },
                  { day: 'Jul 24', name: 'Semax', focus: 'Neuroprotection, cognitive function', status: 'Under review' },
                  { day: 'Jul 24', name: 'Epitalon', focus: 'Anti-aging, telomere regulation', status: 'Under review' },
                ].map((row) => (
                  <tr key={row.name} className="text-zinc-400 hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3 text-zinc-500 text-xs">{row.day}</td>
                    <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.focus}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 text-xs text-amber-400">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 2 — BPC-157 */}
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8">
            <Image
              src={IMG_MOLECULE}
              alt="BPC-157 and TB-500 peptide molecular structures visualization"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 text-xs text-zinc-400">
              AI visualization of BPC-157 and TB-500 amino acid chains
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            BPC-157: The Gut-Healing Peptide Under the Microscope
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            BPC-157 (Body Protective Compound-157) is a synthetic pentadecapeptide derived from a protein found in human
            gastric juice. Since its first synthesis in the 1990s by Croatian pharmacologist Predrag Sikiric and his team
            at the University of Zagreb, it has accumulated one of the most robust preclinical research records of any
            non-FDA-approved compound — with over 400 indexed papers on PubMed as of June 2026.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3 mt-6">Mechanism of Action</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            BPC-157 does not act through a single receptor pathway — it exerts effects through multiple simultaneous
            mechanisms, which may partly explain why it appears effective across such diverse tissue types:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              ['Angiogenesis', 'Upregulates VEGF receptors, accelerating blood vessel formation at injury sites'],
              ['Nitric oxide modulation', 'Regulates NO synthesis to reduce inflammation while maintaining tissue perfusion'],
              ['Growth hormone receptor expression', 'A 2025 systematic review of 36 studies confirmed enhanced GH receptor expression in treated tissues'],
              ['Neurotransmitter interaction', 'Modulates dopamine and serotonin systems, explaining reported effects on pain perception and mood'],
              ['Cytoprotection', 'Protects gastric mucosa against NSAID-induced damage — the mechanism that underlies its original discovery'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-zinc-400">
                  <span className="text-zinc-200 font-medium">{title}:</span> {desc}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3 mt-6">What the Clinical Evidence Actually Shows</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Here is where transparency is essential: despite thousands of animal studies showing dramatic healing effects,
            human clinical data remains extremely limited. Only three published human studies exist as of March 2026.
          </p>

          <div className="overflow-x-auto mb-6 rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/60 text-left">
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Evidence Level</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Finding</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ['Preclinical (rodent)', 'Tendon-to-bone reattachment acceleration, GI protection, anti-inflammatory cytokine reduction', 'Strong (400+ studies)'],
                  ['Human — IC pilot (2024)', '80–100% symptom resolution in 12 patients (no placebo control)', 'Preliminary'],
                  ['Human — IV safety (2025)', 'Up to 20mg IV tolerated in 2 healthy adults; plasma clearance in 24h', 'Safety signal only'],
                  ['ACG 2025 abstract', 'Oral BPC-157 as IBD adjunct — presented at American College of Gastroenterology', 'Abstract / Emerging'],
                ].map(([level, finding, quality]) => (
                  <tr key={level} className="text-zinc-400 hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-300 whitespace-nowrap">{level}</td>
                    <td className="px-4 py-3 text-xs">{finding}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        quality.startsWith('Strong') ? 'bg-green-500/15 border border-green-500/25 text-green-400' :
                        quality.startsWith('Preliminary') || quality.startsWith('Safety') ? 'bg-amber-500/15 border border-amber-500/25 text-amber-400' :
                        'bg-zinc-700/60 border border-zinc-600 text-zinc-300'
                      }`}>
                        {quality}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-800/30 p-5 mb-8">
            <blockquote className="text-zinc-300 italic text-sm leading-relaxed">
              &quot;The preclinical evidence for BPC-157 is stronger than for many compounds that have completed Phase II
              trials. The challenge isn&apos;t the science — it&apos;s the lack of industry-funded human trials.&quot;
            </blockquote>
            <p className="text-zinc-500 text-xs mt-2">
              — Dr. Predrag Sikiric&apos;s research team, University of Zagreb (source:{' '}
              <Citation href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8275860/">PMC8275860</Citation>)
            </p>
          </div>

          {/* Section 3 — TB-500 */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-12 pt-4 border-t border-zinc-800">
            TB-500: Healing the Body From the Inside Out
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            TB-500 is the synthetic analog of Thymosin Beta-4 (Tβ4) — specifically the 17-amino acid fragment
            (Ac-SDKPDMAEIEKFDKSKLKTET) that concentrates the actin-binding and cell migration activities of the
            full-length 43-amino acid protein.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Thymosin Beta-4 is naturally produced by virtually every cell in the human body and plays a fundamental role
            in wound response. The research rationale for TB-500 is compelling: by isolating the active fragment, higher
            local concentrations of the bioactive sequence can be achieved without administering the full protein.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3 mt-6">Mechanism of Action</h3>
          <ul className="space-y-2 mb-6">
            {[
              ['G-actin sequestration', 'Controls the pool of free actin available for cell motility and proliferation — fundamental to tissue repair initiation'],
              ['Cell migration signaling', 'Upregulates MMP-2 (matrix metalloproteinase) expression, enabling repair cells to migrate through tissue to injury sites'],
              ['Anti-inflammatory action', 'Reduces NF-κB pathway activation, a master regulator of inflammatory gene expression'],
              ['Angiogenesis', 'Works synergistically with BPC-157 to promote new blood vessel formation at injury sites'],
              ['Satellite cell activation', 'Stimulates quiescent muscle stem cells to proliferate and differentiate into new muscle fibers'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-zinc-400">
                  <span className="text-zinc-200 font-medium">{title}:</span> {desc}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-white mb-4 mt-6">Preclinical Evidence by Tissue Type</h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            A major 2026 scoping review published in{' '}
            <Citation href="https://doi.org/10.3390/app16126202">
              <em>Applied Sciences</em> (DOI:10.3390/app16126202)
            </Citation>{' '}
            systematically examined TB-500 and Thymosin Beta-4 across tissue healing models:
          </p>
          <div className="overflow-x-auto mb-8 rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/60 text-left">
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Tissue Type</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Primary Effect Observed</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Study Count</th>
                  <th className="px-4 py-3 text-zinc-300 font-semibold">Human Data?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ['Cardiac muscle', 'Reduced infarct size, improved ejection fraction', '14', 'Limited (eye drops only)'],
                  ['Skeletal muscle', 'Faster functional recovery, reduced fibrosis', '9', 'None (musculoskeletal)'],
                  ['Tendon / ligament', 'Enhanced collagen deposition, MMP-2 upregulation', '7', 'None'],
                  ['Corneal tissue', 'Accelerated wound closure, reduced scarring', '5', 'Yes — placebo-controlled'],
                  ['Dermal wounds', 'Faster healing, improved vascularization', '11', 'Minimal'],
                ].map(([tissue, effect, count, human]) => (
                  <tr key={tissue} className="text-zinc-400 hover:bg-zinc-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-300">{tissue}</td>
                    <td className="px-4 py-3 text-xs">{effect}</td>
                    <td className="px-4 py-3 text-center">{count}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={`rounded-full px-2 py-0.5 ${
                        human === 'None' ? 'bg-red-500/15 border border-red-500/25 text-red-400' :
                        human.startsWith('Yes') ? 'bg-green-500/15 border border-green-500/25 text-green-400' :
                        'bg-amber-500/15 border border-amber-500/25 text-amber-400'
                      }`}>
                        {human}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Callout type="warning">
            For musculoskeletal applications — the primary reason most researchers are interested in TB-500 — no
            completed human efficacy trials exist as of mid-2026. This is the central evidentiary gap the PCAC panel
            will need to address.
          </Callout>

          {/* Section 4 — Stack */}
          <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden mb-8 mt-10">
            <Image
              src={IMG_RECOVERY}
              alt="Athletic recovery with cellular repair visualization"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 text-xs text-zinc-400">
              AI visualization of musculoskeletal tissue repair
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            The BPC-157 + TB-500 Stack: Why Researchers Combine Them
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            If you have spent time in peptide research communities, you have heard about stacking BPC-157 with TB-500.
            The rationale is mechanistically sound — the two peptides target different but complementary aspects of the
            healing cascade:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                peptide: 'BPC-157',
                color: 'blue',
                mechanisms: ['NO/VEGF angiogenesis axis', 'Gastric cytoprotection', 'GH receptor upregulation', 'Neurotransmitter modulation'],
              },
              {
                peptide: 'TB-500',
                color: 'emerald',
                mechanisms: ['G-actin sequestration', 'Cell migration (MMP-2)', 'NF-κB anti-inflammation', 'Satellite cell activation'],
              },
            ].map((item) => (
              <div
                key={item.peptide}
                className={`rounded-xl border p-4 ${
                  item.color === 'blue'
                    ? 'border-blue-500/25 bg-blue-500/5'
                    : 'border-emerald-500/25 bg-emerald-500/5'
                }`}
              >
                <p className={`font-bold mb-3 ${item.color === 'blue' ? 'text-blue-300' : 'text-emerald-300'}`}>
                  {item.peptide}
                </p>
                <ul className="space-y-1.5">
                  {item.mechanisms.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-xs text-zinc-400">
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                          item.color === 'blue' ? 'bg-blue-400' : 'bg-emerald-400'
                        }`}
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            In practical research models, BPC-157 primarily handles the early inflammatory phase and GI protection, while
            TB-500 drives the proliferative and remodeling phases of repair. Studies in animal tendon and ligament models
            show additive or synergistic effects when both are administered together versus either alone.
          </p>

          {/* Vendor section */}
          <h3 className="text-lg font-semibold text-white mb-4 mt-8">
            Sourcing Research-Grade BPC-157 &amp; TB-500
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            For laboratory research purposes, purity verification and supply chain transparency are non-negotiable. Key
            criteria: third-party COA with HPLC purity ≥99%, mass spectrometry identity confirmation, and US-based
            synthesis. The following suppliers carry COA-backed research materials:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <VendorCard
              name="Peptide Tech"
              product="BPC-157 + TB-500 Blend (10mg/10mg)"
              href="https://peptidetech.co/product/bpc-157-tb-500-blend-10mg-10mg/?ref=bre&utm_source=affiliate"
              purity="≥99%"
              format="Lyophilized powder + BAC water"
              badge="COA Verified"
            />
            <VendorCard
              name="VANDL Labs"
              product="BPC-157 (5mg)"
              href="https://www.vandl-labs.com/product/bpc-157/?ref=BRE"
              purity="≥99%"
              format="Lyophilized powder"
            />
            <VendorCard
              name="Amino USA"
              product="BPC-157 + TB-500 Blend (5mg/5mg)"
              href="https://aminousa.com/products/bpc-157-5mg-tb-500-5mg?ref=bre"
              purity="≥99%"
              format="Lyophilized, 3ml vial"
              badge="USA Made"
            />
            <VendorCard
              name="Modified Aminos"
              product="Research Peptide Catalog"
              href="https://modifiedaminos.shop?ref=bre"
              purity="≥99%"
              format="Multiple formats available"
            />
          </div>
          <Callout type="warning">
            All peptide products listed above are sold for laboratory and research purposes only and are not for human
            or veterinary consumption. Always verify current availability and regulatory status in your jurisdiction
            before ordering.
          </Callout>

          {/* Section 5 — Scenarios */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-12 pt-4 border-t border-zinc-800">
            Three Scenarios: What Could Happen in July
          </h2>
          <div className="space-y-4 mb-8">
            {[
              {
                title: 'Scenario 1: PCAC Recommends 503A Inclusion (Positive)',
                color: 'green',
                desc: 'If the committee votes to recommend BPC-157 and TB-500 for the 503A list, compounding pharmacies would gain a legal pathway to dispense these peptides with a valid prescription. This would improve patient access and medical oversight, though prices would likely increase relative to current research supply chains.',
              },
              {
                title: 'Scenario 2: Deferred Pending Additional Evidence (Most Likely)',
                color: 'amber',
                desc: 'The committee may vote to defer a decision pending additional human safety and efficacy data. Given the preclinical-heavy evidence base, this is the most probable outcome. It would not prohibit research use, but would not create the 503A compounding pathway either.',
              },
              {
                title: 'Scenario 3: Rejection',
                color: 'red',
                desc: "A negative recommendation would signal the FDA's view that insufficient evidence exists for any therapeutic use. This would not automatically prohibit research supply chains, but would increase regulatory pressure and could affect import enforcement practices.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`rounded-xl border p-5 ${
                  s.color === 'green'
                    ? 'border-green-500/25 bg-green-500/5'
                    : s.color === 'amber'
                    ? 'border-amber-500/25 bg-amber-500/5'
                    : 'border-red-500/25 bg-red-500/5'
                }`}
              >
                <h3
                  className={`font-semibold mb-2 ${
                    s.color === 'green'
                      ? 'text-green-300'
                      : s.color === 'amber'
                      ? 'text-amber-300'
                      : 'text-red-300'
                  }`}
                >
                  {s.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Resources */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-12 pt-4 border-t border-zinc-800">
            Essential Resources for Researchers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                title: 'FDA PCAC Hearing Calendar',
                desc: 'Official July 23–24 docket and submission documents',
                href: 'https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026',
              },
              {
                title: 'ClinicalTrials.gov — BPC-157',
                desc: '3 registered studies as of June 2026',
                href: 'https://clinicaltrials.gov/search?term=BPC-157',
              },
              {
                title: 'PubMed — BPC-157 Literature',
                desc: '400+ indexed papers from 1993–2026',
                href: 'https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157',
              },
              {
                title: 'Peptide Dossier — PCAC Guide',
                desc: 'Comprehensive hearing summary and context',
                href: 'https://peptidedossier.com/guides/pcac-hearing-bpc-157-tb-500/',
              },
            ].map((r) => (
              <a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-600 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {r.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{r.desc}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 shrink-0 ml-auto mt-0.5 transition-colors" />
              </a>
            ))}
          </div>

          {/* Conclusion */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-12 pt-4 border-t border-zinc-800">
            The Bottom Line
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The July 23–24, 2026 PCAC hearing is not a bureaucratic formality. It is a watershed moment that will
            define how BPC-157, TB-500, and five other highly-researched compounds exist within the U.S. regulatory
            landscape for years to come.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            The science is compelling — especially for BPC-157 where the preclinical record rivals that of many
            FDA-approved therapeutics. The challenge is the translational gap: animal models do not always predict human
            outcomes, and without adequately powered, placebo-controlled human trials, the committee has little to work
            with beyond promising signals.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Whether you are a researcher tracking preclinical models, a clinician monitoring regulatory developments, or
            simply someone following progress in regenerative medicine, the next 30 days are worth watching closely.
          </p>
          <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 p-5 mt-6 mb-10">
            <p className="text-blue-200 text-sm font-medium mb-1">Stay current</p>
            <p className="text-zinc-400 text-sm">
              Bookmark{' '}
              <Link href="/blog" className="text-blue-400 hover:underline">
                PeptideWiki&apos;s Research Blog
              </Link>{' '}
              and our{' '}
              <Link href="/peptides" className="text-blue-400 hover:underline">
                peptide database
              </Link>{' '}
              — we will update with hearing results as they are released.
            </p>
          </div>

          {/* References */}
          <div className="border-t border-zinc-800 pt-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" /> References &amp; Sources
            </h2>
            <ol className="space-y-3 text-sm text-zinc-400">
              {[
                {
                  text: 'Stable Gastric Pentadecapeptide BPC 157 and Wound Healing — Frontiers in Pharmacology (2021)',
                  href: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8275860/',
                  label: 'PMC8275860',
                },
                {
                  text: 'Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications — CNS Neuroscience & Therapeutics',
                  href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5333585/',
                  label: 'PMC5333585',
                },
                {
                  text: 'BPC 157 in trials for inflammatory bowel disease — Inflammatory Bowel Diseases (2007)',
                  href: 'https://pubmed.ncbi.nlm.nih.gov/17713731/',
                  label: 'PubMed 17713731',
                },
                {
                  text: 'Thymosin Beta-4 and TB-500 in Tissue Healing, Regeneration, and Musculoskeletal Repair: A Scoping Review — Applied Sciences (2026)',
                  href: 'https://doi.org/10.3390/app16126202',
                  label: 'DOI:10.3390/app16126202',
                },
                {
                  text: 'S808 Oral Peptide BPC-157 as Emerging Adjunct — ACG Annual Meeting 2025',
                  href: 'https://journals.lww.com/ajg/fulltext/2025/10002/s808_oral_peptide_bpc_157_an_emerging_adjunct_to.809.aspx',
                  label: 'ACG Abstract S808',
                },
                {
                  text: 'FDA Pharmacy Compounding Advisory Committee Meeting — July 23–24, 2026',
                  href: 'https://www.fda.gov/advisory-committees/advisory-committee-calendar/july-23-24-2026-meeting-pharmacy-compounding-advisory-committee-07232026',
                  label: 'FDA.gov',
                },
                {
                  text: 'PCAC Hearing: BPC-157, TB-500, KPV, MOTS-c, DSIP, Semax, Epitalon — Peptide Dossier',
                  href: 'https://peptidedossier.com/guides/pcac-hearing-bpc-157-tb-500/',
                  label: 'Peptide Dossier',
                },
                {
                  text: 'FDA Peptide Reclassification 2026 — Amanecia Health',
                  href: 'https://amaneciahealth.com/fda-peptide-reclassification-2026-amanecia-health/',
                  label: 'Amanecia Health',
                },
                {
                  text: 'BPC-157 Human Clinical Trials (2025–2026): Complete Status — Peptide DB',
                  href: 'https://peptide-db.com/guides/bpc-157-human-trials',
                  label: 'Peptide DB',
                },
              ].map((ref, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 text-zinc-600 font-mono text-xs mt-0.5">[{i + 1}]</span>
                  <span>
                    {ref.text}{' '}
                    <Citation href={ref.href}>{ref.label}</Citation>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Nav footer */}
          <div className="border-t border-zinc-800 mt-10 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Research Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
