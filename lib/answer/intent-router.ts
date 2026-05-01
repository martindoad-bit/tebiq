import type { AnswerResult } from './types'
import { parseIntentWithLlm, type LlmIntentParserResult } from './llm-intent-parser'

export type IntentType =
  | 'procedure_flow'
  | 'eligibility_check'
  | 'material_list'
  | 'scenario_sequence'
  | 'risk_assessment'
  | 'misconception'
  | 'document_notice'
  | 'deadline_emergency'
  | 'unknown'

export type IntentSubject =
  | 'individual'
  | 'company'
  | 'employee'
  | 'employer'
  | 'family'
  | 'customer_manager'
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
  | 'notice_template'
  | 'deadline_template'
  | 'clarify_template'

export interface AnswerIntent {
  normalized_question?: string
  user_goal?: string
  intent_type: IntentType
  current_status?: string
  target_status?: string
  key_entities?: string[]
  subject: IntentSubject
  domain: IntentDomain
  confidence: 1 | 2 | 3 | 4
  extracted_entities: {
    current_visa?: string
    target_visa?: string
    company_status?: string
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

export async function classifyAnswerIntent(input: IntentInput): Promise<AnswerIntent> {
  const rule = classifyIntentByRules(input)
  if (process.env.ANSWER_INTENT_DISABLE_AI === '1' || process.env.LLM_INTENT_DISABLE_AI === '1') return rule

  const ai = await parseIntentWithLlm({
    question_text: input.question_text,
    selected_visa_type: input.visa_type,
  }).catch(() => null)
  if (!ai) return rule

  const llmIntent = normalizeIntent(input.question_text, { ...ai })
  return reconcileIntent(input.question_text, rule, llmIntent, ai)
}

export function classifyIntentByRules(input: IntentInput): AnswerIntent {
  const raw = input.question_text.trim()
  const text = normalize(raw)
  const visaFromInput = normalizeVisa(input.visa_type)
  const transfer = extractDirectionalVisaTransfer(raw)

  if (transfer) {
    return buildIntent(raw, {
      intent_type: transfer.intentType,
      current_status: transfer.current,
      target_status: transfer.target,
      subject: 'individual',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        current_visa: transfer.current,
        target_visa: transfer.target,
        procedure: '在留資格変更',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

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
      domain: /(健康|国保|社保|社会保险|社会保険)/.test(text) ? 'health_insurance' : 'pension',
      confidence: 4,
      extracted_entities: {
        procedure: '国民年金 / 国民健康保険切换',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(资本金|資本金).*(多少|标准|標準|合适|適切|目安)|(?:多少|标准|標準|合适|目安).*(资本金|資本金)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      target_status: '经营管理',
      subject: 'company',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        target_visa: '经营管理',
        procedure: '经营管理资本金标准确认',
      },
      preferred_template: 'eligibility_template',
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

  if (/(经营管理|経営管理|经管).*(办公室|事務所|合同|契約|个人名义|個人名義|自宅|住宅)|办公室.*(经营管理|経営管理|经管).*(可以吗|能不能|合同|契約)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      target_status: '经营管理',
      subject: 'company',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        target_visa: '经营管理',
        procedure: '经营管理事業所要件确认',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
    })
  }

  if (isOfficeRelocation(text)) {
    return buildIntent(raw, {
      intent_type: /(哪个先|顺序|先后|流程|步骤|都不一样|不一致)/.test(raw) ? 'scenario_sequence' : 'procedure_flow',
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

  if (/(代表|代表取締役|取締役|役员|役員).*(变更|変更|换人|交代|入管|届出|报备|报告)|公司代表变更/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'procedure_flow',
      current_status: visaFromInput ?? '经营管理',
      subject: 'company',
      domain: 'company_registration',
      confidence: 3,
      extracted_entities: {
        current_visa: visaFromInput ?? '经营管理',
        procedure: '公司代表 / 役员变更届出',
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

  if (/(父母|老人).*(短期滞在|短期签|90日|长期住|一直续|更新)|短期滞在.*(父母|老人|一直|长期)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'misconception',
      subject: 'family',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        procedure: '父母短期滞在 / 长期在留误解',
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

  if (
    /(住民税|納税|纳税|税金).*(永住|晚交|滞纳|滞納|影响|完整|記録|记录)/.test(text)
    || /(永住).*(住民税|納税|纳税|税金).*(完整|記録|记录|要|必要|影响)/
      .test(text)
  ) {
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
    /(材料|書類|资料|清单|何が必要|需要什么|有哪些).*(续签|更新|永住|经营管理|経営管理|经管|技人国|配偶|特定技能)/.test(text) ||
    /(续签|更新|永住|经营管理|経営管理|经管|技人国|配偶|特定技能).*(材料|書類|资料|清单|何が必要|需要什么|有哪些)/.test(text)
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

  if (/(住民票|迁入|転入).*(国保|国民健康).*(地址|住所|变更|変更|改)|国保.*(地址|住所).*(改|变更|変更)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'procedure_flow',
      subject: 'individual',
      domain: 'housing',
      confidence: 3,
      extracted_entities: {
        procedure: '住民票迁入后的国保地址变更',
      },
      preferred_template: 'flow_template',
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

  if (
    /(留学生|留学).*(人文|技人国|工作签)|留学.*(就职|就職|内定)/
      .test(text)
    || /(文学部|文系|大学毕业|大学卒|専門学校|毕业|卒業).*(人文|技人国|工作签|就职|就職)/
      .test(text)
    || /人文签.*(学历|学歴|毕业|卒業)/.test(text)
  ) {
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

  if (
    /(收到|来た|来了).*(通知|文书|書類|信封|封筒)|税务署信封|年金信封/
      .test(text)
    || /(市役所|区役所|入管|日文|日本語).*(通知|文书|書類).*(期限|金额|金額|怎么办|处理|補資料|补资料)/
      .test(text)
    || /入管.*(補資料|补资料|追加資料|追加材料|期限|赶不上|間に合わ|怎么办)/.test(text)
    || /入管通知.*(補資料|补资料|怎么办)/.test(text)
    || /通知.*(金额|金額|期限).*(怎么办|处理)/.test(text)
  ) {
    return buildIntent(raw, {
      intent_type: /期限|補資料|补资料|赶不上|間に合わ|逾期/.test(text) ? 'deadline_emergency' : 'document_notice',
      subject: 'individual',
      domain: 'document',
      confidence: 2,
      extracted_entities: {
        procedure: '收到文书后的确认步骤',
        document: /信封|封筒/.test(text) ? '信封' : '通知文书',
      },
      preferred_template: /期限|補資料|补资料|赶不上|間に合わ|逾期/.test(text) ? 'deadline_template' : 'notice_template',
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

  if (/(特定技能).*(换雇主|换公司|换会社|会社変更|転職|雇主変更|雇用主変更|14日|届出|报备|入管)/.test(text)) {
    return buildIntent(raw, {
      intent_type: /(重新申请|変更|变更|能不能|要不要)/.test(text) ? 'eligibility_check' : 'procedure_flow',
      current_status: '特定技能',
      subject: 'individual',
      domain: /(重新申请|変更|变更|能不能|要不要)/.test(text) ? 'visa' : 'employment',
      confidence: 3,
      extracted_entities: {
        current_visa: '特定技能',
        procedure: '特定技能雇主变更',
      },
      preferred_template: /(重新申请|変更|变更|能不能|要不要)/.test(text) ? 'eligibility_template' : 'flow_template',
      should_answer: true,
    })
  }

  if (/(技能实习|技能実習).*(结束后|終了後|満了後|结束|完了|能转什么|转什么签证|转什么在留)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'eligibility_check',
      current_status: '技能实习',
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '技能实习',
        procedure: '技能实习结束后的在留资格选择',
      },
      preferred_template: 'eligibility_template',
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

  if (/(永住者|永住).*(离婚|離婚|配偶|入管|届出)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      current_status: '永住',
      subject: 'individual',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '永住',
        procedure: '永住者离婚后届出确认',
      },
      preferred_template: 'risk_template',
      should_answer: true,
    })
  }

  if (/(会社休眠|公司休眠|休眠).*(经管|经营管理|経営管理|签证|在留|续签|更新)|(?:经管|经营管理|経営管理).*(会社休眠|公司休眠|休眠)/.test(text)) {
    return buildIntent(raw, {
      intent_type: 'risk_assessment',
      current_status: '经营管理',
      subject: 'company',
      domain: 'visa',
      confidence: 3,
      extracted_entities: {
        current_visa: '经营管理',
        company_status: '休眠',
        procedure: '经营管理公司休眠对在留更新影响',
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

  if (isManagementToHumanitiesIntent(intent)) {
    const employmentHits = countHits(answerText, [
      '接收公司',
      '受入会社',
      '雇用契約',
      '雇佣合同',
      '業務内容',
      '业务内容',
      '学歴',
      '学历',
      '実務経験',
      '实务经验',
      '技人国',
      '人文',
      '技術人文',
      '退任',
      '役員',
      '代表',
    ])
    const managementStartupHits = countHits(answerText, ['500万', '出資', '事業所', '事业所', '会社設立', '事業計画', '经营管理申请条件'])
    if (employmentHits < 2) return { pass: false, reason: 'management_to_humanities_not_specific_enough' }
    if (managementStartupHits >= 2 && employmentHits < 4) {
      return { pass: false, reason: 'management_to_humanities_answered_as_management_application' }
    }
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

function isManagementToHumanitiesIntent(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(经营管理|経営管理|经管)/.test(normalize(intent.current_status))
      && intent.target_status
      && /(技人国|人文|工作签|技術人文)/.test(normalize(intent.target_status)),
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
    review_status: 'intent_unclear',
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

function reconcileIntent(questionText: string, rule: AnswerIntent, llm: AnswerIntent, raw: LlmIntentParserResult): AnswerIntent {
  const transfer = extractDirectionalVisaTransfer(questionText)
  if (transfer) {
    return normalizeIntent(questionText, {
      ...llm,
      intent_type: transfer.intentType,
      current_status: transfer.current,
      target_status: transfer.target,
      subject: 'individual',
      domain: 'visa',
      confidence: 4,
      extracted_entities: {
        ...llm.extracted_entities,
        current_visa: transfer.current,
        target_visa: transfer.target,
        procedure: '在留資格変更',
      },
      preferred_template: 'eligibility_template',
      should_answer: true,
      normalized_question: raw.normalized_question,
      user_goal: raw.user_goal,
    })
  }

  if (rule.confidence >= 4 && isHardRuleIntent(rule)) {
    return normalizeIntent(questionText, {
      ...rule,
      normalized_question: raw.normalized_question,
      user_goal: raw.user_goal,
    })
  }

  if (llm.confidence < 3 && rule.confidence >= 3) {
    return normalizeIntent(questionText, {
      ...rule,
      normalized_question: raw.normalized_question,
      user_goal: raw.user_goal,
    })
  }

  return normalizeIntent(questionText, {
    ...llm,
    normalized_question: raw.normalized_question,
    user_goal: raw.user_goal,
  })
}

function isHardRuleIntent(intent: AnswerIntent): boolean {
  return Boolean(
    isHumanitiesToManagementIntent(intent)
      || isManagementToHumanitiesIntent(intent)
      || intent.domain === 'pension'
      || intent.domain === 'health_insurance'
      || (intent.target_status === '经营管理' && /(资本|資本|资金|資金)/.test(normalize(intent.extracted_entities.procedure ?? ''))),
  )
}

function buildIntent(questionText: string, partial: Omit<AnswerIntent, 'understood_as'>): AnswerIntent {
  return normalizeIntent(questionText, partial)
}

function normalizeIntent(questionText: string, partial: Partial<AnswerIntent>): AnswerIntent {
  const intent: AnswerIntent = {
    normalized_question: partial.normalized_question,
    user_goal: partial.user_goal,
    intent_type: partial.intent_type ?? 'unknown',
    current_status: partial.current_status,
    target_status: partial.target_status,
    key_entities: partial.key_entities,
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
  if (intentType === 'document_notice') return 'notice_template'
  if (intentType === 'deadline_emergency') return 'deadline_template'
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

function extractDirectionalVisaTransfer(questionText: string): { current: string; target: string; intentType: IntentType } | null {
  const text = questionText.replace(/\s+/g, '')
  const visa = '经管签|经营管理|經營管理|経営管理|経管|技人国|人文签|人文|工作签|技術人文知識国際業務|技術人文|特定技能1号|特定技能|留学签|留学|家族滞在|配偶签|配偶者|永住'
  const patterns = [
    new RegExp(`(?:我是|我现在是|我目前是|目前是|持有)?(${visa})(?:签|在留资格|資格)?(?:，|,)?(?:想|要|准备|打算)?(?:转|转为|转到|变更为|変更为|変更|切换到|换成)(${visa})`),
    new RegExp(`从(${visa})(?:签|在留资格|資格)?(?:转|转为|转到|变更为|変更为|変更|切换到|换成)(${visa})`),
    new RegExp(`(${visa})(?:签|在留资格|資格)?から(${visa})(?:签|在留资格|資格)?(?:に)?(?:変更|変える|切替)`),
    new RegExp(`(?:现在|目前|当前)?(${visa})(?:签|在留资格|資格)?(?:，|,)?(?:目标|目標|想变成|想變成|希望变成|希望變成)(${visa})`),
    new RegExp(`(${visa})(?:签|在留资格|資格)?(?:想变成|想變成|希望变成|希望變成)(${visa})`),
    new RegExp(`(${visa})(?:签|在留资格|資格)?(?:→|->|转为|转到|转|変更|变更为)(${visa})`),
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    const current = normalizeVisaLabel(match?.[1])
    const target = normalizeVisaLabel(match?.[2])
    if (!current || !target || current === target) continue
    return {
      current,
      target,
      intentType: /流程|手续|怎么办|步骤|怎么做/.test(questionText) ? 'procedure_flow' : 'eligibility_check',
    }
  }
  return null
}

function normalizeVisaLabel(value?: string): string | null {
  if (!value) return null
  const text = normalize(value)
  if (/(经营管理|經營管理|経営管理|経管|经管)/.test(text)) return '经营管理'
  if (/(技人国|人文|工作签|技術人文)/.test(text)) return '技人国 / 人文签'
  if (/特定技能/.test(text)) return '特定技能'
  if (/留学/.test(text)) return '留学'
  if (/家族滞在/.test(text)) return '家族滞在'
  if (/配偶/.test(text)) return '配偶者'
  if (/永住/.test(text)) return '永住'
  return null
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
  return /(公司休眠|会社休眠|休眠|公司停|会社停|公司倒闭|会社倒産|倒闭|倒産|空白期|入职前|入社前|退职|離職)/.test(text)
    && /(国民年金|厚生年金|年金|社保|社会保险|社会保険|国保|健保|健康保险|健康保険)/.test(text)
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
