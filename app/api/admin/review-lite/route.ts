import { errors, ok } from '@/lib/api/response'
import { recordReview } from '@/lib/decision/cards'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const ROLES = ['staff', 'shoshi', 'founder', 'other'] as const
const DECISIONS = ['approve', 'revise', 'reject', 'escalate'] as const

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
