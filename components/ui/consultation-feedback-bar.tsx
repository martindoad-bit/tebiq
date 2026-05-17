'use client'

import { useState } from 'react'
import { ThumbsUp, AlertCircle, MessageSquarePlus, UserCheck } from 'lucide-react'
import { FeedbackLabel } from '@/components/ui/consultation-alpha'

type FeedbackType = 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'

interface FeedbackOption {
  type: FeedbackType
  label: string
  Icon: typeof ThumbsUp
  description?: string
}

const OPTIONS: FeedbackOption[] = [
  { type: 'helpful', label: '有帮助', Icon: ThumbsUp },
  { type: 'inaccurate', label: '不准确', Icon: AlertCircle },
  { type: 'add_context', label: '我有补充', Icon: MessageSquarePlus },
  { type: 'human_review', label: '想找人确认', Icon: UserCheck },
]

interface ConsultationFeedbackBarProps {
  consultationId: string
  initialFeedback?: string | null
}

/**
 * User-facing feedback bar for /c/[id]. POSTs to the existing
 * /api/consultation/[id]/feedback endpoint (5 enum values).
 *
 * `add_context` opens an inline note input that gets sent as a follow-up
 * to the existing /api/consultation/follow-up endpoint so the note enters
 * the consultation chain rather than vanishing into a feedback row.
 */
export function ConsultationFeedbackBar({
  consultationId,
  initialFeedback,
}: ConsultationFeedbackBarProps) {
  const [active, setActive] = useState<FeedbackType | null>(
    isFeedbackType(initialFeedback) ? initialFeedback : null,
  )
  const [busy, setBusy] = useState<FeedbackType | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [contextOpen, setContextOpen] = useState(false)
  const [contextDraft, setContextDraft] = useState('')

  async function submit(type: FeedbackType) {
    if (busy) return
    if (type === 'add_context') {
      setContextOpen(true)
      setActive(type)
      return
    }
    setBusy(type)
    setError(null)
    try {
      const res = await fetch(`/api/consultation/${encodeURIComponent(consultationId)}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ feedback: type }),
      })
      if (!res.ok) throw new Error(`http_${res.status}`)
      setActive(type)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'submit_failed')
    } finally {
      setBusy(null)
    }
  }

  async function submitContext() {
    const note = contextDraft.trim()
    if (!note) {
      setContextOpen(false)
      return
    }
    setBusy('add_context')
    setError(null)
    try {
      // First record the feedback type so Eval Lab knows the user clicked
      // add_context. Then post the actual supplemental text as a
      // follow-up turn, which preserves it in the consultation chain.
      await fetch(`/api/consultation/${encodeURIComponent(consultationId)}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ feedback: 'add_context' }),
      })
      await fetch('/api/consultation/follow-up', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          parent_consultation_id: consultationId,
          question: `补充情况：${note}`,
        }),
      })
      setActive('add_context')
      setContextDraft('')
      setContextOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'submit_failed')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map(opt => {
          const isActive = active === opt.type
          const isBusy = busy === opt.type
          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => submit(opt.type)}
              disabled={Boolean(busy)}
              aria-pressed={isActive}
              className={
                'inline-flex min-h-9 items-center gap-1.5 rounded-btn px-2.5 text-[13px] font-medium leading-none transition-colors ' +
                (isActive
                  ? 'border border-[var(--tebiq-ink-blue)] bg-[var(--tebiq-soft-blue)] text-[var(--tebiq-ink-blue)] ring-1 ring-[var(--tebiq-ink-blue)]'
                  : 'border border-[var(--tebiq-soft-gray)] bg-white text-[var(--tebiq-ink-blue)] hover:border-[var(--tebiq-cool-gray)]')
              }
            >
              <opt.Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
              <span>{opt.label}</span>
              {isBusy && <span className="text-[var(--tebiq-cool-gray)]">…</span>}
            </button>
          )
        })}
      </div>

      {contextOpen && (
        <div className="space-y-2 rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] p-3">
          <label className="text-[12.5px] text-[var(--tebiq-cool-gray)]" htmlFor="ctx-input">
            补充新的事实，例如「我已经收到通知书，期限是 5/30」。这会作为补充提问加入这次咨询。
          </label>
          <textarea
            id="ctx-input"
            value={contextDraft}
            onChange={e => setContextDraft(e.target.value.slice(0, 1500))}
            rows={3}
            className="w-full rounded-[10px] border border-[var(--tebiq-soft-gray)] bg-white px-2.5 py-2 text-[13.5px] leading-relaxed text-[var(--tebiq-ink-blue)] focus:border-[var(--tebiq-ink-blue)] focus:outline-none"
            placeholder="我的情况是……"
            disabled={Boolean(busy)}
          />
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] text-[var(--tebiq-cool-gray)]">{contextDraft.length} / 1500</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setContextOpen(false); setContextDraft('') }}
                disabled={Boolean(busy)}
                className="inline-flex min-h-8 items-center rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] text-[var(--tebiq-deep-slate)]"
              >
                取消
              </button>
              <button
                type="button"
                onClick={submitContext}
                disabled={Boolean(busy) || contextDraft.trim().length === 0}
                className="inline-flex min-h-8 items-center rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[13px] font-medium text-[var(--tebiq-off-white)] disabled:opacity-60"
              >
                {busy === 'add_context' ? '提交中…' : '提交补充'}
              </button>
            </div>
          </div>
        </div>
      )}

      {active && !contextOpen && (
        <p className="text-[12.5px] text-[var(--tebiq-cool-gray)]">
          已记录：<FeedbackLabel type={active} />。我们会看到这条反馈以改进答案。
        </p>
      )}
      {error && (
        <p className="text-[12.5px] text-[var(--tebiq-warm-amber)]">
          反馈未能提交（{error}）。可以稍后再试。
        </p>
      )}
    </div>
  )
}

function isFeedbackType(value: string | null | undefined): value is FeedbackType {
  return value === 'helpful' || value === 'inaccurate' || value === 'add_context'
    || value === 'human_review' || value === 'saved'
}
