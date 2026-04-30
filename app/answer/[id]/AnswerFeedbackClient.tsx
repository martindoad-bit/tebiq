'use client'

import { useState } from 'react'

const FEEDBACK = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'unclear', label: '看不懂' },
  { type: 'my_case_differs', label: '我的情况不一样' },
] as const

export default function AnswerFeedbackClient({ answerId }: { answerId: string }) {
  const [busy, setBusy] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function submit(feedbackType: string) {
    setBusy(feedbackType)
    setMessage(null)
    try {
      const res = await fetch('/api/answer/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          answer_draft_id: answerId,
          page_path: `/answer/${answerId}`,
          feedback_type: feedbackType,
        }),
      })
      setMessage(res.ok ? '已记录' : '暂时没有保存成功')
    } catch {
      setMessage('暂时没有保存成功')
    } finally {
      setBusy(null)
    }
  }

  return (
    <section className="mt-5 rounded-card border border-hairline bg-surface px-4 py-4">
      <h2 className="text-[13px] font-medium text-ink">这个回答有帮助吗？</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {FEEDBACK.map(item => (
          <button
            key={item.type}
            type="button"
            disabled={busy !== null}
            onClick={() => submit(item.type)}
            className="min-h-[38px] rounded-btn border border-hairline bg-canvas px-3 text-[12px] text-ink disabled:opacity-45"
          >
            {busy === item.type ? '处理中...' : item.label}
          </button>
        ))}
      </div>
      {message && <p className="mt-2 text-[12px] text-ash">{message}</p>}
    </section>
  )
}
