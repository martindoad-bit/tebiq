/**
 * POST /api/stripe/portal
 *
 * Returns a Stripe Billing Portal session URL for the logged-in family.
 * Requires a subscription with a stripeCustomerId on file.
 */
import { ok, err, errors } from '@/lib/api/response'
import { getCurrentUser } from '@/lib/auth/session'
import { getStripe } from '@/lib/stripe/server'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

export async function POST() {
  const member = await getCurrentUser()
  if (!member) return errors.unauthorized()

  const sub = await getSubscriptionByFamilyId(member.familyId)
  if (!sub?.stripeCustomerId) {
    return err('no_customer', '尚未建立 Stripe 客户档案', 400)
  }

  try {
    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripeCustomerId,
      return_url: `${siteUrl()}/my`,
    })
    return ok({ portal_url: session.url })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    return err('stripe_error', `创建 Portal 失败: ${msg}`, 500)
  }
}
