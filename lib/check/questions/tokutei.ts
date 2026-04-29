// 特定技能签证题库
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '你持有的是特定技能 1 号还是 2 号？',
    why: '两者要求和上限完全不同',
    learnMore:
      '特定技能 1 号有通算 5 年的在日上限，达到上限后必须离开日本或变更为其他在留资格。特定技能 2 号目前对象行业正在扩大，无在日期间上限。',
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
      '特定技能 1 号的 5 年上限是从首次取得该在留资格起累计计算的。接近 5 年时需要提前确认是否有资格转 2 号或其他在留资格。',
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
        fixHint: '5 年上限不可续签。立即咨询专家评估转 2 号或其他在留资格。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '你所属的登録支援機関（注册支援机构）是否还在正常运营？',
    why: '支援機関停止运营会直接影响续签',
    learnMore:
      '如果支援機関停止运营，需要立刻联系雇主确认是否已更换支援機関，或由雇主自行支援。这种情况需要立刻咨询专家。',
    options: [
      { label: '正常运营中', next: 'q4' },
      {
        label: '停止运营或不确定',
        next: 'q4',
        severity: 'red',
        triggerLabel: '登録支援機関停止运营',
        selfFix: false,
        fixHint: '立即与雇主确认是否更换支援機関，并咨询专家。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '你的特定技能测试合格证是否仍在有效期内？',
    why: '技能合格证是特定技能资格的基础',
    learnMore:
      '特定技能测试合格证的有效期根据考试种类不同而不同。已过期的需要确认是否需要重新考试。具体情况咨询专家判断。',
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
    learnMore: '住民税欠缴是续签被拒的高频原因，申请前必须补缴完并取得完缴证明。',
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
    learnMore: '断保期间需要说明原因。换工作空窗期需要及时加入国民健康保险。',
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
    why: '从事范围外工作是特定技能续签的最大待确认事项',
    learnMore:
      '特定技能签证只允许在认定的特定业务范围内工作。从事范围外的工作（尤其是单纯作业）不仅影响续签，还可能被认定为不法就劳。发现这种情况需要立刻咨询专家。',
    options: [
      { label: '是，工作内容一致', next: 'q8' },
      {
        label: '有从事范围外工作',
        next: 'q8',
        severity: 'red',
        triggerLabel: '存在认定范围外工作',
        selfFix: false,
        fixHint: '可能被认定为不法就劳。立即咨询专家并调整工作内容。',
      },
    ],
  },
  q8: {
    id: 'q8',
    text: '过去是否有刑事违规或严重交通违规记录？',
    why: '违规记录直接影响续签审查',
    learnMore: '有违规记录需要向专家说明具体情况进行评估，不要隐瞒。',
    options: [
      { label: '没有', next: 'q9' },
      {
        label: '有',
        next: 'q9',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint: '必须向专家详细说明并准备相关法律文件。',
      },
    ],
  },
  q9: {
    id: 'q9',
    text: '护照有效期距今是否还有 6 个月以上？',
    why: '护照必须在续签申请期间有效',
    learnMore: '先去中国驻日大使馆续签护照再办在留续签，两者可以同步进行。',
    options: [
      { label: '是', next: 'q10' },
      {
        label: '不足 6 个月',
        next: 'q10',
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint: '先办护照换发，再申请在留续签。',
      },
    ],
  },

  // === Q10-Q14：第 6 天专业人士反馈新增的 5 个合规维度 ===
  q10: {
    id: 'q10',
    text: '除了交通违规，你过去 5 年内有没有罚金、停止令、軽犯罪法処分等任何处分？',
    why: '入管会调取所有处分记录（警察 + 行政），不限于交通',
    learnMore:
      '常被忽视的范围：軽犯罪法処分、商店扒窃、迷惑防止条例違反、行政罚金、不法滞在记录、入管警告等。即使最终不起诉、罚金缴清，也会留在数据库中。如不确定可申请「犯罪歴証明書」查询。',
    options: [
      { label: '完全没有', next: 'q11' },
      {
        label: '有过罚金或軽犯罪法処分',
        next: 'q11',
        severity: 'yellow',
        triggerLabel: '过去 5 年内有罚金或軽犯罪法処分',
        selfFix: false,
        fixHint:
          '罚金 / 軽犯罪法処分本身不致命，但隐瞒被查到后果严重。在申请书附 1 份说明书：何时何地何事 / 缴清证明 / 已无再犯。建议由专家过一遍措辞。',
      },
      {
        label: '有过行政停止令 / 不法滞在 / 入管警告',
        next: 'q11',
        severity: 'red',
        triggerLabel: '存在行政停止令、不法滞在或入管警告记录',
        selfFix: false,
        fixHint:
          '入管视角下这是待确认信号。不要自行递签。请尽快和专家面谈。',
      },
      { label: '不确定', next: 'q11' },
    ],
  },
  q11: {
    id: 'q11',
    text: '过去 3 年里，你在日本以外累计居住了多久？',
    why: '特定技能要求在认定雇主处实际工作，长期不在日是待确认',
    learnMore:
      '入管通过出入国記録核查实际在日时间。特定技能签证持有者长期不在日往往意味着脱离雇主、未實際从事认定业务。出入国記録可在最近的入国管理局窗口当场打印。',
    options: [
      { label: '不到 3 个月', next: 'q12' },
      {
        label: '3 - 6 个月',
        next: 'q12',
        severity: 'yellow',
        triggerLabel: '过去 3 年累计离日 3-6 个月',
        selfFix: true,
        fixHint:
          '附 1 份「出入国理由説明書」（探亲 / 培训等）+ 出入国記録 + 雇主出具的「該当期間休暇承認書」。',
      },
      {
        label: '6 个月以上',
        next: 'q12',
        severity: 'red',
        triggerLabel: '过去 3 年累计离日 6 个月以上',
        selfFix: false,
        fixHint:
          '入管会质疑「为什么持有特定技能签证却长期不在日」。请专家介入，准备雇主侧的説明 + 海外期间薪资仍由日本公司支付的证明。',
      },
    ],
  },
  q12: {
    id: 'q12',
    text: '你能不能从市役所拿到过去 3 年完整的「課税証明書」？',
    why: '課税証明書是入管核查纳税与収入的必备材料',
    learnMore:
      '課税証明書由住所所在地市役所「税務課」发行。技能実習从特定技能切换的，请确认当年的课税情况是否能开出。可以提前去市役所窗口确认。',
    options: [
      { label: '能完整拿到 3 年', next: 'q13' },
      {
        label: '其中 1 年开不出',
        next: 'q13',
        severity: 'yellow',
        triggerLabel: '部分年度課税証明書开不出',
        selfFix: false,
        fixHint:
          '附 1 份「不開可説明書」+ 该年度的源泉徴収票 / 雇用証明等替代材料。',
      },
      {
        label: '多个年份开不出',
        next: 'q13',
        severity: 'red',
        triggerLabel: '多个年度課税証明書无法取得',
        selfFix: false,
        fixHint:
          '与日本税务系统断链严重。请专家介入，评估如何重建税务证明。',
      },
      { label: '不确定', next: 'q13' },
    ],
  },
  q13: {
    id: 'q13',
    text: '过去 3 年内，你在日本的住民票登録是否持续有效，没有因搬家、出国等出现脱漏？',
    why: '住民票履歴反映你在日的合法居住连续性',
    learnMore:
      '正常情况：搬家做転入届、海外长期出差不办「海外転出届」就保留登録。脱漏发生在：办了海外転出届但回来后没及时転入、搬家后忘办転入届超 14 天等。',
    options: [
      { label: '没有脱漏', next: 'q14' },
      {
        label: '有过短期脱漏（1 个月内已补办）',
        next: 'q14',
        severity: 'yellow',
        triggerLabel: '住民票登録曾短期脱漏',
        selfFix: true,
        fixHint:
          '短期脱漏通常可在市役所窗口补办时由职员在新「住民票」上注明。续签时附说明并主动提交即可。',
      },
      {
        label: '有过长期脱漏 / 不法滞在期',
        next: 'q14',
        severity: 'red',
        triggerLabel: '住民票出现长期脱漏或不法滞在期间',
        selfFix: false,
        fixHint:
          '住民票断档对应「不在日本」或「未办手续」状态，入管会与出入国記録交叉对比。请专家介入处理。',
      },
      { label: '不确定', next: 'q14' },
    ],
  },
  q14: {
    id: 'q14',
    text: '你目前的雇用契約是哪种形态？',
    why: '特定技能要求与认定雇主之间的直接雇用关系',
    learnMore:
      '特定技能 1 号原则上禁止派遣（农业・渔业除外）；2 号根据業種有不同规定。業務委託 / フリーランス 不符合特定技能资格要件。',
    options: [
      { label: '正社員（与认定雇主直接雇用）', next: null },
      {
        label: '有期限契約社員（与认定雇主直接雇用）',
        next: null,
        severity: 'yellow',
        triggerLabel: '有期限契約社員（特定技能）',
        selfFix: false,
        fixHint:
          '准备：契約更新通知书、雇主对未来更新的承诺函。续签可能拿到与契約期限相同的在留期间。',
      },
      {
        label: '派遣社員（除农业・渔业外）',
        next: null,
        severity: 'red',
        triggerLabel: '派遣形态雇用（特定技能 1 号原则禁止）',
        selfFix: false,
        fixHint:
          '特定技能 1 号原则禁止派遣（仅农业・渔业例外）。请尽快和专家面谈，确认是否需要更换雇主。',
      },
      {
        label: '業務委託 / フリーランス',
        next: null,
        severity: 'red',
        triggerLabel: '業務委託形态（不符合特定技能要件）',
        selfFix: false,
        fixHint:
          '特定技能要求与认定雇主的直接雇用关系，業務委託不符合资格要件。可能被认定为不法就労。立即和专家面谈。',
      },
      {
        label: '目前無職 / 离职中',
        next: null,
        severity: 'red',
        triggerLabel: '当前無職状态',
        selfFix: false,
        fixHint:
          '特定技能签证基础是与认定雇主的雇用关系，无在职状态时无法续签。请评估「特定活動」過渡 / 尽快入职新认定雇主。',
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
