/**
 * /knowledge/[id] — 知识详情页。
 *
 * 数据来源两侧：
 * - 既有 CONCEPTS（短概念条目，简单文本）
 * - SEED_ARTICLES（导入自 docs/knowledge-seed/ 的 markdown，含 ## 小标题等结构）
 *
 * 用 params.id 匹配 CONCEPTS.id 或 SEED_ARTICLES.slug，找不到 → 404。
 * SEED_ARTICLES 走 markdown 行级渲染（无依赖，自实现一个轻量 renderer）。
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
  CheckCircle2,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { CONCEPTS } from '@/lib/knowledge/concepts'
import { SEED_ARTICLES, type SeedArticle } from '@/lib/knowledge/seed-articles'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return [
    ...CONCEPTS.map((c) => ({ id: c.id })),
    ...SEED_ARTICLES.map((a) => ({ id: a.slug })),
  ]
}

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

function placeholderDate(id: string): string {
  let seed = 0
  for (let i = 0; i < id.length; i++) seed += id.charCodeAt(i)
  const today = new Date()
  today.setDate(today.getDate() - (seed % 60))
  return fmtDate(today)
}

function cleanParagraphs(content: string): string[] {
  return content
    .replace('[待书士审核]', '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}

/**
 * 渲染一段含简单 markdown 标记的文本：
 * - **bold**
 * - http(s) URL → 自动转为蓝色文本（不可点，保持 App 内浏览体验）
 * 其他原样输出。
 */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  // 先按 bold 切，再按 URL 切
  const boldRe = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = boldRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderUrls(text.slice(lastIndex, match.index), `${keyPrefix}-${i++}`))
    }
    parts.push(
      <strong key={`${keyPrefix}-b${i++}`} className="font-semibold text-ink">
        {match[1]}
      </strong>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(...renderUrls(text.slice(lastIndex), `${keyPrefix}-${i++}`))
  }
  return parts
}

function renderUrls(text: string, keyPrefix: string): React.ReactNode[] {
  const urlRe = /(https?:\/\/[^\s)（）」]+)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = urlRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <span key={`${keyPrefix}-u${i++}`} className="break-all text-[11.5px] text-accent-strong/90">
        {match[1]}
      </span>,
    )
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

/**
 * 把 SEED_ARTICLE 的 markdown body 解析成结构化块。
 * 支持的语法（最小集，覆盖我们的 4 段法 markdown）：
 *   ## heading
 *   normal paragraph (含 **bold** 和 URL)
 *   - list item
 *   > blockquote (用作书士提示)
 *   ---  分隔线
 */
type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'hr' }

function parseBlocks(md: string): Block[] {
  const lines = md.split('\n')
  const blocks: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      // 主标题（frontmatter 里已有 title，正文里也可能出现一次）→ 跳过
      i++
      continue
    }
    if (line.startsWith('---') && line.replaceAll('-', '').trim() === '') {
      blocks.push({ type: 'hr' })
      i++
      continue
    }
    if (line.startsWith('> ')) {
      // 收集连续 > 行
      const parts: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        parts.push(lines[i].slice(2).trim())
        i++
      }
      blocks.push({ type: 'quote', text: parts.join(' ') })
      continue
    }
    if (line.startsWith('- ') || line.startsWith('・')) {
      const items: string[] = []
      while (
        i < lines.length &&
        (lines[i].startsWith('- ') || lines[i].startsWith('・'))
      ) {
        items.push(lines[i].replace(/^(- |・)/, '').trim())
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    // 普通段落：直到下一空行或特殊行
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('# ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('・') &&
      !(lines[i].startsWith('---') && lines[i].replaceAll('-', '').trim() === '')
    ) {
      para.push(lines[i])
      i++
    }
    blocks.push({ type: 'p', text: para.join(' ').trim() })
  }
  return blocks
}

function renderMarkdown(md: string): React.ReactNode {
  const blocks = parseBlocks(md)
  return blocks.map((b, idx) => {
    if (b.type === 'h2') {
      return (
        <h3
          key={idx}
          className="mt-5 text-[14px] font-semibold leading-snug text-ink first:mt-0"
        >
          {b.text}
        </h3>
      )
    }
    if (b.type === 'p') {
      return (
        <p
          key={idx}
          className="mt-3 whitespace-pre-line break-words text-[13px] leading-[1.75] text-ink/88 [overflow-wrap:anywhere]"
        >
          {renderInline(b.text, `p${idx}`)}
        </p>
      )
    }
    if (b.type === 'ul') {
      return (
        <ul
          key={idx}
          className="mt-3 list-disc pl-5 text-[13px] leading-[1.75] text-ink/88 [overflow-wrap:anywhere]"
        >
          {b.items.map((it, i) => (
            <li key={i} className="mt-1">
              {renderInline(it, `li${idx}-${i}`)}
            </li>
          ))}
        </ul>
      )
    }
    if (b.type === 'quote') {
      return (
        <blockquote
          key={idx}
          className="mt-4 rounded-[10px] border-l-2 border-accent bg-accent-2/30 px-3 py-2.5 text-[12px] leading-[1.7] text-ink/85"
        >
          {renderInline(b.text, `q${idx}`)}
        </blockquote>
      )
    }
    if (b.type === 'hr') {
      return <hr key={idx} className="my-4 border-hairline" />
    }
    return null
  })
}

interface Resolved {
  kind: 'concept' | 'seed'
  id: string
  title: string
  content: string
  reviewed: boolean
  reviewerName: string | null
  reviewerRegistration: string | null
  reviewNotes: string | null
  lastVerifiedAt: string | null
  sourcesCount: number | null
}

function resolve(id: string): Resolved | null {
  const c = CONCEPTS.find((x) => x.id === id)
  if (c) {
    return {
      kind: 'concept',
      id: c.id,
      title: c.title,
      content: c.content,
      reviewed: false,
      reviewerName: null,
      reviewerRegistration: null,
      reviewNotes: null,
      lastVerifiedAt: null,
      sourcesCount: null,
    }
  }
  const a: SeedArticle | undefined = SEED_ARTICLES.find((x) => x.slug === id)
  if (a) {
    return {
      kind: 'seed',
      id: a.slug,
      title: a.title,
      content: a.body,
      reviewed: !a.requires_shoshi_review && !!a.last_reviewed_by_name,
      reviewerName: a.last_reviewed_by_name,
      reviewerRegistration: a.last_reviewed_by_registration,
      reviewNotes: a.review_notes,
      lastVerifiedAt: a.last_verified_at,
      sourcesCount: a.sources_count,
    }
  }
  return null
}

export default function KnowledgeDetailPage({ params }: Props) {
  const item = resolve(params.id)
  if (!item) notFound()

  const updatedLabel =
    item.lastVerifiedAt ?? placeholderDate(item.id)

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
                知识条目
              </span>
              {item.reviewed ? (
                <span className="inline-flex items-center gap-1 rounded-[8px] bg-emerald-50 px-2 py-1 text-[10px] font-medium leading-none text-emerald-700">
                  <CheckCircle2 size={11} strokeWidth={2} />
                  书士已审 · {item.reviewerName}
                  {item.reviewerRegistration ? `（登録 ${item.reviewerRegistration}）` : ''}
                </span>
              ) : (
                <span className="rounded-[8px] bg-accent-2 px-2 py-1 text-[10px] font-medium leading-none text-ink">
                  待书士审核
                </span>
              )}
            </div>
            <h1 className="mt-3 text-[18px] font-medium leading-[1.45] text-ink">
              {item.title}
            </h1>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] leading-none text-ash">
              <CalendarDays size={12} strokeWidth={1.55} />
              更新于 {updatedLabel}
            </div>
          </div>
        </div>
      </section>

      {item.reviewNotes && (
        <section className="mt-3 rounded-card border border-amber-200 bg-amber-50 px-4 py-3.5 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-amber-100 text-amber-800">
              <AlertCircle size={15} strokeWidth={1.55} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-medium text-amber-900">书士审核要点</p>
              <p className="mt-1 text-[11.5px] leading-[1.65] text-amber-900/85">
                {item.reviewNotes}
              </p>
            </div>
          </div>
        </section>
      )}

      <article className="mt-3 max-w-full overflow-hidden rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-ink">
          <FileText size={15} strokeWidth={1.55} />
          主要内容
        </div>
        <div className="space-y-1">
          {item.kind === 'concept' ? (
            cleanParagraphs(item.content).map((p, index) => (
              <p
                key={index}
                className="whitespace-pre-line break-words pt-3 text-[13px] leading-[1.75] text-ink/88 [overflow-wrap:anywhere]"
                style={{ overflowWrap: 'anywhere', wordBreak: 'break-all' }}
              >
                {p}
              </p>
            ))
          ) : (
            renderMarkdown(item.content)
          )}
        </div>
      </article>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-canvas text-ink">
            <AlertCircle size={15} strokeWidth={1.55} />
          </span>
          <p className="text-[11.5px] leading-[1.65] text-ash">
            本页用于理解常见概念，不替代行政书士或官方窗口判断。遇到拒签、
            超期、换工作未申报等情况，建议先咨询专业人士。
          </p>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Link
          href="/check"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-btn bg-accent px-3 text-[13px] font-medium text-ink shadow-cta active:translate-y-px"
        >
          <ClipboardCheck size={15} strokeWidth={1.55} />
          续签自查
        </Link>
        <Link
          href="/photo"
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[13px] font-medium text-ink shadow-card active:translate-y-px"
        >
          <Camera size={15} strokeWidth={1.55} />
          拍照即懂
        </Link>
      </div>
    </AppShell>
  )
}
