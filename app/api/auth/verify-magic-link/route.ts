import { NextResponse } from 'next/server'
import { consumeLoginMagicLinkToken } from '@/lib/db/queries/loginMagicLinks'
import { acceptInvitationAndGrantReward } from '@/lib/db/queries/invitations'
import { getMemberByEmail } from '@/lib/db/queries/members'
import { setUserSessionByEmail, setUserSessionForMember } from '@/lib/auth/session'
import {
  clearAnonymousSessionId,
  clearInviteCodeCookie,
  getAnonymousSessionId,
  getInviteCodeFromCookie,
} from '@/lib/auth/anonymous-session'
import { migrateSessionDataToFamily } from '@/lib/auth/migrate-session-data'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'

function redirectTo(req: Request, path: string): NextResponse {
  const base = new URL(req.url)
  const target = new URL(path, `${base.protocol}//${base.host}`)
  return NextResponse.redirect(target, { status: 303 })
}

function loginError(req: Request, reason: string): NextResponse {
  return redirectTo(req, `/login?error=${encodeURIComponent(reason)}`)
}

function safeNextPath(path: string | null): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/my/archive'
  return path
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') ?? ''
  const consumed = await consumeLoginMagicLinkToken(token)
  if (!consumed.ok) {
    await track(EVENT.AUTH_LOGIN_FAIL, { reason: `magic_link_${consumed.reason}` })
    return loginError(req, `magic_link_${consumed.reason}`)
  }

  const row = consumed.token
  const existingMember = await getMemberByEmail(row.email)
  const member = existingMember
    ? await setUserSessionForMember(existingMember)
    : await setUserSessionByEmail(row.email)

  const anonymousSessionId = await getAnonymousSessionId()
  if (anonymousSessionId) {
    await migrateSessionDataToFamily(anonymousSessionId, member.familyId)
    await clearAnonymousSessionId()
  }

  const cookieInvite = await getInviteCodeFromCookie()
  const inviteCode = row.inviteCode || cookieInvite || ''
  let invitationAccepted = false
  if (inviteCode && !existingMember) {
    try {
      const accepted = await acceptInvitationAndGrantReward(inviteCode, member.id)
      invitationAccepted = !!accepted
      if (invitationAccepted) await clearInviteCodeCookie()
    } catch {
      invitationAccepted = false
    }
  }

  await track(
    EVENT.AUTH_LOGIN_SUCCESS,
    { firstLogin: !existingMember, channel: 'email', hasInvite: !!inviteCode },
    { user: member },
  )

  if (invitationAccepted) return redirectTo(req, '/welcome')
  return redirectTo(req, safeNextPath(row.nextPath))
}
