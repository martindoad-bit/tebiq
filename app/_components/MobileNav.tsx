'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/', label: '首页', match: (p: string) => p === '/' },
  { href: '/visa-select', label: '自查', match: (p: string) => p.startsWith('/visa-select') || p.startsWith('/check') },
  { href: '/knowledge', label: '知识', match: (p: string) => p.startsWith('/knowledge') },
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
  const stroke = active ? '#E56F4F' : '#46534F'
  const fill = active ? '#E56F4F' : 'none'
  if (name === '/') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" stroke={active ? '#FFFFFF' : '#46534F'} fill="none" />
      </svg>
    )
  }
  if (name === '/visa-select') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3 7-7" />
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" />
      </svg>
    )
  }
  if (name === '/knowledge') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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
