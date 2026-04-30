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

const LEVEL_LABELS: Record<AnswerLevel, string> = {
  L1: 'L1 一般信息',
  L2: 'L2 手续路径',
  L3: 'L3 决策辅助',
  L4: 'L4 个案判断',
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
    label: '这个情况需要进一步确认',
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
      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill className={meta.className}>{meta.label}</StatusPill>
          <StatusPill>{LEVEL_LABELS[answer.answerLevel]}</StatusPill>
        </div>
        <h1 className="mt-4 text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {answer.title}
        </h1>
        <div className="mt-4 rounded-[12px] bg-paper px-3 py-3">
          <SectionHeading>结论</SectionHeading>
          <p className="mt-2 text-[14px] leading-[1.75] text-ink [overflow-wrap:anywhere]">{action.conclusion}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <ActionList title={cannotDetermine ? '先确认什么' : '现在要做什么'} items={action.what_to_do} ordered />
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <SectionHeading>边界说明</SectionHeading>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{action.boundary_note}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <p className="text-[11px] leading-none text-ash">原始问题</p>
          <p className="mt-2 text-[12px] leading-[1.65] text-slate [overflow-wrap:anywhere]">{answer.question}</p>
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-3">
          <SectionTitle title="行动答案" />
        </div>
        <div className="divide-y divide-hairline px-4">
          <ActionList title="去哪里办" items={action.where_to_go} />
          <ActionList title="怎么做" items={action.how_to_do} />
          <ActionList title="需要带什么" items={action.documents_needed} />
          <ActionList title="大概多久内做" items={action.deadline_or_timing} />
          <ActionList title="不做可能怎样" items={action.consequences} />
        </div>
      </section>

      {action.expert_handoff.length > 0 && (
        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <ActionList title="什么时候要问专家" items={action.expert_handoff} />
        </section>
      )}

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="来源提示" />
        <p className="mt-3 text-[13px] leading-[1.75] text-slate">{answer.sourceHint}</p>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="这条整理是否有用" />
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
}: {
  title: string
  items: string[]
  ordered?: boolean
}) {
  const content = items.slice(0, 6).map((item, index) => (
    <li key={`${title}-${item}`} className="grid grid-cols-[24px_1fr] gap-2 text-[12px] leading-[1.65] text-slate">
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

function StatusPill({ children, className = 'bg-paper text-slate' }: { children: string; className?: string }) {
  return (
    <span className={`rounded-[9px] px-2.5 py-1 text-[11px] leading-none ${className}`}>
      {children}
    </span>
  )
}
