'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CONCEPTS, type Concept } from '@/lib/knowledge/concepts'

export default function KnowledgePage() {
  const [q, setQ] = useState('')
  const norm = q.trim().toLowerCase()
  const filtered = norm
    ? CONCEPTS.filter(
        c =>
          c.title.toLowerCase().includes(norm) ||
          c.content.toLowerCase().includes(norm),
      )
    : CONCEPTS

  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="TEBIQ 首页"><img src="/logo-icon.png" alt="" className="h-9 w-9 rounded-xl" /><img src="/logo-full.svg" alt="TEBIQ" className="h-9 w-auto" /></Link>
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

          <div className="relative mt-5 mb-5">
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
              className="w-full bg-card border border-line focus:border-primary rounded-xl pl-11 pr-4 py-3 text-title text-base placeholder:text-muted outline-none transition-colors shadow-sm"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="bg-card border border-line rounded-2xl p-8 text-center">
              <p className="text-body text-sm">
                没有找到包含「{q}」的概念。试试别的关键词。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(c => (
                <ConceptCard key={c.id} concept={c} />
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
              已收录 4 条：经营管理新规 / 技人国类别 3/4 / 派遣形态 / 归化新基准
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
    <p className="text-muted text-xs leading-relaxed mb-6">
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

function ConceptCard({ concept }: { concept: Concept }) {
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
          {concept.title}
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
            <p className="text-body text-sm leading-relaxed">{concept.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}
