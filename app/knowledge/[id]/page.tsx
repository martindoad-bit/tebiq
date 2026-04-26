/**
 * /knowledge/[id] — 知识详情页。
 *
 * 1.0 先承接知识中心列表点击，内容仍使用本地概念库，并保留
 *「待书士审核」标记。
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
import { CONCEPTS } from '@/lib/knowledge/concepts'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return CONCEPTS.map(c => ({ id: c.id }))
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
    .map(p => p.trim())
    .filter(Boolean)
}

export default function KnowledgeDetailPage({ params }: Props) {
  const concept = CONCEPTS.find(c => c.id === params.id)
  if (!concept) notFound()

  const paragraphs = cleanParagraphs(concept.content)

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
              <span className="rounded-[8px] bg-accent-2 px-2 py-1 text-[10px] font-medium leading-none text-ink">
                待书士审核
              </span>
            </div>
            <h1 className="mt-3 text-[18px] font-medium leading-[1.45] text-ink">
              {concept.title}
            </h1>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] leading-none text-ash">
              <CalendarDays size={12} strokeWidth={1.55} />
              更新于 {placeholderDate(concept.id)}
            </div>
          </div>
        </div>
      </section>

      <article className="mt-3 max-w-full overflow-hidden rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-ink">
          <FileText size={15} strokeWidth={1.55} />
          主要内容
        </div>
        <div className="space-y-4">
          {paragraphs.map((p, index) => (
            <p
              key={index}
              className="whitespace-pre-line break-words text-[13px] leading-[1.75] text-ink/88 [overflow-wrap:anywhere]"
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-all' }}
            >
              {p}
            </p>
          ))}
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
