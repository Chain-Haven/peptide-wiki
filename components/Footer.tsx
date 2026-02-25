import Link from 'next/link'
import { FlaskConical } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <FlaskConical className="h-6 w-6 text-blue-400" />
              <span className="text-white">Peptide<span className="text-blue-400">Wiki</span></span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm">
              A comprehensive research database for peptides. All information is provided for educational and research purposes only.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/peptides', label: 'All Peptides' },
                { href: '/stacks', label: 'Peptide Stacks' },
                { href: '/vendors', label: 'Vendors' },
                { href: '/calculator', label: 'Dosage Calculator' },
                { href: '/compare', label: 'Compare Peptides' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Categories</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/peptides?category=body-composition', label: 'Body Composition' },
                { href: '/peptides?category=weight-management', label: 'Weight Management' },
                { href: '/peptides?category=healing-recovery', label: 'Healing & Recovery' },
                { href: '/peptides?category=anti-aging', label: 'Anti-Aging' },
                { href: '/peptides?category=cognitive', label: 'Cognitive' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">© 2026 PeptideWiki. For research purposes only.</p>
          <p className="text-zinc-600 text-xs text-center md:text-right max-w-md">
            Disclaimer: Information provided is for educational and research purposes only. Not medical advice. Consult a healthcare professional before using any peptide.
          </p>
        </div>
      </div>
    </footer>
  )
}
