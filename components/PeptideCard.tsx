import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getResearchStatusLabel, getResearchStatusColor } from '@/lib/utils'
import type { Peptide } from '@/lib/types'
import { ChevronRight, FlaskConical, Pill } from 'lucide-react'

interface PeptideCardProps {
  peptide: Peptide
}

const routeIcons: Record<string, string> = {
  'subcutaneous injection': '💉',
  'intramuscular injection': '💉',
  'oral': '💊',
  'intranasal': '👃',
  'topical': '🧴',
  'sublingual': '💊',
  'intravenous injection': '💉',
}

export default function PeptideCard({ peptide }: PeptideCardProps) {
  const statusColor = getResearchStatusColor(peptide.research_status)
  const statusLabel = getResearchStatusLabel(peptide.research_status)

  return (
    <Link
      href={`/peptides/${peptide.slug}`}
      className="group flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
            <FlaskConical className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors leading-tight">
              {peptide.name}
            </h3>
            {peptide.aliases && peptide.aliases.length > 0 && (
              <p className="text-xs text-zinc-500">{peptide.aliases[0]}</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0 mt-1 transition-colors" />
      </div>

      <p className="text-sm text-zinc-400 line-clamp-2 flex-1 mb-4">
        {peptide.summary}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor}`}>
          {statusLabel}
        </span>
        {peptide.administration_routes?.slice(0, 2).map(route => (
          <span key={route} className="text-xs text-zinc-500">
            {routeIcons[route] || '💊'} {route === 'subcutaneous injection' ? 'SubQ' : 
             route === 'intramuscular injection' ? 'IM' :
             route.charAt(0).toUpperCase() + route.slice(1)}
          </span>
        ))}
      </div>
    </Link>
  )
}
