'use client'

import { useState } from 'react'
import { ClipboardCheck, Share2 } from 'lucide-react'

export default function ConsultationShareButton({ url }: { url: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copyLink() {
    try {
      const absoluteUrl = new URL(url, window.location.origin).toString()
      await navigator.clipboard.writeText(absoluteUrl)
      setState('copied')
      window.setTimeout(() => setState('idle'), 1800)
    } catch {
      setState('failed')
    }
  }

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
      >
        {state === 'copied'
          ? <ClipboardCheck className="h-4 w-4" strokeWidth={1.6} />
          : <Share2 className="h-4 w-4" strokeWidth={1.6} />}
        {state === 'copied' ? '已复制链接' : '复制链接'}
      </button>
      {state === 'failed' && (
        <p className="text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
          复制失败时，可以从浏览器地址栏复制当前页面链接。
        </p>
      )}
    </div>
  )
}
