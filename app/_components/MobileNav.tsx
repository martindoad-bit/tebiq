'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/', label: '首页', match: (p: string) => p === '/' },
  { href: '/photo', label: '拍照', match: (p: string) => p.startsWith('/photo') },
  { href: '/timeline', label: '提醒', match: (p: string) => p.startsWith('/timeline') || p.startsWith('/my/reminders') },
  { href: '/my', label: '我的', match: (p: string) => p.startsWith('/my') || p === '/login' },
] as const

export default function MobileNav() {
  const pathname = usePathname() ?? '/'
  // /admin 不显示底部导航
  if (pathname.startsWith('/admin')) return null

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-white border-t border-line"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="grid grid-cols-4 h-16">
        {ITEMS.map(item => {
          const active = item.match(pathname)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`h-full flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-brand-orange' : 'text-brand-gray'
                }`}
              >
                <Icon name={item.href} active={active} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Icon({ name, active }: { name: string; active: boolean }) {
  const stroke = active ? '#0F2544' : '#9AA0AC'
  const fill = active ? '#0F2544' : 'none'
  if (name === '/') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" stroke={active ? '#FFFFFF' : '#9AA0AC'} fill="none" />
      </svg>
    )
  }
  if (name === '/photo') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    )
  }
  if (name === '/timeline') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    )
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
