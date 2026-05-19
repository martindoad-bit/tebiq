import { FileText } from 'lucide-react'
import type { ConsultationFactCardAuditEntry } from '@/lib/consultation/stream-protocol'
import {
  getQuickReferenceTopicHref,
  getQuickReferenceTopicsForFactCards,
  type QuickReferenceTopic,
} from '@/lib/quick-reference/topics'

export function QuickReferenceBridge({
  audit,
}: {
  audit: ReadonlyArray<ConsultationFactCardAuditEntry>
}) {
  const topics = getQuickReferenceTopicsForFactCards(
    audit
      .filter(card => card.decision === 'inject' || card.decision === 'hint_only')
      .map(card => card.fact_id),
    2,
  )
  if (topics.length === 0) return null

  return (
    <details className="group rounded-[12px] border border-[var(--tebiq-soft-gray)] bg-white px-3 py-2.5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13.5px] text-[var(--tebiq-deep-slate)] marker:hidden">
        <span className="inline-flex min-w-0 items-center gap-2">
          <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
          <span className="truncate">相关材料 {topics.length} 项</span>
        </span>
        <span aria-hidden="true" className="shrink-0 text-[15px] text-[var(--tebiq-cool-gray)] transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="mt-3 flex flex-wrap gap-2">
        {topics.map(topic => (
          <QuickReferenceLink key={topic.id} topic={topic} />
        ))}
      </div>
    </details>
  )
}

function QuickReferenceLink({ topic }: { topic: QuickReferenceTopic }) {
  return (
    <a
      href={getQuickReferenceTopicHref(topic.id)}
      className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-2.5 text-[13px] font-medium leading-none text-[var(--tebiq-ink-blue)]"
    >
      <span className="min-w-0 truncate">{topic.title}</span>
      <span aria-hidden="true" className="shrink-0">→</span>
    </a>
  )
}
