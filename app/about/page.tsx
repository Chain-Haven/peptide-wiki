import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, ORG_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About PeptideWiki',
  description:
    'PeptideWiki is an evidence-based reference database covering peptide mechanisms, clinical-trial data, dosing protocols, and vendor pricing — for research and educational use only.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About PeptideWiki', url: '/about', type: 'website' },
}

export default function AboutPage() {
  return (
    <LegalShell
      title={`About ${SITE_NAME}`}
      intro="An evidence-based reference for the research community — built to make peptide science easier to find, compare, and understand."
    >
      <h2>What PeptideWiki is</h2>
      <p>
        {SITE_NAME} is a comprehensive, free reference database for research peptides. Each entry
        brings together the information a researcher would otherwise have to gather from a dozen
        sources: mechanism of action, benefits and risks, dosing and reconstitution guidance,
        molecular and chemical properties, peer-reviewed studies, clinical-trial outcomes, and a
        live comparison of where the compound can be sourced.
      </p>
      <p>
        We also build free tools around that data — a reconstitution and dosage calculator, a
        side-by-side peptide comparison, curated stack protocols, and an AI assistant that answers
        questions using our database.
      </p>

      <h2>Who runs it</h2>
      <p>
        {SITE_NAME} is operated by {ORG_NAME}. We are an independent publisher, not a manufacturer
        or pharmacy. You can reach the team any time at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Where our information comes from</h2>
      <p>
        Our profiles are compiled from public scientific sources — including PubChem, PubMed,
        ClinicalTrials.gov, and peer-reviewed journals — and reviewed for accuracy before
        publication. We describe exactly how we research, cite, and update entries in our{' '}
        <Link href="/editorial-policy">Editorial &amp; Sourcing Policy</Link>.
      </p>

      <h2>Research use only</h2>
      <p>
        Everything on {SITE_NAME} is provided for educational and research purposes only. It is not
        medical advice, and the compounds we describe are not intended to diagnose, treat, cure, or
        prevent any disease. Please read our <Link href="/medical-disclaimer">Medical Disclaimer</Link>{' '}
        and always consult a qualified healthcare professional before acting on any information here.
      </p>

      <h2>How we stay free</h2>
      <p>
        Some vendor links on this site are affiliate links, which means we may earn a commission at
        no extra cost to you. This never changes our prices, rankings, or editorial coverage — see
        our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link> for the full details.
      </p>

      <h2>Found something wrong?</h2>
      <p>
        Accuracy matters to us. If you spot an error or have a peer-reviewed source we should cite,
        email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will review it.
      </p>
    </LegalShell>
  )
}
