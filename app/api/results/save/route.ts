import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { saveResult } from '@/lib/auth/store'
import { judge, type AnsweredItem } from '@/lib/check/questions'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const history = body?.history as AnsweredItem[] | undefined
    const visaType = String(body?.visaType ?? 'gijinkoku')
    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json({ error: '答题记录为空' }, { status: 400 })
    }
    const { verdict, triggered } = judge(history)
    const record = saveResult({
      userId: user.id,
      visaType,
      verdict,
      triggered,
      history,
    })
    return NextResponse.json({ result: record })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
