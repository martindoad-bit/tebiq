/**
 * POST /api/matters/[id]/link
 *
 * Append a link to a material (quick-reference / material entity) or
 * to another consultation row.
 *
 * body: { kind: 'material' | 'consultation'; value: string }
 * -> 201 { matter }
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { appendMatterLink } from '@/lib/db/queries/userMatters'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface RouteParams {
  params: { id: string }
}

export async function POST(req: Request, { params }: RouteParams) {
  const viewerId = cookies().get('tebiq_viewer')?.value ?? null
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
  const kind = body.kind
  if (kind !== 'material' && kind !== 'consultation') {
    return NextResponse.json({ error: 'invalid_kind' }, { status: 400 })
  }
  const value = typeof body.value === 'string' ? body.value.trim() : ''
  if (!value) {
    return NextResponse.json({ error: 'missing_value' }, { status: 400 })
  }
  const matter = await appendMatterLink(id, viewerId, kind, value)
  if (!matter) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({ matter }, { status: 201 })
}
