/**
 * /check/select — 选择签证类型（v5 screen 06）
 *
 * 8 个签证条目，每条 white card + hairline + 右箭头。
 * 视觉跟 docs/prototype/v5-mockup.html 1525-1556。
 *
 * CN/JP 混排规则：签证名用日文原文。
 */
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'

interface VisaEntry {
  name: string
  href: string
  /** Block 4 之前未实装的签证 */
  disabled?: boolean
}

const VISA_LIST: VisaEntry[] = [
  { name: '技術・人文知識・国際業務', href: '/check/gijinkoku' },
  { name: '特定技能', href: '/check/tokutei' },
  { name: '経営・管理', href: '/check/keiei' },
  // 家族滞在题库尚未实装（Block 4）
  { name: '家族滞在', href: '/check/select', disabled: true },
  { name: '日本人/永住者の配偶者等', href: '/check/haigusha' },
  { name: '定住者', href: '/check/teijusha' },
  // 留学转工作签证 / 其他签证暂未实装
  { name: '留学（转工作签证）', href: '/check/select', disabled: true },
  { name: '其他签证', href: '/check/select', disabled: true },
]

export default function CheckSelectPage() {
  return (
    <AppShell appBar={<AppBar title="选择你的签证类型" back="/check" />}>
      <ul className="mt-3 flex flex-col gap-2">
        {VISA_LIST.map(v => (
          <li key={v.name}>
            {v.disabled ? (
              <div
                className="flex items-center justify-between bg-surface border border-hairline rounded-chip px-[14px] py-[13px] opacity-60"
                aria-disabled="true"
              >
                <span className="text-[13px] text-ink">{v.name}</span>
                <span className="text-[10.5px] text-ash bg-accent-2 rounded-full px-2 py-0.5">
                  即将开放
                </span>
              </div>
            ) : (
              <Link
                href={v.href}
                className="flex items-center justify-between bg-surface border border-hairline rounded-chip px-[14px] py-[13px] hover:border-accent transition-colors"
              >
                <span className="text-[13px] text-ink">{v.name}</span>
                <ChevronRight size={16} className="text-haze" strokeWidth={1.6} />
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="text-center mt-5 text-[11px] text-ash">1/12</div>
    </AppShell>
  )
}
