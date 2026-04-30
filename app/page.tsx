import Link from 'next/link'
import { Bell, CalendarDays, Camera, ChevronRight, ClipboardCheck, FileText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import QuestionIntakeBox from '@/app/_components/QuestionIntakeBox'
import { DeadlineRow, ListRow, ListSection, SectionLabel } from '@/components/ui/tebiq'
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
      <section className="pt-6">
        <h1 className="text-[36px] font-medium leading-none tracking-[0.04em] text-ink">TEBIQ</h1>
        <p className="mt-3 max-w-[300px] text-[14px] leading-[1.7] text-slate">
          在日生活的日文文书识别和提醒
        </p>
      </section>

      <div className="mt-6">
        <QuestionIntakeBox sourcePage="/" />
      </div>
      <MoreFeatures />
      <SampleDocumentSection />
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

      <QuestionIntakeBox sourcePage="/" />

      <ListSection className="mt-5">
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

      <MoreFeatures needsActionCount={needsActionCount} next30Count={next30Count} />
      <SampleDocumentSection />

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
        className="mt-3 block overflow-hidden rounded-card border border-hairline bg-surface active:bg-paper"
      >
        <div className="flex items-start gap-3 px-4 py-4">
          <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-paper text-ink">
            <FileText size={17} strokeWidth={1.5} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] leading-none text-ash">脱敏样例</span>
            <span className="mt-2 block text-[15px] font-medium leading-snug text-ink jp-text">住民税 納付通知書</span>
            <span className="mt-1 block text-[12px] leading-[1.6] text-ash">
              江戸川区役所 / 2026.06.30 / ¥38,500
            </span>
          </span>
          <ChevronRight size={16} strokeWidth={1.5} className="mt-5 flex-shrink-0 text-haze" />
        </div>
        <div className="border-t border-hairline px-4 py-2.5 text-[12px] leading-none text-ash">
          查看识别结果结构 →
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
      <SectionLabel title="快捷工具" />
      <ListSection className="mt-3">
        <ListRow
          href="/photo"
          icon={<Camera size={19} strokeWidth={1.5} />}
          title="拍一份文书试试"
          subtitle="看不懂日文通知时使用"
        />
        <ListRow
          href="/check"
          icon={<ClipboardCheck size={19} strokeWidth={1.5} />}
          title="续签材料准备检查"
          subtitle={needsActionCount > 0 ? `${needsActionCount} 项需要补齐` : '准备事项'}
        />
        <ListRow
          href="/timeline"
          icon={<CalendarDays size={19} strokeWidth={1.5} />}
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
