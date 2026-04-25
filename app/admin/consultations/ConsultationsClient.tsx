'use client'
import { useEffect, useState } from 'react'
import AdminNav from '../_components/AdminNav'
import { PageShell } from '../_components/ui'
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

export default function ConsultationsClient({ adminKey }: { adminKey: string }) {
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

  return (
    <main className="min-h-screen bg-base text-title flex flex-col">
      <AdminNav adminKey={adminKey} />
      <PageShell title="咨询请求" subtitle="过滤、查看详情，并更新处理状态">
        {!items && <p className="text-muted text-sm">载入中…</p>}
        {items && items.length === 0 && <p className="text-muted text-sm">还没有咨询请求</p>}
        {items && items.length > 0 && (
          <ConsultationsPanel
            items={items}
            statusFilter={statusFilter}
            visaFilter={visaFilter}
            openId={openId}
            adminKey={adminKey}
            onStatusFilter={setStatusFilter}
            onVisaFilter={setVisaFilter}
            onToggle={id => setOpenId(o => (o === id ? null : id))}
            onChanged={reload}
          />
        )}
      </PageShell>
    </main>
  )
}

function ConsultationsPanel({
  items,
  statusFilter,
  visaFilter,
  openId,
  adminKey,
  onStatusFilter,
  onVisaFilter,
  onToggle,
  onChanged,
}: {
  items: ConsultationIndexEntry[]
  statusFilter: 'all' | ConsultationStatus
  visaFilter: 'all' | string
  openId: string | null
  adminKey: string
  onStatusFilter: (s: 'all' | ConsultationStatus) => void
  onVisaFilter: (v: 'all' | string) => void
  onToggle: (id: string) => void
  onChanged: () => void
}) {
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
          onChange={e => onStatusFilter(e.target.value as 'all' | ConsultationStatus)}
          className="bg-base border border-line rounded-lg px-3 py-2 text-title text-sm"
        >
          <option value="all">全部状态</option>
          {(Object.keys(STATUS_LABEL) as ConsultationStatus[]).map(s => (
            <option key={s} value={s}>{STATUS_LABEL[s]}</option>
          ))}
        </select>
        <select
          value={visaFilter}
          onChange={e => onVisaFilter(e.target.value)}
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
            onToggle={() => onToggle(it.id)}
            onChanged={onChanged}
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
      {expanded && <ConsultationDetail id={item.id} adminKey={adminKey} onChanged={onChanged} />}
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
