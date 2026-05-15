// Eval Lab V1 — DB queries.
//
// Internal-only. Routes that call these MUST already have gated on
// EVAL_LAB_ENABLED before reaching here. These functions do not do any
// auth themselves — they assume their caller has.

import { and, asc, desc, eq, inArray, isNull, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  aiConsultations,
  evalAnnotations,
  evalAnswers,
  evalJudgements,
  evalQuestions,
  type EvalAnnotation as EvalAnnotationRow,
  type EvalAnswer as EvalAnswerRow,
  type EvalJudgement as EvalJudgementRow,
  type EvalQuestion as EvalQuestionRow,
} from '@/lib/db/schema'
import { STARTER_QUESTIONS } from '@/lib/eval-lab/starter-questions'

export type {
  EvalAnnotationRow,
  EvalAnswerRow,
  EvalJudgementRow,
  EvalQuestionRow,
}

export type EvalAnswerType = 'deepseek_raw' | 'deepseek_web' | 'tebiq_current'
export type EvalSeverity = 'OK' | 'P2' | 'P1' | 'P0'
export type EvalAction =
  | 'golden_case'
  | 'prompt_rule'
  | 'fact_card_candidate'
  | 'handoff_rule'
  | 'ignore'

const LIVE_CONSULTATION_SOURCE = 'live_consultation'
const LIVE_CONSULTATION_SCENARIO = '真实咨询'

// ---- seed ----

export interface SeedResult {
  inserted: number
  skipped: number
  total: number
}

/**
 * Idempotent seed of the 100 starter questions. Re-running is a no-op
 * because `starter_tag` is unique. Returns counts so the caller can show
 * "inserted X new, skipped Y already-present".
 */
export async function seedStarterQuestions(): Promise<SeedResult> {
  if (STARTER_QUESTIONS.length === 0) {
    return { inserted: 0, skipped: 0, total: 0 }
  }
  const rows = STARTER_QUESTIONS.map(s => ({
    questionText: s.question,
    starterTag: s.starter_tag,
    scenario: s.scenario,
    source: 'starter' as const,
  }))
  // ON CONFLICT (starter_tag) DO NOTHING. Returning lets us count the new ones.
  const inserted = await db
    .insert(evalQuestions)
    .values(rows)
    .onConflictDoNothing({ target: evalQuestions.starterTag })
    .returning({ id: evalQuestions.id })

  return {
    inserted: inserted.length,
    skipped: rows.length - inserted.length,
    total: rows.length,
  }
}

// ---- list / read ----

export async function listEvalQuestions(): Promise<EvalQuestionRow[]> {
  return await db
    .select()
    .from(evalQuestions)
    .where(eq(evalQuestions.active, true))
    .orderBy(asc(evalQuestions.starterTag), asc(evalQuestions.createdAt))
}

export async function listEvalAnswers(questionIds: string[]): Promise<EvalAnswerRow[]> {
  if (questionIds.length === 0) return []
  return await db
    .select()
    .from(evalAnswers)
    .where(inArray(evalAnswers.questionId, questionIds))
}

export async function listEvalAnnotations(
  reviewer: string,
  questionIds?: string[],
): Promise<EvalAnnotationRow[]> {
  const conditions = [eq(evalAnnotations.reviewer, reviewer)]
  if (questionIds && questionIds.length > 0) {
    conditions.push(inArray(evalAnnotations.questionId, questionIds))
  }
  return await db
    .select()
    .from(evalAnnotations)
    .where(and(...conditions))
}

export async function listEvalJudgements(
  questionIds?: string[],
): Promise<EvalJudgementRow[]> {
  if (questionIds && questionIds.length === 0) return []
  const query = db.select().from(evalJudgements)
  if (questionIds && questionIds.length > 0) {
    return await query.where(inArray(evalJudgements.questionId, questionIds))
  }
  return await query
}

// ---- mutations ----

export interface UpsertAnswerInput {
  questionId: string
  answerType: EvalAnswerType
  model?: string | null
  promptVersion?: string | null
  answerText?: string | null
  tebiqAnswerId?: string | null
  tebiqAnswerLink?: string | null
  engineVersion?: string | null
  status?: string | null
  domain?: string | null
  fallbackReason?: string | null
  latencyMs?: number | null
  error?: string | null
  rawPayloadJson?: Record<string, unknown> | null
}

/**
 * Upsert an answer for (questionId, answerType). New generation overwrites
 * the previous row for the same pair — by design the Eval Lab only keeps
 * the latest generation per type per question.
 */
export async function upsertEvalAnswer(input: UpsertAnswerInput): Promise<EvalAnswerRow> {
  const values = {
    questionId: input.questionId,
    answerType: input.answerType,
    model: input.model ?? null,
    promptVersion: input.promptVersion ?? null,
    answerText: input.answerText ?? null,
    tebiqAnswerId: input.tebiqAnswerId ?? null,
    tebiqAnswerLink: input.tebiqAnswerLink ?? null,
    engineVersion: input.engineVersion ?? null,
    status: input.status ?? null,
    domain: input.domain ?? null,
    fallbackReason: input.fallbackReason ?? null,
    latencyMs: input.latencyMs ?? null,
    error: input.error ?? null,
    rawPayloadJson: input.rawPayloadJson ?? {},
  }
  const [row] = await db
    .insert(evalAnswers)
    .values(values)
    .onConflictDoUpdate({
      target: [evalAnswers.questionId, evalAnswers.answerType],
      set: {
        model: values.model,
        promptVersion: values.promptVersion,
        answerText: values.answerText,
        tebiqAnswerId: values.tebiqAnswerId,
        tebiqAnswerLink: values.tebiqAnswerLink,
        engineVersion: values.engineVersion,
        status: values.status,
        domain: values.domain,
        fallbackReason: values.fallbackReason,
        latencyMs: values.latencyMs,
        error: values.error,
        rawPayloadJson: values.rawPayloadJson,
        // refresh created_at so "latest" sort works on the answers table
        createdAt: sql`now()`,
      },
    })
    .returning()
  return row
}

export interface UpsertAnnotationInput {
  questionId: string
  reviewer?: string
  score?: number | null
  severity?: EvalSeverity | null
  launchable?: 'yes' | 'no' | null
  directionCorrect?: 'yes' | 'no' | null
  answeredQuestion?: 'yes' | 'no' | null
  dangerousClaim?: 'yes' | 'no' | null
  hallucination?: 'yes' | 'no' | null
  shouldHandoff?: 'yes' | 'no' | null
  mustHave?: string | null
  mustNotHave?: string | null
  missingPoints?: string | null
  reviewerNote?: string | null
  action?: EvalAction | null
  /**
   * Forward-compat sidecar: anything we don't have a typed column for goes
   * here. Old rows that don't know about a new field will pass it through
   * untouched on round-trips.
   */
  annotationJson?: Record<string, unknown>
}

/**
 * Upsert an annotation for (questionId, reviewer). Update-in-place: a single
 * reviewer can only have one annotation per question, but they can re-edit
 * freely.
 */
export async function upsertEvalAnnotation(
  input: UpsertAnnotationInput,
): Promise<EvalAnnotationRow> {
  const reviewer = input.reviewer ?? 'default'
  const values = {
    questionId: input.questionId,
    reviewer,
    score: input.score ?? null,
    severity: input.severity ?? null,
    launchable: input.launchable ?? null,
    directionCorrect: input.directionCorrect ?? null,
    answeredQuestion: input.answeredQuestion ?? null,
    dangerousClaim: input.dangerousClaim ?? null,
    hallucination: input.hallucination ?? null,
    shouldHandoff: input.shouldHandoff ?? null,
    mustHave: input.mustHave ?? null,
    mustNotHave: input.mustNotHave ?? null,
    missingPoints: input.missingPoints ?? null,
    reviewerNote: input.reviewerNote ?? null,
    action: input.action ?? null,
    annotationJson: input.annotationJson ?? {},
  }
  const [row] = await db
    .insert(evalAnnotations)
    .values(values)
    .onConflictDoUpdate({
      target: [evalAnnotations.questionId, evalAnnotations.reviewer],
      set: {
        score: values.score,
        severity: values.severity,
        launchable: values.launchable,
        directionCorrect: values.directionCorrect,
        answeredQuestion: values.answeredQuestion,
        dangerousClaim: values.dangerousClaim,
        hallucination: values.hallucination,
        shouldHandoff: values.shouldHandoff,
        mustHave: values.mustHave,
        mustNotHave: values.mustNotHave,
        missingPoints: values.missingPoints,
        reviewerNote: values.reviewerNote,
        action: values.action,
        annotationJson: values.annotationJson,
        updatedAt: sql`now()`,
      },
    })
    .returning()
  return row
}

export interface UpsertJudgementInput {
  questionId: string
  caseId: string
  judgeName?: string
  judgeModel?: string
  score: number
  scoreNormalized: number
  defectFlags: string[]
  vsDeepseekJudgment: string
  idealAnswerSkeleton: string
  confidence: string
  reasoning: string
  activeLearningRed: boolean
  activeLearningReasons: string[]
  sourceCsvPath?: string | null
}

export async function upsertEvalJudgement(
  input: UpsertJudgementInput,
): Promise<EvalJudgementRow> {
  const values = {
    questionId: input.questionId,
    caseId: input.caseId,
    judgeName: input.judgeName ?? 'aql_judge_claude_sonnet',
    judgeModel: input.judgeModel ?? 'claude-sonnet',
    score: input.score,
    scoreNormalized: input.scoreNormalized,
    defectFlags: input.defectFlags,
    vsDeepseekJudgment: input.vsDeepseekJudgment,
    idealAnswerSkeleton: input.idealAnswerSkeleton,
    confidence: input.confidence,
    reasoning: input.reasoning,
    activeLearningRed: input.activeLearningRed,
    activeLearningReasons: input.activeLearningReasons,
    sourceCsvPath: input.sourceCsvPath ?? null,
  }
  const [row] = await db
    .insert(evalJudgements)
    .values(values)
    .onConflictDoUpdate({
      target: [evalJudgements.caseId, evalJudgements.judgeName],
      set: {
        questionId: values.questionId,
        judgeModel: values.judgeModel,
        score: values.score,
        scoreNormalized: values.scoreNormalized,
        defectFlags: values.defectFlags,
        vsDeepseekJudgment: values.vsDeepseekJudgment,
        idealAnswerSkeleton: values.idealAnswerSkeleton,
        confidence: values.confidence,
        reasoning: values.reasoning,
        activeLearningRed: values.activeLearningRed,
        activeLearningReasons: values.activeLearningReasons,
        sourceCsvPath: values.sourceCsvPath,
        updatedAt: sql`now()`,
      },
    })
    .returning()
  return row
}

export interface AddManualQuestionInput {
  questionText: string
  source?: 'imported' | 'manual'
  scenario?: string | null
  metadataJson?: Record<string, unknown>
}

export async function addManualQuestion(
  input: AddManualQuestionInput,
): Promise<EvalQuestionRow> {
  const trimmed = input.questionText.trim()
  if (!trimmed) {
    throw new Error('addManualQuestion: questionText is empty')
  }
  const [row] = await db
    .insert(evalQuestions)
    .values({
      questionText: trimmed,
      source: input.source ?? 'manual',
      scenario: input.scenario ?? null,
      metadataJson: input.metadataJson ?? {},
    })
    .returning()
  return row
}

export async function deactivateQuestion(id: string): Promise<void> {
  await db
    .update(evalQuestions)
    .set({ active: false })
    .where(eq(evalQuestions.id, id))
}

export async function getEvalQuestionById(
  id: string,
): Promise<EvalQuestionRow | null> {
  const rows = await db
    .select()
    .from(evalQuestions)
    .where(eq(evalQuestions.id, id))
    .limit(1)
  return rows[0] ?? null
}

export async function getQuestionByStarterTag(
  starterTag: string,
): Promise<EvalQuestionRow | null> {
  const rows = await db
    .select()
    .from(evalQuestions)
    .where(eq(evalQuestions.starterTag, starterTag))
    .limit(1)
  return rows[0] ?? null
}

// ---- bulk import ----

export interface ImportItem {
  questionText: string
  scenario?: string | null
  starterTag?: string | null
  source?: 'starter' | 'imported' | 'manual' | string
  metadataJson?: Record<string, unknown>
}

/**
 * Bulk insert questions. Items with a `starterTag` are deduplicated via the
 * unique index; items without one always insert (manual / imported source).
 * Returns the total number of new rows.
 */
export async function importQuestions(items: ImportItem[]): Promise<number> {
  if (items.length === 0) return 0
  const tagged = items.filter(i => i.starterTag)
  const untagged = items.filter(i => !i.starterTag)

  let inserted = 0
  if (tagged.length > 0) {
    const result = await db
      .insert(evalQuestions)
      .values(
        tagged.map(i => ({
          questionText: i.questionText,
          starterTag: i.starterTag ?? null,
          scenario: i.scenario ?? null,
          source: i.source ?? 'imported',
          metadataJson: i.metadataJson ?? {},
        })),
      )
      .onConflictDoNothing({ target: evalQuestions.starterTag })
      .returning({ id: evalQuestions.id })
    inserted += result.length
  }
  if (untagged.length > 0) {
    const result = await db
      .insert(evalQuestions)
      .values(
        untagged.map(i => ({
          questionText: i.questionText,
          starterTag: null,
          scenario: i.scenario ?? null,
          source: i.source ?? 'imported',
          metadataJson: i.metadataJson ?? {},
        })),
      )
      .returning({ id: evalQuestions.id })
    inserted += result.length
  }
  return inserted
}

export interface ImportEvalRunAnswerInput {
  answerType: EvalAnswerType
  model?: string | null
  promptVersion?: string | null
  answerText?: string | null
  tebiqAnswerId?: string | null
  tebiqAnswerLink?: string | null
  engineVersion?: string | null
  status?: string | null
  domain?: string | null
  fallbackReason?: string | null
  latencyMs?: number | null
  error?: string | null
  rawPayloadJson?: Record<string, unknown> | null
}

export interface ImportEvalRunItem {
  questionText: string
  scenario?: string | null
  starterTag: string
  source?: string
  metadataJson?: Record<string, unknown>
  answers?: ImportEvalRunAnswerInput[]
}

export interface ImportEvalRunResult {
  received: number
  questionsUpserted: number
  answersUpserted: number
}

/**
 * Import a generated evaluation run into Eval Lab.
 *
 * This is intentionally schema-light: runs are represented through
 * `source`, stable `starter_tag`, and `metadata_json` instead of a new
 * eval_runs table. It keeps the existing annotation surface usable while
 * allowing large knowledge-layer debug batches to be re-imported safely.
 */
export async function importEvalRunItems(
  items: ImportEvalRunItem[],
): Promise<ImportEvalRunResult> {
  const safeItems = items.filter(item => item.questionText.trim() && item.starterTag.trim())
  if (safeItems.length === 0) {
    return { received: items.length, questionsUpserted: 0, answersUpserted: 0 }
  }

  const questionRows = await db
    .insert(evalQuestions)
    .values(
      safeItems.map(item => ({
        questionText: item.questionText.trim(),
        scenario: item.scenario ?? null,
        starterTag: item.starterTag.trim(),
        source: (item.source ?? 'knowledge_debug').slice(0, 32),
        active: true,
        metadataJson: item.metadataJson ?? {},
      })),
    )
    .onConflictDoUpdate({
      target: evalQuestions.starterTag,
      set: {
        questionText: sql`excluded.question_text`,
        scenario: sql`excluded.scenario`,
        source: sql`excluded.source`,
        active: sql`true`,
        metadataJson: sql`excluded.metadata_json`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: evalQuestions.id, starterTag: evalQuestions.starterTag })

  const idByTag = new Map(questionRows.map(row => [row.starterTag, row.id]))
  let answersUpserted = 0
  for (const item of safeItems) {
    const questionId = idByTag.get(item.starterTag.trim())
    if (!questionId) continue
    for (const answer of item.answers ?? []) {
      await upsertEvalAnswer({
        ...answer,
        questionId,
        rawPayloadJson: {
          ...(answer.rawPayloadJson ?? {}),
          import_starter_tag: item.starterTag,
          import_source: item.source ?? 'knowledge_debug',
        },
      })
      answersUpserted += 1
    }
  }

  return {
    received: items.length,
    questionsUpserted: questionRows.length,
    answersUpserted,
  }
}

export interface ImportLiveConsultationsResult {
  scanned: number
  eligible: number
  inserted: number
  skippedExisting: number
  answersUpserted: number
}

/**
 * Bridge real front-door consultations into Eval Lab so founder/tester
 * feedback can enter the same quality flywheel as golden-set cases.
 *
 * We import only root consultations for now. Follow-up rows need chain context
 * to be judged fairly, so they should get their own multi-turn review surface.
 */
export async function importRecentLiveConsultationsToEvalLab(
  limit = 50,
): Promise<ImportLiveConsultationsResult> {
  const safeLimit = Math.max(1, Math.min(200, Math.floor(limit)))
  const rows = await db
    .select()
    .from(aiConsultations)
    .where(and(
      eq(aiConsultations.completionStatus, 'completed'),
      isNull(aiConsultations.parentConsultationId),
    ))
    .orderBy(desc(aiConsultations.createdAt))
    .limit(safeLimit)

  const eligible = rows.filter(row => {
    const answer = (row.finalAnswerText ?? row.aiAnswerText ?? '').trim()
    return row.userQuestionText.trim().length > 0 && answer.length > 0
  })

  if (eligible.length === 0) {
    return {
      scanned: rows.length,
      eligible: 0,
      inserted: 0,
      skippedExisting: 0,
      answersUpserted: 0,
    }
  }

  const values = eligible.map(row => ({
    questionText: row.userQuestionText.trim(),
    starterTag: `live-${row.id}`,
    scenario: LIVE_CONSULTATION_SCENARIO,
    source: LIVE_CONSULTATION_SOURCE,
    metadataJson: {
      source_consultation_id: row.id,
      source: LIVE_CONSULTATION_SOURCE,
      created_at: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
      viewer_id: row.viewerId,
      prompt_version: row.promptVersion,
      model: row.model,
      fact_card_ids: row.factCardIds,
      completion_status: row.completionStatus,
      answer_link: `/answer/${row.id}`,
    },
  }))

  const insertedRows = await db
    .insert(evalQuestions)
    .values(values)
    .onConflictDoNothing({ target: evalQuestions.starterTag })
    .returning({ id: evalQuestions.id })

  const tags = values.map(v => v.starterTag)
  const questionRows = await db
    .select()
    .from(evalQuestions)
    .where(inArray(evalQuestions.starterTag, tags))

  const questionByTag = new Map(questionRows.map(row => [row.starterTag, row]))
  let answersUpserted = 0
  for (const source of eligible) {
    const question = questionByTag.get(`live-${source.id}`)
    if (!question) continue
    const answer = (source.finalAnswerText ?? source.aiAnswerText ?? '').trim()
    await upsertEvalAnswer({
      questionId: question.id,
      answerType: 'tebiq_current',
      model: source.model,
      promptVersion: source.promptVersion,
      answerText: answer,
      tebiqAnswerId: source.id,
      tebiqAnswerLink: `/answer/${source.id}`,
      engineVersion: 'answer-core-v1.1-llm',
      status: source.completionStatus,
      domain: null,
      fallbackReason: source.timeoutReason,
      latencyMs: source.totalLatencyMs,
      rawPayloadJson: {
        source: LIVE_CONSULTATION_SOURCE,
        source_consultation_id: source.id,
        fact_card_ids: source.factCardIds,
        fact_card_audit: source.factCardAudit,
        prompt_version: source.promptVersion,
        model: source.model,
      },
    })
    answersUpserted += 1
  }

  return {
    scanned: rows.length,
    eligible: eligible.length,
    inserted: insertedRows.length,
    skippedExisting: eligible.length - insertedRows.length,
    answersUpserted,
  }
}
