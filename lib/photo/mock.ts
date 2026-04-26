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
  urgency: 'high',
  deadline: '2024-05-20',
  deadlineRemainingDays: 14,
  amount: 65400,
  summary: '市役所通知你缴纳住民税。',
  actions: ['确认金额', '在期限内缴纳'],
  consequences: '可能产生滞纳金，影响信用记录。',
  detail: {
    sections: [
      {
        heading: '关于住民税',
        body: '这是大阪市向你征收的住民税通知，根据你去年的收入计算。',
      },
      {
        heading: '你需要做的',
        body: '请在期限内通过以下方式缴纳：',
        bullets: ['银行汇款', '便利店缴纳', '网上缴纳'],
      },
      {
        heading: '注意事项',
        body: '',
        bullets: ['如果金额有误，请联系市役所', '逾期未缴纳将产生滞纳金'],
      },
    ],
  },
}
