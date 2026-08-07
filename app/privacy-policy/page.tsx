import type { Metadata } from 'next'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, ORG_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How PeptideWiki collects, uses, and protects information when you use the site, including analytics, the AI assistant, cookies, and your data-rights requests.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: { title: 'Privacy Policy', url: '/privacy-policy', type: 'website' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro={`How ${SITE_NAME} handles your information.`}
      updated="June 2026"
    >
      <h2>Who we are</h2>
      <p>
        {SITE_NAME} is operated by {ORG_NAME} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). This policy
        explains what we collect when you use the site and what we do with it. By using {SITE_NAME},
        you agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Usage &amp; analytics data</strong> — pages visited, referring source, approximate location, device and browser type, collected in aggregate to understand and improve the site.</li>
        <li><strong>AI assistant input</strong> — questions you submit to our chat feature are processed to generate a response. Do not include personal or sensitive information in chat messages.</li>
        <li><strong>Information you send us</strong> — if you email us, we receive your address and message.</li>
      </ul>
      <p>We do not require an account, and we do not knowingly collect more personal data than necessary.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To operate, secure, and improve the site and its tools.</li>
        <li>To answer your questions through the AI assistant and respond to emails.</li>
        <li>To understand which content is useful so we can prioritize updates.</li>
      </ul>
      <p>We do <strong>not</strong> sell your personal information.</p>

      <h2>Cookies and similar technologies</h2>
      <p>
        We and our service providers may use cookies or similar technologies for essential site
        functionality and aggregate analytics. You can control cookies through your browser
        settings; disabling them may affect some features.
      </p>

      <h2>Service providers</h2>
      <p>
        We rely on trusted third parties to run {SITE_NAME} — including hosting and infrastructure,
        a database provider, and an AI model provider that powers the assistant. These providers
        process data only as needed to deliver their services and under their own privacy terms.
        Outbound vendor links lead to third-party websites with their own privacy practices, which
        we do not control.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep information only as long as needed for the purposes above or as required by law,
        then delete or anonymize it.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, or delete personal
        information we hold about you, or to object to certain processing. To make a request, email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will respond as required by
        applicable law.
      </p>

      <h2>Children</h2>
      <p>
        {SITE_NAME} is intended for adults conducting research and is not directed to children. We do
        not knowingly collect personal information from anyone under 18.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by the
        &ldquo;last updated&rdquo; date above. Questions? Contact{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
