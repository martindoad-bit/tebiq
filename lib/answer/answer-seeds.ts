import type { DecisionAnswerLevel } from '@/lib/decision/types'
import type { IntentDomain, IntentType, PreferredTemplate } from './intent-router'
import type { ActionAnswer, AnswerReviewStatus, AnswerSection, AnswerSource, AnswerType, ExpertHandoff } from './types'

export interface AnswerSeed {
  slug: string
  title: string
  question?: string
  keywords: string[]
  answerType?: AnswerType
  answerLevel: DecisionAnswerLevel
  reviewStatus?: AnswerReviewStatus
  sourceGrade?: string
  summary: string
  sections: AnswerSection[]
  nextSteps: string[]
  sources: AnswerSource[]
  relatedLinks?: Array<{ title: string; href: string }>
  boundaryNote?: string
  firstScreenAnswer?: string
  whyNotSimpleAnswer?: string
  expertHandoff?: ExpertHandoff
  testQueries?: string[]
  actionAnswer?: ActionAnswer
  intent?: string
  intentType?: IntentType
  domain?: IntentDomain
  currentStatus?: string
  targetStatus?: string
  preferredTemplate?: PreferredTemplate
  mustNotMatch?: string[]
  priority?: number
}

export const FREQUENT_QA_SEEDS: AnswerSeed[] = [
  {
    slug: 'tokutei-to-work-visa',
    title: '特定技能 1 号转工作签前先确认什么',
    keywords: ['特定技能', '1号', '一号', '转工作签', '转技人国', '工作签', '人文签'],
    answerLevel: 'L3',
    summary:
      '特定技能 1 号转技人国等工作签，核心不是“能不能转”，而是学历/经历、工作内容和雇佣条件是否符合新在留资格。',
    sections: [
      {
        heading: '先看新工作内容',
        body: '如果新工作仍是特定技能领域内的现场作业，通常不等于技人国工作。若新岗位是翻译、贸易、系统、企划、管理等专业/人文/国际业务内容，才进入下一步确认。',
      },
      {
        heading: '再看学历或经验',
        body: '技人国通常需要相关学历，或足够年数的相关实务经验。学历、专业、成绩证明、过去职务证明会成为判断材料。',
      },
      {
        heading: '不要只看公司是否愿意雇用',
        body: '雇佣合同只是材料之一。入管还会看岗位内容、工资、公司业务和本人条件是否相互对应。',
      },
    ],
    nextSteps: [
      '取得新岗位的雇用契約書和業務内容説明書。',
      '整理学历证明、成绩证明、过去工作证明。',
      '确认新岗位是否需要先申请在留資格変更許可。',
    ],
    sources: [
      { title: '出入国在留管理庁 在留資格変更許可申請', url: 'https://www.moj.go.jp/isa/' },
    ],
    relatedLinks: [{ title: '续签材料准备检查', href: '/check' }],
  },
  {
    slug: 'residence-tax-late-pr',
    title: '住民税晚交和永住准备',
    keywords: ['住民税', '晚交', '滞纳', '滞納', '永住', '纳税', '納税'],
    answerLevel: 'L3',
    summary:
      '住民税晚交需要先确认是否已经完纳、是否有督促记录、证明书上如何显示，再决定申请时点和说明材料。',
    sections: [
      {
        heading: '先确认事实',
        body: '到市区町村取得課税証明書、納税証明書，并确认是否存在未纳、延迟缴纳、督促状或分期记录。',
      },
      {
        heading: '晚交不等于自动不能申请',
        body: 'TEBIQ 不判断个案结果。一般准备上，需要把完纳记录、晚交原因和之后持续按期缴纳的记录整理出来。',
      },
      {
        heading: '如果仍有未纳',
        body: '先处理未纳和证明书显示问题。未处理前直接提交，材料解释会很弱。',
      },
    ],
    nextSteps: [
      '取得最近年度的課税証明書和納税証明書。',
      '确认是否有未纳、分期或督促记录。',
      '如有延迟记录，准备时间线和完纳凭证。',
    ],
    sources: [
      { title: '市区町村 住民税 納税証明書', source_grade: 'B' },
      { title: '出入国在留管理庁 永住許可ガイドライン', url: 'https://www.moj.go.jp/isa/' },
    ],
  },
  {
    slug: 'company-no-social-insurance',
    title: '公司没有给我上社保时先确认什么',
    keywords: ['社保', '社会保険', '厚生年金', '健康保険', '公司没给', '没有给我上', '年金'],
    answerLevel: 'L3',
    summary:
      '先确认你是否应加入会社社会保险，以及公司未办理期间你是否需要用国民年金/国保覆盖空档。',
    sections: [
      {
        heading: '先确认加入义务',
        body: '是否应加入会社社会保险，和公司规模、雇佣形态、工时、合同内容有关。不要只凭工资条判断。',
      },
      {
        heading: '确认空档',
        body: '如果会社未办理，年金/健康保险记录可能出现空档。可向年金事務所、市区町村窗口确认当前记录。',
      },
      {
        heading: '保存沟通记录',
        body: '与公司确认社保手续时，保存书面回复、工资条、雇佣合同、出勤记录。后续整理材料时会用到。',
      },
    ],
    nextSteps: [
      '向公司确认社会保険加入予定日和未加入理由。',
      '到年金事務所或市区町村确认记录。',
      '保留雇佣合同、工资条和公司书面回复。',
    ],
    sources: [
      { title: '日本年金機構 厚生年金保険 適用事業所', url: 'https://www.nenkin.go.jp/' },
    ],
  },
  {
    slug: 'residence-card-address-change',
    title: '搬家后在留卡地址要不要改',
    keywords: ['搬家', '搬住所', '地址', '住所', '在留卡地址', '在留カード住所', '住民票'],
    answerLevel: 'L2',
    summary:
      '搬家后通常需要在市区町村办理住所变更，并让在留卡背面地址随住民登记更新。',
    sections: [
      {
        heading: '先处理住民登记',
        body: '迁出/迁入或同区搬家手续在市区町村窗口办理。窗口会同时处理住民票相关信息。',
      },
      {
        heading: '在留卡地址',
        body: '在留卡背面地址通常也在市区町村窗口更新。保留办理后的住民票或窗口记录。',
      },
      {
        heading: '公司和银行地址',
        body: '在留卡地址更新后，再同步公司、银行、手机、保险等地址记录，避免后续文书寄错。',
      },
    ],
    nextSteps: [
      '带在留卡到新住所市区町村窗口办理。',
      '需要时取得住民票。',
      '同步公司、银行和保险地址。',
    ],
    sources: [
      { title: '出入国在留管理庁 住居地の届出', url: 'https://www.moj.go.jp/isa/' },
    ],
  },
  {
    slug: 'management-capital-shortage',
    title: '经营管理资本金不足时先看什么',
    keywords: ['经营管理', '経営管理', '资本金', '資本金', '不够', '500万', '新规', '公司设立'],
    answerLevel: 'L3',
    summary:
      '经营管理的资本金问题不能只看一个金额，还要同时看事业规模、办公室、人员、资金来源和持续运营记录。',
    sections: [
      {
        heading: '先确认当前路径',
        body: '是新申请、更新，还是变更到经营管理；不同场景材料重点不同。',
      },
      {
        heading: '资金来源要能说明',
        body: '资本金或投资金额需要能说明来源。银行流水、汇款记录、出资人关系和合同记录应归档。',
      },
      {
        heading: '不要只补一个数字',
        body: '经营管理还看办公室、业务实态、合同、收入、税务和雇佣等整体材料。',
      },
    ],
    nextSteps: [
      '整理出资来源、银行流水和汇款记录。',
      '确认办公室和业务实态材料是否完整。',
      '如接近申请或更新期，带材料找专家确认。',
    ],
    sources: [
      { title: '出入国在留管理庁 経営・管理 在留資格', url: 'https://www.moj.go.jp/isa/' },
    ],
  },
  {
    slug: 'student-to-gijinkoku',
    title: '留学生转技人国前先确认什么',
    keywords: ['留学生', '留学', '转人文', '转技人国', '工作签', '毕业', '内定'],
    answerLevel: 'L3',
    summary:
      '留学生转技人国，核心是学历、专业与岗位内容的对应关系，以及公司给出的雇佣条件。',
    sections: [
      {
        heading: '先看岗位内容',
        body: '岗位需要落在技术、人文知识、国际业务等范围内。单纯现场作业或与专业无关的工作，需要进一步确认。',
      },
      {
        heading: '学历和专业',
        body: '准备卒業見込証明書、成績証明書、履修科目、学位或専門士相关证明，用来说明专业与岗位的关系。',
      },
      {
        heading: '会社材料',
        body: '雇用契約書、会社概要、業務内容説明書、工资条件和入社予定日要一致。',
      },
    ],
    nextSteps: [
      '取得内定通知、雇用契約書和業務内容説明書。',
      '准备毕业相关证明和成绩材料。',
      '确认在留資格変更許可申请时点。',
    ],
    sources: [
      { title: '出入国在留管理庁 在留資格変更許可申請', url: 'https://www.moj.go.jp/isa/' },
    ],
  },
]
