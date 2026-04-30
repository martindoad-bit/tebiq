'use client'

import { useState } from 'react'
import type { FeedbackType } from '@/lib/decision/types'

const OPTIONS: Array<{ type: FeedbackType; label: string }> = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'unclear', label: '看不懂' },
  { type: 'my_case_differs', label: '我的情况不一样' },
]

export default function FeedbackClient({
  slug,
  cardId,
}: {
  slug: string
  cardId: string | null
}) {
  const [selected, setSelected] = useState<FeedbackType | null>(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  async function send(feedbackType: FeedbackType) {
    if (busy) return
    setSelected(feedbackType)
    setBusy(true)
    try {
      await fetch('/api/decision-lab/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          cardSlug: slug,
          cardId,
          pagePath: `/decision-lab/${slug}`,
          feedbackType,
        }),
      })
      setDone(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[13px] font-medium text-ink">这个内容有帮助吗？</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {OPTIONS.map(option => (
          <button
            key={option.type}
            type="button"
            onClick={() => send(option.type)}
            disabled={busy}
            className={`min-h-[38px] rounded-btn border px-3 text-[12px] font-medium ${
              selected === option.type
                ? 'border-ink bg-ink text-white'
                : 'border-hairline bg-canvas text-slate'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {done && (
        <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] text-slate">
          已记录。
        </p>
      )}
    </section>
  )
}
