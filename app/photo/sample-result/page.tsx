import Link from 'next/link'
import { Archive, CalendarDays, FileText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'

export const metadata = {
  title: '样例结果 | TEBIQ',
  description: 'TEBIQ 拍照识别样例结果。',
}

export default function PhotoSampleResultPage() {
  return (
    <AppShell appBar={<AppBar title="样例结果" back />} tabBar={<TabBar />}>
      <section className="mt-3 border-b border-hairline pb-5">
        <p className="text-[11px] leading-none text-ash">脱敏样例</p>
        <h1 className="jp-text mt-2 text-[22px] font-medium leading-snug text-ink">住民税 納付通知書</h1>
        <p className="mt-1 text-[13px] leading-[1.6] text-ash">住民税缴费通知 / 江戸川区役所</p>
      </section>

      <section className="mt-3 overflow-hidden rounded-card border border-hairline bg-surface">
        <SampleFact label="文书类型" value="納付通知書" sub="住民税缴费通知" />
        <SampleFact label="发件机构" value="江戸川区役所" sub="市区町村役所" />
        <SampleFact label="期限" value="2026.06.30" sub="到期前加入提醒" />
        <SampleFact label="金额" value="¥38,500" sub="以原文件金额为准" />
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-paper text-ink">
            <CalendarDays size={17} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[13px] font-medium leading-snug text-ink">要做什么</h2>
            <div className="mt-3 divide-y divide-hairline">
              <ActionLine index="1" text="确认通知书上的納付期限。" />
              <ActionLine index="2" text="按原文件金额缴纳。" />
              <ActionLine index="3" text="保留缴费记录。" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] font-medium text-ink">
          <FileText size={15} strokeWidth={1.5} />
          不处理会怎样
        </div>
        <p className="mt-1.5 text-[11.5px] leading-[1.6] text-ash">
          期限后可能产生延滞金或追加通知。具体以原通知书和市役所说明为准。
        </p>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-paper px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] font-normal text-ash">
          <Archive size={15} strokeWidth={1.5} />
          实际识别后，金额、期限和发件机构会进入我的提醒。
        </div>
      </section>

      <section className="mt-5 border-t border-hairline pt-4">
        <p className="text-[12px] leading-[1.7] text-ash">
          这是一份脱敏样例。实际结果按原文件识别，不替代官方说明。
        </p>
      </section>

      <div className="mt-5 grid gap-2">
        <Link
          href="/photo"
          className="focus-ring flex min-h-[46px] items-center justify-center rounded-btn bg-ink px-4 py-3 text-[14px] font-medium text-white"
        >
          拍照识别文书
        </Link>
        <Link
          href="/timeline"
          className="flex min-h-[44px] items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-3 text-[13px] font-medium text-ink"
        >
          查看我的提醒
        </Link>
      </div>
    </AppShell>
  )
}

function SampleFact({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub: string
}) {
  return (
    <div className="flex min-h-[64px] items-center justify-between gap-3 border-b border-hairline px-4 last:border-b-0">
      <span className="text-[12px] text-ash">{label}</span>
      <span className="min-w-0 text-right">
        <span className="block text-[15px] font-medium text-ink jp-text">{value}</span>
        <span className="mt-0.5 block text-[11px] text-ash">{sub}</span>
      </span>
    </div>
  )
}

function ActionLine({ index, text }: { index: string; text: string }) {
  return (
    <div className="flex min-h-[34px] items-center gap-3 py-1.5">
      <span className="numeric w-4 flex-shrink-0 text-[11px] text-ash">{index}</span>
      <span className="text-[12px] leading-[1.6] text-slate">{text}</span>
    </div>
  )
}
