/**
 * Archive list — client filter pills + list rendering.
 *
 * Filtering only on client (state); list itself is fed from server.
 */
'use client'
import Link from 'next/link'
import { useState } from 'react'

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

export default function ArchiveListClient({ items }: { items: ArchiveItem[] }) {
  const [tab, setTab] = useState<Tab>('all')
  const filtered = tab === 'all' ? items : items.filter(i => i.kind === tab)

  return (
    <>
      <div className="mt-3 flex items-center gap-2">
        {TABS.map(t => {
          const on = t.id === tab
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-3 py-[6px] rounded-[14px] text-[12px] border transition-colors ${
                on
                  ? 'bg-ink text-white border-ink'
                  : 'bg-surface text-ash border-hairline'
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
        <ul className="mt-3 flex flex-col gap-2">
          {filtered.map(item => (
            <li
              key={item.id}
              className="bg-surface border border-hairline rounded-card px-[14px] py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-ink font-medium leading-tight">
                    {item.title}
                  </div>
                  {item.source && (
                    <div className="text-[11px] text-ash mt-1 leading-tight">
                      {item.source}
                    </div>
                  )}
                  <div className="text-[10.5px] text-ash mt-1 leading-tight">
                    {item.date}
                  </div>
                  <div
                    className={`text-[11px] mt-1 leading-tight ${STATUS_CLS[item.severity]}`}
                  >
                    {item.status}
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 mt-1 w-[6px] h-[6px] rounded-full ${DOT_CLS[item.severity]}`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function EmptyState() {
  return (
    <div className="mt-6 bg-surface border border-hairline rounded-card px-4 py-8 text-center">
      <p className="text-[13px] text-ink leading-relaxed">你还没有任何记录</p>
      <p className="text-[11px] text-ash mt-2 leading-relaxed">
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
