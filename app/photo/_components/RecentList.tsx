/**
 * RecentList — 屏 02 底部「最近记录」。
 * 客户端拉 /api/photo/recent，渲染最多 10 条。
 */
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Camera, ChevronRight, FileText } from 'lucide-react'
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
  if (u === 'critical' || u === 'high' || u === 'important') return '需处理'
  if (u === 'normal') return '已处理'
  return '已查看'
}

function urgencyDot(u: Urgency | null): string {
  if (u === 'critical' || u === 'high' || u === 'important') return 'bg-danger'
  if (u === 'normal') return 'bg-success'
  return 'bg-accent'
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
    <section className="mt-1">
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-[13px] font-medium text-ink">最近记录</h2>
        {items && items.length > 0 && (
          <span className="text-[10.5px] text-ash">{items.length} 件</span>
        )}
      </div>

      {items === null && (
        <div className="rounded-card border border-hairline bg-surface/75 px-4 py-4 text-[11px] text-haze shadow-card">
          加载中…
        </div>
      )}

      {items !== null && items.length === 0 && !errMsg && (
        <div className="rounded-card border border-hairline bg-surface/75 px-4 py-4 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
              <Camera size={18} strokeWidth={1.55} />
            </span>
            <div>
              <p className="text-[12px] font-medium leading-snug text-ink">
                还没有拍照记录
              </p>
              <p className="mt-1 text-[10.5px] leading-[1.55] text-ash">
                第一次识别后，会在这里保留文件名称和处理状态。
              </p>
            </div>
          </div>
        </div>
      )}

      {errMsg && (
        <p className="text-[11px] text-danger px-1">{errMsg}</p>
      )}

      <ul className="space-y-1.5">
        {items?.map(it => (
          <li key={it.id}>
            <Link
              href={`/photo/result/${it.id}`}
              className="flex items-center gap-2.5 bg-surface rounded-[12px] border border-hairline px-3 py-2.5 shadow-card hover:border-accent/40 transition-colors"
            >
              <span
                aria-hidden
                className="w-[26px] h-[26px] flex-shrink-0 rounded-md bg-chip flex items-center justify-center"
              >
                <FileText size={13} color="#18324A" strokeWidth={1.6} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[12px] font-medium text-ink truncate">
                  {it.docType}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ash">
                  <span className={`h-1.5 w-1.5 rounded-full ${urgencyDot(it.urgency)}`} />
                  {urgencyLabel(it.urgency)} · {formatDate(it.createdAt)}
                </span>
              </span>
              <ChevronRight size={15} strokeWidth={1.6} className="text-haze" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
