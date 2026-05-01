'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RECENT_QUESTIONS = [
  '厚生年金截止日期是什么时候？',
  '办公室搬迁要做哪些手续？',
  '住民税晚交会影响永住吗？',
  '搬家后在留卡地址要不要改？',
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
          visa_type: null,
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
      ? 'rounded-[16px] border border-hairline bg-surface px-4 py-4'
      : 'rounded-[18px] border border-hairline bg-surface px-4 py-[18px] sm:px-5'
    }>
      <h2 className={`${compact ? 'text-[15px]' : 'text-[16px]'} font-medium leading-tight tracking-[-0.005em] text-ink`}>
        {compact ? '找不到对应内容？' : '你的问题'}
      </h2>
      <form onSubmit={submit} className="mt-3.5 grid gap-3">
        <textarea
          value={questionText}
          onChange={event => setQuestionText(event.target.value)}
          required
          rows={compact ? 3 : 2}
          maxLength={4000}
          placeholder={compact ? '换工作后在留更新要准备什么？' : '厚生年金截止日期是什么时候？'}
          className={`${compact ? 'min-h-[96px]' : 'min-h-[86px]'} w-full resize-none rounded-[14px] border border-hairline bg-canvas px-3.5 py-3 text-[16px] leading-[1.55] text-ink outline-none placeholder:text-haze focus:border-ink`}
        />
        <button
          type="submit"
          disabled={busy || !questionText.trim()}
          className="min-h-[48px] rounded-[12px] bg-ink px-4 py-2 text-[14px] font-medium text-white transition-colors active:bg-[#1A355B] disabled:cursor-not-allowed disabled:opacity-65"
        >
          {busy ? '正在整理...' : '看下一步'}
        </button>
      </form>
      {!compact && (
        <div className="mt-[18px]">
          <p className="text-[12px] leading-none text-ash">最近常问</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {RECENT_QUESTIONS.map(example => (
              <button
                key={example}
                type="button"
                onClick={() => setQuestionText(example)}
                className="min-h-[32px] rounded-[10px] bg-paper px-3 text-[12px] leading-none text-slate active:bg-hairline"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
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
  if (type === 'draft') return '初步整理，待复核'
  return '需要进一步确认'
}
