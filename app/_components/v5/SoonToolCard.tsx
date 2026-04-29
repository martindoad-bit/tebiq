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
      className="focus-ring min-h-[124px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 text-left transition active:bg-paper"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
        {icon}
      </span>
      <span className="mt-3 block text-[14px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[11px] leading-[1.55] text-ash">{desc}</span>
    </button>
  )
}
