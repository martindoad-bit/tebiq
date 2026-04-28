import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_MAX_AGE, COOKIE_NAME } from '@/lib/auth/session'
import { getMemberByPhone } from '@/lib/db/queries/members'
import { createSession } from '@/lib/db/queries/sessions'

export const dynamic = 'force-dynamic'

const phones = {
  empty: '+81visual-empty',
  data: '+81visual-data',
  subscribed: '+81visual-sub',
} as const

type Scenario = keyof typeof phones

function isScenario(value: string | null): value is Scenario {
  return value === 'empty' || value === 'data' || value === 'subscribed'
}

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const scenario = req.nextUrl.searchParams.get('scenario')
  if (!isScenario(scenario)) {
    return NextResponse.json(
      { error: 'scenario must be empty, data, or subscribed' },
      { status: 400 },
    )
  }

  const member = await getMemberByPhone(phones[scenario])
  if (!member) {
    return NextResponse.json(
      { error: 'Run npm run dev:visual-fixtures first.' },
      { status: 404 },
    )
  }

  const session = await createSession(member.id)
  const next = req.nextUrl.searchParams.get('next') ?? '/my/archive'
  const res = NextResponse.redirect(new URL(next, req.url))
  res.cookies.set(COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return res
}
