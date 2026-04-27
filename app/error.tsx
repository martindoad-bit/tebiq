'use client'
/**
 * 全局 error boundary — v5 视觉。
 * 自动 POST /api/log-error 落 error_logs 表（lib/analytics/errors.ts captureError）。
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function GlobalError({
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
        path: typeof window !== 'undefined' ? window.location.pathname : '',
        severity: 'error',
        code: 'global_boundary',
      }),
    }).catch(() => {
      /* 静默 */
    })
  }, [error])

  return (
    <main className="min-h-[100dvh] bg-canvas px-4 py-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-phone rounded-card border border-hairline bg-surface px-5 py-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[rgba(226,87,76,0.12)] text-danger">
          <AlertTriangle size={22} strokeWidth={1.55} />
        </div>
        <h1 className="text-[18px] font-medium leading-snug text-ink">出了点问题</h1>
        <p className="mx-auto mt-2 max-w-[290px] text-[12px] leading-[1.65] text-ash">
          页面加载时发生异常。我们已经记录了这个错误，可以先重试一次或返回首页。
        </p>
        {error.digest && (
          <p className="mt-3 break-all rounded-[10px] bg-canvas px-3 py-2 font-mono text-[10px] text-ash">
            错误编号 {error.digest}
          </p>
        )}
        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={() => reset()}
            className="flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-ink shadow-cta active:translate-y-px"
          >
            <RefreshCcw size={14} strokeWidth={1.55} />
            刷新重试
          </button>
          <Link
            href="/"
            className="flex min-h-[42px] w-full items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-2.5 text-[12.5px] font-medium text-ink"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}
