'use client'
import { useEffect, useMemo, useState } from 'react'
import AdminNav from '../_components/AdminNav'
import { PageShell, Section, StatCard } from '../_components/ui'
import type { AdminStats } from '../_components/types'

export default function UsersClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''

  useEffect(() => {
    fetch(`/api/admin/stats${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
  }, [keyParam])

  const groupedByDate = useMemo(() => {
    if (!data) return [] as Array<{ date: string; count: number }>
    const map = new Map<string, number>()
    for (const r of data.recent) {
      const day = new Date(r.date).toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
      })
      map.set(day, (map.get(day) ?? 0) + 1)
    }
    return Array.from(map.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [data])

  const max = groupedByDate[0]?.count ?? 1

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <AdminNav adminKey={adminKey} />
      <PageShell title="用户" subtitle="总用户数 + 最近测试活跃度">
        {error && <p className="text-[#DC2626] text-sm mb-4">{error}</p>}
        {!data && !error && <p className="text-muted">载入中…</p>}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              <StatCard label="总用户数" value={data.userCount} unit="人" />
              <StatCard label="今日测试" value={data.todayTests} unit="次" />
              <StatCard label="累计测试" value={data.totalTests} unit="次" />
            </div>

            <Section title="近期活跃（按天）">
              {groupedByDate.length === 0 ? (
                <p className="text-muted text-sm">暂无活动</p>
              ) : (
                <div className="bg-card border border-line rounded-2xl p-5 space-y-3">
                  {groupedByDate.map(g => (
                    <div key={g.date}>
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-title text-sm font-bold">{g.date}</span>
                        <span className="text-primary text-sm font-bold">{g.count} 次</span>
                      </div>
                      <div className="h-1.5 bg-base rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.round((g.count / max) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </>
        )}
      </PageShell>
    </main>
  )
}
