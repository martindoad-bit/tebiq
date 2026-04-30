import { errors, ok } from '@/lib/api/response'
import { recordReview } from '@/lib/decision/cards'
import { updateAnswerDraftReview } from '@/lib/db/queries/answerDrafts'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ROLES = ['staff', 'shoshi', 'founder', 'other'] as const
const DECISIONS = ['approve', 'revise', 'reject', 'escalate'] as const
const ANSWER_REVIEW_STATUSES = ['reviewed', 'needs_expert', 'rejected', 'unreviewed'] as const

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }
  if (!body || typeof body !== 'object') return errors.badRequest()
  const row = body as Record<string, unknown>
  const reviewerName = stringOrNull(row.reviewerName)
  const reviewerRole = enumOrDefault(row.reviewerRole, ROLES, 'staff')
  const publishDecision = enumOrDefault(row.publishDecision, DECISIONS, 'revise')
  if (!reviewerName) return errors.badRequest('请输入审核人')

  const saved = await recordReview({
    cardSlug: stringOrNull(row.cardSlug),
    cardId: stringOrNull(row.cardId),
    reviewerName,
    reviewerRole,
    conclusionOk: typeof row.conclusionOk === 'boolean' ? row.conclusionOk : null,
    publishDecision,
    accuracyScore: numberOrDefault(row.accuracyScore, 3),
    sourceScore: numberOrDefault(row.sourceScore, 3),
    boundaryScore: numberOrDefault(row.boundaryScore, 3),
    actionabilityScore: numberOrDefault(row.actionabilityScore, 3),
    flags: Array.isArray(row.flags) ? row.flags.filter(item => typeof item === 'string') : [],
    note: stringOrNull(row.note),
  })

  return ok({ saved })
}

export async function PATCH(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }
  if (!body || typeof body !== 'object') return errors.badRequest()
  const row = body as Record<string, unknown>
  const id = stringOrNull(row.answerDraftId ?? row.answer_draft_id)
  const reviewStatus = enumOrDefault(row.reviewStatus ?? row.review_status, ANSWER_REVIEW_STATUSES, 'unreviewed')
  if (!id) return errors.badRequest('缺少 answerDraftId')

  try {
    const updated = await updateAnswerDraftReview({
      id,
      reviewStatus,
      note: stringOrNull(row.note),
    })
    if (!updated) return errors.notFound('answer draft')
    return ok({ answerDraft: updated })
  } catch (error) {
    console.warn('[review-lite] answer draft update failed', errorCode(error))
    return errors.internal('保存失败')
  }
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function numberOrDefault(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function enumOrDefault<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]): T[number] {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? value as T[number]
    : fallback
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
