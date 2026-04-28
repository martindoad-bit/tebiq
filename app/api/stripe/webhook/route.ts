/**
 * POST /api/stripe/webhook
 *
 * Stripe webhook receiver. Verifies signature with STRIPE_WEBHOOK_SECRET,
 * then routes events to DAL writers.
 *
 * Idempotency: we use natural keys.
 *   - Subscriptions are looked up by stripeSubscriptionId.
 *   - Purchases are looked up by stripePaymentIntentId before we mark paid.
 *   - For one-time orders, the purchase row is created on
 *     `checkout.session.completed` (mode=payment) — so duplicate webhook
 *     deliveries upsert by paymentIntent rather than insert again.
 *
 * App Router note: read raw body via `req.text()`; the framework does not
 * mutate it. `runtime = 'nodejs'` is required because the Stripe SDK uses
 * Node crypto.
 */
import type Stripe from 'stripe'
import { ok, err } from '@/lib/api/response'
import { getStripe, getStripeWebhookSecret } from '@/lib/stripe/server'
import {
  createSubscription,
  getSubscriptionByFamilyId,
  getSubscriptionByStripeSubId,
  updateSubscriptionStatus,
} from '@/lib/db/queries/subscriptions'
import { unarchiveTimelineEventsForFamily } from '@/lib/db/queries/timeline'
import {
  createPurchase,
  markPurchasePaid,
} from '@/lib/db/queries/purchases'
import { db } from '@/lib/db'
import { purchases, type NewPurchase, type NewSubscription } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// --- Helpers --------------------------------------------------------------

const PRODUCT_AMOUNTS: Record<string, number> = {
  expert_consultation: 9800,
}

function statusFromStripe(s: Stripe.Subscription.Status): NewSubscription['status'] {
  switch (s) {
    case 'trialing':
      return 'trialing'
    case 'active':
      return 'active'
    case 'past_due':
    case 'unpaid':
      return 'past_due'
    case 'canceled':
      return 'canceled'
    case 'incomplete':
    case 'incomplete_expired':
    case 'paused':
      return 'expired'
    default:
      return 'expired'
  }
}

function billingCycleFromInterval(interval: string | undefined): NewSubscription['billingCycle'] {
  return interval === 'year' ? 'yearly' : 'monthly'
}

function toDate(unixSeconds: number | null | undefined): Date {
  if (!unixSeconds) return new Date()
  return new Date(unixSeconds * 1000)
}

// --- Event handlers -------------------------------------------------------

async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const stripe = getStripe()

  if (session.mode === 'subscription') {
    const familyId = session.metadata?.family_id
    if (!familyId) {
      // eslint-disable-next-line no-console
      console.warn('[stripe.webhook] subscription session missing family_id', session.id)
      return
    }
    const stripeSubId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id
    if (!stripeSubId) return

    // Pull the full subscription (session only carries the id).
    const sub = await stripe.subscriptions.retrieve(stripeSubId)
    await upsertSubscriptionFromStripe(familyId, sub, session.customer)
    return
  }

  if (session.mode === 'payment') {
    const product = session.metadata?.product
    if (!product || !(product in PRODUCT_AMOUNTS)) {
      // eslint-disable-next-line no-console
      console.warn('[stripe.webhook] payment session missing/invalid product', session.id, product)
      return
    }

    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id
    if (!paymentIntentId) return

    // Idempotency: skip if we already recorded this PI.
    const existing = await db
      .select()
      .from(purchases)
      .where(eq(purchases.stripePaymentIntentId, paymentIntentId))
      .limit(1)
    if (existing.length > 0) {
      // Ensure status is paid.
      if (existing[0].status !== 'paid') {
        await markPurchasePaid(existing[0].id, paymentIntentId)
      }
      return
    }

    // For one-time orders we may or may not have a logged-in family.
    // If session.customer_email matches an existing member we could link;
    // for simplicity Block 2 stores familyId only when set in metadata
    // (e.g. when /api/stripe/checkout was called from a logged-in flow
    // that future-passes family_id through). Otherwise we store the
    // purchase orphan and link later when the user signs up.
    const familyId = session.metadata?.family_id ?? null
    const quizResultId = session.metadata?.quiz_result_id || null
    const amountJpy = session.amount_total ?? PRODUCT_AMOUNTS[product] ?? 0

    if (!familyId) {
      // No family yet; we still want a paid record so we know the order
      // happened. We require a familyId in the schema, so we skip the
      // insert and let admin reconcile manually if it ever happens.
      // eslint-disable-next-line no-console
      console.warn(
        '[stripe.webhook] one-time payment without family_id metadata — skipped',
        session.id,
      )
      return
    }

    const input: NewPurchase = {
      familyId,
      product: product as NewPurchase['product'],
      amountJpy,
      status: 'pending',
      stripePaymentIntentId: paymentIntentId,
      metadata: { quizResultId, sessionId: session.id },
    }
    const created = await createPurchase(input)
    await markPurchasePaid(created.id, paymentIntentId)
  }
}

async function upsertSubscriptionFromStripe(
  familyId: string,
  sub: Stripe.Subscription,
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): Promise<void> {
  const customerId = typeof customer === 'string' ? customer : customer?.id ?? null
  const item = sub.items.data[0]
  const interval = item?.price.recurring?.interval
  const billingCycle = billingCycleFromInterval(interval)
  // Stripe returns `current_period_end` on subscription items in newer API
  // versions; fall back to the period that paid the latest invoice.
  const periodEnd = (item?.current_period_end ?? sub.billing_cycle_anchor ?? 0) as number
  const periodStart = (item?.current_period_start ?? sub.start_date ?? 0) as number

  const existing = await getSubscriptionByStripeSubId(sub.id)
  if (existing) {
    await updateSubscriptionStatus(existing.id, {
      status: statusFromStripe(sub.status),
      currentPeriodStart: toDate(periodStart),
      currentPeriodEnd: toDate(periodEnd),
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: sub.id,
      canceledAt: sub.canceled_at ? toDate(sub.canceled_at) : null,
    })
    await unarchiveTimelineEventsForFamily(familyId)
    return
  }

  // Maybe the family already had a sub row (e.g. manual seed).
  const byFamily = await getSubscriptionByFamilyId(familyId)
  if (byFamily) {
    await updateSubscriptionStatus(byFamily.id, {
      status: statusFromStripe(sub.status),
      currentPeriodStart: toDate(periodStart),
      currentPeriodEnd: toDate(periodEnd),
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: sub.id,
      canceledAt: sub.canceled_at ? toDate(sub.canceled_at) : null,
    })
    await unarchiveTimelineEventsForFamily(familyId)
    return
  }

  await createSubscription({
    familyId,
    tier: 'basic',
    status: statusFromStripe(sub.status),
    currentPeriodStart: toDate(periodStart),
    currentPeriodEnd: toDate(periodEnd),
    billingCycle,
    stripeCustomerId: customerId ?? undefined,
    stripeSubscriptionId: sub.id,
  })
  await unarchiveTimelineEventsForFamily(familyId)
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription): Promise<void> {
  const existing = await getSubscriptionByStripeSubId(sub.id)
  if (!existing) {
    // Missing local row — try metadata to recover.
    const familyId = sub.metadata?.family_id
    if (familyId) await upsertSubscriptionFromStripe(familyId, sub, sub.customer)
    return
  }
  const item = sub.items.data[0]
  const periodEnd = (item?.current_period_end ?? 0) as number
  const periodStart = (item?.current_period_start ?? 0) as number
  await updateSubscriptionStatus(existing.id, {
    status: statusFromStripe(sub.status),
    currentPeriodStart: toDate(periodStart),
    currentPeriodEnd: toDate(periodEnd),
    canceledAt: sub.canceled_at ? toDate(sub.canceled_at) : null,
  })
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription): Promise<void> {
  const existing = await getSubscriptionByStripeSubId(sub.id)
  if (!existing) return
  await updateSubscriptionStatus(existing.id, {
    status: 'canceled',
    canceledAt: new Date(),
  })
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  // Invoice may carry the subscription id on the parent.subscription_details
  // (newer API) or on the legacy `subscription` field.
  const stripeSubId =
    (invoice as unknown as { subscription?: string | Stripe.Subscription }).subscription
  const id = typeof stripeSubId === 'string' ? stripeSubId : stripeSubId?.id
  if (!id) return
  const existing = await getSubscriptionByStripeSubId(id)
  if (!existing) return
  await updateSubscriptionStatus(existing.id, { status: 'past_due' })
}

// --- Route entry ----------------------------------------------------------

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return err('bad_request', 'missing stripe-signature', 400)

  const body = await req.text() // raw body for signature verification

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, getStripeWebhookSecret())
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'invalid signature'
    return err('invalid_signature', `Stripe signature verification failed: ${msg}`, 400)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      default:
        // ignore other events
        break
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[stripe.webhook] handler error', event.type, e)
    return err('handler_error', 'webhook handler failed', 500)
  }

  return ok({ received: true })
}
