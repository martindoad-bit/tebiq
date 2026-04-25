/**
 * lib/auth/profile.ts — Compatibility adapter.
 *
 * Original schema stored 5 fields (visaType / expiryDate / yearsInJapan /
 * companyType / recentChanges). The new Postgres members table only carries
 * `visaType` and `visaExpiry` (per spec). The other three fields are
 * **dropped** — UI that referenced them must be updated separately.
 *
 * For backward compat, this adapter still exports the legacy `UserProfile`
 * shape, populating dropped fields with neutral defaults so old API routes
 * keep returning a stable JSON shape until callers migrate.
 *
 * Deprecated — to be deleted after API routes + UI fully migrated.
 */
import {
  getMemberByPhone,
  updateMemberProfile,
} from '@/lib/db/queries/members'
import type { Member } from '@/lib/db/schema'

export type YearsInJapan = '<1' | '1-3' | '3-5' | '5+'
export type CompanyType = 'listed' | 'normal' | 'self' | 'unknown'

const VISA_LIST = [
  'gijinkoku',
  'keiei',
  'haigusha',
  'eijusha',
  'tokutei',
  'teijusha',
  'ryugaku',
  'other',
] as const
type VisaType = (typeof VISA_LIST)[number]

export interface UserProfile {
  visaType: string
  expiryDate: string // YYYY-MM-DD
  /** Deprecated: not stored in new schema. */
  yearsInJapan: YearsInJapan
  /** Deprecated: not stored in new schema. */
  companyType: CompanyType
  /** Deprecated: not stored in new schema. */
  recentChanges: string[]
  updatedAt: string
}

function memberToProfile(m: Member): UserProfile {
  return {
    visaType: m.visaType ?? '',
    expiryDate: m.visaExpiry ?? '',
    yearsInJapan: '1-3',
    companyType: 'unknown',
    recentChanges: [],
    updatedAt: m.updatedAt.toISOString(),
  }
}

export async function getProfile(phone: string): Promise<UserProfile | null> {
  const m = await getMemberByPhone(phone)
  if (!m) return null
  if (!m.visaType && !m.visaExpiry) return null
  return memberToProfile(m)
}

function coerceVisa(v: string): VisaType {
  return (VISA_LIST as readonly string[]).includes(v) ? (v as VisaType) : 'other'
}

export async function saveProfile(phone: string, p: UserProfile): Promise<void> {
  const m = await getMemberByPhone(phone)
  if (!m) return
  await updateMemberProfile(m.id, {
    visaType: coerceVisa(p.visaType),
    visaExpiry: p.expiryDate || null,
  })
}
