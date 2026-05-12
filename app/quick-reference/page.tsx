import type { Metadata } from 'next'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import QuickReferenceList from '@/app/quick-reference/QuickReferenceList'
import { QUICK_REFERENCE_TOPICS } from '@/lib/quick-reference/topics'

export const metadata: Metadata = {
  title: '速查 - TEBIQ',
  description: 'TEBIQ 速查：换工作、搬家、年金、税金、在留卡等常见手续的简明核对。',
  alternates: { canonical: '/quick-reference' },
}

export default function QuickReferencePage() {
  return (
    <AppShell appBar={<AppBar title="速查" />} tabBar={<TabBar />}>
      <div className="pt-1">
        <QuickReferenceList topics={QUICK_REFERENCE_TOPICS} />

        <p className="mt-5 border-t border-hairline pt-4 text-[12.5px] leading-[1.65] text-ash">
          具体期限和个案判断，以官方页面、窗口说明或专业确认为准。
        </p>
      </div>
    </AppShell>
  )
}
