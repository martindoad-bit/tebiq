import Link from 'next/link'
import type { ReactNode } from 'react'
import { Bell, Camera, ClipboardCheck, FileText } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import TrialNotice from '@/app/_components/TrialNotice'
import {
  DeadlineRow,
  ListRow,
  ListSection,
  SectionLabel,
} from '@/components/ui/tebiq'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { getMemberAccess, getTimelineRetentionCutoff } from '@/lib/billing/access'
import { listTimelineEvents } from '@/lib/db/queries/timeline'
import type { Member, TimelineEvent } from '@/lib/db/schema'
import { eventSubline, eventTitle } from '@/lib/timeline/display'

export const dynamic = 'force-dynamic'

const DEFAULT_DEADLINES = [
  { date: '05.20', days: '剩余 5 天', title: '住民税通知', detail: '金额 ¥65,400 / 大阪市役所' },
  { date: '05.28', days: '剩余 13 天', title: '国民健康保険費', detail: '金额 ¥18,200 / 大阪市役所' },
  { date: '06.02', days: '剩余 18 天', title: '年金免除申请结果通知', detail: '日本年金機構' },
  { date: '06.10', days: '剩余 26 天', title: '在留資格更新申請（予定）', detail: '出入国在留管理庁' },
  { date: '06.15', days: '剩余 31 天', title: '児童補助現況届', detail: '金额 ¥0 / 大阪市役所' },
]

export default async function HomePage() {
  const user = await safeGetCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  const retentionCutoff = await safeRetentionCutoff(user)
  const owner = { memberId: user?.id ?? null, sessionId }

  const [events, access] = await Promise.all([
    safeTimelineEvents(owner, retentionCutoff, 80),
    user ? getMemberAccess(user) : null,
  ])

  const upcoming = buildUpcoming(events)
  const hasArchive = Boolean(user || events.length > 0)
  const daysToExpiry = daysUntilJst(user?.visaExpiry)
  const needsCount = countNeedsAttention(upcoming)
  const trialActive = Boolean(access?.trialActive)

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      {trialActive && (
        <section className="-mx-5 mb-4 border-b border-hairline bg-paper px-5 py-3">
          <p className="text-[13px] font-medium text-ink">
            试用期 残り {access?.trialDaysRemaining ?? 0} 日
          </p>
          <p className="mt-1 text-[12px] leading-snug text-ash">
            试用期内可查看 TEBIQ 能识别什么
          </p>
        </section>
      )}

      {access && (
        <TrialNotice
          trialActive={access.trialActive}
          trialExpired={access.trialExpired}
          daysRemaining={access.trialDaysRemaining}
          needsFirstPhoto={!events.some(event => event.eventType === 'photo_recognition')}
        />
      )}

      {hasArchive ? (
        <ArchiveOverview
          daysToExpiry={daysToExpiry}
          needsCount={needsCount}
          deadlineCount={upcoming.length}
          updatedAt={events[0]?.createdAt ?? null}
        />
      ) : (
        <NewUserEntry />
      )}

      <SectionLabel title="常用工具" />
      <ListSection className="mt-3">
        <ListRow
          href="/photo"
          icon={<Camera size={20} strokeWidth={1.5} />}
          title="拍照即懂"
          subtitle="识别日文文书"
        />
        <ListRow
          href="/check"
          icon={<ClipboardCheck size={20} strokeWidth={1.5} />}
          title="续签自查"
          subtitle="查看当前风险点"
        />
        <ListRow
          href="/timeline"
          icon={<Bell size={20} strokeWidth={1.5} />}
          title="我的提醒"
          subtitle={hasArchive ? `${upcoming.length} 项期限事项` : '管理期限事项'}
        />
      </ListSection>

      {hasArchive ? (
        <>
          <SectionLabel title="接下来 30 天的期限事项" action="全部" href="/timeline" />
          <ListSection className="mt-3">
            {upcoming.length > 0
              ? upcoming.slice(0, 5).map(event => {
                const urgent = isUrgent(event.deadline)
                return (
                <DeadlineRow
                  key={event.id}
                  href={`/timeline/${event.id}`}
                  date={formatShortDate(event.deadline ?? event.createdAt)}
                  days={deadlineCompact(event.deadline)}
                  title={eventTitle(event)}
                  detail={eventSubline(event)}
                  status={urgent ? '待处理' : '待确认'}
                  urgent={urgent}
                />
                )
              })
              : DEFAULT_DEADLINES.map(item => (
                <DeadlineRow
                  key={`${item.date}-${item.title}`}
                  date={item.date}
                  days={item.days}
                  title={item.title}
                  detail={item.detail}
                  status="待处理"
                  urgent={item.days.includes('5')}
                />
              ))}
          </ListSection>
        </>
      ) : (
        <section className="mt-6 rounded-card border border-hairline bg-surface px-5 py-8 text-center">
          <FileText size={30} strokeWidth={1.5} className="mx-auto text-haze" />
          <p className="mt-4 text-[16px] font-normal text-ash">还没识别文书。</p>
          <p className="mt-1 text-[14px] text-ash">先拍一张试试。</p>
        </section>
      )}
    </AppShell>
  )
}

async function safeGetCurrentUser(): Promise<Member | null> {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

async function safeRetentionCutoff(user: Member | null): Promise<Date | null> {
  try {
    return await getTimelineRetentionCutoff(user)
  } catch {
    return user ? null : daysAgo(30)
  }
}

async function safeTimelineEvents(
  owner: { memberId: string | null; sessionId: string | null },
  cutoff: Date | null,
  limit: number,
) {
  try {
    if (!owner.memberId && !owner.sessionId) return []
    return await listTimelineEvents(owner, {
      from: cutoff ? cutoff.toISOString() : null,
      limit,
    })
  } catch {
    return []
  }
}

function ArchiveOverview({
  daysToExpiry,
  needsCount,
  deadlineCount,
  updatedAt,
}: {
  daysToExpiry: number | null
  needsCount: number
  deadlineCount: number
  updatedAt: Date | string | null
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between text-[12px] text-ash">
        <span>档案概览</span>
        <span>更新于 {updatedAt ? formatDateTime(updatedAt) : '未记录'}</span>
      </div>
      <ListSection>
        <MetricRow
          label="在留卡还有"
          value={daysToExpiry === null ? '--' : String(Math.max(daysToExpiry, 0))}
          unit="天"
          icon={<FileText size={20} strokeWidth={1.5} />}
          warning={typeof daysToExpiry === 'number' && daysToExpiry < 7}
        />
        <MetricRow
          label="你有"
          value={String(needsCount)}
          unit="项需处理"
          icon={<ClipboardCheck size={20} strokeWidth={1.5} />}
        />
        <MetricRow
          label="接下来 30 天有"
          value={String(deadlineCount)}
          unit="件期限事项"
          icon={<Bell size={20} strokeWidth={1.5} />}
        />
      </ListSection>
    </section>
  )
}

function MetricRow({
  label,
  value,
  unit,
  icon,
  warning,
}: {
  label: string
  value: string
  unit: string
  icon: ReactNode
  warning?: boolean
}) {
  return (
    <div className="grid min-h-[112px] grid-cols-[1fr_auto] items-center gap-4 border-b border-hairline px-5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[15px] font-normal text-ink">{label}</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span
            className={`numeric text-[56px] font-light leading-none tracking-[-0.01em] ${
              warning ? 'text-warning' : 'text-ink'
            }`}
          >
            {value}
          </span>
          <span className="text-[16px] font-normal text-ink">{unit}</span>
        </p>
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-hairline bg-paper text-ink">
        {icon}
      </span>
    </div>
  )
}

function NewUserEntry() {
  return (
    <section className="pt-12 text-center">
      <h1 className="text-[44px] font-medium leading-none tracking-[0.06em] text-ink">TEBIQ</h1>
      <p className="mx-auto mt-5 max-w-[270px] text-[17px] font-normal leading-[1.7] text-ink">
        在日生活的日文文书识别和提醒
      </p>
      <div className="mt-10 space-y-3">
        <Link
          href="/photo"
          className="focus-ring flex min-h-[48px] w-full items-center justify-center rounded-btn bg-ink px-4 py-3 text-[14px] font-medium leading-none text-white"
        >
          拍一份文书试试
        </Link>
        <Link
          href="/check"
          className="focus-ring flex min-h-[48px] w-full items-center justify-center rounded-btn border border-ink bg-surface px-4 py-3 text-[14px] font-medium leading-none text-ink"
        >
          做一次续签自查
        </Link>
      </div>
    </section>
  )
}

function HomeAppBar() {
  return (
    <header className="flex h-[64px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <Link href="/" className="text-[22px] font-medium leading-none tracking-[0.06em] text-ink">
        TEBIQ
      </Link>
      <Link
        href="/timeline"
        aria-label="提醒"
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-btn text-ink"
      >
        <Bell size={21} strokeWidth={1.5} />
      </Link>
    </header>
  )
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
    .slice(0, 5)
}

function countNeedsAttention(events: TimelineEvent[]): number {
  return events.filter(event => {
    const days = daysUntilJst(event.deadline)
    return days !== null && days <= 14
  }).length
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

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

function daysUntilJst(dateValue: string | Date | null | undefined): number | null {
  if (!dateValue) return null
  const iso = typeof dateValue === 'string' ? dateValue : dateValue.toISOString().slice(0, 10)
  const target = new Date(`${iso.slice(0, 10)}T00:00:00+09:00`).getTime()
  if (Number.isNaN(target)) return null
  const now = startOfJstDay().getTime()
  return Math.ceil((target - now) / 86_400_000)
}

function deadlineCompact(deadline: string | null): string {
  const days = daysUntilJst(deadline)
  if (days === null) return '期限未识别'
  if (days < 0) return `已过 ${Math.abs(days)} 天`
  if (days === 0) return '今日截止'
  return `剩余 ${days} 天`
}

function isUrgent(deadline: string | null): boolean {
  const days = daysUntilJst(deadline)
  return days !== null && days < 7
}

function formatShortDate(dateValue: string | Date): string {
  const d =
    typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
      ? new Date(`${dateValue}T00:00:00+09:00`)
      : new Date(dateValue)
  if (Number.isNaN(d.getTime())) return '--.--'
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function formatDateTime(dateValue: Date | string): string {
  const d = typeof dateValue === 'string' ? new Date(dateValue) : dateValue
  if (Number.isNaN(d.getTime())) return '未记录'
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
