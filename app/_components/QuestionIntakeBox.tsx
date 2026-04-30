'use client'

import { useState } from 'react'

const EXAMPLES = ['办公室搬迁', '换工作', '父母来日本', '公司休眠', '签证转换']

export default function QuestionIntakeBox({
  sourcePage,
  compact = false,
}: {
  sourcePage: string
  compact?: boolean
}) {
  const [questionText, setQuestionText] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ title: string; body: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = questionText.trim()
    if (!text || busy) return
    setBusy(true)
    setMessage(null)
    setError(null)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question_text: text,
          visa_type: null,
          contact_email: null,
          source_page: sourcePage,
        }),
      })
      const json = await res.json() as { ok?: boolean; data?: { message?: string }; error?: { message?: string } }
      if (!res.ok || !json.ok) {
        setError(json.error?.message ?? '提交暂时没有保存成功，请稍后再试')
        return
      }
      setQuestionText('')
      setMessage({
        title: '已收到',
        body: 'TEBIQ 会根据收到的问题继续整理场景和手续说明。',
      })
    } catch {
      setError('提交暂时没有保存成功，请稍后再试')
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
          <p className="text-[11px] leading-none text-ash">{compact ? '情况收集' : '情况入口'}</p>
          <h2 className={`${compact ? 'mt-2 text-[15px]' : 'mt-2 text-[22px]'} font-medium leading-tight text-ink`}>
            {compact ? '找不到你的情况？' : '你现在遇到什么情况？'}
          </h2>
        </div>
      </div>
      <p className={`${compact ? 'mt-2 text-[12px]' : 'mt-3 text-[13px]'} leading-[1.7] text-ash`}>
        {compact
          ? '把你现在遇到的问题写下来，TEBIQ 会根据真实问题继续整理手续路径。'
          : '把具体情况写下来。TEBIQ 会把真实问题整理成手续路径和后续说明。'}
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
        <button
          type="submit"
          disabled={busy || !questionText.trim()}
          className="min-h-[44px] rounded-btn bg-ink px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? '处理中...' : compact ? '提交情况' : '记录这件事'}
        </button>
      </form>
      {message && (
        <div className="mt-3 rounded-[10px] bg-paper px-3 py-2">
          <p className="text-[12px] font-medium text-ink">{message.title}</p>
          <p className="mt-1 text-[12px] leading-[1.6] text-slate">{message.body}</p>
        </div>
      )}
      {error && <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-danger">{error}</p>}
    </section>
  )
}
