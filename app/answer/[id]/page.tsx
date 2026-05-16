import Link from 'next/link'
import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import {
  BrandHeader,
  ConsultationShell,
  Surface,
} from '@/components/ui/consultation-alpha'
import { getAnswerDraftById } from '@/lib/db/queries/answerDrafts'
import { getAiConsultationById } from '@/lib/db/queries/aiConsultations'
import { extractAnswerRun, reconstructLegacyRun } from '@/lib/answer/core/persistence'
import { toViewModel } from '@/lib/answer/core/view-model'
import type { AnswerSection } from '@/lib/answer/types'
import { matchRouteGates } from '@/lib/consultation/route-gates'
import { getHandoffForMatches } from '@/lib/consultation/deep-water-handoff'
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
  if (id === 'test') redirect('/ai-consultation')
  const draft = await getAnswerDraftById(id).catch(() => null)

  if (!draft) {
    const consultation = await getAiConsultationById(id).catch(() => null)
    if (consultation) {
      redirect(`/c/${encodeURIComponent(id)}`)
    }
    return (
      <ConsultationShell tabBar={<TabBar />}>
        <div className="space-y-5">
          <BrandHeader
            eyebrow="咨询记录"
            title="这条链接暂时打不开"
            description="这可能是较早生成的回答链接，或记录已经不存在。可以回到“咨询记录”查看，或重新开始。"
            action={
              <Link
                href="/ai-consultation"
                className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[13px] font-medium text-[var(--tebiq-off-white)]"
              >
                提问
              </Link>
            }
          />
          <Surface className="space-y-3">
            <p className="text-[14.5px] leading-[1.7] text-[var(--tebiq-deep-slate)]">
              如果这是刚刚复制的咨询链接，请优先打开“咨询记录”；新的咨询记录请从“咨询记录”打开。
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/me/consultations"
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-btn border border-[var(--tebiq-soft-gray)] px-3 text-[14px] font-medium text-[var(--tebiq-ink-blue)]"
              >
                咨询记录
              </Link>
              <Link
                href="/ai-consultation"
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-btn bg-[var(--tebiq-ink-blue)] px-3 text-[14px] font-medium text-[var(--tebiq-off-white)]"
              >
                重新咨询
              </Link>
            </div>
          </Surface>
        </div>
      </ConsultationShell>
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

  // Deep-water professional handoff (Program 4 / 0.8.5).
  // Computed server-side from the persisted question text so the answer
  // page can render the "找谁确认" block whenever the underlying
  // question hit a deep-water route gate. Pure, no DB write — same
  // matcher the streaming endpoint uses to build prompt context.
  const handoff = getHandoffForMatches(
    matchRouteGates({ question: draft.questionText ?? '' }),
  )

  return (
    <AppShell appBar={<AppBar title="下一步" back="/" />} tabBar={<TabBar />}>
      <AnswerResultView viewModel={viewModel} answerId={draft.id} handoff={handoff} />
    </AppShell>
  )
}
