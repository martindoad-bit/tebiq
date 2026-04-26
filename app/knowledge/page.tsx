import KnowledgeClient from './KnowledgeClient'
import { listPublishedArticles } from '@/lib/db/queries/articles'

export const dynamic = 'force-dynamic'

export default async function KnowledgePage() {
  const articles = await listPublishedArticles()

  return (
    <KnowledgeClient
      articles={articles.map(a => ({
        id: a.id,
        title: a.title,
        bodyMarkdown: a.bodyMarkdown,
        category: a.category,
        requiresShoshiReview: a.requiresShoshiReview,
        updatedAt: a.updatedAt.toISOString(),
      }))}
    />
  )
}
