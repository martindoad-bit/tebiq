import { buildAnswer } from '@/lib/answer/match-answer'

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

const FORBIDDEN = [
  '拒签' + '概率',
  '一定' + '通过',
  '一定' + '不通过',
  '一定' + '被拒',
  '必定' + '拒签',
  'summary',
  'sections',
  'next_steps',
  'raw JSON',
]

async function main() {
  const rows: Array<{ question: string; type: string; title: string; ok: boolean; notes: string }> = []
  let failed = false

  for (const question of QUESTIONS) {
    const answer = await buildAnswer({ questionText: question })
    const action = answer.action_answer
    const text = [
      answer.title,
      answer.summary,
      action?.conclusion,
      ...(action?.what_to_do ?? []),
      ...(action?.where_to_go ?? []),
      ...(action?.how_to_do ?? []),
      ...(action?.documents_needed ?? []),
      ...(action?.deadline_or_timing ?? []),
      ...(action?.consequences ?? []),
      ...(action?.expert_handoff ?? []),
    ].join('\n')
    const problems: string[] = []
    if (!['matched', 'draft', 'cannot_determine'].includes(answer.answer_type)) problems.push('invalid answer_type')
    if (!action?.conclusion) problems.push('missing conclusion')
    if (!action?.boundary_note) problems.push('missing boundary_note')
    if (!(action?.what_to_do?.length || answer.answer_type === 'cannot_determine')) problems.push('missing what_to_do')
    const forbidden = FORBIDDEN.filter(word => text.includes(word))
    if (forbidden.length) problems.push(`forbidden: ${forbidden.join(', ')}`)
    if (question.includes('办公室搬迁')) {
      const required = [
        /经营场所|事務所/,
        /賃貸契約書|租赁合同|合同/,
        /法務局|登記/,
        /税務署|税务/,
        /社保|年金|銀行|银行/,
        /入管|在留/,
        /归档|留存|保存/,
        /不许可|不許可|不利|失效/,
        /行政書士|专家/,
      ]
      required.forEach((pattern, index) => {
        if (!pattern.test(text)) problems.push(`office detail ${index + 1} missing`)
      })
    }
    if (problems.length) failed = true
    rows.push({
      question,
      type: answer.answer_type,
      title: answer.title,
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
