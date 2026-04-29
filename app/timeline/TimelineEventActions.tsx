'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/v5/Button'

export default function TimelineEventActions({
  eventId,
  initialNote,
  initialTags,
  archived,
}: {
  eventId: string
  initialNote: string | null
  initialTags: string[]
  archived: boolean
}) {
  const router = useRouter()
  const [note, setNote] = useState(initialNote ?? '')
  const [tags, setTags] = useState(initialTags.join(', '))
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function patch(payload: Record<string, unknown>) {
    if (busy) return
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/timeline/${eventId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) {
        setError(data?.error?.message ?? '保存失败')
        return
      }
      router.refresh()
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
      <h2 className="text-[13px] font-medium text-ink">备注 / 标签</h2>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={4}
        className="focus-ring mt-3 w-full resize-none rounded-btn border border-hairline bg-canvas px-3 py-2.5 text-[13px] leading-[1.6] text-ink outline-none focus:border-ink"
        placeholder="用户备注"
      />
      <input
        value={tags}
        onChange={e => setTags(e.target.value)}
        className="focus-ring mt-2 w-full rounded-btn border border-hairline bg-canvas px-3 py-2.5 text-[13px] text-ink outline-none focus:border-ink"
        placeholder="标签, 逗号分隔"
      />
      {error && <p className="mt-2 text-[12px] text-warning">{error}</p>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          disabled={busy}
          onClick={() => patch({
            user_note: note,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          })}
        >
          保存
        </Button>
        <button
          type="button"
          disabled={busy}
          onClick={() => patch({ archived: !archived })}
          className="focus-ring min-h-[44px] rounded-btn border border-hairline bg-canvas px-4 py-3 text-[13px] font-medium text-ink disabled:opacity-60"
        >
          {archived ? '取消归档' : '归档'}
        </button>
      </div>
    </section>
  )
}
