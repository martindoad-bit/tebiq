/**
 * GET /api/account/email/verify?token=xxx
 *
 * 用户点击邮件链接进入。成功 → redirect 到 /my/account?email=verified
 * 失败 → redirect 到 /my/account?email=verify_failed&reason=xxx
 *
 * 用 redirect 而不是 JSON：用户从邮件客户端进来，期望落到 app 视图。
 */
import { NextResponse } from 'next/server'
import { consumeEmailVerificationToken } from '@/lib/db/queries/emailVerification'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'

const ACCOUNT_PATH = '/my/account'

function redirectTo(req: Request, search: string): NextResponse {
  const base = new URL(req.url)
  const target = new URL(`${ACCOUNT_PATH}${search}`, `${base.protocol}//${base.host}`)
  return NextResponse.redirect(target, { status: 303 })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token') ?? ''
  const result = await consumeEmailVerificationToken(token)

  if (result.ok) {
    await track(EVENT.EMAIL_VERIFICATION_COMPLETED, { memberId: result.memberId })
    return redirectTo(req, '?email=verified')
  }

  return redirectTo(req, `?email=verify_failed&reason=${result.reason ?? 'unknown'}`)
}
