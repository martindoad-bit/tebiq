import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { FREQUENT_QA_SEEDS, type AnswerSeed } from './answer-seeds'
import { loadGoldAnswerSeeds } from './gold-answer-loader'
import { isHighRiskGenericSeed, safeCandidateForIntent } from './safe-candidate-retrieval'
import {
  ANSWER_BOUNDARY_NOTE,
  type ActionAnswer,
  type AnswerResult,
  type AnswerSection,
  type AnswerSource,
} from './types'
import { formatActionAnswer } from './format-action-answer'
import {
  answerMatchesIntent,
  clarifyAnswerForIntent,
  classifyAnswerIntent,
  describeIntent,
  type AnswerIntent,
} from './intent-router'
import { judgeAnswer } from './answer-judge'
import { matchDecisionQuery } from '@/lib/decision/cards'
import type { DecisionCard, DecisionOption, SourceRef } from '@/lib/decision/types'

interface BuildAnswerInput {
  questionText: string
  visaType?: string | null
}

interface KnowledgeSeed {
  slug: string
  title: string
  visaType: string | null
  dimensionKey: string | null
  body: string
  sourcePath: string
}

let knowledgeCache: Promise<KnowledgeSeed[]> | null = null
let answerSeedCache: Promise<AnswerSeed[]> | null = null

export async function buildAnswer(input: BuildAnswerInput): Promise<AnswerResult> {
  const questionText = clean(input.questionText)
  const normalized = normalize(questionText)
  const intent = await classifyAnswerIntent({
    question_text: questionText,
    visa_type: input.visaType,
  })
  if (intent.confidence <= 2 || !intent.should_answer) {
    return withIntent(sanitizeAnswer(clarifyAnswerForIntent(questionText, intent)), intent)
  }
  let rejectedByIntent = false

  if (shouldUseIntentAnswerBeforeSeeds(questionText, intent)) {
    const direct = ruleBasedAnswerForIntent(questionText, intent)
    if (direct) return withIntent(sanitizeAnswer(direct), intent)
  }

  const goldSeed = await bestGoldSeed(normalized, questionText, intent)
  if (goldSeed.seed) {
    return withIntent(sanitizeAnswer(seedToAnswer(goldSeed.seed, questionText)), intent)
  }
  rejectedByIntent ||= goldSeed.rejectedByIntent

  const qaSeed = await bestQaSeed(normalized, questionText, intent)
  if (qaSeed.seed) {
    return withIntent(sanitizeAnswer(seedToAnswer(qaSeed.seed, questionText)), intent)
  }
  rejectedByIntent ||= qaSeed.rejectedByIntent

  const directIntentAnswer = ruleBasedAnswerForIntent(questionText, intent)
  if (directIntentAnswer) {
    const judge = judgeAnswer({ original_question: questionText, parsed_intent: intent, answer: directIntentAnswer })
    if (judge.should_show) return withIntent(sanitizeAnswer(directIntentAnswer), intent)
    rejectedByIntent = true
  }

  const decisionMatch = await matchDecisionQuery(questionText)
  if (decisionMatch.card) {
    const answer = decisionCardToAnswer(decisionMatch.card, questionText)
    const intentCheck = answerMatchesIntent(intent, answer)
    const judge = judgeAnswer({ original_question: questionText, parsed_intent: intent, answer })
    if (intentCheck.pass && judge.should_show) {
      return withIntent(sanitizeAnswer(answer), intent)
    }
    rejectedByIntent = true
  }

  const knowledge = await bestKnowledgeSeed(normalized, input.visaType)
  if (knowledge) {
    const answer = knowledgeSeedToAnswer(knowledge, questionText)
    const intentCheck = answerMatchesIntent(intent, answer)
    const judge = judgeAnswer({ original_question: questionText, parsed_intent: intent, answer })
    if (knowledgeSafeForIntent(knowledge, questionText, intent) && intentCheck.pass && judge.should_show) {
      return withIntent(sanitizeAnswer(answer), intent)
    }
    rejectedByIntent = true
  }

  const intentAnswer = ruleBasedAnswerForIntent(questionText, intent)
  if (intentAnswer) {
    const judge = judgeAnswer({ original_question: questionText, parsed_intent: intent, answer: intentAnswer })
    if (judge.should_show) return withIntent(sanitizeAnswer(intentAnswer), intent)
    rejectedByIntent = true
  }

  const fallback = rejectedByIntent
    ? clarifyAnswerForIntent(questionText, intent)
    : ruleBasedAnswer(questionText, normalized)
  return withIntent(sanitizeAnswer(fallback), intent)
}

function decisionCardToAnswer(card: DecisionCard, questionText: string): AnswerResult {
  const sections: AnswerSection[] = []
  if (card.userState.summary) {
    sections.push({ heading: '当前处境', body: String(card.userState.summary) })
  }
  if (card.decisionOptions.length) {
    sections.push({
      heading: '候选选项',
      body: optionsToText(card.decisionOptions),
    })
  }
  if (card.recommendedAction) {
    sections.push({ heading: '推荐方向', body: card.recommendedAction })
  }
  if (card.whyNotOtherOptions.length) {
    sections.push({
      heading: '为什么不是其他选项',
      body: optionsToText(card.whyNotOtherOptions),
    })
  }
  if (card.bodyMarkdown) {
    sections.push({ heading: '补充说明', body: plainMarkdown(card.bodyMarkdown).slice(0, 1200) })
  }

  return {
    ok: true,
    answer_type: 'matched',
    answer_level: card.answerLevel,
    review_status: 'reviewed',
    title: card.title,
    summary: card.recommendedAction || card.fallback || `已整理与「${questionText.slice(0, 48)}」相关的手续方向。`,
    sections: sections.length ? sections : [{ heading: '已整理内容', body: card.fallback ?? card.title }],
    next_steps: card.steps.length
      ? card.steps.map(step => `${step.label}${step.detail ? `：${step.detail}` : ''}`).slice(0, 5)
      : defaultNextSteps(questionText),
    related_links: [{ title: 'Decision Lab', href: `/decision-lab/${card.slug}` }],
    sources: card.sourceRefs.map(sourceRefToSource),
    query_id: null,
    answer_id: null,
    matched_card_id: card.id,
    boundary_note: card.boundaryNote ?? ANSWER_BOUNDARY_NOTE,
  }
}

function seedToAnswer(seed: AnswerSeed, _questionText: string): AnswerResult {
  const sections = [
    ...seed.sections,
    ...actionAnswerToSections(seed.actionAnswer),
    ...(seed.whyNotSimpleAnswer ? [{ heading: '为什么不能简单回答', body: seed.whyNotSimpleAnswer }] : []),
    ...(seed.expertHandoff ? [{ heading: '专家交接点', body: expertHandoffToText(seed.expertHandoff) }] : []),
  ]
  return {
    ok: true,
    answer_type: seed.answerType ?? 'matched',
    answer_level: seed.answerLevel,
    review_status: seed.reviewStatus ?? 'reviewed',
    title: seed.title,
    summary: seed.firstScreenAnswer ?? seed.summary,
    sections,
    next_steps: seed.nextSteps,
    related_links: seed.relatedLinks ?? [],
    sources: seed.sources,
    query_id: null,
    answer_id: null,
    matched_seed_id: seed.slug,
    intent_guard_pass: true,
    boundary_note: seed.boundaryNote ?? ANSWER_BOUNDARY_NOTE,
    first_screen_answer: seed.firstScreenAnswer ?? null,
    why_not_simple_answer: seed.whyNotSimpleAnswer ?? null,
    expert_handoff: seed.expertHandoff ?? null,
    action_answer: seed.actionAnswer,
  }
}

function actionAnswerToSections(actionAnswer: AnswerSeed['actionAnswer']): AnswerSection[] {
  if (!actionAnswer) return []
  return [
    { heading: '行动答案：一句话结论', body: actionAnswer.conclusion },
    { heading: '行动答案：现在做什么', body: actionAnswer.what_to_do.join('\n') },
    { heading: '行动答案：办理窗口', body: actionAnswer.where_to_go.join('\n') },
    { heading: '行动答案：怎么做', body: actionAnswer.how_to_do.join('\n') },
    { heading: '行动答案：需要材料', body: actionAnswer.documents_needed.join('\n') },
    { heading: '行动答案：期限和时机', body: actionAnswer.deadline_or_timing.join('\n') },
    { heading: '行动答案：不处理后果', body: actionAnswer.consequences.join('\n') },
    { heading: '行动答案：专家确认', body: actionAnswer.expert_handoff.join('\n') },
  ].filter(section => section.body.trim())
}

function expertHandoffToText(handoff: NonNullable<AnswerSeed['expertHandoff']>): string {
  return [
    ...handoff.trigger,
    handoff.who ? `咨询对象：${handoff.who}` : '',
    handoff.why ? `原因：${handoff.why}` : '',
  ].filter(Boolean).join('\n')
}

function knowledgeSeedToAnswer(seed: KnowledgeSeed, _questionText: string): AnswerResult {
  const parsedSections = markdownSections(seed.body)
  const sections = parsedSections.length > 0
    ? parsedSections.slice(0, 4)
    : [{ heading: '整理内容', body: plainMarkdown(seed.body).slice(0, 1000) }]
  const related = seed.visaType && seed.dimensionKey
    ? [{ title: '打开对应检查项', href: `/check/${seed.visaType}/${seed.dimensionKey}` }]
    : [{ title: '续签材料准备检查', href: '/check' }]
  return {
    ok: true,
    answer_type: 'matched',
    answer_level: 'L2',
    review_status: 'reviewed',
    title: seed.title,
    summary: `这个问题和「${seed.title}」相关。先按材料准备维度确认事实，再决定是否需要人工确认。`,
    sections,
    next_steps: [
      '先确认这件事是否属于你的当前在留资格和申请阶段。',
      '把相关通知、证明书、合同或缴纳记录放到同一处。',
      '如果材料里有期限，先按官方文书期限处理。',
    ],
    related_links: related,
    sources: [{ title: seed.title, source_grade: 'B' }],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function ruleBasedAnswer(questionText: string, normalized: string): AnswerResult {
  if (needsExpertChecklist(normalized)) {
    return cannotDetermineAnswer(questionText)
  }

  return {
    ok: true,
    answer_type: 'draft',
    answer_level: 'L2',
    review_status: 'unreviewed',
    title: '初步整理，尚未人工复核',
    summary:
      '当前问题没有命中已整理答案。TEBIQ 先按一般手续整理方式给出确认路径，并把问题送入后台复核。',
    sections: [
      {
        heading: '先确认这是什么类型的问题',
        body: '把问题拆成三类信息：发件机构或窗口、你当前在留资格、这件事要求你在什么期限前做什么。',
      },
      {
        heading: '需要先收集的材料',
        body: '相关通知原件、在留卡、住民票或税/社保记录、公司或学校给出的书面说明。没有原件时，先保存截图和发送日期。',
      },
      {
        heading: '现在可以做的动作',
        body: '先确认官方窗口、期限和材料清单。不要根据单一句子判断申请结果；需要个别判断时，把材料带给专业人士确认。',
      },
    ],
    next_steps: defaultNextSteps(questionText),
    related_links: [
      { title: '拍照识别文书', href: '/photo' },
      { title: '续签材料准备检查', href: '/check' },
    ],
    sources: [],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function cannotDetermineAnswer(_questionText: string): AnswerResult {
  return {
    ok: true,
    answer_type: 'cannot_determine',
    answer_level: 'L4',
    review_status: 'needs_expert',
    title: '这个情况需要进一步确认',
    summary:
      '这个问题涉及个别事实或材料不足，不能直接给出方向。你可以先确认下面的信息，再决定下一步。',
    sections: [
      {
        heading: '为什么不能直接判断',
        body: '同一句问题在不同在留资格、不同时间点、不同文书状态下，处理方向可能不同。TEBIQ 不替你判断申请结果。',
      },
      {
        heading: '先确认的信息',
        body: '当前在留资格、到期日、相关文书的发件机构、文书日期、是否已有处分/督促/未纳/公司异常记录。',
      },
      {
        heading: '材料准备',
        body: '保留原文书、缴纳记录、公司或学校说明、窗口沟通记录。涉及期限时，以文书上的官方期限优先。',
      },
    ],
    next_steps: [
      '确认当前在留资格和到期日。',
      '确认是否有官方文书、期限、金额或处分记录。',
      '把相关材料拍照归档，再带材料咨询行政書士等专业人士。',
    ],
    related_links: [
      { title: '拍照识别文书', href: '/photo' },
      { title: '我的提醒', href: '/timeline' },
    ],
    sources: [],
    query_id: null,
    answer_id: null,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function ruleBasedAnswerForIntent(questionText: string, intent: AnswerIntent): AnswerResult | null {
  if (intent.intent_type === 'material_list') {
    const target = intent.target_status ?? intent.extracted_entities.target_visa ?? '当前手续'
    return {
      ok: true,
      answer_type: 'draft',
      answer_level: 'L2',
      review_status: 'unreviewed',
      title: `${target}材料先按官方清单和个人状态拆开确认`,
      summary: '材料问题先不要套别的风险答案。先确认申请类型、当前身份、提交窗口，再按官方清单补齐证明。',
      sections: [
        { heading: '先确认申请类型', body: `这次要准备的是「${target}」相关材料。先确认是新申请、变更、续签还是补资料。` },
        { heading: '材料主线', body: '通常先分成本人材料、公司/雇主材料、税金/社保材料、说明材料四类。具体清单以入管或窗口最新要求为准。' },
      ],
      next_steps: [
        '确认申请类型和提交期限。',
        '把本人材料、公司/雇主材料、税金/社保材料分开整理。',
        '如果是补资料或期限接近，先按通知书期限处理。',
      ],
      related_links: [{ title: '续签检查', href: '/check' }],
      sources: [{ title: '出入国在留管理庁 在留資格関連手続', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: `${target}材料要按申请类型拆开准备，不能直接套用其他风险或转换答案。`,
        what_to_do: ['先确认申请类型和提交窗口。', '把已有文书、期限、本人状态和公司材料放到同一处。'],
        where_to_go: ['出入国在留管理局', '公司人事', '行政書士事务所'],
        how_to_do: ['按本人材料、公司/雇主材料、税金/社保材料、说明材料四类建立清单。', '如果收到补资料通知，先按通知书要求补对应项目。'],
        documents_needed: ['在留カード', '护照', '申请书', '雇用契約書', '課税証明書', '納税証明書', '公司登記事項証明書'],
        deadline_or_timing: ['在留期限前或补资料通知指定期限前处理。'],
        consequences: ['如果材料类别混乱或期限错过，可能需要补正、重新整理材料，审查会变慢。'],
        expert_handoff: ['如果是补资料、公司状态异常、税/社保记录不完整，带通知书和现有材料咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (isCompanyDormantPensionIntent(intent)) {
    return {
      ok: true,
      answer_type: 'draft',
      answer_level: 'L2',
      review_status: 'unreviewed',
      title: '公司停止或倒闭后，先确认年金和健保资格丧失日',
      summary: '公司状态变化后，个人年金和健康保险要看资格丧失日，不要把它和其他在留资格问题混在一起。',
      sections: [
        { heading: '先确认', body: '确认厚生年金和健康保险是否已经资格丧失、资格丧失日是哪天、是否拿到资格丧失证明。' },
      ],
      next_steps: ['确认资格丧失日。', '取得健康保険・厚生年金資格喪失証明書。', '去区役所 / 市役所国保年金窗口确认国民年金和国民健康保险。'],
      related_links: [{ title: '我的提醒', href: '/timeline' }],
      sources: [{ title: '日本年金機構 / 市区町村 国保年金課' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '先确认厚生年金和健康保险的资格丧失日；丧失后通常要处理国民年金和国民健康保险。',
        what_to_do: ['确认资格丧失日。', '拿到资格丧失证明。'],
        where_to_go: ['区役所', '市役所', '年金事务所'],
        how_to_do: ['向公司或年金事务所确认资格丧失证明。', '带证明、在留卡和マイナンバー去国保年金窗口办理切换。'],
        documents_needed: ['健康保険・厚生年金資格喪失証明書', '在留カード', 'マイナンバー', '退职或倒闭相关资料'],
        deadline_or_timing: ['资格丧失后 14 日内处理国民健康保险和国民年金切换。'],
        consequences: ['不处理可能产生保险和年金空白，之后更新、永住或就医时需要补充说明。'],
        expert_handoff: ['如果公司失联、证明拿不到或已经逾期，带年金记录和公司资料咨询社労士；涉及在留更新时咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.intent_type === 'scenario_sequence' && /(刚到|来日本|第一周|初到)/.test(questionText)) {
    return {
      ok: true,
      answer_type: 'draft',
      answer_level: 'L2',
      review_status: 'unreviewed',
      title: '刚到日本先把住民登记和生活账户顺序排好',
      summary: '刚到日本第一周，先处理住民票和地址登记，再处理手机号、银行、公司和保险相关手续。',
      sections: [
        { heading: '先做顺序', body: '先确定住址并办理住民登记，再用住民票和在留卡处理手机号、银行、公司或保险相关手续。' },
      ],
      next_steps: ['先办理住民票 / 転入届。', '再处理手机号、银行账户和公司入职或经营管理相关手续。', '把在留卡、住居资料和窗口回执归档。'],
      related_links: [{ title: '我的提醒', href: '/timeline' }],
      sources: [{ title: '市区町村 転入届 / 住民票手続' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '刚到日本第一周，先做住民登记；经营管理签也要先把地址、联系方式、银行和公司手续排成顺序。',
        what_to_do: ['先确认住所并办理転入届 / 住民票。', '再处理手机号、银行、公司和保险相关手续。'],
        where_to_go: ['区役所', '市役所', '银行', '手机运营商'],
        how_to_do: ['带在留卡和住居资料到市区町村窗口办理住民登记。', '拿到住民票后，再处理银行、手机号和公司相关手续。'],
        documents_needed: ['在留カード', '护照', '住居契约', '住民票', 'マイナンバー通知'],
        deadline_or_timing: ['确定住所后 14 日内办理転入届 / 住民登记。'],
        consequences: ['如果住民登记延后，后续银行、手机号、国保年金和公司手续都会被卡住。'],
        expert_handoff: ['如果经营管理签同时涉及公司设立、办公室或入管补资料，带在留卡、住居资料和公司材料咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.domain === 'employment' && intent.current_status === '特定技能' && /雇主|雇用主|会社|公司|転職|换/.test(questionText)) {
    return {
      ok: true,
      answer_type: 'cannot_determine',
      answer_level: 'L3',
      review_status: 'intent_unclear',
      title: '特定技能换会社需要先确认是换雇主还是换在留资格',
      summary: '先确认是否只是同一在留资格下换雇主，还是要变更到其他在留资格。',
      sections: [
        { heading: '需要先确认', body: '确认你的特定技能分野、现在的支援机构、旧雇主退职日、新雇主雇用开始日、是否已经向入管做届出。' },
      ],
      next_steps: ['确认旧雇主退职日和新雇主雇用开始日。', '确认支援机构是否变更。', '确认是否要向入管提交雇用契約相关届出。'],
      related_links: [{ title: '继续问', href: '/' }],
      sources: [{ title: '出入国在留管理庁 特定技能相关届出', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '特定技能 1 号换会社，先确认是不是同一资格下换雇主，再看支援机构、雇用契約和届出。',
        what_to_do: ['确认旧雇主退职日和新雇主雇用开始日。', '确认支援机构、雇用契約和届出是否需要变更。'],
        where_to_go: ['新雇主', '支援机构', '出入国在留管理局'],
        how_to_do: ['让新雇主和支援机构确认雇用契約、支援计划和必要届出。', '把旧雇主退职资料、新雇主合同、支援机构资料放在一起。'],
        documents_needed: ['在留カード', '旧雇主退职资料', '新雇主雇用契約書', '支援计划相关资料'],
        deadline_or_timing: ['退职、入职、雇主变更发生后尽快确认届出期限。'],
        consequences: ['如果换会社后届出或支援计划没有对上，后续更新或变更时需要补充说明。'],
        expert_handoff: ['如果已经开始新工作但届出未确认，带新旧合同、退职日和支援机构资料咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.domain === 'company_registration' && /代表|役员|役員|取締役/.test(intent.extracted_entities.procedure ?? questionText)) {
    return {
      ok: true,
      answer_type: 'cannot_determine',
      answer_level: 'L3',
      review_status: 'intent_unclear',
      title: '代表者变更要分开确认会社登记和入管届出',
      summary: '代表取締役或役员变更先确认法务局登记是否已变更，再确认入管侧是否需要说明或届出。',
      sections: [
        { heading: '需要先确认', body: '确认变更日期、商業登記是否完成、你本人是否持经营管理在留资格、下一次更新或变更申请是否临近。' },
      ],
      next_steps: ['确认代表者变更日期。', '确认法务局商業登記是否完成。', '确认入管侧是否已有通知或下次更新材料要求。'],
      related_links: [{ title: '续签检查', href: '/check' }],
      sources: [{ title: '法務局 商業登記 / 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '代表取締役换人，先处理会社登记，再确认入管是否需要届出或在下次申请中说明。',
        what_to_do: ['确认法务局商業登記是否已变更。', '确认本人经营管理在留下的役员关系是否变化。'],
        where_to_go: ['法务局', '出入国在留管理局', '行政書士事务所'],
        how_to_do: ['先整理代表变更日期、登記事項証明書和股东/役员决定资料。', '再判断入管侧是立即届出、补资料，还是下次更新时说明。'],
        documents_needed: ['登記事項証明書', '役员变更记录', '在留カード', '公司定款或决议资料'],
        deadline_or_timing: ['代表者变更登记完成后尽快确认入管侧处理；如已有补资料通知，以通知期限为准。'],
        consequences: ['如果公司代表关系和在留材料不一致，后续经营管理更新或变更时可能需要补充说明。'],
        expert_handoff: ['如果本人仍持经营管理、代表身份已变更或期限接近，带登記事項証明書和在留卡咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.target_status === '经营管理' && /事業所要件|办公室|事務所|住宅|自宅|租约|賃貸|个人名义|個人名義/.test(intent.extracted_entities.procedure ?? questionText)) {
    return {
      ok: true,
      answer_type: 'cannot_determine',
      answer_level: 'L3',
      review_status: 'intent_unclear',
      title: '经营管理办公室要先确认经营场所实态',
      summary: '办公室或租约问题不能套用资本金或转签答案。先确认合同名义、使用用途、独立性和实际经营状态。',
      sections: [{ heading: '需要先确认', body: '确认租赁合同名义、用途是否可商用、是否有独立空间、是否能拍摄办公室照片和保存费用支付记录。' }],
      next_steps: ['确认租赁合同名义和用途。', '保存办公室照片、平面图和费用支付记录。', '如果合同名义或用途有边界，先咨询专业人士。'],
      related_links: [{ title: '续签检查', href: '/check' }],
      sources: [{ title: '出入国在留管理庁 経営・管理 在留資格', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '经营管理办公室问题先看经营场所实态：合同名义、商用用途、独立空间和实际使用记录。',
        what_to_do: ['确认租赁合同名义和使用用途。', '准备办公室照片和平面图。'],
        where_to_go: ['出租方或管理会社', '出入国在留管理局', '行政書士事务所'],
        how_to_do: ['把租赁合同、照片、平面图、费用支付记录放在一起。', '如果是住宅、个人名义或共享空间，先确认能否说明事业使用实态。'],
        documents_needed: ['賃貸契約書', '办公室照片', '平面图', '费用支付记录', '公司登記事項証明書'],
        deadline_or_timing: ['新申请、续签或补资料前先整理。'],
        consequences: ['如果经营场所实态说明不足，经营管理申请或更新材料会变弱，可能需要补资料。'],
        expert_handoff: ['如果合同是个人名义、住宅用途或共享空间，带合同和照片咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.domain === 'employment' && /HR|人事|员工|外国员工|離職|离职|入職|入职|届出|报备/.test(questionText)) {
    return {
      ok: true,
      answer_type: 'cannot_determine',
      answer_level: 'L3',
      review_status: 'intent_unclear',
      title: '外国员工入退职要先确认公司侧届出对象',
      summary: 'HR/公司侧问题不能套用个人年金答案。先确认是入职、离职、换雇主还是资格外活动风险。',
      sections: [{ heading: '需要先确认', body: '确认员工在留资格、入退职日期、雇佣合同、公司是否需要向入管或相关机构做届出。' }],
      next_steps: ['确认员工在留资格和入退职日期。', '确认雇佣合同和业务内容。', '确认公司侧届出窗口和期限。'],
      related_links: [{ title: '继续问', href: '/' }],
      sources: [{ title: '出入国在留管理庁 所属機関等に関する届出', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '外国员工入退职先确认员工在留资格、入退职日期和公司侧届出对象。',
        what_to_do: ['确认员工在留资格。', '确认入退职日期和雇佣合同。'],
        where_to_go: ['公司人事', '出入国在留管理局', 'Hello Work'],
        how_to_do: ['把雇用契約書、退职资料和业务内容说明放在一起。', '按员工身份确认入管届出和雇佣相关手续。'],
        documents_needed: ['在留カード', '雇用契約書', '退职证明', '业务内容说明'],
        deadline_or_timing: ['入退职发生后尽快确认；如涉及 14 日届出，以法定期限优先。'],
        consequences: ['如果公司侧届出漏掉，后续员工更新或公司雇佣管理可能需要补充说明。'],
        expert_handoff: ['如果员工身份、业务内容或届出期限不清，带合同和在留卡信息咨询行政書士或社労士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (intent.domain === 'visa' && intent.current_status === '经营管理' && /休眠|倒闭|倒産|公司停|会社停/.test(`${intent.extracted_entities.company_status ?? ''}${intent.extracted_entities.procedure ?? ''}${questionText}`)) {
    return {
      ok: true,
      answer_type: 'cannot_determine',
      answer_level: 'L4',
      review_status: 'intent_unclear',
      title: '经营管理公司休眠是否还能更新，需要先确认经营实态',
      summary: '这是经营管理在留资格问题，不是年金主线。先确认公司是否仍有经营实态、办公室、税务和活动记录。',
      sections: [{ heading: '需要先确认', body: '确认休眠日期、是否还有売上/契約/办公室、税务申告、役员状态和在留期限。' }],
      next_steps: ['整理公司休眠日期和理由。', '整理办公室、税务、合同和银行记录。', '在在留期限前咨询专业人士判断更新或变更路径。'],
      related_links: [{ title: '续签检查', href: '/check' }],
      sources: [{ title: '出入国在留管理庁 経営・管理 在留資格', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '经营管理公司休眠能否更新，先看经营实态是否还能说明；不能只看公司是否还存在。',
        what_to_do: ['确认休眠日期和公司当前状态。', '整理税务、办公室、合同和银行记录。'],
        where_to_go: ['税理士', '行政書士事务所', '出入国在留管理局'],
        how_to_do: ['把法人税申告、登記事項証明書、办公室合同、银行流水和业务合同整理成时间线。', '判断是更新、变更在留资格，还是先处理公司状态。'],
        documents_needed: ['登記事項証明書', '法人税申告书', '办公室合同', '银行流水', '业务合同', '在留カード'],
        deadline_or_timing: ['在留期限前尽快确认；如已停止经营，不要等到临近到期才整理。'],
        consequences: ['如果经营实态无法说明，经营管理更新材料会非常弱，可能需要考虑其他在留路径。'],
        expert_handoff: ['如果公司已经休眠、赤字或无办公室，带公司税务和登记材料咨询行政書士和税理士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (isManagementToHumanitiesIntent(intent)) {
    return {
      ok: true,
      answer_type: 'draft',
      answer_level: 'L3',
      review_status: 'unreviewed',
      title: '经营管理转技人国 / 人文签先看接收公司和岗位',
      summary: '主线不是资金或事业所，而是你是否有接收公司、岗位是否属于技人国范围，以及学历/经历能否支撑该岗位。',
      sections: [
        {
          heading: '先看条件',
          body: '需要先确认接收公司、雇佣合同、业务内容说明、学历或实务经历与岗位的对应关系。经营管理一侧还要确认原公司代表/役员身份如何处理。',
        },
        {
          heading: '下一步',
          body: '先让接收公司出具雇用契約書和業務内容説明書，再整理学历证明、职历证明、原公司退任或职务调整材料，最后判断是否提交在留資格変更。',
        },
      ],
      next_steps: [
        '确认接收公司是否已经愿意雇用。',
        '确认岗位是否属于技術・人文知識・国際業務范围。',
        '整理学历、职历、雇佣合同和业务内容说明。',
        '确认原公司代表/役员关系如何结束或调整。',
      ],
      related_links: [{ title: '续签检查', href: '/check' }],
      sources: [{ title: '出入国在留管理庁 在留資格変更許可申請', url: 'https://www.moj.go.jp/isa/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '经营管理转技人国 / 人文签，先看接收公司、岗位内容和本人学历/经历是否匹配；不是再看经营管理的资金或事业所条件。',
        what_to_do: [
          '先确认接收公司、岗位名称、业务内容和入职日期。',
          '确认原公司代表/役员关系是否需要退任、变更或保留说明。',
        ],
        where_to_go: ['接收公司人事', '出入国在留管理局', '行政書士事务所'],
        how_to_do: [
          '向接收公司索取雇用契約書和業務内容説明書。',
          '把学历证明、职历证明、资格证和过去业务说明放到同一份材料包。',
          '整理原经营管理公司代表/役员身份处理记录，再判断在留資格変更材料。',
        ],
        documents_needed: ['雇用契約書', '業務内容説明書', '学历证明', '职历证明', '在留カード', '原公司退任或役员变更材料'],
        deadline_or_timing: ['在留期限前提交在留資格変更申请；入职日确定后尽快整理材料。'],
        consequences: ['如果岗位与学历/经历不匹配，或原公司代表关系没有说明，变更申请材料会变弱，可能需要补正或重新整理。'],
        expert_handoff: ['如果仍是原公司代表、接收公司岗位边界不清，或在留期限接近，带雇佣合同、业务说明和原公司登记材料咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  if (isCompanyDormantPensionIntent(intent)) {
    return {
      ok: true,
      answer_type: 'draft',
      answer_level: 'L2',
      review_status: 'unreviewed',
      title: '公司休眠后先确认厚生年金资格是否已经丧失',
      summary: '公司休眠不等于个人年金义务消失。关键是厚生年金/健康保险资格丧失日，之后通常要处理国民年金第 1 号和国民健康保险。',
      sections: [
        {
          heading: '先确认',
          body: '确认公司是否已经停止社会保险、你是否拿到健康保険・厚生年金資格喪失証明書、资格丧失日是哪天。',
        },
        {
          heading: '下一步',
          body: '拿到资格丧失资料后，带在留卡、マイナンバー和相关证明去居住地市区町村窗口确认国民年金第 1 号和国民健康保险切换。',
        },
      ],
      next_steps: [
        '确认厚生年金 / 健康保险资格丧失日。',
        '取得健康保険・厚生年金資格喪失証明書。',
        '到区役所 / 市役所的国保年金窗口处理国民年金和国民健康保险。',
      ],
      related_links: [{ title: '我的提醒', href: '/timeline' }],
      sources: [{ title: '日本年金機構 資格喪失届', url: 'https://www.nenkin.go.jp/' }],
      query_id: null,
      answer_id: null,
      boundary_note: ANSWER_BOUNDARY_NOTE,
      action_answer: {
        conclusion: '公司休眠后，先看厚生年金和健康保险是否已资格丧失；一旦丧失，个人通常要处理国民年金第 1 号和国民健康保险。',
        what_to_do: ['确认资格丧失日。', '取得资格丧失证明。'],
        where_to_go: ['区役所', '市役所', '年金事务所'],
        how_to_do: [
          '向公司或年金事务所确认健康保険・厚生年金資格喪失証明書。',
          '带证明、在留卡和マイナンバー去国保年金窗口办理切换。',
          '如果收入低，再确认免除或猶予是否适用；这不是主线，只是后续选项。',
        ],
        documents_needed: ['健康保険・厚生年金資格喪失証明書', '在留カード', 'マイナンバー', '離職票或退職証明書'],
        deadline_or_timing: ['资格丧失后 14 日内处理国民健康保险和国民年金切换。'],
        consequences: ['不处理可能产生未加入或未纳空白，之后在更新、永住或实际就医时都需要解释。'],
        expert_handoff: ['如果公司失联、资格丧失证明拿不到，或已经逾期，带公司资料和年金记录咨询社労士；涉及在留更新时同时咨询行政書士。'],
        boundary_note: ANSWER_BOUNDARY_NOTE,
      },
    }
  }

  return null
}

function shouldUseIntentAnswerBeforeSeeds(questionText: string, intent: AnswerIntent): boolean {
  if (intent.intent_type === 'material_list') return true
  if (isCompanyDormantPensionIntent(intent)) return true
  if (intent.intent_type === 'scenario_sequence' && /(刚到|来日本|第一周|初到)/.test(questionText)) return true
  if (intent.domain === 'employment' && intent.current_status === '特定技能' && /雇主|雇用主|会社|公司|転職|换/.test(questionText)) return true
  if (intent.domain === 'employment' && /HR|人事|员工|外国员工|離職|离职|入職|入职|届出|报备/.test(questionText)) return true
  if (intent.domain === 'company_registration' && /代表|役员|役員|取締役/.test(intent.extracted_entities.procedure ?? questionText)) return true
  if (intent.target_status === '经营管理' && /事業所要件|办公室|事務所|住宅|自宅|租约|賃貸|个人名义|個人名義/.test(intent.extracted_entities.procedure ?? questionText)) return true
  if (intent.domain === 'visa' && intent.current_status === '经营管理' && /休眠|倒闭|倒産|公司停|会社停/.test(`${intent.extracted_entities.company_status ?? ''}${intent.extracted_entities.procedure ?? ''}${questionText}`)) return true
  return false
}

function knowledgeSafeForIntent(seed: KnowledgeSeed, questionText: string, intent: AnswerIntent): boolean {
  const query = compactForIntent(questionText)
  const text = compactForIntent(`${seed.title}\n${seed.slug}\n${seed.dimensionKey ?? ''}\n${seed.body.slice(0, 800)}`)
  if (/特定技能.*(换会社|换公司|転職|雇主変更|雇用主変更)/.test(query) && !/(特定技能|雇用|雇主|会社変更|転職)/.test(text)) return false
  if (/(代表取締役|取締役|代表|役員|役员).*(换人|変更|变更|入管|届出|通知)/.test(query) && !/(代表|役員|役员|会社|法人|入管|届出)/.test(text)) return false
  if (intent.intent_type === 'material_list' && !/(材料|書類|资料|清单|証明|证明)/.test(text)) return false
  if (intent.domain !== 'unknown') {
    if ((intent.domain === 'pension' || intent.domain === 'health_insurance') && !/(年金|健康保険|国保|社保|社会保険)/.test(text)) return false
    if (intent.domain === 'tax' && !/(税|納税|住民税|確定申告)/.test(text)) return false
    if (intent.domain === 'company_registration' && !/(会社|法人|本店|事務所|办公室|法務局|登記|役員|代表)/.test(text)) return false
    if (intent.domain === 'employment' && !/(雇用|退職|入職|会社|人事|特定技能)/.test(text)) return false
  }
  return true
}

function isManagementToHumanitiesIntent(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(经营管理|経営管理|经管)/.test(intent.current_status)
      && intent.target_status
      && /(技人国|人文|工作签|技術人文)/.test(intent.target_status),
  )
}

function isCompanyDormantPensionIntent(intent: AnswerIntent): boolean {
  return (intent.domain === 'pension' || intent.domain === 'health_insurance')
    && /(会社社保空档|休眠|倒闭|倒産|会社|公司|健保)/.test(intent.current_status ?? `${intent.extracted_entities.company_status ?? ''}${intent.extracted_entities.procedure ?? ''}`)
}

async function bestQaSeed(
  normalized: string,
  questionText: string,
  intent: AnswerIntent,
): Promise<{ seed: AnswerSeed | null; rejectedByIntent: boolean }> {
  const seeds = [
    ...FREQUENT_QA_SEEDS,
    ...await loadMarkdownAnswerSeeds(),
  ]
  return bestSeedFromList(seeds, normalized, questionText, intent, 4)
}

async function bestGoldSeed(
  normalized: string,
  questionText: string,
  intent: AnswerIntent,
): Promise<{ seed: AnswerSeed | null; rejectedByIntent: boolean }> {
  return bestSeedFromList(await loadGoldAnswerSeeds(), normalized, questionText, intent, 5)
}

function bestSeedFromList(
  seeds: AnswerSeed[],
  normalized: string,
  questionText: string,
  intent: AnswerIntent,
  minScore: number,
): { seed: AnswerSeed | null; rejectedByIntent: boolean } {
  const ranked = seeds
    .map(seed => {
      const rankedKeywords = rankKeywords(normalized, seed.keywords)
      const intentBonus = scoreIntentSeed(seed, intent)
      return {
        seed,
        matches: rankedKeywords.matches,
        score: rankedKeywords.score + intentBonus + (seed.priority ?? 0),
      }
    })
    .filter(item => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
  let rejectedByIntent = false
  for (const item of ranked) {
    const safe = safeCandidateForIntent(item.seed, intent, questionText)
    if (!safe.safe) {
      rejectedByIntent = true
      continue
    }
    if (isHighRiskGenericSeed(item.seed) && item.score < 18 + (item.seed.priority ?? 0)) {
      rejectedByIntent = true
      continue
    }
    const answer = seedToAnswer(item.seed, questionText)
    const intentCheck = answerMatchesIntent(intent, answer)
    const judge = judgeAnswer({ original_question: questionText, parsed_intent: intent, answer })
    if (intentCheck.pass && judge.should_show) return { seed: item.seed, rejectedByIntent }
    rejectedByIntent = true
  }
  return { seed: null, rejectedByIntent }
}

async function bestKnowledgeSeed(normalized: string, visaType?: string | null): Promise<KnowledgeSeed | null> {
  const seeds = await loadKnowledgeSeeds()
  const ranked = seeds
    .map(seed => ({ seed, score: scoreKnowledge(normalized, seed, visaType) }))
    .filter(item => item.score >= 4)
    .sort((a, b) => b.score - a.score)
  return ranked[0]?.seed ?? null
}

function loadKnowledgeSeeds(): Promise<KnowledgeSeed[]> {
  knowledgeCache ??= readKnowledgeSeeds()
  return knowledgeCache
}

async function readKnowledgeSeeds(): Promise<KnowledgeSeed[]> {
  const dirs = [
    path.join(process.cwd(), 'docs/knowledge-seed/check-dimensions'),
    path.join(process.cwd(), 'docs/knowledge-seed/dimensions-visa-specific'),
  ]
  const files = (await Promise.all(dirs.map(dir => listMarkdownFiles(dir).catch(() => [])))).flat()
  const seeds: KnowledgeSeed[] = []
  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const parsed = matter(raw)
    const title = stringOrDefault(parsed.data.title, path.basename(file, path.extname(file)))
    const slug = stringOrDefault(parsed.data.slug, path.basename(file, path.extname(file)))
    seeds.push({
      slug,
      title,
      visaType: stringOrNull(parsed.data.visa_type ?? parsed.data.visaType),
      dimensionKey: stringOrNull(parsed.data.dimension_key ?? parsed.data.dimensionKey),
      body: parsed.content.trim(),
      sourcePath: file,
    })
  }
  return seeds
}

function loadMarkdownAnswerSeeds(): Promise<AnswerSeed[]> {
  answerSeedCache ??= readMarkdownAnswerSeeds()
  return answerSeedCache
}

async function readMarkdownAnswerSeeds(): Promise<AnswerSeed[]> {
  const root = path.join(process.cwd(), 'docs/answer-seed')
  const files = await listMarkdownFiles(root).catch(() => [])
  const seeds: AnswerSeed[] = []
  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    seeds.push(...parseAnswerSeedBlocks(raw, file))
  }
  return seeds
}

function parseAnswerSeedBlocks(raw: string, _filePath: string): AnswerSeed[] {
  const blocks = raw.split(/^##\s+(Q\d{3})\s*$/m)
  const seeds: AnswerSeed[] = []
  for (let index = 1; index < blocks.length; index += 2) {
    const code = blocks[index]?.trim()
    const body = blocks[index + 1] ?? ''
    const question = fieldValue(body, 'question')
    if (!code || !question) continue
    const answerLevel = enumValue(fieldValue(body, 'answer_level'), ['L1', 'L2', 'L3', 'L4'], 'L2')
    const sourceGrade = enumValue(fieldValue(body, 'source_grade'), ['S', 'A', 'B', 'C'], 'B')
    const reviewStatus = normalizeReviewStatus(fieldValue(body, 'review_status'))
    const answerType = responseTypeFromSeed(fieldValue(body, 'answer_type'), reviewStatus)
    const aliases = listValue(body, 'aliases')
    const testQueries = listValue(body, 'test_queries')
    const summary = fieldValue(body, 'summary') ?? question
    const firstScreenAnswer = blockValue(body, 'first_screen_answer')
    const whyNotSimpleAnswer = blockValue(body, 'why_not_simple_answer')
    const expertHandoff = expertHandoffValue(body)
    const actionAnswer = actionAnswerValue(body)
    const sections = sectionValue(body)
    const nextSteps = listValue(body, 'next_steps')
    const sourceHints = listValue(body, 'source_hint')
    const boundaryNote = fieldValue(body, 'boundary_note')
    seeds.push({
      slug: slugify(`${code}-${question}`),
      title: question,
      question,
      keywords: Array.from(new Set([question, ...aliases, ...testQueries])).filter(Boolean),
      answerType,
      answerLevel: answerLevel as AnswerSeed['answerLevel'],
      reviewStatus,
      sourceGrade,
      summary,
      sections: sections.length > 0 ? sections : [{ heading: '整理内容', body: summary }],
      nextSteps: nextSteps.length > 0 ? nextSteps : defaultNextSteps(question),
      sources: sourceHints.map(title => ({ title, source_grade: sourceGrade })),
      boundaryNote: boundaryNote ?? ANSWER_BOUNDARY_NOTE,
      relatedLinks: [{ title: '续签材料准备检查', href: '/check' }],
      firstScreenAnswer: firstScreenAnswer ?? undefined,
      whyNotSimpleAnswer: whyNotSimpleAnswer ?? undefined,
      expertHandoff: expertHandoff ?? undefined,
      testQueries,
      actionAnswer: actionAnswer ?? undefined,
    })
  }
  return seeds
}

function fieldValue(block: string, field: string): string | null {
  const match = block.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim() || null
}

function blockValue(block: string, field: string): string | null {
  return fieldBlock(block, field)
    ?.split('\n')
    .map(line => line.replace(/^ {2}/, '').trimEnd())
    .join('\n')
    .trim() || null
}

function expertHandoffValue(block: string): AnswerSeed['expertHandoff'] | null {
  const raw = fieldBlock(block, 'expert_handoff')
  if (!raw) return null
  const triggerMatch = raw.match(/^\s*trigger:\s*\n([\s\S]*?)(?=^\s*\w[\w_]*:|$)/m)
  const trigger = triggerMatch
    ? triggerMatch[1]
      .split('\n')
      .map(line => line.replace(/^\s*-\s*/, '').trim())
      .filter(Boolean)
    : []
  const who = nestedField(raw, 'who')
  const why = nestedField(raw, 'why')
  if (trigger.length === 0 && !who && !why) return null
  return { trigger, who: who ?? undefined, why: why ?? undefined }
}

function actionAnswerValue(block: string): ActionAnswer | null {
  const raw = fieldBlock(block, 'action_answer')
  if (!raw) return null
  const conclusion = nestedTextValue(raw, 'conclusion') ?? ''
  const whatToDo = nestedBlockValue(raw, 'do_now')
  const whereToGo = nestedBlockValue(raw, 'where_to_go')
  const howToDo = nestedBlockValue(raw, 'how_to_do')
  const documentsNeeded = nestedBlockValue(raw, 'documents_needed')
  const deadlineOrTiming = nestedBlockValue(raw, 'deadline_or_timing')
  const consequences = nestedBlockValue(raw, 'consequences')
  const expertHandoff = nestedBlockValue(raw, 'expert_handoff')
  if (!conclusion && whatToDo.length === 0 && whereToGo.length === 0) return null
  return {
    conclusion,
    what_to_do: whatToDo,
    where_to_go: whereToGo,
    how_to_do: howToDo,
    documents_needed: documentsNeeded,
    deadline_or_timing: deadlineOrTiming,
    consequences,
    expert_handoff: expertHandoff,
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function nestedTextValue(block: string, field: string): string | null {
  const lines = block.split('\n')
  const start = lines.findIndex(line => line.match(new RegExp(`^\\s{2}${field}:\\s*(.*)$`)))
  if (start < 0) return null
  const startLine = lines[start] ?? ''
  const inline = startLine.replace(new RegExp(`^\\s{2}${field}:\\s*`), '').trim()
  const collected: string[] = []
  if (inline && inline !== '|') collected.push(inline)
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? ''
    if (/^\s{2}[A-Za-z_][A-Za-z0-9_]*:\s*/.test(line)) break
    collected.push(line)
  }
  const raw = collected
    .join('\n')
    .replace(/^\s*[-*]\s*/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  return raw || null
}

function nestedBlockValue(block: string, field: string): string[] {
  const lines = block.split('\n')
  const start = lines.findIndex(line => line.match(new RegExp(`^\\s{2}${field}:\\s*(.*)$`)))
  if (start < 0) return []
  const startLine = lines[start] ?? ''
  const inline = startLine.replace(new RegExp(`^\\s{2}${field}:\\s*`), '').trim()
  const collected: string[] = []
  if (inline && inline !== '|') collected.push(inline)
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? ''
    if (/^\s{2}[A-Za-z_][A-Za-z0-9_]*:\s*/.test(line)) break
    collected.push(line)
  }
  const raw = collected.join('\n').trim()
  if (!raw) return []
  const listItems = raw
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
  if (listItems.length > 1 && listItems.every(line => !line.includes('：') || line.length < 80)) return listItems
  return splitStructured(raw)
}

function nestedField(block: string, field: string): string | null {
  const match = block.match(new RegExp(`^\\s*${field}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim() || null
}

function listValue(block: string, field: string): string[] {
  const raw = fieldBlock(block, field)
  if (!raw) return []
  return raw
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
}

function sectionValue(block: string): AnswerSection[] {
  const raw = fieldBlock(block, 'sections')
  if (!raw) return []
  const lines = raw.split('\n')
  const sections: AnswerSection[] = []
  let current: AnswerSection | null = null
  for (const rawLine of lines) {
    const line = rawLine.trim()
    const heading = line.match(/^-\s*heading:\s*(.+)$/)
    if (heading) {
      if (current) sections.push(current)
      current = { heading: heading[1].trim(), body: '' }
      continue
    }
    const body = line.match(/^body:\s*(.+)$/)
    if (body && current) {
      current.body = body[1].trim()
      continue
    }
    if (current && line) current.body = `${current.body}\n${line}`.trim()
  }
  if (current) sections.push(current)
  return sections.filter(section => section.heading && section.body)
}

function fieldBlock(block: string, field: string): string | null {
  const lines = block.split('\n')
  const start = lines.findIndex(line => line.match(new RegExp(`^${field}:\\s*(?:\\|\\s*)?$`)))
  if (start < 0) return null
  const collected: string[] = []
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i]
    if (/^(?:---|##\s+Q\d{3})/.test(line)) break
    if (/^[A-Za-z_][A-Za-z0-9_]*:\s*/.test(line)) break
    collected.push(line)
  }
  return collected.join('\n').trimEnd()
}

function normalizeReviewStatus(value: string | null): 'reviewed' | 'unreviewed' | 'needs_expert' {
  if (value === 'reviewed') return 'reviewed'
  if (value === 'needs_expert') return 'needs_expert'
  return 'unreviewed'
}

function responseTypeFromSeed(value: string | null, reviewStatus: 'reviewed' | 'unreviewed' | 'needs_expert'): 'matched' | 'cannot_determine' {
  if (value === 'needs_expert' || reviewStatus === 'needs_expert') return 'cannot_determine'
  return 'matched'
}

function enumValue<T extends readonly string[]>(value: string | null, allowed: T, fallback: T[number]): T[number] {
  return value && (allowed as readonly string[]).includes(value) ? value as T[number] : fallback
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdownFiles(fullPath)
    if (!entry.isFile()) return []
    return /\.md$/i.test(entry.name) ? [fullPath] : []
  }))
  return nested.flat()
}

function markdownSections(markdown: string): AnswerSection[] {
  const lines = plainMarkdown(markdown).split('\n')
  const sections: AnswerSection[] = []
  let current: AnswerSection | null = null
  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/)
    if (headingMatch) {
      if (current?.body.trim()) sections.push({ ...current, body: current.body.trim() })
      current = { heading: headingMatch[1].trim(), body: '' }
      continue
    }
    if (current) {
      current.body += `${line}\n`
    }
  }
  if (current?.body.trim()) sections.push({ ...current, body: current.body.trim().slice(0, 1100) })
  return sections.filter(section => section.body.length >= 20)
}

function optionsToText(options: DecisionOption[]): string {
  return options.map(item => `- ${item.label}${item.detail ? `：${item.detail}` : ''}`).join('\n')
}

function sourceRefToSource(source: SourceRef): AnswerSource {
  return {
    title: source.title,
    url: source.url,
    source_grade: source.source_grade ?? source.sourceGrade,
  }
}

function defaultNextSteps(questionText: string): string[] {
  return [
    '确认相关文书、窗口或公司/学校发出的原始说明。',
    '记录日期、期限、金额、发件机构和你当前在留资格。',
    questionText.includes('期限') || questionText.includes('到期')
      ? '先处理文书上的期限，再补充解释材料。'
      : '如果无法确认窗口或材料，先拍照归档并咨询专业人士。',
  ]
}

function scoreKnowledge(normalized: string, seed: KnowledgeSeed, visaType?: string | null): number {
  const haystack = normalize(`${seed.title} ${seed.slug} ${seed.dimensionKey ?? ''} ${seed.body.slice(0, 1400)}`)
  const tokens = queryTokens(normalized)
  let score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0)
  if (seed.visaType && visaType && seed.visaType === visaType) score += 2
  if (seed.title && normalized.includes(normalize(seed.title).slice(0, 4))) score += 3
  return score
}

function rankKeywords(normalized: string, keywords: string[]): { score: number; matches: number } {
  let score = 0
  let matches = 0
  for (const keyword of keywords) {
    const normalizedKeyword = normalize(keyword)
    if (normalized.includes(normalizedKeyword)) {
      matches += 1
      score += normalizedKeyword.length >= 4 ? 8 : 4
      continue
    }
    const terms = keywordDomainTerms(normalizedKeyword)
    const termMatches = terms.filter(term => normalized.includes(term))
    if (termMatches.length < Math.min(2, terms.length)) continue
    matches += termMatches.length
    score += termMatches.length * 2
  }
  return { score, matches }
}

function scoreIntentSeed(seed: AnswerSeed, intent: AnswerIntent): number {
  const text = compactForIntent([
    seed.slug,
    seed.title,
    seed.summary,
    seed.question,
    ...seed.keywords,
    ...(seed.testQueries ?? []),
    seed.firstScreenAnswer,
    seed.whyNotSimpleAnswer,
    seed.actionAnswer?.conclusion,
    ...(seed.actionAnswer?.what_to_do ?? []),
  ].filter(Boolean).join('\n'))
  let score = 0

  if (intent.current_status && intent.target_status) {
    if (intentStatusInText(intent.current_status, text)) score += 8
    if (intentStatusInText(intent.target_status, text)) score += 10
    if (intentStatusInText(intent.current_status, text) && intentStatusInText(intent.target_status, text)) score += 12
  } else if (intent.target_status && intentStatusInText(intent.target_status, text)) {
    score += 8
  }

  if ((intent.domain === 'pension' || intent.domain === 'health_insurance') && /国民年金|厚生年金|年金|国民健康保険|国保|社会保険/.test(text)) {
    score += 14
  }
  if (intent.domain === 'company_registration' && /事務所|办公室|本店|法務局|税務署|入管/.test(text)) {
    score += 12
  }
  if (intent.domain === 'tax' && /住民税|納税|税金|滞納/.test(text)) {
    score += 10
  }
  if (intent.domain === 'employment' && /不法就労|雇用|雇主|老板|従業員|员工/.test(text)) {
    score += 10
  }

  if (intent.current_status?.includes('技人国') && /特定技能/.test(text) && !/経営管理|经营管理|經營管理/.test(text)) {
    score -= 20
  }
  if (isHumanitiesToManagementIntent(intent)) {
    const directPath = /(技人国|人文|工作签|技術人文).{0,30}(経営管理|经营管理|经管|經營管理)|(経営管理|经营管理|经管|經營管理).{0,30}(技人国|人文|工作签|技術人文)/.test(text)
    const conversionHits = countIntentTerms(text, [
      '500万',
      '出資',
      '会社設立',
      '公司设立',
      '事業所',
      '賃貸契約',
      '租赁合同',
      '事業計画',
      '事业计划',
      '在留資格変更',
      '在留资格变更',
      '変更許可申請',
      '起業',
      '开公司',
    ])
    if (directPath) score += 24
    score += Math.min(conversionHits, 5) * 8
    if (/(契約機関|所属機関|14日|14天|届出|転職|换工作|離職|入職)/.test(text) && conversionHits < 2) {
      score -= 36
    }
  }
  if (isManagementToHumanitiesIntent(intent)) {
    const employmentHits = countIntentTerms(text, [
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
      '退任',
      '役員',
      '代表',
    ])
    const managementStartupHits = countIntentTerms(text, ['500万', '出資', '事業所', '会社設立', '事業計画', '起業', '开公司'])
    score += Math.min(employmentHits, 5) * 8
    if (managementStartupHits >= 2 && employmentHits < 3) score -= 44
  }
  return score
}

function isHumanitiesToManagementIntent(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(技人国|人文|工作签|技術人文)/.test(compactForIntent(intent.current_status))
      && intent.target_status
      && /(经营管理|経営管理|经管|經營管理)/.test(compactForIntent(intent.target_status)),
  )
}

function countIntentTerms(text: string, terms: string[]): number {
  return terms.filter(term => text.includes(compactForIntent(term))).length
}

function intentStatusInText(status: string, text: string): boolean {
  const compact = compactForIntent(status)
  if (/技人国|人文|工作签|技術人文/.test(compact)) return /技人国|人文|工作签|技術人文|技術人文知識国際業務|技術人文知識國際業務/.test(text)
  if (/经营管理|経営管理|经管|經營管理/.test(compact)) return /经营管理|経営管理|经管|經營管理|経営管理/.test(text)
  if (/特定技能/.test(compact)) return /特定技能/.test(text)
  if (/留学/.test(compact)) return /留学|留学生/.test(text)
  if (/永住/.test(compact)) return /永住/.test(text)
  return text.includes(compact)
}

function compactForIntent(value: string): string {
  return value
    .replace(/\s+/g, '')
    .replace(/[・･\/／→\-ー—_()（）「」『』【】,，、:：]/g, '')
    .toLowerCase()
}

function splitStructured(value: string): string[] {
  return value
    .split(/\n|。|；|;/)
    .flatMap(line => line.split(/(?=\d+[）.)]\s*)/))
    .map(line => line.replace(/^\s*[-*]\s*/, '').trim())
    .filter(Boolean)
}

const DOMAIN_TERMS = [
  '办公室',
  '事務所',
  '搬迁',
  '公司休眠',
  '休眠',
  '国民年金',
  '社保',
  '社会保険',
  '厚生年金',
  '在留卡',
  '在留カード',
  '地址',
  '住所',
  '搬家',
  '留学生',
  '留学',
  '人文签',
  '技人国',
  '工作签',
  '特定技能',
  '住民税',
  '晚交',
  '滞納',
  '永住',
  '父母',
  '养老',
  '老板',
  '雇',
  '签证不符',
  '不法就労',
  '经营管理',
  '経営管理',
  '资本金',
  '資本金',
]

function keywordDomainTerms(normalizedKeyword: string): string[] {
  const terms = DOMAIN_TERMS
    .map(term => normalize(term))
    .filter(term => normalizedKeyword.includes(term))
  return Array.from(new Set(terms))
}

function queryTokens(normalized: string): string[] {
  const compact = normalized.replace(/[^A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]+/g, ' ')
  const words = compact.split(/\s+/).filter(token => token.length >= 2)
  const grams: string[] = []
  for (let i = 0; i < normalized.length - 1; i += 1) {
    const gram = normalized.slice(i, i + 2)
    if (/[A-Za-z0-9\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(gram)) grams.push(gram)
  }
  return Array.from(new Set([...words, ...grams])).slice(0, 80)
}

function needsExpertChecklist(normalized: string): boolean {
  return [
    '逮捕',
    '处分',
    '処分',
    '犯罪',
    '罰金',
    '交通違反',
    '饮酒',
    '飲酒',
    '不法',
    '超时',
    '雇错',
    '签证不符',
    '公司异常',
    '资本金不够',
  ].some(keyword => normalized.includes(normalize(keyword)))
}

function plainMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '- ')
    .trim()
}

function sanitizeAnswer(answer: AnswerResult): AnswerResult {
  const sanitized = {
    ...answer,
    title: sanitizeCopy(answer.title),
    summary: sanitizeCopy(answer.summary),
    sections: answer.sections.map(section => ({
      heading: sanitizeCopy(section.heading),
      body: sanitizeCopy(section.body),
    })),
    next_steps: answer.next_steps.map(sanitizeCopy),
    boundary_note: ANSWER_BOUNDARY_NOTE,
    first_screen_answer: answer.first_screen_answer ? sanitizeCopy(answer.first_screen_answer) : null,
    why_not_simple_answer: answer.why_not_simple_answer ? sanitizeCopy(answer.why_not_simple_answer) : null,
    expert_handoff: answer.expert_handoff
      ? {
          trigger: answer.expert_handoff.trigger.map(sanitizeCopy),
          who: answer.expert_handoff.who ? sanitizeCopy(answer.expert_handoff.who) : undefined,
          why: answer.expert_handoff.why ? sanitizeCopy(answer.expert_handoff.why) : undefined,
        }
      : null,
    action_answer: answer.action_answer
      ? {
          conclusion: sanitizeCopy(answer.action_answer.conclusion),
          what_to_do: answer.action_answer.what_to_do.map(sanitizeCopy),
          where_to_go: answer.action_answer.where_to_go.map(sanitizeCopy),
          how_to_do: answer.action_answer.how_to_do.map(sanitizeCopy),
          documents_needed: answer.action_answer.documents_needed.map(sanitizeCopy),
          deadline_or_timing: answer.action_answer.deadline_or_timing.map(sanitizeCopy),
          consequences: answer.action_answer.consequences.map(sanitizeCopy),
          expert_handoff: answer.action_answer.expert_handoff.map(sanitizeCopy),
          boundary_note: ANSWER_BOUNDARY_NOTE,
        }
      : undefined,
  }
  return {
    ...sanitized,
    action_answer: formatActionAnswer(sanitized),
    intent_guard_pass: answer.intent_guard_pass ?? true,
  }
}

function withIntent(answer: AnswerResult, intent: AnswerIntent): AnswerResult {
  return {
    ...answer,
    intent,
    intent_summary: describeIntent(intent, answer.title),
    preferred_template: intent.preferred_template,
    intent_guard_pass: true,
  }
}

function sanitizeCopy(value: string): string {
  const replacements = [
    ['拒签' + '概率', '审查不利可能性'],
    ['一定' + '通过', '不能保证通过'],
    ['一定' + '不通过', '需要进一步确认'],
    ['一定' + '被拒', '可能产生不利影响'],
    ['必定' + '拒签', '可能产生不利影响'],
    ['高' + '危', '需重点确认'],
    ['危' + '险', '需确认'],
    ['AI ' + '判断', '系统整理'],
    ['自动' + '判定', '自动整理'],
    ['秒' + '懂', '整理'],
    ['太' + '棒了', '已完成'],
    ['限时' + '优惠', '当前方案'],
    ['马上' + '升级', '查看方案'],
  ] as const
  return replacements.reduce(
    (copy, [from, to]) => copy.replaceAll(from, to),
    value,
  )
}

function normalize(input: string): string {
  return clean(input).toLowerCase()
}

function clean(input: string): string {
  return input.trim().replace(/\s+/g, ' ').slice(0, 4000)
}

function stringOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function stringOrDefault(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}
