import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Editorial & Sourcing Policy',
  description:
    'How PeptideWiki researches, cites, reviews, and updates its peptide profiles — including our scientific sources, clinical-trial citation standards, and corrections process.',
  alternates: { canonical: '/editorial-policy' },
  openGraph: { title: 'Editorial & Sourcing Policy', url: '/editorial-policy', type: 'website' },
}

export default function EditorialPolicyPage() {
  return (
    <LegalShell
      title="Editorial & Sourcing Policy"
      intro="How we research, cite, review, and update everything on PeptideWiki."
      updated="June 2026"
    >
      <h2>Our standard</h2>
      <p>
        {SITE_NAME} aims to be accurate, evidence-based, and transparent. Every peptide profile is
        compiled from primary scientific sources and reviewed before publication. Where evidence is
        preliminary, conflicting, or limited to animal or in-vitro models, we say so rather than
        overstating it.
      </p>

      <h2>Sources we rely on</h2>
      <ul>
        <li><strong>PubChem</strong> — molecular structures, formulas, weights, CAS and IUPAC identifiers.</li>
        <li><strong>PubMed</strong> — peer-reviewed primary research and reviews.</li>
        <li><strong>ClinicalTrials.gov</strong> — registered human trials, phases, and outcomes.</li>
        <li><strong>Peer-reviewed journals</strong> — including NEJM, JAMA, The Lancet, and field-specific publications.</li>
        <li><strong>Regulatory and anti-doping bodies</strong> — FDA status and WADA prohibited-list classification.</li>
        <li><strong>Vendor-published certificates of analysis (COA)</strong> — used only for sourcing/availability data, never as evidence of efficacy.</li>
      </ul>

      <h2>How we cite clinical data</h2>
      <p>
        When we present trial results, we include the study identity and, where available, the
        sample size, trial phase, effect size, statistical significance (p-values or confidence
        intervals), and a link to the source or DOI. We distinguish clearly between clinical-trial
        evidence, preclinical research, and mechanistic reasoning.
      </p>

      <h2>How we keep data current</h2>
      <p>
        Vendor pricing, stock status, and product links are checked automatically on a recurring
        schedule and reconciled against live vendor catalogs. Scientific content is reviewed and
        updated as new studies are published or identifiers change. The &ldquo;last updated&rdquo;
        signal for each peptide reflects the most recent revision.
      </p>

      <h2>Editorial independence</h2>
      <p>
        Our scientific content is independent of commercial relationships. Affiliate partnerships
        and discount codes never determine which peptides we cover, how we describe them, or the
        risks we report. See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>

      <h2>Corrections</h2>
      <p>
        If you believe something is inaccurate or out of date, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the page and, ideally, a
        citation. We review every report and correct confirmed errors promptly.
      </p>

      <h2>Not medical advice</h2>
      <p>
        This policy governs how we publish information — it is not a substitute for professional
        guidance. All content is for research and educational use only; see our{' '}
        <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
      </p>
    </LegalShell>
  )
}
