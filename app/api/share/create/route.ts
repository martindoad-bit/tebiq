import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

const SHARE_TTL_SEC = 7 * 24 * 60 * 60

export interface ShareRecord {
  id: string
  createdAt: string
  visaType: string
  verdict: 'red' | 'yellow' | 'green'
  summary: string
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  const verdict = String(body.verdict ?? '')
  if (verdict !== 'red' && verdict !== 'yellow' && verdict !== 'green') {
    return NextResponse.json({ error: 'verdict required' }, { status: 400 })
  }
  const summary = String(body.summary ?? '').slice(0, 400)
  const visaType = String(body.visaType ?? 'gijinkoku').slice(0, 50)

  const id = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  const record: ShareRecord = {
    id,
    createdAt: new Date().toISOString(),
    visaType,
    verdict,
    summary,
  }
  await storage.set(`share:${id}`, record, { ex: SHARE_TTL_SEC })
  return NextResponse.json({ ok: true, id })
}
