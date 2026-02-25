'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Calculator,
  FlaskConical,
  ArrowRight,
  Droplets,
  Syringe,
  BookOpen,
  Table2,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
  Clock,
  ExternalLink,
} from 'lucide-react'
import { getResearchStatusColor, getResearchStatusLabel, formatPrice } from '@/lib/utils'
import {
  PROTOCOLS,
  calculateReconstitution,
  calculateDrawVolume,
  type Protocol,
} from '@/data/protocols'
import { cn } from '@/lib/utils'
import SyringeCalculator from '@/components/SyringeCalculator'

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

type Tab = 'syringe' | 'reconstitution' | 'dosage' | 'volume' | 'protocol' | 'reference'

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { id: 'syringe', label: 'Syringe Calc', icon: Syringe, badge: 'New' },
  { id: 'reconstitution', label: 'Reconstitution', icon: Droplets },
  { id: 'dosage', label: 'Dosage Calc', icon: Calculator },
  { id: 'volume', label: 'Injection Volume', icon: FlaskConical },
  { id: 'protocol', label: 'Protocol Guide', icon: BookOpen },
  { id: 'reference', label: 'Quick Reference', icon: Table2 },
]

// ─── Helper components ───────────────────────────────────────────────────────

function ResultBox({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string
  value: string
  sub?: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl p-4 border',
        highlight
          ? 'bg-blue-500/10 border-blue-500/25'
          : 'bg-zinc-800/60 border-zinc-700'
      )}
    >
      <span className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</span>
      <span className={cn('text-xl font-bold', highlight ? 'text-blue-300' : 'text-white')}>
        {value}
      </span>
      {sub && <span className="text-xs text-zinc-500 mt-0.5">{sub}</span>}
    </div>
  )
}

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('bg-zinc-900 border border-zinc-800 rounded-xl p-6', className)}>
      {children}
    </div>
  )
}

function NumericInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  suffix?: string
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step ?? 1}
          onChange={e => onChange(Number(e.target.value))}
          className="w-32 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500 text-sm"
        />
        {suffix && <span className="text-zinc-400 text-sm">{suffix}</span>}
      </div>
      {hint && <p className="text-xs text-zinc-600 mt-1">{hint}</p>}
    </div>
  )
}

// ─── Tab: Reconstitution ──────────────────────────────────────────────────────

function ReconstitutionTab() {
  const [vialMg, setVialMg] = useState(5)
  const [waterMl, setWaterMl] = useState(2)
  const [customDesiredMcg, setCustomDesiredMcg] = useState(250)

  const result = useMemo(() => calculateReconstitution(vialMg, waterMl), [vialMg, waterMl])
  const drawResult = useMemo(
    () => calculateDrawVolume(customDesiredMcg, result.concPerMl),
    [customDesiredMcg, result.concPerMl]
  )

  const commonDoses = [100, 200, 250, 300, 400, 500, 1000, 2000, 5000, 10000]

  const presets = [
    { vial: 5, water: 1, label: '5mg + 1mL' },
    { vial: 5, water: 2, label: '5mg + 2mL ★' },
    { vial: 5, water: 3, label: '5mg + 3mL' },
    { vial: 10, water: 2, label: '10mg + 2mL' },
    { vial: 2, water: 1, label: '2mg + 1mL' },
    { vial: 2, water: 2, label: '2mg + 2mL' },
    { vial: 1, water: 1, label: '1mg + 1mL' },
  ]

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl flex gap-3">
        <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-400 space-y-1">
          <p>
            <strong className="text-zinc-200">Reconstitution</strong> is the process of adding bacteriostatic
            water (BAC water) to a lyophilized (freeze-dried) peptide to create an injectable solution.
          </p>
          <p>
            The amount of water you add determines the <strong className="text-zinc-200">concentration</strong>{' '}
            — and therefore how many units you draw in a syringe for a given dose.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-400" />
            Reconstitution Inputs
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Vial Size</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[1, 2, 3, 5, 10, 15, 20, 50, 100].map(v => (
                  <button
                    key={v}
                    onClick={() => setVialMg(v)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                      vialMg === v
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {v}mg
                  </button>
                ))}
              </div>
              <NumericInput
                label=""
                value={vialMg}
                onChange={setVialMg}
                min={0.1}
                step={0.5}
                suffix="mg vial"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">BAC Water to Add</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {[0.5, 1, 1.5, 2, 2.5, 3, 5, 10].map(v => (
                  <button
                    key={v}
                    onClick={() => setWaterMl(v)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
                      waterMl === v
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {v}mL
                  </button>
                ))}
              </div>
              <NumericInput
                label=""
                value={waterMl}
                onChange={setWaterMl}
                min={0.1}
                step={0.5}
                suffix="mL BAC water"
              />
            </div>

            {/* Common presets */}
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Common Presets</p>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button
                    key={p.label}
                    onClick={() => { setVialMg(p.vial); setWaterMl(p.water) }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs border transition-colors',
                      vialMg === p.vial && waterMl === p.water
                        ? 'bg-zinc-700 border-zinc-500 text-white'
                        : 'bg-zinc-800/60 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Results */}
        <SectionCard>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-blue-400" />
            Concentration Results
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <ResultBox
              label="Concentration"
              value={`${result.concPerMl.toLocaleString()} mcg/mL`}
              sub="per milliliter"
              highlight
            />
            <ResultBox
              label="Per 100IU syringe"
              value={`${result.concPerMl.toLocaleString()} mcg`}
              sub="1mL = 100 units"
            />
            <ResultBox
              label="Per 1 IU (unit)"
              value={`${result.concPerUnit.toFixed(1)} mcg`}
              sub="on 100-unit syringe"
            />
            <ResultBox
              label="Per 10 IU"
              value={`${result.concPer10iu.toFixed(0)} mcg`}
              sub="on 100-unit syringe"
            />
          </div>

          {/* Quick syringe reference */}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
              Syringe Reference ({result.concPerMl.toLocaleString()} mcg/mL)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-600 border-b border-zinc-800">
                    <th className="text-left py-1.5 pr-3">Units (IU)</th>
                    <th className="text-left py-1.5 pr-3">Volume</th>
                    <th className="text-left py-1.5">Dose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {[5, 10, 15, 20, 25, 30, 40, 50].map(units => {
                    const mcg = units * result.concPerUnit
                    const ml = units / 100
                    return (
                      <tr key={units} className="hover:bg-zinc-800/20">
                        <td className="py-1.5 pr-3 font-mono text-zinc-300">{units} IU</td>
                        <td className="py-1.5 pr-3 font-mono text-zinc-400">{ml.toFixed(2)} mL</td>
                        <td className="py-1.5 font-mono text-zinc-200">
                          {mcg >= 1000 ? `${(mcg / 1000).toFixed(2)}mg` : `${mcg.toFixed(0)}mcg`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Desired dose calculator */}
      <SectionCard>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Syringe className="h-5 w-5 text-blue-400" />
          Draw Volume Calculator — How much to inject for a specific dose?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Desired Dose</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {commonDoses.map(d => (
                <button
                  key={d}
                  onClick={() => setCustomDesiredMcg(d)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors',
                    customDesiredMcg === d
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                  )}
                >
                  {d >= 1000 ? `${d / 1000}mg` : `${d}mcg`}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={customDesiredMcg}
                min={1}
                step={10}
                onChange={e => setCustomDesiredMcg(Number(e.target.value))}
                className="w-28 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500 text-sm"
              />
              <span className="text-zinc-400 text-sm">mcg</span>
              <span className="text-zinc-500 text-xs">
                ({customDesiredMcg >= 1000 ? `${(customDesiredMcg / 1000).toFixed(2)}mg` : `${customDesiredMcg}mcg`})
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
              <p className="text-sm text-blue-400/80 mb-3">
                To inject <strong className="text-white">{customDesiredMcg >= 1000 ? `${(customDesiredMcg / 1000).toFixed(2)}mg` : `${customDesiredMcg}mcg`}</strong>{' '}
                from your <strong className="text-white">{result.concPerMl.toLocaleString()} mcg/mL</strong> solution:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Draw volume</p>
                  <p className="text-2xl font-bold text-white">
                    {drawResult.volumeMl < 0.001
                      ? '<0.001'
                      : drawResult.volumeMl.toFixed(3)}{' '}
                    <span className="text-base text-zinc-400">mL</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">On 100IU syringe</p>
                  <p className="text-2xl font-bold text-blue-300">
                    {drawResult.volumeUnitsRounded}{' '}
                    <span className="text-base text-zinc-400">IU</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Syringe guide */}
      <SectionCard>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-400" />
          Insulin Syringe Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: '100-Unit (1mL) Syringe',
              desc: 'Most common for peptide research. 100 markings = 1mL total. Each small mark = 0.01mL.',
              note: '1 "unit" = 0.01mL',
            },
            {
              title: '50-Unit (0.5mL) Syringe',
              desc: 'Smaller syringe used for lower doses. 50 markings = 0.5mL. Each mark = 0.01mL.',
              note: '1 "unit" = 0.01mL',
            },
            {
              title: 'Low-Volume (0.3mL) Syringe',
              desc: 'Used for very small doses. 30 markings = 0.3mL. Most precise for tiny volumes.',
              note: '1 "unit" = 0.01mL',
            },
          ].map(s => (
            <div key={s.title} className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl">
              <h4 className="font-medium text-white mb-2 text-sm">{s.title}</h4>
              <p className="text-xs text-zinc-400 mb-2">{s.desc}</p>
              <p className="text-xs text-blue-400 font-mono">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/15 rounded-lg">
          <p className="text-xs text-amber-400/80">
            <strong>Important:</strong> All peptides should be reconstituted with{' '}
            <strong>bacteriostatic water</strong> (BAC water), NOT sterile water. BAC water contains 0.9% benzyl alcohol
            as a preservative, allowing the solution to be stored for 4+ weeks refrigerated.
          </p>
        </div>
      </SectionCard>
    </div>
  )
}

// ─── Tab: Dosage Calculator ───────────────────────────────────────────────────

function DosageTab({ peptides }: { peptides: PeptideRow[] }) {
  const [weight, setWeight] = useState(80)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [selectedSlug, setSelectedSlug] = useState<string>(peptides[0]?.slug || '')
  const [doseLevel, setDoseLevel] = useState<'low' | 'standard' | 'high'>('standard')

  const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight

  const peptide = peptides.find(p => p.slug === selectedSlug)
  const protocol = PROTOCOLS.find(p => p.slug === selectedSlug)
  const dosage = peptide?.dosage_info

  const doseMultiplier = doseLevel === 'low' ? 0.6 : doseLevel === 'high' ? 1.4 : 1

  const rawMinDose = dosage?.min_dose ?? null
  const rawMaxDose = dosage?.max_dose ?? rawMinDose

  const calcMin = rawMinDose != null
    ? (dosage?.weight_based ? rawMinDose * weightKg : rawMinDose) * doseMultiplier
    : null
  const calcMax = rawMaxDose != null
    ? (dosage?.weight_based ? rawMaxDose * weightKg : rawMaxDose) * doseMultiplier
    : null

  // Calculate weekly and monthly total based on frequency
  const injectionsPerWeek = useMemo(() => {
    const freq = dosage?.frequency?.toLowerCase() ?? ''
    if (freq.includes('3x') || freq.includes('3 times') || freq.includes('thrice')) return 3
    if (freq.includes('2x') || freq.includes('twice') || freq.includes('two')) return 2
    if (freq.includes('daily') || freq.includes('once daily') || freq.includes('1x')) return 7
    if (freq.includes('weekly') || freq.includes('once weekly') || freq.includes('1x per week')) return 1
    return 1
  }, [dosage?.frequency])

  const weeklyTotal = calcMin != null ? calcMin * injectionsPerWeek : null
  const monthlyTotal = weeklyTotal != null ? weeklyTotal * 4.33 : null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <SectionCard>
            <h3 className="font-semibold text-white mb-4">Your Weight</h3>
            <div className="flex gap-2 mb-4">
              {(['kg', 'lbs'] as const).map(u => (
                <button
                  key={u}
                  onClick={() => setWeightUnit(u)}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-sm font-medium border transition-colors',
                    weightUnit === u
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
            <input
              type="range"
              min={40}
              max={weightUnit === 'lbs' ? 400 : 180}
              value={weight}
              onChange={e => setWeight(Number(e.target.value))}
              className="w-full accent-blue-500 mb-3"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={weight}
                min={1}
                onChange={e => setWeight(Math.max(1, Number(e.target.value)))}
                className="w-24 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500 text-sm"
              />
              <span className="text-zinc-400 text-sm">{weightUnit}</span>
              <span className="text-zinc-500 text-sm">({weightKg.toFixed(1)} kg)</span>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="font-semibold text-white mb-3">Select Peptide</h3>
            <select
              value={selectedSlug}
              onChange={e => setSelectedSlug(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 mb-4"
            >
              {peptides.map(p => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>

            <h3 className="font-semibold text-white mb-3">Dose Level</h3>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'low', label: 'Conservative', desc: '~60% of standard' },
                { id: 'standard', label: 'Standard', desc: 'Established protocol' },
                { id: 'high', label: 'Higher', desc: '~140% of standard' },
              ] as const).map(level => (
                <button
                  key={level.id}
                  onClick={() => setDoseLevel(level.id)}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-colors',
                    doseLevel === level.id
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                  )}
                >
                  <div className="font-medium text-xs mb-0.5">{level.label}</div>
                  <div className="text-xs opacity-70">{level.desc}</div>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {peptide && (
            <>
              <SectionCard>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-blue-400" />
                    {peptide.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getResearchStatusColor(peptide.research_status)}`}>
                    {getResearchStatusLabel(peptide.research_status)}
                  </span>
                </div>

                {calcMin != null ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-4">
                    <p className="text-xs text-blue-400/80 mb-2">
                      {dosage?.weight_based ? `For ${weightKg.toFixed(1)}kg (${doseLevel} dose):` : `${doseLevel.charAt(0).toUpperCase() + doseLevel.slice(1)} dose:`}
                    </p>
                    <div className="text-3xl font-bold text-white mb-1">
                      {calcMin >= 1000 ? `${(calcMin / 1000).toFixed(2)}mg` : `${calcMin.toFixed(0)}mcg`}
                      {calcMax && calcMax !== calcMin && (
                        <span> – {calcMax >= 1000 ? `${(calcMax / 1000).toFixed(2)}mg` : `${calcMax.toFixed(0)}mcg`}</span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">per injection</p>
                  </div>
                ) : (
                  <div className="bg-zinc-800/60 rounded-xl p-4 mb-4">
                    <p className="text-sm text-zinc-400">No dose data available for this peptide.</p>
                  </div>
                )}

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {weeklyTotal != null && (
                    <ResultBox
                      label={`Weekly Total (${injectionsPerWeek}x/wk)`}
                      value={weeklyTotal >= 1000 ? `${(weeklyTotal / 1000).toFixed(2)}mg` : `${weeklyTotal.toFixed(0)}mcg`}
                    />
                  )}
                  {monthlyTotal != null && (
                    <ResultBox
                      label="Monthly Total"
                      value={monthlyTotal >= 1000 ? `${(monthlyTotal / 1000).toFixed(1)}mg` : `${monthlyTotal.toFixed(0)}mcg`}
                    />
                  )}
                </dl>

                <div className="mt-4 space-y-2 text-sm">
                  {dosage?.frequency && (
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-zinc-500">Frequency</span>
                      <span className="text-zinc-200">{dosage.frequency}</span>
                    </div>
                  )}
                  {peptide.cycle_length && (
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-zinc-500">Cycle Length</span>
                      <span className="text-zinc-200">{peptide.cycle_length}</span>
                    </div>
                  )}
                  {peptide.administration_routes?.[0] && (
                    <div className="flex justify-between py-2">
                      <span className="text-zinc-500">Primary Route</span>
                      <span className="text-zinc-200 capitalize">{peptide.administration_routes[0]}</span>
                    </div>
                  )}
                </div>

                {dosage?.notes && (
                  <div className="mt-3 p-3 bg-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-400 leading-relaxed">{dosage.notes}</p>
                  </div>
                )}
              </SectionCard>

              {/* Vials needed */}
              {protocol && monthlyTotal != null && (
                <SectionCard>
                  <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-blue-400" />
                    Vials Needed
                  </h3>
                  <div className="space-y-2">
                    {protocol.vialSizes.filter(v => v > 0).map(vialMg => {
                      const vialMcg = vialMg * 1000
                      const vialsPerMonth = monthlyTotal / vialMcg
                      return (
                        <div key={vialMg} className="flex justify-between items-center py-2 border-b border-zinc-800 last:border-0 text-sm">
                          <span className="text-zinc-400">{vialMg}mg vials</span>
                          <span className="text-white font-medium">{vialsPerMonth.toFixed(1)}/month</span>
                        </div>
                      )
                    })}
                  </div>
                </SectionCard>
              )}

              <Link
                href={`/peptides/${peptide.slug}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
              >
                Full {peptide.name} Profile <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Tab: Injection Volume ────────────────────────────────────────────────────

function VolumeTab() {
  const [desiredMcg, setDesiredMcg] = useState(250)
  const [concPerMl, setConcPerMl] = useState(2500)
  const [syringeType, setSyringeType] = useState<100 | 50 | 30>(100)

  const volumeMl = desiredMcg / concPerMl
  const volumeUnits = volumeMl * syringeType
  const maxCapacity = 1 / (syringeType / 100)
  const pctFull = (volumeMl / maxCapacity) * 100

  const concPresets = [
    { label: '2mg/mL (5mg+2.5mL)', val: 2000 },
    { label: '2.5mg/mL (5mg+2mL)', val: 2500 },
    { label: '5mg/mL (5mg+1mL)', val: 5000 },
    { label: '1mg/mL (2mg+2mL)', val: 1000 },
    { label: '1.5mg/mL (3mg+2mL)', val: 1500 },
    { label: '3.3mg/mL (10mg+3mL)', val: 3333 },
  ]

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl flex gap-3">
        <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-zinc-400">
          Already reconstituted your peptide and know the concentration? Enter your desired dose and concentration to find exactly how much to draw in the syringe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard>
          <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
            <Syringe className="h-5 w-5 text-blue-400" />
            Injection Inputs
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Desired Dose (mcg)</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[50, 100, 200, 250, 300, 500, 1000, 2000, 5000].map(d => (
                  <button
                    key={d}
                    onClick={() => setDesiredMcg(d)}
                    className={cn(
                      'px-2.5 py-1 rounded text-xs font-medium border transition-colors',
                      desiredMcg === d
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {d >= 1000 ? `${d / 1000}mg` : `${d}mcg`}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={desiredMcg}
                  min={1}
                  onChange={e => setDesiredMcg(Number(e.target.value))}
                  className="w-28 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500 text-sm"
                />
                <span className="text-zinc-400 text-sm">mcg</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Solution Concentration (mcg/mL)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {concPresets.map(p => (
                  <button
                    key={p.val}
                    onClick={() => setConcPerMl(p.val)}
                    className={cn(
                      'px-2 py-1 rounded text-xs border transition-colors',
                      concPerMl === p.val
                        ? 'bg-zinc-700 border-zinc-500 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={concPerMl}
                  min={1}
                  onChange={e => setConcPerMl(Number(e.target.value))}
                  className="w-28 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-blue-500 text-sm"
                />
                <span className="text-zinc-400 text-sm">mcg/mL</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Syringe Type</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { iu: 100, label: '100IU (1mL)' },
                  { iu: 50, label: '50IU (0.5mL)' },
                  { iu: 30, label: '30IU (0.3mL)' },
                ] as const).map(s => (
                  <button
                    key={s.iu}
                    onClick={() => setSyringeType(s.iu)}
                    className={cn(
                      'py-2 rounded-lg text-xs font-medium border transition-colors',
                      syringeType === s.iu
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-400" />
            Draw Volume Results
          </h3>

          {volumeMl > 1 ? (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-4 text-sm text-red-400">
              ⚠ Calculated volume ({volumeMl.toFixed(3)}mL) exceeds 1mL. Consider using a higher concentration or splitting into multiple injections.
            </div>
          ) : null}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 mb-4">
            <p className="text-xs text-blue-400/80 mb-3">
              For <strong className="text-white">{desiredMcg >= 1000 ? `${(desiredMcg / 1000).toFixed(2)}mg` : `${desiredMcg}mcg`}</strong>{' '}
              at <strong className="text-white">{concPerMl.toLocaleString()}mcg/mL</strong>:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Volume to draw</p>
                <p className="text-3xl font-bold text-white">
                  {volumeMl < 0.001 ? '<0.001' : volumeMl.toFixed(3)}
                  <span className="text-base text-zinc-400 ml-1">mL</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">On {syringeType}IU syringe</p>
                <p className="text-3xl font-bold text-blue-300">
                  {Math.round(volumeUnits * 10) / 10}
                  <span className="text-base text-zinc-400 ml-1">IU</span>
                </p>
              </div>
            </div>
          </div>

          {/* Visual syringe bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1">
              <span>0 IU</span>
              <span className="text-zinc-300">{Math.round(volumeUnits * 10) / 10} IU filled</span>
              <span>{syringeType} IU</span>
            </div>
            <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  pctFull > 100 ? 'bg-red-500' : pctFull > 80 ? 'bg-amber-500' : 'bg-blue-500'
                )}
                style={{ width: `${Math.min(100, pctFull)}%` }}
              />
            </div>
            <p className="text-xs text-zinc-600 mt-1 text-right">{pctFull.toFixed(1)}% of syringe capacity</p>
          </div>

          {/* Dose table */}
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Common Doses at This Concentration</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-zinc-600 border-b border-zinc-800">
                  <th className="text-left py-1.5 pr-3">Dose</th>
                  <th className="text-left py-1.5 pr-3">Volume</th>
                  <th className="text-left py-1.5">IU ({syringeType}-unit)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[100, 200, 250, 300, 400, 500, 750, 1000, 2000, 5000].map(d => {
                  const ml = d / concPerMl
                  const iu = ml * syringeType
                  return (
                    <tr
                      key={d}
                      className={cn('hover:bg-zinc-800/20', d === desiredMcg && 'bg-blue-500/5')}
                    >
                      <td className="py-1.5 pr-3 font-mono text-zinc-200">
                        {d >= 1000 ? `${d / 1000}mg` : `${d}mcg`}
                        {d === desiredMcg && ' ←'}
                      </td>
                      <td className="py-1.5 pr-3 font-mono text-zinc-400">{ml.toFixed(3)}mL</td>
                      <td className="py-1.5 font-mono text-zinc-300">{Math.round(iu * 10) / 10} IU</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

// ─── Tab: Protocol Guide ──────────────────────────────────────────────────────

function ProtocolTab() {
  const [selectedSlug, setSelectedSlug] = useState<string>(PROTOCOLS[0]?.slug || '')
  const protocol = PROTOCOLS.find(p => p.slug === selectedSlug)

  return (
    <div className="space-y-4">
      {/* Peptide selector */}
      <div className="flex flex-wrap gap-2">
        {PROTOCOLS.map(p => (
          <button
            key={p.slug}
            onClick={() => setSelectedSlug(p.slug)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              selectedSlug === p.slug
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      {protocol && (
        <div className="space-y-5">
          {/* Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h2 className="text-xl font-bold text-white">{protocol.name}</h2>
                <p className="text-sm text-blue-400">{protocol.category}</p>
              </div>
              <div className="flex flex-col gap-2 text-right text-xs text-zinc-500">
                <span>Route: <span className="text-zinc-300 capitalize">{protocol.route[0]}</span></span>
                <span>Frequency: <span className="text-zinc-300">{protocol.frequency}</span></span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 mb-0.5">Timing</p>
                <p className="text-xs text-zinc-200 leading-snug">{protocol.timing}</p>
              </div>
              <div className="p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 mb-0.5">Default Vial</p>
                <p className="text-xs text-zinc-200">{protocol.defaultVialSize > 0 ? `${protocol.defaultVialSize}mg` : 'Oral/No vial'}</p>
              </div>
              <div className="p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 mb-0.5">Recommended Recon</p>
                <p className="text-xs text-zinc-200">
                  {protocol.defaultBacWater > 0 ? `${protocol.defaultBacWater}mL BAC water` : 'N/A'}
                </p>
              </div>
              <div className="p-3 bg-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 mb-0.5">Stack With</p>
                <p className="text-xs text-zinc-200">{protocol.stackWith?.join(', ') || 'Standalone'}</p>
              </div>
            </div>
          </div>

          {/* Dosing Options */}
          <SectionCard>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-400" />
              Dosing Options
            </h3>
            <div className="space-y-3">
              {protocol.doses.map(dose => {
                const reconResult = protocol.defaultBacWater > 0 && protocol.defaultVialSize > 0
                  ? calculateReconstitution(protocol.defaultVialSize, protocol.defaultBacWater)
                  : null
                const drawVol = reconResult
                  ? calculateDrawVolume(dose.mcg, reconResult.concPerMl)
                  : null

                return (
                  <div
                    key={dose.mcg}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{dose.label}</div>
                      {dose.description && <div className="text-xs text-zinc-500">{dose.description}</div>}
                    </div>
                    <div className="flex gap-4 text-xs font-mono">
                      <div className="text-center">
                        <p className="text-zinc-600 mb-0.5">Dose</p>
                        <p className="text-zinc-200">
                          {dose.mcg >= 1000 ? `${(dose.mcg / 1000).toFixed(2)}mg` : `${dose.mcg}mcg`}
                        </p>
                      </div>
                      {drawVol && (
                        <>
                          <div className="text-center">
                            <p className="text-zinc-600 mb-0.5">Volume</p>
                            <p className="text-blue-300">{drawVol.volumeMl.toFixed(3)}mL</p>
                          </div>
                          <div className="text-center">
                            <p className="text-zinc-600 mb-0.5">IU (100-unit)</p>
                            <p className="text-blue-300">{drawVol.volumeUnitsRounded} IU</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {protocol.reconstitutionNotes && (
              <div className="mt-4 p-3 bg-zinc-800 rounded-lg flex gap-2">
                <Info className="h-4 w-4 text-zinc-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-400">{protocol.reconstitutionNotes}</p>
              </div>
            )}
          </SectionCard>

          {/* Cycle Protocols */}
          <SectionCard>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-400" />
              Cycle Protocols
            </h3>
            <div className="space-y-4">
              {protocol.cycleProtocol.map((phase, i) => (
                <div key={i} className="relative pl-5 border-l-2 border-blue-500/30">
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500/50 border-2 border-blue-400" />
                  <div className="pb-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-semibold text-white text-sm">{phase.phase}</h4>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                        {phase.duration}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="p-2 bg-zinc-800/60 rounded-lg text-xs">
                        <span className="text-zinc-500">Dose: </span>
                        <span className="text-zinc-200 font-mono">{phase.dose}</span>
                      </div>
                      <div className="p-2 bg-zinc-800/60 rounded-lg text-xs">
                        <span className="text-zinc-500">Frequency: </span>
                        <span className="text-zinc-200">{phase.frequency}</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{phase.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Tips & Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionCard>
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Protocol Tips
              </h3>
              <ul className="space-y-2">
                {protocol.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard>
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Warnings & Considerations
              </h3>
              <ul className="space-y-2">
                {protocol.warnings.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Dosing References */}
          {protocol.dosingReferences && protocol.dosingReferences.length > 0 && (
            <SectionCard>
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-blue-400" />
                Dosing References & Sources
              </h3>
              <div className="space-y-3">
                {protocol.dosingReferences.map((ref, i) => (
                  <div key={i} className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-xs">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-zinc-600 font-bold mt-0.5 flex-shrink-0">[{i + 1}]</span>
                      <p className="font-medium text-zinc-200 leading-snug">{ref.title}</p>
                    </div>
                    <p className="text-zinc-500 mb-1.5 ml-5">
                      {ref.authors} · <em className="text-zinc-400">{ref.journal}</em> · {ref.year}
                    </p>
                    {ref.note && (
                      <p className="text-zinc-400 italic mb-2 ml-5 text-xs leading-relaxed">{ref.note}</p>
                    )}
                    <div className="flex gap-3 ml-5">
                      {ref.doi && (
                        <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                          DOI: {ref.doi.substring(0, 20)}{ref.doi.length > 20 ? '…' : ''}
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                          View Paper <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          <div className="flex justify-end">
            <Link
              href={`/peptides/${protocol.slug}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Full {protocol.name} Research Profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tab: Quick Reference ─────────────────────────────────────────────────────

function ReferenceTab({ peptides }: { peptides: PeptideRow[] }) {
  const [weight, setWeight] = useState(80)
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg')
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name')

  const weightKg = unit === 'lbs' ? weight * 0.453592 : weight

  const sorted = [...peptides].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return (a.research_status || '').localeCompare(b.research_status || '')
  })

  return (
    <div className="space-y-4">
      {/* Weight bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
        <span className="text-sm text-zinc-400">Your weight (for weight-based calculations):</span>
        <div className="flex gap-2">
          {(['kg', 'lbs'] as const).map(u => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={cn(
                'px-3 py-1 rounded text-xs font-medium border',
                unit === u ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              )}
            >
              {u}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={weight}
          onChange={e => setWeight(Number(e.target.value))}
          className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-center text-sm focus:outline-none focus:border-blue-500"
        />
        <span className="text-zinc-400 text-sm">{unit} = {weightKg.toFixed(1)} kg</span>

        <div className="flex gap-2 ml-auto">
          {(['name', 'category'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={cn(
                'px-3 py-1 rounded text-xs font-medium border',
                sortBy === s ? 'bg-zinc-700 border-zinc-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              )}
            >
              Sort by {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-950">
                <th className="text-left px-5 py-3 sticky left-0 bg-zinc-950">Peptide</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Dose Range</th>
                <th className="text-left px-5 py-3">For {weightKg.toFixed(0)}kg</th>
                <th className="text-left px-5 py-3">Frequency</th>
                <th className="text-left px-5 py-3">Cycle</th>
                <th className="text-left px-5 py-3">Routes</th>
                <th className="text-left px-5 py-3">Sources</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {sorted.map(p => {
                const d = p.dosage_info
                const doseRange = d?.min_dose != null
                  ? `${d.min_dose}${d.max_dose && d.max_dose !== d.min_dose ? `–${d.max_dose}` : ''} ${d.unit}${d.weight_based ? '/kg' : ''}`
                  : '—'
                const calcDose = d?.weight_based && d?.min_dose != null
                  ? `${(d.min_dose * weightKg).toFixed(0)}${d.max_dose && d.max_dose !== d.min_dose ? `–${(d.max_dose * weightKg).toFixed(0)}` : ''} ${d.unit}`
                  : '(fixed)'

                return (
                  <tr key={p.id} className="hover:bg-zinc-800/20 transition-colors">
                    <td className="px-5 py-3 sticky left-0 bg-zinc-900">
                      <Link href={`/peptides/${p.slug}`} className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getResearchStatusColor(p.research_status)}`}>
                        {getResearchStatusLabel(p.research_status)}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-zinc-300">{doseRange}</td>
                    <td className="px-5 py-3 font-mono text-xs text-zinc-200">
                      {d?.weight_based ? calcDose : doseRange}
                    </td>
                    <td className="px-5 py-3 text-xs text-zinc-400 max-w-44 truncate">{d?.frequency || '—'}</td>
                    <td className="px-5 py-3 text-xs text-zinc-400">{p.cycle_length || '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.administration_routes?.slice(0, 2).map((r: string) => (
                          <span key={r} className="text-xs bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-400 capitalize">
                            {r === 'subcutaneous injection' ? 'SubQ' :
                              r === 'intramuscular injection' ? 'IM' :
                              r === 'intranasal' ? 'Nasal' :
                              r.charAt(0).toUpperCase() + r.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {(() => {
                        const proto = PROTOCOLS.find(pr => pr.slug === p.slug)
                        const refs = proto?.dosingReferences
                        if (!refs || refs.length === 0) return (
                          <a href={`https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(p.name)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="text-xs text-zinc-600 hover:text-blue-400 flex items-center gap-1 transition-colors">
                            PubMed <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )
                        return (
                          <div className="flex flex-col gap-1">
                            {refs.slice(0, 2).map((ref, i) => (
                              <a key={i}
                                href={ref.url || (ref.doi ? `https://doi.org/${ref.doi}` : '#')}
                                target="_blank" rel="noopener noreferrer"
                                title={`${ref.title} (${ref.journal}, ${ref.year})`}
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5 transition-colors truncate max-w-32">
                                [{i + 1}] {ref.journal.split(' ').slice(0, 2).join(' ')} {ref.year}
                                <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" />
                              </a>
                            ))}
                          </div>
                        )
                      })()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DosageCalculatorClient({ peptides }: { peptides: PeptideRow[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('syringe')

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Peptide Calculator</h1>
        </div>
        <p className="text-zinc-400">
          Visual syringe calculator, reconstitution, dosage, injection volume, protocol guides with clinical citations, and quick reference.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-8">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && (
                <span className={cn(
                  'absolute -top-1.5 -right-1 text-xs px-1.5 py-0.5 rounded-full font-bold leading-none',
                  activeTab === tab.id ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                )}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'syringe' && <SyringeCalculator peptides={peptides} />}
        {activeTab === 'reconstitution' && <ReconstitutionTab />}
        {activeTab === 'dosage' && <DosageTab peptides={peptides} />}
        {activeTab === 'volume' && <VolumeTab />}
        {activeTab === 'protocol' && <ProtocolTab />}
        {activeTab === 'reference' && <ReferenceTab peptides={peptides} />}
      </div>

      {/* Disclaimer */}
      <div className="mt-10 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <p className="text-amber-400/80 text-xs leading-relaxed">
          <strong>Research Use Only.</strong> All calculations and protocols are for educational and research purposes only.
          These are not medical recommendations. Consult a qualified healthcare professional before using any research peptide.
          Individual responses may vary. Always verify calculations before administering any compound.
        </p>
      </div>
    </div>
  )
}
