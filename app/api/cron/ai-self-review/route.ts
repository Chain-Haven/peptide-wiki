/**
 * AI Self-Review Cron — Weekly Self-Improvement
 *
 * Runs weekly (Sunday 4 AM UTC). Reviews AI scraper decisions,
 * identifies patterns in errors and low-confidence calls,
 * and generates learning notes that improve future accuracy.
 */

import { runSelfReview } from '@/lib/ai-scraper'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  const startMs = Date.now()

  // Auth
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    if (process.env.NODE_ENV === 'production') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const triggeredBy = request.headers.get('x-triggered-by') || 'cron'

  try {
    const notes = await runSelfReview()

    return Response.json({
      success: true,
      type: 'ai_self_review',
      notes_generated: notes.length,
      notes,
      duration_ms: Date.now() - startMs,
      triggered_by: triggeredBy,
      timestamp: new Date().toISOString(),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[ai-self-review] Error:', msg)
    return Response.json({ error: msg }, { status: 500 })
  }
}
