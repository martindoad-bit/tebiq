// 统一题库类型定义 - 所有签证 quiz 共用
// 兼容 lib/check/questions.ts 的既有类型（技人国），并扩展支持其他签证

export type Severity = 'red' | 'yellow'
export type Verdict = 'red' | 'yellow' | 'green'
export type VisaSlug =
  | 'gijinkoku'
  | 'keiei'
  | 'haigusha'
  | 'eijusha'
  | 'tokutei'
  | 'teijusha'
  | 'moving'

export interface QuizOption {
  label: string
  /** 下一题 id，null = 结束 */
  next: string | null
  severity?: Severity
  triggerLabel?: string
  fixHint?: string
  selfFix?: boolean
}

export interface QuizQuestion {
  id: string
  text: string
  why: string
  /** 「了解更多」展开后的详细说明 */
  learnMore?: string
  options: QuizOption[]
  /** 仅当此处所有 (questionId → optionIndex) 都命中时才显示该题（按 index 比较，与原 SimpleQuiz 的 value 语义对齐） */
  showIf?: Record<string, number>
}

export interface QuizBank {
  visa: VisaSlug
  visaName: string
  startId: string
  questions: Record<string, QuizQuestion>
  /** 顶层简略材料清单（绿色页直接展示） */
  materials: string[]
  ctaHref?: string
  ctaLabel?: string
  infoHref?: string
  infoLabel?: string
  /** 返回链接文案（默认「其他签证」） */
  backLabel?: string
}

export interface AnsweredItem {
  questionId: string
  optionIndex: number
}

export interface TriggeredItem {
  id: string
  severity: Severity
  triggerLabel: string
  fixHint: string
  selfFix: boolean
}

export interface JudgeResult {
  verdict: Verdict
  triggered: TriggeredItem[]
}
