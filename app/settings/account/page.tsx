import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import SettingsClient from '../SettingsClient'

export const dynamic = 'force-dynamic'

export default async function AccountSettingsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/settings/account')

  return (
    <AppShell appBar={<AppBar title="账号" back="/settings" />} tabBar={<TabBar />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <h1 className="text-[17px] font-medium leading-snug text-ink">账号和数据</h1>
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          导出 JSON，或提交账号和全部数据删除请求。
        </p>
      </section>
      <SettingsClient />
    </AppShell>
  )
}
