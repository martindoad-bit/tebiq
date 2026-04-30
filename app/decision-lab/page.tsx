import Link from 'next/link'
import { ArrowRight, DatabaseZap } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import QuestionIntakeBox from '@/app/_components/QuestionIntakeBox'
import { listDecisionCards } from '@/lib/decision/cards'
import {
  ANSWER_LEVEL_LABEL,
  CARD_TYPE_LABEL,
  SOURCE_GRADE_LABEL,
  type DecisionCard,
} from '@/lib/decision/types'
import DecisionSearchClient from './DecisionSearchClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Decision Lab | TEBIQ',
  description: 'TEBIQ 决策卡实验室：把高频个案整理成可审核、可复用的判断材料。',
}

export default async function DecisionLabPage() {
  const cards = await listDecisionCards()
  const approved = cards.filter(card => card.status === 'approved').length

  return (
    <AppShell appBar={<AppBar title="Decision Lab" back="/" />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-cool-blue text-ink">
            <DatabaseZap size={18} strokeWidth={1.55} />
          </span>
          <div>
            <p className="text-[10.5px] font-medium text-ash">Decision Intelligence v0</p>
            <h1 className="mt-1 text-[18px] font-medium leading-snug text-ink">
              可审核的决策卡
            </h1>
            <p className="mt-2 text-[12px] leading-[1.65] text-ash">
              AI 只做后台起草。前台内容按来源、答案等级和复核状态展示。
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-hairline pt-3 text-center">
          <Metric label="卡片" value={cards.length} />
          <Metric label="已审核" value={approved} />
          <Metric label="待复核" value={cards.filter(card => card.requiresReview).length} />
        </div>
      </section>

      <div className="mt-3">
        <DecisionSearchClient />
      </div>

      <div className="mt-3">
        <QuestionIntakeBox sourcePage="/decision-lab" compact />
      </div>

      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
        <h2 className="text-[13px] font-medium text-ink">已整理 case</h2>
        <div className="mt-2 divide-y divide-hairline">
          {cards.map(card => <CardRow key={card.slug} card={card} />)}
        </div>
      </section>
    </AppShell>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-[17px] font-medium text-ink">{value}</div>
      <div className="mt-0.5 text-[10.5px] text-ash">{label}</div>
    </div>
  )
}

function CardRow({ card }: { card: DecisionCard }) {
  return (
    <Link href={`/decision-lab/${card.slug}`} className="group flex items-center gap-3 py-3">
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5">
          <span className="text-[13px] font-medium text-ink">{card.title}</span>
          <MetaChip>{CARD_TYPE_LABEL[card.cardType]}</MetaChip>
          <MetaChip>{card.answerLevel}</MetaChip>
          <MetaChip>{card.sourceGrade}</MetaChip>
        </span>
        <span className="mt-1 block text-[11px] leading-[1.55] text-ash">
          {ANSWER_LEVEL_LABEL[card.answerLevel]} / {SOURCE_GRADE_LABEL[card.sourceGrade]}
          {card.requiresReview ? ' / 需复核' : ' / 已审核'}
        </span>
      </span>
      <ArrowRight size={14} className="text-haze group-hover:text-ink" />
    </Link>
  )
}

function MetaChip({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] bg-paper px-2 py-0.5 text-[10px] font-normal text-ash">
      {children}
    </span>
  )
}
