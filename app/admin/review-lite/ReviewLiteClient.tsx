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

export default function ReviewLiteClient({
  cards,
  question,
}: {
  cards: DecisionCard[]
  question?: ReviewQuestion | null
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
            <h2 className="mr-auto text-[13px] font-medium text-ink">原始问题</h2>
            <Chip>status: {question.status}</Chip>
            <Chip>priority: {question.priority}</Chip>
            {question.visaType && <Chip>{question.visaType}</Chip>}
          </div>
          <p className="mt-4 whitespace-pre-line text-[17px] font-medium leading-[1.65] text-ink">
            {question.rawQuery}
          </p>
          <p className="mt-3 text-[12px] leading-[1.6] text-ash">
            source_page: {question.sourcePage ?? 'unknown'} / created_at: {question.createdAt}
          </p>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['needs_review', 'needs_review'],
          ['L3_L4', 'L3 / L4'],
          ['requires_review', 'requires_review'],
          ['weak_source', 'source_grade 不足'],
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

function ReviewCard({ card }: { card: DecisionCard }) {
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [flags, setFlags] = useState<string[]>([])
  const [reviewStatus, setReviewStatus] = useState<ReviewAction>(
    card.status === 'rejected' ? 'rejected' : card.requiresReview ? 'needs_expert' : 'reviewed',
  )
  const summary = card.bodyMarkdown || card.recommendedAction || '未记录'
  const questionText = extractQuestion(card)

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
      <div className="grid gap-4">
        <header className="grid gap-3 border-b border-hairline pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>answer draft</Chip>
            <Chip>answer_type: {card.cardType}</Chip>
            <Chip>answer_level: {formatAnswerLevel(card.answerLevel)}</Chip>
            <Chip>review_status: {reviewStatus}</Chip>
          </div>
          <h2 className="text-[18px] font-medium leading-[1.5] text-ink">{card.title}</h2>
          <div className="rounded-[12px] bg-paper px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-ash">question</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-ink">{questionText}</p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[1fr_320px]">
          <div className="grid gap-3">
            <div className="rounded-[12px] bg-paper p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ash">summary</p>
              <p className="mt-2 whitespace-pre-line text-[13px] leading-[1.75] text-slate">
                {summary}
              </p>
            </div>
            <div className="rounded-[12px] bg-paper p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-ash">sources</p>
              <ul className="mt-2 grid gap-1.5 text-[12px] leading-[1.6] text-slate">
                {card.sourceRefs.map(source => <li key={`${source.title}-${source.url ?? ''}`}>{source.title}</li>)}
                {card.sourceRefs.length === 0 && <li>未记录</li>}
              </ul>
            </div>
          </div>

        <form onSubmit={submit} className="grid gap-3 text-xs">
          <div>
            <span className="mb-2 block font-medium text-ink">审核标记</span>
            <div className="grid grid-cols-3 gap-2">
              {(['reviewed', 'needs_expert', 'rejected'] as ReviewAction[]).map(action => (
                <button
                  key={action}
                  type="button"
                  onClick={() => setReviewStatus(action)}
                  className={`min-h-[38px] rounded-[10px] border px-2 text-[11px] ${
                    reviewStatus === action
                      ? 'border-ink bg-ink text-white'
                      : 'border-hairline bg-canvas text-slate'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
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
            <span className="mb-1 block font-medium text-ink">flags</span>
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
          <Field label="note">
            <textarea name="note" rows={2} className={INPUT_CLASS} placeholder="一句话审核说明" />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="min-h-[38px] rounded-btn bg-ink px-3 text-xs font-medium text-white disabled:opacity-50"
          >
            {busy ? '处理中...' : '保存审核记录'}
          </button>
          {saved && <p className="text-ash">{saved}</p>}
        </form>
      </div>
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

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] leading-none text-ash">{children}</span>
}

const INPUT_CLASS =
  'w-full rounded-[10px] border border-hairline bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-ink'

type ReviewAction = 'reviewed' | 'needs_expert' | 'rejected'

function formatAnswerLevel(level: DecisionCard['answerLevel']): string {
  if (level === 'L1') return 'L1 一般信息'
  if (level === 'L2') return 'L2 手续路径'
  if (level === 'L3') return 'L3 决策辅助'
  return 'L4 个案判断'
}

function extractQuestion(card: DecisionCard): string {
  const rawQuery = card.trigger['rawQuery']
  if (typeof rawQuery === 'string' && rawQuery.trim()) return rawQuery

  const query = card.trigger['query']
  if (typeof query === 'string' && query.trim()) return query

  const keywords = card.trigger['keywords']
  if (Array.isArray(keywords) && keywords.length > 0) {
    return keywords.filter(item => typeof item === 'string').join(' / ')
  }

  return card.title
}
