/**
 */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Camera, Home, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

const TABS: { href: string; label: string; Icon: LucideIcon; match: (p: string) => boolean }[] = [
  { href: '/', label: '首页', Icon: Home, match: p => p === '/' },
  {
    href: '/photo',
    label: '拍照',
    Icon: Camera,
    match: p => p.startsWith('/photo'),
  },
  {
    href: '/timeline',
    label: '提醒',
    Icon: Bell,
    match: p => p.startsWith('/timeline') || p.startsWith('/my/reminders'),
  },
  {
    href: '/my/account',
    label: '我的',
    Icon: User,
    match: p => p.startsWith('/my/account') || p.startsWith('/my/archive') || p.startsWith('/my/profile') || p === '/my' || p === '/login',
  },
]

export default function TabBar() {
  const pathname = usePathname() ?? '/'

  return (
    <nav
      className="flex-shrink-0 h-16 bg-surface border-t border-hairline"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid h-16 grid-cols-4">
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
                className={`flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-ink' : 'text-haze'
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={1.75}
                  color={active ? '#E56F4F' : '#B7C0C7'}
                />
                <span className="text-[10.5px] font-medium">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
