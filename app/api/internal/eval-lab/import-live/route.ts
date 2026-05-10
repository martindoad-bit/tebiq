import { NextResponse } from 'next/server'
import { importRecentLiveConsultationsToEvalLab } from '@/lib/db/queries/eval-lab'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'

// POST /api/internal/eval-lab/import-live
//
// Imports recent completed front-door ai_consultations into Eval Lab as
// reviewable real-user cases. Idempotent by starter_tag=live-{consultationId}.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface Body {
  limit?: number
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  let body: Body = {}
  try {
    body = (await req.json()) as Body
  } catch {
    body = {}
  }

  try {
    const result = await importRecentLiveConsultationsToEvalLab(body.limit ?? 50)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/import-live] failed', message)
    return NextResponse.json({ error: 'import_live_failed', detail: message }, { status: 500 })
  }
}
