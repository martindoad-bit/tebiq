'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, X } from 'lucide-react'

interface Props {
  matterId: string
  alreadyClosed: boolean
}

export default function CloseMatterButton({ matterId, alreadyClosed }: Props) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (alreadyClosed) {
    return (
      <span
        className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-cool-gray)]"
        aria-disabled="true"
      >
        <X className="h-4 w-4" strokeWidth={1.6} />
        已关闭
      </span>
    )
  }

  async function onClick() {
    if (busy) return
    if (!confirming) {
      setConfirming(true)
      setError(null)
      window.setTimeout(() => setConfirming(false), 3000)
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/matters/${encodeURIComponent(matterId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'closed' }),
      })
      if (!res.ok) {
        setError('关闭失败，稍后再试。')
        setConfirming(false)
        return
      }
      router.refresh()
    } catch {
      setError('关闭失败，稍后再试。')
      setConfirming(false)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)] transition-colors hover:border-[var(--tebiq-cool-gray)] disabled:opacity-50"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.6} />
        ) : (
          <X className="h-4 w-4" strokeWidth={1.6} />
        )}
        {busy ? '关闭中' : confirming ? '确认关闭' : '关闭事项'}
      </button>
      {error && (
        <span className="text-[12px] text-[var(--tebiq-warm-amber)]">{error}</span>
      )}
    </div>
  )
}
