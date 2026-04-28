/**
 */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Home, User, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

const TABS: { href: string; label: string; Icon: LucideIcon; match: (p: string) => boolean }[] = [
  { href: '/', label: '首页', Icon: Home, match: p => p === '/' },
  {
    href: '/tools',
    label: '工具',
    Icon: Wrench,
    match: p => p.startsWith('/tools') || p.startsWith('/photo') || p.startsWith('/ask') || p.startsWith('/check'),
  },
  {
    href: '/my/reminders',
    label: '提醒',
    Icon: Bell,
    match: p => p.startsWith('/my/reminders'),
  },
  {
    href: '/my/account',
    label: '我的',
    Icon: User,
    match: p => p.startsWith('/my/account') || p.startsWith('/my/archive') || p.startsWith('/timeline') || p === '/my' || p === '/login',
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
