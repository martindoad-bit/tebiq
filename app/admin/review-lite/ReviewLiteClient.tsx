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

const FLAG_LABEL: Record<string, string> = {
  source_gap: '来源不足',
  boundary_risk: '边界风险',
  needs_expert: '需要专家',
  unclear_steps: '步骤不清',
  stale_source: '来源需更新',
  public_copy_risk: '公开文案风险',
}

const FILTER_LABEL: Record<Filter, string> = {
  all: '全部',
  needs_review: '待复核',
  L3_L4: 'L3 / L4',
  requires_review: '需确认',
  weak_source: '来源不足',
}

const CHIP_LABEL: Record<string, string> = {
  workflow: '手续路径',
  faq: '问答',
  guide: '说明',
  requires_review: '需复核',
  reviewed: '已审核',
  needs_review: '待复核',
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
            <h2 className="mr-auto text-[13px] font-medium text-ash">原始问题</h2>
            <Chip>{question.status}</Chip>
            <Chip>{question.priority}</Chip>
            {question.visaType && <Chip>{question.visaType}</Chip>}
          </div>
          <p className="mt-4 whitespace-pre-line text-[18px] font-medium leading-[1.65] text-ink">{question.rawQuery}</p>
          <p className="mt-3 text-[12px] leading-[1.6] text-ash">
            暂无草稿。后续可由后台起草 Decision Card。
          </p>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          ['needs_review', FILTER_LABEL.needs_review],
          ['L3_L4', FILTER_LABEL.L3_L4],
          ['requires_review', FILTER_LABEL.requires_review],
          ['weak_source', FILTER_LABEL.weak_source],
          ['all', FILTER_LABEL.all],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key as Filter)}
            className={`rounded-[10px] border px-3 py-2 text-[12px] ${
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
        <h2 className="mr-auto text-[17px] font-medium leading-snug text-ink">{card.title}</h2>
        <Chip>{CHIP_LABEL[card.cardType] ?? card.cardType}</Chip>
        <Chip>{card.answerLevel}</Chip>
        <Chip>{card.sourceGrade}</Chip>
        <Chip>{card.requiresReview ? '需复核' : '已审核'}</Chip>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_360px]">
        <div className="rounded-[12px] bg-paper p-3">
          <p className="text-xs font-medium text-ink">内容草稿</p>
          <p className="mt-2 whitespace-pre-line text-xs leading-6 text-slate">
            {card.bodyMarkdown || card.recommendedAction || '未记录'}
          </p>
          <p className="mt-3 text-xs font-medium text-ink">来源</p>
          <ul className="mt-1 list-disc pl-4 text-xs leading-6 text-slate">
            {card.sourceRefs.map(source => <li key={`${source.title}-${source.url ?? ''}`}>{source.title}</li>)}
            {card.sourceRefs.length === 0 && <li>未记录</li>}
          </ul>
        </div>

        <form onSubmit={submit} className="grid gap-3 text-xs">
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
          <RadioGroup
            name="conclusion"
            label="方向判断"
            defaultValue="unknown"
            options={[
              ['ok', '方向正确'],
              ['wrong', '方向错误'],
              ['unknown', '不确定'],
            ]}
          />
          <RadioGroup
            name="publishDecision"
            label="公开判断"
            defaultValue="revise"
            options={[
              ['approve', '可公开'],
              ['revise', '修改后公开'],
              ['reject', '不公开'],
              ['escalate', '升级确认'],
            ]}
          />
          <RadioGroup
            name="expertNeed"
            label="需要专家"
            defaultValue="none"
            options={[
              ['none', '不需要'],
              ['shoshi', '行政書士'],
              ['sharoushi', '社労士'],
              ['tax_accountant', '税理士'],
              ['other', '其他'],
            ]}
          />
          <ScoreGrid />
          <div>
            <span className="mb-1.5 block font-medium text-ink">标签</span>
            <div className="flex flex-wrap gap-1.5">
              {FLAGS.map(flag => (
                <label
                  key={flag}
                  className={`min-h-[32px] rounded-[8px] border px-2.5 py-1.5 text-[11px] ${
                    flags.includes(flag) ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-ash'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={flags.includes(flag)}
                    onChange={event => {
                      setFlags(current => event.target.checked
                        ? [...current, flag]
                        : current.filter(item => item !== flag))
                    }}
                  />
                  {FLAG_LABEL[flag]}
                </label>
              ))}
            </div>
          </div>
          <Field label="补充说明">
            <textarea name="note" rows={2} className={INPUT_CLASS} placeholder="一句话审核说明" />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="min-h-[42px] rounded-btn bg-ink px-3 text-xs font-medium text-white disabled:opacity-50"
          >
            {busy ? '处理中...' : '保存审核记录'}
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
  const [value, setValue] = useState('3')
  return (
    <div>
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      <div className="grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map(score => {
          const current = String(score)
          return (
            <label
              key={score}
              className={`flex min-h-[34px] items-center justify-center rounded-[8px] border text-[13px] ${
                value === current ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-slate'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={current}
                checked={value === current}
                onChange={() => setValue(current)}
                className="sr-only"
              />
              {score}
            </label>
          )
        })}
      </div>
    </div>
  )
}

function RadioGroup({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string
  label: string
  defaultValue: string
  options: [string, string][]
}) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div>
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map(([optionValue, optionLabel]) => (
          <label
            key={optionValue}
            className={`min-h-[34px] rounded-[8px] border px-3 py-2 text-[11px] ${
              value === optionValue ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-slate'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => setValue(optionValue)}
              className="sr-only"
            />
            {optionLabel}
          </label>
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
  'w-full rounded-[10px] border border-hairline bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-ink'
