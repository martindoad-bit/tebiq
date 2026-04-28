/**
 * POST /api/stripe/checkout
 *
 * Body: { product, quizResultId? }
 *   product = 'basic_monthly' | 'basic_yearly' | 'expert_consultation'
 *
 * Subscription products require login (we attach family_id to metadata).
 * One-time products do not require login — Stripe collects email at checkout.
 *
 * Returns: { checkout_url }
 */
import { ok, err, errors } from '@/lib/api/response'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import {
  getStripe,
  getStripePriceId,
  isSubscriptionProduct,
  type StripeProduct,
} from '@/lib/stripe/server'
import { getSubscriptionByFamilyId } from '@/lib/db/queries/subscriptions'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_PRODUCTS: ReadonlySet<StripeProduct> = new Set<StripeProduct>([
  'basic_monthly',
  'basic_yearly',
  'expert_consultation',
])

function siteUrl(): string {
  // Prefer explicit override, else infer from Vercel, else localhost.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  return 'http://localhost:3000'
}

export async function POST(req: Request) {
  let body: { product?: unknown; quizResultId?: unknown }
  try {
    body = await req.json()
  } catch {
    return errors.badRequest('请求体不是合法 JSON')
  }

  const productRaw = body.product
  if (
    typeof productRaw !== 'string' ||
    !VALID_PRODUCTS.has(productRaw as StripeProduct)
  ) {
    return errors.badRequest('product 字段无效')
  }
  const product = productRaw as StripeProduct
  const quizResultId =
    typeof body.quizResultId === 'string' ? body.quizResultId : undefined

  const stripe = getStripe()
  const priceId = getStripePriceId(product)
  const base = siteUrl()
  const success_url = `${base}/my?stripe=success&session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${base}/?stripe=canceled`

  // 埋点：客户启动结账（不论是否成功），admin 漏斗按 product 分桶
  await track(EVENT.SUBSCRIBE_CHECKOUT_STARTED, { product, hasQuizResult: !!quizResultId })

  try {
    if (isSubscriptionProduct(product)) {
      // Subscription: require auth so we can bind to family.
      const member = await getCurrentUser()
      if (!member) return errors.unauthorized()

      // If family already has a Stripe customer, reuse it; else let Stripe
      // create one (we capture the id from the webhook).
      const existingSub = await getSubscriptionByFamilyId(member.familyId)
      const existingCustomerId = existingSub?.stripeCustomerId ?? undefined

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url,
        cancel_url,
        ...(existingCustomerId
          ? { customer: existingCustomerId }
          : {
              // Prefer a real email; fall back to a stable placeholder so
              // Stripe can still dedupe customers per-member.
              customer_email: member.email ?? `${member.id}@tebiq-placeholder.local`,
            }),
        metadata: {
          family_id: member.familyId,
          member_id: member.id,
          product,
        },
        subscription_data: {
          metadata: {
            family_id: member.familyId,
            member_id: member.id,
            product,
          },
        },
        // Stripe handles JP-friendly methods (Card / Konbini / etc.) per
        // Dashboard config; we don't need to enumerate payment_method_types.
        allow_promotion_codes: true,
        locale: 'ja',
      })

      if (!session.url) return err('stripe_no_url', 'Stripe 未返回 checkout url', 500)
      return ok({ checkout_url: session.url })
    }

    // One-time products: no auth required.
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url,
      cancel_url,
      metadata: {
        product,
        quiz_result_id: quizResultId ?? '',
      },
      payment_intent_data: {
        metadata: {
          product,
          quiz_result_id: quizResultId ?? '',
        },
      },
      locale: 'ja',
    })

    if (!session.url) return err('stripe_no_url', 'Stripe 未返回 checkout url', 500)
    return ok({ checkout_url: session.url })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown'
    return err('stripe_error', `创建 Checkout 失败: ${msg}`, 500)
  }
}
