import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Archive, ChevronRight } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import RelatedKnowledge from '@/app/_components/v5/RelatedKnowledge'
import {
  findRelatedTimelineEvents,
  getTimelineEventForOwner,
} from '@/lib/db/queries/timeline'
import { getTimelineRequestOwner } from '@/lib/timeline/owner'
import { eventSubline, eventTitle, eventTypeLabel, formatDateTime } from '@/lib/timeline/display'
import TimelineEventActions from '../TimelineEventActions'

export const dynamic = 'force-dynamic'

export default async function TimelineEventPage({
  params,
}: {
  params: { event_id: string }
}) {
  const owner = await getTimelineRequestOwner()
  if (!owner.memberId && !owner.sessionId) notFound()
  const event = await getTimelineEventForOwner(params.event_id, {
    memberId: owner.memberId,
    sessionId: owner.sessionId,
  })
  if (!event) notFound()
  const related = await findRelatedTimelineEvents({
    owner: { memberId: owner.memberId, sessionId: owner.sessionId },
    issuer: event.issuer,
    docType: event.docType,
    excludeId: event.id,
    limit: 5,
  })
  const tags = event.tags.length > 0
    ? event.tags
    : [event.docType, event.issuer, event.eventType].filter((v): v is string => Boolean(v))

  return (
    <AppShell appBar={<AppBar title="档案详情" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <Archive size={19} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-medium text-ash">{formatDateTime(event.createdAt)}</p>
            <h1 className="mt-1 text-[17px] font-semibold leading-snug text-ink">
              {eventTitle(event)}
            </h1>
            <p className="mt-1 text-[12px] leading-[1.6] text-ash">{eventSubline(event)}</p>
          </div>
          <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
            {event.archived ? '已归档' : eventTypeLabel(event.eventType)}
          </span>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">结构化记录</h2>
        <dl className="mt-3 grid gap-2 text-[12px]">
          <InfoRow label="类型" value={event.docType} />
          <InfoRow label="机构" value={event.issuer} />
          <InfoRow label="期限" value={event.deadline} />
          <InfoRow label="金额" value={event.amount ? `¥${event.amount}` : null} />
          <InfoRow label="来源" value={event.sourceRecordType} />
        </dl>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">原始结果</h2>
        <pre className="mt-3 max-h-[360px] overflow-auto whitespace-pre-wrap rounded-[12px] bg-canvas p-3 text-[11px] leading-[1.65] text-slate">
          {JSON.stringify(event.eventPayload, null, 2)}
        </pre>
      </section>

      <TimelineEventActions
        eventId={event.id}
        initialNote={event.userNote}
        initialTags={event.tags}
        archived={event.archived}
      />

      {related.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <h2 className="text-[13px] font-medium text-ink">历史关联</h2>
          <ul className="mt-2 divide-y divide-hairline">
            {related.map(item => (
              <li key={item.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link href={`/timeline/${item.id}`} className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-[12px] text-ink">
                    {eventTitle(item)}
                  </span>
                  <ChevronRight size={14} className="text-haze" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <RelatedKnowledge tags={tags} />
    </AppShell>
  )
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 rounded-[10px] bg-canvas px-3 py-2">
      <dt className="text-ash">{label}</dt>
      <dd className="min-w-0 truncate text-ink">{value ?? '未记录'}</dd>
    </div>
  )
}
