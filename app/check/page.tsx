'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, START_ID, type AnsweredItem } from '@/lib/check/questions'

const STORAGE_KEY = 'tebiq_check_answers'

export default function CheckPage() {
  const router = useRouter()
  const [currentId, setCurrentId] = useState<string>(START_ID)
  const [history, setHistory] = useState<AnsweredItem[]>([])

  const current = QUESTIONS[currentId]
  const answeredCount = history.length

  // 短标签（如 是/否）用两列网格，长标签纵向堆叠避免折行
  const totalLabelLen = current.options.reduce((sum, o) => sum + o.label.length, 0)
  const useGrid = current.options.length === 2 && totalLabelLen <= 8

  function handleAnswer(optionIndex: number) {
    const opt = current.options[optionIndex]
    const newHistory = [...history, { questionId: currentId, optionIndex }]
    setHistory(newHistory)

    if (opt.next === null) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
      router.push('/check/result')
    } else {
      setCurrentId(opt.next)
    }
  }

  function handleBack() {
    if (history.length === 0) return
    const last = history[history.length - 1]
    setHistory(history.slice(0, -1))
    setCurrentId(last.questionId)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="bg-blue-950 px-4 pt-6 pb-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <span className="text-slate-300 text-sm">
            已回答 <span className="text-amber-400 font-bold text-base">{answeredCount}</span> 题
          </span>
          <button
            onClick={handleBack}
            disabled={history.length === 0}
            className="text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
          >
            ← 上一题
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
            <div className="text-amber-400 text-sm font-bold mb-3">问题 {current.id}</div>
            <h2 className="text-xl font-bold leading-relaxed">{current.text}</h2>
          </div>

          <div className={useGrid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full bg-slate-800 border-2 border-slate-700 hover:border-amber-400 active:border-amber-400 text-white font-bold py-4 px-4 rounded-xl text-base leading-snug transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="text-center text-slate-500 text-xs mt-6">
            如实回答才能得到准确判断 · 答案不会上传
          </p>
        </div>
      </div>
    </main>
  )
}
