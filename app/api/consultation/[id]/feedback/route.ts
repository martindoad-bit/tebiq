import { NextResponse } from 'next/server'
import {
  getAiConsultationById,
  setAiConsultationFeedback,
  type AiConsultationFeedback,
} from '@/lib/db/queries/aiConsultations'

// POST /api/consultation/[id]/feedback
//
// Issue #39 §4.5 — 5 feedback buttons. Body: { feedback: <type> }.
// 'human_review' implicitly sets human_confirm_clicked=true.
// 'saved' implicitly sets saved_question=true (also reachable via the
// dedicated /save endpoint).

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED: ReadonlySet<AiConsultationFeedback> = new Set<AiConsultationFeedback>([
  'helpful',
  'inaccurate',
  'add_context',
  'human_review',
  'saved',
])

interface ReqBody {
  feedback?: string
}

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const feedback = body.feedback as AiConsultationFeedback | undefined
  if (!feedback || !ALLOWED.has(feedback)) {
    return NextResponse.json({ error: 'invalid_feedback', allowed: Array.from(ALLOWED) }, { status: 400 })
  }
  const id = params.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  const exists = await getAiConsultationById(id)
  if (!exists) {
    return NextResponse.json({ error: 'unknown_consultation_id' }, { status: 404 })
  }
  try {
    await setAiConsultationFeedback(id, feedback)
    return NextResponse.json({ ok: true, feedback })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[consultation/feedback] failed', message)
    return NextResponse.json({ error: 'persist_failed', detail: message }, { status: 500 })
  }
}
