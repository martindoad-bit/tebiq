import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  listEvalAnnotations,
  listEvalAnswers,
  listEvalQuestions,
} from '@/lib/db/queries/eval-lab'

// GET /api/internal/eval-lab/state
//
// Returns the full DB-backed view of the Eval Lab: every active
// question, every answer (latest per (question, answer_type)), and
// every annotation for the requesting reviewer (default 'default').
//
// The shape here is deliberately flat — questions[], answers[],
// annotations[] — so the client can normalize them itself. The page
// joins client-side by question_id so adding fields later doesn't
// invalidate cached responses.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  const url = new URL(req.url)
  const reviewer = (url.searchParams.get('reviewer') || 'default').slice(0, 64)
  try {
    const questions = await listEvalQuestions()
    const ids = questions.map(q => q.id)
    const [answers, annotations] = await Promise.all([
      listEvalAnswers(ids),
      listEvalAnnotations(reviewer, ids),
    ])
    return NextResponse.json({
      ok: true,
      schema_version: 'eval-lab-v1',
      reviewer,
      questions,
      answers,
      annotations,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/state] failed', message)
    return NextResponse.json({ error: 'state_failed', detail: message }, { status: 500 })
  }
}
