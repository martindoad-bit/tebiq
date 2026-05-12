import { FileText } from 'lucide-react'
import type { ConsultationFactCardAuditEntry } from '@/lib/consultation/stream-protocol'
import {
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
      .filter(
        (card) => card.decision === 'inject' || card.decision === 'hint_only',
      )
      .map((card) => card.fact_id),
    2,
  )
  if (topics.length === 0) return null

  return (
    <div className="rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] px-3.5 py-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <FileText
          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-ink-blue)]"
          strokeWidth={1.6}
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-medium leading-snug text-[var(--tebiq-ink-blue)]">
            也可以看清单
          </p>
          <p className="mt-1 text-[12.5px] leading-[1.6] text-[var(--tebiq-cool-gray)]">
            有对应材料时，可以直接看清单、取得方式和来源。
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <QuickReferenceLink key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickReferenceLink({ topic }: { topic: QuickReferenceTopic }) {
  return (
    <a
      href={`/quick-reference#${encodeURIComponent(topic.id)}`}
      className="inline-flex min-h-9 max-w-full items-center gap-1.5 rounded-btn border border-[var(--tebiq-soft-gray)] bg-white px-2.5 text-[13px] font-medium leading-none text-[var(--tebiq-ink-blue)]"
    >
      <span className="min-w-0 truncate">{topic.title}</span>
      <span aria-hidden="true" className="shrink-0">
        →
      </span>
    </a>
  )
}
