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

export default function ReviewLiteClient({ cards }: { cards: DecisionCard[] }) {
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
  const [scores, setScores] = useState({
    accuracyScore: 3,
    sourceScore: 3,
    boundaryScore: 3,
    actionabilityScore: 3,
  })

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
          ...scores,
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
    <article className="rounded-card border border-hairline bg-surface p-4 shadow-card">
      <div className="rounded-[12px] bg-paper px-4 py-3">
        <p className="text-[11px] leading-none text-ash">原始问题</p>
        <h2 className="mt-2 text-[18px] font-medium leading-[1.55] text-ink">{card.title}</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip>{card.cardType}</Chip>
          <Chip>{card.answerLevel}</Chip>
          <Chip>{card.sourceGrade}</Chip>
          <Chip>{card.requiresReview ? 'requires_review' : 'reviewed'}</Chip>
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[12px] border border-hairline bg-canvas p-3">
          <p className="text-[12px] font-medium text-ink">内容草稿</p>
          <p className="mt-2 max-h-[320px] overflow-auto whitespace-pre-line text-[12px] leading-[1.7] text-slate">
            {card.bodyMarkdown || card.recommendedAction || '未记录'}
          </p>
          <p className="mt-3 border-t border-hairline pt-3 text-[12px] font-medium text-ink">source refs</p>
          <ul className="mt-1 list-disc pl-4 text-[11.5px] leading-[1.7] text-ash">
            {card.sourceRefs.map(source => <li key={`${source.title}-${source.url ?? ''}`}>{source.title}</li>)}
            {card.sourceRefs.length === 0 && <li>未记录</li>}
          </ul>
        </div>

        <form onSubmit={submit} className="grid gap-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
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
          </div>
          <Field label="结论方向">
            <select name="conclusion" className={INPUT_CLASS} defaultValue="unknown">
              <option value="ok">对</option>
              <option value="wrong">错</option>
              <option value="unknown">不确定</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="公开判断">
              <select name="publishDecision" className={INPUT_CLASS} defaultValue="revise">
                <option value="approve">可以</option>
                <option value="revise">修改后可以</option>
                <option value="reject">不可以</option>
                <option value="escalate">升级确认</option>
              </select>
            </Field>
            <Field label="专家确认">
              <select name="expertNeed" className={INPUT_CLASS} defaultValue="none">
                <option value="none">否</option>
                <option value="shoshi">行政書士</option>
                <option value="sharoushi">社労士</option>
                <option value="tax_accountant">税理士</option>
                <option value="other">其他</option>
              </select>
            </Field>
          </div>
          <ScoreGrid scores={scores} onChange={setScores} />
          <div>
            <span className="mb-1.5 block font-medium text-ink">flags</span>
            <div className="flex flex-wrap gap-1.5">
              {FLAGS.map(flag => {
                const active = flags.includes(flag)
                return (
                  <button
                    key={flag}
                    type="button"
                    onClick={() => {
                      setFlags(current => active
                        ? current.filter(item => item !== flag)
                        : [...current, flag])
                    }}
                    className={`rounded-[9px] border px-2.5 py-1.5 text-[11px] ${
                      active ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-ash'
                    }`}
                  >
                    {flag}
                  </button>
                )
              })}
            </div>
          </div>
          <Field label="补充一句话">
            <textarea name="note" rows={2} className={INPUT_CLASS} placeholder="可选" />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="min-h-[42px] rounded-btn bg-ink px-3 text-xs font-medium text-white disabled:opacity-50"
          >
            {busy ? '处理中...' : '保存审核记录'}
          </button>
          {saved && <p className="rounded-[10px] bg-paper px-3 py-2 text-ash">{saved}</p>}
        </form>
      </div>
    </article>
  )
}

function ScoreGrid({
  scores,
  onChange,
}: {
  scores: {
    accuracyScore: number
    sourceScore: number
    boundaryScore: number
    actionabilityScore: number
  }
  onChange: (scores: {
    accuracyScore: number
    sourceScore: number
    boundaryScore: number
    actionabilityScore: number
  }) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Score name="accuracyScore" label="准确度" value={scores.accuracyScore} onChange={value => onChange({ ...scores, accuracyScore: value })} />
      <Score name="sourceScore" label="来源充分" value={scores.sourceScore} onChange={value => onChange({ ...scores, sourceScore: value })} />
      <Score name="boundaryScore" label="边界安全" value={scores.boundaryScore} onChange={value => onChange({ ...scores, boundaryScore: value })} />
      <Score name="actionabilityScore" label="可操作性" value={scores.actionabilityScore} onChange={value => onChange({ ...scores, actionabilityScore: value })} />
    </div>
  )
}

function Score({
  name,
  label,
  value,
  onChange,
}: {
  name: string
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div>
      <span className="mb-1 block font-medium text-ink">{label}</span>
      <input type="hidden" name={name} value={value} />
      <div className="grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map(score => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`min-h-[34px] rounded-[8px] border text-[12px] ${
              value === score ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-slate'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
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
  'w-full rounded-[10px] border border-hairline bg-canvas px-3 py-2.5 text-xs text-ink outline-none focus:border-ink'
