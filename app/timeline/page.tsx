import Link from 'next/link'
import type { ReactNode } from 'react'
import { Filter } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import TrialNotice from '@/app/_components/TrialNotice'
import { DeadlineRow, ListSection, SectionLabel, StatusBadge } from '@/components/ui/tebiq'
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
import { eventSubline, eventTitle, eventTypeLabel } from '@/lib/timeline/display'

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

      <section className="mt-3 border-b border-hairline pb-5">
        <p className="text-[13px] text-ash">已记录</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="numeric text-[52px] font-light leading-none text-ink">{summary.total}</span>
          <span className="text-[17px] text-ink">件</span>
        </p>
        <p className="mt-3 text-[12px] leading-[1.7] text-ash">
          跨越 {summary.monthsCovered} 个月 / 涉及 {summary.issuerCount} 类机构 / {summary.docTypeCount} 类文书
        </p>
      </section>

      <section className="mt-4 rounded-card border border-hairline bg-surface px-3 py-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-ash">
          <Filter size={13} strokeWidth={1.5} />
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

      <SectionLabel title="自查事项" />
      <ListSection className="mt-3">
        {checkItems.length > 0 ? (
          checkItems.map(item => (
            <Link key={item.id} href={`/check/${item.visaType}`} className="flex min-h-[64px] items-center gap-3 border-b border-hairline px-4 last:border-b-0">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium leading-snug text-ink">{item.title}</span>
                <span className="mt-1 block truncate text-[12px] leading-snug text-ash">
                  {item.reason ?? '递交前确认'}
                </span>
              </span>
              <StatusBadge tone="attention">需要补齐</StatusBadge>
            </Link>
          ))
        ) : (
          <p className="px-4 py-5 text-[13px] leading-[1.65] text-ash">
            暂无准备事项。完整材料准备检查完成后会进入这里。
          </p>
        )}
      </ListSection>

      <section className="mt-4 border-b border-hairline pb-4">
        <h2 className="text-[13px] font-medium text-ink">为你跟踪</h2>
        <p className="mt-1.5 text-[12px] leading-[1.65] text-ash">
          {summary.latestDeadline
            ? `当前最早记录期限: ${summary.latestDeadline}`
            : '暂无政策匹配记录。后续 policy_match 事件会进入这里。'}
        </p>
      </section>

      <SectionLabel title="时间线" />
      <ListSection className="mt-3">
        {events.length > 0 ? (
          events.map(event => <TimelineRow key={event.id} event={event} />)
        ) : (
          <TimelineEmptySamples />
        )}
      </ListSection>
    </AppShell>
  )
}

function TimelineEmptySamples() {
  const samples = [
    { date: '06.30', days: '示例', title: '住民税通知', detail: '6月30日 / 待缴' },
    { date: '--.--', days: '示例', title: '在留カード更新', detail: '提前2个月递交' },
    { date: '01.01', days: '示例', title: '学校缴费', detail: '下月1日' },
  ]
  return (
    <div className="opacity-50">
      {samples.map(item => (
        <DeadlineRow
          key={item.title}
          date={item.date}
          days={item.days}
          title={item.title}
          detail={item.detail}
          status="示例"
        />
      ))}
    </div>
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
      className={`flex-shrink-0 rounded-[8px] border px-3 py-1.5 text-[11px] font-normal ${
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
  const deadline = event.deadline ?? formatDateOnly(event.createdAt)
  return (
    <DeadlineRow
      href={`/timeline/${event.id}`}
      date={shortDate(deadline)}
      days={event.deadline ? remainingLabel(event.deadline) : eventTypeLabel(event.eventType)}
      title={eventTitle(event)}
      detail={eventSubline(event)}
      status={event.archived ? '已归档' : eventTypeLabel(event.eventType)}
      urgent={isUrgent(event.deadline)}
    />
  )
}

function formatDateOnly(dateValue: Date | string): string {
  const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function shortDate(dateValue: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ? new Date(`${dateValue}T00:00:00+09:00`)
    : new Date(dateValue)
  if (Number.isNaN(d.getTime())) return '--.--'
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function remainingLabel(deadline: string): string {
  const days = daysUntil(deadline)
  if (days === null) return '期限未识别'
  if (days < 0) return `已过 ${Math.abs(days)} 天`
  if (days === 0) return '今日截止'
  return `剩余 ${days} 天`
}

function isUrgent(deadline: string | null): boolean {
  const days = daysUntil(deadline)
  return days !== null && days < 7
}

function daysUntil(dateValue: string | null): number | null {
  if (!dateValue) return null
  const target = new Date(`${dateValue.slice(0, 10)}T00:00:00+09:00`).getTime()
  if (Number.isNaN(target)) return null
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  const now = new Date(`${today}T00:00:00+09:00`).getTime()
  return Math.ceil((target - now) / 86_400_000)
}
