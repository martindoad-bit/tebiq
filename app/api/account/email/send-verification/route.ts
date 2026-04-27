/**
 * POST /api/account/email/send-verification
 *
 * 触发条件：用户已经填写邮箱（members.email 不为 null）但未验证。
 * 行为：生成 24h 一次性 token，发邮件到 members.email。
 *
 * 不接受 body 参数 — 邮箱以 DB 当前值为准（防止前端串改其他人邮箱）。
 *
 * 失败处理：
 *  - 401：未登录
 *  - 400：当前用户没有 email
 *  - 200 + emailSent=false：邮箱已验证，不发新邮件
 *  - 200 + emailSent=true：发送成功（mock 模式也算 true，文件落 /tmp）
 *  - 503：邮件 channel 失败
 */
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { createEmailVerificationToken } from '@/lib/db/queries/emailVerification'
import { sendEmail } from '@/lib/notifications/email-channel'
import { templates } from '@/lib/notifications/templates'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'

export const dynamic = 'force-dynamic'

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://tebiq.jp'

export async function POST() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })
  if (!user.email) {
    return NextResponse.json(
      { error: '请先填写邮箱再发送验证' },
      { status: 400 },
    )
  }
  if (user.emailVerifiedAt) {
    return NextResponse.json({ ok: true, emailSent: false, alreadyVerified: true })
  }

  const tokenRow = await createEmailVerificationToken(user.id, user.email)
  const verifyUrl = `${SITE_ORIGIN}/api/account/email/verify?token=${encodeURIComponent(tokenRow.token)}`

  const tpl = templates.email_verification
  const rendered = tpl.build({
    name: user.name ?? undefined,
    verifyUrl,
  })

  const outcome = await sendEmail({
    to: user.email,
    subject: rendered.subject,
    html: rendered.html,
    text: rendered.text,
  })

  await track(
    EVENT.EMAIL_VERIFICATION_SENT,
    { provider: outcome.provider, ok: outcome.ok },
    { user },
  )

  if (!outcome.ok) {
    return NextResponse.json(
      { error: '邮件发送暂时失败，请稍后再试' },
      { status: 503 },
    )
  }

  return NextResponse.json({ ok: true, emailSent: true, provider: outcome.provider })
}
