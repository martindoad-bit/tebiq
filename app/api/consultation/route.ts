/**
 * POST /api/consultation
 *
 * Submits a specialist consultation request. Migrated to Postgres DAL —
 * the new `consultations` table has a slimmer shape than the legacy KV
 * record (lib/consultation.ts kept for shared types used by admin UI),
 * so we collapse legacy fields into the `content` text + email/lineId
 * columns.
 */
import { NextResponse } from 'next/server'
import { createConsultation } from '@/lib/db/queries/consultations'
import { getCurrentUser } from '@/lib/auth/session'
import {
  isContactMethod,
  isResultColor,
  isUrgency,
  URGENCY_LABEL,
  type ContactMethod,
  type ResultColor,
} from '@/lib/consultation'

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

  const resultColor: ResultColor | 'unknown' = isResultColor(resultColorRaw)
    ? resultColorRaw
    : 'unknown'

  const sessionUser = await getCurrentUser()

  // Compose a free-form `content` blob preserving all the structured
  // metadata that was previously its own KV fields.
  const content = composeContent({
    visaType,
    resultColor,
    urgency: urgency as keyof typeof URGENCY_LABEL,
    triggeredItems,
    location,
    additionalInfo,
    sourcePage,
  })

  const channelMap: Record<ContactMethod, { phone?: string; email?: string; lineId?: string }> = {
    phone: { phone: contactDetail },
    email: { email: contactDetail },
    line: { lineId: contactDetail },
    wechat: {}, // wechat goes into content, not its own column
  }
  const channel = channelMap[preferredContact as ContactMethod] ?? {}

  const consultation = await createConsultation({
    familyId: sessionUser?.familyId ?? null,
    name: userName ?? null,
    phone: channel.phone ?? sessionUser?.phone ?? null,
    email: channel.email ?? null,
    lineId: channel.lineId ?? null,
    content,
    status: 'new',
  })

  return NextResponse.json({ ok: true, id: consultation.id })
}

function composeContent(parts: {
  visaType: string
  resultColor: string
  urgency: keyof typeof URGENCY_LABEL
  triggeredItems: string[]
  location?: string
  additionalInfo?: string
  sourcePage?: string
}): string {
  const lines: string[] = []
  lines.push(`签证：${parts.visaType}`)
  lines.push(`自查结果：${parts.resultColor}`)
  lines.push(`紧急度：${URGENCY_LABEL[parts.urgency]}`)
  if (parts.location) lines.push(`地域：${parts.location}`)
  if (parts.triggeredItems.length > 0) {
    lines.push(`触发项：\n  · ${parts.triggeredItems.join('\n  · ')}`)
  }
  if (parts.additionalInfo) lines.push(`补充：${parts.additionalInfo}`)
  if (parts.sourcePage) lines.push(`来源：${parts.sourcePage}`)
  return lines.join('\n')
}
