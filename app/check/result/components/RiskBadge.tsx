import type { Severity } from '@/lib/check/questions/gijinkoku'

const DOT_BG: Record<Severity, string> = {
  red: 'bg-warning',
  yellow: 'bg-haze',
}

const TEXT_COLOR: Record<Severity, string> = {
  red: 'text-warning',
  yellow: 'text-ink',
}

const DEFAULT_LABELS: Record<Severity, string> = {
  red: '待确认',
  yellow: '需注意',
}

export default function RiskBadge({
  severity,
  label,
}: {
  severity: Severity
  label?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 ${TEXT_COLOR[severity]} text-xs font-medium`}
    >
      <span
        aria-hidden
        className={`inline-block w-2 h-2 rounded-full ${DOT_BG[severity]}`}
      />
      {label ?? DEFAULT_LABELS[severity]}
    </span>
  )
}
