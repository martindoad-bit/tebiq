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
  Clock3,
  ShieldCheck,
} from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import Logo from '@/app/_components/v5/Logo'
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
      <section className="pt-4 pb-1 px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-cool-blue/70 px-2.5 py-1 text-[10.5px] font-medium text-ink/80">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          在日生活工具集
        </div>
        <h1 className="mt-3 text-[23px] font-medium text-ink leading-[1.34] mb-2">
          你的在日生活
          <br />
          好帮手
        </h1>
        <p className="max-w-[260px] text-[12.5px] leading-[1.65] text-slate/80">
          拍照看懂日文文件，续签前先做风险自查。
        </p>
      </section>

      <div className="mt-4 space-y-3">
        <ActionCard
          variant="primary"
          icon={<Camera size={20} strokeWidth={1.6} color="#1E3A5F" />}
          title="拍照即懂"
          subtitle="拍一张，马上知道要不要处理"
          href="/photo"
        />
        <ActionCard
          variant="secondary"
          icon={<ClipboardCheck size={20} strokeWidth={1.6} color="#F6B133" />}
          title="续签自查"
          subtitle="3 分钟了解你的签证风险"
          href="/check"
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
    <header className="flex-shrink-0 h-12 px-4 flex items-center justify-between bg-canvas">
      <Logo />
      <Link
        href="/my/reminders"
        aria-label="提醒中心"
        className="w-8 h-8 flex items-center justify-center text-ink"
      >
        <Bell size={18} strokeWidth={1.6} />
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
}: {
  variant: 'primary' | 'secondary'
  icon: ReactNode
  title: string
  subtitle: string
  href: string
}) {
  const wrap =
    variant === 'primary'
      ? 'bg-accent shadow-cta'
      : 'bg-surface border border-hairline shadow-card'
  const iconBg =
    variant === 'primary' ? 'bg-white' : 'bg-accent-2'
  const titleColor = variant === 'primary' ? 'text-ink' : 'text-ink'
  const subColor =
    variant === 'primary' ? 'text-ink/70' : 'text-ash'

  return (
    <Link
      href={href}
      className={`block ${wrap} rounded-card p-3.5 flex items-center gap-3 active:translate-y-px active:opacity-90 transition`}
    >
      <span
        className={`${iconBg} w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0`}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className={`block text-[14px] font-medium ${titleColor}`}>{title}</span>
        <span className={`block text-[11px] ${subColor} mt-0.5`}>{subtitle}</span>
      </span>
    </Link>
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
    <section className="mt-5 overflow-hidden rounded-card border border-hairline bg-surface shadow-card">
      <div className="border-b border-hairline bg-[rgba(230,238,245,0.42)] px-4 py-3">
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

      <div className="px-4 py-3.5">
        <div className="grid grid-cols-3 gap-2">
          <PreviewMetric
            icon={<Camera size={15} strokeWidth={1.55} />}
            label="拍照"
            value="3 次/月"
          />
          <PreviewMetric
            icon={<FileText size={15} strokeWidth={1.55} />}
            label="自查"
            value="免费"
          />
          <PreviewMetric
            icon={<Clock3 size={15} strokeWidth={1.55} />}
            label="提醒"
            value="登录后"
          />
        </div>

        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="mt-3 flex h-9 items-center justify-center rounded-btn border border-[rgba(30,58,95,0.14)] bg-white text-[13px] font-medium text-ink transition active:translate-y-px"
          >
            {actionLabel}
            <ChevronRight size={14} strokeWidth={1.6} className="ml-0.5" />
          </Link>
        )}
      </div>
    </section>
  )
}

function PreviewMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-[11px] border border-hairline bg-canvas/55 px-2.5 py-2.5">
      <div className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-[8px] bg-white text-ink shadow-soft">
        {icon}
      </div>
      <div className="text-[10px] leading-none text-ash">{label}</div>
      <div className="mt-1 text-[11.5px] font-medium leading-none text-ink">{value}</div>
    </div>
  )
}
