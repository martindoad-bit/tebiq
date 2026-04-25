'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { teijushaBank } from '@/lib/check/questions/teijusha'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

export default function TeijushaQuizPage() {
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  if (done) {
    return (
      <QuizResultView
        bank={teijushaBank}
        history={done.history}
        result={done.result}
      />
    )
  }

  return (
    <QuizEngine
      bank={teijushaBank}
      showVisaLabel
      onComplete={(history, result) => setDone({ history, result })}
    />
  )
}
