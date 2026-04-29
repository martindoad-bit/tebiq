'use client'
import Link from 'next/link'
import { Camera, ClipboardCheck, TimerReset } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TOOLS: Array<{
  title: string
  desc: string
  href: string
  Icon: LucideIcon
}> = [
  { title: '拍照即懂', desc: '拍日文文件，看重点和处理步骤', href: '/photo', Icon: Camera },
  { title: '续签自查', desc: '3 分钟看续签前置风险', href: '/check', Icon: ClipboardCheck },
  { title: '我的提醒', desc: '查看期限、记录和历史关联', href: '/timeline', Icon: TimerReset },
]

export default function ToolsClient() {
  return (
    <div className="pt-3">
      <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h1 className="text-[17px] font-medium leading-snug text-ink">工具入口</h1>
        <p className="mt-1 text-[12px] leading-[1.65] text-ash">
          拍照、自查、提醒。
        </p>
      </section>
      <div className="mt-3 grid grid-cols-1 gap-3">
        {TOOLS.map(tool => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  )
}

function ToolCard({
  title,
  desc,
  href,
  Icon,
}: {
  title: string
  desc: string
  href: string
  Icon: LucideIcon
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
        <Icon size={19} strokeWidth={1.55} />
      </span>
      <span className="mt-3 block text-[14px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[11px] leading-[1.55] text-ash">{desc}</span>
    </>
  )

  return (
    <Link
      href={href}
      className="min-h-[142px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 shadow-card transition active:translate-y-px"
    >
      {inner}
    </Link>
  )
}
