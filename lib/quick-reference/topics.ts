export type QuickReferenceVerification = 'source-backed' | 'needs-check'

export interface QuickReferenceSource {
  label: string
  url: string
  organization?: string
  locator?: string
  relation?: 'direct' | 'related'
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
  factCardIds?: string[]
  aliases?: string[]
  deadline?: string
  whereToGo?: string
  prepare?: string[]
  askPrompt?: string
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
    factCardIds: ['zairyu-address-change'],
    aliases: ['搬家', '地址变更', '住址', '住所', '转入', '转居'],
    deadline: '搬到新住所后，原则上 14 日以内。',
    whereToGo: '新住所的市区町村窗口。',
    prepare: ['在留卡', '转入/转居等住民基本台账手续相关资料'],
    askPrompt: '我搬家了，想确认在留卡和住民票要怎么处理。',
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
    factCardIds: ['zairyu-card-loss-reissue'],
    aliases: ['在留卡丢了', '钱包丢了', '被盗', '再交付', '补办'],
    deadline: '知道丢失、盗难、灭失等事实后，原则上 14 日以内。',
    whereToGo: '先按遗失/盗难情况取得说明资料，再向入管申请再交付。',
    prepare: ['遗失届受理证明、盗难届受理证明或灾害证明等', '护照或身份确认资料', '照片等申请资料'],
    askPrompt: '我的在留卡丢了，想确认第一步该去哪里、多久以内要补办。',
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
    factCardIds: ['zairyu-card-keitai-gimu'],
    aliases: ['随身', '忘带', '警察检查', '提示', '携带义务'],
    deadline: '不是期限问题，是日常携带和被要求时提示的问题。',
    whereToGo: '通常不需要主动去窗口；被要求提示时按要求出示。',
    prepare: ['在留卡原件'],
    askPrompt: '我今天没带在留卡，会不会有问题？',
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
    factCardIds: [
      'tensyoku-zairyu',
      'gijinkoku-job-change-notification',
      'gijinkoku-job-mismatch',
      'shuro-shikaku-shomeisho',
    ],
    aliases: ['转职', '换公司', '跳槽', '所属机关', '所属機関', '就劳资格证明'],
    deadline: '契约结束或新契约成立等事由发生后，通常 14 日以内届出。',
    whereToGo: '入管窗口、邮送或电子届出；资格范围拿不准时另行确认。',
    prepare: ['退职日/入职日', '新旧雇用契约或内定资料', '岗位说明和实际业务内容'],
    askPrompt: '我换工作了，想确认是只要14日届出，还是需要变更/就劳资格证明。',
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
    factCardIds: ['shitsugyo-zairyu-risk', 'tensyoku-zairyu'],
    aliases: ['离职', '退职', '失业', '辞职', '被解雇', '找工作'],
    deadline: '退职等导致契约关系结束时，通常 14 日以内届出。',
    whereToGo: '入管办理所属机关届出；同时保留求职记录。',
    prepare: ['退职日', '离职证明或雇用结束资料', '求职记录', '现在的在留期限'],
    askPrompt: '我离职了还在找工作，想确认在留风险和应该保留什么记录。',
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
    checkNote: '是否属于“正当理由”，需要结合求职记录和实际活动判断。',
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
    factCardIds: ['minashi-sainyuukoku', 'sainyukoku-kyoka'],
    aliases: ['临时回国', '再入国', 'みなし', '出国', '回国', '离境'],
    deadline: '通常以出国后 1 年以内再入国为中心；在留期限更早到期时要以在留期限为准。',
    whereToGo: '出境机场/港口办理相关出国手续；长期出境前先确认再入国许可。',
    prepare: ['有效护照', '有效在留卡', '预计出国和返日日期'],
    askPrompt: '我要临时回国，想确认能不能用みなし再入国。',
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
    factCardIds: ['rishoku-kenko-hoken', 'kokumin-kenko-hoken-kanyu'],
    aliases: ['健保', '健康保险', '国保', '任意继续', '扶养', '社保'],
    deadline: '任意继续通常退职后 20 日以内；国保通常按市区町村规则尽快办理。',
    whereToGo: '任意继续找原健康保险；国民健康保险找住所地市区町村。',
    prepare: ['退职日', '健康保险资格丧失日', '是否能进入家属扶养', '住所地'],
    askPrompt: '我退职了，想确认健康保险是任意继续、国保还是扶养。',
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
    factCardIds: ['rishoku-kokumin-nenkin-kirikae'],
    aliases: ['年金', '厚生年金', '国民年金', '退职', '离职', '免除'],
    deadline: '退职日翌日起 14 日以内。',
    whereToGo: '住所地市区町村窗口。',
    prepare: ['年金番号或マイナンバー', '能确认资格丧失日的资料', '退职日'],
    askPrompt: '我退职了，想确认国民年金要不要切换、多久以内办理。',
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
    checkNote: '如果很快加入新公司的厚生年金、转为配偶扶养第 3 号，或申请保险料免除，处理路径会不同。',
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
    factCardIds: ['juminzei-kazei-shomeisho'],
    aliases: ['住民税', '课税证明', '纳税证明', '納税証明', '税证明', '永住材料'],
    deadline: '没有统一期限；取决于你的申请或提交窗口要求。',
    whereToGo: '住民税证明通常在市区町村；国税纳税证明在税务署或 e-Tax。',
    prepare: ['需要提交的申请类型', '目标年度', '本人确认资料', 'マイナンバー卡或窗口要求资料'],
    askPrompt: '我续签/永住要税证明，想确认需要哪种、几年分、去哪开。',
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
    factCardIds: ['ryugakusei-baito-28jikan', 'shikakugai-fukugyou'],
    aliases: ['打工', '兼职', '资格外', '資格外活動', '留学生打工', '家族滞在打工'],
    deadline: '开始打工前先确认许可；不要先开始再补。',
    whereToGo: '入管申请资格外活动许可；已持许可时核对许可范围。',
    prepare: ['当前在留资格', '是否已有资格外活动许可', '工作内容', '每周时间'],
    askPrompt: '我想打工，想确认需不需要资格外活动许可、时间怎么算。',
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
    factCardIds: ['gaikokujin-koyo-todokede'],
    aliases: ['雇主', '公司', '外国人雇用', 'hello work', 'ハローワーク', '届出'],
    deadline: '雇用保险被保险者和非被保险者的届出期限不同。',
    whereToGo: '事业主向 Hello Work 届出。',
    prepare: ['雇用/离职日期', '雇用保险状态', '在留资格和在留期限信息'],
    askPrompt: '公司雇用外国人，想确认 Hello Work 届出和本人入管届出的区别。',
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
    factCardIds: ['eijuu-card-koushin'],
    aliases: ['永住卡', '在留卡期限', '永住者', '卡更新', '有效期限'],
    deadline: '16 岁以上永住者通常可从在留卡有效期限满了日的 2 个月前申请。',
    whereToGo: '入管窗口或可用的申请路径。',
    prepare: ['在留卡', '护照或资格证明资料', '照片等申请资料'],
    askPrompt: '我是永住者，在留卡快到期了，想确认什么时候更新、要带什么。',
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
    factCardIds: [
      'zairyu-expiry-renewal-change',
      'eijuu-zairyu-kikan',
      'gijinkoku-koushin-shorui',
    ],
    aliases: ['续签', '更新', '变更', '审查', '不许可', '材料', '综合判断'],
    deadline: '具体期限看当前在留期限和申请类型。',
    whereToGo: '入管窗口或电子申请；材料不足时按通知补充。',
    prepare: ['当前在留资格和期限', '收入/税/社保资料', '工作或家庭事实材料', '过去届出记录'],
    askPrompt: '我准备更新/变更在留资格，想确认入管通常会看哪些点。',
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

export function getQuickReferenceTopicsForFactCards(
  factCardIds: ReadonlyArray<string>,
  limit = 2,
) {
  if (factCardIds.length === 0) return []
  const idSet = new Set(factCardIds)
  return QUICK_REFERENCE_TOPICS
    .filter(topic => topic.factCardIds?.some(id => idSet.has(id)))
    .slice(0, limit)
}
