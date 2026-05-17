import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, MessageSquarePlus, BookOpen } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import {
  BrandHeader,
  ConsultationShell,
  MetaPill,
  SectionLabel,
  Surface,
} from '@/components/ui/consultation-alpha'
import {
  getMaterialEntity,
  getRelatedMaterialEntities,
} from '@/lib/materials/material-entities'
import { getQuickReferenceTopic, getQuickReferenceTopicHref } from '@/lib/quick-reference/topics'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: { id: string }
}

export function generateMetadata({ params }: PageProps) {
  const entity = getMaterialEntity(params.id)
  if (!entity) return { title: 'TEBIQ — 材料' }
  return {
    title: `${entity.title} — TEBIQ 材料`,
    description: entity.whatItIs.slice(0, 120),
  }
}

export default function MaterialEntityPage({ params }: PageProps) {
  const id = params.id?.trim()
  if (!id) notFound()
  const entity = getMaterialEntity(id)
  if (!entity) notFound()

  const related = getRelatedMaterialEntities(entity)
  const reusedTopics = entity.reusedIn
    .map(tid => getQuickReferenceTopic(tid))
    .filter((t): t is NonNullable<ReturnType<typeof getQuickReferenceTopic>> => Boolean(t))

  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="材料"
          title={entity.title}
          description={entity.whatItIs}
          action={
            <Link
              href="/materials"
              className="inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[13px] text-[var(--tebiq-deep-slate)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              返回材料列表
            </Link>
          }
        />

        <Surface className="space-y-3">
          <SectionLabel>基本信息</SectionLabel>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] text-[var(--tebiq-cool-gray)]">谁开</dt>
              <dd className="text-[14px] text-[var(--tebiq-ink-blue)]">{entity.whoIssues}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-[var(--tebiq-cool-gray)]">在哪取</dt>
              <dd className="text-[14px] text-[var(--tebiq-ink-blue)]">{entity.whereToObtain}</dd>
            </div>
            {entity.fee && (
              <div>
                <dt className="text-[12px] text-[var(--tebiq-cool-gray)]">手数料</dt>
                <dd className="text-[14px] text-[var(--tebiq-ink-blue)]">{entity.fee}</dd>
              </div>
            )}
            {entity.validity && (
              <div>
                <dt className="text-[12px] text-[var(--tebiq-cool-gray)]">有效期 / 时间点</dt>
                <dd className="text-[14px] text-[var(--tebiq-ink-blue)]">{entity.validity}</dd>
              </div>
            )}
          </dl>
        </Surface>

        {entity.commonMistakes && entity.commonMistakes.length > 0 && (
          <Surface className="space-y-2">
            <SectionLabel>常见误区</SectionLabel>
            <ul className="space-y-1.5">
              {entity.commonMistakes.map((m, idx) => (
                <li key={idx} className="text-[13.5px] leading-[1.6] text-[var(--tebiq-ink-blue)]">
                  · {m}
                </li>
              ))}
            </ul>
          </Surface>
        )}

        {reusedTopics.length > 0 && (
          <Surface className="space-y-2">
            <SectionLabel>这份材料用在哪些手续</SectionLabel>
            <ul className="flex flex-wrap gap-2">
              {reusedTopics.map(topic => (
                <li key={topic.id}>
                  <Link
                    href={getQuickReferenceTopicHref(topic.id)}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] text-[var(--tebiq-ink-blue)]"
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Surface>
        )}

        {related.length > 0 && (
          <Surface className="space-y-2">
            <SectionLabel>相关材料</SectionLabel>
            <ul className="flex flex-wrap gap-2">
              {related.map(rel => (
                <li key={rel.id}>
                  <Link
                    href={`/materials/${encodeURIComponent(rel.id)}`}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] text-[var(--tebiq-ink-blue)]"
                  >
                    <BookOpen className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {rel.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Surface>
        )}

        {entity.sourceUrls && entity.sourceUrls.length > 0 && (
          <Surface className="space-y-2">
            <SectionLabel>官方来源</SectionLabel>
            <ul className="space-y-1.5">
              {entity.sourceUrls.map((src, idx) => (
                <li key={idx}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-8 items-center gap-1 text-[13px] font-medium text-[var(--tebiq-ink-blue)] underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {src.label || src.url}
                  </a>
                </li>
              ))}
            </ul>
          </Surface>
        )}

        <Surface className="space-y-2">
          <SectionLabel>不确定时</SectionLabel>
          <p className="text-[13.5px] leading-[1.6] text-[var(--tebiq-deep-slate)]">
            {entity.askTebiqBridge}
          </p>
          <Link
            href={`/ai-consultation?q=${encodeURIComponent(`关于「${entity.title}」我想问：`)}`}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[14px] font-medium text-[var(--tebiq-off-white)]"
          >
            <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
            带这份材料去提问
          </Link>
        </Surface>

        <Surface className="space-y-2">
          <SectionLabel>说明</SectionLabel>
          <p className="text-[12.5px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
            材料齐全不等于许可一定通过。具体个案、有效期细节，请向行政书士或对应窗口确认。
          </p>
          <div className="flex flex-wrap gap-2">
            {entity.aliases.length > 0 && (
              <MetaPill>别称：{entity.aliases.slice(0, 3).join(' / ')}</MetaPill>
            )}
          </div>
        </Surface>
      </div>
    </ConsultationShell>
  )
}
