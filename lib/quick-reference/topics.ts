export type QuickReferenceVerification = 'source-backed' | 'needs-check'

export type ChecklistKind = 'renewal' | 'application' | 'material'

export type MaterialStatus = 'required' | 'conditional' | 'confirm'

export type QuickReferenceReadiness = 'ready' | 'needs-confirmation'

export interface QuickReferenceSource {
  id?: string
  label: string
  url: string
  organization?: string
  locator?: string
  relation?: 'direct' | 'related'
}

export interface QuickReferenceMaterial {
  id: string
  name: string
  nameJa?: string
  status: MaterialStatus
  owner: string
  getFrom: string
  note: string
  sourceIds?: string[]
  relatedTopicIds?: string[]
}

export interface QuickReferenceSection {
  title: string
  summary?: string
  materials: QuickReferenceMaterial[]
}

export interface QuickReferenceFact {
  label: string
  text: string
  verification: QuickReferenceVerification
}

export interface QuickReferenceTopic {
  id: string
  title: string
  shortTitle: string
  summary: string
  kind: ChecklistKind
  category: string
  visaType: string
  stage: string
  readiness: QuickReferenceReadiness
  factCardIds?: string[]
  aliases?: string[]
  applicationWindow?: string
  processingTime?: string
  fee?: string
  whereToGo?: string
  askPrompt?: string
  facts: QuickReferenceFact[]
  sections: QuickReferenceSection[]
  checkNote: string
  notCovered?: string[]
  sources: QuickReferenceSource[]
}

export const QUICK_REFERENCE_TOPICS: QuickReferenceTopic[] = [
  {
    id: 'kazoku-taizai-koushin-materials',
    title: '家族滞在续签材料清单',
    shortTitle: '家族滞在续签',
    summary: '家族滞在更新按扶养人有无就劳收入分开准备，材料结构相对清楚。',
    kind: 'renewal',
    category: '续签材料',
    visaType: '家族滞在',
    stage: '先确认扶养人收入分支',
    readiness: 'ready',
    factCardIds: ['kazoku-taizai-yoken'],
    aliases: ['家族滞在', '家属签', '家族签', '扶养', '配偶孩子续签'],
    applicationWindow: '通常可在在留期限的大约 3 个月前开始更新申请。',
    whereToGo: '住所地管辖的地方出入国在留管理局。',
    askPrompt: '我准备家族滞在续签，想确认亲属关系、扶养人收入和材料怎么准备。',
    facts: [
      {
        label: '材料结构清楚',
        text: '这份清单来自入管页面，结构相对完整。',
        verification: 'source-backed',
      },
      {
        label: '按扶养人收入分支',
        text: '扶养人有就劳收入和无就劳收入时，证明材料不同。',
        verification: 'source-backed',
      },
    ],
    sections: [
      {
        title: '本人和关系材料',
        materials: [
          {
            id: 'family-application-form',
            name: '在留期间更新许可申请书',
            nameJa: '在留期間更新許可申請書',
            status: 'required',
            owner: '本人或家属填写',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '申请人和扶养人的关系、住址、在留信息要一致。',
            sourceIds: ['isa-renewal'],
          },
          {
            id: 'family-photo',
            name: '证件照片',
            nameJa: '写真（4cm×3cm）',
            status: 'required',
            owner: '本人准备',
            getFrom: '照相馆或证件照机器。',
            note: '16 岁未满通常不需要；照片规格按入管页面确认。',
            sourceIds: ['isa-renewal', 'isa-family'],
          },
          {
            id: 'family-passport-card',
            name: '护照和在留卡',
            nameJa: 'パスポート及び在留カード',
            status: 'required',
            owner: '本人准备',
            getFrom: '递交时提示原件。',
            note: '原件通常用于提示确认，不等于提交复印件。',
            sourceIds: ['isa-renewal', 'isa-family'],
          },
          {
            id: 'family-relationship-proof',
            name: '亲属关系证明',
            nameJa: '申請人と扶養者の身分関係を証する文書',
            status: 'required',
            owner: '本人或家属准备',
            getFrom: '户籍謄本、婚姻届受理证明、结婚证明、出生证明等选一。',
            note: '外国语文件通常需要日文翻译；具体格式按窗口确认。',
            sourceIds: ['isa-family'],
          },
          {
            id: 'family-supporter-card',
            name: '扶养人的在留卡或护照复印件',
            nameJa: '扶養者の在留カード又は旅券の写し',
            status: 'required',
            owner: '扶养人准备',
            getFrom: '复印扶养人的在留卡或护照。',
            note: '扶养人的在留状态和有效期限需要同时确认。',
            sourceIds: ['isa-family'],
          },
        ],
      },
      {
        title: '扶养人有就劳收入时',
        materials: [
          {
            id: 'supporter-work-proof',
            name: '在职证明或营业许可复印件',
            nameJa: '在職証明書 または 営業許可書の写し',
            status: 'conditional',
            owner: '扶养人或公司准备',
            getFrom: '公司人事或营业许可机关。',
            note: '扶养人有就劳收入时按这个分支准备。',
            sourceIds: ['isa-family'],
          },
          {
            id: 'supporter-income',
            name: '扶养人的课税证明和纳税证明',
            nameJa: '住民税課税（非課税）証明書・納税証明書',
            status: 'conditional',
            owner: '扶养人准备',
            getFrom: '市区町村窗口或可用渠道。',
            note: '入管页面列为直近 1 年分；有效期和年度按窗口确认。',
            sourceIds: ['isa-family'],
            relatedTopicIds: ['tax-certificate-material'],
          },
        ],
      },
      {
        title: '扶养人无就劳收入时',
        materials: [
          {
            id: 'supporter-bank-balance',
            name: '存款余额证明',
            nameJa: '預金残高証明書',
            status: 'conditional',
            owner: '扶养人准备',
            getFrom: '开户银行取得。',
            note: '用于说明生活费支付能力。',
            sourceIds: ['isa-family'],
          },
          {
            id: 'supporter-scholarship',
            name: '奖学金证明',
            nameJa: '奨学金の給付に関する証明書',
            status: 'conditional',
            owner: '申请人、扶养人或学校准备',
            getFrom: '奖学金机构或学校。',
            note: '有奖学金时需注明金额和期间。',
            sourceIds: ['isa-family'],
          },
        ],
      },
    ],
    checkNote:
      '家族关系、扶养收入、同居状态或扶养人身份变化时，不要只看材料名；建议带事实提问。',
    notCovered: [
      '扶养收入是否足够',
      '非同居是否可行',
      '离婚或再婚后的路径判断',
    ],
    sources: [
      {
        id: 'isa-renewal',
        label: '出入国在留管理庁：在留期间更新许可申请',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
        organization: '出入国在留管理庁',
        relation: 'related',
      },
      {
        id: 'isa-family',
        label: '出入国在留管理庁：家族滞在',
        url: 'https://www.moj.go.jp/isa/applications/status/dependent.html',
        organization: '出入国在留管理庁',
        relation: 'direct',
      },
    ],
  },
  {
    id: 'gijinkoku-koushin-materials',
    title: '技人国续签材料清单',
    shortTitle: '技人国续签',
    summary:
      '技术・人文知识・国际业务更新时，先按共通材料、公司类别、税证明三层核对。',
    kind: 'renewal',
    category: '续签材料',
    visaType: '技术・人文知识・国际业务',
    stage: '到期前约 3 个月开始准备',
    readiness: 'needs-confirmation',
    factCardIds: [
      'gijinkoku-koushin-shorui',
      'tensyoku-zairyu',
      'gijinkoku-job-mismatch',
    ],
    aliases: [
      '技人国',
      '人文签',
      '技术人文知识国际业务',
      '就劳签',
      '工作签证',
      '续签',
      '更新',
      '更新材料',
    ],
    applicationWindow: '在留期间满了日的大约 3 个月前开始申请。',
    processingTime: '标准处理期间通常为 2 周到 1 个月。',
    fee: '许可时缴纳；窗口/线上金额可能不同。',
    whereToGo: '住所地管辖的地方出入国在留管理局，或可用的线上申请路径。',
    askPrompt: '我准备技人国续签，想确认材料清单、公司类别和税证明怎么准备。',
    facts: [
      {
        label: '不是所有人材料都一样',
        text: '所属机构类别、是否转职、公司规模会影响追加资料。',
        verification: 'source-backed',
      },
      {
        label: '转职后要单独看',
        text: '换公司后更新，不只看 14 日届出，还要看新工作内容和新公司资料。',
        verification: 'needs-check',
      },
    ],
    sections: [
      {
        title: '共通材料',
        materials: [
          {
            id: 'gijinkoku-application-form',
            name: '在留期间更新许可申请书',
            nameJa: '在留期間更新許可申請書',
            status: 'required',
            owner: '本人填写；部分栏位需要公司信息',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '工作内容、雇用单位、收入等信息要和公司材料一致。',
            sourceIds: ['isa-renewal'],
          },
          {
            id: 'photo',
            name: '证件照片',
            nameJa: '写真 1葉',
            status: 'required',
            owner: '本人',
            getFrom: '按入管规格准备；16 岁未满通常不要。',
            note: '照片规格和拍摄时间按入管页面确认。',
            sourceIds: ['isa-renewal'],
          },
          {
            id: 'passport-residence-card',
            name: '护照和在留卡',
            nameJa: 'パスポート・在留カード',
            status: 'required',
            owner: '本人',
            getFrom: '递交时提示原件。',
            note: '在留卡地址、姓名等记载事项应先保持一致。',
            sourceIds: ['isa-renewal'],
          },
        ],
      },
      {
        title: '公司和工作材料',
        summary: '类别 3/4、转职、派遣、对人业务会明显增加材料。',
        materials: [
          {
            id: 'category-proof',
            name: '所属机构类别证明',
            nameJa: 'カテゴリー該当証明書類',
            status: 'required',
            owner: '公司或本人向公司确认',
            getFrom: '按入管技人国页面的类别表确认。',
            note: '类别 1/2/3/4 会影响需要交哪些公司资料。',
            sourceIds: ['isa-renewal', 'isa-gijinkoku'],
          },
          {
            id: 'representative-declaration',
            name: '所属机构代表人申报书',
            nameJa: '所属機関の代表者に関する申告書',
            status: 'conditional',
            owner: '公司代表者或人事准备',
            getFrom: '入管官网下载格式后由公司填写。',
            note: '来源清单显示，2026 年 4 月以后カテゴリー3也可能需要提交。',
            sourceIds: ['isa-gijinkoku'],
          },
          {
            id: 'employment-contract',
            name: '劳动条件通知书或雇用契约书',
            nameJa: '労働条件通知書・雇用契約書',
            status: 'conditional',
            owner: '公司提供',
            getFrom: '向人事或雇用单位取得。',
            note: '转职后、类别 3/4 等情况尤其要确认是否需要。',
            sourceIds: ['isa-gijinkoku'],
          },
          {
            id: 'company-registry',
            name: '公司登记事项证明书',
            nameJa: '登記事項証明書',
            status: 'conditional',
            owner: '公司或本人取得',
            getFrom: '法务局或线上取得。',
            note: '转职后提交新公司资料时常见；是否必需按类别确认。',
            sourceIds: ['isa-gijinkoku'],
          },
          {
            id: 'language-proof',
            name: '语言能力证明',
            nameJa: '言語能力証明資料',
            status: 'confirm',
            owner: '申请人或公司确认',
            getFrom: 'JLPT、BJT、学历或其他可证明材料。',
            note: '来源清单显示，2026 年 4 月后主要从事对人业务的カテゴリー3/4需特别确认；适用范围仍需进一步核对。',
            sourceIds: ['isa-gijinkoku'],
          },
          {
            id: 'dispatch-materials',
            name: '派遣相关资料',
            nameJa: '派遣労働誓約書・派遣個別契約書等',
            status: 'conditional',
            owner: '派遣元和派遣先准备',
            getFrom: '派遣公司、派遣先公司内部资料。',
            note: '派遣形态会有额外材料，不要只按一般雇用清单准备。',
            sourceIds: ['isa-gijinkoku'],
          },
          {
            id: 'business-overview',
            name: '公司事业内容资料',
            nameJa: '事業内容を明らかにする資料',
            status: 'conditional',
            owner: '公司提供',
            getFrom: '公司案内、官网资料、パンフレット等。',
            note: '用于说明公司做什么，以及你的职务为什么符合技人国范围。',
            sourceIds: ['isa-gijinkoku'],
          },
        ],
      },
      {
        title: '税金和收入资料',
        materials: [
          {
            id: 'tax-certificate',
            name: '住民税课税证明和纳税证明',
            nameJa: '住民税の課税証明書・納税証明書',
            status: 'conditional',
            owner: '本人',
            getFrom: '住所地市区町村窗口或可用的线上渠道。',
            note: '年度、是否需要非课税证明、是否需要最新年度，按入管和个人情况确认。',
            sourceIds: ['isa-renewal'],
            relatedTopicIds: ['tax-certificate-material'],
          },
          {
            id: 'financial-statement',
            name: '最近年度决算书',
            nameJa: '直近年度の決算文書',
            status: 'conditional',
            owner: '公司提供',
            getFrom: '向公司、税理士或财务负责人确认。',
            note: '转职后类别 3/4 等情况可能要求；不要和个人税证明混在一起。',
            sourceIds: ['isa-gijinkoku'],
          },
        ],
      },
    ],
    checkNote:
      '如果转职后工作内容、公司类别、派遣形态或收入变化较大，不要只照清单递交；先带材料提问或确认窗口。',
    notCovered: [
      '是否一定能续签',
      '新工作是否完全符合技人国范围',
      '派遣或对人服务岗位的个别材料判断',
    ],
    sources: [
      {
        id: 'isa-renewal',
        label: '出入国在留管理庁：在留期间更新许可申请',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
        organization: '出入国在留管理庁',
        locator: '页面内「申請時期」「処理期間」「必要書類」',
        relation: 'direct',
      },
      {
        id: 'isa-gijinkoku',
        label: '出入国在留管理庁：技术・人文知识・国际业务',
        url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html',
        organization: '出入国在留管理庁',
        locator: '页面内「提出資料」「カテゴリー」',
        relation: 'direct',
      },
    ],
  },
  {
    id: 'keiei-kanri-koushin-materials',
    title: '经营管理续签材料清单',
    shortTitle: '经管续签',
    summary:
      '经营管理更新要同时看个人申请材料、公司资料、经营实态和新规过渡期。',
    kind: 'renewal',
    category: '续签材料',
    visaType: '经营・管理',
    stage: '先核对公司资料，再看过渡期',
    readiness: 'needs-confirmation',
    factCardIds: ['keiei-kanri-existing-holder-update', 'keiei-kanri-2025-10'],
    aliases: [
      '经营管理',
      '经管签',
      '经营管理续签',
      '経営管理',
      '公司续签',
      '3000万',
      '过渡期',
    ],
    applicationWindow: '通常可在在留期限的大约 3 个月前开始更新申请。',
    processingTime: '处理时间按入管更新申请页面和个案情况确认。',
    fee: '许可时缴纳；金额按最新入管页面确认。',
    whereToGo: '住所地或事业所在地相关的地方出入国在留管理局。',
    askPrompt:
      '我准备经营管理续签，想确认公司材料、办公室、决算和新规过渡期怎么准备。',
    facts: [
      {
        label: '现持有人有过渡期',
        text: '既有经营管理持有人在一定期间内更新时，会涉及新规过渡措置。',
        verification: 'source-backed',
      },
      {
        label: '不是普通个人续签',
        text: '经营管理更新通常要看公司经营状况、办公室、决算、事业持续性等资料。',
        verification: 'needs-check',
      },
    ],
    sections: [
      {
        title: '共通材料',
        materials: [
          {
            id: 'keiei-application-form',
            name: '在留期间更新许可申请书',
            nameJa: '在留期間更新許可申請書',
            status: 'required',
            owner: '本人填写；公司信息需准确',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '公司名、所在地、代表者、经营内容应和公司资料一致。',
            sourceIds: ['isa-renewal'],
          },
          {
            id: 'keiei-photo-passport-card',
            name: '照片、护照、在留卡',
            nameJa: '写真・パスポート・在留カード',
            status: 'required',
            owner: '本人',
            getFrom: '照片按规格准备；护照和在留卡递交时提示。',
            note: '在留卡地址和公司/住址资料不一致时，先确认是否需要处理。',
            sourceIds: ['isa-renewal'],
          },
        ],
      },
      {
        title: '公司和经营资料',
        materials: [
          {
            id: 'keiei-registry',
            name: '公司登记事项证明书',
            nameJa: '登記事項証明書の写し',
            status: 'required',
            owner: '公司或本人取得',
            getFrom: '法务局或线上取得。',
            note: '来源清单显示，有效期通常要看 3 个月内。公司名称、所在地、代表者等要和申请书一致。',
            sourceIds: ['isa-keiei-update'],
          },
          {
            id: 'keiei-financials',
            name: '最近年度决算文书',
            nameJa: '直近の年度の決算文書の写し',
            status: 'required',
            owner: '公司、税理士或财务负责人',
            getFrom: '从公司会计资料或税理士处整理。',
            note: '这是经营管理更新的核心公司资料；赤字或经营变化不只是一张材料问题。',
            sourceIds: ['isa-keiei-update'],
          },
          {
            id: 'keiei-permission',
            name: '营业许可相关资料',
            nameJa: '許認可証明資料',
            status: 'conditional',
            owner: '公司准备',
            getFrom: '按事业所需许可向对应许可机关取得。',
            note: '需要许可的行业要准备许可文件和说明资料。',
            sourceIds: ['isa-keiei-update'],
          },
          {
            id: 'keiei-salary-staff',
            name: '常勤职员薪酬资料',
            nameJa: '常勤職員の給与関連書類',
            status: 'confirm',
            owner: '公司准备',
            getFrom: '公司工资、人事、社保资料。',
            note: '2025 改正后常勤职员要件是经管续签需要特别确认的点之一。',
            sourceIds: ['isa-keiei-update', 'isa-keiei-transition'],
          },
          {
            id: 'keiei-activity-report',
            name: '经营活动内容说明',
            nameJa: '活動内容説明書',
            status: 'confirm',
            owner: '公司和代表者准备',
            getFrom: '按近期经营实绩自行整理。',
            note: '说明近期在留期间内实际做了什么经营活动。',
            sourceIds: ['isa-keiei-update'],
          },
        ],
      },
      {
        title: '2025 改正后的确认点',
        materials: [
          {
            id: 'keiei-transition-check',
            name: '新规过渡期确认',
            nameJa: '経過措置の確認',
            status: 'confirm',
            owner: '本人和公司确认',
            getFrom: '按入管经营管理改正页面确认申请日期和适用规则。',
            note: '2028 年 10 月前后、新旧基准、3000 万资本等问题不要凭清单判断。',
            sourceIds: ['isa-keiei-transition'],
          },
          {
            id: 'keiei-capital-3000',
            name: '3000 万资本或事业资产证明',
            nameJa: '資本金・事業資産 3,000万円以上',
            status: 'confirm',
            owner: '公司、本人、税理士确认',
            getFrom: '公司登记、银行、会计资料等。',
            note: '入管改正页面已列出新要件，但过渡期内如何适用仍需进一步确认。',
            sourceIds: ['isa-keiei-transition'],
          },
          {
            id: 'keiei-experience-plan',
            name: '经营经验/学历和事业计划',
            nameJa: '経営経験・学歴証明、専門家評価付き事業計画書',
            status: 'confirm',
            owner: '本人、公司、税理士等专家',
            getFrom: '学历/职历证明、事业计划和专家评估。',
            note: '事业计划是否合理属于专业判断，不在材料清单里判定。',
            sourceIds: ['isa-keiei-transition'],
          },
        ],
      },
    ],
    checkNote:
      '经营管理续签很容易从“材料清单”进入“经营实态审查”。公司、办公室、事业内容、资本、赤字发生变化时，建议带材料提问或找行政书士确认。',
    notCovered: [
      '是否符合 3000 万资本新基准',
      '赤字是否影响续签',
      '办公室能不能撑住审查',
      '具体事业计划怎么写',
    ],
    sources: [
      {
        id: 'isa-renewal',
        label: '出入国在留管理庁：在留期间更新许可申请',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
        organization: '出入国在留管理庁',
        locator: '页面内「申請時期」「必要書類」',
        relation: 'related',
      },
      {
        id: 'isa-keiei-transition',
        label: '出入国在留管理庁：经营管理改正与过渡措置',
        url: 'https://www.moj.go.jp/isa/applications/resources/10_00237.html',
        organization: '出入国在留管理庁',
        locator: '页面内「過渡措置」「既存保有者」',
        relation: 'direct',
      },
      {
        id: 'isa-keiei-update',
        label: '出入国在留管理庁：经营・管理',
        url: 'https://www.moj.go.jp/isa/applications/status/businessmanager.html',
        organization: '出入国在留管理庁',
        locator: '页面内「提出資料」',
        relation: 'related',
      },
    ],
  },
  {
    id: 'nihonjin-haigusha-koushin-materials',
    title: '日本人配偶者等续签材料清单',
    shortTitle: '日配续签',
    summary:
      '先覆盖日本人配偶者本人续签。材料清单清楚，但婚姻实态仍要另行判断。',
    kind: 'renewal',
    category: '续签材料',
    visaType: '日本人配偶者等',
    stage: '先按配偶者路径核对',
    readiness: 'ready',
    factCardIds: ['nihonjin-haigusha-visa', 'spouse-divorce-separation'],
    aliases: ['日配', '日本人配偶', '配偶者签', '配偶签', '结婚签', '婚姻续签'],
    applicationWindow: '通常可在在留期限的大约 3 个月前开始更新申请。',
    whereToGo: '住所地管辖的地方出入国在留管理局。',
    askPrompt:
      '我准备日本人配偶者等续签，想确认婚姻关系、同居和收入资料怎么准备。',
    facts: [
      {
        label: '配偶者路径先核对',
        text: '日本人配偶者本人续签的材料，在入管页面中有明确列出。',
        verification: 'source-backed',
      },
      {
        label: '离婚再婚要单独判断',
        text: '离婚、分居、再婚不能按普通续签材料清单直接判断。',
        verification: 'needs-check',
      },
    ],
    sections: [
      {
        title: '关系和身份材料',
        materials: [
          {
            id: 'spouse-application-form',
            name: '在留期间更新许可申请书',
            nameJa: '在留期間更新許可申請書',
            status: 'required',
            owner: '本人填写',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '配偶信息、住址、婚姻状态要和其他材料一致。',
            sourceIds: ['isa-renewal'],
          },
          {
            id: 'spouse-photo',
            name: '证件照片',
            nameJa: '写真（4cm×3cm）',
            status: 'required',
            owner: '本人准备',
            getFrom: '照相馆或证件照机器。',
            note: '16 岁未满通常不需要；照片规格按入管页面确认。',
            sourceIds: ['isa-renewal', 'isa-spouse'],
          },
          {
            id: 'spouse-passport-card',
            name: '护照和在留卡',
            nameJa: 'パスポート・在留カード',
            status: 'required',
            owner: '本人准备',
            getFrom: '递交时提示原件。',
            note: '护照和在留卡上的姓名、住址等信息应与申请材料一致。',
            sourceIds: ['isa-renewal', 'isa-spouse'],
          },
          {
            id: 'spouse-family-register',
            name: '日本人配偶的户籍材料',
            nameJa: '配偶者の戸籍謄本（全部事項証明書）',
            status: 'required',
            owner: '日本人配偶准备',
            getFrom: '本籍地市区町村或可用的取得方式。',
            note: '需记载与申请人的婚姻事实；入管页面列为有效期 3 个月。',
            sourceIds: ['isa-spouse'],
          },
        ],
      },
      {
        title: '共同生活和收入资料',
        materials: [
          {
            id: 'spouse-residence-proof',
            name: '日本人配偶的住民票',
            nameJa: '配偶者の住民票（世帯全員記載）',
            status: 'required',
            owner: '日本人配偶准备',
            getFrom: '住所地市区町村。',
            note: 'マイナンバー栏省略，其他栏位按入管要求不要省略。',
            sourceIds: ['isa-spouse'],
          },
          {
            id: 'spouse-income-tax',
            name: '日本人配偶的课税证明和纳税证明',
            nameJa: '住民税課税（非課税）証明書・納税証明書',
            status: 'required',
            owner: '日本人配偶准备',
            getFrom: '1 月 1 日住所地的市区町村。',
            note: '直近 1 年分；需记载总所得和纳税状况。',
            sourceIds: ['isa-spouse'],
            relatedTopicIds: ['tax-certificate-material'],
          },
          {
            id: 'spouse-guarantee',
            name: '身元保证书',
            nameJa: '身元保証書',
            status: 'required',
            owner: '日本人配偶填写签名',
            getFrom: '入管官网下载，多语言版可用。',
            note: '保证人通常为日本人配偶本人。',
            sourceIds: ['isa-spouse'],
          },
        ],
      },
    ],
    checkNote:
      '这张清单先服务“日本人配偶者本人”的普通更新。离婚、再婚、分居、收入不足、同居证据薄弱时，不要用普通清单判断；应进入提问或专业确认。',
    notCovered: [
      '实子・特别养子路径',
      '婚姻真实性判断',
      '离婚再婚时到底更新还是变更',
      '分居是否影响续签',
    ],
    sources: [
      {
        id: 'isa-renewal',
        label: '出入国在留管理庁：在留期间更新许可申请',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-3.html',
        organization: '出入国在留管理庁',
        relation: 'related',
      },
      {
        id: 'isa-spouse',
        label: '出入国在留管理庁：日本人配偶者等（配偶者）',
        url: 'https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese01.html',
        organization: '出入国在留管理庁',
        relation: 'direct',
      },
    ],
  },
  {
    id: 'ryugaku-koushin-materials',
    title: '留学续签材料清单',
    shortTitle: '留学续签',
    summary:
      '先覆盖适正校クラスI的留学更新。普通更新材料较少，非适正校另行确认。',
    kind: 'renewal',
    category: '续签材料',
    visaType: '留学',
    stage: '先确认学校种别，再向学校开证明',
    readiness: 'ready',
    factCardIds: [
      'ryugaku-koushin-shutsusekiRitsu',
      'ryugakusei-baito-28jikan',
    ],
    aliases: [
      '留学签',
      '学生签',
      '留学生续签',
      '学校续签',
      '出席率',
      '成绩证明',
    ],
    applicationWindow: '通常可在在留期限的大约 3 个月前开始更新申请。',
    whereToGo: '住所地管辖的地方出入国在留管理局。',
    askPrompt:
      '我准备留学续签，想确认学校材料、出席率、成绩和打工记录要怎么准备。',
    facts: [
      {
        label: '适正校材料较少',
        text: 'PDF 清单显示，适正校クラスI更新的必备材料以申请书、清单表、学校证明为中心。',
        verification: 'source-backed',
      },
      {
        label: '财务文件多为条件触发',
        text: '上次更新时因资格外活动被指导过等情况，才会触发更多经费类资料。',
        verification: 'source-backed',
      },
    ],
    sections: [
      {
        title: '本人和学校材料',
        materials: [
          {
            id: 'student-application-form',
            name: '在留期间更新许可申请书',
            nameJa: '在留期間更新許可申請書',
            status: 'required',
            owner: '本人填写',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '留学用表格，学校名、课程、在留信息要和学校证明一致。',
            sourceIds: ['isa-student', 'isa-student-pdf-university'],
          },
          {
            id: 'student-photo-passport-card',
            name: '证件照片、护照和在留卡',
            nameJa: '写真・パスポート・在留カード',
            status: 'required',
            owner: '本人准备',
            getFrom: '照片按入管规格准备；护照和在留卡递交时提示。',
            note: '地址、学校信息或姓名有变化时，先确认记载事项是否需要处理。',
            sourceIds: ['isa-student'],
          },
          {
            id: 'student-document-list',
            name: '提交文件清单表',
            nameJa: '提出書類一覧表（本表及び別紙「各種確認書」）',
            status: 'required',
            owner: '申请人填写',
            getFrom: '入管官网下载。',
            note: '包含各種確認書；日语能力等需要自申报。',
            sourceIds: ['isa-student-pdf-university'],
          },
          {
            id: 'student-record',
            name: '出席、成绩、毕业相关证明',
            nameJa: '出席証明書・成績証明書・卒業証明書',
            status: 'required',
            owner: '学校开具',
            getFrom: '向学校事务窗口申请。',
            note: '包含直近申请以来曾就读教育机构的证明；出席证明为可发行时提交。',
            sourceIds: ['isa-student-pdf-university'],
          },
          {
            id: 'student-enrollment',
            name: '在学证明或入学许可书',
            nameJa: '在学証明書（または入学許可書）',
            status: 'required',
            owner: '学校开具',
            getFrom: '向在籍学校或升学学校申请。',
            note: '升学准备中可用入学许可书。',
            sourceIds: ['isa-student-pdf-university'],
          },
        ],
      },
      {
        title: '条件触发材料',
        materials: [
          {
            id: 'student-funds',
            name: '在日生活费申报书',
            nameJa: '滞在費支弁に関する申告書',
            status: 'conditional',
            owner: '本人、家属或经费支付人准备',
            getFrom: '入管官网下载后填写。',
            note: 'PDF 清单显示，上次更新时有资格外活动指导等情况会触发。',
            sourceIds: ['isa-student-pdf-university'],
          },
          {
            id: 'student-baito',
            name: '住民税、給与明细、送金等经费资料',
            nameJa: '住民税証明・給与明細・送金証明等',
            status: 'conditional',
            owner: '本人整理',
            getFrom: '市区町村、打工单位、银行或经费支付人。',
            note: '是否需要取决于学校种别、出身国地区、资格外活动指导记录等。',
            sourceIds: ['isa-student-pdf-university'],
            relatedTopicIds: ['tax-certificate-material'],
          },
          {
            id: 'student-under-18',
            name: '18岁未满单独生活确认书',
            nameJa: '18歳未満単身生活の体制確認書',
            status: 'conditional',
            owner: '本人、学校或监护相关方确认',
            getFrom: '按入管对应清单和学校要求准备。',
            note: '18 岁未满且单独居住、情况有变化时需特别确认。',
            sourceIds: ['isa-student-pdf-highschool'],
          },
        ],
      },
    ],
    checkNote:
      '学校是否适正校、是否曾被资格外活动指导、出身国地区分支，会改变材料要求。拿不准时先带学校名和自己的情况提问。',
    notCovered: [
      '资格外活动指导记录如何判断',
      '非适正校完整分支',
      '出席率低能否续签',
      '转校或退学后的路径',
    ],
    sources: [
      {
        id: 'isa-student',
        label: '出入国在留管理庁：留学',
        url: 'https://www.moj.go.jp/isa/applications/status/student.html',
        organization: '出入国在留管理庁',
        relation: 'related',
      },
      {
        id: 'isa-student-pdf-university',
        label: '出入国在留管理庁：留学更新チェックシート（大学等・適正校）',
        url: 'https://www.moj.go.jp/isa/content/001403378.pdf',
        organization: '出入国在留管理庁',
        locator: 'PDF内「提出書類一覧表」',
        relation: 'direct',
      },
      {
        id: 'isa-student-pdf-highschool',
        label: '出入国在留管理庁：留学更新チェックシート（高等学校等）',
        url: 'https://www.moj.go.jp/isa/content/001403386.pdf',
        organization: '出入国在留管理庁',
        locator: 'PDF内「高等学校・中学校・小学校」',
        relation: 'related',
      },
    ],
  },
  {
    id: 'eijuu-shinsei-materials',
    title: '永住申请材料清单',
    shortTitle: '永住申请',
    summary: '永住不是续签。先把税、年金、健康保险、收入和保证人材料分开核对。',
    kind: 'application',
    category: '申请材料',
    visaType: '永住许可',
    stage: '证明确认通常要提前准备',
    readiness: 'needs-confirmation',
    factCardIds: [
      'eijuu-shinsei-shorui',
      'eijuu-nenkin-risk',
      'kodo-senmon-shoku-eijuu',
    ],
    aliases: [
      '永住',
      '永住申请',
      '永久',
      '纳税证明',
      '年金记录',
      '健康保险',
      '身元保证人',
    ],
    applicationWindow:
      '没有统一“续签窗口”；应按自身资格路线和证明确认时间提前准备。',
    processingTime: '处理期间通常按月计算，实际可能更久。',
    fee: '许可时缴纳。',
    whereToGo: '住所地管辖的地方出入国在留管理局。',
    askPrompt: '我准备永住申请，想确认税、年金、健康保险和保证人材料怎么准备。',
    facts: [
      {
        label: '就劳资格者常看 5 年税和 2 年年金健保',
        text: '就劳资格者等向け清单里，住民税、年金、医疗保险的年数要求很关键。',
        verification: 'source-backed',
      },
      {
        label: '路线不同，材料会不同',
        text: '日本人配偶者等、高度人才等路线不能直接套同一份年数清单。',
        verification: 'needs-check',
      },
    ],
    sections: [
      {
        title: '申请基础材料',
        materials: [
          {
            id: 'eijuu-application',
            name: '永住许可申请书',
            nameJa: '永住許可申請書',
            status: 'required',
            owner: '本人填写',
            getFrom: '入管官网下载，或按线上申请表单填写。',
            note: '永住不是在留期间更新，申请书和理由书要按永住路线准备。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'eijuu-photo',
            name: '证件照片',
            nameJa: '写真（4cm×3cm）',
            status: 'required',
            owner: '本人准备',
            getFrom: '照相馆或证件照机器。',
            note: '16 岁未满通常不需要；照片规格按入管页面确认。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'eijuu-reason',
            name: '理由书',
            nameJa: '理由書',
            status: 'required',
            owner: '本人准备',
            getFrom: '自由格式；外语时通常需要日文翻译。',
            note: '不要让理由书和实际居住、工作、纳税记录互相矛盾。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'eijuu-juminhyo',
            name: '家庭全员住民票',
            nameJa: '住民票',
            status: 'required',
            owner: '本人取得',
            getFrom: '住所地市区町村。',
            note: 'マイナンバー省略等格式按入管页面确认。',
            sourceIds: ['isa-eijuu'],
          },
        ],
      },
      {
        title: '税金、年金、健康保险',
        materials: [
          {
            id: 'eijuu-tax',
            name: '住民税课税证明和纳税证明',
            nameJa: '住民税の課税証明書・納税証明書',
            status: 'required',
            owner: '本人取得',
            getFrom: '市区町村窗口或可用线上渠道。',
            note: '就劳资格者等通常看直近 5 年分；配偶路线等可能不同。',
            sourceIds: ['isa-eijuu'],
            relatedTopicIds: ['tax-certificate-material'],
          },
          {
            id: 'eijuu-national-tax',
            name: '国税纳税证明书',
            nameJa: '国税納税証明書（その3）',
            status: 'required',
            owner: '本人取得',
            getFrom: '税务署或 e-Tax。',
            note: '税目范围按入管页面确认，不要和住民税证明混同。',
            sourceIds: ['isa-eijuu'],
            relatedTopicIds: ['tax-certificate-material'],
          },
          {
            id: 'eijuu-pension',
            name: '年金缴纳记录',
            nameJa: '公的年金の保険料納付証明',
            status: 'required',
            owner: '本人取得',
            getFrom: '年金事务所、ねんきんネット、定期便等。',
            note: '就劳资格者等通常看直近 2 年分；未纳或免除记录需谨慎确认。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'eijuu-health-insurance',
            name: '健康保险缴纳或资格资料',
            nameJa: '公的医療保険の保険料納付証明',
            status: 'required',
            owner: '本人取得',
            getFrom: '健康保险、国保、市区町村、マイナポータル等。',
            note: 'マイナ保険証、资格确认书等要求按最新页面确认。',
            sourceIds: ['isa-eijuu'],
          },
        ],
      },
      {
        title: '保证人和其他资料',
        materials: [
          {
            id: 'eijuu-guarantor',
            name: '身元保证书和保证人资料',
            nameJa: '身元保証書・身元保証人資料',
            status: 'required',
            owner: '身元保证人和本人准备',
            getFrom: '按入管格式和保证人资料要求准备。',
            note: '保证人资料不等于担保结果，仍要看申请人自身条件。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'eijuu-ryokaisho',
            name: '了解书',
            nameJa: '了解書',
            status: 'required',
            owner: '本人签署',
            getFrom: '入管官网下载多语言版本。',
            note: '2021 年 10 月起成为永住申请必要资料之一。',
            sourceIds: ['isa-eijuu'],
          },
        ],
      },
    ],
    checkNote:
      '永住材料清单不能替代可否判断。未纳、滞纳、收入不足、出国时间长、路线不清时，应进入提问或专业确认。',
    notCovered: [
      '能不能申请永住',
      '年收是否足够',
      '未纳补缴后是否可申请',
      '高度人才/配偶路线完整判断',
    ],
    sources: [
      {
        id: 'isa-eijuu',
        label: '出入国在留管理庁：永住许可申请必要资料',
        url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html',
        organization: '出入国在留管理庁',
        locator: '页面内「必要書類」「住民税」「年金」「了解書」',
        relation: 'direct',
      },
      {
        id: 'isa-eijuu-procedure',
        label: '出入国在留管理庁：永住者的在留资格变更许可申请',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
        organization: '出入国在留管理庁',
        relation: 'related',
      },
    ],
  },
  {
    id: 'tax-certificate-material',
    title: '课税证明・纳税证明怎么准备',
    shortTitle: '税证明',
    summary: '续签和永住常用的税证明，先分清住民税、国税、年度和取得窗口。',
    kind: 'material',
    category: '常见证明',
    visaType: '多种手续共用',
    stage: '先确认需要哪一年、哪一种',
    readiness: 'ready',
    factCardIds: ['juminzei-kazei-shomeisho', 'eijuu-shinsei-shorui'],
    aliases: [
      '课税证明',
      '納税証明',
      '纳税证明',
      '住民税',
      '税证明',
      '所得证明',
      '非课税证明',
    ],
    whereToGo: '住民税证明通常在市区町村；国税纳税证明通常在税务署或 e-Tax。',
    askPrompt: '我续签或永住要税证明，想确认需要哪种证明、几年分、去哪开。',
    facts: [
      {
        label: '课税证明和纳税证明不是同一张',
        text: '一个看所得和税额，一个看纳付状况；申请要求可能同时要。',
        verification: 'needs-check',
      },
      {
        label: '年度很容易拿错',
        text: '窗口说的年度和你理解的“今年收入”不一定一样，要按提交要求核对。',
        verification: 'needs-check',
      },
    ],
    sections: [
      {
        title: '先分清种类',
        materials: [
          {
            id: 'resident-tax-income',
            name: '住民税课税证明',
            nameJa: '住民税の課税証明書',
            status: 'confirm',
            owner: '本人取得',
            getFrom: '市区町村窗口、便利店交付或线上渠道，取决于自治体。',
            note: '常用于证明所得、课税额；非课税者可能是非课税证明。',
            sourceIds: ['soumu-tax', 'isa-eijuu'],
          },
          {
            id: 'resident-tax-payment',
            name: '住民税纳税证明',
            nameJa: '住民税の納税証明書',
            status: 'confirm',
            owner: '本人取得',
            getFrom: '市区町村窗口或可用渠道。',
            note: '常用于证明是否已缴纳；不要拿成只显示所得的证明。',
            sourceIds: ['isa-eijuu'],
          },
          {
            id: 'national-tax-payment',
            name: '国税纳税证明',
            nameJa: '国税納税証明書',
            status: 'confirm',
            owner: '本人取得',
            getFrom: '税务署或 e-Tax。',
            note: '永住等场景可能需要国税侧证明，和住民税不是同一窗口。',
            sourceIds: ['nta-tax'],
          },
        ],
      },
    ],
    checkNote:
      '如果要交永住、经管或转职后的更新材料，先确认申请类型和需要几年分，不要只说“开税证明”。',
    notCovered: ['税额是否足够', '滞纳对永住/续签影响', '个别年度缺失如何解释'],
    sources: [
      {
        id: 'soumu-tax',
        label: '総務省：个人住民税',
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html',
        organization: '総務省',
        relation: 'related',
      },
      {
        id: 'nta-tax',
        label: '国税庁：纳税证明书',
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm',
        organization: '国税庁',
        relation: 'direct',
      },
      {
        id: 'isa-eijuu',
        label: '出入国在留管理庁：永住许可申请必要资料',
        url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html',
        organization: '出入国在留管理庁',
        relation: 'related',
      },
    ],
  },
]

export function getQuickReferenceTopic(id: string) {
  return QUICK_REFERENCE_TOPICS.find((topic) => topic.id === id)
}

export function getQuickReferenceTopicsForFactCards(
  factCardIds: ReadonlyArray<string>,
  limit = 2,
) {
  if (factCardIds.length === 0) return []
  const idSet = new Set(factCardIds)
  return QUICK_REFERENCE_TOPICS.filter((topic) =>
    topic.factCardIds?.some((id) => idSet.has(id)),
  ).slice(0, limit)
}
