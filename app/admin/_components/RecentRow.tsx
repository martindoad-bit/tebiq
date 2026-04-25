'use client'
import type { RecentEntry } from './types'

export default function RecentRow({ entry }: { entry: RecentEntry }) {
  const v = {
    red: { text: '红', cls: 'bg-[#DC2626] text-white' },
    yellow: { text: '黄', cls: 'bg-primary text-title' },
    green: { text: '绿', cls: 'bg-[#16A34A] text-white' },
  }[entry.result]
  const dateStr = new Date(entry.date).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div className="bg-card border border-line rounded-xl p-3 flex items-start gap-3">
      <span
        className={`flex-shrink-0 ${v.cls} rounded-md w-7 h-7 flex items-center justify-center font-bold text-xs`}
      >
        {v.text}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-muted text-xs">{dateStr}</div>
        {entry.triggeredItems.length > 0 ? (
          <div className="text-body text-xs mt-1 leading-relaxed">
            触发：{entry.triggeredItems.slice(0, 3).join(' / ')}
            {entry.triggeredItems.length > 3 && ` 等 ${entry.triggeredItems.length} 项`}
          </div>
        ) : (
          <div className="text-muted text-xs mt-1">未触发任何风险项</div>
        )}
      </div>
    </div>
  )
}
