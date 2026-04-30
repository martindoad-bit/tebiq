import type { DecisionCard } from './types'

const commonBoundary =
  '此卡只整理公开资料和一般流程，不替代窗口答复或专家判断。涉及身份、税务、社保或雇佣责任时，按官方窗口和专家确认结果执行。'

export const FALLBACK_DECISION_CARDS: DecisionCard[] = [
  {
    id: null,
    slug: 'pension-switch-company-dormant',
    title: '公司休眠后，新工作入职前，要不要切国民年金',
    cardType: 'decision_card',
    answerLevel: 'L3',
    status: 'needs_review',
    visaTypes: ['technical_humanities_international', 'management'],
    trigger: {
      summary: '原公司休眠或退社，新公司手续尚未完成，区役所询问国民年金/国保切换。',
    },
    userState: {
      summary: '身份切换等待中，会社社保空档可能存在。',
    },
    decisionOptions: [
      { label: '先去区役所确认国民年金/国保', detail: '用于覆盖会社社保空档，保留窗口记录。' },
      { label: '等新会社手续完成', detail: '如果空档较长，后续可能需要补缴或解释。' },
      { label: '不处理', detail: '不建议作为默认动作；后续证明材料会变薄。' },
    ],
    recommendedAction:
      '先向居住地区役所确认国民年金/国保切换或待处理方式；新会社社保完成后，再用会社记录更新。',
    whyNotOtherOptions: [
      { label: '为什么不是只等新会社', detail: '等待期不确定时，社保/年金记录会出现空档。' },
      { label: '为什么不是直接判断影响签证', detail: '影响判断要结合在留资格、退社日、新雇佣合同和缴纳记录。' },
    ],
    steps: [
      { label: '今天', detail: '带在留卡、退社/休眠相关记录、现地址信息去区役所确认。' },
      { label: '入职后', detail: '保存会社社保加入记录和給与明細。' },
      { label: '递交前', detail: '把空档期间的说明和缴纳记录放入材料包。' },
    ],
    relatedDocuments: [
      { label: '在留カード' },
      { label: '退社日或会社休眠相关记录' },
      { label: '国民年金/国保窗口记录' },
      { label: '新雇佣合同' },
    ],
    relatedCheckDimensions: [
      { label: 'social_insurance' },
      { label: 'employment_status' },
      { label: 'work_change' },
    ],
    sourceRefs: [
      {
        title: '日本年金機構 国民年金の加入手続き',
        url: 'https://www.nenkin.go.jp/',
        source_grade: 'A',
      },
      {
        title: '市区町村 国民健康保険 手続き案内',
        source_grade: 'B',
      },
    ],
    sourceGrade: 'A',
    lastVerifiedAt: '2026-04-30',
    requiresReviewAfterDays: 90,
    requiresReview: true,
    expertHandoff: {
      required_when: ['在留資格変更中', '退社日和入社日之间空档较长', '已有未纳记录'],
      expert_type: '行政書士 / 社労士',
    },
    bodyMarkdown:
      '先把社保/年金空档处理成可说明、可证明的状态。TEBIQ 不判断该空档对在留结果的影响，只提示应保留哪些材料。',
    boundaryNote: commonBoundary,
  },
  {
    id: null,
    slug: 'management-office-relocation',
    title: '经营管理签办公室搬迁',
    cardType: 'workflow',
    answerLevel: 'L3',
    status: 'needs_review',
    visaTypes: ['management'],
    trigger: {
      summary: '经营管理签持有人更换办公室、租约或实际营业地点。',
    },
    userState: {
      summary: '办公室是经营管理签常被核对的经营实态材料。',
    },
    decisionOptions: [
      { label: '先确认新办公室条件', detail: '独立性、用途、合同名义、营业可用性。' },
      { label: '同步整理法人地址手续', detail: '公司登记地址、税务、银行、社保等记录需要一致。' },
    ],
    recommendedAction:
      '按“新办公室可用性确认 → 租约/登记 → 税务和社保地址更新 → 递交材料归档”的顺序处理。',
    whyNotOtherOptions: [
      { label: '为什么不是先递交解释', detail: '没有租约和使用实态时，解释材料缺少支撑。' },
      { label: '为什么不是只改邮寄地址', detail: '经营管理关注实际经营场所，不只是收件地址。' },
    ],
    steps: [
      { label: '前提确认', detail: '新地址是否允许法人办公和业务使用。' },
      { label: '手续路径', detail: '租约、登记、税务、社保、银行和许可相关地址逐项更新。' },
      { label: '材料归档', detail: '保留新旧租约、照片、平面图、地址变更证明。' },
    ],
    relatedDocuments: [
      { label: '办公室租赁契约' },
      { label: '登記事項証明書' },
      { label: '税务署/都税事務所地址变更控' },
    ],
    relatedCheckDimensions: [
      { label: 'management_office_lease_vs_owned' },
      { label: 'management_business_substance' },
    ],
    sourceRefs: [
      {
        title: '出入国在留管理庁 経営・管理 在留資格',
        url: 'https://www.moj.go.jp/isa/',
        source_grade: 'A',
      },
    ],
    sourceGrade: 'A',
    lastVerifiedAt: '2026-04-30',
    requiresReviewAfterDays: 90,
    requiresReview: true,
    expertHandoff: {
      required_when: ['办公室用途不清楚', '共享/虚拟办公室', '搬迁接近更新期'],
      expert_type: '行政書士',
    },
    bodyMarkdown:
      '经营管理签的办公室搬迁不是单一地址变更。重点是证明经营场所持续存在、合同和公司记录一致。',
    boundaryNote: commonBoundary,
  },
  {
    id: null,
    slug: 'address-change-order',
    title: '公司地址 / 法人地址 / 在留卡地址变更顺序',
    cardType: 'workflow',
    answerLevel: 'L2',
    status: 'needs_review',
    visaTypes: ['management', 'technical_humanities_international'],
    trigger: {
      summary: '个人住址、法人地址、会社登记地址或在留卡地址同时发生变化。',
    },
    userState: {
      summary: '不同地址有不同窗口，顺序错误会造成材料不一致。',
    },
    decisionOptions: [
      { label: '个人住所变更', detail: '住民票和在留卡地址通常先在市区町村窗口处理。' },
      { label: '法人地址变更', detail: '公司登记和税务地址按法人手续处理。' },
      { label: '材料一致性检查', detail: '递交前检查合同、证明书、银行、税务记录是否一致。' },
    ],
    recommendedAction:
      '先区分“个人住址”和“法人/营业地址”，再按对应窗口逐项更新，最后做一次材料一致性检查。',
    whyNotOtherOptions: [
      { label: '为什么不能混在一起处理', detail: '个人在留卡地址和法人登记地址属于不同系统。' },
      { label: '为什么要做最终检查', detail: '递交材料中的地址不一致会增加补正说明成本。' },
    ],
    steps: [
      { label: '个人地址', detail: '迁入/迁出、住民票、在留卡背面地址。' },
      { label: '法人地址', detail: '登记、税务、社保、银行、许可。' },
      { label: '递交前', detail: '把各窗口控、证明书和合同按日期排序。' },
    ],
    relatedDocuments: [
      { label: '住民票' },
      { label: '在留カード' },
      { label: '登記事項証明書' },
      { label: '租赁契约' },
    ],
    relatedCheckDimensions: [
      { label: 'address_family' },
      { label: 'management_director_change_filing' },
    ],
    sourceRefs: [
      { title: '市区町村 住所変更手続き', source_grade: 'B' },
      { title: '法務局 商業登記 手続き案内', url: 'https://houmukyoku.moj.go.jp/', source_grade: 'A' },
    ],
    sourceGrade: 'A',
    lastVerifiedAt: '2026-04-30',
    requiresReviewAfterDays: 120,
    requiresReview: true,
    expertHandoff: {
      required_when: ['法人地址和营业地址不同', '更新期前后地址多次变化'],
      expert_type: '行政書士 / 司法書士',
    },
    bodyMarkdown:
      '先拆分地址类型，再处理窗口。TEBIQ 只帮助列顺序和材料，不判断个案最终影响。',
    boundaryNote: commonBoundary,
  },
  {
    id: null,
    slug: 'bring-parents-to-japan',
    title: '永住者带父母来日本长期养老',
    cardType: 'misconception',
    answerLevel: 'L4',
    status: 'needs_review',
    visaTypes: ['permanent_resident_preparation', 'other'],
    trigger: {
      summary: '永住者希望把父母长期接到日本养老。',
    },
    userState: {
      summary: '常见误解是“本人永住，所以父母也能长期留下”。',
    },
    decisionOptions: [
      { label: '短期探亲', detail: '通常按短期滞在目的整理材料。' },
      { label: '长期居住', detail: '没有面向所有永住者父母的一般稳定路径。' },
      { label: '特殊个案确认', detail: '高龄、单独抚养、医疗和经济依赖等情况需要专家确认。' },
    ],
    recommendedAction:
      '先按短期探亲路径确认；如果目标是长期居住，整理父母年龄、健康、经济依赖、国内亲属和抚养事实，再做专家确认。',
    whyNotOtherOptions: [
      { label: '为什么不是直接申请家族滞在', detail: '父母通常不属于家族滞在的常规对象。' },
      { label: '为什么不能只看本人永住', detail: '父母的在留路径要看父母本人目的和制度条件。' },
    ],
    steps: [
      { label: '先确认目的', detail: '短期探亲、医疗、照护、长期居住要分开。' },
      { label: '准备事实材料', detail: '父母状况、国内亲属、经济来源、住宿和照护安排。' },
      { label: '专家确认', detail: '长期居住目标不要只靠网络模板。' },
    ],
    relatedDocuments: [
      { label: '亲属关系证明' },
      { label: '经济负担资料' },
      { label: '住宿安排资料' },
    ],
    relatedCheckDimensions: [
      { label: 'long_term_residence' },
      { label: 'address_family' },
    ],
    sourceRefs: [
      { title: '外務省 短期滞在査証 案内', url: 'https://www.mofa.go.jp/', source_grade: 'A' },
      { title: '出入国在留管理庁 在留資格一覧', url: 'https://www.moj.go.jp/isa/', source_grade: 'A' },
    ],
    sourceGrade: 'A',
    lastVerifiedAt: '2026-04-30',
    requiresReviewAfterDays: 90,
    requiresReview: true,
    expertHandoff: {
      required_when: ['目标是长期居住', '父母高龄或医疗照护情况复杂', '国内抚养关系需要证明'],
      expert_type: '行政書士',
    },
    bodyMarkdown:
      '这不是“永住者自动带父母长期居住”的问题。更接近个案路径确认，必须先区分短期访问和长期居住。',
    boundaryNote: commonBoundary,
  },
  {
    id: null,
    slug: 'employment-violation-risk-chain',
    title: '老板雇错签证的人，员工或亲属会不会被牵连',
    cardType: 'risk_chain',
    answerLevel: 'L4',
    status: 'needs_review',
    visaTypes: ['technical_humanities_international', 'specified_skilled_worker', 'spouse', 'other'],
    trigger: {
      summary: '公司存在雇佣不符合在留资格活动范围的员工，担心本人或亲属被牵连。',
    },
    userState: {
      summary: '需要区分雇主责任、本人活动、亲属关系和是否参与安排。',
    },
    decisionOptions: [
      { label: '本人只是同公司员工', detail: '先确认本人工作内容是否符合自身在留资格。' },
      { label: '本人参与招聘/管理', detail: '保留指示链、岗位职责和是否知情的记录。' },
      { label: '亲属关系', detail: '亲属身份本身不是同一事实，需要看是否参与或受益。' },
    ],
    recommendedAction:
      '先把“雇主行为、本人行为、亲属关系、是否参与安排”分开记录；不要把别人的违规自动套到自己身上。',
    whyNotOtherOptions: [
      { label: '为什么不是直接判断受影响', detail: '需要看本人是否参与、是否知情、是否有自己的在留资格问题。' },
      { label: '为什么要保留材料', detail: '后续如被询问，事实链比口头解释更有用。' },
    ],
    steps: [
      { label: '发生了什么', detail: '记录雇佣对象、岗位、时间、谁安排、谁知情。' },
      { label: '与你本人有关', detail: '本人岗位、在留资格、工作内容、管理职责。' },
      { label: '一般分开看的部分', detail: '亲属身份、同公司关系和第三人的在留问题。' },
      { label: '必须确认', detail: '本人参与招聘、管理或文件准备时，转专家。' },
    ],
    relatedDocuments: [
      { label: '雇佣契约' },
      { label: '岗位说明' },
      { label: '指示邮件/聊天记录' },
    ],
    relatedCheckDimensions: [
      { label: 'employment_status' },
      { label: 'violations' },
      { label: 'work_change' },
    ],
    sourceRefs: [
      { title: '出入国在留管理庁 不法就労防止', url: 'https://www.moj.go.jp/isa/', source_grade: 'A' },
    ],
    sourceGrade: 'A',
    lastVerifiedAt: '2026-04-30',
    requiresReviewAfterDays: 60,
    requiresReview: true,
    expertHandoff: {
      required_when: ['本人参与招聘或管理', '已有入管/警察/労基署询问', '本人工作内容也不清楚'],
      expert_type: '行政書士 / 社労士',
    },
    bodyMarkdown:
      '这类问题要拆成责任链。TEBIQ 不判断责任成立，只帮助把事实关系拆清楚。',
    boundaryNote: commonBoundary,
  },
]
