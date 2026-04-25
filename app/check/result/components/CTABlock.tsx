import Link from 'next/link'
import type { Verdict } from '@/lib/check/questions/gijinkoku'

function consultationHref(verdict: Verdict): string {
  return `/consultation?visa=gijinkoku&color=${verdict}`
}

const WRAPPER_CLASS: Record<Verdict, string> = {
  red: 'bg-[#FEE2E2] border border-[#DC2626] rounded-2xl p-5',
  yellow: 'bg-highlight border border-primary rounded-2xl p-5 mt-6',
  green: 'bg-highlight border border-line rounded-2xl p-5',
}

const BUTTON_CLASS: Record<Verdict, string> = {
  red: 'bg-[#DC2626] hover:bg-[#B91C1C] text-white',
  yellow: 'bg-primary hover:bg-primary-hover text-title',
  green: 'bg-slate-700 hover:bg-slate-600 text-title',
}

const DEFAULT_CTA_LABEL: Record<Verdict, string> = {
  red: '立即联系专业书士 →',
  yellow: '联系专业书士确认 →',
  green: '联系专业书士确认 →',
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
    ? 'text-title text-sm leading-relaxed mb-4 font-bold'
    : 'text-body text-sm leading-relaxed mb-4'

  return (
    <div className={WRAPPER_CLASS[verdict]}>
      <p className={descClass}>{description}</p>
      <Link
        href={consultationHref(verdict)}
        className={`flex items-center justify-center w-full ${BUTTON_HEIGHT[verdict]} ${BUTTON_CLASS[verdict]} font-bold py-4 rounded-xl text-sm transition-all`}
      >
        {ctaLabel ?? DEFAULT_CTA_LABEL[verdict]}
      </Link>
    </div>
  )
}
