/**
 * Stripe server-side singleton.
 *
 * Lazy-initialized so `next build` can import this module without
 * STRIPE_SECRET_KEY being set. The first call inside a route handler
 * will throw a clear error if the env is missing.
 */
import Stripe from 'stripe'

// Pin to the API version Stripe ships in the installed SDK. Changing the
// SDK version is a deliberate upgrade: bump this string at the same time.
export const STRIPE_API_VERSION = '2026-04-22.dahlia' as const

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. Add it to your environment before calling Stripe APIs.',
    )
  }
  _stripe = new Stripe(key, {
    apiVersion: STRIPE_API_VERSION,
    typescript: true,
    appInfo: {
      name: 'tebiq',
      url: 'https://tebiq.jp',
    },
  })
  return _stripe
}

/**
 * Maps internal product slugs to the env var that holds the Stripe price ID.
 *
 * Routes look up a price like:
 *   const envName = STRIPE_PRICE_IDS[product]
 *   const priceId = process.env[envName]
 *
 * Reading lazily inside the handler keeps `next build` from needing real
 * Stripe price IDs at build time.
 */
export type StripeProduct =
  | 'basic_monthly'
  | 'basic_yearly'
  | 'material_package'
  | 'expert_consultation'

export const STRIPE_PRICE_IDS: Record<StripeProduct, string> = {
  basic_monthly: 'STRIPE_PRICE_BASIC_MONTHLY',
  basic_yearly: 'STRIPE_PRICE_BASIC_YEARLY',
  material_package: 'STRIPE_PRICE_MATERIAL_PACKAGE',
  expert_consultation: 'STRIPE_PRICE_EXPERT_CONSULTATION',
}

/** Resolve a product slug to its Stripe price id, throwing if env missing. */
export function getStripePriceId(product: StripeProduct): string {
  const envName = STRIPE_PRICE_IDS[product]
  const priceId = process.env[envName]
  if (!priceId) {
    throw new Error(
      `${envName} is not configured. Set the Stripe price ID for "${product}" in your environment.`,
    )
  }
  return priceId
}

/** Subscription products map to mode='subscription'; one-time to mode='payment'. */
export function isSubscriptionProduct(product: StripeProduct): boolean {
  return product === 'basic_monthly' || product === 'basic_yearly'
}

/**
 * Stripe webhook secret accessor — same lazy pattern.
 */
export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error(
      'STRIPE_WEBHOOK_SECRET is not configured. Set it in your environment to verify webhook signatures.',
    )
  }
  return secret
}
