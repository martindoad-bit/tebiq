/**
 * Admin consultations API — list / detail / status update.
 *
 * Migrated to Postgres DAL. Public response shape preserved (best-effort)
 * so existing admin UI keeps working: legacy fields like `assignedTo`,
 * `internalNotes`, `triggeredItems`, `urgency`, `preferredContact` are
 * synthesized from the new schema where possible, or returned as empty.
 */
import { NextRequest, NextResponse } from 'next/server'
import {
  getConsultationById,
  listConsultations,
  updateConsultationStatus,
} from '@/lib/db/queries/consultations'
import type { Consultation as DbConsultation } from '@/lib/db/schema'
import {
  type ConsultationIndexEntry,
  type Consultation as LegacyConsultation,
  isStatus,
  type ConsultationStatus,
} from '@/lib/consultation'

export const dynamic = 'force-dynamic'

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) return true
  return req.nextUrl.searchParams.get('key') === adminKey
}

/** Map new schema status → legacy enum values used by the admin UI. */
function mapStatus(s: DbConsultation['status']): ConsultationStatus {
  if (s === 'new') return 'pending'
  if (s === 'contacted') return 'contacted'
  return 'closed'
}

function mapStatusReverse(s: ConsultationStatus): DbConsultation['status'] {
  if (s === 'pending' || s === 'assigned') return 'new'
  if (s === 'contacted' || s === 'converted') return 'contacted'
  return 'closed' // closed
}

function toIndexEntry(c: DbConsultation): ConsultationIndexEntry {
  return {
    id: c.id,
    createdAt: c.createdAt.toISOString(),
    visaType: 'unknown', // not stored separately; would need to parse content
    resultColor: 'unknown',
    urgency: 'normal',
    status: mapStatus(c.status),
    preferredContact: c.email ? 'email' : c.lineId ? 'line' : 'phone',
    userName: c.name ?? undefined,
    contactDetail: c.email ?? c.lineId ?? c.phone ?? '',
  }
}

function toLegacyConsultation(c: DbConsultation): LegacyConsultation {
  return {
    id: c.id,
    createdAt: c.createdAt.toISOString(),
    userPhone: c.phone ?? '',
    userName: c.name ?? undefined,
    visaType: 'unknown',
    resultColor: 'unknown',
    triggeredItems: [],
    urgency: 'normal',
    preferredContact: c.email ? 'email' : c.lineId ? 'line' : 'phone',
    contactDetail: c.email ?? c.lineId ?? c.phone ?? '',
    location: undefined,
    additionalInfo: c.content ?? undefined,
    status: mapStatus(c.status),
    sourceVisa: 'unknown',
    sourcePage: '',
  }
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const id = req.nextUrl.searchParams.get('id')
  if (id) {
    const record = await getConsultationById(id)
    if (!record) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json({ consultation: toLegacyConsultation(record) })
  }

  const rows = await listConsultations({}, 200)
  return NextResponse.json({ items: rows.map(toIndexEntry) })
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
  if (typeof body.status !== 'string' || !isStatus(body.status)) {
    return NextResponse.json({ error: 'status invalid' }, { status: 400 })
  }

  const updated = await updateConsultationStatus(id, mapStatusReverse(body.status))
  if (!updated) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ consultation: toLegacyConsultation(updated) })
}
