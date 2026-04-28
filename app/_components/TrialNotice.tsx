'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  trialActive: boolean
  trialExpired: boolean
  daysRemaining: number | null
}

const DISMISS_KEY = 'tebiq_trial_expired_dismissed'

export default function TrialNotice({ trialActive, trialExpired, daysRemaining }: Props) {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
  }, [])

  if (trialActive && daysRemaining !== null && daysRemaining <= 2) {
    return (
      <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-medium leading-[1.55] text-ink">
            试用还剩 {daysRemaining} 天
          </p>
          <Link href="/subscribe" className="text-[11px] font-medium text-ink underline-offset-4 hover:underline">
            升级 ¥980/月
          </Link>
        </div>
      </section>
    )
  }

  if (!trialExpired || dismissed) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/28 px-5 pb-[calc(88px+env(safe-area-inset-bottom))] md:items-center md:pb-5">
      <section className="w-full max-w-[420px] rounded-card border border-hairline bg-surface px-4 py-4 shadow-raised">
        <h2 className="text-[15px] font-semibold leading-snug text-ink">试用已结束</h2>
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          升级 ¥980/月 后，拍照不限次数，提醒永久保留。
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem(DISMISS_KEY, '1')
              setDismissed(true)
            }}
            className="rounded-btn border border-hairline bg-canvas px-3 py-2.5 text-[12px] font-medium text-slate"
          >
            稍后处理
          </button>
          <Link
            href="/subscribe"
            className="rounded-btn bg-accent px-3 py-2.5 text-center text-[12px] font-medium text-white shadow-cta"
          >
            升级
          </Link>
        </div>
      </section>
    </div>
  )
}
