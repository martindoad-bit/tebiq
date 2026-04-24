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
    <main className="min-h-screen bg-base text-title flex flex-col">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-primary text-lg">
            TEBIQ
          </Link>
          <Link
            href="/visa-select"
            className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-4 py-2 rounded-lg transition-all"
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
          <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
            关于在日签证续签的基础概念与常见问题
          </p>

          <input
            type="search"
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="搜索签证问题，例如：住民税、换工作、特例期间…"
            className="w-full bg-card border-2 border-line focus:border-primary rounded-xl px-4 py-3 text-title text-base placeholder:text-muted outline-none transition-colors mb-5"
          />

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

          <div className="mt-10 bg-highlight border border-line rounded-2xl p-5 text-center">
            <p className="text-body text-sm leading-relaxed mb-4">
              想知道你的具体情况有没有风险？
              <br />
              做一次免费自查，3 分钟就能看清。
            </p>
            <Link
              href="/visa-select"
              className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-xl text-base transition-all"
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
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 active:bg-slate-700/50 transition-colors text-left min-h-[60px]"
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
        <div className="px-5 pb-5 -mt-1">
          <p className="text-body text-sm leading-relaxed">{concept.content}</p>
        </div>
      )}
    </div>
  )
}
