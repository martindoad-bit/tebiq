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
  title: '在留准备自查 | TEBIQ',
  description: '按维度核对递交前要看的材料、期限和记录。',
  alternates: { canonical: '/check' },
}

export default async function CheckLandingPage() {
  const user = await getCurrentUser().catch(() => null)
  const sessionId = user ? null : await getAnonymousSessionId().catch(() => null)
  const visa = normalizeCheckVisa(user?.visaType ?? null)
  const dimensions = await listDimensionViews({ memberId: user?.id ?? null, sessionId }, visa)
    .catch(() => [])

  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_START} />
      <CheckDimensionList visa={visa} dimensions={dimensions} />
    </>
  )
}
