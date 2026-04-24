'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface MonitorStatus {
  id: string
  name: string
  url: string
  lastChecked: string | null
  alert: string | null
}

interface RecentEntry {
  date: string
  result: 'green' | 'yellow' | 'red'
  triggeredItems: string[]
}

interface AdminStats {
  userCount: number
  todayTests: number
  totalTests: number
  greenPct: number
  redPct: number
  monitors: MonitorStatus[]
  recent: RecentEntry[]
}

export default function AdminPage() {
  const [data, setData] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/stats', { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
  }, [])

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <span className="text-slate-500 text-xs">后台</span>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-md md:max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">TEBIQ 后台</h1>
          <p className="text-slate-500 text-xs mb-6">
            ⚠ 当前无登录验证，仅供内部使用，URL 不要分享
          </p>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          {!data && !error && <p className="text-slate-400">载入中…</p>}

          {data && (
            <>
              {/* 统计卡片 */}
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

              {/* 监控状态 */}
              <Section title="政策监控状态">
                <div className="space-y-2">
                  {data.monitors.map(m => (
                    <MonitorRow key={m.id} monitor={m} />
                  ))}
                </div>
              </Section>

              {/* 最近 10 条 */}
              <Section title={`最近 ${Math.min(data.recent.length, 10)} 条测试`}>
                {data.recent.length === 0 ? (
                  <p className="text-slate-500 text-sm">暂无记录</p>
                ) : (
                  <div className="space-y-2">
                    {data.recent.slice(0, 10).map((r, i) => (
                      <RecentRow key={`${r.date}-${i}`} entry={r} />
                    ))}
                  </div>
                )}
              </Section>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({
  label,
  value,
  unit,
  hint,
  tone,
}: {
  label: string
  value: number
  unit: string
  hint?: string
  tone?: 'green' | 'red'
}) {
  const valColor =
    tone === 'green' ? 'text-emerald-400' : tone === 'red' ? 'text-red-400' : 'text-amber-400'
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4">
      <div className="text-slate-400 text-xs mb-2">{label}</div>
      <div className={`${valColor} text-3xl font-bold leading-none`}>
        {value.toLocaleString()}
        <span className="text-base text-slate-400 ml-1">{unit}</span>
      </div>
      {hint && <div className="text-slate-600 text-[10px] mt-2">{hint}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-amber-400 font-bold text-sm mb-3 px-1">{title}</h2>
      {children}
    </div>
  )
}

function MonitorRow({ monitor }: { monitor: MonitorStatus }) {
  const dateStr = monitor.lastChecked
    ? new Date(monitor.lastChecked).toLocaleString('zh-CN')
    : '从未检查'
  return (
    <div
      className={`bg-slate-800 border rounded-xl p-4 ${
        monitor.alert ? 'border-red-500' : 'border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm">{monitor.name}</div>
          <div className="text-slate-500 text-xs mt-1 truncate">{monitor.url}</div>
        </div>
        {monitor.alert ? (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
            检测到变化
          </span>
        ) : (
          <span className="text-slate-500 text-xs flex-shrink-0">正常</span>
        )}
      </div>
      <div className="text-slate-400 text-xs mt-2">最后检查：{dateStr}</div>
      {monitor.alert && (
        <div className="text-red-300 text-xs mt-1">
          告警时间：{new Date(monitor.alert).toLocaleString('zh-CN')}
        </div>
      )}
    </div>
  )
}

function RecentRow({ entry }: { entry: RecentEntry }) {
  const v = {
    red: { text: '红', cls: 'bg-red-500 text-white' },
    yellow: { text: '黄', cls: 'bg-amber-400 text-slate-900' },
    green: { text: '绿', cls: 'bg-emerald-500 text-white' },
  }[entry.result]
  const dateStr = new Date(entry.date).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 flex items-start gap-3">
      <span
        className={`flex-shrink-0 ${v.cls} rounded-md w-7 h-7 flex items-center justify-center font-bold text-xs`}
      >
        {v.text}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-slate-400 text-xs">{dateStr}</div>
        {entry.triggeredItems.length > 0 ? (
          <div className="text-slate-300 text-xs mt-1 leading-relaxed">
            触发：{entry.triggeredItems.slice(0, 3).join(' / ')}
            {entry.triggeredItems.length > 3 && ` 等 ${entry.triggeredItems.length} 项`}
          </div>
        ) : (
          <div className="text-slate-500 text-xs mt-1">未触发任何风险项</div>
        )}
      </div>
    </div>
  )
}
