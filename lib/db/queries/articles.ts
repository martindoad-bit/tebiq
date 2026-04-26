import { desc, eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { articles, type Article, type NewArticle } from '@/lib/db/schema'

export type ArticleStatus = Article['status']

export interface ArticleInput {
  id?: string
  title: string
  bodyMarkdown: string
  category: string
  status: ArticleStatus
  requiresShoshiReview: boolean
}

export async function listPublishedArticles(): Promise<Article[]> {
  return await db
    .select()
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.updatedAt))
}

export async function getPublishedArticleById(id: string): Promise<Article | null> {
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1)
  const article = rows[0] ?? null
  if (!article || article.status !== 'published') return null
  return article
}

export async function listArticlesForAdmin(): Promise<Article[]> {
  return await db.select().from(articles).orderBy(desc(articles.updatedAt))
}

export async function upsertArticle(input: ArticleInput): Promise<Article> {
  const patch: NewArticle = {
    id: input.id ?? createId(),
    title: input.title,
    bodyMarkdown: input.bodyMarkdown,
    category: input.category,
    status: input.status,
    requiresShoshiReview: input.requiresShoshiReview,
  }

  if (!input.id) {
    const [row] = await db.insert(articles).values(patch).returning()
    return row
  }

  const [row] = await db
    .update(articles)
    .set({
      title: input.title,
      bodyMarkdown: input.bodyMarkdown,
      category: input.category,
      status: input.status,
      requiresShoshiReview: input.requiresShoshiReview,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, input.id))
    .returning()

  if (row) return row

  const [created] = await db.insert(articles).values(patch).returning()
  return created
}
