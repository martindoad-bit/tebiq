// 经营管理签证题库（2025-10 新规）
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '你的公司注册资本金是否在 3,000 万日元以上？',
    why: '2025 年 10 月 16 日起资本金要求从 500 万提高到 3000 万',
    learnMore:
      '2025 年 10 月 16 日起资本金 3000 万是硬性要求。现持有者有至 2028 年 10 月的过渡期，但过渡期内续签时入管局会综合评判经营状况。建议尽早增资。[待书士审核]',
    options: [
      { label: '是，3000 万以上', next: 'q2' },
      {
        label: '不足 3000 万（现持有者，2028 年 10 月前过渡期）',
        next: 'q2',
        severity: 'yellow',
        triggerLabel: '资本金不足 3000 万（过渡期内）',
        selfFix: false,
        fixHint:
          '2028 年 10 月前为过渡期，但续签审查时入管会综合考量经营状况。建议尽早增资到 3000 万，并准备增资计划书。',
      },
      {
        label: '不足 3000 万（新申请）',
        next: 'q2',
        severity: 'red',
        triggerLabel: '资本金不足 3000 万（新规硬性要求）',
        selfFix: false,
        fixHint:
          '新申请必须满足 3000 万资本金。请与书士商讨增资方案、出资人结构及合规材料。',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: '公司是否有 1 名以上的常勤职员（日本人 / 永住者 / 定住者等身份类外国人）？',
    why: '新规要求必须雇用符合条件的常勤职员',
    learnMore:
      '常勤职员必须是：日本人、特别永住者、永住者、日本人配偶者等、永住者配偶者等、定住者。技人国等就劳系签证的外国人不算在内。在籍出向、派遣、请负也不算。[待书士审核]',
    options: [
      { label: '是，有符合条件的常勤职员', next: 'q3' },
      {
        label: '没有，或只有就劳系签证的外国人',
        next: 'q3',
        severity: 'red',
        triggerLabel: '缺少符合身份要求的常勤职员',
        selfFix: false,
        fixHint:
          '必须雇用至少 1 名身份类（日本人 / 永住 / 定住 / 配偶等）常勤职员。请与书士确认雇用结构合规化方案。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '申请人本人或常勤职员中是否有人达到 JLPT N2 以上的日语能力？',
    why: '新规要求日语能力，申请人或员工满足其一即可',
    learnMore:
      '日语要求可以通过：JLPT N2 以上、BJT 400 点以上、日本大学毕业、在日 20 年以上等方式满足。注意：这里的常勤职员范围和第 2 题不同，就劳系外国人也可以满足日语要求。[待书士审核]',
    options: [
      { label: '是，申请人或员工有 N2 以上', next: 'q4' },
      {
        label: '都没有',
        next: 'q4',
        severity: 'red',
        triggerLabel: '日语能力（N2 等）不满足',
        selfFix: false,
        fixHint:
          '日语能力为新规硬性要求，可由申请人或员工满足。请评估考试 / 学历替代方案。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '申请人本人是否有 3 年以上经营管理实务经验，或硕士以上学位？',
    why: '新规要求申请人具备经营能力证明',
    learnMore:
      '经营实务经验 3 年可以包括：准备期间持有特定活动签证的时期。海外取得的学位也算。需要具体证明材料。[待书士审核]',
    options: [
      { label: '是，有 3 年以上经验或硕士学位', next: 'q5' },
      {
        label: '没有',
        next: 'q5',
        severity: 'red',
        triggerLabel: '缺少经营实务经验或硕士以上学位',
        selfFix: false,
        fixHint:
          '需要提供经营经验证明（前职雇用合同、工资记录等）或学位证书。两者满足其一即可。',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: '事业计划书是否已经过税理士等第三方专家的确认？',
    why: '新规要求事业计划书须有专家确认',
    learnMore:
      '第三方专家包括：税理士、中小企业诊断士、公认会计士等。他们需要确认事业计划的具体性、合理性和可实现性。没有专家确认的事业计划书新规下会直接被退件。[待书士审核]',
    options: [
      { label: '是，已有专家确认', next: 'q6' },
      {
        label: '没有或不确定',
        next: 'q6',
        severity: 'yellow',
        triggerLabel: '事业计划书未经第三方专家确认',
        selfFix: false,
        fixHint:
          '请委托税理士 / 中小企业诊断士对事业计划书进行确认并出具签字版本。',
      },
    ],
  },
  q6: {
    id: 'q6',
    text: '公司是否有实体办公室（非自宅兼办公室）？',
    why: '新规下自宅兼办公室原则上不被接受',
    learnMore:
      '新规下自宅兼办公室原则上不被接受。需要有独立的事务所，并能提供租赁合同、室内照片、表札等证明。[待书士审核]',
    options: [
      { label: '是，有独立实体办公室', next: 'q7' },
      {
        label: '使用自宅兼办公室',
        next: 'q7',
        severity: 'red',
        triggerLabel: '使用自宅兼办公室',
        selfFix: false,
        fixHint:
          '请尽快租赁独立办公空间，准备契约书、室内照片、表札等材料。',
      },
    ],
  },
  q7: {
    id: 'q7',
    text: '公司法人税是否按时缴纳？',
    why: '法人税缴纳是经营管理续签的基础审查项目',
    learnMore: '法人税欠缴是续签被拒的直接原因。申请前必须补缴完毕。[待书士审核]',
    options: [
      { label: '是', next: 'q8' },
      {
        label: '有欠缴',
        next: 'q8',
        severity: 'red',
        triggerLabel: '公司法人税有欠缴',
        selfFix: false,
        fixHint: '申请前必须全部结清并取得納税証明書。',
      },
    ],
  },
  q8: {
    id: 'q8',
    text: '申请人个人住民税是否按时缴纳？',
    why: '个人税款记录也是续签审查项目',
    learnMore: '个人住民税欠缴和法人税欠缴都会影响续签。申请前全部结清。[待书士审核]',
    options: [
      { label: '是', next: 'q9' },
      {
        label: '有欠缴',
        next: 'q9',
        severity: 'red',
        triggerLabel: '申请人个人住民税有欠缴',
        selfFix: false,
        fixHint: '申请前必须全部结清并取得納税証明書。',
      },
    ],
  },
  q9: {
    id: 'q9',
    text: '近一年内是否有长期（超过 3 个月）不在日本的情况？',
    why: '经营管理签证要求申请人实际在日本经营',
    learnMore:
      '经营管理签证要求申请人实际在日本从事经营活动。长期出国是新规下的审查重点，需要充分说明理由和期间的经营活动证明。[待书士审核]',
    options: [
      { label: '没有', next: 'q10' },
      {
        label: '有较长期不在日本',
        next: 'q10',
        severity: 'yellow',
        triggerLabel: '近一年内长期（>3 个月）不在日本',
        selfFix: false,
        fixHint: '需准备出境理由说明书 + 出境期间经营活动证明。',
      },
    ],
  },
  q10: {
    id: 'q10',
    text: '护照有效期距今是否还有 6 个月以上？',
    why: '护照必须在续签申请期间有效',
    learnMore: '先去中国驻日使馆续签护照再办在留续签，可以同步进行。[待书士审核]',
    options: [
      { label: '是', next: null },
      {
        label: '不足 6 个月',
        next: null,
        severity: 'yellow',
        triggerLabel: '护照剩余有效期不足 6 个月',
        selfFix: true,
        fixHint:
          '建议先去中国驻日大使馆 / 总领馆办理护照换发（约 2-4 周），新护照到手后再提交续签。',
      },
    ],
  },
}

export const keieiBank: QuizBank = {
  visa: 'keiei',
  visaName: '経営・管理',
  startId: 'q1',
  questions: Q,
  infoHref: '/keiei',
  infoLabel: '查看 2025 年 10 月新规完整说明',
  ctaLabel: '预约书士咨询经营管理签证续签',
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '法人登記事項証明書（履歴事項全部証明書）',
    '决算書（直近 1 期分以上）',
    '事業計画書（税理士等第三方確認済）',
    '事務所の賃貸借契約書 + 室内外照片',
    '常勤職員的雇用契約書 / 賃金台帳',
    '法人税納税証明書 + 個人住民税納税証明書',
    '日本語能力証明（JLPT N2 等）',
    '経営経験を証明する書類 / 学位証明書',
  ],
}
