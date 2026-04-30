'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

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
  answerType: string
  reviewStatus: string
  summary: string
  sections: AnswerSection[]
  nextSteps: string[]
  sourceHint: string
  boundaryNote: string
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
          <StatusPill>{answer.answerType}</StatusPill>
        </div>
        <h1 className="mt-4 text-[21px] font-medium leading-[1.45] tracking-[-0.01em] text-ink">
          {answer.title}
        </h1>
        <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[12px] leading-[1.65] text-slate">
          {answer.question}
        </p>
        <div className="mt-4 border-t border-hairline pt-4">
          <p className="text-[11px] leading-none text-ash">回答状态</p>
          <p className="mt-2 text-[13px] leading-[1.65] text-slate">
            {answer.reviewStatus}。{meta.detail}
          </p>
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle label="summary" title="概要" />
        <p className="mt-3 text-[14px] leading-[1.8] text-ink">{answer.summary}</p>
      </section>

      <section className="rounded-card border border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-3">
          <SectionTitle label="sections" title={cannotDetermine ? '先确认的信息' : '整理内容'} />
        </div>
        <div className="divide-y divide-hairline">
          {answer.sections.map(section => (
            <article key={section.title} className="px-4 py-4">
              <h2 className="text-[15px] font-medium leading-[1.5] text-ink">{section.title}</h2>
              <p className="mt-2 text-[13px] leading-[1.75] text-slate">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle label="next_steps" title={cannotDetermine ? '你可以先确认这些信息' : '下一步'} />
        <ol className="mt-3 grid gap-3">
          {answer.nextSteps.map((step, index) => (
            <li key={step} className="grid grid-cols-[28px_1fr] gap-2 text-[13px] leading-[1.65] text-slate">
              <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-paper text-[12px] tabular-nums text-ink">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {cannotDetermine && (
        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <SectionTitle label="expert_hint" title="建议咨询的专业人士" />
          <div className="mt-3 grid gap-2 text-[13px] leading-[1.65] text-slate">
            <ExpertRow title="在留手续专业人士" body="确认在留资格、材料边界和提交顺序。" />
            <ExpertRow title="社会保险相关窗口" body="确认社会保険、年金、健康保険的空档处理。" />
            <ExpertRow title="税务相关窗口" body="确认住民税、源泉徴収票、確定申告相关材料。" />
          </div>
        </section>
      )}

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle label="sources" title="来源提示" />
        <p className="mt-3 text-[13px] leading-[1.75] text-slate">{answer.sourceHint}</p>
      </section>

      <section className="rounded-card border border-hairline bg-paper px-4 py-4">
        <SectionTitle label="boundary" title="边界说明" />
        <p className="mt-3 text-[12px] leading-[1.7] text-ash">{answer.boundaryNote}</p>
      </section>

      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <SectionTitle label="feedback" title="这条整理是否有用" />
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

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="text-[10px] font-normal leading-none tracking-[0.12em] text-ash">{label}</p>
      <h2 className="mt-1.5 text-[15px] font-medium leading-none text-ink">{title}</h2>
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

function ExpertRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-2 border-b border-hairline pb-3 last:border-b-0 last:pb-0">
      <ChevronRight size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-haze" />
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-[12px] leading-[1.65] text-ash">{body}</p>
      </div>
    </div>
  )
}
