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
    id: 'card-carry',
    title: '在留卡要不要随身带',
    summary: '中长期在留者有在留卡常时携带和提示义务。',
    category: '在留卡',
    facts: [
      {
        label: '携带义务',
        text: '中长期在留者原则上需要常时携带在留卡；16 岁未满者有免除规则。',
        verification: 'source-backed',
      },
      {
        label: '提示义务',
        text: '被入管、警察等要求提示时，需要提示在留卡；提示拒否的后果比单纯忘带更重。',
        verification: 'source-backed',
      },
    ],
    checkNote: '特別永住者、16 岁未满儿童、忘带后的实际处理，需要按具体身份核对。',
    sources: [
      {
        label: '出入国在留管理庁：在留カードに関する各種届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html',
      },
    ],
  },
  {
    id: 'job-change',
    title: '换工作后的入管手续',
    summary: '技人国、特定技能等身份转职后，先看 14 日届出和资格变更要否。',
    category: '工作',
    facts: [
      {
        label: '届出期限',
        text: '契约结束或新契约成立等事由发生后，通常需要 14 日以内向入管届出。',
        verification: 'source-backed',
      },
      {
        label: '变更判断',
        text: '新工作是否仍在当前在留资格范围内，需要结合业务内容判断；不要只看公司变了没有。',
        verification: 'needs-check',
      },
    ],
    checkNote: '“只换公司”与“工作内容也变了”不是一回事；业务范围拿不准时可考虑就劳资格证明书或专业确认。',
    sources: [
      {
        label: '出入国在留管理庁：所属（契約）機関に関する届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html',
      },
    ],
  },
  {
    id: 'retirement-risk',
    title: '离职、失业后的在留风险',
    summary: '退职后不是马上失效，但有届出义务和活动空白风险。',
    category: '工作',
    facts: [
      {
        label: '14 日届出',
        text: '退职、解雇等导致契约机构关系结束时，通常需要 14 日以内向入管届出。',
        verification: 'source-backed',
      },
      {
        label: '3 个月风险',
        text: '与在留资格相关的活动连续 3 个月以上没有进行时，可能进入取消风险判断。',
        verification: 'source-backed',
      },
    ],
    checkNote: '正在认真就职活动是否属于“正当理由”，需要结合材料和实际行动记录判断。',
    sources: [
      {
        label: '出入国在留管理庁：所属（契約）機関に関する届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html',
      },
      {
        label: '出入国在留管理庁：在留資格取消し',
        url: 'https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html',
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
    id: 'health-insurance-after-leaving-job',
    title: '退职后的健康保险',
    summary: '退职后要在任意继续和国民健康保险之间确认路径和期限。',
    category: '社保',
    facts: [
      {
        label: '任意继续',
        text: '协会健保任意继续通常有退职后 20 日以内申请等时间要求。',
        verification: 'source-backed',
      },
      {
        label: '国保',
        text: '没有加入其他健康保险时，国民健康保险通常需要向住所地市区町村办理。',
        verification: 'source-backed',
      },
    ],
    checkNote: '任意继续、国保、家属扶养的条件和费用不同；先确认退职日、健保资格丧失日和住所地。',
    sources: [
      {
        label: '全国健康保険協会：任意継続',
        url: 'https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/',
      },
      {
        label: '厚生労働省：国民健康保険の加入・脱退',
        url: 'https://www.mhlw.go.jp/stf/newpage_21539.html',
      },
    ],
  },
  {
    id: 'pension-after-leaving-job',
    title: '退职后的国民年金切换',
    summary: '厚生年金资格结束后，先确认是否需要切到国民年金第 1 号。',
    category: '年金',
    facts: [
      {
        label: '期限',
        text: '退职日翌日起 14 日以内，到住所地市区町村办理国民年金切换。',
        verification: 'source-backed',
      },
      {
        label: '资料',
        text: '通常需要年金番号或マイナンバー，以及能确认资格丧失日的离职票等资料。',
        verification: 'source-backed',
      },
    ],
    checkNote: '马上进入新公司的厚生年金、配偶者扶养第 3 号、保险料免除申请，路径会不同。',
    sources: [
      {
        label: '日本年金機構：会社を退職したときの国民年金の手続き',
        url: 'https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-03.html',
      },
    ],
  },
  {
    id: 'tax-certificate',
    title: '住民税和课税/纳税证明',
    summary: '在留更新、永住、收入证明相关问题经常会用到税证明。',
    category: '税金',
    facts: [
      {
        label: '住民税',
        text: '日本有住所者按前年所得等计算住民税；外国人也可能成为课税对象。',
        verification: 'source-backed',
      },
      {
        label: '证明书',
        text: '住民税课税/纳税证明通常在市区町村取得；国税纳税证明在税务署或 e-Tax 取得。',
        verification: 'source-backed',
      },
    ],
    checkNote: '在留申请到底要几年分、哪种证明，要按在留资格和申请类型核对。',
    sources: [
      {
        label: '総務省：個人住民税',
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html',
      },
      {
        label: '国税庁：納税証明書',
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm',
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
    id: 'foreign-employment-notification',
    title: '雇主的外国人雇用届出',
    summary: '雇用外国人时，事业主侧也有向 Hello Work 届出的义务。',
    category: '雇用',
    facts: [
      {
        label: '义务主体',
        text: '外国人劳动者的雇入和离职，原则上由事业主向 Hello Work 届出。',
        verification: 'source-backed',
      },
      {
        label: '期限差异',
        text: '雇用保险被保险者和非被保险者的届出期限不同，需要按雇佣形态核对。',
        verification: 'source-backed',
      },
    ],
    checkNote: '这是雇主侧义务，不等于本人不需要处理自己的在留届出或资格变更。',
    sources: [
      {
        label: '厚生労働省：外国人雇用状況の届出',
        url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html',
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
