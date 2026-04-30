'use client'

import { useState } from 'react'
import type { ActionAnswer } from '@/lib/answer/types'

export type AnswerStatus = 'matched' | 'draft' | 'cannot_determine'
export type AnswerLevel = 'L1' | 'L2' | 'L3' | 'L4'

export interface AnswerSection {
  title: string
  body: string
}

export interface AnswerResult {
  id: string
  status: AnswerStatus
  title: string
  question: string
  answerLevel: AnswerLevel
  sourceHint: string
  actionAnswer: ActionAnswer
}

const STATUS_META: Record<AnswerStatus, { label: string; detail: string; className: string }> = {
  matched: {
    label: '已整理',
    detail: '根据现有资料整理完成',
    className: 'bg-paper text-ink',
  },
  draft: {
    label: '初步整理，尚未人工复核',
    detail: '可先按材料清单核对',
    className: 'bg-[#FFF7E8] text-ink',
  },
  cannot_determine: {
    label: '需要进一步确认',
    detail: '先补齐关键日期和身份信息',
    className: 'bg-paper text-ink',
  },
}

const FEEDBACK_OPTIONS = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'unclear', label: '看不懂' },
  { type: 'my_case_differs', label: '我的情况不一样' },
] as const

export default function AnswerResultView({
  answer,
  answerId,
}: {
  answer: AnswerResult
  answerId?: string | null
}) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [busyFeedback, setBusyFeedback] = useState<string | null>(null)
  const meta = STATUS_META[answer.status]
  const action = answer.actionAnswer
  const cannotDetermine = answer.status === 'cannot_determine'

  async function submitFeedback(type: string, label: string) {
    setFeedback(null)
    setBusyFeedback(type)
    if (!answerId) {
      setFeedback(label)
      setBusyFeedback(null)
      return
    }
    try {
      await fetch('/api/answer/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          answer_draft_id: answerId,
          page_path: `/answer/${answerId}`,
          feedback_type: type,
        }),
      })
      setFeedback(label)
    } catch {
      setFeedback(label)
    } finally {
      setBusyFeedback(null)
    }
  }

  return (
    <div className="grid gap-5 pt-1">
      <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <div>
          <StatusPill className={meta.className}>{meta.label}</StatusPill>
        </div>
        <h1 className="mt-4 text-[22px] font-medium leading-[1.42] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {answer.title}
        </h1>

        <div className="mt-4 rounded-[12px] bg-paper px-3 py-3">
          <p className="text-[11px] leading-none text-ash">你的问题</p>
          <p className="mt-2 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">{answer.question}</p>
        </div>

        <div className="mt-4 border-t border-hairline pt-4">
          <SectionHeading>一句话结论</SectionHeading>
          <p className="mt-2 text-[15px] leading-[1.75] text-ink [overflow-wrap:anywhere]">{action.conclusion}</p>
        </div>

        <div className="mt-4 border-t border-hairline pt-4">
          <ActionList title={cannotDetermine ? '今天先确认什么' : '今天先做什么'} items={action.what_to_do} ordered strong />
        </div>

        <div className="mt-4 border-t border-hairline pt-4">
          <SectionHeading>边界说明</SectionHeading>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{action.boundary_note}</p>
        </div>
      </section>

      <section className="rounded-[16px] border border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-3">
          <SectionTitle title="下一步说明" />
        </div>
        <div className="divide-y divide-hairline px-4">
          <ActionList title="去哪办理" items={action.where_to_go} />
          <ActionList title="需要准备什么" items={action.documents_needed} />
          <ActionList title="期限和时机" items={action.deadline_or_timing} />
          <ActionList title="不处理可能怎样" items={action.consequences} />
          <ActionList title="需要专家确认的情况" items={action.expert_handoff} />
          <CustomerNote sourceHint={answer.sourceHint} boundaryNote={action.boundary_note} />
        </div>
      </section>

      <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="这个整理有帮助吗？" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {FEEDBACK_OPTIONS.map(option => (
            <button
              key={option.type}
              type="button"
              onClick={() => submitFeedback(option.type, option.label)}
              className={`min-h-[40px] rounded-[10px] border px-3 text-[12px] transition-colors ${
                feedback === option.label
                  ? 'border-ink bg-ink text-white'
                  : 'border-hairline bg-canvas text-slate active:bg-paper'
              }`}
            >
              {busyFeedback === option.type ? '处理中...' : option.label}
            </button>
          ))}
        </div>
        {feedback && (
          <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-slate">
            已记录。TEBIQ 会根据反馈继续修正内容。
          </p>
        )}
      </section>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-[15px] font-medium leading-none text-ink">{title}</h2>
    </div>
  )
}

function SectionHeading({ children }: { children: string }) {
  return <h2 className="text-[13px] font-medium leading-none text-ink">{children}</h2>
}

function ActionList({
  title,
  items,
  ordered = false,
  strong = false,
}: {
  title: string
  items: string[]
  ordered?: boolean
  strong?: boolean
}) {
  const safeItems = items.length > 0 ? items : ['这部分需要进一步确认。']
  const content = safeItems.slice(0, strong ? 3 : 6).map((item, index) => (
    <li key={`${title}-${item}`} className={`grid grid-cols-[24px_1fr] gap-2 text-[12px] leading-[1.65] ${strong ? 'text-ink' : 'text-slate'}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">
        {ordered ? index + 1 : '·'}
      </span>
      <span className="[overflow-wrap:anywhere]">{item}</span>
    </li>
  ))
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <SectionHeading>{title}</SectionHeading>
      {ordered ? <ol className="mt-3 grid gap-2">{content}</ol> : <ul className="mt-3 grid gap-2">{content}</ul>}
    </div>
  )
}

function CustomerNote({
  sourceHint,
  boundaryNote,
}: {
  sourceHint: string
  boundaryNote: string
}) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <SectionHeading>给客户看的简短说明</SectionHeading>
      <p className="mt-3 text-[12px] leading-[1.75] text-slate [overflow-wrap:anywhere]">
        {boundaryNote}
      </p>
      <p className="mt-2 text-[11px] leading-[1.7] text-ash [overflow-wrap:anywhere]">
        来源提示：{sourceHint}
      </p>
    </div>
  )
}

function StatusPill({ children, className = 'bg-paper text-slate' }: { children: string; className?: string }) {
  return (
    <span className={`rounded-[9px] px-2.5 py-1 text-[11px] leading-none ${className}`}>
      {children}
    </span>
  )
}
