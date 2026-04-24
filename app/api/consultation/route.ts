import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import {
  type Consultation,
  type ConsultationIndexEntry,
  INDEX_KEY,
  INDEX_LIMIT,
  consultationKey,
  isContactMethod,
  isResultColor,
  isUrgency,
} from '@/lib/consultation'
import { getCurrentUser } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

function trim(v: unknown, max = 500): string {
  return String(v ?? '').trim().slice(0, max)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const preferredContact = trim(body.preferredContact, 20)
  const contactDetail = trim(body.contactDetail, 200)
  const urgency = trim(body.urgency, 20)
  const visaType = trim(body.visaType, 50) || 'unknown'
  const sourceVisa = trim(body.sourceVisa, 50) || visaType
  const sourcePage = trim(body.sourcePage, 200) || ''
  const resultColorRaw = trim(body.resultColor, 20)
  const userName = trim(body.userName, 80) || undefined
  const location = trim(body.location, 80) || undefined
  const additionalInfo = trim(body.additionalInfo, 1000) || undefined

  if (!isContactMethod(preferredContact)) {
    return NextResponse.json({ error: '联系方式必填' }, { status: 400 })
  }
  if (!contactDetail) {
    return NextResponse.json({ error: '请填写联系方式详情' }, { status: 400 })
  }
  if (!isUrgency(urgency)) {
    return NextResponse.json({ error: '请选择希望处理时间' }, { status: 400 })
  }

  const triggeredItems = Array.isArray(body.triggeredItems)
    ? (body.triggeredItems as unknown[])
        .map(t => trim(t, 200))
        .filter(Boolean)
        .slice(0, 20)
    : []

  const resultColor: Consultation['resultColor'] = isResultColor(resultColorRaw)
    ? resultColorRaw
    : 'unknown'

  const sessionUser = await getCurrentUser()
  const userPhone = sessionUser?.phone ?? (preferredContact === 'phone' ? contactDetail : '')

  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const createdAt = new Date().toISOString()
  const record: Consultation = {
    id,
    createdAt,
    userPhone,
    userName,
    visaType,
    resultColor,
    triggeredItems,
    urgency,
    preferredContact,
    contactDetail,
    location,
    additionalInfo,
    status: 'pending',
    sourceVisa,
    sourcePage,
  }

  const index = (await storage.get<ConsultationIndexEntry[]>(INDEX_KEY)) ?? []
  const indexEntry: ConsultationIndexEntry = {
    id,
    createdAt,
    visaType,
    resultColor,
    urgency,
    status: 'pending',
    preferredContact,
    userName,
    contactDetail,
  }

  await Promise.all([
    storage.set(consultationKey(id), record),
    storage.set(INDEX_KEY, [indexEntry, ...index].slice(0, INDEX_LIMIT)),
  ])

  return NextResponse.json({ ok: true, id })
}
