'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  LEARNING_CONSOLE_TABS,
  LEARNING_CONSOLE_TAB_LABELS,
  matchesTab,
  type LearningConsoleKpis,
  type LearningConsoleTab,
} from '@/lib/learning-console/types'

// Client-side row shape — same as AiConsultation but with Date fields
// serialized to ISO strings (the server component does the conversion
// before passing props across the boundary).
export interface LearningConsoleRow {
  id: string
  viewerId: string | null
  userQuestionText: string
  hasImage: boolean
  imageSummary: string | null
  imageStorageRef: string | null
  aiAnswerText: string | null
  finalAnswerText: string | null
  model: string
  promptVersion: string
  factAnchorIds: string[]
  riskKeywordHits: string[]
  forbiddenRedactions: string[]
  streamStartedAt: string | null
  firstTokenAt: string | null
  completedAt: string | null
  firstTokenLatencyMs: number | null
  totalLatencyMs: number | null
  completionStatus: 'streaming' | 'completed' | 'partial' | 'timeout' | 'failed'
  partialAnswerSaved: boolean
  timeoutReason: string | null
  feedbackType: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved' | null
  savedQuestion: boolean
  humanConfirmClicked: boolean
  followUpCount: number
  schemaVersion: string
  createdAt: string
  updatedAt: string
}

interface Props {
  rows: LearningConsoleRow[]
  kpis: LearningConsoleKpis
  rowLimit: number
}

export default function LearningConsoleClient({ rows, kpis, rowLimit }: Props) {
  const [tab, setTab] = useState<LearningConsoleTab>('all')

  const filtered = useMemo(
    () => rows.filter(r => matchesTab(
      // matchesTab takes AiConsultation but only reads the same fields
      // we have here; cast is safe for the predicate's needs.
      r as unknown as Parameters<typeof matchesTab>[0],
      tab,
    )),
    [rows, tab],
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="max-w-6xl mx-auto p-6 space-y-5">
        <header className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Internal Tool</p>
            <h1 className="text-xl font-semibold mt-0.5">Learning Console · TEBIQ 1.0 Alpha</h1>
            <p className="mt-1 text-[12px] text-slate-500">
              真实用户 AI 咨询数据。区别于 <Link className="text-blue-600 hover:underline" href="/internal/eval-console">Eval Console</Link>（100Q 标注面板）。
            </p>
          </div>
          <div className="text-[11px] text-slate-400 text-right">
            <p>共 {rows.length} 条（最近 {rowLimit} 条）</p>
            <p>当前过滤后 {filtered.length} 条</p>
          </div>
        </header>

        <Kpis kpis={kpis} />

        <Tabs current={tab} onChange={setTab} rows={rows} />

        <RowTable rows={filtered} />

        {filtered.length === 0 && (
          <div className="rounded border border-slate-200 bg-white p-6 text-center text-[13px] text-slate-500">
            当前过滤条件下没有记录。
          </div>
        )}
      </main>
    </div>
  )
}

// ---------- KPI cards ----------

function Kpis({ kpis }: { kpis: LearningConsoleKpis }) {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <KpiCard label="今日咨询数" value={kpis.todayConsultations.toString()} />
      <KpiCard label="今日图片数" value={kpis.todayImages.toString()} />
      <KpiCard label="高风险命中" value={kpis.todayRiskHits.toString()} />
      <KpiCard
        label="不准确率"
        value={formatRate(kpis.todayInaccurateRate)}
        sub={`/${kpis.todayInaccurateSampleSize} 反馈`}
      />
      <KpiCard
        label="超时率"
        value={formatRate(kpis.todayTimeoutRate)}
        sub={`/${kpis.todayTimeoutSampleSize} 咨询`}
      />
    </section>
  )
}

function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded border border-slate-200 bg-white p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold leading-none">{value}</p>
      {sub && <p className="mt-1 text-[10px] text-slate-400">{sub}</p>}
    </div>
  )
}

function formatRate(r: number | null): string {
  if (r == null) return '—'
  return `${(r * 100).toFixed(0)}%`
}

// ---------- Tabs ----------

function Tabs({
  current,
  onChange,
  rows,
}: {
  current: LearningConsoleTab
  onChange: (t: LearningConsoleTab) => void
  rows: LearningConsoleRow[]
}) {
  return (
    <nav className="flex flex-wrap gap-1.5 text-[12px]">
      {LEARNING_CONSOLE_TABS.map(t => {
        const count = rows.filter(r =>
          matchesTab(r as unknown as Parameters<typeof matchesTab>[0], t),
        ).length
        const isActive = current === t
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`px-3 py-1.5 rounded border ${
              isActive
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {LEARNING_CONSOLE_TAB_LABELS[t]}
            <span className={`ml-1.5 text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ---------- Row table ----------

function RowTable({ rows }: { rows: LearningConsoleRow[] }) {
  if (rows.length === 0) return null
  return (
    <ul className="space-y-2">
      {rows.map(r => (
        <li key={r.id}>
          <Link
            href={`/internal/learning-console/${encodeURIComponent(r.id)}`}
            className="block rounded border border-slate-200 bg-white p-3 hover:border-slate-400 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                {new Date(r.createdAt).toLocaleString('zh-CN')}
              </span>
              <StatusBadge status={r.completionStatus} />
            </div>
            <p className="mt-1 text-[13px] text-slate-800 line-clamp-2 leading-snug">
              {r.userQuestionText}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
              {r.hasImage && (
                <Tag className="bg-violet-50 text-violet-800 border-violet-200">📎 图片</Tag>
              )}
              {r.riskKeywordHits.length > 0 && (
                <Tag className="bg-amber-50 text-amber-800 border-amber-200">
                  ⚠ {r.riskKeywordHits.join(' · ')}
                </Tag>
              )}
              {r.feedbackType && (
                <Tag className={feedbackToneClass(r.feedbackType)}>
                  反馈：{feedbackLabel(r.feedbackType)}
                </Tag>
              )}
              {r.savedQuestion && (
                <Tag className="bg-emerald-50 text-emerald-800 border-emerald-200">已保存</Tag>
              )}
              {r.humanConfirmClicked && (
                <Tag className="bg-rose-50 text-rose-800 border-rose-200">想找人工确认</Tag>
              )}
              {r.firstTokenLatencyMs != null && (
                <Tag className="bg-slate-100 text-slate-600 border-slate-200">
                  first_token={r.firstTokenLatencyMs}ms
                </Tag>
              )}
              {r.totalLatencyMs != null && (
                <Tag className="bg-slate-100 text-slate-600 border-slate-200">
                  total={r.totalLatencyMs}ms
                </Tag>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function Tag({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded border ${className}`}>
      {children}
    </span>
  )
}

// Issue #51: 'partial' added — distinct from 'timeout' for the 90s
// hard-cutoff branch where some answer text already streamed.
function StatusBadge({ status }: { status: 'streaming' | 'completed' | 'partial' | 'timeout' | 'failed' }) {
  const map: Record<typeof status, string> = {
    streaming: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    partial:   'bg-yellow-50 text-yellow-700 border-yellow-200',
    timeout:   'bg-amber-50 text-amber-700 border-amber-200',
    failed:    'bg-rose-50 text-rose-700 border-rose-200',
  }
  const label: Record<typeof status, string> = {
    streaming: '进行中',
    completed: '完成',
    partial:   '部分',
    timeout: '超时',
    failed: '失败',
  }
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${map[status]}`}>
      {label[status]}
    </span>
  )
}

function feedbackLabel(t: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'): string {
  switch (t) {
    case 'helpful':      return '有帮助'
    case 'inaccurate':   return '不准确'
    case 'add_context':  return '想补充'
    case 'human_review': return '想人工确认'
    case 'saved':        return '已保存'
  }
}

function feedbackToneClass(t: 'helpful' | 'inaccurate' | 'add_context' | 'human_review' | 'saved'): string {
  switch (t) {
    case 'helpful':      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    case 'inaccurate':   return 'bg-rose-50 text-rose-800 border-rose-200'
    case 'add_context':  return 'bg-sky-50 text-sky-800 border-sky-200'
    case 'human_review': return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'saved':        return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}
