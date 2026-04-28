// 定住者签证题库
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '是否按时缴纳住民税，没有欠缴？',
    why: '定住者续签首要审查项目',
    learnMore: '住民税欠缴是续签被拒的最高频原因，申请前必须补缴完毕。',
    options: [
      { label: '是', next: 'q2' },
      {
        label: '有欠缴或不确定',
        next: 'q2',
        severity: 'red',
        triggerLabel: '住民税未按时缴纳',
        selfFix: false,
        fixHint: '申请前必须补缴并取得納税証明書。',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: '是否全程参加健康保险，没有断保？',
    why: '社会保险缴纳是续签审查项目',
    learnMore: '断保期间需要说明原因并准备相关证明材料。',
    options: [
      { label: '是，全程参保', next: 'q3' },
      {
        label: '有断保期间',
        next: 'q3',
        severity: 'yellow',
        triggerLabel: '健康保险有断保',
        selfFix: false,
        fixHint: '准备断保期间说明书并补办相关手续。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '近两年内是否有长期离开日本（超过 3 个月）的情况？',
    why: '定住者长期出境可能影响续签判断',
    learnMore:
      '长期出境本身不是禁止项，但入管局会审查在日本生活的实质性。需要准备出境原因说明。',
    options: [
      { label: '没有', next: 'q4' },
      {
        label: '有较长时间在海外',
        next: 'q4',
        severity: 'yellow',
        triggerLabel: '近两年内长期出境（>3 个月）',
        selfFix: false,
        fixHint: '准备出境原因说明 + 与日本的持续联系证明。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '在日本是否有稳定的生活基础（工作 / 子女就学 / 配偶等）？',
    why: '定住者续签审查在日生活的稳定性',
    learnMore:
      '定住者续签没有硬性的工作或收入要求，但需要证明在日本有实质性的生活。子女在日就学、配偶在日居住等都是有力的证明。',
    options: [
      { label: '是，有稳定生活基础', next: 'q5' },
      {
        label: '目前没有工作也没有家庭',
        next: 'q5',
        severity: 'yellow',
        triggerLabel: '缺少稳定生活基础证明',
        selfFix: false,
        fixHint: '准备银行存款证明、亲族关系证明等替代材料。',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: '是否有刑事违规或严重交通违规记录？',
    why: '违规记录直接影响续签审查',
    learnMore: '有违规记录需要向专家说明具体情况评估影响，不要隐瞒。',
    options: [
      { label: '没有', next: 'q6' },
      {
        label: '有',
        next: 'q6',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint: '必须向专家详细说明并准备相关法律文件。',
      },
    ],
  },
  q6: {
    id: 'q6',
    text: '如果有日系人身份，是否能证明与日本的联系仍然存在？',
    why: '日系定住者需要证明与日本的持续联系',
    learnMore:
      '日系人定住者的续签，入管局会关注与日本家族和社会的实质联系是否继续维持。长期与日本脱离联系的日系人续签可能遇到困难。',
    options: [
      { label: '是，或不适用（非日系人定住）', next: 'q7' },
      {
        label: '日系人但与日本联系较少',
        next: 'q7',
        severity: 'yellow',
        triggerLabel: '日系人与日本联系较少',
        selfFix: false,
        fixHint: '准备亲族关系图 + 与日本亲族的交流记录。',
      },
    ],
  },
  q7: {
    id: 'q7',
    text: '护照有效期距今是否还有 6 个月以上？',
    why: '护照必须在续签申请期间有效',
    learnMore: '先去中国驻日使馆续签护照再办在留续签，可以同步进行。',
    options: [
      { label: '是', next: 'q8' },
      {
        label: '不足 6 个月',
        next: 'q8',
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint: '先去中国驻日使馆办理护照换发，再申请在留续签。',
      },
    ],
  },

  // === Q8-Q12：第 6 天专业人士反馈新增的 5 个合规维度 ===
  q8: {
    id: 'q8',
    text: '除了交通违规，你过去 5 年内有没有罚金、停止令、軽犯罪法処分等任何处分？',
    why: '入管会调取所有处分记录（警察 + 行政），不限于交通',
    learnMore:
      '常被忽视的范围：軽犯罪法処分、商店扒窃、迷惑防止条例違反、行政罚金、不法滞在记录、入管警告等。即使最终不起诉、罚金缴清，也会留在数据库中。如不确定可申请「犯罪歴証明書」查询。',
    options: [
      { label: '完全没有', next: 'q9' },
      {
        label: '有过罚金或軽犯罪法処分',
        next: 'q9',
        severity: 'yellow',
        triggerLabel: '过去 5 年内有罚金或軽犯罪法処分',
        selfFix: false,
        fixHint:
          '罚金 / 軽犯罪法処分本身不致命，但隐瞒被查到后果严重。在申请书附 1 份说明书：何时何地何事 / 缴清证明 / 已无再犯。建议由专家过一遍措辞。',
      },
      {
        label: '有过行政停止令 / 不法滞在 / 入管警告',
        next: 'q9',
        severity: 'red',
        triggerLabel: '存在行政停止令、不法滞在或入管警告记录',
        selfFix: false,
        fixHint:
          '入管视角下这是高风险信号。不要自行递签。请尽快和专家面谈，评估是否需要先取得「在留特別許可」。',
      },
      { label: '不确定', next: 'q9' },
    ],
  },
  q9: {
    id: 'q9',
    text: '过去 3 年里，你在日本以外累计居住了多久？',
    why: '定住者签证审查在日生活实质性，长期不在日影响判断',
    learnMore:
      '入管通过出入国記録核查实际在日时间。定住者签证下，长期不在日会让入管质疑「日本での生活基盘」。出入国記録可在最近的入国管理局窗口当场打印。',
    options: [
      { label: '不到 3 个月', next: 'q10' },
      {
        label: '3 - 6 个月',
        next: 'q10',
        severity: 'yellow',
        triggerLabel: '过去 3 年累计离日 3-6 个月',
        selfFix: true,
        fixHint:
          '附 1 份「出入国理由説明書」+ 出入国記録 + 期间与日本家族 / 子女学校的联系证明。',
      },
      {
        label: '6 个月以上',
        next: 'q10',
        severity: 'red',
        triggerLabel: '过去 3 年累计离日 6 个月以上',
        selfFix: false,
        fixHint:
          '入管会重点审查「在日生活基盘」是否实质存在。建议专家介入，准备：出境理由详细说明、家族与日本的联系证据、未来在日定居计划。',
      },
    ],
  },
  q10: {
    id: 'q10',
    text: '你能不能从市役所拿到过去 3 年完整的「課税証明書」？',
    why: '課税証明書是入管核查纳税与収入的必备材料；缺年份会被要求补正',
    learnMore:
      '課税証明書由住所所在地市役所「税務課」发行。中途搬家、未做転入届、当年没有収入也会让某些年份开不出。可以提前去市役所窗口确认能开出哪几年。',
    options: [
      { label: '能完整拿到 3 年', next: 'q11' },
      {
        label: '其中 1 年开不出',
        next: 'q11',
        severity: 'yellow',
        triggerLabel: '部分年度課税証明書开不出',
        selfFix: false,
        fixHint:
          '附 1 份「不開可説明書」解释原因（如当年在海外、搬家空窗、無収入等），并提供能证明收入或活动的替代材料。',
      },
      {
        label: '多个年份开不出',
        next: 'q11',
        severity: 'red',
        triggerLabel: '多个年度課税証明書无法取得',
        selfFix: false,
        fixHint:
          '说明你过去若干年与日本税务系统断链，入管会重点审查。请专家介入，评估如何重建税务证明（含補正申告等）。',
      },
      { label: '不确定', next: 'q11' },
    ],
  },
  q11: {
    id: 'q11',
    text: '过去 3 年内，你在日本的住民票登録是否持续有效，没有因搬家、出国等出现脱漏？',
    why: '住民票履歴反映你在日的合法居住连续性',
    learnMore:
      '正常情况：搬家做転入届、海外长期出差不办「海外転出届」就保留登録。脱漏发生在：办了海外転出届但回来后没及时転入、搬家后忘办転入届超 14 天等。',
    options: [
      { label: '没有脱漏', next: 'q12' },
      {
        label: '有过短期脱漏（1 个月内已补办）',
        next: 'q12',
        severity: 'yellow',
        triggerLabel: '住民票登録曾短期脱漏',
        selfFix: true,
        fixHint:
          '短期脱漏通常可在市役所窗口补办时由职员在新「住民票」上注明。续签时附说明并主动提交即可。',
      },
      {
        label: '有过长期脱漏 / 不法滞在期',
        next: 'q12',
        severity: 'red',
        triggerLabel: '住民票出现长期脱漏或不法滞在期间',
        selfFix: false,
        fixHint:
          '住民票断档对应「不在日本」或「未办手续」状态，入管会与出入国記録交叉对比。请专家介入处理。',
      },
      { label: '不确定', next: 'q12' },
    ],
  },
  q12: {
    id: 'q12',
    text: '你目前的雇用契約是哪种形态？',
    why: '定住者签证不强制就业，但雇用形态影响在留期间长度判定',
    learnMore:
      '定住者签证可以无収入由家族支持，但若有自己的雇用関係，正社員 → 高分；契約 / 派遣 → 中等；業務委託 → 中性；無職 → 需补充家族支持証明。',
    options: [
      { label: '正社員', next: null },
      { label: '無職 / 専業主夫(婦)（依赖家族）', next: null },
      {
        label: '契約社員 / 派遣社員 / 業務委託',
        next: null,
        severity: 'yellow',
        triggerLabel: '雇用形态不稳定（契約 / 派遣 / 業務委託）',
        selfFix: false,
        fixHint:
          '不致命但可能拿到较短在留期间。准备：契約书、最近 6 个月工资证明、银行储蓄証明補足。',
      },
      {
        label: '試用期内（入职不满 3 个月）',
        next: null,
        severity: 'yellow',
        triggerLabel: '雇用处于試用期',
        selfFix: false,
        fixHint:
          '建议附「採用予定書」表明会转正，必要时补充家族収入証明。',
      },
    ],
  },
}

export const teijushaBank: QuizBank = {
  visa: 'teijusha',
  visaName: '定住者',
  startId: 'q1',
  questions: Q,
  infoHref: '/teijusha',
  infoLabel: '查看定住者完整说明',
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '在日本生活证明（雇用契約書 / 在学証明書 / 配偶者の在留証明等）',
    '理由書（如长期出境 / 定住经历变化等）',
  ],
}
