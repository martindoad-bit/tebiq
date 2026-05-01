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
  'answer_level',
  'review_status',
  'source_grade',
  'matched',
  'draft',
  'cannot_determine',
  'policy_match',
  'source: document',
  'deadline: null',
  'amount: null',
  'raw JSON',
  '原始结果',
]

async function main() {
  const rows: Array<{
    question: string
    answer_type: string
    matched_seed_id: string
    intent_guard_pass: boolean
    has_conclusion: boolean
    has_do_now: boolean
    has_where_to_go: boolean
    has_documents: boolean
    has_timing: boolean
    has_consequences: boolean
    has_expert_handoff: boolean
    ok: boolean
    notes: string
  }> = []
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
    const hasConclusion = Boolean(action?.conclusion)
    const hasDoNow = Boolean(action?.what_to_do?.length)
    const hasWhereToGo = Boolean(action?.where_to_go?.length)
    const hasDocuments = Boolean(action?.documents_needed?.length)
    const hasTiming = Boolean(action?.deadline_or_timing?.length)
    const hasConsequences = Boolean(action?.consequences?.length)
    const hasExpertHandoff = Boolean(action?.expert_handoff?.length)

    if (!['matched', 'draft', 'cannot_determine'].includes(answer.answer_type)) problems.push('invalid answer_type')
    if (!hasConclusion) problems.push('missing conclusion')
    if (!action?.boundary_note) problems.push('missing boundary_note')
    if (!(hasDoNow || answer.answer_type === 'cannot_determine')) problems.push('missing do_now')
    if (!hasWhereToGo && answer.answer_type !== 'cannot_determine') problems.push('missing where_to_go')
    if (!hasDocuments && answer.answer_type !== 'cannot_determine') problems.push('missing documents')
    if (!hasTiming && answer.answer_type !== 'cannot_determine') problems.push('missing timing')
    if (!hasConsequences) problems.push('missing consequences')
    if (!hasExpertHandoff) problems.push('missing expert_handoff')
    if (answer.intent_guard_pass !== true) problems.push('intent guard did not pass')

    const forbidden = FORBIDDEN.filter(word => text.includes(word))
    if (forbidden.length) problems.push(`forbidden: ${forbidden.join(', ')}`)
    if (question.includes('公司休眠') && /经营管理公司休眠|在留资格影响|休眠 \/ 解散 在留资格/.test(answer.title)) {
      problems.push('Q1 matched management visa dormant answer')
    }
    if (question.includes('资本金不够') && /多少最合适|資本金 多少|资本金多少/.test(answer.title)) {
      problems.push('Q9 matched generic capital amount answer')
    }
    if (question.includes('办公室搬迁')) {
      const required = [
        /法務局|法务局/,
        /税務署|税务署|税务/,
        /入管|出入国/,
        /賃貸契約書|租赁合同|租约/,
        /办公室照片|事務所写真|照片/,
        /归档|留存|保存/,
        /不许可|不許可|不利|失效/,
        /行政書士|专家/,
      ]
      required.forEach((pattern, index) => {
        if (!pattern.test(text)) problems.push(`office detail ${index + 1} missing`)
      })
    }
    if (question.includes('搬家后在留卡地址')) {
      if (!/(市役所|区役所)/.test(text)) problems.push('Q8 missing city/ward office')
      if (!/(在留カード|在留卡)/.test(text)) problems.push('Q8 missing residence card')
      if (!/14\s*(日|天)/.test(text)) problems.push('Q8 missing 14-day timing')
      if ((action?.what_to_do.length ?? 0) > 7) problems.push('Q8 too verbose')
    }
    if (problems.length) failed = true
    rows.push({
      question,
      answer_type: answer.answer_type,
      matched_seed_id: answer.matched_seed_id ?? '',
      intent_guard_pass: answer.intent_guard_pass === true,
      has_conclusion: hasConclusion,
      has_do_now: hasDoNow,
      has_where_to_go: hasWhereToGo,
      has_documents: hasDocuments,
      has_timing: hasTiming,
      has_consequences: hasConsequences,
      has_expert_handoff: hasExpertHandoff,
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
