import { and, desc, eq, ne, or } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import {
  articles,
  type Article,
  type ArticleHistoryEntry,
  type NewArticle,
} from '@/lib/db/schema'
import { normalizeArticleSlug, suggestArticleSlug } from '@/lib/knowledge/slug'

const HISTORY_LIMIT = 10

export type ArticleStatus = Article['status']

export interface ArticleInput {
  id?: string
  title: string
  slug?: string | null
  bodyMarkdown: string
  category: string
  status: ArticleStatus
  requiresShoshiReview: boolean
  lastReviewedAt?: string | Date | null
  /** Legacy short identifier — kept for back-compat; new entries should fill name + registration. */
  lastReviewedBy?: string | null
  /** Reviewer 实名（行政書士法要求公开标识） */
  lastReviewedByName?: string | null
  /** Reviewer 行政書士登録番号 */
  lastReviewedByRegistration?: string | null
  reviewNotes?: string | null
}

export async function listPublishedArticles(): Promise<Article[]> {
  return await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.updatedAt))
}

/** 同 category 下的其他 published 文章，按最近 updated_at 排序，最多 limit 条。 */
export async function listRelatedPublishedArticles(
  category: string,
  excludeId: string,
  limit = 3,
): Promise<Article[]> {
  return await db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.status, 'published'),
        eq(articles.category, category),
        ne(articles.id, excludeId),
      ),
    )
    .orderBy(desc(articles.updatedAt))
    .limit(limit)
}

export async function getPublishedArticleById(idOrSlug: string): Promise<Article | null> {
  const rows = await db
    .select()
    .from(articles)
    .where(or(eq(articles.id, idOrSlug), eq(articles.slug, idOrSlug)))
    .limit(1)
  const article = rows[0] ?? null
  if (!article || article.status !== 'published') return null
  return article
}

export async function listArticlesForAdmin(): Promise<Article[]> {
  return await db.select().from(articles).orderBy(desc(articles.updatedAt))
}

/**
 * upsertArticle 第二个参数：是否记录到 history。
 *  - 普通保存（手动「保存」按钮）→ recordHistory=true
 *  - 30 秒 autosave → recordHistory=false（避免 history 被 autosave 噪音填满）
 */
export async function upsertArticle(
  input: ArticleInput,
  opts: { recordHistory?: boolean } = {},
): Promise<Article> {
  const slug = normalizeArticleSlug(input.slug ?? '') ?? suggestArticleSlug(input.title)
  const lastReviewedAt = input.lastReviewedAt
    ? new Date(input.lastReviewedAt)
    : null
  const patch: NewArticle = {
    id: input.id ?? createId(),
    title: input.title,
    slug,
    bodyMarkdown: input.bodyMarkdown,
    category: input.category,
    status: input.status,
    requiresShoshiReview: input.requiresShoshiReview,
    lastReviewedAt,
    lastReviewedBy: input.lastReviewedBy?.trim() || null,
    lastReviewedByName: input.lastReviewedByName?.trim() || null,
    lastReviewedByRegistration: input.lastReviewedByRegistration?.trim() || null,
    reviewNotes: input.reviewNotes?.trim() || null,
  }

  if (!input.id) {
    const [row] = await db.insert(articles).values(patch).returning()
    return row
  }

  // 读取当前 history，决定是否 push 一个新版本
  let nextHistory: ArticleHistoryEntry[] | undefined = undefined
  if (opts.recordHistory) {
    const [existing] = await db
      .select({
        history: articles.history,
        title: articles.title,
        bodyMarkdown: articles.bodyMarkdown,
        category: articles.category,
        status: articles.status,
      })
      .from(articles)
      .where(eq(articles.id, input.id))
      .limit(1)
    if (existing) {
      const prev = existing.history ?? []
      const snapshot: ArticleHistoryEntry = {
        savedAt: new Date().toISOString(),
        title: existing.title,
        bodyMarkdown: existing.bodyMarkdown,
        category: existing.category,
        status: existing.status,
      }
      nextHistory = [...prev, snapshot].slice(-HISTORY_LIMIT)
    }
  }

  const [row] = await db
    .update(articles)
    .set({
      title: input.title,
      slug,
      bodyMarkdown: input.bodyMarkdown,
      category: input.category,
      status: input.status,
      requiresShoshiReview: input.requiresShoshiReview,
      lastReviewedAt,
      lastReviewedBy: input.lastReviewedBy?.trim() || null,
      lastReviewedByName: input.lastReviewedByName?.trim() || null,
      lastReviewedByRegistration: input.lastReviewedByRegistration?.trim() || null,
      reviewNotes: input.reviewNotes?.trim() || null,
      ...(nextHistory ? { history: nextHistory } : {}),
      updatedAt: new Date(),
    })
    .where(eq(articles.id, input.id))
    .returning()

  if (row) return row

  const [created] = await db.insert(articles).values(patch).returning()
  return created
}

/** 读取一篇文章的 history（最新在末尾）。 */
export async function getArticleHistory(id: string): Promise<ArticleHistoryEntry[]> {
  const [row] = await db
    .select({ history: articles.history })
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1)
  return row?.history ?? []
}
