// 技人国题库 - 直接复用 lib/check/questions.ts 中的数据
// 这样 ResultClient / api 等仍可继续从原文件 import

import { QUESTIONS, START_ID } from '../questions'
import type { QuizBank, QuizQuestion } from '../types'

// 顶层简略材料清单（详细版仍在 lib/check/materials.ts）
const GIJINKOKU_MATERIALS_SUMMARY: string[] = [
  '在留资格更新许可申请书',
  '证件照',
  '护照',
  '在留卡',
  '住民票',
  '雇用契約書 / 在職証明書',
  '会社案内 / 履歴事項全部証明書',
  '決算報告書',
  '住民税納税証明書 / 課税証明書',
  '源泉徴収票',
  '健康保険証 / 年金加入記録',
  '学历证明书（首次或入管要求时）',
]

export const gijinkokuBank: QuizBank = {
  visa: 'gijinkoku',
  visaName: '技人国',
  startId: START_ID,
  // QUESTIONS 的 Question 类型在结构上与 QuizQuestion 兼容
  questions: QUESTIONS as unknown as Record<string, QuizQuestion>,
  materials: GIJINKOKU_MATERIALS_SUMMARY,
}
