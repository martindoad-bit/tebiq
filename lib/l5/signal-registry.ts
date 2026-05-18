// L5 Practice Signal Layer — Deep-Water Family Signal Registry
//
// WB-G: turn the 10 deep-water families into "signal assets" — give the
// user routing + preparation guidance, but never replace the scrivener's
// final judgement.
//
// Two-state schema:
//
//   • contentState='agent_drafted'  → public/well-known content the agent
//     can fully draft (DV hotlines, period rules, notice-reading
//     protocol, public obligation rules). Rendered as-is.
//
//   • contentState='needs_domain'  → practice-sensitive zones where the
//     procedure label vs review-substance split matters. The agent only
//     drafts a "preparation checklist for the scrivener" — no strategy,
//     no final judgement, no "you should". Rendered with a banner that
//     says "below are points for the professional to confirm".
//
// Once DOMAIN reviews a needs_domain entry, flip its contentState to
// 'domain_reviewed' and append sourceUrls.
//
// Source-of-truth boundary (DO NOT cross):
//   • This module does NOT carry final professional advice.
//   • The agent NEVER writes "你应该" / "建议你 X" / strategy content.
//   • prepareWhat is a fact-collection checklist, NOT a procedural plan.
//   • doNotDo entries are only public, well-known dangerous actions
//     (e.g. "不要在新许可下来之前开始新工作"); never bespoke strategy.
//
// Spec: docs/product/TEBIQ_1_0_TARGET_AND_WORKSTREAMS.md §6 WB-G,
//       Workstream 5 (10 families)
// Boundaries: docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md §3
// Companion: lib/consultation/deep-water-handoff.ts

import type { ProfessionalKind } from '@/lib/consultation/deep-water-handoff'

export type L5ContentState =
  | 'agent_drafted'    // public/well-known — agent draft, OK to render
  | 'needs_domain'     // practice-sensitive — agent draft is checklist
                       //   only; banner says "for professional review"
  | 'domain_reviewed'  // DOMAIN has reviewed; sourceUrls populated

export interface L5Signal {
  /** Stable string id. Hyphenated, family-prefixed where helpful. */
  id: string
  /** One of the 10 deep-water families. Mirrors the WB-G family list. */
  family: string
  /** zh user-facing title. Short noun phrase, no honorifics. */
  title: string

  /** Schema gate distinguishing agent-writable vs domain-required. */
  contentState: L5ContentState

  /** route_gate ids that activate this signal. Hitting any one is
   *  enough. Every id MUST exist in lib/consultation/route-gates.ts
   *  (validated by signal-registry.test.ts). */
  triggerRoutes: string[]
  /** Optional backup keywords for when route gates miss. Currently
   *  advisory only — runtime wiring uses triggerRoutes. */
  triggerKeywords?: string[]

  /** One-line "why this question is deep water". Rendered first. */
  whyThisIsDeepWater: string
  /** Bullet list — what facts the user should bring. For needs_domain
   *  this is "facts to show the professional", never a strategy plan. */
  prepareWhat: string[]
  /** Professional kinds to consult — reuses ProfessionalKind from
   *  deep-water-handoff so labels stay consistent. Order: primary first.
   *  Validated against ProfessionalKind enum by the test. */
  askWho: ProfessionalKind[]
  /** Public, well-known dangerous actions. Never bespoke strategy. */
  doNotDo: string[]

  /** Official source URLs. agent_drafted entries may have these; the
   *  needs_domain entries leave this empty until DOMAIN backfills. */
  sourceUrls: string[]
}

// ---------------------------------------------------------------------
// 10-FAMILY SIGNAL REGISTRY
// ---------------------------------------------------------------------
//
// Order follows the WB-G family list 1..10. Each family gets 1-2 signals.

export const L5_SIGNAL_REGISTRY: L5Signal[] = [
  // ----- 1. spouse-divorce-remarriage-procedure-vs-review-substance ---
  {
    id: 'spouse-divorce-remarriage-procedure-vs-review-substance',
    family: 'spouse-divorce-remarriage-procedure-vs-review-substance',
    title: '日配/永配 离婚・死别・再婚：手续名与审查实质的分离',
    contentState: 'needs_domain',
    triggerRoutes: ['spouse-divorce-remarriage-procedure-boundary'],
    triggerKeywords: ['离婚', '死别', '死別', '再婚', '配偶者', '日本人の配偶者', '永住者の配偶者'],
    whyThisIsDeepWater:
      '离婚 / 再婚后，"更新" / "变更" 的手续名称只是表面；入管真正审查的是当前在留资格的活动基础是否仍然存在。同样叫"更新申请"，在不同事实下可能被当作"变更"处理，结果完全不同。',
    prepareWhat: [
      '离婚 / 再婚的日期、对方国籍、户籍变动凭证',
      '14 日内的"配偶者に関する届出"是否已提交、何时提交',
      '当前在留期限的剩余时间、最近一次更新结果',
      '是否有未成年子女、子女国籍、抚养现状',
      '过去一年内的同居 / 别居情况、共同住所证明',
      '收入、纳税、社保、年金的最近一次缴纳记录',
      '是否已与新对象再婚或处于事实婚关系',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要在没有专业人士确认前自己改写在留卡上的"在留资格"栏',
      '不要假设"先更新一次拖到下次"是安全策略',
      '不要在 14 日届出窗口过期后再补，先咨询如何呈现',
    ],
    sourceUrls: [],
  },

  // ----- 1b. status-cancellation-grounds-and-hearing -----------------
  {
    id: 'status-cancellation-grounds-and-hearing',
    family: 'status-cancellation-grounds-and-hearing',
    title: '在留资格取消：活动停止、虚假申告与意见听取',
    contentState: 'needs_domain',
    triggerRoutes: [
      'status-cancellation-before-expiry-boundary',
      'application-truthfulness-no-false-info',
      'notification-duty-violation-not-harmless',
    ],
    triggerKeywords: ['在留资格取消', '取消', '離職', '离职', '虚假', '虚偽', '届出', '意见听取', '意見聴取'],
    whyThisIsDeepWater:
      '在留期限还没到，不等于不会发生在留资格取消。活动停止、虚假申告、住所/配偶/所属机关届出问题，可能对应不同取消事由；是否存在正当理由、是否进入意见听取，不能由 AI 直接判定。',
    prepareWhat: [
      '当前在留资格、在留期限、在留卡信息',
      '可能对应的事实：离职日、活动停止日、离婚/死别/分居日、住所变更日、届出日',
      '是否存在虚假申告、虚假材料、错误届出或迟报',
      '是否收到入管照会、出头通知、意见听取相关文件',
      '正当理由相关证据：病历、求职记录、DV 支援记录、学校/公司证明等',
      '过去是否有不许可、补件、违法就劳或资格外活动问题',
    ],
    askWho: ['immigration_lawyer', 'gyoseishoshi', 'isa_window', 'legal_terrace'],
    doNotDo: [
      '不要把“在留期限还剩”当作取消风险不存在',
      '不要自己判断正当理由一定成立',
      '不要补交或改写虚假事实，未先让专业人士看原文和日期',
    ],
    sourceUrls: [],
  },

  // ----- 1c. teijusha-kokujigai-boundary -----------------------------
  {
    id: 'teijusha-kokujigai-boundary',
    family: 'teijusha-kokujigai-boundary',
    title: '定住者：告示 / 告示外与个案审查',
    contentState: 'needs_domain',
    triggerRoutes: ['teijusha-kokujigai-boundary'],
    triggerKeywords: ['定住者', '告示定住', '告示外定住', '離婚定住', '日系', '扶養'],
    whyThisIsDeepWater:
      '“定住者”不是一个靠关键词自助匹配的单一路线。告示定住和告示外定住的来源、申请路径、审查重点不同；离婚定住、日系、被扶养子女等个案不能用一条固定规则下结论。',
    prepareWhat: [
      '当前在留资格、年龄、在日年数、学籍或就业状态',
      '亲属关系、同居关系、抚养关系和经济来源',
      '离婚/死别/亲子关系/收养/日系关系等证明材料',
      '是否有未成年子女、亲权、监护或抚养事实',
      '是否已有不许可、补件、届出迟延或资格取消风险',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要把“在日本长大”写成一定能转定住者',
      '不要把婚姻年数写成离婚定住的固定许可条件',
      '不要把告示外定住写成可以随便选择的普通路线',
    ],
    sourceUrls: [],
  },

  // ----- 2. business-manager-disposition-timing -----------------------
  {
    id: 'business-manager-disposition-timing',
    family: 'business-manager-disposition-timing',
    title: '経営管理：公司处置 / 转让 / 解散的时点',
    contentState: 'needs_domain',
    triggerRoutes: ['business-manager-disposition-no-auto-success'],
    triggerKeywords: ['経営', '経営管理', '会社解散', '事業承継', '株式譲渡'],
    whyThisIsDeepWater:
      '"我把公司卖了 / 关了 / 转给别人" 听起来只是商业决定，但对在留资格而言，事业实质的变化随时可能被认定为"資格に対応する活動が無くなった"。处置的时点、顺序、对入管的呈现方式都会影响结果。',
    prepareWhat: [
      '当前在留资格剩余期间、上次更新结果',
      '公司类型（株式会社 / 合同会社 / 个人事业主）',
      '近 3 年决算书 / 法人税申告書',
      '社会保险加入状态、雇员人数',
      '考虑中的处置方式（解散 / 譲渡 / 休眠 / 事業承継）和预期时点',
      '处置后的下一步打算（新事业 / 转其他在留资格 / 出国）',
      '司法書士、税理士是否已介入',
    ],
    askWho: ['gyoseishoshi', 'tax_accountant', 'judicial_scrivener', 'immigration_lawyer'],
    doNotDo: [
      '不要在没有专业人士确认前对外公告解散日 / 譲渡日',
      '不要假设"先解散再申请变更"是默认安全顺序',
      '不要在更新申请提交后再做事业实质变化，未先评估影响',
    ],
    sourceUrls: [],
  },

  // ----- 3. business-manager-2025-reform-transition -------------------
  {
    id: 'business-manager-2025-reform-transition',
    family: 'business-manager-2025-reform-transition',
    title: '経営管理：2025 制度改正过渡期的判断',
    contentState: 'needs_domain',
    triggerRoutes: ['business-manager-2025-reform-hard-fact-boundary'],
    triggerKeywords: ['2025', '経営管理', '改正', '資本金', '常勤'],
    whyThisIsDeepWater:
      '2025 改正方向已经明确（资本金 / 常勤职员 / 事业实质门槛上调），但"既存事业者过渡期如何被审查"在实务上仍在收口。同一份事业内容在改正前、过渡期、改正后会得到不同评价。',
    prepareWhat: [
      '当前在留资格的更新时点（是否会跨越制度切换日）',
      '当前资本金、出资人构成',
      '常勤职员人数、雇佣合同样本、社保加入证明',
      '事业所是否独立办公（不是住所兼用）',
      '近 3 年的销售实绩、净利润、纳税额',
      '事业计划书最近一次更新的版本',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要靠社交媒体上的"改正后这样就稳了"传闻调整事业结构',
      '不要在过渡期内主动减资 / 减员，未先评估对在留资格的影响',
      '不要假设改正前提交的更新可以"锁定旧标准"',
    ],
    sourceUrls: [],
  },

  // ----- 4. hsp1-institution-change-before-work-start -----------------
  {
    id: 'hsp1-institution-change-before-work-start',
    family: 'hsp1-institution-change-before-work-start',
    title: '高度専門職 1 号：所属机关变更与开工时点',
    contentState: 'needs_domain',
    triggerRoutes: [
      'hsp1-institution-change-permission-first',
      'work-qualification-certificate-not-permission',
    ],
    triggerKeywords: ['高度専門職', 'HSP', '所属機関', '転職', '高度人材'],
    whyThisIsDeepWater:
      'HSP1 因为带"指定书"，所属机关变更需要"事前许可"，不是 14 日届出能补救的。新工作什么时候算"开始活动"、入职手续与许可时点的关系，是实务核心争点。',
    prepareWhat: [
      '现职公司离职日（或预定离职日）',
      '新公司内定通知书、雇佣合同草案',
      '当前在留卡指定书（指定書）原文',
      '当前在留资格期限',
      '是否已签新合同 / 是否已收过新公司任何报酬',
      '新公司的业种、职务内容、年收',
      '是否已提交"在留資格変更許可申請"',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要在新许可下来之前到新公司开始工作',
      '不要假设"就職活動のための特定活動"会自动覆盖空白期',
      '不要靠 14 日届出代替事前许可',
    ],
    sourceUrls: [],
  },

  // ----- 5. permanent-residence-public-obligation-risk ---------------
  {
    id: 'permanent-residence-public-obligation-risk',
    family: 'permanent-residence-public-obligation-risk',
    title: '永住申请：公的义务履行的最低线',
    contentState: 'agent_drafted',
    triggerRoutes: [
      'pr-pending-current-status-not-auto-protected',
      'pr-basic-requirements-not-years-only',
    ],
    triggerKeywords: ['永住', '永住申請', '永住権', '公的義務', '税金', '年金'],
    whyThisIsDeepWater:
      '永住审查里"公的义务履行" 不是只看缴没缴，还看是否按时缴。一次延迟缴纳就可能被指出"独立的生计要件"或"素行要件"问题。',
    prepareWhat: [
      '近 3 年（高度人才近 1 年）的住民税课税证明书、纳税证明书',
      '近 2 年的年金加入期间证明（ねんきん定期便 / ねんきんネット）',
      '近 2 年每月年金缴纳记录（是否准时、有无延迟）',
      '健康保险加入期间、缴纳记录',
      '所得税源泉徴収票或确定申告书',
      '雇佣合同 / 在职证明 / 收入证明',
      '当前在留资格剩余期限',
    ],
    askWho: ['gyoseishoshi'],
    doNotDo: [
      '不要在永住申请前的 1 - 2 个月才突击补缴税金或年金',
      '不要把"已经补缴了"等同于"没问题"',
      '不要在永住审查中的 6 个月 - 1 年期间忽略当前在留资格的单独更新',
    ],
    sourceUrls: [
      'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
      'https://www.nenkin.go.jp/',
    ],
  },

  // ----- 6. dv-address-safety -----------------------------------------
  {
    id: 'dv-address-safety',
    family: 'dv-address-safety',
    title: 'DV / 住所安全 优先入口',
    contentState: 'agent_drafted',
    triggerRoutes: ['dv-address-safety-first'],
    triggerKeywords: ['DV', '家暴', '配偶者暴力', '住所秘匿', '逃げる'],
    whyThisIsDeepWater:
      '人身安全和在留资格保护要分别走不同窗口。先到 DV 咨询 / 警察相谈窗口确认人身安全，再处理在留资格事务，顺序不能反。',
    prepareWhat: [
      '当前所在地（不需要告诉对方）',
      '当前在留卡资料、在留资格、期限',
      '是否有未成年子女、子女是否在场',
      '是否需要紧急住所（庇护所）',
      '是否已报警 / 是否已联系市区町村福祉窗口',
    ],
    askWho: ['dv_center', 'police', 'immigration_lawyer', 'gyoseishoshi'],
    doNotDo: [
      '不要在人身安全确认之前先去处理在留卡或户籍手续',
      '不要把当前住所 / 联系方式告知对方或对方家人',
      '不要单独 / 没有警察陪同回到危险住所取物品',
    ],
    sourceUrls: [
      'https://www.gender.go.jp/policy/no_violence/e-vaw/soudankikan/01.html',
      'https://www.npa.go.jp/safetylife/seianki/stalker/index.html',
    ],
  },

  // ----- 7. expired-status-special-period-non-permission -------------
  {
    id: 'expired-status-special-period-non-permission',
    family: 'expired-status-special-period-non-permission',
    title: '在留期限 / 特例期间 / 不许可 后的时间窗',
    contentState: 'agent_drafted',
    triggerRoutes: [
      'special-period-two-month-boundary',
      'special-period-departure-deepwater',
      'nonpermission-special-period-ended-boundary',
    ],
    triggerKeywords: ['特例期間', '期限切れ', 'オーバーステイ', '不許可', '在留期限'],
    whyThisIsDeepWater:
      '"特例期间" 不是无限延长。更新申请提交后最长 2 个月内审查未结束，原期限届满才进入特例期间，最长再加 2 个月。期间结束日、不许可处分日、可活动范围是 3 个独立时点，必须分别确认。',
    prepareWhat: [
      '在留卡上的"在留期限"',
      '更新 / 变更申请的受付日（提交日）',
      '是否已收到入管任何通知书、通知书日期',
      '通知书是否是"不許可"/"処分通知"/"補正通知"',
      '当前住所、就劳状态',
      '是否计划出国 / 已出国',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer', 'isa_window'],
    doNotDo: [
      '不要在不许可处分通知收到后继续就劳，未先确认下一步',
      '不要在特例期间内出国，未先确认再入国与申请审查的影响',
      '不要等过了期限再去入管"试试看"，先咨询',
    ],
    sourceUrls: [
      'https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00133.html',
      'https://www.moj.go.jp/isa/applications/procedures/16-2.html',
    ],
  },

  // ----- 7b. overstay-departure-order-self-report --------------------
  {
    id: 'overstay-departure-order-self-report',
    family: 'overstay-departure-order-self-report',
    title: '不法残留：出国命令 / 自ら出頭 的边界',
    contentState: 'needs_domain',
    triggerRoutes: ['departure-order-not-reentry-guarantee'],
    triggerKeywords: ['overstay', 'オーバーステイ', '不法残留', '出国命令', '自首', '出頭'],
    whyThisIsDeepWater:
      '不法残留后的“自ら出頭”“出国命令”“退去强制”不是同一条路。是否适用出国命令、未来再上陆限制、是否存在排除因素，都取决于具体事实和入管程序阶段。',
    prepareWhat: [
      '原在留期限、超过期限的起算日和经过时间',
      '是否已经收到入管通知、出头通知、退去强制相关文件',
      '是否有退去强制史、出国命令史、刑事案件、売春等事实',
      '护照、机票、离境计划和当前住所',
      '在日本的配偶、子女、疾病、DV、照护等人道事实',
    ],
    askWho: ['immigration_lawyer', 'gyoseishoshi', 'isa_window', 'legal_terrace'],
    doNotDo: [
      '不要把出国命令写成一定适用',
      '不要把“1年后”写成一定可以再入国',
      '不要继续工作或拖延出头时点，未先确认当前程序风险',
    ],
    sourceUrls: [],
  },

  // ----- 7c. deportation-special-permission-boundary -----------------
  {
    id: 'deportation-special-permission-boundary',
    family: 'deportation-special-permission-boundary',
    title: '在留特別許可：不是普通兜底申请',
    contentState: 'needs_domain',
    triggerRoutes: ['tokubetsu-kyoka-not-normal-route'],
    triggerKeywords: ['在留特別許可', '在留特别许可', '退去強制', '退去强制', '不法残留'],
    whyThisIsDeepWater:
      '在留特別許可处在退去强制相关程序中，核心是法务大臣裁量，不是普通更新/变更不许可后的自助兜底。程序阶段、通知书、家族和人道事实会改变处理路径。',
    prepareWhat: [
      '目前处于哪个程序阶段：不许可后、出头通知后、退去强制程序中，还是尚未收到通知',
      '通知书/出头文书原件、期限、受领日',
      '不法残留、违法就劳、前科、退去强制史等不利事实',
      '日本人/永住者配偶、子女抚养、疾病、DV、长期在日等人道事实',
      '过去的申请历史、不许可理由、补件记录',
    ],
    askWho: ['immigration_lawyer', 'gyoseishoshi', 'legal_terrace', 'isa_window'],
    doNotDo: [
      '不要把在留特別許可写成普通申请或保底选项',
      '不要预测许可概率',
      '不要错过通知书或出头文书上的期限',
    ],
    sourceUrls: [],
  },

  // ----- 8. additional-document-notice-protocol -----------------------
  {
    id: 'additional-document-notice-protocol',
    family: 'additional-document-notice-protocol',
    title: '入管通知书：先读懂标题，再决定走哪条',
    contentState: 'agent_drafted',
    triggerRoutes: [
      'immigration-notice-taxonomy-first',
      'incomplete-materials-before-expiry-no-safe-bridge',
      'result-postcard-not-permission',
    ],
    triggerKeywords: ['通知書', '補正', '追加資料', '不許可', '出頭', 'はがき'],
    whyThisIsDeepWater:
      '"入管来通知了"是同一类感受，但通知书背后的法律意义完全不同。"資料提出通知書 / 補正通知"、"不許可通知 / 処分通知"、"出頭通知"、"結果通知（はがき）" 要走的路径、期限、能动用的工具都不同。先识别通知种类，再决定下一步。',
    prepareWhat: [
      '通知书原件（不只是发件人，最重要的是标题与正文第一段）',
      '通知书的"発出日"和你的"受領日"',
      '通知书上指定的回复期限 / 出頭期限',
      '当前在留卡资料、在留资格、期限',
      '当前进行中的申请类型（更新 / 变更 / 永住 / COE 等）',
      '此次申请的受付日、受付番号',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer', 'isa_window', 'legal_terrace'],
    doNotDo: [
      '不要在没有读懂通知书种类前自己回信 / 自己重新申请',
      '不要错过通知书上写的回复期限',
      '不要把"結果通知（はがき）"当作最终许可',
    ],
    sourceUrls: [
      'https://www.moj.go.jp/isa/about/region/index.html',
    ],
  },

  // ----- 8b. landing-refusal-admissibility ---------------------------
  {
    id: 'landing-refusal-admissibility',
    family: 'landing-refusal-admissibility',
    title: '上陆拒否 / 退去史 / 前科：入境审查边界',
    contentState: 'needs_domain',
    triggerRoutes: ['landing-denial-reentry-risk', 'coe-not-entry-guarantee-three-month'],
    triggerKeywords: ['上陸拒否', '上陆拒否', '退去強制', '退去强制', '前科', 'COE', '签证', '入境'],
    whyThisIsDeepWater:
      'CoE 和签证不是最终入境保证。过去的退去强制、不法残留、上陆拒否或刑事记录，可能在上陆审查中再次被确认；拒否期间是否届满也不能直接等同于一定能入境。',
    prepareWhat: [
      '过去的退去强制、出国命令、上陆拒否、刑事记录的日期和文书',
      '当前是否已有 CoE、签证，发行日和有效期',
      '这次来日目的、目标在留资格、邀请/受入机构材料',
      '是否有日本人/永住者配偶、子女、人道事情或特别说明材料',
      '是否曾被机场二次审查、拒绝上陆或要求补充说明',
    ],
    askWho: ['immigration_lawyer', 'gyoseishoshi', 'isa_window', 'legal_terrace'],
    doNotDo: [
      '不要把 CoE 或签证写成入国保证',
      '不要隐瞒前科、退去史、不法残留史或上陆拒否史',
      '不要把拒否期间届满写成一定可以入境',
      '不要把自主出境或时间已经过去写成通常可以顺利入境',
    ],
    sourceUrls: [],
  },

  // ----- 9. student-attendance-status-change --------------------------
  {
    id: 'student-attendance-status-change',
    family: 'student-attendance-status-change',
    title: '留学：出席率 / 在学状态变化',
    contentState: 'needs_domain',
    triggerRoutes: ['student-shikakugai-28h-long-vacation-limit'],
    triggerKeywords: ['留学', '出席率', '退学', '休学', '転校', '28時間'],
    whyThisIsDeepWater:
      '在留资格"留学"绑定在所属学校的"在学事实"上。出席率下降、休学、转校、退学，在入管的眼里和学校的内部处理是两套不同标准，时点和理由的呈现方式影响后续更新 / 变更。',
    prepareWhat: [
      '当前学校名 / 学籍状态 / 入学日期 / 预计毕业日',
      '近 3 个月出席率（学校开具的证明 / 学籍系统截图）',
      '本学期 / 上学期成绩单',
      '资格外活动许可的状态、近 3 个月每周打工时间',
      '休学 / 退学 / 转校的考虑原因 / 已与学校沟通的时点',
      '当前在留期限',
      '后续打算（继续学业 / 找工作 / 回国）',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要在没有专业人士确认前自己向学校提交退学 / 休学申请',
      '不要假设"先回国再回来"会自动重置出席率问题',
      '不要在资格外活动超时后继续打工，未先咨询',
    ],
    sourceUrls: [],
  },

  // ----- 10. late-payment-corrected-tax-filing-record-mismatch -------
  {
    id: 'late-payment-corrected-tax-filing-record-mismatch',
    family: 'late-payment-corrected-tax-filing-record-mismatch',
    title: '延迟缴纳 / 修正申告：纸面与记录的对账',
    contentState: 'needs_domain',
    triggerRoutes: [
      'late-payment-remediation-not-erased',
      'pension-exemption-not-arrears-not-free-pass',
    ],
    triggerKeywords: ['延滞', '修正申告', '追納', '免除', '滞納'],
    whyThisIsDeepWater:
      '"补缴了 / 已修正申告 / 已申请免除" 听起来都像"问题已解决"，但在入管审查里看的是公的记录的全貌：缴纳日、原始期限、是否有延滞金、免除适用期间。账户上"已清"不等于审查上"没痕迹"。',
    prepareWhat: [
      '近 3 年纳税证明书（住民税 / 国税）',
      '近 2 年年金加入期间证明（ねんきん定期便）',
      '每一次延迟缴纳的时点、补缴日、是否产生延滞金',
      '修正申告的提交日、对应税种、修正前后金额',
      '免除申请的适用期间、申请日、批准日',
      '健康保险加入 / 退出记录',
      '当前 / 计划提交的在留资格相关申请类型',
    ],
    askWho: ['tax_accountant', 'social_insurance', 'pension_office', 'gyoseishoshi'],
    doNotDo: [
      '不要在提交在留申请前的 1 - 2 个月才突击补缴',
      '不要假设"申请免除就等于没有滞纳记录"',
      '不要自己合并 / 简化纳税明细呈给入管，先和专业人士对账',
    ],
    sourceUrls: [],
  },

  // ----- 11. pending-change-new-work ---------------------------------
  // DOMAIN 2026-05-17 P1: handoff registry already has `pending-change`
  // family (Family 2) but no L5 signal — gap flagged as MAJOR_REWRITE.
  // Independent signal so the route gate fires the L5 panel for queries
  // about starting new work while a 在留資格変更許可 is pending.
  {
    id: 'pending-change-new-work',
    family: 'pending-change-new-work',
    title: '变更申请中：新工作不能先开始',
    contentState: 'needs_domain',
    triggerRoutes: [
      'pending-status-change-current-activity-only',
      'jfind-employment-transition-no-shikakugai-bridge',
    ],
    triggerKeywords: [
      '变更申请中', '変更申請中', '审查中', '審査中', '先入职', '先上班',
      '先开始', '先工作', '14日届出', '届出就能',
    ],
    whyThisIsDeepWater:
      '"我已经申请变更了，是不是就能先去新工作 / 先入职 / 先做新活动？" 听起来像程序问题，其实是核心边界：申请受理 ≠ 许可下达。新活动只能在新许可发出后开始，否则可能被认定为不法就労，影响许可本身。同一句话"变更申请中"，没有 / 已入职 / 已领薪三种事实下处理路径完全不同。',
    prepareWhat: [
      '当前在留资格、当前在留期限的剩余时间',
      '在留資格変更許可申請的受付日（提交日）、受付番号',
      '申请的新在留资格种类、新活动的具体内容',
      '是否已签新雇佣合同 / 入职日 / 是否已开始上班',
      '是否已收过新公司任何薪酬 / 报酬',
      '是否已停止旧活动（离职日 / 最后工作日）',
      '与新公司之间是否有任何已书面化的开始日承诺',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要在新许可下达前开始新工作 / 新活动',
      '不要把"14 日届出"当作开工许可',
      '不要假设申请受理 = 已许可',
    ],
    sourceUrls: [],
  },

  // ----- 12. gijinkoku-job-scope -------------------------------------
  // DOMAIN 2026-05-17 P1: handoff registry has `gijinkoku-work-scope`
  // family (Family 10) but no L5 signal — gap flagged as BLOCK.
  // Without this signal the answer can only use fact-card content, which
  // tends to over-simplify scope determinations (sales / mixed / 现场).
  {
    id: 'gijinkoku-job-scope',
    family: 'gijinkoku-job-scope',
    title: '技人国：工作范围按实际活动与合同判定',
    contentState: 'needs_domain',
    triggerRoutes: [
      'gijinkoku-work-scope-not-any-job',
      'gijinkoku-startup-management-change-first',
      'work-status-side-job-scope-boundary',
    ],
    triggerKeywords: [
      '技人国', '技術人文', '技术人文', '工作内容', '业务内容', '業務内容',
      '副业', '兼职', '资格外', '範囲', '范围', '换岗', '调岗',
    ],
    whyThisIsDeepWater:
      '技人国的"活动范围"不能只看职称或岗位说明，要看实际从事的工作内容是否需要"专业技术 / 人文知识 / 国际业务"的基础，以及雇佣合同上的职务记述与现状是否一致。同样叫"销售 / 翻译 / 客服"，在不同公司业务、学历背景、合同写法下，可能在范围内、也可能已经越界；越界事实若已发生，处理顺序错了会变成不法就労问题。',
    prepareWhat: [
      '当前在留卡上的资格、在留期限',
      '雇佣合同上的职务记述、入社时点',
      '学历 / 専門学校 / 大学的专业、毕业证、成绩单',
      '过去职历的具体内容（不是仅职位名）',
      '实际每日 / 每周从事的工作内容（一周一例）',
      '是否已存在范围外工作的实绩（含副业 / 兼职 / 临时帮忙）',
      '是否已收过任何范围外工作的报酬、报酬记录',
      '雇主对当前职务的认知 / 是否已书面变更职务范围',
    ],
    askWho: ['gyoseishoshi', 'immigration_lawyer'],
    doNotDo: [
      '不要靠职位名判断"在 / 不在范围内"',
      '不要在没有专业人士确认前继续从事可能范围外的工作',
      '不要假设"会社が許可すれば大丈夫"或"少しなら OK"',
    ],
    sourceUrls: [],
  },
]

// ---------------------------------------------------------------------
// Public matcher
// ---------------------------------------------------------------------

/** Return all L5 signals whose `triggerRoutes` overlap with the given
 *  route gate ids. Preserves registry order — callers that want one
 *  signal per family should de-duplicate by `family`. */
export function getSignalsForRoutes(
  routeIds: string[] | null | undefined,
): L5Signal[] {
  if (!routeIds || routeIds.length === 0) return []
  const idSet = new Set(routeIds)
  const out: L5Signal[] = []
  for (const signal of L5_SIGNAL_REGISTRY) {
    if (signal.triggerRoutes.some(id => idSet.has(id))) {
      out.push(signal)
    }
  }
  return out
}

/** All route_gate_ids that map to any L5 signal. Used by tests to
 *  detect drift from route-gates.ts. */
export function listL5BoundRouteIds(): string[] {
  const out = new Set<string>()
  for (const signal of L5_SIGNAL_REGISTRY) {
    for (const id of signal.triggerRoutes) out.add(id)
  }
  return Array.from(out)
}
