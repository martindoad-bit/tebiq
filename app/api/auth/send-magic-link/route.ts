import { NextResponse } from 'next/server'
import { createDevLoginLink } from '@/lib/db/queries/devLoginLinks'
import { createLoginMagicLinkToken } from '@/lib/db/queries/loginMagicLinks'
import { sendEmail } from '@/lib/notifications/email-channel'
import { templates } from '@/lib/notifications/templates'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function parseEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email.slice(0, 255)
}

function safeNextPath(value: unknown): string | null {
  if (typeof value !== 'string') return null
  if (!value.startsWith('/') || value.startsWith('//')) return null
  return value.slice(0, 240)
}

function siteOrigin(req: Request): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const url = new URL(req.url)
  return `${url.protocol}//${url.host}`
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const email = parseEmail(body.email)
  if (!email) return NextResponse.json({ error: '请输入有效邮箱' }, { status: 400 })

  const nextPath = safeNextPath(body.next) ?? '/my/archive'
  const inviteCode =
    typeof body.inviteCode === 'string' && body.inviteCode.trim()
      ? body.inviteCode.trim().slice(0, 16)
      : null
  try {
    const row = await createLoginMagicLinkToken({ email, nextPath, inviteCode })
    const loginUrl = `${siteOrigin(req)}/api/auth/verify-magic-link?token=${encodeURIComponent(row.token)}`
    await createDevLoginLink({ token: row.token, email, link: loginUrl })
    const rendered = templates.login_magic_link.build({ loginUrl })
    const outcome = await sendEmail({
      to: email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
    })

    await track(EVENT.AUTH_OTP_SENT, {
      channel: 'email',
      provider: outcome.provider,
      ok: outcome.ok,
    })

    if (!outcome.ok) {
      console.warn('[auth/email] magic link send failed', outcome.provider, outcome.error)
      return NextResponse.json(
        { error: '登录邮件暂时没有发送成功。请稍后再试，或使用其他登录方式。' },
        { status: 503 },
      )
    }

    return NextResponse.json({ ok: true, provider: outcome.provider })
  } catch (error) {
    console.warn('[auth/email] magic link flow failed', errorCode(error))
    return NextResponse.json(
      { error: '登录邮件暂时没有发送成功。请稍后再试，或使用其他登录方式。' },
      { status: 503 },
    )
  }
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
