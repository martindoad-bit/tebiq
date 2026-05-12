'use client'

import { useState } from 'react'

export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-[10px] border border-hairline bg-surface px-3 py-2 text-[12px] font-medium text-ink hover:border-accent"
    >
      {copied ? '已复制' : label}
    </button>
  )
}
