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
  title: 'TEBIQ — 已保存咨询',
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
          eyebrow="已保存咨询"
          title="已保存的咨询"
          description="问完后保存的咨询会在这里。之后可以继续查看、补充，或发给专业人士参考。"
          action={
            <Link
              href="/ai-consultation"
              className="inline-flex h-9 items-center gap-1.5 rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[12px] font-medium text-[var(--tebiq-off-white)]"
            >
              <MessageSquarePlus className="h-3.5 w-3.5" strokeWidth={1.6} />
              新问题
            </Link>
          }
        />

        <Surface className="flex items-center justify-between gap-4">
          <div>
            <SectionLabel>已保存</SectionLabel>
            <p className="mt-1 text-[28px] font-semibold leading-none text-[var(--tebiq-ink-blue)]">{rows.length}</p>
          </div>
          <p className="max-w-[13rem] text-right text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
            这台设备上的咨询记录。换浏览器或清空记录后，可能看不到旧咨询。
          </p>
        </Surface>

        {!viewerId && (
          <EmptyRecordState
            title="还没有浏览器记录"
            body="打开咨询页问一题，回答完成后点保存，就会出现在这里。"
          />
        )}

        {viewerId && rows.length === 0 && (
          <EmptyRecordState
            title="还没有保存过咨询"
            body="问完后点「保存这次咨询」，之后就能从这里继续查看。"
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
                        <MetaPill icon={BookOpen}>参考资料 ×{(row.factCardIds ?? []).length}</MetaPill>
                      )}
                      {(row.riskKeywordHits ?? []).length > 0 && (
                        <MetaPill tone="focus">有风险提示</MetaPill>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--tebiq-ink-blue)]">
                      查看回答
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
