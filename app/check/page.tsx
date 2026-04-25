'use client'
import { useRouter } from 'next/navigation'
import QuizEngine from '@/app/_components/QuizEngine'
import { gijinkokuBank } from '@/lib/check/questions/gijinkoku'
import type { AnsweredItem, JudgeResult } from '@/lib/check/types'

const STORAGE_KEY = 'tebiq_check_answers'

export default function CheckPage() {
  const router = useRouter()

  function handleComplete(history: AnsweredItem[], j: JudgeResult) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    const count =
      j.verdict === 'red'
        ? j.triggered.filter(t => t.severity === 'red').length
        : j.triggered.length
    router.push(`/check/result?v=${j.verdict}&n=${count}`)
  }

  return <QuizEngine bank={gijinkokuBank} onComplete={handleComplete} />
}
