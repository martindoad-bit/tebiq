'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { tokuteiBank } from '@/lib/check/questions/tokutei'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

export default function TokuteiQuizPage() {
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  if (done) {
    return (
      <QuizResultView
        bank={tokuteiBank}
        history={done.history}
        result={done.result}
      />
    )
  }

  return (
    <QuizEngine
      bank={tokuteiBank}
      showVisaLabel
      onComplete={(history, result) => setDone({ history, result })}
    />
  )
}
