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
  'TEBIQ Alpha：先整理问题和下一步，不替代专业判断。'

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

export function ConsultationShell({
  children,
  wide = false,
  tabBar,
}: {
  children: ReactNode
  wide?: boolean
  tabBar?: ReactNode
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--tebiq-off-white)] text-[var(--tebiq-ink-blue)]">
      <AlphaNotice />
      <main className={cx(
        'mx-auto w-full px-4 py-5 text-[17px] sm:px-6 sm:py-7',
        tabBar ? 'pb-28' : '',
        wide ? 'max-w-6xl' : 'max-w-[min(480px,100vw)]',
      )}>
        {children}
      </main>
      {tabBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[min(480px,100vw)] md:border-x md:border-[var(--tebiq-soft-gray)]">
          {tabBar}
        </div>
      )}
    </div>
  )
}

export function AlphaNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className="sticky top-0 z-20 border-b border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)]/95 px-4 py-1.5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-start gap-2 text-[12px] leading-[1.55] text-[var(--tebiq-deep-slate)] sm:text-[12.5px]">
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
            className="h-auto w-[128px]"
          />
          <div>
            <p className="text-[12px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-[31px] font-semibold leading-[1.13] tracking-normal text-[var(--tebiq-ink-blue)] sm:text-[30px]">
              {title}
            </h1>
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <p className="max-w-[34rem] break-words text-[16.5px] leading-[1.75] text-[var(--tebiq-deep-slate)] sm:text-[16px]">
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
      'min-w-0 max-w-full overflow-hidden rounded-card border border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] p-[18px] sm:p-5',
      className,
    )}>
      {children}
    </Component>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[12px] font-medium uppercase tracking-normal text-[var(--tebiq-cool-gray)]">
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
      'inline-flex min-h-[26px] max-w-full shrink-0 items-center gap-1 rounded-chip border px-2.5 py-1 text-[12px] leading-none whitespace-nowrap',
      tone === 'focus'
        ? 'border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] text-[var(--tebiq-ink-blue)]'
        : tone === 'soft'
          ? 'border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-soft-gray)] text-[var(--tebiq-deep-slate)]'
          : 'border-[var(--tebiq-soft-gray)] bg-[var(--tebiq-off-white)] text-[var(--tebiq-deep-slate)]',
    )}>
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />}
      <span className="min-w-0 truncate">{children}</span>
    </span>
  )
}

export function StatusBadge({ state }: { state: AlphaDisplayState }) {
  const config: Record<AlphaDisplayState, { label: string; icon: LucideIcon; focus?: boolean }> = {
    completed: { label: '完成', icon: CheckCircle2 },
    partial: { label: '不完整', icon: TriangleAlert, focus: true },
    streaming: { label: '正在整理', icon: Loader2 },
    timeout_waiting: { label: '处理中', icon: Clock3, focus: true },
    timeout: { label: '未完成', icon: Clock3, focus: true },
    failed: { label: '失败', icon: RefreshCcw, focus: true },
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
  const hint = riskHintPresentation(hits)
  return (
    <div className="rounded-card border border-[var(--tebiq-warm-amber)] bg-[var(--tebiq-off-white)] px-3 py-2.5 text-[12.5px] leading-[1.6] text-[var(--tebiq-ink-blue)]">
      <div className="flex flex-wrap items-center gap-2">
        <TriangleAlert className="h-4 w-4 shrink-0 text-[var(--tebiq-warm-amber)]" strokeWidth={1.55} />
        <span className="font-medium">{hint.title}</span>
        <span className="text-[11.5px] text-[var(--tebiq-deep-slate)]">{hint.body}</span>
        <span className="flex basis-full flex-wrap gap-1 pt-1 sm:basis-auto sm:pt-0">
          {hint.chips.map(chip => (
            <span
              key={chip}
            className="rounded-chip border border-[var(--tebiq-soft-gray)] px-2 py-0.5 text-[11.5px] text-[var(--tebiq-deep-slate)] whitespace-nowrap"
            >
              {chip}
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}

function riskHintPresentation(hits: string[]): { title: string; body: string; chips: string[] } {
  const crisisHits = new Set(['家暴', '证件扣押', '入管通知'])
  const hasCrisis = hits.some(hit => crisisHits.has(hit))
  if (hasCrisis) {
    return {
      title: '安全/证件风险',
      body: '这类问题先处理人身安全、证件和通知期限，再判断在留路径。',
      chips: ['保留证据', '联系警察/支援窗口', '再整理在留影响'],
    }
  }
  const highRiskHits = new Set(['不许可', '补材料', '超期', '离婚', '解雇', '公司清算', '工作不一致', '资格外活动'])
  const hasHighRisk = hits.some(hit => highRiskHits.has(hit))
  if (hasHighRisk) {
    return {
      title: '高风险确认',
      body: '这类问题可能影响更新、变更、届出期限或之后的在留判断。',
      chips: ['先确认事实', '不要急着提交/离境', '必要时专业确认'],
    }
  }
  return {
    title: '需要留意',
    body: RISK_HINT,
    chips: ['先看条件', '确认期限', '保留记录'],
  }
}

export function FeedbackLabel({ type }: { type: FeedbackType }) {
  return <>{feedbackLabel(type)}</>
}

export function feedbackLabel(type: FeedbackType): string {
  switch (type) {
    case 'helpful': return '有帮助'
    case 'inaccurate': return '不准确'
    case 'add_context': return '想补充情况'
    case 'human_review': return '需确认'
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
