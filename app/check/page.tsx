/**
 * /check — 续签自查入口（v5 screen 05）
 *
 * 三步式入口：landing → /check/select（签证选择）→ /check/[visa]（quiz）→ result。
 * 视觉跟 docs/prototype/v5-mockup.html 1444-1517。
 */
import Link from 'next/link'
import { AlignLeft, CheckCircle, Clock3, Shield } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Illustration from '@/app/_components/v5/Illustration'
import Button from '@/app/_components/v5/Button'
import type { ReactNode } from 'react'

export default function CheckLandingPage() {
  return (
    <AppShell appBar={<AppBar title="续签自查" back="/" />}>
      <div className="text-center mt-2 mb-1">
        <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full bg-cool-blue/70 px-2.5 py-1 text-[10.5px] font-medium text-ink/80">
          <Clock3 size={12} strokeWidth={1.55} />
          约 3 分钟
        </div>
        <p className="text-[12px] leading-[1.6] text-ash">
          根据你的在留資格和当前情况，先看续签前要注意的风险。
        </p>
      </div>

      <Illustration
        height={130}
        subject="签证文件 + 检查清单 + 守护人物"
      />

      <ul className="space-y-2.5 mt-2 mb-6">
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
      <span className="flex-shrink-0 w-8 h-8 rounded-[10px] bg-accent-2 flex items-center justify-center mt-0.5 shadow-soft">
        {icon}
      </span>
      <div className="flex-1 min-w-0 leading-tight">
        <div className="text-[13px] text-ink font-medium">{title}</div>
        <div className="text-[10.5px] text-ash mt-0.5">{sub}</div>
      </div>
    </li>
  )
}
