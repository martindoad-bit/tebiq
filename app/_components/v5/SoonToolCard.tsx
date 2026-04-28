'use client'
import type { ReactNode } from 'react'

export default function SoonToolCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => window.alert('任务清单即将开放')}
      className="min-h-[124px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 text-left shadow-card transition active:translate-y-px"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
        {icon}
      </span>
      <span className="mt-3 block text-[14px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[11px] leading-[1.55] text-ash">{desc}</span>
    </button>
  )
}
