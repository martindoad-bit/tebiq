/**
 * Reminders client — tab 过滤 + 卡片列表。
 */
'use client'
import { useState } from 'react'
import { Bell, CalendarClock, Clock, ShieldAlert } from 'lucide-react'
import EmptyVisual from '@/app/_components/v5/EmptyVisual'

export interface ReminderItem {
  id: string
  title: string
  meta1: string
  meta2: string
  urgent: boolean
  kind: 'expiring' | 'important'
}

type Tab = 'all' | 'expiring' | 'important'

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'expiring', label: '即将到期' },
  { id: 'important', label: '重要通知' },
]

export default function RemindersClient({ items }: { items: ReminderItem[] }) {
  const [tab, setTab] = useState<Tab>('all')
  const filtered =
    tab === 'all'
      ? items
      : items.filter(i => (tab === 'important' ? i.urgent || i.kind === 'important' : i.kind === 'expiring'))
  const urgentCount = items.filter(i => i.urgent).length
  const expiringCount = items.filter(i => i.kind === 'expiring').length

  return (
    <>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium leading-snug text-ink">
              {urgentCount > 0 ? `${urgentCount} 件需要留意` : '近期事项已整理'}
            </p>
            <p className="mt-1 text-[11px] leading-[1.5] text-ash">
              在留、住民税、年金等事项会按紧急度排列。
            </p>
          </div>
          <span
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] ${
              urgentCount > 0
                ? 'bg-[rgba(198,79,69,0.10)] text-danger'
                : 'bg-accent-2 text-ink'
            }`}
          >
            {urgentCount > 0 ? (
              <ShieldAlert size={19} strokeWidth={1.55} />
            ) : (
              <CalendarClock size={19} strokeWidth={1.55} />
            )}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <SummaryCell label="全部" value={items.length} />
          <SummaryCell label="到期" value={expiringCount} />
          <SummaryCell label="重要" value={urgentCount} />
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
              className="flex items-center gap-3 rounded-card border border-hairline bg-surface px-[14px] py-3 shadow-card"
            >
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] ${
                  item.urgent ? 'bg-[rgba(198,79,69,0.10)]' : 'bg-accent-2'
                }`}
              >
                <Clock
                  size={14}
                  strokeWidth={1.5}
                  className={item.urgent ? 'text-danger' : 'text-accent'}
                />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div
                  className={`text-[13px] font-medium leading-snug ${
                    item.urgent ? 'text-danger' : 'text-ink'
                  }`}
                >
                  {item.title}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-[8px] px-1.5 py-1 text-[10px] font-medium leading-none ${
                      item.urgent
                        ? 'bg-[rgba(198,79,69,0.10)] text-danger'
                        : 'bg-canvas text-ash'
                    }`}
                  >
                    {item.meta1}
                  </span>
                  <span className="text-[10.5px] leading-none text-ash">
                    {item.meta2}
                  </span>
                </div>
              </div>
              <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center">
                <Bell
                  size={16}
                  strokeWidth={1.5}
                  className={item.urgent ? 'text-danger' : 'text-ink'}
                />
              </span>
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
      <EmptyVisual src="/illustrations/empty-state-image2.png" alt="暂无提醒事项" />
      <p className="mt-3 text-[13px] font-medium leading-relaxed text-ink">
        暂无需要处理的提醒
      </p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-ash">
        有新的到期事项时会出现在这里。
      </p>
    </div>
  )
}
