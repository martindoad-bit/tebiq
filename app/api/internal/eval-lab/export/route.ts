import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  listEvalAnnotations,
  listEvalAnswers,
  listEvalQuestions,
  type EvalAnswerRow,
  type EvalAnnotationRow,
} from '@/lib/db/queries/eval-lab'

// GET /api/internal/eval-lab/export?type=full|golden|knowledge_ab|annotations&reviewer=default
//
// `full`         — every question / answer / annotation row, schema_version-tagged.
// `golden`       — slim per-question record per spec §6: question +
//                  DeepSeek-raw + TEBIQ-current text + key annotation fields.
// `knowledge_ab` — Knowledge Atlas review export: A=current TEBIQ snapshot,
//                  B=knowledge candidate snapshot, plus annotation fields.
// `annotations`  — Annotations-only export for the reviewer. One row per
//                  annotated question with question text + verdict (quick
//                  verdict + severity + score) + notes + repair owner.
//                  Lightweight, useful for handing a batch of reviewer
//                  decisions to the founder / 行政書士 outside the Eval Lab.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  const url = new URL(req.url)
  const type = (url.searchParams.get('type') || 'full').toLowerCase()
  const reviewer = (url.searchParams.get('reviewer') || 'default').slice(0, 64)

  try {
    const questions = await listEvalQuestions()
    const ids = questions.map(q => q.id)
    const [answers, annotations] = await Promise.all([
      listEvalAnswers(ids),
      listEvalAnnotations(reviewer, ids),
    ])

    const exportedAt = new Date().toISOString()

    if (type === 'golden') {
      const items = buildGoldenItems(questions, answers, annotations)
      return jsonDownload('eval-lab-golden.json', {
        schema_version: 'eval-lab-golden-v1',
        exported_at: exportedAt,
        reviewer,
        items,
      })
    }

    if (type === 'knowledge_ab') {
      const items = buildKnowledgeAbItems(questions, answers, annotations)
      return jsonDownload('eval-lab-knowledge-ab.json', {
        schema_version: 'eval-lab-knowledge-ab-v1',
        exported_at: exportedAt,
        reviewer,
        items,
      })
    }

    if (type === 'annotations') {
      const items = buildAnnotationItems(questions, annotations)
      return jsonDownload('eval-lab-annotations.json', {
        schema_version: 'eval-lab-annotations-v1',
        exported_at: exportedAt,
        reviewer,
        count: items.length,
        items,
      })
    }

    return jsonDownload('eval-lab-full.json', {
      schema_version: 'eval-lab-v1',
      exported_at: exportedAt,
      reviewer,
      questions,
      answers,
      annotations,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/export] failed', message)
    return NextResponse.json({ error: 'export_failed', detail: message }, { status: 500 })
  }
}

function jsonDownload(filename: string, payload: unknown): NextResponse {
  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
    },
  })
}

interface QuestionRow {
  id: string
  questionText: string
  scenario: string | null
  source: string
  starterTag: string | null
}

function buildGoldenItems(
  questions: QuestionRow[],
  answers: EvalAnswerRow[],
  annotations: EvalAnnotationRow[],
): Record<string, unknown>[] {
  const answersByQuestion = new Map<string, EvalAnswerRow[]>()
  for (const a of answers) {
    const list = answersByQuestion.get(a.questionId) ?? []
    list.push(a)
    answersByQuestion.set(a.questionId, list)
  }
  const annotationByQuestion = new Map<string, EvalAnnotationRow>()
  for (const ann of annotations) {
    annotationByQuestion.set(ann.questionId, ann)
  }
  return questions.map(q => {
    const list = answersByQuestion.get(q.id) ?? []
    const deepseek = list.find(a => a.answerType === 'deepseek_raw') ?? null
    const tebiq = list.find(a => a.answerType === 'tebiq_current') ?? null
    const ann = annotationByQuestion.get(q.id) ?? null
    return {
      question: q.questionText,
      scenario: q.scenario,
      starter_tag: q.starterTag,
      deepseek_raw_answer: deepseek?.answerText ?? null,
      tebiq_answer_text: tebiq?.answerText ?? null,
      tebiq_answer_id: tebiq?.tebiqAnswerId ?? null,
      tebiq_engine_version: tebiq?.engineVersion ?? null,
      tebiq_status: tebiq?.status ?? null,
      tebiq_domain: tebiq?.domain ?? null,
      score: ann?.score ?? null,
      severity: ann?.severity ?? null,
      launchable: ann?.launchable ?? null,
      direction_correct: ann?.directionCorrect ?? null,
      must_have: ann?.mustHave ?? null,
      must_not_have: ann?.mustNotHave ?? null,
      should_handoff: ann?.shouldHandoff ?? null,
      action: ann?.action ?? null,
      annotated_at: ann?.updatedAt ?? null,
    }
  })
}

function buildKnowledgeAbItems(
  questions: QuestionRow[],
  answers: EvalAnswerRow[],
  annotations: EvalAnnotationRow[],
): Record<string, unknown>[] {
  const answersByQuestion = new Map<string, EvalAnswerRow[]>()
  for (const a of answers) {
    const list = answersByQuestion.get(a.questionId) ?? []
    list.push(a)
    answersByQuestion.set(a.questionId, list)
  }
  const annotationByQuestion = new Map<string, EvalAnnotationRow>()
  for (const ann of annotations) {
    annotationByQuestion.set(ann.questionId, ann)
  }
  return questions
    .filter(q => q.source === 'knowledge_debug')
    .map(q => {
      const list = answersByQuestion.get(q.id) ?? []
      const current = list.find(a => a.answerType === 'tebiq_current') ?? null
      const candidate = list.find(a => a.answerType === 'deepseek_web') ?? null
      const ann = annotationByQuestion.get(q.id) ?? null
      return {
        question: q.questionText,
        scenario: q.scenario,
        starter_tag: q.starterTag,
        source: q.source,
        answer_a_current_tebiq: current?.answerText ?? null,
        answer_a_engine_version: current?.engineVersion ?? null,
        answer_a_status: current?.status ?? null,
        answer_b_knowledge_candidate: candidate?.answerText ?? null,
        answer_b_engine_version: candidate?.engineVersion ?? null,
        answer_b_model: candidate?.model ?? null,
        asset_ids: getStringArray(candidate?.rawPayloadJson, 'asset_ids'),
        case_id: getStringValue(current?.rawPayloadJson, 'import_starter_tag')
          ?? getStringValue(candidate?.rawPayloadJson, 'import_starter_tag')
          ?? q.starterTag,
        score: ann?.score ?? null,
        severity: ann?.severity ?? null,
        comparison: ann?.annotationJson?.vs_deepseek_judgment ?? null,
        comparison_label: comparisonLabel(ann?.annotationJson?.vs_deepseek_judgment),
        missing_points: ann?.missingPoints ?? null,
        reviewer_note: ann?.reviewerNote ?? null,
        repair_owner: ann?.annotationJson?.repair_owner ?? null,
        should_handoff: ann?.shouldHandoff ?? null,
        action: ann?.action ?? null,
        annotated_at: ann?.updatedAt ?? null,
      }
    })
}

function getStringArray(
  json: Record<string, unknown> | null | undefined,
  key: string,
): string[] {
  const value = json?.[key]
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function getStringValue(
  json: Record<string, unknown> | null | undefined,
  key: string,
): string | null {
  const value = json?.[key]
  return typeof value === 'string' ? value : null
}

function comparisonLabel(value: unknown): string | null {
  if (value === 'strict_added') return 'B 更好'
  if (value === 'tied') return '持平'
  if (value === 'regression') return 'B 更差'
  return null
}

// Annotations-only export. Returns one item per annotated question (rows
// with no annotation for this reviewer are skipped). Designed to be small
// enough to paste into a handoff message but rich enough that the
// downstream reader (founder / 行政書士) can act without re-opening the
// Eval Lab. Verdict source = annotation_json.quick_verdict (set by the
// QuickVerdictBar); when missing we fall back to severity → verdict.
function buildAnnotationItems(
  questions: QuestionRow[],
  annotations: EvalAnnotationRow[],
): Record<string, unknown>[] {
  const questionById = new Map<string, QuestionRow>()
  for (const q of questions) questionById.set(q.id, q)
  return annotations.map(ann => {
    const q = questionById.get(ann.questionId)
    return {
      question_id: ann.questionId,
      question: q?.questionText ?? null,
      scenario: q?.scenario ?? null,
      starter_tag: q?.starterTag ?? null,
      source: q?.source ?? null,
      reviewer: ann.reviewer,
      quick_verdict: readQuickVerdict(ann.annotationJson),
      score: ann.score,
      severity: ann.severity,
      launchable: ann.launchable,
      direction_correct: ann.directionCorrect,
      should_handoff: ann.shouldHandoff,
      missing_points: ann.missingPoints,
      reviewer_note: ann.reviewerNote,
      repair_owner: getStringValue(ann.annotationJson, 'repair_owner'),
      vs_deepseek_judgment: getStringValue(ann.annotationJson, 'vs_deepseek_judgment'),
      action: ann.action,
      updated_at: ann.updatedAt,
    }
  })
}

function readQuickVerdict(json: Record<string, unknown> | null | undefined): string | null {
  const v = json?.quick_verdict
  if (v === 'correct' || v === 'incorrect' || v === 'partial' || v === 'unsure') return v
  return null
}
