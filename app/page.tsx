import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Bell,
  CalendarDays,
  Camera,
  ChevronRight,
  ClipboardCheck,
  ShieldCheck,
  TimerReset,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import TrialNotice from '@/app/_components/TrialNotice'
import { EVENT, type EventName } from '@/lib/analytics/events'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { getMemberAccess, getTimelineRetentionCutoff } from '@/lib/billing/access'
import { listLatestPolicyArticles } from '@/lib/db/queries/articles'
import { listTimelineEvents } from '@/lib/db/queries/timeline'
import type { Article, Member, TimelineEvent } from '@/lib/db/schema'
import { eventSubline, eventTitle } from '@/lib/timeline/display'

export const dynamic = 'force-dynamic'

interface FocusCard {
  title: string
  body: string
  href: string
  cta: string
}

export default async function HomePage() {
  const user = await safeGetCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  const retentionCutoff = await safeRetentionCutoff(user)
  const owner = { memberId: user?.id ?? null, sessionId }

  const [events, policies, access] = await Promise.all([
    safeTimelineEvents(owner, retentionCutoff, 80),
    safePolicies(),
    user ? getMemberAccess(user) : null,
  ])

  const daysToExpiry = daysUntilJst(user?.visaExpiry)
  const focusCards = buildFocusCards({ user, events, daysToExpiry })
  const upcoming = buildUpcoming(events)

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <section className="pt-3">
        <div className="flex items-center gap-2 px-0.5 text-[12px] font-medium text-slate">
          <Logo size="sm" />
          <span>在日生活好帮手</span>
        </div>
      </section>

      {access && (
        <TrialNotice
          trialActive={access.trialActive}
          trialExpired={access.trialExpired}
          daysRemaining={access.trialDaysRemaining}
        />
      )}

      <SectionTitle title="今日相关" />
      <div className="mt-2.5 grid gap-2.5">
        {focusCards.map(card => (
          <FocusCard key={`${card.title}-${card.href}`} {...card} />
        ))}
      </div>

      <SectionTitle title="核心工具" />
      <div className="mt-2.5 grid grid-cols-3 gap-2.5">
        <ToolCard
          title="拍照即懂"
          desc="拍文件"
          href="/photo"
          icon={<Camera size={18} strokeWidth={1.55} />}
          eventName={EVENT.HOME_PHOTO_CARD_CLICK}
        />
        <ToolCard
          title="续签自查"
          desc="看风险"
          href="/check"
          icon={<ClipboardCheck size={18} strokeWidth={1.55} />}
          eventName={EVENT.HOME_CHECK_CARD_CLICK}
        />
        <ToolCard
          title="我的提醒"
          desc="看期限"
          href="/timeline"
          icon={<TimerReset size={18} strokeWidth={1.55} />}
        />
      </div>

      <SectionTitle title="接下来 30 天" actionHref="/timeline" actionLabel="全部提醒" />
      <section className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        {upcoming.length > 0 ? (
          <ul className="divide-y divide-hairline">
            {upcoming.map(event => (
              <li key={event.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link href={`/timeline/${event.id}`} className="group flex items-center gap-3">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[11px] bg-cool-blue text-ink">
                    <CalendarDays size={15} strokeWidth={1.55} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {eventTitle(event)}
                    </span>
                    <span className="mt-1 block truncate text-[10.5px] text-ash">
                      {deadlineLabel(event.deadline)} / {eventSubline(event)}
                    </span>
                  </span>
                  <ChevronRight size={14} className="text-haze group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] leading-[1.65] text-ash">30 天内暂无已识别期限。</p>
        )}
      </section>

      <SectionTitle title="最新政策" actionHref="/knowledge" actionLabel="更多" />
      <section className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        {policies.length > 0 ? (
          <ul className="divide-y divide-hairline">
            {policies.map(article => (
              <li key={article.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link href={`/knowledge/${article.slug ?? article.id}`} className="group flex items-center gap-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-[10.5px] text-ash">
                      {formatArticleDate(article.updatedAt)}
                    </span>
                  </span>
                  <ChevronRight size={14} className="text-haze group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] leading-[1.65] text-ash">暂无公开政策更新。</p>
        )}
      </section>

      <section className="mt-5 mb-2 grid grid-cols-2 gap-2 text-[10.5px] leading-[1.45] text-ash">
        <TrustItem icon={<ShieldCheck size={13} strokeWidth={1.55} />} text="数据在日本境内处理" />
        <TrustItem icon={<ShieldCheck size={13} strokeWidth={1.55} />} text="信息仅供参考，以官方为准" />
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

async function safePolicies(): Promise<Article[]> {
  try {
    return await listLatestPolicyArticles(3)
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

function buildFocusCards({
  user,
  events,
  daysToExpiry,
}: {
  user: Member | null
  events: TimelineEvent[]
  daysToExpiry: number | null
}): FocusCard[] {
  if (!user && events.length === 0) {
    return defaultFocusCards()
  }

  const cards: FocusCard[] = []
  if (daysToExpiry !== null) {
    cards.push({
      title: `在留期限 ${daysToExpiry} 天后`,
      body: daysToExpiry <= 90 ? '续签前建议先做一次自查。' : '当前无需处理，继续保留期限信息。',
      href: daysToExpiry <= 90 ? '/check' : '/my/profile',
      cta: daysToExpiry <= 90 ? '自查' : '查看',
    })
  }

  const nextDeadline = buildUpcoming(events)[0]
  if (nextDeadline) {
    cards.push({
      title: deadlineLabel(nextDeadline.deadline),
      body: eventTitle(nextDeadline),
      href: `/timeline/${nextDeadline.id}`,
      cta: '查看',
    })
  }

  const latest = events[0]
  if (latest) {
    cards.push({
      title: '最近识别',
      body: eventTitle(latest),
      href: `/timeline/${latest.id}`,
      cta: '详情',
    })
  }

  for (const fallback of defaultFocusCards()) {
    if (cards.length >= 3) break
    cards.push(fallback)
  }
  return cards.slice(0, 3)
}

function defaultFocusCards(): FocusCard[] {
  return [
    { title: '收到日本邮寄文件', body: '先拍照识别文书类型和期限。', href: '/photo', cta: '拍照' },
    { title: '续签前 3 个月', body: '做一次自查，确认当前风险项。', href: '/check', cta: '自查' },
    { title: '期限提醒', body: '已识别期限会进入提醒列表。', href: '/timeline', cta: '查看' },
  ]
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

function deadlineLabel(deadline: string | null): string {
  if (!deadline) return '期限未识别'
  const days = daysUntilJst(deadline)
  if (days === null) return `期限 ${deadline}`
  if (days === 0) return '今日截止'
  if (days < 0) return `已过期 ${Math.abs(days)} 天`
  return `${days} 天后截止`
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}/${m}/${d}`
}

function formatArticleDate(date: Date | string): string {
  return formatDate(typeof date === 'string' ? new Date(date) : date)
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

function FocusCard({ title, body, href, cta }: FocusCard) {
  return (
    <Link
      href={href}
      className="flex min-h-[72px] items-center gap-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card active:translate-y-px"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium text-ink">{title}</span>
        <span className="mt-1 block truncate text-[11px] text-ash">{body}</span>
      </span>
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
  const className = 'min-h-[96px] rounded-card border border-hairline bg-surface px-2.5 py-3 shadow-card transition active:translate-y-px'
  const inner = (
    <>
      <span className="flex h-8 w-8 items-center justify-center rounded-[11px] bg-accent-2 text-ink">
        {icon}
      </span>
      <span className="mt-2.5 block text-[12.5px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[10px] leading-[1.45] text-ash">{desc}</span>
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

function TrustItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex min-h-[42px] items-center gap-2 rounded-[12px] border border-hairline bg-surface/70 px-3 py-2">
      <span className="text-ink">{icon}</span>
      <span>{text}</span>
    </div>
  )
}
