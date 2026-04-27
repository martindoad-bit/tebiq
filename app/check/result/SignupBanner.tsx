'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Pin, X } from 'lucide-react'

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
    <div className="no-capture sticky top-14 z-[5] border-b border-hairline bg-accent-2/85 px-4 py-2.5 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center gap-3 md:max-w-3xl">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[9px] bg-surface text-ink shadow-soft">
          <Pin size={14} strokeWidth={1.55} />
        </span>
        <p className="flex-1 text-[13px] font-medium leading-snug text-ink">
          创建免费账号，保存这次结果并获得到期提醒
        </p>
        <Link
          href={`/login?next=${next}`}
          className="flex-shrink-0 rounded-btn bg-accent px-3 py-1.5 text-[12px] font-medium text-ink shadow-soft transition-colors hover:bg-primary-hover"
        >
          创建账号 →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="关闭"
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-ash hover:text-ink"
        >
          <X size={14} strokeWidth={1.55} />
        </button>
      </div>
    </div>
  )
}
