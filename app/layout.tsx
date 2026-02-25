import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'PeptideWiki — Comprehensive Peptide Research Database',
    template: '%s | PeptideWiki',
  },
  description:
    'The most comprehensive peptide research database. Explore 40+ peptides with detailed mechanism of action, dosage protocols, vendor prices, research studies, and stack recommendations.',
  keywords: ['peptides', 'BPC-157', 'TB-500', 'semaglutide', 'research peptides', 'peptide database'],
  openGraph: {
    title: 'PeptideWiki — Comprehensive Peptide Research Database',
    description: 'Explore 40+ peptides with mechanisms, dosages, vendors, and research.',
    url: 'https://peptide-wiki.org',
    siteName: 'PeptideWiki',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-950 text-zinc-100`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
