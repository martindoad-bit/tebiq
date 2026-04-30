'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS: Array<{ href: string; label: string }> = [
  { href: '/admin', label: '概览' },
  { href: '/admin/analytics', label: 'KPI' },
  { href: '/admin/users', label: '用户' },
  { href: '/admin/consultations', label: '咨询' },
  { href: '/admin/questions', label: '问题' },
  { href: '/admin/review-lite', label: 'Review' },
  { href: '/admin/knowledge', label: '知识' },
  { href: '/admin/dev-login', label: 'Dev 登录' },
  { href: '/admin/quiz-results', label: '自查记录' },
  { href: '/admin/monitor', label: '监控' },
]

export default function AdminNav({ adminKey }: { adminKey: string }) {
  const pathname = usePathname()
  const keyParam = adminKey ? `?key=${encodeURIComponent(adminKey)}` : ''
  return (
    <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
      <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href={`/${keyParam}`} className="flex items-center gap-3 flex-shrink-0" aria-label="TEBIQ 首页">
          <Image src="/logo-icon.png" alt="" width={40} height={40} className="rounded-xl" />
          <div className="hidden sm:block">
            <div className="text-lg font-bold text-title leading-none">TEBIQ</div>
            <div className="text-[10px] text-muted leading-tight mt-0.5">てびき · 后台</div>
          </div>
        </Link>
        <nav className="flex-1 overflow-x-auto -mx-2 px-2">
          <ul className="flex items-center gap-1 min-w-max justify-end">
            {TABS.map(tab => {
              const active =
                tab.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(tab.href)
              return (
                <li key={tab.href}>
                  <Link
                    href={`${tab.href}${keyParam}`}
                    className={
                      active
                        ? 'px-3 py-1.5 rounded-full bg-primary text-slate-900 text-sm font-bold whitespace-nowrap'
                        : 'px-3 py-1.5 rounded-full text-body hover:bg-highlight/50 text-sm whitespace-nowrap'
                    }
                  >
                    {tab.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
