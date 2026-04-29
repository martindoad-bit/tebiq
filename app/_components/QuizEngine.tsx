'use client'
/**
 * QuizEngine — 续签材料准备检查的 quiz 状态机 + v5 视觉。
 *
 * 状态机（KEEP，不要改）：current question / history / 选项动画 / 「已答」抽屉。
 * 视觉（v5 重写）：AppShell + AppBar，白卡选项 + 自定义 radio，底部「上一题/下一题」。
 * 视觉源 docs/prototype/v5-mockup.html screen 07 (1558-1594)。
 */
import { useEffect, useState } from 'react'
import { ChevronDown, ListChecks } from 'lucide-react'
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
import AppShell from './v5/AppShell'
import AppBar from './v5/AppBar'
import Button from './v5/Button'

const TRANSITION_MS = 300
const SELECTION_HOLD_MS = 200

interface QuizEngineProps {
  bank: QuizBank
  onComplete: (history: AnsweredItem[], judged: JudgeResult) => void
  /** 顶部右上角自定义返回链接（v5 弃用，保留兼容） */
  topRightSlot?: React.ReactNode
  /** （v5 弃用，appbar 已固定显示 visa name） */
  showVisaLabel?: boolean
  /** 返回箭头目标，默认 /check/select */
  backHref?: string
}

export default function QuizEngine({
  bank,
  onComplete,
  backHref = '/check/select',
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

  // 累计严重度（保留以备未来给进度条上色）
  void history.reduce<Severity | null>((acc, item) => {
    const opt = bank.questions[item.questionId]?.options[item.optionIndex]
    if (opt?.severity === 'red') return 'red'
    if (opt?.severity === 'yellow' && acc !== 'red') return 'yellow'
    return acc
  }, null)

  if (!current) {
    return (
      <AppShell appBar={<AppBar title={bank.visaName} back={backHref} />}>
        <div className="text-ash text-center mt-12 text-sm">载入中…</div>
      </AppShell>
    )
  }

  const answeredCount = history.length
  const remaining = longestPathFrom(bank, currentId)
  const totalEstimate = answeredCount + remaining
  const stageNum = answeredCount + 1

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

  const rightSlot =
    history.length > 0 ? (
      <button
        type="button"
        onClick={() => setAnsweredOpen(true)}
        disabled={isExiting}
        className="text-[12px] text-ash hover:text-ink disabled:opacity-30 transition-colors"
        aria-label="查看已答问题"
      >
        已答 {history.length}
      </button>
    ) : undefined

  return (
    <AppShell
      appBar={
        <AppBar title={bank.visaName} back={backHref} right={rightSlot} />
      }
    >
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(12px);
          }
          to {
            transform: translateX(0);
          }
        }
        .anim-enter {
          animation: slideInRight 180ms ease-out;
        }
        .anim-exit {
          transform: translateX(-32px);
          opacity: 0;
          transition:
            transform ${TRANSITION_MS}ms ease-in,
            opacity ${TRANSITION_MS}ms ease-in;
        }
      `}</style>

      <div className="mt-2">
        <div className="mb-2 flex items-center justify-between text-[11px] text-ash">
          <span>第 {stageNum} 题</span>
          <span>{stageNum}/{totalEstimate}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-cool-blue">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${Math.max(8, (stageNum / totalEstimate) * 100)}%` }}
          />
        </div>
      </div>

      <div key={currentId} className={isExiting ? 'anim-exit' : 'anim-enter'}>
        <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3.5 shadow-card">
          <h2 className="text-[16px] font-medium text-ink leading-[1.48]">
            {current.text}
          </h2>

          <p className="mt-2 rounded-[11px] bg-canvas/70 px-3 py-2 text-[11.5px] text-ash leading-relaxed">
            为什么问这个：{current.why}
          </p>
        </section>

        {current.learnMore && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setLearnMoreOpen(o => !o)}
              className="flex items-center gap-1 text-[11.5px] font-medium text-ink transition-colors hover:text-accent"
              aria-expanded={learnMoreOpen}
            >
              了解更多
              <ChevronDown
                size={13}
                strokeWidth={1.55}
                className={`transition-transform ${
                  learnMoreOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {learnMoreOpen && (
              <div className="mt-2 rounded-card border border-accent/25 bg-accent-2 px-3 py-2.5 shadow-card">
                <p className="text-ink text-[12px] leading-relaxed whitespace-pre-line">
                  {current.learnMore}
                </p>
              </div>
            )}
          </div>
        )}

        <ul className="mt-4 space-y-2">
          {displayOptions.map(({ label, originalIndex }) => {
            const isSelected = selectedOption === originalIndex
            const disabled =
              isExiting ||
              (selectedOption !== null && selectedOption !== originalIndex)
            return (
              <li key={originalIndex}>
                <button
                  type="button"
                  onClick={() => handleAnswer(originalIndex)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-3 text-left rounded-[12px] border py-[12px] px-[13px] shadow-card transition disabled:cursor-not-allowed ${
                    isSelected
                      ? 'border-accent bg-[#FFFCEE]'
                      : 'border-hairline bg-surface hover:border-accent'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`flex-shrink-0 w-4 h-4 rounded-full border-[1.5px] transition-colors ${
                      isSelected
                        ? 'border-accent bg-accent shadow-[inset_0_0_0_3px_white]'
                        : 'border-hairline'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-[13px] text-ink leading-snug">{label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={history.length === 0 || isExiting}
          >
            上一题
          </Button>
          <Button
            onClick={() => {
              if (selectedOption !== null) handleAnswer(selectedOption)
            }}
            disabled={selectedOption === null || isExiting}
          >
            下一题
          </Button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ash">
          <ListChecks size={13} strokeWidth={1.55} />
          已答 {history.length} 题
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
    </AppShell>
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
        className="bg-surface w-full md:max-w-phone md:rounded-card rounded-t-card shadow-xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
          <div>
            <h3 className="text-ink font-medium text-[14px]">你已回答的问题</h3>
            <p className="text-ash text-[11px] mt-0.5">
              点「修改」会清除该题之后的回答，从该题重新作答
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="text-ash hover:text-ink text-xl px-2 leading-none"
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
                ? 'bg-danger'
                : sev === 'yellow'
                  ? 'bg-accent'
                  : 'bg-success'
            const sevLabel =
              sev === 'red' ? '待确认' : sev === 'yellow' ? '需注意' : '正常'
            return (
              <div
                key={`${item.questionId}-${i}`}
                className="bg-canvas border border-hairline rounded-chip p-3"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-ash text-[11px] mt-0.5 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <p className="text-ink text-[13px] leading-snug flex-1 font-medium">
                    {q.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-7">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${dotColor} flex-shrink-0`}
                    aria-hidden="true"
                  />
                  <span className="text-slate text-[12px]">
                    你的回答：<span className="text-ink font-medium">{opt.label}</span>
                  </span>
                  <span className="text-ash text-[10px] ml-1">· {sevLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(i)}
                  className="ml-7 text-accent hover:text-[#D85F43] text-[11.5px] font-medium underline underline-offset-2"
                >
                  修改 →
                </button>
              </div>
            )
          })}
        </div>

        <div className="px-5 py-3 border-t border-hairline">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] bg-surface border border-hairline text-ink rounded-btn text-[13px] font-medium hover:bg-canvas"
          >
            继续答题
          </button>
        </div>
      </div>
    </div>
  )
}
