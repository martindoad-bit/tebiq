'use client'

import { useEffect, useRef, useState } from 'react'
import {
  parseConsultationChunk,
  type ConsultationEvent,
} from '@/lib/consultation/stream-protocol'

// 1.0 Alpha entry + streaming view (Issue #39 §4.1 + §4.2 + §4.4 + §4.5 + §4.6).
//
// Single-page flow: entry form → in-place streaming view → feedback / save.
// No redirect during streaming (avoids double-stream waste). After save,
// link to /c/[id] read-only view for revisiting + /me/consultations list.
//
// All UX rules per Charter §7:
//   - Alpha banner persistent at top
//   - Risk-keyword hint above answer area when keywords match
//   - Streaming token-by-token (NOT a fake loading)
//   - 25s "still generating" hint surfaced
//   - 90s timeout → voice-canonical fallback (NOT legacy matcher)
//   - 5 feedback buttons + save question button after completion

const ALPHA_BANNER =
  'TEBIQ 1.0 Alpha — 以下回答用于整理问题和下一步，不是最终专业判断。'

const RISK_HINT_COPY =
  '这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定。'

const FEEDBACK_BUTTONS: Array<{
  type: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'
  label: string
}> = [
  { type: 'helpful',      label: '有帮助' },
  { type: 'inaccurate',   label: '不准确' },
  { type: 'add_context',  label: '我想补充情况' },
  { type: 'human_review', label: '想找人工确认' },
  { type: 'saved',        label: '保存这个问题' },
]

type Phase =
  | 'idle'
  | 'received'      // server created row, no token yet
  | 'streaming'    // first_token seen; chunks flowing
  | 'still_generating'  // 25s elapsed without first_token
  | 'completed'
  | 'timeout'
  | 'failed'

interface ActiveConsultation {
  id: string
  question: string
  answer: string
  risk_keywords: string[]
  phase: Phase
  first_token_latency_ms: number | null
  total_latency_ms: number | null
  redactions_count: number | null
  fallback_text: string | null
  detail: string | null
  feedback_sent: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved' | null
  saved: boolean
}

function ensureViewerCookie(): string {
  if (typeof document === 'undefined') return ''
  const existing = document.cookie
    .split(';')
    .map(s => s.trim())
    .find(s => s.startsWith('tebiq_viewer='))
  if (existing) return decodeURIComponent(existing.slice('tebiq_viewer='.length))
  const id = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000).toUTCString()
  document.cookie = `tebiq_viewer=${encodeURIComponent(id)}; path=/; expires=${expires}; samesite=lax`
  return id
}

export default function AiConsultationEntryClient() {
  const [question, setQuestion] = useState('')
  const [active, setActive] = useState<ActiveConsultation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [viewerId, setViewerId] = useState<string>('')
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setViewerId(ensureViewerCookie())
  }, [])

  // Cleanup on unmount
  useEffect(() => () => { abortRef.current?.abort() }, [])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = question.trim()
    if (!text) return
    if (active && !isTerminal(active.phase)) return
    setError(null)
    setActive({
      id: '',
      question: text,
      answer: '',
      risk_keywords: [],
      phase: 'idle',
      first_token_latency_ms: null,
      total_latency_ms: null,
      redactions_count: null,
      fallback_text: null,
      detail: null,
      feedback_sent: null,
      saved: false,
    })

    const ac = new AbortController()
    abortRef.current = ac

    let res: Response
    try {
      res = await fetch('/api/consultation/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: text, viewer_id: viewerId }),
        signal: ac.signal,
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setActive(prev => prev ? { ...prev, phase: 'failed', detail: msg } : prev)
      return
    }
    if (!res.ok || !res.body) {
      const j = (await res.json().catch(() => ({}))) as { error?: string; detail?: string }
      setActive(prev => prev ? {
        ...prev,
        phase: 'failed',
        detail: j.error ?? `HTTP ${res.status}`,
      } : prev)
      return
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
    let buffer = ''
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        const { events, remainder } = parseConsultationChunk(buffer)
        buffer = remainder
        for (const ev of events) {
          applyEvent(ev)
        }
      }
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      const msg = err instanceof Error ? err.message : String(err)
      setActive(prev => prev ? { ...prev, phase: 'failed', detail: msg } : prev)
    } finally {
      try { reader.releaseLock() } catch { /* ignore */ }
    }
  }

  function applyEvent(ev: ConsultationEvent) {
    setActive(prev => {
      if (!prev) return prev
      switch (ev.event) {
        case 'received':
          return { ...prev, id: ev.consultation_id, phase: 'received' }
        case 'risk_hint':
          return { ...prev, risk_keywords: ev.risk_keyword_hits.slice() }
        case 'still_generating':
          // Only show this if we haven't already started streaming.
          return prev.phase === 'received' ? { ...prev, phase: 'still_generating' } : prev
        case 'first_token':
          return { ...prev, phase: 'streaming', first_token_latency_ms: ev.first_token_latency_ms }
        case 'answer_chunk':
          return { ...prev, answer: prev.answer + ev.chunk }
        case 'completed':
          return {
            ...prev,
            phase: 'completed',
            total_latency_ms: ev.total_latency_ms,
            redactions_count: ev.redactions_count,
          }
        case 'timeout':
          return {
            ...prev,
            phase: 'timeout',
            fallback_text: ev.fallback_text,
            detail: ev.partial_answer_saved
              ? '已保留部分回答；建议稍后重试或保存问题继续处理。'
              : '回答未生成；建议稍后重试。',
          }
        case 'failed':
          return { ...prev, phase: 'failed', detail: ev.detail }
      }
    })
  }

  async function sendFeedback(
    type: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved',
  ) {
    if (!active || !active.id) return
    if (active.feedback_sent === type) return // already sent
    setActive(prev => prev ? { ...prev, feedback_sent: type, saved: type === 'saved' || prev.saved } : prev)
    try {
      const r = await fetch(`/api/consultation/${encodeURIComponent(active.id)}/feedback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ feedback: type }),
      })
      if (!r.ok) {
        const j = (await r.json().catch(() => ({}))) as { error?: string }
        setError(j.error ?? `反馈提交失败 HTTP ${r.status}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  async function saveQuestion() {
    if (!active || !active.id) return
    setActive(prev => prev ? { ...prev, saved: true } : prev)
    try {
      await fetch(`/api/consultation/${encodeURIComponent(active.id)}/save`, { method: 'POST' })
    } catch { /* ignore */ }
  }

  function reset() {
    abortRef.current?.abort()
    setActive(null)
    setQuestion('')
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-[12px] flex items-start gap-2 sticky top-0 z-10">
        <span aria-hidden>⚠️</span>
        <span><strong>{ALPHA_BANNER}</strong></span>
      </div>

      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-semibold leading-tight">在留咨询 · Alpha</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            TEBIQ 1.0 Alpha — 在留资格、入管、年金、税金、家族 / 配偶、解雇、公司清算等。
            说说你现在遇到的情况，我会帮你梳理方向。
          </p>
        </header>

        {!active && (
          <section>
            <form onSubmit={submit} className="space-y-3">
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                maxLength={4000}
                rows={6}
                placeholder="例：我是经管签，公司还没清算，能不能直接回国？"
                className="w-full p-3 text-sm border border-slate-300 rounded bg-white"
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{question.length} / 4000</span>
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="px-4 py-2 rounded bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
                >
                  开始咨询
                </button>
              </div>
              {error && (
                <p className="text-[12px] text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
              )}
            </form>
          </section>
        )}

        {active && (
          <section className="space-y-4">
            <div className="rounded border border-slate-200 bg-white p-3 text-sm">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">你的问题</p>
              <p className="mt-1 text-slate-800 leading-relaxed">{active.question}</p>
            </div>

            {active.risk_keywords.length > 0 && (
              <div className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-[12px] text-amber-900 leading-relaxed">
                {RISK_HINT_COPY}
                <span className="block mt-1 text-[10px] text-amber-700">
                  关键词：{active.risk_keywords.join(' · ')}
                </span>
              </div>
            )}

            <div className="rounded border border-slate-200 bg-white p-4">
              <div className="flex items-baseline gap-2">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">回答</p>
                <span className="text-[10px] text-slate-400">
                  {phaseLabel(active.phase)}
                </span>
              </div>
              <article className="mt-2 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap min-h-[6rem]">
                {active.phase === 'timeout' && active.fallback_text && (
                  <span className="block mb-2 text-amber-800">{active.fallback_text}</span>
                )}
                {active.answer}
                {active.phase === 'received' && '正在生成咨询方向…'}
                {active.phase === 'still_generating' && active.answer === '' && (
                  <span className="text-slate-500">回答还在生成，你可以继续等待，也可以稍后回来查看。</span>
                )}
                {active.phase === 'streaming' && (
                  <span className="inline-block w-2 h-4 ml-0.5 bg-slate-400 animate-pulse align-middle" />
                )}
              </article>
              {active.detail && active.phase !== 'streaming' && (
                <p className="mt-3 text-[12px] text-slate-500 italic">{active.detail}</p>
              )}
            </div>

            {active.phase === 'completed' && (
              <div className="space-y-3">
                <p className="text-[11px] text-slate-500">
                  这条回答有帮助吗？反馈会用于改进 1.0 Alpha。
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEEDBACK_BUTTONS.map(b => (
                    <button
                      key={b.type}
                      onClick={() => sendFeedback(b.type)}
                      disabled={active.feedback_sent !== null && active.feedback_sent !== b.type}
                      className={`px-3 py-1.5 rounded border text-[12px] ${
                        active.feedback_sent === b.type
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      } disabled:opacity-50`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 text-[11px] pt-2">
                  {!active.saved && (
                    <button
                      onClick={saveQuestion}
                      className="px-3 py-1.5 rounded border border-slate-400 bg-white hover:bg-slate-100"
                    >
                      保存到「我的咨询」
                    </button>
                  )}
                  {active.saved && (
                    <span className="px-3 py-1.5 rounded border border-emerald-300 bg-emerald-50 text-emerald-700">
                      已保存
                    </span>
                  )}
                  <a
                    href={`/c/${encodeURIComponent(active.id)}`}
                    className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100"
                  >
                    打开链接（可分享 / 收藏）
                  </a>
                  <button
                    onClick={reset}
                    className="ml-auto px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100"
                  >
                    再问一题
                  </button>
                </div>
              </div>
            )}

            {(active.phase === 'timeout' || active.phase === 'failed') && (
              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="px-3 py-1.5 rounded border border-slate-400 bg-white text-[12px] hover:bg-slate-100"
                >
                  重试 / 重新开始
                </button>
                {active.id && (
                  <button
                    onClick={saveQuestion}
                    className="px-3 py-1.5 rounded border border-slate-400 bg-white text-[12px] hover:bg-slate-100"
                  >
                    先保存这个问题
                  </button>
                )}
              </div>
            )}

            {active.phase === 'completed' && active.first_token_latency_ms != null && (
              <p className="text-[10px] text-slate-400">
                first_token={active.first_token_latency_ms}ms · total={active.total_latency_ms}ms
                {active.redactions_count != null && active.redactions_count > 0
                  ? ` · redactions=${active.redactions_count}`
                  : ''}
              </p>
            )}
          </section>
        )}

        <footer className="text-[11px] text-slate-500 pt-4 border-t border-slate-200 space-y-1">
          <p>这是 TEBIQ 1.0 Alpha — limited release，回答不是最终专业判断。</p>
          <p>涉及具体期限、手续、个案审查时，建议向行政書士或入管确认。</p>
          <p>
            <a href="/me/consultations" className="text-blue-600 hover:underline">
              查看我已保存的咨询 →
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}

function isTerminal(phase: Phase): boolean {
  return phase === 'completed' || phase === 'timeout' || phase === 'failed'
}

function phaseLabel(phase: Phase): string {
  switch (phase) {
    case 'idle': return ''
    case 'received': return '已收到 · 正在生成方向…'
    case 'streaming': return '生成中…'
    case 'still_generating': return '回答还在生成…'
    case 'completed': return '完成'
    case 'timeout': return '生成超时'
    case 'failed': return '生成失败'
  }
}
