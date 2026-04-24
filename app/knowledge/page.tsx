'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { CONCEPTS, type Concept } from '@/lib/knowledge/concepts'
import { policyUpdates } from '@/lib/knowledge/policy-updates'

const SUGGESTED_KEYWORDS = ['住民税', '社保', '换工作', '特例期间', '永住']

export default function KnowledgePage() {
  const [q, setQ] = useState('')
  const norm = q.trim().toLowerCase()

  const filtered = useMemo(
    () =>
      norm
        ? CONCEPTS.filter(
            c =>
              c.title.toLowerCase().includes(norm) ||
              c.content.toLowerCase().includes(norm),
          )
        : CONCEPTS,
    [norm],
  )

  const recentUpdates = useMemo(
    () => [...policyUpdates].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3),
    [],
  )

  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link
            href="/visa-select"
            className="bg-primary hover:bg-primary-hover text-title font-bold text-sm px-4 py-2 rounded-lg transition-all"
          >
            开始自查
          </Link>
        </div>
      </header>

      <div className="px-4 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] flex-1">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 leading-tight">
            续签<span className="text-primary">知识库</span>
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed mb-1">
            关于在日签证续签的基础概念与常见问题
          </p>
          <MonitorTopline />

          {/* 最近更新 */}
          <RecentUpdatesBlock updates={recentUpdates} />

          {/* 搜索 */}
          <div className="relative mt-6 mb-3">
            <span className="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="search"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="搜索签证问题，例如：住民税、换工作、特例期间…"
              className="w-full bg-card border border-line focus:border-primary rounded-xl pl-11 pr-10 py-3 text-base placeholder:text-muted outline-none transition-colors shadow-sm"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label="清空搜索"
                className="absolute inset-y-0 right-2 my-auto h-7 w-7 rounded-full text-muted hover:text-title hover:bg-highlight flex items-center justify-center text-base leading-none"
              >
                ×
              </button>
            )}
          </div>
          {q && (
            <p className="text-muted text-xs mb-4">
              {filtered.length > 0
                ? `找到 ${filtered.length} 条匹配`
                : '没有找到相关内容'}
            </p>
          )}

          {filtered.length === 0 ? (
            <NoResultHint setQ={setQ} />
          ) : (
            <div className="space-y-3">
              {filtered.map(c => (
                <ConceptCard key={c.id} concept={c} highlight={norm} />
              ))}
            </div>
          )}

          <Link
            href="/knowledge/updates"
            className="mt-8 block bg-card border border-brand-orange/40 hover:border-brand-orange rounded-2xl p-5 transition-all shadow-sm"
          >
            <div className="text-brand-orange text-xs font-bold mb-1">最新动态</div>
            <div className="text-title font-bold text-base leading-snug">
              查看 2025 年以后的重大政策变化 →
            </div>
            <div className="text-muted text-xs mt-1">
              已收录 {policyUpdates.length} 条
            </div>
          </Link>

          <div className="mt-6 bg-highlight border border-line rounded-2xl p-5 text-center">
            <p className="text-body text-sm leading-relaxed mb-4">
              想知道你的具体情况有没有风险？
              <br />
              做一次免费自查，3 分钟就能看清。
            </p>
            <Link
              href="/visa-select"
              className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-base transition-all"
            >
              开始免费自查 →
            </Link>
          </div>

          <MonitorFooter />

          <p className="text-center text-muted text-xs mt-6 leading-relaxed">
            知识库内容由系统初版整理，标注[待书士审核]的条目
            <br />
            等待持牌行政书士确认后更新
          </p>
        </div>
      </div>
    </main>
  )
}

function RecentUpdatesBlock({ updates }: { updates: typeof policyUpdates }) {
  if (updates.length === 0) return null
  return (
    <div className="bg-card border border-line border-l-4 border-l-primary rounded-2xl p-4 mt-2 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-primary text-xs font-bold tracking-wide">最近更新</h2>
        <Link
          href="/knowledge/updates"
          className="text-primary text-xs font-bold hover:text-primary-hover"
        >
          全部 →
        </Link>
      </div>
      <ul className="space-y-2">
        {updates.map(u => (
          <li key={u.date + u.title}>
            <Link
              href="/knowledge/updates"
              className="flex items-start gap-3 text-body hover:text-title transition-colors"
            >
              <span className="text-muted text-xs font-mono flex-shrink-0 mt-0.5">{u.date}</span>
              <span className="text-sm leading-snug">{u.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NoResultHint({ setQ }: { setQ: (v: string) => void }) {
  return (
    <div className="bg-card border border-line rounded-2xl p-6 text-center">
      <p className="text-body text-sm mb-3">
        没有找到相关内容，试试这些关键词：
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_KEYWORDS.map(k => (
          <button
            key={k}
            type="button"
            onClick={() => setQ(k)}
            className="bg-highlight text-primary text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary hover:text-title transition-colors"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  )
}

interface MonitorTarget {
  id: string
  name: string
  lastChecked: string | null
}

function MonitorTopline() {
  const [primary, setPrimary] = useState<MonitorTarget | null>(null)

  useEffect(() => {
    fetch('/api/monitor/status', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const targets: MonitorTarget[] = data?.targets ?? []
        setPrimary(targets.find(t => t.id === 'gijinkoku') ?? null)
      })
      .catch(() => {})
  }, [])

  const lastStr = primary?.lastChecked
    ? new Date(primary.lastChecked).toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <p className="text-muted text-xs leading-relaxed mb-2">
      政策信息每日自动核查 · 最后检查：{lastStr ?? '待首次核查'}
    </p>
  )
}

function MonitorFooter() {
  const [primary, setPrimary] = useState<MonitorTarget | null>(null)

  useEffect(() => {
    fetch('/api/monitor/status', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const targets: MonitorTarget[] = data?.targets ?? []
        setPrimary(targets.find(t => t.id === 'gijinkoku') ?? null)
      })
      .catch(() => {
        /* 静默 */
      })
  }, [])

  const lastStr = primary?.lastChecked
    ? new Date(primary.lastChecked).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  return (
    <div className="mt-10 text-center">
      <div className="text-muted text-xs leading-relaxed">
        {lastStr ? (
          <>
            最后核查入管局官网：
            <span className="text-body">{lastStr}</span>
          </>
        ) : (
          '入管局官网监控待首次核查'
        )}
      </div>
      <div className="text-muted text-xs mt-2 leading-relaxed">
        政策信息每日自动核查，如发现有误欢迎告知我们
      </div>
    </div>
  )
}

function ConceptCard({ concept, highlight }: { concept: Concept; highlight: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-card border border-line rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-highlight/40 active:bg-highlight transition-colors text-left min-h-[60px]"
        aria-expanded={open}
      >
        <h3 className="font-bold text-title text-base leading-snug pr-3 flex-1">
          <Highlighted text={concept.title} term={highlight} />
        </h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-muted flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="border-l-[3px] border-title bg-base/60 pl-4 pr-3 py-3 rounded-r">
            <p className="text-body text-sm leading-relaxed">
              <Highlighted text={concept.content} term={highlight} />
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function Highlighted({ text, term }: { text: string; term: string }) {
  if (!term) return <>{text}</>
  const lc = text.toLowerCase()
  const t = term.toLowerCase()
  const out: React.ReactNode[] = []
  let i = 0
  let key = 0
  while (i < text.length) {
    const idx = lc.indexOf(t, i)
    if (idx === -1) {
      out.push(text.slice(i))
      break
    }
    if (idx > i) out.push(text.slice(i, idx))
    out.push(
      <mark key={key++} className="bg-highlight text-title rounded px-0.5">
        {text.slice(idx, idx + term.length)}
      </mark>,
    )
    i = idx + term.length
  }
  return <>{out}</>
}
