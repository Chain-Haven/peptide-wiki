import { ExternalLink, FlaskConical, Users, Award, TrendingDown, TrendingUp } from 'lucide-react'
import type { ResearchStudy } from '@/lib/types'

const studyTypeConfig: Record<string, { label: string; color: string; icon: string }> = {
  clinical_trial: { label: 'Clinical Trial', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: '🏥' },
  human: { label: 'Human Study', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: '👤' },
  animal: { label: 'Animal Study', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: '🐀' },
  in_vitro: { label: 'In Vitro', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: '🧪' },
  review: { label: 'Review', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20', icon: '📚' },
}

const OUTCOME_KEY_LABELS: Record<string, string> = {
  primary_outcome: 'Primary Outcome',
  weight_loss: 'Weight Loss',
  p_value: 'p-value',
  hazard_ratio: 'Hazard Ratio',
  ci_95: '95% CI',
  duration: 'Duration',
  fda_approved: 'FDA Approved',
  sustained_response: 'Sustained Response',
  response_rate: 'Response Rate',
  primary_endpoint: 'Primary Endpoint',
  treatment_difference: 'Treatment Difference',
  '5pct_responders': '≥5% Responders',
  '10pct_responders': '≥10% Responders',
  '15pct_responders': '≥15% Responders',
  '20pct_responders': '≥20% Responders',
  adverse_events: 'Adverse Events',
  note: 'Note',
}

const HIGHLIGHT_KEYS = new Set([
  'weight_loss', 'p_value', 'hazard_ratio', 'treatment_difference',
  'primary_endpoint', 'response_rate', 'sustained_response',
  'thymosin_response', 'erection_rate', 'survival_odds',
  'tirzepatide', 'semaglutide', 'tirzepatide_15mg', 'cagrilintide_4.5mg',
])

function isPositiveValue(key: string, value: string): boolean {
  if (key.includes('p_value') && value.startsWith('<')) return true
  if (key.includes('loss') || key.includes('reduction') || key.includes('decrease')) return value.startsWith('-')
  if (key.includes('responder') || key.includes('response') || key.includes('improvement')) return true
  return false
}

interface ClinicalTrialCardProps {
  study: ResearchStudy
}

export default function ClinicalTrialCard({ study }: ClinicalTrialCardProps) {
  const config = studyTypeConfig[study.study_type] || studyTypeConfig.review
  const hasOutcomeData = study.outcome_data && Object.keys(study.outcome_data).length > 0

  // Filter out keys we've already shown or that are internal
  const outcomeEntries = hasOutcomeData
    ? Object.entries(study.outcome_data!).filter(([k]) => !['primary_outcome', 'note', 'fda_approved', 'duration', 'dose'].includes(k))
    : []
  const primaryOutcome = study.outcome_data?.primary_outcome
  const noteText = study.outcome_data?.note
  const isFDAApproved = study.outcome_data?.fda_approved === 'true' || study.outcome_data?.fda_approved === true.toString()
  const duration = study.outcome_data?.duration

  return (
    <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-700/50">
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${config.color}`}>
                {config.icon} {config.label}
              </span>
              {study.trial_phase && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {study.trial_phase}
                </span>
              )}
              {isFDAApproved && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <Award className="h-3 w-3" /> FDA Approved
                </span>
              )}
            </div>
            <h3 className="font-semibold text-white text-sm leading-snug">{study.title}</h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <span>{study.authors}</span>
          <span className="text-zinc-700">·</span>
          <em>{study.journal}</em>
          <span className="text-zinc-700">·</span>
          <span>{study.year}</span>
          {study.sample_size && (
            <>
              <span className="text-zinc-700">·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> n={study.sample_size.toLocaleString()}
              </span>
            </>
          )}
          {duration && (
            <>
              <span className="text-zinc-700">·</span>
              <span>{duration}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 py-3 border-b border-zinc-700/30">
        <p className="text-sm text-zinc-300 leading-relaxed">{study.summary}</p>
      </div>

      {/* Outcome data visualization */}
      {hasOutcomeData && (
        <div className="px-5 py-4">
          {primaryOutcome && (
            <div className="mb-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-700/30">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Primary Outcome</p>
              <p className="text-sm text-zinc-200">{primaryOutcome}</p>
            </div>
          )}

          {outcomeEntries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {outcomeEntries.map(([key, value]) => {
                const label = OUTCOME_KEY_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                const isHighlight = HIGHLIGHT_KEYS.has(key)
                const isPositive = isPositiveValue(key, String(value))

                return (
                  <div
                    key={key}
                    className={`rounded-lg px-3 py-2 border ${isHighlight
                      ? 'bg-blue-500/5 border-blue-500/20'
                      : 'bg-zinc-900/40 border-zinc-700/30'
                    }`}
                  >
                    <p className="text-xs text-zinc-500 mb-0.5 leading-tight">{label}</p>
                    <p className={`text-sm font-semibold leading-tight ${isHighlight ? 'text-blue-300' : 'text-zinc-200'}`}>
                      {String(value)}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          {noteText && (
            <p className="mt-3 text-xs text-zinc-500 italic">{noteText}</p>
          )}
        </div>
      )}

      {/* Footer links */}
      <div className="px-5 py-3 border-t border-zinc-700/30 flex items-center gap-3">
        {study.doi && (
          <a
            href={`https://doi.org/${study.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <FlaskConical className="h-3 w-3" />
            DOI: {study.doi}
          </a>
        )}
        {study.publication_url && !study.doi && (
          <a
            href={study.publication_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            View Publication <ExternalLink className="h-3 w-3" />
          </a>
        )}
        {study.publication_url && study.doi && (
          <a
            href={study.publication_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
          >
            Full text <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}
