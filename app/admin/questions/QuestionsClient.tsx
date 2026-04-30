'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { AdminQuestionRow, AdminQuestionStats } from './types'

const STATUSES = ['all', 'new', 'triaged', 'needs_draft', 'drafted', 'reviewed', 'published', 'ignored']
const PRIORITIES = ['all', 'low', 'normal', 'high']

const STATUS_LABEL: Record<string, string> = {
  all: '全部状态',
  new: '新问题',
  triaged: '已分流',
  needs_draft: '待起草',
  drafted: '已起草',
  reviewed: '已审核',
  published: '已发布',
  ignored: '已忽略',
}

const PRIORITY_LABEL: Record<string, string> = {
  all: '全部优先级',
  low: '低',
  normal: '普通',
  high: '高优先级',
}

export default function QuestionsClient({
  initialQuestions,
  stats,
  unavailable = false,
}: {
  initialQuestions: AdminQuestionRow[]
  stats: AdminQuestionStats
  unavailable?: boolean
}) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const visible = useMemo(() => questions.filter(question => {
    if (statusFilter !== 'all' && question.status !== statusFilter) return false
    if (priorityFilter !== 'all' && question.priority !== priorityFilter) return false
    return true
  }), [questions, statusFilter, priorityFilter])

  async function patch(id: string, update: Partial<Pick<AdminQuestionRow, 'status' | 'priority' | 'note'>>) {
    const res = await fetch('/api/admin/questions', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...update }),
    })
    const json = await res.json() as { ok?: boolean; data?: { question?: AdminQuestionRow } }
    if (!res.ok || !json.ok || !json.data?.question) return false
    setQuestions(current => current.map(item => item.id === id ? normalizeReturned(json.data!.question!) : item))
    return true
  }

  return (
    <div className="grid gap-4">
      {unavailable && (
        <div className="rounded-card border border-hairline bg-paper p-4 text-sm text-ash">
          当前无法读取问题数据。确认本地数据库已更新后再查看。
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Metric label="总数" value={stats.total} />
        <Metric label="今日新增" value={stats.today} />
        <Metric label="未处理" value={stats.unprocessed} />
        <Metric label="高优先级" value={stats.highPriority} />
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-card border border-hairline bg-surface p-2">
        <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className={INPUT_CLASS}>
          {STATUSES.map(status => <option key={status} value={status}>{STATUS_LABEL[status] ?? status}</option>)}
        </select>
        <select value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)} className={INPUT_CLASS}>
          {PRIORITIES.map(priority => <option key={priority} value={priority}>{PRIORITY_LABEL[priority] ?? priority}</option>)}
        </select>
        <Link href="/admin/questions/import" className="rounded-btn bg-ink px-4 py-2 text-xs font-medium text-white">
          批量导入
        </Link>
      </div>

      <div className="overflow-hidden rounded-card border border-hairline bg-surface">
        {visible.length === 0 ? (
          <div className="p-6 text-sm text-ash">当前没有问题。</div>
        ) : (
          <div className="divide-y divide-hairline">
            {visible.map(question => (
              <QuestionRow key={question.id} question={question} onPatch={patch} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuestionRow({
  question,
  onPatch,
}: {
  question: AdminQuestionRow
  onPatch: (id: string, update: Partial<Pick<AdminQuestionRow, 'status' | 'priority' | 'note'>>) => Promise<boolean>
}) {
  const [note, setNote] = useState(question.note ?? '')
  const [busy, setBusy] = useState(false)

  async function quick(update: Partial<Pick<AdminQuestionRow, 'status' | 'priority'>>) {
    setBusy(true)
    await onPatch(question.id, update)
    setBusy(false)
  }

  async function saveNote() {
    setBusy(true)
    await onPatch(question.id, { note })
    setBusy(false)
  }

  return (
    <article className="px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <LowNoiseBadge>{STATUS_LABEL[question.status] ?? question.status}</LowNoiseBadge>
        <LowNoiseBadge tone={question.priority === 'high' ? 'attention' : 'neutral'}>
          {PRIORITY_LABEL[question.priority] ?? question.priority}
        </LowNoiseBadge>
        <LowNoiseBadge>{question.matchStatus}</LowNoiseBadge>
        <span className="ml-auto text-[11px] text-ash">{formatDate(question.createdAt)}</span>
      </div>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.7] text-ink">{question.rawQuery}</p>
      <dl className="mt-3 grid gap-1.5 text-[11px] text-ash md:grid-cols-3">
        <Meta label="签证" value={question.visaType ?? '未记录'} />
        <Meta label="来源" value={question.sourcePage ?? '未记录'} />
        <Meta label="联系方式" value={question.contactEmail ? '已留邮箱' : '未留'} />
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
        <button disabled={busy} onClick={() => quick({ status: 'triaged' })} className={SMALL_BUTTON}>标记已分流</button>
        <button disabled={busy} onClick={() => quick({ status: 'needs_draft' })} className={SMALL_BUTTON}>待起草</button>
        <button disabled={busy} onClick={() => quick({ status: 'ignored' })} className={SMALL_BUTTON}>忽略</button>
        <button disabled={busy} onClick={() => quick({ priority: 'high' })} className={SMALL_BUTTON}>设为高优先级</button>
        <Link href={`/admin/review-lite?questionId=${question.id}`} className={SMALL_LINK}>审核 / 起草</Link>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={note}
          onChange={event => setNote(event.target.value)}
          placeholder="内部备注"
          className="min-h-[36px] flex-1 rounded-[10px] border border-hairline bg-canvas px-3 text-xs text-ink outline-none focus:border-ink"
        />
        <button disabled={busy} onClick={saveNote} className={SMALL_BUTTON}>保存</button>
      </div>
    </article>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card border border-hairline bg-surface px-4 py-3">
      <div className="numeric text-[28px] font-light leading-none text-ink">{value.toLocaleString()}</div>
      <div className="mt-2 text-[11px] text-ash">{label}</div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 truncate">
      <span className="text-slate">{label}: </span>
      {value}
    </div>
  )
}

function LowNoiseBadge({
  children,
  tone = 'neutral',
}: {
  children: string
  tone?: 'neutral' | 'attention'
}) {
  return (
    <span className={`rounded-[8px] px-2 py-1 text-[11px] ${
      tone === 'attention' ? 'bg-[#FFF4E1] text-warning' : 'bg-paper text-ash'
    }`}>
      {children}
    </span>
  )
}

function normalizeReturned(question: AdminQuestionRow): AdminQuestionRow {
  return {
    ...question,
    createdAt: typeof question.createdAt === 'string' ? question.createdAt : new Date(question.createdAt).toISOString(),
    updatedAt: typeof question.updatedAt === 'string' ? question.updatedAt : new Date(question.updatedAt).toISOString(),
  }
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

const INPUT_CLASS = 'min-h-[36px] rounded-[10px] border border-hairline bg-canvas px-3 text-xs text-ink outline-none'
const SMALL_BUTTON = 'rounded-[9px] border border-hairline bg-canvas px-3 py-1.5 text-xs text-ink disabled:opacity-50'
const SMALL_LINK = 'rounded-[9px] border border-hairline bg-ink px-3 py-1.5 text-xs text-white'
