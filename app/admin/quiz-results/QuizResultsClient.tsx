'use client'
import { useEffect, useMemo, useState } from 'react'
import AdminNav from '../_components/AdminNav'
import { PageShell, Section, StatCard } from '../_components/ui'
import RecentRow from '../_components/RecentRow'
import TriggeredTopList from '../_components/TriggeredTopList'
import type { AdminStats } from '../_components/types'

export default function QuizResultsClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''

  useEffect(() => {
    fetch(`/api/admin/stats${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
  }, [keyParam])

  const verdictCounts = useMemo(() => {
    if (!data) return { green: 0, yellow: 0, red: 0 }
    const c = { green: 0, yellow: 0, red: 0 }
    for (const r of data.recent) c[r.result] += 1
    return c
  }, [data])

  const sample = data?.recent.length ?? 0

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <AdminNav adminKey={adminKey} />
      <PageShell title="自查记录" subtitle="最近测试结果与风险项分布">
        {error && <p className="text-[#DC2626] text-sm mb-4">{error}</p>}
        {!data && !error && <p className="text-muted">载入中…</p>}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <StatCard
                label="绿色"
                value={verdictCounts.green}
                unit="次"
                hint={`样本 ${sample}`}
                tone="green"
              />
              <StatCard label="黄色" value={verdictCounts.yellow} unit="次" hint={`样本 ${sample}`} />
              <StatCard
                label="红色"
                value={verdictCounts.red}
                unit="次"
                hint={`样本 ${sample}`}
                tone="red"
              />
            </div>

            <Section title={`最近 ${Math.min(data.recent.length, 50)} 条测试`}>
              {data.recent.length === 0 ? (
                <p className="text-muted text-sm">暂无记录</p>
              ) : (
                <div className="space-y-2">
                  {data.recent.slice(0, 50).map((r, i) => (
                    <RecentRow key={`${r.date}-${i}`} entry={r} />
                  ))}
                </div>
              )}
            </Section>

            <Section title="最常触发的风险项">
              <TriggeredTopList recent={data.recent} totalTests={data.totalTests} />
            </Section>
          </>
        )}
      </PageShell>
    </main>
  )
}
