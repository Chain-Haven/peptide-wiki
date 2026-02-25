import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { FlaskConical, ArrowRight } from 'lucide-react'
import { STACKS } from '@/data/peptides'

export const revalidate = 3600

export const metadata = {
  title: 'Peptide Stacks',
  description: 'Popular peptide stacks and combination protocols for muscle building, healing, anti-aging, fat loss, and cognitive enhancement.',
}

async function getStackPeptides(slugs: string[]) {
  const { data } = await supabase
    .from('peptides')
    .select('id, name, slug, research_status, aliases, summary, administration_routes, category:categories(*)')
    .in('slug', slugs)
  return data || []
}

const goalColors: Record<string, string> = {
  'Muscle growth, fat loss, body recomposition': 'from-blue-600/20 to-cyan-600/20',
  'Injury recovery, tissue repair, anti-inflammation': 'from-amber-600/20 to-orange-600/20',
  'Anti-aging, longevity, immune optimization': 'from-purple-600/20 to-violet-600/20',
  'Cognitive enhancement, anxiety reduction, focus': 'from-cyan-600/20 to-teal-600/20',
  'Fat loss, appetite suppression, metabolic optimization': 'from-emerald-600/20 to-green-600/20',
  'Maximum muscle growth and strength': 'from-red-600/20 to-rose-600/20',
}

export default async function StacksPage() {
  const allSlugs = [...new Set(STACKS.flatMap(s => s.peptides))]
  const peptides = await getStackPeptides(allSlugs)
  const peptideMap = Object.fromEntries(peptides.map(p => [p.slug, p]))

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Peptide Stacks</h1>
        <p className="text-zinc-400">
          Curated peptide combinations for specific goals, with protocols and rationale.
        </p>
      </div>

      <div className="space-y-6">
        {STACKS.map((stack, index) => {
          const gradient = goalColors[stack.goal] || 'from-zinc-600/20 to-zinc-700/20'
          return (
            <div
              key={stack.slug}
              className={`relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 pointer-events-none`} />

              <div className="relative">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Stack #{index + 1}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{stack.name}</h2>
                    <p className="text-sm text-blue-400 mt-0.5">{stack.goal}</p>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm mb-5">{stack.description}</p>

                {/* Peptide pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {stack.peptides.map(slug => {
                    const p = peptideMap[slug]
                    return p ? (
                      <Link
                        key={slug}
                        href={`/peptides/${slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 rounded-full text-sm text-white transition-colors"
                      >
                        <FlaskConical className="h-3.5 w-3.5 text-blue-400" />
                        {p.name}
                        <ArrowRight className="h-3 w-3 text-zinc-500" />
                      </Link>
                    ) : (
                      <span key={slug} className="px-3 py-1.5 bg-zinc-800/60 border border-zinc-700/50 rounded-full text-sm text-zinc-500 capitalize">
                        {slug.replace(/-/g, ' ')}
                      </span>
                    )
                  })}
                </div>

                {/* Protocol */}
                <div className="p-4 bg-zinc-950/60 border border-zinc-700/50 rounded-xl">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Protocol</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{stack.protocol}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <p className="text-amber-400/80 text-sm leading-relaxed">
          <strong>Important:</strong> All stacks listed are for research purposes only. Combination protocols should be thoroughly researched. These represent commonly discussed protocols in the research community and do not constitute medical advice.
        </p>
      </div>
    </div>
  )
}
