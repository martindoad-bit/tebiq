'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  {
    href: '/ai-consultation',
    label: '提问',
    match: (p: string) => p === '/' || p.startsWith('/ai-consultation'),
  },
  {
    href: '/me/consultations',
    label: '我的咨询',
    match: (p: string) =>
      p.startsWith('/me/consultations') || p.startsWith('/c/'),
  },
  {
    href: '/scrivener',
    label: '找书士',
    match: (p: string) =>
      p.startsWith('/scrivener') || p.startsWith('/consultation'),
  },
  {
    href: '/quick-reference',
    label: '材料',
    match: (p: string) => p.startsWith('/quick-reference'),
  },
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
        {ITEMS.map((item) => {
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
  if (name === '/ai-consultation') {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M12 7v6" />
        <path d="M9 10h6" />
      </svg>
    )
  }
  if (name === '/me/consultations') {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 8v13H3V8" />
        <path d="M1 3h22v5H1z" />
        <path d="M10 12h4" />
      </svg>
    )
  }
  if (name === '/scrivener') {
    return (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </svg>
    )
  }
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="3" width="8" height="4" rx="1.5" />
      <path d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  )
}
