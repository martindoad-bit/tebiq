'use client'
import { useCallback, useEffect, useState } from 'react'
import AdminNav from './_components/AdminNav'
import { PageShell, Section, StatCard } from './_components/ui'
import SystemStatusCard from './_components/SystemStatusCard'
import MonitorRow from './_components/MonitorRow'
import RecentRow from './_components/RecentRow'
import TriggeredTopList from './_components/TriggeredTopList'
import { CaseFormSection } from './_components/CaseForm'
import type { AdminStats, CaseStats, SystemStatus } from './_components/types'

export default function DashboardClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [caseStats, setCaseStats] = useState<CaseStats | null>(null)
  const [sysStatus, setSysStatus] = useState<SystemStatus | null>(null)
  const [error, setError] = useState('')

  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''

  const loadAll = useCallback(() => {
    fetch(`/api/admin/stats${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
    fetch(`/api/admin/cases${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setCaseStats)
      .catch(() => {})
    fetch(`/api/admin/system-status${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setSysStatus)
      .catch(() => {})
  }, [keyParam])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <AdminNav adminKey={adminKey} />
      <PageShell title="概览" subtitle="⚠ 当前无登录验证，仅供内部使用，URL 不要分享">
        {error && <p className="text-[#DC2626] text-sm mb-4">{error}</p>}
        {!data && !error && <p className="text-muted">载入中…</p>}

        {sysStatus && <SystemStatusCard status={sysStatus} />}

        {data && (
          <>
            {caseStats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <StatCard label="真实案例数" value={caseStats.caseCount} unit="例" />
                <StatCard
                  label="案例通过率"
                  value={caseStats.approvedPct}
                  unit="%"
                  hint={`${caseStats.approved} / ${caseStats.caseCount}`}
                  tone="green"
                />
                <StatCard label="退件" value={caseStats.returned} unit="例" />
                <StatCard label="不通过" value={caseStats.rejected} unit="例" tone="red" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <StatCard label="总用户数" value={data.userCount} unit="人" />
              <StatCard label="今日测试" value={data.todayTests} unit="次" />
              <StatCard
                label="绿色占比"
                value={data.greenPct}
                unit="%"
                hint={`${data.totalTests} 次中`}
                tone="green"
              />
              <StatCard
                label="红色占比"
                value={data.redPct}
                unit="%"
                hint={`${data.totalTests} 次中`}
                tone="red"
              />
            </div>

            <Section title="政策监控状态">
              <div className="space-y-2">
                {data.monitors.map(m => (
                  <MonitorRow key={m.id} monitor={m} />
                ))}
              </div>
            </Section>

            <Section title={`最近 ${Math.min(data.recent.length, 10)} 条测试`}>
              {data.recent.length === 0 ? (
                <p className="text-muted text-sm">暂无记录</p>
              ) : (
                <div className="space-y-2">
                  {data.recent.slice(0, 10).map((r, i) => (
                    <RecentRow key={`${r.date}-${i}`} entry={r} />
                  ))}
                </div>
              )}
            </Section>

            <Section title="内容统计 · 最常触发的风险项">
              <TriggeredTopList recent={data.recent} totalTests={data.totalTests} />
            </Section>

            <CaseFormSection adminKey={adminKey} onSaved={loadAll} />
          </>
        )}
      </PageShell>
    </main>
  )
}
