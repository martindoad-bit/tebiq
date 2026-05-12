import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpenText,
  ChevronDown,
  ExternalLink,
  Landmark,
  MessageSquarePlus,
} from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import { StatusBadge } from '@/components/ui/tebiq'
import {
  COMMON_MATERIALS,
  getCommonMaterial,
  type CommonMaterial,
} from '@/lib/quick-reference/materials'
import {
  QUICK_REFERENCE_TOPICS,
  getQuickReferenceTopic,
  type MaterialStatus,
  type QuickReferenceReadiness,
  type QuickReferenceMaterial,
  type QuickReferenceSource,
} from '@/lib/quick-reference/topics'

const materialStatusLabel: Record<MaterialStatus, string> = {
  required: '常见必备',
  conditional: '按情况',
  confirm: '先看条件',
}

const materialStatusTone: Record<MaterialStatus, 'checked' | 'attention'> = {
  required: 'checked',
  conditional: 'attention',
  confirm: 'attention',
}

const readinessLabel: Record<QuickReferenceReadiness, string> = {
  ready: '可先核对',
  'needs-confirmation': '有条件边界',
}

const readinessTone: Record<
  QuickReferenceReadiness,
  'checked' | 'attention'
> = {
  ready: 'checked',
  'needs-confirmation': 'attention',
}

const commonMaterialMap = new Map(
  COMMON_MATERIALS.map((material) => [material.id, material]),
)

function getTopicCommonMaterials(topic: NonNullable<ReturnType<typeof getQuickReferenceTopic>>) {
  const seen = new Set<string>()
  const materials: CommonMaterial[] = []

  for (const section of topic.sections) {
    for (const item of section.materials) {
      for (const id of item.relatedMaterialIds ?? []) {
        if (seen.has(id)) continue
        seen.add(id)
        const material = commonMaterialMap.get(id)
        if (material) materials.push(material)
      }
    }
  }

  return materials
}

export function generateStaticParams() {
  return QUICK_REFERENCE_TOPICS.map((topic) => ({ topicId: topic.id }))
}

export function generateMetadata({
  params,
}: {
  params: { topicId: string }
}): Metadata {
  const topic = getQuickReferenceTopic(params.topicId)
  if (!topic) return {}
  return {
    title: `${topic.title} - 材料清单 - TEBIQ`,
    description: topic.summary,
    alternates: { canonical: `/quick-reference/${topic.id}` },
  }
}

export default function QuickReferenceTopicPage({
  params,
}: {
  params: { topicId: string }
}) {
  const topic = getQuickReferenceTopic(params.topicId)
  if (!topic) notFound()

  const materialCount = topic.sections.reduce(
    (sum, section) => sum + section.materials.length,
    0,
  )
  const topicCommonMaterials = getTopicCommonMaterials(topic)
  const askPrompt = [
    topic.askPrompt ?? `${topic.title}，我想确认材料怎么准备。`,
    '我不确定只看材料能不能判断，也想请你先帮我确认还缺哪些关键信息。',
  ].join('\n\n')

  return (
    <AppShell
      appBar={<AppBar title="材料清单" back="/quick-reference" />}
      tabBar={<TabBar />}
    >
      <article className="space-y-4 pt-1">
        <Link
          href="/quick-reference"
          className="focus-ring inline-flex min-h-9 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[13px] font-medium text-slate"
        >
          <ArrowLeft size={15} strokeWidth={1.6} />
          返回全部清单
        </Link>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge>{topic.category}</StatusBadge>
            <StatusBadge tone={readinessTone[topic.readiness]}>
              {readinessLabel[topic.readiness]}
            </StatusBadge>
            <StatusBadge>{materialCount} 项材料</StatusBadge>
          </div>
          <h1 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
            {topic.title}
          </h1>
          <p className="mt-3 text-[15px] leading-[1.75] text-slate">
            {topic.summary}
          </p>
          <div className="mt-3 grid gap-2 text-[13.5px] leading-[1.6] text-slate">
            <p className="flex gap-2">
              <ChevronDown
                className="mt-0.5 h-4 w-4 shrink-0 rotate-[-90deg] text-ash"
                strokeWidth={1.5}
              />
              <span>{topic.stage}</span>
            </p>
            {topic.whereToGo && (
              <p className="flex gap-2">
                <Landmark
                  className="mt-0.5 h-4 w-4 shrink-0 text-ash"
                  strokeWidth={1.5}
                />
                <span>{topic.whereToGo}</span>
              </p>
            )}
          </div>
        </section>

        {topic.readiness === 'needs-confirmation' && (
          <section className="rounded-card border border-hairline bg-paper px-4 py-4">
            <p className="text-[14px] leading-[1.7] text-slate">
              这张清单可以先用来核对材料，但不判断资格是否符合、材料是否可替代、或许可可能性。
            </p>
          </section>
        )}

        {topicCommonMaterials.length > 0 && (
          <section className="rounded-card border border-hairline bg-surface px-4 py-4">
            <h2 className="text-[15px] font-medium leading-snug text-ink">
              本清单材料解释
            </h2>
            <p className="mt-1 text-[13px] leading-[1.6] text-ash">
              容易混淆的共通材料，可以先单独看。
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topicCommonMaterials.map((material) => (
                <Link
                  key={material.id}
                  href={`/quick-reference/materials/${material.id}`}
                  className="focus-ring inline-flex min-h-8 items-center rounded-btn border border-hairline bg-paper px-2.5 text-[12.5px] font-medium text-ink"
                >
                  看{material.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-3">
          {topic.sections.map((section) => {
            const sourceMap = new Map(
              topic.sources.map((source) => [source.id, source]),
            )
            return (
              <section
                key={section.title}
                className="rounded-card border border-hairline bg-surface px-4 py-4"
              >
                <h2 className="text-[16px] font-medium leading-snug text-ink">
                  {section.title}
                </h2>
                {section.summary && (
                  <p className="mt-1 text-[13px] leading-[1.6] text-ash">
                    {section.summary}
                  </p>
                )}
                <div className="mt-3 divide-y divide-hairline">
                  {section.materials.map((material) => (
                    <MaterialDetails
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
          })}
        </section>

        {topic.notCovered?.length ? (
          <section className="rounded-card border border-hairline bg-surface px-4 py-4">
            <h2 className="text-[15px] font-medium leading-snug text-ink">
              这份清单不判断
            </h2>
            <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.7] text-slate">
              {topic.notCovered.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-ash" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <p className="text-[13px] font-medium text-ash">拿不准时</p>
          <p className="mt-2 text-[14px] leading-[1.7] text-slate">
            {topic.checkNote}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/ai-consultation?q=${encodeURIComponent(askPrompt)}`}
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-paper px-3 text-[14px] font-medium text-ink"
            >
              <MessageSquarePlus size={16} strokeWidth={1.6} />
              带着清单提问
            </Link>
            <Link
              href="/ai-consultation"
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[14px] font-medium text-slate"
            >
              问新问题
            </Link>
          </div>
        </section>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="flex items-center gap-2 text-[15px] font-medium leading-snug text-ink">
            <BookOpenText size={16} strokeWidth={1.6} />
            来源
          </h2>
          <div className="mt-3 divide-y divide-hairline border-y border-hairline">
            {topic.sources.map((source) => (
              <SourceItem key={source.url} source={source} />
            ))}
          </div>
        </section>
      </article>
    </AppShell>
  )
}

function MaterialDetails({
  material,
  sources,
}: {
  material: QuickReferenceMaterial
  sources: QuickReferenceSource[]
}) {
  const relatedMaterials = (material.relatedMaterialIds ?? [])
    .map((id) => commonMaterialMap.get(id) ?? getCommonMaterial(id))
    .filter((item): item is CommonMaterial => Boolean(item))

  return (
    <details className="group py-3.5">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-3 focus:outline-none focus-visible:rounded-[8px] focus-visible:shadow-focus">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-2">
            <ChevronDown
              className="mt-0.5 h-4 w-4 shrink-0 text-ash transition-transform group-open:rotate-180"
              strokeWidth={1.6}
            />
            <div className="min-w-0">
              <h3 className="break-words text-[15px] font-medium leading-snug text-ink">
                {material.name}
              </h3>
              {material.nameJa && (
                <p className="mt-0.5 break-words text-[12.5px] leading-snug text-ash">
                  {material.nameJa}
                </p>
              )}
              <p className="mt-1 text-[12.5px] leading-none text-ash">
                <span className="group-open:hidden">查看准备方式</span>
                <span className="hidden group-open:inline">收起</span>
              </p>
            </div>
          </div>
        </div>
        <StatusBadge tone={materialStatusTone[material.status]}>
          {materialStatusLabel[material.status]}
        </StatusBadge>
      </summary>
      <dl className="mt-3 grid gap-1.5 pl-6 text-[13.5px] leading-[1.6] text-slate">
        <InfoRow label="谁准备" value={material.owner} />
        <InfoRow label="去哪取" value={material.getFrom} />
        <InfoRow label="注意" value={material.note} />
      </dl>
      {relatedMaterials.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pl-6">
          {relatedMaterials.map((item) => (
            <Link
              key={item.id}
              href={`/quick-reference/materials/${item.id}`}
              className="focus-ring inline-flex min-h-8 items-center rounded-btn border border-hairline bg-paper px-2.5 text-[12.5px] font-medium text-ink"
            >
              看{item.name}
            </Link>
          ))}
        </div>
      )}
      {sources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 pl-6">
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
    </details>
  )
}

function SourceItem({ source }: { source: QuickReferenceSource }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring flex items-start gap-2 py-3 text-ink"
    >
      <BookOpenText
        className="mt-0.5 h-4 w-4 shrink-0 text-ash"
        strokeWidth={1.5}
      />
      <span className="min-w-0 flex-1 break-words text-[13.5px] font-medium leading-snug">
        {source.label}
      </span>
      <ExternalLink className="h-4 w-4 shrink-0 text-ash" strokeWidth={1.6} />
    </a>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[54px_minmax(0,1fr)] gap-2">
      <dt className="text-ash">{label}</dt>
      <dd className="min-w-0 break-words">{value}</dd>
    </div>
  )
}
