'use client'
/**
 * VisaQuizClient — 客户端组件，挑选题库 + 处理 onComplete 路由分流。
 *
 * gijinkoku 走旧 /check/result（保留 ResultClient 现有逻辑）。
 * 其他签证使用 QuizResultView 内联结果（v5 screen 08）。
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuizEngine from '@/app/_components/QuizEngine'
import QuizResultView from '@/app/_components/QuizResultView'
import { getBank } from '@/lib/check/questions'
import type { AnsweredItem, JudgeResult, VisaSlug } from '@/lib/check/types'

const STORAGE_KEY = 'tebiq_check_answers'

interface Props {
  visa: VisaSlug
}

export default function VisaQuizClient({ visa }: Props) {
  const router = useRouter()
  const bank = getBank(visa)
  const [done, setDone] = useState<{
    history: AnsweredItem[]
    result: JudgeResult
  } | null>(null)

  function handleComplete(history: AnsweredItem[], j: JudgeResult) {
    if (visa === 'gijinkoku') {
      // 沿用旧 /check/result 页面（带 sessionStorage + searchParams）
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      } catch {
        /* ignore */
      }
      const count =
        j.verdict === 'red'
          ? j.triggered.filter(t => t.severity === 'red').length
          : j.triggered.length
      router.push(`/check/result?v=${j.verdict}&n=${count}`)
      return
    }
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
