'use client'
import { useState } from 'react'
import { GIJINKOKU_MATERIALS, type MaterialDetail } from '@/lib/check/materials'
import { materialDetails } from '@/lib/knowledge/materials'

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-muted flex-shrink-0 transition-transform ${
        open ? 'rotate-180' : ''
      }`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs leading-relaxed">
      <span className="text-muted">{label}：</span>
      <span className="text-body">{value}</span>
    </div>
  )
}

function ExpandableMaterial({ material }: { material: MaterialDetail }) {
  const [open, setOpen] = useState(false)
  // 优先从知识库（lib/knowledge/materials.ts）按日文名查 detail，否则回落到 legacy 字段
  const detail = material.nameJa ? materialDetails[material.nameJa] : null
  const where = detail?.where ?? material.where
  const bring = detail?.bring ?? material.whatToBring.join('、')
  const time = detail?.timeRequired ?? material.duration
  const cost = detail?.cost ?? material.cost
  const online =
    detail?.online ??
    (material.online
      ? `是${material.onlineNote ? ` · ${material.onlineNote}` : ''}`
      : '否')
  const tips = detail?.tips ?? material.pitfall

  return (
    <li className="border-t border-line first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-highlight/40 active:bg-highlight transition-colors text-left"
        aria-expanded={open}
      >
        <span
          className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 border rounded ${
            open
              ? 'bg-primary border-primary text-white'
              : 'border-line bg-card text-transparent'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="flex-1 text-title text-sm font-bold leading-snug">
          {material.name}
        </span>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-3">
          <Detail label="去哪里开" value={where} />
          <Detail label="需要带" value={bring} />
          <Detail label="多久拿到" value={time} />
          <Detail label="大概费用" value={cost} />
          <Detail label="可在线办理" value={online} />
          <div className="bg-highlight border-l-[3px] border-orange-500 px-3 py-2.5 mt-3 rounded">
            <div className="text-[#92400E] font-bold text-xs mb-1">
              ⚠ 外国人常见踩坑
            </div>
            <p className="text-[#92400E] text-xs leading-relaxed">{tips}</p>
          </div>
        </div>
      )}
    </li>
  )
}

function CategoryGroup({
  group,
}: {
  group: { category: string; materials: MaterialDetail[] }
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted px-1 pb-3 uppercase tracking-wide">
        {group.category}
      </h3>
      <div className="bg-card border border-line rounded-2xl overflow-hidden">
        <ul>
          {group.materials.map(m => (
            <ExpandableMaterial key={m.id} material={m} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function MaterialChecklist() {
  return (
    <>
      {GIJINKOKU_MATERIALS.map(group => (
        <CategoryGroup key={group.category} group={group} />
      ))}
    </>
  )
}

export function CollapsibleChecklist() {
  const [open, setOpen] = useState(false)
  const totalCount = GIJINKOKU_MATERIALS.reduce((s, g) => s + g.materials.length, 0)
  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-card border border-line hover:border-line rounded-2xl px-5 py-4 text-left transition-colors"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0 pr-3">
          <div className="text-primary font-bold text-base leading-snug">
            无论结果如何，以下材料都需要准备
          </div>
          <div className="text-muted text-xs mt-1 leading-relaxed">
            技人国续签所需的标准材料 · 共 {totalCount} 项
          </div>
        </div>
        <Chevron open={open} />
      </button>
      {open && (
        <div className="mt-3">
          <MaterialChecklist />
        </div>
      )}
    </div>
  )
}
