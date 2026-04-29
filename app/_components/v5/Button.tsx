import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success'
  children: ReactNode
}

const STYLES = {
  primary:
    'bg-ink text-white hover:bg-primary-hover active:bg-primary-hover disabled:opacity-50',
  secondary:
    'bg-surface text-ink border border-hairline hover:bg-paper active:bg-paper disabled:opacity-50',
  success:
    'bg-ink text-white hover:bg-primary-hover active:bg-primary-hover disabled:opacity-50',
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
      className={`focus-ring w-full min-h-[48px] rounded-btn px-5 py-3 text-[14px] font-medium text-center transition-colors disabled:cursor-not-allowed ${STYLES[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
