'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const POPULAR_QUESTIONS = [
  '公司休眠了要不要交国民年金？',
  '办公室搬迁要做哪些手续？',
  '住民税晚交会影响永住吗？',
  '永住者能不能带父母来日本？',
  '特定技能1号能不能转工作签？',
  '搬家后在留卡地址要不要改？',
]

const VISA_OPTIONS = [
  { value: 'management', label: '经营管理' },
  { value: 'technical_humanities_international', label: '技人国' },
  { value: 'spouse', label: '配偶者' },
  { value: 'permanent_resident_preparation', label: '永住' },
  { value: 'specified_skilled_worker', label: '特定技能' },
  { value: 'student', label: '留学' },
  { value: 'dependent', label: '家族滞在' },
  { value: '', label: '还不确定' },
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
  const [identityTouched, setIdentityTouched] = useState(false)
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
          source_page: sourcePage,
        }),
      })
      const json = await res.json() as InlineAnswer & { ok?: boolean; error?: { message?: string } }
      if (!res.ok || !json.ok) {
        setError(json.error?.message ?? '整理暂时没有完成，请稍后再试')
        return
      }
      setQuestionText('')
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
          <p className="text-[11px] leading-none text-ash">{compact ? '情况整理' : '手续问题整理'}</p>
          <h2 className={`${compact ? 'mt-2 text-[15px]' : 'mt-2 text-[23px]'} font-medium leading-tight text-ink`}>
            {compact ? '找不到你的情况？' : '你现在遇到什么情况？'}
          </h2>
        </div>
      </div>
      <p className={`${compact ? 'mt-2 text-[12px]' : 'mt-3 text-[13px]'} leading-[1.7] text-ash`}>
        {compact
          ? '把你现在遇到的问题写下来，TEBIQ 会整理可确认的手续路径。'
          : '写下具体情况，先得到一份整理结果；不确定的部分会标出需要补充的信息。'}
      </p>
      {!compact && (
        <>
          <div className="mt-5">
            <p className="text-[12px] leading-none text-ash">先选你的身份</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {VISA_OPTIONS.map(option => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => {
                    if (identityTouched && visaType === option.value) {
                      setIdentityTouched(false)
                      setVisaType('')
                      return
                    }
                    setIdentityTouched(true)
                    setVisaType(option.value)
                  }}
                  aria-pressed={identityTouched && visaType === option.value}
                  className={`min-h-[32px] rounded-[10px] border px-3 text-[12px] ${
                    identityTouched && visaType === option.value
                      ? 'border-ink bg-ink text-white'
                      : 'border-hairline bg-canvas text-slate active:bg-paper'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[12px] leading-none text-ash">热门情况</p>
            <div className="mt-2 grid gap-2">
              {POPULAR_QUESTIONS.map(example => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setQuestionText(current => current.trim() ? current : example)}
                  className="min-h-[38px] rounded-[10px] border border-hairline bg-canvas px-3 text-left text-[12px] leading-[1.5] text-slate active:bg-paper"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      <form onSubmit={submit} className="mt-4 grid gap-3">
        {!compact && <p className="text-[12px] leading-none text-ash">你的情况</p>}
        <textarea
          value={questionText}
          onChange={event => setQuestionText(event.target.value)}
          required
          rows={compact ? 3 : 4}
          maxLength={4000}
          placeholder={compact ? '例如：换工作后在留更新要准备什么' : '例：公司下个月搬办公室，我是经营管理签证。需要先办什么，哪些材料会影响续签？'}
          className={`${compact ? 'min-h-[94px]' : 'min-h-[132px]'} w-full resize-none rounded-[12px] border border-hairline bg-canvas px-3.5 py-3 text-[16px] leading-[1.65] text-ink outline-none placeholder:text-haze focus:border-ink`}
        />
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
          <p className="mt-1">{inlineAnswer.action_answer.conclusion}</p>
          {inlineAnswer.action_answer.what_to_do.length > 0 && (
            <ol className="mt-2 list-decimal pl-4">
              {inlineAnswer.action_answer.what_to_do.slice(0, 3).map(step => <li key={step}>{step}</li>)}
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
  action_answer: {
    conclusion: string
    what_to_do: string[]
  }
}

function statusLabel(type: InlineAnswer['answer_type']) {
  if (type === 'matched') return '已整理'
  if (type === 'draft') return '初步整理，尚未人工复核'
  return '这个情况需要进一步确认'
}
