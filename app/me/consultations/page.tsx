import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowRight, BookOpen, Camera, MessageSquarePlus } from 'lucide-react'
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
  listSavedAiConsultationsForViewer,
  type AiConsultation,
} from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 我保存的咨询',
  robots: { index: false, follow: false },
}

export default async function MyConsultationsPage() {
  const cookieStore = cookies()
  const viewerId = cookieStore.get('tebiq_viewer')?.value ?? null

  let rows: AiConsultation[] = []
  if (viewerId) {
    rows = await listSavedAiConsultationsForViewer(viewerId, 50)
  }

  return (
    <ConsultationShell>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="咨询记录"
          title="保存的问题"
          description="这里不是 Matter，也不是正式案件列表。它只保留你觉得需要回看的 AI 咨询问题和回答。"
          action={
            <Link
              href="/ai-consultation"
              className="inline-flex h-9 items-center gap-1.5 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[12px] font-medium text-[var(--tebiq-off-white)]"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" strokeWidth={1.6} />
              新咨询
            </Link>
          }
        />

        <Surface className="flex items-center justify-between gap-4">
          <div>
            <SectionLabel>已保存</SectionLabel>
            <p className="mt-1 text-[28px] font-semibold leading-none text-[var(--tebiq-ink-blue)]">{rows.length}</p>
          </div>
          <p className="max-w-[13rem] text-right text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
            当前浏览器 cookie 识别。换浏览器或清空 cookie 后列表会重置。
          </p>
        </Surface>

        {!viewerId && (
          <EmptyRecordState
            title="还没有浏览器记录"
            body="打开咨询页问一题，回答完成后可以保存到这里。"
          />
        )}

        {viewerId && rows.length === 0 && (
          <EmptyRecordState
            title="还没有保存过咨询"
            body="回答页底部的「保存问题」会把这条咨询放到这里。"
          />
        )}

        {rows.length > 0 && (
          <ul className="space-y-2">
            {rows.map(row => (
              <li key={row.id}>
                <Link href={`/c/${encodeURIComponent(row.id)}`}>
                  <Surface as="article" className="space-y-3 transition-colors hover:border-[var(--tebiq-cool-gray)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <SectionLabel>{new Date(row.createdAt).toLocaleString('zh-CN')}</SectionLabel>
                        <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-[var(--tebiq-ink-blue)]">
                          {row.userQuestionText}
                        </p>
                      </div>
                      <StatusBadge state={displayStateForRow(row)} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {row.hasImage && <MetaPill icon={Camera}>图片咨询</MetaPill>}
                      {row.feedbackType && <MetaPill>反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill>}
                      {row.savedQuestion && <MetaPill>已保存</MetaPill>}
                      {(row.factCardIds ?? []).length > 0 && (
                        <MetaPill icon={BookOpen}>事实卡 ×{(row.factCardIds as string[]).length}</MetaPill>
                      )}
                      {(row.riskKeywordHits ?? []).length > 0 && (
                        <MetaPill tone="focus">风险词：{(row.riskKeywordHits as string[]).join(' · ')}</MetaPill>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--tebiq-ink-blue)]">
                      打开详情
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </div>
                  </Surface>
                </Link>
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
        <h2 className="text-[16px] font-semibold text-[var(--tebiq-ink-blue)]">{title}</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">{body}</p>
      </div>
      <Link
        href="/ai-consultation"
        className="inline-flex items-center justify-center gap-2 rounded-btn bg-[var(--tebiq-ink-blue)] px-4 py-2 text-[13px] font-medium text-[var(--tebiq-off-white)]"
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
