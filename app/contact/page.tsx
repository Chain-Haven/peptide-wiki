import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import LegalShell from '@/components/LegalShell'
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the PeptideWiki team — corrections, source suggestions, vendor and partnership inquiries, or data requests.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact PeptideWiki', url: '/contact', type: 'website' },
}

export default function ContactPage() {
  return (
    <LegalShell
      title="Contact Us"
      intro="We read every message. Here is how to reach the team."
    >
      <div className="not-prose mb-8 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <Mail className="h-5 w-5 flex-shrink-0 text-blue-400" />
        <div>
          <p className="text-sm text-zinc-400">Email us at</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-semibold text-white hover:text-blue-400">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <h2>What to reach out about</h2>
      <ul>
        <li><strong>Corrections &amp; sources</strong> — spotted an error or have a study we should cite? Include the page and a citation if you can.</li>
        <li><strong>Vendors &amp; partnerships</strong> — vendor listings, COA verification, and collaboration inquiries.</li>
        <li><strong>Data &amp; privacy requests</strong> — see our <Link href="/privacy-policy">Privacy Policy</Link> for what we can help with.</li>
        <li><strong>General questions</strong> — anything else about {SITE_NAME}.</li>
      </ul>

      <h2>Response time</h2>
      <p>
        We typically reply within a few business days. For science questions you want answered
        instantly, try the AI assistant on the <Link href="/">homepage</Link> — it answers using our
        full database.
      </p>

      <h2>A note on medical questions</h2>
      <p>
        We cannot provide medical advice or individualized health guidance. Please review our{' '}
        <Link href="/medical-disclaimer">Medical Disclaimer</Link> and consult a qualified healthcare
        professional for anything related to your health.
      </p>
    </LegalShell>
  )
}
