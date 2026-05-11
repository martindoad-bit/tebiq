/**
 */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Archive, MessageSquarePlus, SearchCheck, UserCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

const TABS: { href: string; label: string; Icon: LucideIcon; match: (p: string) => boolean }[] = [
  {
    href: '/ai-consultation',
    label: '提问',
    Icon: MessageSquarePlus,
    match: p => p === '/' || p.startsWith('/ai-consultation'),
  },
  {
    href: '/me/consultations',
    label: '我的咨询',
    Icon: Archive,
    match: p => p.startsWith('/me/consultations') || p.startsWith('/c/'),
  },
  {
    href: '/scrivener',
    label: '找书士',
    Icon: UserCheck,
    match: p => p.startsWith('/scrivener') || p.startsWith('/consultation'),
  },
  {
    href: '/quick-reference',
    label: '速查',
    Icon: SearchCheck,
    match: p => p.startsWith('/quick-reference'),
  },
]

export default function TabBar() {
  const pathname = usePathname() ?? '/'

  return (
    <nav
      className="flex-shrink-0 border-t border-hairline bg-surface"
      style={{
        height: 'calc(68px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <ul className="grid h-[68px] grid-cols-4">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match(pathname)
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={() => {
                  if (active) return
                  trackClient(EVENT.TAB_SWITCH, { from: pathname, to: href, label })
                }}
                className={`focus-ring flex h-full flex-col items-center justify-center gap-1 rounded-none transition-colors ${
                  active ? 'text-ink' : 'text-haze'
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.5}
                  color={active ? '#0F2544' : '#9AA0AC'}
                />
                <span className="whitespace-nowrap text-[12px] font-normal leading-none">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
