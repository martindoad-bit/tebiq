'use client'

import { useEffect, useState } from 'react'
import AdminNav from '@/app/admin/_components/AdminNav'
import { PageShell, Section } from '@/app/admin/_components/ui'

interface DevLoginLink {
  id: string
  email: string
  link: string
  createdAt: string
}

export default function DevLoginClient({ adminKey }: { adminKey: string }) {
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  const [links, setLinks] = useState<DevLoginLink[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`/api/admin/dev-login${keyParam}`, { cache: 'no-store' })
      if (!res.ok) {
        setMessage('dev login 只在本地 / preview 非 production 环境启用')
        setLinks([])
        return
      }
      const data = await res.json()
      setLinks(data?.links ?? [])
    } catch {
      setMessage('加载失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyParam])

  return (
    <div className="min-h-screen bg-bg text-title">
      <AdminNav adminKey={adminKey} />
      <PageShell
        title="Dev 登录链接"
        subtitle="非 production 环境使用：发送邮箱登录后，在这里直接点击 magic link。"
      >
        <Section title="未消费链接">
          <div className="rounded-2xl border border-line bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs leading-relaxed text-muted">
                这些链接来自 dev mode email fallback。点击后会消耗 token 并建立登录态。
              </p>
              <button
                type="button"
                onClick={() => load()}
                className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-title"
              >
                刷新
              </button>
            </div>

            {loading ? (
              <p className="text-sm text-muted">加载中…</p>
            ) : message ? (
              <p className="rounded-xl bg-highlight px-3 py-2 text-sm text-body">{message}</p>
            ) : links.length === 0 ? (
              <p className="rounded-xl bg-highlight px-3 py-2 text-sm text-body">
                暂时没有未消费 magic link。先去登录页输入邮箱发送一次。
              </p>
            ) : (
              <ul className="space-y-2">
                {links.map(link => (
                  <li
                    key={link.id}
                    className="rounded-xl border border-line bg-white p-3"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-title">
                          {link.email}
                        </div>
                        <div className="mt-1 text-[11px] text-muted">
                          {new Date(link.createdAt).toLocaleString('ja-JP')}
                        </div>
                      </div>
                      <a
                        href={link.link}
                        className="rounded-xl bg-primary px-3 py-2 text-center text-xs font-bold text-slate-900"
                      >
                        点击登录
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Section>
      </PageShell>
    </div>
  )
}
