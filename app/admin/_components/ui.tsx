'use client'
import type { ReactNode } from 'react'

export function StatCard({
  label,
  value,
  unit,
  hint,
  tone,
}: {
  label: string
  value: number
  unit: string
  hint?: string
  tone?: 'green' | 'red'
}) {
  const valColor =
    tone === 'green' ? 'text-[#16A34A]' : tone === 'red' ? 'text-[#DC2626]' : 'text-primary'
  return (
    <div className="rounded-card border border-hairline bg-surface p-4">
      <div className="text-muted text-xs mb-2">{label}</div>
      <div className={`${valColor} text-3xl font-medium leading-none`}>
        {value.toLocaleString()}
        <span className="text-base text-muted ml-1">{unit}</span>
      </div>
      {hint && <div className="text-muted text-[10px] mt-2">{hint}</div>}
    </div>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-primary font-medium text-sm mb-3 px-1">{title}</h2>
      {children}
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-body text-xs font-medium mb-1 block">{label}</span>
      {children}
    </label>
  )
}

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="flex-1 bg-canvas px-4 py-8 pb-[env(safe-area-inset-bottom)] md:py-12">
      <div className="max-w-md md:max-w-5xl mx-auto">
        <h1 className="mb-2 text-[22px] font-medium leading-tight text-ink md:text-[28px]">{title}</h1>
        {subtitle && <p className="mb-6 max-w-[720px] text-[12px] leading-[1.65] text-ash">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
