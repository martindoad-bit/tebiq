import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Bell,
  BookOpenCheck,
  Camera,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  Database,
  Languages,
  ShieldCheck,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import SoonToolCard from '@/app/_components/v5/SoonToolCard'
import { EVENT, type EventName } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import { listLatestPolicyArticles } from '@/lib/db/queries/articles'
import { listDocumentsByFamilyId } from '@/lib/db/queries/documents'
import { buildUserContext } from '@/lib/photo/user-context'
import { sanitizePublicKnowledgeText } from '@/lib/knowledge/public-text'

export const dynamic = 'force-dynamic'

interface TodayCard {
  title: string
  desc: string
  href: string
  icon: ReactNode
}

export default async function HomePage() {
  const user = await safeGetCurrentUser()
  const [policyArticles, userContext, docs] = await Promise.all([
    safeListLatestPolicyArticles(),
    user ? safeBuildUserContext(user.id) : Promise.resolve(null),
    user ? safeListDocumentsByFamilyId(user.familyId) : Promise.resolve([]),
  ])

  const todayCards = user && userContext
    ? buildLoggedInTodayCards(userContext, docs.length)
    : buildDefaultTodayCards()

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <section className="px-0.5 pb-1 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-cool-blue px-3 py-1.5 text-[clamp(12px,3.4vw,14px)] font-semibold text-ink/85">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          在日生活好帮手
        </div>
        <h1 className="mb-3 mt-4 text-[clamp(34px,10.4vw,50px)] font-semibold leading-[1.12] text-ink">
          今天要处理的事
          <br />
          先看这里
        </h1>
        <p className="max-w-[360px] text-[clamp(15px,4.2vw,18px)] leading-[1.62] text-slate/82">
          拍文件、粘贴日文、做续签自查，把在日生活的麻烦事拆小。
        </p>
      </section>

      <SectionTitle title="今日相关" actionHref="/tools" actionLabel="全部工具" />
      <div className="mt-2.5 flex snap-x gap-3 overflow-x-auto pb-1">
        {todayCards.map(card => (
          <TodayCard key={card.title} {...card} />
        ))}
      </div>

      <SectionTitle title="核心工具" />
      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <ToolCard
          title="拍照即懂"
          desc="拍日文文件"
          href="/photo"
          icon={<Camera size={19} strokeWidth={1.55} />}
          eventName={EVENT.HOME_PHOTO_CARD_CLICK}
        />
        <ToolCard
          title="文字即懂"
          desc="粘贴日文求助"
          href="/ask"
          icon={<Languages size={19} strokeWidth={1.55} />}
        />
        <ToolCard
          title="续签自查"
          desc="3 分钟看风险"
          href="/check"
          icon={<ClipboardCheck size={19} strokeWidth={1.55} />}
          eventName={EVENT.HOME_CHECK_CARD_CLICK}
        />
        <SoonToolCard
          title="任务清单"
          desc="即将开放"
          icon={<CheckSquare size={19} strokeWidth={1.55} />}
        />
      </div>

      <SectionTitle title="最新政策" actionHref="/knowledge" actionLabel="更多" />
      <section className="mt-2.5 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        {policyArticles.length > 0 ? (
          <ul className="divide-y divide-hairline">
            {policyArticles.map(article => (
              <li key={article.id} className="py-2.5 first:pt-0 last:pb-0">
                <Link
                  href={`/knowledge/${article.slug ?? article.id}`}
                  className="group flex items-center gap-2.5"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-2 text-ink">
                    <BookOpenCheck size={15} strokeWidth={1.55} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {sanitizePublicKnowledgeText(article.title)}
                    </span>
                    <span className="mt-1 block text-[10.5px] text-ash">
                      更新于 {formatDate(article.updatedAt)}
                    </span>
                  </span>
                  <ChevronRight size={14} className="text-haze group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] leading-[1.65] text-ash">
            暂无公开政策更新。后续会在这里显示与你相关的新变化。
          </p>
        )}
      </section>

      <TrustStrip />
    </AppShell>
  )
}

async function safeGetCurrentUser() {
  try {
    return await getCurrentUser()
  } catch {
    return null
  }
}

async function safeListLatestPolicyArticles() {
  try {
    return await listLatestPolicyArticles(3)
  } catch {
    return []
  }
}

async function safeBuildUserContext(memberId: string) {
  try {
    return await buildUserContext({ memberId })
  } catch {
    return null
  }
}

async function safeListDocumentsByFamilyId(familyId: string) {
  try {
    return await listDocumentsByFamilyId(familyId, 8)
  } catch {
    return []
  }
}

function HomeAppBar() {
  return (
    <header className="flex h-[72px] flex-shrink-0 items-center justify-between bg-canvas px-5">
      <Logo size="lg" />
      <Link
        href="/my/reminders"
        aria-label="提醒中心"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-soft"
      >
        <Bell size={22} strokeWidth={1.7} />
      </Link>
    </header>
  )
}

function buildLoggedInTodayCards(
  context: NonNullable<Awaited<ReturnType<typeof buildUserContext>>>,
  documentCount: number,
): TodayCard[] {
  const expiry = context.daysToVisaExpiry
  const expiryText = expiry === null
    ? '先补一下在留期限，提醒会更准。'
    : expiry <= 30
      ? `在留期限还剩 ${expiry} 天，先检查材料和日期。`
      : `在留期限还剩 ${expiry} 天，可以提前整理材料。`
  return [
    {
      title: '在留期限',
      desc: expiryText,
      href: '/my/profile',
      icon: <ShieldCheck size={18} strokeWidth={1.55} />,
    },
    {
      title: context.hasRecentQuizResult ? '自查已做过' : '先做一次自查',
      desc: context.hasRecentQuizResult
        ? '可以根据最近结果继续看材料和提醒。'
        : '3 分钟先知道哪些地方要留意。',
      href: '/check',
      icon: <ClipboardCheck size={18} strokeWidth={1.55} />,
    },
    {
      title: documentCount > 0 ? '最近文件' : '遇到日文文件',
      desc: documentCount > 0
        ? `你的档案里已有 ${documentCount} 份识别记录。`
        : '拍一张或粘贴文字，先看懂重点。',
      href: documentCount > 0 ? '/my/archive' : '/photo',
      icon: <Camera size={18} strokeWidth={1.55} />,
    },
  ]
}

function buildDefaultTodayCards(): TodayCard[] {
  return [
    {
      title: '收到市役所信件？',
      desc: '拍一张，先看懂期限、金额和处理步骤。',
      href: '/photo',
      icon: <Camera size={18} strokeWidth={1.55} />,
    },
    {
      title: '日文邮件看不懂？',
      desc: '粘贴原文，用中文拆出重点。',
      href: '/ask',
      icon: <Languages size={18} strokeWidth={1.55} />,
    },
    {
      title: '准备续签？',
      desc: '先做一次自查，知道哪里要留意。',
      href: '/check',
      icon: <ClipboardCheck size={18} strokeWidth={1.55} />,
    },
  ]
}

function TodayCard({ title, desc, href, icon }: TodayCard) {
  return (
    <Link
      href={href}
      className="flex min-h-[142px] w-[78%] max-w-[290px] flex-shrink-0 snap-start flex-col rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card transition active:translate-y-px"
    >
      <span className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-accent-2 text-ink">
          {icon}
        </span>
        <span className="text-[14px] font-medium leading-snug text-ink">{title}</span>
      </span>
      <span className="mt-3 block flex-1 text-[12px] leading-[1.65] text-slate">{desc}</span>
      <span className="mt-3 flex justify-end text-[11.5px] font-medium text-ink">
        查看 <ChevronRight size={13} strokeWidth={1.55} />
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
  const className =
    'min-h-[124px] rounded-card border border-hairline bg-surface px-3.5 py-3.5 shadow-card transition active:translate-y-px'
  const inner = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-accent-2 text-ink">
        {icon}
      </span>
      <span className="mt-3 block text-[14px] font-medium leading-snug text-ink">{title}</span>
      <span className="mt-1 block text-[11px] leading-[1.55] text-ash">{desc}</span>
    </>
  )
  if (eventName) {
    return (
      <TrackedLink href={href} eventName={eventName} className={className}>
        {inner}
      </TrackedLink>
    )
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
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

function TrustStrip() {
  return (
    <section className="mt-4 grid grid-cols-2 gap-2">
      <TrustChip icon={<Database size={15} strokeWidth={1.55} />} title="数据在日本境内" />
      <TrustChip icon={<ShieldCheck size={15} strokeWidth={1.55} />} title="信息仅供参考" />
    </section>
  )
}

function TrustChip({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[14px] border border-hairline bg-surface/76 px-3 py-2.5 shadow-soft">
      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-cool-blue text-ink">
        {icon}
      </span>
      <span className="text-[11.5px] font-medium leading-snug text-ink">{title}</span>
    </div>
  )
}

function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}/${m}/${d}`
}
