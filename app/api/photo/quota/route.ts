/**
 * GET /api/photo/quota — 当前 family 的本月配额状态
 */
import { ok } from '@/lib/api/response'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { getPhotoQuotaForFamily, getPhotoQuotaForSession } from '@/lib/photo/quota'
import { countTimelineEvents } from '@/lib/db/queries/timeline'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getOrCreateAnonymousSessionId()
  const quota = user
    ? await getPhotoQuotaForFamily(user.familyId)
    : await getPhotoQuotaForSession(sessionId as string)
  const archivedDocumentsCount = await countTimelineEvents(
    { memberId: user?.id ?? null, sessionId },
    { eventType: 'photo_recognition', includeArchived: true },
  )
  return ok({
    used: quota.used,
    limit: quota.unlimited ? null : quota.limit,
    remaining: quota.unlimited ? null : quota.remaining,
    unlimited: quota.unlimited,
    archivedDocumentsCount,
  })
}
