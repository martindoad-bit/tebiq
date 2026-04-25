'use client'
import { useEffect, useState } from 'react'
import {
  judge,
  longestPathFrom,
  nextQuestion,
} from '@/lib/check/engine'
import type {
  AnsweredItem,
  JudgeResult,
  QuizBank,
  Severity,
} from '@/lib/check/types'

const TRANSITION_MS = 300
const SELECTION_HOLD_MS = 200

interface QuizEngineProps {
  bank: QuizBank
  onComplete: (history: AnsweredItem[], judged: JudgeResult) => void
  /** 顶部右上角自定义返回链接（可选；默认无） */
  topRightSlot?: React.ReactNode
  /** 顶部说明（如签证名）放在进度条旁；默认显示 bank.visaName */
  showVisaLabel?: boolean
}

export default function QuizEngine({
  bank,
  onComplete,
  topRightSlot,
  showVisaLabel = false,
}: QuizEngineProps) {
  const [currentId, setCurrentId] = useState<string>(bank.startId)
  const [history, setHistory] = useState<AnsweredItem[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)
  const [answeredOpen, setAnsweredOpen] = useState(false)

  useEffect(() => {
    setLearnMoreOpen(false)
  }, [currentId])

  const current = bank.questions[currentId]

  // 累计严重度（保留以备后续给进度条上色，目前与原 check 页一致用主色）
  void history.reduce<Severity | null>((acc, item) => {
    const opt = bank.questions[item.questionId]?.options[item.optionIndex]
    if (opt?.severity === 'red') return 'red'
    if (opt?.severity === 'yellow' && acc !== 'red') return 'yellow'
    return acc
  }, null)

  if (!current) {
    return (
      <main className="min-h-screen bg-base text-title flex items-center justify-center">
        <div className="text-muted">载入中…</div>
      </main>
    )
  }

  const answeredCount = history.length
  const remaining = longestPathFrom(bank, currentId)
  const totalEstimate = answeredCount + remaining
  const progressPct =
    totalEstimate === 0
      ? 0
      : Math.min(100, Math.round((answeredCount / totalEstimate) * 100))

  // 是 / 否 题强制「是」在左、「否」在右
  const yesIdx = current.options.findIndex(o => o.label.startsWith('是'))
  const noIdx = current.options.findIndex(o => o.label.startsWith('否'))
  const isYesNo = current.options.length === 2 && yesIdx >= 0 && noIdx >= 0
  const displayOptions: Array<{ label: string; originalIndex: number }> = isYesNo
    ? [
        { label: current.options[yesIdx].label, originalIndex: yesIdx },
        { label: current.options[noIdx].label, originalIndex: noIdx },
      ]
    : current.options.map((o, i) => ({ label: o.label, originalIndex: i }))

  const totalLabelLen = current.options.reduce((sum, o) => sum + o.label.length, 0)
  const useGrid = current.options.length === 2 && totalLabelLen <= 8

  function handleAnswer(originalIndex: number) {
    if (isExiting || selectedOption !== null) return
    setSelectedOption(originalIndex)

    setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        const newHistory = [
          ...history,
          { questionId: currentId, optionIndex: originalIndex },
        ]
        const next = nextQuestion(bank, currentId, originalIndex, history)
        if (next === null) {
          const judged = judge(bank, newHistory)
          onComplete(newHistory, judged)
        } else {
          setHistory(newHistory)
          setCurrentId(next)
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

  function handleEditAnswer(index: number) {
    if (index < 0 || index >= history.length) return
    const target = history[index]
    setHistory(history.slice(0, index))
    setCurrentId(target.questionId)
    setSelectedOption(null)
    setIsExiting(false)
    setAnsweredOpen(false)
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

      {topRightSlot && (
        <div className="bg-card border-b border-line">
          <div className="max-w-md md:max-w-2xl mx-auto px-4 h-12 flex items-center justify-end">
            {topRightSlot}
          </div>
        </div>
      )}

      <div className="bg-highlight px-4 pt-6 pb-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-body text-sm">
              第{' '}
              <span className="text-primary font-bold text-base">
                {answeredCount + 1}
              </span>{' '}
              题 / 共{' '}
              <span className="text-body font-bold">{totalEstimate}</span> 题
              {showVisaLabel && (
                <span className="text-muted ml-2 text-xs">{bank.visaName}</span>
              )}
            </span>
            <div className="flex items-center gap-1">
              {history.length > 0 && (
                <button
                  onClick={() => setAnsweredOpen(true)}
                  disabled={isExiting}
                  className="text-muted hover:text-title disabled:opacity-30 text-xs font-bold transition-colors px-2 py-1"
                  aria-label="查看已答问题"
                >
                  📋 已答 {history.length}
                </button>
              )}
              <button
                onClick={handleBack}
                disabled={history.length === 0 || isExiting}
                className="text-body hover:text-title disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold transition-colors px-2 py-1 -mr-2"
              >
                ← 上一题
              </button>
            </div>
          </div>
          <div className="h-1.5 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-16 overflow-hidden">
        <div className="max-w-md md:max-w-xl w-full">
          <div
            key={currentId}
            className={isExiting ? 'anim-exit' : 'anim-enter'}
          >
            <div className="bg-card rounded-2xl p-6 border border-line shadow-sm mb-3">
              <div className="text-primary text-xs font-bold mb-3">
                问题 {current.id}
              </div>
              <h2 className="text-xl font-medium leading-relaxed text-title">
                {current.text}
              </h2>
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
                    disabled={
                      isExiting ||
                      (selectedOption !== null && selectedOption !== originalIndex)
                    }
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

      {answeredOpen && (
        <AnsweredDrawer
          bank={bank}
          history={history}
          onClose={() => setAnsweredOpen(false)}
          onEdit={handleEditAnswer}
        />
      )}
    </main>
  )
}

function AnsweredDrawer({
  bank,
  history,
  onClose,
  onEdit,
}: {
  bank: QuizBank
  history: AnsweredItem[]
  onClose: () => void
  onEdit: (index: number) => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-card w-full md:max-w-xl md:rounded-2xl rounded-t-2xl shadow-xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <div>
            <h3 className="text-title font-bold text-base">你已回答的问题</h3>
            <p className="text-muted text-xs mt-0.5">
              点「修改」会清除该题之后的回答，从该题重新作答
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="text-muted hover:text-title text-xl px-2 leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {history.map((item, i) => {
            const q = bank.questions[item.questionId]
            const opt = q?.options[item.optionIndex]
            if (!q || !opt) return null
            const sev = opt.severity
            const dotColor =
              sev === 'red'
                ? 'bg-[#DC2626]'
                : sev === 'yellow'
                  ? 'bg-primary'
                  : 'bg-[#16A34A]'
            const sevLabel =
              sev === 'red' ? '高风险' : sev === 'yellow' ? '需注意' : '正常'
            return (
              <div
                key={`${item.questionId}-${i}`}
                className="bg-base border border-line rounded-xl p-4"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-muted text-xs font-mono mt-0.5 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <p className="text-title text-sm leading-snug font-bold flex-1">
                    {q.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-3 ml-7">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${dotColor} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <span className="text-body text-sm">
                    你的回答：<span className="font-bold">{opt.label}</span>
                  </span>
                  <span className="text-muted text-[10px] ml-1">· {sevLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="ml-7 text-primary hover:text-primary-hover text-xs font-bold underline underline-offset-2"
                >
                  修改 →
                </button>
              </div>
            )
          })}
        </div>

        <div className="px-5 py-3 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] bg-card border border-line text-title rounded-lg text-sm font-bold hover:bg-highlight"
          >
            继续答题
          </button>
        </div>
      </div>
    </div>
  )
}
