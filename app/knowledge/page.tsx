/**
 * /knowledge — 知识中心（v5 screen 13）
 *
 * 视觉跟 docs/prototype/v5-mockup.html 1921-1992。
 *
 * 当前知识源（lib/knowledge/concepts.ts）共 6 条续签相关条目。
 * 类别 grid 实质是 client 端的关键字过滤；点击任一格就把搜索框替换为该
 * 关键字，触发同一过滤逻辑。
 *
 * 文章详情页（/knowledge/[id]）尚未实装（block 4），此处先 stub 到 '#'。
 *
 * CN/JP 混排规则：年金 / 健康保険 等政府概念使用日文，但「签证 / 税务 /
 * 住房 / 育儿」等是产品分类，使用中文。
 */
'use client'
import { useMemo, useState } from 'react'
import {
  FileText,
  Receipt,
  Clock,
  Home,
  Users,
  Building2,
  Search as SearchIcon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { CONCEPTS, type Concept } from '@/lib/knowledge/concepts'

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

// 知识库条目本身没有日期字段，UI 上用一个稳定的占位日期（按 id hash 散布）
function placeholderDate(id: string): string {
  let seed = 0
  for (let i = 0; i < id.length; i++) seed += id.charCodeAt(i)
  const today = new Date()
  today.setDate(today.getDate() - (seed % 60))
  return fmtDate(today)
}

export default function KnowledgePage() {
  const [q, setQ] = useState('')
  const norm = q.trim().toLowerCase()

  const filtered = useMemo<Concept[]>(() => {
    if (!norm) return CONCEPTS
    return CONCEPTS.filter(
      c =>
        c.title.toLowerCase().includes(norm) ||
        c.content.toLowerCase().includes(norm),
    )
  }, [norm])

  const popular = filtered.slice(0, 3)

  return (
    <AppShell appBar={<AppBar title="知识中心" />} tabBar={<TabBar />}>
      {/* 搜索栏 */}
      <div className="mt-3 flex items-center gap-2 bg-chip rounded-chip px-[14px] py-[9px]">
        <SearchIcon size={13} strokeWidth={1.5} className="text-haze flex-shrink-0" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="搜索你想了解的内容"
          className="flex-1 bg-transparent outline-none text-[12px] text-ink placeholder:text-haze"
        />
      </div>

      {/* 类别 grid 3x2 */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          // 任选一个 keyword 作为 click 后的搜索值
          const onClick = () => setQ(cat.keywords[0])
          return (
            <button
              key={cat.id}
              type="button"
              onClick={onClick}
              className="bg-surface border border-hairline rounded-chip px-[6px] py-[14px] flex flex-col items-center gap-2 hover:border-accent transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-accent-2 flex items-center justify-center">
                <Icon size={14} strokeWidth={1.5} className="text-accent" />
              </span>
              <span className="text-[11px] text-ink leading-tight">{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* 热门文章 */}
      <h3 className="mt-5 text-[12px] text-ink font-medium">
        {norm ? `搜索结果（${filtered.length}）` : '热门文章'}
      </h3>

      {popular.length === 0 ? (
        <p className="mt-3 text-[12px] text-ash">没有找到相关内容</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {popular.map(c => (
            <li key={c.id}>
              <a
                href="#"
                className="block bg-surface border border-hairline rounded-chip px-3 py-[10px]"
              >
                <div className="text-[12px] text-ink leading-[1.4]">{c.title}</div>
                <div className="text-[10px] text-ash mt-1">{placeholderDate(c.id)}</div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  )
}
