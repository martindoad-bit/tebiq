import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Camera, ExternalLink, MessageSquarePlus } from 'lucide-react'
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
import type { ConsultationFactCardAuditEntry } from '@/lib/consultation/stream-protocol'
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
  const factCardAudit = parseFactCardAudit(row)

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

        <FactCardsBlock audit={factCardAudit} />

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

// 0.6 Pack 2.2 — fact-card audit display.
//
// The `fact_card_audit` jsonb column on ai_consultations stores rows
// matching the `ConsultationFactCardAuditEntry` shape from the SSE
// protocol. We keep the parse defensive — older rows pre-Pack 2.2 will
// have an empty array; never throw on unexpected shape.
function parseFactCardAudit(row: AiConsultation): ConsultationFactCardAuditEntry[] {
  const raw = row.factCardAudit
  if (!Array.isArray(raw)) return []
  const out: ConsultationFactCardAuditEntry[] = []
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue
    const e = entry as Record<string, unknown>
    if (typeof e.fact_id !== 'string') continue
    out.push({
      fact_id: e.fact_id,
      fact_card_state: typeof e.fact_card_state === 'string' ? e.fact_card_state : 'unknown',
      risk_level: typeof e.risk_level === 'string' ? e.risk_level : 'unknown',
      confidence: typeof e.confidence === 'string' ? e.confidence : 'unknown',
      source_quality: typeof e.source_quality === 'string' ? e.source_quality : 'unknown',
      official_sources: Array.isArray(e.official_sources)
        ? (e.official_sources as unknown[]).filter((u): u is string => typeof u === 'string')
        : [],
      injected_fields: Array.isArray(e.injected_fields)
        ? (e.injected_fields as unknown[]).filter((f): f is string => typeof f === 'string')
        : [],
      needs_review_flags: Array.isArray(e.needs_review_flags)
        ? (e.needs_review_flags as unknown[]).filter((f): f is string => typeof f === 'string')
        : [],
      decision: e.decision === 'inject' || e.decision === 'hint_only' || e.decision === 'drop'
        ? e.decision
        : 'drop',
    })
  }
  return out
}

function FactCardsBlock({ audit }: { audit: ConsultationFactCardAuditEntry[] }) {
  if (audit.length === 0) return null
  const injected = audit.filter(a => a.decision === 'inject')
  const hintOnly = audit.filter(a => a.decision === 'hint_only')
  // No "drop" rows surface (server can omit them) — but be tolerant
  // either way and just show what's there.
  if (injected.length === 0 && hintOnly.length === 0) return null
  return (
    <Surface className="space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
        <SectionLabel>本回答参考的事实卡</SectionLabel>
      </div>
      {injected.length > 0 && (
        <div className="space-y-2">
          <p className="text-[12px] text-[var(--tebiq-deep-slate)]">
            注入了 {injected.length} 张事实卡（已合入回答）：
          </p>
          <ul className="space-y-1.5">
            {injected.map(card => <FactCardRow key={card.fact_id} card={card} />)}
          </ul>
        </div>
      )}
      {hintOnly.length > 0 && (
        <div className="space-y-2">
          <p className="text-[12px] text-[var(--tebiq-deep-slate)]">
            另有 {hintOnly.length} 张相关事实卡触发了「需进一步确认」标记，未作为事实直接注入：
          </p>
          <ul className="space-y-1.5">
            {hintOnly.map(card => <FactCardRow key={card.fact_id} card={card} />)}
          </ul>
        </div>
      )}
      <p className="text-[11px] text-[var(--tebiq-cool-gray)]">
        事实卡来源：本仓库 docs/fact-cards/ 公开审核档；具体期限/手续仍建议与行政書士或入管确认。
      </p>
    </Surface>
  )
}

function FactCardRow({ card }: { card: ConsultationFactCardAuditEntry }) {
  // GitHub permalink at the consultation's git_sha is ideal but the row
  // doesn't carry git_sha (would require Pack 2.3 schema add). For now
  // link to the file path on main; consumers can checkout history if
  // they need an exact-version snapshot.
  const repoUrl =
    `https://github.com/martindoad-bit/tebiq/blob/main/docs/fact-cards/${encodeURIComponent(card.fact_id)}.md`
  return (
    <li className="flex flex-col gap-1 rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)]/30 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--tebiq-ink-blue)] hover:underline"
        >
          {card.fact_id}
          <ExternalLink className="h-3 w-3" strokeWidth={1.6} />
        </a>
        <span className="rounded-full border border-[var(--tebiq-cool-gray)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--tebiq-deep-slate)]">
          {card.risk_level}
        </span>
        <span className="rounded-full border border-[var(--tebiq-cool-gray)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--tebiq-deep-slate)]">
          {card.fact_card_state}
        </span>
        <span className="rounded-full border border-[var(--tebiq-cool-gray)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--tebiq-deep-slate)]">
          {card.source_quality}
        </span>
      </div>
      {card.official_sources.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[var(--tebiq-cool-gray)]">
          {card.official_sources.slice(0, 3).map(url => (
            <a key={url} href={url} target="_blank" rel="noreferrer noopener" className="hover:underline truncate">
              {hostnameOf(url)}
            </a>
          ))}
          {card.official_sources.length > 3 && (
            <span>+{card.official_sources.length - 3} more</span>
          )}
        </div>
      )}
      {card.needs_review_flags.length > 0 && (
        <p className="text-[11px] text-[var(--tebiq-cool-gray)]">
          以下细节卡未注入为事实，需进一步确认：{card.needs_review_flags.join('、')}
        </p>
      )}
    </li>
  )
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url.slice(0, 32)
  }
}
