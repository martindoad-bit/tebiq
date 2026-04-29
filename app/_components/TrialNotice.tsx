'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  trialActive: boolean
  trialExpired: boolean
  daysRemaining: number | null
  needsFirstPhoto?: boolean
}

const DISMISS_KEY = 'tebiq_trial_expired_dismissed'
const FIRST_PHOTO_DISMISS_KEY = 'tebiq_trial_first_photo_dismissed'

export default function TrialNotice({
  trialActive,
  trialExpired,
  daysRemaining,
  needsFirstPhoto = false,
}: Props) {
  const [dismissed, setDismissed] = useState(false)
  const [firstPhotoDismissed, setFirstPhotoDismissed] = useState(false)

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1')
    setFirstPhotoDismissed(sessionStorage.getItem(FIRST_PHOTO_DISMISS_KEY) === '1')
  }, [])

  if (
    trialActive &&
    needsFirstPhoto &&
    daysRemaining !== null &&
    daysRemaining > 0 &&
    !firstPhotoDismissed
  ) {
    return (
      <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <div className="flex items-center gap-3">
          <Link href="/photo" className="min-w-0 flex-1 text-[12px] font-medium leading-[1.55] text-ink">
            试用期 残り {daysRemaining} 日
          </Link>
          <button
            type="button"
            aria-label="关闭试拍提示"
            onClick={() => {
              sessionStorage.setItem(FIRST_PHOTO_DISMISS_KEY, '1')
              setFirstPhotoDismissed(true)
            }}
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-hairline text-[14px] leading-none text-ash"
          >
            ×
          </button>
        </div>
      </section>
    )
  }

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
        <h2 className="text-[15px] font-medium leading-snug text-ink">试用已结束</h2>
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
