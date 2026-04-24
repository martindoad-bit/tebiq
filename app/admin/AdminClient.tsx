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

interface CaseStats {
  caseCount: number
  approved: number
  rejected: number
  returned: number
  approvedPct: number
  recent: Array<{
    id: string
    date: string
    visaType: string
    result: 'approved' | 'rejected' | 'returned'
    yearsInJapan: number
    annualIncomeManYen: number
  }>
}

export default function AdminClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [caseStats, setCaseStats] = useState<CaseStats | null>(null)
  const [error, setError] = useState('')

  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''

  function loadAll() {
    fetch(`/api/admin/stats${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('载入统计失败'))
    fetch(`/api/admin/cases${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setCaseStats)
      .catch(() => {})
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey])

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-9 w-9 rounded-xl" /><img src="/logo-full.svg" alt="TEBIQ" className="h-9 w-auto" /></Link>
          <span className="text-muted text-xs">后台</span>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 md:py-12 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-md md:max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">TEBIQ 后台</h1>
          <p className="text-muted text-xs mb-6">
            ⚠ 当前无登录验证，仅供内部使用，URL 不要分享
          </p>

          {error && <p className="text-[#DC2626] text-sm mb-4">{error}</p>}
          {!data && !error && <p className="text-muted">载入中…</p>}

          {data && (
            <>
              {/* 案例统计（顶部） */}
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

              {/* 用户 / 测试 stat 卡 */}
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
                  <p className="text-muted text-sm">暂无记录</p>
                ) : (
                  <div className="space-y-2">
                    {data.recent.slice(0, 10).map((r, i) => (
                      <RecentRow key={`${r.date}-${i}`} entry={r} />
                    ))}
                  </div>
                )}
              </Section>

              {/* 录入真实案例 */}
              <Section title="录入真实案例">
                <CaseForm
                  adminKey={adminKey}
                  onSaved={loadAll}
                />
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
    tone === 'green' ? 'text-[#16A34A]' : tone === 'red' ? 'text-[#DC2626]' : 'text-primary'
  return (
    <div className="bg-card border border-line rounded-2xl p-4">
      <div className="text-muted text-xs mb-2">{label}</div>
      <div className={`${valColor} text-3xl font-bold leading-none`}>
        {value.toLocaleString()}
        <span className="text-base text-muted ml-1">{unit}</span>
      </div>
      {hint && <div className="text-muted text-[10px] mt-2">{hint}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-primary font-bold text-sm mb-3 px-1">{title}</h2>
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
      className={`bg-card border rounded-xl p-4 ${
        monitor.alert ? 'border-[#DC2626]' : 'border-line'
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="text-title font-bold text-sm">{monitor.name}</div>
          <div className="text-muted text-xs mt-1 truncate">{monitor.url}</div>
        </div>
        {monitor.alert ? (
          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
            检测到变化
          </span>
        ) : (
          <span className="text-muted text-xs flex-shrink-0">正常</span>
        )}
      </div>
      <div className="text-muted text-xs mt-2">最后检查：{dateStr}</div>
      {monitor.alert && (
        <div className="text-title text-xs mt-1">
          告警时间：{new Date(monitor.alert).toLocaleString('zh-CN')}
        </div>
      )}
    </div>
  )
}

function RecentRow({ entry }: { entry: RecentEntry }) {
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

function CaseForm({
  adminKey,
  onSaved,
}: {
  adminKey: string
  onSaved: () => void
}) {
  const [visaType, setVisaType] = useState('技人国')
  const [yearsInJapan, setYears] = useState('')
  const [annualIncomeManYen, setIncome] = useState('')
  const [changedJobs, setChangedJobs] = useState(false)
  const [result, setResult] = useState<'approved' | 'rejected' | 'returned'>('approved')
  const [rejectionReason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setSaving(true)
    try {
      const url = adminKey ? `/api/admin/cases?key=${encodeURIComponent(adminKey)}` : '/api/admin/cases'
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visaType,
          yearsInJapan: Number(yearsInJapan),
          annualIncomeManYen: Number(annualIncomeManYen),
          changedJobs,
          result,
          rejectionReason: rejectionReason || undefined,
          notes: notes || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setMsg(data?.error ?? '保存失败')
        return
      }
      setMsg('已录入')
      setYears('')
      setIncome('')
      setReason('')
      setNotes('')
      setChangedJobs(false)
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-card border border-line rounded-2xl p-5 space-y-3">
      <Field label="签证类型">
        <select
          value={visaType}
          onChange={e => setVisaType(e.target.value)}
          className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base"
        >
          {['技人国', '经营管理', '配偶者', '永住', '特定技能', '定住者'].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="在日年数">
          <input
            type="number"
            min="0"
            step="0.5"
            value={yearsInJapan}
            onChange={e => setYears(e.target.value)}
            required
            className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base"
          />
        </Field>
        <Field label="年收入（万日元）">
          <input
            type="number"
            min="0"
            value={annualIncomeManYen}
            onChange={e => setIncome(e.target.value)}
            required
            className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base"
          />
        </Field>
      </div>
      <Field label="是否换过工作">
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-body text-sm">
            <input type="radio" checked={changedJobs} onChange={() => setChangedJobs(true)} /> 是
          </label>
          <label className="flex items-center gap-2 text-body text-sm">
            <input type="radio" checked={!changedJobs} onChange={() => setChangedJobs(false)} /> 否
          </label>
        </div>
      </Field>
      <Field label="申请结果">
        <select
          value={result}
          onChange={e => setResult(e.target.value as 'approved' | 'rejected' | 'returned')}
          className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base"
        >
          <option value="approved">通过</option>
          <option value="returned">退件</option>
          <option value="rejected">不通过</option>
        </select>
      </Field>
      {(result === 'rejected' || result === 'returned') && (
        <Field label="退件 / 不通过原因">
          <input
            type="text"
            value={rejectionReason}
            onChange={e => setReason(e.target.value)}
            className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-base"
          />
        </Field>
      )}
      <Field label="备注（选填）">
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          className="w-full bg-base border border-line rounded-lg px-3 py-2 text-title text-sm resize-y"
        />
      </Field>
      <button
        type="submit"
        disabled={saving}
        className="w-full min-h-[48px] bg-primary hover:bg-primary-hover disabled:opacity-50 text-slate-900 font-bold rounded-xl"
      >
        {saving ? '提交中…' : '录入案例'}
      </button>
      {msg && <p className="text-[#16A34A] text-sm text-center">{msg}</p>}
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-body text-xs font-bold mb-1 block">{label}</span>
      {children}
    </label>
  )
}
