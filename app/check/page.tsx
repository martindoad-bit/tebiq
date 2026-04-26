/**
 * /check — 续签自查入口（v5 screen 05）
 *
 * 三步式入口：landing → /check/select（签证选择）→ /check/[visa]（quiz）→ result。
 * 视觉跟 docs/prototype/v5-mockup.html 1444-1517。
 */
import Link from 'next/link'
import { AlignLeft, CheckCircle, Shield } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Illustration from '@/app/_components/v5/Illustration'
import Button from '@/app/_components/v5/Button'
import type { ReactNode } from 'react'

export default function CheckLandingPage() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <div className="text-center mt-2 mb-1">
        <p className="text-[12px] text-ash">3 分钟了解你的签证风险</p>
      </div>

      <Illustration
        height={130}
        subject="签证文件 + 检查清单 + 守护人物"
      />

      <ul className="space-y-3 mt-2 mb-6">
        <FeatureRow
          icon={<CheckCircle size={14} strokeWidth={1.5} className="text-ink" />}
          title="完整的风险评估"
          sub="不局限所有风险"
        />
        <FeatureRow
          icon={<AlignLeft size={14} strokeWidth={1.5} className="text-ink" />}
          title="个性化建议"
          sub="针对你的情况给出建议"
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
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-2 flex items-center justify-center mt-0.5">
        {icon}
      </span>
      <div className="flex-1 min-w-0 leading-tight">
        <div className="text-[13px] text-ink font-medium">{title}</div>
        <div className="text-[10.5px] text-ash mt-0.5">{sub}</div>
      </div>
    </li>
  )
}
