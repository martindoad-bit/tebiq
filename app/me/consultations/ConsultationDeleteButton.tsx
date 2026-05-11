'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function ConsultationDeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)

  async function remove() {
    if (!confirming) {
      setConfirming(true)
      window.setTimeout(() => setConfirming(false), 3000)
      return
    }
    setBusy(true)
    try {
      const res = await fetch(`/api/consultation/${encodeURIComponent(id)}/delete`, {
        method: 'DELETE',
      })
      if (res.ok) router.refresh()
      else setConfirming(false)
    } finally {
      setBusy(false)
    }
  }

  const compact = !busy && !confirming

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className={`inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] text-[12px] font-medium text-[var(--tebiq-deep-slate)] disabled:opacity-50 ${
        compact ? 'w-9 px-0' : 'px-3'
      }`}
      aria-label="删除咨询记录"
      title="删除咨询记录"
    >
      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
      {!compact && (busy ? '删除中' : confirming ? '确认删除' : '删除')}
    </button>
  )
}
