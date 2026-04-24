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
const SELECTION_HOLD_MS = 200 // 点击后高亮停留时间，再触发 exit 动画

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

  // 进度条统一用主色（#F6B133）
  const barColor = 'bg-primary'
  void currentSeverity

  // 显示顺序：是/否 题强制「是」在左、「否」在右；其他多选题保持原顺序
  const yesIdx = current.options.findIndex(o => o.label.startsWith('是'))
  const noIdx = current.options.findIndex(o => o.label.startsWith('否'))
  const isYesNo = current.options.length === 2 && yesIdx >= 0 && noIdx >= 0
  const displayOptions: Array<{ label: string; originalIndex: number }> = isYesNo
    ? [
        { label: current.options[yesIdx].label, originalIndex: yesIdx },
        { label: current.options[noIdx].label, originalIndex: noIdx },
      ]
    : current.options.map((o, i) => ({ label: o.label, originalIndex: i }))

  // 短标签两列网格，长标签纵向堆叠
  const totalLabelLen = current.options.reduce((sum, o) => sum + o.label.length, 0)
  const useGrid = current.options.length === 2 && totalLabelLen <= 8

  function handleAnswer(originalIndex: number) {
    if (isExiting || selectedOption !== null) return
    setSelectedOption(originalIndex)

    // 先停留 200ms 给视觉确认，再触发 exit 动画 + 跳转
    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        const opt = current.options[originalIndex]
        const newHistory = [...history, { questionId: currentId, optionIndex: originalIndex }]
        if (opt.next === null) {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
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
    }, SELECTION_HOLD_MS)
  }

  function handleBack() {
    if (history.length === 0 || isExiting) return
    const last = history[history.length - 1]
    setHistory(history.slice(0, -1))
    setCurrentId(last.questionId)
    setSelectedOption(null)
  }

  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
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
      <div className="bg-highlight px-4 pt-6 pb-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-body text-sm">
              第{' '}
              <span className="text-primary font-bold text-base">{answeredCount + 1}</span> 题 / 共{' '}
              <span className="text-body font-bold">{totalEstimate}</span> 题
            </span>
            <button
              onClick={handleBack}
              disabled={history.length === 0 || isExiting}
              className="text-body hover:text-title disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold transition-colors px-2 py-1 -mr-2"
            >
              ← 上一题
            </button>
          </div>
          <div className="h-1.5 bg-card rounded-full overflow-hidden">
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
            <div className="bg-card rounded-2xl p-6 border border-line shadow-sm mb-3">
              <div className="text-primary text-xs font-bold mb-3">问题 {current.id}</div>
              <h2 className="text-xl font-medium leading-relaxed text-title">{current.text}</h2>
            </div>

            <p className="text-muted text-sm px-2 leading-relaxed">
              💡 为什么问这个：{current.why}
            </p>

            {current.learnMore && (
              <div className="px-2 mb-5 mt-3">
                <button
                  type="button"
                  onClick={() => setLearnMoreOpen(o => !o)}
                  className="text-primary hover:text-primary-hover text-sm font-bold flex items-center gap-1 transition-colors py-1"
                  aria-expanded={learnMoreOpen}
                >
                  了解更多
                  <span
                    className={`inline-block transition-transform text-xs ${
                      learnMoreOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {learnMoreOpen && (
                  <div className="mt-3 bg-highlight border-l-[3px] border-primary px-4 py-3 rounded-r">
                    <p className="text-title text-sm leading-relaxed whitespace-pre-line">
                      {current.learnMore}
                    </p>
                    <p className="text-muted text-xs mt-3 italic">
                      本说明为系统初版，待书士审核完善
                    </p>
                  </div>
                )}
              </div>
            )}
            {!current.learnMore && <div className="mb-5" />}

            <div className={useGrid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
              {displayOptions.map(({ label, originalIndex }) => {
                const isSelected = selectedOption === originalIndex
                return (
                  <button
                    key={originalIndex}
                    onClick={() => handleAnswer(originalIndex)}
                    disabled={isExiting || (selectedOption !== null && selectedOption !== originalIndex)}
                    className={`w-full min-h-[56px] border font-medium py-4 px-4 rounded-xl text-base leading-snug transition-all duration-150 ${
                      isSelected
                        ? 'border-primary bg-primary text-title scale-[0.98] shadow-sm'
                        : 'border-title/20 bg-card text-title hover:bg-highlight'
                    } disabled:cursor-not-allowed`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <p className="text-center text-muted text-xs mt-6">
              如实回答才能得到准确判断 · 答案不会上传
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
