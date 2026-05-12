import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
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
  if (params.visa === 'teijusha') {
    return {
      title: '定住者参考整理 | TEBIQ',
      description: '定住者に関する参考整理。',
      robots: { index: false, follow: false },
    }
  }
  return {
    title: `${meta.label} 在留准备自查 | TEBIQ`,
    description: `${meta.label} 的材料、期限和记录核对清单。`,
    alternates: { canonical: `/check/${visa}` },
  }
}

export default async function CheckVisaPage({
  params,
}: {
  params: { visa: string }
}) {
  if (params.visa === 'teijusha') redirect('/teijusha')
  const visa = normalizeCheckVisa(params.visa)
  if (!CHECK_VISA_META[visa]) notFound()
  const user = await getCurrentUser().catch(() => null)
  const sessionId = user ? null : await getAnonymousSessionId().catch(() => null)
  const dimensions = await listDimensionViews({ memberId: user?.id ?? null, sessionId }, visa)

  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_VISA_SELECTED} payload={{ visa }} />
      <CheckDimensionList visa={visa} dimensions={dimensions} />
    </>
  )
}
