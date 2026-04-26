/**
 * RecentList — 屏 02 底部「最近记录」。
 * 客户端拉 /api/photo/recent，渲染最多 10 条。
 */
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { apiFetch, ApiError } from '@/lib/api/client'
import type { Urgency } from '@/lib/photo/types'

interface RecentItem {
  id: string
  docType: string
  summary: string
  createdAt: string
  urgency: Urgency | null
}
interface Resp {
  items: RecentItem[]
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
      d.getDate(),
    ).padStart(2, '0')}`
  } catch {
    return ''
  }
}

function urgencyLabel(u: Urgency | null): string {
  if (u === 'critical' || u === 'high') return '需处理'
  if (u === 'normal') return '已处理'
  return '已查看'
}

export default function RecentList() {
  const [items, setItems] = useState<RecentItem[] | null>(null)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    apiFetch<Resp>('/api/photo/recent')
      .then(d => {
        if (!cancelled) setItems(d.items)
      })
      .catch((e: unknown) => {
        if (cancelled) return
        if (e instanceof ApiError && e.status === 401) {
          // 未登录直接置空，不报错
          setItems([])
          return
        }
        setErrMsg(e instanceof Error ? e.message : '加载失败')
        setItems([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="mt-2">
      <h2 className="text-[13px] font-medium text-ink mx-1 mb-2">最近记录</h2>

      {items === null && (
        <p className="text-[11px] text-haze px-1">加载中…</p>
      )}

      {items !== null && items.length === 0 && !errMsg && (
        <p className="text-[11px] text-ash px-1">还没有记录，拍一张试试</p>
      )}

      {errMsg && (
        <p className="text-[11px] text-danger px-1">{errMsg}</p>
      )}

      <ul className="space-y-1.5">
        {items?.map(it => (
          <li key={it.id}>
            <Link
              href={`/photo/result/${it.id}`}
              className="flex items-center gap-2.5 bg-surface rounded-[10px] border border-hairline px-3 py-2.5 hover:border-accent/40 transition-colors"
            >
              <span
                aria-hidden
                className="w-[26px] h-[26px] flex-shrink-0 rounded-md bg-chip flex items-center justify-center"
              >
                <FileText size={13} color="#1E3A5F" strokeWidth={1.6} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12px] font-medium text-ink truncate">
                  {it.docType}（{urgencyLabel(it.urgency)}）
                </span>
                <span className="block text-[10px] text-ash mt-0.5">
                  {formatDate(it.createdAt)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
