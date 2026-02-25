'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, FlaskConical, ArrowRight } from 'lucide-react'
import { getResearchStatusColor, getResearchStatusLabel } from '@/lib/utils'

interface PeptideRow {
  id: string
  name: string
  slug: string
  dosage_info: {
    min_dose?: number | null
    max_dose?: number | null
    unit?: string
    frequency?: string
    notes?: string
    weight_based?: boolean
  }
  administration_routes: string[]
  cycle_length: string | null
  research_status: string
}

export default function DosageCalculatorClient({ peptides }: { peptides: PeptideRow[] }) {
  const [weight, setWeight] = useState(80)
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg')
  const [selectedPeptide, setSelectedPeptide] = useState<string>(peptides[0]?.slug || '')

  const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight

  const peptide = peptides.find(p => p.slug === selectedPeptide)
  const dosage = peptide?.dosage_info

  const calculatedDose = useMemo(() => {
    if (!dosage || !dosage.weight_based) return null
    const minDose = dosage.min_dose ? dosage.min_dose * weightInKg : null
    const maxDose = dosage.max_dose ? dosage.max_dose * weightInKg : null
    return { minDose, maxDose, unit: dosage.unit }
  }, [dosage, weightInKg])

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-7 w-7 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Dosage Calculator</h1>
        </div>
        <p className="text-zinc-400">
          Calculate research peptide doses based on body weight and protocol guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="space-y-5">
          {/* Weight Input */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-3">Body Weight</label>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUnit('kg')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  unit === 'kg'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                }`}
              >
                kg
              </button>
              <button
                onClick={() => setUnit('lbs')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  unit === 'lbs'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                }`}
              >
                lbs
              </button>
            </div>
            <input
              type="range"
              min={40}
              max={unit === 'lbs' ? 400 : 180}
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              className="w-full accent-blue-500 mb-2"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(Math.max(1, Number(e.target.value)))}
                className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-zinc-500"
              />
              <span className="text-zinc-400 text-sm">{unit}</span>
              <span className="text-zinc-500 text-sm ml-2">
                ({weightInKg.toFixed(1)} kg)
              </span>
            </div>
          </div>

          {/* Peptide Selector */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <label className="block text-sm font-medium text-zinc-300 mb-3">Select Peptide</label>
            <select
              value={selectedPeptide}
              onChange={e => setSelectedPeptide(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-500"
            >
              {peptides.map(p => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {peptide && (
            <>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-white flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-blue-400" />
                    {peptide.name}
                  </h2>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getResearchStatusColor(peptide.research_status)}`}>
                    {getResearchStatusLabel(peptide.research_status)}
                  </span>
                </div>

                {calculatedDose ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-4">
                    <p className="text-sm text-blue-400/80 mb-2">Calculated dose for {weightInKg.toFixed(1)}kg:</p>
                    <div className="text-3xl font-bold text-white">
                      {calculatedDose.minDose?.toFixed(1)}
                      {calculatedDose.maxDose && calculatedDose.maxDose !== calculatedDose.minDose &&
                        `–${calculatedDose.maxDose?.toFixed(1)}`}{' '}
                      <span className="text-xl text-zinc-400">{calculatedDose.unit}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">per dose</p>
                  </div>
                ) : (
                  <div className="bg-zinc-800/50 rounded-xl p-5 mb-4">
                    <p className="text-sm text-zinc-400 mb-1">Standard dose range:</p>
                    <div className="text-2xl font-bold text-white">
                      {dosage?.min_dose}
                      {dosage?.max_dose && dosage.max_dose !== dosage.min_dose && `–${dosage.max_dose}`}{' '}
                      <span className="text-lg text-zinc-400">{dosage?.unit}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">fixed dose (not weight-based)</p>
                  </div>
                )}

                <dl className="space-y-3 text-sm">
                  {dosage?.frequency && (
                    <div className="flex justify-between">
                      <dt className="text-zinc-500">Frequency</dt>
                      <dd className="text-zinc-200 text-right max-w-xs">{dosage.frequency}</dd>
                    </div>
                  )}
                  {peptide.cycle_length && (
                    <div className="flex justify-between">
                      <dt className="text-zinc-500">Cycle Length</dt>
                      <dd className="text-zinc-200">{peptide.cycle_length}</dd>
                    </div>
                  )}
                  {peptide.administration_routes?.length > 0 && (
                    <div className="flex justify-between items-start">
                      <dt className="text-zinc-500">Route</dt>
                      <dd className="text-zinc-200 text-right capitalize">
                        {peptide.administration_routes[0]}
                      </dd>
                    </div>
                  )}
                </dl>

                {dosage?.notes && (
                  <div className="mt-4 p-3 bg-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-400 leading-relaxed">{dosage.notes}</p>
                  </div>
                )}
              </div>

              <Link
                href={`/peptides/${peptide.slug}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
              >
                View Full {peptide.name} Profile <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* All Peptides Table */}
      <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-zinc-800">
          <h2 className="font-semibold text-white">All Peptide Dosages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                <th className="text-left px-5 py-3">Peptide</th>
                <th className="text-left px-5 py-3">Dose</th>
                <th className="text-left px-5 py-3">Frequency</th>
                <th className="text-left px-5 py-3">Cycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {peptides.map(p => {
                const d = p.dosage_info
                const wKg = Math.round(weightInKg)
                const doseDisplay = d?.weight_based
                  ? `${d.min_dose}${d.max_dose && d.max_dose !== d.min_dose ? `–${d.max_dose}` : ''} ${d.unit}/kg → ${((d.min_dose || 0) * wKg).toFixed(0)}${d.max_dose && d.max_dose !== d.min_dose ? `–${((d.max_dose || 0) * wKg).toFixed(0)}` : ''} ${d.unit}`
                  : `${d?.min_dose ?? '?'}${d?.max_dose && d.max_dose !== d.min_dose ? `–${d.max_dose}` : ''} ${d?.unit ?? ''}`

                return (
                  <tr key={p.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/peptides/${p.slug}`} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-zinc-300 font-mono text-xs">
                      {doseDisplay}
                      {d?.weight_based && <span className="ml-1 text-zinc-600">(weight-based)</span>}
                    </td>
                    <td className="px-5 py-3 text-zinc-400 text-xs max-w-48 truncate">{d?.frequency || '—'}</td>
                    <td className="px-5 py-3 text-zinc-400 text-xs">{p.cycle_length || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <p className="text-amber-400/80 text-xs leading-relaxed">
          <strong>Disclaimer:</strong> Dosage information is for research purposes only. These calculations are based on commonly cited research protocols. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  )
}
