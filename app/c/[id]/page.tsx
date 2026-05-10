import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Camera, GitBranch, MessageSquarePlus } from 'lucide-react'
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
import { FactReferenceBlock } from '@/components/ui/fact-reference'
import type { ConsultationFactCardAuditEntry } from '@/lib/consultation/stream-protocol'
import {
  getAiConsultationById,
  getFollowUpChain,
  type AiConsultation,
} from '@/lib/db/queries/aiConsultations'

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
  // 0.6 Pack 2.3: when this consultation is part of a multi-round
  // chain, load every sibling row so we can render the chain inline.
  // Single-row chains (no follow-ups, no parent) still load fine —
  // getFollowUpChain returns just the one row.
  const chain = await getFollowUpChain(row.id)
  const isChain = chain.length > 1

  return (
    <ConsultationShell>
      <div className="space-y-5">
        <BrandHeader
          eyebrow="已保存咨询"
          title="这次咨询"
          description="这里用于回看问题、回答和补充记录。它不是正式案件。"
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
              {row.timeoutReason ? ` ${userSafeDetail(row.timeoutReason)}` : ''}
            </div>
          )}
          {hasEncodingIssue(answer) && (
            <div className="rounded-card border border-[var(--tebiq-warm-amber)] px-3 py-2 text-[12px] leading-relaxed text-[var(--tebiq-ink-blue)]">
              这条回答里检测到显示异常字符。建议重新生成，或在反馈里标记“不准确”。
            </div>
          )}
          {answer ? (
            <AnswerDetailProse text={answer} />
          ) : (
            <p className="text-[13px] text-[var(--tebiq-deep-slate)]">还没有可显示的回答正文。</p>
          )}
        </Surface>

        <FactReferenceBlock audit={factCardAudit} />

        {isChain && <ChainBlock chain={chain} currentId={row.id} />}

        <Surface className="space-y-3">
          <SectionLabel>保存信息</SectionLabel>
          <div className="flex flex-wrap gap-2">
            <MetaPill>{new Date(row.createdAt).toLocaleString('zh-CN')}</MetaPill>
            {row.feedbackType && <MetaPill>反馈：<FeedbackLabel type={row.feedbackType} /></MetaPill>}
            {row.savedQuestion && <MetaPill>已保存</MetaPill>}
            {row.humanConfirmClicked && <MetaPill tone="focus">需确认</MetaPill>}
          </div>
        </Surface>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--tebiq-soft-gray)] pt-4 text-[12px]">
          <Link href="/me/consultations" className="inline-flex items-center gap-1 text-[var(--tebiq-deep-slate)]">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
            返回已保存咨询
          </Link>
          <p className="text-[var(--tebiq-deep-slate)]">具体期限、手续和个案判断，请向行政書士或入管确认。</p>
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
      title: typeof e.title === 'string' && e.title.trim() ? e.title : 'TEBIQ 知识资料',
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

function hasEncodingIssue(text: string | null | undefined): boolean {
  return typeof text === 'string' && /\uFFFD/.test(text)
}

interface FirstLookBlock {
  conclusion: string
  action: string
  avoid: string | null
}

function AnswerDetailProse({ text }: { text: string }) {
  const safeText = cleanDisplayText(text)
  const { firstLook, rest } = extractFirstLook(safeText)
  return (
    <div className="space-y-4">
      {firstLook && (
        <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)]/35 px-3.5 py-3">
          <SectionLabel>先看这里</SectionLabel>
          <div className="mt-2 space-y-1.5 text-[14px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
            <p><span className="font-medium">当前判断：</span>{firstLook.conclusion}</p>
            <p><span className="font-medium">建议动作：</span>{firstLook.action}</p>
            {firstLook.avoid && <p><span className="font-medium">暂缓事项：</span>{firstLook.avoid}</p>}
          </div>
        </div>
      )}
      {rest && (
        <article className="whitespace-pre-wrap text-[15px] leading-[1.75] text-[var(--tebiq-ink-blue)]">
          {rest}
        </article>
      )}
    </div>
  )
}

function extractFirstLook(text: string): { firstLook: FirstLookBlock | null; rest: string } {
  const normalized = text.replace(/\r\n/g, '\n').trimStart()
  const lines = normalized.split('\n')
  const firstNonEmpty = lines.findIndex(line => line.trim().length > 0)
  if (firstNonEmpty < 0) return { firstLook: null, rest: text }

  let cursor = firstNonEmpty
  const heading = lines[cursor].trim().replace(/^#+\s*/, '')
  if (/^先看这里[:：]?$/.test(heading)) cursor += 1

  const take = (labels: string[]): string | null => {
    const raw = lines[cursor]?.trim() ?? ''
    const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
    const re = new RegExp(`^(?:[-*]\\s*)?(?:${escaped})[：:]\\s*(.+)$`)
    const match = raw.match(re)
    if (!match) return null
    cursor += 1
    return match[1].trim()
  }

  const conclusion = take(['当前判断', '结论'])
  const action = take(['建议动作', '优先行动', '今天先做', '今天可以先确认', '今天先确认', '先做'])
  const avoid = take(['暂缓事项', '先避免', '暂时不要', '暂时不要做', '先不要做'])
  if (!conclusion || !action) return { firstLook: null, rest: text }

  while (cursor < lines.length && lines[cursor].trim() === '') cursor += 1
  return {
    firstLook: { conclusion, action, avoid },
    rest: lines.slice(cursor).join('\n').trimStart(),
  }
}

function cleanDisplayText(text: string): string {
  return text.replace(/\uFFFD+/g, '…')
}

function userSafeDetail(detail: string): string {
  const text = detail.trim()
  if (!text) return ''
  if (looksTechnicalDetail(text)) return '可以重新生成，或稍后再试。'
  return `原因：${cleanDisplayText(text)}`
}

function looksTechnicalDetail(text: string): boolean {
  return /(api[_ -]?key|not set|deepseek|openai|anthropic|vercel|postgres|database|stack|trace|undefined|null|fetch failed|econn|http\s?\d{3})/i.test(text)
}

// 0.6 Pack 2.3 — follow-up chain display.
//
// Renders the rounds of a multi-turn consultation in chronological
// order with the current row visually marked. Each non-current row is
// a Link to its own /c/[id] view so users can jump back to read a
// specific round in isolation.
function ChainBlock({ chain, currentId }: { chain: AiConsultation[]; currentId: string }) {
  if (chain.length <= 1) return null
  return (
    <Surface className="space-y-3">
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
        <SectionLabel>
          这条咨询包含 {chain.length} 轮（原问题 + {chain.length - 1} 次补充）
        </SectionLabel>
      </div>
      <ol className="space-y-2">
        {chain.map((entry, idx) => {
          const isCurrent = entry.id === currentId
          const labelPrefix = idx === 0 ? '原问题' : `第 ${idx + 1} 轮 · 补充 ${idx}`
          const inner = (
            <div className={
              `rounded-card border px-3 py-2 ${
                isCurrent
                  ? 'border-[var(--tebiq-ink-blue)] bg-[var(--tebiq-soft-gray)]/50'
                  : 'border-[var(--tebiq-soft-gray)]'
              }`
            }>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wide text-[var(--tebiq-deep-slate)]">
                  {labelPrefix}
                </span>
                <span className="text-[10px] text-[var(--tebiq-cool-gray)]">
                  {new Date(entry.createdAt).toLocaleString('zh-CN')}
                </span>
                {isCurrent && (
                  <span className="rounded-full border border-[var(--tebiq-ink-blue)] px-2 py-0.5 text-[10px] font-medium text-[var(--tebiq-ink-blue)]">
                    当前查看
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[var(--tebiq-ink-blue)]">
                {entry.userQuestionText}
              </p>
            </div>
          )
          return (
            <li key={entry.id}>
              {isCurrent ? inner : <Link href={`/c/${encodeURIComponent(entry.id)}`}>{inner}</Link>}
            </li>
          )
        })}
      </ol>
      <p className="text-[11px] text-[var(--tebiq-cool-gray)]">
        这些记录属于同一次咨询。你可以按顺序回看原问题、补充内容和每轮回答。
      </p>
    </Surface>
  )
}
