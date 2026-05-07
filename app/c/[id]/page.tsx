import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Camera, MessageSquarePlus } from 'lucide-react'
import {
  BrandHeader,
  ConsultationShell,
  FeedbackLabel,
  MetaPill,
  RiskHintBanner,
  SectionLabel,
  StatusBadge,
  Surface,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import { getAiConsultationById, type AiConsultation } from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ — 已保存咨询 (Alpha)',
  robots: { index: false, follow: false },
}

interface PageProps { params: { id: string } }

export default async function ConsultationDetailPage({ params }: PageProps) {
  const id = params.id?.trim()
  if (!id) notFound()
  const row = await getAiConsultationById(id)
  if (!row) notFound()

  const answer = row.finalAnswerText ?? row.aiAnswerText ?? ''
  const riskHits = (row.riskKeywordHits ?? []) as string[]
  const displayState = displayStateForRow(row)

  return (
    <ConsultationShell>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="已保存咨询"
          title="这次咨询"
          description="这里用于回看问题、回答、图片摘要和状态。它不是正式案件。"
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

        <Surface className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>你的问题</SectionLabel>
            <StatusBadge state={displayState} />
          </div>
          <p className="text-[15px] leading-relaxed text-[var(--tebiq-ink-blue)]">{row.userQuestionText}</p>
        </Surface>

        {row.hasImage && row.imageSummary && (
          <Surface className="space-y-2">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
              <SectionLabel>图片摘要</SectionLabel>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">{row.imageSummary}</p>
            <p className="text-[11px] text-[var(--tebiq-cool-gray)]">原图未保存；这里只保留识别摘要供这条咨询参考。</p>
          </Surface>
        )}

        <RiskHintBanner hits={riskHits} />

        <Surface className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <SectionLabel>AI 回答</SectionLabel>
            <StatusBadge state={displayState} />
          </div>
          {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout' || displayState === 'failed') && (
            <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12px] leading-relaxed text-[var(--tebiq-ink-blue)]">
              {displayState === 'partial' && '这条记录有部分回答，但没有完整完成。'}
              {displayState === 'fallback' && '这条记录使用了安全降级文案，不应看作完整回答。'}
              {displayState === 'timeout' && '这条记录没有生成可用完整回答。'}
              {displayState === 'failed' && '这条记录生成失败。'}
              {row.timeoutReason ? ` 原因：${row.timeoutReason}` : ''}
            </div>
          )}
          {answer ? (
            <article className="whitespace-pre-wrap text-[15px] leading-[1.75] text-[var(--tebiq-ink-blue)]">
              {answer}
            </article>
          ) : (
            <p className="text-[13px] text-[var(--tebiq-deep-slate)]">还没有可显示的回答正文。</p>
          )}
        </Surface>

        <Surface className="space-y-3">
          <SectionLabel>保存信息</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <MetaPill>{new Date(row.createdAt).toLocaleString('zh-CN')}</MetaPill>
            {row.feedbackType && <MetaPill>反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill>}
            {row.savedQuestion && <MetaPill>已保存</MetaPill>}
            {row.humanConfirmClicked && <MetaPill tone="focus">想人工确认</MetaPill>}
          </div>
        </Surface>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--tebiq-soft-gray)] pt-4 text-[12px]">
          <Link href="/me/consultations" className="inline-flex items-center gap-1 text-[var(--tebiq-deep-slate)]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
            返回已保存咨询
          </Link>
          <p className="text-[var(--tebiq-deep-slate)]">涉及具体期限、手续、个案审查时，建议向行政書士或入管确认。</p>
        </footer>
      </div>
    </ConsultationShell>
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
