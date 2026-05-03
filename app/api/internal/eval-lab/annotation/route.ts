import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  upsertEvalAnnotation,
  type EvalAction,
  type EvalSeverity,
} from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/annotation
//
// Save / update an annotation for (question_id, reviewer). Update-in-
// place — a single reviewer has at most one annotation per question.
//
// Body shape:
//   {
//     question_id: string,
//     reviewer?: string,
//     score?: 1..5 | null,
//     severity?: 'OK'|'P2'|'P1'|'P0' | null,
//     launchable?: 'yes'|'no' | null,
//     direction_correct?, answered_question?, dangerous_claim?,
//     hallucination?, should_handoff?: 'yes'|'no' | null,
//     must_have?, must_not_have?, missing_points?, reviewer_note?: string | null,
//     action?: 'golden_case'|...|'ignore' | null,
//     annotation_json?: Record<string, unknown>,
//   }
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ALLOWED_SEVERITY = new Set<EvalSeverity>(['OK', 'P2', 'P1', 'P0'])
const ALLOWED_ACTION = new Set<EvalAction>([
  'golden_case',
  'prompt_rule',
  'fact_card_candidate',
  'handoff_rule',
  'ignore',
])

type YesNo = 'yes' | 'no'
function asYesNo(v: unknown): YesNo | null {
  if (v === 'yes' || v === 'no') return v
  return null
}
function asSeverity(v: unknown): EvalSeverity | null {
  return typeof v === 'string' && ALLOWED_SEVERITY.has(v as EvalSeverity)
    ? (v as EvalSeverity)
    : null
}
function asAction(v: unknown): EvalAction | null {
  return typeof v === 'string' && ALLOWED_ACTION.has(v as EvalAction)
    ? (v as EvalAction)
    : null
}
function asScore(v: unknown): number | null {
  if (typeof v !== 'number') return null
  if (!Number.isInteger(v) || v < 1 || v > 5) return null
  return v
}
function asString(v: unknown): string | null {
  return typeof v === 'string' ? v : null
}

interface Body {
  question_id?: string
  reviewer?: string
  score?: number | null
  severity?: string | null
  launchable?: string | null
  direction_correct?: string | null
  answered_question?: string | null
  dangerous_claim?: string | null
  hallucination?: string | null
  should_handoff?: string | null
  must_have?: string | null
  must_not_have?: string | null
  missing_points?: string | null
  reviewer_note?: string | null
  action?: string | null
  annotation_json?: Record<string, unknown>
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const questionId = (body.question_id ?? '').trim()
  if (!questionId) {
    return NextResponse.json({ error: 'missing_question_id' }, { status: 400 })
  }
  const reviewer = (body.reviewer ?? 'default').slice(0, 64)

  try {
    const row = await upsertEvalAnnotation({
      questionId,
      reviewer,
      score: asScore(body.score),
      severity: asSeverity(body.severity),
      launchable: asYesNo(body.launchable),
      directionCorrect: asYesNo(body.direction_correct),
      answeredQuestion: asYesNo(body.answered_question),
      dangerousClaim: asYesNo(body.dangerous_claim),
      hallucination: asYesNo(body.hallucination),
      shouldHandoff: asYesNo(body.should_handoff),
      mustHave: asString(body.must_have),
      mustNotHave: asString(body.must_not_have),
      missingPoints: asString(body.missing_points),
      reviewerNote: asString(body.reviewer_note),
      action: asAction(body.action),
      annotationJson:
        body.annotation_json && typeof body.annotation_json === 'object'
          ? body.annotation_json
          : undefined,
    })
    return NextResponse.json({ ok: true, annotation: row })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/annotation] failed', message)
    return NextResponse.json({ error: 'annotation_failed', detail: message }, { status: 500 })
  }
}
