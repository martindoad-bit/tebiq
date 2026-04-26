'use client'

import { useEffect, useMemo, useState } from 'react'
import AdminNav from '@/app/admin/_components/AdminNav'
import { Field, PageShell, Section } from '@/app/admin/_components/ui'
import { parseMarkdownBlocks, plainTextFromMarkdown } from '@/lib/knowledge/markdown'

type ArticleStatus = 'draft' | 'reviewing' | 'published'

interface AdminArticle {
  id: string
  title: string
  bodyMarkdown: string
  category: string
  status: ArticleStatus
  requiresShoshiReview: boolean
  updatedAt: string
}

const EMPTY: Omit<AdminArticle, 'id' | 'updatedAt'> & { id?: string; updatedAt?: string } = {
  title: '',
  bodyMarkdown: '## 小标题\n\n正文内容。\n\n- 要点一\n- 要点二',
  category: '签证相关',
  status: 'draft',
  requiresShoshiReview: true,
}

const STATUS_LABEL: Record<ArticleStatus, string> = {
  draft: '草稿',
  reviewing: '审核中',
  published: '已发布',
}

export default function AdminKnowledgeClient({ adminKey }: { adminKey: string }) {
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  const [articles, setArticles] = useState<AdminArticle[]>([])
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/admin/knowledge${keyParam}`, { cache: 'no-store' })
    const data = await res.json()
    setArticles(data?.articles ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load().catch(() => {
      setMessage('加载失败')
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyParam])

  const preview = useMemo(() => parseMarkdownBlocks(form.bodyMarkdown), [form.bodyMarkdown])

  async function save() {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/admin/knowledge${keyParam}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data?.error ?? '保存失败')
        return
      }
      setMessage('已保存')
      setForm(data.article)
      await load()
    } catch {
      setMessage('网络异常')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-title">
      <AdminNav adminKey={adminKey} />
      <PageShell title="知识内容" subtitle="Markdown 编辑；公开侧只显示已发布文章。">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Section title="文章列表">
            <div className="rounded-2xl border border-line bg-card p-2">
              <button
                type="button"
                onClick={() => setForm(EMPTY)}
                className="mb-2 w-full rounded-xl bg-primary px-3 py-2 text-left text-sm font-bold text-slate-900"
              >
                新建文章
              </button>
              {loading ? (
                <div className="px-3 py-4 text-xs text-muted">加载中…</div>
              ) : (
                <div className="space-y-1">
                  {articles.map(article => (
                    <button
                      key={article.id}
                      type="button"
                      onClick={() => setForm(article)}
                      className={`w-full rounded-xl px-3 py-2 text-left transition-colors ${
                        form.id === article.id ? 'bg-highlight' : 'hover:bg-highlight/50'
                      }`}
                    >
                      <div className="truncate text-sm font-bold text-title">{article.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted">
                        <span>{STATUS_LABEL[article.status]}</span>
                        <span>{article.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Section>

          <Section title="编辑器">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-line bg-card p-4">
                <Field label="标题">
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="分类">
                    <input
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </Field>
                  <Field label="状态">
                    <select
                      value={form.status}
                      onChange={e =>
                        setForm(f => ({ ...f, status: e.target.value as ArticleStatus }))
                      }
                      className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                      {Object.entries(STATUS_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <label className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm text-body">
                  <input
                    type="checkbox"
                    checked={form.requiresShoshiReview}
                    onChange={e =>
                      setForm(f => ({ ...f, requiresShoshiReview: e.target.checked }))
                    }
                  />
                  需要书士审核标记
                </label>
                <Field label="正文 Markdown">
                  <textarea
                    value={form.bodyMarkdown}
                    onChange={e => setForm(f => ({ ...f, bodyMarkdown: e.target.value }))}
                    rows={18}
                    className="w-full rounded-xl border border-line bg-white px-3 py-2 font-mono text-xs leading-relaxed outline-none focus:border-primary"
                  />
                </Field>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={save}
                    disabled={saving}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-slate-900 disabled:opacity-50"
                  >
                    {saving ? '保存中…' : '保存'}
                  </button>
                  {message && <span className="text-xs text-muted">{message}</span>}
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-card p-4">
                <div className="mb-3 text-xs font-bold text-primary">预览</div>
                <h2 className="text-xl font-bold leading-snug">{form.title || '未命名文章'}</h2>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                  {plainTextFromMarkdown(form.bodyMarkdown)}
                </p>
                <div className="mt-4 space-y-3 border-t border-line pt-4">
                  {preview.map((block, idx) => {
                    if (block.type === 'heading') {
                      return (
                        <h3 key={idx} className="text-sm font-bold text-title">
                          {block.text}
                        </h3>
                      )
                    }
                    if (block.type === 'list') {
                      return (
                        <ul key={idx} className="space-y-1 text-sm leading-relaxed text-body">
                          {block.items.map(item => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p key={idx} className="text-sm leading-relaxed text-body">
                        {block.text}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </PageShell>
    </div>
  )
}
