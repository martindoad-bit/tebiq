import type { Metadata } from 'next'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import CheckDimensionList from './CheckDimensionList'
import { EVENT } from '@/lib/analytics/events'
import { getAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { normalizeCheckVisa } from '@/lib/check/dimensions'
import { listDimensionViews } from '@/lib/db/queries/checkDimensions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '续签自查 | TEBIQ',
  description: '按维度确认续签前要看的事项。完整自查约 5 分钟。',
  alternates: { canonical: '/check' },
}

export default async function CheckLandingPage() {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getAnonymousSessionId()
  const visa = normalizeCheckVisa(user?.visaType ?? null)
  const dimensions = await listDimensionViews({ memberId: user?.id ?? null, sessionId }, visa)

  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_START} />
      <CheckDimensionList visa={visa} dimensions={dimensions} />
    </>
  )
}
