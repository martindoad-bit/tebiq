import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import VisaQuizClient from '../VisaQuizClient'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import { EVENT } from '@/lib/analytics/events'
import { CHECK_VISA_META, normalizeCheckVisa } from '@/lib/check/dimensions'

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
    description: `${meta.label} 自查问卷，完成后回写维度状态。`,
    robots: { index: false, follow: false },
  }
}

export default function CheckVisaQuizPage({
  params,
}: {
  params: { visa: string }
}) {
  if (params.visa === 'teijusha') redirect('/teijusha')
  const visa = normalizeCheckVisa(params.visa)
  const meta = CHECK_VISA_META[visa]
  if (!meta) notFound()
  if (!meta.legacyQuizVisa) notFound()
  return (
    <>
      <TrackOnMount event={EVENT.QUIZ_VISA_SELECTED} payload={{ visa, mode: 'full' }} />
      <VisaQuizClient visa={meta.legacyQuizVisa} canonicalVisa={visa} />
    </>
  )
}
