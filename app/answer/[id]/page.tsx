import Link from 'next/link'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getAnswerDraftById } from '@/lib/db/queries/answerDrafts'
import { ANSWER_BOUNDARY_NOTE, type AnswerLink, type AnswerSection, type AnswerSource } from '@/lib/answer/types'
import AnswerResultView, { type AnswerResult } from './AnswerResultView'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '整理结果 | TEBIQ',
  description: 'TEBIQ 根据用户问题整理的手续路径和注意事项。',
}

const DEMO_ANSWERS: Record<string, AnswerResult> = {
  'demo-matched': {
    id: 'demo-matched',
    status: 'matched',
    title: '公司休眠后，新工作入职前，要不要切国民年金',
    question: '原公司休眠，新公司还没办完入职手续。区役所问我要不要切国民年金。',
    answerLevel: 'L3',
    answerType: '决策辅助',
    reviewStatus: '已整理',
    summary:
      '先把社保和年金空档处理成可说明、可证明的状态。是否影响在留结果，需要结合退社日、入社日、在留资格和缴纳记录确认。',
    sections: [
      {
        title: '先处理什么',
        body: '向居住地市区町村确认国民年金和国民健康保険的切换或待处理方式。窗口给出的说明、缴纳记录和受理记录都要保存。',
      },
      {
        title: '为什么需要记录',
        body: '续签或变更时，空档本身不一定等于问题，但没有记录会让说明变弱。能证明“何时离职、何时入职、期间怎么处理年金/保险”更重要。',
      },
      {
        title: '和新会社的手续关系',
        body: '新会社完成社会保険加入后，保存資格取得日、給与明細、雇用契約書等材料。前后日期要能对上。',
      },
    ],
    nextSteps: [
      '确认退社日、会社休眠日、新会社入职预定日。',
      '去市区町村窗口确认国民年金 / 国民健康保険处理方式。',
      '保存窗口记录、缴纳记录、新会社社保加入记录。',
    ],
    sourceHint: '参考：日本年金機構、市区町村 国民健康保険 手续说明。',
    boundaryNote: ANSWER_BOUNDARY_NOTE,
  },
  'demo-draft': {
    id: 'demo-draft',
    status: 'draft',
    title: '办公室搬迁后，经营管理签要先处理什么',
    question: '经营管理签，办公室下个月搬迁。地址变更、税务、入管要按什么顺序处理？',
    answerLevel: 'L2',
    answerType: '手续路径',
    reviewStatus: '初步整理，尚未人工复核',
    summary:
      '通常先确认实际经营场所和租约，再按会社登记、税务、在留相关材料的顺序整理。不同会社状态会影响先后顺序。',
    sections: [
      {
        title: '先确认经营场所',
        body: '确认新办公室的租约、使用开始日、用途、面积和实际经营状态。经营管理签尤其需要能说明办公室作为事业场所的实际性。',
      },
      {
        title: '再整理登记和税务',
        body: '会社本店地址变更、税務署 / 都税事務所 / 市区町村等手续是否需要变更，要按会社实际情况确认。',
      },
      {
        title: '最后准备在留说明材料',
        body: '如果之后要续签或变更，建议保存新旧租约、办公室照片、费用支付记录、登记变更记录和税务相关提交记录。',
      },
    ],
    nextSteps: [
      '确认新办公室合同和使用开始日。',
      '列出会社登记、税务、社保、入管相关材料。',
      '把新旧地址相关文件归档到同一条时间线。',
    ],
    sourceHint: '来源提示：法務局、税務署、自治体公开手续说明。此条尚未人工复核。',
    boundaryNote: ANSWER_BOUNDARY_NOTE,
  },
  'demo-cannot-determine': {
    id: 'demo-cannot-determine',
    status: 'cannot_determine',
    title: '这个情况需要进一步确认',
    question: '我换工作、搬家、家属签证也快到期，哪些手续要先做？',
    answerLevel: 'L4',
    answerType: '个案判断',
    reviewStatus: '需要专家确认',
    summary:
      '这个问题同时涉及工作、住所、家族成员和在留期限，不能只按单一手续给出顺序。需要先补齐关键日期和身份信息。',
    sections: [
      {
        title: '你可以先确认这些信息',
        body: '本人和家属的在留期限、退社日、新会社入职日、搬家日、住民票异动日、家属当前在留资格和是否同居。',
      },
      {
        title: '建议咨询的专业人士',
        body: '在留手续专业人士负责在留资格和入管材料判断；社労士可确认社会保険 / 年金空档；税理士可确认收入和税务材料。',
      },
    ],
    nextSteps: [
      '先整理所有日期：退社、入职、搬家、在留期限。',
      '把家属的在留カード和住民票信息放在同一份材料清单里。',
      '带着时间线咨询相关专业人士。',
    ],
    sourceHint: '此类问题需要结合个案材料，不适合只用公开资料直接判断。',
    boundaryNote: ANSWER_BOUNDARY_NOTE,
  },
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const draft = await getAnswerDraftById(id).catch(() => null)
  const answer = draft ? draftToAnswer(draft) : DEMO_ANSWERS[id]

  if (!answer) {
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

  return (
    <AppShell appBar={<AppBar title="整理结果" back="/" />} tabBar={<TabBar />}>
      <AnswerResultView answer={answer} answerId={draft?.id ?? null} />
    </AppShell>
  )
}

type AnswerDraftRow = NonNullable<Awaited<ReturnType<typeof getAnswerDraftById>>>

function draftToAnswer(draft: AnswerDraftRow): AnswerResult {
  const sections = draft.sectionsJson as AnswerSection[]
  const nextSteps = draft.nextStepsJson as string[]
  const relatedLinks = draft.relatedLinksJson as AnswerLink[]
  const sources = draft.sourcesJson as AnswerSource[]
  const sourceHint = sources.length > 0
    ? sources.map(source => source.title).join(' / ')
    : relatedLinks.length > 0
      ? relatedLinks.map(link => link.title).join(' / ')
      : '来源提示：系统根据已整理内容和公开手续资料生成。'

  return {
    id: draft.id,
    status: answerStatus(draft.answerType),
    title: draft.title,
    question: draft.questionText,
    answerLevel: answerLevel(draft.answerLevel),
    answerType: answerTypeLabel(draft.answerType),
    reviewStatus: reviewStatusLabel(draft.reviewStatus),
    summary: draft.summary,
    sections: sections.map(section => ({ title: section.heading, body: section.body })),
    nextSteps,
    sourceHint,
    boundaryNote: ANSWER_BOUNDARY_NOTE,
  }
}

function answerStatus(value: string): AnswerResult['status'] {
  if (value === 'matched' || value === 'draft' || value === 'cannot_determine') return value
  return 'draft'
}

function answerLevel(value: string): AnswerResult['answerLevel'] {
  if (value === 'L1' || value === 'L2' || value === 'L3' || value === 'L4') return value
  return 'L2'
}

function answerTypeLabel(value: string): string {
  if (value === 'matched') return '已整理答案'
  if (value === 'draft') return '初步整理'
  return '进一步确认'
}

function reviewStatusLabel(value: string): string {
  if (value === 'reviewed') return '已整理'
  if (value === 'needs_expert') return '需要专家确认'
  if (value === 'rejected') return '已退回'
  return '初步整理，尚未人工复核'
}
