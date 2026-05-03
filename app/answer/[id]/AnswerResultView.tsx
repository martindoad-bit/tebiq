'use client'

import { useState } from 'react'
import type { AnswerViewModel, PublicAnswer } from '@/lib/answer/core/types'
import SaveMatterButton from '@/app/_components/SaveMatterButton'

// Answer Core V1 renderer.
//
// Contract: this component consumes ONLY `AnswerViewModel`. Every
// piece of user-visible text comes from `viewModel.public` (a
// `PublicAnswer`). The component never reads from a legacy `draft` or
// from a legacy `AnswerResult`. If a future maintainer needs to add
// content, they must add it to PublicAnswer and route through the
// projector.

const FEEDBACK_OPTIONS = [
  { type: 'helpful', label: '有帮助' },
  { type: 'inaccurate', label: '不准确' },
  { type: 'unclear', label: '看不懂' },
  { type: 'my_case_differs', label: '理解错了', note: 'intent_wrong' },
  { type: 'my_case_differs', label: '我的情况不一样' },
] as const

export default function AnswerResultView({
  viewModel,
  answerId,
}: {
  viewModel: AnswerViewModel
  answerId?: string | null
}) {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [busyFeedback, setBusyFeedback] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  const p = viewModel.public
  const status = p.status
  const showActionTemplate = status === 'answered' || status === 'preliminary'
  const copySource = buildCopyText(p)

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
      <section className="rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <span className={`rounded-[9px] px-2.5 py-1 text-[11px] leading-none ${viewModel.status_class}`}>
          {viewModel.status_label}
        </span>
        <h1 className="mt-4 text-[22px] font-medium leading-[1.38] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {p.title}
        </h1>
        <p className="mt-3 rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.7] text-slate [overflow-wrap:anywhere]">
          {viewModel.question}
        </p>
        <div className="mt-3 rounded-[12px] border border-hairline bg-canvas px-3 py-3">
          <p className="text-[11px] font-medium text-ash">我理解你的问题是</p>
          <p className="mt-1.5 text-[13px] leading-[1.65] text-ink [overflow-wrap:anywhere]">
            {viewModel.understood_question}
          </p>
        </div>

        {showActionTemplate ? (
          // V1.2 — answer body flows as 3 unlabelled paragraphs:
          //   ¶0 = direct answer to the asked question
          //   ¶1 = true_focus (the thing that actually matters)
          //   ¶2 = next_steps (1–3 concrete actions)
          // Per Context Pack §5: NO labels ("结论 / 下一步 / true_focus"
          // are forbidden). The middle paragraph gets a subtle visual
          // emphasis (left hairline + slightly heavier ink) so the
          // reader's eye lands on it without us telling them why.
          //
          // For non-3-段 sources (legacy_seed / rule_based) the body
          // may be 1 or 2 paragraphs; we render flat without emphasis.
          (() => {
            const primary = p.sections.find(s => s.heading === '答案')
            const body = (primary?.body || p.conclusion).trim()
            const paragraphs = body.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
            const isThreeStrip = paragraphs.length === 3
            return (
              <div className="mt-4 grid gap-4">
                {paragraphs.map((para, idx) => {
                  const isTrueFocus = isThreeStrip && idx === 1
                  return (
                    <p
                      key={idx}
                      data-tebiq-segment={isTrueFocus ? 'true-focus' : isThreeStrip ? (idx === 0 ? 'direct-answer' : 'next-steps') : 'body'}
                      className={
                        isTrueFocus
                          ? 'border-l-2 border-[var(--tebiq-warm-amber,#D4A23A)] pl-3 text-[15px] leading-[1.75] text-ink font-medium whitespace-pre-line [overflow-wrap:anywhere]'
                          : 'text-[15px] leading-[1.7] text-ink whitespace-pre-line [overflow-wrap:anywhere]'
                      }
                    >
                      {para}
                    </p>
                  )
                })}
              </div>
            )
          })()
        ) : (
          <div className="mt-4">
            <p className="text-[14px] leading-[1.7] text-ink [overflow-wrap:anywhere]">{p.summary}</p>
          </div>
        )}
      </section>

      {showActionTemplate && (
        <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4">
          <div className="divide-y divide-hairline">
            {p.next_steps.length > 2 && (
              <NumberedList title="步骤" items={p.next_steps.slice(2)} />
            )}
            {p.documents_needed.length > 0 && (
              <BulletList title="要带什么" items={p.documents_needed} />
            )}
            {/* Render projector-emitted sections (期限和时机, 办理窗口,
                etc.) that aren't already covered by the dedicated UI
                blocks above. PublicAnswer.sections is constructed by
                the projector — its headings are stable. */}
            {extraSections(p.sections).map(section => (
              <SectionBlock key={section.heading} heading={section.heading} body={section.body} />
            ))}
            {p.risk_warnings.length > 0 && (
              <BulletList title="需要注意的风险因素" items={p.risk_warnings} />
            )}
            {p.consult_trigger && (
              <BulletList title="什么情况下要找专家" items={[p.consult_trigger]} />
            )}
          </div>
        </section>
      )}

      {(status === 'clarification_needed' || status === 'out_of_scope') && p.clarification_questions.length > 0 && (
        <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
          <SectionHeading>{status === 'out_of_scope' ? '请补充' : '需要先确认'}</SectionHeading>
          <ul className="mt-3 grid gap-3">
            {p.clarification_questions.map(q => (
              <li key={q} className="rounded-[12px] bg-paper px-3 py-3 text-[13px] leading-[1.65] text-ink">
                {q}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* V0 — Matter Draft save button. Only surfaced for actionable
          modes (answered / preliminary). clarification / oos don't
          have a path worth saving yet. */}
      {showActionTemplate && answerId && (
        <section className="mt-5 flex justify-end">
          <SaveMatterButton
            answer_id={answerId}
            question={viewModel.question}
            title={p.title}
            summary={p.summary || p.conclusion}
            urgency={status === 'answered' ? 'soon' : 'later'}
          />
        </section>
      )}

      {showActionTemplate && (
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

      <section className="mt-5 border-t border-hairline pt-4">
        <SectionHeading>来源与说明</SectionHeading>
        <p className="mt-2 text-[12px] leading-[1.7] text-ash [overflow-wrap:anywhere]">{p.disclaimer}</p>
      </section>

      <section className="mt-5 rounded-[16px] border border-hairline bg-surface px-4 py-4">
        <h2 className="text-[15px] font-medium leading-none text-ink">这个整理有帮助吗？</h2>
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

// ---------- helpers ----------

function SectionHeading({ children }: { children: string }) {
  return <h2 className="text-[13px] font-medium leading-none text-ink">{children}</h2>
}

function NumberedList({ title, items, emphasis = false }: { title: string; items: string[]; emphasis?: boolean }) {
  if (items.length === 0) return null
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <SectionHeading>{title}</SectionHeading>
      <ol className="mt-3 grid gap-2">
        {items.map((item, index) => (
          <li
            key={`${title}-${item}-${index}`}
            className={`grid grid-cols-[24px_1fr] gap-2 ${emphasis ? 'text-[13px] text-ink' : 'text-[12px] text-slate'} leading-[1.65]`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">
              {index + 1}
            </span>
            <span className="[overflow-wrap:anywhere]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <SectionHeading>{title}</SectionHeading>
      <ul className="mt-3 grid gap-2">
        {items.map((item, index) => (
          <li key={`${title}-${item}-${index}`} className="grid grid-cols-[24px_1fr] gap-2 text-[12px] text-slate leading-[1.65]">
            <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">·</span>
            <span className="[overflow-wrap:anywhere]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Headings already rendered by dedicated UI blocks. The projector emits
// a fuller `sections` array (including 期限和时机 / 办理窗口 / etc.);
// we surface those that don't duplicate the dedicated UI.
const HEADINGS_RENDERED_ELSEWHERE = new Set([
  '答案', // V1.1 — primary unlabelled body, rendered above
  '结论', // legacy V1 heading (kept for backwards compat with old drafts)
  '下一步', // legacy V1 heading
  '初步答案', // legacy V0/V0.1 heading
  '需要材料', // documents_needed bullets
  '不做会怎样', // (legacy heading) — deduped
  '需要注意的风险因素', // risk_warnings bullets
  '什么情况下要找专家', // consult_trigger
  '需要先确认', // clarification_questions
  '请补充', // out_of_scope clarifications
  '我理解你的问题是', // panel above
  '我先按这些假设整理', // assumptions panel (handled below if added)
])

function extraSections(sections: PublicAnswer['sections']): PublicAnswer['sections'] {
  return sections.filter(section => !HEADINGS_RENDERED_ELSEWHERE.has(section.heading.trim()))
}

function SectionBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <SectionHeading>{heading}</SectionHeading>
      <p className="mt-3 text-[12px] leading-[1.65] text-slate whitespace-pre-line [overflow-wrap:anywhere]">
        {body}
      </p>
    </div>
  )
}

function buildCopyText(p: PublicAnswer): string {
  const lines: string[] = []
  if (p.conclusion) lines.push(p.conclusion)
  if (p.next_steps.length > 0) {
    lines.push(p.next_steps.slice(0, 3).map((s, i) => `${i + 1}. ${s}`).join('\n'))
  }
  if (p.consult_trigger) lines.push(p.consult_trigger)
  const text = lines.join(' ')
  return text.length > 240 ? text.slice(0, 239) + '…' : text
}
