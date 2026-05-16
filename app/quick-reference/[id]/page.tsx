import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import {
  ArrowLeft,
  BookOpenText,
  ChevronDown,
  ExternalLink,
  MessageSquarePlus,
} from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import { StatusBadge } from '@/components/ui/tebiq'
import {
  getQuickReferenceTopic,
  getQuickReferenceTopicHref,
  getRelatedQuickReferenceTopics,
  QUICK_REFERENCE_TOPICS,
  type QuickReferenceSource,
} from '@/lib/quick-reference/topics'

type PageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return QUICK_REFERENCE_TOPICS.map(topic => ({ id: topic.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const topic = getQuickReferenceTopic(id)
  if (!topic) return {}
  return {
    title: `${topic.title} - 材料 - TEBIQ`,
    description: topic.summary,
    alternates: { canonical: getQuickReferenceTopicHref(topic.id) },
  }
}

export default async function QuickReferenceTopicPage({ params }: PageProps) {
  const { id } = await params
  const topic = getQuickReferenceTopic(id)
  if (!topic) notFound()

  const askHref = `/ai-consultation?q=${encodeURIComponent(topic.askPrompt ?? `${topic.title}，我想确认自己该怎么处理。`)}`
  const relatedTopics = getRelatedQuickReferenceTopics(topic)

  return (
    <AppShell appBar={<AppBar title="材料" />} tabBar={<TabBar />}>
      <article className="space-y-4 pt-1">
        <Link
          href="/quick-reference"
          className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[14px] font-medium text-slate"
        >
          <ArrowLeft size={16} strokeWidth={1.6} />
          返回材料
        </Link>

        <header className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge>{topic.category}</StatusBadge>
            <StatusBadge tone="checked">资料 {topic.sources.length}</StatusBadge>
            {topic.facts.some(fact => fact.verification === 'needs-check') && (
              <StatusBadge tone="attention">看情况</StatusBadge>
            )}
          </div>
          <h1 className="mt-3 break-words text-[25px] font-semibold leading-tight text-ink">
            {topic.title}
          </h1>
          <p className="mt-2 text-[16px] leading-[1.75] text-ash">
            {topic.summary}
          </p>
          {topic.deadline && (
            <p className="mt-3 rounded-[10px] border border-hairline bg-paper px-3 py-2.5 text-[14.5px] leading-[1.65] text-slate">
              <span className="font-medium text-ink">期限：</span>{topic.deadline}
            </p>
          )}
        </header>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[16px] font-semibold text-ink">先核对</h2>
          <div className="mt-3 space-y-2.5">
            {topic.facts.map(fact => (
              <details
                key={`${topic.id}-${fact.label}`}
                className="group rounded-[10px] border border-hairline bg-paper px-3.5 py-3"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus:outline-none focus-visible:rounded-[8px] focus-visible:shadow-focus">
                  <span className="min-w-0 break-words text-[14.5px] font-medium text-ink">
                    {fact.label}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <StatusBadge tone={fact.verification === 'needs-check' ? 'attention' : 'checked'}>
                      {fact.verification === 'needs-check' ? '看情况' : '有依据'}
                    </StatusBadge>
                    <ChevronDown
                      className="h-4 w-4 text-ash transition-transform group-open:rotate-180"
                      strokeWidth={1.6}
                    />
                  </span>
                </summary>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-slate">
                  {fact.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {(topic.whereToGo || topic.prepare?.length) && (
          <section className="grid gap-3">
            {topic.whereToGo && (
              <InfoPanel title="去哪办">{topic.whereToGo}</InfoPanel>
            )}
            {topic.prepare?.length ? (
              <InfoPanel title="先准备">
                <ul className="space-y-1.5">
                  {topic.prepare.map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-ash" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InfoPanel>
            ) : null}
          </section>
        )}

        {relatedTopics.length > 0 && (
          <section className="rounded-card border border-hairline bg-surface px-4 py-4">
            <h2 className="text-[16px] font-semibold text-ink">相关清单</h2>
            <div className="mt-3 grid gap-2">
              {relatedTopics.map(item => (
                <Link
                  key={item.id}
                  href={getQuickReferenceTopicHref(item.id)}
                  className="focus-ring flex min-h-12 items-center justify-between gap-3 rounded-[10px] border border-hairline bg-paper px-3 text-[14px] font-medium text-ink"
                >
                  <span className="min-w-0 truncate">{item.title}</span>
                  <span aria-hidden="true" className="shrink-0 text-ash">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <p className="text-[14.5px] leading-[1.75] text-ash">
            <span className="font-medium text-ink">不确定时：</span>
            {topic.checkNote}
          </p>
          <Link
            href={askHref}
            className="focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-btn bg-ink px-4 text-[15px] font-semibold text-white"
          >
            <MessageSquarePlus size={17} strokeWidth={1.7} />
            问问我的情况
          </Link>
        </section>

        <details className="group rounded-card border border-hairline bg-surface px-4 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 focus:outline-none focus-visible:rounded-[10px] focus-visible:shadow-focus">
            <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <BookOpenText size={17} strokeWidth={1.6} />
              资料来源
            </span>
            <ChevronDown
              className="h-4 w-4 text-ash transition-transform group-open:rotate-180"
              strokeWidth={1.6}
            />
          </summary>
          <div className="mt-3 grid gap-2">
            {topic.sources.map(source => (
              <SourceLink key={source.url} source={source} />
            ))}
          </div>
        </details>
      </article>
    </AppShell>
  )
}

function InfoPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4">
      <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
      <div className="mt-2 text-[14.5px] leading-[1.75] text-slate">{children}</div>
    </section>
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
            <span className="min-w-0 flex-1 break-words text-[13.5px] font-medium leading-snug">
              {source.label}
            </span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ash" strokeWidth={1.6} />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <StatusBadge tone={relation === 'direct' ? 'checked' : undefined}>
              {relation === 'direct' ? '直接依据' : '相关资料'}
            </StatusBadge>
          </div>
          <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ash">
            {source.organization ?? organizationFor(source.url)}
            {' · '}
            {source.locator ? source.locator : '可查看原文'}
          </p>
        </div>
      </div>
    </a>
  )
}

function organizationFor(url: string) {
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
  if (/\.lg\.jp$/i.test(host)) return '自治体官网'
  if (/\.go\.jp$/i.test(host)) return '日本政府官网'
  return host
}
