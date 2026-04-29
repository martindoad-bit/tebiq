import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Bell,
  Camera,
  ChevronRight,
  ClipboardCheck,
  TimerReset,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT, type EventName } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import { getMemberAccess, getTimelineRetentionCutoff, type MemberAccess } from '@/lib/billing/access'
import { listNeedsActionDimensions } from '@/lib/db/queries/checkDimensions'
import { listTimelineEvents } from '@/lib/db/queries/timeline'
import type { Member, TimelineEvent } from '@/lib/db/schema'
import { eventSubline, eventTitle } from '@/lib/timeline/display'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await safeGetCurrentUser()

  if (!user) {
    return (
      <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
        <NewUserHome />
      </AppShell>
    )
  }

  const owner = { memberId: user.id, sessionId: null }
  const retentionCutoff = await safeRetentionCutoff(user)
  const [events, access, checkItems] = await Promise.all([
    safeTimelineEvents(owner, retentionCutoff, 80),
    safeAccess(user),
    listNeedsActionDimensions(owner, 20).catch(() => []),
  ])
  const upcoming = buildUpcoming(events)
  const hasPhoto = events.some(event => event.eventType === 'photo_recognition')
  const hasSelfCheck = events.some(event => event.eventType === 'self_check') || checkItems.length > 0
  const hasArchiveData = events.length > 0 || checkItems.length > 0 || Boolean(user.visaExpiry)

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <UserHome
        user={user}
        access={access}
        upcoming={upcoming}
        needsActionCount={checkItems.length}
        hasArchiveData={hasArchiveData}
        hasPhoto={hasPhoto}
        hasSelfCheck={hasSelfCheck}
      />
    </AppShell>
  )
}

function NewUserHome() {
  return (
    <>
      <BrandStrip />

      <section className="mt-5">
        <h1 className="text-[26px] font-semibold leading-none text-ink">TEBIQ</h1>
        <p className="mt-3 text-[13px] leading-[1.7] text-slate">
          在日生活的日文文书识别和提醒
        </p>
        <div className="mt-5 grid gap-2.5">
          <TrackedLink
            href="/photo"
            eventName={EVENT.HOME_PHOTO_CARD_CLICK}
            className="flex min-h-[46px] items-center justify-center rounded-btn bg-ink px-4 text-[13px] font-medium text-white shadow-cta active:translate-y-px"
          >
            拍一份文书试试
          </TrackedLink>
          <TrackedLink
            href="/check"
            eventName={EVENT.HOME_CHECK_CARD_CLICK}
            className="flex min-h-[46px] items-center justify-center rounded-btn border border-hairline bg-surface px-4 text-[13px] font-medium text-ink shadow-card active:translate-y-px"
          >
            做一次续签自查
          </TrackedLink>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="px-0.5 text-[13px] font-medium text-ink">常用工具</h2>
        <div className="mt-2.5 rounded-card border border-hairline bg-surface shadow-card">
          <ToolRow
            title="拍照即懂"
            desc="识别日文文书"
            href="/photo"
            icon={<Camera size={18} strokeWidth={1.55} />}
            eventName={EVENT.HOME_PHOTO_CARD_CLICK}
          />
          <ToolRow
            title="续签自查"
            desc="当前风险点"
            href="/check"
            icon={<ClipboardCheck size={18} strokeWidth={1.55} />}
            eventName={EVENT.HOME_CHECK_CARD_CLICK}
          />
          <ToolRow
            title="我的提醒"
            desc="期限事项"
            href="/timeline"
            icon={<TimerReset size={18} strokeWidth={1.55} />}
          />
        </div>
      </section>

      <section className="mt-5 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <p className="text-[12px] leading-[1.65] text-ash">
          还没识别文书。先拍一张试试。
        </p>
      </section>
    </>
  )
}

function UserHome({
  user,
  access,
  upcoming,
  needsActionCount,
  hasArchiveData,
  hasPhoto,
  hasSelfCheck,
}: {
  user: Member
  access: MemberAccess | null
  upcoming: TimelineEvent[]
  needsActionCount: number
  hasArchiveData: boolean
  hasPhoto: boolean
  hasSelfCheck: boolean
}) {
  const daysToExpiry = daysUntilJst(user.visaExpiry)
  const next30Count = upcoming.length
  const showTrial = access?.trialActive && access.trialDaysRemaining !== null

  return (
    <>
      <BrandStrip />
      {showTrial && <TrialStrip days={access.trialDaysRemaining ?? 0} />}

      <section className="mt-4 rounded-card border border-hairline bg-surface px-4 shadow-card">
        <OverviewRow
          label="在留卡"
          value={visaOverview(user, daysToExpiry)}
          href="/my/profile"
        />
        <OverviewRow
          label="自查事项"
          value={needsActionCount > 0 ? `你有 ${needsActionCount} 项需处理` : hasSelfCheck ? '当前无需处理项' : '做一次自查看看'}
          href={needsActionCount > 0 || !hasSelfCheck ? '/check' : '/timeline'}
        />
        <OverviewRow
          label="接下来30天"
          value={`${next30Count} 件期限事项`}
          href="/timeline"
          last
        />
      </section>

      {!hasArchiveData && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
          <p className="text-[12px] leading-[1.65] text-ash">
            当前记录为空。可以先拍一份文书，或做一次续签自查。
          </p>
        </section>
      )}

      <section className="mt-5">
        <h2 className="px-0.5 text-[13px] font-medium text-ink">常用工具</h2>
        <div className="mt-2.5 rounded-card border border-hairline bg-surface shadow-card">
          <ToolRow
            title="拍照即懂"
            desc={hasPhoto ? '识别日文文书' : '拍一份文书试试'}
            href="/photo"
            icon={<Camera size={18} strokeWidth={1.55} />}
            eventName={EVENT.HOME_PHOTO_CARD_CLICK}
          />
          <ToolRow
            title="续签自查"
            desc={needsActionCount > 0 ? `${needsActionCount} 项需处理` : hasSelfCheck ? '当前风险点' : '做一次自查看看'}
            href="/check"
            icon={<ClipboardCheck size={18} strokeWidth={1.55} />}
            eventName={EVENT.HOME_CHECK_CARD_CLICK}
          />
          <ToolRow
            title="我的提醒"
            desc={`${next30Count} 项期限事项`}
            href="/timeline"
            icon={<TimerReset size={18} strokeWidth={1.55} />}
          />
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="text-[13px] font-medium text-ink">接下来30天的期限事项</h2>
          <Link href="/timeline" className="flex items-center text-[11px] text-ash">
            全部
            <ChevronRight size={13} strokeWidth={1.55} />
          </Link>
        </div>
        <div className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
          {upcoming.length > 0 ? (
            <ul className="divide-y divide-hairline">
              {upcoming.slice(0, 5).map(event => (
                <DeadlineRow key={event.id} event={event} />
              ))}
            </ul>
          ) : (
            <p className="text-[12px] leading-[1.65] text-ash">
              30 天内暂无已识别期限。
            </p>
          )}
        </div>
      </section>
    </>
  )
}

function BrandStrip() {
  return (
    <section className="pt-3">
      <div className="flex items-center gap-2 px-0.5 text-[12px] font-medium text-slate">
        <Logo size="sm" />
        <span>在日生活好帮手</span>
      </div>
    </section>
  )
}

function TrialStrip({ days }: { days: number }) {
  return (
    <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-2.5 shadow-card">
      <p className="text-[12px] font-medium leading-[1.55] text-ink">
        试用期 残り {days} 日
      </p>
    </section>
  )
}

function OverviewRow({
  label,
  value,
  href,
  last = false,
}: {
  label: string
  value: string
  href: string
  last?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex min-h-[54px] items-center justify-between gap-3 ${last ? '' : 'border-b border-hairline'}`}
    >
      <span className="text-[11px] text-ash">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5 text-right text-[13px] font-medium text-ink">
        <span className="truncate">{value}</span>
        <ChevronRight size={13} strokeWidth={1.55} className="flex-shrink-0 text-haze" />
      </span>
    </Link>
  )
}

function ToolRow({
  title,
  desc,
  href,
  icon,
  eventName,
}: {
  title: string
  desc: string
  href: string
  icon: ReactNode
  eventName?: EventName
}) {
  const className = 'flex min-h-[62px] items-center gap-3 border-b border-hairline px-4 py-3 last:border-b-0 active:translate-y-px'
  const inner = (
    <>
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-ink">{title}</span>
        <span className="mt-1 block truncate text-[11px] text-ash">{desc}</span>
      </span>
      <ChevronRight size={14} strokeWidth={1.55} className="text-haze" />
    </>
  )
  if (eventName) {
    return <TrackedLink href={href} eventName={eventName} className={className}>{inner}</TrackedLink>
  }
  return <Link href={href} className={className}>{inner}</Link>
}

function DeadlineRow({ event }: { event: TimelineEvent }) {
  const date = event.deadline ?? ''
  return (
    <li className="py-2.5 first:pt-0 last:pb-0">
      <Link href={`/timeline/${event.id}`} className="flex items-center gap-3">
        <span className="w-[58px] flex-shrink-0">
          <span className="block text-[12px] font-medium text-ink">{formatMonthDay(date)}</span>
          <span className="mt-1 block text-[10px] text-ash">{deadlineShortLabel(date)}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-medium text-ink">{eventTitle(event)}</span>
          <span className="mt-1 block truncate text-[10.5px] text-ash">
            {event.amount ? `${event.amount} / ` : ''}{eventSubline(event)}
          </span>
        </span>
        <ChevronRight size={14} strokeWidth={1.55} className="text-haze" />
      </Link>
    </li>
  )
}

async function safeGetCurrentUser(): Promise<Member | null> {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

async function safeAccess(user: Member): Promise<MemberAccess | null> {
  try {
    return await getMemberAccess(user)
  } catch {
    return null
  }
}

async function safeRetentionCutoff(user: Member): Promise<Date | null> {
  try {
    return await getTimelineRetentionCutoff(user)
  } catch {
    return null
  }
}

async function safeTimelineEvents(
  owner: { memberId: string | null; sessionId: string | null },
  cutoff: Date | null,
  limit: number,
) {
  try {
    return await listTimelineEvents(owner, {
      from: cutoff ? cutoff.toISOString() : null,
      limit,
    })
  } catch {
    return []
  }
}

function buildUpcoming(events: TimelineEvent[]): TimelineEvent[] {
  const now = startOfJstDay().getTime()
  const end = now + 30 * 86_400_000
  return events
    .filter(event => {
      if (!event.deadline) return false
      const t = new Date(`${event.deadline}T00:00:00+09:00`).getTime()
      return !Number.isNaN(t) && t >= now && t <= end
    })
    .sort((a, b) => String(a.deadline).localeCompare(String(b.deadline)))
}

function startOfJstDay(): Date {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  return new Date(`${today}T00:00:00+09:00`)
}

function daysUntilJst(dateValue: string | Date | null | undefined): number | null {
  if (!dateValue) return null
  const iso = typeof dateValue === 'string' ? dateValue : dateValue.toISOString().slice(0, 10)
  const target = new Date(`${iso.slice(0, 10)}T00:00:00+09:00`).getTime()
  if (Number.isNaN(target)) return null
  const now = startOfJstDay().getTime()
  return Math.ceil((target - now) / 86_400_000)
}

function visaOverview(user: Member, daysToExpiry: number | null): string {
  if (!user.visaExpiry) return '未录入'
  const formatted = formatFullDate(user.visaExpiry)
  if (daysToExpiry === null) return `到期日 ${formatted}`
  return `残り ${daysToExpiry} 日 / 到期日 ${formatted}`
}

function formatFullDate(dateValue: string | Date): string {
  const iso = typeof dateValue === 'string' ? dateValue : dateValue.toISOString().slice(0, 10)
  const [year, month, day] = iso.slice(0, 10).split('-')
  if (!year || !month || !day) return iso
  return `${year}.${month}.${day}`
}

function formatMonthDay(dateValue: string): string {
  const [, month, day] = dateValue.slice(0, 10).split('-')
  if (!month || !day) return '--.--'
  return `${month}.${day}`
}

function deadlineShortLabel(deadline: string): string {
  const days = daysUntilJst(deadline)
  if (days === null) return '期限'
  if (days === 0) return '今日'
  if (days < 0) return `过期 ${Math.abs(days)} 日`
  return `残り ${days} 日`
}

function HomeAppBar() {
  return (
    <header className="flex h-[58px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <span className="text-[12px] font-medium text-ash">TEBIQ</span>
      <Link
        href="/timeline"
        aria-label="我的提醒"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-soft"
      >
        <Bell size={20} strokeWidth={1.7} />
      </Link>
    </header>
  )
}
