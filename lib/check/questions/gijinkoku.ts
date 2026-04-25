// 技人国（技術・人文知識・国際業務）题库 + 判定逻辑
//
// 唯一来源 — Block 2 已把数据从 lib/check/questions.ts 整体迁过来，
// 旧文件已删除。
//
// 通用类型集中在 lib/check/types.ts；这里 re-export 让消费者一处搞定 import。
import type {
  AnsweredItem,
  JudgeResult,
  QuizBank,
  QuizQuestion,
  TriggeredItem,
  Verdict,
} from '../types'

export type {
  AnsweredItem,
  JudgeResult,
  Severity,
  TriggeredItem,
  Verdict,
} from '../types'

// 旧代码用 Question / QuestionOption 命名 — 兼容别名
export type Question = QuizQuestion
export type QuestionOption = QuizQuestion['options'][number]

export const START_ID = '1'

// 题目措辞 v2：彻底小白化，避免书面术语
// 题目编号保持不变以兼容 lib/check/summary.ts 的 SEVERITY_PRIORITY
//   '4' → 住民税  '7' → 上次续签时间（不法残留）
//   '2' → 换工作申报  '6' → 社保
// 旧 Q5（未缴税款）已合并入 Q4
export const QUESTIONS: Record<string, Question> = {
  '1': {
    id: '1',
    text: '你现在这份在留卡的有效期内，有没有换过公司？',
    why: '换公司本身不影响续签，但要确认是否做了正确的申报',
    learnMore:
      '换公司是常见情况，本身完全合法。关键是入管局要求换公司后 14 天内做一个申报。如果你是自营业、经营管理签证或长期留学结束后的状态，请选「不适用」。[待书士审核]',
    options: [
      { label: '换过', next: '2' },
      { label: '没换过', next: '4' },
      { label: '不适用（自营业等）', next: '4' },
    ],
  },
  '2': {
    id: '2',
    text: '换公司后 14 天内，你有没有通知过入管局？',
    why: '14 天内申报是法律规定的义务',
    learnMore:
      '这个通知在日语里叫「契約機関に関する届出」。如果你不知道自己有没有提交过，选「没有」。可以登录入管局的在线系统（e-Notification）查询，或者带在留卡去最近的入管局窗口问。[待书士审核]',
    options: [
      { label: '14 天内通知了', next: '3' },
      {
        label: '没有',
        next: '3',
        severity: 'red',
        triggerLabel: '换公司后未在 14 天内通知入管局',
        selfFix: false,
        fixHint:
          '「契約機関に関する届出」是入管法明确规定的义务，超过 14 天未提交即属违规。建议立即通过入管局的在线 e-Notification 系统补报，或前往最近的入管局窗口办理，并附一份情况说明书解释延误原因。主动补报本身不致命，最怕的是隐瞒。',
      },
      {
        label: '不确定',
        next: '3',
        severity: 'red',
        triggerLabel: '不确定是否完成换工作申报',
        selfFix: false,
        fixHint:
          '不确定就当作没报。请尽快登录 e-Notification 系统查询提交记录，或致电入管インフォメーションセンター（0570-013904）确认。如确认未报，立刻补办并附说明书。',
      },
    ],
  },
  '3': {
    id: '3',
    text: '你离开原公司和入职新公司之间，相隔超过 3 个月吗？',
    why: '长期无工作期间入管局会关注就业稳定性',
    learnMore:
      '空窗期超过 3 个月不等于一定被拒，但需要提供合理的说明（求职记录、进修证明等）。如果你是主动跳槽，通常 1-2 个月内找到新工作没问题。[待书士审核]',
    options: [
      { label: '没有超过', next: '4' },
      {
        label: '超过了',
        next: '4',
        severity: 'red',
        triggerLabel: '换工作空窗期超过 3 个月',
        selfFix: false,
        fixHint:
          '在留资格「技人国」以稳定就业为前提，无业超过 3 个月入管会怀疑你已不再符合资格条件。请准备一份从离职到入职的详细经历说明（含面试记录、求职活动），由书士判断要不要先用「特定活动」签证过渡。',
      },
      { label: '不适用', next: '4' },
    ],
  },
  '4': {
    id: '4',
    text: '你的住民税是否全部缴清，没有欠缴？',
    why: '欠税是续签被拒的高频原因',
    learnMore:
      '住民税是住在日本就必须缴纳的地方税。如果你是正社员，通常公司每月从工资里自动扣缴（叫「特别征收」），这种情况一般不会欠缴。如果不确定，可以去住所所在区役所的税務課窗口查询，或者打住民票证明时顺便问。[待书士审核]',
    options: [
      { label: '全部缴清', next: '6' },
      {
        label: '有欠缴',
        next: '6',
        severity: 'red',
        triggerLabel: '住民税未按时申报或缴纳',
        selfFix: false,
        fixHint:
          '住民税没缴是被拒签最常见的硬伤。先去市役所开「纳税证明书」和「课税证明书」看现状，欠多少补多少，留好收据。补缴时间晚一点没关系，重点是申请前必须结清。如果情况复杂，建议让书士帮你写一份「诚实改正」说明附在材料里。',
      },
      {
        label: '不确定',
        next: '6',
        severity: 'yellow',
        triggerLabel: '不确定住民税缴纳情况',
        selfFix: true,
        fixHint:
          '不确定就当作存在风险。带在留卡去住所所在区役所税務課窗口查询，5 分钟即可出具納税証明書/課税証明書。结清后留好收据。',
      },
    ],
  },
  '6': {
    id: '6',
    text: '过去一年，你的健康保险和年金有没有断过？',
    why: '社保连续性是续签审查项目',
    learnMore:
      '如果你是正社员，公司会自动帮你加入社会保険（健康保险+厚生年金），这种情况一般不会断。但换工作空窗期间，你需要自己去市役所加入国民健康保险，否则这段时间就是「无保险」状态。如果你中间有换工作的空窗期，而且没去办理国保，就算「断过」。[待书士审核]',
    options: [
      { label: '没有断过', next: '7' },
      {
        label: '有断过',
        next: '7',
        severity: 'red',
        triggerLabel: '社保（厚生年金 / 健康保险）有断缴',
        selfFix: false,
        fixHint:
          '从 2020 年起入管已经把社保参保情况纳入审查重点。先去年金事务所或区役所补办手续，再准备一份说明书解释断保原因——换工作的过渡期是常见且可接受的理由，建议由书士帮你写。',
      },
      {
        label: '不确定',
        next: '7',
        severity: 'yellow',
        triggerLabel: '不确定社保参保情况',
        selfFix: true,
        fixHint:
          '不确定就去年金事務所查询「年金加入歴」、去区役所查询「国民健康保険資格」。带在留卡 5-10 分钟可出具，确认是否有空白期。',
      },
    ],
  },
  '7': {
    id: '7',
    text: '你的上一次续签，是不是在在留卡到期日之前递交的？',
    why: '到期前递交是合法申请，审查期间可以合法等待',
    learnMore:
      '审查期间（通常 1-3 个月）是合法的等待期，叫做「特例期间」，不算超期居住。但如果到期日已过还没递交申请，就属于违法居住，后果严重。[待书士审核]',
    options: [
      { label: '到期前递交', next: '8' },
      {
        label: '超期才递交',
        next: '8',
        severity: 'red',
        triggerLabel: '上次续签在期限届满后才提交（不法残留）',
        selfFix: false,
        fixHint:
          '在留期限届满后才提交属于不法残留，哪怕只超 1 天也会留记录。这种情况风险很高，请不要自行递签。请尽快和书士面谈，评估特定活动签证或重新出入境的可行性，每多拖一天处理空间都会变小。',
      },
      { label: '是首次续签，之前没有续签过', next: '8' },
    ],
  },
  '8': {
    id: '8',
    text: '你有没有刑事违规记录，或者严重的交通违规？',
    why: '违规记录会影响续签审查',
    learnMore:
      '严重违规包括：任何刑事违规（即使只是罚款）、酒驾、无证驾驶、重大交通事故肇事逃逸等。普通超速、一般交通违反影响较小。不确定是否严重可以联系书士评估。[待书士审核]',
    options: [
      { label: '没有', next: '10' },
      { label: '有', next: '9' },
    ],
  },
  '9': {
    id: '9',
    text: '你的违规属于哪种？',
    why: '不同等级违规对续签影响不同',
    learnMore:
      '入管会调取你的违规记录。轻微违规（普通超速、违规停车）影响较小；刑事违规（即使只是罚金）和严重交通违规（酒驾、无证、肇事逃逸）会直接影响审查结果。[待书士审核]',
    options: [
      {
        label: '轻微交通违规（普通超速、违规停车等）',
        next: '10',
        severity: 'yellow',
        triggerLabel: '存在轻微交通违规记录',
        selfFix: true,
        fixHint:
          '轻微交通违规一般不致命，但隐瞒比承认更危险——入管会调取你的违规记录。在申请书上主动说明并附违反通告书副本即可，不需要书士介入。',
      },
      {
        label: '刑事违规或严重交通违规（酒驾 / 无证等）',
        next: '10',
        severity: 'red',
        triggerLabel: '存在刑事违规或严重交通违规记录',
        selfFix: false,
        fixHint:
          '酒驾、无证驾驶、刑事案件入管极其敏感，可能直接导致拒签。这种情况必须由书士介入，我们会判断如何附上法院文书或处分决定书，并设计陈述方式将影响降到最低。',
      },
    ],
  },
  '10': {
    id: '10',
    text: '你现在公司还在正常运营吗？',
    why: '雇主状况影响续签审查',
    learnMore:
      '如果你不确定公司的经营状况，可以观察：工资是否按时发放、是否有大规模裁员、客户业务是否正常。不确定的话可以先问同事或 HR。\n\n⚠️ 2026 年 4 月 15 日新规（已生效）：如果你的雇主属于类别 3 或 4（非上市中小企业），且工作以日语对人业务为主（翻译、营业、前台接待等），续签时需额外提交：①所属机构代表者申报书 ②JLPT N2 以上等语言能力证明。IT 工程师等技术岗位是否需要目前尚不明确，建议提前向公司人事确认。[待书士审核]',
    options: [
      { label: '正常运营', next: '12' },
      { label: '不正常', next: '11' },
      {
        label: '不确定',
        next: '12',
        severity: 'yellow',
        triggerLabel: '不确定雇主公司经营状况',
        selfFix: true,
        fixHint:
          '建议直接问 HR 是否能继续开具在职证明、最近的決算書是否能拿到。如果连这些都拿不到，可能要考虑换雇主。',
      },
    ],
  },
  '11': {
    id: '11',
    text: '公司具体是什么情况？',
    why: '公司问题的严重程度决定风险等级',
    learnMore:
      '公司规模缩小但仍在正常经营通常影响有限，需要提供最新决算报告书证明公司财务状况。公司已经停业或破产的情况下，原则上技人国续签会受到严重影响，需要立刻咨询书士。[待书士审核]',
    options: [
      {
        label: '规模缩小但还在运营',
        next: '12',
        severity: 'yellow',
        triggerLabel: '雇主公司经营规模收缩',
        selfFix: false,
        fixHint:
          '公司缩小本身不致命，但要主动证明你的岗位仍然稳定存在。建议由书士帮你整理最新的决算书、雇用合同更新版，必要时附一份公司说明书解释经营情况，避免入管单方面怀疑。',
      },
      {
        label: '已经停业或破产',
        next: '12',
        severity: 'red',
        triggerLabel: '雇主公司已停业或破产',
        selfFix: false,
        fixHint:
          '停业 / 破产意味着你提交的雇用证明已经无效。请尽快寻找新雇主完成入职，再申请续签。如果短期内找不到，可以评估「特定活动」签证作为过渡，争取时间。',
      },
    ],
  },
  '12': {
    id: '12',
    text: '你过去一年的税前年收入是多少？',
    why: '年收是续签审查的重要参考指标',
    learnMore:
      '这里的年收是税前总收入，包括基本工资+奖金+各种津贴。不确定的话可以看最近一份源泉徴収票（每年 1 月公司发的那张纸）上面的「支払金額」。技人国没有硬性最低年收要求，但入管局要求「不低于从事同等工作的日本人」。250 万日元以下需要准备额外说明材料。[待书士审核]',
    options: [
      { label: '250 万日元以上', next: '13' },
      {
        label: '200-250 万日元',
        next: '13',
        severity: 'yellow',
        triggerLabel: '年收入处于 200-250 万日元区间',
        selfFix: false,
        fixHint:
          '这个区间不是硬伤，但入管会综合判断。建议准备配偶在职/收入证明、银行存款余额、未来收入预期说明书等补充材料，证明生活基础稳定。',
      },
      {
        label: '200 万日元以下',
        next: '13',
        severity: 'yellow',
        triggerLabel: '年收入低于 200 万日元',
        selfFix: false,
        fixHint:
          '年收较低时入管会综合判断。先和雇主沟通调薪或改善劳动条件；同时准备配偶在职/收入证明、储蓄证明（建议 100 万日元以上）、今后收入计划书等组合材料，提升通过率。',
      },
    ],
  },
  '13': {
    id: '13',
    text: '你现在的护照，有效期还剩多少时间？',
    why: '护照必须在续签申请期间保持有效',
    learnMore:
      '建议：如果护照 1 年内到期，先去中国驻日大使馆/总领事馆续签护照（约需 1-2 个月），再办在留续签。两者可以同步进行但要注意时间安排。[待书士审核]',
    options: [
      { label: '6 个月以上', next: null },
      {
        label: '不足 6 个月',
        next: null,
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint:
          '部分入管窗口要求护照剩余 6 个月以上才受理。建议立即去中国驻日大使馆/总领馆办理护照换发（约 2-4 周），新护照到手后再提交续签申请。',
      },
      {
        label: '已过期或即将过期（1 个月内）',
        next: null,
        severity: 'red',
        triggerLabel: '护照已过期或即将过期',
        selfFix: false,
        fixHint:
          '护照已过期或即将过期是高风险情况。请立即联系中国驻日大使馆/总领馆紧急办理护照换发，并向书士咨询是否需要提前递交「再入国不要」声明等补救材料。',
      },
    ],
  },
}

// === Backward-compat helpers — same signatures as old lib/check/questions.ts ===

/**
 * 严重度聚合：任一 red → red，任一 yellow → yellow，否则 green。
 * 旧调用方传 history 即可，无需 bank。
 */
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

/** 当前路径剩余最长深度（用于动态进度条）。 */
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

// === New unified-engine surface ===

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
  // QUESTIONS 类型与 QuizQuestion 在结构上兼容
  questions: QUESTIONS as unknown as Record<string, QuizQuestion>,
  materials: GIJINKOKU_MATERIALS_SUMMARY,
}
