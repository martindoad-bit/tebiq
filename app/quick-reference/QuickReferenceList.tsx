'use client'

import { useMemo, useState } from 'react'
import { BookOpenText, ExternalLink, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/tebiq'
import type {
  QuickReferenceFact,
  QuickReferenceSource,
  QuickReferenceTopic,
  QuickReferenceVerification,
} from '@/lib/quick-reference/topics'

const verificationLabel: Record<QuickReferenceVerification, string> = {
  'source-backed': '可核对',
  'needs-check': '需核对',
}

export default function QuickReferenceList({
  topics,
}: {
  topics: QuickReferenceTopic[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')

  const categories = useMemo(() => ['全部', ...Array.from(new Set(topics.map(topic => topic.category)))], [topics])
  const normalizedQuery = query.trim().toLowerCase()
  const filteredTopics = topics.filter(topic => {
    const inCategory = category === '全部' || topic.category === category
    if (!inCategory) return false
    if (!normalizedQuery) return true
    const haystack = [
      topic.title,
      topic.summary,
      topic.category,
      topic.checkNote,
      ...topic.facts.flatMap(fact => [fact.label, fact.text]),
    ].join(' ').toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  return (
    <section className="mt-3 space-y-3">
      <div className="rounded-card border border-hairline bg-surface px-3 py-3">
        <label className="flex min-h-11 items-center gap-2 rounded-btn border border-hairline bg-paper px-3">
          <Search className="h-4 w-4 shrink-0 text-ash" strokeWidth={1.5} />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="搜：转职、年金、搬家、永住"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-haze"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-9 shrink-0 whitespace-nowrap rounded-btn border px-3 text-[13px] font-medium ${
                category === item
                  ? 'border-ink bg-ink text-white'
                  : 'border-hairline bg-surface text-ink'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredTopics.map(topic => (
          <details
            key={topic.id}
            id={topic.id}
            className="group rounded-card border border-hairline bg-surface px-4 py-3.5"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge>{topic.category}</StatusBadge>
                    <StatusBadge tone="checked">资料 {topic.sources.length}</StatusBadge>
                    {topic.facts.some(fact => fact.verification === 'needs-check') && (
                      <StatusBadge tone="attention">需核对</StatusBadge>
                    )}
                  </div>
                  <h2 className="mt-2.5 text-[18px] font-medium leading-snug text-ink">
                    {topic.title}
                  </h2>
                  <p className="mt-1 text-[14.5px] leading-[1.65] text-ash">
                    {topic.summary}
                  </p>
                  {topic.facts[0] && (
                    <p className="mt-2 text-[13px] leading-[1.55] text-slate">
                      <span className="font-medium text-ink">{topic.facts[0].label}：</span>{topic.facts[0].text}
                    </p>
                  )}
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1 text-haze">
                  <BookOpenText
                    size={19}
                    strokeWidth={1.5}
                  />
                  <span className="rounded-full border border-hairline bg-paper px-2 py-0.5 text-[12px] text-ash group-open:hidden">展开</span>
                  <span className="hidden rounded-full border border-hairline bg-paper px-2 py-0.5 text-[12px] text-ash group-open:inline">收起</span>
                </div>
              </div>
            </summary>

            <div className="mt-4 border-t border-hairline pt-4">
              <div className="min-w-0">
                <dl className="space-y-2.5">
                  {topic.facts.map(fact => (
                    <FactRow key={`${topic.id}-${fact.label}`} fact={fact} />
                  ))}
                </dl>

                <div className="mt-4 rounded-[8px] border border-hairline bg-paper px-3 py-2.5">
                  <p className="text-[13px] leading-[1.6] text-ash">
                    <span className="font-medium text-ink">需要再核对：</span>
                    {topic.checkNote}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-[12px] font-medium text-ash">官方来源</p>
                  <div className="grid gap-2">
                  {topic.sources.map(source => (
                    <SourceLink key={source.url} source={source} />
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="rounded-card border border-hairline bg-surface px-4 py-5 text-[14px] leading-[1.65] text-ash">
          没有找到对应事项。可以换个关键词，或直接问 TEBIQ，它会按你的情况整理。
        </div>
      )}
    </section>
  )
}

function FactRow({ fact }: { fact: QuickReferenceFact }) {
  const isNeedsCheck = fact.verification === 'needs-check'

  return (
    <div className="rounded-[8px] border border-hairline px-3 py-3">
      <dt className="flex items-center justify-between gap-3">
        <span className="text-[14px] font-medium leading-snug text-ink">{fact.label}</span>
        <StatusBadge tone={isNeedsCheck ? 'attention' : 'checked'}>
          {verificationLabel[fact.verification]}
        </StatusBadge>
      </dt>
      <dd className="mt-1.5 text-[14px] leading-[1.65] text-slate">{fact.text}</dd>
    </div>
  )
}

function SourceLink({ source }: { source: QuickReferenceSource }) {
  const relation = source.relation ?? 'related'

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring group block rounded-[10px] border border-hairline bg-surface px-3 py-3 text-ink active:bg-paper"
    >
      <div className="flex min-w-0 items-start gap-2">
        <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-ash" strokeWidth={1.5} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge tone={relation === 'direct' ? 'checked' : undefined}>
              {relation === 'direct' ? '直接依据' : '相关资料'}
            </StatusBadge>
            <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug line-clamp-2">
              {source.label}
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-[1.55] text-ash">
            {source.organization ?? organizationFor(source.url)}
            {' · '}
            {source.locator ? `原文位置：${source.locator}` : '可核对原文'}
          </p>
          <span className="mt-2 inline-flex min-h-8 items-center rounded-btn border border-hairline bg-paper px-2.5 text-[12.5px] font-medium text-ink">
            查看原文
          </span>
        </div>
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ash transition-colors group-hover:text-ink" strokeWidth={1.6} />
      </div>
    </a>
  )
}

function organizationFor(url: string): string {
  let host = ''
  try {
    host = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return '官方资料'
  }
  if (/moj\.go\.jp$/i.test(host) || /isa\.go\.jp$/i.test(host)) return '出入国在留管理庁'
  if (/mhlw\.go\.jp$/i.test(host)) return '厚生労働省'
  if (/nenkin\.go\.jp$/i.test(host)) return '日本年金機構'
  if (/soumu\.go\.jp$/i.test(host)) return '総務省'
  if (/nta\.go\.jp$/i.test(host)) return '国税庁'
  if (/kyoukaikenpo\.or\.jp$/i.test(host)) return '全国健康保険協会'
  if (/mlit\.go\.jp$/i.test(host)) return '国土交通省'
  if (/fsa\.go\.jp$/i.test(host)) return '金融庁'
  if (/cfa\.go\.jp$/i.test(host)) return 'こども家庭庁'
  if (/mext\.go\.jp$/i.test(host)) return '文部科学省'
  if (/npa\.go\.jp$/i.test(host)) return '警察庁'
  if (/mofa\.go\.jp$/i.test(host)) return '外務省'
  if (/laws\.e-gov\.go\.jp$/i.test(host) || /elaws\.e-gov\.go\.jp$/i.test(host)) return 'e-Gov法令検索'
  if (/\.lg\.jp$/i.test(host)) return '自治体官网'
  if (/\.go\.jp$/i.test(host)) return '日本政府官网'
  return host
}
