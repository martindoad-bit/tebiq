import { ok, errors } from '@/lib/api/response'
import { clearUserSession, getCurrentUser } from '@/lib/auth/session'
import { requestMemberDeletion } from '@/lib/db/queries/members'

export const dynamic = 'force-dynamic'

export async function POST() {
  const user = await getCurrentUser()
  if (!user) return errors.unauthorized()
  const updated = await requestMemberDeletion(user.id)
  if (!updated) return errors.notFound('member')
  await clearUserSession()
  return ok({
    deletion_requested_at: updated.deletionRequestedAt,
    deletion_scheduled_at: updated.deletionScheduledAt,
  })
}
