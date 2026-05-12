'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AutoRefresh({ intervalMs = 20_000 }: { intervalMs?: number }) {
  const router = useRouter()
  const [lastRefresh, setLastRefresh] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => {
      setLastRefresh(new Date())
      router.refresh()
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs, router])

  return (
    <div className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-[11px] text-ash">
      自动刷新中 · 上次 {lastRefresh.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  )
}
