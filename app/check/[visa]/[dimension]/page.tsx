import { and, eq } from 'drizzle-orm'
import Link from 'next/link'
import { ClipboardCheck } from 'lucide-react'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import Button from '@/app/_components/v5/Button'
import { fallbackDimensionTitle, normalizeCheckVisa } from '@/lib/check/dimensions'
import { db } from '@/lib/db'
import { articles } from '@/lib/db/schema'
import DimensionCheckClient from './DimensionCheckClient'

export const dynamic = 'force-dynamic'

export default async function DimensionCheckPage({
  params,
}: {
  params: { visa: string; dimension: string }
}) {
  const visaType = normalizeCheckVisa(params.visa)
  const [article] = await db
    .select()
    .from(articles)
    .where(and(
      eq(articles.visaType, visaType),
      eq(articles.dimensionKey, params.dimension),
    ))
    .limit(1)

  if (!article || !article.questions || !article.resultLogic || !article.resultActions) {
    return <DimensionPreparingPage visaType={visaType} dimensionKey={params.dimension} />
  }

  return (
    <AppShell appBar={<AppBar title="单项检查" back={`/check/${visaType}`} />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <p className="text-[10.5px] font-medium text-ash">{visaType}</p>
        <h1 className="mt-1 text-[17px] font-semibold leading-snug text-ink">
          {article.title}
        </h1>
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          回答本项问题后，结果会回写到材料准备清单。
        </p>
      </section>

      <DimensionCheckClient
        articleId={article.id}
        visaType={visaType}
        dimensionKey={params.dimension}
        title={article.title}
        priority={article.priority}
        expiryDays={article.expiryDays}
        questions={article.questions}
        resultLogic={article.resultLogic as Record<string, string>}
        resultActions={article.resultActions as Record<string, string[]>}
      />
    </AppShell>
  )
}

function DimensionPreparingPage({
  visaType,
  dimensionKey,
}: {
  visaType: string
  dimensionKey: string
}) {
  return (
    <AppShell appBar={<AppBar title="单项检查" back={`/check/${visaType}`} />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-5 text-center shadow-card">
        <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-[12px] border border-hairline bg-paper text-ink">
          <ClipboardCheck size={18} strokeWidth={1.55} />
        </span>
        <p className="mt-4 text-[11px] text-ash">{visaType}</p>
        <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
          {fallbackDimensionTitle(dimensionKey)}
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
