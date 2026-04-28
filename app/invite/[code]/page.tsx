/**
 * /invite/[code] — 邀请落地页（T13 优化）
 *
 * 优化点：
 *  - 标题展示具名邀请人（name → 否则「你的朋友」，不暴露 phone）
 *  - 倒计时：基于 createdAt + INVITE_EXPIRY_DAYS - now 计算
 *  - 错误状态友好提示（不暴露具体原因给攻击者，统一引导直接注册）
 */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock3, Gift, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import {
  getInvitationLandingByCode,
  INVITE_EXPIRY_DAYS,
  INVITE_REWARD_DAYS,
} from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '朋友邀请你加入 TEBIQ',
  description: 'TEBIQ 在日生活的小帮手 — 续签自查、拍照识别、到期提醒。',
  robots: { index: false, follow: false }, // 邀请链接不入索引
}

function daysUntilExpiry(createdAt: Date): number {
  const expiresMs = createdAt.getTime() + INVITE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  const remainMs = expiresMs - Date.now()
  return Math.max(0, Math.ceil(remainMs / (24 * 60 * 60 * 1000)))
}

export default async function InviteLandingPage({
  params,
}: {
  params: { code: string }
}) {
  const { code } = params
  const landing = await getInvitationLandingByCode(code)

  // 三种"不可用"状态统一为同一友好文案，不暴露具体 reason
  // - landing == null         → 邀请码不存在
  // - status !== 'pending'    → 已被领取或已过期
  const isAvailable = landing?.invitation.status === 'pending'
  // 邀请人具名：优先 name，没填 → 「你的朋友」（不暴露 phone）
  const inviterName = landing?.inviter.name?.trim() || '你的朋友'
  const remainingDays = isAvailable && landing
    ? daysUntilExpiry(landing.invitation.createdAt)
    : 0
  const ref = encodeURIComponent(code)
  const next = encodeURIComponent('/welcome')

  return (
    <AppShell appBar={<AppBar back="/" />}>
      <div className="pt-3 pb-5">
        <section className="rounded-card border border-hairline bg-surface px-4 pt-4 pb-5 text-center shadow-card">
          <div className="relative mx-auto h-[150px] w-full overflow-hidden rounded-card border border-hairline bg-surface">
            <Image
            src="/illustrations/invite-share-wide-image2.png"
              alt=""
              fill
              priority
              sizes="(max-width: 420px) 90vw, 360px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-white/70" />
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent-2 px-3 py-1 text-[11px] font-medium text-ink">
            <Gift size={13} strokeWidth={1.55} />
            邀请奖励
          </div>

          <h1 className="mt-3 text-[22px] font-medium leading-tight text-ink">
            {isAvailable
              ? `${inviterName} 邀请你使用 TEBIQ`
              : '这个邀请已经使用过或已过期'}
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-[12px] leading-[1.65] text-ash">
            {isAvailable
              ? `注册成功后，你和 ${inviterName} 各获得 ${INVITE_REWARD_DAYS} 天 basic 会员体验。`
              : '邀请链接无效或已过期，你可以直接注册体验 TEBIQ。'}
          </p>

          {isAvailable && remainingDays > 0 && remainingDays <= 7 && (
            <div className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-canvas px-2.5 py-1 text-[10.5px] font-medium text-ink">
              <Clock3 size={11} strokeWidth={1.55} />
              邀请码还有 {remainingDays} 天过期
            </div>
          )}

          <Link
            href={
              isAvailable
                ? `/login?next=${next}&ref=${ref}`
                : '/login?next=/my/archive'
            }
            className="mt-4 block"
          >
            <Button>{isAvailable ? '领取并注册' : '直接注册'}</Button>
          </Link>
        </section>

        <section className="mt-4 rounded-card border border-hairline bg-surface p-4 shadow-card">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
              <ShieldCheck size={17} strokeWidth={1.55} />
            </span>
            <div>
              <h2 className="text-[13px] font-medium leading-snug text-ink">
                TEBIQ 可以帮你处理什么
              </h2>
              <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
                续签自查、拍照识别日本生活文件、到期提醒和档案保存，适合在日中文母语者日常使用。
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
