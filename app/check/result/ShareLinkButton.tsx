'use client'
import { useState } from 'react'

export default function ShareLinkButton({
  verdict,
  summary,
  visaType = 'gijinkoku',
}: {
  verdict: 'red' | 'yellow' | 'green'
  summary: string
  visaType?: string
}) {
  const [busy, setBusy] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (busy) return
    if (shareUrl) {
      copy(shareUrl)
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/share/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verdict, summary, visaType }),
      })
      if (!res.ok) {
        setError('生成失败，请重试')
        return
      }
      const data = await res.json()
      const url = `${window.location.origin}/share/${data.id}`
      setShareUrl(url)
      copy(url)
    } catch {
      setError('网络异常')
    } finally {
      setBusy(false)
    }
  }

  function copy(url: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        })
        .catch(() => {
          /* ignore */
        })
    }
  }

  return (
    <div className="no-capture">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className="w-full min-h-[52px] bg-card border border-primary text-primary hover:bg-highlight disabled:opacity-50 font-bold rounded-xl text-sm transition-all"
      >
        {busy
          ? '生成分享链接中…'
          : shareUrl
            ? copied
              ? '✓ 已复制到剪贴板'
              : '再次复制分享链接'
            : '生成分享链接'}
      </button>
      {shareUrl && (
        <p className="text-muted text-[11px] mt-2 break-all">
          {shareUrl} · 7 天内有效
        </p>
      )}
      {error && <p className="text-[#DC2626] text-xs mt-2">{error}</p>}
    </div>
  )
}
