import type { Metadata } from 'next'
import { BookOpenText, ExternalLink, SearchCheck } from 'lucide-react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'
import TabBar from '@/app/_components/v5/TabBar'
import { StatusBadge } from '@/components/ui/tebiq'
import {
  QUICK_REFERENCE_TOPICS,
  type QuickReferenceFact,
  type QuickReferenceVerification,
} from '@/lib/quick-reference/topics'

export const metadata: Metadata = {
  title: '速查 - TEBIQ',
  description: 'TEBIQ 速查：在留卡、出入境、打工、换工作、永住等常见手续的简明参考。',
  alternates: { canonical: '/quick-reference' },
}

const verificationLabel: Record<QuickReferenceVerification, string> = {
  'source-backed': '有来源',
  'needs-check': '需确认',
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
              <h1 className="text-[17px] font-medium leading-snug text-ink">
                速查
              </h1>
              <p className="mt-1 text-[12px] leading-[1.65] text-ash">
                查看常见在留事项和官方信息入口。内容用于核对，不代表个案最终判断。
              </p>
            </div>
          </div>
        </section>

        <div className="mt-3 space-y-3">
          {QUICK_REFERENCE_TOPICS.map(topic => (
            <article
              key={topic.id}
              id={topic.id}
              className="rounded-card border border-hairline bg-surface px-4 py-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge>{topic.category}</StatusBadge>
                    {topic.facts.some(fact => fact.verification === 'needs-check') && (
                      <StatusBadge tone="attention">含需确认</StatusBadge>
                    )}
                  </div>
                  <h2 className="mt-3 text-[16px] font-medium leading-snug text-ink">
                    {topic.title}
                  </h2>
                  <p className="mt-1 text-[12px] leading-[1.65] text-ash">
                    {topic.summary}
                  </p>
                </div>
                <BookOpenText
                  size={19}
                  strokeWidth={1.5}
                  className="mt-0.5 flex-shrink-0 text-haze"
                />
              </div>

              <dl className="mt-4 space-y-2.5">
                {topic.facts.map(fact => (
                  <FactRow key={`${topic.id}-${fact.label}`} fact={fact} />
                ))}
              </dl>

              <div className="mt-4 rounded-[8px] border border-hairline bg-paper px-3 py-2.5">
                <p className="text-[11.5px] leading-[1.6] text-ash">
                  <span className="font-medium text-ink">需要核对：</span>
                  {topic.checkNote}
                </p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {topic.sources.map(source => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex min-h-[32px] items-center gap-1.5 rounded-btn border border-hairline bg-surface px-2.5 text-[11px] leading-none text-ink active:bg-paper"
                  >
                    {source.label}
                    <ExternalLink size={12} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] leading-[1.65] text-ash">
          本页不是法律意见，也不判断个案能否许可。最终以官方公告、窗口要求和专业意见为准。
        </p>
      </div>
    </AppShell>
  )
}

function FactRow({ fact }: { fact: QuickReferenceFact }) {
  const isNeedsCheck = fact.verification === 'needs-check'

  return (
    <div className="rounded-[8px] border border-hairline px-3 py-2.5">
      <dt className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-medium leading-snug text-ink">{fact.label}</span>
        <StatusBadge tone={isNeedsCheck ? 'attention' : 'checked'}>
          {verificationLabel[fact.verification]}
        </StatusBadge>
      </dt>
      <dd className="mt-1.5 text-[12px] leading-[1.65] text-slate">{fact.text}</dd>
    </div>
  )
}
