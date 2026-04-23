export type Severity = 'red' | 'yellow'
export type Verdict = 'red' | 'yellow' | 'green'

export interface QuestionOption {
  label: string
  next: string | null
  severity?: Severity
  triggerLabel?: string
  fixHint?: string
  selfFix?: boolean
}

export interface Question {
  id: string
  text: string
  why: string
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
  selfFix: boolean
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
    why: '换工作会影响入管对你"工作连续性"的判断',
    options: [
      { label: '是', next: '2' },
      { label: '否', next: '4' },
    ],
  },
  '2': {
    id: '2',
    text: '换工作后 14 天内是否向入管局申报了"所属机关变更"？',
    why: '不在 14 天内申报会留下违规记录',
    options: [
      { label: '是', next: '3' },
      {
        label: '否',
        next: '3',
        severity: 'red',
        triggerLabel: '换工作后未在 14 天内向入管申报',
        selfFix: false,
        fixHint: '"所属机关变更届出"是入管法明确规定的义务，超过 14 天未提交即属违规。我建议你立即去最近的入管局窗口补办（或在线 e-届出系统提交），并附一份情况说明书解释延误原因。主动补报本身不致命，最怕的是隐瞒。',
      },
    ],
  },
  '3': {
    id: '3',
    text: '离职到入职的空窗期是否超过 3 个月？',
    why: '长期无业可能被认定丧失在留资格',
    options: [
      { label: '否', next: '4' },
      {
        label: '是',
        next: '4',
        severity: 'red',
        triggerLabel: '离职到入职空窗超过 3 个月',
        selfFix: false,
        fixHint: '在留资格"技人国"以稳定就业为前提。无业超过 3 个月入管会怀疑你已不再符合资格条件。请先准备一份从离职到入职的详细经历说明（含面试记录、求职活动），由我们书士判断要不要先用"特定活动"签证过渡。',
      },
    ],
  },
  '4': {
    id: '4',
    text: '过去 1 年是否按时申报并缴纳了住民税？',
    why: '住民税是入管最常核查的项',
    options: [
      { label: '是', next: '5' },
      {
        label: '否',
        next: '5',
        severity: 'red',
        triggerLabel: '住民税未按时申报或缴纳',
        selfFix: false,
        fixHint: '住民税没缴是被拒签最常见的硬伤。先去市役所开"纳税证明书"和"课税证明书"看现状，欠多少补多少，留好收据。补缴时间晚一点没关系，重点是申请前必须结清。如果情况复杂，建议让书士帮你写一份"诚实改正"说明附在材料里。',
      },
    ],
  },
  '5': {
    id: '5',
    text: '目前是否有任何未缴的住民税或罚款？',
    why: '任何欠款都会在审查时暴露',
    options: [
      { label: '否', next: '6' },
      {
        label: '是',
        next: '6',
        severity: 'red',
        triggerLabel: '存在未缴税款或罚款',
        selfFix: false,
        fixHint: '入管会直接查询你的税务记录，任何未缴金额都会被发现。务必在递签前结清所有欠税/欠款，并把缴纳收据作为附件提交。如果金额较大需要分期，要由书士判断如何在材料中说明。',
      },
    ],
  },
  '6': {
    id: '6',
    text: '续签期间是否全程参加了厚生年金和健康保险（没有断缴）？',
    why: '社保参保情况已纳入审查标准',
    options: [
      { label: '是', next: '7' },
      {
        label: '否',
        next: '7',
        severity: 'red',
        triggerLabel: '社保（厚生年金 / 健康保险）有断缴',
        selfFix: false,
        fixHint: '从 2020 年起入管已经把社保参保情况纳入审查重点。先去年金事务所或区役所补办手续，再准备一份说明书解释断保原因——换工作的过渡期是常见且可接受的理由，建议由我们帮你写。',
      },
    ],
  },
  '7': {
    id: '7',
    text: '上次续签申请是否在在留期限到期日之前提交的？',
    why: '期满后才提交=不法残留，是最严重的红色风险',
    options: [
      { label: '是', next: '8' },
      {
        label: '否',
        next: '8',
        severity: 'red',
        triggerLabel: '上次续签在期限届满后才提交（不法残留）',
        selfFix: false,
        fixHint: '在留期限届满后才提交属于不法残留，哪怕只超 1 天也会留记录。这种情况风险很高，请不要自行递签。请尽快和我们书士面谈，评估特定活动签证或重新出入境的可行性，每多拖一天处理空间都会变小。',
      },
    ],
  },
  '8': {
    id: '8',
    text: '是否有任何违规记录？',
    why: '入管会调取你的所有违规记录',
    options: [
      { label: '否', next: '10' },
      { label: '是', next: '9' },
    ],
  },
  '9': {
    id: '9',
    text: '违规的性质是什么？',
    why: '不同性质的违规对续签影响差距很大',
    options: [
      {
        label: '轻微交通违规（普通超速等）',
        next: '10',
        severity: 'yellow',
        triggerLabel: '存在轻微交通违规记录',
        selfFix: true,
        fixHint: '轻微交通违规一般不致命，但隐瞒比承认更危险——入管会调取你的违规记录。在申请书上主动说明并附违反通告书副本即可，不需要书士介入。',
      },
      {
        label: '刑事违规或严重交通违规（酒驾 / 无证）',
        next: '10',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint: '酒驾、无证驾驶、刑事案件入管极其敏感，可能直接导致拒签。这种情况必须由书士介入，我们会判断如何附上法院文书或处分决定书，并设计陈述方式将影响降到最低。',
      },
    ],
  },
  '10': {
    id: '10',
    text: '雇主公司目前是否正常经营？',
    why: '雇主公司经营状况影响雇用证明的可信度',
    options: [
      { label: '是', next: '11' },
      { label: '否 / 不确定', next: '10a' },
    ],
  },
  '10a': {
    id: '10a',
    text: '公司目前是停业 / 破产，还是规模缩小但仍在运营？',
    why: '公司缩小 ≠ 停业，处理方式完全不同',
    options: [
      {
        label: '仍在运营（只是规模缩小）',
        next: '11',
        severity: 'yellow',
        triggerLabel: '雇主公司经营规模收缩',
        selfFix: false,
        fixHint: '公司缩小本身不致命，但要主动证明你的岗位仍然稳定存在。建议由书士帮你整理最新的决算书、雇用合同更新版，必要时附一份公司说明书解释经营情况，避免入管单方面怀疑。',
      },
      {
        label: '已停业 / 破产',
        next: '11',
        severity: 'red',
        triggerLabel: '雇主公司已停业或破产',
        selfFix: false,
        fixHint: '停业/破产意味着你提交的雇用证明已经无效。请尽快寻找新雇主完成入职，再申请续签。如果短期内找不到，我们可以评估"特定活动"签证作为过渡，争取时间。',
      },
    ],
  },
  '11': {
    id: '11',
    text: '过去 1 年税前年收入是否在 250 万日元以上？',
    why: '收入是入管判断"稳定生活基础"的关键指标',
    options: [
      { label: '是', next: '12' },
      { label: '否', next: '11a' },
    ],
  },
  '11a': {
    id: '11a',
    text: '是否有其他收入补充（配偶收入、储蓄证明等）？',
    why: '主收入不足时可以用其他证明补强',
    options: [
      {
        label: '有',
        next: '12',
        severity: 'yellow',
        triggerLabel: '主收入低于 250 万日元，但有其他收入补充',
        selfFix: false,
        fixHint: '主收入低但有补充资源是可以救的。需要准备配偶在职/收入证明、银行存款余额（建议 100 万日元以上）、未来收入预期说明书等，整体证明生活基础稳定。建议让书士帮你设计这套补充材料的组合方式。',
      },
      {
        label: '没有',
        next: '12',
        severity: 'red',
        triggerLabel: '年收入低于 250 万日元，且无其他收入补充',
        selfFix: false,
        fixHint: '年收入过低且无任何补充时，入管会严重怀疑你的工作稳定性。建议先和雇主沟通调薪，或申请短期续签（1 年）争取时间。我们书士可以帮你构造一份详细的"今后收入计划书"提升通过率。',
      },
    ],
  },
  '12': {
    id: '12',
    text: '护照有效期在签证申请提交后是否还剩 6 个月以上？',
    why: '部分入管窗口要求护照剩余 6 个月以上才受理',
    options: [
      { label: '是', next: null },
      { label: '否', next: '12a' },
    ],
  },
  '12a': {
    id: '12a',
    text: '是否已经开始办理护照更新？',
    why: '是否在办决定要不要等护照下来再递签',
    options: [
      {
        label: '已在办',
        next: null,
        severity: 'yellow',
        triggerLabel: '护照即将过期，已在更新中',
        selfFix: true,
        fixHint: '建议等新护照拿到手后再递签。审查中途收到新护照可能要求补交，会延长 1-2 个月——多等几周比折腾来折腾去更稳。',
      },
      {
        label: '还没有',
        next: null,
        severity: 'red',
        triggerLabel: '护照即将过期，尚未办理更新',
        selfFix: false,
        fixHint: '部分入管窗口会要求护照剩余 6 个月以上才受理。请立即去中国大使馆/总领馆办理护照换发（约 2-4 周），新护照到手后再提交续签申请，避免来回折腾。',
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
        selfFix: opt.selfFix ?? false,
      })
    }
  }
  const hasRed = triggered.some(t => t.severity === 'red')
  const hasYellow = triggered.some(t => t.severity === 'yellow')
  const verdict: Verdict = hasRed ? 'red' : hasYellow ? 'yellow' : 'green'
  return { verdict, triggered }
}

// 当前路径剩余最长深度，用于动态进度条
export function longestPathFrom(
  qid: string | null,
  visited: Set<string> = new Set(),
): number {
  if (qid === null) return 0
  if (visited.has(qid)) return 0
  const next = new Set(visited)
  next.add(qid)
  const q = QUESTIONS[qid]
  if (!q) return 0
  let max = 0
  for (const opt of q.options) {
    const sub = longestPathFrom(opt.next, next)
    if (sub > max) max = sub
  }
  return 1 + max
}

export interface ChecklistItem {
  name: string
  where: string
  note: string
}

export interface ChecklistGroup {
  category: string
  items: ChecklistItem[]
}

export const GIJINKOKU_CHECKLIST: ChecklistGroup[] = [
  {
    category: '本人身份材料',
    items: [
      {
        name: '在留资格更新申请书',
        where: '入管局官网下载或窗口领取',
        note: '务必使用最新版（每年可能更新）',
      },
      {
        name: '证件照 1 张',
        where: '证件照机或照相馆',
        note: '4cm×3cm，3 个月内拍摄，白底无装饰',
      },
      {
        name: '护照原件 + 复印件',
        where: '自有',
        note: '复印首页 + 全部签证页和出入境章',
      },
      {
        name: '在留卡原件 + 复印件',
        where: '自有',
        note: '正反两面都要复印',
      },
    ],
  },
  {
    category: '雇主公司材料',
    items: [
      {
        name: '雇用合同书',
        where: '公司人事部',
        note: '现行版本，含工资明细',
      },
      {
        name: '在职证明书',
        where: '公司人事部',
        note: '含职位、入职日、工作内容、年收入，须公司印章',
      },
      {
        name: '公司登记事项证明书',
        where: '法务局',
        note: '履歴事項全部証明書，3 个月以内',
      },
      {
        name: '公司概要',
        where: '公司主页打印或人事部',
        note: '会社案内 / 概要书 / 主页打印件均可',
      },
      {
        name: '决算报告书',
        where: '公司财务部',
        note: '最近一期，含损益表',
      },
      {
        name: '法定调书合计表',
        where: '公司财务部',
        note: '最近一期副本',
      },
    ],
  },
  {
    category: '工作内容证明',
    items: [
      {
        name: '业务内容说明书',
        where: '自行撰写或人事部协助',
        note: '详述工作内容、与所学专业的关联性',
      },
      {
        name: '名片或工作邮件签名',
        where: '自有',
        note: '证明实际职位',
      },
    ],
  },
  {
    category: '纳税与社保材料',
    items: [
      {
        name: '住民税课税证明书',
        where: '市役所 / 区役所',
        note: '直近 1 年分，含金额明细',
      },
      {
        name: '住民税纳税证明书',
        where: '市役所 / 区役所',
        note: '直近 1 年分，证明已缴',
      },
      {
        name: '源泉徴収票',
        where: '公司提供',
        note: '直近 1 年分',
      },
      {
        name: '健康保险证',
        where: '自有',
        note: '复印正反两面',
      },
      {
        name: '年金缴纳记录',
        where: '年金事务所或 ねんきんネット',
        note: '年金定期便或网站截图均可',
      },
    ],
  },
  {
    category: '学历证明（首次变更或入管要求时）',
    items: [
      {
        name: '大学毕业证书 + 成绩单',
        where: '母校开具',
        note: '中国学历需附日文翻译件',
      },
      {
        name: '日语能力证书',
        where: '自有',
        note: '如有 N1 / N2 合格证书可附上',
      },
    ],
  },
]
