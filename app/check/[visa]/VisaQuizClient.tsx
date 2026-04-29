'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { getBank } from '@/lib/check/questions'
import type { AnsweredItem, JudgeResult, VisaSlug } from '@/lib/check/types'

interface Props {
  visa: VisaSlug
  canonicalVisa?: string
}

export default function VisaQuizClient({ visa, canonicalVisa }: Props) {
  const bank = getBank(visa)
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  function handleComplete(history: AnsweredItem[], j: JudgeResult) {
    fetch('/api/results/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, visaType: canonicalVisa ?? visa }),
    }).catch(() => {
      /* 保存失败不阻断结果页 */
    })
    setDone({ history, result: j })
  }

  if (done) {
    return (
      <QuizResultView
        bank={bank}
        history={done.history}
        result={done.result}
      />
    )
  }

  return <QuizEngine bank={bank} onComplete={handleComplete} />
}
