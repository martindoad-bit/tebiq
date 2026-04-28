/**
 * Archive list — client filter pills + list rendering.
 *
 * Filtering only on client (state); list itself is fed from server.
 */
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Camera, ClipboardCheck, FileText } from 'lucide-react'
import EmptyVisual from '@/app/_components/v5/EmptyVisual'

export interface ArchiveItem {
  id: string
  kind: 'quiz' | 'doc'
  title: string
  source: string
  date: string
  timestamp: number
  status: string
  severity: 'urgent' | 'warn' | 'done'
}

type Tab = 'all' | 'quiz' | 'doc'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'quiz', label: '自查结果' },
  { id: 'doc', label: '文件识别' },
]

const STATUS_CLS: Record<ArchiveItem['severity'], string> = {
  urgent: 'text-danger',
  warn: 'text-accent',
  done: 'text-success',
}

const DOT_CLS: Record<ArchiveItem['severity'], string> = {
  urgent: 'bg-danger',
  warn: 'bg-accent',
  done: 'bg-success',
}

const TONE_CLS: Record<ArchiveItem['severity'], string> = {
  urgent: 'bg-[rgba(198,79,69,0.10)] text-danger',
  warn: 'bg-accent-2 text-ink',
  done: 'bg-[rgba(46,125,101,0.12)] text-success',
}

export default function ArchiveListClient({ items }: { items: ArchiveItem[] }) {
  const [tab, setTab] = useState<Tab>('all')
  const filtered = tab === 'all' ? items : items.filter(i => i.kind === tab)
  const docCount = items.filter(i => i.kind === 'doc').length
  const quizCount = items.filter(i => i.kind === 'quiz').length
  const attentionCount = items.filter(i => i.severity !== 'done').length

  return (
    <>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium leading-snug text-ink">
              已保存 {items.length} 条记录
            </p>
            <p className="mt-1 text-[11px] leading-[1.5] text-ash">
              文件识别与续签自查会按时间整理在这里。
            </p>
          </div>
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
            <FileText size={19} strokeWidth={1.55} />
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <SummaryCell label="文件" value={docCount} />
          <SummaryCell label="自查" value={quizCount} />
          <SummaryCell label="关注" value={attentionCount} />
        </div>
      </section>

      <div className="mt-3 flex rounded-[14px] border border-hairline bg-surface/80 p-1 shadow-card">
        {TABS.map(t => {
          const on = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-[10px] px-2 py-[7px] text-[11.5px] font-medium transition-colors ${
                on
                  ? 'bg-ink text-white shadow-[0_3px_8px_rgba(24,50,74,0.16)]'
                  : 'text-ash'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5">
          {filtered.map(item => (
            <li
              key={item.id}
              className="rounded-card border border-hairline bg-surface px-[14px] py-3 shadow-card"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] ${TONE_CLS[item.severity]}`}
                >
                  {item.kind === 'doc' ? (
                    <Camera size={15} strokeWidth={1.55} />
                  ) : (
                    <ClipboardCheck size={15} strokeWidth={1.55} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-ink font-medium leading-snug">
                    {item.title}
                  </div>
                  {item.source && (
                    <div className="mt-1 text-[11px] leading-snug text-ash">
                      {item.source}
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10.5px] leading-none text-ash">
                      {item.date}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-[8px] px-1.5 py-1 text-[10px] font-medium leading-none ${STATUS_CLS[item.severity]} bg-canvas`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <span
                  className={`mt-2 h-[6px] w-[6px] flex-shrink-0 rounded-full ${DOT_CLS[item.severity]}`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function SummaryCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[10px] bg-canvas px-2 py-2 text-center">
      <div className="text-[15px] font-medium leading-none text-ink">{value}</div>
      <div className="mt-1 text-[10px] leading-none text-ash">{label}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-5 rounded-card border border-hairline bg-surface px-4 py-8 text-center shadow-card">
      <EmptyVisual src="/illustrations/empty-state-image2.png" alt="档案暂无记录" />
      <p className="mt-3 text-[13px] font-medium leading-relaxed text-ink">
        你还没有任何记录
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-ash">
        试试拍照即懂或续签自查
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Link
          href="/photo"
          className="text-[12px] text-ink bg-accent px-3 py-2 rounded-btn font-medium"
        >
          拍照即懂
        </Link>
        <Link
          href="/check"
          className="text-[12px] text-ink border border-hairline px-3 py-2 rounded-btn font-medium"
        >
          续签自查
        </Link>
      </div>
    </div>
  )
}
