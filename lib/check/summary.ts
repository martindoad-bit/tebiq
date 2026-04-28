// 个性化情况摘要 - 客户端 result 页与服务端 /api/results/save 共用
// 严重项优先级：税款 / 不法残留 = 1 → 换工作未申报 = 2 → 社保 = 3 → 其他

import type {
  AnsweredItem,
  JudgeResult,
  TriggeredItem,
  Verdict,
} from './questions/gijinkoku'

export const SEVERITY_PRIORITY: Record<string, number> = {
  '4': 1, // 住民税
  '7': 1, // 不法残留
  '2': 2, // 换工作未申报
  '6': 3, // 社保断缴
}

function severityWeight(t: TriggeredItem): number {
  const base = SEVERITY_PRIORITY[t.id] ?? 99
  return base * 10 + (t.severity === 'red' ? 0 : 1)
}

export function sortBySeverityPriority(items: TriggeredItem[]): TriggeredItem[] {
  return [...items].sort((a, b) => {
    const wa = severityWeight(a)
    const wb = severityWeight(b)
    if (wa !== wb) return wa - wb
    return a.id.localeCompare(b.id)
  })
}

function answersByQuestion(history: AnsweredItem[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const item of history) out[item.questionId] = item.optionIndex
  return out
}

export function buildSummary(
  verdict: Verdict,
  result: JudgeResult,
  history: AnsweredItem[],
): string {
  if (verdict === 'green') return greenSummary(history)
  if (verdict === 'yellow') return yellowSummary(result.triggered)
  return redSummary(result.triggered)
}

function greenSummary(history: AnsweredItem[]): string {
  const a = answersByQuestion(history)
  const points: string[] = []

  if (a['1'] === 1) points.push('续签期间未换公司')
  else if (a['1'] === 2) points.push('自营状态')
  else if (a['2'] === 0 && a['3'] === 0) points.push('换工作已合规申报、空窗期短')

  if (a['4'] === 0) points.push('住民税按时缴纳、无欠款')
  if (a['6'] === 0) points.push('社保全程参保')
  if (a['7'] === 0 || a['7'] === 2) points.push('未出现不法残留')

  if (points.length === 0) points.push('关键风险项均通过')

  return `你的情况：${points.slice(0, 3).join('，')}。主要需要确认材料完整性即可。`
}

function yellowSummary(triggered: TriggeredItem[]): string {
  const sorted = sortBySeverityPriority(triggered)
  const top = sorted[0]
  const pro = triggered.filter(t => !t.selfFix).length
  const proPart = pro > 0 ? `，其中 ${pro} 项建议咨询专家` : ''
  return `发现 ${triggered.length} 项需要处理：最关键是「${top.triggerLabel}」${proPart}。`
}

function redSummary(triggered: TriggeredItem[]): string {
  const reds = triggered.filter(t => t.severity === 'red')
  const top = sortBySeverityPriority(reds)[0]
  return `发现 ${reds.length} 项严重风险，最优先要解决：「${top.triggerLabel}」。在这之前不建议自行递签。`
}
