import Link from 'next/link'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getAnswerDraftById } from '@/lib/db/queries/answerDrafts'
import { extractAnswerRun, reconstructLegacyRun } from '@/lib/answer/core/persistence'
import { toViewModel } from '@/lib/answer/core/view-model'
import type { AnswerSection } from '@/lib/answer/types'
import AnswerResultView from './AnswerResultView'

// Answer Core V1 page.
//
// Read path:
//   1. Load the answer_drafts row.
//   2. Extract the AnswerRun JSON from sectionsJson (sidecar pattern).
//      If the row predates V1 (no sidecar), reconstruct a minimal
//      AnswerRun from the legacy fields so the page still renders.
//   3. Convert AnswerRun → AnswerViewModel.
//   4. Pass to AnswerResultView. The view never sees legacy fields.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '下一步 | TEBIQ',
  description: 'TEBIQ 根据用户问题整理下一步、材料、期限和办理窗口。',
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const draft = await getAnswerDraftById(id).catch(() => null)

  if (!draft) {
    return (
      <AppShell appBar={<AppBar title="下一步" back="/" />} tabBar={<TabBar />}>
        <section className="mt-4 rounded-card border border-hairline bg-surface px-4 py-5">
          <h1 className="text-[18px] font-medium text-ink">回答不存在或已过期</h1>
          <p className="mt-2 text-[12px] leading-[1.7] text-ash">
            可以回到首页继续问。
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

  const sections = (draft.sectionsJson as AnswerSection[]) ?? []
  const { run } = extractAnswerRun(sections.map(s => ({ heading: s.heading, body: s.body })))

  const finalRun = run ?? reconstructLegacyRun({
    rawQuery: draft.questionText,
    legacyTitle: draft.title,
    legacySummary: draft.summary,
    legacySections: sections.map(s => ({ heading: s.heading, body: s.body })),
    legacyNextSteps: (draft.nextStepsJson as string[]) ?? [],
    legacyAnswerType: draft.answerType,
    legacyReviewStatus: draft.reviewStatus,
    legacyDraftId: draft.id,
  })

  const viewModel = toViewModel(finalRun, { id: draft.id })

  return (
    <AppShell appBar={<AppBar title="下一步" back="/" />} tabBar={<TabBar />}>
      <AnswerResultView viewModel={viewModel} answerId={draft.id} />
    </AppShell>
  )
}
