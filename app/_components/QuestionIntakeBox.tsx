'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const EXAMPLES = ['办公室搬迁', '换工作', '父母来日本', '公司休眠', '签证转换']

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
    <section className={compact
      ? 'rounded-card border border-hairline bg-surface px-4 py-4'
      : 'rounded-[16px] border border-hairline bg-surface px-4 py-5'
    }>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] leading-none text-ash">{compact ? '情况整理' : '情况入口'}</p>
          <h2 className={`${compact ? 'mt-2 text-[15px]' : 'mt-2 text-[22px]'} font-medium leading-tight text-ink`}>
            {compact ? '找不到你的情况？' : '你现在遇到什么情况？'}
          </h2>
        </div>
      </div>
      <p className={`${compact ? 'mt-2 text-[12px]' : 'mt-3 text-[13px]'} leading-[1.7] text-ash`}>
        {compact
          ? '把你现在遇到的问题写下来，TEBIQ 会先整理可确认的手续路径。'
          : '把具体情况写下来。TEBIQ 会先给出整理结果，并把问题进入后台复核。'}
      </p>
      {!compact && (
        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map(example => (
            <button
              key={example}
              type="button"
              onClick={() => setQuestionText(current => current.trim() ? current : example)}
              className="min-h-[30px] rounded-[8px] bg-paper px-2.5 text-[12px] text-slate active:bg-hairline"
            >
              {example}
            </button>
          ))}
        </div>
      )}
      <form onSubmit={submit} className="mt-4 grid gap-3">
        <textarea
          value={questionText}
          onChange={event => setQuestionText(event.target.value)}
          required
          rows={compact ? 3 : 5}
          maxLength={4000}
          placeholder={compact ? '例如：换工作后在留更新要准备什么' : '例：公司下个月搬办公室，我是经营管理签证。需要先办什么，哪些材料会影响续签？'}
          className={`${compact ? 'min-h-[94px]' : 'min-h-[148px]'} w-full resize-none rounded-[12px] border border-hairline bg-canvas px-3.5 py-3 text-[16px] leading-[1.65] text-ink outline-none placeholder:text-haze focus:border-ink`}
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
          className="min-h-[44px] rounded-btn bg-ink px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
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
