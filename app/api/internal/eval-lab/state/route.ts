import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  listEvalAnnotations,
  listEvalAnswers,
  listEvalJudgements,
  listEvalQuestions,
  type EvalAnnotationRow,
  type EvalQuestionRow,
  type EvalAnswerRow,
  type EvalJudgementRow,
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

function toSnakeAnnotation(a: EvalAnnotationRow) {
  return {
    id: a.id,
    question_id: a.questionId,
    reviewer: a.reviewer,
    score: a.score,
    severity: a.severity,
    launchable: a.launchable,
    direction_correct: a.directionCorrect,
    answered_question: a.answeredQuestion,
    dangerous_claim: a.dangerousClaim,
    hallucination: a.hallucination,
    should_handoff: a.shouldHandoff,
    must_have: a.mustHave,
    must_not_have: a.mustNotHave,
    missing_points: a.missingPoints,
    reviewer_note: a.reviewerNote,
    action: a.action,
    annotation_json: a.annotationJson,
    schema_version: a.schemaVersion,
    created_at: a.createdAt,
    updated_at: a.updatedAt,
  }
}

function toSnakeJudgement(j: EvalJudgementRow) {
  return {
    id: j.id,
    question_id: j.questionId,
    case_id: j.caseId,
    judge_name: j.judgeName,
    judge_model: j.judgeModel,
    score: j.score,
    score_normalized: j.scoreNormalized,
    defect_flags: j.defectFlags,
    vs_deepseek_judgment: j.vsDeepseekJudgment,
    ideal_answer_skeleton: j.idealAnswerSkeleton,
    confidence: j.confidence,
    reasoning: j.reasoning,
    active_learning_red: j.activeLearningRed,
    active_learning_reasons: j.activeLearningReasons,
    source_csv_path: j.sourceCsvPath,
    schema_version: j.schemaVersion,
    created_at: j.createdAt,
    updated_at: j.updatedAt,
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
    let judgements: EvalJudgementRow[] = []
    try {
      judgements = await listEvalJudgements(ids)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.warn('[eval-lab/state] judgements unavailable', message)
    }
    return NextResponse.json({
      ok: true,
      schema_version: 'eval-lab-v1',
      reviewer,
      questions: questions.map(toSnakeQuestion),
      answers: answers.map(toSnakeAnswer),
      annotations: annotations.map(toSnakeAnnotation),
      judgements: judgements.map(toSnakeJudgement),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/state] failed', message)
    return NextResponse.json({ error: 'state_failed', detail: message }, { status: 500 })
  }
}
