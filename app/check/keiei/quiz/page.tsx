'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { keieiBank } from '@/lib/check/questions/keiei'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

export default function KeieiQuizPage() {
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  if (done) {
    return (
      <QuizResultView
        bank={keieiBank}
        history={done.history}
        result={done.result}
      />
    )
  }

  return (
    <QuizEngine
      bank={keieiBank}
      showVisaLabel
      onComplete={(history, result) => setDone({ history, result })}
    />
  )
}
