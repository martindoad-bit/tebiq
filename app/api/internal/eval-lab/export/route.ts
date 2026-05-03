import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  listEvalAnnotations,
  listEvalAnswers,
  listEvalQuestions,
  type EvalAnswerRow,
  type EvalAnnotationRow,
} from '@/lib/db/queries/eval-lab'

// GET /api/internal/eval-lab/export?type=full|golden&reviewer=default
//
// `full`   — every question / answer / annotation row, schema_version-tagged.
// `golden` — slim per-question record per spec §6: question +
//            DeepSeek-raw + TEBIQ-current text + key annotation fields.
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
