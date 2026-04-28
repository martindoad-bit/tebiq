'use client'
/**
 * /subscribe 路由组的局部 error boundary。
 * 订阅流程出错不污染整个 App。
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { Crown, RefreshCcw } from 'lucide-react'

export default function SubscribeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        digest: error.digest,
        stack: error.stack?.slice(0, 1000),
        path: typeof window !== 'undefined' ? window.location.pathname : '/subscribe',
        severity: 'error',
        code: 'subscribe_boundary',
      }),
    }).catch(() => {})
  }, [error])

  return (
    <main className="min-h-[100dvh] bg-canvas px-4 py-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-phone rounded-card border border-hairline bg-surface px-5 py-7 text-center shadow-card">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent-2 text-ink shadow-soft">
          <Crown size={20} strokeWidth={1.55} />
        </div>
        <h1 className="text-[16px] font-medium text-ink">订阅页面暂时打不开</h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[11.5px] leading-[1.65] text-ash">
          没有产生任何扣款。可以刷新重试，或稍后再访问。
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[10px] text-ash">编号 {error.digest}</p>
        )}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-white shadow-cta"
          >
            <RefreshCcw size={14} strokeWidth={1.55} />
            刷新重试
          </button>
          <Link
            href="/"
            className="flex min-h-[40px] w-full items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-2.5 text-[12px] text-ink"
          >
            回到首页
          </Link>
        </div>
      </div>
    </main>
  )
}
