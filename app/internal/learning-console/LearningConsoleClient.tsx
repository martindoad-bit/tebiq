'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Camera,
  Database,
  ShieldAlert,
} from 'lucide-react'
import {
  ConsultationShell,
  FeedbackLabel,
  MetaPill,
  SectionLabel,
  StatusBadge,
  Surface,
  cx,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import {
  LEARNING_CONSOLE_TABS,
  LEARNING_CONSOLE_TAB_LABELS,
  matchesTab,
  type LearningConsoleKpis,
  type LearningConsoleTab,
} from '@/lib/learning-console/types'

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
    () => rows.filter(r => matchesTab(r as unknown as Parameters<typeof matchesTab>[0], tab)),
    [rows, tab],
  )
  const overview = useMemo(() => computeOverview(rows), [rows])

  return (
    <ConsultationShell wide>
      <div className="space-y-5">
        <header className="flex flex-col gap-4 border-b border-[var(--tebiq-soft-gray)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">Internal / Learning Console</p>
            <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[var(--tebiq-ink-blue)]">
              真实咨询记录
            </h1>
            <p className="mt-2 max-w-[42rem] text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">
              这里看真实用户问题、AI 回答、图片摘要、反馈、风险词、延迟和失败原因。它不是案件系统，也不是 Pro 后台。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[12px]">
            <MetaPill icon={Database}>最近 {rowLimit} 条</MetaPill>
            <MetaPill>{rows.length} 条已加载</MetaPill>
            <MetaPill>{filtered.length} 条当前显示</MetaPill>
          </div>
        </header>

        <OverviewGrid overview={overview} kpis={kpis} />
        <Tabs current={tab} onChange={setTab} rows={rows} />
        <RowList rows={filtered} />

        {filtered.length === 0 && (
          <Surface className="py-10 text-center">
            <h2 className="text-[16px] font-semibold text-[var(--tebiq-ink-blue)]">当前条件下没有记录</h2>
            <p className="mt-1 text-[13px] text-[var(--tebiq-deep-slate)]">切换 Tab 可以查看其它咨询状态。</p>
          </Surface>
        )}
      </div>
    </ConsultationShell>
  )
}

function OverviewGrid({ overview, kpis }: { overview: Overview; kpis: LearningConsoleKpis }) {
  const cards = [
    ['今日咨询数', kpis.todayConsultations.toString(), 'JST today'],
    ['总咨询数', overview.total.toString(), 'loaded rows'],
    ['图片咨询数', overview.images.toString(), 'has image'],
    ['高风险词命中', overview.riskHits.toString(), 'risk keyword hits'],
    ['不准确反馈', overview.inaccurate.toString(), 'feedback'],
    ['想人工确认', overview.humanReview.toString(), 'human confirm'],
    ['已保存问题', overview.saved.toString(), 'saved'],
    ['超时 / 失败', overview.failures.toString(), 'timeout + failed'],
    ['平均响应时间', overview.avgLatencyLabel, 'completed rows'],
  ]

  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-9">
      {cards.map(([label, value, sub]) => (
        <Surface key={label} className="min-h-[88px] p-3">
          <p className="text-[11px] leading-tight text-[var(--tebiq-deep-slate)]">{label}</p>
          <p className="mt-2 text-[24px] font-semibold leading-none text-[var(--tebiq-ink-blue)]">{value}</p>
          <p className="mt-2 text-[10px] text-[var(--tebiq-cool-gray)]">{sub}</p>
        </Surface>
      ))}
    </section>
  )
}

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
    <nav className="flex gap-2 overflow-x-auto pb-1 text-[12px]" aria-label="Learning Console tabs">
      {LEARNING_CONSOLE_TABS.map(t => {
        const count = rows.filter(r => matchesTab(r as unknown as Parameters<typeof matchesTab>[0], t)).length
        const isActive = current === t
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cx(
              'whitespace-nowrap rounded-btn border px-3 py-2 font-medium',
              isActive
                ? 'border-[var(--tebiq-ink-blue)] bg-[var(--tebiq-ink-blue)] text-[var(--tebiq-off-white)]'
                : 'border-[var(--tebiq-soft-gray)] text-[var(--tebiq-deep-slate)]',
            )}
          >
            {LEARNING_CONSOLE_TAB_LABELS[t]}
            <span className={cx('ml-1.5 text-[10px]', isActive ? 'text-[var(--tebiq-soft-gray)]' : 'text-[var(--tebiq-cool-gray)]')}>
              {count}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function RowList({ rows }: { rows: LearningConsoleRow[] }) {
  if (rows.length === 0) return null
  return (
    <ul className="space-y-3">
      {rows.map(row => {
        const answer = row.finalAnswerText ?? row.aiAnswerText ?? ''
        const displayState = displayStateForRow(row)
        return (
          <li key={row.id}>
            <Link href={`/internal/learning-console/${encodeURIComponent(row.id)}`}>
              <Surface as="article" className="space-y-3 transition-colors hover:border-[var(--tebiq-cool-gray)]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge state={displayState} />
                      {row.hasImage && <MetaPill icon={Camera}>图片</MetaPill>}
                      {row.riskKeywordHits.length > 0 && <MetaPill tone="focus" icon={ShieldAlert}>风险词 {row.riskKeywordHits.length}</MetaPill>}
                      {row.feedbackType && <MetaPill>反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill>}
                      {row.humanConfirmClicked && <MetaPill tone="focus">想人工确认</MetaPill>}
                      {row.savedQuestion && <MetaPill>已保存</MetaPill>}
                    </div>
                    <div>
                      <SectionLabel>{new Date(row.createdAt).toLocaleString('zh-CN')}</SectionLabel>
                      <p className="mt-1 line-clamp-2 text-[15px] font-medium leading-relaxed text-[var(--tebiq-ink-blue)]">
                        {row.userQuestionText}
                      </p>
                    </div>
                    {row.imageSummary && (
                      <p className="line-clamp-2 rounded-card border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
                        图片摘要：{row.imageSummary}
                      </p>
                    )}
                    {answer && (
                      <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">
                        回答：{answer}
                      </p>
                    )}
                    {row.riskKeywordHits.length > 0 && (
                      <p className="text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
                        风险关键词：{row.riskKeywordHits.join(' · ')}
                      </p>
                    )}
                  </div>
                  <div className="grid shrink-0 grid-cols-2 gap-2 text-[11px] lg:w-[270px]">
                    <Metric label="model" value={row.model} />
                    <Metric label="prompt" value={row.promptVersion} />
                    <Metric label="first token" value={row.firstTokenLatencyMs != null ? `${row.firstTokenLatencyMs}ms` : '—'} />
                    <Metric label="total" value={row.totalLatencyMs != null ? `${row.totalLatencyMs}ms` : '—'} />
                    <Metric label="status" value={row.completionStatus} />
                    <Metric label="failure" value={row.timeoutReason ?? '—'} />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--tebiq-ink-blue)]">
                  查看详情
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </div>
              </Surface>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-[var(--tebiq-soft-gray)] px-2 py-1.5">
      <p className="text-[10px] text-[var(--tebiq-cool-gray)]">{label}</p>
      <p className="mt-0.5 truncate font-mono text-[11px] text-[var(--tebiq-ink-blue)]">{value}</p>
    </div>
  )
}

interface Overview {
  total: number
  images: number
  riskHits: number
  inaccurate: number
  humanReview: number
  saved: number
  failures: number
  avgLatencyLabel: string
}

function computeOverview(rows: LearningConsoleRow[]): Overview {
  const completedLatencies = rows
    .map(r => r.totalLatencyMs)
    .filter((v): v is number => typeof v === 'number' && Number.isFinite(v))
  const avg = completedLatencies.length
    ? Math.round(completedLatencies.reduce((sum, v) => sum + v, 0) / completedLatencies.length)
    : null

  return {
    total: rows.length,
    images: rows.filter(r => r.hasImage).length,
    riskHits: rows.filter(r => r.riskKeywordHits.length > 0).length,
    inaccurate: rows.filter(r => r.feedbackType === 'inaccurate').length,
    humanReview: rows.filter(r => r.humanConfirmClicked || r.feedbackType === 'human_review').length,
    saved: rows.filter(r => r.savedQuestion).length,
    failures: rows.filter(r => r.completionStatus === 'timeout' || r.completionStatus === 'failed').length,
    avgLatencyLabel: avg == null ? '—' : `${(avg / 1000).toFixed(1)}s`,
  }
}

function displayStateForRow(row: LearningConsoleRow): AlphaDisplayState {
  if (row.completionStatus === 'completed') return 'completed'
  if (row.completionStatus === 'streaming') return 'streaming'
  if (row.completionStatus === 'failed') return 'failed'
  if (row.partialAnswerSaved) return 'partial'
  if (row.timeoutReason) return 'fallback'
  return 'timeout'
}
