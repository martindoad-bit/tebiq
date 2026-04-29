import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, IdCard } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { CHECK_VISA_META, type CanonicalCheckVisa } from '@/lib/check/dimensions'

export const metadata: Metadata = {
  title: '选择签证类型 | TEBIQ 自查',
  description: '选择你的在留资格类型，进入续签维度清单。',
  alternates: { canonical: '/check/select' },
}

export default function CheckSelectPage() {
  return (
    <AppShell appBar={<AppBar title="选择签证类型" back="/check" />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
            <IdCard size={18} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[13px] font-medium leading-snug text-ink">
              按在留カード上的「在留資格」选择
            </p>
            <p className="mt-1 text-[11px] leading-[1.55] text-ash">
              先进入维度清单，需要时再做完整自查。
            </p>
          </div>
        </div>
      </section>

      <ul className="mt-3 flex flex-col gap-2">
        {(Object.entries(CHECK_VISA_META) as Array<[CanonicalCheckVisa, { label: string }]>).map(([key, item]) => (
          <li key={key}>
            <Link
              href={`/check/${key}`}
              className="flex items-center justify-between rounded-[12px] border border-hairline bg-surface px-[14px] py-[13px] shadow-card transition-colors hover:border-accent active:translate-y-px"
            >
              <span className="text-[13px] text-ink jp-text">{item.label}</span>
              <ChevronRight size={16} className="text-haze" strokeWidth={1.6} />
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  )
}
