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
  title: string
  question: string
  statusLabel: string
  statusClassName: string
  primaryActionTitle: string
  sourceHint: string
  actionAnswer: ActionAnswer
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
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')
  const action = answer.actionAnswer
  const confirmationItems = buildConfirmationItems(action)
  const managerCopy = buildManagerCopy(answer)

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

  async function copyManagerText() {
    try {
      await navigator.clipboard.writeText(managerCopy)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1600)
    } catch {
      setCopyState('idle')
    }
  }

  return (
    <div className="grid gap-5 pt-1">
      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill className={answer.statusClassName}>{answer.statusLabel}</StatusPill>
        </div>
        <p className="mt-4 text-[11px] leading-none text-ash">整理结果</p>
        <h1 className="mt-2 text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {answer.title}
        </h1>
        <div className="mt-4 rounded-[12px] bg-paper px-3 py-3">
          <SectionHeading>一句话结论</SectionHeading>
          <p className="mt-2 text-[14px] leading-[1.75] text-ink [overflow-wrap:anywhere]">{action.conclusion}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <ActionList title={answer.primaryActionTitle} items={action.what_to_do} ordered />
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <p className="text-[11px] leading-none text-ash">你的问题</p>
          <p className="mt-2 text-[12px] leading-[1.65] text-slate [overflow-wrap:anywhere]">{answer.question}</p>
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-3">
          <SectionTitle title="下一步怎么做" />
        </div>
        <div className="divide-y divide-hairline px-4">
          <ActionList title="去哪里办理" items={action.where_to_go} />
          <ActionList title="怎么做" items={action.how_to_do} />
          <ActionList title="需要准备什么" items={action.documents_needed} />
          <ActionList title="期限和时机" items={action.deadline_or_timing} />
          <ActionList title="不处理可能怎样" items={action.consequences} />
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <ActionList title="需要专家确认的情况" items={action.expert_handoff} />
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="给客户看的简短说明" />
        <p className="mt-3 text-[13px] leading-[1.75] text-slate [overflow-wrap:anywhere]">{managerCopy}</p>
        <button
          type="button"
          onClick={copyManagerText}
          className="mt-3 min-h-[38px] rounded-[10px] border border-hairline bg-canvas px-3 text-[12px] font-medium text-ink active:bg-paper"
        >
          {copyState === 'copied' ? '已复制' : '复制这段说明'}
        </button>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <ActionList title="还需要确认" items={confirmationItems} />
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="使用边界" />
        <p className="mt-3 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{action.boundary_note}</p>
        <p className="mt-3 text-[11px] leading-[1.6] text-ash [overflow-wrap:anywhere]">{answer.sourceHint}</p>
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
  const displayItems = items.length > 0 ? items.slice(0, 6) : ['这部分需要进一步确认。']
  const content = displayItems.map((item, index) => (
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

function buildConfirmationItems(action: ActionAnswer): string[] {
  const total =
    action.what_to_do.length +
    action.where_to_go.length +
    action.how_to_do.length +
    action.documents_needed.length +
    action.deadline_or_timing.length +
    action.consequences.length

  if (total >= 6 && action.conclusion.length >= 42) return []
  return [
    '你的在留资格',
    '事情发生日期',
    '是否已经收到文书',
    '是否已经逾期',
    '是否涉及公司 / 雇主',
  ]
}

function buildManagerCopy(answer: AnswerResult): string {
  const action = answer.actionAnswer
  const firstTodo = action.what_to_do[0] ?? '先确认基本事实'
  const firstDocument = action.documents_needed[0] ?? '准备相关文书和日期记录'
  const expert = action.expert_handoff[0] ?? '若已逾期或涉及个别事实，建议咨询专业人士'
  return `这类情况先确认身份、日期和已收到的文书。一般需要先做「${firstTodo}」，再准备「${firstDocument}」。${expert}。`
}
