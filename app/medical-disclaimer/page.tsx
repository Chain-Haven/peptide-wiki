import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description:
    'All content on PeptideWiki is for research and educational purposes only. It is not medical advice. The compounds described are not for human or veterinary consumption.',
  alternates: { canonical: '/medical-disclaimer' },
  openGraph: { title: 'Medical Disclaimer', url: '/medical-disclaimer', type: 'website' },
}

export default function MedicalDisclaimerPage() {
  return (
    <LegalShell
      title="Medical Disclaimer"
      intro="Please read this carefully before relying on any information published on PeptideWiki."
      updated="June 2026"
    >
      <h2>For research and education only</h2>
      <p>
        All information on {SITE_NAME} is provided strictly for educational and informational
        purposes. The peptides and compounds described are intended for laboratory research use
        only and are <strong>not for human or veterinary consumption</strong>. Nothing on this site
        is approved by us for use in diagnosing, treating, curing, or preventing any disease or
        health condition.
      </p>

      <h2>Not medical advice</h2>
      <p>
        {SITE_NAME} does not provide medical, clinical, or professional healthcare advice, and no
        content here should be interpreted as such. We are not your physician, and using this site
        does not create a doctor–patient relationship. Always seek the advice of a qualified
        healthcare professional with any questions about a medical condition, medication, or before
        making any decision that could affect your health.
      </p>

      <h2>No guarantee of accuracy or outcomes</h2>
      <p>
        Peptide science evolves quickly. While we work hard to keep our information accurate and
        current (see our <Link href="/editorial-policy">Editorial &amp; Sourcing Policy</Link>), we
        make no warranty that any content is complete, accurate, or up to date. Dosing figures,
        protocols, and study results are summaries of published research and individual responses
        vary. Never rely on this site as your sole source of information.
      </p>

      <h2>Legal and regulatory status</h2>
      <p>
        The legal status, scheduling, and permitted uses of these compounds vary by country and
        jurisdiction and change over time. It is your responsibility to understand and comply with
        all laws that apply to you. We do not encourage any unlawful activity.
      </p>

      <h2>Assumption of risk</h2>
      <p>
        Any action you take based on information from {SITE_NAME} is strictly at your own risk. To
        the fullest extent permitted by law, we disclaim liability for any loss or harm arising from
        the use of this site. Questions? Contact{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
