import Image from 'next/image'
import Link from 'next/link'
import { Gift, ShieldCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { getInvitationLandingByCode, INVITE_REWARD_DAYS } from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

function maskPhone(phone: string): string {
  if (phone.length <= 6) return phone
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`
}

export default async function InviteLandingPage({
  params,
}: {
  params: { code: string }
}) {
  const { code } = params
  const landing = await getInvitationLandingByCode(code)
  const isAvailable = landing?.invitation.status === 'pending'
  const inviterName = landing?.inviter.name ?? (landing ? maskPhone(landing.inviter.phone) : '')
  const ref = encodeURIComponent(code)
  const next = encodeURIComponent('/invite')

  return (
    <AppShell appBar={<AppBar back="/" />}>
      <div className="pt-3 pb-5">
        <section className="rounded-card border border-hairline bg-surface px-4 pt-4 pb-5 text-center shadow-card">
          <div className="relative mx-auto h-[150px] w-full overflow-hidden rounded-[14px] bg-accent-2">
            <Image
              src="/illustrations/invite-gift.png"
              alt=""
              fill
              priority
              sizes="(max-width: 420px) 90vw, 360px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-white/65" />
          </div>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent-2 px-3 py-1 text-[11px] font-medium text-ink">
            <Gift size={13} strokeWidth={1.55} />
            邀请奖励
          </div>

          <h1 className="mt-3 text-[22px] font-medium leading-tight text-ink">
            {isAvailable ? `${inviterName} 邀请你使用 TEBIQ` : '这个邀请暂时不可用'}
          </h1>
          <p className="mx-auto mt-2 max-w-[300px] text-[12px] leading-[1.65] text-ash">
            {isAvailable
              ? `注册成功后，你和邀请人各获得 ${INVITE_REWARD_DAYS} 天 basic 会员体验。`
              : '邀请链接可能已经被领取，或暂时无法确认状态。你仍然可以直接注册使用 TEBIQ。'}
          </p>

          <Link
            href={isAvailable ? `/login?next=${next}&ref=${ref}` : '/login?next=/my/archive'}
            className="mt-4 block"
          >
            <Button>{isAvailable ? '领取并注册' : '登录 / 注册'}</Button>
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
