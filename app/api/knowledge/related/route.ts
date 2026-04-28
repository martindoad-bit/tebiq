import { NextRequest, NextResponse } from 'next/server'
import { listRelatedArticlesByTags } from '@/lib/db/queries/articles'
import { plainTextFromMarkdown } from '@/lib/knowledge/markdown'
import { sanitizePublicKnowledgeText } from '@/lib/knowledge/public-text'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const tags = params.get('tags')?.split(',').map(t => decodeURIComponent(t)) ?? []
  const limit = Math.min(4, Math.max(1, Number(params.get('limit') ?? 2)))
  const rows = await listRelatedArticlesByTags(tags, limit)
  return NextResponse.json({
    articles: rows.map(row => ({
      id: row.id,
      slug: row.slug,
      title: sanitizePublicKnowledgeText(row.title),
      category: row.category,
      summary: sanitizePublicKnowledgeText(plainTextFromMarkdown(row.bodyMarkdown).slice(0, 120)),
      updatedAt: row.updatedAt.toISOString(),
    })),
  })
}
