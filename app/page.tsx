import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Archive,
  Bell,
  Camera,
  ChevronRight,
  ClipboardCheck,
  Languages,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT, type EventName } from '@/lib/analytics/events'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import {
  archiveExpiredTimelineEventsForMember,
  getTimelineSummary,
  listTimelineEvents,
  type TimelineSummary,
} from '@/lib/db/queries/timeline'
import type { Member, TimelineEvent } from '@/lib/db/schema'
import { eventSubline, eventTitle, eventTypeLabel, formatDateTime } from '@/lib/timeline/display'

export const dynamic = 'force-dynamic'

interface FocusCard {
  title: string
  href: string
  cta: string
}

const EMPTY_SUMMARY: TimelineSummary = {
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

export default async function HomePage() {
  const user = await safeGetCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  if (user) await safeArchiveExpired(user)

  const owner = { memberId: user?.id ?? null, sessionId }
  const [summary, recentEvents] = await Promise.all([
    safeTimelineSummary(owner),
    safeTimelineEvents(owner, 5),
  ])
  const daysToExpiry = daysUntilJst(user?.visaExpiry)
  const focusCards = buildFocusCards(user, summary, recentEvents, daysToExpiry)

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <section className="pt-3">
        <div className="flex items-center gap-2 px-0.5 text-[12px] font-medium text-slate">
          <Logo size="sm" />
          <span>在日生活好帮手</span>
        </div>
      </section>

      <ArchiveStatusCard user={user} summary={summary} daysToExpiry={daysToExpiry} />

      <SectionTitle title="当前关注" />
      <div className="mt-2.5 grid gap-2.5">
        {focusCards.map(card => (
          <FocusCard key={card.title} {...card} />
        ))}
      </div>

      <SectionTitle title="工具入口" />
      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <ToolCard
          title="拍照即懂"
          desc="文件归档"
          href="/photo"
          icon={<Camera size={18} strokeWidth={1.55} />}
          eventName={EVENT.HOME_PHOTO_CARD_CLICK}
        />
        <ToolCard
          title="文字即懂"
          desc="文本归档"
          href="/ask"
          icon={<Languages size={18} strokeWidth={1.55} />}
        />
        <ToolCard
          title="续签自查"
          desc="风险记录"
          href="/check"
          icon={<ClipboardCheck size={18} strokeWidth={1.55} />}
          eventName={EVENT.HOME_CHECK_CARD_CLICK}
        />
        <ToolCard
          title="我的时间线"
          desc="完整档案"
          href="/timeline"
          icon={<Archive size={18} strokeWidth={1.55} />}
        />
      </div>

      <SectionTitle title="最近活动" actionHref="/timeline" actionLabel="完整档案" />
      <section className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        {recentEvents.length > 0 ? (
          <ul className="divide-y divide-hairline">
            {recentEvents.map(event => (
              <li key={event.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link href={`/timeline/${event.id}`} className="group flex items-center gap-3">
                  <span className="w-[72px] flex-shrink-0 text-[10.5px] text-ash">
                    {formatDateTime(event.createdAt)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {eventTitle(event)}
                    </span>
                    <span className="mt-1 block truncate text-[10.5px] text-ash">
                      {eventSubline(event)}
                    </span>
                  </span>
                  <span className="rounded-[8px] bg-cool-blue px-2 py-1 text-[10px] font-medium text-ink">
                    {event.archived ? '已归档' : eventTypeLabel(event.eventType)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] leading-[1.65] text-ash">
            暂无档案记录。使用任一工具后自动生成时间线。
          </p>
        )}
      </section>
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

async function safeArchiveExpired(user: Member) {
  try {
    await archiveExpiredTimelineEventsForMember(user)
  } catch {
    // 首页不能因归档任务失败而不可用。
  }
}

async function safeTimelineSummary(owner: { memberId: string | null; sessionId: string | null }) {
  try {
    if (!owner.memberId && !owner.sessionId) return EMPTY_SUMMARY
    return await getTimelineSummary(owner)
  } catch {
    return EMPTY_SUMMARY
  }
}

async function safeTimelineEvents(owner: { memberId: string | null; sessionId: string | null }, limit: number) {
  try {
    if (!owner.memberId && !owner.sessionId) return []
    return await listTimelineEvents(owner, { limit })
  } catch {
    return []
  }
}

function daysUntilJst(dateValue: string | Date | null | undefined): number | null {
  if (!dateValue) return null
  const iso = typeof dateValue === 'string' ? dateValue : dateValue.toISOString().slice(0, 10)
  const target = new Date(`${iso.slice(0, 10)}T00:00:00+09:00`).getTime()
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

function buildFocusCards(
  user: Member | null,
  summary: TimelineSummary,
  events: TimelineEvent[],
  daysToExpiry: number | null,
): FocusCard[] {
  if (!user && summary.total === 0) {
    return [
      { title: '收到信件: 先拍照归档', href: '/photo', cta: '拍照' },
      { title: '日文原文: 粘贴后归档', href: '/ask', cta: '解析' },
      { title: '续签前: 做一次自查记录', href: '/check', cta: '自查' },
    ]
  }

  const cards: FocusCard[] = []
  if (daysToExpiry !== null) {
    cards.push({
      title: `在留期限: ${daysToExpiry} 天后`,
      href: daysToExpiry <= 90 ? '/check' : '/my/profile',
      cta: daysToExpiry <= 90 ? '自查' : '档案',
    })
  }
  if (summary.latestDeadline) {
    cards.push({
      title: `最近期限: ${summary.latestDeadline}`,
      href: '/timeline',
      cta: '查看',
    })
  }
  const latest = events[0]
  if (latest) {
    cards.push({
      title: `第 ${summary.total} 件记录: ${eventTitle(latest)}`,
      href: `/timeline/${latest.id}`,
      cta: '详情',
    })
  }
  while (cards.length < 3) {
    const fallback = [
      { title: '收到信件: 先拍照归档', href: '/photo', cta: '拍照' },
      { title: '日文原文: 粘贴后归档', href: '/ask', cta: '解析' },
      { title: '续签前: 做一次自查记录', href: '/check', cta: '自查' },
    ][cards.length]
    cards.push(fallback)
  }
  return cards.slice(0, 3)
}

function HomeAppBar() {
  return (
    <header className="flex h-[58px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <span className="text-[12px] font-medium text-ash">TEBIQ</span>
      <Link
        href="/my/reminders"
        aria-label="提醒中心"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-soft"
      >
        <Bell size={20} strokeWidth={1.7} />
      </Link>
    </header>
  )
}

function ArchiveStatusCard({
  user,
  summary,
  daysToExpiry,
}: {
  user: Member | null
  summary: TimelineSummary
  daysToExpiry: number | null
}) {
  const retention = user?.archiveRetentionUntil ?? null
  const retentionDays = daysUntilJst(retention)
  return (
    <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[17px] font-semibold leading-snug text-ink">档案状态</h1>
          <p className="mt-1 text-[11.5px] leading-[1.6] text-ash">
            {user
              ? `签证 ${user.visaType ?? '未填'} / 续签 ${daysToExpiry === null ? '未填' : `${daysToExpiry} 天后`}`
              : '匿名档案保留 30 天 / 注册后永久保留'}
          </p>
        </div>
        <Link href="/timeline" className="flex items-center text-[11px] font-medium text-ink">
          时间线 <ChevronRight size={13} strokeWidth={1.55} />
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric label="文书" value={summary.documents} />
        <Metric label="自查" value={summary.selfChecks} />
        <Metric label="记录" value={summary.total} />
      </div>
      {retentionDays !== null && retentionDays <= 7 && (
        <p className="mt-3 rounded-[10px] bg-cool-blue px-3 py-2 text-[11.5px] leading-[1.6] text-ink">
          档案保留还剩 {Math.max(0, retentionDays)} 天。开通年度保留后恢复完整时间线。
        </p>
      )}
    </section>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[12px] border border-hairline bg-canvas px-3 py-2.5">
      <div className="text-[22px] font-semibold leading-none text-ink">{value}</div>
      <div className="mt-1 text-[10.5px] text-ash">{label}</div>
    </div>
  )
}

function FocusCard({ title, href, cta }: FocusCard) {
  return (
    <Link
      href={href}
      className="flex min-h-[52px] items-center gap-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card active:translate-y-px"
    >
      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{title}</span>
      <span className="flex items-center text-[11px] text-ash">
        {cta}<ChevronRight size={13} strokeWidth={1.55} />
      </span>
    </Link>
  )
}

function ToolCard({
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
  const className = 'min-h-[104px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 shadow-card transition active:translate-y-px'
  const inner = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
        {icon}
      </span>
      <span className="mt-3 block text-[13.5px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[10.5px] leading-[1.55] text-ash">{desc}</span>
    </>
  )
  if (eventName) {
    return <TrackedLink href={href} eventName={eventName} className={className}>{inner}</TrackedLink>
  }
  return <Link href={href} className={className}>{inner}</Link>
}

function SectionTitle({
  title,
  actionHref,
  actionLabel,
}: {
  title: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div className="mt-5 flex items-center justify-between px-0.5">
      <h2 className="text-[13px] font-medium text-ink">{title}</h2>
      {actionHref && actionLabel && (
        <Link href={actionHref} className="flex items-center text-[11px] text-ash">
          {actionLabel}
          <ChevronRight size={13} strokeWidth={1.55} />
        </Link>
      )}
    </div>
  )
}
