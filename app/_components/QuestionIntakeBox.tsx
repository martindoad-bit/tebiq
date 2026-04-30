'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [questionText, setQuestionText] = useState('')
  const [visaType, setVisaType] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [inlineAnswer, setInlineAnswer] = useState<InlineAnswer | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = questionText.trim()
    if (!text || busy) return
    setBusy(true)
    setInlineAnswer(null)
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
      const json = await res.json() as InlineAnswer & { ok?: boolean; error?: { message?: string } }
      if (!res.ok || !json.ok) {
        setError(json.error?.message ?? '整理暂时没有完成，请稍后再试')
        return
      }
      setQuestionText('')
      setContactEmail('')
      if (json.answer_id) {
        router.push(`/answer/${json.answer_id}`)
      } else {
        setInlineAnswer(json)
      }
    } catch {
      setError('整理暂时没有完成，请稍后再试')
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
          把你的情况写下来，TEBIQ 会根据真实问题继续整理手续路径。
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
      {inlineAnswer && (
        <div className="mt-3 rounded-[10px] bg-paper px-3 py-3 text-[12px] leading-[1.6] text-slate">
          <p className="font-medium text-ink">{statusLabel(inlineAnswer.answer_type)}</p>
          <p className="mt-1">{inlineAnswer.summary}</p>
          {inlineAnswer.next_steps.length > 0 && (
            <ol className="mt-2 list-decimal pl-4">
              {inlineAnswer.next_steps.slice(0, 3).map(step => <li key={step}>{step}</li>)}
            </ol>
          )}
        </div>
      )}
      {error && <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-danger">{error}</p>}
    </section>
  )
}

interface InlineAnswer {
  ok?: boolean
  answer_id?: string | null
  answer_type: 'matched' | 'draft' | 'cannot_determine'
  summary: string
  next_steps: string[]
}

function statusLabel(type: InlineAnswer['answer_type']) {
  if (type === 'matched') return '已整理'
  if (type === 'draft') return '初步整理，尚未人工复核'
  return '这个情况需要进一步确认'
}
