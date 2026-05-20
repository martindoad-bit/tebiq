import Link from 'next/link'
import { BookOpen, ArrowRight } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import {
  BrandHeader,
  ConsultationShell,
  SectionLabel,
  Surface,
} from '@/components/ui/consultation-alpha'
import { MATERIAL_ENTITIES } from '@/lib/materials/material-entities'
import {
  getQuickReferenceTopic,
  getQuickReferenceTopicHref,
} from '@/lib/quick-reference/topics'
import { MaterialsSearchClient } from './MaterialsSearchClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 材料',
  description: 'TEBIQ 帮你用自然语言找到在留手续清单和常用材料。',
}

const FEATURED_TOPIC_IDS = [
  'japanese-spouse-renewal-materials',
  'permanent-residence-application-materials',
  'gijinkoku-renewal-materials',
  'keiei-kanri-renewal-materials',
  'tax-certificate',
  'job-change',
]

const FEATURED_MATERIAL_IDS = [
  'juminhyo',
  'juminzei-kazei-shomei',
  'juminzei-nouzei-shomei',
  'kokuzei-nouzei-sono3',
  'nenkin-kiroku',
  'mimoto-hoshou-sho',
  'koseki-tohon-konin-shusshou',
  'touki-jikou-shomeisho',
]

export default function MaterialsIndexPage() {
  const featuredTopics = FEATURED_TOPIC_IDS
    .map(id => getQuickReferenceTopic(id))
    .filter((topic): topic is NonNullable<ReturnType<typeof getQuickReferenceTopic>> => Boolean(topic))
  const featuredMaterials = FEATURED_MATERIAL_IDS
    .map(id => MATERIAL_ENTITIES.find(entity => entity.id === id))
    .filter((entity): entity is (typeof MATERIAL_ENTITIES)[number] => Boolean(entity))
  const remainingMaterials = MATERIAL_ENTITIES.filter(
    entity => !FEATURED_MATERIAL_IDS.includes(entity.id),
  )

  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="材料"
          title="找材料和清单"
          description="材料名叫不准，也可以直接写手续或情况。TEBIQ 先帮你定位该看的材料和清单。"
        />

        <MaterialsSearchClient />

        <Surface className="space-y-2">
          <SectionLabel>常见手续入口</SectionLabel>
          <ul className="grid gap-2 sm:grid-cols-2">
            {featuredTopics.map(topic => (
              <li key={topic.id}>
                <Link
                  href={getQuickReferenceTopicHref(topic.id)}
                  className="block min-h-20 rounded-card border border-[var(--tebiq-soft-gray)] bg-white px-3 py-3 text-[var(--tebiq-ink-blue)] transition-colors hover:border-[var(--tebiq-cool-gray)]"
                >
                  <p className="text-[15px] font-medium leading-snug">{topic.title}</p>
                  <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
                    {topic.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="space-y-2">
          <SectionLabel>常用材料</SectionLabel>
          <ul className="grid gap-2 sm:grid-cols-2">
            {featuredMaterials.map(entity => (
              <li key={entity.id}>
                <Link
                  href={`/materials/${encodeURIComponent(entity.id)}`}
                  className="flex min-h-16 items-start gap-3 rounded-card border border-[var(--tebiq-soft-gray)] bg-white px-3 py-3 text-[var(--tebiq-ink-blue)] transition-colors hover:border-[var(--tebiq-cool-gray)]"
                >
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium leading-snug">{entity.title}</p>
                    <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
                      {entity.whatItIs}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--tebiq-cool-gray)]" strokeWidth={1.6} />
                </Link>
              </li>
            ))}
          </ul>
          {remainingMaterials.length > 0 && (
            <details className="pt-2">
              <summary className="cursor-pointer text-[13px] font-medium text-[var(--tebiq-deep-slate)]">
                查看全部材料（{MATERIAL_ENTITIES.length}）
              </summary>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {remainingMaterials.map(entity => (
                  <li key={entity.id}>
                    <Link
                      href={`/materials/${encodeURIComponent(entity.id)}`}
                      className="flex min-h-14 items-start gap-3 rounded-card border border-[var(--tebiq-soft-gray)] bg-white px-3 py-3 text-[var(--tebiq-ink-blue)] transition-colors hover:border-[var(--tebiq-cool-gray)]"
                    >
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium leading-snug">{entity.title}</p>
                        <p className="mt-1 line-clamp-1 text-[12px] leading-[1.5] text-[var(--tebiq-cool-gray)]">
                          {entity.whatItIs}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--tebiq-cool-gray)]" strokeWidth={1.6} />
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </Surface>

        <Surface className="space-y-2">
          <SectionLabel>没搜准时</SectionLabel>
          <p className="text-[13.5px] text-[var(--tebiq-deep-slate)]">
            如果问题涉及离婚、再婚、DV、不许可、公司休眠、在留期限等判断，不要只看材料。可以先
            <Link href="/ai-consultation" className="mx-1 underline">
              去提问
            </Link>
            确认方向，或按具体手续继续看
            <Link href="/quick-reference" className="ml-1 underline">
              手续清单
            </Link>
            。
          </p>
        </Surface>
      </div>
    </ConsultationShell>
  )
}
