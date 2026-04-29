// 配偶者签证题库
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '你和配偶（日本人 / 永住者）的婚姻关系目前是否正常维持？',
    why: '配偶者签证的基础是真实婚姻关系的存在',
    learnMore:
      '已离婚或正在离婚的情况下，配偶者签证的在留资格基础不复存在，必须在 6 个月内申请变更为其他在留资格（定住者等）。时间非常紧迫，需要立刻咨询专家。',
    options: [
      { label: '是，婚姻正常', next: 'q2' },
      {
        label: '已离婚或正在办理',
        next: 'q2',
        severity: 'red',
        triggerLabel: '婚姻关系已不存续',
        selfFix: false,
        fixHint:
          '必须在 6 个月内申请变更为其他在留资格（定住者等），立即咨询专家。',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: '配偶目前是否在日本居住？',
    why: '入管局会确认配偶者是否在日本实际生活',
    learnMore:
      '配偶长期不在日本居住的情况下，入管局会质疑婚姻实质。需要准备配偶在海外的原因说明，并证明婚姻关系实质存在（通信记录、互相访问记录等）。',
    options: [
      { label: '是，在日本', next: 'q3' },
      {
        label: '配偶长期在海外',
        next: 'q3',
        severity: 'yellow',
        triggerLabel: '配偶长期在海外',
        selfFix: false,
        fixHint:
          '准备配偶在海外的原因说明 + 通信记录 / 互访记录等婚姻实质证明。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '你和配偶目前是否同居？',
    why: '同居是配偶者签证审查的重要考量因素',
    learnMore:
      '别居本身不是立刻被拒的理由，但入管局会深入审查原因。合理原因（工作地点、子女就学等）需要有说明书和证明材料。长期别居且无合理说明是待确认。',
    options: [
      { label: '是，同居', next: 'q4' },
      {
        label: '别居（分开住）',
        next: 'q4',
        severity: 'yellow',
        triggerLabel: '夫妻别居',
        selfFix: false,
        fixHint: '准备别居原因说明书（工作 / 就学等）+ 通信记录证明。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '住民税是否按时缴纳，没有欠缴？',
    why: '税款记录是续签审查的基础项目',
    learnMore:
      '住民税欠缴是续签被拒的高频原因。申请前必须补缴完毕并取得完缴证明。',
    options: [
      { label: '是，按时缴纳', next: 'q5' },
      {
        label: '有欠缴或不确定',
        next: 'q5',
        severity: 'red',
        triggerLabel: '住民税未按时缴纳',
        selfFix: false,
        fixHint: '申请前必须补缴完毕并取得納税証明書。',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: '是否全程参加健康保险（社会保险或国民健康保险），没有断保？',
    why: '健康保险缴纳情况是续签审查项目之一',
    learnMore:
      '断保期间入管局会关注。换工作空窗期需要及时加入国民健康保险，离职后 14 天内去市役所办理。',
    options: [
      { label: '是，全程参保', next: 'q6' },
      {
        label: '有断保期间',
        next: 'q6',
        severity: 'yellow',
        triggerLabel: '健康保险有断保',
        selfFix: false,
        fixHint: '准备断保期间说明书并补办相关手续。',
      },
    ],
  },
  q6: {
    id: 'q6',
    text: '过去是否有刑事违规或严重交通违规记录？',
    why: '违规记录会直接影响续签审查结果',
    learnMore:
      '有违规记录不等于一定被拒，但需要向专家说明具体情况进行评估。隐瞒比如实说明后果严重得多。',
    options: [
      { label: '没有', next: 'q7' },
      {
        label: '有',
        next: 'q7',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint: '必须向专家详细说明，由专家设计陈述方式并准备相关法律文件。',
      },
    ],
  },
  q7: {
    id: 'q7',
    text: '近一两年内是否有长期离开日本（超过 3 个月）的情况？',
    why: '长期出境会影响入管局对婚姻真实性的判断',
    learnMore:
      '长期出境本身不是问题，但需要说明原因。如果出境期间配偶也不在日本，入管局会更仔细审查。',
    options: [
      { label: '没有超过 3 个月', next: 'q8' },
      {
        label: '有较长时间在海外',
        next: 'q8',
        severity: 'yellow',
        triggerLabel: '近期有长期出境（>3 个月）',
        selfFix: false,
        fixHint: '准备出境原因说明 + 期间夫妻交流记录。',
      },
    ],
  },
  q8: {
    id: 'q8',
    text: '护照有效期距今是否还有 6 个月以上？',
    why: '护照必须在续签申请期间有效',
    learnMore:
      '需要先去中国驻日大使馆 / 总领事馆续签护照（预约约需 1-2 个月），再办在留续签。两者可以同步进行但要注意时间安排。',
    options: [
      { label: '是，6 个月以上', next: 'q9' },
      {
        label: '不足 6 个月',
        next: 'q9',
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint: '先去中国驻日使馆办理护照换发，再申请在留续签。',
      },
    ],
  },

  // === Q9-Q13：第 6 天专业人士反馈新增的 5 个合规维度 ===
  q9: {
    id: 'q9',
    text: '除了交通违规，你过去 5 年内有没有罚金、停止令、軽犯罪法処分等任何处分？',
    why: '入管会调取所有处分记录（警察 + 行政），不限于交通',
    learnMore:
      '常被忽视的范围：軽犯罪法処分、商店扒窃、迷惑防止条例違反、行政罚金、不法滞在记录、入管警告等。即使最终不起诉、罚金缴清，也会留在数据库中。如不确定可申请「犯罪歴証明書」查询。',
    options: [
      { label: '完全没有', next: 'q10' },
      {
        label: '有过罚金或軽犯罪法処分',
        next: 'q10',
        severity: 'yellow',
        triggerLabel: '过去 5 年内有罚金或軽犯罪法処分',
        selfFix: false,
        fixHint:
          '罚金 / 軽犯罪法処分本身不致命，但隐瞒被查到后果严重。在申请书附 1 份说明书：何时何地何事 / 缴清证明 / 已无再犯。建议由专家过一遍措辞。',
      },
      {
        label: '有过行政停止令 / 不法滞在 / 入管警告',
        next: 'q10',
        severity: 'red',
        triggerLabel: '存在行政停止令、不法滞在或入管警告记录',
        selfFix: false,
        fixHint:
          '入管视角下这是待确认信号。不要自行递签。请尽快和专家面谈，评估是否需要先取得「在留特別許可」或更换签证类别。',
      },
      { label: '不确定', next: 'q10' },
    ],
  },
  q10: {
    id: 'q10',
    text: '过去 3 年里，你在日本以外累计居住了多久？',
    why: '配偶者签证审查在日生活实质性，长期不在日影响判断',
    learnMore:
      '入管通过出入国記録核查实际在日时间。配偶者签证下，长期不在日本会让入管怀疑「夫妻同居」是否实质存在。出入国記録可在最近的入国管理局窗口当场打印。',
    options: [
      { label: '不到 3 个月', next: 'q11' },
      {
        label: '3 - 6 个月',
        next: 'q11',
        severity: 'yellow',
        triggerLabel: '过去 3 年累计离日 3-6 个月',
        selfFix: true,
        fixHint:
          '附 1 份「出入国理由説明書」+ 出入国記録 + 期间夫妻交流证据（通信、对方探访记录等）。',
      },
      {
        label: '6 个月以上',
        next: 'q11',
        severity: 'red',
        triggerLabel: '过去 3 年累计离日 6 个月以上',
        selfFix: false,
        fixHint:
          '入管会重点审查婚姻实质性。建议专家介入，准备：出境理由详细说明、配偶在海外的状况、夫妻交流记录、未来在日同居计划等组合材料。',
      },
    ],
  },
  q11: {
    id: 'q11',
    text: '你能不能从市役所拿到过去 3 年完整的「課税証明書」？',
    why: '課税証明書是入管核查纳税与收入的必备材料；缺年份会被要求补正',
    learnMore:
      '課税証明書由住所所在地市役所「税務課」发行。中途搬家、未做転入届、当年没有收入也会让某些年份开不出。可以提前去市役所窗口确认能开出哪几年。',
    options: [
      { label: '能完整拿到 3 年', next: 'q12' },
      {
        label: '其中 1 年开不出',
        next: 'q12',
        severity: 'yellow',
        triggerLabel: '部分年度課税証明書开不出',
        selfFix: false,
        fixHint:
          '附 1 份「不開可説明書」解释原因（如当年在海外、搬家空窗、无収入等），并由配偶提供该年度的課税証明書。',
      },
      {
        label: '多个年份开不出',
        next: 'q12',
        severity: 'red',
        triggerLabel: '多个年度課税証明書无法取得',
        selfFix: false,
        fixHint:
          '说明你过去若干年与日本税务系统断链。请专家介入，评估如何用配偶収入証明 / 储蓄証明 / 補正申告等组合材料补正。',
      },
      { label: '不确定', next: 'q12' },
    ],
  },
  q12: {
    id: 'q12',
    text: '过去 3 年内，你在日本的住民票登録是否持续有效，没有因搬家、出国等出现脱漏？',
    why: '住民票履歴反映你在日的合法居住连续性',
    learnMore:
      '正常情况：搬家做転入届、海外长期出差不办「海外転出届」就保留登録。脱漏发生在：办了海外転出届但回来后没及时転入、搬家后忘办転入届超 14 天等。',
    options: [
      { label: '没有脱漏', next: 'q13' },
      {
        label: '有过短期脱漏（1 个月内已补办）',
        next: 'q13',
        severity: 'yellow',
        triggerLabel: '住民票登録曾短期脱漏',
        selfFix: true,
        fixHint:
          '短期脱漏通常可在市役所窗口补办时由职员在新「住民票」上注明。续签时附说明并主动提交即可。',
      },
      {
        label: '有过长期脱漏 / 不法滞在期',
        next: 'q13',
        severity: 'red',
        triggerLabel: '住民票出现长期脱漏或不法滞在期间',
        selfFix: false,
        fixHint:
          '住民票断档对应「不在日本」或「未办手续」状态，入管会与出入国記録交叉对比。请专家介入处理。',
      },
      { label: '不确定', next: 'q13' },
    ],
  },
  q13: {
    id: 'q13',
    text: '你目前是否有自己的工作 / 收入来源（不依赖配偶）？',
    why: '配偶者签证不要求申请人工作，但若有自己的雇用关系会影响在留期间判定',
    learnMore:
      '配偶者签证不强制申请人工作；申请人无収入由配偶承担生活费完全合规。但如果你有自己的工作，雇用契約形態（正社員 / 派遣 / 業務委託 / 試用期）会影响入管对「在日生活基盘」的判定，间接影响在留期间长度。',
    options: [
      { label: '無職 / 専業主夫(婦)（依赖配偶）', next: null },
      { label: '正社員', next: null },
      {
        label: '契約社員 / 派遣社員 / 業務委託',
        next: null,
        severity: 'yellow',
        triggerLabel: '雇用形态不稳定（契約 / 派遣 / 業務委託）',
        selfFix: false,
        fixHint:
          '不致命但可能拿到较短在留期间。准备：契約书、最近 6 个月工资证明、配偶収入証明（補足生活基盘）。',
      },
      {
        label: '試用期内（入职不满 3 个月）',
        next: null,
        severity: 'yellow',
        triggerLabel: '雇用处于試用期',
        selfFix: false,
        fixHint:
          '建议附「採用予定書」表明会转正，并由配偶提供収入证明補足生活基盘。',
      },
    ],
  },
}

export const haigushaBank: QuizBank = {
  visa: 'haigusha',
  visaName: '日本人/永住者の配偶者等',
  startId: 'q1',
  questions: Q,
  infoHref: '/haigusha',
  infoLabel: '查看配偶者签证完整说明',
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '配偶者との婚姻を証明する書類（婚姻届受理証明書等）',
    '配偶者の住民票または在留カード写し',
    '夫妻の同居を証明する書類（公共料金領収書等）',
    '夫婦の交流を証明する写真等',
  ],
}
