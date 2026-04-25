'use client'
import { useState } from 'react'
import { Field, Section } from './ui'

export default function CaseForm({
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

export function CaseFormSection({ adminKey, onSaved }: { adminKey: string; onSaved: () => void }) {
  return (
    <Section title="录入真实案例">
      <CaseForm adminKey={adminKey} onSaved={onSaved} />
    </Section>
  )
}
