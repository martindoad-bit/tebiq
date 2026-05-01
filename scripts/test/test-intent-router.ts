import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import { buildAnswer } from '@/lib/answer/match-answer'

process.env.ANSWER_INTENT_DISABLE_AI = '1'

const CASES: Array<{
  query: string
  domain?: string
  intentType?: string
  subject?: string
  currentStatus?: RegExp
  targetStatus?: RegExp
  template?: string
}> = [
  {
    query: '我是经管签，想转人文签',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /经营管理/,
    targetStatus: /技人国|人文/,
    template: 'eligibility_template',
  },
  {
    query: '我想从人文签转为经管签怎么办',
    domain: 'visa',
    intentType: 'procedure_flow',
    currentStatus: /技人国|人文/,
    targetStatus: /经营管理/,
    template: 'eligibility_template',
  },
  {
    query: '技人国想转经营管理需要什么',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /技人国|人文/,
    targetStatus: /经营管理/,
  },
  {
    query: '公司休眠了现在要不要交国民年金',
    domain: 'pension',
    intentType: 'risk_assessment',
    subject: 'individual',
  },
  {
    query: '公司停了厚生年金怎么办',
    domain: 'pension',
    intentType: 'risk_assessment',
    subject: 'individual',
  },
  {
    query: '资本金不够还能续经营管理吗',
    domain: 'visa',
    intentType: 'eligibility_check',
    targetStatus: /经营管理/,
  },
  {
    query: '3000万不够经营管理新规下怎么办',
    domain: 'visa',
    intentType: 'eligibility_check',
    targetStatus: /经营管理/,
  },
  {
    query: '办公室搬迁法务局和入管哪个先',
    domain: 'company_registration',
    intentType: 'scenario_sequence',
    subject: 'company',
  },
  {
    query: '事务所搬迁税务署要不要先报',
    domain: 'company_registration',
    intentType: 'procedure_flow',
  },
  {
    query: '刚到日本经管签第一周要做什么',
    intentType: 'scenario_sequence',
    currentStatus: /经营管理/,
  },
  {
    query: '没有住民票能办电话卡吗',
    intentType: 'scenario_sequence',
  },
  {
    query: '没有电话卡怎么租房',
    intentType: 'scenario_sequence',
    domain: 'housing',
  },
  {
    query: '孩子要入学先办什么',
    intentType: 'scenario_sequence',
    domain: 'school',
    subject: 'family',
  },
  {
    query: 'HR要给外国员工离职报备吗',
    intentType: 'procedure_flow',
    domain: 'employment',
    subject: 'employer',
  },
  {
    query: '员工入职公司要去哪里报备',
    intentType: 'procedure_flow',
    domain: 'employment',
    subject: 'employer',
  },
  {
    query: '永住者能不能带父母来养老',
    intentType: 'misconception',
    domain: 'visa',
    subject: 'family',
  },
  {
    query: '配偶签离婚后怎么办',
    intentType: 'risk_assessment',
    domain: 'visa',
    currentStatus: /配偶/,
  },
  {
    query: '老板雇了签证不符的人普通员工会受影响吗',
    intentType: 'risk_assessment',
    domain: 'employment',
  },
  { query: '住民税晚交会影响永住吗', intentType: 'risk_assessment', domain: 'tax' },
  { query: '搬家后在留卡地址要不要改', intentType: 'procedure_flow', domain: 'housing' },
  { query: '留学生能不能转人文签', intentType: 'eligibility_check', domain: 'visa', targetStatus: /技人国|工作签/ },
  { query: '特定技能1号能不能转工作签', intentType: 'eligibility_check', domain: 'visa', currentStatus: /特定技能/ },
  { query: '技能实习转特定技能要考试吗', intentType: 'eligibility_check', domain: 'visa' },
  { query: '永住材料要什么', intentType: 'material_list', domain: 'visa', targetStatus: /永住/ },
  { query: '经营管理续签材料清单', intentType: 'material_list', domain: 'visa', targetStatus: /经营管理/ },
  { query: '公司没有给我上社保怎么办', intentType: 'risk_assessment', domain: 'health_insurance' },
  { query: '国民健康保险滞纳了怎么办', intentType: 'risk_assessment', domain: 'health_insurance' },
  { query: '学校缴费通知看不懂怎么办', domain: 'school' },
  { query: '收到税务署信封要做什么', domain: 'document' },
  { query: '公司地址法人地址在留卡地址变更顺序', intentType: 'scenario_sequence', domain: 'company_registration' },
  { query: '技能实习能不能直接转经营管理', intentType: 'misconception', domain: 'visa', targetStatus: /经营管理/ },

  // === Hotfix v3: 方向锁定红线 ===
  {
    query: '我现在是经营管理签，想转技人国。',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /经营管理/,
    targetStatus: /技人国|人文/,
  },
  {
    query: '从特定技能1号转技人国。',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /特定技能/,
    targetStatus: /技人国|人文/,
  },
  // === Hotfix v3: 家族滞在打工硬规则 ===
  {
    query: '家族滞在配偶可以打工吗？',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /家族滞在/,
  },
  {
    query: '配偶可以打工吗',
    domain: 'visa',
    intentType: 'eligibility_check',
    currentStatus: /家族滞在/,
  },
  // === Hotfix v3: 特定技能换会社硬规则 ===
  {
    query: '特定技能1号换会社需要做什么？',
    domain: 'employment',
    intentType: 'procedure_flow',
    currentStatus: /特定技能/,
  },
  {
    query: '特定技能换雇主要不要重新申请',
    domain: 'employment',
    intentType: 'eligibility_check',
    currentStatus: /特定技能/,
  },
]

async function main() {
  const rows: Array<Record<string, unknown>> = []
  let failed = false
  for (const item of CASES) {
    const intent = await classifyAnswerIntent({ question_text: item.query })
    const problems: string[] = []
    if (item.intentType && intent.intent_type !== item.intentType) problems.push(`intent_type=${intent.intent_type}`)
    if (item.domain && intent.domain !== item.domain) problems.push(`domain=${intent.domain}`)
    if (item.subject && intent.subject !== item.subject) problems.push(`subject=${intent.subject}`)
    if (item.currentStatus && !item.currentStatus.test(intent.current_status ?? '')) problems.push(`current_status=${intent.current_status ?? ''}`)
    if (item.targetStatus && !item.targetStatus.test(intent.target_status ?? '')) problems.push(`target_status=${intent.target_status ?? ''}`)
    if (item.template && intent.preferred_template !== item.template) problems.push(`template=${intent.preferred_template}`)
    if (intent.confidence < 1 || intent.confidence > 4) problems.push(`confidence=${intent.confidence}`)
    if (!intent.preferred_template) problems.push('missing template')
    if (problems.length) failed = true
    rows.push({
      query: item.query,
      intent_type: intent.intent_type,
      domain: intent.domain,
      subject: intent.subject,
      current_status: intent.current_status ?? '',
      target_status: intent.target_status ?? '',
      preferred_template: intent.preferred_template,
      confidence: intent.confidence,
      should_answer: intent.should_answer,
      ok: problems.length === 0,
      notes: problems.join('; ') || 'ok',
    })
  }

  console.table(rows)
  const answerRows = await checkAnswerRedlines()
  console.table(answerRows)
  if (failed) process.exit(1)
}

async function checkAnswerRedlines(): Promise<Array<Record<string, unknown>>> {
  const cases = [
    {
      query: '我想从人文签转为经管签怎么办',
      rejectSeed: /tokutei-to-work-visa|q017|q054|换工作|契約機関|14日|14 日/,
      required: [/经营管理|経営管理|経営・管理|经管/, /技人国|人文|工作签|技術人文/],
    },
    {
      query: '我是经管签，想转人文签',
      rejectSeed: /q071|q069|配偶者|经营管理.*申请|経営・管理.*转换|500万|事業所/,
      required: [/接收公司|雇用契約|雇佣合同|業務内容|学历|学歴|技人国|人文/, /经营管理|経営管理|经管/],
    },
    {
      query: '公司休眠了现在要不要交国民年金',
      rejectTitle: /经营管理公司休眠|在留资格影响|休眠 \/ 解散 在留资格|交不起|免除/,
      required: [/国民年金|厚生年金|年金/, /区役所|市役所|年金事務所|年金事务所/],
    },
    {
      query: '资本金不够还能续经营管理吗',
      rejectTitle: /多少最合适|資本金 多少|资本金多少/,
      required: [/增资|増資|资金来源|事業計画|事业计划|借款|借入/, /经营管理|経営管理|经管/],
    },
    // === Hotfix v3: 5 条线上红线 ===
    {
      query: '家族滞在配偶可以打工吗？',
      rejectTitle: /(滞納|公的義務|年金.*健保|住民税|国民年金.*免除)/,
      rejectSeed: /q012|滞納|公的義務|健保/,
      required: [/(家族滞在|配偶|资格外活动|资格外活動)/, /(28|许可|許可|出入国|入管)/],
    },
    {
      query: '特定技能1号换会社需要做什么？',
      rejectTitle: /(技能実習.*特定技能|技能实习.*特定技能|良好修了|試験免除|试验免除)/,
      rejectSeed: /jissyu|技能実習|q053/,
      required: [/特定技能/, /(雇主|雇用主|受入機関|换会社|換雇主|契約機関|14日)/],
    },
    {
      query: '公司休眠了要不要交国民年金？',
      rejectTitle: /(交不起|想申请免除|学生納付特例)/,
      required: [/(厚生年金|資格喪失|资格丧失)/, /(国民年金|国民健康保険|区役所|市役所|年金事务所|年金事務所)/],
    },
  ]
  const rows: Array<Record<string, unknown>> = []
  for (const item of cases) {
    const answer = await buildAnswer({ questionText: item.query })
    const text = [
      answer.title,
      answer.summary,
      answer.action_answer?.conclusion,
      ...(answer.action_answer?.what_to_do ?? []),
      ...(answer.action_answer?.where_to_go ?? []),
      ...(answer.action_answer?.how_to_do ?? []),
      ...(answer.action_answer?.documents_needed ?? []),
      ...(answer.action_answer?.deadline_or_timing ?? []),
      ...(answer.action_answer?.consequences ?? []),
      ...(answer.action_answer?.expert_handoff ?? []),
    ].join('\n')
    const problems: string[] = []
    if (item.rejectSeed?.test(answer.matched_seed_id ?? '') || item.rejectSeed?.test(answer.title)) {
      problems.push(`matched forbidden seed/title ${answer.matched_seed_id || answer.title}`)
    }
    if (item.rejectTitle?.test(answer.title)) problems.push(`matched forbidden title ${answer.title}`)
    item.required.forEach((pattern, index) => {
      if (!pattern.test(text)) problems.push(`missing required answer term ${index + 1}`)
    })
    if (problems.length) process.exitCode = 1
    rows.push({
      query: item.query,
      answer_type: answer.answer_type,
      matched_seed_id: answer.matched_seed_id ?? '',
      intent_summary: answer.intent_summary ?? '',
      ok: problems.length === 0,
      notes: problems.join('; ') || 'ok',
    })
  }
  return rows
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
