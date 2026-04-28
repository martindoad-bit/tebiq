import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import ToolsClient from './ToolsClient'

export const metadata = {
  title: '工具 - TEBIQ',
  description: 'TEBIQ 的在日生活工具：拍照即懂、文字即懂、续签自查、任务清单。',
}

export default function ToolsPage() {
  return (
    <AppShell appBar={<AppBar title="工具" />} tabBar={<TabBar />}>
      <ToolsClient />
    </AppShell>
  )
}
