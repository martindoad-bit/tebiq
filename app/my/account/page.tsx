/**
 * /my/account — 我的账户（v5 screen 14）
 *
 * 视觉跟 docs/prototype/v5-mockup.html 1995-2061。
 *
 * 1.0 列表项：
 *  - 我的信息 → /my/profile（已实装）
 *  - 家庭成员管理 → 占位（block 4）
 *  - 订阅管理 → POST /api/stripe/portal（无 sub 时回退到 /subscribe）
 *  - 支付记录 / 邀请记录 → 占位（block 4）
 *  - 设置 → 占位
 */
import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'
import AccountListClient from './AccountListClient'

export const dynamic = 'force-dynamic'

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

const TIER_LABEL: Record<string, string> = {
  basic: '月度会员',
  premium: '高级会员',
}

export default async function AccountPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/my/account')

  const sub = await getSubscriptionByFamilyId(user.familyId)
  const subActive =
    sub &&
    (sub.status === 'active' || sub.status === 'trialing') &&
    sub.currentPeriodEnd.getTime() > Date.now()

  // avatar 文字：优先 name 第一字符，否则 phone 末两位
  const avatarText = user.name
    ? user.name.slice(0, 1)
    : user.phone.slice(-2)

  const tierLine = subActive
    ? TIER_LABEL[sub!.tier] ?? '会员用户'
    : '免费用户'
  const expiryLine = subActive ? `有效期至 ${fmtDate(sub!.currentPeriodEnd)}` : null

  return (
    <AppShell appBar={<AppBar title="我的账户" />} tabBar={<TabBar />}>
      {/* 账户头部 */}
      <div className="mt-2 bg-surface border border-hairline rounded-chip p-[14px] flex items-center gap-3">
        <span className="flex-shrink-0 w-[46px] h-[46px] rounded-full bg-ink text-accent flex items-center justify-center text-[18px] font-medium">
          {avatarText}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[14px] text-ink font-medium">
            {user.name ?? '未填姓名'}
          </div>
          <div className="text-[11px] text-ash mt-1">{tierLine}</div>
          {expiryLine && (
            <div className="text-[11px] text-ash mt-0.5">{expiryLine}</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <AccountListClient hasSubscription={!!sub} />
      </div>
    </AppShell>
  )
}
