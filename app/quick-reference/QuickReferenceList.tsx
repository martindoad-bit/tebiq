'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  BookOpenText,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileCheck2,
  Landmark,
  MessageSquarePlus,
  Search,
} from 'lucide-react'
import { StatusBadge } from '@/components/ui/tebiq'
import type {
  MaterialStatus,
  QuickReferenceReadiness,
  QuickReferenceMaterial,
  QuickReferenceSection,
  QuickReferenceSource,
  QuickReferenceTopic,
} from '@/lib/quick-reference/topics'

const materialStatusLabel: Record<MaterialStatus, string> = {
  required: '常见必备',
  conditional: '按情况',
  confirm: '先确认',
}

const materialStatusTone: Record<MaterialStatus, 'checked' | 'attention'> = {
  required: 'checked',
  conditional: 'attention',
  confirm: 'attention',
}

const readinessLabel: Record<QuickReferenceReadiness, string> = {
  ready: '先核对',
  'needs-confirmation': '需再确认',
}

const readinessTone: Record<QuickReferenceReadiness, 'checked' | 'attention'> =
  {
    ready: 'checked',
    'needs-confirmation': 'attention',
  }

const topicPriority: Record<string, number> = {
  'keiei-kanri-koushin-materials': 0,
  'gijinkoku-koushin-materials': 1,
  'kazoku-taizai-koushin-materials': 2,
  'nihonjin-haigusha-koushin-materials': 3,
  'ryugaku-koushin-materials': 4,
  'eijuu-shinsei-materials': 5,
  'tax-certificate-material': 6,
}

const quickSearches = [
  '经管签',
  '技人国',
  '日配',
  '留学',
  '永住',
  '家族滞在',
  '税证明',
]

const searchAliases: ReadonlyArray<ReadonlyArray<string>> = [
  ['经营管理', '经管', '経営管理', '公司', '决算', '办公室', '3000万'],
  ['技人国', '人文签', '技术人文知识国际业务', '就劳签', '工作签证'],
  ['家族滞在', '家属签', '家族签', '扶养'],
  ['日配', '日本人配偶', '配偶者签', '配偶签', '婚姻'],
  ['留学', '学生签', '出席率', '成绩证明', '资格外'],
  ['永住', '永久', '身元保证人', '了解书'],
  ['税证明', '课税证明', '纳税证明', '納税証明', '住民税', '国税'],
  ['年金', '健康保险', '健保', '国保', 'マイナ保険証'],
  ['续签', '更新', '在留期间更新', '在留期間更新'],
]

export default function QuickReferenceList({
  topics,
}: {
  topics: QuickReferenceTopic[]
}) {
  const orderedTopics = useMemo(
    () =>
      [...topics].sort(
        (first, second) =>
          (topicPriority[first.id] ?? 99) - (topicPriority[second.id] ?? 99),
      ),
    [topics],
  )
  const [query, setQuery] = useState('')
  const [openTopicId, setOpenTopicId] = useState<string | null>(
    orderedTopics[0]?.id ?? null,
  )

  const normalizedQuery = normalizeSearchText(query)
  const queryTerms = expandSearchTerms(normalizedQuery)
  const filteredTopics = useMemo(() => {
    return orderedTopics.filter((topic) => {
      if (!normalizedQuery) return true
      const normalizedHaystack = normalizeSearchText(checklistSearchText(topic))
      return queryTerms.some((term) => normalizedHaystack.includes(term))
    })
  }, [normalizedQuery, orderedTopics, queryTerms])

  const activeTopic =
    filteredTopics.find((topic) => topic.id === openTopicId) ??
    filteredTopics[0]
  const materialCount = activeTopic
    ? activeTopic.sections.reduce(
        (sum, section) => sum + section.materials.length,
        0,
      )
    : 0

  useEffect(() => {
    function openHashTopic() {
      const raw = window.location.hash.replace(/^#/, '')
      if (!raw) return
      const id = decodeURIComponent(raw)
      if (!orderedTopics.some((topic) => topic.id === id)) return
      setQuery('')
      setOpenTopicId(id)
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
    }

    openHashTopic()
    window.addEventListener('hashchange', openHashTopic)
    return () => window.removeEventListener('hashchange', openHashTopic)
  }, [orderedTopics])

  useEffect(() => {
    if (filteredTopics.length === 0) {
      setOpenTopicId(null)
      return
    }
    if (!filteredTopics.some((topic) => topic.id === openTopicId)) {
      setOpenTopicId(filteredTopics[0].id)
    }
  }, [filteredTopics, openTopicId])

  return (
    <section className="mt-2 space-y-4">
      <div className="space-y-3 px-0.5">
        <p className="text-[12.5px] font-medium leading-none text-ash">
          材料清单
        </p>
        <h2 className="text-[24px] font-semibold leading-tight text-ink">
          续签、申请材料，先按清单核对。
        </h2>
        <p className="max-w-[32em] text-[14.5px] leading-[1.7] text-slate">
          先从常见在留资格开始。每份清单把材料名、谁准备、去哪取和注意点分开。
        </p>
      </div>

      <div className="rounded-card border border-hairline bg-surface px-3 py-3">
        <label className="flex min-h-12 items-center gap-2 rounded-btn border border-hairline bg-paper px-3">
          <Search className="h-4 w-4 shrink-0 text-ash" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索手续、材料或关键词"
            className="min-w-0 flex-1 bg-transparent text-[16px] leading-none text-ink outline-none placeholder:text-haze"
          />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickSearches.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setQuery(label)}
              className="min-h-9 shrink-0 whitespace-nowrap rounded-btn bg-paper px-3 text-[13px] font-medium text-slate"
            >
              {label}
            </button>
          ))}
        </div>

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-2 text-[13px] font-medium text-ash"
          >
            清除搜索
          </button>
        )}
      </div>

      {activeTopic ? (
        <div className="grid grid-cols-3 gap-2">
          <Metric label="清单" value={String(filteredTopics.length)} />
          <Metric label="材料" value={String(materialCount)} />
          <Metric label="来源" value={String(activeTopic.sources.length)} />
        </div>
      ) : null}

      <div className="space-y-3">
        {filteredTopics.map((topic) => (
          <ChecklistCard
            key={topic.id}
            topic={topic}
            open={openTopicId === topic.id}
            onOpenChange={(isOpen) => {
              setOpenTopicId((current) => {
                if (isOpen) return topic.id
                return current === topic.id ? null : current
              })
            }}
          />
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="rounded-card border border-hairline bg-surface px-4 py-6 text-[15px] leading-[1.75] text-ash">
          还没有对应清单。可以换成人文签、经管签、永住、税证明搜索，或直接提问。
          <Link
            href="/ai-consultation"
            className="mt-3 inline-flex min-h-10 items-center rounded-btn border border-hairline bg-paper px-3 text-[14px] font-medium text-ink"
          >
            去提问
          </Link>
        </div>
      )}
    </section>
  )
}

function ChecklistCard({
  topic,
  open,
  onOpenChange,
}: {
  topic: QuickReferenceTopic
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const materialCount = topic.sections.reduce(
    (sum, section) => sum + section.materials.length,
    0,
  )
  const sourceMap = new Map(topic.sources.map((source) => [source.id, source]))
  const askPrompt = [
    topic.askPrompt ?? `${topic.title}，我想确认材料怎么准备。`,
    '请先解释材料准备，不要只凭清单判断我是否符合申请、是否会许可；如果涉及资格、材料替代、经营管理、永住或技人国的个案问题，请先问我关键情况。',
  ].join('\n\n')
  const askHref = `/ai-consultation?q=${encodeURIComponent(askPrompt)}`

  return (
    <details
      id={topic.id}
      open={open}
      onToggle={(event) => onOpenChange(event.currentTarget.open)}
      className="group min-w-0 max-w-full overflow-hidden rounded-card border border-hairline bg-surface px-4 py-4"
    >
      <summary className="cursor-pointer list-none focus:outline-none focus-visible:rounded-[10px] focus-visible:shadow-focus">
        <div className="flex min-w-0 items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge>{topic.category}</StatusBadge>
              <StatusBadge tone={readinessTone[topic.readiness]}>
                {readinessLabel[topic.readiness]}
              </StatusBadge>
              <StatusBadge tone="checked">{materialCount} 项材料</StatusBadge>
            </div>
            <h2 className="mt-2.5 break-words text-[19px] font-semibold leading-snug text-ink">
              {topic.title}
            </h2>
            <p className="mt-1 text-[15px] leading-[1.7] text-ash">
              {topic.summary}
            </p>
            <div className="mt-3 grid gap-2 text-[13.5px] leading-[1.55] text-slate">
              <MetaLine
                icon={<Clock3 size={15} strokeWidth={1.5} />}
                text={topic.stage}
              />
              {topic.whereToGo && (
                <MetaLine
                  icon={<Landmark size={15} strokeWidth={1.5} />}
                  text={topic.whereToGo}
                />
              )}
            </div>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline bg-paper text-ash transition-transform group-open:rotate-180">
            <ChevronDown size={18} strokeWidth={1.6} />
          </span>
        </div>
      </summary>

      <div className="mt-4 space-y-5 border-t border-hairline pt-4">
        <div className="grid gap-2 text-[13.5px] leading-[1.65] text-slate">
          {topic.applicationWindow && (
            <CompactRow label="准备时点" value={topic.applicationWindow} />
          )}
          {topic.processingTime && (
            <CompactRow label="处理期间" value={topic.processingTime} />
          )}
          {topic.fee && <CompactRow label="费用" value={topic.fee} />}
        </div>

        {topic.readiness === 'needs-confirmation' && (
          <div className="flex gap-2 rounded-[10px] border border-hairline bg-paper px-3 py-2.5">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-warning"
              strokeWidth={1.6}
            />
            <p className="text-[13.5px] leading-[1.65] text-slate">
              这类手续容易涉及个案判断。清单先帮你整理材料，不判断是否符合申请或能否许可。
            </p>
          </div>
        )}

        <div className="space-y-5">
          {topic.sections.map((section) => (
            <MaterialSection
              key={`${topic.id}-${section.title}`}
              section={section}
              sourceMap={sourceMap}
            />
          ))}
        </div>

        <div className="space-y-2">
          {topic.facts.map((fact) => (
            <div
              key={`${topic.id}-${fact.label}`}
              className="flex gap-2 rounded-[10px] bg-paper px-3 py-2.5"
            >
              {fact.verification === 'source-backed' ? (
                <FileCheck2
                  className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                  strokeWidth={1.6}
                />
              ) : (
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                  strokeWidth={1.6}
                />
              )}
              <p className="min-w-0 text-[13.5px] leading-[1.6] text-slate">
                <span className="font-medium text-ink">{fact.label}：</span>
                {fact.text}
              </p>
            </div>
          ))}
        </div>

        {topic.notCovered?.length ? (
          <div className="border-t border-hairline pt-4">
            <p className="text-[13px] font-medium text-ash">这份清单不判断</p>
            <ul className="mt-2 space-y-1.5 text-[13.5px] leading-[1.65] text-slate">
              {topic.notCovered.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-ash" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="border-t border-hairline pt-4">
          <p className="text-[13px] font-medium text-ash">拿不准时</p>
          <p className="mt-2 text-[14px] leading-[1.7] text-slate">
            {topic.checkNote}
          </p>
          <Link
            href={askHref}
            className="focus-ring mt-3 inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-paper px-3 text-[14px] font-medium text-ink"
          >
            <MessageSquarePlus size={16} strokeWidth={1.6} />
            带着清单提问
          </Link>
        </div>

        <details className="border-t border-hairline pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus:outline-none focus-visible:rounded-[8px] focus-visible:shadow-focus">
            <span className="flex items-center gap-2 text-[14px] font-medium text-ink">
              <BookOpenText size={16} strokeWidth={1.5} />
              来源
            </span>
            <span className="text-[13px] text-ash">展开</span>
          </summary>
          <div className="mt-3 divide-y divide-hairline border-y border-hairline">
            {topic.sources.map((source) => (
              <SourceLink key={source.url} source={source} />
            ))}
          </div>
        </details>
      </div>
    </details>
  )
}

function MaterialSection({
  section,
  sourceMap,
}: {
  section: QuickReferenceSection
  sourceMap: Map<string | undefined, QuickReferenceSource>
}) {
  return (
    <section className="border-t border-hairline pt-4">
      <div className="mb-1.5">
        <h3 className="text-[15px] font-medium leading-snug text-ink">
          {section.title}
        </h3>
        {section.summary && (
          <p className="mt-1 text-[13px] leading-[1.6] text-ash">
            {section.summary}
          </p>
        )}
      </div>
      <div className="divide-y divide-hairline">
        {section.materials.map((material) => (
          <MaterialRow
            key={material.id}
            material={material}
            sources={(material.sourceIds ?? [])
              .map((id) => sourceMap.get(id))
              .filter((source): source is QuickReferenceSource =>
                Boolean(source),
              )}
          />
        ))}
      </div>
    </section>
  )
}

function MaterialRow({
  material,
  sources,
}: {
  material: QuickReferenceMaterial
  sources: QuickReferenceSource[]
}) {
  return (
    <div className="py-3.5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="break-words text-[15px] font-medium leading-snug text-ink">
            {material.name}
          </h4>
          {material.nameJa && (
            <p className="mt-0.5 break-words text-[12.5px] leading-snug text-ash">
              {material.nameJa}
            </p>
          )}
        </div>
        <StatusBadge tone={materialStatusTone[material.status]}>
          {materialStatusLabel[material.status]}
        </StatusBadge>
      </div>
      <dl className="mt-2 grid gap-1.5 text-[13.5px] leading-[1.6] text-slate">
        <Description label="谁准备" value={material.owner} />
        <Description label="去哪取" value={material.getFrom} />
        <Description label="注意" value={material.note} />
      </dl>
      {sources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {sources.map((source) => (
            <StatusBadge
              key={source.url}
              tone={source.relation === 'direct' ? 'checked' : 'neutral'}
            >
              {source.relation === 'direct' ? '直接依据' : '相关来源'}
            </StatusBadge>
          ))}
        </div>
      )}
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
      className="focus-ring block py-3 text-ink active:bg-paper"
    >
      <div className="flex min-w-0 items-start gap-2">
        <BookOpenText
          className="mt-0.5 h-4 w-4 shrink-0 text-ash"
          strokeWidth={1.5}
        />
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            <span className="min-w-0 flex-1 break-words text-[13.5px] font-medium leading-snug">
              {source.label}
            </span>
            <ExternalLink
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ash"
              strokeWidth={1.6}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <StatusBadge tone={relation === 'direct' ? 'checked' : 'neutral'}>
              {relation === 'direct' ? '直接依据' : '相关来源'}
            </StatusBadge>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ash">
            {source.organization ?? organizationFor(source.url)}
            {source.locator ? ` · ${source.locator}` : ''}
          </p>
        </div>
      </div>
    </a>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] border border-hairline bg-surface px-3 py-2.5">
      <p className="text-[11.5px] leading-none text-ash">{label}</p>
      <p className="numeric mt-1.5 text-[21px] font-light leading-none text-ink">
        {value}
      </p>
    </div>
  )
}

function MetaLine({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <p className="flex min-w-0 items-start gap-1.5">
      <span className="mt-0.5 shrink-0 text-ash">{icon}</span>
      <span className="min-w-0 break-words">{text}</span>
    </p>
  )
}

function CompactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 border-b border-hairline py-2 last:border-b-0">
      <span className="w-[72px] shrink-0 text-ash">{label}</span>
      <span className="min-w-0 flex-1 text-slate">{value}</span>
    </div>
  )
}

function Description({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[54px_minmax(0,1fr)] gap-2">
      <dt className="text-ash">{label}</dt>
      <dd className="min-w-0 break-words">{value}</dd>
    </div>
  )
}

function organizationFor(url: string): string {
  let host = ''
  try {
    host = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return '来源页面'
  }
  if (/moj\.go\.jp$/i.test(host) || /isa\.go\.jp$/i.test(host))
    return '出入国在留管理庁'
  if (/mhlw\.go\.jp$/i.test(host)) return '厚生労働省'
  if (/nenkin\.go\.jp$/i.test(host)) return '日本年金機構'
  if (/soumu\.go\.jp$/i.test(host)) return '総務省'
  if (/nta\.go\.jp$/i.test(host)) return '国税庁'
  if (/\.lg\.jp$/i.test(host)) return '自治体官网'
  if (/\.go\.jp$/i.test(host)) return '日本政府官网'
  return host
}

function checklistSearchText(topic: QuickReferenceTopic) {
  return [
    topic.title,
    topic.shortTitle,
    topic.summary,
    topic.category,
    topic.visaType,
    topic.stage,
    topic.applicationWindow ?? '',
    topic.processingTime ?? '',
    topic.whereToGo ?? '',
    topic.checkNote,
    ...(topic.aliases ?? []),
    ...(topic.notCovered ?? []),
    ...topic.facts.flatMap((fact) => [fact.label, fact.text]),
    ...topic.sections.flatMap((section) => [
      section.title,
      section.summary ?? '',
      ...section.materials.flatMap((material) => [
        material.name,
        material.nameJa ?? '',
        material.owner,
        material.getFrom,
        material.note,
      ]),
    ]),
    ...topic.sources.flatMap((source) => [
      source.label,
      source.organization ?? '',
      source.locator ?? '',
    ]),
  ].join(' ')
}

function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function expandSearchTerms(normalizedQuery: string): string[] {
  if (!normalizedQuery) return []
  const terms = new Set<string>([normalizedQuery])
  for (const group of searchAliases) {
    const normalizedGroup = group.map(normalizeSearchText)
    if (
      normalizedGroup.some(
        (item) =>
          normalizedQuery.includes(item) || item.includes(normalizedQuery),
      )
    ) {
      normalizedGroup.forEach((item) => terms.add(item))
    }
  }
  return Array.from(terms)
}
