import type { Metadata } from 'next'
import KnowledgeClient, {
  KNOWLEDGE_CATEGORIES,
  type KnowledgeCategoryId,
} from './KnowledgeClient'
import { listPublishedArticles } from '@/lib/db/queries/articles'
import { plainTextFromMarkdown } from '@/lib/knowledge/markdown'
import type { Article } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

interface SearchParams {
  category?: string
}

function isValidCategory(id: string): id is KnowledgeCategoryId {
  return KNOWLEDGE_CATEGORIES.some(c => c.id === id)
}

/**
 * 服务端按 category 过滤：检查 article.category 是否匹配任一 keyword 或
 * 文本（title + body 前 1000 字）是否包含 keyword。
 *
 * 优先匹配 articles.category 字段；找不到时退回到全文搜索（兼容 Block 5
 * 之前没有强制分类对齐的旧文章）。
 */
function articlesForCategory(
  articles: Article[],
  categoryId: KnowledgeCategoryId,
): Article[] {
  const cat = KNOWLEDGE_CATEGORIES.find(c => c.id === categoryId)
  if (!cat) return articles
  const keywordsLower = cat.keywords.map(k => k.toLowerCase())
  return articles.filter(a => {
    const catLower = a.category.toLowerCase()
    if (keywordsLower.some(k => catLower.includes(k))) return true
    const text = `${a.title} ${plainTextFromMarkdown(a.bodyMarkdown).slice(0, 1000)}`.toLowerCase()
    return keywordsLower.some(k => text.includes(k))
  })
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams
}): Promise<Metadata> {
  const cat = searchParams?.category
  if (cat && isValidCategory(cat)) {
    const c = KNOWLEDGE_CATEGORIES.find(x => x.id === cat)!
    return {
      title: `${c.label} - TEBIQ 知识中心`,
      description: `TEBIQ 知识中心 ${c.label} 分类：${c.keywords.join(' / ')}。覆盖在日生活常见手续、政策与避坑指南。`,
      alternates: { canonical: `/knowledge?category=${c.id}` },
    }
  }
  return {
    title: 'TEBIQ 知识中心',
    description: 'TEBIQ 知识中心：在日签证、税务、年金、生活手续等常见概念的中文解释，按分类查询。',
    alternates: { canonical: '/knowledge' },
  }
}

export default async function KnowledgePage({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const all = await listPublishedArticles().catch(() => [])
  const cat = searchParams?.category
  const filtered = cat && isValidCategory(cat) ? articlesForCategory(all, cat) : all
  const activeCategory = cat && isValidCategory(cat) ? cat : null

  return (
    <KnowledgeClient
      activeCategory={activeCategory}
      articles={filtered.map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        bodyMarkdown: a.bodyMarkdown,
        category: a.category,
        updatedAt: a.updatedAt.toISOString(),
      }))}
    />
  )
}
