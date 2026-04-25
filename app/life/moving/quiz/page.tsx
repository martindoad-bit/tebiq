'use client'
import { useState } from 'react'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { movingBank } from '@/lib/check/questions/moving'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

export default function MovingQuizPage() {
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  if (done) {
    return (
      <QuizResultView
        bank={movingBank}
        history={done.history}
        result={done.result}
        backHref="/life/moving"
        backLabel="返回搬家说明"
      />
    )
  }

  return (
    <QuizEngine
      bank={movingBank}
      showVisaLabel
      onComplete={(history, result) => setDone({ history, result })}
    />
  )
}
