import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageSquarePlus, BookOpen, UserCheck } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import CloseMatterButton from './CloseMatterButton'
import {
  BrandHeader,
  ConsultationShell,
  MetaPill,
  SectionLabel,
  Surface,
} from '@/components/ui/consultation-alpha'
import { getUserMatterById } from '@/lib/db/queries/userMatters'
import { getAiConsultationById } from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 事项详情',
  robots: { index: false, follow: false },
}

interface PageProps {
  params: { id: string }
}

export default async function MatterDetailPage({ params }: PageProps) {
  const id = params.id?.trim()
  if (!id) notFound()

  const cookieStore = cookies()
  const viewerId = cookieStore.get('tebiq_viewer')?.value ?? null
  const matter = await getUserMatterById(id).catch(() => null)
  if (!matter) notFound()
  // Per-viewer scoping: don't expose other people's matters.
  if (matter.viewerId && viewerId && matter.viewerId !== viewerId) notFound()

  const origin = matter.originConsultationId
    ? await getAiConsultationById(matter.originConsultationId).catch(() => null)
    : null

  const supplementalFacts = Array.isArray(matter.supplementalFacts) ? matter.supplementalFacts : []
  const linkedMaterialIds = Array.isArray(matter.linkedMaterialIds) ? matter.linkedMaterialIds : []

  const askAgainHref = origin
    ? `/ai-consultation?q=${encodeURIComponent(
        `继续追问之前的事项「${matter.title}」。已有背景：${(origin.userQuestionText ?? '').slice(0, 240)}`,
      )}`
    : `/ai-consultation?q=${encodeURIComponent(`继续这件事：${matter.title}`)}`

  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="事项详情"
          title={matter.title}
          description={`状态：${statusLabel(matter.status)}`}
          action={
            <Link
              href="/me/matters"
              className="inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[13px] text-[var(--tebiq-deep-slate)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              返回事项
            </Link>
          }
        />

        {origin && (
          <Surface className="space-y-2">
            <SectionLabel>起源问题</SectionLabel>
            <p className="text-[15px] leading-relaxed text-[var(--tebiq-ink-blue)]">
              {origin.userQuestionText}
            </p>
            <Link
              href={`/c/${encodeURIComponent(origin.id)}`}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
            >
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.6} />
              查看回答
            </Link>
          </Surface>
        )}

        <Surface className="space-y-2">
          <SectionLabel>已补充事实（{supplementalFacts.length}）</SectionLabel>
          {supplementalFacts.length === 0 ? (
            <p className="text-[13.5px] text-[var(--tebiq-cool-gray)]">
              暂未补充事实。可以在 TEBIQ 回答页右下「我有补充」按钮，或者继续这件事时把新的事实加进来。
            </p>
          ) : (
            <ul className="space-y-2">
              {supplementalFacts.map((fact, idx) => (
                <li
                  key={idx}
                  className="rounded-card border border-[var(--tebiq-soft-gray)] bg-white px-3 py-2 text-[14px] leading-relaxed text-[var(--tebiq-ink-blue)]"
                >
                  {typeof fact === 'string' ? fact : JSON.stringify(fact)}
                </li>
              ))}
            </ul>
          )}
        </Surface>

        <Surface className="space-y-2">
          <SectionLabel>关联材料（{linkedMaterialIds.length}）</SectionLabel>
          {linkedMaterialIds.length === 0 ? (
            <p className="text-[13.5px] text-[var(--tebiq-cool-gray)]">
              暂未关联材料。可以从材料 Tab 把对应材料挂到这件事下。
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {linkedMaterialIds.map(mid => (
                <li key={String(mid)}>
                  <Link
                    href={`/materials/${encodeURIComponent(String(mid))}`}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] text-[var(--tebiq-ink-blue)]"
                  >
                    <BookOpen className="h-3.5 w-3.5" strokeWidth={1.6} />
                    {String(mid)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Surface>

        <Surface className="space-y-3">
          <SectionLabel>接下来可以做</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-4">
            <Link
              href={askAgainHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
            >
              <MessageSquarePlus className="h-4 w-4" strokeWidth={1.6} />
              再问一次
            </Link>
            <Link
              href="/materials"
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
            >
              <BookOpen className="h-4 w-4" strokeWidth={1.6} />
              查材料
            </Link>
            <Link
              href={`/scrivener?matter_id=${encodeURIComponent(matter.id)}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 py-2 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
            >
              <UserCheck className="h-4 w-4" strokeWidth={1.6} />
              找书士
            </Link>
            <CloseMatterButton matterId={matter.id} alreadyClosed={matter.status === 'closed'} />
          </div>
          <p className="text-[12.5px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
            事项只是把咨询、材料和后续动作串起来的标签，不替代书士判断。
          </p>
        </Surface>

        <Surface className="space-y-3">
          <SectionLabel>事项信息</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <MetaPill>创建：{matter.createdAt ? new Date(matter.createdAt as unknown as string).toLocaleString('zh-CN') : '—'}</MetaPill>
            <MetaPill>更新：{matter.updatedAt ? new Date(matter.updatedAt as unknown as string).toLocaleString('zh-CN') : '—'}</MetaPill>
            <MetaPill>状态：{statusLabel(matter.status)}</MetaPill>
            <MetaPill>事项 ID：{matter.id.slice(0, 8)}…</MetaPill>
          </div>
        </Surface>
      </div>
    </ConsultationShell>
  )
}

function statusLabel(status: string): string {
  if (status === 'active') return '进行中'
  if (status === 'paused') return '暂停'
  if (status === 'closed') return '已关闭'
  return status
}

