'use client'

import { useState } from 'react'
import type { ActionAnswer, LlmAnswerEnvelope } from '@/lib/answer/types'

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
  intentSummary: string
  statusLabel: string
  statusClassName: string
  sourceHint: string
  actionAnswer: ActionAnswer
  llmEnvelope: LlmAnswerEnvelope | null
}

const FEEDBACK_OPTIONS = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'unclear', label: '看不懂' },
  { type: 'my_case_differs', label: '理解错了', note: 'intent_wrong' },
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

  const envelope = answer.llmEnvelope
  const mode = envelope?.answer_mode ?? 'direct_answer'
  const copySource = envelope?.copy_text || buildLegacyCopy(answer)

  async function submitFeedback(type: string, label: string, note?: string) {
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
          note,
        }),
      })
      setFeedback(label)
    } catch {
      setFeedback(label)
    } finally {
      setBusyFeedback(null)
    }
  }

  async function copyCard() {
    try {
      await navigator.clipboard.writeText(copySource)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1600)
    } catch {
      setCopyState('idle')
    }
  }

  return (
    <div className="pt-1">
      {mode === 'out_of_scope' && envelope ? (
        <OutOfScopeCard answer={answer} envelope={envelope} />
      ) : mode === 'clarification_needed' && envelope ? (
        <ClarificationCard answer={answer} envelope={envelope} />
      ) : (
        <DirectOrAssumptionCard
          answer={answer}
          envelope={envelope}
          mode={mode}
        />
      )}

      {mode !== 'clarification_needed' && mode !== 'out_of_scope' && (
        <details className="mt-5 rounded-[14px] border border-hairline bg-surface px-4 py-3">
          <summary className="cursor-pointer text-[13px] font-medium text-ink">复制 TEBIQ 的建议</summary>
          <p className="mt-3 text-[12px] leading-[1.7] text-slate [overflow-wrap:anywhere]">{copySource}</p>
          <button
            type="button"
            onClick={copyCard}
            className="mt-3 min-h-[36px] rounded-[10px] border border-hairline bg-canvas px-3 text-[12px] font-medium text-ink active:bg-paper"
          >
            {copyState === 'copied' ? '已复制' : '复制'}
          </button>
        </details>
      )}

      {mode !== 'clarification_needed' && mode !== 'out_of_scope' && (
        <section className="mt-5 border-t border-hairline pt-4">
          <SectionHeading>来源与说明</SectionHeading>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{answer.sourceHint}</p>
          <p className="mt-2 text-[11px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{answer.actionAnswer.boundary_note}</p>
          {envelope?.engine_version && (
            <p className="mt-2 text-[11px] leading-[1.6] text-ash">
              引擎：{envelope.engine_version}
              {envelope.confidence ? `（置信度 ${envelope.confidence}）` : ''}
              {envelope.llm_error ? '（LLM 失败已回退）' : ''}
            </p>
          )}
        </section>
      )}

      <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <SectionTitle title="这个整理有帮助吗？" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          {FEEDBACK_OPTIONS.map(option => (
            <button
              key={`${option.type}-${option.label}`}
              type="button"
              onClick={() => submitFeedback(option.type, option.label, 'note' in option ? option.note : undefined)}
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

function DirectOrAssumptionCard({
  answer,
  envelope,
  mode,
}: {
  answer: AnswerResult
  envelope: LlmAnswerEnvelope | null
  mode: string
}) {
  const action = answer.actionAnswer
  const conclusion = envelope?.short_answer || action.conclusion
  const understood = envelope?.understood_question || answer.intentSummary
  const nextActions = envelope?.next_actions ?? []
  const fallbackFirstTwo = safeItems(action.what_to_do).slice(0, 2)
  const fallbackSteps = withoutItems(
    uniqueItems(action.how_to_do.length > 0 ? action.how_to_do : action.what_to_do.slice(2)),
    fallbackFirstTwo,
  )

  const firstTwo = nextActions.length > 0
    ? nextActions.slice(0, 2).map(a => a.title)
    : fallbackFirstTwo
  const stepItems = nextActions.length > 2
    ? nextActions.slice(2).map(a => a.title)
    : fallbackSteps

  const where = envelope?.where_to_go ? splitList(envelope.where_to_go) : action.where_to_go
  const docs = envelope?.materials.length ? envelope.materials : action.documents_needed
  const deadline = envelope?.deadline ? splitList(envelope.deadline) : action.deadline_or_timing
  const consequences = envelope?.risks.length ? envelope.risks : action.consequences
  const expert = envelope?.expert_checkpoints.length ? envelope.expert_checkpoints : action.expert_handoff

  return (
    <>
      <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <StatusPill className={answer.statusClassName}>{answer.statusLabel}</StatusPill>
        <h1 className="mt-4 text-[22px] font-medium leading-[1.38] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {answer.title}
        </h1>
        <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">
          {answer.question}
        </p>
        <div className="mt-3 rounded-[12px] border border-hairline bg-canvas px-3 py-3">
          <p className="text-[11px] font-medium text-ash">我理解你的问题是</p>
          <p className="mt-1.5 text-[13px] leading-[1.65] text-ink [overflow-wrap:anywhere]">{understood}</p>
        </div>

        {mode === 'answer_with_assumptions' && (
          <div className="mt-3 rounded-[12px] border border-hairline bg-[#FFF7E8] px-3 py-3">
            <p className="text-[11px] font-medium text-ink">我先按以下假设给你一个初步整理。</p>
            {envelope && envelope.assumptions.length > 0 && (
              <ul className="mt-2 grid gap-1.5 text-[12px] leading-[1.6] text-slate">
                {envelope.assumptions.map(item => <li key={item}>· {item}</li>)}
              </ul>
            )}
          </div>
        )}

        <div className="mt-4">
          <SectionHeading>结论</SectionHeading>
          <p className="mt-2 text-[15px] leading-[1.7] text-ink [overflow-wrap:anywhere]">{conclusion}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <TaskList title="最紧的两件" items={firstTwo} ordered emphasis />
        </div>
      </section>

      <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4">
        <div className="divide-y divide-hairline">
          <TaskList title="步骤" items={stepItems} ordered />
          <TaskList title="去哪办" items={where} />
          <TaskList title="要带什么" items={docs} />
          <TaskList title="期限" items={deadline} />
          <TaskList title="不做会怎样" items={consequences} />
          <TaskList title="要找专家的情况" items={expert} />
        </div>
      </section>

      {mode === 'answer_with_assumptions' && envelope && envelope.key_missing_info.length > 0 && (
        <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
          <SectionHeading>关键缺失信息</SectionHeading>
          <ul className="mt-3 grid gap-3">
            {envelope.key_missing_info.map(info => (
              <li key={info.field} className="rounded-[12px] bg-paper px-3 py-3 text-[12px] leading-[1.65] text-slate">
                <p className="text-[12px] font-medium text-ink">{info.question}</p>
                {info.why_it_matters && (
                  <p className="mt-1 text-[11px] leading-[1.6] text-ash">为什么重要：{info.why_it_matters}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

function ClarificationCard({ answer, envelope }: { answer: AnswerResult; envelope: LlmAnswerEnvelope }) {
  const understood = envelope.understood_question || answer.intentSummary
  return (
    <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
      <StatusPill className="bg-paper text-ink">需先确认</StatusPill>
      <h1 className="mt-4 text-[20px] font-medium leading-[1.4] text-ink [overflow-wrap:anywhere]">
        这个问题先确认几件事，TEBIQ 再给具体方向
      </h1>
      <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">
        {answer.question}
      </p>
      <div className="mt-3 rounded-[12px] border border-hairline bg-canvas px-3 py-3">
        <p className="text-[11px] font-medium text-ash">我理解你的问题是</p>
        <p className="mt-1.5 text-[13px] leading-[1.65] text-ink [overflow-wrap:anywhere]">{understood}</p>
      </div>

      {envelope.short_answer && (
        <div className="mt-4">
          <SectionHeading>初步说明</SectionHeading>
          <p className="mt-2 text-[14px] leading-[1.7] text-ink [overflow-wrap:anywhere]">{envelope.short_answer}</p>
        </div>
      )}

      <div className="mt-4">
        <SectionHeading>需要先确认</SectionHeading>
        <ul className="mt-3 grid gap-3">
          {(envelope.key_missing_info.length > 0
            ? envelope.key_missing_info
            : [{ field: 'context', question: '请补充你的在留资格、事情发生日期、是否已收到官方文书。', why_it_matters: '不同前提下手续路径完全不同。' }]
          ).map(info => (
            <li key={info.field + info.question} className="rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.65] text-ink">
              <p className="font-medium">{info.question}</p>
              {info.why_it_matters && (
                <p className="mt-1 text-[11px] leading-[1.6] text-ash">为什么重要：{info.why_it_matters}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function OutOfScopeCard({ answer, envelope }: { answer: AnswerResult; envelope: LlmAnswerEnvelope }) {
  return (
    <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
      <StatusPill className="bg-paper text-ink">暂未支持</StatusPill>
      <h1 className="mt-4 text-[20px] font-medium leading-[1.4] text-ink [overflow-wrap:anywhere]">
        这个问题暂时不在 TEBIQ v0 支持范围内
      </h1>
      <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">
        {answer.question}
      </p>
      <div className="mt-3 rounded-[12px] border border-hairline bg-canvas px-3 py-3">
        <p className="text-[12px] leading-[1.7] text-ink">{envelope.short_answer}</p>
      </div>
      {envelope.key_missing_info.length > 0 && (
        <div className="mt-4">
          <SectionHeading>请补充</SectionHeading>
          <ul className="mt-3 grid gap-3">
            {envelope.key_missing_info.map(info => (
              <li key={info.field + info.question} className="rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.65] text-ink">
                <p className="font-medium">{info.question}</p>
                {info.why_it_matters && (
                  <p className="mt-1 text-[11px] leading-[1.6] text-ash">{info.why_it_matters}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
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

function splitList(value: string): string[] {
  return value
    .split(/[／/，,；;]\s*/)
    .map(item => item.trim())
    .filter(Boolean)
}

function buildLegacyCopy(answer: AnswerResult): string {
  const action = answer.actionAnswer
  const firstTodo = action.what_to_do[0] ?? '先确认基本事实'
  const firstDocument = action.documents_needed[0] ?? '准备相关文书和日期记录'
  const expert = stripTerminalPunctuation(action.expert_handoff[0] ?? '若已逾期或涉及个别事实，建议咨询专业人士')
  return `这类情况先确认身份、日期和已收到的文书。一般需要先做「${firstTodo}」，再准备「${firstDocument}」。${expert}。`
}

function stripTerminalPunctuation(value: string): string {
  return value.replace(/[。.!！]+$/, '')
}
