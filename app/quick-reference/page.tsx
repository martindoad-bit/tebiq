import type { Metadata } from 'next'
import { SearchCheck } from 'lucide-react'
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
      <div className="pt-3">
        <section className="rounded-card border border-hairline bg-surface px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] border border-hairline bg-paper text-ink">
              <SearchCheck size={20} strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <h1 className="text-[20px] font-medium leading-snug text-ink">
                常见手续，先核对。
              </h1>
              <p className="mt-1 text-[14px] leading-[1.65] text-ash">
                适合已经知道大概方向，想快速确认期限、去哪办和来源。
              </p>
            </div>
          </div>
        </section>

        <QuickReferenceList topics={QUICK_REFERENCE_TOPICS} />

        <p className="mt-5 text-center text-[12.5px] leading-[1.65] text-ash">
          本页用于核对常见信息，不代表个案结论。具体要求以官方来源和窗口说明为准。
        </p>
      </div>
    </AppShell>
  )
}
