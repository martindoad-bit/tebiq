'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Archive, Trash2 } from 'lucide-react'

export default function SettingsClient() {
  const router = useRouter()
  const [busy, setBusy] = useState<'export' | 'delete' | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function exportData() {
    setBusy('export')
    setMessage(null)
    try {
      const res = await fetch('/api/settings/export', { cache: 'no-store' })
      const text = await res.text()
      if (!res.ok) throw new Error('导出失败')
      const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `tebiq-export-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      setMessage('已生成 JSON 导出文件')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : '导出失败')
    } finally {
      setBusy(null)
    }
  }

  async function requestDeletion() {
    if (!window.confirm('这将删除您的全部档案、提醒和账号。该操作不可撤销。')) return
    setBusy('delete')
    setMessage(null)
    try {
      const res = await fetch('/api/settings/delete-account', { method: 'POST' })
      if (!res.ok) throw new Error('删除请求提交失败')
      setMessage('已提交删除请求。当前登录状态已退出。')
      router.replace('/')
      router.refresh()
    } catch (e) {
      setMessage(e instanceof Error ? e.message : '删除请求提交失败')
    } finally {
      setBusy(null)
    }
  }

  return (
    <section className="mt-3 grid gap-3">
      <button
        type="button"
        onClick={exportData}
        disabled={busy !== null}
        className="flex items-start gap-3 rounded-card border border-hairline bg-surface px-4 py-4 text-left shadow-card disabled:opacity-60"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-paper text-ink">
          <Archive size={17} strokeWidth={1.5} />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-medium text-ink">
            {busy === 'export' ? '处理中...' : '导出我的记录'}
          </span>
          <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
            下载 JSON 文件，包含账号、档案和提醒记录。
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={requestDeletion}
        disabled={busy !== null}
        className="flex items-start gap-3 rounded-card border border-warning/45 bg-surface px-4 py-4 text-left shadow-card disabled:opacity-60"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#FFF4E1] text-warning">
          <Trash2 size={17} strokeWidth={1.5} />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-medium text-ink">
            {busy === 'delete' ? '处理中...' : '删除账号和全部数据'}
          </span>
          <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
            提交删除请求后，账号进入 30 天等待期。
          </span>
        </span>
      </button>

      {message && (
        <p className="rounded-[12px] border border-hairline bg-surface px-3 py-2 text-[12px] leading-[1.6] text-slate">
          {message}
        </p>
      )}
    </section>
  )
}
