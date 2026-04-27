/**
 * GET /api/photo/quota — 当前 family 的本月配额状态
 */
import { ok } from '@/lib/api/response'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { getPhotoQuotaForFamily, getPhotoQuotaForSession } from '@/lib/photo/quota'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  const quota = user
    ? await getPhotoQuotaForFamily(user.familyId)
    : await getPhotoQuotaForSession(await getOrCreateAnonymousSessionId())
  return ok({
    used: quota.used,
    limit: quota.unlimited ? null : quota.limit,
    remaining: quota.unlimited ? null : quota.remaining,
    unlimited: quota.unlimited,
  })
}
