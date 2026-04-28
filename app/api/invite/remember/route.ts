import { NextResponse } from 'next/server'
import { setInviteCodeCookie } from '@/lib/auth/anonymous-session'
import { getInvitationByCode } from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/photo'
  return value
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = (url.searchParams.get('code') ?? '').trim().slice(0, 16)
  const next = safeNext(url.searchParams.get('next'))
  if (code) {
    const invitation = await getInvitationByCode(code)
    if (invitation?.status === 'pending') {
      await setInviteCodeCookie(code)
    }
  }
  return NextResponse.redirect(new URL(next, req.url), { status: 303 })
}
