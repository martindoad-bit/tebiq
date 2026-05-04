'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BADGE_LABEL,
  REGRESSION_SET,
  SAMPLE_CLASS_LABEL,
  SAMPLE_CLASS_TONE,
  classifySample,
  extendedBadges,
  type ExtendedBadge,
  type SampleClass,
} from '@/lib/eval-lab/sample-classifier'
import {
  DEEPSEEK_IMPACT,
  inferDeepseekHealth,
  type ProviderStatus,
} from '@/lib/eval-lab/provider-health'
import { getRiskMatrixEntry } from '@/lib/eval-lab/risk-matrix-data'

// TEBIQ Eval Console v1 — M1 deliverable, Issue #19.
//
// 100-question status overview + per-row rerun. Read-mostly: pulls from
// /api/internal/eval-lab/state, classifies each row client-side, rolls up
// the headline stats, and offers single-question rerun via the existing
// tebiq-answer / deepseek-raw POST routes.
//
// This page is INTENTIONALLY separate from /internal/eval-lab. The
// existing eval-lab page is the annotation tool (3-column layout focused
// on reviewer workflow); this page is a status console. They share the
// same data source.

// ---------- types (snake_case as returned by /state) ----------

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
  schema_version: string
  reviewer: string
  questions: QuestionRow[]
  answers: AnswerRow[]
  // annotations are returned by /state but the console doesn't render
  // them; we accept-and-ignore to avoid breaking on schema additions.
  annotations?: unknown
  error?: string
}

interface AnswerSlot {
  deepseek_raw?: AnswerRow
  tebiq_current?: AnswerRow
}

type RerunKind = 'tebiq' | 'deepseek'
type RerunState = 'idle' | 'running' | 'failed'

// ---------- console reviewer key ----------

// Per Work Packet, the console fetches with reviewer=eval-round1. This
// only affects which annotation rows come back (which we don't render).
const REVIEWER = 'eval-round1'

// ---------- component ----------

export default function EvalConsoleClient() {
  const [questions, setQuestions] = useState<QuestionRow[]>([])
  const [answers, setAnswers] = useState<Record<string, AnswerSlot>>({})
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [rerun, setRerun] = useState<Record<string, { tebiq: RerunState; deepseek: RerunState }>>({})
  const [classFilter, setClassFilter] = useState<SampleClass | 'all'>('all')
  const [scenarioFilter, setScenarioFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [riskFilter, setRiskFilter] = useState<'all' | 'HIGH' | 'MEDIUM' | 'LOW'>('all')
  const [sortBy, setSortBy] = useState<'tag' | 'class' | 'risk'>('tag')

  // ---- data load ----

  const fetchState = useCallback(async (signal?: AbortSignal): Promise<void> => {
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
      setQuestions(j.questions)
      const next: Record<string, AnswerSlot> = {}
      for (const a of j.answers) {
        const slot = next[a.question_id] ?? {}
        slot[a.answer_type] = a
        next[a.question_id] = slot
      }
      setAnswers(next)
      setLoadError(null)
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') return
      setLoadError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    fetchState(ac.signal)
    return () => ac.abort()
  }, [fetchState])

  // ---- per-row rerun ----

  const setRerunState = useCallback(
    (questionId: string, kind: RerunKind, state: RerunState) => {
      setRerun(prev => {
        const cur = prev[questionId] ?? { tebiq: 'idle', deepseek: 'idle' }
        return { ...prev, [questionId]: { ...cur, [kind]: state } }
      })
    },
    [],
  )

  /**
   * Refresh a single question's answer rows by refetching the entire /state.
   * Cheap for ~100 questions; avoids new endpoints per Work Packet ("不需要
   * 新的 API 端点").
   */
  const refreshAfterRerun = useCallback(async () => {
    await fetchState()
  }, [fetchState])

  const rerunOne = useCallback(
    async (q: QuestionRow, kind: RerunKind) => {
      setRerunState(q.id, kind, 'running')
      const path = kind === 'tebiq'
        ? '/api/internal/eval-lab/tebiq-answer'
        : '/api/internal/eval-lab/deepseek-raw'
      try {
        const r = await fetch(path, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: q.question_text, question_id: q.id }),
        })
        const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string }
        if (!j.ok) {
          setRerunState(q.id, kind, 'failed')
          return
        }
        // Server persisted; pull the fresh row back.
        await refreshAfterRerun()
        setRerunState(q.id, kind, 'idle')
      } catch (err) {
        // Network / CORS / timeout from this fetch (NOT the upstream pipeline)
        console.warn('[eval-console] rerun fetch failed', err)
        setRerunState(q.id, kind, 'failed')
      }
    },
    [refreshAfterRerun, setRerunState],
  )

  // ---- derived ----

  const scenarios = useMemo(() => {
    const set = new Set<string>()
    for (const q of questions) if (q.scenario) set.add(q.scenario)
    return Array.from(set).sort()
  }, [questions])

  /** Per-question sample class. */
  const classByQuestion = useMemo(() => {
    const map: Record<string, SampleClass> = {}
    for (const q of questions) {
      const slot = answers[q.id]
      map[q.id] = classifySample(slot?.tebiq_current, slot?.deepseek_raw, q.starter_tag)
    }
    return map
  }, [questions, answers])

  const stats = useMemo(() => {
    const total = questions.length
    let tebiqAnswered = 0
    let dsAnswered = 0
    let full = 0
    let fallback = 0
    let routing = 0
    let oos = 0
    let dsFailed = 0
    let invalid = 0
    let none = 0
    for (const q of questions) {
      const slot = answers[q.id]
      if (slot?.tebiq_current?.answer_text) tebiqAnswered += 1
      if (slot?.deepseek_raw?.answer_text) dsAnswered += 1
      switch (classByQuestion[q.id]) {
        case 'FULL_COMPARABLE': full += 1; break
        case 'TEBIQ_FALLBACK': fallback += 1; break
        case 'TEBIQ_ROUTING_FAILURE': routing += 1; break
        case 'TEBIQ_OOS': oos += 1; break
        case 'DS_FAILED': dsFailed += 1; break
        case 'INVALID': invalid += 1; break
        case 'NONE': none += 1; break
      }
    }
    return { total, tebiqAnswered, dsAnswered, full, fallback, routing, oos, dsFailed, invalid, none }
  }, [questions, answers, classByQuestion])

  // Provider health (DB-inferred, no live DS call).
  const providerHealth = useMemo(() => {
    const flat: { answer_type: 'deepseek_raw' | 'tebiq_current'; answer_text: string | null; error: string | null; created_at: string }[] = []
    for (const slot of Object.values(answers)) {
      if (slot.deepseek_raw) flat.push(slot.deepseek_raw)
      if (slot.tebiq_current) flat.push(slot.tebiq_current)
    }
    return inferDeepseekHealth(flat)
  }, [answers])

  // Latest batch metadata (last_run_at = max created_at across all answer rows).
  const batchInfo = useMemo(() => {
    let latestTimestamp = 0
    let totalAnswerRows = 0
    for (const slot of Object.values(answers)) {
      for (const r of [slot.deepseek_raw, slot.tebiq_current]) {
        if (!r) continue
        totalAnswerRows += 1
        const t = Date.parse(r.created_at)
        if (Number.isFinite(t) && t > latestTimestamp) latestTimestamp = t
      }
    }
    return {
      last_run_at: latestTimestamp > 0 ? new Date(latestTimestamp).toISOString() : null,
      total_answer_rows: totalAnswerRows,
    }
  }, [answers])

  const filteredSorted = useMemo(() => {
    const RISK_ORDER: Record<'HIGH' | 'MEDIUM' | 'LOW', number> = { HIGH: 0, MEDIUM: 1, LOW: 2 }
    let list = questions.slice()
    if (classFilter !== 'all') {
      list = list.filter(q => classByQuestion[q.id] === classFilter)
    }
    if (scenarioFilter !== 'all') {
      list = list.filter(q => q.scenario === scenarioFilter)
    }
    if (statusFilter !== 'all') {
      list = list.filter(q => {
        const t = answers[q.id]?.tebiq_current
        return (t?.status ?? 'none') === statusFilter
      })
    }
    if (riskFilter !== 'all') {
      list = list.filter(q => {
        const e = getRiskMatrixEntry(q.starter_tag)
        return e?.risk_level === riskFilter
      })
    }
    if (sortBy === 'tag') {
      list.sort((a, b) => (a.starter_tag ?? '').localeCompare(b.starter_tag ?? ''))
    } else if (sortBy === 'class') {
      list.sort((a, b) => {
        const ca = classByQuestion[a.id] ?? 'NONE'
        const cb = classByQuestion[b.id] ?? 'NONE'
        return ca.localeCompare(cb)
      })
    } else if (sortBy === 'risk') {
      list.sort((a, b) => {
        const ra = getRiskMatrixEntry(a.starter_tag)?.risk_level
        const rb = getRiskMatrixEntry(b.starter_tag)?.risk_level
        const oa = ra ? RISK_ORDER[ra] : 99
        const ob = rb ? RISK_ORDER[rb] : 99
        if (oa !== ob) return oa - ob
        return (a.starter_tag ?? '').localeCompare(b.starter_tag ?? '')
      })
    }
    return list
  }, [questions, answers, classByQuestion, classFilter, scenarioFilter, statusFilter, riskFilter, sortBy])

  // ---- render ----
  //
  // DS-down protection (Issue #26 §A5):
  //   - Initial load shows a skeleton, NOT an infinite spinner / blank.
  //   - If /state errored AND we have no questions → show a contained
  //     error banner with retry, but still render header + health panel
  //     (which can run from cached data even if /state is down).
  //   - If /state errored AND we have cached questions → keep rendering
  //     the table; surface "数据加载失败，显示最近缓存" inline.

  if (!loaded) {
    return <ConsoleSkeleton />
  }

  const hasNoData = questions.length === 0
  const stale = !!loadError

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">
          TEBIQ Eval Console · 内部
        </h1>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          v2 · Workstream A / Issue #26
        </span>
        {loadError && (
          <span className="text-xs text-red-600">
            数据加载失败，{hasNoData ? '尚无缓存可显示' : '显示最近缓存'}：{loadError}
            <button
              onClick={() => { setLoaded(false); fetchState() }}
              className="ml-2 px-1.5 py-0.5 border border-red-300 rounded bg-white text-red-600 text-[10px]"
            >
              重试
            </button>
          </span>
        )}
        <div className="ml-auto flex flex-wrap gap-2 text-[11px]">
          <a
            href="/internal/eval-lab"
            className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
          >
            打开 Eval Lab 标注
          </a>
          <a
            href="/api/internal/eval-lab/export?type=full"
            className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
          >
            导出完整 JSON
          </a>
        </div>
      </header>

      {/* Provider health (DB-inferred, no live DS call) */}
      <section className="px-3 pt-3">
        <ProviderHealthPanel health={providerHealth} stale={stale} />
      </section>

      {/* Batch status row */}
      <section className="px-3 pt-2">
        <BatchStatusBar
          stats={stats}
          lastRunAt={batchInfo.last_run_at}
          totalAnswerRows={batchInfo.total_answer_rows}
        />
      </section>

      {/* Stats cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 p-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="TEBIQ 答案" value={stats.tebiqAnswered} note={`${pct(stats.tebiqAnswered, stats.total)}%`} />
        <StatCard label="DeepSeek 答案" value={stats.dsAnswered} note={`${pct(stats.dsAnswered, stats.total)}%`} />
        <StatCard label="FULL_COMPARABLE" value={stats.full} tone="green" />
        <StatCard label="TEBIQ Fallback" value={stats.fallback} tone="orange" />
        <StatCard label="Routing Failure" value={stats.routing} tone="red" />
        <StatCard label="OOS Sample" value={stats.oos} tone="amber" />
        <StatCard label="DS Failed" value={stats.dsFailed} tone="yellow" />
      </section>

      {/* Filters */}
      <section className="px-3 pb-2 flex flex-wrap items-center gap-2 text-xs">
        <FilterSelect
          label="分类"
          value={classFilter}
          onChange={v => setClassFilter(v as SampleClass | 'all')}
          options={[
            ['all', '全部'],
            ['FULL_COMPARABLE', 'FULL_COMPARABLE'],
            ['TEBIQ_FALLBACK', 'TEBIQ_FALLBACK'],
            ['TEBIQ_ROUTING_FAILURE', 'TEBIQ_ROUTING_FAILURE'],
            ['TEBIQ_OOS', 'TEBIQ_OOS'],
            ['DS_FAILED', 'DS_FAILED'],
            ['INVALID', 'INVALID'],
            ['NONE', 'NONE'],
          ]}
        />
        {scenarios.length > 0 && (
          <FilterSelect
            label="场景"
            value={scenarioFilter}
            onChange={setScenarioFilter}
            options={[
              ['all', '全部'],
              ...scenarios.map(s => [s, s] as [string, string]),
            ]}
          />
        )}
        <FilterSelect
          label="TEBIQ status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            ['all', '全部'],
            ['direct_answer', 'direct_answer'],
            ['preliminary', 'preliminary'],
            ['clarification_needed', 'clarification'],
            ['out_of_scope', 'out_of_scope'],
            ['none', '未生成'],
          ]}
        />
        <FilterSelect
          label="risk"
          value={riskFilter}
          onChange={v => setRiskFilter(v as 'all' | 'HIGH' | 'MEDIUM' | 'LOW')}
          options={[
            ['all', '全部'],
            ['HIGH', 'HIGH (P0)'],
            ['MEDIUM', 'MEDIUM (P1)'],
            ['LOW', 'LOW'],
          ]}
        />
        <FilterSelect
          label="排序"
          value={sortBy}
          onChange={v => setSortBy(v as 'tag' | 'class' | 'risk')}
          options={[
            ['tag', 'starter_tag'],
            ['class', 'sample class'],
            ['risk', 'risk_level'],
          ]}
        />
        <span className="ml-auto text-slate-500">显示 {filteredSorted.length} / {questions.length}</span>
      </section>

      {/* Table */}
      <section className="px-3 pb-6">
        <div className="bg-white border border-slate-300 rounded overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead className="bg-slate-100 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left px-2 py-2">starter_tag</th>
                <th className="text-left px-2 py-2">scenario</th>
                <th className="text-left px-2 py-2">题目</th>
                <th className="text-left px-2 py-2">TEBIQ status</th>
                <th className="text-left px-2 py-2">fallback_reason</th>
                <th className="text-left px-2 py-2">DS</th>
                <th className="text-left px-2 py-2">分类</th>
                <th className="text-left px-2 py-2">badges</th>
                <th className="text-left px-2 py-2">详情</th>
                <th className="text-left px-2 py-2 whitespace-nowrap">重跑</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSorted.map(q => {
                const slot = answers[q.id]
                const tebiq = slot?.tebiq_current
                const ds = slot?.deepseek_raw
                const cls = classByQuestion[q.id] ?? 'NONE'
                const r = rerun[q.id] ?? { tebiq: 'idle' as RerunState, deepseek: 'idle' as RerunState }
                const riskEntry = getRiskMatrixEntry(q.starter_tag)
                const badges = extendedBadges({
                  sampleClass: cls,
                  riskLevel: riskEntry?.risk_level ?? null,
                  handoff: riskEntry?.handoff ?? null,
                })
                return (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="px-2 py-1.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {q.starter_tag ?? '-'}
                      {q.starter_tag && REGRESSION_SET.has(q.starter_tag) && (
                        <span title="routing regression set" className="ml-1 text-[9px] text-red-500">★</span>
                      )}
                    </td>
                    <td className="px-2 py-1.5">
                      <ScenarioBadge scenario={q.scenario} />
                    </td>
                    <td className="px-2 py-1.5 max-w-[24rem]">
                      <span title={q.question_text} className="block truncate">
                        {truncate(q.question_text, 80)}
                      </span>
                    </td>
                    <td className="px-2 py-1.5">
                      <TebiqStatusBadge tebiq={tebiq} />
                    </td>
                    <td className="px-2 py-1.5">
                      <FallbackBadge reason={tebiq?.fallback_reason ?? null} />
                    </td>
                    <td className="px-2 py-1.5">
                      <DsBadge ds={ds} />
                    </td>
                    <td className="px-2 py-1.5">
                      <ClassBadge cls={cls} />
                    </td>
                    <td className="px-2 py-1.5">
                      <div className="flex flex-wrap gap-1">
                        {badges.map(b => <BadgeChip key={b} badge={b} />)}
                        {badges.length === 0 && <span className="text-[10px] text-slate-300">-</span>}
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      <Link
                        href={`/internal/eval-console/${encodeURIComponent(q.id)}`}
                        className="text-[10px] text-blue-600 hover:underline"
                      >
                        打开
                      </Link>
                    </td>
                    <td className="px-2 py-1.5 whitespace-nowrap">
                      <RerunButtons
                        cls={cls}
                        rerun={r}
                        tebiqHasAnswer={!!tebiq?.answer_text}
                        dsHasAnswer={!!ds?.answer_text}
                        onTebiq={() => rerunOne(q, 'tebiq')}
                        onDeepseek={() => rerunOne(q, 'deepseek')}
                      />
                    </td>
                  </tr>
                )
              })}
              {filteredSorted.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-2 py-6 text-center text-slate-400">
                    {hasNoData
                      ? '尚无问题数据。如果 EVAL_LAB_ENABLED=1 但页面空白，检查 /api/internal/eval-lab/state 是否可达。'
                      : '没有匹配的题目'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

// ---------- subcomponents ----------

function ConsoleSkeleton() {
  // Skeleton — NOT an infinite spinner. Shows a gray approximation of the
  // health panel + table so the page never appears blank while /state
  // resolves. Per Issue #26 §A5.
  return (
    <div className="min-h-screen bg-slate-50 p-3 font-mono">
      <div className="bg-white border border-slate-200 rounded p-3 mb-3">
        <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
        <div className="mt-2 h-3 w-72 bg-slate-100 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 mb-3">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-14 bg-white border border-slate-200 rounded animate-pulse" />
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="h-7 border-b border-slate-100 last:border-b-0 animate-pulse" />
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-400">加载中…（不调用 DeepSeek，仅读 DB 缓存）</p>
    </div>
  )
}

function ProviderHealthPanel({
  health,
  stale,
}: {
  health: { status: ProviderStatus; last_checked_at: string | null; sample_size: number }
  stale: boolean
}) {
  const tone =
    health.status === 'healthy' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' :
    health.status === 'timeout' ? 'border-orange-300 bg-orange-50 text-orange-800' :
    health.status === 'unavailable' ? 'border-red-300 bg-red-50 text-red-800' :
    'border-slate-300 bg-white text-slate-600'
  const label =
    health.status === 'healthy' ? 'healthy' :
    health.status === 'timeout' ? 'timeout' :
    health.status === 'unavailable' ? 'unavailable' :
    'unknown'
  return (
    <div className={`border rounded p-3 ${tone}`}>
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-[10px] uppercase tracking-wider opacity-70">DeepSeek API</span>
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-[10px] opacity-70">
          last_checked_at: {health.last_checked_at ?? '—'} · sample_size: {health.sample_size}
        </span>
        {stale && (
          <span className="text-[10px] opacity-70 italic">（缓存数据，/state 当前不可达）</span>
        )}
      </div>
      <div className="mt-2 grid md:grid-cols-2 gap-2 text-[11px]">
        <div>
          <div className="opacity-70">影响范围（阻塞）</div>
          <ul className="list-disc pl-4">
            {DEEPSEEK_IMPACT.blocked.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
        <div>
          <div className="opacity-70">不阻塞</div>
          <ul className="list-disc pl-4">
            {DEEPSEEK_IMPACT.not_blocked.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </div>
      <p className="mt-2 text-[10px] opacity-60">
        状态从最近 24h 内 \`eval_answers.deepseek_raw\` 行推断（不实时调用 DeepSeek）。
      </p>
    </div>
  )
}

interface BatchBarStats {
  total: number
  tebiqAnswered: number
  full: number
  fallback: number
  routing: number
  oos: number
  dsFailed: number
  invalid: number
  none: number
}

function BatchStatusBar({
  stats,
  lastRunAt,
  totalAnswerRows,
}: {
  stats: BatchBarStats
  lastRunAt: string | null
  totalAnswerRows: number
}) {
  return (
    <div className="bg-white border border-slate-300 rounded p-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
      <span className="text-slate-500 font-mono">
        last_run_at: <span className="text-slate-800">{lastRunAt ?? '—'}</span>
      </span>
      <span className="text-slate-500 font-mono">
        answer_rows: <span className="text-slate-800">{totalAnswerRows}</span>
      </span>
      <span className="text-slate-500 font-mono">
        TEBIQ generated: <span className="text-slate-800">{stats.tebiqAnswered}/{stats.total}</span>
      </span>
      <span className="text-emerald-700 font-mono">
        FULL: <span className="font-semibold">{stats.full}</span>
      </span>
      <span className="text-orange-700 font-mono">
        FALLBACK: <span className="font-semibold">{stats.fallback}</span>
      </span>
      <span className="text-red-700 font-mono">
        ROUTING: <span className="font-semibold">{stats.routing}</span>
      </span>
      <span className="text-amber-700 font-mono">
        OOS: <span className="font-semibold">{stats.oos}</span>
      </span>
      <span className="text-yellow-700 font-mono">
        DS_FAIL: <span className="font-semibold">{stats.dsFailed}</span>
      </span>
      <span className="text-rose-700 font-mono">
        INVALID: <span className="font-semibold">{stats.invalid}</span>
      </span>
      <span className="text-slate-500 font-mono">
        BLOCKED: <span className="font-semibold">{stats.total - stats.full}</span>
      </span>
    </div>
  )
}

function BadgeChip({ badge }: { badge: ExtendedBadge }) {
  const tone =
    badge === 'p0_candidate' ? 'border-red-300 bg-red-50 text-red-700' :
    badge === 'p1_candidate' ? 'border-orange-300 bg-orange-50 text-orange-700' :
    badge === 'domain_review_needed' ? 'border-purple-300 bg-purple-50 text-purple-700' :
    'border-slate-300 bg-slate-50 text-slate-600'
  return (
    <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono ${tone}`} title={badge}>
      {BADGE_LABEL[badge]}
    </span>
  )
}

function StatCard({
  label,
  value,
  note,
  tone,
}: {
  label: string
  value: number
  note?: string
  tone?: 'green' | 'orange' | 'red' | 'amber' | 'yellow'
}) {
  const toneCls =
    tone === 'green' ? 'border-emerald-300 bg-emerald-50 text-emerald-800' :
    tone === 'orange' ? 'border-orange-300 bg-orange-50 text-orange-800' :
    tone === 'red' ? 'border-red-300 bg-red-50 text-red-800' :
    tone === 'amber' ? 'border-amber-300 bg-amber-50 text-amber-800' :
    tone === 'yellow' ? 'border-yellow-300 bg-yellow-50 text-yellow-800' :
    'border-slate-300 bg-white text-slate-800'
  return (
    <div className={`border rounded p-2 ${toneCls}`}>
      <div className="text-[9px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="text-base font-semibold leading-tight">{value}</div>
      {note && <div className="text-[10px] opacity-70">{note}</div>}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: Array<[string, string]>
}) {
  return (
    <label className="flex items-center gap-1">
      <span className="text-slate-500 text-[10px] uppercase tracking-wider">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border border-slate-300 rounded px-1 py-0.5 text-[11px] bg-white"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  )
}

function ScenarioBadge({ scenario }: { scenario: string | null }) {
  if (!scenario) return <span className="text-slate-300">-</span>
  // First char A-J — pick a stable colour per group.
  const first = scenario.charAt(0).toUpperCase()
  const tone = SCENARIO_COLORS[first] ?? 'bg-slate-100 text-slate-700 border-slate-200'
  return (
    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${tone}`} title={scenario}>
      {first}
    </span>
  )
}

const SCENARIO_COLORS: Record<string, string> = {
  A: 'bg-blue-50 text-blue-700 border-blue-200',
  B: 'bg-purple-50 text-purple-700 border-purple-200',
  C: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  D: 'bg-pink-50 text-pink-700 border-pink-200',
  E: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  F: 'bg-amber-50 text-amber-700 border-amber-200',
  G: 'bg-lime-50 text-lime-700 border-lime-200',
  H: 'bg-violet-50 text-violet-700 border-violet-200',
  I: 'bg-orange-50 text-orange-700 border-orange-200',
  J: 'bg-red-50 text-red-700 border-red-200',
}

function TebiqStatusBadge({ tebiq }: { tebiq?: AnswerRow }) {
  if (!tebiq) {
    return <span className="px-1.5 py-0.5 rounded border text-[10px] bg-slate-100 text-slate-500 border-slate-200">none</span>
  }
  if (tebiq.error) {
    return <span className="px-1.5 py-0.5 rounded border text-[10px] bg-rose-50 text-rose-700 border-rose-200" title={tebiq.error}>error</span>
  }
  const s = tebiq.status ?? 'unknown'
  const tone =
    s === 'direct_answer' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    s === 'preliminary' ? 'bg-blue-50 text-blue-700 border-blue-200' :
    s === 'clarification_needed' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    s === 'out_of_scope' ? 'bg-red-50 text-red-700 border-red-200' :
    'bg-slate-100 text-slate-600 border-slate-200'
  const short =
    s === 'direct_answer' ? 'answered' :
    s === 'clarification_needed' ? 'clarification' :
    s
  return <span className={`px-1.5 py-0.5 rounded border text-[10px] ${tone}`} title={s}>{short}</span>
}

function FallbackBadge({ reason }: { reason: string | null }) {
  if (!reason) return <span className="text-slate-300 text-[10px]">-</span>
  const tone =
    reason === 'llm_timeout' ? 'bg-orange-50 text-orange-700 border-orange-200' :
    'bg-slate-100 text-slate-600 border-slate-200'
  return <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${tone}`}>{reason}</span>
}

function DsBadge({ ds }: { ds?: AnswerRow }) {
  if (!ds) {
    return <span className="px-1.5 py-0.5 rounded border text-[10px] bg-slate-100 text-slate-500 border-slate-200">none</span>
  }
  if (ds.error || !ds.answer_text) {
    return <span className="px-1.5 py-0.5 rounded border text-[10px] bg-rose-50 text-rose-700 border-rose-200" title={ds.error ?? ''}>failed</span>
  }
  return <span className="px-1.5 py-0.5 rounded border text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">ok</span>
}

function ClassBadge({ cls }: { cls: SampleClass }) {
  const tone = SAMPLE_CLASS_TONE[cls]
  const toneCls =
    tone === 'green' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    tone === 'orange' ? 'bg-orange-50 text-orange-700 border-orange-200' :
    tone === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
    tone === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    tone === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
    tone === 'rose' ? 'bg-rose-50 text-rose-700 border-rose-200' :
    'bg-slate-100 text-slate-600 border-slate-200'
  return (
    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${toneCls}`} title={cls}>
      {SAMPLE_CLASS_LABEL[cls]}
    </span>
  )
}

function RerunButtons({
  cls,
  rerun,
  tebiqHasAnswer,
  dsHasAnswer,
  onTebiq,
  onDeepseek,
}: {
  cls: SampleClass
  rerun: { tebiq: RerunState; deepseek: RerunState }
  tebiqHasAnswer: boolean
  dsHasAnswer: boolean
  onTebiq: () => void
  onDeepseek: () => void
}) {
  // Per Work Packet: rerun is offered when state is failed / none / fallback
  // — i.e., we don't push reruns of working FULL_COMPARABLE rows by default
  // (still allowed — buttons stay enabled, just visually de-emphasised).
  const tebiqEmphasis = !tebiqHasAnswer || cls === 'INVALID' || cls === 'TEBIQ_FALLBACK' || cls === 'NONE'
  const dsEmphasis = !dsHasAnswer || cls === 'DS_FAILED'
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onTebiq}
        disabled={rerun.tebiq === 'running'}
        className={`px-1.5 py-0.5 rounded border text-[10px] disabled:opacity-50 ${
          tebiqEmphasis
            ? 'border-orange-400 bg-orange-50 text-orange-700 hover:bg-orange-100'
            : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-100'
        }`}
      >
        {rerun.tebiq === 'running' ? 'T…' : rerun.tebiq === 'failed' ? 'T✗' : 'T重跑'}
      </button>
      <button
        onClick={onDeepseek}
        disabled={rerun.deepseek === 'running'}
        className={`px-1.5 py-0.5 rounded border text-[10px] disabled:opacity-50 ${
          dsEmphasis
            ? 'border-orange-400 bg-orange-50 text-orange-700 hover:bg-orange-100'
            : 'border-slate-300 bg-white text-slate-500 hover:bg-slate-100'
        }`}
      >
        {rerun.deepseek === 'running' ? 'D…' : rerun.deepseek === 'failed' ? 'D✗' : 'D重跑'}
      </button>
    </div>
  )
}

// ---------- helpers ----------

function truncate(s: string, n: number): string {
  return s.length <= n ? s : `${s.slice(0, n)}…`
}

function pct(n: number, total: number): number {
  if (total === 0) return 0
  return Math.round((n / total) * 100)
}
