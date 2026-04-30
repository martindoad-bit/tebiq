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
  if (params.event_id === 'demo') return <TimelineDemoDetail />

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
  const nextSteps = extractNextSteps(event.eventPayload, event.eventType)

  return (
    <AppShell appBar={<AppBar title="提醒详情" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <Archive size={19} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-medium text-ash">{formatDateTime(event.createdAt)}</p>
            <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
              {eventTitle(event)}
            </h1>
            <p className="mt-1 text-[12px] leading-[1.6] text-ash">{eventSubline(event)}</p>
          </div>
          <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
            {event.archived ? '已归档' : eventTypeLabel(event.eventType)}
          </span>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <h2 className="text-[13px] font-medium text-ink">记录内容</h2>
        <dl className="mt-3 grid gap-2 text-[12px]">
          <InfoRow label="文书" value={event.docType} empty="暂未记录文书类型" />
          <InfoRow label="来源" value={event.issuer} empty="暂未记录来源机构" />
          <InfoRow label="期限" value={event.deadline} empty="暂未记录期限" />
          <InfoRow label="金额" value={event.amount ? formatAmount(event.amount) : null} empty="暂未记录金额" />
          <InfoRow label="记录来源" value={sourceLabel(event.sourceRecordType, event.eventType)} empty="TEBIQ 记录" />
        </dl>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <h2 className="text-[13px] font-medium text-ink">下一步</h2>
        <ol className="mt-3 grid gap-2">
          {nextSteps.map((step, index) => (
            <li key={step} className="grid grid-cols-[24px_1fr] gap-2 text-[12px] leading-[1.65] text-slate">
              <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <TimelineEventActions
        eventId={event.id}
        initialNote={event.userNote}
        initialTags={event.tags}
        archived={event.archived}
      />

      {related.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
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

function TimelineDemoDetail() {
  return (
    <AppShell appBar={<AppBar title="提醒详情" back />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <Archive size={19} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-medium text-ash">2026/05/15</p>
            <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
              住民税 納付通知書
            </h1>
            <p className="mt-1 text-[12px] leading-[1.6] text-ash">
              江戸川区役所 / 期限 2026-06-30 / 已识别
            </p>
          </div>
          <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
            已识别
          </span>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <h2 className="text-[13px] font-medium text-ink">记录内容</h2>
        <dl className="mt-3 grid gap-2 text-[12px]">
          <InfoRow label="文书" value="住民税 納付通知書" empty="暂未记录文书类型" />
          <InfoRow label="来源" value="江戸川区役所" empty="暂未记录来源机构" />
          <InfoRow label="期限" value="2026-06-30" empty="暂未记录期限" />
          <InfoRow label="金额" value="¥38,500" empty="暂未记录金额" />
          <InfoRow label="记录来源" value="文书识别" empty="TEBIQ 记录" />
        </dl>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
        <h2 className="text-[13px] font-medium text-ink">下一步</h2>
        <ol className="mt-3 grid gap-2">
          {['确认原文件上的納付期限。', '按原文件金额缴纳。', '保留缴费记录。'].map((step, index) => (
            <li key={step} className="grid grid-cols-[24px_1fr] gap-2 text-[12px] leading-[1.65] text-slate">
              <span className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-paper text-[11px] tabular-nums text-ink">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </AppShell>
  )
}

function InfoRow({ label, value, empty }: { label: string; value: string | null; empty: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3 rounded-[10px] bg-canvas px-3 py-2">
      <dt className="text-ash">{label}</dt>
      <dd className="min-w-0 truncate text-ink">{value ?? empty}</dd>
    </div>
  )
}

function sourceLabel(sourceRecordType: string | null, eventType: string): string {
  if (sourceRecordType === 'document') return '文书识别'
  if (sourceRecordType === 'quiz_result') return '材料准备检查'
  if (sourceRecordType === 'text_understand') return '文字整理'
  if (eventType === 'policy_match') return '政策匹配'
  if (eventType === 'manual_note') return '手动记录'
  return eventTypeLabel(eventType)
}

function formatAmount(amount: unknown): string {
  const value = String(amount).trim()
  if (!value) return ''
  return value.startsWith('¥') ? value : `¥${value}`
}

function extractNextSteps(payload: Record<string, unknown>, eventType: string): string[] {
  const direct = pickStringArray(payload, 'generalActions')
    ?? pickStringArray(payload, 'actions')
    ?? pickStringArray(payload, 'nextSteps')
  if (direct && direct.length > 0) return direct.slice(0, 4)

  if (eventType === 'photo_recognition') {
    return ['确认原文件上的期限和金额。', '需要处理的事项先加入提醒。', '保留原文件和处理记录。']
  }
  if (eventType === 'self_check') {
    return ['查看需要补齐的材料项。', '按递交前顺序整理证明文件。', '材料变化后重新检查一次。']
  }
  if (eventType === 'text_understand') {
    return ['保存原文。', '确认文中提到的期限、机构和必要行动。', '需要处理时加入提醒。']
  }
  return ['确认这条记录是否需要处理。', '需要时补充备注或标签。', '处理完成后归档。']
}

function pickStringArray(payload: Record<string, unknown>, key: string): string[] | null {
  const value = payload[key]
  if (!Array.isArray(value)) return null
  const items = value
    .map(item => {
      if (typeof item === 'string') return item.trim()
      if (item && typeof item === 'object' && 'title' in item) {
        const title = (item as { title?: unknown }).title
        return typeof title === 'string' ? title.trim() : ''
      }
      if (item && typeof item === 'object' && 'text' in item) {
        const text = (item as { text?: unknown }).text
        return typeof text === 'string' ? text.trim() : ''
      }
      return ''
    })
    .filter(Boolean)
  return items.length > 0 ? items : null
}
