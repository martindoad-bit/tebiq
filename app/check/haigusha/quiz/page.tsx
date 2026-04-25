'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { haigushaBank } from '@/lib/check/questions/haigusha'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

export default function HaigushaQuizPage() {
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  if (done) {
    return (
      <QuizResultView
        bank={haigushaBank}
        history={done.history}
        result={done.result}
      />
    )
  }

  return (
    <QuizEngine
      bank={haigushaBank}
      showVisaLabel
      onComplete={(history, result) => setDone({ history, result })}
    />
  )
}
