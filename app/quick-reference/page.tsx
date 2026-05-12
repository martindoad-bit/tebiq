import type { Metadata } from 'next'
import { SearchCheck } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import QuickReferenceList from '@/app/quick-reference/QuickReferenceList'
import { QUICK_REFERENCE_TOPICS } from '@/lib/quick-reference/topics'

export const metadata: Metadata = {
  title: '速查 - TEBIQ',
  description: 'TEBIQ 速查：在留卡、出入境、打工、换工作、永住等常见手续的简明参考。',
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
                常见手续先核对
              </h1>
              <p className="mt-1 text-[14px] leading-[1.65] text-ash">
                用于核对常见手续；情况复杂时，可以带材料继续提问。
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
