/**
 * Stripe client-side loader.
 *
 * Returns a memoized Promise<Stripe | null> from @stripe/stripe-js.
 * Safe to call inside React components — `loadStripe` itself is lazy
 * and only runs once. The publishable key MUST be NEXT_PUBLIC_ prefixed
 * so it ends up in the browser bundle.
 *
 * For the current Block 2 flow we redirect to a Checkout Session URL
 * server-side (no client SDK needed). This loader is here for future
 * Elements / Payment Element work.
 */
import { loadStripe, type Stripe as StripeJs } from '@stripe/stripe-js'

let _stripePromise: Promise<StripeJs | null> | null = null

export function getStripeClient(): Promise<StripeJs | null> {
  if (_stripePromise) return _stripePromise
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) {
    // eslint-disable-next-line no-console
    console.warn(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set; client Stripe calls will fail.',
    )
    _stripePromise = Promise.resolve(null)
    return _stripePromise
  }
  _stripePromise = loadStripe(key)
  return _stripePromise
}
