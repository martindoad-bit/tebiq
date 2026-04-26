/**
 * Button — v5 按钮（橙底 / 描边）
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
    'bg-accent text-ink hover:bg-[#E5A52E] active:bg-[#E5A52E] disabled:opacity-50',
  secondary:
    'bg-transparent text-ink border border-[rgba(30,58,95,0.18)] hover:bg-[rgba(30,58,95,0.04)] disabled:opacity-50',
  success:
    'bg-success text-white hover:bg-[#4A9069] disabled:opacity-50',
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
      className={`w-full min-h-[44px] rounded-btn px-4 py-3 text-[14px] font-medium text-center transition-colors ${STYLES[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
