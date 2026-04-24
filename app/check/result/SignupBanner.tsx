'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const DISMISS_KEY = 'tebiq_signup_banner_dismissed_at'
const HIDE_HOURS = 24

export default function SignupBanner({
  verdict,
  count,
}: {
  verdict: 'red' | 'yellow' | 'green'
  count: number
}) {
  const [state, setState] = useState<'loading' | 'show' | 'hide'>('loading')

  useEffect(() => {
    const ctrl = new AbortController()
    fetch('/api/auth/me', { cache: 'no-store', signal: ctrl.signal })
      .then(r => r.json())
      .then(d => {
        if (d?.user) return setState('hide')
        const dismissed = sessionStorage.getItem(DISMISS_KEY)
        if (dismissed && Date.now() - Number(dismissed) < HIDE_HOURS * 3600 * 1000) {
          return setState('hide')
        }
        setState('show')
      })
      .catch(() => setState('hide'))
    return () => ctrl.abort()
  }, [])

  if (state !== 'show') return null

  function dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
    setState('hide')
  }

  const next = encodeURIComponent(`/check/result?v=${verdict}&n=${count}`)

  return (
    <div className="no-capture sticky top-14 z-[5] bg-highlight border-b border-primary/30 px-4 py-2.5">
      <div className="max-w-md md:max-w-3xl mx-auto flex items-center gap-3">
        <span className="text-primary text-base flex-shrink-0">📌</span>
        <p className="flex-1 text-title text-sm leading-snug">
          创建免费账号，保存这次结果并获得到期提醒
        </p>
        <Link
          href={`/login?next=${next}`}
          className="flex-shrink-0 bg-primary hover:bg-primary-hover text-title text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
        >
          创建账号 →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="关闭"
          className="flex-shrink-0 text-muted hover:text-title text-base leading-none px-1"
        >
          ×
        </button>
      </div>
    </div>
  )
}
