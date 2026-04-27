/**
 * Button — restrained product buttons.
 *
 * variant=primary: 橙底 + 深蓝字（主 CTA）
 * variant=secondary: 透明 + 描边
 * variant=success: 绿底 + 白字（邀请等正向操作）
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success'
  children: ReactNode
}

const STYLES = {
  primary:
    'bg-accent text-ink hover:bg-primary-hover active:bg-primary-hover disabled:opacity-50 shadow-cta',
  secondary:
    'bg-surface text-ink border border-hairline hover:bg-chip disabled:opacity-50 shadow-soft',
  success:
    'bg-success text-white hover:bg-[#486F58] disabled:opacity-50 shadow-soft',
} as const

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={`w-full min-h-[44px] rounded-btn px-4 py-3 text-[14px] font-medium text-center transition-colors active:translate-y-px ${STYLES[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
