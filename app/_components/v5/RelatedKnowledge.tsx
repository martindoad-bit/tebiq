'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpenCheck, ChevronRight } from 'lucide-react'

interface RelatedArticle {
  id: string
  slug: string | null
  title: string
  category: string
  summary: string
}

export default function RelatedKnowledge({
  tags,
  title = '相关知识',
}: {
  tags: string[]
  title?: string
}) {
  const normalizedTags = useMemo(
    () => Array.from(new Set(tags.map(t => t.trim()).filter(Boolean))).slice(0, 8),
    [tags],
  )
  const [items, setItems] = useState<RelatedArticle[]>([])

  useEffect(() => {
    if (normalizedTags.length === 0) return
    const controller = new AbortController()
    const query = normalizedTags.map(encodeURIComponent).join(',')
    fetch(`/api/knowledge/related?tags=${query}&limit=2`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data?.articles) setItems(data.articles)
      })
      .catch(() => {
        if (!controller.signal.aborted) setItems([])
      })
    return () => controller.abort()
  }, [normalizedTags])

  if (items.length === 0) return null

  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
      <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-ink">
        <BookOpenCheck size={14} strokeWidth={1.55} />
        {title}
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id}>
            <Link
              href={`/knowledge/${item.slug ?? item.id}`}
              className="group flex items-start gap-2.5 rounded-btn border border-hairline bg-canvas/40 px-3 py-2.5 transition-colors hover:border-ink"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[8px] border border-hairline bg-paper text-ink">
                <BookOpenCheck size={13} strokeWidth={1.55} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-medium leading-snug text-ink">
                  {item.title}
                </span>
                <span className="mt-1 line-clamp-2 block text-[10.5px] leading-[1.55] text-ash">
                  {item.summary}
                </span>
              </span>
              <ChevronRight
                size={14}
                strokeWidth={1.55}
                className="mt-2 flex-shrink-0 text-haze transition-colors group-hover:text-ink"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
