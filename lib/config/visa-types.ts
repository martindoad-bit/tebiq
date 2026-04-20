// Visa type metadata only.
// Form questions live in visa-form-fields.ts
// To add a new visa type: add a key here AND add questions in visa-form-fields.ts

export interface VisaTypeMeta {
  id: string
  labelZh: string       // Chinese label shown to user
  labelJa: string       // Japanese label for PDF form header
  descriptionZh: string // Chinese description
  price: number
  // Required materials list (secondary feature - shown after form generation)
  materials?: string[]
}

export const VISA_TYPES: Record<string, VisaTypeMeta> = {
  work: {
    id: 'work',
    labelZh: '工作签证（技人国）',
    labelJa: '技術・人文知識・国際業務',
    descriptionZh: '技術・人文知識・国際業務 在留期間更新',
    price: 2980,
    materials: [
      'パスポート（原本＋コピー）',
      '在留カード（原本＋コピー）',
      '住民票（3ヶ月以内）',
      '在職証明書または雇用契約書',
      '源泉徴収票（直近1年分）',
      '会社の登記事項証明書',
      '会社の決算書（直近2期分）',
    ],
  },

  // Future:
  // spouse: { id: 'spouse', labelZh: '配偶者ビザ', labelJa: '日本人の配偶者等', ... },
  // permanent: { id: 'permanent', labelZh: '永住申請', labelJa: '永住者', ... },
  // student: { id: 'student', labelZh: '留学ビザ', labelJa: '留学', ... },
}

export const VISA_TYPE_LIST = Object.values(VISA_TYPES)
