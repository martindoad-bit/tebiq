import Link from 'next/link'
import { CheckCircle2, Library, MessageSquarePlus } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'

export const metadata = {
  title: '咨询请求已提交 | TEBIQ',
}

export default function ConsultationSuccessPage() {
  return (
    <AppShell appBar={<AppBar title="预约咨询" back="/scrivener" />} tabBar={<TabBar />}>
      <section className="flex min-h-full items-center py-8">
        <div className="w-full rounded-card border border-hairline bg-surface px-5 py-7 text-center shadow-raised">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#E7F4ED] text-success">
            <CheckCircle2 size={32} strokeWidth={1.55} />
          </span>
          <h1 className="mt-5 text-[24px] font-medium leading-tight text-ink">提交成功</h1>
          <p className="mt-3 text-[13px] leading-[1.75] text-slate">
            预约信息已提交。后续方式以预约说明为准。<br />
            如需补充背景，也可以先在 TEBIQ 里继续整理。
          </p>

          <div className="my-6 rounded-[13px] bg-accent-2 px-4 py-3 text-left">
            <p className="text-[12px] font-medium text-ink">提醒</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate">
              提交信息不代表已委托办理；行政书士可基于你提供的信息确认和建议，但不保证申请结果。
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/ai-consultation"
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta transition-transform active:translate-y-px"
            >
              <MessageSquarePlus size={16} strokeWidth={1.55} />
              回到提问
            </Link>
            <Link
              href="/quick-reference"
              className="inline-flex min-h-[42px] items-center justify-center gap-1.5 text-[13px] font-medium text-ink"
            >
              <Library size={15} strokeWidth={1.55} />
              查看材料
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
