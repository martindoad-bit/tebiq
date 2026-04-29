import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

type BadgeTone = 'neutral' | 'checked' | 'attention' | 'expired' | 'recent'

const badgeToneClass: Record<BadgeTone, string> = {
  neutral: 'bg-paper text-ash',
  checked: 'bg-paper text-ink',
  attention: 'bg-[#FFF4E1] text-warning',
  expired: 'bg-[#FFF4E1] text-warning',
  recent: 'bg-paper text-ash',
}

export function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: BadgeTone
}) {
  return (
    <span
      className={`inline-flex min-h-[22px] items-center rounded-chip px-2 text-[10.5px] font-normal leading-none ${badgeToneClass[tone]}`}
    >
      {children}
    </span>
  )
}

export function RiskMark({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'warning'
}) {
  return (
    <span
      className={`inline-flex min-h-[20px] items-center rounded-[6px] px-1.5 text-[10.5px] font-normal leading-none ${
        tone === 'warning'
          ? 'bg-[#FFF4E1] text-warning'
          : 'bg-paper text-ash'
      }`}
    >
      {children}
    </span>
  )
}

export function SectionLabel({
  title,
  action,
  href,
}: {
  title: string
  action?: string
  href?: string
}) {
  return (
    <div className="mt-6 flex items-center justify-between px-0.5">
      <h2 className="text-[14px] font-medium leading-none text-ink">{title}</h2>
      {action && href && (
        <Link href={href} className="flex items-center text-[12px] leading-none text-ash">
          {action}
          <ChevronRight size={14} strokeWidth={1.5} />
        </Link>
      )}
    </div>
  )
}

export function ListSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`overflow-hidden rounded-card border border-hairline bg-surface ${className}`}
    >
      {children}
    </section>
  )
}

export function ListRow({
  icon,
  title,
  subtitle,
  href,
  right,
  onClick,
}: {
  icon?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  href?: string
  right?: ReactNode
  onClick?: () => void
}) {
  const inner = (
    <>
      {icon && <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center text-ink">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-normal leading-snug text-ink">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block truncate text-[12px] leading-snug text-ash">{subtitle}</span>
        )}
      </span>
      {right ?? <ChevronRight size={18} strokeWidth={1.5} className="flex-shrink-0 text-haze" />}
    </>
  )

  const className =
    'flex min-h-[56px] w-full items-center gap-3 border-b border-hairline px-4 text-left last:border-b-0 focus-ring active:bg-paper'

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {inner}
      </button>
    )
  }

  return <div className={className}>{inner}</div>
}

export function PrimaryButton({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`focus-ring flex min-h-[48px] w-full items-center justify-center rounded-btn bg-ink px-4 py-3 text-[14px] font-medium leading-none text-white disabled:opacity-45 ${className}`}
    >
      {children}
    </button>
  )
}

export function SecondaryLink({
  children,
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={`focus-ring flex min-h-[48px] w-full items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-3 text-[14px] font-medium leading-none text-ink ${className}`}
    >
      {children}
    </a>
  )
}

export function DeadlineRow({
  date,
  days,
  title,
  detail,
  href,
  status,
  urgent,
}: {
  date: string
  days: string
  title: string
  detail?: string
  href?: string
  status?: string
  urgent?: boolean
}) {
  const statusTone: BadgeTone =
    status === '待处理' || status === '需要补齐' ? 'attention' : 'neutral'
  const content = (
    <>
      <span className="w-[64px] flex-shrink-0">
        <span className="block text-[15px] font-light leading-none text-ink numeric">{date}</span>
        <span className={`mt-1.5 block text-[11px] leading-none ${urgent ? 'text-warning' : 'text-ash'}`}>
          {days}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-normal leading-snug text-ink">{title}</span>
        {detail && <span className="mt-1 block truncate text-[12px] leading-snug text-ash">{detail}</span>}
      </span>
      {status && <StatusBadge tone={statusTone}>{status}</StatusBadge>}
      <ChevronRight size={16} strokeWidth={1.5} className="flex-shrink-0 text-haze" />
    </>
  )
  const className = 'flex min-h-[64px] items-center gap-3 border-b border-hairline px-4 last:border-b-0'
  return href ? (
    <Link href={href} className={`${className} active:bg-paper`}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}
