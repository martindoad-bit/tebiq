'use client'

import Link from 'next/link'
import { useState } from 'react'

const VISA_OPTIONS = [
  { value: '', label: '不确定 / 不选择' },
  { value: 'technical_humanities_international', label: '技人国' },
  { value: 'management', label: '经营管理' },
  { value: 'spouse', label: '配偶者' },
  { value: 'permanent_resident_preparation', label: '永住准备' },
  { value: 'specified_skilled_worker', label: '特定技能' },
  { value: 'other', label: '其他' },
]

export default function QuestionIntakeBox({
  sourcePage,
  compact = false,
}: {
  sourcePage: string
  compact?: boolean
}) {
  const [questionText, setQuestionText] = useState('')
  const [visaType, setVisaType] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [resultHref, setResultHref] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = questionText.trim()
    if (!text || busy) return
    setBusy(true)
    setMessage(null)
    setResultHref(null)
    setError(null)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question_text: text,
          visa_type: visaType || null,
          contact_email: contactEmail.trim() || null,
          source_page: sourcePage,
        }),
      })
      const json = await res.json() as {
        ok?: boolean
        data?: { message?: string; matchStatus?: string | null; matchedSlug?: string | null }
        error?: { message?: string }
      }
      if (!res.ok || !json.ok) {
        setError(json.error?.message ?? '请求暂时没有保存成功，请稍后再试')
        return
      }
      setQuestionText('')
      setContactEmail('')
      setResultHref(resolveAnswerHref(json.data?.matchStatus, json.data?.matchedSlug))
      setMessage('整理结果已生成。')
    } catch {
      setError('请求暂时没有保存成功，请稍后再试')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[15px] font-medium text-ink">你现在遇到什么情况？</h2>
      {!compact && (
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          例如：办公室搬迁、换工作、父母来日本、公司休眠、签证转换。
          写下情况后，会返回一份整理结果；不确定时会说明需要补充什么信息。
        </p>
      )}
      <form onSubmit={submit} className="mt-3 grid gap-2">
        <textarea
          value={questionText}
          onChange={event => setQuestionText(event.target.value)}
          required
          rows={compact ? 3 : 4}
          maxLength={4000}
          placeholder="把你的情况写下来"
          className="w-full resize-none rounded-[12px] border border-hairline bg-canvas px-3 py-3 text-[13px] leading-[1.6] text-ink outline-none placeholder:text-ash focus:border-ink"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <select
            value={visaType}
            onChange={event => setVisaType(event.target.value)}
            className="min-h-[42px] rounded-[12px] border border-hairline bg-canvas px-3 text-[12px] text-ink outline-none focus:border-ink"
          >
            {VISA_OPTIONS.map(option => (
              <option key={option.value || 'none'} value={option.value}>{option.label}</option>
            ))}
          </select>
          <input
            type="email"
            value={contactEmail}
            onChange={event => setContactEmail(event.target.value)}
            placeholder="邮箱（可选）"
            className="min-h-[42px] rounded-[12px] border border-hairline bg-canvas px-3 text-[12px] text-ink outline-none placeholder:text-ash focus:border-ink"
          />
        </div>
        <button
          type="submit"
          disabled={busy || !questionText.trim()}
          className="min-h-[42px] rounded-btn bg-ink px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? '正在整理...' : '整理这个问题'}
        </button>
      </form>
      {message && (
        <div className="mt-3 rounded-[10px] bg-paper px-3 py-3 text-[12px] leading-[1.6] text-slate">
          <p>{message}</p>
          {resultHref && (
            <Link
              href={resultHref}
              className="mt-2 inline-flex min-h-[34px] items-center rounded-[9px] bg-ink px-3 text-[12px] font-medium text-white"
            >
              查看整理结果
            </Link>
          )}
        </div>
      )}
      {error && <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-danger">{error}</p>}
    </section>
  )
}

function resolveAnswerHref(matchStatus?: string | null, matchedSlug?: string | null): string {
  if (matchedSlug || matchStatus === 'matched') return '/answer/demo-matched'
  if (matchStatus === 'no_match') return '/answer/demo-cannot-determine'
  return '/answer/demo-draft'
}
