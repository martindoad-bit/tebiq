'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  QUESTIONS,
  START_ID,
  judge,
  longestPathFrom,
  type AnsweredItem,
  type Severity,
} from '@/lib/check/questions'

const STORAGE_KEY = 'tebiq_check_answers'
const TRANSITION_MS = 300

export default function CheckPage() {
  const router = useRouter()
  const [currentId, setCurrentId] = useState<string>(START_ID)
  const [history, setHistory] = useState<AnsweredItem[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)

  // 切到下一题时折叠"了解更多"
  useEffect(() => {
    setLearnMoreOpen(false)
  }, [currentId])

  const current = QUESTIONS[currentId]
  const answeredCount = history.length

  // 当前累计严重度（用于进度条颜色）
  const currentSeverity: Severity | null = history.reduce<Severity | null>(
    (acc, item) => {
      const opt = QUESTIONS[item.questionId]?.options[item.optionIndex]
      if (opt?.severity === 'red') return 'red'
      if (opt?.severity === 'yellow' && acc !== 'red') return 'yellow'
      return acc
    },
    null,
  )

  const remaining = longestPathFrom(currentId)
  const totalEstimate = answeredCount + remaining
  const progressPct =
    totalEstimate === 0 ? 0 : Math.min(100, Math.round((answeredCount / totalEstimate) * 100))

  const barColor =
    currentSeverity === 'red'
      ? 'bg-red-500'
      : currentSeverity === 'yellow'
        ? 'bg-amber-400'
        : 'bg-emerald-500'

  // 短标签两列网格，长标签纵向堆叠
  const totalLabelLen = current.options.reduce((sum, o) => sum + o.label.length, 0)
  const useGrid = current.options.length === 2 && totalLabelLen <= 8

  function handleAnswer(i: number) {
    if (isExiting) return
    setSelectedOption(i)
    setIsExiting(true)

    setTimeout(() => {
      const opt = current.options[i]
      const newHistory = [...history, { questionId: currentId, optionIndex: i }]
      if (opt.next === null) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
        // 把 verdict 与触发数附在 URL 上，给 result 页 server-side OGP 用
        const j = judge(newHistory)
        const count =
          j.verdict === 'red'
            ? j.triggered.filter(t => t.severity === 'red').length
            : j.triggered.length
        router.push(`/check/result?v=${j.verdict}&n=${count}`)
      } else {
        setHistory(newHistory)
        setCurrentId(opt.next)
        setSelectedOption(null)
        setIsExiting(false)
      }
    }, TRANSITION_MS)
  }

  function handleBack() {
    if (history.length === 0 || isExiting) return
    const last = history[history.length - 1]
    setHistory(history.slice(0, -1))
    setCurrentId(last.questionId)
    setSelectedOption(null)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(40px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .anim-enter {
          animation: slideInRight ${TRANSITION_MS}ms ease-out;
        }
        .anim-exit {
          transform: translateX(-32px);
          opacity: 0;
          transition:
            transform ${TRANSITION_MS}ms ease-in,
            opacity ${TRANSITION_MS}ms ease-in;
        }
      `}</style>

      {/* 顶部进度 + 颜色随严重度变化 */}
      <div className="bg-blue-950 px-4 pt-6 pb-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300 text-sm">
              已回答{' '}
              <span className="text-amber-400 font-bold text-base">{answeredCount}</span> 题
            </span>
            <button
              onClick={handleBack}
              disabled={history.length === 0 || isExiting}
              className="text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← 上一题
            </button>
          </div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} transition-all duration-500 ease-out`}
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 问题卡片：用 key 触发重新挂载，配合 anim-enter 实现入场动画 */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-16 overflow-hidden">
        <div className="max-w-md md:max-w-xl w-full">
          <div
            key={currentId}
            className={isExiting ? 'anim-exit' : 'anim-enter'}
          >
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-3">
              <div className="text-amber-400 text-xs font-bold mb-3">问题 {current.id}</div>
              <h2 className="text-xl font-bold leading-relaxed">{current.text}</h2>
            </div>

            <p className="text-slate-500 text-xs px-2 leading-relaxed">
              💡 为什么问这个：{current.why}
            </p>

            {current.learnMore && (
              <div className="px-2 mb-5 mt-2">
                <button
                  type="button"
                  onClick={() => setLearnMoreOpen(o => !o)}
                  className="text-amber-400/80 hover:text-amber-400 text-xs font-bold flex items-center gap-1 transition-colors"
                  aria-expanded={learnMoreOpen}
                >
                  了解更多
                  <span
                    className={`inline-block transition-transform text-[10px] ${
                      learnMoreOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {learnMoreOpen && (
                  <div className="mt-2 bg-blue-950/50 border-l-2 border-amber-400/60 px-3 py-2.5 rounded-r">
                    <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-line">
                      {current.learnMore}
                    </p>
                    <p className="text-slate-600 text-[10px] mt-2 italic">
                      本说明为系统初版，待书士审核完善
                    </p>
                  </div>
                )}
              </div>
            )}
            {!current.learnMore && <div className="mb-5" />}

            <div className={useGrid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
              {current.options.map((opt, i) => {
                const isSelected = selectedOption === i
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={isExiting}
                    className={`w-full min-h-[60px] border-2 text-white font-bold py-4 px-4 rounded-xl text-base leading-snug transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-blue-950 scale-[0.98]'
                        : 'border-slate-700 bg-slate-800 hover:border-amber-400 active:border-amber-400'
                    } disabled:cursor-not-allowed`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>

            <p className="text-center text-slate-500 text-xs mt-6">
              如实回答才能得到准确判断 · 答案不会上传
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
