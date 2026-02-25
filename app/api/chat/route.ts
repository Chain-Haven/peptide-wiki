import { createGateway } from '@ai-sdk/gateway'
import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 60

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function searchRelevantPeptides(query: string): Promise<string> {
  try {
    // Full-text search across peptides
    const { data: peptides } = await supabase
      .from('peptides')
      .select(`
        name, slug, aliases, summary, mechanism, benefits, side_effects,
        dosage_info, cycle_length, stack_with, research_status,
        administration_routes, molecular_formula, half_life,
        category:categories(name, slug)
      `)
      .or(`name.ilike.%${query}%,summary.ilike.%${query}%,mechanism.ilike.%${query}%`)
      .limit(4)

    if (!peptides || peptides.length === 0) {
      // Broader fallback search
      const { data: fallback } = await supabase
        .from('peptides')
        .select(`
          name, slug, summary, mechanism, benefits, side_effects, dosage_info,
          cycle_length, stack_with, research_status, administration_routes
        `)
        .limit(6)
      if (!fallback || fallback.length === 0) return ''
      return formatPeptideContext(fallback)
    }

    // Also get prices and studies for matched peptides
    const slugs = peptides.map((p: { slug: string }) => p.slug)
    const { data: prices } = await supabase
      .from('prices')
      .select('peptide_id, price, quantity_mg, form, supplier:suppliers(name)')
      .in('peptide_id', peptides.map((p: { slug: string; id?: string }) => p.slug))

    return formatPeptideContext(peptides, prices || [])
  } catch {
    return ''
  }
}

function formatPeptideContext(peptides: Record<string, unknown>[], prices: Record<string, unknown>[] = []): string {
  if (!peptides.length) return ''

  const sections = peptides.map(p => {
    const d = p.dosage_info as Record<string, unknown> | null
    const doseStr = d?.min_dose != null
      ? `${d.min_dose}${d.max_dose && d.max_dose !== d.min_dose ? `–${d.max_dose}` : ''} ${d.unit}${d.weight_based ? '/kg' : ''}, ${d.frequency}`
      : 'See protocol'

    const benefits = Array.isArray(p.benefits)
      ? (p.benefits as string[]).join('; ')
      : ''
    const sideEffects = Array.isArray(p.side_effects)
      ? (p.side_effects as string[]).join('; ')
      : ''

    return `
## ${p.name}
- Category: ${(p.category as { name?: string } | null)?.name || 'N/A'}
- Aliases: ${Array.isArray(p.aliases) ? (p.aliases as string[]).join(', ') : 'None'}
- Research Status: ${p.research_status}
- Summary: ${p.summary}
- Mechanism: ${p.mechanism}
- Key Benefits: ${benefits}
- Side Effects: ${sideEffects}
- Dosage: ${doseStr}
- Cycle Length: ${p.cycle_length || 'N/A'}
- Administration: ${Array.isArray(p.administration_routes) ? (p.administration_routes as string[]).join(', ') : 'N/A'}
- Half-Life: ${p.half_life || 'N/A'}
- Molecular Formula: ${p.molecular_formula || 'N/A'}
- Stack With: ${Array.isArray(p.stack_with) ? (p.stack_with as string[]).join(', ') : 'None'}
- Page: https://peptide-wiki.org/peptides/${p.slug}`.trim()
  })

  return sections.join('\n\n')
}

async function getAllCategories(): Promise<string> {
  const { data } = await supabase.from('categories').select('name, slug, description').order('name')
  if (!data) return ''
  return data.map((c: { name: string; slug: string; description: string }) =>
    `${c.name} (${c.slug}): ${c.description}`
  ).join('\n')
}

const BASE_SYSTEM_PROMPT = `You are PeptideWiki AI — an expert research assistant for peptide-wiki.org, a comprehensive research database covering 60+ peptides.

You have deep expertise in:
- Peptide chemistry, mechanisms of action, and pharmacokinetics
- Research protocols, dosing, reconstitution, and injection techniques
- Clinical research, trials, and evidence quality
- Peptide stacking strategies and synergistic combinations
- Vendors, pricing, and sourcing guidance
- Safety considerations, side effects, and contraindications
- Peptide categories: body composition, weight management, healing/recovery, anti-aging/longevity, tanning, cognitive/nootropic, immune support, sexual health, and experimental compounds

When answering:
1. Be specific and evidence-based — cite mechanisms and research where relevant
2. Give practical, actionable protocol information when asked
3. Always include appropriate research-use-only disclaimers when discussing dosing
4. Link users to the relevant peptide page on the site (e.g., "See the full BPC-157 profile at /peptides/bpc-157")
5. If asked about reconstitution, explain clearly: vial size → BAC water amount → concentration → draw volume
6. Format responses with clear headings and bullet points when covering multiple topics
7. Be honest about the strength of evidence (human trials vs. animal studies vs. in vitro)
8. Never recommend specific doses for human use — frame all dosing as "research protocols" and "commonly used doses in research"

AVAILABLE TOOLS ON THE SITE:
- /peptides — browse all 61 peptides with filter and search
- /calculator — reconstitution calculator, dosage calculator, injection volume calculator, protocol guides
- /stacks — curated peptide stacks for specific goals
- /vendors — compare 9 vendors including Peptide Sciences, Swiss Chems, Core Peptides
- /compare — side-by-side peptide comparison

IMPORTANT DISCLAIMER: All information is for educational and research purposes only. Not medical advice. Always recommend users consult a healthcare professional.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Get the latest user message for RAG context
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
  const userQuery = lastUserMessage?.parts
    ?.filter((p: { type: string }) => p.type === 'text')
    .map((p: { type: string; text?: string }) => p.text || '')
    .join(' ') || ''

  // Fetch relevant peptide data from Supabase for RAG
  const [relevantPeptides, categories] = await Promise.all([
    searchRelevantPeptides(userQuery),
    // Only fetch categories on first message or if asked about categories
    messages.length <= 2 ? getAllCategories() : Promise.resolve(''),
  ])

  // Build the full system prompt with RAG context
  let systemPrompt = BASE_SYSTEM_PROMPT

  if (relevantPeptides) {
    systemPrompt += `\n\n---\n## RELEVANT PEPTIDE DATA FROM DATABASE:\n\n${relevantPeptides}`
  }

  if (categories) {
    systemPrompt += `\n\n---\n## AVAILABLE CATEGORIES:\n${categories}`
  }

  const result = streamText({
    model: gateway('anthropic/claude-sonnet-4-5'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
    maxOutputTokens: 1500,
  })

  return result.toUIMessageStreamResponse()
}
