'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  STAGE_COPY,
  STAGE_TIMING,
  STAGE_TONE,
  SubmitTimeoutError,
  classifySubmitOutcome,
  withSubmitTimeout,
  type PreviewStage,
  type SubmitResult,
} from '@/lib/eval-lab/preview-stage'
import {
  SSE_TIMING,
  eventToStage,
  isTerminalEvent,
  parseSseChunk,
  type PreviewSseEvent,
} from '@/lib/eval-lab/preview-stream'

// TEBIQ Internal Preview — Track D Alpha + Workstream B Phase 1 (Issue #27).
//
// Stage-feedback state machine (non-streaming). User submits → page
// immediately transitions through:
//
//   received(0ms) → routing(+500ms) → risk_check(+500ms) → generating
//   ─→ final_answer | fallback | clarification_needed
//      | human_review_required | error
//
// Per Work Packet:
//   - 提交后 ≤1s 显示 received
//   - ≤3s 过渡到 routing → risk_check
//   - 25s timeout → 'error', not blank
//   - fallback / out_of_scope / regression-set → don't pretend it's a normal
//     answer; show the dedicated stage with explicit framing
//   - "⚠️ 内部预览" 标记必须显示
//   - High-risk 不得裸流 DS raw text — 我们仍然用 /api/questions
//     (TEBIQ pipeline) 而非直接调 DeepSeek，且 final_answer 路径会跳到
//     /answer/[id] 看的是受控 PublicAnswer，不是 DS raw

interface Scenario {
  starter_tag: string
  scenario_label: string
  question: string
  risk_note: string
}

const P0_SCENARIOS: Scenario[] = [
  { starter_tag: 'eval-lab-v1-J03', scenario_label: 'J · 边界 / 时限', question: '我签证快到期了，但材料还没准备好怎么办？', risk_note: '时限高风险 — TEBIQ 是否传达紧急性' },
  { starter_tag: 'eval-lab-v1-J04', scenario_label: 'J · 边界 / 突发', question: '我被公司解雇了，在留怎么办？', risk_note: '高风险突发 — 方向判断难' },
  { starter_tag: 'eval-lab-v1-J08', scenario_label: 'J · 边界 / 合规', question: '我的在留资格和现在实际工作不一致怎么办？', risk_note: '最常见被忽视的合规缺口' },
  { starter_tag: 'eval-lab-v1-I08', scenario_label: 'I · 离境 / 回国', question: '公司还没清算，我可以直接回国吗？', risk_note: '高风险决策 — TEBIQ 是否传达不能直接走' },
  { starter_tag: 'eval-lab-v1-D05', scenario_label: 'D · 家族 / 配偶', question: '日本人配偶签离婚后还能留在日本吗？', risk_note: '身份变化后路径选择' },
  { starter_tag: 'eval-lab-v1-D06', scenario_label: 'D · 家族 / 配偶', question: '配偶签离婚后多久要处理在留问题？', risk_note: '14 日届出 / 6 个月窗口' },
  { starter_tag: 'eval-lab-v1-D09', scenario_label: 'D · 家族 / 连带', question: '家人的在留资格跟我有关，我换签证会影响他们吗？', risk_note: '家族滞在连带风险' },
  { starter_tag: 'eval-lab-v1-F01', scenario_label: 'F · 入管 / 补材料', question: '入管让我补材料，但期限赶不上怎么办？', risk_note: '紧急时限 — 需主动联系入管' },
  { starter_tag: 'eval-lab-v1-F05', scenario_label: 'F · 入管 / 不许可', question: '收到不许可通知书怎么办？', risk_note: '结果理解 + 后续行动路径' },
  { starter_tag: 'eval-lab-v1-E01', scenario_label: 'E · 永住 / 年金', question: '永住申请前年金没交怎么办？', risk_note: '最高频质询点 — TEBIQ 是否要求进一步信息' },
]

interface ActiveSubmission {
  stage: PreviewStage
  question: string
  starter_tag: string | null
  /** Set on terminal states. final_answer carries answer_id for the link. */
  answer_id?: string | null
  /** Inline payload returned when no answer_id (rare clarification case). */
  inline?: { conclusion?: string; what_to_do?: string[] } | null
  /** Reviewer-facing detail surface (error code / fallback reason). */
  detail?: string | null
  started_at?: number
}

const TERMINAL: ReadonlySet<PreviewStage> = new Set<PreviewStage>([
  'final_answer',
  'fallback',
  'clarification_needed',
  'human_review_required',
  'error',
])

export default function PreviewClient() {
  const router = useRouter()
  const [active, setActive] = useState<ActiveSubmission | null>(null)
  const [freeInput, setFreeInput] = useState('')
  const [generalError, setGeneralError] = useState<string | null>(null)
  const stageTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cleanup any in-flight stage timers on unmount.
  useEffect(() => {
    const timers = stageTimers.current
    return () => {
      for (const t of timers) clearTimeout(t)
      if (redirectTimer.current) clearTimeout(redirectTimer.current)
    }
  }, [])

  const clearTimers = useCallback(() => {
    for (const t of stageTimers.current) clearTimeout(t)
    stageTimers.current = []
    if (redirectTimer.current) {
      clearTimeout(redirectTimer.current)
      redirectTimer.current = null
    }
  }, [])

  const setStage = useCallback((patch: Partial<ActiveSubmission>) => {
    setActive(prev => (prev ? { ...prev, ...patch } : prev))
  }, [])

  // Track whether the active submission is being driven by SSE (Phase 2)
  // or by the setTimeout fallback (Phase 1). Surfaced subtly in the UI so
  // QA can confirm which path ran.
  const [transport, setTransport] = useState<'sse' | 'phase1' | null>(null)

  /**
   * Phase 1 fallback path. Used when:
   *   - The SSE endpoint returns a non-200 (404 in non-Preview env, etc)
   *   - The browser doesn't expose a streaming-capable response.body
   *   - SSE connection fails before any event arrives
   *
   * This is the exact code path that shipped with PR #30, copy-pasted
   * here so we can call it from the Phase 2 catch handler without
   * losing the working behaviour.
   */
  const runPhase1 = useCallback(
    async (question: string, starterTag: string | null) => {
      setTransport('phase1')
      // Schedule the synthetic progression.
      stageTimers.current.push(
        setTimeout(() => setStage({ stage: 'routing' }), STAGE_TIMING.routing_delay_ms),
      )
      stageTimers.current.push(
        setTimeout(
          () => setStage({ stage: 'risk_check' }),
          STAGE_TIMING.routing_delay_ms + STAGE_TIMING.risk_check_delay_ms,
        ),
      )
      stageTimers.current.push(
        setTimeout(
          () => setStage({ stage: 'generating' }),
          STAGE_TIMING.routing_delay_ms + STAGE_TIMING.risk_check_delay_ms + 200,
        ),
      )

      try {
        const res = await withSubmitTimeout(
          fetch('/api/questions', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              question_text: question,
              visa_type: null,
              source_page: '/internal/preview',
            }),
          }),
        )
        const json = (await res.json().catch(() => null)) as SubmitResult | null
        clearTimers()

        if (!res.ok || !json) {
          setActive(prev => prev ? {
            ...prev,
            stage: 'error',
            detail: !res.ok ? `HTTP ${res.status}` : 'invalid JSON response',
          } : prev)
          return
        }

        const stage = classifySubmitOutcome(json, { question_text: question, starter_tag: starterTag })
        setActive(prev => prev ? {
          ...prev,
          stage,
          answer_id: json.answer_id ?? null,
          inline: json.action_answer ?? null,
          detail: stageDetail(stage, json),
        } : prev)

        if (stage === 'final_answer' && json.answer_id) {
          redirectTimer.current = setTimeout(() => {
            router.push(`/answer/${json.answer_id}`)
          }, 1200)
        }
      } catch (err) {
        clearTimers()
        const isTimeout = err instanceof SubmitTimeoutError
        setActive(prev => prev ? {
          ...prev,
          stage: 'error',
          detail: isTimeout
            ? `25s 超时 — 后端可能仍在处理，可稍后查 /my/archive 或重试`
            : (err instanceof Error ? err.message : String(err)),
        } : prev)
      }
    },
    [clearTimers, router, setStage],
  )

  /**
   * Phase 2 SSE path. POST to /api/internal/preview/stream and consume
   * the event stream until terminal. On connection failure (non-200,
   * unreadable body, no events received), fall back to Phase 1.
   */
  const runSse = useCallback(
    async (question: string, starterTag: string | null): Promise<void> => {
      // 25s soft client-side timeout — defensive belt-and-suspenders on top
      // of the server's identical SSE_TIMING.pipeline_timeout_ms. If the
      // stream goes silent (no events for 25s) we close it ourselves.
      const ac = new AbortController()
      const watchdog = setTimeout(() => ac.abort(), SSE_TIMING.pipeline_timeout_ms + 5_000)

      let res: Response
      try {
        res = await fetch('/api/internal/preview/stream', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question, starter_tag: starterTag }),
          signal: ac.signal,
        })
      } catch (err) {
        clearTimeout(watchdog)
        // Network-layer failure → fallback to Phase 1.
        console.warn('[preview/sse] connect failed, falling back to phase 1', err)
        await runPhase1(question, starterTag)
        return
      }
      if (!res.ok || !res.body) {
        clearTimeout(watchdog)
        // 4xx (e.g. 404 when EVAL_LAB_ENABLED unset) or no streaming body.
        console.warn('[preview/sse] non-streaming response, falling back', res.status)
        await runPhase1(question, starterTag)
        return
      }

      setTransport('sse')

      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
      let buffer = ''
      let receivedAny = false
      let terminated = false
      let answerId: string | null = null

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += value
          const { events, remainder } = parseSseChunk(buffer)
          buffer = remainder
          for (const event of events) {
            receivedAny = true
            applySseEvent(event)
            if (event.event === 'final_answer_ready') {
              answerId = event.answer_id
            } else if (event.event === 'human_review_required') {
              answerId = event.answer_id
            }
            if (isTerminalEvent(event)) {
              terminated = true
            }
          }
          if (terminated) break
        }
      } catch (err) {
        if (!receivedAny) {
          console.warn('[preview/sse] stream error before any event, falling back', err)
          clearTimeout(watchdog)
          await runPhase1(question, starterTag)
          return
        }
        // Stream broke mid-flight after we'd already advanced — keep
        // whatever stage we're at and surface error.
        setActive(prev => prev ? {
          ...prev,
          stage: 'error',
          detail: err instanceof Error ? err.message : String(err),
        } : prev)
      } finally {
        clearTimeout(watchdog)
        try { reader.releaseLock() } catch { /* ignore */ }
      }

      if (!receivedAny) {
        // Server returned 200 + empty body. Treat as no-stream and fall back.
        console.warn('[preview/sse] empty stream, falling back')
        await runPhase1(question, starterTag)
        return
      }

      // After final_answer terminal event, schedule the redirect.
      if (answerId) {
        const stageNow = currentStageRef.current
        if (stageNow === 'final_answer') {
          redirectTimer.current = setTimeout(() => {
            router.push(`/answer/${answerId}`)
          }, 1200)
        }
      }
    },
    // applySseEvent is stable (useCallback with [] deps below); keep
    // out of deps to avoid retriggering on every render. Same for
    // currentStageRef (a ref, not reactive).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, runPhase1],
  )

  /** Apply a single SSE event to the active submission state. */
  const applySseEvent = useCallback((event: PreviewSseEvent) => {
    setActive(prev => {
      if (!prev) return prev
      const next: ActiveSubmission = { ...prev }
      const newStage = eventToStage(event)
      if (newStage) {
        // Don't downgrade to an earlier stage if we somehow get reordered.
        if (shouldAdvance(prev.stage, newStage)) {
          next.stage = newStage
        }
      }
      switch (event.event) {
        case 'final_answer_ready':
          next.answer_id = event.answer_id
          next.detail = null
          break
        case 'human_review_required':
          next.answer_id = event.answer_id
          next.detail = humanReviewDetail(event.reason)
          break
        case 'fallback_triggered':
          next.detail = `fallback_reason = ${event.fallback_reason}`
          break
        case 'provider_timeout':
          next.detail = '25s 超时 — 后端可能仍在处理，可稍后查 /my/archive 或重试'
          break
        case 'error':
          next.detail = event.detail
          break
        default:
          break
      }
      return next
    })
  }, [])

  // Track current stage in a ref so we can read it from the SSE finalizer
  // without re-binding the callback.
  const currentStageRef = useRef<PreviewStage>('idle')
  useEffect(() => {
    currentStageRef.current = active?.stage ?? 'idle'
  }, [active?.stage])

  const submit = useCallback(
    async (question: string, starterTag: string | null) => {
      // Prevent overlapping submissions while one is mid-flight.
      if (active && !TERMINAL.has(active.stage)) return
      clearTimers()
      setGeneralError(null)
      setTransport(null)

      const startedAt = Date.now()
      setActive({
        stage: 'received',
        question,
        starter_tag: starterTag,
        started_at: startedAt,
      })

      // Try SSE first. runSse falls back to runPhase1 internally on any
      // connection-layer failure.
      await runSse(question, starterTag)
    },
    [active, clearTimers, runSse],
  )

  const reset = useCallback(() => {
    clearTimers()
    setActive(null)
    setGeneralError(null)
  }, [clearTimers])

  const onFreeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = freeInput.trim()
    if (!text) return
    if (active && !TERMINAL.has(active.stage)) return
    submit(text, null)
  }

  const inFlight = active && !TERMINAL.has(active.stage)
  const submissionLocked = !!active && !TERMINAL.has(active.stage)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      {/* B3 — internal preview banner (顶部，无法忽略) */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-2 text-[12px] flex items-start gap-2">
        <span aria-hidden>⚠️</span>
        <span>
          <strong>内部预览 / Internal Preview</strong> — 本页面为内部测试用途，回答结果不作为正式在留建议。
          高风险问题需要行政書士或入管确认。
        </span>
      </div>

      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">
          TEBIQ User Preview · 内部
        </h1>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          Track D · Workstream C / Issue #32 (SSE Phase 2)
        </span>
        {transport && (
          <span
            className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${
              transport === 'sse'
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-slate-300 bg-slate-50 text-slate-600'
            }`}
            title={transport === 'sse' ? 'SSE event stream active' : 'Phase 1 fallback (setTimeout)'}
          >
            transport: {transport}
          </span>
        )}
        <div className="ml-auto flex flex-wrap gap-2 text-[11px]">
          <a href="/internal/eval-console" className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100">
            Eval Console
          </a>
          <a href="/internal/eval-lab" className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100">
            Eval Lab 标注
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Active submission state machine panel */}
        {active && (
          <StagePanel
            active={active}
            onReset={reset}
            onRetry={() => submit(active.question, active.starter_tag)}
          />
        )}

        {/* P0 scenarios */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900">P0 场景快速入口</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            10 条高风险代表题。点「提问」会以该题文本提交到现有 /api/questions 路由，
            页面经过 received → routing → risk_check → generating 后进入终态。
            REGRESSION_SET 题目（★）固定走 human_review_required 路径，不裸出回答。
          </p>

          {generalError && (
            <p className="mt-2 px-3 py-2 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded">
              {generalError}
              <button onClick={() => setGeneralError(null)} className="ml-2 text-red-400" aria-label="dismiss">×</button>
            </p>
          )}

          <ul className="mt-3 space-y-2">
            {P0_SCENARIOS.map(s => {
              const submitting = active?.starter_tag === s.starter_tag && inFlight
              return (
                <li
                  key={s.starter_tag}
                  className="flex flex-wrap items-start gap-3 p-3 bg-white border border-slate-300 rounded"
                >
                  <div className="flex-1 min-w-[18rem]">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500">
                      <span className="font-mono">{s.starter_tag}</span>
                      <span>·</span>
                      <span>{s.scenario_label}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-snug mt-1">{s.question}</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      <span className="text-slate-400">风险点：</span>{s.risk_note}
                    </p>
                  </div>
                  <button
                    onClick={() => submit(s.question, s.starter_tag)}
                    disabled={submissionLocked}
                    className="text-[12px] px-3 py-1.5 border border-blue-400 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 self-start"
                  >
                    {submitting ? '提交中…' : '提问'}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Free input */}
        <section>
          <h2 className="text-sm font-semibold text-slate-900">自由输入</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            输入任意问题，提交后进入相同状态机。最多 4000 字。
          </p>
          <form onSubmit={onFreeSubmit} className="mt-3 space-y-2">
            <textarea
              value={freeInput}
              onChange={e => setFreeInput(e.target.value)}
              maxLength={4000}
              rows={4}
              placeholder="例：经管签搬办公室要通知哪里？"
              className="w-full p-3 text-sm border border-slate-300 rounded font-sans bg-white"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submissionLocked || !freeInput.trim()}
                className="text-[12px] px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
              >
                {active?.starter_tag === null && inFlight ? '提交中…' : '提交'}
              </button>
              <span className="text-[11px] text-slate-400">{freeInput.length} / 4000</span>
            </div>
          </form>
        </section>

        <footer className="text-[10px] text-slate-400 pt-4 border-t border-slate-200">
          Internal-only · EVAL_LAB_ENABLED gate · 不嵌入 DeepSeek raw · 不改 Prompt / 路由 / 回答页 UI
        </footer>
      </main>
    </div>
  )
}

// ---------- subcomponents ----------

function StagePanel({
  active,
  onReset,
  onRetry,
}: {
  active: ActiveSubmission
  onReset: () => void
  onRetry: () => void
}) {
  const tone = STAGE_TONE[active.stage]
  const toneCls =
    tone === 'success' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' :
    tone === 'warning' ? 'border-amber-300 bg-amber-50 text-amber-900' :
    tone === 'danger' ? 'border-red-300 bg-red-50 text-red-900' :
    tone === 'progress' ? 'border-blue-300 bg-blue-50 text-blue-900' :
    'border-slate-300 bg-white text-slate-800'

  const elapsed = active.started_at != null
    ? Math.round((Date.now() - active.started_at) / 100) / 10
    : null

  return (
    <section className={`border rounded p-4 ${toneCls}`}>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-[10px] uppercase tracking-wider opacity-70">状态</span>
        <span className="text-base font-semibold">{stageBadge(active.stage)}</span>
        {elapsed != null && active.stage !== 'final_answer' && (
          <span className="text-[10px] opacity-60">~{elapsed}s</span>
        )}
        {active.starter_tag && (
          <span className="ml-auto text-[10px] font-mono opacity-60">{active.starter_tag}</span>
        )}
      </div>

      <p className="mt-1 text-[12px] leading-snug">{STAGE_COPY[active.stage]}</p>

      {active.detail && (
        <p className="mt-2 text-[11px] opacity-80">{active.detail}</p>
      )}

      {/* Inline answer for clarification with no answer_id (rare). */}
      {active.stage === 'clarification_needed' && active.inline?.what_to_do && active.inline.what_to_do.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-[12px] space-y-1">
          {active.inline.what_to_do.slice(0, 5).map(q => <li key={q}>{q}</li>)}
        </ul>
      )}

      {/* Action affordances per terminal state */}
      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
        {active.stage === 'final_answer' && active.answer_id && (
          <a
            href={`/answer/${active.answer_id}`}
            className="px-2 py-1 border border-emerald-400 rounded bg-white hover:bg-emerald-100"
          >
            打开回答页 →
          </a>
        )}
        {active.stage === 'final_answer' && !active.answer_id && (
          <span className="text-[11px] opacity-70">提交成功但无 answer_id（罕见）— 检查 /my/archive</span>
        )}
        {(active.stage === 'fallback' || active.stage === 'human_review_required' || active.stage === 'clarification_needed') && active.answer_id && (
          <a
            href={`/answer/${active.answer_id}`}
            className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
          >
            打开回答页（仅供参考）
          </a>
        )}
        {active.stage === 'error' && (
          <button
            onClick={onRetry}
            className="px-2 py-1 border border-red-300 rounded bg-white text-red-700 hover:bg-red-50"
          >
            重试
          </button>
        )}
        <button
          onClick={onReset}
          className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100 ml-auto"
        >
          关闭
        </button>
      </div>

      {/* Fallback explicit framing — never pretend the answer is正式 */}
      {active.stage === 'fallback' && (
        <p className="mt-3 text-[11px] italic opacity-80">
          ⚠ 当前为降级回答，仅供参考，不代表 TEBIQ 正式判断。请等 LLM 恢复后重试。
        </p>
      )}
      {active.stage === 'human_review_required' && (
        <p className="mt-3 text-[11px] italic opacity-80">
          建议直接联系行政書士 / 入管 / 区役所确认；自动回答在此类高风险场景下不充分。
        </p>
      )}
    </section>
  )
}

function stageBadge(stage: PreviewStage): string {
  switch (stage) {
    case 'idle': return '—'
    case 'received': return '已收到'
    case 'routing': return '正在确认事项类型'
    case 'risk_check': return '正在检查风险'
    case 'generating': return '正在生成回答'
    case 'final_answer': return '回答已就绪'
    case 'fallback': return '降级回答（仅供参考）'
    case 'clarification_needed': return '需要补充信息'
    case 'human_review_required': return '建议人工确认'
    case 'error': return '生成失败'
  }
}

function stageDetail(stage: PreviewStage, result: SubmitResult): string | null {
  switch (stage) {
    case 'fallback':
      return `fallback_reason = ${result.fallback_reason ?? '未知'}`
    case 'human_review_required':
      if (result.status === 'out_of_scope') return 'TEBIQ 路由判定为 out_of_scope（高风险题强制人工确认）'
      return 'REGRESSION_SET 题目 — Routing Safety Gate v1 修复后仍按人工确认对待'
    case 'clarification_needed':
      return result.action_answer?.conclusion ?? null
    case 'final_answer':
      return null
    case 'error': {
      const errMsg = typeof result.error === 'string' ? result.error : (result.error?.message ?? null)
      return errMsg
    }
    default:
      return null
  }
}

/** Phase 2 — translate the SSE human_review_required reason to user copy. */
function humanReviewDetail(reason: 'regression_set' | 'high_risk_matrix' | 'out_of_scope'): string {
  switch (reason) {
    case 'regression_set':
      return 'REGRESSION_SET 题目 — Routing Safety Gate v1 修复后仍按人工确认对待'
    case 'high_risk_matrix':
      return 'DOMAIN-CC 标记为 HIGH risk — 强制走人工确认路径'
    case 'out_of_scope':
      return 'TEBIQ 路由判定为 out_of_scope — 强制走人工确认路径'
  }
}

/**
 * Phase 2 — guard against out-of-order SSE events demoting the visible
 * stage. Stages are loosely ordered:
 *   idle < received < routing < risk_check < generating < (terminals)
 * Any terminal can replace any non-terminal. Non-terminals only advance
 * forward (don't go from generating back to routing if a delayed
 * routing_done arrives).
 */
function shouldAdvance(current: PreviewStage, next: PreviewStage): boolean {
  const order: Record<PreviewStage, number> = {
    idle: 0,
    received: 1,
    routing: 2,
    risk_check: 3,
    generating: 4,
    final_answer: 9,
    fallback: 9,
    clarification_needed: 9,
    human_review_required: 9,
    error: 9,
  }
  return order[next] >= order[current]
}
