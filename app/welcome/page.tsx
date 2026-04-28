/**
 * /welcome — 邀请兑换成功后的确认页（T13）
 *
 * 触发：用户从 /invite/[code] 走完登录后自动跳到 /welcome。
 * 视觉：欢迎 + "你和 XX 都获得了 7 天会员体验，即日生效"。
 *
 * 数据：直接读 sessionStorage 拿邀请人姓名（前端写入），不打 DB
 * 防止竞争。失败时显示通用文案。
 */
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Crown, Gift } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import {
  getSubscriptionByFamilyId,
} from '@/lib/db/queries/subscriptions'
import { INVITE_REWARD_DAYS } from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '欢迎加入 TEBIQ',
  description: '邀请兑换成功，会员体验已生效。',
  robots: { index: false, follow: false },
}

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

export default async function WelcomePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/welcome')

  const sub = await getSubscriptionByFamilyId(user.familyId)
  const trialActive =
    sub &&
    (sub.status === 'trialing' || sub.status === 'active') &&
    sub.currentPeriodEnd.getTime() > Date.now()

  return (
    <AppShell appBar={<AppBar title="欢迎" />}>
      <TrackOnMount event={EVENT.AUTH_LOGIN_SUCCESS} payload={{ surface: 'welcome', viaInvite: true }} />
      <section className="mt-4 rounded-card border border-accent/30 bg-accent-2 px-5 py-7 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-surface text-accent shadow-soft">
          <Gift size={26} strokeWidth={1.55} />
        </div>
        <h1 className="text-[20px] font-medium leading-snug text-ink">欢迎加入 TEBIQ</h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[12.5px] leading-[1.7] text-ink">
          {trialActive
            ? `你和邀请你的朋友都获得了 ${INVITE_REWARD_DAYS} 天 basic 会员体验，即日生效。`
            : `你已经成功注册 TEBIQ。如果邀请奖励显示有延迟，请稍后到「我的账户」查看。`}
        </p>
        {trialActive && sub && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[11px] font-medium text-ink shadow-soft">
            <Crown size={12} strokeWidth={1.55} />
            会员有效期至 {fmtDate(sub.currentPeriodEnd)}
          </div>
        )}
      </section>

      <section className="mt-4 rounded-card border border-hairline bg-surface p-4 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">先从这里开始</h2>
        <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
          会员体验内可以无限使用拍照即懂，也可以做完续签自查保存到档案。
        </p>
      </section>

      <div className="mt-5 space-y-2">
        <TrackedLink
          href="/"
          eventName={EVENT.CTA_CLICK}
          payload={{ source: 'welcome', target: 'home' }}
          className="block"
        >
          <Button>开始使用</Button>
        </TrackedLink>
        <TrackedLink
          href="/my/account"
          eventName={EVENT.CTA_CLICK}
          payload={{ source: 'welcome', target: 'account' }}
          className="mt-2 flex min-h-[42px] w-full items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-2.5 text-[12.5px] font-medium text-ink"
        >
          查看我的账户
        </TrackedLink>
      </div>
    </AppShell>
  )
}
