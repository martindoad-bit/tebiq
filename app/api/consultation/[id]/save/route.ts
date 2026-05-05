import { NextResponse } from 'next/server'
import {
  getAiConsultationById,
  setAiConsultationSaved,
} from '@/lib/db/queries/aiConsultations'

// POST /api/consultation/[id]/save
//
// Issue #39 §4.6 — saved_question=true. Same effect as feedback='saved'
// but accessible without picking a feedback type (the save button is
// independent of the 5-feedback row).

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface RouteParams {
  params: { id: string }
}

export async function POST(_req: Request, { params }: RouteParams) {
  const id = params.id?.trim()
  if (!id) {
    return NextResponse.json({ error: 'missing_id' }, { status: 400 })
  }
  const exists = await getAiConsultationById(id)
  if (!exists) {
    return NextResponse.json({ error: 'unknown_consultation_id' }, { status: 404 })
  }
  try {
    await setAiConsultationSaved(id)
    return NextResponse.json({ ok: true, saved: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[consultation/save] failed', message)
    return NextResponse.json({ error: 'persist_failed', detail: message }, { status: 500 })
  }
}
