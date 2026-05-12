import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ClipboardList, ShieldCheck, UserCheck } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'

export const metadata: Metadata = {
  title: '找书士 - TEBIQ',
  description: 'TEBIQ 行政书士咨询入口。单次 30 分钟，咨询费可在后续办理中抵扣。',
  robots: { index: false, follow: false },
}

export default function ScrivenerPage() {
  return (
    <AppShell appBar={<AppBar title="找书士" />} tabBar={<TabBar />}>
      <div className="space-y-4 pt-3">
        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
              <UserCheck size={20} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-medium uppercase tracking-normal text-haze">
                行政书士咨询
              </p>
              <h1 className="mt-1 text-[24px] font-medium leading-tight text-ink">
                找行政书士确认
              </h1>
              <p className="mt-2 text-[14px] leading-[1.7] text-slate">
                适合期限、材料、补件、不许可、换签路径等需要结合个人情况判断的问题。
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <p className="text-[13px] font-medium text-ash">费用</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-[32px] font-semibold leading-none text-ink">¥5,000</span>
            <span className="pb-1 text-[14px] text-slate">/ 30 分钟</span>
          </div>
          <p className="mt-3 text-[14px] leading-[1.7] text-slate">
            如后续委托办理，可按预约时说明抵扣办理费用。查看预约方式不会自动预约或收费。
          </p>
        </section>

        <section className="px-1 py-1">
          <div className="flex items-center gap-2 text-[14px] font-medium text-ink">
            <ClipboardList size={16} strokeWidth={1.5} />
            咨询前建议准备
          </div>
          <ul className="mt-3 space-y-2.5 text-[14px] leading-[1.7] text-slate">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={1.5} />
              在留卡正反面、入管通知、补材料通知等相关材料。
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={1.5} />
              目前在留期限、提交期限、离职日、入职日等关键日期。
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={1.5} />
              TEBIQ 里已经问过的咨询记录链接。
            </li>
          </ul>
        </section>

        <section className="rounded-card bg-paper px-4 py-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={1.5} />
            <p className="text-[13.5px] leading-[1.7] text-slate">
              行政书士可基于你提供的信息进行确认和建议，但不保证申请结果。
            </p>
          </div>
        </section>

        <Link
          href="/consultation"
          className="focus-ring flex min-h-[50px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-ink px-4 py-3 text-[15px] font-medium leading-none text-white"
        >
          了解预约方式
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </AppShell>
  )
}
