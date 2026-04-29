import {
  countDocumentsThisPeriod,
  countSessionDocumentsThisPeriod,
} from '@/lib/db/queries/documents'
import { familyHasUnlimitedPhoto, FREE_PHOTO_QUOTA_PER_DAY } from '@/lib/billing/access'

/**
 * 拍照配额逻辑。
 * - free: 每天 1 次
 * - 7 天试用 / 付费: 不限次数
 */
export const FREE_QUOTA_PER_MONTH = FREE_PHOTO_QUOTA_PER_DAY
export const FREE_QUOTA_PER_DAY = FREE_PHOTO_QUOTA_PER_DAY

export interface QuotaStatus {
  unlimited: boolean
  used: number
  limit: number
  remaining: number
}

export async function getPhotoQuotaForFamily(familyId: string): Promise<QuotaStatus> {
  if (await familyHasUnlimitedPhoto(familyId)) {
    return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
  }
  const since = startOfJstDay()
  const used = await countDocumentsThisPeriod(familyId, since)
  return limitedQuota(used)
}

export async function getPhotoQuotaForSession(sessionId: string): Promise<QuotaStatus> {
  const since = startOfJstDay()
  const used = await countSessionDocumentsThisPeriod(sessionId, since)
  return limitedQuota(used)
}

function limitedQuota(used: number): QuotaStatus {
  const remaining = Math.max(0, FREE_QUOTA_PER_DAY - used)
  return {
    unlimited: false,
    used,
    limit: FREE_QUOTA_PER_DAY,
    remaining,
  }
}

function startOfJstDay(): Date {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  return new Date(`${today}T00:00:00+09:00`)
}
