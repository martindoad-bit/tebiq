'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, type Answer } from '@/lib/check/questions'

const STORAGE_KEY = 'tebiq_check_answers'

export default function CheckPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const total = QUESTIONS.length
  const current = QUESTIONS[step]
  const progress = Math.round(((step) / total) * 100)

  function handleAnswer(answer: Answer) {
    const next = { ...answers, [current.id]: answer }
    setAnswers(next)

    if (step + 1 >= total) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      router.push('/check/result')
    } else {
      setStep(step + 1)
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* 顶部进度条 */}
      <div className="bg-blue-950 px-4 pt-6 pb-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-slate-300">
              第 <span className="text-amber-400 font-bold">{step + 1}</span> / {total} 题
            </span>
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← 上一题
            </button>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 问题卡片 */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
            <div className="text-amber-400 text-sm font-bold mb-3">问题 {current.id}</div>
            <h2 className="text-xl font-bold leading-relaxed">{current.text}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer('yes')}
              className="bg-slate-800 border-2 border-slate-700 hover:border-amber-400 active:border-amber-400 text-white font-bold py-5 rounded-xl text-lg transition-all"
            >
              是
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className="bg-slate-800 border-2 border-slate-700 hover:border-amber-400 active:border-amber-400 text-white font-bold py-5 rounded-xl text-lg transition-all"
            >
              否
            </button>
          </div>

          <p className="text-center text-slate-500 text-xs mt-6">
            如实回答才能得到准确判断 · 答案不会上传
          </p>
        </div>
      </div>
    </main>
  )
}
