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
  if (total === 0) return null

  return (
    <details className={cx(
      'rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)]',
      variant === 'compact' ? 'px-3 py-2.5' : 'p-4 sm:p-5',
    )}>
      <summary className="flex cursor-pointer list-none items-center gap-2 text-[13px] font-medium text-[var(--tebiq-ink-blue)]">
        <BookOpen className="h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
        参考资料
        <span className="text-[12px] font-normal text-[var(--tebiq-cool-gray)]">
          {total} 条
        </span>
        <span className="ml-auto text-[11px] font-normal text-[var(--tebiq-cool-gray)]">
          查看来源
        </span>
      </summary>
      <div className="mt-3 space-y-3">
        <p className="text-[12px] leading-relaxed text-[var(--tebiq-deep-slate)]">
          以下信息来自可核对来源，用于辅助理解和整理，不代表官方背书或最终判断。
        </p>
        {injected.length > 0 && (
          <FactReferenceGroup label="已引用资料" cards={injected} />
        )}
        {hintOnly.length > 0 && (
          <FactReferenceGroup label="需核对信息" cards={hintOnly} />
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
  return (
    <li className="flex flex-col gap-1 rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)]/30 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[13px] font-medium text-[var(--tebiq-ink-blue)]">
          {card.title?.trim() || 'TEBIQ 知识资料'}
        </span>
        {sourceLabels.length > 0 && (
          <span className="rounded-full border border-[var(--tebiq-cool-gray)] px-2 py-0.5 text-[10px] text-[var(--tebiq-deep-slate)]">
            官方来源
          </span>
        )}
        {isHighRisk && (
          <span className="rounded-full border border-[var(--tebiq-warm-amber)] px-2 py-0.5 text-[10px] text-[var(--tebiq-deep-slate)]">
            需尽快确认
          </span>
        )}
      </div>
      {sourceLabels.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-[var(--tebiq-cool-gray)]">
          {sourceLabels.slice(0, 3).map(source => (
            <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener" className="truncate hover:underline">
              {source.label}
            </a>
          ))}
          {sourceLabels.length > 3 && (
            <span>另有 {sourceLabels.length - 3} 个来源</span>
          )}
        </div>
      )}
      {card.needs_review_flags.length > 0 && (
        <p className="text-[11px] leading-relaxed text-[var(--tebiq-cool-gray)]">
          有些细节仍需结合材料或窗口说明核对。
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
  if (/digital\.go\.jp$/i.test(host)) return '数字厅'
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
