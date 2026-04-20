// 在留期間更新許可申請書 field mapping
// Extensible: add new visa types by extending or adding to ApplicationFormData
// Each key corresponds to a form field in the official application form

export interface ApplicationFormData {
  // === 申請人（本人） ===
  nationality: string          // 国籍・地域
  nameKanji: string            // 氏名（漢字）
  nameRoman: string            // 氏名（ローマ字）
  dateOfBirth: string          // 生年月日
  gender: string               // 性別
  maritalStatus: string        // 配偶者の有無
  addressJapan: string         // 住居地

  // === 旅券・在留資格 ===
  passportNumber: string       // 旅券番号
  passportExpiry: string       // 旅券有効期限
  residenceCardNumber: string  // 在留カード番号
  visaExpiryDate: string       // 在留期間の満了日

  // === 在職の内容 ===
  employerName: string         // 勤務先名称
  employerAddress: string      // 勤務先所在地
  employerPhone: string        // 勤務先電話番号
  department?: string          // 部署名（任意）
  jobTitle: string             // 職名
  annualIncome: string         // 年収
  isDispatched: string         // 派遣・請負

  // === 学歴・職歴 ===
  finalEducation: string       // 最終学歴

  // === 転職関連（条件付き） ===
  hasChangedJobs?: string      // 転職の有無
  previousEmployer?: string    // 前職勤務先名称

  // Extension point for future visa types
  [key: string]: string | undefined
}

export interface FormQuestion {
  id: string                   // Key in ApplicationFormData
  questionZh: string           // Chinese question shown to user
  fieldLabelJa: string         // Japanese label for PDF form
  type: 'text' | 'date' | 'number' | 'yn' | 'select'
  options?: string[]
  required: boolean
  hint?: string                // Additional Chinese hint shown below the question
  conditional?: {
    dependsOn: string          // Question ID this depends on
    matchValue: string         // 'yes' = show when answer is affirmative
  }
}

export interface SurveyAnswer {
  questionId: string
  question: string             // Chinese question text (for display)
  answer: string               // User's raw answer
  formattedValue?: string      // Japanese-formatted value for the PDF
}

export type SessionStatus =
  | 'created'
  | 'payment_pending'
  | 'payment_completed'
  | 'survey_in_progress'
  | 'survey_completed'
  | 'referral_requested'

export interface VisaSession {
  sessionId: string
  visaType: string
  status: SessionStatus
  answers: SurveyAnswer[]
  formData?: ApplicationFormData  // Built after survey completion
  requiresReferral: boolean
  referralReason?: string
  pdfUrl?: string
  createdAt: string
  updatedAt: string
}
