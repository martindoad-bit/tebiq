/**
 * /api/matters/[id]
 *
 * GET   -> 200 { matter }
 * PATCH -> 200 { matter }  body: { title?: string; status?: 'active'|'paused'|'closed' }
 *
 * Scoped to cookie viewer; 401 missing cookie, 404 wrong owner or no row.
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  getUserMatterForViewer,
  isMatterStatus,
  setUserMatterStatus,
  setUserMatterTitle,
} from '@/lib/db/queries/userMatters'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface RouteParams {
  params: { id: string }
}

function viewer(): string | null {
  return cookies().get('tebiq_viewer')?.value ?? null
}

export async function GET(_req: Request, { params }: RouteParams) {
  const viewerId = viewer()
  if (!viewerId) {
    return NextResponse.json({ error: 'missing_viewer' }, { status: 401 })
  }
  const id = params.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  const matter = await getUserMatterForViewer(id, viewerId)
  if (!matter) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({ matter })
}

export async function PATCH(req: Request, { params }: RouteParams) {
  const viewerId = viewer()
  if (!viewerId) {
    return NextResponse.json({ error: 'missing_viewer' }, { status: 401 })
  }
  const id = params.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  let current = await getUserMatterForViewer(id, viewerId)
  if (!current) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  if (typeof body.title === 'string' && body.title.trim()) {
    const updated = await setUserMatterTitle(id, viewerId, body.title)
    if (updated) current = updated
  }

  if (typeof body.status === 'string') {
    if (!isMatterStatus(body.status)) {
      return NextResponse.json({ error: 'invalid_status' }, { status: 400 })
    }
    const updated = await setUserMatterStatus(id, viewerId, body.status)
    if (updated) current = updated
  }

  return NextResponse.json({ matter: current })
}
