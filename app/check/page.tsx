import type { Metadata } from 'next'
import Link from 'next/link'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import { RiskMark, StatusBadge } from '@/components/ui/tebiq'
import { EVENT } from '@/lib/analytics/events'

export const metadata: Metadata = {
  title: '续签自查 | TEBIQ',
  description: '自查在留資格更新风险：覆盖工作、收入、社保、税款、出入国记录等关键维度。',
  alternates: { canonical: '/check' },
  openGraph: {
    title: '续签自查 | TEBIQ',
    description: '自查在留資格更新风险',
    url: 'https://tebiq.jp/check',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
  },
}

const ITEMS = [
  { title: '在职状态', status: '3月内已查', mark: '档案触发', sub: '就労資格与当前勤務先是否一致。' },
  { title: '收入变动', status: '需处理', mark: '建议必看', sub: '近一年收入低于上次自查记录。', warning: true },
  { title: '住民税', status: '未查', mark: '建议必看', sub: '确认納税証明書和課税証明書。' },
  { title: '年金', status: '已查', mark: '档案触发', sub: '最近一次记录来自年金事務所通知。' },
  { title: '健康保険', status: '已查', mark: '档案触发', sub: '保险缴纳记录未发现期限冲突。' },
  { title: '転職记录', status: '未查', mark: '建议必看', sub: '换工作后需确认届出和在留資格适配。' },
  { title: '扶养家族', status: '未查', mark: '建议必看', sub: '扶养人数变化会影响材料准备。' },
  { title: '出入国记录', status: '未查', mark: '建议必看', sub: '长期离境记录需在申请前核对。' },
  { title: '住所变更', status: '已查', mark: '档案触发', sub: '住民票地址与账号资料一致。' },
  { title: '到期文书', status: '已过期', mark: '已过期', sub: '一件历史提醒超过处理期限。', warning: true },
] as const

export default function CheckLandingPage() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <TrackOnMount event={EVENT.QUIZ_START} />
      <section className="mt-3 border-b border-hairline pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] text-ash">签证类型</p>
            <h1 className="mt-1 text-[19px] font-medium leading-snug text-ink">
              技術・人文知識・国際業務
            </h1>
            <p className="mt-2 text-[12px] text-ash">上次自查 2026.04.15</p>
          </div>
          <Link href="/check/select" className="mt-1 text-[12px] text-ink underline underline-offset-4">
            切换
          </Link>
        </div>
        <Link
          href="/check/select"
          className="focus-ring mt-4 flex min-h-[40px] items-center justify-center rounded-btn border border-hairline bg-surface px-4 text-[13px] font-medium text-ink"
        >
          完整自查（约 5 分钟）
        </Link>
      </section>

      <section className="mt-4 overflow-hidden rounded-card border border-hairline bg-surface">
        {ITEMS.map(item => (
          <ChecklistRow key={item.title} {...item} />
        ))}
      </section>

      <p className="mt-4 text-[12px] leading-[1.7] text-ash">
        递交前可做一次完整自查。自查结果只用于整理风险项，不替代官方判断。
      </p>
    </AppShell>
  )
}

function ChecklistRow({
  title,
  status,
  mark,
  sub,
  warning,
}: {
  title: string
  status: string
  mark: string
  sub: string
  warning?: boolean
}) {
  return (
    <div className="border-b border-hairline px-4 py-3 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium leading-snug text-ink">{title}</p>
          <p className="mt-1 text-[12px] leading-[1.55] text-ash">{sub}</p>
        </div>
        <StatusBadge tone={warning ? 'attention' : 'neutral'}>{status}</StatusBadge>
      </div>
      <div className="mt-2">
        <RiskMark tone={warning ? 'warning' : 'neutral'}>{mark}</RiskMark>
      </div>
    </div>
  )
}
