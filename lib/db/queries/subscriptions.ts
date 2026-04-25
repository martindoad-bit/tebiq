/**
 * Subscriptions DAL.
 *
 * One subscription per family (unique constraint).
 * `tier='basic'` is the only one shipping in v2; 'premium' is schema-reserved.
 * Stripe linkage is optional; Block 1 leaves Stripe IDs nullable.
 */
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  subscriptions,
  type NewSubscription,
  type Subscription,
} from '@/lib/db/schema'

export async function getSubscriptionByFamilyId(
  familyId: string,
): Promise<Subscription | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.familyId, familyId))
    .limit(1)
  return rows[0] ?? null
}

export async function getSubscriptionByStripeSubId(
  stripeSubId: string,
): Promise<Subscription | null> {
  const rows = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, stripeSubId))
    .limit(1)
  return rows[0] ?? null
}

export async function createSubscription(
  input: NewSubscription,
): Promise<Subscription> {
  const [row] = await db.insert(subscriptions).values(input).returning()
  return row
}

export async function updateSubscriptionStatus(
  id: string,
  patch: Partial<
    Pick<
      NewSubscription,
      | 'status'
      | 'currentPeriodStart'
      | 'currentPeriodEnd'
      | 'canceledAt'
      | 'stripeCustomerId'
      | 'stripeSubscriptionId'
    >
  >,
): Promise<Subscription | null> {
  const [row] = await db
    .update(subscriptions)
    .set(patch)
    .where(eq(subscriptions.id, id))
    .returning()
  return row ?? null
}

/** True if family has an active or trialing subscription right now. */
export async function isSubscriptionActive(familyId: string): Promise<boolean> {
  const sub = await getSubscriptionByFamilyId(familyId)
  if (!sub) return false
  if (sub.status !== 'active' && sub.status !== 'trialing') return false
  return sub.currentPeriodEnd.getTime() > Date.now()
}
