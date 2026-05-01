import type { AnswerResult } from './types'

export type IntentType =
  | 'procedure_flow'
  | 'eligibility_check'
  | 'material_list'
  | 'scenario_sequence'
  | 'risk_assessment'
  | 'misconception'
  | 'unknown'

export type IntentSubject =
  | 'individual'
  | 'company'
  | 'employee'
  | 'employer'
  | 'family'
  | 'unknown'

export type IntentDomain =
  | 'visa'
  | 'pension'
  | 'tax'
  | 'health_insurance'
  | 'company_registration'
  | 'employment'
  | 'school'
  | 'housing'
  | 'document'
  | 'unknown'

export type PreferredTemplate =
  | 'flow_template'
  | 'eligibility_template'
  | 'material_template'
  | 'sequence_template'
  | 'risk_template'
  | 'misconception_template'
  | 'clarify_template'

export interface AnswerIntent {
  intent_type: IntentType
  current_status?: string
  target_status?: string
  subject: IntentSubject
  domain: IntentDomain
  confidence: 1 | 2 | 3 | 4
  extracted_entities: {
    current_visa?: string
    target_visa?: string
    procedure?: string
    document?: string
    deadline?: string
    location?: string
  }
  preferred_template: PreferredTemplate
  should_answer: boolean
  clarification_questions?: string[]
  understood_as: string
}

export interface IntentInput {
  question_text: string
  visa_type?: string | null
}

export interface IntentMatchResult {
  pass: boolean
  reason: string
}

const DEFAULT_MODEL_ID = 'jp.anthropic.claude-sonnet-4-6'
const DEFAULT_REGION = 'ap-northeast-1'

export async function classifyAnswerIntent(input: IntentInput): Promise<AnswerIntent> {
  const rule = classifyIntentByRules(input)
  if (rule.confidence >= 3) return rule
  if (process.env.ANSWER_INTENT_DISABLE_AI === '1') return rule

  const ai = await classifyIntentWithAi(input, rule).catch(() => null)
  return ai ?? rule
}

export function classifyIntentByRules(input: IntentInput): AnswerIntent {
  const raw = input.question_text.trim()
  const text = normalize(raw)
  const visaFromInput = normalizeVisa(input.visa_type)

  if (isHumanitiesToManagement(text)) {
    return buildIntent(raw, {
      intent_type: /怎么|怎么办|流程|步骤|手续/.test(raw) ? 'procedure_flow' : 'eligibility_check',
      current_status: '技人国 / 人文签',
      target_status: '经营管理',
      subject: 'individual',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        current_visa: '技人国 / 人文签',
        target_visa: '经营管理',
        procedure: '在留資格変更',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

  if (isTokuteiToWorkVisa(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      current_status: '特定技能',
      target_status: '技人国 / 工作签',
      subject: 'individual',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        current_visa: '特定技能',
        target_visa: '技人国 / 工作签',
        procedure: '在留資格変更',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

  if (/(技能实习|技能実習).*(特定技能|经营管理|経営管理|经管)/.test(text)) {
    const target = /(经营管理|経営管理|经管)/.test(text) ? '经营管理' : '特定技能'
    return buildIntent(raw, {
      intent_type: target === '经营管理' ? 'misconception' : 'eligibility_check',
      current_status: '技能实习',
      target_status: target,
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '技能实习',
        target_visa: target,
        procedure: '在留資格変更',
      },
      preferred_template: target === '经营管理' ? 'misconception_template' : 'eligibility_template',
      should_answer: true,
    })
  }

  if (isCompanyDormantPension(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      current_status: '会社社保空档',
      subject: 'individual',
      domain: text.includes('健康') || text.includes('国保') ? 'health_insurance' : 'pension',
      confidence: 4,
      extracted_entities: {
        procedure: '国民年金 / 国民健康保険切换',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (isCapitalShortage(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      target_status: '经营管理',
      subject: 'company',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        target_visa: '经营管理',
        procedure: '资本金不足补救',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

  if (isOfficeRelocation(text)) {
    return buildIntent(raw, {
      intent_type: /(哪个先|顺序|先后|流程|步骤)/.test(raw) ? 'scenario_sequence' : 'procedure_flow',
      current_status: visaFromInput ?? '经营管理',
      subject: 'company',
      domain: 'company_registration',
      confidence: 4,
      extracted_entities: {
        current_visa: visaFromInput ?? '经营管理',
        procedure: '办公室 / 本店地址变更',
      },
      preferred_template: 'flow_template',
      should_answer: true,
    })
  }

  if (/(永住者|永住).*(父母|老人|养老|長期|长期)|父母.*(长期|养老|永住)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'misconception',
      current_status: '永住',
      subject: 'family',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        current_visa: '永住',
        procedure: '父母长期在留',
      },
      preferred_template: 'misconception_template',
      should_answer: true,
    })
  }

  if (/(老板|雇主|会社|公司).*(签证不符|不法就労|雇错|资格外)|签证不符.*(员工|普通员工|亲属|牵连)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      subject: text.includes('老板') || text.includes('雇主') ? 'employer' : 'employee',
      domain: 'employment',
      confidence: 4,
      extracted_entities: {
        procedure: '不法就労风险区分',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(住民税|納税|纳税|税金).*(永住|晚交|滞纳|滞納|影响)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      subject: 'individual',
      domain: 'tax',
      confidence: 3,
      extracted_entities: {
        procedure: '税务记录确认',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(公司|会社).*(社保|社会保险|社会保険|厚生年金).*(没有|没给|未加入|不上|未办理)|社保.*(怎么办|未加入|没给|没有)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      subject: 'individual',
      domain: 'health_insurance',
      confidence: 3,
      extracted_entities: {
        procedure: '会社社会保险未加入 / 空档确认',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(国民健康保险|国民健康保険|国保|健康保险|健康保険).*(滞纳|滞納|未纳|未納|怎么办|影响)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      subject: 'individual',
      domain: 'health_insurance',
      confidence: 3,
      extracted_entities: {
        procedure: '国民健康保险未纳处理',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (
    /(材料|書類|资料|清单|何が必要|需要什么).*(续签|更新|永住|经营管理|経営管理|技人国|配偶|特定技能)/.test(text) ||
    /(续签|更新|永住|经营管理|経営管理|技人国|配偶|特定技能).*(材料|書類|资料|清单|何が必要|需要什么)/.test(text)
  ) {
    return buildIntent(raw, {
      intent_type: 'material_list',
      target_status: extractTargetVisa(text) ?? visaFromInput ?? undefined,
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        target_visa: extractTargetVisa(text) ?? visaFromInput ?? undefined,
        procedure: '材料准备',
      },
      preferred_template: 'material_template',
      should_answer: true,
    })
  }

  if (/(搬家|地址|住所).*(在留卡|在留カード|住民票|14日)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'procedure_flow',
      subject: 'individual',
      domain: 'housing',
      confidence: 3,
      extracted_entities: {
        procedure: '住所变更 / 在留卡地址更新',
      },
      preferred_template: 'flow_template',
      should_answer: true,
    })
  }

  if (/(留学生|留学).*(人文|技人国|工作签)|留学.*(就职|就職|内定)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      current_status: '留学',
      target_status: '技人国 / 工作签',
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '留学',
        target_visa: '技人国 / 工作签',
        procedure: '在留資格変更',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

  if (/(收到|来た|来了).*(通知|文书|書類|信封|封筒)|税务署信封|年金信封/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'procedure_flow',
      subject: 'individual',
      domain: 'document',
      confidence: 2,
      extracted_entities: {
        procedure: '收到文书后的确认步骤',
        document: /信封|封筒/.test(text) ? '信封' : '通知文书',
      },
      preferred_template: 'flow_template',
      should_answer: true,
    })
  }

  if (/(孩子|小孩|学校|保育園|保育园|入学)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'scenario_sequence',
      subject: 'family',
      domain: 'school',
      confidence: 3,
      extracted_entities: {
        procedure: '孩子学校 / 保育园手续',
      },
      preferred_template: 'sequence_template',
      should_answer: true,
    })
  }

  if (/(hr|人事|会社|公司).*(外国员工|外国人员工|员工).*(离职|退职|入职|报备|届出)|员工入职.*(报备|届出)|外国员工离职/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'procedure_flow',
      subject: 'employer',
      domain: 'employment',
      confidence: 3,
      extracted_entities: {
        procedure: /(离职|退职)/.test(text) ? '外国员工离职届出' : '外国员工入职届出',
      },
      preferred_template: 'flow_template',
      should_answer: true,
    })
  }

  if (/(刚到|来日本|第一周|初到).*(经营管理|経営管理|经管)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'scenario_sequence',
      current_status: '经营管理',
      subject: 'individual',
      domain: 'document',
      confidence: 3,
      extracted_entities: {
        current_visa: '经营管理',
        procedure: '来日后第一周手续顺序',
      },
      preferred_template: 'sequence_template',
      should_answer: true,
    })
  }

  if (/(配偶签|配偶者|日本人配偶).*(离婚|離婚|分开|別居|怎么办)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      current_status: '配偶者',
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '配偶者',
        procedure: '离婚后在留资格处理',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(住民票|电话卡|携帯|租房|賃貸|刚到|来日本|第一周)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'scenario_sequence',
      subject: 'individual',
      domain: /(租房|賃貸)/.test(text) ? 'housing' : 'document',
      confidence: 2,
      extracted_entities: {
        procedure: '生活手续顺序',
      },
      preferred_template: 'sequence_template',
      should_answer: true,
    })
  }

  return buildIntent(raw, {
    intent_type: /(能不能|可以吗|行不行|怎么办)/.test(text) ? 'eligibility_check' : 'unknown',
    current_status: visaFromInput ?? undefined,
    subject: 'unknown',
    domain: 'unknown',
    confidence: 1,
    extracted_entities: {
      current_visa: visaFromInput ?? undefined,
      target_visa: extractTargetVisa(text) ?? undefined,
    },
    preferred_template: 'clarify_template',
    should_answer: false,
    clarification_questions: defaultClarificationQuestions(),
  })
}

export function answerMatchesIntent(intent: AnswerIntent, answer: AnswerResult): IntentMatchResult {
  const answerText = normalize(answerTextForIntent(answer))

  if (intent.current_status && !statusCompatible(intent.current_status, answerText)) {
    return { pass: false, reason: 'current_status_mismatch' }
  }

  if (intent.target_status && !statusCompatible(intent.target_status, answerText)) {
    return { pass: false, reason: 'target_status_mismatch' }
  }

  if (intent.domain === 'pension' || intent.domain === 'health_insurance') {
    const hits = countHits(answerText, ['国民年金', '厚生年金', '第1号', '資格喪失', '资格丧失', '区役所', '市役所', '年金事務所', '国民健康保険', '国民健康保险'])
    if (hits < 2) return { pass: false, reason: 'domain_pension_mismatch' }
    if (/(経営管理|经营管理).*(休眠|解散).*(在留|续签|更新)/.test(answerText) && !/(国民年金|厚生年金|国民健康保険)/.test(answerText)) {
      return { pass: false, reason: 'pension_question_answered_as_management_dormant' }
    }
  }

  if (intent.domain === 'company_registration' && /(办公室|事務所|本店|法人地址)/.test(normalize(intent.extracted_entities.procedure ?? ''))) {
    const hits = countHits(answerText, ['法務局', '法务局', '税務署', '税务署', '入管', '出入国', '租赁合同', '賃貸契約', '办公室照片', '事務所写真', '本店所在地', '異動届'])
    if (hits < 3) return { pass: false, reason: 'office_relocation_mismatch' }
  }

  if (intent.target_status === '经营管理' && /(资本|資本|资金|資金)/.test(normalize(intent.extracted_entities.procedure ?? ''))) {
    if (/(资本金多少合适|資本金多少|多少最合适|推奨金額)/.test(answerText)) {
      return { pass: false, reason: 'capital_shortage_answered_as_generic_amount' }
    }
    const hits = countHits(answerText, ['增资', '増資', '资金来源', '資金来源', '借款', '借入', '事业计划', '事業計画', '新规', '新規', '续签', '更新', '专家复核', '行政書士'])
    if (hits < 2) return { pass: false, reason: 'capital_shortage_mismatch' }
  }

  if (intent.target_status === '经营管理' && /(特定技能|tokutei|1号|一号)/.test(answerText) && !/(経営管理|经营管理|经管)/.test(answerText)) {
    return { pass: false, reason: 'answered_as_tokutei_to_work_visa' }
  }

  if (isHumanitiesToManagementIntent(intent)) {
    const managementConversionHits = countHits(answerText, [
      '500万',
      '出資',
      '会社設立',
      '公司设立',
      '事業所',
      '事业所',
      '賃貸契約',
      '租赁合同',
      '事業計画',
      '事业计划',
      '在留資格変更',
      '在留资格变更',
      '変更許可申請',
      '经营实质',
      '実質経営',
      '起業',
      '开公司',
    ])
    const jobChangeOnly = /(契約機関|所属機関|14日|14天|届出義務|届出|転職|换工作|離職|入職)/.test(answerText)
    if (managementConversionHits < 2) {
      return { pass: false, reason: 'humanities_to_management_not_specific_enough' }
    }
    if (jobChangeOnly && managementConversionHits < 4) {
      return { pass: false, reason: 'humanities_to_management_answered_as_job_change_notice' }
    }
  }

  if (intent.intent_type === 'material_list' && !/(材料|書類|证明|証明|清单)/.test(answerText)) {
    return { pass: false, reason: 'material_question_without_materials' }
  }

  if (intent.intent_type === 'eligibility_check' && !/(条件|要件|符合|満た|申请|申請|变更|変更|能不能|可以|补救|缺)/.test(answerText)) {
    return { pass: false, reason: 'eligibility_question_without_conditions' }
  }

  return { pass: true, reason: 'pass' }
}

function isHumanitiesToManagementIntent(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(技人国|人文|工作签|技術人文)/.test(normalize(intent.current_status))
      && intent.target_status
      && /(经营管理|経営管理|经管)/.test(normalize(intent.target_status)),
  )
}

export function clarifyAnswerForIntent(questionText: string, intent: AnswerIntent): AnswerResult {
  const questions = intent.clarification_questions?.length
    ? intent.clarification_questions
    : clarificationQuestionsForIntent(intent)
  return {
    ok: true,
    answer_type: 'cannot_determine',
    answer_level: 'L4',
    review_status: 'needs_expert',
    title: '这个情况需要进一步确认',
    summary: '我需要先确认你的问题属于哪一种，避免把别的手续答案套到你的情况上。',
    sections: [
      {
        heading: '我理解你的问题是',
        body: describeIntent(intent, questionText),
      },
      {
        heading: '需要先确认',
        body: questions.map((item, index) => `${index + 1}. ${item}`).join('\n'),
      },
      {
        heading: '下一步',
        body: '补齐上面信息后，再看条件、流程、材料和期限。涉及逾期、处分、公司异常或个人事实时，带材料咨询专业人士。',
      },
    ],
    next_steps: questions,
    related_links: [
      { title: '拍照识别文书', href: '/photo' },
      { title: '续签检查', href: '/check' },
    ],
    sources: [],
    query_id: null,
    answer_id: null,
    boundary_note: 'TEBIQ 先整理问题类型和下一步，不替你判断申请一定会通过或不通过。',
    intent,
    intent_summary: describeIntent(intent, questionText),
    preferred_template: intent.preferred_template,
  }
}

export function describeIntent(intent: AnswerIntent, fallbackQuestion = ''): string {
  if (intent.understood_as) return intent.understood_as
  return buildUnderstoodAs(intent, fallbackQuestion)
}

export function clarificationQuestionsForIntent(intent: AnswerIntent): string[] {
  if (intent.intent_type === 'eligibility_check') {
    return [
      '你现在的在留资格是什么？',
      '你想变更或申请的目标资格是什么？',
      '事情发生日期或预计申请日期是什么？',
      '是否已经收到官方文书或有逾期记录？',
    ]
  }
  if (intent.intent_type === 'procedure_flow' || intent.intent_type === 'scenario_sequence') {
    return [
      '你现在已经完成到哪一步？',
      '事情发生日期是什么？',
      '是否已经收到文书或窗口指示？',
      '是否涉及公司、雇主或家属？',
    ]
  }
  if (intent.intent_type === 'risk_assessment') {
    return [
      '风险事件发生日期是什么？',
      '是否已经收到督促、处分或官方通知？',
      '你本人、公司、雇主分别参与到什么程度？',
      '现在是否已经逾期或未处理？',
    ]
  }
  return defaultClarificationQuestions()
}

async function classifyIntentWithAi(input: IntentInput, fallback: AnswerIntent): Promise<AnswerIntent | null> {
  const awsKey = process.env.AWS_ACCESS_KEY_ID
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
  if (!awsKey || !awsSecret) return null

  const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
  const client = new AnthropicBedrock({
    awsAccessKey: awsKey,
    awsSecretKey: awsSecret,
    awsRegion: process.env.AWS_REGION ?? DEFAULT_REGION,
  })
  const response = await client.messages.create({
    model: process.env.ANSWER_INTENT_MODEL_ID ?? process.env.PHOTO_RECOGNITION_MODEL_ID ?? DEFAULT_MODEL_ID,
    max_tokens: 500,
    temperature: 0,
    system: [
      '你只做意图分类，不生成答案。',
      '输出 JSON，字段：intent_type,current_status,target_status,subject,domain,confidence,extracted_entities,preferred_template,should_answer,clarification_questions。',
      '如果不确定，confidence 设为 1 或 2，并选择 clarify_template。',
      '不要输出法律判断。',
    ].join('\n'),
    messages: [{
      role: 'user',
      content: `问题：${input.question_text}\n用户选择身份：${input.visa_type ?? '未选择'}`,
    }],
  })
  const text = response.content
    .map(block => block.type === 'text' ? block.text : '')
    .join('\n')
  const parsed = JSON.parse(extractJson(text)) as Record<string, unknown>
  return normalizeIntent(input.question_text, { ...fallback, ...coerceIntent(parsed) })
}

function coerceIntent(value: Record<string, unknown>): Partial<AnswerIntent> {
  return {
    intent_type: enumValue(value.intent_type, ['procedure_flow', 'eligibility_check', 'material_list', 'scenario_sequence', 'risk_assessment', 'misconception', 'unknown']),
    current_status: stringValue(value.current_status),
    target_status: stringValue(value.target_status),
    subject: enumValue(value.subject, ['individual', 'company', 'employee', 'employer', 'family', 'unknown']),
    domain: enumValue(value.domain, ['visa', 'pension', 'tax', 'health_insurance', 'company_registration', 'employment', 'school', 'housing', 'document', 'unknown']),
    confidence: confidenceValue(value.confidence),
    extracted_entities: recordValue(value.extracted_entities),
    preferred_template: enumValue(value.preferred_template, ['flow_template', 'eligibility_template', 'material_template', 'sequence_template', 'risk_template', 'misconception_template', 'clarify_template']),
    should_answer: typeof value.should_answer === 'boolean' ? value.should_answer : undefined,
    clarification_questions: arrayValue(value.clarification_questions),
  } as Partial<AnswerIntent>
}

function buildIntent(questionText: string, partial: Omit<AnswerIntent, 'understood_as'>): AnswerIntent {
  return normalizeIntent(questionText, partial)
}

function normalizeIntent(questionText: string, partial: Partial<AnswerIntent>): AnswerIntent {
  const intent: AnswerIntent = {
    intent_type: partial.intent_type ?? 'unknown',
    current_status: partial.current_status,
    target_status: partial.target_status,
    subject: partial.subject ?? 'unknown',
    domain: partial.domain ?? 'unknown',
    confidence: partial.confidence ?? 1,
    extracted_entities: {
      ...(partial.extracted_entities ?? {}),
    },
    preferred_template: partial.preferred_template ?? templateFor(partial.intent_type ?? 'unknown'),
    should_answer: partial.should_answer ?? false,
    clarification_questions: partial.clarification_questions,
    understood_as: partial.understood_as ?? '',
  }
  intent.understood_as = buildUnderstoodAs(intent, questionText)
  return intent
}

function templateFor(intentType: IntentType): PreferredTemplate {
  if (intentType === 'procedure_flow') return 'flow_template'
  if (intentType === 'eligibility_check') return 'eligibility_template'
  if (intentType === 'material_list') return 'material_template'
  if (intentType === 'scenario_sequence') return 'sequence_template'
  if (intentType === 'risk_assessment') return 'risk_template'
  if (intentType === 'misconception') return 'misconception_template'
  return 'clarify_template'
}

function buildUnderstoodAs(intent: AnswerIntent, questionText: string): string {
  if (intent.current_status && intent.target_status) {
    return `从「${intent.current_status}」转为「${intent.target_status}」需要满足什么条件，以及接下来怎么做。`
  }
  if (intent.domain === 'pension' || intent.domain === 'health_insurance') {
    return '公司或入职空档期间，个人年金/健康保险需要怎么处理。'
  }
  if (intent.domain === 'company_registration') {
    return '公司地址或办公室变更时，法务局、税务署、入管等手续的顺序和材料。'
  }
  if (intent.intent_type === 'misconception') {
    return '这个想法是否存在常见误解，以及有没有稳定可行路径。'
  }
  if (intent.intent_type === 'risk_assessment') {
    return '这件事可能影响谁、先保留什么证据，以及什么情况要找专家。'
  }
  return questionText || '这个问题需要先确认类型。'
}

function answerTextForIntent(answer: AnswerResult): string {
  const action = answer.action_answer
  return [
    answer.title,
    answer.summary,
    answer.first_screen_answer,
    answer.why_not_simple_answer,
    ...answer.sections.flatMap(section => [section.heading, section.body]),
    ...answer.next_steps,
    ...(answer.expert_handoff ? [
      ...answer.expert_handoff.trigger,
      answer.expert_handoff.who,
      answer.expert_handoff.why,
    ] : []),
    ...(action ? [
      action.conclusion,
      ...action.what_to_do,
      ...action.where_to_go,
      ...action.how_to_do,
      ...action.documents_needed,
      ...action.deadline_or_timing,
      ...action.consequences,
      ...action.expert_handoff,
    ] : []),
  ].filter(Boolean).join('\n')
}

function isHumanitiesToManagement(text: string): boolean {
  return /(人文|技人国|技術人文|工作签)/.test(text)
    && /(经营管理|経営管理|经管)/.test(text)
    && /(转|变更|変更|切换|怎么办|申请|申請|开公司|起業)/.test(text)
    && !/(特定技能|tokutei|1号|一号)/.test(text)
}

function isTokuteiToWorkVisa(text: string): boolean {
  return /(特定技能|tokutei|1号|一号)/.test(text)
    && /(工作签|技人国|人文|技術人文)/.test(text)
    && /(转|变更|変更|切换|怎么办|申请|申請)/.test(text)
}

function isCompanyDormantPension(text: string): boolean {
  return /(公司休眠|会社休眠|休眠|公司停|会社停|空白期|入职前|入社前|退职|離職)/.test(text)
    && /(国民年金|厚生年金|年金|社保|社会保险|社会保険|国保|健康保险|健康保険)/.test(text)
}

function isCapitalShortage(text: string): boolean {
  return /(资本金不够|資本金不足|资本金不足|資本金足り|资金不够|資金不足|3000万不够|3000万円不足|3000万不足|经营管理新规|経営管理新規|增资|増資)/.test(text)
}

function isOfficeRelocation(text: string): boolean {
  return /(办公室搬迁|办公室移転|事務所搬迁|事务所搬迁|事務所移転|公司换地址|法人地址|本店移転|本店所在地)/.test(text)
}

function statusCompatible(status: string, answerText: string): boolean {
  const value = normalize(status)
  if (/(技人国|人文|工作签|技術人文)/.test(value)) return /(技人国|人文|工作签|技術人文|技術・人文)/.test(answerText)
  if (/(经营管理|経営管理|经管)/.test(value)) return /(经营管理|経営管理|经管)/.test(answerText)
  if (/特定技能/.test(value)) return /特定技能/.test(answerText)
  if (/永住/.test(value)) return /永住/.test(answerText)
  return true
}

function countHits(text: string, terms: string[]): number {
  return terms.filter(term => text.includes(normalize(term))).length
}

function extractTargetVisa(text: string): string | null {
  if (/(经营管理|経営管理|经管)/.test(text)) return '经营管理'
  if (/(技人国|人文|工作签|技術人文)/.test(text)) return '技人国 / 工作签'
  if (/永住/.test(text)) return '永住'
  if (/特定技能/.test(text)) return '特定技能'
  if (/配偶/.test(text)) return '配偶者'
  return null
}

function normalizeVisa(value?: string | null): string | null {
  if (!value) return null
  const text = normalize(value)
  return extractTargetVisa(text) ?? value
}

function defaultClarificationQuestions(): string[] {
  return [
    '你现在的在留资格是什么？',
    '你想知道条件、流程、材料，还是风险？',
    '事情发生日期是什么？',
    '是否已经收到官方文书或已经逾期？',
    '是否涉及公司、雇主或家属？',
  ]
}

function normalize(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, '')
    .replace(/[・･\/／→\-ー—_()（）「」『』【】,，、:：]/g, '')
    .toLowerCase()
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 160) : undefined
}

function arrayValue(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined
  return value.map(item => String(item).trim()).filter(Boolean).slice(0, 8)
}

function recordValue(value: unknown): AnswerIntent['extracted_entities'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const row = value as Record<string, unknown>
  return {
    current_visa: stringValue(row.current_visa),
    target_visa: stringValue(row.target_visa),
    procedure: stringValue(row.procedure),
    document: stringValue(row.document),
    deadline: stringValue(row.deadline),
    location: stringValue(row.location),
  }
}

function confidenceValue(value: unknown): AnswerIntent['confidence'] | undefined {
  const number = Number(value)
  if (number === 1 || number === 2 || number === 3 || number === 4) return number
  return undefined
}

function enumValue<T extends readonly string[]>(value: unknown, allowed: T): T[number] | undefined {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? value as T[number]
    : undefined
}

function extractJson(text: string): string {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('No JSON object in intent response')
  return text.slice(start, end + 1)
}
