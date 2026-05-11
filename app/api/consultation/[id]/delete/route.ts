import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { deleteAiConsultationChainForViewer } from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface RouteParams {
  params: { id: string }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  const id = params.id?.trim()
  const viewerId = cookies().get('tebiq_viewer')?.value ?? null
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  if (!viewerId) {
    return NextResponse.json({ error: 'missing_viewer' }, { status: 401 })
  }

  const deleted = await deleteAiConsultationChainForViewer(id, viewerId)
  if (!deleted) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
