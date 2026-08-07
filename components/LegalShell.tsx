import Link from 'next/link'

// Shared layout for long-form informational / legal pages.
export default function LegalShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string
  intro?: string
  updated?: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          ← Back to PeptideWiki
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-5 mb-3">{title}</h1>
        {intro && <p className="text-lg text-zinc-400 leading-relaxed">{intro}</p>}
        {updated && (
          <p className="text-xs text-zinc-600 mt-4 uppercase tracking-wider">Last updated: {updated}</p>
        )}
        <div className="legal-content mt-8">{children}</div>
      </div>
    </div>
  )
}
