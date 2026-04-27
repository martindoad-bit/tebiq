import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: '登录 / 注册 | TEBIQ',
  description: '使用邮箱或手机号登录 TEBIQ — 在日生活手续小帮手。',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: false },
}

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}
