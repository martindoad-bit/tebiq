import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { updateMemberEmail } from '@/lib/db/queries/members'

export const dynamic = 'force-dynamic'

function parseEmail(value: unknown): string | null | undefined {
  if (typeof value !== 'string') return undefined
  const s = value.trim()
  if (!s) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return undefined
  return s.slice(0, 255)
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const email = parseEmail(body.email)
  if (email === undefined) {
    return NextResponse.json({ error: '请输入有效邮箱' }, { status: 400 })
  }

  const updated = await updateMemberEmail(user.id, email)
  if (!updated) return NextResponse.json({ error: '保存失败' }, { status: 500 })
  return NextResponse.json({ ok: true, email: updated.email })
}
