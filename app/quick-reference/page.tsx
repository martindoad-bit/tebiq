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
                速查
              </h1>
              <p className="mt-1 text-[14px] leading-[1.65] text-ash">
                {QUICK_REFERENCE_TOPICS.length} 个常见事项和来源入口。用于核对，不代表个案最终判断。
              </p>
            </div>
          </div>
        </section>

        <QuickReferenceList topics={QUICK_REFERENCE_TOPICS} />

        <p className="mt-5 text-center text-[12.5px] leading-[1.65] text-ash">
          本页不是法律意见，也不判断个案能否许可。最终以官方公告、窗口要求和专业意见为准。
        </p>
      </div>
    </AppShell>
  )
}
