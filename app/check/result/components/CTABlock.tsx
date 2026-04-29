import type { Verdict } from '@/lib/check/questions/gijinkoku'

const WRAPPER_CLASS: Record<Verdict, string> = {
  red: 'bg-surface border border-warning/55 rounded-card p-5',
  yellow: 'bg-surface border border-hairline rounded-card p-5 mt-6',
  green: 'bg-surface border border-hairline rounded-card p-5',
}

const BUTTON_CLASS: Record<Verdict, string> = {
  red: 'bg-ink hover:bg-primary-hover text-white',
  yellow: 'bg-ink hover:bg-primary-hover text-white',
  green: 'bg-ink hover:bg-primary-hover text-white',
}

const DEFAULT_CTA_LABEL: Record<Verdict, string> = {
  red: '咨询专家确认',
  yellow: '咨询专家确认',
  green: '咨询专家确认',
}

const BUTTON_HEIGHT: Record<Verdict, string> = {
  red: 'min-h-[60px]',
  yellow: 'min-h-[60px]',
  green: 'min-h-[56px]',
}

export default function CTABlock({
  verdict,
  description,
  ctaLabel,
  emphasizeDescription = false,
}: {
  verdict: Verdict
  description: React.ReactNode
  ctaLabel?: string
  /** Bold + larger description (used in red verdict). */
  emphasizeDescription?: boolean
}) {
  const descClass = emphasizeDescription
    ? 'text-title text-sm leading-relaxed mb-4 font-medium'
    : 'text-body text-sm leading-relaxed mb-4'

  return (
    <div className={WRAPPER_CLASS[verdict]}>
      <p className={descClass}>{description}</p>
      <div
        className={`flex items-center justify-center w-full ${BUTTON_HEIGHT[verdict]} ${BUTTON_CLASS[verdict]} font-medium py-4 rounded-btn text-sm`}
      >
        {ctaLabel ?? DEFAULT_CTA_LABEL[verdict]}
      </div>
    </div>
  )
}
