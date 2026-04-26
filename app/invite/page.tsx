import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import InviteClient from './InviteClient'

export const dynamic = 'force-dynamic'

export default async function InvitePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/invite')

  return (
    <AppShell appBar={<AppBar title="邀请朋友" back="/my/account" />} tabBar={<TabBar />}>
      <InviteClient />
    </AppShell>
  )
}
