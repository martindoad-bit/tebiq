'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
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
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/knowledge" className="text-body hover:text-title text-sm">
            ← 知识库
          </Link>
        </div>
      </header>

      <div className="px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight text-title">
            最新政策动态
          </h1>
          <p className="text-body text-sm md:text-base leading-relaxed mb-6">
            2025 年 10 月以后入管局发布的重大政策变化（按时间倒序）
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
            <p className="bg-card border border-line rounded-2xl p-8 text-center text-body text-sm">
              当前筛选下没有匹配的政策。
            </p>
          ) : (
            <ol className="space-y-4">
              {filtered.map(p => (
                <UpdateCard key={p.date + p.title} update={p} />
              ))}
            </ol>
          )}

          <p className="text-center text-muted text-xs mt-10 leading-relaxed">
            信息来源以入管局官网为准；本页内容不构成法律意见，标注[待书士审核]条目正在审核更新中
          </p>
        </div>
      </div>
    </main>
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
    <div className="bg-card border border-line rounded-2xl p-4 mb-6 space-y-3 shadow-sm">
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
      <p className="text-muted text-xs">
        显示 {shown} / {total} 条
      </p>
    </div>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted text-xs font-bold mr-1">{label}：</span>
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
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[36px] px-3 rounded-lg text-sm font-bold border transition-colors ${
        active
          ? 'bg-primary border-primary text-title'
          : 'bg-card border-line text-body hover:border-primary'
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
    <li className="bg-card border border-line rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 pt-5 pb-3 flex items-start gap-3">
        <div className="flex-shrink-0 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-full">
          {update.date}
        </div>
        <div className="text-xs text-muted">{typeLabel}</div>
      </div>
      <div className="px-5 pb-3">
        <h2 className="text-title text-base md:text-lg font-bold leading-snug mb-2">
          {update.title}
        </h2>
        <p className="text-body text-sm leading-relaxed">{update.summary}</p>
      </div>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-3 border-t border-line hover:bg-highlight/40 transition-colors text-primary text-sm font-bold"
        aria-expanded={open}
      >
        {open ? '收起详情 ▴' : '查看详情 ▾'}
      </button>
      {open && (
        <div className="px-5 py-4 bg-base/40 border-t border-line">
          <p className="text-body text-sm leading-relaxed whitespace-pre-line">
            {update.detail}
          </p>
        </div>
      )}
    </li>
  )
}
