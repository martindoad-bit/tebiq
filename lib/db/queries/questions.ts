import { and, count, desc, eq, gte, sql } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { queryBacklog, type NewQueryBacklog, type QueryBacklog } from '@/lib/db/schema'

export const QUESTION_STATUSES = [
  'new',
  'triaged',
  'needs_draft',
  'drafted',
  'reviewed',
  'published',
  'ignored',
] as const

export const QUESTION_PRIORITIES = ['low', 'normal', 'high'] as const

export type QuestionStatus = typeof QUESTION_STATUSES[number]
export type QuestionPriority = typeof QUESTION_PRIORITIES[number]
export type QuestionMatchStatus = 'matched' | 'no_match' | 'low_confidence' | 'manual_import'

export interface QuestionInput {
  rawQuery: string
  normalizedQuery?: string | null
  visaType?: string | null
  contactEmail?: string | null
  sourcePage?: string | null
  matchStatus?: QuestionMatchStatus
  matchedCardId?: string | null
  status?: QuestionStatus
  priority?: QuestionPriority
  note?: string | null
}

export interface QuestionListFilters {
  status?: string | null
  priority?: string | null
  limit?: number
}

export interface QuestionStats {
  total: number
  today: number
  unprocessed: number
  highPriority: number
  ignored: number
  published: number
}

export async function createQuestion(input: QuestionInput): Promise<QueryBacklog> {
  const [row] = await db
    .insert(queryBacklog)
    .values(toInsert(input))
    .returning()
  return row
}

export async function bulkImportQuestions(input: {
  questions: string[]
  sourcePage?: string
}): Promise<{ inserted: number; skipped: number }> {
  const rows = normalizeQuestionLines(input.questions)
  if (rows.length === 0) return { inserted: 0, skipped: input.questions.length }

  const values: NewQueryBacklog[] = rows.map(question => toInsert({
    rawQuery: question,
    normalizedQuery: normalizeQuery(question),
    sourcePage: input.sourcePage ?? 'manual_import',
    matchStatus: 'manual_import',
    status: 'new',
    priority: 'normal',
  }))

  const chunks = chunk(values, 100)
  let inserted = 0
  for (const part of chunks) {
    const result = await db.insert(queryBacklog).values(part).returning({ id: queryBacklog.id })
    inserted += result.length
  }
  return { inserted, skipped: input.questions.length - rows.length }
}

export async function listQuestions(filters: QuestionListFilters = {}): Promise<QueryBacklog[]> {
  const conditions = []
  if (filters.status && filters.status !== 'all') conditions.push(eq(queryBacklog.status, filters.status))
  if (filters.priority && filters.priority !== 'all') conditions.push(eq(queryBacklog.priority, filters.priority))

  return await db
    .select()
    .from(queryBacklog)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(queryBacklog.createdAt))
    .limit(Math.min(Math.max(filters.limit ?? 200, 1), 500))
}

export async function getQuestionById(id: string): Promise<QueryBacklog | null> {
  const [row] = await db
    .select()
    .from(queryBacklog)
    .where(eq(queryBacklog.id, id))
    .limit(1)
  return row ?? null
}

export async function updateQuestion(input: {
  id: string
  status?: QuestionStatus
  priority?: QuestionPriority
  note?: string | null
}): Promise<QueryBacklog | null> {
  const patch: Partial<NewQueryBacklog> = { updatedAt: new Date() }
  if (input.status) patch.status = input.status
  if (input.priority) patch.priority = input.priority
  if (input.note !== undefined) patch.note = input.note

  const [row] = await db
    .update(queryBacklog)
    .set(patch)
    .where(eq(queryBacklog.id, input.id))
    .returning()
  return row ?? null
}

export async function getQuestionStats(): Promise<QuestionStats> {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const [total, today, unprocessed, highPriority, ignored, published] = await Promise.all([
    countRows(),
    countRows(gte(queryBacklog.createdAt, todayStart)),
    countRows(sql`${queryBacklog.status} in ('new', 'triaged', 'needs_draft')`),
    countRows(eq(queryBacklog.priority, 'high')),
    countRows(eq(queryBacklog.status, 'ignored')),
    countRows(eq(queryBacklog.status, 'published')),
  ])
  return { total, today, unprocessed, highPriority, ignored, published }
}

export function normalizeQuestionLines(lines: string[]): string[] {
  const seen = new Set<string>()
  const normalized: string[] = []
  for (const line of lines) {
    const cleaned = cleanQuestionText(line)
    if (!cleaned) continue
    const key = normalizeQuery(cleaned)
    if (seen.has(key)) continue
    seen.add(key)
    normalized.push(cleaned)
  }
  return normalized
}

export function parseImportText(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/^\s*(?:[-*•]|\d+[.)、])\s*/, ''))
}

export function normalizeQuery(value: string): string {
  return cleanQuestionText(value).toLowerCase()
}

export function cleanQuestionText(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, 4000)
}

export function isQuestionStatus(value: unknown): value is QuestionStatus {
  return typeof value === 'string' && (QUESTION_STATUSES as readonly string[]).includes(value)
}

export function isQuestionPriority(value: unknown): value is QuestionPriority {
  return typeof value === 'string' && (QUESTION_PRIORITIES as readonly string[]).includes(value)
}

function toInsert(input: QuestionInput): NewQueryBacklog {
  const rawQuery = cleanQuestionText(input.rawQuery)
  return {
    id: createId(),
    rawQuery,
    normalizedQuery: input.normalizedQuery === undefined ? normalizeQuery(rawQuery) : input.normalizedQuery,
    visaType: input.visaType?.trim() || null,
    contactEmail: input.contactEmail?.trim().toLowerCase() || null,
    matchedCardId: input.matchedCardId ?? null,
    matchStatus: input.matchStatus ?? 'no_match',
    status: input.status ?? 'new',
    priority: input.priority ?? 'normal',
    note: input.note?.trim() || null,
    sourcePage: input.sourcePage?.trim().slice(0, 200) || null,
  }
}

async function countRows(condition?: ReturnType<typeof eq> | ReturnType<typeof gte> | ReturnType<typeof sql>): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(queryBacklog)
    .where(condition)
  return Number(row?.value ?? 0)
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}
