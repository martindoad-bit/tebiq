import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import CheckDimensionList from '../CheckDimensionList'
import { EVENT } from '@/lib/analytics/events'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { CHECK_VISA_META, normalizeCheckVisa } from '@/lib/check/dimensions'
import { listDimensionViews } from '@/lib/db/queries/checkDimensions'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return Object.keys(CHECK_VISA_META).map(visa => ({ visa }))
}

export async function generateMetadata({
  params,
}: {
  params: { visa: string }
}): Promise<Metadata> {
  const visa = normalizeCheckVisa(params.visa)
  const meta = CHECK_VISA_META[visa]
  return {
    title: `${meta.label} 续签自查 | TEBIQ`,
    description: `${meta.label} 续签维度清单。完整自查约 5 分钟。`,
    alternates: { canonical: `/check/${visa}` },
  }
}

export default async function CheckVisaPage({
  params,
}: {
  params: { visa: string }
}) {
  const visa = normalizeCheckVisa(params.visa)
  if (!CHECK_VISA_META[visa]) notFound()
  const user = await getCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  const dimensions = await listDimensionViews({ memberId: user?.id ?? null, sessionId }, visa)

  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_VISA_SELECTED} payload={{ visa }} />
      <CheckDimensionList visa={visa} dimensions={dimensions} />
    </>
  )
}
