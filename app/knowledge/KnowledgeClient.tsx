/**
 * /knowledge — 知识中心（v5 screen 13）
 *
 * 视觉跟 docs/prototype/v5-mockup.html 1921-1992。
 *
 * 内容源来自 articles 表；公开侧只传入 published 文章。
 *
 * CN/JP 混排规则：年金 / 健康保険 等政府概念使用日文，但「签证 / 税务 /
 * 住房 / 育儿」等是产品分类，使用中文。
 */
'use client'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  BookOpenCheck,
  ChevronRight,
  FileText,
  Receipt,
  Clock,
  Home,
  Users,
  Building2,
  FileSearch,
  Search as SearchIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { plainTextFromMarkdown } from '@/lib/knowledge/markdown'

export interface KnowledgeArticleSummary {
  id: string
  slug: string | null
  title: string
  bodyMarkdown: string
  category: string
  requiresShoshiReview: boolean
  lastReviewedBy: string | null
  updatedAt: string
}

interface Category {
  id: string
  label: string
  icon: LucideIcon
  /** 关键字（match concept.title 或 concept.content 任意一个） */
  keywords: string[]
}

const CATEGORIES: Category[] = [
  { id: 'visa', label: '签证相关', icon: FileText, keywords: ['签证', '在留', '续签', '申请'] },
  { id: 'tax', label: '税务相关', icon: Receipt, keywords: ['住民税', '所得税', '税', '納税'] },
  { id: 'pension', label: '年金保険', icon: Clock, keywords: ['年金', '健康保険', '社保'] },
  { id: 'life', label: '生活手续', icon: Home, keywords: ['住所', '搬家', '手续'] },
  { id: 'kids', label: '育儿教育', icon: Users, keywords: ['子女', '育儿', '学校'] },
  { id: 'house', label: '住房相关', icon: Building2, keywords: ['住房', '敷金', '礼金', '契約'] },
]

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

export default function KnowledgeClient({
  articles,
}: {
  articles: KnowledgeArticleSummary[]
}) {
  const [q, setQ] = useState('')
  const norm = q.trim().toLowerCase()

  const filtered = useMemo<KnowledgeArticleSummary[]>(() => {
    if (!norm) return articles
    return articles.filter(a => {
      const text = `${a.title} ${a.category} ${plainTextFromMarkdown(a.bodyMarkdown)}`.toLowerCase()
      return text.includes(norm)
    })
  }, [articles, norm])

  const popular = filtered.slice(0, 3)

  return (
    <AppShell appBar={<AppBar title="知识中心" />} tabBar={<TabBar />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
            <BookOpenCheck size={19} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[13px] font-medium leading-snug text-ink">
              常见手续和在留概念
            </p>
            <p className="mt-1 text-[11px] leading-[1.55] text-ash">
              先查清楚关键词，再决定是否需要进一步咨询。
            </p>
          </div>
        </div>
      </section>

      <div className="mt-3 flex items-center gap-2 rounded-[13px] border border-hairline bg-surface px-[14px] py-[10px] shadow-card">
        <SearchIcon size={14} strokeWidth={1.55} className="text-haze flex-shrink-0" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="搜索你想了解的内容"
          className="flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-haze"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          const onClick = () => setQ(cat.keywords[0])
          const active = norm === cat.keywords[0].toLowerCase()
          return (
            <button
              key={cat.id}
              type="button"
              onClick={onClick}
              className={`flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-card border px-[6px] py-3 shadow-card transition-colors ${
                active
                  ? 'border-accent bg-accent-2/35'
                  : 'border-hairline bg-surface hover:border-accent'
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-accent-2 text-ink">
                <Icon size={15} strokeWidth={1.55} />
              </span>
              <span className="text-[11px] leading-tight text-ink">{cat.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-[12px] font-medium text-ink">
          {norm ? `搜索结果（${filtered.length}）` : '热门文章'}
        </h3>
        {norm && (
          <button
            type="button"
            onClick={() => setQ('')}
            className="text-[11px] text-ash hover:text-ink"
          >
            清除
          </button>
        )}
      </div>

      {popular.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5">
          {popular.map(c => (
            <li key={c.id}>
              <Link
                href={`/knowledge/${c.slug ?? c.id}`}
                className="group flex items-start gap-3 rounded-card border border-hairline bg-surface px-3.5 py-3 shadow-card transition-colors hover:border-accent"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-canvas text-ink">
                  <FileText size={15} strokeWidth={1.55} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-medium leading-snug text-ink">
                    {c.title}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[10.5px] leading-[1.55] text-ash">
                    {previewContent(c.bodyMarkdown)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] leading-none text-ash">
                      {fmtDate(new Date(c.updatedAt))}
                    </span>
                    {c.requiresShoshiReview ? (
                      <span className="rounded-[8px] bg-accent-2 px-1.5 py-1 text-[10px] font-medium leading-none text-ink">
                        待书士审核
                      </span>
                    ) : (
                      <span className="rounded-[8px] bg-[rgba(87,167,123,0.12)] px-1.5 py-1 text-[10px] font-medium leading-none text-success">
                        {c.lastReviewedBy ? `已审核 by ${c.lastReviewedBy}` : '已审核'}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight
                  size={15}
                  strokeWidth={1.55}
                  className="mt-2 flex-shrink-0 text-haze transition-colors group-hover:text-ink"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  )
}

function previewContent(markdown: string): string {
  return plainTextFromMarkdown(markdown)
}

function EmptyState() {
  return (
    <div className="mt-3 rounded-card border border-hairline bg-surface px-4 py-8 text-center shadow-card">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-accent-2 text-ink">
        <FileSearch size={20} strokeWidth={1.55} />
      </span>
      <p className="mt-3 text-[13px] font-medium leading-relaxed text-ink">
        没有找到相关内容
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-ash">
        换一个关键词，或从上方分类继续查找。
      </p>
    </div>
  )
}
