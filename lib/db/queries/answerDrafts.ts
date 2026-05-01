import { desc, eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import {
  answerDrafts,
  answerFeedback,
  type AnswerDraft,
  type NewAnswerDraft,
  type NewAnswerFeedback,
} from '@/lib/db/schema'
import type { AnswerResult, AnswerReviewStatus } from '@/lib/answer/types'
import type { FeedbackType } from '@/lib/decision/types'

export interface CreateAnswerDraftInput {
  queryId?: string | null
  matchedCardId?: string | null
  questionText: string
  answer: AnswerResult
  modelUsed?: string | null
}

export async function createAnswerDraft(input: CreateAnswerDraftInput): Promise<AnswerDraft> {
  const values: NewAnswerDraft = {
    id: createId(),
    queryId: input.queryId ?? null,
    matchedCardId: input.matchedCardId ?? null,
    questionText: input.questionText.slice(0, 4000),
    answerType: input.answer.answer_type,
    answerLevel: input.answer.answer_level,
    reviewStatus: input.answer.review_status,
    title: input.answer.title.slice(0, 220),
    summary: input.answer.summary,
    sectionsJson: input.answer.sections,
    nextStepsJson: input.answer.next_steps,
    relatedLinksJson: input.answer.related_links,
    sourcesJson: input.answer.sources,
    modelUsed: input.modelUsed ?? null,
  }
  const [row] = await db.insert(answerDrafts).values(values).returning()
  return row
}

export async function getAnswerDraftById(id: string): Promise<AnswerDraft | null> {
  const [row] = await db
    .select()
    .from(answerDrafts)
    .where(eq(answerDrafts.id, id))
    .limit(1)
  return row ?? null
}

export async function listAnswerDrafts(limit = 80): Promise<AnswerDraft[]> {
  return await db
    .select()
    .from(answerDrafts)
    .orderBy(desc(answerDrafts.createdAt))
    .limit(Math.min(Math.max(limit, 1), 200))
}

export async function updateAnswerDraftReview(input: {
  id: string
  reviewStatus: AnswerReviewStatus
  note?: string | null
}): Promise<AnswerDraft | null> {
  const [row] = await db
    .update(answerDrafts)
    .set({
      reviewStatus: input.reviewStatus,
      reviewNote: input.note?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(answerDrafts.id, input.id))
    .returning()
  return row ?? null
}

export async function recordAnswerFeedback(input: {
  answerDraftId?: string | null
  cardId?: string | null
  pagePath: string
  feedbackType: FeedbackType
  note?: string | null
}): Promise<{ saved: boolean; id: string | null; reason?: string }> {
  if (!process.env.DATABASE_URL) return { saved: false, id: null, reason: 'no_database_url' }
  try {
    const values: NewAnswerFeedback = {
      answerDraftId: input.answerDraftId ?? null,
      cardId: input.cardId ?? null,
      pagePath: input.pagePath.slice(0, 240),
      feedbackType: input.feedbackType,
      note: input.note?.slice(0, 1000) ?? null,
    }
    const [row] = await db.insert(answerFeedback).values(values).returning({ id: answerFeedback.id })
    return { saved: true, id: row.id }
  } catch (error) {
    console.warn('[answer] answer_feedback write skipped', errorCode(error))
    return { saved: false, id: null, reason: 'write_failed' }
  }
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
