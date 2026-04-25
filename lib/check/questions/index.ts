// 题库注册表 - 按签证 slug 查询统一题库
import type { QuizBank, VisaSlug } from '../types'
import { gijinkokuBank } from './gijinkoku'
import { keieiBank } from './keiei'
import { haigushaBank } from './haigusha'
import { tokuteiBank } from './tokutei'
import { teijushaBank } from './teijusha'
import { movingBank } from './moving'

const BANKS: Partial<Record<VisaSlug, QuizBank>> = {
  gijinkoku: gijinkokuBank,
  keiei: keieiBank,
  haigusha: haigushaBank,
  tokutei: tokuteiBank,
  teijusha: teijushaBank,
  moving: movingBank,
}

export function getBank(visa: VisaSlug): QuizBank {
  const b = BANKS[visa]
  if (!b) throw new Error(`Unknown visa bank: ${visa}`)
  return b
}

export {
  gijinkokuBank,
  keieiBank,
  haigushaBank,
  tokuteiBank,
  teijushaBank,
  movingBank,
}
