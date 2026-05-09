import { RISK_MATRIX } from '@/lib/eval-lab/risk-matrix-data'
import { REGRESSION_SET } from '@/lib/eval-lab/sample-classifier'

export type EvalRepairOwner =
  | 'ENGINE'
  | 'FACT'
  | 'DOMAIN'
  | 'UX'
  | 'PRODUCT'
  | 'GENERATION'
  | 'IGNORE'
  | 'UNKNOWN'

export type EvalProposalSeverity = 'OK' | 'P2' | 'P1' | 'P0'

export interface ProposalQuestion {
  question_text: string
  scenario: string | null
  starter_tag: string | null
}

export interface ProposalAnswer {
  answer_text: string | null
  status: string | null
  fallback_reason: string | null
  error: string | null
}

export interface AnswerQualityProposal {
  score: number | null
  severity: EvalProposalSeverity | null
  launchable: 'yes' | 'no' | null
  repairOwner: EvalRepairOwner
  flags: string[]
  skeleton: string[]
  red: boolean
  confidence: 'low' | 'medium'
}

const DANGEROUS_CLAIM_RE = /一定|肯定|保证|绝对|必定|不会有问题|肯定能|肯定可以/
const NEXT_ACTION_RE = /下一步|建议|先|需要|准备|确认|联系|咨询|提交|补|期限|通知|预约/
const RISK_RE = /风险|注意|期限|失效|取消|不许可|拒签|超时|超期|影响|确认|入管|行政書士/
const GENERIC_RE = /具体情况具体分析|因人而异|建议咨询专业人士/

export function buildAnswerQualityProposal(input: {
  question: ProposalQuestion
  tebiq?: ProposalAnswer
  deepseek?: ProposalAnswer
}): AnswerQualityProposal {
  const { question, tebiq, deepseek } = input
  const flags: string[] = []
  const skeleton: string[] = []
  let repairOwner: EvalRepairOwner = 'UNKNOWN'
  let severity: EvalProposalSeverity | null = null
  let score: number | null = null
  let launchable: 'yes' | 'no' | null = null

  const tag = question.starter_tag ?? ''
  const risk = tag ? RISK_MATRIX[tag] : undefined
  const text = tebiq?.answer_text?.trim() ?? ''
  const deepseekText = deepseek?.answer_text?.trim() ?? ''

  if (!text) {
    flags.push(tebiq?.error ? `TEBIQ 生成失败：${tebiq.error}` : 'TEBIQ 还没有生成答案')
    score = null
    severity = 'P1'
    launchable = 'no'
    repairOwner = 'GENERATION'
  } else {
    score = 4
    severity = 'OK'
    launchable = 'yes'

    if (tebiq?.fallback_reason) {
      flags.push(`进入 fallback：${tebiq.fallback_reason}`)
      score = Math.min(score, 2)
      severity = 'P1'
      launchable = 'no'
      repairOwner = 'ENGINE'
    }

    if (tebiq?.status === 'out_of_scope') {
      flags.push(REGRESSION_SET.has(tag) ? '疑似误判为 out_of_scope' : '当前回答为 out_of_scope')
      score = Math.min(score, REGRESSION_SET.has(tag) ? 1 : 2)
      severity = REGRESSION_SET.has(tag) ? 'P0' : 'P1'
      launchable = 'no'
      repairOwner = 'ENGINE'
    }

    if (DANGEROUS_CLAIM_RE.test(text)) {
      flags.push('含“保证/一定”类危险断言')
      score = Math.min(score, 1)
      severity = 'P0'
      launchable = 'no'
      repairOwner = 'DOMAIN'
    }

    if (text.length < 180) {
      flags.push('答案过短，可能没有把条件、风险、下一步讲清楚')
      score = Math.min(score, 2)
      severity = severity === 'P0' ? severity : 'P1'
      launchable = 'no'
      if (repairOwner === 'UNKNOWN') repairOwner = 'ENGINE'
    }

    if (!NEXT_ACTION_RE.test(text)) {
      flags.push('缺少明确下一步行动')
      score = Math.min(score, 3)
      if (severity === 'OK' || severity == null) severity = 'P2'
      if (repairOwner === 'UNKNOWN') repairOwner = 'UX'
    }

    if (risk?.risk_level === 'HIGH' && !RISK_RE.test(text)) {
      flags.push(`DOMAIN 风险矩阵为 HIGH，但答案没有明显风险提示`)
      score = Math.min(score, 2)
      severity = severity === 'P0' ? severity : 'P1'
      launchable = 'no'
      if (repairOwner === 'UNKNOWN' || repairOwner === 'UX') repairOwner = 'DOMAIN'
    }

    if (GENERIC_RE.test(text) && text.length < 500) {
      flags.push('回答偏泛，没有形成可执行判断')
      score = Math.min(score, 3)
      if (severity === 'OK' || severity == null) severity = 'P2'
      if (repairOwner === 'UNKNOWN') repairOwner = 'ENGINE'
    }
  }

  if (!deepseekText) {
    flags.push(deepseek?.error ? `DeepSeek 对照失败：${deepseek.error}` : 'DeepSeek 对照还没有生成')
    if (repairOwner === 'UNKNOWN') repairOwner = 'GENERATION'
  }

  if (risk) {
    skeleton.push(`场景：${risk.domain}；风险等级：${risk.risk_level}；人工确认：${risk.handoff ?? '未定'}`)
  } else if (question.scenario) {
    skeleton.push(`场景：${question.scenario}`)
  }
  skeleton.push('先复述用户真正要判断的身份变化、期限、材料或风险点。')
  skeleton.push('给出结论，但避免承诺通过/不通过；说明哪些条件会改变判断。')
  skeleton.push('列出 2-3 个下一步动作：先确认什么、准备什么、何时找入管/行政書士。')
  if (flags.length > 0) {
    skeleton.push(`优先修复：${flags.slice(0, 2).join('；')}`)
  }

  if (flags.length === 0) {
    repairOwner = 'IGNORE'
  }

  return {
    score,
    severity,
    launchable,
    repairOwner,
    flags,
    skeleton,
    red: severity === 'P0' || severity === 'P1' || (score != null && score <= 2),
    confidence: 'low',
  }
}
