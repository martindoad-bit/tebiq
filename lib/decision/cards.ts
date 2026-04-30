import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { asc, desc, eq, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  answerFeedback,
  decisionCards,
  decisionReviews,
  queryBacklog,
  type NewAnswerFeedback,
  type NewDecisionReview,
  type NewQueryBacklog,
} from '@/lib/db/schema'
import { FALLBACK_DECISION_CARDS } from './seed-cards'
import type {
  DecisionCard,
  DecisionOption,
  DecisionQueryMatch,
  QueryMatchStatus,
  DecisionSourceGrade,
  DecisionStatus,
  FeedbackType,
  SourceRef,
} from './types'

const SEED_DIR = 'docs/decision-seed-cards'

let repoCache: Promise<DecisionCard[]> | null = null

export async function listDecisionCards(options: {
  admin?: boolean
} = {}): Promise<DecisionCard[]> {
  const [dbRows, repoRows] = await Promise.all([
    listDbDecisionCards(options.admin ?? false),
    listRepoDecisionCards(),
  ])
  return mergeCards(dbRows, repoRows)
}

export async function getDecisionCardBySlug(slug: string): Promise<DecisionCard | null> {
  const cards = await listDecisionCards({ admin: true })
  return cards.find(card => card.slug === slug) ?? null
}

export async function matchDecisionQuery(rawQuery: string): Promise<DecisionQueryMatch> {
  const normalizedQuery = normalizeQuery(rawQuery)
  const cards = await listDecisionCards()
  const match = cards.find(card => card.slug === keywordSlug(normalizedQuery))
    ?? cards.find(card => cardMatchesQuery(card, normalizedQuery))
    ?? null

  if (!normalizedQuery) return { status: 'no_match', card: null, normalizedQuery }
  if (match) return { status: 'matched', card: match, normalizedQuery }
  return { status: 'no_match', card: null, normalizedQuery }
}

export async function recordQuery(input: {
  rawQuery: string
  normalizedQuery: string
  matchedCardId?: string | null
  matchStatus: QueryMatchStatus
  userContext?: Record<string, unknown> | null
  sourcePage?: string | null
}): Promise<{ saved: boolean; id: string | null; reason?: string }> {
  if (!process.env.DATABASE_URL) return { saved: false, id: null, reason: 'no_database_url' }
  try {
    const values: NewQueryBacklog = {
      rawQuery: input.rawQuery.slice(0, 4000),
      normalizedQuery: input.normalizedQuery.slice(0, 1000),
      matchedCardId: input.matchedCardId ?? null,
      matchStatus: input.matchStatus,
      userContext: input.userContext ?? null,
      sourcePage: input.sourcePage?.slice(0, 200) ?? null,
    }
    const [row] = await db.insert(queryBacklog).values(values).returning({ id: queryBacklog.id })
    return { saved: true, id: row.id }
  } catch (error) {
    console.warn('[decision-lab] query_backlog write skipped', errorCode(error))
    return { saved: false, id: null, reason: 'write_failed' }
  }
}

export async function recordFeedback(input: {
  cardSlug?: string | null
  cardId?: string | null
  pagePath: string
  feedbackType: FeedbackType
  note?: string | null
}): Promise<{ saved: boolean; id: string | null; reason?: string }> {
  if (!process.env.DATABASE_URL) return { saved: false, id: null, reason: 'no_database_url' }
  try {
    const cardId = input.cardId ?? await findDbDecisionCardId(input.cardSlug)
    const values: NewAnswerFeedback = {
      cardId,
      pagePath: input.pagePath.slice(0, 240),
      feedbackType: input.feedbackType,
      note: input.note?.slice(0, 1000) ?? null,
    }
    const [row] = await db.insert(answerFeedback).values(values).returning({ id: answerFeedback.id })
    return { saved: true, id: row.id }
  } catch (error) {
    console.warn('[decision-lab] answer_feedback write skipped', errorCode(error))
    return { saved: false, id: null, reason: 'write_failed' }
  }
}

export async function recordReview(input: {
  cardSlug?: string | null
  cardId?: string | null
  reviewerName: string
  reviewerRole: 'staff' | 'shoshi' | 'founder' | 'other'
  conclusionOk: boolean | null
  publishDecision: 'approve' | 'revise' | 'reject' | 'escalate'
  accuracyScore: number
  sourceScore: number
  boundaryScore: number
  actionabilityScore: number
  flags: string[]
  note?: string | null
}): Promise<{ saved: boolean; id: string | null; reason?: string }> {
  if (!process.env.DATABASE_URL) return { saved: false, id: null, reason: 'no_database_url' }
  try {
    const cardId = input.cardId ?? await findDbDecisionCardId(input.cardSlug)
    const values: NewDecisionReview = {
      decisionCardId: cardId,
      reviewerName: input.reviewerName.slice(0, 120),
      reviewerRole: input.reviewerRole,
      conclusionOk: input.conclusionOk,
      publishDecision: input.publishDecision,
      accuracyScore: clampScore(input.accuracyScore),
      sourceScore: clampScore(input.sourceScore),
      boundaryScore: clampScore(input.boundaryScore),
      actionabilityScore: clampScore(input.actionabilityScore),
      flags: input.flags.slice(0, 12),
      note: input.note?.slice(0, 2000) ?? null,
    }
    const [row] = await db.insert(decisionReviews).values(values).returning({ id: decisionReviews.id })
    return { saved: true, id: row.id }
  } catch (error) {
    console.warn('[decision-lab] decision_review write skipped', errorCode(error))
    return { saved: false, id: null, reason: 'write_failed' }
  }
}

async function listDbDecisionCards(admin: boolean): Promise<DecisionCard[]> {
  if (!process.env.DATABASE_URL) return []
  try {
    const statuses: DecisionStatus[] = admin
      ? ['draft', 'needs_review', 'approved', 'rejected', 'deprecated']
      : ['approved']
    const rows = await db
      .select()
      .from(decisionCards)
      .where(inArray(decisionCards.status, statuses))
      .orderBy(
        asc(decisionCards.requiresReview),
        desc(decisionCards.updatedAt),
        asc(decisionCards.title),
      )
    return rows.map(row => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      cardType: row.cardType,
      answerLevel: row.answerLevel,
      status: row.status,
      visaTypes: arrayOfStrings(row.visaTypes),
      trigger: recordOrEmpty(row.trigger),
      userState: recordOrEmpty(row.userState),
      decisionOptions: optionsFrom(row.decisionOptions),
      recommendedAction: row.recommendedAction ?? '',
      whyNotOtherOptions: optionsFrom(row.whyNotOtherOptions),
      steps: optionsFrom(row.steps),
      relatedDocuments: optionsFrom(row.relatedDocuments),
      relatedCheckDimensions: optionsFrom(row.relatedCheckDimensions),
      sourceRefs: sourceRefsFrom(row.sourceRefs),
      sourceGrade: row.sourceGrade,
      lastVerifiedAt: row.lastVerifiedAt,
      requiresReviewAfterDays: row.requiresReviewAfterDays,
      requiresReview: row.requiresReview,
      expertHandoff: recordOrEmpty(row.expertHandoff),
      bodyMarkdown: row.bodyMarkdown,
      boundaryNote: undefined,
    }))
  } catch (error) {
    console.warn('[decision-lab] DB cards skipped', errorCode(error))
    return []
  }
}

async function findDbDecisionCardId(slug?: string | null): Promise<string | null> {
  if (!slug || !process.env.DATABASE_URL) return null
  try {
    const [row] = await db
      .select({ id: decisionCards.id })
      .from(decisionCards)
      .where(eq(decisionCards.slug, slug))
      .limit(1)
    return row?.id ?? null
  } catch {
    return null
  }
}

async function listRepoDecisionCards(): Promise<DecisionCard[]> {
  repoCache ??= loadRepoDecisionCards()
  return repoCache
}

async function loadRepoDecisionCards(): Promise<DecisionCard[]> {
  const root = path.join(process.cwd(), SEED_DIR)
  const files = await listSeedFiles(root).catch((error: NodeJS.ErrnoException) => {
    if (error.code === 'ENOENT') return []
    throw error
  })
  const cards: DecisionCard[] = []
  for (const filePath of files) {
    const raw = await readFile(filePath, 'utf8')
    const parsed = parseSeedFile(raw, filePath)
    const card = normalizeSeedCard(parsed.data, parsed.body)
    if (card) cards.push(card)
  }
  return cards.length > 0 ? cards : FALLBACK_DECISION_CARDS
}

async function listSeedFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listSeedFiles(fullPath)
    if (!entry.isFile()) return []
    return /\.(ya?ml|md)$/i.test(entry.name) ? [fullPath] : []
  }))
  return nested.flat().sort()
}

function parseSeedFile(raw: string, filePath: string): { data: Record<string, unknown>; body: string } {
  if (filePath.endsWith('.md')) {
    const parsed = matter(raw)
    return { data: parsed.data as Record<string, unknown>, body: parsed.content.trim() }
  }
  const yaml = (matter as unknown as { engines: { yaml: { parse: (input: string) => unknown } } }).engines.yaml
  const data = yaml.parse(raw)
  return {
    data: data && typeof data === 'object' && !Array.isArray(data)
      ? data as Record<string, unknown>
      : {},
    body: '',
  }
}

function normalizeSeedCard(data: Record<string, unknown>, body: string): DecisionCard | null {
  const slug = stringOrNull(data.slug)
  const title = stringOrNull(data.title)
  const cardType = enumOrDefault(data.card_type ?? data.cardType, ['decision_card', 'workflow', 'risk_chain', 'misconception'], 'decision_card')
  const answerLevel = enumOrDefault(data.answer_level ?? data.answerLevel, ['L1', 'L2', 'L3', 'L4'], 'L3')
  const sourceGrade = enumOrDefault(data.source_grade ?? data.sourceGrade, ['S', 'A', 'B', 'C'], 'B')
  if (!slug || !title) return null

  return {
    id: null,
    slug,
    title,
    cardType,
    answerLevel,
    status: enumOrDefault(data.status, ['draft', 'needs_review', 'approved', 'rejected', 'deprecated'], 'needs_review'),
    visaTypes: arrayOfStrings(data.visa_types ?? data.visaTypes),
    trigger: recordOrEmpty(data.trigger),
    userState: recordOrEmpty(data.user_state ?? data.userState),
    decisionOptions: optionsFrom(data.decision_options ?? data.decisionOptions),
    recommendedAction: stringOrNull(data.recommended_direction ?? data.recommended_action ?? data.recommendedAction) ?? '',
    whyNotOtherOptions: optionsFrom(data.why_not_other_options ?? data.whyNotOtherOptions),
    steps: optionsFrom(data.steps ?? data.today_actions ?? data.todayActions),
    relatedDocuments: optionsFrom(data.related_documents ?? data.relatedDocuments),
    relatedCheckDimensions: optionsFrom(data.related_check_dimensions ?? data.relatedCheckDimensions),
    sourceRefs: sourceRefsFrom(data.source_refs ?? data.sourceRefs),
    sourceGrade,
    lastVerifiedAt: stringOrNull(data.last_verified_at ?? data.lastVerifiedAt),
    requiresReviewAfterDays: numberOrDefault(data.requires_review_after_days ?? data.requiresReviewAfterDays, 90),
    requiresReview: booleanOrDefault(data.requires_review ?? data.requiresReview, true),
    expertHandoff: recordOrEmpty(data.expert_handoff ?? data.expertHandoff),
    bodyMarkdown: stringOrNull(data.body_markdown ?? data.bodyMarkdown) ?? body,
    fallback: stringOrNull(data.fallback) ?? undefined,
    boundaryNote: stringOrNull(data.boundary_note ?? data.boundaryNote) ?? undefined,
  }
}

function mergeCards(primary: DecisionCard[], fallback: DecisionCard[]): DecisionCard[] {
  const bySlug = new Map<string, DecisionCard>()
  for (const card of fallback) bySlug.set(card.slug, card)
  for (const card of primary) bySlug.set(card.slug, card)
  return Array.from(bySlug.values()).sort((a, b) => {
    const reviewDelta = Number(a.requiresReview) - Number(b.requiresReview)
    if (reviewDelta !== 0) return reviewDelta
    return a.title.localeCompare(b.title, 'zh-Hans-CN')
  })
}

function keywordSlug(query: string): string | null {
  if (hasAny(query, ['年金', '国民年金', '国保', '公司休眠', '休眠'])) return 'pension-switch-company-dormant'
  if (hasAny(query, ['办公室', '搬迁', '租约', '经营管理'])) return 'management-office-relocation'
  if (hasAny(query, ['地址变更', '在留卡地址', '法人地址', '公司地址'])) return 'address-change-order'
  if (hasAny(query, ['父母', '老人', '养老', '长期来日本'])) return 'bring-parents-to-japan'
  if (hasAny(query, ['老板', '雇错', '签证不符', '不法就劳', '牵连'])) return 'employment-violation-risk-chain'
  return null
}

function cardMatchesQuery(card: DecisionCard, query: string): boolean {
  const haystack = [
    card.title,
    card.recommendedAction,
    card.bodyMarkdown,
    ...card.decisionOptions.map(item => `${item.label} ${item.detail ?? ''}`),
    ...card.relatedDocuments.map(item => item.label),
  ].join(' ').toLowerCase()
  return query.split(/\s+/).filter(Boolean).some(token => token.length >= 2 && haystack.includes(token))
}

function hasAny(input: string, keywords: string[]): boolean {
  return keywords.some(keyword => input.includes(keyword.toLowerCase()))
}

function normalizeQuery(input: string): string {
  return input.trim().replace(/\s+/g, ' ').toLowerCase().slice(0, 1000)
}

function enumOrDefault<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? value as T : fallback
}

function stringOrNull(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function numberOrDefault(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) return Number(value)
  return fallback
}

function booleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function recordOrEmpty(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
}

function arrayOfStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter(item => typeof item === 'string' && item.trim()).map(item => item.trim())
}

function optionsFrom(value: unknown): DecisionOption[] {
  if (!Array.isArray(value)) return []
  return value.flatMap(item => {
    if (typeof item === 'string' && item.trim()) return [{ label: item.trim() }]
    if (!item || typeof item !== 'object' || Array.isArray(item)) return []
    const row = item as Record<string, unknown>
    const label = stringOrNull(row.label ?? row.title ?? row.name ?? row.step)
    if (!label) return []
    return [{ label, detail: stringOrNull(row.detail ?? row.description ?? row.note) ?? undefined }]
  })
}

function sourceRefsFrom(value: unknown): SourceRef[] {
  if (!Array.isArray(value)) return []
  return value.flatMap(item => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return []
    const row = item as Record<string, unknown>
    const title = stringOrNull(row.title)
    if (!title) return []
    return [{
      title,
      url: stringOrNull(row.url) ?? undefined,
      source_grade: enumOrDefault(row.source_grade ?? row.sourceGrade, ['S', 'A', 'B', 'C'], 'B') as DecisionSourceGrade,
    }]
  })
}

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 3
  return Math.max(1, Math.min(5, Math.round(value)))
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
