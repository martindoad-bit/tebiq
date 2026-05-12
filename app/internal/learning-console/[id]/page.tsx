import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Camera, Database, FileText, ShieldAlert } from 'lucide-react'
import {
  ConsultationShell,
  FeedbackLabel,
  MetaPill,
  RiskHintBanner,
  SectionLabel,
  StatusBadge,
  Surface,
  type AlphaDisplayState,
} from '@/components/ui/consultation-alpha'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { getAiConsultationById, type AiConsultation } from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Learning Console · 详情 · TEBIQ Internal',
  robots: { index: false, follow: false },
}

interface PageProps { params: { id: string } }

export default async function LearningConsoleDetailPage({ params }: PageProps) {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  const id = params.id?.trim()
  if (!id) notFound()
  const row = await getAiConsultationById(id)
  if (!row) notFound()

  const answer = row.finalAnswerText ?? row.aiAnswerText ?? ''
  const riskHits = (row.riskKeywordHits ?? []) as string[]
  const factAnchors = (row.factAnchorIds ?? []) as string[]
  const redactions = (row.forbiddenRedactions ?? []) as string[]
  const displayState = displayStateForRow(row)

  return (
    <ConsultationShell wide>
      <div className="space-y-5">
        <header className="flex flex-col gap-4 border-b border-[var(--tebiq-soft-gray)] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">Learning Console / Detail</p>
            <h1 className="mt-1 break-all text-[22px] font-semibold leading-tight text-[var(--tebiq-ink-blue)]">{row.id}</h1>
            <p className="mt-2 text-[13px] text-[var(--tebiq-deep-slate)]">
              {new Date(row.createdAt).toLocaleString('zh-CN')} · 真实咨询记录，不是案件处理页。
            </p>
          </div>
          <Link href="/internal/learning-console" className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--tebiq-ink-blue)]">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
            返回列表
          </Link>
        </header>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <Surface className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <SectionLabel>用户问题</SectionLabel>
                <StatusBadge state={displayState} />
              </div>
              <p className="whitespace-pre-wrap text-[16px] leading-relaxed text-[var(--tebiq-ink-blue)]">
                {row.userQuestionText}
              </p>
            </Surface>

            {row.hasImage && (
              <Surface className="space-y-2">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                  <SectionLabel>图片摘要</SectionLabel>
                </div>
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">
                  {row.imageSummary ?? '(空)'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <MetaPill>{row.imageStorageRef ? `ref ${row.imageStorageRef}` : '无 ref'}</MetaPill>
                  <MetaPill>原图未保存</MetaPill>
                </div>
              </Surface>
            )}

            <RiskHintBanner hits={riskHits} />

            <Surface className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                  <SectionLabel>AI 回答</SectionLabel>
                </div>
                <StatusBadge state={displayState} />
              </div>
              {(displayState === 'partial' || displayState === 'fallback' || displayState === 'timeout' || displayState === 'failed') && (
                <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12px] leading-relaxed text-[var(--tebiq-ink-blue)]">
                  {displayState === 'partial' && '这条记录只保留了部分内容。'}
                  {displayState === 'fallback' && '这条记录使用了安全降级文案。'}
                  {displayState === 'timeout' && '这条记录没有生成可用完整回答。'}
                  {displayState === 'failed' && '这条记录生成失败。'}
                  {row.timeoutReason ? ` 原因：${row.timeoutReason}` : ''}
                </div>
              )}
              {answer ? (
                <article className="whitespace-pre-wrap text-[14px] leading-[1.75] text-[var(--tebiq-ink-blue)]">
                  {answer}
                </article>
              ) : (
                <p className="text-[13px] text-[var(--tebiq-deep-slate)]">(无回答内容)</p>
              )}
            </Surface>
          </div>

          <aside className="space-y-4">
            <Surface className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                <SectionLabel>用户信号</SectionLabel>
              </div>
              <div className="flex flex-wrap gap-2">
                {row.feedbackType ? <MetaPill>反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill> : <MetaPill>无反馈</MetaPill>}
                <MetaPill>{row.savedQuestion ? '已保存' : '未保存'}</MetaPill>
                <MetaPill tone={row.humanConfirmClicked ? 'focus' : 'neutral'}>
                  {row.humanConfirmClicked ? '需确认' : '未点确认'}
                </MetaPill>
                <MetaPill>追问 {row.followUpCount}</MetaPill>
              </div>
            </Surface>

            <Surface className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
                <SectionLabel>模型与时间</SectionLabel>
              </div>
              <dl className="space-y-2 text-[12px]">
                <Field k="model" v={row.model} mono />
                <Field k="prompt_version" v={row.promptVersion} mono />
                <Field k="completion_status" v={row.completionStatus} />
                <Field k="partial_answer_saved" v={String(row.partialAnswerSaved)} />
                <Field k="timeout_reason" v={row.timeoutReason ?? '—'} />
                <Field k="first_token_latency_ms" v={row.firstTokenLatencyMs?.toString() ?? '—'} />
                <Field k="total_latency_ms" v={row.totalLatencyMs?.toString() ?? '—'} />
                <Field k="stream_started_at" v={row.streamStartedAt ? new Date(row.streamStartedAt).toISOString() : '—'} mono />
                <Field k="first_token_at" v={row.firstTokenAt ? new Date(row.firstTokenAt).toISOString() : '—'} mono />
                <Field k="completed_at" v={row.completedAt ? new Date(row.completedAt).toISOString() : '—'} mono />
              </dl>
            </Surface>

            <Surface className="space-y-3">
              <SectionLabel>字段全览</SectionLabel>
              <dl className="space-y-2 text-[12px]">
                <Field k="question_id" v={row.id} mono />
                <Field k="viewer_id" v={row.viewerId ?? '(无 cookie)'} mono />
                <Field k="has_image" v={String(row.hasImage)} />
                <Field k="risk_keyword_hits" v={riskHits.length > 0 ? riskHits.join(', ') : '[]'} />
                <Field k="fact_anchor_ids" v={factAnchors.length > 0 ? factAnchors.join(', ') : '[]'} />
                <Field k="forbidden_redactions" v={redactions.length > 0 ? redactions.join(', ') : '[]'} />
                <Field k="schema_version" v={row.schemaVersion} mono />
                <Field k="created_at" v={new Date(row.createdAt).toISOString()} mono />
                <Field k="updated_at" v={new Date(row.updatedAt).toISOString()} mono />
              </dl>
            </Surface>
          </aside>
        </section>
      </div>
    </ConsultationShell>
  )
}

function Field({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[var(--tebiq-cool-gray)]">{k}</dt>
      <dd className={mono ? 'break-all font-mono text-[var(--tebiq-ink-blue)]' : 'break-words text-[var(--tebiq-ink-blue)]'}>
        {v}
      </dd>
    </div>
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
