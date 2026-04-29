'use client'
import Link from 'next/link'
import { Camera, ClipboardCheck, ListChecks, MessageSquareText, TimerReset } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TOOLS: Array<{
  title: string
  desc: string
  href: string
  Icon: LucideIcon
  disabled?: boolean
}> = [
  { title: '拍照即懂', desc: '识别日文文书', href: '/photo', Icon: Camera },
  { title: '文字即懂', desc: '解释日文文本', href: '/ask', Icon: MessageSquareText },
  { title: '续签自查', desc: '查看当前风险点', href: '/check', Icon: ClipboardCheck },
  { title: '任务清单', desc: '即将开放', href: '/tools', Icon: ListChecks, disabled: true },
]

export default function ToolsClient() {
  return (
    <div className="pt-3">
      <section className="rounded-card border border-hairline bg-surface px-4 py-4">
        <h1 className="text-[17px] font-medium leading-snug text-ink">工具入口</h1>
        <p className="mt-1 text-[12px] leading-[1.65] text-ash">
          工具是档案的输入入口。
        </p>
      </section>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {TOOLS.map(tool => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <TimerReset size={20} strokeWidth={1.5} className="text-ink" />
          <div>
            <p className="text-[14px] font-medium text-ink">我的提醒</p>
            <p className="mt-0.5 text-[12px] text-ash">查看期限、记录和历史关联</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ToolCard({
  title,
  desc,
  href,
  Icon,
  disabled,
}: {
  title: string
  desc: string
  href: string
  Icon: LucideIcon
  disabled?: boolean
}) {
  const inner = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
        <Icon size={19} strokeWidth={1.5} />
      </span>
      <span className="mt-4 block text-[14px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[11px] leading-[1.55] text-ash">{desc}</span>
    </>
  )

  if (disabled) {
    return (
      <div className="min-h-[132px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 opacity-70">
        {inner}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className="focus-ring min-h-[132px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 active:bg-paper"
    >
      {inner}
    </Link>
  )
}
