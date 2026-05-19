'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, FileText, Search, Sparkles } from 'lucide-react'
import type { MaterialSearchCandidate, MaterialSearchResult } from '@/lib/materials/search'

const EXAMPLE_QUERIES = ['日配更新要什么', '税证明', '永住年金材料', '公司让我交健康诊断']

export function MaterialsSearchClient() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<MaterialSearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const trimmedQuery = query.trim()

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setResult(null)
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/materials/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: trimmedQuery, limit: 5 }),
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`search failed: ${res.status}`)
        setResult(await res.json())
      } catch {
        if (!controller.signal.aborted) {
          setError('暂时没搜出来。可以换个说法，比如“日配更新”或“税证明”。')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 220)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [trimmedQuery])

  const candidates = result?.candidates ?? []
  const hasQuery = trimmedQuery.length >= 2
  const helperText = useMemo(() => {
    if (!hasQuery) return '可以输入材料俗称、手续名称，TEBIQ 会匹配可能的材料或清单。'
    if (loading) return '正在匹配材料和清单…'
    if (candidates.length > 0) return `找到 ${candidates.length} 个可能结果。`
    return '没有稳定匹配结果。试试更具体地写手续或材料名。'
  }, [candidates.length, hasQuery, loading])

  return (
    <div className="space-y-3 rounded-[14px] border border-[var(--tebiq-soft-gray)] bg-white p-3">
      <div className="flex items-center gap-2 rounded-[12px] border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-warm-white)] px-3 py-2.5">
        <Search className="h-4 w-4 shrink-0 text-[var(--tebiq-cool-gray)]" strokeWidth={1.7} />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="搜材料或清单，比如：税证明 / 日配更新要什么"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-[var(--tebiq-ink-blue)] outline-none placeholder:text-[var(--tebiq-cool-gray)]"
          aria-label="搜索材料或手续清单"
        />
      </div>

      <p className="text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">{helperText}</p>

      {!hasQuery && (
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_QUERIES.map(example => (
            <button
              key={example}
              type="button"
              onClick={() => setQuery(example)}
              className="rounded-full border border-[var(--tebiq-soft-gray)] bg-white px-3 py-1.5 text-[12.5px] text-[var(--tebiq-deep-slate)]"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-[10px] bg-[var(--tebiq-soft-gray)] px-3 py-2 text-[12.5px] text-[var(--tebiq-deep-slate)]">
          {error}
        </p>
      )}

      {candidates.length > 0 && (
        <ul className="space-y-2">
          {candidates.map(candidate => (
            <SearchCandidateCard key={`${candidate.type}:${candidate.id}`} candidate={candidate} />
          ))}
        </ul>
      )}
    </div>
  )
}

function SearchCandidateCard({ candidate }: { candidate: MaterialSearchCandidate }) {
  const isProcedure = candidate.type === 'procedure'
  const Icon = isProcedure ? FileText : BookOpen
  const label = isProcedure ? '清单' : '材料'

  return (
    <li>
      <Link
        href={candidate.href}
        className="block rounded-[12px] border border-[var(--tebiq-soft-gray)] bg-white px-3 py-3 transition-colors hover:border-[var(--tebiq-cool-gray)]"
      >
        <div className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.7} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--tebiq-soft-gray)] px-2 py-0.5 text-[11.5px] text-[var(--tebiq-deep-slate)]">
                {label}
              </span>
              <span className="inline-flex items-center gap-1 text-[11.5px] text-[var(--tebiq-cool-gray)]">
                <Sparkles className="h-3 w-3" strokeWidth={1.7} />
                {candidate.reason}
              </span>
            </div>
            <p className="mt-1.5 text-[15px] font-medium leading-snug text-[var(--tebiq-ink-blue)]">
              {candidate.title}
            </p>
            <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
              {candidate.summary}
            </p>
            {candidate.materials.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {candidate.materials.slice(0, 4).map(material => (
                  <span
                    key={material.id}
                    className="rounded-full bg-[var(--tebiq-warm-white)] px-2 py-1 text-[11.5px] text-[var(--tebiq-deep-slate)]"
                  >
                    {material.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}

