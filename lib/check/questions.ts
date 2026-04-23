export type Answer = 'yes' | 'no'
export type Severity = 'red' | 'yellow'
export type Verdict = 'red' | 'yellow' | 'green'

export interface Question {
  id: number
  text: string
  dangerAnswer: Answer
  severity: Severity
  triggerLabel: string
  fixHint: string
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '续签期间是否全程在同一家公司工作？',
    dangerAnswer: 'no',
    severity: 'yellow',
    triggerLabel: '在留期间换过工作',
    fixHint: '换工作本身不致命，但必须在14天内向入管局提交"所属机关变更届出"。如果忘了提交，需要补办并写情况说明。建议在续签前确认提交记录。',
  },
  {
    id: 2,
    text: '过去续签期内，是否有超过1个月没有雇主的空窗期？',
    dangerAnswer: 'yes',
    severity: 'red',
    triggerLabel: '出现过超过1个月的无业空窗期',
    fixHint: '在留资格"技人国"以稳定就业为前提。超过3个月无活动入管可能视为资格丧失。需要由书士判断是否需要先做特定活动签证过渡，或在续签申请时附详细经历说明书。',
  },
  {
    id: 3,
    text: '过去1年是否按时申报并缴纳了住民税？',
    dangerAnswer: 'no',
    severity: 'red',
    triggerLabel: '住民税未按时申报或缴纳',
    fixHint: '住民税未缴是续签被拒的最常见硬伤。立即去市役所开具"纳税证明书"和"课税证明书"确认现状，如有未缴需先全额补缴并保留收据，必要时附"诚实改正"说明。',
  },
  {
    id: 4,
    text: '目前是否有任何未缴纳的税款（住民税、所得税、消费税等）？',
    dangerAnswer: 'yes',
    severity: 'red',
    triggerLabel: '存在未缴税款',
    fixHint: '入管在审查时会直接查询纳税记录。任何未缴金额都会被发现。务必在递交申请前结清所有欠税，并保留缴纳收据作为材料附件。',
  },
  {
    id: 5,
    text: '续签期间是否全程加入了厚生年金和健康保险？',
    dangerAnswer: 'no',
    severity: 'red',
    triggerLabel: '社保（厚生年金/健康保险）未全程参保',
    fixHint: '从2020年起入管将社保参保情况纳入审查。如有断保期间需先到年金事务所/区役所补办手续，并准备说明书解释原因（如换工作过渡期等）。',
  },
  {
    id: 6,
    text: '是否曾经超过在留期限居住过哪怕一天（包括等待续签结果期间）？',
    dangerAnswer: 'yes',
    severity: 'red',
    triggerLabel: '存在不法残留记录',
    fixHint: '即使只超过1天也属于不法残留，会留下记录并极大增加被拒签或强制离境风险。这种情况必须由书士面谈后判断处理方案，不要自行递签。',
  },
  {
    id: 7,
    text: '是否有任何违规或犯罪记录（交通违规除外）？',
    dangerAnswer: 'yes',
    severity: 'red',
    triggerLabel: '存在违规或犯罪记录',
    fixHint: '入管会调取你的违规记录。即使是轻微案件也需要在申请时主动说明并提交相关法院文书或处分决定书，由书士判断如何陈述对结果影响最小。',
  },
  {
    id: 8,
    text: '你目前的雇主公司是否仍在正常经营（未停业、未破产）？',
    dangerAnswer: 'no',
    severity: 'red',
    triggerLabel: '雇主公司经营异常',
    fixHint: '如果公司已停业或濒临破产，提交的雇用证明在审查阶段会被识破。需要尽快寻找新雇主并完成入职后再申请续签，或由书士评估临时使用"特定活动"过渡的可行性。',
  },
  {
    id: 9,
    text: '过去1年的年收入是否在200万日元以上？',
    dangerAnswer: 'no',
    severity: 'yellow',
    triggerLabel: '年收入低于200万日元',
    fixHint: '收入并非硬性门槛但偏低会引起入管对"工作稳定性"的怀疑。准备一份详细的雇用合同和未来收入预期说明（如试用期结束后涨薪），有助于打消审查疑虑。',
  },
  {
    id: 10,
    text: '护照有效期，在签证申请提交后还剩6个月以上吗？',
    dangerAnswer: 'no',
    severity: 'yellow',
    triggerLabel: '护照剩余有效期不足6个月',
    fixHint: '虽然不是绝对禁止，但部分入管窗口会要求先更新护照。建议先去中国大使馆/总领馆办理护照换发，再提交续签申请，避免来回折腾。',
  },
]

export interface JudgeResult {
  verdict: Verdict
  triggered: Question[]
}

export function judge(answers: Record<number, Answer>): JudgeResult {
  const triggered = QUESTIONS.filter(q => answers[q.id] === q.dangerAnswer)
  const hasRed = triggered.some(q => q.severity === 'red')
  const hasYellow = triggered.some(q => q.severity === 'yellow')
  const verdict: Verdict = hasRed ? 'red' : hasYellow ? 'yellow' : 'green'
  return { verdict, triggered }
}

export const GIJINKOKU_CHECKLIST: { category: string; items: string[] }[] = [
  {
    category: '本人身份材料',
    items: [
      '在留资格更新/变更申请书（入管官网下载最新版）',
      '证件照 1 张（4cm×3cm，3 个月内拍摄，无背景色要求白底）',
      '护照原件 + 复印件（首页 + 全部签证页）',
      '在留卡原件 + 正反面复印件',
    ],
  },
  {
    category: '雇主公司材料',
    items: [
      '雇用合同书（雇用契約書）复印件',
      '在职证明书（在職証明書，含职位、入职日期、工作内容、年收入）',
      '公司登记事项证明书（履歴事項全部証明書，3 个月以内）',
      '公司概要说明书（会社案内 / 会社概要 / 公司主页打印件）',
      '最新一期决算报告书（決算報告書）或年度财务报表',
      '法定调书合计表（法定調書合計表）副本',
    ],
  },
  {
    category: '工作内容证明',
    items: [
      '业务内容说明书（业务范围、与所学专业的关联性）',
      '名片或工作邮件签名（证明实际职位）',
    ],
  },
  {
    category: '纳税与社保材料',
    items: [
      '住民税课税证明书（直近 1 年分，去市役所开具）',
      '住民税纳税证明书（直近 1 年分）',
      '源泉徴収票（直近 1 年分，公司提供）',
      '健康保险证复印件（正反面）',
      '年金定期便 或 ねんきんネット 缴纳记录截图',
    ],
  },
  {
    category: '学历证明（首次变更或入管要求时）',
    items: [
      '大学毕业证书 + 成绩单（中国学历需附日文翻译件）',
      '日本语能力证明（如有 N1/N2 合格证书可附上）',
    ],
  },
]
