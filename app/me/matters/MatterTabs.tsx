'use client'

import Link from 'next/link'

interface Props {
  current: 'active' | 'closed'
  tabs: Array<{ key: 'active' | 'closed'; label: string }>
}

export default function MatterTabs({ current, tabs }: Props) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--tebiq-soft-gray)]">
      {tabs.map(tab => {
        const isActive = tab.key === current
        const href = tab.key === 'active' ? '/me/matters' : `/me/matters?status=${tab.key}`
        return (
          <Link
            key={tab.key}
            href={href}
            className={`inline-flex h-9 items-center border-b-2 px-3 text-[13.5px] font-medium transition-colors ${
              isActive
                ? 'border-[var(--tebiq-ink-blue)] text-[var(--tebiq-ink-blue)]'
                : 'border-transparent text-[var(--tebiq-deep-slate)] hover:text-[var(--tebiq-ink-blue)]'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
