'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FlaskConical, X, CheckCircle, AlertTriangle } from 'lucide-react'
import { getResearchStatusLabel, getResearchStatusColor, formatPrice } from '@/lib/utils'
import type { Peptide, Price } from '@/lib/types'

export default function CompareClient({ peptides }: { peptides: Peptide[] }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (slug: string) => {
    setSelected(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev
    )
  }

  const comparePeptides = peptides.filter(p => selected.includes(p.slug))

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Compare Peptides</h1>
        <p className="text-zinc-400">Select up to 3 peptides to compare side-by-side.</p>
      </div>

      {/* Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-zinc-400">
            {selected.length}/3 selected
          </p>
          {selected.length > 0 && (
            <button onClick={() => setSelected([])} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1">
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {peptides.map(p => (
            <button
              key={p.slug}
              onClick={() => toggle(p.slug)}
              disabled={selected.length >= 3 && !selected.includes(p.slug)}
              className={`p-2.5 rounded-lg border text-xs text-left transition-all ${
                selected.includes(p.slug)
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                  : selected.length >= 3
                    ? 'opacity-40 cursor-not-allowed bg-zinc-900 border-zinc-800 text-zinc-500'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {comparePeptides.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <FlaskConical className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 text-lg">Select 2–3 peptides above to compare them.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-4 pr-4 text-zinc-500 font-medium w-40">Attribute</th>
                {comparePeptides.map(p => (
                  <th key={p.slug} className="text-left py-4 px-4 min-w-56">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <Link href={`/peptides/${p.slug}`} className="font-bold text-white hover:text-blue-400 transition-colors">
                          {p.name}
                        </Link>
                        <p className="text-xs text-zinc-500 font-normal">{p.category?.name}</p>
                      </div>
                      <button onClick={() => toggle(p.slug)} className="text-zinc-600 hover:text-zinc-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Status</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getResearchStatusColor(p.research_status)}`}>
                      {getResearchStatusLabel(p.research_status)}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Summary</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4 text-zinc-300 text-xs leading-relaxed">
                    {p.summary?.slice(0, 120)}...
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Dose</td>
                {comparePeptides.map(p => {
                  const d = p.dosage_info
                  return (
                    <td key={p.slug} className="py-4 px-4 text-zinc-200 font-mono text-xs">
                      {d?.min_dose}{d?.max_dose && d.max_dose !== d.min_dose ? `–${d.max_dose}` : ''} {d?.unit}
                      {d?.weight_based && '/kg'}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Frequency</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4 text-zinc-300 text-xs">{p.dosage_info?.frequency || '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Cycle Length</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4 text-zinc-300 text-xs">{p.cycle_length || '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Half-Life</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4 text-zinc-300 text-xs">{p.half_life || '—'}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Routes</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.administration_routes?.map((r: string) => (
                        <span key={r} className="text-xs bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-300 capitalize">
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Lowest Price</td>
                {comparePeptides.map(p => {
                  const prices = p.prices || []
                  const lowest = prices.length ? Math.min(...prices.map((pr: Price) => pr.price)) : null
                  return (
                    <td key={p.slug} className="py-4 px-4 font-semibold text-white">
                      {lowest ? formatPrice(lowest) : '—'}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Top Benefits</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4">
                    <ul className="space-y-1">
                      {p.benefits?.slice(0, 4).map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">Main Side Effects</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4">
                    <ul className="space-y-1">
                      {p.side_effects?.slice(0, 3).map((e: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-zinc-400">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{e}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 pr-4 text-zinc-500">View Full Profile</td>
                {comparePeptides.map(p => (
                  <td key={p.slug} className="py-4 px-4">
                    <Link
                      href={`/peptides/${p.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FlaskConical className="h-3.5 w-3.5" />
                      View {p.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
