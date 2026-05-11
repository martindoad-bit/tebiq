import { BookOpen } from 'lucide-react'
import type { ConsultationFactCardAuditEntry } from '@/lib/consultation/stream-protocol'
import { SectionLabel, cx } from '@/components/ui/consultation-alpha'

type FactReferenceBlockProps = {
  audit: ReadonlyArray<ConsultationFactCardAuditEntry>
  variant?: 'compact' | 'detail'
}

export function FactReferenceBlock({
  audit,
  variant = 'detail',
}: FactReferenceBlockProps) {
  const injected = audit.filter(a => a.decision === 'inject')
  const hintOnly = audit.filter(a => a.decision === 'hint_only')
  const total = injected.length + hintOnly.length
  const reviewCount = audit.filter(a => a.needs_review_flags.length > 0).length
  const sourceBackedCount = audit.filter(a => a.official_sources.length > 0).length
  if (total === 0) return null

  return (
    <details className={cx(
      'rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)]',
      variant === 'compact' ? 'px-3 py-2.5' : 'p-4 sm:p-5',
    )}>
      <summary className="cursor-pointer list-none text-[14px] font-medium text-[var(--tebiq-ink-blue)]">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
          <span>参考资料</span>
          <span className="whitespace-nowrap text-[12.5px] font-normal text-[var(--tebiq-cool-gray)]">
            {total} 条
          </span>
          <span className="ml-auto whitespace-nowrap text-[12px] font-normal text-[var(--tebiq-cool-gray)]">
            展开
          </span>
        </div>
        <p className="mt-1 pl-6 text-[12.5px] font-normal leading-[1.55] text-[var(--tebiq-cool-gray)]">
          {sourceBackedCount > 0
            ? `本回答参考了 ${total} 条资料，其中 ${sourceBackedCount} 条有来源链接。`
            : `本回答参考了 ${total} 条资料，来源仍需补齐。`}
          {reviewCount > 0 ? ' 部分细节需核对。' : ' '}
          不代表官方背书或最终判断。
        </p>
      </summary>
      <div className="mt-3 space-y-3">
        <p className="text-[13px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          可以打开来源确认原文。具体期限、手续和个案判断，仍以官方窗口或专业意见为准。
        </p>
        {injected.length > 0 && (
          <FactReferenceGroup label="可核对资料" cards={injected} />
        )}
        {hintOnly.length > 0 && (
          <FactReferenceGroup label="需核对资料" cards={hintOnly} />
        )}
      </div>
    </details>
  )
}

function FactReferenceGroup({
  label,
  cards,
}: {
  label: string
  cards: ReadonlyArray<ConsultationFactCardAuditEntry>
}) {
  return (
    <div className="space-y-2">
      <SectionLabel>{label}</SectionLabel>
      <ul className="space-y-1.5">
        {cards.map(card => <FactReferenceRow key={card.fact_id} card={card} />)}
      </ul>
    </div>
  )
}

function FactReferenceRow({ card }: { card: ConsultationFactCardAuditEntry }) {
  const isHighRisk = card.risk_level === 'high' || card.risk_level === 'critical'
  const sourceLabels = sourceDisplayLabels(card.official_sources)
  const sourceBadge = sourceLabels.length > 0
    ? card.needs_review_flags.length > 0 ? '需核对' : '来源链接'
    : '待补来源'
  return (
    <li className="flex flex-col gap-1 rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)]/30 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[14px] font-medium text-[var(--tebiq-ink-blue)]">
          {card.title?.trim() || 'TEBIQ 知识资料'}
        </span>
        <span className="whitespace-nowrap rounded-full border border-[var(--tebiq-cool-gray)] px-2 py-0.5 text-[11px] text-[var(--tebiq-deep-slate)]">
          {sourceBadge}
        </span>
        {isHighRisk && (
          <span className="whitespace-nowrap rounded-full border border-[var(--tebiq-warm-amber)] px-2 py-0.5 text-[11px] text-[var(--tebiq-deep-slate)]">
            需尽快确认
          </span>
        )}
      </div>
      {sourceLabels.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[var(--tebiq-cool-gray)]">
          {sourceLabels.slice(0, 3).map(source => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener" className="min-w-0 max-w-full truncate hover:underline">
              {source.label}
            </a>
          ))}
          {sourceLabels.length > 3 && (
            <span>另有 {sourceLabels.length - 3} 个来源</span>
          )}
        </div>
      )}
      {card.needs_review_flags.length > 0 && (
        <p className="text-[12px] leading-relaxed text-[var(--tebiq-cool-gray)]">
          部分细节还需要结合材料或窗口说明核对，不能只凭这一条直接行动。
        </p>
      )}
    </li>
  )
}

function sourceDisplayLabels(urls: ReadonlyArray<string>): Array<{ label: string; url: string }> {
  const out: Array<{ label: string; url: string }> = []
  const seen = new Set<string>()
  for (const url of urls) {
    const label = sourceLabelFor(url)
    const key = `${label}|${hostnameOf(url)}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ label, url })
  }
  return out
}

function sourceLabelFor(url: string): string {
  const host = hostnameOf(url)
  if (/moj\.go\.jp$/i.test(host)) return '法务省 / 入管'
  if (/mhlw\.go\.jp$/i.test(host)) return '厚生劳动省'
  if (/nenkin\.go\.jp$/i.test(host)) return '日本年金机构'
  if (/soumu\.go\.jp$/i.test(host)) return '总务省'
  if (/nta\.go\.jp$/i.test(host)) return '国税厅'
  if (/digital\.go\.jp$/i.test(host)) return '数字厅'
  if (/kyoukaikenpo\.or\.jp$/i.test(host)) return '协会健保'
  if (/\.go\.jp$/i.test(host)) return '日本政府官网'
  if (/\.lg\.jp$/i.test(host)) return '自治体官网'
  return host
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.slice(0, 32)
  }
}
