/**
 * /dev/stripe-test
 *
 * Internal smoke test for Stripe Checkout. Hidden in production.
 * Renders 4 buttons; each POSTs to /api/stripe/checkout and redirects
 * to the returned Stripe Checkout URL.
 */
import { notFound } from 'next/navigation'
import { StripeTestClient } from './StripeTestClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  if (process.env.NODE_ENV === 'production') notFound()
  return (
    <main className="min-h-screen bg-base text-body">
      <div className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-bold text-title mb-2">Stripe 测试入口</h1>
        <p className="text-sm text-muted mb-6">
          仅开发环境可见。点击按钮会调用 /api/stripe/checkout 并跳转到 Stripe Checkout。
          需先在 Stripe Dashboard 创建 4 个 Price，并填入 .env.local。
        </p>
        <StripeTestClient />
      </div>
    </main>
  )
}
