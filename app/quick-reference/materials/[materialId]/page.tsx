import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  BookOpenText,
  ExternalLink,
  MessageSquarePlus,
} from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import { StatusBadge } from '@/components/ui/tebiq'
import {
  COMMON_MATERIALS,
  getCommonMaterial,
  type CommonMaterialSourceStatus,
} from '@/lib/quick-reference/materials'

const sourceStatusLabel: Record<CommonMaterialSourceStatus, string> = {
  direct_source: '直接来源',
  pdf_direct_source: 'PDF 来源',
  related_source: '相关来源',
  needs_domain: '需专业确认',
}

const sourceStatusTone: Record<
  CommonMaterialSourceStatus,
  'checked' | 'attention' | 'neutral'
> = {
  direct_source: 'checked',
  pdf_direct_source: 'checked',
  related_source: 'neutral',
  needs_domain: 'attention',
}

export function generateStaticParams() {
  return COMMON_MATERIALS.map((material) => ({ materialId: material.id }))
}

export function generateMetadata({
  params,
}: {
  params: { materialId: string }
}): Metadata {
  const material = getCommonMaterial(params.materialId)
  if (!material) return {}
  return {
    title: `${material.name} - 材料清单 - TEBIQ`,
    description: `${material.nameJa}：谁准备、去哪取、常用手续。`,
    alternates: { canonical: `/quick-reference/materials/${material.id}` },
  }
}

export default function CommonMaterialPage({
  params,
}: {
  params: { materialId: string }
}) {
  const material = getCommonMaterial(params.materialId)
  if (!material) notFound()

  const askPrompt = [
    `我正在准备材料「${material.name}（${material.nameJa}）」，想确认这个材料该怎么取得、用于哪个手续。`,
    '我不确定只看这个材料能不能判断，也想请你先帮我确认还缺哪些关键信息。',
  ].join('\n\n')

  return (
    <AppShell
      appBar={<AppBar title="材料说明" back="/quick-reference" />}
      tabBar={<TabBar />}
    >
      <article className="space-y-4 pt-1">
        <Link
          href="/quick-reference"
          className="focus-ring inline-flex min-h-9 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[13px] font-medium text-slate"
        >
          <ArrowLeft size={15} strokeWidth={1.6} />
          返回材料清单
        </Link>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge>共通材料</StatusBadge>
            <StatusBadge tone={sourceStatusTone[material.sourceStatus]}>
              {sourceStatusLabel[material.sourceStatus]}
            </StatusBadge>
          </div>
          <h1 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
            {material.name}
          </h1>
          <p className="mt-1 break-words text-[13px] leading-snug text-ash">
            {material.nameJa}
          </p>
          <p className="mt-3 text-[15px] leading-[1.75] text-slate">
            {material.summary}
          </p>
        </section>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[15px] font-medium leading-snug text-ink">
            怎么准备
          </h2>
          <dl className="mt-3 grid gap-2 text-[14px] leading-[1.7] text-slate">
            <InfoRow label="谁准备" value={material.owner} />
            <InfoRow label="去哪取" value={material.getFrom} />
            <InfoRow label="取得方式" value={material.howToGet} />
            <InfoRow label="取得时点" value={material.timing} />
          </dl>
        </section>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[15px] font-medium leading-snug text-ink">
            常用手续
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {material.commonUses.map((item) => (
              <StatusBadge key={item}>{item}</StatusBadge>
            ))}
          </div>
        </section>

        {(material.displayNote || material.domainNote) && (
          <section className="rounded-card border border-hairline bg-paper px-4 py-4">
            <h2 className="text-[15px] font-medium leading-snug text-ink">
              先注意
            </h2>
            <div className="mt-2 space-y-2 text-[14px] leading-[1.7] text-slate">
              {material.displayNote && <p>{material.displayNote}</p>}
              {material.domainNote && <p>{material.domainNote}</p>}
            </div>
          </section>
        )}

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="flex items-center gap-2 text-[15px] font-medium leading-snug text-ink">
            <BookOpenText size={16} strokeWidth={1.6} />
            来源
          </h2>
          <a
            href={material.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring mt-3 flex min-h-11 items-center justify-between gap-3 rounded-btn border border-hairline bg-paper px-3 text-[13.5px] font-medium text-ink"
          >
            <span className="min-w-0 break-words">
              {sourceStatusLabel[material.sourceStatus]}
            </span>
            <ExternalLink
              className="h-4 w-4 shrink-0 text-ash"
              strokeWidth={1.6}
            />
          </a>
        </section>

        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <p className="text-[13px] font-medium text-ash">拿不准时</p>
          <p className="mt-2 text-[14px] leading-[1.7] text-slate">
            材料页只说明材料本身，不判断你是否符合申请、材料能否替代、或许可可能性。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={`/ai-consultation?q=${encodeURIComponent(askPrompt)}`}
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-paper px-3 text-[14px] font-medium text-ink"
            >
              <MessageSquarePlus size={16} strokeWidth={1.6} />
              带着材料提问
            </Link>
            <Link
              href="/ai-consultation"
              className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-btn border border-hairline bg-surface px-3 text-[14px] font-medium text-slate"
            >
              问新问题
            </Link>
          </div>
        </section>
      </article>
    </AppShell>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-2 border-b border-hairline py-2 last:border-b-0">
      <dt className="text-ash">{label}</dt>
      <dd className="min-w-0 break-words">{value}</dd>
    </div>
  )
}
