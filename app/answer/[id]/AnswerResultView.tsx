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
  const firstTwo = safeItems(action.what_to_do).slice(0, 2)
  const stepItems = withoutItems(
    uniqueItems(action.how_to_do.length > 0 ? action.how_to_do : action.what_to_do.slice(2)),
    firstTwo,
  )
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
    <div className="pt-1">
      <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <StatusPill className={answer.statusClassName}>{answer.statusLabel}</StatusPill>
        <h1 className="mt-4 text-[22px] font-medium leading-[1.38] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {answer.title}
        </h1>
        <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">
          {answer.question}
        </p>
        <div className="mt-4">
          <SectionHeading>结论</SectionHeading>
          <p className="mt-2 text-[15px] leading-[1.7] text-ink [overflow-wrap:anywhere]">{action.conclusion}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <TaskList title="最紧的两件" items={firstTwo} ordered emphasis />
        </div>
      </section>

      <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4">
        <div className="divide-y divide-hairline">
          <TaskList title="步骤" items={stepItems} ordered />
          <TaskList title="去哪办" items={action.where_to_go} />
          <TaskList title="要带什么" items={action.documents_needed} />
          <TaskList title="期限" items={action.deadline_or_timing} />
          <TaskList title="不做会怎样" items={action.consequences} />
          <TaskList title="要找专家的情况" items={action.expert_handoff} />
        </div>
      </section>

      <details className="mt-5 rounded-[14px] border border-hairline bg-surface px-4 py-3">
        <summary className="cursor-pointer text-[13px] font-medium text-ink">复制给客户</summary>
        <p className="mt-3 text-[12px] leading-[1.7] text-slate [overflow-wrap:anywhere]">{managerCopy}</p>
        <button
          type="button"
          onClick={copyManagerText}
          className="mt-3 min-h-[36px] rounded-[10px] border border-hairline bg-canvas px-3 text-[12px] font-medium text-ink active:bg-paper"
        >
          {copyState === 'copied' ? '已复制' : '复制'}
        </button>
      </details>

      <section className="mt-5 border-t border-hairline pt-4">
        <SectionHeading>来源与说明</SectionHeading>
        <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{answer.sourceHint}</p>
        <p className="mt-2 text-[11px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{action.boundary_note}</p>
      </section>

      <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
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

function TaskList({
  title,
  items,
  ordered = false,
  emphasis = false,
}: {
  title: string
  items: string[]
  ordered?: boolean
  emphasis?: boolean
}) {
  const displayItems = safeItems(items).slice(0, emphasis ? 2 : 6)
  const content = displayItems.map((item, index) => (
    <li key={`${title}-${item}`} className={`grid grid-cols-[24px_1fr] gap-2 ${emphasis ? 'text-[13px] text-ink' : 'text-[12px] text-slate'} leading-[1.65]`}>
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

function safeItems(items: string[]): string[] {
  return items.length > 0
    ? items
    : ['还需要确认：你的身份、事情发生日期、是否已经收到通知、是否已经逾期。']
}

function uniqueItems(items: string[]): string[] {
  const seen = new Set<string>()
  return items.filter(item => {
    const key = item.replace(/\s+/g, '')
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function withoutItems(items: string[], excluded: string[]): string[] {
  const excludedKeys = new Set(excluded.map(item => item.replace(/\s+/g, '')))
  const result = items.filter(item => !excludedKeys.has(item.replace(/\s+/g, '')))
  return result.length > 0 ? result : items
}

function buildManagerCopy(answer: AnswerResult): string {
  const action = answer.actionAnswer
  const firstTodo = action.what_to_do[0] ?? '先确认基本事实'
  const firstDocument = action.documents_needed[0] ?? '准备相关文书和日期记录'
  const expert = stripTerminalPunctuation(action.expert_handoff[0] ?? '若已逾期或涉及个别事实，建议咨询专业人士')
  return `这类情况先确认身份、日期和已收到的文书。一般需要先做「${firstTodo}」，再准备「${firstDocument}」。${expert}。`
}

function stripTerminalPunctuation(value: string): string {
  return value.replace(/[。.!！]+$/, '')
}
