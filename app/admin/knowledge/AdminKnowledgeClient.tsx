'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdminNav from '@/app/admin/_components/AdminNav'
import { Field, PageShell, Section } from '@/app/admin/_components/ui'
import { parseMarkdownBlocks, plainTextFromMarkdown } from '@/lib/knowledge/markdown'
import { suggestArticleSlug } from '@/lib/knowledge/slug'

interface HistoryEntry {
  savedAt: string
  title: string
  bodyMarkdown: string
  category: string
  status: 'draft' | 'reviewing' | 'published'
}

const AUTOSAVE_MS = 30_000

type ArticleStatus = 'draft' | 'reviewing' | 'published'
type ArticleVisibility = 'public' | 'private'

interface AdminArticle {
  id: string
  title: string
  slug: string | null
  bodyMarkdown: string
  category: string
  status: ArticleStatus
  visibility: ArticleVisibility
  requiresShoshiReview: boolean
  lastReviewedAt: string | null
  lastReviewedBy: string | null
  /** 行政書士法要求的实名 + 登録番号（公开侧显示用） */
  lastReviewedByName: string | null
  lastReviewedByRegistration: string | null
  reviewNotes: string | null
  updatedAt: string
}

const EMPTY: Omit<AdminArticle, 'id' | 'updatedAt'> & { id?: string; updatedAt?: string } = {
  title: '',
  slug: '',
  bodyMarkdown: '## 小标题\n\n正文内容。\n\n- 要点一\n- 要点二',
  category: '签证相关',
  status: 'draft',
  visibility: 'private',
  requiresShoshiReview: true,
  lastReviewedAt: null,
  lastReviewedBy: '',
  lastReviewedByName: '',
  lastReviewedByRegistration: '',
  reviewNotes: '',
}

const STATUS_LABEL: Record<ArticleStatus, string> = {
  draft: '草稿',
  reviewing: '审核中',
  published: '已发布',
}

const VISIBILITY_LABEL: Record<ArticleVisibility, string> = {
  private: '私密',
  public: '公开',
}

export default function AdminKnowledgeClient({ adminKey }: { adminKey: string }) {
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  const [articles, setArticles] = useState<AdminArticle[]>([])
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [lastAutosavedAt, setLastAutosavedAt] = useState<Date | null>(null)
  const [history, setHistory] = useState<HistoryEntry[] | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState<'split' | 'preview'>('split')
  // 跟踪 form 自上次保存以来是否变了
  const lastSavedRef = useRef<string>('')

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

  // 切换文章 → 重置 dirty 跟踪 + 清空 history 缓存
  useEffect(() => {
    lastSavedRef.current = JSON.stringify(form)
    setHistory(null)
    setHistoryOpen(false)
    setLastAutosavedAt(null)
  // 故意只依赖 form.id，避免每次输入都 reset
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.id])

  const preview = useMemo(() => parseMarkdownBlocks(form.bodyMarkdown), [form.bodyMarkdown])

  const autosave = useCallback(async () => {
    // 没有 id → 是新建状态，不 autosave（避免每 30 秒新建 1 篇）
    if (!form.id) return
    if (!form.title.trim() || !form.bodyMarkdown.trim() || !form.category.trim()) return
    const snapshot = JSON.stringify(form)
    if (snapshot === lastSavedRef.current) return
    try {
      const res = await fetch(`/api/admin/knowledge${keyParam}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, autosave: true }),
      })
      if (!res.ok) return
      const data = await res.json()
      lastSavedRef.current = JSON.stringify(data.article)
      setLastAutosavedAt(new Date())
    } catch {
      /* 静默失败，下个 tick 再试 */
    }
  }, [form, keyParam])

  // 30 秒一次的 autosave
  useEffect(() => {
    const id = window.setInterval(() => {
      autosave().catch(() => {})
    }, AUTOSAVE_MS)
    return () => window.clearInterval(id)
  }, [autosave])

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
      lastSavedRef.current = JSON.stringify(data.article)
      setLastAutosavedAt(null) // 手动保存覆盖 autosave 时间显示
      await load()
    } catch {
      setMessage('网络异常')
    } finally {
      setSaving(false)
    }
  }

  async function openHistory() {
    if (!form.id) {
      setMessage('新建文章尚无历史版本')
      return
    }
    try {
      const res = await fetch(
        `/api/admin/knowledge/${form.id}/history${keyParam}`,
        { cache: 'no-store' },
      )
      const data = await res.json()
      setHistory(data?.history ?? [])
      setHistoryOpen(true)
    } catch {
      setMessage('历史记录加载失败')
    }
  }

  function restoreFromHistory(entry: HistoryEntry) {
    if (!window.confirm(`恢复到 ${new Date(entry.savedAt).toLocaleString('ja-JP')} 的版本？\n\n当前未保存的内容会丢失。`)) {
      return
    }
    setForm(f => ({
      ...f,
      title: entry.title,
      bodyMarkdown: entry.bodyMarkdown,
      category: entry.category,
      status: entry.status,
    }))
    setHistoryOpen(false)
    setMessage('已恢复历史版本（请点「保存」确认）')
  }

  function fillSlugSuggestion() {
    setForm(f => ({ ...f, slug: suggestArticleSlug(f.title) }))
  }

  function markReviewed() {
    const reviewerName = window.prompt('行政書士姓名（公开显示，必填）')
    if (!reviewerName?.trim()) return
    const reviewerRegistration = window.prompt(
      '行政書士登録番号（公开显示，例如 12345678，必填）',
    )
    if (!reviewerRegistration?.trim()) return
    const notes = window.prompt('审核意见（仅内部，可留空）') ?? ''
    setForm(f => ({
      ...f,
      requiresShoshiReview: false,
      lastReviewedAt: new Date().toISOString(),
      // 内部短标识保留向后兼容（用 name 填充）
      lastReviewedBy: reviewerName.trim(),
      lastReviewedByName: reviewerName.trim(),
      lastReviewedByRegistration: reviewerRegistration.trim(),
      reviewNotes: notes.trim(),
    }))
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
                        <span>{VISIBILITY_LABEL[article.visibility]}</span>
                        <span>{article.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Section>

          <Section title="编辑器">
            <div className={`grid gap-4 ${previewMode === 'split' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
              <div className={`space-y-3 rounded-2xl border border-line bg-card p-4 ${previewMode === 'preview' ? 'hidden' : ''}`}>
                <Field label="标题">
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </Field>
                <Field label="Slug">
                  <div className="flex gap-2">
                    <input
                      value={form.slug ?? ''}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      placeholder="lowercase-english-slug"
                      className="min-w-0 flex-1 rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      onClick={fillSlugSuggestion}
                      className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-title"
                    >
                      生成建议
                    </button>
                  </div>
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
                  <Field label="公开范围">
                    <select
                      value={form.visibility}
                      onChange={e =>
                        setForm(f => ({
                          ...f,
                          visibility: e.target.value as ArticleVisibility,
                        }))
                      }
                      className="w-full rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    >
                      {Object.entries(VISIBILITY_LABEL).map(([value, label]) => (
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
                <div className="rounded-xl border border-line bg-white p-3 text-xs text-body">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-bold text-title">审核记录</div>
                      <div className="mt-1 text-muted">
                        {form.lastReviewedAt ? (
                          <>
                            {form.lastReviewedByName ?? form.lastReviewedBy ?? '未填写'}
                            {form.lastReviewedByRegistration && (
                              <>（登録番号 {form.lastReviewedByRegistration}）</>
                            )}{' '}
                            · {new Date(form.lastReviewedAt).toLocaleString('ja-JP')}
                          </>
                        ) : (
                          '尚未标记审核'
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={markReviewed}
                      className="rounded-xl bg-highlight px-3 py-2 text-xs font-bold text-title"
                    >
                      标记已审核
                    </button>
                  </div>
                  {/* 直接编辑入口（不走 prompt）— 让创始人也能修正既有数据 */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Field label="行政書士姓名">
                      <input
                        value={form.lastReviewedByName ?? ''}
                        onChange={e =>
                          setForm(f => ({ ...f, lastReviewedByName: e.target.value }))
                        }
                        placeholder="山田 太郎"
                        className="w-full rounded-lg border border-line bg-white px-2 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </Field>
                    <Field label="登録番号">
                      <input
                        value={form.lastReviewedByRegistration ?? ''}
                        onChange={e =>
                          setForm(f => ({
                            ...f,
                            lastReviewedByRegistration: e.target.value,
                          }))
                        }
                        placeholder="12345678"
                        className="w-full rounded-lg border border-line bg-white px-2 py-1.5 text-xs outline-none focus:border-primary"
                      />
                    </Field>
                  </div>
                  {form.reviewNotes && (
                    <p className="mt-2 rounded-lg bg-bg px-2 py-1.5 text-muted">
                      {form.reviewNotes}
                    </p>
                  )}
                  {!form.requiresShoshiReview && (!form.lastReviewedByName || !form.lastReviewedByRegistration) && (
                    <p className="mt-2 rounded-lg bg-[#FDECEA] px-2 py-1.5 text-[#92400E]">
                      ⚠ 行政書士法要求：发布前必须填写审核人姓名和登録番号。
                    </p>
                  )}
                </div>
                <Field label="正文 Markdown">
                  <textarea
                    value={form.bodyMarkdown}
                    onChange={e => setForm(f => ({ ...f, bodyMarkdown: e.target.value }))}
                    rows={18}
                    className="w-full rounded-xl border border-line bg-white px-3 py-2 font-mono text-xs leading-relaxed outline-none focus:border-primary"
                  />
                </Field>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={save}
                    disabled={saving}
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-slate-900 disabled:opacity-50"
                  >
                    {saving ? '保存中…' : '保存'}
                  </button>
                  <button
                    type="button"
                    onClick={openHistory}
                    disabled={!form.id}
                    className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-title disabled:opacity-50"
                  >
                    历史版本
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode(m => (m === 'split' ? 'preview' : 'split'))}
                    className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-bold text-title"
                  >
                    {previewMode === 'split' ? '全屏预览' : '回到编辑'}
                  </button>
                  {lastAutosavedAt && (
                    <span className="text-[10px] text-muted">
                      已自动保存于 {lastAutosavedAt.toLocaleTimeString('ja-JP')}
                    </span>
                  )}
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

      {historyOpen && history && (
        <HistoryModal
          history={history}
          onClose={() => setHistoryOpen(false)}
          onRestore={restoreFromHistory}
        />
      )}
    </div>
  )
}

function HistoryModal({
  history,
  onClose,
  onRestore,
}: {
  history: HistoryEntry[]
  onClose: () => void
  onRestore: (entry: HistoryEntry) => void
}) {
  // 倒序展示：最新在最上面（数据库中最新在数组末尾）
  const reversed = [...history].reverse()
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-xl max-h-[80vh] overflow-y-auto rounded-2xl bg-card p-5 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-base font-bold text-title">历史版本</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-muted hover:text-title"
            aria-label="关闭"
          >
            ×
          </button>
        </div>
        {reversed.length === 0 ? (
          <p className="mt-4 text-sm text-muted">还没有历史版本（手动保存才会记录）。</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {reversed.map((entry, i) => (
              <li
                key={`${entry.savedAt}-${i}`}
                className="rounded-xl border border-line bg-white p-3"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-title">
                      {entry.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">
                      {new Date(entry.savedAt).toLocaleString('ja-JP')} · {entry.category} · {entry.status}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRestore(entry)}
                    className="flex-shrink-0 rounded-lg bg-highlight px-3 py-1.5 text-xs font-bold text-title"
                  >
                    恢复
                  </button>
                </div>
                <p className="mt-2 line-clamp-2 text-[11px] text-body">
                  {plainTextFromMarkdown(entry.bodyMarkdown).slice(0, 160)}
                </p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[10px] text-muted">
          每次手动保存会记录一个版本，最多保留 10 条。autosave 不计入。
        </p>
      </div>
    </div>
  )
}
