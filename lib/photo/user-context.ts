import { getMemberById } from '@/lib/db/queries/members'
import {
  listQuizResultsByMemberId,
  listQuizResultsBySessionId,
} from '@/lib/db/queries/quizResults'
import {
  listDocumentsByFamilyId,
  listDocumentsBySessionId,
} from '@/lib/db/queries/documents'

export interface PhotoUserContext {
  visaType: string | null
  daysToVisaExpiry: number | null
  hasRecentQuizResult: boolean
  recentDocumentTypes: string[]
  recentDocuments: Array<{ docType: string; issuer: string | null }>
}

export interface BuildUserContextInput {
  memberId?: string | null
  sessionId?: string | null
}

function daysUntilJst(dateValue: string | Date | null | undefined): number | null {
  if (!dateValue) return null
  const iso = typeof dateValue === 'string'
    ? dateValue
    : dateValue.toISOString().slice(0, 10)
  const target = new Date(`${iso.slice(0, 10)}T00:00:00+09:00`).getTime()
  if (Number.isNaN(target)) return null
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  const now = new Date(`${today}T00:00:00+09:00`).getTime()
  return Math.ceil((target - now) / 86_400_000)
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function docMeta(row: { docType: string | null; aiResponse: Record<string, unknown> | null }) {
  const response = row.aiResponse ?? {}
  const docType = stringOrNull(response.docType) ?? stringOrNull(row.docType)
  if (!docType) return null
  return {
    docType,
    issuer: stringOrNull(response.issuer),
  }
}

function uniqueStrings(values: Array<string | null | undefined>, limit: number): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const value of values) {
    const normalized = value?.trim()
    if (!normalized || seen.has(normalized)) continue
    seen.add(normalized)
    out.push(normalized)
    if (out.length >= limit) break
  }
  return out
}

export async function buildUserContext(
  input: BuildUserContextInput,
): Promise<PhotoUserContext> {
  const member = input.memberId ? await getMemberById(input.memberId) : null
  const quizRows = input.memberId
    ? await listQuizResultsByMemberId(input.memberId, 5)
    : input.sessionId
      ? await listQuizResultsBySessionId(input.sessionId, 5)
      : []

  const sixMonthsAgo = Date.now() - 183 * 24 * 60 * 60 * 1000
  const documentRows = member
    ? await listDocumentsByFamilyId(member.familyId, 50)
    : input.sessionId
      ? await listDocumentsBySessionId(input.sessionId, 50)
      : []
  const recentDocuments = documentRows
    .filter(row => row.createdAt.getTime() >= sixMonthsAgo)
    .map(docMeta)
    .filter((row): row is { docType: string; issuer: string | null } => Boolean(row))

  const latestQuiz = quizRows[0] ?? null
  const recentQuizCutoff = Date.now() - 90 * 24 * 60 * 60 * 1000

  return {
    visaType: member?.visaType ?? latestQuiz?.visaType ?? null,
    daysToVisaExpiry: daysUntilJst(member?.visaExpiry),
    hasRecentQuizResult: quizRows.some(row => row.createdAt.getTime() >= recentQuizCutoff),
    recentDocumentTypes: uniqueStrings(recentDocuments.map(row => row.docType), 12),
    recentDocuments: recentDocuments.slice(0, 12),
  }
}
