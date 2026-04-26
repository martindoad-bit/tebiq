/**
 * 拍照识别相关类型 — 前后端共用。
 */
export type Urgency = 'critical' | 'high' | 'normal' | 'ignorable'

export interface PhotoDetailSection {
  heading: string
  body: string
  bullets?: string[]
}

export interface PhotoRecognitionResult {
  docType: string
  issuer: string
  urgency: Urgency
  /** YYYY-MM-DD or null */
  deadline: string | null
  /** 据今天的剩余天数（mock 写死） */
  deadlineRemainingDays: number | null
  /** 金额（日元，可选） */
  amount: number | null
  /** 一句话总结（屏 03 顶部） */
  summary: string
  /** 你需要做什么（屏 03 第二个 QA） */
  actions: string[]
  /** 不做会怎样（屏 03 第三个 QA） */
  consequences: string
  /** 详细说明（屏 04） */
  detail: {
    sections: PhotoDetailSection[]
  }
}
