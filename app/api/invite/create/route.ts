import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import {
  getInvitationStats,
  getOrCreatePendingInvitation,
  InvitationLimitError,
  INVITE_REWARD_DAYS,
} from '@/lib/db/queries/invitations'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }

  try {
    const invitation = await getOrCreatePendingInvitation(user.id)
    const stats = await getInvitationStats(user.id)
    const origin = new URL(req.url).origin

    await track(EVENT.INVITE_LINK_GENERATED, {}, { user })

    return NextResponse.json({
      code: invitation.code,
      url: `${origin}/invite/${invitation.code}`,
      stats,
      rewardDays: INVITE_REWARD_DAYS,
    })
  } catch (error) {
    if (error instanceof InvitationLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }
    return NextResponse.json({ error: '邀请暂时不可用' }, { status: 503 })
  }
}
