'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { pLimit } from '@/lib/eval-lab/concurrency'

// TEBIQ Eval Lab V1 — DB-backed internal annotation tool.
//
// Issue #14 hardening:
//   - Per-question generation status: pending / running / success / failed,
//     tracked separately for DeepSeek raw and TEBIQ current
//   - Batch generation runs through a concurrency limiter (≤ 3 in flight)
//   - Failed-only rerun button (don't touch success rows)
//   - Skip-annotated toggle on batch (don't re-generate answers under a
//     reviewer's already-finalised annotation unless the user opts in).
//     Annotation rows themselves are owned by the reviewer and live in a
//     separate table — the batch path never writes eval_annotations.

// ---------- types (mirror DB row shape, snake_case from /state) ----------

type AnswerType = 'deepseek_raw' | 'deepseek_web' | 'tebiq_current'
type Severity = 'OK' | 'P2' | 'P1' | 'P0'
type YesNo = 'yes' | 'no' | ''
type EvalRepairOwner =
  | 'ENGINE'
  | 'FACT'
  | 'DOMAIN'
  | 'UX'
  | 'PRODUCT'
  | 'GENERATION'
  | 'IGNORE'
  | 'UNKNOWN'
type RepairOwner = EvalRepairOwner | ''
type VsDeepseekJudgment = 'strict_added' | 'tied' | 'regression' | ''
type Action =
  | 'golden_case'
  | 'prompt_rule'
  | 'fact_card_candidate'
  | 'handoff_rule'
  | 'ignore'
  | ''

interface QuestionRow {
  id: string
  question_text: string
  scenario: string | null
  source: string
  starter_tag: string | null
  active: boolean
  schema_version: string
  metadata_json: Record<string, unknown>
  created_at: string
  updated_at: string
}

interface AnswerRow {
  id: string
  question_id: string
  answer_type: AnswerType
  model: string | null
  prompt_version: string | null
  answer_text: string | null
  tebiq_answer_id: string | null
  tebiq_answer_link: string | null
  engine_version: string | null
  status: string | null
  domain: string | null
  fallback_reason: string | null
  latency_ms: number | null
  error: string | null
  raw_payload_json: Record<string, unknown> | null
  schema_version: string
  created_at: string
}

interface AnnotationRow {
  id: string
  question_id: string
  reviewer: string
  score: number | null
  severity: Severity | null
  launchable: 'yes' | 'no' | null
  direction_correct: 'yes' | 'no' | null
  answered_question: 'yes' | 'no' | null
  dangerous_claim: 'yes' | 'no' | null
  hallucination: 'yes' | 'no' | null
  should_handoff: 'yes' | 'no' | null
  must_have: string | null
  must_not_have: string | null
  missing_points: string | null
  reviewer_note: string | null
  action: Action | null
  annotation_json: Record<string, unknown>
  schema_version: string
  created_at: string
  updated_at: string
}

interface JudgementRow {
  id: string
  question_id: string
  case_id: string
  judge_name: string
  judge_model: string
  score: number
  score_normalized: number
  defect_flags: string[]
  vs_deepseek_judgment: VsDeepseekJudgment
  ideal_answer_skeleton: string
  confidence: string
  reasoning: string
  active_learning_red: boolean
  active_learning_reasons: string[]
  source_csv_path: string | null
  schema_version: string
  created_at: string
  updated_at: string
}

interface AnswerQualityProposal {
  caseId: string
  score: number | null
  scoreNormalized: number | null
  vsDeepseekJudgment: VsDeepseekJudgment
  flags: string[]
  rawFlags: string[]
  skeleton: string[]
  red: boolean
  activeLearningReasons: string[]
  confidence: number | null
  reasoning: string
  judgeModel: string
}

interface AqlApplyMetadata {
  applied_at: string
  case_id: string
  judge_model: string
  score: number | null
  vs_deepseek_judgment: VsDeepseekJudgment
  defect_flags: string[]
}

interface EditableAnnotation {
  score: number | null
  severity: Severity | ''
  launchable: YesNo
  direction_correct: YesNo
  answered_question: YesNo
  dangerous_claim: YesNo
  hallucination: YesNo
  should_handoff: YesNo
  must_have: string
  must_not_have: string
  missing_points: string
  reviewer_note: string
  repair_owner: RepairOwner
  vs_deepseek_judgment: VsDeepseekJudgment
  action: Action
  aql_apply: AqlApplyMetadata | null
}

const EMPTY_EDIT: EditableAnnotation = {
  score: null,
  severity: '',
  launchable: '',
  direction_correct: '',
  answered_question: '',
  dangerous_claim: '',
  hallucination: '',
  should_handoff: '',
  must_have: '',
  must_not_have: '',
  missing_points: '',
  reviewer_note: '',
  repair_owner: '',
  vs_deepseek_judgment: '',
  action: '',
  aql_apply: null,
}

// ---------- per-question generation status (Issue #14) ----------

type GenState = 'pending' | 'running' | 'success' | 'failed'

interface QuestionGenStatus {
  deepseek: GenState
  deepseekError: string | null
  deepseekAttempts: number | null
  tebiq: GenState
  tebiqError: string | null
  tebiqAttempts: number | null
}

const EMPTY_GEN_STATUS: QuestionGenStatus = {
  deepseek: 'pending',
  deepseekError: null,
  deepseekAttempts: null,
  tebiq: 'pending',
  tebiqError: null,
  tebiqAttempts: null,
}

const MIN_DEEPSEEK_ANSWER_CHARS = 180
const MIN_TEBIQ_ANSWER_CHARS = 120
const CURRENT_TEBIQ_PROMPT_VERSION = 'consultation_alpha_v12'

/**
 * Hydrate initial gen-status from server-side answer rows.
 * - has answer_text → success
 * - has error       → failed
 * - neither         → pending
 */
function hydrateGenStatus(
  questions: QuestionRow[],
  ans: AnswerSlotsByQuestion,
): Record<string, QuestionGenStatus> {
  const out: Record<string, QuestionGenStatus> = {}
  for (const q of questions) {
    const slot = ans[q.id]
    out[q.id] = {
      deepseek: classify(slot?.deepseek_raw),
      deepseekError: slot?.deepseek_raw?.error ?? null,
      deepseekAttempts: getAttempts(slot?.deepseek_raw),
      tebiq: classifyTebiq(slot?.tebiq_current),
      tebiqError: slot?.tebiq_current?.error ?? null,
      tebiqAttempts: getAttempts(slot?.tebiq_current),
    }
  }
  return out
}

function classify(row: AnswerRow | undefined): GenState {
  if (!row) return 'pending'
  if (isCompleteDeepseekAnswer(row)) return 'success'
  if (row.error) return 'failed'
  if (row.answer_text) return 'failed'
  return 'pending'
}

function classifyTebiq(row: AnswerRow | undefined): GenState {
  if (!row) return 'pending'
  if (row.error) return 'failed'
  if (isRealTebiqAnswer(row)) return 'success'
  if (row.answer_text) return 'failed'
  return 'pending'
}

function isRealTebiqAnswer(row: AnswerRow | undefined): boolean {
  return !!row?.answer_text
    && !row.error
    && !row.fallback_reason
    && row.engine_version !== 'answer-core-v1.1-fallback'
    && row.prompt_version === CURRENT_TEBIQ_PROMPT_VERSION
    && row.status === 'completed'
    && row.answer_text.trim().length >= MIN_TEBIQ_ANSWER_CHARS
}

function isCompleteDeepseekAnswer(row: AnswerRow | undefined): boolean {
  return !!row?.answer_text
    && !row.error
    && row.answer_text.trim().length >= MIN_DEEPSEEK_ANSWER_CHARS
}

function isLiveConsultationQuestion(q: QuestionRow | null | undefined): boolean {
  return q?.source === 'live_consultation'
}

function isReviewableCase(
  slot: { deepseek_raw?: AnswerRow; tebiq_current?: AnswerRow } | undefined,
  q?: QuestionRow | null,
): boolean {
  const tebiqReady = isRealTebiqAnswer(slot?.tebiq_current)
  if (isLiveConsultationQuestion(q)) return tebiqReady
  return isCompleteDeepseekAnswer(slot?.deepseek_raw) && tebiqReady
}

function getAttempts(row: AnswerRow | undefined): number | null {
  if (!row?.raw_payload_json) return null
  const v = (row.raw_payload_json as { attempts?: unknown }).attempts
  return typeof v === 'number' ? v : null
}

function annotationToEdit(a: AnnotationRow | null): EditableAnnotation {
  if (!a) return { ...EMPTY_EDIT }
  return {
    score: a.score ?? null,
    severity: (a.severity ?? '') as Severity | '',
    launchable: (a.launchable ?? '') as YesNo,
    direction_correct: (a.direction_correct ?? '') as YesNo,
    answered_question: (a.answered_question ?? '') as YesNo,
    dangerous_claim: (a.dangerous_claim ?? '') as YesNo,
    hallucination: (a.hallucination ?? '') as YesNo,
    should_handoff: (a.should_handoff ?? '') as YesNo,
    must_have: a.must_have ?? '',
    must_not_have: a.must_not_have ?? '',
    missing_points: a.missing_points ?? '',
    reviewer_note: a.reviewer_note ?? '',
    repair_owner: asRepairOwner(a.annotation_json?.repair_owner),
    vs_deepseek_judgment: asVsDeepseekJudgment(a.annotation_json?.vs_deepseek_judgment),
    action: (a.action ?? '') as Action,
    aql_apply: asAqlApplyMetadata(a.annotation_json?.aql_apply),
  }
}

type FilterMode =
  | 'all'
  | 'ready'
  | 'unannotated'
  | 'ai_red'
  | 'rerun'
  | 'p0'
  | 'p1'
  | 'launchable_no'
  | 'ungenerated'
  | 'failed'
  | 'golden'

type SourceFilter = 'all' | 'live_consultation' | 'starter' | 'other'

const DRAFT_KEY = 'tebiq_eval_lab_v1_drafts'

type AnswerSlotsByQuestion = Record<
  string,
  { deepseek_raw?: AnswerRow; deepseek_web?: AnswerRow; tebiq_current?: AnswerRow }
>

const VS_DEEPSEEK_OPTIONS: Exclude<VsDeepseekJudgment, ''>[] = [
  'strict_added',
  'tied',
  'regression',
]

const VS_DEEPSEEK_LABELS: Record<Exclude<VsDeepseekJudgment, ''>, string> = {
  strict_added: '严格加分',
  tied: '持平',
  regression: '倒退',
}

const SOURCE_FILTERS: SourceFilter[] = ['all', 'live_consultation', 'starter', 'other']

const SOURCE_FILTER_LABELS: Record<SourceFilter, string> = {
  all: '全部',
  live_consultation: '真实咨询',
  starter: 'golden',
  other: '其他',
}

const DEFECT_FLAG_LABELS: Record<string, string> = {
  shallow_answer: '答案偏浅',
  over_safe_generic: '过度保守 / 泛化',
  fact_underused: '事实卡或实务信息使用不足',
  no_next_action: '缺少下一步行动',
  missing_fact_not_asked: '关键事实没有追问或覆盖',
  user_intent_misread: '误读用户意图',
  fact_miss: '事实错误或关键事实缺失',
  truncation_or_incomplete: '答案截断 / 不完整',
  unsafe_overclaim: '不安全承诺或过度断言',
}

const ACTIVE_LEARNING_REASON_LABELS: Record<string, string> = {
  'confidence < 0.6': 'AQL 置信度低于 0.6',
  'score < 60': 'AQL 评分低于 60',
  'vs_deepseek_judgment = regression': 'AQL 判断 TEBIQ 倒退',
}

const INLINE_CODE_LABELS: Record<string, string> = {
  ...DEFECT_FLAG_LABELS,
  strict_added: '严格加分',
  tied: '持平',
  regression: '倒退',
}

const AQL_TEXT_CN_OVERRIDES: Record<string, { skeleton: string[]; reasoning: string }> = {
  'eval-lab-v1-G01': {
    skeleton: [
      '先确认搬家是刚发生还是已经过去很久；说明 14 天内办理住址变更，以及迟报后果。',
      '标准流程是旧区役所办转出、新区役所办转入，并携带在留卡。',
      '提醒住民票、税务、年金记录不一致，未来可能在更新或永住材料中暴露；逾期很久建议找行政书士。',
    ],
    reasoning: 'TEBIQ 能指出住民票、税务、年金记录矛盾会影响更新或永住，这是有价值的风险提醒。但 DeepSeek 对跨市区搬家流程更细，明确了转出届到转入届。两边各有优势，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-G02': {
    skeleton: [
      '核心事实：通常地址变更在区役所办理，区役所会通过系统同步给入管，不需要另跑入管。',
      '说明 14 天期限、携带物，以及国保、年金等役所一并处理事项。',
      '如果正在办在留申请，可补充说明这个边界情形。',
    ],
    reasoning: 'TEBIQ 的主要问题是把普通住址变更说成区役所后还必须另去入管。现行在留卡制度下，市区町村会把地址变更同步给入管，普通住址变更通常不需要额外跑入管。这个错误会让用户走错流程，因此 AQL 判断为倒退。',
  },
  'eval-lab-v1-G03': {
    skeleton: [
      '从搬入新住所起 14 天内办理。',
      '跨市区搬家时，先在旧役所办转出，再到新役所办转入，并带在留卡和住址证明。',
      '迟报可能形成届出迟延记录，未来更新或永住时被看到；逾期很久建议找行政书士。',
    ],
    reasoning: 'TEBIQ 覆盖了 14 天规则和迟报风险，但程序细节不如 DeepSeek，尤其漏了跨市区时旧役所转出届这一步。没有明显事实错误，但程序指导偏浅，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-G04': {
    skeleton: [
      '第一步应去警察署或交番报失，取得遗失届出证明书。',
      '14 天内向入管申请在留卡再交付，准备申请书、照片、证明书、护照等。',
      '处理中要注意不携带风险；若在留期限也临近，可确认是否与更新申请一并处理。',
    ],
    reasoning: 'TEBIQ 把第一步说成去市区町村役所，这是严重错误。遗失在留卡应先向警察报失并取得证明，再去入管申请再交付。役所在这个流程里不是第一窗口。对 14 天期限事项指错窗口，AQL 判断为倒退。',
  },
  'eval-lab-v1-G05': {
    skeleton: [
      '先确认是否已在期限前提交更新申请；如果没有，立即找行政书士。',
      '若已提交，特例期间最多允许在原期限后 2 个月内继续停留，并可继续原本被许可的活动。',
      '持续查看入管邮件和追加材料通知，随身保管受付票；特例期间也快到期时主动联系入管。',
    ],
    reasoning: 'TEBIQ 抓住了是否按期申请、特例期间和不许可风险。但漏了工作签用户在特例期间通常可继续原本活动这一重要实践信息。整体可用，但相比 DeepSeek 没有明显加分，所以 AQL 判断为持平。',
  },
  'eval-lab-v1-G06': {
    skeleton: [
      '先用照片翻译识别紧急词，例如期限、督促、差押。',
      '带原件去区役所外国人相談窗口；如果通知涉及入管或在留资格，不要只靠役所窗口，应找行政书士。',
      '提醒忽视通知可能产生滞纳金，也可能影响未来在留更新审查。',
    ],
    reasoning: 'TEBIQ 的价值在于区分普通行政通知和在留相关通知，并提醒在留相关时要升级到行政书士。这种风险分流比一般“去役所问”更有帮助，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-G07': {
    skeleton: [
      '先区分国税通知和住民税通知：国税找税务署，住民税找市区町村役所。',
      '国税可联系国税厅面向外国人的多语种咨询渠道。',
      '住民税缴纳记录会影响永住或归化审查，不要把任何税务通知当成无关事项。',
    ],
    reasoning: 'TEBIQ 明确区分国税和住民税，并把住民税记录与永住、归化风险连接起来，这是 DeepSeek 没有充分覆盖的风险分类。AQL 判断为严格加分。',
  },
  'eval-lab-v1-G08': {
    skeleton: [
      '通常在长期离日、超过 1 年或没有固定回国计划时，需要考虑海外转出届。',
      '原则上应在离日前 14 天内办理；已经离境时，可让日本的家人或代理人持委任状代办。',
      '转出会影响住民票、国保、年金等，但转出届本身不直接取消在留资格。',
    ],
    reasoning: 'TEBIQ 覆盖了离日前办理、长期离日触发条件等要点，但漏了已经离境时通过委任状代办这个实用路径。两边质量接近，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-G09': {
    skeleton: [
      '先确认两个分支条件：离日前是否办过海外转出届，以及在留卡是否仍有效。',
      '标准情况是带在留卡和住址证明，在 14 天内到役所办理转入。',
      '若未转出、在留卡过期或在留资格变化，不要自判，应先找行政书士确认在留状态。',
    ],
    reasoning: 'TEBIQ 先问关键分支，再进入流程，这比直接给标准手续更符合风险管理。它把非标准情况提前拦住，避免用户在在留状态未清楚时贸然登记，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-G10': {
    skeleton: [
      '先确认不一致字段：地址、姓名生日、还是在留资格。',
      '地址不一致通常先在役所修正；姓名生日多为役所录入问题，带护照和在留卡处理；在留资格不一致可能需要入管参与。',
      '已有届出迟延可能影响未来更新或永住，必要时找行政书士评估。',
    ],
    reasoning: 'TEBIQ 有风险提醒，但修正步骤不够具体。DeepSeek 对各类不一致的处理流程更可操作。TEBIQ 没有明显事实错误，但偏警示、少动作，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-H01': {
    skeleton: [
      '先承认问题有歧义，最可能是在问脱退一时金申请期限，即离开日本并丧失住所后 2 年内。',
      '也可能是在问厚生年金加入年龄或每月缴纳周期，应先追问。',
      '不要在没有证据时默认解释成永住审查材料窗口。',
    ],
    reasoning: 'TEBIQ 直接把问题投射到永住用厚生年金记录窗口，但用户自然更可能是在问脱退一时金期限。DeepSeek 处理了歧义，而 TEBIQ 答非所问风险高，因此 AQL 判断为倒退。',
  },
  'eval-lab-v1-H02': {
    skeleton: [
      '永住受影响最大：通常需要提交近年缴纳记录，长期稳定缴纳也会被看。',
      '迟缴或未缴不能简单靠事后补缴抹掉。',
      '工作签更新影响相对间接，但被查到仍可能成为负面因素；先用ねんきんネット确认正式记录，并区分厚生年金和国民年金。',
    ],
    reasoning: '两边都抓住了年金未缴对永住影响最大、对工作签更新较间接。TEBIQ 对永住窗口更精确，但答案略有截断；DeepSeek 覆盖签证类型更广。综合判断为持平。',
  },
  'eval-lab-v1-H03': {
    skeleton: [
      '先确认签证类型和目标是更新还是永住。',
      '永住通常要看近 3 年住民税记录，迟缴即使补上也可能留痕。',
      '工作签更新影响没那么形式化，但未缴记录被审查时仍可能不利；先到区役所确认年份和金额，再找行政书士评估。',
    ],
    reasoning: 'TEBIQ 把永住和普通更新分开判断，并要求确认年份、签证和到期时间，这种风险分流更贴近用户真实决策。AQL 判断为严格加分。',
  },
  'eval-lab-v1-H04': {
    skeleton: [
      '先说明公司未入社保不仅是劳动问题，也可能成为在留更新或永住的负面信号。',
      '用邮件或书面方式向公司确认未加入事实，并保留记录。',
      '公司拒绝时联系年金事务所或劳动基准监督署；必要时个人加入国保和国民年金，并在下次更新时主动解释。',
    ],
    reasoning: 'TEBIQ 把社保问题连接到在留审查，这是 DeepSeek 较弱的部分。虽然 DeepSeek 的维权流程更细，但 TEBIQ 的在留风险框架和更新前准备建议更有加分，AQL 判断为严格加分。',
  },
  'eval-lab-v1-H05': {
    skeleton: [
      '健康保险选择包括：14 天内到役所办国保、20 天内办任意继续、或符合条件时加入家属扶养。',
      '带离职票或资格丧失证明等材料。',
      '工作签持有人离职还会触发 14 天入管届出，并需要尽快找到符合在留资格的新工作。',
    ],
    reasoning: 'TEBIQ 抓住了工作签离职后的在留风险和 14 天入管报告义务，这是 DeepSeek 没有充分提示的关键点。虽然漏了家属扶养选项，但在留风险提醒更重要，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-H06': {
    skeleton: [
      '脱退一时金通常要求非日本籍、已丧失日本住所、缴纳 6 个月以上且未领取过日本年金。',
      '应在丧失日本住所后 2 年内向日本年金机构邮寄申请。',
      '关键风险：永住者或定住者不可申请；申请会把相关年金记录清零，若未来想永住，不能轻率申请。',
    ],
    reasoning: 'TEBIQ 提醒脱退一时金会清零年金记录，可能破坏永住所需的连续缴纳历史，这是用户很可能没意识到的不可逆风险。虽然 DeepSeek 程序细节更多，但 TEBIQ 的高风险提醒构成严格加分。',
  },
  'eval-lab-v1-H07': {
    skeleton: [
      '离日后仍有纳税义务时才需要纳税管理人，例如租金收入、事业收入、未缴住民税或所得税。',
      '离日前先查清并处理未缴税款，不要把问题拖到海外。',
      '同时确认在留期限和再入国方式；若用视同再入国，通常要在 1 年且在留期限内返回。',
    ],
    reasoning: 'TEBIQ 把纳税管理人与离日后的在留有效性风险连接起来，提醒视同再入国和在留期限的限制。这超出单纯税务问题，是用户容易忽略的风险，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-H08': {
    skeleton: [
      '解释机制：确定申告会影响住民税计算；未申告可能导致课税证明异常，进而被入管看到。',
      '自营业或副业收入者通常必须申告；只有单一雇主且年末调整完成时才可能已覆盖。',
      '迟申告可以补救但会留痕；永住申请者应逐年核查记录，并尽快咨询税理士。',
    ],
    reasoning: 'TEBIQ 有追问和迟申告留痕提醒，但没有把“确定申告、住民税计算、课税证明、入管审查”这条因果链讲清楚。DeepSeek 在机制说明上更强，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-H09': {
    skeleton: [
      '先确认补税年份是否落在永住所看的住民税 3 年、年金 2 年窗口内。',
      '区分漏报、少报、是否已经全部缴清；未缴清则先缴清。',
      '取得纳税证明书其三或未纳税额のない证明；若在审查窗口内，考虑推迟申请，并先找行政书士或税理士。',
    ],
    reasoning: 'TEBIQ 给出了申请时机判断：补税年份若落在永住材料窗口内，可能应延后申请。DeepSeek 程序证明名称更细。两边各有优势，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-H10': {
    skeleton: [
      '迟缴和未缴都会留下记录：迟缴是过期后已缴，未缴是持续不履行。',
      '未缴可能收到催告，并进一步发生工资或账户差押；迟缴通常也会产生延滞金。',
      '永住近 3 年审查中两者都不利，但未缴更严重；先取得 3 年住民税记录，再找行政书士评估。',
    ],
    reasoning: 'TEBIQ 用永住视角解释两者差异是有帮助的，但漏了未缴可能进入催告、财产调查、差押的实际法律后果。对正在未缴的人来说，这个即时风险很重要。因此 AQL 判断为持平。',
  },
  'eval-lab-v1-I01': {
    skeleton: [
      '先二分：永久离日，还是可能回来。',
      '不回来时，需要处理在留卡返还或打孔、海外转出届、脱退一时金、公司解散和税务申告。',
      '可能回来时，使用视同再入国或正式再入国许可；经营管理持有人长期不经营会有活动实态风险。',
    ],
    reasoning: 'TEBIQ 的“回不回来”二分很正确，也提醒经营管理的活动实态风险。但 DeepSeek 对公司解散流程更细，如解散登记、清算、税务申告。两边优势不同，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-I02': {
    skeleton: [
      '若同一在留资格还会回来，保留在留卡并按视同再入国等规则离境。',
      '若不回来，在机场交还或被打孔；已在海外且未返还时，可按入管指定方式邮寄返还。',
      '关键风险：在留期限在海外到期后，即使手上还有卡也不能凭卡再入国。',
    ],
    reasoning: 'TEBIQ 覆盖了是否回来的核心分支，并提醒在留期限可能在海外到期。DeepSeek 补充了海外邮寄返还在留卡的具体地址等操作细节。两边各有优势，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-I03': {
    skeleton: [
      '视同再入国通常无需事前申请，在机场办理，期限为 1 年或当前在留期限中较短者。',
      '正式再入国许可要提前在入管申请，最长可到 5 年。',
      '选择取决于在留资格、剩余期限和出国时长；经营管理长期离日会影响未来更新或永住的活动实态判断。',
    ],
    reasoning: 'TEBIQ 既说明两种许可机制，也补充经营管理长期离日的活动实态风险。这是用户比较手续时容易忽略的下游风险，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-I04': {
    skeleton: [
      '一般不建议在更新审查中离开日本。',
      '正常更新期且有有效再入国许可时可能可行，但若海外期间被拒会很麻烦；特例期间离境风险更高。',
      '离日前应通知入管、安排代理收信、保管申请受付票；若已在特例期间，强烈建议不要离境。',
    ],
    reasoning: 'TEBIQ 对特例期间离境风险提示到位，但漏了在日本安排代理接收入管通知这个具体操作。两边各有重点，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-I05': {
    skeleton: [
      '核心风险是在留期限在海外到期，视同再入国随之失效，无法再入境。',
      '若入管要求追加材料而本人不在日本，审查可能停滞或不利；海外期间被不许可会更难补救。',
      '经营管理还会有长期离日导致活动实态不足的风险；离日前确认入管安排代理，临近到期时找行政书士。',
    ],
    reasoning: 'TEBIQ 能识别主要风险，也提出经营管理活动实态问题。但没有充分解释人在海外收到不许可后的补救复杂性。整体与 DeepSeek 各有优势，AQL 判断为持平。',
  },
  'eval-lab-v1-I06': {
    skeleton: [
      '先确认离境时使用的是视同再入国还是正式再入国许可。',
      '视同再入国通常是 1 年硬期限，超过后基本难以恢复；正式再入国许可最长可更久。',
      '即使技术上维持在留资格，长期离日也会影响未来永住的居住实态；家族滞在还要看扶养人的状态变化。',
    ],
    reasoning: 'TEBIQ 补充了两个 DeepSeek 未充分覆盖的长期风险：超过 1 年离日影响永住居住实态，家族滞在受扶养人状态变化影响。这些前瞻风险构成严格加分。',
  },
  'eval-lab-v1-I07': {
    skeleton: [
      '先把问题重心从“以后能否旅游签”拉回“现在是否干净离境”。',
      '旅游签可能性取决于离境是否规范、停留期间有无违规、税金保险公司等义务是否清理。',
      '经营管理若公司或税务没清理，未来入境或在留申请都可能受影响；复杂履历建议找行政书士检查。',
    ],
    reasoning: 'TEBIQ 正确重构了问题：以后旅游签的障碍往往来自现在没有清理干净的离境记录。它还指出经营管理公司未清理的风险，这比泛泛回答能不能旅游签更有价值。',
  },
  'eval-lab-v1-I08': {
    skeleton: [
      '先分短期会回来还是不回日本。',
      '如果会回来，公司无运营会在再入国、更新时形成经营管理活动实态风险。',
      '如果不回来，没人阻止离境，但公司仍有税务申告、法人住民税、社保等法律义务，未来在留申请会受影响。',
    ],
    reasoning: 'TEBIQ 的二分框架和经营管理活动实态提醒是正确的，但公司休眠后的具体税务、社保和责任说明不如 DeepSeek 具体。因此 AQL 判断为持平。',
  },
  'eval-lab-v1-I09': {
    skeleton: [
      '役所侧办理海外转出届，住民票除票，同时处理国保精算。',
      '税务侧确认当年确定申告，离日后仍有住民税分期时指定纳税管理人。',
      '重要提醒：即使通过纳税管理人缴住民税，迟缴仍会留痕，未来永住看近 3 年记录；年金侧可在离日后确认脱退一时金。',
    ],
    reasoning: 'TEBIQ 把纳税管理人后的住民税迟缴记录与未来永住风险连接起来，这是 DeepSeek 没有充分强调的长期风险。虽然 DeepSeek 操作清单更全，但 TEBIQ 在风险发现上严格加分。',
  },
  'eval-lab-v1-I10': {
    skeleton: [
      '非再入国出境是指不使用再入国手续离开日本，离境时在留资格终止。',
      '常见形式包括在出境卡选择不再入国，或完全不办理再入国手续。',
      '机场可能收走或打孔在留卡；之后若想再来日本，通常要从在留资格认定证明书等流程重新开始。',
    ],
    reasoning: 'TEBIQ 对非再入国的两种形式区分得更清楚，但漏了机场收走或打孔在留卡这个具体场景。对用户预期管理来说这个操作细节重要，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-J01': {
    skeleton: [
      '把问题看作“最近身份或活动发生变化”的风险信号。',
      '先问当前在留资格、在留期限、最近发生了什么变化。',
      '举例：技人国离职有 14 天届出和 3 个月活动问题；毕业无工作可考虑特定活动；配偶者离婚有期限压力。',
    ],
    reasoning: 'TEBIQ 用具体场景和时限说明风险，比单纯程序回答更贴近用户。但 DeepSeek 的自查清单更完整。两边价值接近，因此 AQL 判断为持平。',
  },
  'eval-lab-v1-J02': {
    skeleton: [
      '先看信件标题和截止日期。',
      '常见是补完要求，错过期限可能被视为撤回；也可能是许可或不许可结果通知。',
      '必须补充最严重类型：意见陈述或听闻通知可能是取消在留资格前置程序，应立即找行政书士。',
    ],
    reasoning: 'TEBIQ 能识别补完要求并提醒紧急性，但漏了意见陈述、听闻这类最危险的入管通知。对风险检测产品来说，这是重要缺口，因此 AQL 判断为持平而非加分。',
  },
  'eval-lab-v1-J03': {
    skeleton: [
      '核心规则：即使材料不齐，也要在期限前先提交申请；逾期提交可能变成不法滞在。',
      '带现有材料去窗口并说明缺失，入管可能发补正通知，让你后续补材料。',
      '特例期间的前提是期限内已提交申请；只剩几天时今天就去入管窗口。',
    ],
    reasoning: '这是紧急场景，TEBIQ 最大问题是没有把“材料不齐也必须先提交、之后补正”讲清楚。DeepSeek 对窗口操作和补正通知更具体。这个缺口会导致用户错过期限，因此 AQL 判断为倒退。',
  },
  'eval-lab-v1-J04': {
    skeleton: [
      '所有相关情况都先看 14 天入管届出义务。',
      '技人国被解雇后在留到期日前仍有效，但 3 个月无活动规则适用；应立即去 Hello Work 办失业保险。',
      '经营管理若失去经营管理职位，在留基础可能立即动摇，不应等 3 个月才处理；新工作也要确认与在留资格匹配。',
    ],
    reasoning: 'TEBIQ 加分点是区分经营管理和技人国：经营管理失去管理角色可能立即影响在留基础。但它漏了 Hello Work 失业保险这个对技人国很实用的动作。综合为持平。',
  },
  'eval-lab-v1-J05': {
    skeleton: [
      '14 天离婚届出已经错过，现在处于未履行状态，应尽快补交并解释迟延。',
      '配偶者身份基础已经消失；6 个月无活动规则可能导致在留资格取消。',
      '关键是：补交届出不等于保住签证，还必须考虑改成定住者或其他合适在留资格。',
    ],
    reasoning: 'TEBIQ 最有价值的是把“届出”和“变更在留资格”分开。届出只是合规动作，真正保命的是改到可行身份。这个框架比一般回答更直接，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-J06': {
    skeleton: [
      '空壳公司会显著影响经营管理更新，核心是实际持续经营，而不是公司登记还在。',
      '证据缺口包括无营业额、办公室空置、无交易等。',
      '结合 2025 年 10 月经营管理改正和过渡措施，既要看新标准，也要看运营轨迹；准备具体改善计划和证据，完全休眠时找行政书士。',
    ],
    reasoning: 'TEBIQ 结合了 2025 年 10 月改正和过渡措施，并提醒现有经营管理持有人仍会被综合评估经营轨迹。这是 DeepSeek 没有覆盖的当前政策背景，因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-J07': {
    skeleton: [
      '第一步不是问怎么开店，而是先确认现在的兼职是否已经构成资格外活动。',
      '技人国持有人做厨房、地面服务等体力劳动，很可能已经违规，必须先处理。',
      '开店通常要变更到经营管理，并准备独立场所、事业计划、相当投资规模；不同身份如留学、家族滞在另有资格外活动限制。',
    ],
    reasoning: 'TEBIQ 把用户可能已经处于资格外活动违规这一点提前指出，这是最重要的风险。DeepSeek 直接进入经营管理申请流程，漏了申请前的合规污染问题。因此 AQL 判断为严格加分。',
  },
  'eval-lab-v1-J08': {
    skeleton: [
      '先确认当前在留资格和实际工作内容。',
      '留学或家族滞在可能通过资格外活动许可和 28 小时限制处理；技人国做范围外工作则可能需要换工作或变更在留资格。',
      '特定技能等还有不同规则；解决期间应停止不合规工作，并带完整雇佣历史找行政书士。',
    ],
    reasoning: 'TEBIQ 正确识别资格外活动风险并建议停止和找行政书士，但没有像 DeepSeek 一样按在留资格分支说明解决路径。用户会不清楚自己是小修补还是大变更。因此 AQL 判断为持平。',
  },
  'eval-lab-v1-J09': {
    skeleton: [
      '先分清税种和严重程度：住民税、年金健保、所得税；滞纳、未纳、免除或猶予。',
      '仍有未纳时先全部清掉，并取得课税证明、纳税证明、ねんきんネット等官方记录。',
      '即使补清，迟缴痕迹仍在；可考虑积累 1 到 2 年干净记录后再申请，并让行政书士评估。',
    ],
    reasoning: 'TEBIQ 加分点是明确住民税 3 年、年金 2 年等审查窗口，并要求拿正式证明而不是凭记忆判断。但 DeepSeek 补充了补清后仍建议等一段干净记录。综合为持平。',
  },
  'eval-lab-v1-J10': {
    skeleton: [
      '用清单检查：在留卡有效性和地址、住民登记、入管报告、国保年金、税金、实际活动是否符合在留资格。',
      '工作变更、学校变更、离婚等通常触发 14 天届出。',
      '如果曾发生事件，应按年份列出从入境到现在的履历，逐一判断哪些触发报告义务。',
    ],
    reasoning: 'TEBIQ 的按年度回顾事件方法正确，但 DeepSeek 的类别清单对普通用户更可操作，且补了住民税记录检查。TEBIQ 概念好但覆盖不够完整，因此 AQL 判断为持平。',
  },
}

const REPAIR_OWNERS: EvalRepairOwner[] = [
  'ENGINE',
  'FACT',
  'DOMAIN',
  'UX',
  'PRODUCT',
  'GENERATION',
  'IGNORE',
  'UNKNOWN',
]

const REPAIR_OWNER_LABELS: Record<EvalRepairOwner, string> = {
  ENGINE: 'ENGINE 工程/链路',
  FACT: 'FACT 事实卡',
  DOMAIN: 'DOMAIN 专业判断',
  UX: 'UX/答案结构',
  PRODUCT: 'PRODUCT 目标/场景',
  GENERATION: 'GENERATION 生成补齐',
  IGNORE: 'IGNORE 暂不处理',
  UNKNOWN: 'UNKNOWN 不确定',
}

function asRepairOwner(v: unknown): RepairOwner {
  return typeof v === 'string' && REPAIR_OWNERS.includes(v as EvalRepairOwner)
    ? (v as EvalRepairOwner)
    : ''
}

function asVsDeepseekJudgment(v: unknown): VsDeepseekJudgment {
  return typeof v === 'string' && VS_DEEPSEEK_OPTIONS.includes(v as Exclude<VsDeepseekJudgment, ''>)
    ? (v as Exclude<VsDeepseekJudgment, ''>)
    : ''
}

function asAqlApplyMetadata(v: unknown): AqlApplyMetadata | null {
  if (!v || typeof v !== 'object') return null
  const obj = v as Record<string, unknown>
  const appliedAt = typeof obj.applied_at === 'string' ? obj.applied_at : ''
  const caseId = typeof obj.case_id === 'string' ? obj.case_id : ''
  const judgeModel = typeof obj.judge_model === 'string' ? obj.judge_model : ''
  if (!appliedAt || !caseId) return null
  return {
    applied_at: appliedAt,
    case_id: caseId,
    judge_model: judgeModel,
    score: typeof obj.score === 'number' ? obj.score : null,
    vs_deepseek_judgment: asVsDeepseekJudgment(obj.vs_deepseek_judgment),
    defect_flags: Array.isArray(obj.defect_flags)
      ? obj.defect_flags.filter((flag): flag is string => typeof flag === 'string')
      : [],
  }
}

function isAnnotationComplete(a: AnnotationRow | undefined | null): boolean {
  return !!a && a.score != null && asVsDeepseekJudgment(a.annotation_json?.vs_deepseek_judgment) !== ''
}

function splitSkeleton(text: string): string[] {
  return text
    .split(/\s+\|\s+|\n+/)
    .map(line => line.trim())
    .filter(Boolean)
}

function localizeInlineCodes(text: string): string {
  let out = text
  for (const [code, label] of Object.entries(INLINE_CODE_LABELS)) {
    out = out.replaceAll(code, label)
  }
  return out
}

function localizeDefectFlag(flag: string): string {
  return DEFECT_FLAG_LABELS[flag] ?? flag
}

function localizeActiveLearningReason(reason: string): string {
  return ACTIVE_LEARNING_REASON_LABELS[reason] ?? localizeInlineCodes(reason)
}

function judgementToProposal(row: JudgementRow | undefined): AnswerQualityProposal | null {
  if (!row) return null
  const confidence = Number(row.confidence)
  const override = AQL_TEXT_CN_OVERRIDES[row.case_id]
  const rawFlags = Array.isArray(row.defect_flags) ? row.defect_flags : []
  return {
    caseId: row.case_id,
    score: row.score,
    scoreNormalized: row.score_normalized,
    vsDeepseekJudgment: asVsDeepseekJudgment(row.vs_deepseek_judgment),
    flags: rawFlags.map(localizeDefectFlag),
    rawFlags,
    skeleton: override?.skeleton ?? splitSkeleton(row.ideal_answer_skeleton).map(localizeInlineCodes),
    red: row.active_learning_red,
    activeLearningReasons: Array.isArray(row.active_learning_reasons)
      ? row.active_learning_reasons.map(localizeActiveLearningReason)
      : [],
    confidence: Number.isFinite(confidence) ? confidence : null,
    reasoning: override?.reasoning ?? localizeInlineCodes(row.reasoning),
    judgeModel: row.judge_model,
  }
}

interface DraftMap {
  [questionId: string]: EditableAnnotation
}

function loadDrafts(): DraftMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as DraftMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}
function saveDraft(id: string, edit: EditableAnnotation): void {
  if (typeof window === 'undefined') return
  try {
    const drafts = loadDrafts()
    drafts[id] = edit
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
  } catch {
    /* quota / private mode — silent */
  }
}
function clearDraft(id: string): void {
  if (typeof window === 'undefined') return
  try {
    const drafts = loadDrafts()
    delete drafts[id]
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts))
  } catch {
    /* silent */
  }
}

// ---------- batch concurrency cap (Issue #14: ≤ 3) ----------

const BATCH_CONCURRENCY = 3

export default function EvalLabClient() {
  const [questions, setQuestions] = useState<QuestionRow[]>([])
  const [answersByQuestion, setAnswersByQuestion] = useState<AnswerSlotsByQuestion>({})
  const [annotationByQuestion, setAnnotationByQuestion] = useState<Record<string, AnnotationRow>>({})
  const [judgementByQuestion, setJudgementByQuestion] = useState<Record<string, JudgementRow>>({})
  const [edits, setEdits] = useState<Record<string, EditableAnnotation>>({})
  const [saveState, setSaveState] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({})
  const [genStatus, setGenStatus] = useState<Record<string, QuestionGenStatus>>({})
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null)
  const [skipAnnotatedOnBatch, setSkipAnnotatedOnBatch] = useState(true)

  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterMode>('ready')
  const [scenarioFilter, setScenarioFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all')
  const [batchBusy, setBatchBusy] = useState(false)
  const [seedBusy, setSeedBusy] = useState(false)
  const [liveImportBusy, setLiveImportBusy] = useState(false)
  const [importText, setImportText] = useState('')
  const [headerMessage, setHeaderMessage] = useState<string | null>(null)

  const reviewer = 'default'
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const cancelBatchRef = useRef(false)

  // ---- helpers ----
  const updateGenStatus = useCallback(
    (qid: string, patch: Partial<QuestionGenStatus>) => {
      setGenStatus(prev => {
        const cur = prev[qid] ?? EMPTY_GEN_STATUS
        return { ...prev, [qid]: { ...cur, ...patch } }
      })
    },
    [],
  )

  // ---- initial load ----
  const loadAll = useCallback(async () => {
    try {
      const r = await fetch(`/api/internal/eval-lab/state?reviewer=${encodeURIComponent(reviewer)}`, {
        cache: 'no-store',
      })
      if (!r.ok) {
        setLoadError(`HTTP ${r.status}`)
        return
      }
      const j = (await r.json()) as {
        ok: boolean
        questions: QuestionRow[]
        answers: AnswerRow[]
        annotations: AnnotationRow[]
        judgements?: JudgementRow[]
        error?: string
      }
      if (!j.ok) {
        setLoadError(j.error ?? 'unknown')
        return
      }
      setQuestions(j.questions)
      const ans: AnswerSlotsByQuestion = {}
      for (const a of j.answers) {
        const slot = ans[a.question_id] ?? {}
        slot[a.answer_type] = a
        ans[a.question_id] = slot
      }
      setAnswersByQuestion(ans)
      const annMap: Record<string, AnnotationRow> = {}
      for (const a of j.annotations) annMap[a.question_id] = a
      setAnnotationByQuestion(annMap)
      const judgeMap: Record<string, JudgementRow> = {}
      for (const judge of j.judgements ?? []) judgeMap[judge.question_id] = judge
      setJudgementByQuestion(judgeMap)
      // Hydrate edits from server, then overlay any unsynced drafts.
      const drafts = loadDrafts()
      const initialEdits: Record<string, EditableAnnotation> = {}
      for (const q of j.questions) {
        const proposal = judgementToProposal(judgeMap[q.id])
        const serverEdit = localizeLegacyAqlEdit(annotationToEdit(annMap[q.id] ?? null), proposal)
        initialEdits[q.id] = drafts[q.id] ?? serverEdit
      }
      setEdits(initialEdits)
      // Hydrate genStatus from existing answer rows. Never demote a row
      // that's currently 'running' on the client (request still in flight).
      setGenStatus(prev => {
        const fresh = hydrateGenStatus(j.questions, ans)
        const merged: Record<string, QuestionGenStatus> = {}
        for (const q of j.questions) {
          const old = prev[q.id]
          const next = fresh[q.id]
          merged[q.id] = {
            deepseek: old?.deepseek === 'running' ? 'running' : next.deepseek,
            deepseekError: next.deepseekError,
            deepseekAttempts: next.deepseekAttempts,
            tebiq: old?.tebiq === 'running' ? 'running' : next.tebiq,
            tebiqError: next.tebiqError,
            tebiqAttempts: next.tebiqAttempts,
          }
        }
        return merged
      })
      setLoaded(true)
      setLoadError(null)
      if (j.questions.length > 0 && !selectedId) {
        const firstReady = j.questions.find(q => {
          const answer = ans[q.id]
          const ann = annMap[q.id]
          return isReviewableCase(answer, q) && !isAnnotationComplete(ann)
        })
        setSelectedId(firstReady?.id ?? j.questions[0].id)
      }
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err))
      setLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  // ---- derived ----
  const scenarios = useMemo(() => {
    const set = new Set<string>()
    for (const q of questions) if (q.scenario) set.add(q.scenario)
    return Array.from(set).sort()
  }, [questions])

  const proposalByQuestion = useMemo(() => {
    const out: Record<string, AnswerQualityProposal> = {}
    for (const q of questions) {
      const proposal = judgementToProposal(judgementByQuestion[q.id])
      if (proposal) out[q.id] = proposal
    }
    return out
  }, [questions, judgementByQuestion])

  const filtered = useMemo(
    () =>
      filterQuestions(
        questions,
        answersByQuestion,
        annotationByQuestion,
        genStatus,
        proposalByQuestion,
        filter,
        scenarioFilter,
        sourceFilter,
      ),
    [questions, answersByQuestion, annotationByQuestion, genStatus, proposalByQuestion, filter, scenarioFilter, sourceFilter],
  )
  const selected = questions.find(q => q.id === selectedId) ?? null
  const selectedAnswers = selectedId ? answersByQuestion[selectedId] : undefined
  const selectedHasBaseline = !!selectedAnswers?.deepseek_raw?.answer_text
  const selectedBaselineMissing = !!selected && isLiveConsultationQuestion(selected) && !selectedHasBaseline
  const selectedRequiresVsDeepseek = !selected || !isLiveConsultationQuestion(selected) || selectedHasBaseline
  const selectedEdit = selectedId ? edits[selectedId] ?? EMPTY_EDIT : EMPTY_EDIT
  const selectedStatus = selectedId ? genStatus[selectedId] ?? EMPTY_GEN_STATUS : EMPTY_GEN_STATUS
  const selectedProposal = selectedId ? proposalByQuestion[selectedId] ?? null : null

  const counts = useMemo(() => {
    const total = questions.length
    let annotated = 0
    let complete = 0
    let ready = 0
    let aiRed = 0
    let p0 = 0
    let p1 = 0
    let golden = 0
    let ungen = 0
    let failed = 0
    let running = 0
    for (const q of questions) {
      const a = annotationByQuestion[q.id]
      if (isAnnotationComplete(a)) annotated += 1
      if (a?.severity === 'P0') p0 += 1
      if (a?.severity === 'P1') p1 += 1
      if (a?.action === 'golden_case') golden += 1
      const s = genStatus[q.id]
      if (s?.deepseek === 'failed' || s?.tebiq === 'failed') failed += 1
      if (s?.deepseek === 'running' || s?.tebiq === 'running') running += 1
      const ans = answersByQuestion[q.id]
      const reviewable = isReviewableCase(ans, q)
      if (reviewable) complete += 1
      else ungen += 1
      if (reviewable && !isAnnotationComplete(a)) ready += 1
      if (proposalByQuestion[q.id]?.red) aiRed += 1
    }
    const successRate = total === 0 ? 0 : Math.round((complete / total) * 100)
    return { total, annotated, complete, successRate, ready, aiRed, p0, p1, golden, ungen, failed, running }
  }, [questions, annotationByQuestion, answersByQuestion, genStatus, proposalByQuestion])

  // ---- annotation auto-save (unchanged behaviour) ----
  const persistAnnotation = useCallback(
    async (questionId: string, edit: EditableAnnotation) => {
      setSaveState(prev => ({ ...prev, [questionId]: 'saving' }))
      try {
        const existingJson = annotationByQuestion[questionId]?.annotation_json ?? {}
        const r = await fetch('/api/internal/eval-lab/annotation', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            question_id: questionId,
            reviewer,
            score: edit.score,
            severity: edit.severity || null,
            launchable: edit.launchable || null,
            direction_correct: edit.direction_correct || null,
            answered_question: edit.answered_question || null,
            dangerous_claim: edit.dangerous_claim || null,
            hallucination: edit.hallucination || null,
            should_handoff: edit.should_handoff || null,
            must_have: edit.must_have || null,
            must_not_have: edit.must_not_have || null,
            missing_points: edit.missing_points || null,
            reviewer_note: edit.reviewer_note || null,
            action: edit.action || null,
            annotation_json: {
              ...existingJson,
              repair_owner: edit.repair_owner || null,
              vs_deepseek_judgment: edit.vs_deepseek_judgment || null,
              aql_apply: edit.aql_apply,
            },
          }),
        })
        const j = (await r.json()) as { ok?: boolean; annotation?: AnnotationRow; error?: string }
        if (j.ok && j.annotation) {
          setAnnotationByQuestion(prev => ({ ...prev, [questionId]: j.annotation! }))
          setSaveState(prev => ({ ...prev, [questionId]: 'saved' }))
          clearDraft(questionId)
          setTimeout(() => {
            setSaveState(prev => {
              if (prev[questionId] !== 'saved') return prev
              const next = { ...prev }
              delete next[questionId]
              return next
            })
          }, 1500)
        } else {
          setSaveState(prev => ({ ...prev, [questionId]: 'error' }))
        }
      } catch {
        setSaveState(prev => ({ ...prev, [questionId]: 'error' }))
      }
    },
    [annotationByQuestion, reviewer],
  )

  const onAnnotate = useCallback(
    (questionId: string, patch: Partial<EditableAnnotation>) => {
      setEdits(prev => {
        const next = { ...(prev[questionId] ?? EMPTY_EDIT), ...patch }
        saveDraft(questionId, next)
        const merged = { ...prev, [questionId]: next }
        const existing = debounceTimers.current[questionId]
        if (existing) clearTimeout(existing)
        debounceTimers.current[questionId] = setTimeout(() => {
          persistAnnotation(questionId, next)
        }, 500)
        return merged
      })
    },
    [persistAnnotation],
  )

  const applyProposal = useCallback(
    (questionId: string, proposal: AnswerQualityProposal) => {
      onAnnotate(questionId, {
        score: proposal.score,
        vs_deepseek_judgment: proposal.vsDeepseekJudgment,
        missing_points: buildAqlMissingPoints(proposal),
        aql_apply: {
          applied_at: new Date().toISOString(),
          case_id: proposal.caseId,
          judge_model: proposal.judgeModel,
          score: proposal.score,
          vs_deepseek_judgment: proposal.vsDeepseekJudgment,
          defect_flags: proposal.rawFlags,
        },
      })
    },
    [onAnnotate],
  )

  // ---- generation (per-question) ----

  /**
   * Single-question DeepSeek generation. Returns true on success, false on
   * failure. Status updates flow through `genStatus`. The route persists
   * the result to eval_answers; we then refresh that row from the server
   * so all derived UI (filters, counts, AnswerColumn) stays in sync.
   */
  const generateDeepseek = useCallback(
    async (q: QuestionRow): Promise<boolean> => {
      updateGenStatus(q.id, {
        deepseek: 'running',
        deepseekError: null,
        deepseekAttempts: null,
      })
      try {
        const r = await fetch('/api/internal/eval-lab/deepseek-raw', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: q.question_text, question_id: q.id }),
        })
        const j = (await r.json()) as {
          ok?: boolean
          text?: string
          error?: string
          attempts?: number
        }
        if (j.ok && j.text) {
          updateGenStatus(q.id, {
            deepseek: 'success',
            deepseekError: null,
            deepseekAttempts: j.attempts ?? null,
          })
          return true
        }
        updateGenStatus(q.id, {
          deepseek: 'failed',
          deepseekError: j.error ?? `HTTP ${r.status}`,
          deepseekAttempts: j.attempts ?? null,
        })
        return false
      } catch (err) {
        updateGenStatus(q.id, {
          deepseek: 'failed',
          deepseekError: err instanceof Error ? err.message : String(err),
          deepseekAttempts: null,
        })
        return false
      }
    },
    [updateGenStatus],
  )

  const generateTebiq = useCallback(
    async (q: QuestionRow): Promise<boolean> => {
      updateGenStatus(q.id, {
        tebiq: 'running',
        tebiqError: null,
        tebiqAttempts: null,
      })
      try {
        const r = await fetch('/api/internal/eval-lab/tebiq-answer', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ question: q.question_text, question_id: q.id }),
        })
        const j = (await r.json()) as { ok?: boolean; error?: string; attempts?: number; fallback_reason?: string | null; engine_version?: string | null }
        if (j.ok && !j.fallback_reason && j.engine_version !== 'answer-core-v1.1-fallback') {
          updateGenStatus(q.id, {
            tebiq: 'success',
            tebiqError: null,
            tebiqAttempts: j.attempts ?? null,
          })
          return true
        }
        updateGenStatus(q.id, {
          tebiq: 'failed',
          tebiqError: j.error ?? j.fallback_reason ?? `HTTP ${r.status}`,
          tebiqAttempts: j.attempts ?? null,
        })
        return false
      } catch (err) {
        updateGenStatus(q.id, {
          tebiq: 'failed',
          tebiqError: err instanceof Error ? err.message : String(err),
          tebiqAttempts: null,
        })
        return false
      }
    },
    [updateGenStatus],
  )

  /** Refresh the answers slice of state from the server. Used after a batch
   *  finishes so the persisted answer rows hydrate into UI. */
  const refreshAnswers = useCallback(async () => {
    try {
      const r = await fetch(`/api/internal/eval-lab/state?reviewer=${encodeURIComponent(reviewer)}`, {
        cache: 'no-store',
      })
      if (!r.ok) return
      const j = (await r.json()) as { ok: boolean; answers: AnswerRow[] }
      if (!j.ok) return
      const ans: AnswerSlotsByQuestion = {}
      for (const a of j.answers) {
        const slot = ans[a.question_id] ?? {}
        slot[a.answer_type] = a
        ans[a.question_id] = slot
      }
      setAnswersByQuestion(ans)
    } catch {
      /* ignore */
    }
  }, [reviewer])

  // ---- batch (Issue #14: ≤ 3 concurrent, failed-rerun, skip-annotated) ----

  type BatchScope = 'missing' | 'failed-only'

  /**
   * Decide whether `kind` should be (re)generated for `q` given the scope.
   * - 'missing':  generate when status is pending OR (failed if you ran the
   *               batch button — so failed gets retried at batch-time).
   *               Don't touch already-success rows.
   * - 'failed-only': generate only when status === 'failed'.
   *
   * In addition, when `skipAnnotatedOnBatch` is true and the question is
   * already annotated (score set), skip it entirely. Annotation rows are
   * not touched here regardless — they live in eval_annotations.
   */
  const shouldGenerate = useCallback(
    (qid: string, kind: 'deepseek' | 'tebiq', scope: BatchScope, skipAnnotated: boolean): boolean => {
      if (skipAnnotated) {
        const ann = annotationByQuestion[qid]
        if (isAnnotationComplete(ann)) return false
      }
      const s = genStatus[qid] ?? EMPTY_GEN_STATUS
      const slot = kind === 'deepseek' ? s.deepseek : s.tebiq
      if (slot === 'running') return false
      if (scope === 'failed-only') return slot === 'failed'
      // missing scope: generate unless already success
      return slot !== 'success'
    },
    [annotationByQuestion, genStatus],
  )

  const runBatch = useCallback(
    async (scope: BatchScope) => {
      if (batchBusy) return
      cancelBatchRef.current = false
      setBatchBusy(true)

      // Build the task list under current state. Two tasks per question
      // (one per kind) so concurrency cap applies across BOTH endpoints
      // — the cap protects DeepSeek and the TEBIQ pipeline equally.
      type Task = { q: QuestionRow; kind: 'deepseek' | 'tebiq' }
      const tasks: Task[] = []
      const skipAnn = skipAnnotatedOnBatch
      for (const q of questions) {
        if (shouldGenerate(q.id, 'deepseek', scope, skipAnn)) tasks.push({ q, kind: 'deepseek' })
        if (shouldGenerate(q.id, 'tebiq', scope, skipAnn)) tasks.push({ q, kind: 'tebiq' })
      }
      if (tasks.length === 0) {
        setBatchBusy(false)
        setHeaderMessage(scope === 'failed-only' ? '没有失败题需要重跑' : '没有需要生成的题')
        return
      }

      // Mark all queued tasks as 'pending' so the UI shows the queue depth.
      setGenStatus(prev => {
        const next = { ...prev }
        for (const t of tasks) {
          const cur = next[t.q.id] ?? EMPTY_GEN_STATUS
          if (t.kind === 'deepseek' && cur.deepseek !== 'running') {
            next[t.q.id] = { ...cur, deepseek: 'pending', deepseekError: null }
          }
          if (t.kind === 'tebiq' && cur.tebiq !== 'running') {
            next[t.q.id] = { ...cur, tebiq: 'pending', tebiqError: null }
          }
        }
        return next
      })

      const limit = pLimit(BATCH_CONCURRENCY)
      let done = 0
      setBatchProgress({ done: 0, total: tasks.length })

      const promises = tasks.map(t =>
        limit(async () => {
          if (cancelBatchRef.current) return
          if (t.kind === 'deepseek') await generateDeepseek(t.q)
          else await generateTebiq(t.q)
          done += 1
          setBatchProgress({ done, total: tasks.length })
        }),
      )
      try {
        await Promise.all(promises)
      } finally {
        setBatchBusy(false)
        setBatchProgress(null)
        await refreshAnswers()
      }
    },
    [batchBusy, questions, shouldGenerate, skipAnnotatedOnBatch, generateDeepseek, generateTebiq, refreshAnswers],
  )

  const cancelBatch = useCallback(() => {
    cancelBatchRef.current = true
  }, [])

  // ---- single-question rerun for the failed-only flow ----
  const rerunFailed = useCallback(
    async (q: QuestionRow) => {
      const s = genStatus[q.id] ?? EMPTY_GEN_STATUS
      const tasks: Promise<unknown>[] = []
      if (s.deepseek === 'failed') tasks.push(generateDeepseek(q))
      if (s.tebiq === 'failed') tasks.push(generateTebiq(q))
      if (tasks.length === 0) return
      await Promise.all(tasks)
      await refreshAnswers()
    },
    [genStatus, generateDeepseek, generateTebiq, refreshAnswers],
  )

  // ---- seed / import ----
  const onSeed = async () => {
    setSeedBusy(true)
    try {
      const r = await fetch('/api/internal/eval-lab/seed', { method: 'POST' })
      const j = (await r.json()) as { ok?: boolean; inserted?: number; skipped?: number; error?: string }
      if (j.ok) {
        setHeaderMessage(`Seed 完成：新增 ${j.inserted ?? 0}，跳过 ${j.skipped ?? 0}`)
        await loadAll()
      } else {
        setHeaderMessage(`Seed 失败: ${j.error ?? `HTTP ${r.status}`}`)
      }
    } finally {
      setSeedBusy(false)
    }
  }

  const onImport = async () => {
    const trimmed = importText.trim()
    if (!trimmed) return
    let body: unknown = null
    try {
      const parsed = JSON.parse(trimmed) as unknown
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const obj = parsed as { items?: unknown; questions?: unknown }
        if (Array.isArray(obj.items) || Array.isArray(obj.questions)) {
          body = obj
        }
      }
    } catch {
      /* fall through */
    }
    if (!body) {
      const lines = trimmed.split(/\r?\n/).map(s => s.trim()).filter(Boolean)
      if (lines.length === 0) return
      body = { questions: lines }
    }
    const r = await fetch('/api/internal/eval-lab/import', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const j = (await r.json()) as { ok?: boolean; inserted?: number; received?: number; error?: string }
    if (j.ok) {
      setHeaderMessage(`导入完成：新增 ${j.inserted ?? 0} / ${j.received ?? 0}`)
      setImportText('')
      await loadAll()
    } else {
      setHeaderMessage(`导入失败: ${j.error ?? `HTTP ${r.status}`}`)
    }
  }

  const onImportLive = async () => {
    setLiveImportBusy(true)
    try {
      const r = await fetch('/api/internal/eval-lab/import-live', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ limit: 50 }),
      })
      const j = (await r.json()) as {
        ok?: boolean
        scanned?: number
        eligible?: number
        inserted?: number
        skippedExisting?: number
        answersUpserted?: number
        error?: string
        detail?: string
      }
      if (j.ok) {
        setHeaderMessage(
          `真实咨询导入完成：新增 ${j.inserted ?? 0}，已存在 ${j.skippedExisting ?? 0}，答案 ${j.answersUpserted ?? 0}。可按“真实咨询”场景筛选。`,
        )
        await loadAll()
      } else {
        setHeaderMessage(`真实咨询导入失败: ${j.detail ?? j.error ?? `HTTP ${r.status}`}`)
      }
    } finally {
      setLiveImportBusy(false)
    }
  }

  const goNext = useCallback(() => {
    const idx = filtered.findIndex(q => q.id === selectedId)
    const start = idx >= 0 ? idx + 1 : 0
    for (let i = start; i < filtered.length; i += 1) {
      const a = annotationByQuestion[filtered[i].id]
      if (!isAnnotationComplete(a)) {
        setSelectedId(filtered[i].id)
        return
      }
    }
    for (let i = 0; i < start; i += 1) {
      const a = annotationByQuestion[filtered[i].id]
      if (!isAnnotationComplete(a)) {
        setSelectedId(filtered[i].id)
        return
      }
    }
  }, [filtered, selectedId, annotationByQuestion])

  if (!loaded) {
    return <div className="p-6 text-sm text-slate-500">加载中…</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">TEBIQ 答案质量标注台</h1>
        <div className="text-xs text-slate-500">
          {counts.total} 题 · 生成完整 {counts.complete}/{counts.total} ({counts.successRate}%) ·
          待标 {counts.ready} · AQL 标红 {counts.aiRed} · 已标 {counts.annotated} ·
          P0 {counts.p0} · P1 {counts.p1} ·
          golden {counts.golden} · 未生成 {counts.ungen} · 失败 {counts.failed}
          {counts.running > 0 ? ` · 运行中 ${counts.running}` : ''}
        </div>
        {batchProgress && (
          <span className="text-xs text-slate-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
            批量进度: {batchProgress.done}/{batchProgress.total} · 并发 ≤ {BATCH_CONCURRENCY}
          </span>
        )}
        {loadError && <span className="text-xs text-red-600">载入错误: {loadError}</span>}
        {headerMessage && (
          <span className="text-xs text-slate-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            {headerMessage}
            <button onClick={() => setHeaderMessage(null)} className="ml-2 text-slate-400">×</button>
          </span>
        )}
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label className="text-[11px] text-slate-600 flex items-center gap-1 select-none">
            <input
              type="checkbox"
              checked={skipAnnotatedOnBatch}
              onChange={e => setSkipAnnotatedOnBatch(e.target.checked)}
              className="accent-blue-600"
            />
            批量时跳过已标注题
          </label>
          <button
            onClick={onImportLive}
            disabled={liveImportBusy}
            className="text-xs px-3 py-1.5 border border-emerald-400 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
          >
            {liveImportBusy ? '导入中…' : '导入最近真实咨询'}
          </button>
          {counts.total === 0 && (
            <button
              onClick={onSeed}
              disabled={seedBusy}
              className="text-xs px-3 py-1.5 border border-blue-400 rounded bg-blue-50 hover:bg-blue-100 disabled:opacity-50"
            >
              {seedBusy ? 'Seed 中…' : 'Seed 100 题'}
            </button>
          )}
          {counts.total > 0 && (
            <button
              onClick={onSeed}
              disabled={seedBusy}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
            >
              {seedBusy ? 'Seed 中…' : 'Seed (idempotent)'}
            </button>
          )}
          <button
            onClick={() => runBatch('missing')}
            disabled={batchBusy}
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
          >
            {batchBusy ? '批量生成中…' : `补齐 / 重跑待标数据 (≤ ${BATCH_CONCURRENCY} 并发)`}
          </button>
          <button
            onClick={() => runBatch('failed-only')}
            disabled={batchBusy || counts.failed === 0}
            className="text-xs px-3 py-1.5 border border-orange-300 rounded bg-orange-50 text-orange-700 hover:bg-orange-100 disabled:opacity-50"
          >
            重跑失败 ({counts.failed})
          </button>
          {batchBusy && (
            <button
              onClick={cancelBatch}
              className="text-xs px-3 py-1.5 border border-red-300 rounded bg-white text-red-600 hover:bg-red-50"
            >
              取消
            </button>
          )}
          <a
            href="/api/internal/eval-lab/export?type=full"
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100"
          >
            导出完整 JSON
          </a>
          <a
            href="/api/internal/eval-lab/export?type=golden"
            className="text-xs px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100"
          >
            导出 golden JSON
          </a>
        </div>
      </header>

      <main className="grid grid-cols-12 gap-3 p-3" style={{ minHeight: 'calc(100vh - 56px)' }}>
        {/* Left — question list */}
        <aside
          className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
            <span>筛选</span>
            <select
              value={filter}
              onChange={e => setFilter(e.target.value as FilterMode)}
              className="border border-slate-300 rounded px-1 py-0.5"
            >
              <option value="ready">待标（已生成）</option>
              <option value="all">全部</option>
              <option value="unannotated">未标</option>
              <option value="ai_red">AQL 标红</option>
              <option value="rerun">待重跑</option>
              <option value="ungenerated">未生成</option>
              <option value="failed">失败</option>
              <option value="p0">P0</option>
              <option value="p1">P1</option>
              <option value="launchable_no">不可上线</option>
              <option value="golden">golden_case</option>
            </select>
            {scenarios.length > 0 && (
              <select
                value={scenarioFilter}
                onChange={e => setScenarioFilter(e.target.value)}
                className="border border-slate-300 rounded px-1 py-0.5"
              >
                <option value="all">所有场景</option>
                {scenarios.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
            <div className="flex flex-wrap gap-1">
              {SOURCE_FILTERS.map(source => (
                <button
                  key={source}
                  type="button"
                  onClick={() => setSourceFilter(source)}
                  className={`rounded px-1.5 py-0.5 text-[10px] ${
                    sourceFilter === source
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {SOURCE_FILTER_LABELS[source]}
                </button>
              ))}
            </div>
            <span className="ml-auto text-slate-500">{filtered.length}</span>
          </div>
          <ul className="space-y-1">
            {filtered.map(q => {
              const isSel = q.id === selectedId
              const ann = annotationByQuestion[q.id]
              const proposal = proposalByQuestion[q.id]
              const sev = ann?.severity ?? null
              const sevColor =
                sev === 'P0' ? 'text-red-700 bg-red-50' :
                sev === 'P1' ? 'text-orange-700 bg-orange-50' :
                sev === 'P2' ? 'text-amber-700 bg-amber-50' :
                sev === 'OK' ? 'text-emerald-700 bg-emerald-50' :
                'text-slate-400'
              const s = genStatus[q.id] ?? EMPTY_GEN_STATUS
              return (
                <li key={q.id}>
                  <button
                    onClick={() => setSelectedId(q.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs rounded border ${
                      isSel ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block px-1 rounded ${sevColor}`}
                        style={{ minWidth: 22, textAlign: 'center' }}
                      >
                        {sev || (ann?.score != null ? '·' : ' ')}
                      </span>
                      <SourceChip source={q.source} />
                      <StatusDot kind="D" state={s.deepseek} />
                      <StatusDot kind="T" state={s.tebiq} />
                      <span className="truncate flex-1" title={q.question_text}>
                        {q.question_text}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 ml-[26px]">
                      {q.starter_tag && <span>{q.starter_tag}</span>}
                      {proposal && (
                        <>
                          <span>· AQL {proposal.score ?? '-'}</span>
                          <span className={proposal.red ? 'text-red-600' : 'text-slate-400'}>
                            {proposal.red
                              ? `优先复核${proposal.activeLearningReasons.length > 0 ? ` ${proposal.activeLearningReasons.length}` : ''}`
                              : '正常'}
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder="粘贴新问题（每行一个），或粘贴完整 JSON ({items:[...]})"
              className="w-full h-24 p-2 text-xs border border-slate-300 rounded font-mono"
            />
            <button
              onClick={onImport}
              disabled={!importText.trim()}
              className="mt-1 w-full text-xs px-2 py-1 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
            >
              导入 / 追加
            </button>
          </div>
        </aside>

        {/* Center — comparison */}
        <section
          className="col-span-6 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          {!selected ? (
            <p className="text-sm text-slate-500">从左侧选一题。</p>
          ) : (
            <div className="space-y-3">
              <header>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  {selected.starter_tag ?? selected.source}
                  {selected.scenario ? ` · ${selected.scenario}` : ''}
                </p>
                <h2 className="text-sm font-semibold text-slate-900 leading-tight mt-1">
                  {selected.question_text}
                </h2>
              </header>

              <div className="grid grid-cols-2 gap-3">
                <AnswerColumn
                  label="DeepSeek 裸答"
                  state={selectedStatus.deepseek}
                  liveError={selectedStatus.deepseekError}
                  attempts={selectedStatus.deepseekAttempts}
                  onGenerate={() => generateDeepseek(selected)}
                  row={selectedAnswers?.deepseek_raw}
                  baselineMissing={selectedBaselineMissing}
                />
                <AnswerColumn
                  label="TEBIQ 当前输出"
                  state={selectedStatus.tebiq}
                  liveError={selectedStatus.tebiqError}
                  attempts={selectedStatus.tebiqAttempts}
                  onGenerate={() => generateTebiq(selected)}
                  row={selectedAnswers?.tebiq_current}
                  showMeta
                />
              </div>

              <div className="flex gap-2 text-[11px]">
                {(selectedStatus.deepseek === 'failed' || selectedStatus.tebiq === 'failed') && (
                  <button
                    onClick={() => rerunFailed(selected)}
                    className="px-2 py-1 border border-orange-300 rounded bg-orange-50 text-orange-700 hover:bg-orange-100"
                  >
                    重跑失败
                  </button>
                )}
                <button
                  onClick={goNext}
                  className="ml-auto px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
                >
                  下一题（未标）
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right — annotation form */}
        <aside
          className="col-span-3 bg-white border border-slate-300 rounded p-3 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 76px)' }}
        >
          {!selected ? (
            <p className="text-sm text-slate-500">先选一题。</p>
          ) : (
            <AnnotationForm
              edit={selectedEdit}
              proposal={selectedProposal}
              saveStatus={saveState[selected.id] ?? 'idle'}
              annotation={annotationByQuestion[selected.id] ?? null}
              requiresVsDeepseek={selectedRequiresVsDeepseek}
              onApplyProposal={selectedProposal ? () => applyProposal(selected.id, selectedProposal) : undefined}
              onChange={patch => onAnnotate(selected.id, patch)}
            />
          )}
        </aside>
      </main>
    </div>
  )
}

// ---------- subcomponents ----------

function StatusDot({ kind, state }: { kind: 'D' | 'T'; state: GenState }) {
  const cls =
    state === 'success' ? 'text-emerald-600' :
    state === 'running' ? 'text-blue-600 animate-pulse' :
    state === 'failed' ? 'text-red-600' :
    'text-slate-300'
  const label =
    state === 'success' ? `${kind}✓` :
    state === 'running' ? `${kind}…` :
    state === 'failed' ? `${kind}✗` :
    `${kind}·`
  return (
    <span className={`text-[10px] font-mono ${cls}`} style={{ minWidth: 14, textAlign: 'center' }}>
      {label}
    </span>
  )
}

function SourceChip({ source }: { source: string }) {
  const label =
    source === 'live_consultation' ? 'real' :
    source === 'starter' ? 'golden' :
    source || 'src'
  const cls =
    source === 'live_consultation'
      ? 'bg-emerald-50 text-emerald-700'
      : source === 'starter'
        ? 'bg-slate-100 text-slate-500'
        : 'bg-blue-50 text-blue-700'
  return (
    <span className={`inline-flex shrink-0 rounded px-1 py-0.5 text-[9px] font-medium uppercase ${cls}`}>
      {label}
    </span>
  )
}

function AnswerColumn({
  label,
  state,
  liveError,
  attempts,
  onGenerate,
  row,
  showMeta,
  baselineMissing,
}: {
  label: string
  state: GenState
  liveError: string | null
  attempts: number | null
  onGenerate: () => void
  row?: AnswerRow
  showMeta?: boolean
  baselineMissing?: boolean
}) {
  const has = !!row?.answer_text
  const busy = state === 'running'
  const stateBadge =
    baselineMissing ? <span className="text-[10px] text-slate-400">可跳过</span> :
    state === 'running' ? <span className="text-[10px] text-blue-600">生成中</span> :
    state === 'failed' ? <span className="text-[10px] text-red-600">失败</span> :
    state === 'success' ? <span className="text-[10px] text-emerald-600">已生成</span> :
    <span className="text-[10px] text-slate-400">未生成</span>
  return (
    <div className="border border-slate-200 rounded p-2">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">{label}</span>
        {stateBadge}
        <button
          onClick={onGenerate}
          disabled={busy}
          className="text-[11px] px-2 py-0.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50 ml-auto"
        >
          {busy ? '生成中…' : has ? '重新生成' : '生成'}
        </button>
      </div>
      {liveError && state === 'failed' && (
        <p className="text-[11px] text-red-600">生成错误：{liveError}</p>
      )}
      {baselineMissing && !has && (
        <p className="text-[11px] leading-snug text-slate-500">
          未生成对照答案。真实咨询可以先标 TEBIQ；需要对比时再生成。
        </p>
      )}
      {row?.error && state !== 'success' && (
        <p className="text-[11px] text-red-600">错误：{row.error}</p>
      )}
      {state === 'failed' && !liveError && !row?.error && (
        <p className="text-[11px] text-red-600">错误：旧答案或答案不完整</p>
      )}
      {attempts != null && attempts > 1 && (
        <p className="text-[10px] text-slate-400">尝试次数：{attempts}</p>
      )}
      {showMeta && row?.tebiq_answer_id && (
        <div className="text-[11px] text-slate-600 space-y-0.5 mb-2 border-b border-slate-100 pb-2">
          <p>
            <a
              href={row.tebiq_answer_link ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {row.tebiq_answer_link}
            </a>
          </p>
          <p>
            engine={row.engine_version} · status={row.status} · domain={row.domain}
            {row.fallback_reason ? ` · fallback=${row.fallback_reason}` : ''}
            {row.latency_ms != null ? ` · ${row.latency_ms}ms` : ''}
          </p>
        </div>
      )}
      {showMeta && row?.raw_payload_json && typeof row.raw_payload_json === 'object' && (
        <p className="text-[11px] font-semibold mb-1">
          {(row.raw_payload_json as { title?: string }).title ?? ''}
        </p>
      )}
      <pre className="text-[12px] whitespace-pre-wrap leading-[1.6] text-slate-800">
        {row?.answer_text ? cleanDisplayText(row.answer_text) : '（未生成）'}
      </pre>
    </div>
  )
}

function AnnotationForm({
  edit,
  proposal,
  saveStatus,
  annotation,
  requiresVsDeepseek,
  onApplyProposal,
  onChange,
}: {
  edit: EditableAnnotation
  proposal: AnswerQualityProposal | null
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  annotation: AnnotationRow | null
  requiresVsDeepseek: boolean
  onApplyProposal?: () => void
  onChange: (patch: Partial<EditableAnnotation>) => void
}) {
  const aqlApplyStatus = getAqlApplyStatus(edit, annotation, proposal)
  return (
    <form className="space-y-3 text-xs" onSubmit={e => e.preventDefault()}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">Founder 标注</span>
        <span className="ml-auto text-[10px]">
          {saveStatus === 'saving' && <span className="text-slate-400">保存中…</span>}
          {saveStatus === 'saved' && <span className="text-emerald-600">已保存</span>}
          {saveStatus === 'error' && <span className="text-red-600">保存失败</span>}
        </span>
      </div>

      {proposal && (
        <AiProposalPanel proposal={proposal} onApply={onApplyProposal} />
      )}

      {aqlApplyStatus && (
        <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-2 py-1">
          {aqlApplyStatus}
        </p>
      )}

      <Field label="1. 分数">
        <select
          value={edit.score ?? ''}
          onChange={e =>
            onChange({ score: e.target.value ? Number(e.target.value) : null })
          }
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>
              {n} {scoreLabel(n)}
            </option>
          ))}
        </select>
      </Field>

      <Field label="2. 严重程度">
        <select
          value={edit.severity}
          onChange={e => onChange({ severity: e.target.value as Severity | '' })}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          <option value="OK">OK</option>
          <option value="P2">P2</option>
          <option value="P1">P1</option>
          <option value="P0">P0</option>
        </select>
      </Field>

      <Field label={`3. vs DeepSeek 加分判断${requiresVsDeepseek ? '（必填）' : '（可先跳过）'}`}>
        <select
          value={edit.vs_deepseek_judgment}
          onChange={e => onChange({ vs_deepseek_judgment: e.target.value as VsDeepseekJudgment })}
          className={`w-full border rounded px-2 py-1 ${
            edit.vs_deepseek_judgment || !requiresVsDeepseek ? 'border-slate-300' : 'border-red-300 bg-red-50'
          }`}
        >
          <option value="">{requiresVsDeepseek ? '— 必填 —' : '— 可先跳过 —'}</option>
          {VS_DEEPSEEK_OPTIONS.map(v => (
            <option key={v} value={v}>
              {VS_DEEPSEEK_LABELS[v]}
            </option>
          ))}
        </select>
      </Field>

      <Field label="4. 最大问题 / 缺什么">
        <textarea
          value={edit.missing_points}
          onChange={e => onChange({ missing_points: e.target.value })}
          rows={4}
          className="w-full border border-slate-300 rounded px-2 py-1 font-mono text-xs"
        />
      </Field>

      <Field label="5. 修复路由">
        <select
          value={edit.repair_owner}
          onChange={e => onChange({ repair_owner: e.target.value as RepairOwner })}
          className="w-full border border-slate-300 rounded px-2 py-1"
        >
          <option value="">—</option>
          {REPAIR_OWNERS.map(owner => (
            <option key={owner} value={owner}>
              {REPAIR_OWNER_LABELS[owner]}
            </option>
          ))}
        </select>
      </Field>

      {annotation?.updated_at && (
        <p className="text-[10px] text-slate-400">last saved: {annotation.updated_at}</p>
      )}
    </form>
  )
}

function AiProposalPanel({
  proposal,
  onApply,
}: {
  proposal: AnswerQualityProposal
  onApply?: () => void
}) {
  return (
    <section className={`border rounded p-2 ${proposal.red ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}`}>
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase tracking-wider text-slate-500">AQL 评审（Claude Sonnet）</span>
        <span className={`text-[11px] font-semibold ${proposal.red ? 'text-red-700' : 'text-blue-700'}`}>
          {proposal.score ?? '-'} 分 / {proposal.vsDeepseekJudgment ? VS_DEEPSEEK_LABELS[proposal.vsDeepseekJudgment] : '-'} / 置信度 {proposal.confidence ?? '-'}
        </span>
        <button
          type="button"
          onClick={onApply}
          disabled={!onApply}
          className="ml-auto text-[11px] px-2 py-0.5 border border-slate-300 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
        >
          套用
        </button>
      </div>
      {proposal.activeLearningReasons.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {proposal.activeLearningReasons.map(reason => (
            <span key={reason} className="text-[10px] px-1.5 py-0.5 rounded border border-red-200 bg-white text-red-700">
              {reason}
            </span>
          ))}
        </div>
      )}
      <div className="mt-2 space-y-1">
        {(proposal.flags.length > 0 ? proposal.flags : ['未发现明显缺陷标签']).map(flag => (
          <div key={flag} className="text-[11px] text-slate-700">
            {flag}
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-slate-200 pt-2 space-y-1">
        {proposal.skeleton.map(line => (
          <div key={line} className="text-[11px] text-slate-600 leading-snug">
            {line}
          </div>
        ))}
      </div>
      {proposal.reasoning && (
        <div className="mt-2 border-t border-slate-200 pt-2 text-[11px] text-slate-700 leading-snug">
          {proposal.reasoning}
        </div>
      )}
    </section>
  )
}

function scoreLabel(score: number): string {
  switch (score) {
    case 1:
      return '危险'
    case 2:
      return '差'
    case 3:
      return '可用但弱'
    case 4:
      return '好'
    case 5:
      return '可推荐'
    default:
      return ''
  }
}

function getAqlApplyStatus(
  edit: EditableAnnotation,
  annotation: AnnotationRow | null,
  proposal: AnswerQualityProposal | null,
): string | null {
  const explicit = edit.aql_apply ?? asAqlApplyMetadata(annotation?.annotation_json?.aql_apply)
  if (explicit) {
    const appliedAt = explicit.applied_at ? new Date(explicit.applied_at) : null
    const when = appliedAt && !Number.isNaN(appliedAt.getTime())
      ? appliedAt.toLocaleString('zh-CN', { hour12: false })
      : '已记录时间'
    return `已套用 AQL 评审（${when}）`
  }
  if (!proposal) return null
  if (!isLikelyAqlApplied(edit, proposal)) return null
  return '疑似已套用 AQL 评审（旧版没有记录点击动作，只能根据字段推断）'
}

function buildAqlMissingPoints(proposal: AnswerQualityProposal): string {
  return [
    ...(proposal.flags.length > 0 ? proposal.flags : ['AQL 未标出明显缺陷标签']),
    proposal.reasoning ? `AQL 判断：${proposal.reasoning}` : '',
  ].filter(Boolean).join('\n')
}

function localizeLegacyAqlEdit(
  edit: EditableAnnotation,
  proposal: AnswerQualityProposal | null,
): EditableAnnotation {
  if (!proposal) return edit
  if (edit.aql_apply) return edit
  if (!isLikelyAqlApplied(edit, proposal)) return edit
  return { ...edit, missing_points: buildAqlMissingPoints(proposal) }
}

function isLikelyAqlApplied(edit: EditableAnnotation, proposal: AnswerQualityProposal): boolean {
  if (edit.score !== proposal.score) return false
  if (edit.vs_deepseek_judgment !== proposal.vsDeepseekJudgment) return false
  const text = edit.missing_points
  if (!text) return false
  if (text.includes('AQL 判断') || text.includes('reasoning:')) return true
  return [...proposal.flags, ...proposal.rawFlags].some(flag => flag && text.includes(flag))
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{label}</span>
      {children}
    </label>
  )
}

// ---------- helpers ----------

function filterQuestions(
  qs: QuestionRow[],
  answers: AnswerSlotsByQuestion,
  annotations: Record<string, AnnotationRow>,
  status: Record<string, QuestionGenStatus>,
  proposals: Record<string, AnswerQualityProposal>,
  mode: FilterMode,
  scenario: string,
  source: SourceFilter,
): QuestionRow[] {
  const byScenario = qs.filter(q => scenario === 'all' || q.scenario === scenario)
  const bySource = byScenario.filter(q => matchesSourceFilter(q, source))
  switch (mode) {
    case 'ready':
      return bySource.filter(q => {
        const a = answers[q.id]
        const ann = annotations[q.id]
        return isReviewableCase(a, q) && !isAnnotationComplete(ann)
      })
    case 'unannotated':
      return bySource.filter(q => {
        const a = annotations[q.id]
        return !isAnnotationComplete(a)
      })
    case 'ai_red':
      return bySource.filter(q => proposals[q.id]?.red)
    case 'rerun':
      return bySource.filter(q => {
        const a = answers[q.id]
        return !isReviewableCase(a, q)
      })
    case 'p0':
      return bySource.filter(q => annotations[q.id]?.severity === 'P0')
    case 'p1':
      return bySource.filter(q => annotations[q.id]?.severity === 'P1')
    case 'launchable_no':
      return bySource.filter(q => annotations[q.id]?.launchable === 'no')
    case 'ungenerated':
      return bySource.filter(q => {
        const a = answers[q.id]
        return !isReviewableCase(a, q)
      })
    case 'failed':
      return bySource.filter(q => {
        const s = status[q.id]
        return s?.deepseek === 'failed' || s?.tebiq === 'failed'
      })
    case 'golden':
      return bySource.filter(q => annotations[q.id]?.action === 'golden_case')
    case 'all':
    default:
      return bySource
  }
}

function matchesSourceFilter(q: QuestionRow, source: SourceFilter): boolean {
  if (source === 'all') return true
  if (source === 'other') return q.source !== 'live_consultation' && q.source !== 'starter'
  return q.source === source
}

function cleanDisplayText(text: string): string {
  return text.replace(/\uFFFD+/g, '…')
}
