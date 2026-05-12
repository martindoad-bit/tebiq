'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { BookOpenText, ChevronDown, ExternalLink, MessageSquarePlus, Search } from 'lucide-react'
import { StatusBadge } from '@/components/ui/tebiq'
import type {
  QuickReferenceFact,
  QuickReferenceSource,
  QuickReferenceTopic,
  QuickReferenceVerification,
} from '@/lib/quick-reference/topics'

const verificationLabel: Record<QuickReferenceVerification, string> = {
  'source-backed': '可核对',
  'needs-check': '需确认',
}

const quickSearches = [
  { label: '换工作', query: '换工作 转职 所属机关 就劳资格证明' },
  { label: '搬家', query: '搬家 住所 地址 在留卡' },
  { label: '离职', query: '离职 退职 失业 健保 年金' },
  { label: '年金税金', query: '年金 住民税 课税 纳税 健保' },
  { label: '永住', query: '永住 在留卡 税金 更新' },
]

const searchAliases: ReadonlyArray<ReadonlyArray<string>> = [
  ['换工作', '转职', '転職', '换公司', '所属机构', '所属機関'],
  ['离职', '退职', '退職', '失业', '失職', '辞职'],
  ['保险', '健保', '健康保险', '健康保険', '国保', '社保'],
  ['年金', '厚生年金', '国民年金', '脱退一时金', '脱退一時金'],
  ['税', '税金', '住民税', '课税', '納税', '纳税'],
  ['搬家', '地址', '住所', '住居地', '迁居'],
  ['永住', '永久', 'eijuu'],
  ['配偶', '老婆', '老公', '日配', '日本人配偶者'],
  ['留学', '学生', '打工', '兼职', '资格外', '資格外'],
  ['出国', '离境', '回国', '再入国', 'みなし再入国'],
  ['不许可', '拒签', '不許可', '补材料', '追加資料'],
]

export default function QuickReferenceList({
  topics,
}: {
  topics: QuickReferenceTopic[]
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const [openTopicId, setOpenTopicId] = useState<string | null>(null)

  const categories = useMemo(() => ['全部', ...Array.from(new Set(topics.map(topic => topic.category)))], [topics])
  const normalizedQuery = normalizeSearchText(query)
  const queryTerms = expandSearchTerms(normalizedQuery)
  const filteredTopics = topics.filter(topic => {
    const inCategory = category === '全部' || topic.category === category
    if (!inCategory) return false
    if (!normalizedQuery) return true
    const haystack = [
      topic.title,
      topic.summary,
      topic.category,
      topic.checkNote,
      ...(topic.aliases ?? []),
      topic.deadline ?? '',
      topic.whereToGo ?? '',
      ...(topic.prepare ?? []),
      ...topic.facts.flatMap(fact => [fact.label, fact.text]),
      ...topic.sources.flatMap(source => [source.label, source.organization ?? '', source.locator ?? '']),
    ].join(' ')
    const normalizedHaystack = normalizeSearchText(haystack)
    return queryTerms.some(term => normalizedHaystack.includes(term))
  })

  useEffect(() => {
    function openHashTopic() {
      const raw = window.location.hash.replace(/^#/, '')
      if (!raw) return
      const id = decodeURIComponent(raw)
      if (!topics.some(topic => topic.id === id)) return
      setQuery('')
      setCategory('全部')
      setOpenTopicId(id)
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
    }

    openHashTopic()
    window.addEventListener('hashchange', openHashTopic)
    return () => window.removeEventListener('hashchange', openHashTopic)
  }, [topics])

  return (
    <section className="mt-3 space-y-3">
      <div className="rounded-card border border-hairline bg-surface px-3 py-3">
        <label className="flex min-h-12 items-center gap-2 rounded-btn border border-hairline bg-paper px-3">
          <Search className="h-4 w-4 shrink-0 text-ash" strokeWidth={1.5} />
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="搜：换工作、搬家、税金"
            className="min-w-0 flex-1 bg-transparent text-[16px] leading-none text-ink outline-none placeholder:text-haze"
          />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickSearches.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setQuery(item.query)
                setCategory('全部')
              }}
              className="min-h-9 shrink-0 whitespace-nowrap rounded-btn bg-paper px-3 text-[13px] font-medium text-slate"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-10 shrink-0 whitespace-nowrap rounded-btn border px-3.5 text-[14px] font-medium ${
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

      <div className="space-y-3">
        {filteredTopics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            open={openTopicId === topic.id}
            onOpenChange={isOpen => {
              setOpenTopicId(current => {
                if (isOpen) return topic.id
                return current === topic.id ? null : current
              })
            }}
          />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="rounded-card border border-hairline bg-surface px-4 py-5 text-[15px] leading-[1.75] text-ash">
          没找到对应事项。可以换个说法，例如“换工作”“住民税”“在留卡”；如果是具体情况，直接去提问更合适。
        </div>
      )}
    </section>
  )
}

function TopicCard({
  topic,
  open,
  onOpenChange,
}: {
  topic: QuickReferenceTopic
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const askHref = `/ai-consultation?q=${encodeURIComponent(topic.askPrompt ?? `${topic.title}，我想确认自己该怎么处理。`)}`
  const needsCheck = topic.facts.some(fact => fact.verification === 'needs-check')

  return (
    <details
      id={topic.id}
      open={open}
      onToggle={event => onOpenChange(event.currentTarget.open)}
      className="group min-w-0 max-w-full overflow-hidden rounded-card border border-hairline bg-surface px-4 py-4"
    >
      <summary className="cursor-pointer list-none focus:outline-none focus-visible:rounded-[10px] focus-visible:shadow-focus">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge>{topic.category}</StatusBadge>
              <StatusBadge tone="checked">来源 {topic.sources.length}</StatusBadge>
              {needsCheck && <StatusBadge tone="attention">需确认</StatusBadge>}
            </div>
            <h2 className="mt-2.5 break-words text-[19px] font-semibold leading-snug text-ink">
              {topic.title}
            </h2>
            <p className="mt-1 text-[15px] leading-[1.7] text-ash">
              {topic.summary}
            </p>
            {topic.deadline && (
              <p className="mt-2 text-[14.5px] leading-[1.65] text-slate">
                <span className="font-medium text-ink">期限：</span>{topic.deadline}
              </p>
            )}
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper text-ash transition-transform group-open:rotate-180">
            <ChevronDown size={18} strokeWidth={1.6} />
          </span>
        </div>
      </summary>

      <div className="mt-4 space-y-4 border-t border-hairline pt-4">
        <SectionTitle>先核对</SectionTitle>
        <dl className="space-y-2.5">
          {topic.facts.map(fact => (
            <FactRow key={`${topic.id}-${fact.label}`} fact={fact} />
          ))}
        </dl>

        {(topic.whereToGo || topic.prepare?.length) && (
          <div className="grid gap-2.5">
            {topic.whereToGo && (
              <InfoBox title="去哪办">
                {topic.whereToGo}
              </InfoBox>
            )}
            {topic.prepare?.length ? (
              <InfoBox title="先准备">
                <ul className="space-y-1">
                  {topic.prepare.map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-ash" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoBox>
            ) : null}
          </div>
        )}

        <div className="rounded-[10px] border border-hairline bg-paper px-3.5 py-3">
          <p className="text-[14px] leading-[1.7] text-ash">
            <span className="font-medium text-ink">还要看你的情况：</span>
            {topic.checkNote}
          </p>
          <Link
            href={askHref}
            className="focus-ring mt-3 inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[14px] font-medium text-ink"
          >
            <MessageSquarePlus size={16} strokeWidth={1.6} />
            带着这件事提问
          </Link>
        </div>

        <details className="rounded-[10px] border border-hairline bg-surface px-3.5 py-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus:outline-none focus-visible:rounded-[8px] focus-visible:shadow-focus">
            <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
              <BookOpenText size={16} strokeWidth={1.5} />
              可核对来源
            </span>
            <span className="text-[13px] text-ash">展开</span>
          </summary>
          <div className="mt-3 grid gap-2">
            {topic.sources.map(source => (
              <SourceLink key={source.url} source={source} />
            ))}
          </div>
        </details>
      </div>
    </details>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-medium text-ash">
      {children}
    </p>
  )
}

function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[10px] border border-hairline px-3.5 py-3">
      <p className="text-[14px] font-medium text-ink">{title}</p>
      <div className="mt-1.5 text-[14.5px] leading-[1.7] text-slate">{children}</div>
    </div>
  )
}

function FactRow({ fact }: { fact: QuickReferenceFact }) {
  const isNeedsCheck = fact.verification === 'needs-check'

  return (
    <div className="rounded-[10px] border border-hairline px-3.5 py-3">
      <dt className="flex items-start justify-between gap-3">
        <span className="min-w-0 break-words text-[14.5px] font-medium leading-snug text-ink">{fact.label}</span>
        <StatusBadge tone={isNeedsCheck ? 'attention' : 'checked'}>
          {verificationLabel[fact.verification]}
        </StatusBadge>
      </dt>
      <dd className="mt-1.5 text-[14.5px] leading-[1.7] text-slate">{fact.text}</dd>
    </div>
  )
}

function SourceLink({ source }: { source: QuickReferenceSource }) {
  const relation = source.relation ?? 'direct'

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring block rounded-[10px] border border-hairline bg-paper px-3 py-3 text-ink active:bg-surface"
    >
      <div className="flex min-w-0 items-start gap-2">
        <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-ash" strokeWidth={1.5} />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            <StatusBadge tone={relation === 'direct' ? 'checked' : undefined}>
              {relation === 'direct' ? '直接依据' : '相关'}
            </StatusBadge>
            <span className="min-w-0 flex-1 break-words text-[13.5px] font-medium leading-snug">
              {source.label}
            </span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ash" strokeWidth={1.6} />
          </div>
          <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ash">
            {source.organization ?? organizationFor(source.url)}
            {' · '}
            {source.locator ? `原文位置：${source.locator}` : '可核对原文'}
          </p>
        </div>
      </div>
    </a>
  )
}

function organizationFor(url: string): string {
  let host = ''
  try {
    host = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return '来源页面'
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

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function expandSearchTerms(normalizedQuery: string): string[] {
  if (!normalizedQuery) return []
  const terms = new Set<string>([normalizedQuery])
  for (const group of searchAliases) {
    const normalizedGroup = group.map(normalizeSearchText)
    if (normalizedGroup.some(item => normalizedQuery.includes(item) || item.includes(normalizedQuery))) {
      normalizedGroup.forEach(item => terms.add(item))
    }
  }
  return Array.from(terms)
}
