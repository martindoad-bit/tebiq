import Link from 'next/link'
import { Bell, ChevronRight, FileText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { DeadlineRow, ListRow, ListSection, SectionLabel } from '@/components/ui/tebiq'
import { EVENT } from '@/lib/analytics/events'
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
        hasSelfCheck={hasSelfCheck}
      />
    </AppShell>
  )
}

function NewUserHome() {
  return (
    <>
      <section className="pt-12 text-center">
        <h1 className="text-[44px] font-medium leading-none tracking-[0.06em] text-ink">TEBIQ</h1>
        <p className="mx-auto mt-5 max-w-[270px] text-[17px] font-normal leading-[1.7] text-ink">
          在日生活的日文文书识别和提醒
        </p>
        <div className="mt-8 grid gap-3">
          <TrackedLink
            href="/photo"
            eventName={EVENT.HOME_PHOTO_CARD_CLICK}
            className="focus-ring flex min-h-[48px] items-center justify-center rounded-btn bg-ink px-4 py-3 text-[14px] font-medium leading-none text-white"
          >
            拍一份文书试试
          </TrackedLink>
        </div>
      </section>

      <SampleDocumentSection />
      <MoreFeatures />
    </>
  )
}

function UserHome({
  user,
  access,
  upcoming,
  needsActionCount,
  hasArchiveData,
  hasSelfCheck,
}: {
  user: Member
  access: MemberAccess | null
  upcoming: TimelineEvent[]
  needsActionCount: number
  hasArchiveData: boolean
  hasSelfCheck: boolean
}) {
  const daysToExpiry = daysUntilJst(user.visaExpiry)
  const next30Count = upcoming.length
  const showTrial = access?.trialActive && access.trialDaysRemaining !== null

  return (
    <>
      {showTrial && (
        <section className="-mx-5 mb-4 border-b border-hairline bg-paper px-5 py-3">
          <p className="text-[13px] font-medium text-ink">
            试用期 残り {access.trialDaysRemaining ?? 0} 日
          </p>
        </section>
      )}

      <ListSection>
        <OverviewRow label="在留卡" value={visaOverview(user, daysToExpiry)} href="/my/profile" />
        <OverviewRow
          label="准备事项"
          value={needsActionCount > 0 ? `你有 ${needsActionCount} 项需要补齐` : hasSelfCheck ? '当前无需补齐项' : '做一次材料准备检查'}
          href={needsActionCount > 0 || !hasSelfCheck ? '/check' : '/timeline'}
        />
        <OverviewRow label="接下来30天" value={`${next30Count} 件期限事项`} href="/timeline" />
      </ListSection>

      {!hasArchiveData && (
        <section className="mt-4 border-b border-hairline pb-4">
          <p className="text-[13px] leading-[1.7] text-ash">
            当前记录为空。可以先拍一份文书，或做一次材料准备检查。
          </p>
        </section>
      )}

      <SampleDocumentSection />
      <MoreFeatures needsActionCount={needsActionCount} next30Count={next30Count} />

      <SectionLabel title="接下来30天的期限事项" action="全部" href="/timeline" />
      <ListSection className="mt-3">
        {upcoming.length > 0 ? (
          upcoming.slice(0, 5).map(event => (
            <DeadlineRow
              key={event.id}
              href={`/timeline/${event.id}`}
              date={formatMonthDay(event.deadline ?? '')}
              days={deadlineShortLabel(event.deadline ?? '')}
              title={eventTitle(event)}
              detail={event.amount ? `${event.amount} / ${eventSubline(event)}` : eventSubline(event)}
              status={isUrgent(event.deadline) ? '待处理' : '待确认'}
              urgent={isUrgent(event.deadline)}
            />
          ))
        ) : (
          <p className="px-4 py-8 text-center text-[13px] leading-[1.65] text-ash">
            30 天内暂无已识别期限。
          </p>
        )}
      </ListSection>
    </>
  )
}

function SampleDocumentSection() {
  return (
    <>
      <SectionLabel title="最近文书示例" />
      <Link
        href="/photo/sample-result"
        className="mt-3 block rounded-card border border-hairline bg-surface px-4 py-4 active:bg-paper"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
            <FileText size={18} strokeWidth={1.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-medium leading-snug text-ink">住民税通知</span>
            <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
              6/30 到期 / 江戸川区役所 / ¥38,500
            </span>
          </span>
          <span className="mt-1 flex-shrink-0 text-[12px] text-ash">查看样例结果 →</span>
        </div>
      </Link>
    </>
  )
}

function MoreFeatures({
  needsActionCount = 0,
  next30Count = 0,
}: {
  needsActionCount?: number
  next30Count?: number
}) {
  return (
    <>
      <SectionLabel title="更多功能" />
      <ListSection className="mt-3">
        <ListRow
          href="/check"
          title="续签材料准备检查"
          subtitle={needsActionCount > 0 ? `${needsActionCount} 项需要补齐` : '准备事项'}
        />
        <ListRow
          href="/timeline"
          title="我的提醒"
          subtitle={next30Count > 0 ? `${next30Count} 项期限事项` : '期限事项'}
        />
      </ListSection>
    </>
  )
}

function OverviewRow({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="flex min-h-[64px] items-center justify-between gap-3 border-b border-hairline px-5 last:border-b-0">
      <span className="text-[13px] text-ash">{label}</span>
      <span className="flex min-w-0 items-center gap-1.5 text-right text-[15px] font-medium text-ink">
        <span className="truncate">{value}</span>
        <ChevronRight size={16} strokeWidth={1.5} className="flex-shrink-0 text-haze" />
      </span>
    </Link>
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

function isUrgent(deadline: string | null): boolean {
  const days = daysUntilJst(deadline)
  return days !== null && days <= 7
}

function HomeAppBar() {
  return (
    <header className="flex h-[58px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <span className="text-[12px] font-medium tracking-[0.14em] text-ash">TEBIQ</span>
      <Link
        href="/timeline"
        aria-label="我的提醒"
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink"
      >
        <Bell size={20} strokeWidth={1.5} />
      </Link>
    </header>
  )
}
