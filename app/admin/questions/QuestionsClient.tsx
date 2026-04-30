'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { AdminQuestionRow, AdminQuestionStats } from './types'

const STATUSES = ['all', 'new', 'triaged', 'needs_draft', 'drafted', 'reviewed', 'published', 'ignored']
const PRIORITIES = ['all', 'low', 'normal', 'high']

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
          query_backlog 当前不可读。确认 migration 0019/0020 已应用后再查看数据。
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <Metric label="总问题数" value={stats.total} />
        <Metric label="今日新增" value={stats.today} />
        <Metric label="未处理" value={stats.unprocessed} />
        <Metric label="高优先级" value={stats.highPriority} />
        <Metric label="已忽略" value={stats.ignored} />
        <Metric label="已发布" value={stats.published} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className={INPUT_CLASS}>
          {STATUSES.map(status => <option key={status} value={status}>status: {status}</option>)}
        </select>
        <select value={priorityFilter} onChange={event => setPriorityFilter(event.target.value)} className={INPUT_CLASS}>
          {PRIORITIES.map(priority => <option key={priority} value={priority}>priority: {priority}</option>)}
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
    <article className="p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] text-ash">{question.status}</span>
        <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] text-ash">{question.priority}</span>
        <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] text-ash">{question.matchStatus}</span>
        <span className="ml-auto text-[11px] text-ash">{formatDate(question.createdAt)}</span>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-ink">{question.rawQuery}</p>
      <dl className="mt-3 grid gap-1 text-xs text-ash md:grid-cols-3">
        <Meta label="visa_type" value={question.visaType ?? '-'} />
        <Meta label="source_page" value={question.sourcePage ?? '-'} />
        <Meta label="contact_email" value={question.contactEmail ? '已留邮箱' : '-'} />
      </dl>
      <div className="mt-3 flex flex-wrap gap-2">
        <button disabled={busy} onClick={() => quick({ status: 'triaged' })} className={SMALL_BUTTON}>triaged</button>
        <button disabled={busy} onClick={() => quick({ status: 'needs_draft' })} className={SMALL_BUTTON}>needs_draft</button>
        <button disabled={busy} onClick={() => quick({ status: 'ignored' })} className={SMALL_BUTTON}>ignored</button>
        <button disabled={busy} onClick={() => quick({ priority: 'high' })} className={SMALL_BUTTON}>high priority</button>
        <Link href={`/admin/review-lite?questionId=${question.id}`} className={SMALL_LINK}>进入审核/起草</Link>
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={note}
          onChange={event => setNote(event.target.value)}
          placeholder="note"
          className="min-h-[36px] flex-1 rounded-[10px] border border-hairline bg-canvas px-3 text-xs text-ink outline-none focus:border-ink"
        />
        <button disabled={busy} onClick={saveNote} className={SMALL_BUTTON}>保存 note</button>
      </div>
    </article>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card border border-hairline bg-surface p-4">
      <div className="text-2xl font-semibold text-ink">{value.toLocaleString()}</div>
      <div className="mt-1 text-xs text-ash">{label}</div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-medium text-ink">{label}: </span>
      {value}
    </div>
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

const INPUT_CLASS = 'min-h-[36px] rounded-[10px] border border-hairline bg-surface px-3 text-xs text-ink outline-none'
const SMALL_BUTTON = 'rounded-[9px] border border-hairline bg-canvas px-3 py-1.5 text-xs text-ink disabled:opacity-50'
const SMALL_LINK = 'rounded-[9px] border border-hairline bg-ink px-3 py-1.5 text-xs text-white'
