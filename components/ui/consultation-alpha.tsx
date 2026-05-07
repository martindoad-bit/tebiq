import type { ReactNode } from 'react'
import {
  Archive,
  Camera,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  MessageSquareText,
  RefreshCcw,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const ALPHA_NOTICE =
  'TEBIQ 1.0 Alpha — 以下回答用于整理问题和下一步，不是最终专业判断。'

export const RISK_HINT =
  '这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定。'

export type AlphaDisplayState =
  | 'completed'
  | 'partial'
  | 'streaming'
  | 'timeout_waiting'
  | 'timeout'
  | 'failed'
  | 'fallback'

export type FeedbackType =
  | 'helpful'
  | 'inaccurate'
  | 'add_context'
  | 'human_review'
  | 'saved'

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

export function ConsultationShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--tebiq-off-white)] text-[var(--tebiq-ink-blue)]">
      <AlphaNotice />
      <main className={cx(
        'mx-auto w-full px-4 py-5 sm:px-6 sm:py-7',
        wide ? 'max-w-6xl' : 'max-w-[min(480px,100vw)]',
      )}>
        {children}
      </main>
    </div>
  )
}

export function AlphaNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className="sticky top-0 z-20 border-b border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)]/95 px-4 py-1.5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-start gap-2 text-[11.5px] leading-[1.55] text-[var(--tebiq-deep-slate)] sm:text-[12px]">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--tebiq-ink-blue)]" strokeWidth={1.6} />
        <span className={cx('min-w-0 flex-1 break-words', compact ? 'line-clamp-2' : '')}>{ALPHA_NOTICE}</span>
      </div>
    </div>
  )
}

export function BrandHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <header className="space-y-3.5">
      <div className="flex flex-col items-start justify-between gap-3.5 sm:flex-row">
        <div className="space-y-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/tebiq-v07/svg/tebiq-v07-logo-horizontal.svg"
            alt="TEBIQ"
            className="h-auto w-[120px]"
          />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-[24px] font-semibold leading-[1.16] tracking-normal text-[var(--tebiq-ink-blue)] sm:text-[26px]">
              {title}
            </h1>
          </div>
        </div>
        {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
      </div>
      {description && (
        <p className="max-w-[34rem] break-words text-[14.5px] leading-[1.75] text-[var(--tebiq-deep-slate)] sm:text-[15px]">
          {description}
        </p>
      )}
    </header>
  )
}

export function Surface({
  children,
  className,
  as = 'section',
}: {
  children: ReactNode
  className?: string
  as?: 'section' | 'article' | 'div'
}) {
  const Component = as
  return (
    <Component className={cx(
      'min-w-0 max-w-full overflow-hidden rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] p-4 sm:p-5',
      className,
    )}>
      {children}
    </Component>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">
      {children}
    </p>
  )
}

export function MetaPill({
  children,
  icon: Icon,
  tone = 'neutral',
}: {
  children: ReactNode
  icon?: LucideIcon
  tone?: 'neutral' | 'focus' | 'soft'
}) {
  return (
    <span className={cx(
      'inline-flex items-center gap-1 rounded-chip border px-2 py-1 text-[11px] leading-none',
      tone === 'focus'
        ? 'border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] text-[var(--tebiq-ink-blue)]'
        : tone === 'soft'
          ? 'border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)] text-[var(--tebiq-deep-slate)]'
          : 'border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] text-[var(--tebiq-deep-slate)]',
    )}>
      {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={1.6} />}
      {children}
    </span>
  )
}

export function StatusBadge({ state }: { state: AlphaDisplayState }) {
  const config: Record<AlphaDisplayState, { label: string; icon: LucideIcon; focus?: boolean }> = {
    completed: { label: '完整回答', icon: CheckCircle2 },
    partial: { label: '回答可能不完整', icon: TriangleAlert, focus: true },
    streaming: { label: '回答生成中', icon: Loader2 },
    timeout_waiting: { label: '仍在生成', icon: Clock3, focus: true },
    timeout: { label: '未生成完整回答', icon: Clock3, focus: true },
    failed: { label: '生成失败', icon: RefreshCcw },
    fallback: { label: '降级回答', icon: TriangleAlert, focus: true },
  }
  const item = config[state]
  return (
    <MetaPill icon={item.icon} tone={item.focus ? 'focus' : 'neutral'}>
      {item.label}
    </MetaPill>
  )
}

export function RiskHintBanner({ hits }: { hits: string[] }) {
  if (hits.length === 0) return null
  return (
    <div className="rounded-card border border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] px-3.5 py-3 text-[13px] leading-[1.65] text-[var(--tebiq-ink-blue)]">
      <div className="flex gap-2.5">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tebiq-warm-amber)]" strokeWidth={1.55} />
        <div>
          <p>{RISK_HINT}</p>
          <p className="mt-1 text-[11px] text-[var(--tebiq-deep-slate)]">
            关键词：{hits.join(' · ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FeedbackLabel({ type }: { type: FeedbackType }) {
  return <>{feedbackLabel(type)}</>
}

export function feedbackLabel(type: FeedbackType): string {
  switch (type) {
    case 'helpful': return '有帮助'
    case 'inaccurate': return '不准确'
    case 'add_context': return '想补充情况'
    case 'human_review': return '想人工确认'
    case 'saved': return '已保存'
  }
}

export function StatusIcon({ kind }: { kind: 'text' | 'photo' | 'answer' | 'save' }) {
  const map: Record<typeof kind, LucideIcon> = {
    text: MessageSquareText,
    photo: Camera,
    answer: FileText,
    save: Archive,
  }
  const Icon = map[kind]
  return <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
}
