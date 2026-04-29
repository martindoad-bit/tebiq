import Link from 'next/link'
import type { ReactNode } from 'react'
import { Archive, ChevronRight, Filter } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import TrialNotice from '@/app/_components/TrialNotice'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { getMemberAccess } from '@/lib/billing/access'
import { listNeedsActionDimensions } from '@/lib/db/queries/checkDimensions'
import {
  archiveExpiredTimelineEventsForMember,
  getTimelineSummary,
  listTimelineEvents,
  type TimelineEventType,
} from '@/lib/db/queries/timeline'
import type { Member, TimelineEvent } from '@/lib/db/schema'
import { eventSubline, eventTitle, eventTypeLabel, formatDateTime } from '@/lib/timeline/display'

export const dynamic = 'force-dynamic'

const EVENT_TYPES: Array<{ value: TimelineEventType; label: string }> = [
  { value: 'photo_recognition', label: '拍照' },
  { value: 'text_understand', label: '文字' },
  { value: 'self_check', label: '自查' },
  { value: 'policy_match', label: '政策' },
  { value: 'manual_note', label: '手动' },
]

export default async function TimelinePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const user = await safeGetCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  if (user) await safeArchiveExpired(user)
  const owner = { memberId: user?.id ?? null, sessionId }
  const eventType = single(searchParams?.event_type) as TimelineEventType | undefined
  const includeArchived = single(searchParams?.archived) === 'true'
  const [summary, events, access, checkItems] = await Promise.all([
    safeSummary(owner),
    safeEvents(owner, eventType, includeArchived),
    user ? getMemberAccess(user) : null,
    listNeedsActionDimensions(owner, 5).catch(() => []),
  ])

  return (
    <AppShell appBar={<AppBar title="我的提醒" />} tabBar={<TabBar />}>
      {access && (
        <TrialNotice
          trialActive={access.trialActive}
          trialExpired={access.trialExpired}
          daysRemaining={access.trialDaysRemaining}
          needsFirstPhoto={summary.documents === 0}
        />
      )}

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <Archive size={19} strokeWidth={1.55} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-[16px] font-semibold text-ink">已记录 {summary.total} 件事</h1>
            <p className="mt-1 text-[12px] leading-[1.65] text-ash">
              跨越 {summary.monthsCovered} 个月 / 涉及 {summary.issuerCount} 类机构 / {summary.docTypeCount} 类文书
            </p>
          </div>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-3 py-3 shadow-card">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-ash">
          <Filter size={13} strokeWidth={1.55} />
          过滤器
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterLink href="/timeline" active={!eventType && !includeArchived}>全部</FilterLink>
          {EVENT_TYPES.map(item => (
            <FilterLink
              key={item.value}
              href={`/timeline?event_type=${item.value}`}
              active={eventType === item.value}
            >
              {item.label}
            </FilterLink>
          ))}
          <FilterLink href="/timeline?archived=true" active={includeArchived}>已归档</FilterLink>
        </div>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">自查事项</h2>
        {checkItems.length > 0 ? (
          <ul className="mt-2 divide-y divide-hairline">
            {checkItems.map(item => (
              <li key={item.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link href={`/check/${item.visaType}`} className="flex items-center justify-between gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 block truncate text-[10.5px] text-ash">
                      {item.reason ?? '递交前确认'}
                    </span>
                  </span>
                  <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
                    需处理
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-[12px] leading-[1.65] text-ash">
            暂无自查事项。完整自查完成后会进入这里。
          </p>
        )}
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">为你跟踪</h2>
        <p className="mt-1.5 text-[12px] leading-[1.65] text-ash">
          {summary.latestDeadline
            ? `当前最早记录期限: ${summary.latestDeadline}`
            : '暂无政策匹配记录。后续 policy_match 事件会进入这里。'}
        </p>
      </section>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        {events.length > 0 ? (
          <ul className="divide-y divide-hairline">
            {events.map(event => (
              <TimelineRow key={event.id} event={event} />
            ))}
          </ul>
        ) : (
          <p className="text-[12px] leading-[1.65] text-ash">暂无匹配记录。</p>
        )}
      </section>
    </AppShell>
  )
}

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

async function safeGetCurrentUser(): Promise<Member | null> {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

async function safeArchiveExpired(user: Member) {
  try {
    await archiveExpiredTimelineEventsForMember(user)
  } catch {
    // timeline should still render.
  }
}

async function safeSummary(owner: { memberId: string | null; sessionId: string | null }) {
  if (!owner.memberId && !owner.sessionId) {
    return {
      total: 0,
      archived: 0,
      active: 0,
      selfChecks: 0,
      documents: 0,
      textUnderstands: 0,
      monthsCovered: 0,
      issuerCount: 0,
      docTypeCount: 0,
      latestDeadline: null,
    }
  }
  try {
    return await getTimelineSummary(owner)
  } catch {
    return {
      total: 0,
      archived: 0,
      active: 0,
      selfChecks: 0,
      documents: 0,
      textUnderstands: 0,
      monthsCovered: 0,
      issuerCount: 0,
      docTypeCount: 0,
      latestDeadline: null,
    }
  }
}

async function safeEvents(
  owner: { memberId: string | null; sessionId: string | null },
  eventType: TimelineEventType | undefined,
  includeArchived: boolean,
) {
  if (!owner.memberId && !owner.sessionId) return []
  try {
    return await listTimelineEvents(owner, {
      eventType,
      includeArchived,
      archived: includeArchived ? true : null,
      limit: 80,
    })
  } catch {
    return []
  }
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={`flex-shrink-0 rounded-[10px] border px-3 py-1.5 text-[11px] font-medium ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-hairline bg-canvas text-slate'
      }`}
    >
      {children}
    </Link>
  )
}

function TimelineRow({ event }: { event: TimelineEvent }) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <Link href={`/timeline/${event.id}`} className="group flex items-center gap-3">
        <span className="w-[72px] flex-shrink-0 text-[10.5px] text-ash">
          {formatDateTime(event.createdAt)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium text-ink">{eventTitle(event)}</span>
          <span className="mt-1 block truncate text-[10.5px] text-ash">{eventSubline(event)}</span>
        </span>
        <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
          {event.archived ? '已归档' : eventTypeLabel(event.eventType)}
        </span>
        <ChevronRight size={14} className="text-haze group-hover:text-ink" />
      </Link>
    </li>
  )
}
