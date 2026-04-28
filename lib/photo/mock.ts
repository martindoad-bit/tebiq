/**
 * 拍照识别 mock 数据。
 *
 * Block 5 会用 AWS Bedrock 真实 vision 调用替换。本文件保持 stable 接口
 * 让前端能完整跑通；mock 输出每次返回固定 fixture。
 */
import type { PhotoRecognitionResult } from './types'

export const MOCK_RECOGNITION: PhotoRecognitionResult = {
  docType: '住民税通知',
  issuer: '大阪市役所',
  isEnvelope: false,
  recognitionConfidence: 'high',
  deadline: '2024-05-20',
  deadlineRemainingDays: 14,
  amount: '65,400円',
  summary: '这是大阪市役所发出的住民税相关通知。',
  generalActions: ['在期限内打开并阅读完整内容', '若有金额,在期限内缴纳', '保留原件备查'],
  isUrgent: false,
  needsExpertAdvice: true,
}
