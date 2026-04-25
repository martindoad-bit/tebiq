/**
 * lib/auth/store.ts — Compatibility adapter.
 *
 * The original KV-backed implementation has been replaced by Postgres DAL
 * (`lib/db/queries/*`). This module preserves the old export surface so
 * existing API routes keep compiling; new code should call DAL directly.
 *
 * Deprecated — to be deleted after API routes are fully migrated.
 */
import type { Verdict } from '@/lib/check/questions'
import {
  createOtpCode,
  consumeOtpCode,
} from '@/lib/db/queries/otpCodes'
import {
  getMemberByPhone,
  getOrCreateMemberByPhone,
} from '@/lib/db/queries/members'
import {
  createQuizResult,
  listQuizResultsByMemberId,
} from '@/lib/db/queries/quizResults'
import {
  createSession,
  destroySession,
  getValidSession,
} from '@/lib/db/queries/sessions'
import type { Member, QuizResult } from '@/lib/db/schema'

// === Legacy types preserved for callers ===

export interface HistoryRecord {
  date: string
  visaType: string
  result: Verdict
  summary: string
  triggeredItems: string[]
  /** key = questionId, value = true 表示选了带 severity 的危险答案 */
  answers: Record<string, boolean>
}

/** Legacy User shape; new code should use Member from db/schema. */
export interface User {
  phone: string
  createdAt: string
  history: HistoryRecord[]
}

// === OTP ===

export async function generateOtp(phone: string): Promise<string> {
  const { code } = await createOtpCode(phone)
  return code
}

export async function verifyOtp(phone: string, input: string): Promise<boolean> {
  return await consumeOtpCode(phone, input)
}

// === User ===

function memberToLegacyUser(member: Member, history: QuizResult[] = []): User {
  return {
    phone: member.phone,
    createdAt: member.createdAt.toISOString(),
    history: history.map(quizResultToHistory),
  }
}

function quizResultToHistory(r: QuizResult): HistoryRecord {
  // Best-effort mapping; new schema stores richer data, legacy view is summary only.
  const answers: Record<string, boolean> = {}
  for (const [k, v] of Object.entries(r.answers)) {
    // legacy boolean = "selected a flagged option"; we approximate using non-zero index
    answers[k] = typeof v === 'number' && v > 0
  }
  const summary =
    typeof r.summary === 'object' && r.summary && 'notes' in r.summary
      ? String((r.summary as { notes?: string }).notes ?? '')
      : ''
  const triggered =
    r.summary && Array.isArray((r.summary as { triggered?: unknown }).triggered)
      ? ((r.summary as { triggered: { label: string }[] }).triggered.map(t => t.label))
      : []
  return {
    date: r.createdAt.toISOString(),
    visaType: r.visaType,
    result: r.resultColor,
    summary,
    triggeredItems: triggered,
    answers,
  }
}

export async function findOrCreateUserByPhone(phone: string): Promise<User> {
  const member = await getOrCreateMemberByPhone(phone)
  return memberToLegacyUser(member, [])
}

export async function getUserByPhone(phone: string): Promise<User | null> {
  const member = await getMemberByPhone(phone)
  if (!member) return null
  const history = await listQuizResultsByMemberId(member.id, 100)
  return memberToLegacyUser(member, history)
}

// === Session (delegating wrappers) ===

export async function createSessionLegacy(phone: string): Promise<string> {
  const member = await getOrCreateMemberByPhone(phone)
  const sess = await createSession(member.id)
  return sess.id
}
export { createSessionLegacy as createSession }

export async function getSessionPhone(sid: string): Promise<string | null> {
  const sess = await getValidSession(sid)
  if (!sess) return null
  const { getMemberById } = await import('@/lib/db/queries/members')
  const m = await getMemberById(sess.memberId)
  return m?.phone ?? null
}

export async function deleteSession(sid: string): Promise<void> {
  await destroySession(sid)
}

// === History (legacy) ===

export async function appendHistory(
  phone: string,
  record: HistoryRecord,
): Promise<User> {
  const member = await getOrCreateMemberByPhone(phone)
  await createQuizResult({
    memberId: member.id,
    sessionId: null,
    // Visa type is a free-form string in legacy callers; coerce common values.
    visaType: (
      ['gijinkoku', 'keiei', 'haigusha', 'eijusha', 'tokutei', 'teijusha', 'ryugaku'].includes(
        record.visaType,
      )
        ? record.visaType
        : 'other'
    ) as 'gijinkoku' | 'keiei' | 'haigusha' | 'eijusha' | 'tokutei' | 'teijusha' | 'ryugaku' | 'other',
    answers: Object.fromEntries(
      Object.entries(record.answers).map(([k, v]) => [k, v ? 1 : 0]),
    ),
    resultColor: record.result,
    summary: {
      triggered: record.triggeredItems.map(label => ({
        id: '',
        severity: 'yellow',
        label,
        hint: '',
      })),
      notes: record.summary,
    },
  })
  const history = await listQuizResultsByMemberId(member.id, 100)
  return memberToLegacyUser(member, history)
}

export async function listHistory(phone: string): Promise<HistoryRecord[]> {
  const member = await getMemberByPhone(phone)
  if (!member) return []
  const rows = await listQuizResultsByMemberId(member.id, 100)
  return rows.map(quizResultToHistory)
}
