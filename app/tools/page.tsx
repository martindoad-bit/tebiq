import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import ToolsClient from './ToolsClient'

export const metadata = {
  title: '工具 - TEBIQ',
  description: 'TEBIQ 的在日生活工具：拍照即懂、续签材料准备检查、我的提醒。',
}

export default function ToolsPage() {
  return (
    <AppShell appBar={<AppBar title="工具" />} tabBar={<TabBar />}>
      <ToolsClient />
    </AppShell>
  )
}
