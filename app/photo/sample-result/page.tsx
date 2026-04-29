import Link from 'next/link'
import { CheckCircle2, FileText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import TabBar from '@/app/_components/v5/TabBar'

export const metadata = {
  title: '样例结果 | TEBIQ',
  description: 'TEBIQ 拍照识别样例结果。',
}

export default function PhotoSampleResultPage() {
  return (
    <AppShell appBar={<AppBar title="样例结果" back />} tabBar={<TabBar />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <p className="mb-2 text-[11px] text-ash">脱敏样例</p>
        <h1 className="text-[20px] font-medium leading-snug text-ink">住民税通知</h1>
        <p className="mt-1 text-[13px] text-ash">江戸川区役所</p>
      </section>

      <section className="mt-3 overflow-hidden rounded-card border border-hairline bg-surface">
        <SampleFact label="期限" value="2026.06.30" sub="6月30日 到期" />
        <SampleFact label="金额" value="¥38,500" sub="原文件金额为准" />
        <SampleFact label="状态" value="已加入提醒" sub="我的提醒中可查看" />
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <FileText size={17} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[13px] font-medium leading-snug text-ink">下一步</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-[12px] leading-[1.65] text-ash">
              <li>确认通知书上的納付期限。</li>
              <li>按原文件金额缴纳。</li>
              <li>保留缴费记录。</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3">
        <div className="flex items-center gap-2 text-[12px] font-medium text-ink">
          <CheckCircle2 size={16} strokeWidth={1.5} />
          已加入「我的提醒」
        </div>
        <p className="mt-1.5 text-[11.5px] leading-[1.6] text-ash">
          实际识别后，金额、期限和发件机构会自动进入时间线。
        </p>
      </section>

      <div className="mt-5 grid gap-2">
        <Link href="/photo">
          <Button>拍一份文书试试</Button>
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
        <span className="block text-[15px] font-medium text-ink">{value}</span>
        <span className="mt-0.5 block text-[11px] text-ash">{sub}</span>
      </span>
    </div>
  )
}
