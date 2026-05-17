/**
 * 1.0 WB-F L2 Continuation — DB queries for user_matters.
 *
 * Thin "anchor" so a user can come back to the same in-留 matter across
 * multiple consultations. See lib/db/schema.ts -> userMatters for the
 * full scope rationale (intentionally NOT a full Matter / deadline /
 * evidence system).
 *
 * Callers (route handlers) are responsible for auth. These helpers do
 * not enforce access control beyond accepting viewerId as a scoping
 * argument where indicated.
 */

import { and, desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  userMatters,
  type NewUserMatter,
  type UserMatter,
} from '@/lib/db/schema'

export type {
  NewUserMatter,
  UserMatter,
}

/** Allowed status transitions. Kept as a runtime list so the route can
 *  validate input without importing the enum from schema. */
export const MATTER_STATUSES = ['active', 'paused', 'closed'] as const
export type MatterStatus = (typeof MATTER_STATUSES)[number]

export function isMatterStatus(value: unknown): value is MatterStatus {
  return typeof value === 'string' && (MATTER_STATUSES as readonly string[]).includes(value)
}

// ---- create ----

export interface CreateUserMatterInput {
  viewerId: string
  title: string
  originConsultationId?: string | null
  /** Whether to also seed linkedConsultationIds with the origin id. Defaults to true. */
  linkOrigin?: boolean
}

const TITLE_MAX = 120

export async function createUserMatter(input: CreateUserMatterInput): Promise<UserMatter> {
  const viewerId = input.viewerId.trim()
  if (!viewerId) {
    throw new Error('createUserMatter: viewerId is empty')
  }
  const title = input.title.trim().slice(0, TITLE_MAX)
  if (!title) {
    throw new Error('createUserMatter: title is empty')
  }
  const originId = input.originConsultationId?.trim() || null
  const linkOrigin = input.linkOrigin !== false
  const linkedConsultationIds: string[] =
    linkOrigin && originId ? [originId] : []
  const [row] = await db
    .insert(userMatters)
    .values({
      viewerId,
      title,
      originConsultationId: originId,
      status: 'active',
      supplementalFacts: [],
      linkedMaterialIds: [],
      linkedConsultationIds,
    } satisfies NewUserMatter)
    .returning()
  return row
}

// ---- read ----

export async function getUserMatterById(id: string): Promise<UserMatter | null> {
  const rows = await db
    .select()
    .from(userMatters)
    .where(eq(userMatters.id, id))
    .limit(1)
  return rows[0] ?? null
}

/** Scoped read — returns null when matter exists but viewer doesn't own it. */
export async function getUserMatterForViewer(
  id: string,
  viewerId: string,
): Promise<UserMatter | null> {
  const row = await getUserMatterById(id)
  if (!row) return null
  if (row.viewerId !== viewerId) return null
  return row
}

export async function listUserMattersForViewer(
  viewerId: string,
  options: { status?: MatterStatus | 'all'; limit?: number } = {},
): Promise<UserMatter[]> {
  const limit = options.limit ?? 100
  const status = options.status ?? 'all'
  if (status === 'all') {
    return await db
      .select()
      .from(userMatters)
      .where(eq(userMatters.viewerId, viewerId))
      .orderBy(desc(userMatters.updatedAt))
      .limit(limit)
  }
  return await db
    .select()
    .from(userMatters)
    .where(and(eq(userMatters.viewerId, viewerId), eq(userMatters.status, status)))
    .orderBy(desc(userMatters.updatedAt))
    .limit(limit)
}

// ---- update ----

export async function setUserMatterStatus(
  id: string,
  viewerId: string,
  status: MatterStatus,
): Promise<UserMatter | null> {
  const row = await getUserMatterForViewer(id, viewerId)
  if (!row) return null
  const [updated] = await db
    .update(userMatters)
    .set({ status })
    .where(eq(userMatters.id, id))
    .returning()
  return updated ?? null
}

export async function setUserMatterTitle(
  id: string,
  viewerId: string,
  title: string,
): Promise<UserMatter | null> {
  const trimmed = title.trim().slice(0, TITLE_MAX)
  if (!trimmed) return null
  const row = await getUserMatterForViewer(id, viewerId)
  if (!row) return null
  const [updated] = await db
    .update(userMatters)
    .set({ title: trimmed })
    .where(eq(userMatters.id, id))
    .returning()
  return updated ?? null
}

const FACT_MAX = 600
const MAX_FACTS = 50

export async function appendSupplementalFact(
  id: string,
  viewerId: string,
  text: string,
): Promise<UserMatter | null> {
  const trimmed = text.trim().slice(0, FACT_MAX)
  if (!trimmed) return null
  const row = await getUserMatterForViewer(id, viewerId)
  if (!row) return null
  const existing = Array.isArray(row.supplementalFacts) ? row.supplementalFacts : []
  // Cap to MAX_FACTS — drop oldest, keep newest.
  const nextFacts = [...existing, { text: trimmed, addedAt: new Date().toISOString() }]
    .slice(-MAX_FACTS)
  const [updated] = await db
    .update(userMatters)
    .set({ supplementalFacts: nextFacts })
    .where(eq(userMatters.id, id))
    .returning()
  return updated ?? null
}

export type MatterLinkKind = 'material' | 'consultation'

const LINK_MAX = 80
const MAX_LINKS = 100

export async function appendMatterLink(
  id: string,
  viewerId: string,
  kind: MatterLinkKind,
  value: string,
): Promise<UserMatter | null> {
  const trimmed = value.trim().slice(0, LINK_MAX)
  if (!trimmed) return null
  const row = await getUserMatterForViewer(id, viewerId)
  if (!row) return null
  const column = kind === 'material' ? 'linkedMaterialIds' : 'linkedConsultationIds'
  const existing = Array.isArray(row[column]) ? (row[column] as string[]) : []
  if (existing.includes(trimmed)) return row
  const next = [...existing, trimmed].slice(-MAX_LINKS)
  const [updated] = await db
    .update(userMatters)
    .set({ [column]: next })
    .where(eq(userMatters.id, id))
    .returning()
  return updated ?? null
}

// ---- delete (only for tests / cleanup paths) ----

export async function deleteUserMatterForViewer(
  id: string,
  viewerId: string,
): Promise<boolean> {
  const row = await getUserMatterForViewer(id, viewerId)
  if (!row) return false
  await db.delete(userMatters).where(eq(userMatters.id, id))
  return true
}
