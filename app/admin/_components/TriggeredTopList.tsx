'use client'
import type { RecentEntry } from './types'

export default function TriggeredTopList({
  recent,
  totalTests,
}: {
  recent: RecentEntry[]
  totalTests: number
}) {
  const counts = new Map<string, number>()
  for (const r of recent) {
    for (const item of r.triggeredItems) {
      counts.set(item, (counts.get(item) ?? 0) + 1)
    }
  }
  const top = Array.from(counts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  if (top.length === 0) {
    return (
      <p className="bg-card border border-line rounded-2xl p-5 text-muted text-sm">
        最近 50 次测试中暂未触发任何风险项
      </p>
    )
  }
  const max = top[0][1]

  return (
    <div className="bg-card border border-line rounded-2xl p-5 space-y-3">
      <p className="text-muted text-xs">
        基于最近 {recent.length} 次测试 · 总计 {totalTests.toLocaleString()} 次
      </p>
      {top.map(([label, count], i) => (
        <div key={label}>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-title text-sm font-bold flex-1 pr-3 leading-snug">
              <span className="text-muted text-xs mr-2 font-mono">#{i + 1}</span>
              {label}
            </span>
            <span className="text-primary text-sm font-bold flex-shrink-0">{count} 次</span>
          </div>
          <div className="h-1.5 bg-base rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.round((count / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
