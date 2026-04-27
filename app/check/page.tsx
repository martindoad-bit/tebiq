/**
 * /check — 续签自查入口（v5 screen 05）
 *
 * 三步式入口：landing → /check/select（签证选择）→ /check/[visa]（quiz）→ result。
 * 视觉跟 docs/prototype/v5-mockup.html 1444-1517。
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { AlignLeft, CheckCircle, Clock3, Shield } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Illustration from '@/app/_components/v5/Illustration'
import Button from '@/app/_components/v5/Button'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import { EVENT } from '@/lib/analytics/events'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '续签自查 | TEBIQ',
  description: '3 分钟自查在留资格更新风险：覆盖工作、收入、社保、税款、出入国记录等关键维度。',
  alternates: { canonical: '/check' },
  openGraph: {
    title: '续签自查 | TEBIQ',
    description: '3 分钟自查在留资格更新风险',
    url: 'https://tebiq.jp/check',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
  },
}

export default function CheckLandingPage() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <TrackOnMount event={EVENT.QUIZ_START} />
      <div className="mb-2 mt-4 text-center">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-cool-blue px-3 py-1.5 text-[clamp(12px,3.3vw,14px)] font-semibold text-ink/85">
          <Clock3 size={14} strokeWidth={1.65} />
          约 3 分钟
        </div>
        <p className="mx-auto max-w-[340px] text-[clamp(15px,4.2vw,18px)] leading-[1.65] text-slate/78">
          根据你的在留資格和当前情况，先看续签前要注意的风险。
        </p>
      </div>

      <Illustration
        height={220}
        src="/illustrations/renewal-check-image2.png"
        subject="日文文件、日历和护照的桌面静物"
      />

      <ul className="mb-7 mt-3 space-y-3.5">
        <FeatureRow
          icon={<CheckCircle size={14} strokeWidth={1.5} className="text-ink" />}
          title="完整的风险评估"
          sub="覆盖工作、收入、材料等常见风险"
        />
        <FeatureRow
          icon={<AlignLeft size={14} strokeWidth={1.5} className="text-ink" />}
          title="个性化建议"
          sub="按你的回答整理下一步行动"
        />
        <FeatureRow
          icon={<Shield size={14} strokeWidth={1.5} className="text-ink" />}
          title="保护隐私"
          sub="所有信息仅用于分析"
        />
      </ul>

      <Link href="/check/select" className="block">
        <Button>开始自查</Button>
      </Link>

      <div className="text-center mt-4">
        <Link
          href="/login?next=/my/archive"
          className="text-[11.5px] text-ash hover:text-ink underline underline-offset-2"
        >
          已自查过？登录查看结果
        </Link>
      </div>
    </AppShell>
  )
}

function FeatureRow({
  icon,
  title,
  sub,
}: {
  icon: ReactNode
  title: string
  sub: string
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] bg-accent-2 shadow-soft">
        {icon}
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="text-[clamp(16px,4.5vw,18px)] font-semibold text-ink">{title}</div>
        <div className="mt-1 text-[clamp(12.5px,3.6vw,14px)] text-ash">{sub}</div>
      </div>
    </li>
  )
}
