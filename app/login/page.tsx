import { Suspense } from 'react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import AuthPageClient from './AuthPageClient'

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <AuthPageClient intent="login" />
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
