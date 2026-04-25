'use client'
import { useEffect, useMemo, useState } from 'react'
import AdminNav from '../_components/AdminNav'
import { PageShell, Section, StatCard } from '../_components/ui'
import MonitorRow from '../_components/MonitorRow'
import type { AdminStats, SystemStatus } from '../_components/types'

export default function MonitorClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [sysStatus, setSysStatus] = useState<SystemStatus | null>(null)
  const [error, setError] = useState('')
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''

  useEffect(() => {
    fetch(`/api/admin/stats${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
    fetch(`/api/admin/system-status${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setSysStatus)
      .catch(() => {})
  }, [keyParam])

  const counts = useMemo(() => {
    if (!data) return { total: 0, alerted: 0, ok: 0 }
    const total = data.monitors.length
    const alerted = data.monitors.filter(m => m.alert).length
    return { total, alerted, ok: total - alerted }
  }, [data])

  const lastChecked = sysStatus?.monitor.lastChecked
    ? new Date(sysStatus.monitor.lastChecked).toLocaleString('zh-CN')
    : '从未检查'

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <AdminNav adminKey={adminKey} />
      <PageShell title="政策监控" subtitle="入管/经营管理 等官方页面变化检测">
        {error && <p className="text-[#DC2626] text-sm mb-4">{error}</p>}
        {!data && !error && <p className="text-muted">载入中…</p>}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <StatCard label="监控目标" value={counts.total} unit="个" />
              <StatCard label="正常" value={counts.ok} unit="个" tone="green" />
              <StatCard label="告警" value={counts.alerted} unit="个" tone="red" />
            </div>

            <p className="text-muted text-xs mb-6">系统上次检查：{lastChecked}</p>

            <Section title="监控目标列表">
              {data.monitors.length === 0 ? (
                <p className="text-muted text-sm">暂未配置监控目标</p>
              ) : (
                <div className="space-y-2">
                  {data.monitors.map(m => (
                    <MonitorRow key={m.id} monitor={m} />
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
