/**
 * /check/[visa] — 动态 quiz 路由（v5 screen 07/08）
 *
 * 根据 [visa] 选择题库并渲染 QuizEngine。
 * 完成后：
 *  - gijinkoku → 跳转旧 /check/result?...（沿用现有 ResultClient）
 *  - 其他签证 → 内联展示 QuizResultView
 */
import { notFound } from 'next/navigation'
import VisaQuizClient from './VisaQuizClient'
import TrackOnMount from '@/app/_components/v5/TrackOnMount'
import { EVENT } from '@/lib/analytics/events'
import {
  gijinkokuBank,
  haigushaBank,
  keieiBank,
  movingBank,
  teijushaBank,
  tokuteiBank,
} from '@/lib/check/questions'
import type { QuizBank, VisaSlug } from '@/lib/check/types'

const SUPPORTED: Record<string, QuizBank> = {
  gijinkoku: gijinkokuBank,
  keiei: keieiBank,
  haigusha: haigushaBank,
  tokutei: tokuteiBank,
  teijusha: teijushaBank,
  moving: movingBank,
}

export function generateStaticParams() {
  return Object.keys(SUPPORTED).map(visa => ({ visa }))
}

export default function CheckVisaPage({
  params,
}: {
  params: { visa: string }
}) {
  const bank = SUPPORTED[params.visa]
  if (!bank) notFound()
  return (
    <>
      <TrackOnMount
        event={EVENT.QUIZ_VISA_SELECTED}
        payload={{ visa: params.visa }}
      />
      <VisaQuizClient visa={params.visa as VisaSlug} />
    </>
  )
}
