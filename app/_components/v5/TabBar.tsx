/**
 */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Archive, MessageSquarePlus, SearchCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

const TABS: { href: string; label: string; Icon: LucideIcon; match: (p: string) => boolean; disabled?: boolean }[] = [
  {
    href: '/ai-consultation',
    label: '提问',
    Icon: MessageSquarePlus,
    match: p => p === '/' || p.startsWith('/ai-consultation'),
  },
  {
    href: '/me/consultations',
    label: '咨询记录',
    Icon: Archive,
    match: p => p.startsWith('/me/consultations') || p.startsWith('/c/'),
  },
  {
    href: '/quick-reference',
    label: '材料',
    Icon: SearchCheck,
    match: p => p.startsWith('/quick-reference'),
  },
]

export default function TabBar() {
  const pathname = usePathname() ?? '/'

  return (
    <nav
      className="tebiq-tabbar w-full max-w-full flex-shrink-0 overflow-hidden border-t border-hairline bg-surface"
      style={{
        height: 'calc(68px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <ul className="grid h-[68px] w-full min-w-0 max-w-full grid-cols-3">
        {TABS.map(({ href, label, Icon, match, disabled }) => {
          const active = !disabled && match(pathname)
          const className = `focus-ring flex h-full w-full min-w-0 max-w-full flex-col items-center justify-center gap-0.5 rounded-none px-0.5 transition-colors ${
            disabled ? 'cursor-not-allowed text-haze opacity-55' : active ? 'text-ink' : 'text-haze'
          }`
          return (
            <li key={href}>
              {disabled ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="材料正在整理中"
                  className={className}
                >
                  <Icon size={21} strokeWidth={1.5} color="#9AA0AC" />
                  <span className="max-w-full truncate whitespace-nowrap text-[10.5px] font-normal leading-none min-[390px]:text-[11px]">{label}</span>
                </button>
              ) : (
                <Link
                  href={href}
                  onClick={() => {
                    if (active) return
                    trackClient(EVENT.TAB_SWITCH, { from: pathname, to: href, label })
                  }}
                  className={className}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.5}
                    color={active ? '#0F2544' : '#9AA0AC'}
                  />
                  <span className="max-w-full truncate whitespace-nowrap text-[10.5px] font-normal leading-none min-[390px]:text-[11px]">{label}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
