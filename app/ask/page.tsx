import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import AskClient from './AskClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '文字即懂 - TEBIQ',
  description: '粘贴日文通知、邮件或网页文字，用中文看懂重点和通用处理步骤。',
}

export default function AskPage() {
  return (
    <AppShell appBar={<AppBar title="文字即懂" back />} tabBar={<TabBar />}>
      <AskClient />
    </AppShell>
  )
}
