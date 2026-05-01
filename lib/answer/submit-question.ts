import { buildAnswer } from './match-answer'
import type { AnswerResult, AnswerType } from './types'
import { createAnswerDraft } from '@/lib/db/queries/answerDrafts'
import { createQuestion, normalizeQuery } from '@/lib/db/queries/questions'
import type { QuestionMatchStatus } from '@/lib/db/queries/questions'

export interface SubmitQuestionInput {
  questionText: string
  visaType?: string | null
  contactEmail?: string | null
  sourcePage?: string | null
}

export async function submitQuestionForAnswer(input: SubmitQuestionInput): Promise<AnswerResult> {
  const answer = await buildAnswer({
    questionText: input.questionText,
    visaType: input.visaType,
  })

  let queryId: string | null = null
  let saved = false
  try {
    const question = await createQuestion({
      rawQuery: input.questionText,
      normalizedQuery: normalizeQuery(input.questionText),
      visaType: input.visaType ?? null,
      contactEmail: input.contactEmail ?? null,
      sourcePage: input.sourcePage ?? '/question-intake',
      matchedCardId: answer.matched_card_id ?? null,
      matchStatus: matchStatusFor(answer.answer_type),
      status: 'drafted',
      priority: answer.review_status === 'needs_expert' ? 'high' : 'normal',
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
        matchedCardId: answer.matched_card_id ?? null,
        questionText: input.questionText,
        answer,
        modelUsed: answer.preferred_template
          ? `intent-router-v1:${answer.preferred_template}`
          : 'intent-router-v1',
      })
      answerId = draft.id
      saved = true
    } catch (error) {
      console.warn('[answer] answer_draft write skipped', errorCode(error))
    }
  }

  return {
    ...answer,
    query_id: queryId,
    answer_id: answerId,
    saved,
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
