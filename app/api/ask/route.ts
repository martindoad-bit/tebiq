import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  return NextResponse.json(
    {
      error: '旧版问答入口已停用',
      next: '/api/consultation/stream',
    },
    { status: 410 },
  )
}
