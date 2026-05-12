export type DeepWaterRisk = 'P0' | 'P1'

export interface DeepWaterPattern {
  id: string
  title: string
  risk: DeepWaterRisk
  summary: string
  factCardIds: string[]
  sourceUrls: string[]
  match: {
    allOf: string[][]
    anyOf?: string[]
    minAny?: number
  }
  layerSplit: string[]
  safeFrame: string[]
  mustNotSay: string[]
  confirmationPath: string
  needsScrivenerInput: boolean
}

export interface DeepWaterMatch {
  pattern: DeepWaterPattern
  matchedTerms: string[]
}

const SPOUSE_TERMS = [
  '日配',
  '日本人配偶',
  '日本人の配偶者',
  '日本人的配偶',
  '配偶者签',
  '配偶签',
  '配偶者等',
]

const GIJINKOKU_TERMS = [
  '技人国',
  '技術人文知識国際業務',
  '技术人文知识国际业务',
  '人文签',
  '人文知識',
]

const KEIEI_KANRI_TERMS = [
  '经营管理',
  '経営管理',
  '经管',
  '経管',
]

export const DEEP_WATER_PATTERNS: DeepWaterPattern[] = [
  {
    id: 'haigusha-divorce-remarriage-procedure-vs-review',
    title: '日本人配偶者等：离婚再婚时的手续名与审查实质分离',
    risk: 'P0',
    summary:
      '同一在留资格名下，窗口/表格可能按更新处理，但审查实质会重新看新的婚姻基础；不能把“实质像变更”说成“手续必然是变更”。',
    factCardIds: ['spouse-divorce-separation', 'nihonjin-haigusha-visa'],
    sourceUrls: [
      'https://www.moj.go.jp/isa/publications/faq/newimmiact_4_q-and-a_page3.html',
      'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
    ],
    match: {
      allOf: [
        SPOUSE_TERMS,
        ['离婚', '離婚', '再婚', '再结婚', '別居', '分居'],
      ],
      anyOf: ['更新', '变更', '変更', '在留期間', '在留资格', '在留資格', '表', '申请书'],
      minAny: 1,
    },
    layerSplit: [
      '在留资格名称是否改变',
      '窗口/申请表的手续名称',
      '入管实际审查的新事实与风险',
      '用户下一步应该如何向窗口或专业人士确认',
    ],
    safeFrame: [
      '如果在留资格名称仍是同一类，先不要简单断言“必须变更”；窗口/表格层面可能仍按更新处理。',
      '但离婚、再婚会改变原资格基础，审查实质不是普通续签，要重新证明新的婚姻真实性和生活实态。',
      '明确提醒 14 日届出、6 个月配偶者活动空白、未届出罚款风险等可核对规则。',
    ],
    mustNotSay: [
      '一定是变更申请',
      '只是普通更新',
      '离婚后必须立刻变更，不需要看再婚和窗口处理',
    ],
    confirmationPath:
      '带离婚届出、新配偶关系材料、共同生活材料，向入管窗口确认使用更新表还是另有指示；必要时找行政书士确认材料组织。',
    needsScrivenerInput: true,
  },
  {
    id: 'gijinkoku-job-change-notification-vs-status-review',
    title: '技人国转职：14日届出、资格范围、更新/变更审查分离',
    risk: 'P0',
    summary:
      '转职后的14日届出、就劳资格证明、资格变更/更新是不同层；不能只回答“要报告”或“要变更”。',
    factCardIds: ['tensyoku-zairyu', 'gijinkoku-job-change-notification', 'gijinkoku-job-mismatch'],
    sourceUrls: [
      'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html',
      'https://www.moj.go.jp/isa/applications/status/gijinkoku.html',
    ],
    match: {
      allOf: [
        GIJINKOKU_TERMS,
        ['转职', '転職', '换工作', '跳槽', '新工作', '离职', '退职'],
      ],
      anyOf: ['更新', '变更', '変更', '届出', '报告', '资格范围', '職務', '业务内容', '销售', '现场'],
      minAny: 1,
    },
    layerSplit: [
      '14日所属机关届出',
      '新工作是否仍在技人国活动范围',
      '是否需要就劳资格证明或变更申请',
      '下次更新时会如何审查新职务',
    ],
    safeFrame: [
      '先把14日届出和“是否要变更申请”分开。',
      '如果新职务仍在资格范围内，通常不是只看公司换了没有；要看实际业务内容、学历/职历关联、报酬和雇用条件。',
      '不确定时可用就劳资格证明或向窗口确认，不要把“届出已做”当作资格范围已被认可。',
    ],
    mustNotSay: [
      '换公司只要14日届出就完全没风险',
      '所有转职都必须变更申请',
      '职位名称相似就一定没问题',
    ],
    confirmationPath:
      '整理新旧岗位说明、雇用契约、实际业务比例、学历/职历关联，再确认是14日届出即可、申请就劳资格证明，还是需要资格变更。',
    needsScrivenerInput: true,
  },
  {
    id: 'keiei-kanri-business-change-procedure-vs-review',
    title: '经营管理：资格名不变与事业实质重审分离',
    risk: 'P1',
    summary:
      '经管签中，公司、代表、办公室、事业内容或资本结构变化，可能手续名仍像更新，但审查实质会看事业连续性和经营实态。',
    factCardIds: ['keiei-kanri-existing-holder-update', 'keiei-kanri-2025-10'],
    sourceUrls: [
      'https://www.moj.go.jp/isa/applications/status/businessmanager.html',
    ],
    match: {
      allOf: [
        KEIEI_KANRI_TERMS,
        ['公司', '法人', '代表', '办公室', '事務所', '资本', '資本金', '清算', '事业', '事業'],
      ],
      anyOf: ['更新', '变更', '変更', '换', '改', '名义', '名義', '搬家', '地址'],
      minAny: 1,
    },
    layerSplit: [
      '在留资格名是否仍是经营管理',
      '公司/事业事实是否发生重大变化',
      '更新申请中会被重新审查的经营实态',
      '是否需要补充说明或先确认窗口口径',
    ],
    safeFrame: [
      '不要只按手续名回答。经管签的核心是经营实态、事业持续性、办公室和资金/雇用条件。',
      '如果公司或事业事实变化大，答案应提醒用户按“重新说明经营基础”的难度准备。',
    ],
    mustNotSay: [
      '只要还是经营管理就普通更新',
      '公司信息变化一定可以通过一个简单届出解决',
    ],
    confirmationPath:
      '先列出变化点：法人、代表、办公室、资金、事业内容、雇用、营业实绩；再确认需要届出、更新补充说明还是变更路径。',
    needsScrivenerInput: true,
  },
  {
    id: 'notice-supplement-refusal-reapply-review-request',
    title: '入管通知：补材料、不许可、再申请、审查请求分离',
    risk: 'P0',
    summary:
      '追加资料通知、不许可通知、再申请和审查请求不是同一件事；错误建议可能导致期限错过或不必要离境恐慌。',
    factCardIds: ['nyukan-notice-response', 'zairyu-expiry-renewal-change'],
    sourceUrls: [
      'https://www.moj.go.jp/isa/applications/procedures/tetuduki_index3.html',
    ],
    match: {
      allOf: [
        ['入管通知', '通知书', '通知書', '追加資料', '补材料', '補正', '不许可', '不許可'],
      ],
      anyOf: ['出国', '离境', '再申请', '重新申请', '申诉', '審査請求', '审查请求', '期限'],
      minAny: 1,
    },
    layerSplit: [
      '通知类型',
      '通知书上的期限',
      '是否仍在特例期间或可补正',
      '再申请、审查请求、离境的不同后果',
    ],
    safeFrame: [
      '先让用户确认通知类型和通知书写明的期限。',
      '不要把“不许可后期限内自主离境”和“退去强制/非法滞留”混为一谈。',
      '如果涉及不许可、审查请求或离境，应说明可选项存在，但不评估胜算。',
    ],
    mustNotSay: [
      '收到不许可就必须马上出国',
      '出国本身一定触发5年上陆拒否',
      '补材料和重新申请是一回事',
    ],
    confirmationPath:
      '先拍清通知书标题、日期、提交/离境期限；如考虑争议、再申请或将来返日，带通知书找行政书士或入管律师确认。',
    needsScrivenerInput: true,
  },
  {
    id: 'pending-application-status-vs-work-scope',
    title: '申请中特例期间：停留状态与可从事活动范围分离',
    risk: 'P1',
    summary:
      '更新/变更申请中能否继续留日，与能否继续原工作或开始新活动不是同一层。',
    factCardIds: ['shinseichu-zairyu-keizoku'],
    sourceUrls: [
      'https://www.moj.go.jp/isa/applications/procedures/tetuduki_index3.html',
    ],
    match: {
      allOf: [
        ['申请中', '申請中', '更新中', '变更中', '変更中', '特例期間', '特例期间'],
        ['工作', '就劳', '就労', '打工', '兼职', 'バイト', '上班', '入职', '入社'],
      ],
      anyOf: ['能不能', '可以吗', '范围', '资格外', '新公司', '新工作'],
      minAny: 1,
    },
    layerSplit: [
      '是否可以继续停留',
      '原在留资格允许的活动范围',
      '新活动是否要等许可或资格外活动许可',
      '窗口/雇主确认事项',
    ],
    safeFrame: [
      '先区分“能留在日本”和“能做某项活动”。',
      '如果用户想开始新工作、新兼职或改变活动内容，不能只用“申请中可继续停留”来回答。',
    ],
    mustNotSay: [
      '申请中就什么工作都可以继续做',
      '特例期间等于自动获得新资格',
    ],
    confirmationPath:
      '确认当前申请类型、现有在留资格、想做的活动和开始日期；必要时向入管或雇主确认是否能开始。',
    needsScrivenerInput: false,
  },
]

export function matchDeepWaterPatterns(input: string | null | undefined): DeepWaterMatch[] {
  const normalized = normalize(input)
  if (!normalized) return []

  return DEEP_WATER_PATTERNS
    .map(pattern => {
      const allMatched = pattern.match.allOf.every(group => group.some(term => normalized.includes(normalize(term))))
      if (!allMatched) return null

      const anyTerms = pattern.match.anyOf ?? []
      const matchedAny = anyTerms.filter(term => normalized.includes(normalize(term)))
      const minAny = pattern.match.minAny ?? (anyTerms.length > 0 ? 1 : 0)
      if (matchedAny.length < minAny) return null

      const matchedTerms = [
        ...pattern.match.allOf.flatMap(group => group.filter(term => normalized.includes(normalize(term)))),
        ...matchedAny,
      ]

      return { pattern, matchedTerms: Array.from(new Set(matchedTerms)) }
    })
    .filter((match): match is DeepWaterMatch => Boolean(match))
}

export function deepWaterMatchesToPromptContext(matches: DeepWaterMatch[]): string | null {
  if (matches.length === 0) return null

  const blocks = matches.map(({ pattern }, index) => {
    return [
      `【深水区 ${index + 1}: ${pattern.title}】`,
      `风险等级: ${pattern.risk}`,
      `为什么要小心: ${pattern.summary}`,
      '',
      '回答时必须拆开的层次:',
      ...pattern.layerSplit.map(item => `- ${item}`),
      '',
      '安全回答框架:',
      ...pattern.safeFrame.map(item => `- ${item}`),
      '',
      '禁止说法:',
      ...pattern.mustNotSay.map(item => `- ${item}`),
      '',
      `确认路径: ${pattern.confirmationPath}`,
    ].join('\n')
  })

  return [
    '以下命中了 TEBIQ 深水区识别规则。深水区不是让你给出更武断的结论，而是防止把手续名、在留资格名、窗口口语和审查实质混为一谈。',
    '回答要求:',
    '- 用中文回答。',
    '- 不做“更新/变更”“可以/不可以”的二选一偷换。',
    '- 先说能确认的公开规则，再说需要结合个案或窗口确认的部分。',
    '- 如果实务口径可能与表格名称不同，明确说明这是“手续名”和“审查实质”的差别。',
    '- 不要承诺通过/不通过，不要替用户作最终申请策略判断。',
    '',
    ...blocks,
  ].join('\n')
}

function normalize(value: string | null | undefined): string {
  return (value ?? '')
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[“”"']/g, '')
}
