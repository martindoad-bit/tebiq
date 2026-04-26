// 特定技能签证题库
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '你持有的是特定技能 1 号还是 2 号？',
    why: '两者要求和上限完全不同',
    learnMore:
      '特定技能 1 号有通算 5 年的在日上限，达到上限后必须离开日本或变更为其他在留资格。特定技能 2 号目前对象行业正在扩大，无在日期间上限。[待书士审核]',
    options: [
      // 1 号 → 进入 5 年上限题；2 号 → 直接跳到 q3
      { label: '特定技能 1 号', next: 'q2_1' },
      { label: '特定技能 2 号', next: 'q3' },
    ],
  },
  q2_1: {
    id: 'q2_1',
    text: '特定技能 1 号的通算在日期间是否接近或超过 5 年？',
    why: '1 号有 5 年总计上限，超过不能续签',
    showIf: { q1: 0 },
    learnMore:
      '特定技能 1 号的 5 年上限是从首次取得该在留资格起累计计算的。接近 5 年时需要提前确认是否有资格转 2 号或其他在留资格。[待书士审核]',
    options: [
      { label: '未满 4 年', next: 'q3' },
      {
        label: '4 年以上',
        next: 'q3',
        severity: 'yellow',
        triggerLabel: '特定技能 1 号通算在日接近 5 年',
        selfFix: false,
        fixHint: '提前规划转 2 号或其他在留资格的方案。',
      },
      {
        label: '已满 5 年或超过',
        next: 'q3',
        severity: 'red',
        triggerLabel: '特定技能 1 号通算在日已满 5 年',
        selfFix: false,
        fixHint: '5 年上限不可续签。立即咨询书士评估转 2 号或其他在留资格。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '你所属的登録支援機関（注册支援机构）是否还在正常运营？',
    why: '支援機関停止运营会直接影响续签',
    learnMore:
      '如果支援機関停止运营，需要立刻联系雇主确认是否已更换支援機関，或由雇主自行支援。这种情况需要立刻咨询书士。[待书士审核]',
    options: [
      { label: '正常运营中', next: 'q4' },
      {
        label: '停止运营或不确定',
        next: 'q4',
        severity: 'red',
        triggerLabel: '登録支援機関停止运营',
        selfFix: false,
        fixHint: '立即与雇主确认是否更换支援機関，并咨询书士。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '你的特定技能测试合格证是否仍在有效期内？',
    why: '技能合格证是特定技能资格的基础',
    learnMore:
      '特定技能测试合格证的有效期根据考试种类不同而不同。已过期的需要确认是否需要重新考试。具体情况咨询书士判断。[待书士审核]',
    options: [
      { label: '有效期内', next: 'q5' },
      {
        label: '已过期或不确定',
        next: 'q5',
        severity: 'yellow',
        triggerLabel: '特定技能测试合格证已过期或不确定',
        selfFix: false,
        fixHint: '确认是否需要重新参加测试。',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: '是否按时缴纳住民税，没有欠缴？',
    why: '税款记录是续签审查的基础项目',
    learnMore: '住民税欠缴是续签被拒的高频原因，申请前必须补缴完并取得完缴证明。[待书士审核]',
    options: [
      { label: '是', next: 'q6' },
      {
        label: '有欠缴或不确定',
        next: 'q6',
        severity: 'red',
        triggerLabel: '住民税未按时缴纳',
        selfFix: false,
        fixHint: '申请前必须补缴并取得納税証明書。',
      },
    ],
  },
  q6: {
    id: 'q6',
    text: '是否全程参加健康保险，没有断保？',
    why: '健康保险缴纳是续签审查项目',
    learnMore: '断保期间需要说明原因。换工作空窗期需要及时加入国民健康保险。[待书士审核]',
    options: [
      { label: '是，全程参保', next: 'q7' },
      {
        label: '有断保',
        next: 'q7',
        severity: 'yellow',
        triggerLabel: '健康保险有断保',
        selfFix: false,
        fixHint: '准备断保期间说明书并补办手续。',
      },
    ],
  },
  q7: {
    id: 'q7',
    text: '实际从事的工作内容是否与特定技能的认定范围一致？',
    why: '从事范围外工作是特定技能续签的最大风险',
    learnMore:
      '特定技能签证只允许在认定的特定业务范围内工作。从事范围外的工作（尤其是单纯作业）不仅影响续签，还可能被认定为不法就劳。发现这种情况需要立刻咨询书士。[待书士审核]',
    options: [
      { label: '是，工作内容一致', next: 'q8' },
      {
        label: '有从事范围外工作',
        next: 'q8',
        severity: 'red',
        triggerLabel: '存在认定范围外工作',
        selfFix: false,
        fixHint: '可能被认定为不法就劳。立即咨询书士并调整工作内容。',
      },
    ],
  },
  q8: {
    id: 'q8',
    text: '过去是否有刑事违规或严重交通违规记录？',
    why: '违规记录直接影响续签审查',
    learnMore: '有违规记录需要向书士说明具体情况进行评估，不要隐瞒。[待书士审核]',
    options: [
      { label: '没有', next: 'q9' },
      {
        label: '有',
        next: 'q9',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint: '必须向书士详细说明并准备相关法律文件。',
      },
    ],
  },
  q9: {
    id: 'q9',
    text: '护照有效期距今是否还有 6 个月以上？',
    why: '护照必须在续签申请期间有效',
    learnMore: '先去中国驻日大使馆续签护照再办在留续签，两者可以同步进行。[待书士审核]',
    options: [
      { label: '是', next: null },
      {
        label: '不足 6 个月',
        next: null,
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint: '先办护照换发，再申请在留续签。',
      },
    ],
  },
}

export const tokuteiBank: QuizBank = {
  visa: 'tokutei',
  visaName: '特定技能',
  startId: 'q1',
  questions: Q,
  infoHref: '/tokutei',
  infoLabel: '查看特定技能完整说明',
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '雇用契約書',
    '特定技能評価試験合格証 / 技能実習修了証等',
    '日本語能力試験合格証 等',
    '登録支援機関との契約書（必要时）',
  ],
}
