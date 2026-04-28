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
import Link from 'next/link'
import { CalendarDays, Crown, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'
import AccountListClient from './AccountListClient'
import EmailEditClient from './EmailEditClient'
import PhoneEditClient from './PhoneEditClient'

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
    : (user.phone ?? user.email ?? 'TE').slice(-2)

  const tierLine = subActive
    ? TIER_LABEL[sub!.tier] ?? '会员用户'
    : '免费用户'
  const expiryLine = subActive ? `有效期至 ${fmtDate(sub!.currentPeriodEnd)}` : null

  return (
    <AppShell appBar={<AppBar title="我的账户" />} tabBar={<TabBar />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-center gap-3">
          <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink text-[18px] font-medium text-accent shadow-[0_8px_18px_rgba(24,50,74,0.16)]">
            {avatarText}
            {subActive && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white ring-2 ring-surface">
                <Crown size={11} strokeWidth={1.7} />
              </span>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-medium leading-snug text-ink">
              {user.name ?? '未填姓名'}
            </div>
            <div className="mt-1 text-[11px] leading-snug text-ash">{tierLine}</div>
            {expiryLine && (
              <div className="mt-0.5 text-[11px] leading-snug text-ash">{expiryLine}</div>
            )}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-[11px] bg-canvas px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] leading-none text-ash">
              <ShieldCheck size={12} strokeWidth={1.55} />
              账户状态
            </div>
            <div className="mt-1.5 text-[12px] font-medium leading-none text-ink">
              {subActive ? '会员可用' : '免费使用中'}
            </div>
          </div>
          <div className="rounded-[11px] bg-canvas px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] leading-none text-ash">
              <CalendarDays size={12} strokeWidth={1.55} />
              服务期限
            </div>
            <div className="mt-1.5 truncate text-[12px] font-medium leading-none text-ink">
              {subActive ? fmtDate(sub!.currentPeriodEnd) : '未开通'}
            </div>
          </div>
        </div>

        {!subActive && (
          <Link
            href="/subscribe"
            className="mt-3 block rounded-btn bg-accent px-4 py-3 text-center text-[13px] font-medium text-white shadow-cta active:translate-y-px"
          >
            开通会员
          </Link>
        )}
      </section>

      <EmailEditClient
        initialEmail={user.email}
        initialVerifiedAt={user.emailVerifiedAt ? user.emailVerifiedAt.toISOString() : null}
      />
      <PhoneEditClient initialPhone={user.phone} />

      <div className="mt-4">
        <AccountListClient hasSubscription={!!sub} />
      </div>
    </AppShell>
  )
}
