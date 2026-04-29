'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
        className="rounded-card border border-hairline bg-surface px-4 py-4 text-left shadow-card disabled:opacity-60"
      >
        <span className="block text-[14px] font-medium text-ink">
          {busy === 'export' ? '处理中...' : '导出我的记录'}
        </span>
        <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
          下载 JSON 文件。
        </span>
      </button>

      <button
        type="button"
        onClick={requestDeletion}
        disabled={busy !== null}
        className="rounded-card border border-hairline bg-surface px-4 py-4 text-left shadow-card disabled:opacity-60"
      >
        <span className="block text-[14px] font-medium text-danger">
          {busy === 'delete' ? '处理中...' : '删除账号和全部数据'}
        </span>
        <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
          先提交删除标记，30 天后执行硬删除。
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
