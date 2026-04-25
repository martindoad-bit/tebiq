import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { updateMemberProfile, type MemberProfilePatch } from '@/lib/db/queries/members'

export const dynamic = 'force-dynamic'

const VISA_TYPES = [
  'gijinkoku',
  'keiei',
  'haigusha',
  'eijusha',
  'tokutei',
  'teijusha',
  'ryugaku',
  'other',
] as const
const MARITAL = ['single', 'married', 'divorced', 'widowed'] as const
const COMPANY = [
  'category_1',
  'category_2',
  'category_3',
  'category_4',
  'not_applicable',
] as const

function dateOrNull(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const s = v.trim()
  if (!s) return null
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null
}

function strOrNull(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const s = v.trim()
  return s ? s.slice(0, max) : null
}

function enumOrNull<T extends string>(v: unknown, allowed: readonly T[]): T | null {
  if (typeof v !== 'string') return null
  return (allowed as readonly string[]).includes(v) ? (v as T) : null
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  // Build patch from whatever fields the client provided.
  // Every field is optional; client can submit only the keys it wants to update.
  const patch: MemberProfilePatch = {}

  if ('name' in body) patch.name = strOrNull(body.name, 80)
  if ('visaType' in body) {
    const v = enumOrNull(body.visaType, VISA_TYPES)
    if (v !== null) patch.visaType = v
  }
  if ('visaExpiry' in body) patch.visaExpiry = dateOrNull(body.visaExpiry)
  if ('expiryDate' in body) patch.visaExpiry = dateOrNull(body.expiryDate) // legacy field name
  if ('nationality' in body) patch.nationality = strOrNull(body.nationality, 64)
  if ('arrivedAt' in body) patch.arrivedAt = dateOrNull(body.arrivedAt)
  if ('maritalStatus' in body) {
    const v = enumOrNull(body.maritalStatus, MARITAL)
    if (v !== null) patch.maritalStatus = v
  }
  if ('hasChildren' in body) patch.hasChildren = !!body.hasChildren
  if ('currentJobIndustry' in body) patch.currentJobIndustry = strOrNull(body.currentJobIndustry, 128)
  if ('lastVisaRenewalAt' in body) patch.lastVisaRenewalAt = dateOrNull(body.lastVisaRenewalAt)
  if ('companyType' in body) {
    const v = enumOrNull(body.companyType, COMPANY)
    if (v !== null) patch.companyType = v
  }
  if ('recentChanges' in body && body.recentChanges && typeof body.recentChanges === 'object') {
    patch.recentChanges = body.recentChanges as Record<string, unknown>
  }

  const updated = await updateMemberProfile(user.id, patch)
  if (!updated) return NextResponse.json({ error: '保存失败' }, { status: 500 })
  return NextResponse.json({ ok: true, profile: updated })
}
