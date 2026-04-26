/**
 * GET /api/photo/quota — 当前 family 的本月配额状态
 */
import { ok, errors } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { getPhotoQuotaForFamily } from '@/lib/photo/quota'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return errors.unauthorized()
  const quota = await getPhotoQuotaForFamily(user.familyId)
  return ok({
    used: quota.used,
    limit: quota.unlimited ? null : quota.limit,
    remaining: quota.unlimited ? null : quota.remaining,
    unlimited: quota.unlimited,
  })
}
