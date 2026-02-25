/**
 * Manual inventory sync trigger.
 * Called from the /admin/inventory page.
 * Forwards to the cron endpoint with the CRON_SECRET.
 */
export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET

  // Simple admin auth — check for secret in request body or header
  const body = await request.json().catch(() => ({})) as { secret?: string }
  const providedSecret = body.secret || request.headers.get('x-admin-secret')

  if (cronSecret && providedSecret !== cronSecret) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Forward to the cron endpoint
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const cronUrl = `${baseUrl}/api/cron/sync-inventory`

  try {
    const res = await fetch(cronUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cronSecret || ''}`,
        'x-triggered-by': 'admin_manual',
      },
    })

    const data = await res.json()
    return Response.json(data, { status: res.status })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return Response.json({ error: 'Failed to trigger sync', details: message }, { status: 500 })
  }
}
