/**
 * GET /api/subscriptions/me
 *
 * Returns the current user's subscription summary, or null fields if free.
 */
import { ok, errors } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const member = await getCurrentUser()
  if (!member) return errors.unauthorized()

  const sub = await getSubscriptionByFamilyId(member.familyId)
  if (!sub) {
    return ok({
      tier: null,
      status: null,
      currentPeriodEnd: null,
      billingCycle: null,
    })
  }

  return ok({
    tier: sub.tier,
    status: sub.status,
    currentPeriodEnd: sub.currentPeriodEnd.toISOString(),
    billingCycle: sub.billingCycle,
  })
}
