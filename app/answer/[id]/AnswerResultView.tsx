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
  clarity?: Partial<Record<ClarityKey, string>>
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
    label: '需要进一步确认',
    detail: '先补齐关键日期和身份信息',
    className: 'bg-canvas text-slate',
  },
}

const FEEDBACK_OPTIONS = ['有帮助', '不准确', '看不懂', '我的情况不一样']
const CLARITY_SECTIONS: Array<{ key: ClarityKey; title: string }> = [
  { key: 'what', title: '现在要做什么' },
  { key: 'where', title: '去哪办理' },
  { key: 'materials', title: '需要准备什么' },
  { key: 'timing', title: '期限和时机' },
  { key: 'consequence', title: '不处理会怎样' },
  { key: 'expert', title: '需要专家确认的情况' },
]

export default function AnswerResultView({ answer }: { answer: AnswerResult }) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const meta = STATUS_META[answer.status]
  const cannotDetermine = answer.status === 'cannot_determine'

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
          <SectionHeading>用户问题</SectionHeading>
          <p className="mt-2 text-[12px] leading-[1.65] text-slate [overflow-wrap:anywhere]">{answer.question}</p>
        </div>

        <div className="mt-4 rounded-[12px] bg-paper px-3 py-3">
          <SectionHeading>结论</SectionHeading>
          <p className="mt-2 text-[14px] leading-[1.75] text-ink [overflow-wrap:anywhere]">{answer.summary}</p>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <SectionHeading>{cannotDetermine ? '先确认' : '下一步'}</SectionHeading>
          <ol className="mt-3 grid gap-2">
            {answer.nextSteps.slice(0, 3).map((step, index) => (
              <li key={step} className="grid grid-cols-[24px_1fr] gap-2 text-[12px] leading-[1.65] text-slate">
                <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">
                  {index + 1}
                </span>
              <span className="[overflow-wrap:anywhere]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-4 border-t border-hairline pt-4">
          <SectionHeading>边界说明</SectionHeading>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{answer.boundaryNote}</p>
        </div>
      </section>

      <section className="rounded-card border border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-3">
          <SectionTitle title={cannotDetermine ? '先确认这些信息' : '下一步说明'} />
        </div>
        <div className="divide-y divide-hairline">
          {CLARITY_SECTIONS.map(section => (
            <article key={section.title} className="px-4 py-4">
              <h2 className="text-[15px] font-medium leading-[1.5] text-ink [overflow-wrap:anywhere]">{section.title}</h2>
              <p className="mt-2 text-[13px] leading-[1.75] text-slate [overflow-wrap:anywhere]">
                {answer.clarity?.[section.key] ?? '这部分需要进一步确认。'}
              </p>
            </article>
          ))}
        </div>
      </section>

      {cannotDetermine && (
        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <SectionTitle title="建议咨询的专业人士" />
          <div className="mt-3 grid gap-2 text-[13px] leading-[1.65] text-slate">
            <ExpertRow title="在留手续专业人士" body="确认在留资格、材料边界和提交顺序。" />
            <ExpertRow title="社会保险相关窗口" body="确认社会保険、年金、健康保険的空档处理。" />
            <ExpertRow title="税务相关窗口" body="确认住民税、源泉徴収票、確定申告相关材料。" />
          </div>
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
              key={option}
              type="button"
              onClick={() => setFeedback(option)}
              className={`min-h-[40px] rounded-[10px] border px-3 text-[12px] transition-colors ${
                feedback === option
                  ? 'border-ink bg-ink text-white'
                  : 'border-hairline bg-canvas text-slate active:bg-paper'
              }`}
            >
              {option}
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

type ClarityKey = 'what' | 'where' | 'materials' | 'timing' | 'consequence' | 'expert'
