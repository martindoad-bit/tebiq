/**
 * /knowledge/[id] — published article detail.
 */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AlertCircle,
  BookOpenCheck,
  CalendarDays,
  Camera,
  ClipboardCheck,
  FileText,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getPublishedArticleById } from '@/lib/db/queries/articles'
import { parseMarkdownBlocks } from '@/lib/knowledge/markdown'

export const dynamic = 'force-dynamic'

interface Props {
  params: { id: string }
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

  const blocks = parseMarkdownBlocks(article.bodyMarkdown)

  return (
    <AppShell
      appBar={<AppBar title="知识详情" back="/knowledge" />}
      tabBar={<TabBar />}
    >
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
              {article.requiresShoshiReview ? (
                <span className="rounded-[8px] bg-accent-2 px-2 py-1 text-[10px] font-medium leading-none text-ink">
                  待书士审核
                </span>
              ) : (
                <span className="rounded-[8px] bg-[rgba(87,167,123,0.12)] px-2 py-1 text-[10px] font-medium leading-none text-success">
                  {article.lastReviewedBy ? `已审核 by ${article.lastReviewedBy}` : '已审核'}
                </span>
              )}
            </div>
            <h1 className="mt-3 text-[18px] font-medium leading-[1.45] text-ink">
              {article.title}
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
              如果这篇内容和你的实际情况不完全一致，建议先做一次续签自查，再决定是否咨询书士。
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href="/check"
            className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-btn bg-accent px-3 py-2 text-[12px] font-medium text-ink shadow-cta"
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
