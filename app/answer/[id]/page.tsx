import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getAnswerDraftById } from '@/lib/db/queries/answerDrafts'
import { ANSWER_BOUNDARY_NOTE, type AnswerLink, type AnswerSection, type AnswerSource } from '@/lib/answer/types'
import AnswerFeedbackClient from './AnswerFeedbackClient'

export const dynamic = 'force-dynamic'

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const draft = await getAnswerDraftById(id).catch(() => null)

  if (!draft) {
    return (
      <AppShell appBar={<AppBar title="整理结果" back="/" />} tabBar={<TabBar />}>
        <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-5">
          <h1 className="text-[18px] font-medium text-ink">回答不存在或已过期</h1>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash">
            可以回到首页重新整理这个问题。
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-[40px] items-center rounded-btn bg-ink px-4 text-[13px] font-medium text-white"
          >
            返回首页
          </Link>
        </section>
      </AppShell>
    )
  }

  const sections = draft.sectionsJson as AnswerSection[]
  const nextSteps = draft.nextStepsJson as string[]
  const relatedLinks = draft.relatedLinksJson as AnswerLink[]
  const sources = draft.sourcesJson as AnswerSource[]

  return (
    <AppShell appBar={<AppBar title="整理结果" back="/" />} tabBar={<TabBar />}>
      <section className="mt-3 border-b border-hairline pb-5">
        <div className="flex flex-wrap gap-2">
          <Badge>{statusLabel(draft.answerType)}</Badge>
          <Badge>{draft.answerLevel}</Badge>
          <Badge>{reviewLabel(draft.reviewStatus)}</Badge>
        </div>
        <h1 className="mt-3 text-[22px] font-medium leading-snug text-ink">{draft.title}</h1>
        <p className="mt-3 text-[13px] leading-[1.75] text-slate">{draft.summary}</p>
      </section>

      <section className="mt-4 grid gap-3">
        {sections.map(section => (
          <article key={section.heading} className="rounded-card border border-hairline bg-surface px-4 py-4">
            <h2 className="text-[14px] font-medium text-ink">{section.heading}</h2>
            <p className="mt-2 whitespace-pre-line text-[12.5px] leading-[1.75] text-slate">{section.body}</p>
          </article>
        ))}
      </section>

      {nextSteps.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[14px] font-medium text-ink">下一步确认</h2>
          <ol className="mt-3 grid gap-2">
            {nextSteps.map((step, index) => (
              <li key={`${index}-${step}`} className="flex gap-3 text-[12.5px] leading-[1.65] text-slate">
                <span className="numeric flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-paper text-[11px] text-ash">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[14px] font-medium text-ink">相关入口</h2>
          <div className="mt-3 grid gap-2">
            {relatedLinks.map(link => (
              <Link
                key={`${link.href}-${link.title}`}
                href={link.href}
                className="flex min-h-[40px] items-center justify-between rounded-[10px] border border-hairline bg-canvas px-3 text-[12px] text-ink"
              >
                <span>{link.title}</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {sources.length > 0 && (
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4">
          <h2 className="text-[14px] font-medium text-ink">来源</h2>
          <ul className="mt-2 grid gap-2 text-[12px] leading-[1.6] text-slate">
            {sources.map(source => (
              <li key={`${source.title}-${source.url ?? ''}`} className="flex items-start gap-2">
                <ExternalLink size={13} className="mt-0.5 flex-shrink-0 text-ash" strokeWidth={1.5} />
                {source.url ? (
                  <a href={source.url} className="underline underline-offset-2" target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}</span>
                )}
                {source.source_grade && <span className="text-ash">({source.source_grade})</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-3 rounded-card border border-hairline bg-paper px-4 py-3">
        <p className="text-[12px] leading-[1.7] text-ash">{ANSWER_BOUNDARY_NOTE}</p>
      </section>

      <AnswerFeedbackClient answerId={draft.id} />
    </AppShell>
  )
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-[8px] bg-paper px-2 py-1 text-[11px] text-ash">{children}</span>
}

function statusLabel(type: string) {
  if (type === 'matched') return '已整理'
  if (type === 'draft') return '初步整理，尚未人工复核'
  return '这个情况需要进一步确认'
}

function reviewLabel(status: string) {
  if (status === 'reviewed') return '已复核'
  if (status === 'needs_expert') return '需要专家确认'
  if (status === 'rejected') return '已退回'
  return '未人工复核'
}
