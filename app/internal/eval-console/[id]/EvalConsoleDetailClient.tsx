'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  REGRESSION_SET,
  SAMPLE_CLASS_LABEL,
  annotationBlockReason,
  classifySample,
  extendedBadges,
  isAnnotationEligible,
  type SampleClass,
} from '@/lib/eval-lab/sample-classifier'
import { getRiskMatrixEntry } from '@/lib/eval-lab/risk-matrix-data'

// Per-question detail (Issue #26 §A3).
//
// Reads the same /api/internal/eval-lab/state endpoint as the parent
// console — keeps the no-new-API constraint from the Work Packet. We
// filter client-side to the requested question_id. For 100 questions
// this is fine; if the seed grows to thousands we'd add a single-id
// endpoint, but that's a future concern.

const REVIEWER = 'eval-round1'

type AnswerType = 'deepseek_raw' | 'tebiq_current'

interface QuestionRow {
  id: string
  question_text: string
  scenario: string | null
  starter_tag: string | null
  source: string
  active: boolean
  schema_version: string
  metadata_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

interface AnswerRow {
  id: string
  question_id: string
  answer_type: AnswerType
  model: string | null
  prompt_version: string | null
  answer_text: string | null
  tebiq_answer_id: string | null
  tebiq_answer_link: string | null
  engine_version: string | null
  status: string | null
  domain: string | null
  fallback_reason: string | null
  latency_ms: number | null
  error: string | null
  raw_payload_json: Record<string, unknown> | null
  schema_version: string
  created_at: string
}

interface StateResponse {
  ok: boolean
  questions: QuestionRow[]
  answers: AnswerRow[]
  error?: string
}

export default function EvalConsoleDetailClient({ questionId }: { questionId: string }) {
  const [question, setQuestion] = useState<QuestionRow | null>(null)
  const [tebiq, setTebiq] = useState<AnswerRow | null>(null)
  const [deepseek, setDeepseek] = useState<AnswerRow | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [notFound, setLocalNotFound] = useState(false)

  const fetchOne = useCallback(async (signal?: AbortSignal) => {
    try {
      const r = await fetch(
        `/api/internal/eval-lab/state?reviewer=${encodeURIComponent(REVIEWER)}`,
        { cache: 'no-store', signal },
      )
      if (!r.ok) {
        setLoadError(`HTTP ${r.status}`)
        return
      }
      const j = (await r.json()) as StateResponse
      if (!j.ok) {
        setLoadError(j.error ?? 'unknown')
        return
      }
      const q = j.questions.find(x => x.id === questionId)
      if (!q) {
        setLocalNotFound(true)
        return
      }
      setQuestion(q)
      const tebiqRow = j.answers.find(a => a.question_id === questionId && a.answer_type === 'tebiq_current') ?? null
      const dsRow = j.answers.find(a => a.question_id === questionId && a.answer_type === 'deepseek_raw') ?? null
      setTebiq(tebiqRow)
      setDeepseek(dsRow)
      setLoadError(null)
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      setLoadError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoaded(true)
    }
  }, [questionId])

  useEffect(() => {
    const ac = new AbortController()
    fetchOne(ac.signal)
    return () => ac.abort()
  }, [fetchOne])

  const sampleClass: SampleClass = useMemo(
    () => classifySample(tebiq, deepseek, question?.starter_tag ?? null),
    [tebiq, deepseek, question],
  )
  const riskEntry = useMemo(
    () => (question ? getRiskMatrixEntry(question.starter_tag) : null),
    [question],
  )
  const badges = useMemo(
    () => extendedBadges({
      sampleClass,
      riskLevel: riskEntry?.risk_level ?? null,
      handoff: riskEntry?.handoff ?? null,
    }),
    [sampleClass, riskEntry],
  )
  const annotationEligible = isAnnotationEligible(sampleClass)
  const annotationBlocked = annotationBlockReason(sampleClass)

  if (!loaded) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 font-mono text-sm text-slate-500">
        加载中…
      </div>
    )
  }
  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 font-mono">
        <p className="text-sm text-rose-700">题目 {questionId} 不存在或不在 active 列表。</p>
        <Link href="/internal/eval-console" className="text-[12px] text-blue-600 hover:underline mt-2 inline-block">
          返回 Eval Console
        </Link>
      </div>
    )
  }
  if (!question) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 font-mono">
        <p className="text-sm text-rose-700">数据加载失败：{loadError ?? 'unknown'}</p>
        <Link href="/internal/eval-console" className="text-[12px] text-blue-600 hover:underline mt-2 inline-block">
          返回 Eval Console
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <Link
          href="/internal/eval-console"
          className="text-[11px] px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
        >
          ← Eval Console
        </Link>
        <h1 className="text-base font-semibold">题目详情</h1>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          Issue #26 / §A3
        </span>
        {loadError && (
          <span className="text-xs text-orange-700">数据可能为缓存：{loadError}</span>
        )}
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Identity */}
        <section className="bg-white border border-slate-300 rounded p-4 space-y-2">
          <div className="flex flex-wrap items-baseline gap-2 text-[10px] uppercase tracking-wider text-slate-500">
            <span className="font-mono text-slate-700">{question.starter_tag ?? '—'}</span>
            {question.starter_tag && REGRESSION_SET.has(question.starter_tag) && (
              <span className="text-red-500">★ routing-regression-set</span>
            )}
            <span>·</span>
            <span>{question.scenario ?? '—'}</span>
            <span>·</span>
            <span>source={question.source}</span>
          </div>
          <p className="text-sm font-medium leading-snug text-slate-900">
            {question.question_text}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {badges.map(b => (
              <span key={b} className="px-1.5 py-0.5 rounded border border-slate-300 bg-slate-50 text-[10px] font-mono text-slate-600">
                {b}
              </span>
            ))}
            {badges.length === 0 && <span className="text-[10px] text-slate-300">无 badge</span>}
          </div>
        </section>

        {/* Annotation eligibility */}
        <section className={`border rounded p-3 ${
          annotationEligible
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : 'border-slate-300 bg-slate-50 text-slate-700'
        }`}>
          <div className="text-[10px] uppercase tracking-wider opacity-70">
            是否可进入正式 Eval（DOMAIN 标注）
          </div>
          <div className="text-sm font-semibold mt-0.5">
            {annotationEligible ? '✓ 可进入（FULL_COMPARABLE）' : '✗ 当前不可进入'}
          </div>
          {annotationBlocked && (
            <div className="text-[11px] mt-1">{annotationBlocked}</div>
          )}
          <div className="text-[10px] mt-1 opacity-70">
            sample_class = {SAMPLE_CLASS_LABEL[sampleClass]} · class_id = {sampleClass}
          </div>
        </section>

        {/* DOMAIN risk metadata */}
        <section className="bg-white border border-slate-300 rounded p-4">
          <h2 className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">
            DOMAIN-CC 风险初评（pre-eval, draft）
          </h2>
          {riskEntry ? (
            <dl className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-[12px]">
              <Field label="risk_level" value={riskEntry.risk_level} />
              <Field label="handoff_needed" value={riskEntry.handoff ?? 'null'} />
              <Field label="primary_domain" value={riskEntry.domain} />
            </dl>
          ) : (
            <p className="text-[11px] text-slate-400">该题不在 DOMAIN risk matrix 中（非 starter pack tag 或矩阵未覆盖）。</p>
          )}
          <p className="text-[10px] text-slate-400 mt-2">
            来源：docs/domain/DOMAIN_100Q_RISK_MATRIX.md（DOMAIN-CC v0.1，draft / 不视作最终结论）
          </p>
        </section>

        {/* TEBIQ output */}
        <section className="bg-white border border-slate-300 rounded p-4 space-y-2">
          <h2 className="text-[10px] uppercase tracking-wider text-slate-500">TEBIQ 当前输出</h2>
          {tebiq ? (
            <>
              <dl className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                <Field label="status" value={tebiq.status ?? '—'} />
                <Field label="domain" value={tebiq.domain ?? '—'} />
                <Field label="engine_version" value={tebiq.engine_version ?? '—'} />
                <Field label="fallback_reason" value={tebiq.fallback_reason ?? '—'} />
                <Field label="latency_ms" value={tebiq.latency_ms != null ? String(tebiq.latency_ms) : '—'} />
                <Field label="created_at" value={tebiq.created_at} />
              </dl>
              {tebiq.tebiq_answer_link && (
                <p className="text-[11px]">
                  <a
                    href={tebiq.tebiq_answer_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {tebiq.tebiq_answer_link}
                  </a>
                </p>
              )}
              {tebiq.error && (
                <p className="text-[11px] text-rose-700">err: {tebiq.error}</p>
              )}
              <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800 bg-slate-50 border border-slate-200 rounded p-3">
                {tebiq.answer_text ?? '（未生成 / 无文本）'}
              </pre>
              {tebiq.raw_payload_json && Object.keys(tebiq.raw_payload_json).length > 0 && (
                <details className="text-[11px]">
                  <summary className="cursor-pointer text-slate-500">raw_payload_json</summary>
                  <pre className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded overflow-x-auto">
                    {JSON.stringify(tebiq.raw_payload_json, null, 2)}
                  </pre>
                </details>
              )}
            </>
          ) : (
            <p className="text-[11px] text-slate-400">尚未生成 TEBIQ 输出。</p>
          )}
        </section>

        {/* DeepSeek output */}
        <section className="bg-white border border-slate-300 rounded p-4 space-y-2">
          <h2 className="text-[10px] uppercase tracking-wider text-slate-500">DeepSeek 裸答</h2>
          {deepseek ? (
            <>
              <dl className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                <Field label="model" value={deepseek.model ?? '—'} />
                <Field label="latency_ms" value={deepseek.latency_ms != null ? String(deepseek.latency_ms) : '—'} />
                <Field label="created_at" value={deepseek.created_at} />
              </dl>
              {deepseek.error && (
                <p className="text-[11px] text-rose-700">err: {deepseek.error}</p>
              )}
              <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800 bg-slate-50 border border-slate-200 rounded p-3">
                {deepseek.answer_text ?? '（未生成 / 无文本）'}
              </pre>
            </>
          ) : (
            <p className="text-[11px] text-slate-400">尚未生成 DeepSeek 裸答。</p>
          )}
        </section>

        <footer className="text-[10px] text-slate-400 pt-2">
          Internal-only · DB read-only · 不实时调用 DeepSeek
        </footer>
      </main>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="text-[10px] uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="text-[12px] text-slate-800 font-mono break-all">{value}</dd>
    </>
  )
}
