import { BookOpen, ExternalLink } from 'lucide-react'
import type {
  ConsultationEvidenceSupportLevel,
  ConsultationFactCardAuditEntry,
} from '@/lib/consultation/stream-protocol'
import { cx } from '@/components/ui/consultation-alpha'

type FactReferenceBlockProps = {
  audit: ReadonlyArray<ConsultationFactCardAuditEntry>
  variant?: 'compact' | 'detail'
}

type ReferenceItem = {
  key: string
  title: string
  url: string
  organization: string
  locator?: string
  claim?: string
  support: ConsultationEvidenceSupportLevel | 'official'
  needsDomainReview: boolean
}

export function FactReferenceBlock({
  audit,
  variant = 'detail',
}: FactReferenceBlockProps) {
  const cards = audit
    .filter(a => a.decision === 'inject' || a.decision === 'hint_only')
    .map(card => ({ card, items: referenceItemsFor(card) }))
    .filter(entry => entry.items.length > 0)

  if (cards.length === 0) return null

  const exactCount = cards.reduce(
    (count, entry) => count + entry.items.filter(item => item.support === 'direct').length,
    0,
  )
  const reviewCount = cards.reduce(
    (count, entry) => count + entry.items.filter(item => item.needsDomainReview).length,
    0,
  )

  return (
    <section className={cx(
      'rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)]',
      variant === 'compact' ? 'px-3 py-2.5' : 'p-4 sm:p-5',
    )}>
      <div className="flex items-start gap-2.5">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.7} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2 className="text-[15.5px] font-medium leading-snug text-[var(--tebiq-ink-blue)]">
              参考资料
            </h2>
            <span className="rounded-full bg-[var(--tebiq-soft-gray)] px-2 py-0.5 text-[12px] text-[var(--tebiq-cool-gray)]">
              {cards.length} 条
            </span>
            {exactCount > 0 && (
              <span className="rounded-full bg-[var(--tebiq-soft-blue)] px-2 py-0.5 text-[12px] text-[var(--tebiq-ink-blue)]">
                {exactCount} 条直接依据
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[12.5px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
            这些资料用于核对信息，不代表官方背书或个案最终判断。
            {reviewCount > 0 ? ' 部分资料仍需结合个案确认。' : ''}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {cards.map(({ card, items }) => (
          <FactReferenceCard
            key={card.fact_id}
            card={card}
            items={items}
          />
        ))}
      </div>
    </section>
  )
}

function FactReferenceCard({
  card,
  items,
}: {
  card: ConsultationFactCardAuditEntry
  items: ReferenceItem[]
}) {
  const isHighRisk = card.risk_level === 'high' || card.risk_level === 'critical'
  const groupLabel = card.decision === 'hint_only' || card.needs_review_flags.length > 0
    ? '需核对'
    : '已用于回答'

  return (
    <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-white px-3.5 py-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-[var(--tebiq-ink-blue)]">
          {card.title?.trim() || 'TEBIQ 知识资料'}
        </span>
        <span className="whitespace-nowrap rounded-full bg-[var(--tebiq-soft-gray)] px-2 py-0.5 text-[11.5px] text-[var(--tebiq-deep-slate)]">
          {groupLabel}
        </span>
        {isHighRisk && (
          <span className="whitespace-nowrap rounded-full border border-[var(--tebiq-warm-amber)] px-2 py-0.5 text-[11.5px] text-[var(--tebiq-deep-slate)]">
            高风险
          </span>
        )}
      </div>

      <ul className="mt-3 space-y-2">
        {items.slice(0, 3).map(item => (
          <li key={item.key}>
            <ReferenceLink item={item} />
          </li>
        ))}
      </ul>

      {items.length > 3 && (
        <p className="mt-2 text-[12px] text-[var(--tebiq-cool-gray)]">
          另有 {items.length - 3} 条来源，已保留在记录中。
        </p>
      )}

      {card.needs_review_flags.length > 0 && (
        <p className="mt-2.5 text-[12px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
          这条资料有些细节需要结合材料或窗口说明再核对，不能只凭这一条直接行动。
        </p>
      )}
    </div>
  )
}

function ReferenceLink({ item }: { item: ReferenceItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring group block rounded-[10px] border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3 py-3 text-[13px] text-[var(--tebiq-deep-slate)] active:bg-[var(--tebiq-soft-gray)]"
    >
      <div className="flex min-w-0 items-start gap-2">
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-white px-2 py-0.5 text-[11.5px] text-[var(--tebiq-deep-slate)]">
              {supportLabel(item)}
            </span>
            <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug text-[var(--tebiq-ink-blue)] line-clamp-2">
              {item.title}
            </span>
          </span>
          <span className="mt-1 block text-[12px] leading-[1.55] text-[var(--tebiq-cool-gray)]">
            {item.organization}
            {item.locator ? ` · 原文位置：${item.locator}` : ''}
          </span>
          {item.claim && (
            <span className="mt-1 block text-[12.5px] leading-[1.55] text-[var(--tebiq-deep-slate)]">
              对应：{item.claim}
            </span>
          )}
          <span className="mt-2 inline-flex min-h-8 items-center rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-2.5 text-[12.5px] font-medium text-[var(--tebiq-ink-blue)]">
            查看原文
          </span>
        </span>
        <ExternalLink
          className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--tebiq-cool-gray)] transition-colors group-hover:text-[var(--tebiq-ink-blue)]"
          strokeWidth={1.7}
        />
      </div>
    </a>
  )
}

function referenceItemsFor(card: ConsultationFactCardAuditEntry): ReferenceItem[] {
  const evidence = card.evidence_points
    .filter(point => point.user_visible !== false)
    .map((point, index): ReferenceItem => ({
      key: `evidence-${card.fact_id}-${index}-${point.source_url}`,
      title: point.display_label || point.source_title,
      url: point.source_url,
      organization: point.source_organization || sourceLabelFor(point.source_url),
      locator: point.source_locator,
      claim: point.claim,
      support: point.support_level,
      needsDomainReview: point.needs_domain_review,
    }))

  if (evidence.length > 0) return dedupeReferenceItems(evidence)

  const related = card.related_links.map((link, index): ReferenceItem => ({
    key: `related-${card.fact_id}-${index}-${link.url}`,
    title: link.display_label || link.title,
    url: link.url,
    organization: link.organization || sourceLabelFor(link.url),
    locator: link.locator,
    support: 'background',
    needsDomainReview: card.needs_review_flags.length > 0,
  }))

  if (related.length > 0) return dedupeReferenceItems(related)

  return dedupeReferenceItems(card.official_sources.map((url, index): ReferenceItem => ({
    key: `source-${card.fact_id}-${index}-${url}`,
    title: sourceTitleFor(url),
    url,
    organization: sourceLabelFor(url),
    support: 'official',
    needsDomainReview: card.needs_review_flags.length > 0,
  })))
}

function dedupeReferenceItems(items: ReferenceItem[]): ReferenceItem[] {
  const seen = new Set<string>()
  return items.filter(item => {
    const key = `${item.url}|${item.claim ?? item.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function supportLabel(item: ReferenceItem): string {
  if (item.needsDomainReview) return '需核对'
  if (item.support === 'direct') return '直接依据'
  if (item.support === 'indirect') return '相关参考'
  if (item.support === 'official') return '相关页面'
  return '背景资料'
}

function sourceTitleFor(url: string): string {
  const label = sourceLabelFor(url)
  return label === '官方资料' ? hostnameOf(url) : `${label}：相关页面`
}

function sourceLabelFor(url: string): string {
  const host = hostnameOf(url)
  if (/moj\.go\.jp$/i.test(host) || /isa\.go\.jp$/i.test(host)) return '出入国在留管理庁'
  if (/mhlw\.go\.jp$/i.test(host)) return '厚生労働省'
  if (/nenkin\.go\.jp$/i.test(host)) return '日本年金機構'
  if (/soumu\.go\.jp$/i.test(host)) return '総務省'
  if (/nta\.go\.jp$/i.test(host)) return '国税庁'
  if (/digital\.go\.jp$/i.test(host)) return 'デジタル庁'
  if (/kyoukaikenpo\.or\.jp$/i.test(host)) return '全国健康保険協会'
  if (/mlit\.go\.jp$/i.test(host)) return '国土交通省'
  if (/fsa\.go\.jp$/i.test(host)) return '金融庁'
  if (/cfa\.go\.jp$/i.test(host)) return 'こども家庭庁'
  if (/mext\.go\.jp$/i.test(host)) return '文部科学省'
  if (/npa\.go\.jp$/i.test(host)) return '警察庁'
  if (/mofa\.go\.jp$/i.test(host)) return '外務省'
  if (/laws\.e-gov\.go\.jp$/i.test(host) || /elaws\.e-gov\.go\.jp$/i.test(host)) return 'e-Gov法令検索'
  if (/\.lg\.jp$/i.test(host)) return '自治体官网'
  if (/\.go\.jp$/i.test(host)) return '日本政府官网'
  return '官方资料'
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.slice(0, 32)
  }
}
