import type { Metadata } from 'next'
import { Suspense } from 'react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import AuthPageClient from '@/app/login/AuthPageClient'

export const metadata: Metadata = {
  title: '注册账号 | TEBIQ',
  description: '注册 TEBIQ，保存拍照识别结果和在日生活手续提醒。',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <AuthPageClient intent="register" />
    </Suspense>
  )
}

function LoadingShell() {
  return (
    <AppShell appBar={<AppBar back="/" />}>
      <div className="text-ash mt-12 text-center">载入中…</div>
    </AppShell>
  )
}
