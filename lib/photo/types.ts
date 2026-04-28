/**
 * 拍照识别相关类型 — 前后端共用。
 */
export type Urgency = 'critical' | 'high' | 'important' | 'normal' | 'ignorable'

export type RecognitionConfidence = 'high' | 'medium' | 'low' | 'envelope_only'

export interface PhotoRecognitionResult {
  /** 文书类型；无法可靠判断时为 null。 */
  docType: string | null
  /** 发件机构；无法可靠判断时为 null。 */
  issuer: string | null
  /** 是否只拍到了信封外面。 */
  isEnvelope: boolean
  recognitionConfidence: RecognitionConfidence
  /** YYYY-MM-DD or null */
  deadline: string | null
  /** 据今天的剩余天数；由服务端根据 deadline 计算。 */
  deadlineRemainingDays: number | null
  /** 文书内明确写出的金额；保留原文格式，不做估算。 */
  amount: string | null
  /** 中文一句话总结，只描述客观事实。 */
  summary: string
  /** 保守通用步骤，只能来自 prompt 白名单。 */
  generalActions: string[]
  /** 简单期限判断：有期限且 <= 7 天。 */
  isUrgent: boolean
  /** 涉及法律/税务/签证决策时，仅显示咨询入口，不给具体判断。 */
  needsExpertAdvice: boolean
  /** 基于用户上下文生成的相关性提示。 */
  contextHints?: string[]
}
