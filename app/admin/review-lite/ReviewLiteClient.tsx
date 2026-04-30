'use client'

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { DecisionCard } from '@/lib/decision/types'

const FLAGS = [
  'source_gap',
  'boundary_risk',
  'needs_expert',
  'unclear_steps',
  'stale_source',
  'public_copy_risk',
]

const REVIEW_STATUS_LABEL: Record<string, string> = {
  reviewed: 'reviewed',
  needs_expert: 'needs_expert',
  rejected: 'rejected',
  unreviewed: '未处理',
}

const ANSWER_TYPE_LABEL: Record<string, string> = {
  matched: '已整理',
  draft: '草稿',
  cannot_determine: '需确认',
}

type Filter = 'all' | 'needs_review' | 'L3_L4' | 'requires_review' | 'weak_source'

interface ReviewQuestion {
  id: string
  rawQuery: string
  visaType: string | null
  sourcePage: string | null
  status: string
  priority: string
  createdAt: string
}

interface ReviewAnswerDraft {
  id: string
  questionText: string
  answerType: string
  answerLevel: string
  reviewStatus: string
  title: string
  summary: string
  createdAt: string
  reviewNote: string | null
}

export default function ReviewLiteClient({
  cards,
  question,
  answerDrafts,
}: {
  cards: DecisionCard[]
  question?: ReviewQuestion | null
  answerDrafts: ReviewAnswerDraft[]
}) {
  const [filter, setFilter] = useState<Filter>('needs_review')
  const visibleCards = useMemo(() => cards.filter(card => {
    if (filter === 'needs_review') return card.status === 'needs_review'
    if (filter === 'L3_L4') return card.answerLevel === 'L3' || card.answerLevel === 'L4'
    if (filter === 'requires_review') return card.requiresReview
    if (filter === 'weak_source') return card.sourceGrade === 'B' || card.sourceGrade === 'C'
    return true
  }), [cards, filter])

  return (
    <div className="grid gap-4">
      {question && (
        <section className="rounded-card border border-hairline bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="mr-auto text-[15px] font-medium text-ink">问题</h2>
            <Chip>{question.status}</Chip>
            <Chip>{question.priority}</Chip>
            {question.visaType && <Chip>{question.visaType}</Chip>}
          </div>
          <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-ink">{question.rawQuery}</p>
          <p className="mt-3 text-xs text-ash">
            {answerDrafts.some(draft => draft.questionText === question.rawQuery) ? '下方已有答案草稿。' : '暂无答案草稿。'}
          </p>
        </section>
      )}

      <section className="rounded-card border border-hairline bg-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="mr-auto text-base font-medium text-ink">答案草稿</h2>
          <Chip>{String(answerDrafts.length)}</Chip>
        </div>
        <div className="mt-3 grid gap-3">
          {answerDrafts.map(draft => <AnswerDraftReviewItem key={draft.id} draft={draft} />)}
          {answerDrafts.length === 0 && (
            <p className="rounded-[12px] bg-paper px-3 py-3 text-xs text-ash">
              暂无答案草稿。
            </p>
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {[
          ['needs_review', '待审核'],
          ['L3_L4', 'L3 / L4'],
          ['requires_review', '需复核'],
          ['weak_source', '来源不足'],
          ['all', '全部'],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key as Filter)}
            className={`rounded-[10px] border px-3 py-2 text-xs ${
              filter === key ? 'border-ink bg-ink text-white' : 'border-hairline bg-surface text-slate'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleCards.map(card => <ReviewCard key={card.slug} card={card} />)}
      {visibleCards.length === 0 && (
        <div className="rounded-card border border-hairline bg-surface p-5 text-sm text-ash">
          当前筛选没有记录。
        </div>
      )}
    </div>
  )
}

function AnswerDraftReviewItem({ draft }: { draft: ReviewAnswerDraft }) {
  const [status, setStatus] = useState(draft.reviewStatus)
  const [note, setNote] = useState(draft.reviewNote ?? '')
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setSaved(null)
    try {
      const res = await fetch('/api/admin/review-lite', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          answerDraftId: draft.id,
          reviewStatus: status,
          note,
        }),
      })
      setSaved(res.ok ? '已保存' : '保存失败')
    } catch {
      setSaved('保存失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="rounded-[12px] border border-hairline bg-paper p-3">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-auto text-sm font-medium text-ink">{draft.title}</h3>
        <Chip>{ANSWER_TYPE_LABEL[draft.answerType] ?? draft.answerType}</Chip>
        <Chip>{draft.answerLevel}</Chip>
        <Chip>{REVIEW_STATUS_LABEL[draft.reviewStatus] ?? draft.reviewStatus}</Chip>
      </div>
      <p className="mt-2 text-xs leading-6 text-slate">{draft.questionText}</p>
      <div className="mt-2 rounded-[10px] bg-canvas px-3 py-2">
        <p className="text-[11px] leading-none text-ash">答案摘要</p>
        <p className="mt-1.5 text-xs leading-6 text-slate">{draft.summary}</p>
      </div>
      <form onSubmit={submit} className="mt-3 grid gap-2 md:grid-cols-[160px_1fr_120px]">
        <select value={status} onChange={event => setStatus(event.target.value)} className={INPUT_CLASS}>
          <option value="reviewed">reviewed</option>
          <option value="needs_expert">needs_expert</option>
          <option value="rejected">rejected</option>
          <option value="unreviewed">unreviewed</option>
        </select>
        <input
          value={note}
          onChange={event => setNote(event.target.value)}
          className={INPUT_CLASS}
          placeholder="审核 note"
        />
        <button
          type="submit"
          disabled={busy}
          className="min-h-[36px] rounded-btn bg-ink px-3 text-xs font-medium text-white disabled:opacity-50"
        >
          {busy ? '处理中...' : '保存'}
        </button>
      </form>
      {saved && <p className="mt-2 text-xs text-ash">{saved}</p>}
    </article>
  )
}

function ReviewCard({ card }: { card: DecisionCard }) {
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [flags, setFlags] = useState<string[]>([])

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setBusy(true)
    setSaved(null)
    try {
      const conclusion = String(form.get('conclusion') ?? 'unknown')
      const res = await fetch('/api/admin/review-lite', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          cardSlug: card.slug,
          cardId: card.id,
          reviewerName: String(form.get('reviewerName') ?? 'staff'),
          reviewerRole: String(form.get('reviewerRole') ?? 'staff'),
          conclusionOk: conclusion === 'ok' ? true : conclusion === 'wrong' ? false : null,
          publishDecision: String(form.get('publishDecision') ?? 'revise'),
          expertNeed: String(form.get('expertNeed') ?? 'none'),
          accuracyScore: Number(form.get('accuracyScore') ?? 3),
          sourceScore: Number(form.get('sourceScore') ?? 3),
          boundaryScore: Number(form.get('boundaryScore') ?? 3),
          actionabilityScore: Number(form.get('actionabilityScore') ?? 3),
          flags,
          note: String(form.get('note') ?? ''),
        }),
      })
      setSaved(res.ok ? '已保存审核记录' : '保存失败')
    } catch {
      setSaved('保存失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <article className="rounded-card border border-hairline bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="mr-auto text-base font-medium text-ink">{card.title}</h2>
        <Chip>{card.cardType}</Chip>
        <Chip>{card.answerLevel}</Chip>
        <Chip>{card.sourceGrade}</Chip>
        <Chip>{card.requiresReview ? '需复核' : 'reviewed'}</Chip>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_360px]">
        <div className="rounded-[12px] bg-paper p-3">
          <p className="text-xs font-medium text-ink">答案摘要</p>
          <p className="mt-2 whitespace-pre-line text-xs leading-6 text-slate">
            {card.bodyMarkdown || card.recommendedAction || '未记录'}
          </p>
          <p className="mt-3 text-xs font-medium text-ink">来源</p>
          <ul className="mt-1 list-disc pl-4 text-xs leading-6 text-slate">
            {card.sourceRefs.map(source => <li key={`${source.title}-${source.url ?? ''}`}>{source.title}</li>)}
            {card.sourceRefs.length === 0 && <li>未记录</li>}
          </ul>
        </div>

        <form onSubmit={submit} className="grid gap-2 text-xs">
          <Field label="审核人">
            <input name="reviewerName" defaultValue="staff" className={INPUT_CLASS} />
          </Field>
          <Field label="角色">
            <select name="reviewerRole" className={INPUT_CLASS} defaultValue="staff">
              <option value="staff">staff</option>
              <option value="shoshi">shoshi</option>
              <option value="founder">founder</option>
              <option value="other">other</option>
            </select>
          </Field>
          <Field label="结论方向">
            <select name="conclusion" className={INPUT_CLASS} defaultValue="unknown">
              <option value="ok">对</option>
              <option value="wrong">错</option>
              <option value="unknown">不确定</option>
            </select>
          </Field>
          <Field label="是否可公开">
            <select name="publishDecision" className={INPUT_CLASS} defaultValue="revise">
              <option value="approve">可以</option>
              <option value="revise">修改后可以</option>
              <option value="reject">不可以</option>
              <option value="escalate">升级确认</option>
            </select>
          </Field>
          <Field label="是否需要专家">
            <select name="expertNeed" className={INPUT_CLASS} defaultValue="none">
              <option value="none">否</option>
              <option value="shoshi">行政書士</option>
              <option value="sharoushi">社労士</option>
              <option value="tax_accountant">税理士</option>
              <option value="other">其他</option>
            </select>
          </Field>
          <ScoreGrid />
          <div>
            <span className="mb-1 block font-medium text-ink">标记</span>
            <div className="flex flex-wrap gap-1">
              {FLAGS.map(flag => (
                <label key={flag} className="rounded-[8px] border border-hairline bg-canvas px-2 py-1 text-ash">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={flags.includes(flag)}
                    onChange={event => {
                      setFlags(current => event.target.checked
                        ? [...current, flag]
                        : current.filter(item => item !== flag))
                    }}
                  />
                  {flag}
                </label>
              ))}
            </div>
          </div>
          <Field label="审核说明">
            <textarea name="note" rows={2} className={INPUT_CLASS} placeholder="一句话审核说明" />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="min-h-[38px] rounded-btn bg-ink px-3 text-xs font-medium text-white disabled:opacity-50"
          >
            {busy ? '处理中...' : '保存审核'}
          </button>
          {saved && <p className="text-ash">{saved}</p>}
        </form>
      </div>
    </article>
  )
}

function ScoreGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Score name="accuracyScore" label="准确度" />
      <Score name="sourceScore" label="来源充分" />
      <Score name="boundaryScore" label="边界安全" />
      <Score name="actionabilityScore" label="可操作性" />
    </div>
  )
}

function Score({ name, label }: { name: string; label: string }) {
  return (
    <label>
      <span className="mb-1 block font-medium text-ink">{label}</span>
      <select name={name} className={INPUT_CLASS} defaultValue="3">
        {[1, 2, 3, 4, 5].map(score => <option key={score} value={score}>{score}</option>)}
      </select>
    </label>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label>
      <span className="mb-1 block font-medium text-ink">{label}</span>
      {children}
    </label>
  )
}

function Chip({ children }: { children: string }) {
  return <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] text-ash">{children}</span>
}

const INPUT_CLASS =
  'w-full rounded-[10px] border border-hairline bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-ink'
