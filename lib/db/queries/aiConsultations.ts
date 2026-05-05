// 1.0 Alpha — DB queries for ai_consultations table (Issue #39).
//
// Distinct from `consultations` (legacy human-contact table). All queries
// here scope to the new `ai_consultations` table.
//
// Routes that call these MUST handle their own auth — these helpers do
// not enforce any access control.

import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  aiConsultations,
  type AiConsultation,
  type NewAiConsultation,
} from '@/lib/db/schema'

export type {
  AiConsultation,
  NewAiConsultation,
}

// ---- create ----

export interface CreateAiConsultationInput {
  viewerId?: string | null
  userQuestionText: string
  hasImage?: boolean
  imageSummary?: string | null
  imageStorageRef?: string | null
  riskKeywordHits?: string[]
  factAnchorIds?: string[]
}

export async function createAiConsultation(
  input: CreateAiConsultationInput,
): Promise<AiConsultation> {
  const trimmed = input.userQuestionText.trim()
  if (!trimmed) {
    throw new Error('createAiConsultation: userQuestionText is empty')
  }
  const [row] = await db
    .insert(aiConsultations)
    .values({
      viewerId: input.viewerId ?? null,
      userQuestionText: trimmed,
      hasImage: input.hasImage ?? false,
      imageSummary: input.imageSummary ?? null,
      imageStorageRef: input.imageStorageRef ?? null,
      riskKeywordHits: input.riskKeywordHits ?? [],
      factAnchorIds: input.factAnchorIds ?? [],
      streamStartedAt: new Date(),
      completionStatus: 'streaming',
    } satisfies NewAiConsultation)
    .returning()
  return row
}

// ---- streaming progress updates ----

/** Mark first DS token received. Called once per stream. */
export async function markFirstToken(id: string): Promise<void> {
  const now = new Date()
  // We need first_token_latency_ms but stream_started_at is on the row.
  // Two-step: load streamStartedAt, compute delta, update.
  const rows = await db
    .select({ streamStartedAt: aiConsultations.streamStartedAt })
    .from(aiConsultations)
    .where(eq(aiConsultations.id, id))
    .limit(1)
  const startedAt = rows[0]?.streamStartedAt ?? null
  const firstTokenLatencyMs = startedAt
    ? Math.max(0, now.getTime() - startedAt.getTime())
    : null
  await db
    .update(aiConsultations)
    .set({
      firstTokenAt: now,
      firstTokenLatencyMs,
    })
    .where(eq(aiConsultations.id, id))
}

/** Append a partial chunk to ai_answer_text without mutating other fields. */
export async function appendPartialAnswer(id: string, chunk: string): Promise<void> {
  if (!chunk) return
  // Use SQL string concatenation so we don't read-modify-write across
  // concurrent token emissions.
  await db.execute(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (await import('drizzle-orm')).sql`
      UPDATE ai_consultations
      SET ai_answer_text = COALESCE(ai_answer_text, '') || ${chunk}
      WHERE id = ${id}
    `,
  )
}

// ---- terminal updates ----

export interface CompleteAiConsultationInput {
  id: string
  finalAnswerText: string
  forbiddenRedactions: string[]
}

export async function completeAiConsultation(
  input: CompleteAiConsultationInput,
): Promise<void> {
  const now = new Date()
  const rows = await db
    .select({ streamStartedAt: aiConsultations.streamStartedAt })
    .from(aiConsultations)
    .where(eq(aiConsultations.id, input.id))
    .limit(1)
  const startedAt = rows[0]?.streamStartedAt ?? null
  const totalLatencyMs = startedAt
    ? Math.max(0, now.getTime() - startedAt.getTime())
    : null
  await db
    .update(aiConsultations)
    .set({
      finalAnswerText: input.finalAnswerText,
      aiAnswerText: input.finalAnswerText, // mirror; consumers can use either
      forbiddenRedactions: input.forbiddenRedactions,
      completedAt: now,
      totalLatencyMs,
      completionStatus: 'completed',
    })
    .where(eq(aiConsultations.id, input.id))
}

export interface FailAiConsultationInput {
  id: string
  status: 'timeout' | 'failed'
  reason: string
  partialText?: string | null
}

export async function failAiConsultation(input: FailAiConsultationInput): Promise<void> {
  const now = new Date()
  const rows = await db
    .select({ streamStartedAt: aiConsultations.streamStartedAt })
    .from(aiConsultations)
    .where(eq(aiConsultations.id, input.id))
    .limit(1)
  const startedAt = rows[0]?.streamStartedAt ?? null
  const totalLatencyMs = startedAt
    ? Math.max(0, now.getTime() - startedAt.getTime())
    : null
  await db
    .update(aiConsultations)
    .set({
      completedAt: now,
      totalLatencyMs,
      completionStatus: input.status,
      timeoutReason: input.reason.slice(0, 64),
      partialAnswerSaved: !!(input.partialText && input.partialText.length > 0),
      finalAnswerText: input.partialText ?? null,
    })
    .where(eq(aiConsultations.id, input.id))
}

// ---- read ----

export async function getAiConsultationById(id: string): Promise<AiConsultation | null> {
  const rows = await db
    .select()
    .from(aiConsultations)
    .where(eq(aiConsultations.id, id))
    .limit(1)
  return rows[0] ?? null
}

/** Saved consultations for a viewer (cookie-derived id). */
export async function listSavedAiConsultationsForViewer(
  viewerId: string,
  limit = 50,
): Promise<AiConsultation[]> {
  return await db
    .select()
    .from(aiConsultations)
    .where(and(
      eq(aiConsultations.viewerId, viewerId),
      eq(aiConsultations.savedQuestion, true),
    ))
    .orderBy(desc(aiConsultations.createdAt))
    .limit(limit)
}

/** All consultations for the Learning Console (#41). */
export async function listAllAiConsultations(limit = 200): Promise<AiConsultation[]> {
  return await db
    .select()
    .from(aiConsultations)
    .orderBy(desc(aiConsultations.createdAt))
    .limit(limit)
}

// ---- feedback / save ----

export type AiConsultationFeedback =
  | 'helpful'
  | 'inaccurate'
  | 'add_context'
  | 'human_review'
  | 'saved'

export async function setAiConsultationFeedback(
  id: string,
  feedback: AiConsultationFeedback,
): Promise<void> {
  // 'saved' and 'human_review' carry side effects beyond feedback_type.
  const setHumanConfirm = feedback === 'human_review'
  const setSavedQuestion = feedback === 'saved'
  await db
    .update(aiConsultations)
    .set({
      feedbackType: feedback,
      ...(setHumanConfirm ? { humanConfirmClicked: true } : {}),
      ...(setSavedQuestion ? { savedQuestion: true } : {}),
    })
    .where(eq(aiConsultations.id, id))
}

export async function setAiConsultationSaved(id: string): Promise<void> {
  await db
    .update(aiConsultations)
    .set({ savedQuestion: true })
    .where(eq(aiConsultations.id, id))
}
