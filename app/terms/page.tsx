import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, ORG_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern your use of PeptideWiki, including the research-only nature of the content, disclaimers of warranty, and limitation of liability.',
  alternates: { canonical: '/terms' },
  openGraph: { title: 'Terms of Use', url: '/terms', type: 'website' },
}

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Use"
      intro={`The agreement between you and ${SITE_NAME}.`}
      updated="June 2026"
    >
      <h2>Acceptance</h2>
      <p>
        By accessing or using {SITE_NAME} (the &ldquo;Site&rdquo;), operated by {ORG_NAME}, you agree
        to these Terms of Use and to our{' '}
        <Link href="/privacy-policy">Privacy Policy</Link>,{' '}
        <Link href="/medical-disclaimer">Medical Disclaimer</Link>, and{' '}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>. If you do not agree, please
        do not use the Site.
      </p>

      <h2>Research and educational use only</h2>
      <p>
        The Site is provided for informational, educational, and research purposes only. Content is
        not medical advice, and the compounds described are not for human or veterinary consumption.
        You are responsible for ensuring that your use of any information complies with all laws and
        regulations that apply to you.
      </p>

      <h2>Permitted use</h2>
      <p>
        You may access and use the Site for your own lawful, non-commercial research and reference.
        You agree not to misuse the Site — including by scraping at scale, attempting to disrupt or
        circumvent its security, reproducing substantial portions of its content without permission,
        or using it for any unlawful purpose.
      </p>

      <h2>No warranty</h2>
      <p>
        The Site and all content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
        without warranties of any kind, whether express or implied, including accuracy, completeness,
        merchantability, or fitness for a particular purpose. Pricing, availability, and scientific
        information may change without notice.
      </p>

      <h2>Third-party links and vendors</h2>
      <p>
        The Site links to third-party vendors and resources we do not control and does not sell or
        ship any products. We are not responsible for the content, products, pricing, or practices
        of any third-party site. Some links are affiliate links, as described in our{' '}
        <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {ORG_NAME} and {SITE_NAME} will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or any loss arising from
        your use of — or inability to use — the Site or any content on it.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these Terms from time to time; the &ldquo;last updated&rdquo; date above
        reflects the current version. Continued use of the Site after changes constitutes acceptance.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
