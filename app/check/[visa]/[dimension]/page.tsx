import { notFound } from 'next/navigation'
import { and, eq } from 'drizzle-orm'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import { normalizeCheckVisa } from '@/lib/check/dimensions'
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

  if (!article || !article.questions || !article.resultLogic || !article.resultActions) notFound()

  return (
    <AppShell appBar={<AppBar title="单项自查" back={`/check/${visaType}`} />}>
      <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
        <p className="text-[10.5px] font-medium text-ash">{visaType}</p>
        <h1 className="mt-1 text-[17px] font-medium leading-snug text-ink">
          {article.title}
        </h1>
        <p className="mt-2 text-[12px] leading-[1.65] text-ash">
          回答本项问题后，结果会回写到续签自查清单。
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
