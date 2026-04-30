import { buildAnswer } from '@/lib/answer/match-answer'
import type { ActionAnswer } from '@/lib/answer/types'

const QUESTIONS = [
  '办公室搬迁要做哪些手续？',
  '公司休眠了要不要交国民年金？',
  '永住者能不能带父母来日本养老？',
  '老板雇了签证不符的人我会不会受影响？',
  '特定技能1号能不能转工作签？',
  '住民税晚交会影响永住吗？',
  '公司没有给我上社保怎么办？',
  '搬家后在留卡地址要不要改？',
  '经营管理资本金不够怎么办？',
  '留学生能不能转人文签？',
]

const WHERE_FORBIDDEN = /(?:怎么办|结论|問題|问题|建议|整理|行动答案|回答|结果|确认)/
const DOC_FORBIDDEN = /(?:办理|提交|确认|去|更新|申请|咨询|整理|取得|查看|窗口)/
const TIMING_PATTERN = /(?:\d+\s*(?:日|天|ヶ月|个月|か月|年)|14\s*(?:日|天)|90\s*(?:日|天)|期限|到期|更新前|申請前|递交前|收到|喪失|离职|本店移転|搬家后|资格丧失|届出|納付期限|在留期限前|交付後|速やか)/
const TECHNICAL_USER_TERMS = [
  'summary',
  'sections',
  'next_steps',
  'matched',
  'source_grade',
  'unreviewed',
  'raw JSON',
  '原始结果',
]

function hasEnoughChinese(text: string): boolean {
  return (text.match(/[\u3400-\u9fff]/g) ?? []).length >= 10
}

function lintAction(question: string, action: ActionAnswer): string[] {
  const problems: string[] = []

  action.where_to_go.forEach(item => {
    if (WHERE_FORBIDDEN.test(item)) problems.push(`where_to_go has non-window text: ${item}`)
  })

  action.documents_needed.forEach(item => {
    if (DOC_FORBIDDEN.test(item)) problems.push(`documents_needed has action text: ${item}`)
  })

  action.deadline_or_timing.forEach(item => {
    if (!TIMING_PATTERN.test(item)) problems.push(`deadline_or_timing has no timing/trigger: ${item}`)
  })

  action.consequences.forEach(item => {
    if (!hasEnoughChinese(item)) problems.push(`consequences too short: ${item}`)
    if (/[→(（]$/.test(item)) problems.push(`consequences ends with fragment marker: ${item}`)
    if (/^[→(（]/.test(item)) problems.push(`consequences starts with fragment marker: ${item}`)
  })

  const confirmationText = [
    action.conclusion,
    ...action.what_to_do,
    ...action.how_to_do,
    ...action.expert_handoff,
  ].join('\n')
  if (confirmationText.includes('这部分需要进一步确认') && !/在留资格|事情发生日期|是否已经收到文书/.test(confirmationText)) {
    problems.push('confirmation copy is only generic placeholder')
  }

  const userText = [
    question,
    action.conclusion,
    ...action.what_to_do,
    ...action.where_to_go,
    ...action.how_to_do,
    ...action.documents_needed,
    ...action.deadline_or_timing,
    ...action.consequences,
    ...action.expert_handoff,
    action.boundary_note,
  ].join('\n')
  const leaked = TECHNICAL_USER_TERMS.filter(term => userText.includes(term))
  if (leaked.length) problems.push(`technical terms leaked: ${leaked.join(', ')}`)

  return problems
}

async function main() {
  const rows: Array<{ question: string; matched_seed_id: string; ok: boolean; notes: string }> = []
  let failed = false

  for (const question of QUESTIONS) {
    const answer = await buildAnswer({ questionText: question })
    const action = answer.action_answer
    const problems = action ? lintAction(question, action) : ['missing action_answer']
    if (problems.length) failed = true
    rows.push({
      question,
      matched_seed_id: answer.matched_seed_id ?? '',
      ok: problems.length === 0,
      notes: problems.join('; ') || 'ok',
    })
  }

  console.table(rows)
  if (failed) process.exit(1)
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
