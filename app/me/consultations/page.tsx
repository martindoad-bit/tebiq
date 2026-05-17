import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowRight, BookOpen, Camera, MessageSquarePlus, Pin } from 'lucide-react'
import TabBar from '@/app/_components/v5/TabBar'
import ConsultationDeleteButton from './ConsultationDeleteButton'
import {
  BrandHeader,
  ConsultationShell,
  FeedbackLabel,
  MetaPill,
  SectionLabel,
  StatusBadge,
  Surface,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import {
  listRecentAiConsultationsForViewer,
  type AiConsultation,
} from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 咨询记录',
  robots: { index: false, follow: false },
}

export default async function MyConsultationsPage() {
  const cookieStore = cookies()
  const viewerId = cookieStore.get('tebiq_viewer')?.value ?? null

  let rows: AiConsultation[] = []
  let recordsUnavailable = false
  if (viewerId) {
    try {
      rows = await listRecentAiConsultationsForViewer(viewerId, 20)
    } catch (error) {
      recordsUnavailable = true
      console.error('[my-consultations] failed to load recent records', error)
    }
  }

  return (
    <ConsultationShell tabBar={<TabBar />}>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="自动记录"
          title="咨询记录"
          description="同一浏览器会自动记录你问过的在留问题。可以回看、删除，也可以自己决定是否分享。"
          action={
            <Link
              href="/ai-consultation"
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[13px] font-medium text-[var(--tebiq-off-white)]"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" strokeWidth={1.6} />
              提问
            </Link>
          }
        />

        {rows.length > 0 && (
          <Surface className="space-y-2">
            <SectionLabel>最近记录</SectionLabel>
            <p className="text-[13.5px] leading-relaxed text-[var(--tebiq-deep-slate)]">
              当前显示最近 20 条；记录跟随这台设备和浏览器，更换设备或清空记录后可能看不到旧咨询。
            </p>
          </Surface>
        )}

        <Surface className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <SectionLabel>把这件事继续下去</SectionLabel>
            <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--tebiq-deep-slate)]">
              想把某次咨询保存起来，补充背景、关联材料、找书士？放到「我的事项」里继续处理。
            </p>
          </div>
          <Link
            href="/me/matters"
            className="inline-flex h-10 flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-3 text-[13px] font-medium text-[var(--tebiq-ink-blue)]"
          >
            <Pin className="h-3.5 w-3.5" strokeWidth={1.6} />
            想把这件事变成事项
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </Link>
        </Surface>

        {recordsUnavailable && (
          <EmptyRecordState
            title="记录暂时没取到"
            body="这不影响继续提问。稍后再打开这里，通常就能看到自动记录。"
          />
        )}

        {!recordsUnavailable && !viewerId && (
          <EmptyRecordState
            title="还没有咨询记录"
            body="提出一个具体问题后，会自动记录在这里。"
          />
        )}

        {!recordsUnavailable && viewerId && rows.length === 0 && (
          <EmptyRecordState
            title="还没有咨询记录"
            body="提出一个具体问题后，会自动记录在这里。"
          />
        )}

        {rows.length > 0 && (
          <ul className="space-y-2">
            {rows.map(row => (
              <li key={row.id}>
                <Surface as="article" className="space-y-3 transition-colors hover:border-[var(--tebiq-cool-gray)]">
                  <Link href={`/c/${encodeURIComponent(row.id)}`} className="block">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <SectionLabel>{new Date(row.createdAt).toLocaleString('zh-CN')}</SectionLabel>
                        <p className="mt-1 line-clamp-2 text-[16px] leading-relaxed text-[var(--tebiq-ink-blue)]">
                          {row.userQuestionText}
                        </p>
                      </div>
                      <StatusBadge state={displayStateForRow(row)} />
                    </div>
                  </Link>
                  <div className="flex flex-wrap gap-2">
                    {row.hasImage && <MetaPill icon={Camera}>有图片</MetaPill>}
                    {row.feedbackType && <MetaPill>已反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill>}
                    {(row.factCardIds ?? []).length > 0 && (
                      <MetaPill icon={BookOpen}>来源 ×{(row.factCardIds ?? []).length}</MetaPill>
                    )}
                    {(row.riskKeywordHits ?? []).length > 0 && (
                      <MetaPill tone="focus">有提示</MetaPill>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <Link href={`/c/${encodeURIComponent(row.id)}`} className="inline-flex min-h-9 items-center gap-1 text-[13.5px] font-medium text-[var(--tebiq-ink-blue)]">
                      查看记录
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </Link>
                    <ConsultationDeleteButton id={row.id} />
                  </div>
                </Surface>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ConsultationShell>
  )
}

function EmptyRecordState({ title, body }: { title: string; body: string }) {
  return (
    <Surface className="space-y-3 text-center">
      <div>
        <h2 className="text-[17px] font-semibold text-[var(--tebiq-ink-blue)]">{title}</h2>
        <p className="mt-1 text-[14px] leading-relaxed text-[var(--tebiq-deep-slate)]">{body}</p>
      </div>
      <Link
        href="/ai-consultation"
        className="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-4 py-2 text-[14px] font-medium text-[var(--tebiq-off-white)]"
      >
        开始咨询
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
      </Link>
    </Surface>
  )
}

function displayStateForRow(row: AiConsultation): AlphaDisplayState {
  if (row.completionStatus === 'completed') return 'completed'
  if (row.completionStatus === 'streaming') return 'streaming'
  if (row.completionStatus === 'failed') return 'failed'
  if (row.partialAnswerSaved) return 'partial'
  if (row.timeoutReason) return 'fallback'
  return 'timeout'
}
