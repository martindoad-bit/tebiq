/**
 * /knowledge/[id] — published article detail.
 *
 * SEO:
 *  - generateMetadata: title / description / openGraph / canonical
 *  - JSON-LD Article schema injected via <script type="application/ld+json">
 *  - 相关文章（同 category，最多 3 篇，按 updated_at 排序）展示在底部
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AlertCircle,
  BookOpenCheck,
  CalendarDays,
  Camera,
  ChevronRight,
  ClipboardCheck,
  FileText,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import {
  getPublishedArticleById,
  listRelatedPublishedArticles,
} from '@/lib/db/queries/articles'
import { parseMarkdownBlocks, plainTextFromMarkdown } from '@/lib/knowledge/markdown'
import { getCurrentUser } from '@/lib/auth/session'
import { buildUserContext } from '@/lib/photo/user-context'
import { sanitizePublicKnowledgeText } from '@/lib/knowledge/public-text'
import type { Article } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://tebiq.jp'

interface Props {
  params: { id: string }
}

function summaryFromBody(markdown: string, max = 160): string {
  const plain = sanitizePublicKnowledgeText(plainTextFromMarkdown(markdown))
  if (plain.length <= max) return plain
  return plain.slice(0, max - 1).trimEnd() + '…'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getPublishedArticleById(params.id)
  if (!article) {
    return { title: '文章未找到 | TEBIQ', description: '该知识文章不存在或已下线。' }
  }
  const description = summaryFromBody(article.bodyMarkdown)
  const title = sanitizePublicKnowledgeText(article.title)
  const canonical = `${SITE_ORIGIN}/knowledge/${article.slug ?? article.id}`
  return {
    title: `${title} | TEBIQ 知识中心`,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'TEBIQ',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
    },
    twitter: { card: 'summary', title: article.title, description },
  }
}

function articleJsonLd(article: Article): string {
  const url = `${SITE_ORIGIN}/knowledge/${article.slug ?? article.id}`
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sanitizePublicKnowledgeText(article.title),
    description: summaryFromBody(article.bodyMarkdown),
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    inLanguage: 'zh-CN',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization' as const, name: 'TEBIQ' },
    publisher: {
      '@type': 'Organization',
      name: 'TEBIQ',
      url: SITE_ORIGIN,
    },
  }
  if (article.lastReviewedAt) {
    data.reviewedDate = article.lastReviewedAt.toISOString()
  }
  return JSON.stringify(data)
}

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

export default async function KnowledgeDetailPage({ params }: Props) {
  const article = await getPublishedArticleById(params.id)
  if (!article) notFound()

  const user = await getCurrentUser()
  const [related, userContext] = await Promise.all([
    listRelatedPublishedArticles(article.category, article.id, 3),
    user ? buildUserContext({ memberId: user.id }) : Promise.resolve(null),
  ])
  const publicTitle = sanitizePublicKnowledgeText(article.title)
  const publicBody = sanitizePublicKnowledgeText(article.bodyMarkdown)
  const blocks = parseMarkdownBlocks(publicBody)

  return (
    <AppShell
      appBar={<AppBar title="知识详情" back="/knowledge" />}
      tabBar={<TabBar />}
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: articleJsonLd(article) }}
      />
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
            <BookOpenCheck size={19} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[8px] bg-canvas px-2 py-1 text-[10px] font-medium leading-none text-ash">
                {article.category}
              </span>
            </div>
            <h1 className="mt-3 text-[18px] font-medium leading-[1.45] text-ink">
              {publicTitle}
            </h1>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] leading-none text-ash">
              <CalendarDays size={12} strokeWidth={1.55} />
              更新于 {fmtDate(article.updatedAt)}
            </div>
          </div>
        </div>
      </section>

      <article className="mt-3 max-w-full overflow-hidden rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-ink">
          <FileText size={14} strokeWidth={1.55} />
          正文
        </div>
        <div className="space-y-3">
          {blocks.map((block, idx) => {
            if (block.type === 'heading') {
              const Tag = block.level === 2 ? 'h2' : 'h3'
              return (
                <Tag
                  key={idx}
                  className="pt-1 text-[14px] font-medium leading-[1.55] text-ink"
                >
                  {block.text}
                </Tag>
              )
            }
            if (block.type === 'list') {
              return (
                <ul key={idx} className="space-y-1.5">
                  {block.items.map(item => (
                    <li
                      key={item}
                      className="relative pl-4 text-[13px] leading-[1.75] text-slate"
                    >
                      <span className="absolute left-0 top-[0.72em] h-1.5 w-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={idx} className="text-[13px] leading-[1.75] text-slate">
                {block.text}
              </p>
            )
          })}
        </div>
      </article>

      {article.category === 'policy-update' && (
        <PolicyImpact article={article} visaType={userContext?.visaType ?? null} />
      )}

      <RelatedArticles items={related} />

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            <AlertCircle size={17} strokeWidth={1.55} />
          </span>
          <div>
            <h2 className="text-[13px] font-medium leading-snug text-ink">
              仍然不确定时
            </h2>
            <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
              如果这篇内容和你的实际情况不完全一致，建议先做一次续签自查，再决定是否咨询专家。
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="/check"
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-btn bg-accent px-3 py-2 text-[12px] font-medium text-white shadow-cta"
          >
            <ClipboardCheck size={14} strokeWidth={1.55} />
            做续签自查
          </Link>
          <Link
            href="/photo"
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-btn border border-hairline bg-canvas px-3 py-2 text-[12px] font-medium text-ink"
          >
            <Camera size={14} strokeWidth={1.55} />
            拍文件确认
          </Link>
        </div>
      </section>
    </AppShell>
  )
}

function RelatedArticles({ items }: { items: Article[] }) {
  if (items.length === 0) return null
  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-ink">
        <FileText size={14} strokeWidth={1.55} />
        相关文章
      </div>
      <ul className="space-y-2">
        {items.map(it => (
          <li key={it.id}>
            <Link
              href={`/knowledge/${it.slug ?? it.id}`}
              className="group flex items-start gap-2.5 rounded-[12px] border border-hairline bg-canvas/40 px-3 py-2.5 transition-colors hover:border-accent"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[9px] bg-accent-2 text-ink">
                <FileText size={13} strokeWidth={1.55} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-medium leading-snug text-ink">
                  {sanitizePublicKnowledgeText(it.title)}
                </div>
                <p className="mt-1 line-clamp-2 text-[10.5px] leading-[1.55] text-ash">
                  {summaryFromBody(it.bodyMarkdown, 90)}
                </p>
              </div>
              <ChevronRight
                size={14}
                strokeWidth={1.55}
                className="mt-2 flex-shrink-0 text-haze transition-colors group-hover:text-ink"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PolicyImpact({
  article,
  visaType,
}: {
  article: {
    appliesTo: string[] | null
    scenarioTags: string[] | null
  }
  visaType: string | null
}) {
  const appliesTo = article.appliesTo ?? []
  const possible = Boolean(
    visaType && appliesTo.some(item => item.toLowerCase() === visaType.toLowerCase()),
  )
  const label = possible ? '可能相关' : '暂未明显相关'
  const typeLabel = visaType ?? '未填写在留类型'

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
      <div className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[11px] bg-accent-2 text-ink">
          <AlertCircle size={15} strokeWidth={1.55} />
        </span>
        <div className="min-w-0">
          <h2 className="text-[13px] font-medium leading-snug text-ink">对你的影响</h2>
          <p className="mt-1 text-[11.5px] leading-[1.65] text-slate">
            你当前是 {typeLabel} 用户，这条政策与你 <strong className="text-ink">{label}</strong>。
          </p>
          {article.scenarioTags && article.scenarioTags.length > 0 && (
            <p className="mt-1 text-[10.5px] leading-[1.55] text-ash">
              相关场景：{article.scenarioTags.slice(0, 4).join(' / ')}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
