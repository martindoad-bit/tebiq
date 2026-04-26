/**
 * Reminders client — tab 过滤 + 卡片列表。
 */
'use client'
import { useState } from 'react'
import { Bell, Clock } from 'lucide-react'

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
        <p className="mt-6 text-center text-[12px] text-ash">暂无提醒</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {filtered.map(item => (
            <li
              key={item.id}
              className="bg-surface border border-hairline rounded-card px-[14px] py-3 flex items-center gap-3"
            >
              <span
                className={`flex-shrink-0 w-[30px] h-[30px] rounded-[8px] flex items-center justify-center ${
                  item.urgent ? 'bg-[rgba(226,87,76,0.10)]' : 'bg-accent-2'
                }`}
              >
                <Clock
                  size={14}
                  strokeWidth={1.5}
                  className={item.urgent ? 'text-danger' : 'text-accent'}
                />
              </span>
              <div className="flex-1 min-w-0 leading-tight">
                <div
                  className={`text-[13px] font-medium ${
                    item.urgent ? 'text-danger' : 'text-ink'
                  }`}
                >
                  {item.title}
                </div>
                <div
                  className={`text-[10.5px] mt-0.5 ${
                    item.urgent ? 'text-danger' : 'text-ash'
                  }`}
                >
                  {item.meta1}
                </div>
                <div className="text-[10.5px] text-ash mt-0.5">{item.meta2}</div>
              </div>
              <span className="flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center">
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
