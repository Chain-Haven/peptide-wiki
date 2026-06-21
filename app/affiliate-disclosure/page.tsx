import type { Metadata } from 'next'
import Link from 'next/link'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'PeptideWiki earns commissions from some vendor links at no extra cost to you. This disclosure explains our affiliate relationships and how we keep editorial independence.',
  alternates: { canonical: '/affiliate-disclosure' },
  openGraph: { title: 'Affiliate Disclosure', url: '/affiliate-disclosure', type: 'website' },
}

export default function AffiliateDisclosurePage() {
  return (
    <LegalShell
      title="Affiliate Disclosure"
      intro="Honest, FTC-compliant transparency about how PeptideWiki is funded."
      updated="June 2026"
    >
      <h2>The short version</h2>
      <p>
        {SITE_NAME} is free to use. To keep it that way, some of the vendor links on this site are
        affiliate links. If you click one and make a purchase, we may earn a commission{' '}
        <strong>at no additional cost to you</strong>. In many cases you also receive a discount
        through codes we negotiate. This disclosure is made in accordance with the U.S. Federal
        Trade Commission&rsquo;s guidance on endorsements and testimonials.
      </p>

      <h2>How affiliate links work here</h2>
      <ul>
        <li>Vendor &ldquo;Buy&rdquo; buttons and some product links may carry an affiliate reference or tracking parameter.</li>
        <li>Discount codes shown on the site are provided through our vendor partnerships.</li>
        <li>The price you pay is the same as — or lower than — visiting the vendor directly.</li>
      </ul>

      <h2>Editorial independence</h2>
      <p>
        Affiliate revenue does <strong>not</strong> influence our scientific content. Mechanisms,
        benefits, risks, dosing guidance, and study summaries are researched independently of any
        commercial relationship, as described in our{' '}
        <Link href="/editorial-policy">Editorial &amp; Sourcing Policy</Link>. Vendor rankings reflect
        factors such as third-party COA testing, reliability, and pricing — not commission rates.
      </p>

      <h2>Not an endorsement</h2>
      <p>
        Listing a vendor or price is not a recommendation to purchase or use any compound. We do not
        manufacture, sell, ship, or handle any products. Always verify a current certificate of
        analysis (COA) and confirm legality in your jurisdiction before buying. See our{' '}
        <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
      </p>

      <h2>Questions</h2>
      <p>
        For anything about our affiliate relationships, contact{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalShell>
  )
}
