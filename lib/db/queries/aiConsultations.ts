// 1.0 Alpha — DB queries for ai_consultations table (Issue #39).
//
// Distinct from `consultations` (legacy human-contact table). All queries
// here scope to the new `ai_consultations` table.
//
// Routes that call these MUST handle their own auth — these helpers do
// not enforce any access control.

import { and, asc, desc, eq, isNull, or } from 'drizzle-orm'
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
  /** Issue #60: caller passes the live prompt version constant so the DB
   *  row reflects what the LLM actually saw. Falls back to the schema
   *  default ('consultation_alpha_v1') when undefined — useful for
   *  back-compat callers but production should always pass it. */
  promptVersion?: string
  /** Issue #60 companion: same pattern for model. Falls back to schema
   *  default ('deepseek-v4-pro') when undefined. */
  model?: string
  /** 0.6 Pack 2.3: when this consultation is a follow-up round, this
   *  points back to the chain root (round 0). NULL on round 0 itself.
   *  Round 0 row never updates this; rounds 1+ set it on insert. */
  parentConsultationId?: string | null
  /** 0.6 Pack 2.3: 0 for the original question, 1/2/3 for follow-ups.
   *  The follow-up endpoint computes this from
   *  `parent.followUpCount + 1` capped at MAX_FOLLOW_UP_ROUNDS (3).
   *  When undefined, schema default 0 wins. */
  followUpCount?: number
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
      // Only override schema defaults when caller passes the value.
      // Spread keeps the field absent → drizzle uses the column default.
      ...(input.promptVersion !== undefined ? { promptVersion: input.promptVersion } : {}),
      ...(input.model !== undefined ? { model: input.model } : {}),
      ...(input.parentConsultationId !== undefined
        ? { parentConsultationId: input.parentConsultationId }
        : {}),
      ...(input.followUpCount !== undefined ? { followUpCount: input.followUpCount } : {}),
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
  /** 0.6 Pack 2.2: dedup'd list of fact_id strings the matcher surfaced
   *  for this consultation (any decision — inject / hint_only). Empty
   *  array when fact-layer is disabled or zero matches. */
  factCardIds?: string[]
  /** 0.6 Pack 2.2: per-card audit entries with full provenance metadata.
   *  Shape: ConsultationFactCardAuditEntry from stream-protocol. We store
   *  as `unknown[]` here to keep the queries module decoupled from the
   *  protocol module — the route already type-checks the shape upstream. */
  factCardAudit?: unknown[]
  /** 0.6 Pack 2.3: rolling structured digest persisted on the row so
   *  the next follow-up round can read it. Shape: ConsultationSummary
   *  from stream-protocol; stored as `unknown` here so the queries
   *  module stays decoupled. Caller may pass null to leave column
   *  unchanged; pass undefined to skip the spread entirely. */
  consultationSummary?: unknown
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
      // Spread keys only when the route passed them so we don't blow
      // away a row's existing fact-card data on accidental misuse.
      ...(input.factCardIds !== undefined ? { factCardIds: input.factCardIds } : {}),
      ...(input.factCardAudit !== undefined ? { factCardAudit: input.factCardAudit } : {}),
      ...(input.consultationSummary !== undefined
        ? { consultationSummary: input.consultationSummary as unknown }
        : {}),
    })
    .where(eq(aiConsultations.id, input.id))
}

/**
 * 0.6 Pack 2.3: standalone helper to write the consultation summary
 * after the post-completion async LLM digest call settles. Decoupled
 * from completeAiConsultation so the stream route can return as soon
 * as the answer is done; the digest writes whenever it's ready.
 */
export async function setConsultationSummary(
  id: string,
  summary: unknown,
): Promise<void> {
  await db
    .update(aiConsultations)
    .set({ consultationSummary: summary as unknown })
    .where(eq(aiConsultations.id, id))
}

export interface FailAiConsultationInput {
  id: string
  /** Issue #51: 'partial' added so 90s cutoff with partial text writes a
   *  distinct DB status from silent-provider 'timeout'. 'failed' is
   *  reserved for non-timeout errors (network / parse / etc). */
  status: 'partial' | 'timeout' | 'failed'
  reason: string
  partialText?: string | null
  /** 0.6 Pack 2.2: matched fact-card ids — same semantics as the
   *  completeAiConsultation field. The matcher ran before the LLM
   *  even started, so its output is preserved on the timeout/fail
   *  path so Learning Console still shows what cards would have
   *  informed the answer. */
  factCardIds?: string[]
  /** 0.6 Pack 2.2: per-card audit entries (same shape as completion). */
  factCardAudit?: unknown[]
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
      ...(input.factCardIds !== undefined ? { factCardIds: input.factCardIds } : {}),
      ...(input.factCardAudit !== undefined ? { factCardAudit: input.factCardAudit } : {}),
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

/**
 * 0.6 Pack 2.3: load every row in a follow-up chain (the root + any
 * follow-ups) in chronological order. Accepts either the root id or
 * any follow-up id; resolves to the chain root then returns root +
 * children sorted by createdAt asc.
 *
 * Returns [] when the id doesn't exist.
 */
export async function getFollowUpChain(anyMemberId: string): Promise<AiConsultation[]> {
  const seed = await getAiConsultationById(anyMemberId)
  if (!seed) return []
  const rootId = seed.parentConsultationId ?? seed.id
  const rows = await db
    .select()
    .from(aiConsultations)
    .where(or(eq(aiConsultations.id, rootId), eq(aiConsultations.parentConsultationId, rootId)))
    .orderBy(asc(aiConsultations.createdAt))
  return rows
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

/** Recent root consultations for a viewer. Used by "我的咨询" after auto-record. */
export async function listRecentAiConsultationsForViewer(
  viewerId: string,
  limit = 20,
): Promise<AiConsultation[]> {
  return await db
    .select()
    .from(aiConsultations)
    .where(and(
      eq(aiConsultations.viewerId, viewerId),
      isNull(aiConsultations.parentConsultationId),
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

export async function deleteAiConsultationChainForViewer(
  id: string,
  viewerId: string,
): Promise<boolean> {
  const row = await getAiConsultationById(id)
  if (!row || row.viewerId !== viewerId) return false
  const rootId = row.parentConsultationId ?? row.id
  await db
    .delete(aiConsultations)
    .where(and(
      eq(aiConsultations.viewerId, viewerId),
      or(eq(aiConsultations.id, rootId), eq(aiConsultations.parentConsultationId, rootId)),
    ))
  return true
}
