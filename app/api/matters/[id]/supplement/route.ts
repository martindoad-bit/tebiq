/**
 * POST /api/matters/[id]/supplement
 *
 * Append a user-provided supplemental fact to a matter.
 *
 * body: { text: string }
 * -> 201 { matter }
 */
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { appendSupplementalFact } from '@/lib/db/queries/userMatters'

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
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  if (!text) {
    return NextResponse.json({ error: 'missing_text' }, { status: 400 })
  }
  const matter = await appendSupplementalFact(id, viewerId, text)
  if (!matter) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({ matter }, { status: 201 })
}
