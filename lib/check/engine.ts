// 统一 quiz 引擎 - 纯函数，不含 React
// 同时支持两种分支模式：
//   1) option.next 链式跳转
//   2) question.showIf 条件显示（按答案 index 比较）

import type {
  AnsweredItem,
  JudgeResult,
  QuizBank,
  QuizQuestion,
  Severity,
  TriggeredItem,
  Verdict,
} from './types'

/** 判定（任一红 → 红；任一黄 → 黄；否则绿） */
export function judge(bank: QuizBank, history: AnsweredItem[]): JudgeResult {
  const triggered: TriggeredItem[] = []
  for (const item of history) {
    const q = bank.questions[item.questionId]
    if (!q) continue
    const opt = q.options[item.optionIndex]
    if (opt?.severity && opt.triggerLabel && opt.fixHint) {
      triggered.push({
        id: item.questionId,
        severity: opt.severity,
        triggerLabel: opt.triggerLabel,
        fixHint: opt.fixHint,
        selfFix: opt.selfFix ?? false,
      })
    }
  }
  const hasRed = triggered.some(t => t.severity === 'red')
  const hasYellow = triggered.some(t => t.severity === 'yellow')
  const verdict: Verdict = hasRed ? 'red' : hasYellow ? 'yellow' : 'green'
  return { verdict, triggered }
}

/** 构建 questionId → optionIndex 映射，便于 showIf 判定 */
function indexAnswers(history: AnsweredItem[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const item of history) map[item.questionId] = item.optionIndex
  return map
}

/** 判断某题在当前答案上下文下是否应当显示 */
function isVisible(q: QuizQuestion, answers: Record<string, number>): boolean {
  if (!q.showIf) return true
  return Object.entries(q.showIf).every(([qid, idx]) => answers[qid] === idx)
}

/**
 * 计算下一题：先按 option.next 跳转，然后跳过任何 showIf 不满足的题。
 * 返回 null 表示问卷结束。
 *
 * @param bank 题库
 * @param currentId 当前题 id
 * @param optionIndex 用户选的选项 index
 * @param history 之前的回答（用于 showIf 评估，**不含**当前这题）
 */
export function nextQuestion(
  bank: QuizBank,
  currentId: string,
  optionIndex: number,
  history: AnsweredItem[],
): string | null {
  const current = bank.questions[currentId]
  if (!current) return null
  const opt = current.options[optionIndex]
  if (!opt) return null

  const newAnswers = indexAnswers([
    ...history,
    { questionId: currentId, optionIndex },
  ])

  let nextId = opt.next
  // 跳过所有 showIf 不命中的题
  const visited = new Set<string>()
  while (nextId !== null) {
    if (visited.has(nextId)) return null // 防止环
    visited.add(nextId)
    const nq = bank.questions[nextId]
    if (!nq) return null
    if (isVisible(nq, newAnswers)) return nextId
    // 不可见 → 沿"默认下一题"继续。约定：取该题首个 option 的 next 作为穿透目标
    nextId = nq.options[0]?.next ?? null
  }
  return null
}

/**
 * 当前路径剩余最长深度，用于动态进度条。
 * 注意：showIf 在这里**忽略**（保守估计最长链）。
 */
export function longestPathFrom(
  bank: QuizBank,
  fromId: string | null,
  visited: Set<string> = new Set(),
): number {
  if (fromId === null) return 0
  if (visited.has(fromId)) return 0
  const next = new Set(visited)
  next.add(fromId)
  const q = bank.questions[fromId]
  if (!q) return 0
  let max = 0
  for (const opt of q.options) {
    const sub = longestPathFrom(bank, opt.next, next)
    if (sub > max) max = sub
  }
  return 1 + max
}

/** 累计严重度（用于进度条颜色等） */
export function currentSeverity(
  bank: QuizBank,
  history: AnsweredItem[],
): Severity | null {
  let acc: Severity | null = null
  for (const item of history) {
    const opt = bank.questions[item.questionId]?.options[item.optionIndex]
    if (opt?.severity === 'red') return 'red'
    if (opt?.severity === 'yellow') acc = 'yellow'
  }
  return acc
}
