import { and, eq } from 'drizzle-orm'
import Link from 'next/link'
import { ClipboardCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { CHECK_VISA_META, fallbackDimensionTitle, normalizeCheckVisa } from '@/lib/check/dimensions'
import { getStaticCheckDimensionContent } from '@/lib/check/static-dimension-content'
import { db } from '@/lib/db'
import { articles } from '@/lib/db/schema'
import { sanitizePublicKnowledgeText } from '@/lib/knowledge/public-text'
import DimensionCheckClient from './DimensionCheckClient'

export const dynamic = 'force-dynamic'

const DIMENSION_DISPLAY_TITLE: Record<string, string> = {
  capital_investment: '资本金 / 投资',
}

export default async function DimensionCheckPage({
  params,
}: {
  params: { visa: string; dimension: string }
}) {
  const visaType = normalizeCheckVisa(params.visa)
  const [dbArticle] = process.env.DATABASE_URL
    ? await db
      .select()
      .from(articles)
      .where(and(
        eq(articles.category, 'check_dimension'),
        eq(articles.visaType, visaType),
        eq(articles.dimensionKey, params.dimension),
        eq(articles.status, 'published'),
      ))
      .limit(1)
      .catch(() => [])
    : []
  const staticArticle = dbArticle?.questions && dbArticle.resultLogic && dbArticle.resultActions
    ? null
    : await getStaticCheckDimensionContent(visaType, params.dimension)
  const article = dbArticle?.questions && dbArticle.resultLogic && dbArticle.resultActions
    ? dbArticle
    : staticArticle

  if (!article || !article.questions || !article.resultLogic || !article.resultActions) {
    return <DimensionPreparingPage visaType={visaType} dimensionKey={params.dimension} />
  }

  return (
    <AppShell appBar={<AppBar title="单项检查" back={`/check/${visaType}`} />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <p className="text-[10.5px] font-medium text-ash">{visaType}</p>
        <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
          {sanitizePublicKnowledgeText(article.title)}
        </h1>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.priority && <MetaChip>{priorityLabel(article.priority)}</MetaChip>}
          {article.estimatedReadTime && <MetaChip>{`${article.estimatedReadTime} 分钟`}</MetaChip>}
          {article.expiryDays && <MetaChip>{`${article.expiryDays} 天后复检`}</MetaChip>}
        </div>
      </section>

      <DimensionCheckClient
        articleId={article.id}
        visaType={visaType}
        dimensionKey={params.dimension}
        title={sanitizePublicKnowledgeText(article.title)}
        priority={article.priority}
        expiryDays={article.expiryDays}
        questions={article.questions}
        resultLogic={normalizeResultLogic(article.resultLogic)}
        resultActions={normalizeResultActions(article.resultActions)}
      />
    </AppShell>
  )
}

function priorityLabel(priority: string): string {
  if (priority === 'must_see') return '递交前确认'
  if (priority === 'should_see') return '建议确认'
  return '常规确认'
}

function MetaChip({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] bg-paper px-2 py-1 text-[10.5px] leading-none text-ash">
      {children}
    </span>
  )
}

function normalizeResultLogic(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const raw = value as Record<string, unknown>
  return Object.fromEntries(
    Object.entries(raw)
      .filter(([, v]) => typeof v === 'string')
      .map(([k, v]) => [k, v as string]),
  )
}

function normalizeResultActions(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const raw = value as Record<string, unknown>
  const entries = Object.entries(raw).flatMap(([key, item]) => {
    if (!Array.isArray(item)) return []
    const rows = item
      .filter(v => typeof v === 'string' && v.trim())
      .map(v => sanitizeCheckActionText(v as string))
    return [[key, rows] as const]
  })
  return Object.fromEntries(entries)
}

function sanitizeCheckActionText(input: string): string {
  return sanitizePublicKnowledgeText(input)
    .replace(/リスク\s*高/g, '递交前确认')
    .replace(/风险\s*高/g, '递交前确认')
    .replace(/高风险/g, '递交前确认')
    .replace(/风险/g, '待确认')
}

function DimensionPreparingPage({
  visaType,
  dimensionKey,
}: {
  visaType: string
  dimensionKey: string
}) {
  const visaLabel = CHECK_VISA_META[normalizeCheckVisa(visaType)].label
  const title = DIMENSION_DISPLAY_TITLE[dimensionKey] ?? fallbackDimensionTitle(dimensionKey)
  return (
    <AppShell appBar={<AppBar title="单项检查" back={`/check/${visaType}`} />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-5 text-center shadow-card">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-[12px] border border-hairline bg-paper text-ink">
          <ClipboardCheck size={18} strokeWidth={1.55} />
        </span>
        <p className="jp-text mt-4 text-[11px] text-ash">{visaLabel}</p>
        <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[12px] leading-[1.7] text-ash">
          该维度准备中。可以先返回清单，或做一次完整材料准备检查。
        </p>
        <div className="mt-5 grid gap-2">
          <Link href={`/check/${visaType}/quiz`}>
            <Button>完整材料准备检查</Button>
          </Link>
          <Link
            href={`/check/${visaType}`}
            className="flex min-h-[44px] items-center justify-center rounded-btn border border-hairline bg-surface px-4 py-3 text-[13px] font-medium text-ink"
          >
            返回清单
          </Link>
        </div>
      </section>
    </AppShell>
  )
}
