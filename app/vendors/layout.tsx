import type { Metadata } from 'next'

// The vendors page is a client component, so route metadata lives here.
export const metadata: Metadata = {
  title: 'Trusted Peptide Vendors — Price & COA Comparison',
  description:
    'Compare vetted peptide vendors ranked by rating, third-party COA testing, shipping, and reliability. Verified discount codes and live price comparisons.',
  alternates: { canonical: '/vendors' },
  openGraph: {
    title: 'Trusted Peptide Vendors — Price & COA Comparison',
    description: 'Vetted peptide vendors ranked by rating, COA testing, and reliability — with verified discount codes.',
    url: '/vendors',
    type: 'website',
  },
}

export default function VendorsLayout({ children }: { children: React.ReactNode }) {
  return children
}
