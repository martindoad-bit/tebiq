'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  type ConsultationIndexEntry,
  type Consultation,
  type ConsultationStatus,
  STATUS_LABEL,
  URGENCY_LABEL,
  CONTACT_LABEL,
  COLOR_LABEL,
  VISA_LABEL,
  isStatus,
} from '@/lib/consultation'

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

interface SystemStatus {
  ai: { configured: boolean; provider: string; region: string }
  kv: { ok: boolean; error: string | null }
  monitor: { lastChecked: string | null }
}

export default function AdminClient({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<AdminStats | null>(null)
  const [caseStats, setCaseStats] = useState<CaseStats | null>(null)
  const [sysStatus, setSysStatus] = useState<SystemStatus | null>(null)
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
    fetch(`/api/admin/system-status${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(setSysStatus)
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
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" /><div><div className="text-xl font-bold text-title leading-none">TEBIQ</div><div className="text-xs text-muted leading-tight mt-0.5">てびき</div></div></Link>
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

          {sysStatus && <SystemStatusCard status={sysStatus} />}

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

              {/* 内容统计 - 触发的风险项 Top */}
              <Section title="内容统计 · 最常触发的风险项">
                <TriggeredTopList recent={data.recent} totalTests={data.totalTests} />
              </Section>

              {/* 咨询请求 */}
              <Section title="咨询请求">
                <ConsultationsPanel adminKey={adminKey} />
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

function SystemStatusCard({ status }: { status: SystemStatus }) {
  const aiOk = status.ai.configured
  const kvOk = status.kv.ok
  const monitorStr = status.monitor.lastChecked
    ? new Date(status.monitor.lastChecked).toLocaleString('zh-CN')
    : '从未检查'

  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
      <h2 className="text-title font-bold text-sm mb-3">系统状态</h2>
      <ul className="space-y-2">
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">AI 问答：</span>
          {aiOk ? (
            <span className="text-[#16A34A]">✅ AWS Bedrock 已配置（{status.ai.region}）</span>
          ) : (
            <span className="text-orange-600">⚠️ 未配置，当前为 Mock 模式</span>
          )}
        </li>
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">KV 数据库：</span>
          {kvOk ? (
            <span className="text-[#16A34A]">✅ 连接正常</span>
          ) : (
            <span className="text-[#DC2626]">⚠️ 连接异常 {status.kv.error ? `(${status.kv.error})` : ''}</span>
          )}
        </li>
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">政策监控：</span>
          <span className="text-muted">上次检查：{monitorStr}</span>
        </li>
      </ul>
    </div>
  )
}

function TriggeredTopList({
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

function ConsultationsPanel({ adminKey }: { adminKey: string }) {
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  const [items, setItems] = useState<ConsultationIndexEntry[] | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | ConsultationStatus>('all')
  const [visaFilter, setVisaFilter] = useState<'all' | string>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  function reload() {
    fetch(`/api/admin/consultations${keyParam}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setItems(d?.items ?? []))
      .catch(() => setItems([]))
  }
  useEffect(reload, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!items) return <p className="text-muted text-sm">载入中…</p>
  if (items.length === 0)
    return <p className="text-muted text-sm">还没有咨询请求</p>

  const filtered = items.filter(it => {
    if (statusFilter !== 'all' && it.status !== statusFilter) return false
    if (visaFilter !== 'all' && it.visaType !== visaFilter) return false
    return true
  })

  const visaOptions = Array.from(new Set(items.map(i => i.visaType)))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as 'all' | ConsultationStatus)}
          className="bg-base border border-line rounded-lg px-3 py-2 text-title text-sm"
        >
          <option value="all">全部状态</option>
          {(Object.keys(STATUS_LABEL) as ConsultationStatus[]).map(s => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select
          value={visaFilter}
          onChange={e => setVisaFilter(e.target.value)}
          className="bg-base border border-line rounded-lg px-3 py-2 text-title text-sm"
        >
          <option value="all">全部签证</option>
          {visaOptions.map(v => (
            <option key={v} value={v}>{VISA_LABEL[v] ?? v}</option>
          ))}
        </select>
        <span className="text-muted text-xs ml-auto">{filtered.length} / {items.length}</span>
      </div>
      <div className="space-y-2">
        {filtered.map(it => (
          <ConsultationRow
            key={it.id}
            item={it}
            adminKey={adminKey}
            expanded={openId === it.id}
            onToggle={() => setOpenId(o => (o === it.id ? null : it.id))}
            onChanged={reload}
          />
        ))}
      </div>
    </div>
  )
}

function ConsultationRow({
  item,
  adminKey,
  expanded,
  onToggle,
  onChanged,
}: {
  item: ConsultationIndexEntry
  adminKey: string
  expanded: boolean
  onToggle: () => void
  onChanged: () => void
}) {
  const dateStr = new Date(item.createdAt).toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  const urgencyTone =
    item.urgency === 'urgent'
      ? 'bg-[#FEE2E2] text-[#B91C1C]'
      : item.urgency === 'normal'
        ? 'bg-highlight text-primary'
        : 'bg-card text-muted border border-line'

  return (
    <div className="bg-card border border-line rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-3 flex items-center gap-3 hover:bg-highlight/40 transition-colors"
      >
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${urgencyTone}`}>
          {URGENCY_LABEL[item.urgency].split('（')[0]}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-title text-sm font-bold truncate">
            {item.userName ?? '（未填姓名）'} · {CONTACT_LABEL[item.preferredContact]}：{item.contactDetail}
          </div>
          <div className="text-muted text-xs mt-0.5 truncate">
            {dateStr} · {VISA_LABEL[item.visaType] ?? item.visaType} · {COLOR_LABEL[item.resultColor]}
          </div>
        </div>
        <span className="text-muted text-[10px] font-bold flex-shrink-0">{STATUS_LABEL[item.status]}</span>
      </button>
      {expanded && (
        <ConsultationDetail
          id={item.id}
          adminKey={adminKey}
          onChanged={onChanged}
        />
      )}
    </div>
  )
}

function ConsultationDetail({
  id,
  adminKey,
  onChanged,
}: {
  id: string
  adminKey: string
  onChanged: () => void
}) {
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  const [data, setData] = useState<Consultation | null>(null)
  const [status, setStatus] = useState<ConsultationStatus>('pending')
  const [assignedTo, setAssignedTo] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch(`/api/admin/consultations${keyParam}&id=${encodeURIComponent(id)}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        const c = d?.consultation as Consultation | undefined
        if (!c) return
        setData(c)
        setStatus(c.status)
        setAssignedTo(c.assignedTo ?? '')
        setNotes(c.internalNotes ?? '')
      })
  }, [id, keyParam])

  async function save() {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch(`/api/admin/consultations${keyParam}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, assignedTo, internalNotes: notes }),
      })
      if (res.ok) {
        setMsg('已保存')
        onChanged()
      } else {
        const j = await res.json().catch(() => ({}))
        setMsg(j?.error ?? '保存失败')
      }
    } finally {
      setSaving(false)
    }
  }

  if (!data) return <div className="px-4 py-3 text-muted text-xs">载入中…</div>

  return (
    <div className="px-4 py-4 border-t border-line space-y-3 bg-base/40">
      <dl className="text-xs leading-relaxed space-y-1">
        <Row label="希望处理时间" value={URGENCY_LABEL[data.urgency]} />
        <Row label="所在地域" value={data.location ?? '—'} />
        <Row label="补充说明" value={data.additionalInfo ?? '—'} />
        <Row label="触发的风险项" value={data.triggeredItems.length > 0 ? data.triggeredItems.join('； ') : '—'} />
        <Row label="来源页面" value={data.sourcePage || '—'} />
      </dl>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-body text-xs font-bold mb-1 block">状态</span>
          <select
            value={status}
            onChange={e => isStatus(e.target.value) && setStatus(e.target.value)}
            className="w-full bg-card border border-line rounded-lg px-2 py-1.5 text-title text-sm"
          >
            {(Object.keys(STATUS_LABEL) as ConsultationStatus[]).map(s => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-body text-xs font-bold mb-1 block">分配给（书士）</span>
          <input
            type="text"
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
            className="w-full bg-card border border-line rounded-lg px-2 py-1.5 text-title text-sm"
            placeholder="书士姓名 / ID"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-body text-xs font-bold mb-1 block">内部备注</span>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={2}
          className="w-full bg-card border border-line rounded-lg px-2 py-1.5 text-title text-sm resize-y"
        />
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="px-4 py-1.5 bg-primary text-title font-bold rounded-lg text-sm disabled:opacity-50"
        >
          {saving ? '保存中…' : '保存'}
        </button>
        {msg && <span className="text-[#16A34A] text-xs">{msg}</span>}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-muted flex-shrink-0">{label}：</dt>
      <dd className="text-body break-words flex-1">{value}</dd>
    </div>
  )
}
