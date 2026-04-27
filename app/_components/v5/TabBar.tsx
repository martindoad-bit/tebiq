/**
 * TabBar — v5 底部 4-tab 导航。
 *
 * Tabs (per PROJECT_MEMORY): 首页 / 我的档案 / 知识 / 我的
 *  - /         → home
 *  - /my/archive → archive (default child of /my)
 *  - /knowledge → knowledge
 *  - /my/account → account
 */
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, BookOpen, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'

const TABS: { href: string; label: string; Icon: LucideIcon; match: (p: string) => boolean }[] = [
  { href: '/', label: '首页', Icon: Home, match: p => p === '/' },
  {
    href: '/my/archive',
    label: '我的档案',
    Icon: FileText,
    match: p => p.startsWith('/my/archive') || p.startsWith('/my/reminders') || p === '/my',
  },
  {
    href: '/knowledge',
    label: '知识',
    Icon: BookOpen,
    match: p => p.startsWith('/knowledge'),
  },
  {
    href: '/my/account',
    label: '我的',
    Icon: User,
    match: p => p.startsWith('/my/account') || p === '/login',
  },
]

export default function TabBar() {
  const pathname = usePathname() ?? '/'

  return (
    <nav
      className="flex-shrink-0 h-14 bg-surface border-t border-hairline"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4 h-14">
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
                className={`h-full flex flex-col items-center justify-center gap-[3px] transition-colors ${
                  active ? 'text-ink' : 'text-haze'
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={1.7}
                  color={active ? '#C49A5A' : '#B7B1A7'}
                />
                <span className="text-[9.5px] font-normal">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
