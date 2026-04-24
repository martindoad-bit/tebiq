import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import {
  type Consultation,
  type ConsultationIndexEntry,
  INDEX_KEY,
  consultationKey,
  isStatus,
} from '@/lib/consultation'

export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (id) {
    const record = await storage.get<Consultation>(consultationKey(id))
    if (!record) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json({ consultation: record })
  }

  const index = (await storage.get<ConsultationIndexEntry[]>(INDEX_KEY)) ?? []
  return NextResponse.json({ items: index })
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  const id = String(body.id ?? '').trim()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const record = await storage.get<Consultation>(consultationKey(id))
  if (!record) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const next: Consultation = { ...record }
  if (typeof body.status === 'string' && isStatus(body.status)) next.status = body.status
  if (typeof body.assignedTo === 'string') next.assignedTo = body.assignedTo.trim().slice(0, 80) || undefined
  if (typeof body.internalNotes === 'string') {
    next.internalNotes = body.internalNotes.slice(0, 2000)
  }

  await storage.set(consultationKey(id), next)

  // 同步索引中的 status（其它字段不会变）
  const index = (await storage.get<ConsultationIndexEntry[]>(INDEX_KEY)) ?? []
  const updatedIndex = index.map(it => (it.id === id ? { ...it, status: next.status } : it))
  await storage.set(INDEX_KEY, updatedIndex)

  return NextResponse.json({ ok: true, consultation: next })
}
