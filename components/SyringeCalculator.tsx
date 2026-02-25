'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PROTOCOLS } from '@/data/protocols'
import { Info, ChevronRight, ExternalLink, AlertTriangle, Beaker, Syringe, Droplet } from 'lucide-react'

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

interface SyringeType {
  id: string
  label: string
  maxMl: number
  maxUnits: number
  marks: number        // total graduation marks
  markStep: number     // units per small mark
  labelStep: number    // units per labelled mark
  description: string
  bestFor: string
}

const SYRINGE_TYPES: SyringeType[] = [
  {
    id: 'u100-1ml',
    label: '1mL / 100-Unit',
    maxMl: 1,
    maxUnits: 100,
    marks: 100,
    markStep: 1,
    labelStep: 10,
    description: 'Most common insulin syringe for peptide research',
    bestFor: 'Standard doses (>50mcg at typical concentrations)',
  },
  {
    id: 'u50-05ml',
    label: '0.5mL / 50-Unit',
    maxMl: 0.5,
    maxUnits: 50,
    marks: 50,
    markStep: 1,
    labelStep: 10,
    description: 'Smaller syringe — more precise for medium doses',
    bestFor: 'Doses that would be 10–40 units on a 100U syringe',
  },
  {
    id: 'u30-03ml',
    label: '0.3mL / 30-Unit',
    maxMl: 0.3,
    maxUnits: 30,
    marks: 30,
    markStep: 1,
    labelStep: 5,
    description: 'Low-volume insulin syringe for precise small doses',
    bestFor: 'Very small doses (≤150mcg) requiring high precision',
  },
  {
    id: 'u8-01ml',
    label: '0.1mL / 8-Unit (Pen)',
    maxMl: 0.1,
    maxUnits: 8,
    marks: 8,
    markStep: 1,
    labelStep: 2,
    description: 'Ultra-low volume syringe for micro-dosing',
    bestFor: 'Very high concentrations or micro-doses',
  },
]

// ─── SVG Syringe Component ────────────────────────────────────────────────────

function SyringeSVG({
  syringeType,
  filledUnits,
  label,
}: {
  syringeType: SyringeType
  filledUnits: number
  label: string
}) {
  const { maxUnits, marks, markStep, labelStep, maxMl } = syringeType
  const clampedFill = Math.min(filledUnits, maxUnits)
  const fillPct = maxUnits > 0 ? clampedFill / maxUnits : 0

  // SVG geometry
  const svgW = 340
  const svgH = 100
  const needleH = 24
  const capH = 16
  const barrelX = 32
  const barrelW = svgW - barrelX - capH - 4
  const barrelY = 28
  const barrelH = 44
  const innerX = barrelX + 3
  const innerW = barrelW - 6
  const innerY = barrelY + 3
  const innerH = barrelH - 6

  const fillW = innerW * fillPct
  const isOver = filledUnits > maxUnits
  const fillColor = isOver ? '#ef4444' : fillPct > 0.9 ? '#f59e0b' : '#3b82f6'

  // Tick marks along the barrel
  const ticks = Array.from({ length: marks + 1 }, (_, i) => i)

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
        {/* Needle */}
        <polygon
          points={`${barrelX},${barrelY + 4} ${barrelX},${barrelY + barrelH - 4} ${barrelX - needleH},${barrelY + barrelH / 2}`}
          fill="#94a3b8"
        />
        {/* Barrel outline */}
        <rect x={barrelX} y={barrelY} width={barrelW} height={barrelH} rx={4} fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
        {/* Fill */}
        {fillW > 0 && (
          <rect
            x={innerX}
            y={innerY}
            width={fillW}
            height={innerH}
            rx={2}
            fill={fillColor}
            fillOpacity={0.85}
          />
        )}
        {/* Graduations */}
        {ticks.map(i => {
          const unitVal = i * markStep
          const x = innerX + (innerW * unitVal) / maxUnits
          const isLabel = unitVal % labelStep === 0
          const tickH = isLabel ? 14 : 7
          const tickY = barrelY + barrelH / 2 - tickH / 2
          return (
            <g key={i}>
              <line
                x1={x} y1={tickY}
                x2={x} y2={tickY + tickH}
                stroke={unitVal <= clampedFill ? '#ffffff60' : '#64748b'}
                strokeWidth={isLabel ? 1.5 : 0.8}
              />
              {isLabel && unitVal > 0 && unitVal < maxUnits && (
                <text
                  x={x}
                  y={barrelY - 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  {unitVal}
                </text>
              )}
            </g>
          )
        })}
        {/* Fill level indicator line */}
        {fillW > 0 && !isOver && (
          <line
            x1={innerX + fillW}
            y1={barrelY - 2}
            x2={innerX + fillW}
            y2={barrelY + barrelH + 2}
            stroke={fillColor}
            strokeWidth={2}
            strokeDasharray="3,2"
          />
        )}
        {/* Plunger cap */}
        <rect
          x={barrelX + barrelW}
          y={barrelY - 2}
          width={capH}
          height={barrelH + 4}
          rx={3}
          fill="#334155"
          stroke="#475569"
          strokeWidth={1}
        />
        {/* 0 label */}
        <text x={innerX} y={barrelY - 4} textAnchor="middle" fontSize={8} fill="#94a3b8" fontFamily="monospace">0</text>
        {/* Max label */}
        <text x={innerX + innerW} y={barrelY - 4} textAnchor="middle" fontSize={8} fill="#94a3b8" fontFamily="monospace">{maxUnits}</text>
        {/* Volume label */}
        <text x={svgW / 2} y={svgH - 4} textAnchor="middle" fontSize={9} fill="#64748b">
          {maxMl}mL · {maxUnits} IU capacity
        </text>
        {/* Fill annotation */}
        {filledUnits > 0 && (
          <text x={innerX + Math.min(fillW, innerW) / 2} y={barrelY + barrelH / 2 + 4} textAnchor="middle" fontSize={10} fill="white" fontWeight="bold">
            {Math.round(clampedFill * 10) / 10}
          </text>
        )}
      </svg>
      <div className="text-center mt-1">
        <span className={cn(
          'text-sm font-semibold',
          isOver ? 'text-red-400' : 'text-white'
        )}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SyringeCalculator({ peptides }: { peptides: PeptideRow[] }) {
  const [selectedPeptide, setSelectedPeptide] = useState<string>(peptides[0]?.slug || '')
  const [vialMg, setVialMg] = useState(5)
  const [bacWaterMl, setBacWaterMl] = useState(2)
  const [selectedSyringe, setSelectedSyringe] = useState<string>('u100-1ml')
  const [weight, setWeight] = useState(80)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [customDoseMcg, setCustomDoseMcg] = useState<number | ''>('')
  const [doseLevel, setDoseLevel] = useState<'low' | 'standard' | 'high'>('standard')

  const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight
  const peptide = peptides.find(p => p.slug === selectedPeptide)
  const protocol = PROTOCOLS.find(p => p.slug === selectedPeptide)
  const syringe = SYRINGE_TYPES.find(s => s.id === selectedSyringe)!
  const dosage = peptide?.dosage_info

  // Concentration
  const concMcgPerMl = (vialMg * 1000) / bacWaterMl
  const concMcgPerUnit = concMcgPerMl / 100 // on 100-unit basis
  const concPerSelectedUnit = concMcgPerMl / syringe.maxUnits  // mcg per 1 mark on selected syringe

  // Determine dose in mcg
  const baseDose = useMemo(() => {
    if (customDoseMcg !== '') return Number(customDoseMcg)
    if (!dosage?.min_dose) return protocol?.defaultDose || 250
    const base = dosage.weight_based ? (dosage.min_dose * weightKg) : dosage.min_dose
    const multiplier = doseLevel === 'low' ? 0.6 : doseLevel === 'high' ? 1.4 : 1
    return Math.round(base * multiplier)
  }, [customDoseMcg, dosage, weightKg, doseLevel, protocol])

  // Draw calculations
  const drawVolumeMl = baseDose / concMcgPerMl
  const drawUnits100 = drawVolumeMl * 100
  const drawUnitsSelected = drawVolumeMl * syringe.maxUnits
  const isOverCapacity = drawVolumeMl > syringe.maxMl
  const dosesPerVial = Math.floor((vialMg * 1000) / baseDose)

  // Per-mark reference for selected syringe
  const marksTable = [1, 2, 5, 10, 15, 20, 25, 30, 40, 50].filter(u => u <= syringe.maxUnits)

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl flex gap-3">
        <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-400">
          <strong className="text-zinc-200">How to use:</strong> Select your peptide, enter your vial size and BAC water volume, choose your syringe type, then set your dose. The calculator will show exactly how many units to draw and display it visually on the syringe.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── LEFT: Inputs ── */}
        <div className="space-y-5">

          {/* Step 1: Peptide */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">1</span>
              Select Peptide
            </h3>
            <select
              value={selectedPeptide}
              onChange={e => {
                setSelectedPeptide(e.target.value)
                setCustomDoseMcg('')
                const p = PROTOCOLS.find(pr => pr.slug === e.target.value)
                if (p) {
                  setVialMg(p.defaultVialSize || 5)
                  setBacWaterMl(p.defaultBacWater || 2)
                }
              }}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
            >
              {peptides.map(p => <option key={p.slug} value={p.slug}>{p.name}</option>)}
            </select>
            {protocol && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
                <span>Common vials:</span>
                {protocol.vialSizes.filter(v => v > 0).map(v => (
                  <button key={v} onClick={() => setVialMg(v)}
                    className={cn('px-2 py-0.5 rounded border transition-colors', vialMg === v ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : 'border-zinc-700 hover:border-zinc-500 text-zinc-400')}>
                    {v}mg
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Vial Setup */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">2</span>
              Vial Setup
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Vial Size</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[1, 2, 3, 5, 10, 15, 20].map(v => (
                    <button key={v} onClick={() => setVialMg(v)}
                      className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors', vialMg === v ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white')}>
                      {v}mg
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={vialMg} min={0.5} step={0.5} onChange={e => setVialMg(Number(e.target.value))}
                    className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-center text-sm focus:outline-none focus:border-blue-500" />
                  <span className="text-zinc-500 text-xs">mg</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">BAC Water Added</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {[0.5, 1, 1.5, 2, 2.5, 3].map(v => (
                    <button key={v} onClick={() => setBacWaterMl(v)}
                      className={cn('px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors', bacWaterMl === v ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white')}>
                      {v}mL
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" value={bacWaterMl} min={0.1} step={0.5} onChange={e => setBacWaterMl(Number(e.target.value))}
                    className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-center text-sm focus:outline-none focus:border-blue-500" />
                  <span className="text-zinc-500 text-xs">mL BAC water</span>
                </div>
              </div>
            </div>

            {/* Concentration result */}
            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/15 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Solution Concentration</span>
                <span className="text-sm font-bold text-blue-300 font-mono">
                  {concMcgPerMl.toLocaleString()} mcg/mL
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-zinc-500">Per 1 IU (on 100-unit syringe)</span>
                <span className="text-sm text-zinc-300 font-mono">{concMcgPerUnit.toFixed(1)} mcg</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-zinc-500">Total peptide in vial</span>
                <span className="text-sm text-zinc-300 font-mono">{(vialMg * 1000).toLocaleString()} mcg ({vialMg}mg)</span>
              </div>
            </div>
          </div>

          {/* Step 3: Syringe Selection */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">3</span>
              Syringe Type
            </h3>
            <div className="space-y-2">
              {SYRINGE_TYPES.map(s => (
                <button key={s.id} onClick={() => setSelectedSyringe(s.id)}
                  className={cn('w-full text-left p-3 rounded-xl border transition-all', selectedSyringe === s.id ? 'bg-blue-600/10 border-blue-500/40' : 'bg-zinc-800/40 border-zinc-700 hover:border-zinc-500')}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Syringe className={cn('h-4 w-4 flex-shrink-0', selectedSyringe === s.id ? 'text-blue-400' : 'text-zinc-500')} />
                      <span className={cn('font-medium text-sm', selectedSyringe === s.id ? 'text-white' : 'text-zinc-300')}>{s.label}</span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">1 mark = {(s.maxMl / s.maxUnits * 1000).toFixed(0)} µL</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 ml-6">{s.bestFor}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Dose */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">4</span>
              Dose Selection
            </h3>

            {/* Weight input for weight-based */}
            {dosage?.weight_based && (
              <div className="mb-4 p-3 bg-zinc-800 rounded-lg">
                <label className="block text-xs text-zinc-500 mb-2">Body Weight (weight-based dosing)</label>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {(['kg', 'lbs'] as const).map(u => (
                      <button key={u} onClick={() => setWeightUnit(u)}
                        className={cn('px-3 py-1 text-xs font-medium border transition-colors first:rounded-l-lg last:rounded-r-lg', weightUnit === u ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-700 border-zinc-600 text-zinc-400')}>
                        {u}
                      </button>
                    ))}
                  </div>
                  <input type="number" value={weight} min={30} onChange={e => setWeight(Number(e.target.value))}
                    className="w-20 bg-zinc-700 border border-zinc-600 rounded-lg px-2 py-1 text-white text-center text-sm focus:outline-none" />
                  <span className="text-zinc-400 text-xs">{weightUnit} = {weightKg.toFixed(1)} kg</span>
                </div>
              </div>
            )}

            {/* Preset dose buttons from protocol */}
            {protocol && protocol.doses.length > 0 && (
              <div className="mb-3">
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Protocol Doses</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {protocol.doses.map(d => {
                    const effectiveMcg = dosage?.weight_based ? Math.round(d.mcg * weightKg) : d.mcg
                    const isSelected = customDoseMcg === '' && baseDose === effectiveMcg
                    return (
                      <button key={d.mcg}
                        onClick={() => { setCustomDoseMcg(effectiveMcg); setDoseLevel('standard') }}
                        className={cn('p-2.5 rounded-lg border text-left text-xs transition-all', isSelected ? 'bg-blue-600/20 border-blue-500 text-blue-200' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white')}>
                        <div className="font-semibold">{effectiveMcg >= 1000 ? `${(effectiveMcg / 1000).toFixed(2)}mg` : `${effectiveMcg}mcg`}</div>
                        <div className="opacity-70 text-xs leading-tight">{d.description || d.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Dose level */}
            {!customDoseMcg && (
              <div className="mb-3">
                <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Dose Level</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {([['low', 'Conservative', '~60%'], ['standard', 'Standard', '100%'], ['high', 'Higher', '~140%']] as const).map(([id, label, pct]) => (
                    <button key={id} onClick={() => setDoseLevel(id)}
                      className={cn('py-2 rounded-lg border text-xs font-medium transition-colors', doseLevel === id ? 'bg-blue-600/20 border-blue-500 text-blue-300' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white')}>
                      {label}<br /><span className="opacity-60">{pct}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom dose */}
            <div>
              <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2">Custom Dose</label>
              <div className="flex items-center gap-2">
                <input type="number" value={customDoseMcg} min={1} placeholder="e.g. 250"
                  onChange={e => setCustomDoseMcg(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-32 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                <span className="text-zinc-400 text-sm">mcg</span>
                {customDoseMcg !== '' && (
                  <button onClick={() => setCustomDoseMcg('')}
                    className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">clear</button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="space-y-5">

          {/* Primary result card */}
          <div className={cn('rounded-xl border p-6', isOverCapacity ? 'bg-red-500/5 border-red-500/30' : 'bg-zinc-900 border-zinc-800')}>
            <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-400" />
              Draw Results — {peptide?.name}
            </h3>

            {/* The syringe visual */}
            <div className="mb-5 px-2">
              <SyringeSVG
                syringeType={syringe}
                filledUnits={drawUnitsSelected}
                label={`${Math.round(drawUnitsSelected * 10) / 10} IU on ${syringe.label}`}
              />
            </div>

            {isOverCapacity && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/25 rounded-lg flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">
                  This dose ({drawVolumeMl.toFixed(3)}mL) exceeds the {syringe.maxMl}mL capacity.
                  Use a larger syringe or increase reconstitution concentration.
                </p>
              </div>
            )}

            {/* Big numbers */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={cn('rounded-xl p-4 border text-center', isOverCapacity ? 'bg-red-500/10 border-red-500/25' : 'bg-blue-500/10 border-blue-500/20')}>
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Units to Draw</p>
                <p className={cn('text-3xl font-bold', isOverCapacity ? 'text-red-400' : 'text-blue-300')}>
                  {Math.round(drawUnitsSelected * 10) / 10}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">IU on {syringe.maxUnits}-unit syringe</p>
              </div>
              <div className="bg-zinc-800/60 rounded-xl p-4 border border-zinc-700 text-center">
                <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Volume</p>
                <p className="text-3xl font-bold text-white">{drawVolumeMl.toFixed(3)}</p>
                <p className="text-xs text-zinc-500 mt-0.5">mL</p>
              </div>
            </div>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <dt className="text-zinc-500">Dose</dt>
                <dd className="text-white font-medium">{baseDose >= 1000 ? `${(baseDose / 1000).toFixed(2)}mg` : `${baseDose}mcg`}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <dt className="text-zinc-500">Concentration</dt>
                <dd className="text-zinc-200 font-mono">{concMcgPerMl.toLocaleString()} mcg/mL</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <dt className="text-zinc-500">On 100-unit syringe</dt>
                <dd className="text-zinc-200 font-mono">{Math.round(drawUnits100 * 10) / 10} IU</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800">
                <dt className="text-zinc-500">Doses per vial</dt>
                <dd className="text-emerald-400 font-semibold">{dosesPerVial} doses</dd>
              </div>
              {dosesPerVial > 0 && (
                <div className="flex justify-between py-2">
                  <dt className="text-zinc-500">Shelf life reminder</dt>
                  <dd className="text-zinc-400 text-xs">28 days refrigerated (BAC water)</dd>
                </div>
              )}
            </dl>
          </div>

          {/* All syringe types comparison */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
              <Syringe className="h-4 w-4 text-blue-400" />
              All Syringe Types — {baseDose >= 1000 ? `${(baseDose / 1000).toFixed(2)}mg` : `${baseDose}mcg`}
            </h3>
            <div className="space-y-2">
              {SYRINGE_TYPES.map(s => {
                const vol = baseDose / concMcgPerMl
                const units = vol * s.maxUnits
                const over = vol > s.maxMl
                const pct = (vol / s.maxMl) * 100
                return (
                  <button key={s.id} onClick={() => setSelectedSyringe(s.id)}
                    className={cn('w-full p-3 rounded-xl border transition-all text-left', selectedSyringe === s.id ? 'bg-blue-600/10 border-blue-500/40' : 'bg-zinc-800/40 border-zinc-700 hover:border-zinc-500')}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={cn('text-xs font-medium', selectedSyringe === s.id ? 'text-blue-300' : 'text-zinc-300')}>{s.label}</span>
                      <span className={cn('text-xs font-mono font-bold', over ? 'text-red-400' : 'text-white')}>
                        {over ? '⚠ OVER' : `${Math.round(units * 10) / 10} IU`}
                      </span>
                    </div>
                    {/* Mini progress bar */}
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', over ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-blue-500')}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-zinc-600">{vol.toFixed(3)}mL</span>
                      <span className="text-xs text-zinc-600">{Math.min(pct, 100).toFixed(0)}% capacity</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Per-mark reference table */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 text-sm">
              Mark Reference — {syringe.label}
            </h3>
            <p className="text-xs text-zinc-500 mb-3">
              Each mark = {(syringe.maxMl / syringe.maxUnits * 1000).toFixed(0)}µL · 1 IU = {concPerSelectedUnit.toFixed(1)} mcg at current concentration
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-600 border-b border-zinc-800">
                  <th className="text-left py-1.5 pr-3">IU (units)</th>
                  <th className="text-left py-1.5 pr-3">Volume</th>
                  <th className="text-left py-1.5">
                    Dose
                    <span className="text-zinc-700 ml-1">@ {concMcgPerMl.toLocaleString()}mcg/mL</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {marksTable.map(u => {
                  const ml = u / syringe.maxUnits * syringe.maxMl
                  const mcg = ml * concMcgPerMl
                  const isCurrentDraw = Math.abs(u - drawUnitsSelected) < 0.5
                  return (
                    <tr key={u} className={cn('hover:bg-zinc-800/20 transition-colors', isCurrentDraw && 'bg-blue-500/5')}>
                      <td className={cn('py-1.5 pr-3 font-mono', isCurrentDraw ? 'text-blue-300 font-bold' : 'text-zinc-300')}>
                        {u} IU {isCurrentDraw && '← your dose'}
                      </td>
                      <td className="py-1.5 pr-3 font-mono text-zinc-400">{ml.toFixed(3)}mL</td>
                      <td className={cn('py-1.5 font-mono', isCurrentDraw ? 'text-blue-300 font-bold' : 'text-zinc-200')}>
                        {mcg >= 1000 ? `${(mcg / 1000).toFixed(2)}mg` : `${mcg.toFixed(0)}mcg`}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Citations */}
          {protocol?.dosingReferences && protocol.dosingReferences.length > 0 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-400" />
                Dosing References for {protocol.name}
              </h3>
              <div className="space-y-3">
                {protocol.dosingReferences.map((ref, i) => (
                  <div key={i} className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-xs">
                    <p className="font-medium text-zinc-200 mb-1 leading-snug">{ref.title}</p>
                    <p className="text-zinc-500 mb-1">
                      {ref.authors} · <em>{ref.journal}</em> · {ref.year}
                    </p>
                    {ref.note && <p className="text-zinc-400 italic mb-1.5">{ref.note}</p>}
                    <div className="flex gap-3">
                      {ref.doi && (
                        <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                          DOI <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                          PubMed <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link href={`/peptides/${protocol.slug}`}
                className="flex items-center gap-1 mt-3 text-xs text-zinc-500 hover:text-blue-400 transition-colors">
                View all research studies for {protocol.name} <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Syringe guide info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="h-4 w-4 text-blue-400" />
          Insulin Syringe Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SYRINGE_TYPES.map(s => (
            <div key={s.id} className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-xs">
              <p className="font-semibold text-white mb-1">{s.label}</p>
              <p className="text-zinc-500 mb-2">{s.description}</p>
              <div className="space-y-1 text-zinc-400">
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="font-mono">{s.maxMl}mL / {s.maxUnits}IU</span>
                </div>
                <div className="flex justify-between">
                  <span>Each mark:</span>
                  <span className="font-mono">{(s.maxMl / s.maxUnits * 1000).toFixed(0)}µL</span>
                </div>
                <div className="flex justify-between">
                  <span>Best for:</span>
                </div>
                <p className="text-zinc-500 italic">{s.bestFor}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-lg">
          <p className="text-xs text-amber-400/80 leading-relaxed">
            <strong>Important:</strong> Always use <strong>bacteriostatic water (BAC water)</strong> — NOT sterile water — when reconstituting peptides for multi-use vials. BAC water contains 0.9% benzyl alcohol as a preservative, allowing the solution to remain stable for <strong>28+ days refrigerated</strong>. Sterile water should only be used for single-use preparation.
          </p>
        </div>
      </div>
    </div>
  )
}
