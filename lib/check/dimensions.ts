import type { TriggeredItem, VisaSlug } from './types'

export type CanonicalCheckVisa =
  | 'technical_humanities_international'
  | 'management'
  | 'spouse'
  | 'permanent_resident_preparation'
  | 'specified_skilled_worker'

export type DimensionStatus = 'unchecked' | 'checked' | 'needs_action' | 'recent' | 'expired'
export type DimensionRiskFlag = 'recommended' | 'archive_triggered' | 'expired' | null

export interface CheckDimensionDefinition {
  key: string
  title: string
  description: string
  riskFlag?: DimensionRiskFlag
  linkedQuestionIds: string[]
}

export interface DimensionView extends CheckDimensionDefinition {
  status: DimensionStatus
  reason: string | null
  actionLabel: string
  lastCheckedAt: Date | null
}

export const CHECK_VISA_META: Record<CanonicalCheckVisa, {
  label: string
  legacyQuizVisa: VisaSlug
}> = {
  technical_humanities_international: {
    label: '技術・人文知識・国際業務',
    legacyQuizVisa: 'gijinkoku',
  },
  management: {
    label: '経営・管理',
    legacyQuizVisa: 'keiei',
  },
  spouse: {
    label: '配偶者',
    legacyQuizVisa: 'haigusha',
  },
  permanent_resident_preparation: {
    label: '永住准备',
    legacyQuizVisa: 'teijusha',
  },
  specified_skilled_worker: {
    label: '特定技能',
    legacyQuizVisa: 'tokutei',
  },
}

const DIMENSION_TITLE_FALLBACK: Record<string, string> = {
  passport_zairyu: '護照 / 在留カード',
  residence_tax: '住民税',
  income_tax: '所得税 / 確定申告',
  tax_certificate: '課税・納税証明書',
  health_pension: '健康保険 / 年金',
  employment_contract: '雇用契約',
  work_change: '工作变更',
  income_level: '收入水平',
  entry_exit_record: '出入国记录',
  juuminhyou: '住民票',
  violation_record: '违反记录',
  material_preparation: '材料准备',
}

const VISA_ALIASES: Record<string, CanonicalCheckVisa> = {
  gijinkoku: 'technical_humanities_international',
  technical_humanities_international: 'technical_humanities_international',
  keiei: 'management',
  management: 'management',
  haigusha: 'spouse',
  spouse: 'spouse',
  eijusha: 'permanent_resident_preparation',
  teijusha: 'permanent_resident_preparation',
  permanent_resident_preparation: 'permanent_resident_preparation',
  tokutei: 'specified_skilled_worker',
  specified_skilled_worker: 'specified_skilled_worker',
}

const BASE_DIMENSIONS: CheckDimensionDefinition[] = [
  {
    key: 'visa_expiry',
    title: '在留期限',
    description: '确认到期日和递交准备窗口。',
    riskFlag: 'recommended',
    linkedQuestionIds: ['expiry', 'renewal_timing'],
  },
  {
    key: 'employment_status',
    title: '工作/身份状态',
    description: '确认当前身份与在留资格条件一致。',
    riskFlag: 'recommended',
    linkedQuestionIds: ['job', 'employment', 'activity', 'company_status'],
  },
  {
    key: 'income_tax',
    title: '收入与税',
    description: '确认住民税、所得、申告相关记录。',
    linkedQuestionIds: ['tax', 'income', 'resident_tax', 'shinkoku'],
  },
  {
    key: 'social_insurance',
    title: '社保/年金',
    description: '确认健康保险、年金缴纳和未纳记录。',
    linkedQuestionIds: ['insurance', 'pension', 'social_insurance'],
  },
  {
    key: 'address_family',
    title: '住址/家庭变更',
    description: '确认住所、婚姻、家庭结构是否有变化。',
    linkedQuestionIds: ['address', 'marriage', 'family', 'children'],
  },
  {
    key: 'travel_record',
    title: '出入国记录',
    description: '确认长期离境和再入国许可期限。',
    linkedQuestionIds: ['travel', 'reentry', 'absence'],
  },
  {
    key: 'violations',
    title: '交通/违法记录',
    description: '确认罚金、处罚、资格外活动等记录。',
    riskFlag: 'recommended',
    linkedQuestionIds: ['violation', 'traffic', 'crime', 'overwork'],
  },
  {
    key: 'documents_ready',
    title: '材料准备',
    description: '确认递交前需要收集的证明材料。',
    linkedQuestionIds: ['documents', 'materials', 'certificate'],
  },
  {
    key: 'archive_gap',
    title: '档案缺失',
    description: '确认近期是否缺少文书、照片或自查记录。',
    riskFlag: 'archive_triggered',
    linkedQuestionIds: [],
  },
]

const VISA_EXTRA: Partial<Record<CanonicalCheckVisa, CheckDimensionDefinition[]>> = {
  management: [
    {
      key: 'business_continuity',
      title: '经营连续性',
      description: '确认办公室、营业、财务和雇佣状态。',
      riskFlag: 'recommended',
      linkedQuestionIds: ['office', 'revenue', 'capital', 'employee'],
    },
  ],
  spouse: [
    {
      key: 'relationship_continuity',
      title: '婚姻/同居状态',
      description: '确认婚姻关系、同居和共同生活记录。',
      riskFlag: 'recommended',
      linkedQuestionIds: ['relationship', 'cohabitation', 'support'],
    },
  ],
  permanent_resident_preparation: [
    {
      key: 'long_term_residence',
      title: '长期居住记录',
      description: '确认居住年数、纳税年数和稳定性。',
      riskFlag: 'recommended',
      linkedQuestionIds: ['years', 'stability', 'tax_years'],
    },
  ],
  specified_skilled_worker: [
    {
      key: 'support_plan',
      title: '支援计划/雇主记录',
      description: '确认雇主支援、工资和工作条件。',
      riskFlag: 'recommended',
      linkedQuestionIds: ['support', 'salary', 'work_condition'],
    },
  ],
}

export function normalizeCheckVisa(value: string | null | undefined): CanonicalCheckVisa {
  return VISA_ALIASES[value ?? ''] ?? 'technical_humanities_international'
}

export function dimensionsForVisa(visa: CanonicalCheckVisa): CheckDimensionDefinition[] {
  return [...BASE_DIMENSIONS, ...(VISA_EXTRA[visa] ?? [])].slice(0, 15)
}

export function fallbackDimensionTitle(key: string): string {
  return DIMENSION_TITLE_FALLBACK[key] ?? key.replace(/_/g, ' ')
}

export function isDimensionTriggered(
  dimension: CheckDimensionDefinition,
  triggered: TriggeredItem[],
): TriggeredItem | null {
  return triggered.find(item => {
    const text = `${item.id} ${item.triggerLabel} ${item.fixHint}`.toLowerCase()
    return dimension.linkedQuestionIds.some(key => text.includes(key.toLowerCase()))
  }) ?? null
}

export function defaultActionForStatus(status: DimensionStatus): string {
  switch (status) {
    case 'needs_action':
      return '递交前确认'
    case 'recent':
      return '基本齐备'
    case 'expired':
      return '待确认'
    case 'checked':
      return '已确认'
    default:
      return '待确认'
  }
}
