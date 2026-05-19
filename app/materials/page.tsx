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
import { MaterialsSearchClient } from './MaterialsSearchClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 材料',
  description: 'TEBIQ 整理在留手续常用材料：是什么、谁开、去哪取、复用在哪些场景。',
}

export default function MaterialsIndexPage() {
  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="材料"
          title="按材料找"
          description="输入材料俗称或手续名称，先找到可能要看的材料和清单。"
        />

        <MaterialsSearchClient />

        <Surface className="space-y-2">
          <SectionLabel>常用材料（{MATERIAL_ENTITIES.length}）</SectionLabel>
          <ul className="grid gap-2 sm:grid-cols-2">
            {MATERIAL_ENTITIES.map(entity => (
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
        </Surface>

        <Surface className="space-y-2">
          <SectionLabel>按场景找</SectionLabel>
          <p className="text-[13.5px] text-[var(--tebiq-deep-slate)]">
            按具体手续（搬家、换工作、技人国续签…）找清单，跳
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
