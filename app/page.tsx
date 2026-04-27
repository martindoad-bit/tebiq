/**
 * Screen 01 — 首页
 *
 * v5 layout：
 *   - AppBar: TEBIQ logo（左）+ 通知图标（右）
 *   - Hero: 你的在日生活好帮手 / 安心在日本的每一步
 *   - Action card primary: 拍照即懂 → /photo
 *   - Action card secondary: 续签自查 → /check
 *   - 「你有 N 个需要关注的事项」 + 待办列表（来自 documents 表）
 *   - TabBar 在底部
 *
 * 已登录 vs 未登录差异：
 *   - 未登录：待办 section 隐藏；登录 CTA 替代（轻提示 "登录解锁档案"）
 *   - 已登录：从 documents 表读最近的 urgency=critical|important 行
 */
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Bell,
  ChevronRight,
  Camera,
  ClipboardCheck,
  FileText,
  BellRing,
  ShieldCheck,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT, type EventName } from '@/lib/analytics/events'
import { getCurrentUser } from '@/lib/auth/session'
import { listDocumentsByFamilyId } from '@/lib/db/queries/documents'
import type { Document } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const user = await getCurrentUser()
  const todos: Document[] = user
    ? (await listDocumentsByFamilyId(user.familyId, 5)).filter(
        d => d.urgency === 'critical' || d.urgency === 'important',
      )
    : []

  return (
    <AppShell appBar={<HomeAppBar />} tabBar={<TabBar />}>
      <section className="px-0.5 pb-1 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-cool-blue px-3 py-1.5 text-[clamp(12px,3.4vw,14px)] font-semibold text-ink/85">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          在日生活工具集
        </div>
        <h1 className="mb-3 mt-4 text-[clamp(34px,10.6vw,52px)] font-semibold leading-[1.12] tracking-[-0.01em] text-ink">
          你的在日生活
          <br />
          好帮手
        </h1>
        <p className="max-w-[360px] text-[clamp(15px,4.3vw,19px)] leading-[1.62] text-slate/82">
          拍照看懂日文文件，续签前先做风险自查。
        </p>
      </section>

      <div className="mt-5 space-y-3.5">
        <ActionCard
          variant="primary"
          icon={<Camera size={23} strokeWidth={1.7} color="#18324A" />}
          title="拍照即懂"
          subtitle="拍一张，马上知道要不要处理"
          href="/photo"
          eventName={EVENT.HOME_PHOTO_CARD_CLICK}
        />
        <ActionCard
          variant="secondary"
          icon={<ClipboardCheck size={23} strokeWidth={1.7} color="#E56F4F" />}
          title="续签自查"
          subtitle="3 分钟了解你的签证风险"
          href="/check"
          eventName={EVENT.HOME_CHECK_CARD_CLICK}
        />
      </div>

      {user ? (
        <TodoSection todos={todos} />
      ) : (
        <UnloggedHint />
      )}
    </AppShell>
  )
}

function HomeAppBar() {
  return (
    <header className="flex h-[64px] flex-shrink-0 items-center justify-between bg-canvas px-5">
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

function ActionCard({
  variant,
  icon,
  title,
  subtitle,
  href,
  eventName,
}: {
  variant: 'primary' | 'secondary'
  icon: ReactNode
  title: string
  subtitle: string
  href: string
  eventName: EventName
}) {
  const wrap =
    variant === 'primary'
      ? 'bg-accent text-white shadow-cta'
      : 'bg-surface border border-hairline shadow-card'
  const iconBg =
    variant === 'primary' ? 'bg-white' : 'bg-accent-2'
  const titleColor = variant === 'primary' ? 'text-white' : 'text-ink'
  const subColor =
    variant === 'primary' ? 'text-white/82' : 'text-ash'

  return (
    <TrackedLink
      href={href}
      eventName={eventName}
      className={`block ${wrap} flex items-center gap-3.5 rounded-card p-4 transition active:translate-y-px active:opacity-90`}
    >
      <span
        className={`${iconBg} flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-[15px]`}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className={`block text-[clamp(18px,5.1vw,22px)] font-semibold leading-tight ${titleColor}`}>{title}</span>
        <span className={`mt-1 block text-[clamp(13px,3.7vw,15px)] leading-snug ${subColor}`}>{subtitle}</span>
      </span>
    </TrackedLink>
  )
}

function TodoSection({ todos }: { todos: Document[] }) {
  if (todos.length === 0) {
    return (
      <EmptyHomeState
        title="目前没有需要关注的事项"
        description="扫到的文件、自查结果和到期提醒会出现在这里。"
      />
    )
  }
  return (
    <>
      <h2 className="text-[13px] font-medium text-ink mt-4 mb-2.5 px-1">
        你有 {todos.length} 个需要关注的事项
      </h2>
      <div className="space-y-2">
        {todos.map(t => (
          <TodoRow key={t.id} doc={t} />
        ))}
      </div>
    </>
  )
}

function TodoRow({ doc }: { doc: Document }) {
  const dotColor =
    doc.urgency === 'critical'
      ? 'bg-danger'
      : doc.urgency === 'important'
        ? 'bg-accent'
        : doc.urgency === 'normal'
          ? 'bg-success'
          : 'bg-haze'
  const issuer =
    typeof doc.aiResponse === 'object' && doc.aiResponse !== null && 'issuer' in doc.aiResponse
      ? String((doc.aiResponse as { issuer?: unknown }).issuer ?? '')
      : ''
  const deadline =
    typeof doc.aiResponse === 'object' && doc.aiResponse !== null && 'deadline' in doc.aiResponse
      ? String((doc.aiResponse as { deadline?: unknown }).deadline ?? '')
      : ''

  return (
    <Link
      href={`/photo/result/${doc.id}`}
      className="bg-surface border border-hairline rounded-chip px-3.5 py-3 flex items-center gap-2.5 active:opacity-80 transition"
    >
      <span className="w-7 h-7 rounded-[7px] bg-accent-2 flex items-center justify-center flex-shrink-0">
        <span className="block w-3 h-4 bg-ink rounded-[2px]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          <span className="truncate">{doc.docType ?? '未识别文件'}</span>
        </span>
        {issuer && <span className="block text-[10.5px] text-ash mt-0.5">来自：{issuer}</span>}
        {deadline && <span className="block text-[10.5px] text-ash">截止：{deadline}</span>}
      </span>
      <ChevronRight size={16} className="text-haze flex-shrink-0" />
    </Link>
  )
}

function UnloggedHint() {
  return (
    <EmptyHomeState
      title="登录后建立你的生活档案"
      description="拍照识别的文件、自查结果和到期提醒，会自动归入「我的档案」。"
      actionHref="/login"
      actionLabel="登录 / 注册"
    />
  )
}

function EmptyHomeState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string
  description: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <section className="mt-4 overflow-hidden rounded-card border border-hairline bg-surface shadow-card">
      <div className="border-b border-hairline bg-[rgba(230,238,245,0.42)] px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-medium leading-snug text-ink">{title}</h2>
            <p className="mt-1 text-[11px] leading-[1.65] text-ash">{description}</p>
          </div>
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-2 text-ink">
            <ShieldCheck size={17} strokeWidth={1.55} />
          </span>
        </div>
      </div>

      <div className="px-4 py-3">
        <ArchivePreview />

        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="mt-2.5 flex h-9 items-center justify-center rounded-btn border border-hairline bg-surface text-[13px] font-medium text-ink shadow-soft transition active:translate-y-px"
          >
            {actionLabel}
            <ChevronRight size={14} strokeWidth={1.6} className="ml-0.5" />
          </Link>
        )}
      </div>
    </section>
  )
}

function ArchivePreview() {
  return (
    <div className="relative overflow-hidden rounded-[13px] border border-hairline bg-canvas/50 px-3 py-2.5">
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/80 text-ink shadow-soft">
        <BellRing size={17} strokeWidth={1.55} />
      </div>

      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-white text-ink shadow-soft">
          <FileText size={15} strokeWidth={1.55} />
        </span>
        <div>
          <div className="text-[11.5px] font-medium leading-none text-ink">我的档案</div>
          <div className="mt-1 text-[10px] leading-none text-ash">拍照、自查、提醒会整理在这里</div>
        </div>
      </div>

      <div className="space-y-1 pr-10">
        <GhostRow title="住民税通知" meta="拍照识别后保存" tone="danger" />
        <GhostRow title="在留期間更新" meta="自查结果与提醒" tone="accent" />
      </div>
    </div>
  )
}

function GhostRow({
  title,
  meta,
  tone,
}: {
  title: string
  meta: string
  tone: 'danger' | 'accent'
}) {
  const dot = tone === 'danger' ? 'bg-danger' : 'bg-accent'
  return (
    <div className="flex items-center gap-2 rounded-[10px] border border-white/70 bg-white/78 px-2.5 py-1.5 shadow-soft">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11.5px] font-medium leading-none text-ink">
          {title}
        </span>
        <span className="mt-1 block truncate text-[9.5px] leading-none text-ash">
          {meta}
        </span>
      </span>
    </div>
  )
}
