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
    <div className="bg-card border border-line rounded-2xl p-4">
      <div className="text-muted text-xs mb-2">{label}</div>
      <div className={`${valColor} text-3xl font-bold leading-none`}>
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
      <h2 className="text-primary font-bold text-sm mb-3 px-1">{title}</h2>
      {children}
    </div>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-body text-xs font-bold mb-1 block">{label}</span>
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
    <div className="flex-1 px-4 py-8 md:py-12 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md md:max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-muted text-xs mb-6">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
