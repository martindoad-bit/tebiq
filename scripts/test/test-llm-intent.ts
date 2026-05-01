import { classifyAnswerIntent } from '@/lib/answer/intent-router'

process.env.ANSWER_INTENT_DISABLE_AI = '1'
process.env.LLM_INTENT_DISABLE_AI = '1'

interface Case {
  query: string
  intent?: string
  domain?: string
  subject?: string
  current?: RegExp
  target?: RegExp
  template?: string
}

const CASES: Case[] = [
  { query: '我是经管签，想转人文签', intent: 'eligibility_check', domain: 'visa', current: /经营管理/, target: /技人国|人文/ },
  { query: '经营管理想转技人国怎么办', intent: 'procedure_flow', domain: 'visa', current: /经营管理/, target: /技人国|人文/ },
  { query: '経営管理から技術人文知識国際業務に変更したい', intent: 'eligibility_check', domain: 'visa', current: /经营管理/, target: /技人国|人文/ },
  { query: '我想从人文签转为经管签', intent: 'eligibility_check', domain: 'visa', current: /技人国|人文/, target: /经营管理/ },
  { query: '人文签转经营管理怎么办', intent: 'procedure_flow', domain: 'visa', current: /技人国|人文/, target: /经营管理/ },
  { query: '技人国想转经营管理需要什么', intent: 'eligibility_check', domain: 'visa', current: /技人国|人文/, target: /经营管理/ },
  { query: '特定技能1号想转技人国', intent: 'eligibility_check', domain: 'visa', current: /特定技能/, target: /技人国|工作签/ },
  { query: '留学签想转人文签', intent: 'eligibility_check', domain: 'visa', current: /留学/, target: /技人国|人文/ },
  { query: '家族滞在想转工作签', intent: 'eligibility_check', domain: 'visa', current: /家族滞在/, target: /技人国|人文|工作签/ },
  { query: '技能实习能不能直接转经营管理', intent: 'misconception', domain: 'visa', current: /技能实习/, target: /经营管理/ },
  { query: '公司休眠了要不要交国民年金', intent: 'risk_assessment', domain: 'pension', subject: 'individual' },
  { query: '公司停了厚生年金怎么办', intent: 'risk_assessment', domain: 'pension', subject: 'individual' },
  { query: '公司休眠我的健康保险怎么办', intent: 'risk_assessment', domain: 'health_insurance', subject: 'individual' },
  { query: '入职前空白期社保怎么处理', intent: 'risk_assessment', domain: 'health_insurance', subject: 'individual' },
  { query: '退职后厚生年金到国民年金怎么切', intent: 'risk_assessment', domain: 'pension', subject: 'individual' },
  { query: '国民健康保险滞纳了怎么办', intent: 'risk_assessment', domain: 'health_insurance' },
  { query: '公司没有给我上社保怎么办', intent: 'risk_assessment', domain: 'health_insurance' },
  { query: '国民年金免除能不能申请', intent: 'eligibility_check', domain: 'unknown' },
  { query: '经营管理资本金不够怎么办', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '资本金3000万不够还能续经营管理吗', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '经营管理新规资金不足怎么补', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '资本金多少合适', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '增资后经营管理续签还要什么', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '经营管理资本金材料清单', intent: 'material_list', domain: 'visa', target: /经营管理/ },
  { query: '办公室搬迁法务局和入管哪个先', intent: 'scenario_sequence', domain: 'company_registration', subject: 'company' },
  { query: '事务所搬迁税务署要不要先报', intent: 'procedure_flow', domain: 'company_registration' },
  { query: '公司换地址本店移转怎么做', intent: 'procedure_flow', domain: 'company_registration' },
  { query: '法人地址和在留卡地址变更顺序', intent: 'scenario_sequence', domain: 'company_registration' },
  { query: '办公室搬迁需要办公室照片吗', intent: 'procedure_flow', domain: 'company_registration' },
  { query: '本店所在地变更后银行要改吗', intent: 'procedure_flow', domain: 'company_registration' },
  { query: '住民税晚交会影响永住吗', intent: 'risk_assessment', domain: 'tax' },
  { query: '纳税证明有未纳能申请永住吗', intent: 'risk_assessment', domain: 'tax' },
  { query: '税金滞纳收到督促状怎么办', intent: 'risk_assessment', domain: 'tax' },
  { query: '永住申请直近5年纳税要完整吗', intent: 'risk_assessment', domain: 'tax' },
  { query: '课税证明和纳税证明要几年', intent: 'unknown' },
  { query: '永住材料要什么', intent: 'material_list', domain: 'visa', target: /永住/ },
  { query: '技人国续签材料清单', intent: 'material_list', domain: 'visa', target: /技人国|工作签/ },
  { query: '经营管理续签材料清单', intent: 'material_list', domain: 'visa', target: /经营管理/ },
  { query: '配偶签更新材料需要什么', intent: 'material_list', domain: 'visa', target: /配偶/ },
  { query: '特定技能更新材料要什么', intent: 'material_list', domain: 'visa', target: /特定技能/ },
  { query: '刚到日本经管签第一周要做什么', intent: 'scenario_sequence', current: /经营管理/ },
  { query: '没有住民票能办电话卡吗', intent: 'scenario_sequence' },
  { query: '没有电话卡怎么租房', intent: 'scenario_sequence', domain: 'housing' },
  { query: '刚来日本先办住民票还是银行卡', intent: 'scenario_sequence' },
  { query: '孩子要入学先办什么', intent: 'scenario_sequence', domain: 'school', subject: 'family' },
  { query: '学校缴费通知看不懂怎么办', domain: 'school' },
  { query: '保育园文件要交哪里', domain: 'school', subject: 'family' },
  { query: '搬家后在留卡地址要不要改', intent: 'procedure_flow', domain: 'housing' },
  { query: '搬家14日内要去哪里', intent: 'procedure_flow', domain: 'housing' },
  { query: '住民票迁入后国保地址要改吗', intent: 'procedure_flow', domain: 'housing' },
  { query: '收到税务署信封要做什么', intent: 'document_notice', domain: 'document', template: 'notice_template' },
  { query: '年金信封看不懂怎么办', intent: 'document_notice', domain: 'document', template: 'notice_template' },
  { query: '市役所通知有期限怎么办', intent: 'deadline_emergency', domain: 'document', template: 'deadline_template' },
  { query: '日文通知上有金额和期限怎么处理', intent: 'deadline_emergency', domain: 'document', template: 'deadline_template' },
  { query: 'HR要给外国员工离职报备吗', intent: 'procedure_flow', domain: 'employment', subject: 'employer' },
  { query: '员工入职公司要去哪里报备', intent: 'procedure_flow', domain: 'employment', subject: 'employer' },
  { query: '老板雇了签证不符的人普通员工会受影响吗', intent: 'risk_assessment', domain: 'employment' },
  { query: '外国员工离职14日要报入管吗', intent: 'procedure_flow', domain: 'employment' },
  { query: '公司雇错签证的人会怎样', intent: 'risk_assessment', domain: 'employment' },
  { query: '永住者能不能带父母来养老', intent: 'misconception', domain: 'visa', subject: 'family' },
  { query: '永住者父母长期住日本可以吗', intent: 'misconception', domain: 'visa', subject: 'family' },
  { query: '父母短期滞在可以一直续吗', intent: 'misconception', domain: 'visa', subject: 'family' },
  { query: '配偶签离婚后怎么办', intent: 'risk_assessment', domain: 'visa', current: /配偶/ },
  { query: '日本人配偶者离婚后还能留下吗', intent: 'risk_assessment', domain: 'visa', current: /配偶/ },
  { query: '永住者离婚后要去入管吗', intent: 'risk_assessment', domain: 'visa', current: /永住/ },
  { query: '留学生能不能转人文签', intent: 'eligibility_check', domain: 'visa', current: /留学/, target: /技人国|工作签/ },
  { query: '留学毕业还没内定怎么办', intent: 'eligibility_check', domain: 'visa', current: /留学/ },
  { query: '文学部毕业能做人文签吗', intent: 'eligibility_check', domain: 'visa', target: /技人国|工作签/ },
  { query: '特定技能1号能不能转工作签', intent: 'eligibility_check', domain: 'visa', current: /特定技能/, target: /技人国|工作签/ },
  { query: '特定技能换公司要不要重新申请', intent: 'eligibility_check', domain: 'visa', current: /特定技能/ },
  { query: '特定技能换雇主14日内要做什么', intent: 'procedure_flow', domain: 'employment' },
  { query: '技能实习转特定技能要考试吗', intent: 'eligibility_check', domain: 'visa', current: /技能实习/, target: /特定技能/ },
  { query: '技能实习结束后能转什么签证', intent: 'eligibility_check', domain: 'visa', current: /技能实习/ },
  { query: '技能实习中途解除还能申请特定技能吗', intent: 'eligibility_check', domain: 'visa', current: /技能实习/, target: /特定技能/ },
  { query: '经营管理办公室合同是个人名义可以吗', intent: 'eligibility_check', domain: 'visa', target: /经营管理/ },
  { query: '经管签公司地址法人地址在留卡地址都不一样怎么办', intent: 'scenario_sequence', domain: 'company_registration' },
  { query: '公司代表变更入管要不要报', intent: 'procedure_flow', domain: 'company_registration' },
  { query: '会社休眠经管签证还能续吗', intent: 'risk_assessment', domain: 'visa', current: /经营管理/ },
  { query: '入管通知要求补资料怎么办', intent: 'deadline_emergency', domain: 'document', template: 'deadline_template' },
  { query: '不知道该办什么手续', intent: 'unknown', domain: 'unknown' },
]

if (CASES.length !== 80) {
  console.error(`test fixture must contain 80 cases, got ${CASES.length}`)
  process.exit(1)
}

async function main() {
  const rows: Array<Record<string, unknown>> = []
  let failed = false

  for (const item of CASES) {
    const intent = await classifyAnswerIntent({ question_text: item.query })
    const problems: string[] = []
    if (item.intent && intent.intent_type !== item.intent) problems.push(`intent ${intent.intent_type}`)
    if (item.domain && intent.domain !== item.domain) problems.push(`domain ${intent.domain}`)
    if (item.subject && intent.subject !== item.subject) problems.push(`subject ${intent.subject}`)
    if (item.current && !item.current.test(intent.current_status ?? '')) problems.push(`current ${intent.current_status ?? ''}`)
    if (item.target && !item.target.test(intent.target_status ?? '')) problems.push(`target ${intent.target_status ?? ''}`)
    if (item.template && intent.preferred_template !== item.template) problems.push(`template ${intent.preferred_template}`)
    if (intent.confidence < 1 || intent.confidence > 4) problems.push(`confidence ${intent.confidence}`)
    if (problems.length) failed = true
    rows.push({
      query: item.query,
      expected_current: item.current?.source ?? '',
      actual_current: intent.current_status ?? '',
      expected_target: item.target?.source ?? '',
      actual_target: intent.target_status ?? '',
      expected_intent: item.intent ?? '',
      actual_intent: intent.intent_type,
      domain: intent.domain,
      preferred_template: intent.preferred_template,
      confidence: intent.confidence,
      pass: problems.length === 0,
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
