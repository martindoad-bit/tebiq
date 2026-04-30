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
    tone === 'green' ? 'text-slate' : tone === 'red' ? 'text-warning' : 'text-ink'
  return (
    <div className="rounded-card border border-hairline bg-surface p-4">
      <div className="mb-2 text-xs text-ash">{label}</div>
      <div className={`${valColor} numeric text-3xl font-light leading-none`}>
        {value.toLocaleString()}
        <span className="ml-1 text-base text-ash">{unit}</span>
      </div>
      {hint && <div className="mt-2 text-[10px] text-ash">{hint}</div>}
    </div>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 px-1 text-sm font-medium text-ink">{title}</h2>
      {children}
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate">{label}</span>
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
    <div className="flex-1 px-4 pb-[env(safe-area-inset-bottom)] py-8 md:py-12">
      <div className="mx-auto max-w-md md:max-w-5xl">
        <h1 className="mb-2 text-2xl font-medium text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mb-6 max-w-2xl text-xs leading-6 text-ash">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
