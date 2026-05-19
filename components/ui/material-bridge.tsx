'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import type { MaterialSearchCandidate, MaterialSearchResult } from '@/lib/materials/search'

export function MaterialBridge({ query }: { query: string }) {
  const [candidates, setCandidates] = useState<MaterialSearchCandidate[]>([])

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setCandidates([])
      return
    }
    const controller = new AbortController()
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch('/api/materials/search', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ query: trimmed, limit: 3 }),
          signal: controller.signal,
        })
        if (!res.ok) return
        const json = await res.json() as MaterialSearchResult
        setCandidates(json.candidates.slice(0, 3))
      } catch {
        if (!controller.signal.aborted) setCandidates([])
      }
    }, 120)

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  if (candidates.length === 0) return null

  return (
    <details className="group rounded-[12px] border border-[var(--tebiq-soft-gray)] bg-white px-3 py-2.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] text-[var(--tebiq-deep-slate)] marker:hidden">
        <span className="inline-flex min-w-0 items-center gap-2">
          <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
          <span className="truncate">可能相关的材料和清单</span>
        </span>
        <span aria-hidden="true" className="shrink-0 text-[15px] text-[var(--tebiq-cool-gray)] transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-3 flex flex-wrap gap-2">
        {candidates.map(candidate => (
          <Link
            key={`${candidate.type}:${candidate.id}`}
            href={candidate.href}
            className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-2.5 text-[13px] font-medium leading-none text-[var(--tebiq-ink-blue)]"
          >
            <span className="min-w-0 truncate">{candidate.title}</span>
            <span className="shrink-0 rounded-full bg-[var(--tebiq-soft-gray)] px-1.5 py-0.5 text-[11px] font-normal text-[var(--tebiq-cool-gray)]">
              {candidate.type === 'procedure' ? '清单' : '材料'}
            </span>
          </Link>
        ))}
      </div>
    </details>
  )
}
