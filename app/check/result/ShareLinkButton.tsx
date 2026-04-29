'use client'
import { useState } from 'react'
import { Copy, Link2 } from 'lucide-react'

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
        className="focus-ring flex min-h-[48px] w-full items-center justify-center gap-2 rounded-btn border border-hairline bg-surface px-4 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-canvas disabled:opacity-50"
      >
        {shareUrl ? (
          copied ? (
            <Copy size={15} strokeWidth={1.5} />
          ) : (
            <Copy size={15} strokeWidth={1.6} />
          )
        ) : (
          <Link2 size={15} strokeWidth={1.6} />
        )}
        {busy
          ? '生成分享链接中…'
          : shareUrl
            ? copied
              ? '已复制到剪贴板'
              : '再次复制分享链接'
            : '生成分享链接'}
      </button>
      {shareUrl && (
        <p className="mt-2 break-all text-[11px] leading-relaxed text-ash">
          {shareUrl} · 7 天内有效
        </p>
      )}
      {error && <p className="mt-2 text-[12px] text-warning">{error}</p>}
    </div>
  )
}
