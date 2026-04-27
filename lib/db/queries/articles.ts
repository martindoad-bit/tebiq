import { and, desc, eq, ne, or } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { articles, type Article, type NewArticle } from '@/lib/db/schema'
import { normalizeArticleSlug, suggestArticleSlug } from '@/lib/knowledge/slug'

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

export async function upsertArticle(input: ArticleInput): Promise<Article> {
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
      updatedAt: new Date(),
    })
    .where(eq(articles.id, input.id))
    .returning()

  if (row) return row

  const [created] = await db.insert(articles).values(patch).returning()
  return created
}
