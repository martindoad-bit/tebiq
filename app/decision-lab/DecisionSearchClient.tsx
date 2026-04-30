'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DecisionSearchClient() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const raw = query.trim()
    if (!raw || busy) return
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch('/api/decision-lab/query', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ query: raw, sourcePage: '/decision-lab' }),
      })
      const json = await res.json() as {
        ok?: boolean
        data?: { slug?: string | null; message?: string }
      }
      const slug = json.data?.slug
      if (res.ok && slug) {
        router.push(`/decision-lab/${slug}`)
        return
      }
      setMessage(json.data?.message ?? '这个情况还没有整理，我们会根据收到的问题继续补充')
    } catch {
      setMessage('记录失败。可以先查看下方已有决策卡。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <label htmlFor="decision-query" className="text-[12px] font-medium text-ink">
        输入情况
      </label>
      <textarea
        id="decision-query"
        value={query}
        onChange={event => setQuery(event.target.value)}
        maxLength={1000}
        rows={4}
        placeholder="例：公司休眠后，新工作还没入职，区役所让我切国民年金"
        className="mt-2 w-full resize-none rounded-[12px] border border-hairline bg-canvas px-3 py-3 text-[13px] leading-[1.6] text-ink outline-none placeholder:text-ash focus:border-ink"
      />
      <button
        type="submit"
        disabled={busy || !query.trim()}
        className="mt-3 min-h-[42px] w-full rounded-btn bg-ink px-4 py-2 text-[13px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
      >
        {busy ? '处理中...' : '查找决策卡'}
      </button>
      {message && (
        <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-[12px] leading-[1.6] text-slate">
          {message}
        </p>
      )}
    </form>
  )
}
