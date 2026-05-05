import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  listEvalAnnotations,
  listEvalAnswers,
  listEvalQuestions,
  type EvalQuestionRow,
  type EvalAnswerRow,
} from '@/lib/db/queries/eval-lab'

// Drizzle returns camelCase TypeScript names. The client + lib layer (sample-classifier,
// provider-health) were written expecting snake_case. Map here so downstream stays stable.
function toSnakeQuestion(q: EvalQuestionRow) {
  return {
    id: q.id,
    question_text: q.questionText,
    scenario: q.scenario,
    starter_tag: q.starterTag,
    source: q.source,
    active: q.active,
    schema_version: q.schemaVersion,
    metadata_json: q.metadataJson,
    created_at: q.createdAt,
    updated_at: q.updatedAt,
  }
}

function toSnakeAnswer(a: EvalAnswerRow) {
  return {
    id: a.id,
    question_id: a.questionId,
    answer_type: a.answerType,
    model: a.model,
    prompt_version: a.promptVersion,
    answer_text: a.answerText,
    tebiq_answer_id: a.tebiqAnswerId,
    tebiq_answer_link: a.tebiqAnswerLink,
    engine_version: a.engineVersion,
    status: a.status,
    domain: a.domain,
    fallback_reason: a.fallbackReason,
    latency_ms: a.latencyMs,
    error: a.error,
    raw_payload_json: a.rawPayloadJson,
    schema_version: a.schemaVersion,
    created_at: a.createdAt,
  }
}

// GET /api/internal/eval-lab/state
//
// Returns the full DB-backed view of the Eval Lab: every active
// question, every answer (latest per (question, answer_type)), and
// every annotation for the requesting reviewer.
//
// Query parameters:
//   ?reviewer=<string>   — Optional. Identifies whose annotations to
//                          return. Maps 1:1 to the `reviewer` column on
//                          eval_annotations and to the unique index
//                          (question_id, reviewer). Capped at 64 chars
//                          (longer values are silently truncated).
//                          DEFAULT: 'default' — when the parameter is
//                          omitted or blank, the route reads the
//                          'default' reviewer slot. Callers writing
//                          annotations from a non-default reviewer must
//                          pass this both here and to the
//                          /annotation POST route, otherwise the read
//                          and write target different rows.
//
// Response shape:
//   {
//     ok: true,
//     schema_version: 'eval-lab-v1',
//     reviewer: <effective reviewer string>,  // echoed back for clarity
//     questions: EvalQuestionRow[],
//     answers: EvalAnswerRow[],               // both answer_types
//     annotations: EvalAnnotationRow[],       // ONLY for the resolved reviewer
//   }
//
// The shape is deliberately flat — questions[], answers[],
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
      questions: questions.map(toSnakeQuestion),
      answers: answers.map(toSnakeAnswer),
      annotations,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/state] failed', message)
    return NextResponse.json({ error: 'state_failed', detail: message }, { status: 500 })
  }
}
