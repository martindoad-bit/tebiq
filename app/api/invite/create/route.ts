import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import {
  getInvitationStats,
  getOrCreatePendingInvitation,
  INVITE_REWARD_DAYS,
} from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }

  const invitation = await getOrCreatePendingInvitation(user.id)
  const stats = await getInvitationStats(user.id)
  const origin = new URL(req.url).origin

  return NextResponse.json({
    code: invitation.code,
    url: `${origin}/invite/${invitation.code}`,
    stats,
    rewardDays: INVITE_REWARD_DAYS,
  })
}
