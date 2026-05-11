export type QuickReferenceVerification = 'source-backed' | 'needs-check'

export interface QuickReferenceSource {
  label: string
  url: string
}

export interface QuickReferenceFact {
  label: string
  text: string
  verification: QuickReferenceVerification
}

export interface QuickReferenceTopic {
  id: string
  title: string
  summary: string
  category: string
  facts: QuickReferenceFact[]
  checkNote: string
  sources: QuickReferenceSource[]
}

export const QUICK_REFERENCE_TOPICS: QuickReferenceTopic[] = [
  {
    id: 'address-change',
    title: '搬家后的住所届',
    summary: '中长期在留者搬家后，需要按住所变更规则处理。',
    category: '在留卡',
    facts: [
      {
        label: '期限',
        text: '搬到新住所后，原则上 14 日以内到新住所的市区町村窗口办理。',
        verification: 'source-backed',
      },
      {
        label: '携带',
        text: '办理时带在留卡；与转入、转居等住民基本台账手续可一并处理。',
        verification: 'source-backed',
      },
    ],
    checkNote: '同城搬家、跨市区町村搬家、家族一起搬家时，市区町村要求可能不同。',
    sources: [
      {
        label: '出入国在留管理庁：住居地の変更届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html',
      },
    ],
  },
  {
    id: 'card-loss',
    title: '在留卡丢失或被盗',
    summary: '先取得遗失、盗难等说明资料，再申请再交付。',
    category: '在留卡',
    facts: [
      {
        label: '期限',
        text: '知道丢失、盗难、灭失等事实后，原则上 14 日以内申请再交付。',
        verification: 'source-backed',
      },
      {
        label: '资料',
        text: '通常需要遗失届受理证明、盗难届受理证明或灾害证明等疏明资料。',
        verification: 'source-backed',
      },
    ],
    checkNote: '在海外发现丢失、卡片破损、本人无法到场等情形，需要个别确认。',
    sources: [
      {
        label: '出入国在留管理庁：紛失等による在留カードの再交付申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html',
      },
    ],
  },
  {
    id: 'deemed-reentry',
    title: 'みなし再入国',
    summary: '短期离开日本时，确认是否能用みなし再入国。',
    category: '出入境',
    facts: [
      {
        label: '基本规则',
        text: '持有效护照和在留资格者，若出国后 1 年以内再入国，原则上不需要通常再入国许可。',
        verification: 'source-backed',
      },
      {
        label: '例外',
        text: '「3 月」以下在留期间、短期滞在等不属于みなし再入国的通常对象。',
        verification: 'source-backed',
      },
    ],
    checkNote: '在留期限早于 1 年、长期出境、再入国许可限制等情形，需要出发前确认。',
    sources: [
      {
        label: '出入国在留管理庁：再入国許可申請',
        url: 'https://www.moj.go.jp/isa/immigration/procedures/16-5.html',
      },
    ],
  },
  {
    id: 'part-time-permission',
    title: '资格外活动与打工',
    summary: '留学、家族滞在等身份打工前，先确认许可范围。',
    category: '工作',
    facts: [
      {
        label: '常见上限',
        text: '包括许可通常以 1 周 28 小时以内为中心；留学生长假期间规则另有说明。',
        verification: 'source-backed',
      },
      {
        label: '个别许可',
        text: '业务委托、请负等难以明确劳动时间的活动，可能需要个别许可。',
        verification: 'source-backed',
      },
    ],
    checkNote: '行业、雇佣形态、学校状态、休学退学、多个工作合计时间都需要逐项确认。',
    sources: [
      {
        label: '出入国在留管理庁：「留学」の資格外活動許可',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html',
      },
      {
        label: '出入国在留管理庁：資格外活動許可について',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html',
      },
    ],
  },
  {
    id: 'affiliation-change',
    title: '换工作或离职后的届出',
    summary: '部分在留资格在离职、入职、机构变更时有届出义务。',
    category: '工作',
    facts: [
      {
        label: '期限',
        text: '所属机构相关届出通常以事由发生日起 14 日以内为基本线。',
        verification: 'source-backed',
      },
      {
        label: '对象',
        text: '教授、経営・管理、教育、企業内転勤、留学、研修等活动机构类身份有对应届出。',
        verification: 'source-backed',
      },
      {
        label: '需确认',
        text: '技人国、特定技能、高度专门职等可能涉及契约机构届出或变更申请。',
        verification: 'needs-check',
      },
    ],
    checkNote: '不同在留资格用的届出类型不同；换工作前后不要只看“14 日”这一项。',
    sources: [
      {
        label: '出入国在留管理庁：所属機関等に関する届出 Q&A',
        url: 'https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html',
      },
      {
        label: '出入国在留管理庁：所属（活動）機関に関する届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html',
      },
    ],
  },
  {
    id: 'permanent-resident-card-renewal',
    title: '永住者在留卡更新',
    summary: '永住身份本身和在留卡有效期限是两件事。',
    category: '永住',
    facts: [
      {
        label: '申请期间',
        text: '16 岁以上永住者可从现有在留卡有效期限满了日的 2 个月前到满了日申请。',
        verification: 'source-backed',
      },
      {
        label: '手续费',
        text: '在留卡有效期间更新申请本身不收手续费。',
        verification: 'source-backed',
      },
    ],
    checkNote: '16 岁生日相关期限、长期出国、代理申请等情形，需要看个别说明。',
    sources: [
      {
        label: '出入国在留管理庁：在留カードの有効期間の更新申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html',
      },
    ],
  },
  {
    id: 'renewal-review-factors',
    title: '更新、变更时的常见审查点',
    summary: '更新或变更不是单项打勾；入管会综合看情况。',
    category: '更新变更',
    facts: [
      {
        label: '综合判断',
        text: '指南说明，即使列举事项符合，也可能因全部事情综合考量而不许可。',
        verification: 'source-backed',
      },
      {
        label: '义务履行',
        text: '在留卡届出、有效期更新、再交付、返纳、所属机构等届出义务会被列为考虑事项。',
        verification: 'source-backed',
      },
      {
        label: '个案资料',
        text: '收入、税、社保、工作内容、家庭情况等具体材料是否足够，需要按身份和事实确认。',
        verification: 'needs-check',
      },
    ],
    checkNote: '本条只提示常见方向，不等于对任何申请结果作判断。',
    sources: [
      {
        label: '出入国在留管理庁：在留資格の変更、在留期間の更新許可のガイドライン',
        url: 'https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html',
      },
    ],
  },
]

export function getQuickReferenceTopic(id: string) {
  return QUICK_REFERENCE_TOPICS.find(topic => topic.id === id)
}
