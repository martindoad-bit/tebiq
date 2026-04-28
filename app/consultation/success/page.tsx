import Link from 'next/link'
import { CheckCircle2, Clock3, Library, PhoneCall } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

export const metadata = {
  title: '咨询请求已提交 | TEBIQ',
}

export default function ConsultationSuccessPage() {
  return (
    <AppShell appBar={<AppBar title="预约咨询" back="/" />}>
      <section className="flex min-h-full items-center py-8">
        <div className="w-full rounded-card border border-hairline bg-surface px-5 py-7 text-center shadow-raised">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[18px] bg-[#E7F4ED] text-success">
            <CheckCircle2 size={32} strokeWidth={1.55} />
          </span>
          <h1 className="mt-5 text-[24px] font-medium leading-tight text-ink">提交成功</h1>
          <p className="mt-3 text-[13px] leading-[1.75] text-slate">
            我们会在 24 小时内联系你。<br />
            请保持联系方式畅通。
          </p>

          <div className="my-6 rounded-[13px] bg-accent-2 px-4 py-3 text-left">
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
              <PhoneCall size={14} strokeWidth={1.55} />
              如紧急情况
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate">
              请直接拨打 <span className="font-medium text-ink">（咨询热线即将开通）</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-btn bg-accent px-4 text-[14px] font-medium text-white shadow-cta transition-transform active:translate-y-px"
            >
              <Clock3 size={16} strokeWidth={1.55} />
              返回首页
            </Link>
            <Link
              href="/knowledge"
              className="inline-flex min-h-[42px] items-center justify-center gap-1.5 text-[13px] font-medium text-ink"
            >
              <Library size={15} strokeWidth={1.55} />
              在等待期间，了解更多签证知识
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
