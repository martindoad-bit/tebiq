'use client'
import { useEffect } from 'react'
import Link from 'next/link'

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
      }),
    }).catch(() => {
      /* 静默 */
    })
  }, [error])

  return (
    <main className="min-h-screen bg-base text-body flex items-center justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md w-full bg-card border border-line rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#FEE2E2] text-[#DC2626] text-3xl font-bold flex items-center justify-center">
          !
        </div>
        <h1 className="text-2xl font-bold text-title mb-3">出错了</h1>
        <p className="text-body text-base leading-relaxed mb-6">
          页面加载时发生异常。可以尝试重新加载，或返回首页继续浏览。
        </p>
        {error.digest && (
          <p className="text-muted text-xs mb-4 font-mono break-all">
            错误编号：{error.digest}
          </p>
        )}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full min-h-[52px] bg-primary hover:bg-primary-hover text-title font-bold rounded-xl text-base transition-all"
          >
            重新加载
          </button>
          <Link
            href="/"
            className="w-full min-h-[44px] flex items-center justify-center text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}
