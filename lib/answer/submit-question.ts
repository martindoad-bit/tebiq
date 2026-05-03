import type { AnswerResult, AnswerType } from './types'
import { ANSWER_BOUNDARY_NOTE } from './types'
import { runAnswerIntake } from './core/intake'
import { toViewModel } from './core/view-model'
import { answerRunAsSidecarSection } from './core/persistence'
import type { AnswerRun, AnswerViewModel } from './core/types'
import { createAnswerDraft } from '@/lib/db/queries/answerDrafts'
import { createQuestion, normalizeQuery } from '@/lib/db/queries/questions'
import type { QuestionMatchStatus } from '@/lib/db/queries/questions'

export interface SubmitQuestionInput {
  questionText: string
  visaType?: string | null
  contactEmail?: string | null
  sourcePage?: string | null
}

export interface SubmitQuestionResult {
  // The view model the answer page consumes. Authoritative for
  // user-visible content.
  viewModel: AnswerViewModel
  // The persisted run (with legacy_draft_id filled in).
  run: AnswerRun
  // Backward-compatible legacy shape — kept so existing API consumers
  // that read `answer.title` etc don't break. **Every field here is
  // now derived from PublicAnswer**, not from the legacy seed match.
  legacy: AnswerResult
}

export async function submitQuestionForAnswer(input: SubmitQuestionInput): Promise<SubmitQuestionResult> {
  const run = await runAnswerIntake({
    questionText: input.questionText,
    visaType: input.visaType,
  })

  // Map the V1 PublicAnswer back to the legacy AnswerResult shape so
  // (a) the answer_drafts row still has parseable fields and (b) any
  // external API consumer that reads top-level title/summary keeps
  // working — but only with V1-projected text.
  const legacy = projectRunToLegacyShape(run, input.questionText)

  // Sidecar the AnswerRun JSON into sectionsJson. The page's read
  // path picks it back out via `extractAnswerRun`.
  const sectionsWithSidecar = [...legacy.sections, answerRunAsSidecarSection(run)]

  let queryId: string | null = null
  let saved = false
  try {
    const question = await createQuestion({
      rawQuery: input.questionText,
      normalizedQuery: normalizeQuery(input.questionText),
      visaType: input.visaType ?? null,
      contactEmail: input.contactEmail ?? null,
      sourcePage: input.sourcePage ?? '/question-intake',
      matchedCardId: legacy.matched_card_id ?? null,
      matchStatus: matchStatusFor(legacy.answer_type),
      status: 'drafted',
      priority: legacy.review_status === 'needs_expert' ? 'high' : 'normal',
    })
    queryId = question.id
  } catch (error) {
    console.warn('[answer] query_backlog write skipped', errorCode(error))
  }

  let answerId: string | null = null
  if (queryId) {
    try {
      const draft = await createAnswerDraft({
        queryId,
        matchedCardId: legacy.matched_card_id ?? null,
        questionText: input.questionText,
        answer: { ...legacy, sections: sectionsWithSidecar },
        modelUsed: `answer-core-v1:${run.public_answer.status}`,
      })
      answerId = draft.id
      saved = true
    } catch (error) {
      console.warn('[answer] answer_draft write skipped', errorCode(error))
    }
  }

  const finalRun: AnswerRun = { ...run, legacy_draft_id: answerId }
  const finalLegacy: AnswerResult = {
    ...legacy,
    query_id: queryId,
    answer_id: answerId,
    saved,
  }
  const viewModel = toViewModel(finalRun, { id: answerId ?? `inline-${Date.now()}` })
  return {
    viewModel,
    run: finalRun,
    legacy: finalLegacy,
  }
}

// Map AnswerRun → legacy AnswerResult shape so existing consumers
// keep working. Only PublicAnswer content lands here; legacy seed
// fields are NEVER copied through.
function projectRunToLegacyShape(run: AnswerRun, _questionText: string): AnswerResult {
  const p = run.public_answer
  const status = p.status
  const answerType: AnswerType = status === 'answered'
    ? 'matched'
    : status === 'preliminary'
      ? 'draft'
      : 'cannot_determine'
  const reviewStatus: AnswerResult['review_status'] = status === 'answered'
    ? 'reviewed'
    : status === 'clarification_needed' || status === 'out_of_scope'
      ? 'intent_unclear'
      : 'unreviewed'
  const answerLevel: AnswerResult['answer_level'] = status === 'clarification_needed' || status === 'out_of_scope'
    ? 'L4'
    : 'L2'

  return {
    ok: true,
    answer_type: answerType,
    answer_level: answerLevel,
    review_status: reviewStatus,
    title: p.title,
    summary: p.summary,
    sections: p.sections.map(s => ({ heading: s.heading, body: s.body })),
    next_steps: p.next_steps,
    related_links: [],
    sources: [],
    query_id: null,
    answer_id: null,
    matched_card_id: run.source.legacy_card_id ?? null,
    matched_seed_id: run.source.legacy_seed_id ?? null,
    intent_summary: run.detected_intent.understood_question,
    preferred_template: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
    action_answer: {
      conclusion: p.conclusion,
      what_to_do: status === 'clarification_needed' || status === 'out_of_scope' ? [] : p.next_steps,
      how_to_do: [],
      where_to_go: [],
      documents_needed: status === 'clarification_needed' || status === 'out_of_scope' ? [] : p.documents_needed,
      deadline_or_timing: [],
      consequences: status === 'clarification_needed' || status === 'out_of_scope' ? [] : p.risk_warnings,
      expert_handoff: p.consult_trigger ? [p.consult_trigger] : [],
      boundary_note: ANSWER_BOUNDARY_NOTE,
    },
  }
}

function matchStatusFor(answerType: AnswerType): QuestionMatchStatus {
  if (answerType === 'matched') return 'matched'
  if (answerType === 'draft') return 'low_confidence'
  return 'no_match'
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
