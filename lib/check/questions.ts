export type Severity = 'red' | 'yellow'
export type Verdict = 'red' | 'yellow' | 'green'

export interface QuestionOption {
  label: string
  next: string | null
  severity?: Severity
  triggerLabel?: string
  fixHint?: string
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
}

export interface AnsweredItem {
  questionId: string
  optionIndex: number
}

export interface TriggeredItem {
  id: string
  severity: Severity
  triggerLabel: string
  fixHint: string
}

export interface JudgeResult {
  verdict: Verdict
  triggered: TriggeredItem[]
}

export const START_ID = '1'

export const QUESTIONS: Record<string, Question> = {
  '1': {
    id: '1',
    text: '续签期间是否换过工作？',
    options: [
      { label: '是', next: '2' },
      { label: '否', next: '4' },
    ],
  },
  '2': {
    id: '2',
    text: '换工作后 14 天内是否向入管局申报了"所属机关变更"？',
    options: [
      { label: '是', next: '3' },
      {
        label: '否',
        next: '3',
        severity: 'red',
        triggerLabel: '换工作后未在 14 天内向入管申报',
        fixHint: '"所属机关变更届出"是入管法明确规定的义务，超过 14 天未提交即属违规。立即去最近的入管局补办（或在线 e-届出系统提交），并附情况说明书解释延误原因。',
      },
    ],
  },
  '3': {
    id: '3',
    text: '离职到入职的空窗期是否超过 3 个月？',
    options: [
      { label: '否', next: '4' },
      {
        label: '是',
        next: '4',
        severity: 'red',
        triggerLabel: '离职到入职空窗超过 3 个月',
        fixHint: '在留资格"技人国"以稳定就业为前提。超过 3 个月无活动入管可能视为资格丧失。需要由书士判断是否需要先做特定活动签证过渡，或在续签申请时附详细经历说明书。',
      },
    ],
  },
  '4': {
    id: '4',
    text: '过去 1 年是否按时申报并缴纳了住民税？',
    options: [
      { label: '是', next: '5' },
      {
        label: '否',
        next: '5',
        severity: 'red',
        triggerLabel: '住民税未按时申报或缴纳',
        fixHint: '住民税未缴是续签被拒的最常见硬伤。立即去市役所开具"纳税证明书"和"课税证明书"确认现状，如有未缴需先全额补缴并保留收据，必要时附"诚实改正"说明。',
      },
    ],
  },
  '5': {
    id: '5',
    text: '目前是否有任何未缴的住民税或罚款？',
    options: [
      { label: '否', next: '6' },
      {
        label: '是',
        next: '6',
        severity: 'red',
        triggerLabel: '存在未缴税款或罚款',
        fixHint: '入管在审查时会直接查询纳税记录。任何未缴金额都会被发现。务必在递交申请前结清所有欠税/欠款，并保留缴纳收据作为材料附件。',
      },
    ],
  },
  '6': {
    id: '6',
    text: '续签期间是否全程参加了厚生年金和健康保险（没有断缴）？',
    options: [
      { label: '是', next: '7' },
      {
        label: '否',
        next: '7',
        severity: 'red',
        triggerLabel: '社保（厚生年金 / 健康保险）有断缴',
        fixHint: '从 2020 年起入管将社保参保情况纳入审查。如有断保期间需先到年金事务所/区役所补办手续，并准备说明书解释原因（如换工作过渡期等）。',
      },
    ],
  },
  '7': {
    id: '7',
    text: '上次续签申请是否在在留期限到期日之前提交的？',
    options: [
      { label: '是', next: '8' },
      {
        label: '否',
        next: '8',
        severity: 'red',
        triggerLabel: '上次续签在期限届满后才提交（不法残留）',
        fixHint: '即使只超过 1 天也属于不法残留，会留下记录并极大增加被拒签或强制离境风险。这种情况必须由书士面谈后判断处理方案，不要自行递签。',
      },
    ],
  },
  '8': {
    id: '8',
    text: '是否有任何违规记录？',
    options: [
      { label: '否', next: '10' },
      { label: '是', next: '9' },
    ],
  },
  '9': {
    id: '9',
    text: '违规的性质是什么？',
    options: [
      {
        label: '轻微交通违规（普通超速等）',
        next: '10',
        severity: 'yellow',
        triggerLabel: '存在轻微交通违规记录',
        fixHint: '轻微交通违规一般不致命，但需要在申请时主动说明并附违反通告书副本。隐瞒比承认风险更高，因为入管会调取记录。',
      },
      {
        label: '刑事违规或严重交通违规（酒驾 / 无证）',
        next: '10',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        fixHint: '入管对酒驾/无证驾驶/刑事案件极其敏感，可能直接拒签。必须由书士判断如何陈述、附哪些法院文书或处分决定书，将影响降到最低。',
      },
    ],
  },
  '10': {
    id: '10',
    text: '雇主公司目前是否正常经营？',
    options: [
      { label: '是', next: '11' },
      { label: '否 / 不确定', next: '10a' },
    ],
  },
  '10a': {
    id: '10a',
    text: '公司目前是停业 / 破产，还是规模缩小但仍在运营？',
    options: [
      {
        label: '仍在运营（只是规模缩小）',
        next: '11',
        severity: 'yellow',
        triggerLabel: '雇主公司经营规模收缩',
        fixHint: '公司收缩本身不致命，但要准备最新的决算书和雇用合同更新版，证明你的岗位仍然稳定存在。',
      },
      {
        label: '已停业 / 破产',
        next: '11',
        severity: 'red',
        triggerLabel: '雇主公司已停业或破产',
        fixHint: '停业/破产意味着原雇用证明已经无效。需要尽快寻找新雇主并完成入职后再申请续签，或由书士评估临时使用"特定活动"过渡的可行性。',
      },
    ],
  },
  '11': {
    id: '11',
    text: '过去 1 年税前年收入是否在 250 万日元以上？',
    options: [
      { label: '是', next: '12' },
      { label: '否', next: '11a' },
    ],
  },
  '11a': {
    id: '11a',
    text: '是否有其他收入补充（配偶收入、储蓄证明等）？',
    options: [
      {
        label: '有',
        next: '12',
        severity: 'yellow',
        triggerLabel: '主收入低于 250 万日元，但有其他收入补充',
        fixHint: '准备配偶在职/收入证明、银行存款余额证明（建议 100 万日元以上）等附件，证明整体生活基础稳定。同时附上未来收入预期说明（如试用期结束涨薪、副业合同等）。',
      },
      {
        label: '没有',
        next: '12',
        severity: 'red',
        triggerLabel: '年收入低于 250 万日元，且无其他收入补充',
        fixHint: '收入过低且无补充会让入管严重怀疑工作稳定性。建议先与雇主沟通调薪，或由书士帮助构造一份详细的"今后收入计划书"，说明短期内如何提升至稳定水平。',
      },
    ],
  },
  '12': {
    id: '12',
    text: '护照有效期在签证申请提交后是否还剩 6 个月以上？',
    options: [
      { label: '是', next: null },
      { label: '否', next: '12a' },
    ],
  },
  '12a': {
    id: '12a',
    text: '是否已经开始办理护照更新？',
    options: [
      {
        label: '已在办',
        next: null,
        severity: 'yellow',
        triggerLabel: '护照即将过期，已在更新中',
        fixHint: '建议等新护照拿到手后再递签，避免审查中途要求补交，否则可能延长 1-2 个月。',
      },
      {
        label: '还没有',
        next: null,
        severity: 'red',
        triggerLabel: '护照即将过期，尚未办理更新',
        fixHint: '部分入管窗口会要求先更新护照才受理。立即去中国大使馆/总领馆办理护照换发（约 2-4 周），再提交续签申请，避免来回折腾。',
      },
    ],
  },
}

export function judge(history: AnsweredItem[]): JudgeResult {
  const triggered: TriggeredItem[] = []
  for (const item of history) {
    const q = QUESTIONS[item.questionId]
    if (!q) continue
    const opt = q.options[item.optionIndex]
    if (opt?.severity && opt.triggerLabel && opt.fixHint) {
      triggered.push({
        id: item.questionId,
        severity: opt.severity,
        triggerLabel: opt.triggerLabel,
        fixHint: opt.fixHint,
      })
    }
  }
  const hasRed = triggered.some(t => t.severity === 'red')
  const hasYellow = triggered.some(t => t.severity === 'yellow')
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
