import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { AlertCircle, CheckSquare, ClipboardList, GitBranch, HelpCircle } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { getDecisionCardBySlug, listDecisionCards } from '@/lib/decision/cards'
import {
  ANSWER_LEVEL_LABEL,
  CARD_TYPE_LABEL,
  SOURCE_GRADE_LABEL,
  type DecisionCard,
  type DecisionOption,
} from '@/lib/decision/types'
import FeedbackClient from './FeedbackClient'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const cards = await listDecisionCards().catch(() => [])
  return cards.map(card => ({ slug: card.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const card = await getDecisionCardBySlug(params.slug)
  if (!card) return {}
  return {
    title: `${card.title} | Decision Lab | TEBIQ`,
    description: card.recommendedAction || 'TEBIQ 可审核决策卡。',
    alternates: { canonical: `/decision-lab/${card.slug}` },
  }
}

export default async function DecisionCardPage({
  params,
}: {
  params: { slug: string }
}) {
  const card = await getDecisionCardBySlug(params.slug)
  if (!card) notFound()

  return (
    <AppShell appBar={<AppBar title="Decision Lab" back="/decision-lab" />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex flex-wrap gap-1.5">
          <MetaChip>{CARD_TYPE_LABEL[card.cardType]}</MetaChip>
          <MetaChip>{ANSWER_LEVEL_LABEL[card.answerLevel]}</MetaChip>
          <MetaChip>{SOURCE_GRADE_LABEL[card.sourceGrade]}</MetaChip>
          <MetaChip>{card.lastVerifiedAt ? `核对 ${card.lastVerifiedAt}` : '未记录核对日'}</MetaChip>
          <MetaChip>{card.requiresReview ? '需复核' : '已审核'}</MetaChip>
        </div>
        <h1 className="mt-3 text-[19px] font-medium leading-snug text-ink">{card.title}</h1>
        <p className="mt-3 text-[12px] leading-[1.7] text-ash">
          {card.boundaryNote ?? '此卡只整理公开资料和一般流程，不替代窗口答复或专家判断。'}
        </p>
      </section>

      <div className="mt-3 grid gap-3">
        {card.cardType === 'decision_card' && <DecisionCardBody card={card} />}
        {card.cardType === 'workflow' && <WorkflowBody card={card} />}
        {card.cardType === 'risk_chain' && <RiskChainBody card={card} />}
        {card.cardType === 'misconception' && <MisconceptionBody card={card} />}
        <Sources card={card} />
        <FeedbackClient slug={card.slug} cardId={card.id} />
      </div>
    </AppShell>
  )
}

function DecisionCardBody({ card }: { card: DecisionCard }) {
  return (
    <>
      <InfoSection title="当前处境" icon={<HelpCircle size={16} />}>
        <Plain text={summaryFrom(card.trigger) || summaryFrom(card.userState) || card.bodyMarkdown} />
      </InfoSection>
      <ListSection title="候选选项" items={card.decisionOptions} />
      <InfoSection title="推荐方向" icon={<CheckSquare size={16} />}>
        <Plain text={card.recommendedAction} />
      </InfoSection>
      <ListSection title="为什么不是其他选项" items={card.whyNotOtherOptions} />
      <ListSection title="今天该做什么 / 后续动作" items={card.steps} />
      <ListSection title="需要带什么" items={card.relatedDocuments} />
      <ExpertHandoff card={card} />
    </>
  )
}

function WorkflowBody({ card }: { card: DecisionCard }) {
  return (
    <>
      <InfoSection title="适用情况" icon={<ClipboardList size={16} />}>
        <Plain text={summaryFrom(card.trigger) || card.bodyMarkdown} />
      </InfoSection>
      <InfoSection title="前提确认" icon={<CheckSquare size={16} />}>
        <Plain text={summaryFrom(card.userState) || card.recommendedAction} />
      </InfoSection>
      <ListSection title="步骤路径" items={card.steps} />
      <ListSection title="材料" items={card.relatedDocuments} />
      <ListSection title="容易遗漏" items={card.whyNotOtherOptions} />
      <ExpertHandoff card={card} />
    </>
  )
}

function RiskChainBody({ card }: { card: DecisionCard }) {
  return (
    <>
      <InfoSection title="发生了什么" icon={<GitBranch size={16} />}>
        <Plain text={summaryFrom(card.trigger) || card.bodyMarkdown} />
      </InfoSection>
      <InfoSection title="和你本人有什么关系" icon={<HelpCircle size={16} />}>
        <Plain text={summaryFrom(card.userState) || card.recommendedAction} />
      </InfoSection>
      <ListSection title="一般分开看的部分 / 可能相关的部分" items={card.decisionOptions} />
      <ListSection title="现在该保留什么" items={card.relatedDocuments} />
      <ExpertHandoff card={card} title="什么时候必须找专家" />
    </>
  )
}

function MisconceptionBody({ card }: { card: DecisionCard }) {
  return (
    <>
      <InfoSection title="用户想做什么" icon={<HelpCircle size={16} />}>
        <Plain text={summaryFrom(card.trigger) || card.bodyMarkdown} />
      </InfoSection>
      <InfoSection title="真实情况" icon={<AlertCircle size={16} />}>
        <Plain text={card.recommendedAction} />
      </InfoSection>
      <ListSection title="为什么大家以为可以 / 实际可能路径" items={card.decisionOptions} />
      <ListSection title="大多数情况下为什么不适用" items={card.whyNotOtherOptions} />
      <ExpertHandoff card={card} title="需要专家确认的情况" />
    </>
  )
}

function Sources({ card }: { card: DecisionCard }) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[13px] font-medium text-ink">来源和关联</h2>
      <div className="mt-3 grid gap-3">
        {card.sourceRefs.length > 0 && (
          <div>
            <p className="text-[11px] text-ash">source refs</p>
            <ul className="mt-1 space-y-1 text-[12px] leading-[1.65] text-slate">
              {card.sourceRefs.map(source => (
                <li key={`${source.title}-${source.url ?? ''}`}>
                  {source.url ? (
                    <a href={source.url} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  ) : source.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        <List title="相关检查维度" items={card.relatedCheckDimensions} />
      </div>
    </section>
  )
}

function ExpertHandoff({
  card,
  title = '专家交接点',
}: {
  card: DecisionCard
  title?: string
}) {
  const requiredWhen = card.expertHandoff.required_when
  const rows = Array.isArray(requiredWhen)
    ? requiredWhen.filter(item => typeof item === 'string').map(item => ({ label: item as string }))
    : []
  const expertType = typeof card.expertHandoff.expert_type === 'string'
    ? card.expertHandoff.expert_type
    : null
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[13px] font-medium text-ink">{title}</h2>
      {expertType && <p className="mt-2 text-[12px] text-ash">{expertType}</p>}
      <List title="" items={rows} />
    </section>
  )
}

function InfoSection({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="flex items-center gap-2 text-[13px] font-medium text-ink">
        <span className="text-ash">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function ListSection({ title, items }: { title: string; items: DecisionOption[] }) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="text-[13px] font-medium text-ink">{title}</h2>
      <List title="" items={items} />
    </section>
  )
}

function List({ title, items }: { title: string; items: DecisionOption[] }) {
  if (items.length === 0) return <p className="mt-2 text-[12px] text-ash">未记录。</p>
  return (
    <div className="mt-2">
      {title && <p className="text-[11px] text-ash">{title}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="rounded-[12px] bg-paper px-3 py-2">
            <p className="text-[12px] font-medium text-ink">{item.label}</p>
            {item.detail && <p className="mt-1 text-[11px] leading-[1.6] text-ash">{item.detail}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Plain({ text }: { text: string }) {
  return <p className="mt-2 whitespace-pre-line text-[12px] leading-[1.7] text-slate">{text || '未记录。'}</p>
}

function MetaChip({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] bg-paper px-2 py-1 text-[10px] font-normal text-ash">
      {children}
    </span>
  )
}

function summaryFrom(value: Record<string, unknown>): string {
  const summary = value.summary
  return typeof summary === 'string' ? summary : ''
}
