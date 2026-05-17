/**
 * /api/matters
 *
 * 1.0 WB-F L2 Continuation — list + create user matters scoped to the
 * cookie-derived viewer id. No auth beyond that cookie (same model as
 * /api/consultation/* in Alpha).
 *
 * POST /api/matters
 *   body: { title: string; originConsultationId?: string | null }
 *   -> 201 { matter }
 *
 * GET  /api/matters?status=active|paused|closed|all
 *   -> 200 { matters: UserMatter[] }
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  createUserMatter,
  isMatterStatus,
  listUserMattersForViewer,
  type MatterStatus,
} from '@/lib/db/queries/userMatters'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function viewer(): string | null {
  return cookies().get('tebiq_viewer')?.value ?? null
}

export async function GET(req: Request) {
  const viewerId = viewer()
  if (!viewerId) {
    return NextResponse.json({ error: 'missing_viewer' }, { status: 401 })
  }
  const url = new URL(req.url)
  const rawStatus = url.searchParams.get('status') ?? 'all'
  const status: MatterStatus | 'all' =
    rawStatus === 'all'
      ? 'all'
      : isMatterStatus(rawStatus)
        ? rawStatus
        : 'all'
  const matters = await listUserMattersForViewer(viewerId, { status, limit: 100 })
  return NextResponse.json({ matters })
}

export async function POST(req: Request) {
  const viewerId = viewer()
  if (!viewerId) {
    return NextResponse.json({ error: 'missing_viewer' }, { status: 401 })
  }
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  if (!title) {
    return NextResponse.json({ error: 'missing_title' }, { status: 400 })
  }
  const originConsultationId =
    typeof body.originConsultationId === 'string' && body.originConsultationId.trim()
      ? body.originConsultationId.trim()
      : null
  const matter = await createUserMatter({
    viewerId,
    title,
    originConsultationId,
  })
  return NextResponse.json({ matter }, { status: 201 })
}
