'use client'
import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, ListFilter, Newspaper } from 'lucide-react'
import type { ReactNode } from 'react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import { policyUpdates, type PolicyUpdate } from '@/lib/knowledge/policy-updates'

type YearFilter = 'all' | '2026' | '2025'
type TypeFilter = 'all' | PolicyUpdate['type']

export default function UpdatesPage() {
  const [yearFilter, setYearFilter] = useState<YearFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')

  const sorted = useMemo(
    () => [...policyUpdates].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  )

  const filtered = useMemo(
    () =>
      sorted.filter(p => {
        if (yearFilter !== 'all' && !p.date.startsWith(yearFilter)) return false
        if (typeFilter !== 'all' && p.type !== typeFilter) return false
        return true
      }),
    [sorted, yearFilter, typeFilter],
  )

  return (
    <AppShell appBar={<AppBar title="政策动态" back="/knowledge" />}>
      <div className="py-5">
        <div className="inline-flex items-center gap-1.5 rounded-chip bg-accent-2 px-3 py-1.5 text-[11px] font-medium text-ink">
          <Newspaper size={13} strokeWidth={1.55} />
          最新政策动态
        </div>
        <h1 className="mt-3 text-[25px] font-medium leading-tight text-ink">
          入管局政策变化记录
        </h1>
        <p className="mt-3 text-[13px] leading-[1.7] text-slate">
          2025 年 10 月以后入管局发布的重大政策变化，按时间倒序整理。
        </p>

        <FilterBar
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          shown={filtered.length}
          total={sorted.length}
        />

        {filtered.length === 0 ? (
          <p className="rounded-card border border-hairline bg-surface px-4 py-8 text-center text-[13px] text-ash shadow-card">
            当前筛选下没有匹配的政策。
          </p>
        ) : (
          <ol className="space-y-3">
            {filtered.map(p => (
              <UpdateCard key={p.date + p.title} update={p} />
            ))}
          </ol>
        )}

        <p className="mt-8 text-center text-[11px] leading-relaxed text-ash">
          信息来源以入管局官网为准；本页内容不构成法律意见，标注 [待书士审核] 的条目正在审核更新中。
        </p>
      </div>
    </AppShell>
  )
}

function FilterBar({
  yearFilter,
  setYearFilter,
  typeFilter,
  setTypeFilter,
  shown,
  total,
}: {
  yearFilter: YearFilter
  setYearFilter: (v: YearFilter) => void
  typeFilter: TypeFilter
  setTypeFilter: (v: TypeFilter) => void
  shown: number
  total: number
}) {
  const years: { v: YearFilter; label: string }[] = [
    { v: 'all', label: '全部' },
    { v: '2026', label: '2026' },
    { v: '2025', label: '2025' },
  ]
  const types: { v: TypeFilter; label: string }[] = [
    { v: 'all', label: '全部签证' },
    { v: 'gijinkoku', label: '技人国' },
    { v: 'keiei', label: '经营管理' },
    { v: 'other', label: '共通 / 其他' },
  ]
  return (
    <div className="my-5 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-ink">
        <ListFilter size={16} strokeWidth={1.55} />
        筛选
      </div>
      <FilterRow label="年份">
        {years.map(y => (
          <FilterButton
            key={y.v}
            active={yearFilter === y.v}
            onClick={() => setYearFilter(y.v)}
          >
            {y.label}
          </FilterButton>
        ))}
      </FilterRow>
      <FilterRow label="签证">
        {types.map(t => (
          <FilterButton
            key={t.v}
            active={typeFilter === t.v}
            onClick={() => setTypeFilter(t.v)}
          >
            {t.label}
          </FilterButton>
        ))}
      </FilterRow>
      <p className="text-[11px] text-ash">
        显示 {shown} / {total} 条
      </p>
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 last:mb-0">
      <span className="mr-1 text-[11px] font-medium text-ash">{label}：</span>
      {children}
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[34px] rounded-[10px] border px-3 text-[12px] font-medium transition-colors ${
        active
          ? 'border-accent bg-accent text-white shadow-soft'
          : 'border-hairline bg-surface text-ash hover:border-accent'
      }`}
    >
      {children}
    </button>
  )
}

function UpdateCard({ update }: { update: PolicyUpdate }) {
  const [open, setOpen] = useState(false)
  const typeLabel =
    update.type === 'gijinkoku' ? '技人国' : update.type === 'keiei' ? '经营管理' : '其他'

  return (
    <li className="overflow-hidden rounded-card border border-hairline bg-surface shadow-card">
      <div className="flex items-start gap-3 px-4 pb-2 pt-4">
        <div className="flex-shrink-0 rounded-[9px] bg-accent px-2 py-1 text-[11px] font-medium text-white">
          {update.date}
        </div>
        <div className="pt-1 text-[11px] text-ash">{typeLabel}</div>
      </div>
      <div className="px-4 pb-3">
        <h2 className="mb-2 text-[14px] font-medium leading-snug text-ink">
          {update.title}
        </h2>
        <p className="text-[12px] leading-[1.7] text-slate">{update.summary}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-1 border-t border-hairline px-4 py-3 text-left text-[12px] font-medium text-ink transition-colors hover:bg-canvas"
        aria-expanded={open}
      >
        {open ? <ChevronUp size={14} strokeWidth={1.55} /> : <ChevronDown size={14} strokeWidth={1.55} />}
        {open ? '收起详情' : '查看详情'}
      </button>
      {open && (
        <div className="border-t border-hairline bg-canvas px-4 py-4">
          <p className="whitespace-pre-line text-[12px] leading-[1.75] text-slate">
            {update.detail}
          </p>
        </div>
      )}
    </li>
  )
}
