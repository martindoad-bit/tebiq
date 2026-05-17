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
  relatedTopicIds?: string[]
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
    title: '搬家后要办什么',
    summary: '搬到新地址后，通常要先到市区町村办住所变更。',
    category: '在留卡',
    factCardIds: [
      'zairyu-address-change',
      'jukyochi-90days-torikeshi',
    ],
    relatedTopicIds: ['tax-certificate', 'renewal-review-factors'],
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
    checkNote: '同城、跨市区町村、家族一起搬家，窗口要求可能不同。',
    sources: [
      {
        label: '出入国在留管理庁：住居地の変更届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html',
      },
    ],
  },
  {
    id: 'card-loss',
    title: '在留卡丢了',
    summary: '先拿遗失或被盗的证明，再向入管申请补发。',
    category: '在留卡',
    factCardIds: [
      'zairyu-card-loss-reissue',
    ],
    relatedTopicIds: ['permanent-resident-card-renewal'],
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
    checkNote: '在海外发现丢失、卡片破损、本人无法到场时，处理方式会不同。',
    sources: [
      {
        label: '出入国在留管理庁：紛失等による在留カードの再交付申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html',
      },
    ],
  },
  {
    id: 'card-carry',
    title: '在留卡要随身带吗',
    summary: '中长期在留者通常要随身带在留卡，被要求时要出示。',
    category: '在留卡',
    factCardIds: [
      'zairyu-card-keitai-gimu',
    ],
    relatedTopicIds: ['card-loss', 'permanent-resident-card-renewal'],
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
    title: '换工作后要做什么',
    summary: '先看 14 日内的入管届出，再看工作内容是否还在原资格范围内。',
    category: '工作',
    factCardIds: [
      'tensyoku-zairyu',
      'gijinkoku-job-mismatch',
      'shuro-shikaku-shomeisho',
      'foreigner-employment-info-portal',
      'tokutei-katsudou-46-target',
      'tokutei-ginou-tenshoku',
      'jfind-tokutei-katsudou',
    
      'gijinkoku-shihon-jugyou-strict',
      'fuhou-shurou-employer',],
    relatedTopicIds: [
      'retirement-risk',
      'health-insurance-after-leaving-job',
      'pension-after-leaving-job',
      'renewal-review-factors',
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
    checkNote: '只换公司和工作内容也变了不是一回事；业务范围拿不准时先问。',
    sources: [
      {
        label: '出入国在留管理庁：所属（契約）機関に関する届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html',
      },
    ],
  },
  {
    id: 'retirement-risk',
    title: '离职后还能留多久',
    summary: '离职后不是马上失效，但通常有 14 日届出和活动空白风险。',
    category: '工作',
    factCardIds: [
      'shitsugyo-zairyu-risk',
      'tensyoku-zairyu',
      'foreigner-employment-info-portal',
      'zairyu-shitsugyo-hosho-pension',
      'shitsugyou-gijinkoku-3months',
    ],
    relatedTopicIds: [
      'job-change',
      'health-insurance-after-leaving-job',
      'pension-after-leaving-job',
      'renewal-review-factors',
    ],
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
    summary: '短期回国或出境前，先确认能不能用みなし再入国。',
    category: '出入境',
    factCardIds: [
      'minashi-sainyuukoku',
      'sainyukoku-kyoka',
      'saiyuukoku-kyoka-1year-5year',
      'tokurei-kikan-2months',
    
      'eijuu-takeoff-risk',],
    relatedTopicIds: ['renewal-review-factors', 'permanent-resident-card-renewal'],
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
    title: '离职后的健康保险',
    summary: '离职后要确认继续原健保、加入国保，还是进入家属扶养。',
    category: '社保',
    factCardIds: [
      'rishoku-kenko-hoken',
      'kokumin-kenko-hoken-kanyu',
      'kaigo-hoken-day1-after-40',
      'kibyou-teate-3day-byouki',
      'shougai-nenkin-overview',
      'zairyu-shitsugyo-hosho-pension',
    ],
    relatedTopicIds: ['retirement-risk', 'pension-after-leaving-job'],
    aliases: ['健保', '健康保险', '国保', '任意继续', '扶养', '社保'],
    deadline: '任意继续通常退职后 20 日以内；国保通常按市区町村规则尽快办理。',
    whereToGo: '任意继续找原健康保险；国民健康保险找住所地市区町村。',
    prepare: ['退职日', '健康保险资格丧失日', '是否能进入家属扶养', '住所地'],
    askPrompt: '我退职了，想确认健康保险是任意继续、国保还是扶养。',
    facts: [
      {
        label: '继续原来的健保',
        text: '协会健保任意继续通常有退职后 20 日以内申请等时间要求。',
        verification: 'source-backed',
      },
      {
        label: '加入国民健康保险',
        text: '没有加入其他健康保险时，国民健康保险通常需要向住所地市区町村办理。',
        verification: 'source-backed',
      },
    ],
    checkNote: '继续原健保、国保、扶养的条件和费用不同；先确认退职日和资格丧失日。',
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
    title: '离职后的年金',
    summary: '厚生年金结束后，通常要确认国民年金切换。',
    category: '年金',
    factCardIds: [
      'rishoku-kokumin-nenkin-kirikae',
      'shougai-nenkin-overview',
      'zairyu-shitsugyo-hosho-pension',
    ],
    relatedTopicIds: ['retirement-risk', 'health-insurance-after-leaving-job', 'tax-certificate'],
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
    title: '税证明怎么开',
    summary: '续签、永住、收入证明时，经常会用到课税证明和纳税证明。',
    category: '税金',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'jumin-zei-no-shukyou-3types',
      'zeimu-shomeisho-3types',
      'shoukibo-jigyou-zei',
    ],
    relatedTopicIds: ['renewal-review-factors', 'pension-after-leaving-job'],
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
    title: '留学生/家族签打工',
    summary: '打工前先确认有没有资格外活动许可，以及时间上限。',
    category: '工作',
    factCardIds: [
      'ryugakusei-baito-28jikan',
      'shikakugai-fukugyou',
      'ryugaku-shikakugai-individual-permission',
    
      'shikakugai-30jikan-rural',],
    relatedTopicIds: ['renewal-review-factors'],
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
    title: '公司雇外国人要申报吗',
    summary: '公司雇用或雇用结束外国人时，通常有 Hello Work 届出义务。',
    category: '雇用',
    factCardIds: [
      'gaikokujin-koyo-todokede',
      'foreigner-employment-info-portal',
      'tokutei-ginou-shien-keikaku',
      'ikusei-shuroh-overview',
    ],
    relatedTopicIds: ['job-change', 'retirement-risk'],
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
    title: '永住卡快到期',
    summary: '永住身份本身和在留卡有效期限是两件事。',
    category: '永住',
    factCardIds: [
      'eijuu-card-koushin',
      'eijuu-renew-not-required',
      'online-zairyu-card-uketori',
      'zaihu-card-3rd-online',
      'eijuu-after-kika-card',
      'saiyuukoku-kyoka-1year-5year',
    ],
    relatedTopicIds: ['deemed-reentry', 'renewal-review-factors'],
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
    title: '续签/变更会看什么',
    summary: '入管不只看一项材料，会综合看身份、义务履行和实际情况。',
    category: '更新变更',
    factCardIds: [
      'zairyu-expiry-renewal-change',
      'eijuu-zairyu-kikan',
      'gijinkoku-koushin-shorui',
    ],
    relatedTopicIds: ['tax-certificate', 'job-change', 'pension-after-leaving-job'],
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
  {
    id: 'gijinkoku-renewal-materials',
    title: '技人国 续签材料',
    summary: '续签前先核对公司类别、雇用契约和最新课税·纳税证明这三块材料。',
    category: '更新变更',
    factCardIds: [
      'gijinkoku-koushin-shorui',
      'gijinkoku-job-mismatch',
      'juminzei-kazei-shomeisho',
      'zairyu-expiry-renewal-change',
      'gijinkoku-cefr-b2-2026',
      'gijinkoku-shotoku-shokuin-naka',
    
      'gijinkoku-shihon-jugyou-strict',
      'gijinkoku-major-job-match',],
    relatedTopicIds: [
      'job-change',
      'resident-tax-certificate-materials',
      'renewal-review-factors',
      'pension-social-insurance-proof-materials',
    ],
    aliases: ['技人国', '技术人文知识国际业务', '续签材料', '更新材料', '在职证明', '课税证明'],
    deadline: '通常可以在在留期间满了的 3 个月前申请。',
    whereToGo: '入管窗口或电子申请；课税·纳税证明在市区町村；登记事项证明书在法务局。',
    prepare: [
      '在留期间更新申请书 + 写真',
      '护照 + 在留卡',
      '雇用契约或在职证明',
      '最新年度的课税·纳税证明',
      '公司类别相关资料（登记事项证明、决算文件等）',
      '岗位说明书 / 业务内容资料',
    ],
    askPrompt: '我做的工作内容和当初申请时不太一样，想确认是续签还是要变更资格。',
    facts: [
      {
        label: '申请期间',
        text: '通常可以从在留期间满了日的 3 个月前开始申请。',
        verification: 'source-backed',
      },
      {
        label: '公司类别影响',
        text: '雇主公司被分为四类，类别不同提交材料的分量差很大；先确认公司属于哪一类。',
        verification: 'source-backed',
      },
      {
        label: '岗位匹配',
        text: '不是有雇用契约就一定续签通过；实际业务内容要落在「技术·人文知识·国际业务」范围内。',
        verification: 'needs-check',
      },
    ],
    checkNote: '副业、产假/育儿假期间收入下降、中途换公司、外派/出向，这些情况材料和审查方向都会不同。',
    sources: [
      {
        label: '出入国在留管理庁：在留期間更新許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00007.html',
      },
      {
        label: '出入国在留管理庁：「技術・人文知識・国際業務」',
        url: 'https://www.moj.go.jp/isa/applications/status/gijinkokugyomu.html',
      },
    ],
  },
  {
    id: 'keiei-kanri-renewal-materials',
    title: '経営·管理 续签材料',
    summary: '续签前先核对官方申请书面材料；2025 年改革的资本金/人员判断由专家个案判断，不在本页给结论。',
    category: '更新变更',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'zairyu-expiry-renewal-change',
      'gijinkoku-koushin-shorui',
      'startup-visa-meti-fukuoka',
      'shoukibo-jigyou-zei',
    ],
    relatedTopicIds: [
      'resident-tax-certificate-materials',
      'national-tax-certificate-sono3-materials',
      'renewal-review-factors',
    ],
    aliases: ['経営管理', '経管', '经营管理', '社长签证', '法人代表', '资本金', '决算书'],
    deadline: '通常可以在在留期间满了的 3 个月前申请。',
    whereToGo: '入管窗口或电子申请；法务局取登记事项证明书；税务署/市区町村取税证明。',
    prepare: [
      '在留期间更新申请书 + 写真',
      '护照 + 在留卡',
      '法人登记事项证明书',
      '最近一期决算书（B/S, P/L）和税务申告书写',
      '住民税課税·納税証明',
      '国税納税証明書（その3 等，按情况）',
      '事業所写真·賃貸借契約 等',
    ],
    askPrompt: '我公司今年决算亏损/雇用人数减少/资本金不到改革后基准，想确认续签该怎么准备。',
    facts: [
      {
        label: '申请期间',
        text: '通常可以从在留期间满了日的 3 个月前开始申请。',
        verification: 'source-backed',
      },
      {
        label: '材料范围',
        text: '需要法人侧（登记/决算/税务）+ 个人侧（课税·纳税·住民票）两组材料。',
        verification: 'source-backed',
      },
      {
        label: '2025 改革边界',
        text: '资本金、专任人员等 2025 年改革后的具体基准要按公司情况个案确认，本页不给结论。',
        verification: 'needs-check',
      },
    ],
    checkNote: '处于公司 2 期以内、业绩下滑、变更事業所、解雇员工、改革过渡期处理等情况，全部建议先和行政书士/税理士确认。',
    sources: [
      {
        label: '出入国在留管理庁：「経営・管理」',
        url: 'https://www.moj.go.jp/isa/applications/status/keieikanri.html',
      },
      {
        label: '出入国在留管理庁：在留期間更新許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00007.html',
      },
    ],
  },
  {
    id: 'family-stay-renewal-materials',
    title: '家族滞在 续签材料',
    summary: '续签前确认 sponsor（在日工作/学习方）+ 本人 + 关系证明三块材料。',
    category: '更新变更',
    factCardIds: [
      'kazoku-taizai-yoken',
      'juminzei-kazei-shomeisho',
      'ryugakusei-baito-28jikan',
      'zairyu-expiry-renewal-change',
      'kazoku-taizai-zairyu-period',
      'kazoku-taizai-shussan-shutoku',
    
      'kazoku-shanzaihon-imin',
      'kazoku-yobi-naitei-haigusha',],
    relatedTopicIds: [
      'part-time-permission',
      'resident-tax-certificate-materials',
      'renewal-review-factors',
      'job-change',
    ],
    aliases: ['家族滞在', '家族签', '配偶', '子女', 'sponsor', '扶养'],
    deadline: '通常可以在在留期间满了的 3 个月前申请。',
    whereToGo: '入管窗口或电子申请；市区町村取住民票/课税证明；本国机关取婚姻或出生证明。',
    prepare: [
      '在留期间更新申请书 + 写真',
      '护照 + 在留卡',
      'Sponsor 的在留卡和职业证明',
      'Sponsor 的最新课税·纳税证明',
      '关系证明（婚姻/出生/戸籍誊本 + 翻译）',
      '全员表示的住民票',
    ],
    askPrompt: 'Sponsor 收入下降 / 我每周打工超过 28 小时 / 我们目前分居，想确认续签该怎么准备。',
    facts: [
      {
        label: 'Sponsor 的状态',
        text: '续签首先看 sponsor 是否还在继续工作或学习；sponsor 的在留资格和收入会被审查。',
        verification: 'source-backed',
      },
      {
        label: '打工时间',
        text: '家族滞在打工需要资格外活动许可，包括许可常以每周 28 小时为上限。',
        verification: 'source-backed',
      },
    ],
    checkNote: 'Sponsor 跳槽、sponsor 暂时失业、本人怀孕或刚出生子女、家庭分居/世帯分离，这些情况都建议先确认。',
    sources: [
      {
        label: '出入国在留管理庁：「家族滞在」',
        url: 'https://www.moj.go.jp/isa/applications/status/kazokutaizai.html',
      },
      {
        label: '出入国在留管理庁：在留期間更新許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00007.html',
      },
    ],
  },
  {
    id: 'japanese-spouse-renewal-materials',
    title: '日本人配偶者 续签材料',
    summary: '只覆盖正常婚姻状态下的续签材料；分居 / 离婚 / 再婚 / DV 情况请走 Ask。',
    category: '更新变更',
    factCardIds: [
      'nihonjin-haigusha-visa',
      'juminzei-kazei-shomeisho',
      'zairyu-expiry-renewal-change',
      'eijuu-haigusha-zairyu-1year',
      'yobi-yose-shinseki-houmon',
    
      'rikon-todoke-procedure',],
    relatedTopicIds: [
      'resident-tax-certificate-materials',
      'renewal-review-factors',
      'permanent-residence-application-materials',
    ],
    aliases: ['日配', '日本人配偶者', '日本人の配偶者等', '婚姻续签', '婚姻签'],
    deadline: '通常可以在在留期间满了的 3 个月前申请。',
    whereToGo: '入管窗口或电子申请；市区町村取戸籍/住民票/课税证明。',
    prepare: [
      '在留期间更新申请书 + 写真',
      '护照 + 在留卡',
      '配偶的戸籍誊本（全部事项）',
      '全员表示的住民票',
      '配偶的最新课税·纳税证明',
      '本人的最新课税·纳税证明',
      '婚姻生活的相关资料（照片、汇款记录、共同账户等）',
    ],
    askPrompt: '我和配偶分居 / 准备离婚 / 已离婚再婚 / 涉及 DV，想确认在留该怎么走。',
    facts: [
      {
        label: '基本材料',
        text: '需要婚姻关系证明（戸籍誊本）+ 同居/生活实态资料 + 双方收入证明。',
        verification: 'source-backed',
      },
      {
        label: '婚姻实态',
        text: '审查会综合看婚姻是否实质存续；不是只看戸籍上还在婚。',
        verification: 'needs-check',
      },
    ],
    checkNote: '分居、离婚、再婚、DV 等情况不在本页处理；不要直接套用本页材料清单，建议走 Ask 或专业窗口个案确认。',
    sources: [
      {
        label: '出入国在留管理庁：「日本人の配偶者等」',
        url: 'https://www.moj.go.jp/isa/applications/status/nihonjin.html',
      },
      {
        label: '出入国在留管理庁：在留期間更新許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00007.html',
      },
    ],
  },
  {
    id: 'student-renewal-materials',
    title: '留学 续签材料',
    summary: '续签前确认在学证明、出席率、缴费状态和经费支付能力。',
    category: '更新变更',
    factCardIds: [
      'ryugakusei-baito-28jikan',
      'ryugaku-koushin-shutsusekiRitsu',
      'nihongo-gakko-ryugaku',
      'zairyu-expiry-renewal-change',
      'ryugaku-naitei-tokutei-katsudou',
      'ryugaku-shikakugai-individual-permission',
      'ryugaku-kishu-katsudo-tokkatsu',
      'jfind-tokutei-katsudou',
    ],
    relatedTopicIds: [
      'part-time-permission',
      'renewal-review-factors',
      'job-change',
    ],
    aliases: ['留学', '语校', '専門学校', '大学', '大学院', '在学证明', '出席率'],
    deadline: '通常可以在在留期间满了的 3 个月前申请。',
    whereToGo: '入管窗口或电子申请；学校事务局取在学/成绩/出席证明；银行取残高证明。',
    prepare: [
      '在留期间更新申请书 + 写真',
      '护照 + 在留卡',
      '在学証明書',
      '成绩证明 + 出席率证明',
      '经费支付能力资料（在职证明 / 银行残高 / 奖学金证明）',
      '学费缴费证明',
    ],
    askPrompt: '我出席率不到 70% / 留年 / 想从语校升专门学校，想确认续签该怎么准备。',
    facts: [
      {
        label: '出席率',
        text: '出席率会被作为审查要素之一；通常学校会按一定基准（常见 70-80%）跟入管报告。',
        verification: 'source-backed',
      },
      {
        label: '打工时间',
        text: '留学打工需要资格外活动许可，包括许可常以每周 28 小时为上限；长假期间另有规则。',
        verification: 'source-backed',
      },
    ],
    checkNote: '出席率低、留年、换学校（语校→専門→大学等）、长期打工记录，这些情况材料和审查方向会不同。',
    sources: [
      {
        label: '出入国在留管理庁：「留学」',
        url: 'https://www.moj.go.jp/isa/applications/status/ryugaku.html',
      },
      {
        label: '出入国在留管理庁：在留期間更新許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00007.html',
      },
    ],
  },
  {
    id: 'permanent-residence-application-materials',
    title: '永住申请材料',
    summary: '永住申请要的材料范围比续签广得多：在留年限、行状、经济基础、公的义务履行都要证明。',
    category: '永住',
    factCardIds: [
      'eijuu-shinsei-shorui',
      'juminzei-kazei-shomeisho',
      'eijuu-zairyu-kikan',
      'eijuu-haigusha-3years-route',
      'eijuu-children-direct-route',
      'eijuu-shotoku-haigusha-3year',
      'eijuu-letterofunderstanding-2021',
      'hoshou-jin-eijuu',
      'eijuu-haigusha-zairyu-1year',
      'shougai-nenkin-overview',
    
      'eijuu-3000man-shisan-myth',
      'eijuu-junior-15-eligibility',
      'eijuu-takeoff-risk',
      'eijuu-haigusha-visa',],
    relatedTopicIds: [
      'resident-tax-certificate-materials',
      'national-tax-certificate-sono3-materials',
      'pension-social-insurance-proof-materials',
      'permanent-resident-card-renewal',
      'renewal-review-factors',
    ],
    aliases: ['永住申请', '永住许可', '永驻', '永住权', '身元保证人', '了解书'],
    deadline: '没有期限上限；先看自身是否满足在留年限和行状要件再申请。',
    whereToGo: '入管窗口或电子申请；市区町村、税务署/e-Tax、年金事务所/ねんきんネット分别取相应证明。',
    prepare: [
      '永住许可申请书 + 写真',
      '护照 + 在留卡',
      '全员表示的住民票',
      '住民税課税·納税証明（通常 5 年分）',
      '国税納税証明書（その3 等，按情况）',
      '年金缴纳记录（ねんきんネット印刷 / 领収证书）',
      '社保（健保）缴纳记录',
      '身元保证书 + 保证人资料',
      '雇用证明 / 在职证明',
      '家庭关系资料',
    ],
    askPrompt: '我有税迟纳 / 年金漏缴 / 跳槽多次 / 配偶在海外，想确认永住申请该怎么处理。',
    facts: [
      {
        label: '材料范围',
        text: '永住申请要的材料比续签多得多：在留资料 + 税资料 + 年金资料 + 身元保证 + 家庭资料。',
        verification: 'source-backed',
      },
      {
        label: '公的义务履行',
        text: '税和年金的缴纳状况会被作为重要审查事项；本页不给具体追溯年限的断言。',
        verification: 'needs-check',
      },
    ],
    checkNote: '高度专门职、日本人配偶者特例、定住者特例等情况，要件不同；过去有迟纳/漏缴/出国超期时，强烈建议先和行政书士确认。',
    sources: [
      {
        label: '出入国在留管理庁：永住許可申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
      },
      {
        label: '出入国在留管理庁：永住許可に関するガイドライン',
        url: 'https://www.moj.go.jp/isa/applications/guide/eijyu-guideline.html',
      },
    ],
  },
  {
    id: 'resident-tax-certificate-materials',
    title: '住民税 課税·納税証明書',
    summary: '续签 / 永住 / 家庭扶养常用到这两张证明；要去 1 月 1 日时在住的市区町村开。',
    category: '税金',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'jumin-zei-gaiyo',
      'jumin-zei-jan1-criterion',
      'eijuu-shotoku-haigusha-3year',
      'jumin-zei-no-shukyou-3types',
    ],
    relatedTopicIds: [
      'national-tax-certificate-sono3-materials',
      'permanent-residence-application-materials',
      'gijinkoku-renewal-materials',
      'family-stay-renewal-materials',
      'renewal-review-factors',
    ],
    aliases: ['住民税', '課税証明', '納税証明', '住民税证明', '市区町村', 'マイナンバーカード'],
    deadline: '没有统一期限；入管申请通常要求 3 个月以内取得的最新版。',
    whereToGo: '1 月 1 日时在住的市区町村役所（即使现在已搬走也要回原市区町村）。',
    prepare: [
      '本人确认资料（マイナンバーカード 或 在留卡）',
      '手数料（1 通通常 200-400 円）',
      '需要的年度和件数',
      '委任状（请家人/行政书士代办时）',
    ],
    askPrompt: '我中途搬过家 / 不知道要开几年分 / 课税和纳税哪个该开，想确认。',
    facts: [
      {
        label: '取得地',
        text: '住民税证明要在 1 月 1 日时在住的市区町村取得，不是现在住的地方。',
        verification: 'source-backed',
      },
      {
        label: '两张不同',
        text: '「課税証明」记录所得和税额；「納税証明」记录是否实际缴纳；申请类型不同要的也不同。',
        verification: 'source-backed',
      },
    ],
    checkNote: '永住通常要 5 年分、续签通常最新 1 年，但具体要按申请类型再确认；コンビニ取得和 e-申请有些市区町村可用、有些不行。',
    sources: [
      {
        label: '総務省：個人住民税',
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html',
      },
    ],
  },
  {
    id: 'national-tax-certificate-sono3-materials',
    title: '国税 納税証明書「その3」',
    summary: '永住申请和経営管理续签常用「その3」；要去税务署或 e-Tax，不是市区町村。',
    category: '税金',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'kakutei-shinkoku-gijmu',
      'zeimu-shomeisho-3types',
    ],
    relatedTopicIds: [
      'resident-tax-certificate-materials',
      'permanent-residence-application-materials',
      'keiei-kanri-renewal-materials',
    ],
    aliases: ['納税証明書', '国税', 'その3', 'その3の3', '税務署', 'e-Tax'],
    deadline: '没有统一期限；入管申请通常要求 3 个月以内取得。',
    whereToGo: '所辖税務署（郵送可）；持有マイナンバーカード时可用 e-Tax 在线申请。',
    prepare: [
      '交付請求書',
      '本人确认资料（マイナンバーカード）',
      '手数料（1 通 400 円；e-Tax 通常 370 円）',
      '需要哪一种その3（その3 / その3の2 / その3の3）',
      '委任状（请税理士/行政书士代办时）',
    ],
    askPrompt: '我是个人事业主 / 法人代表 / 工薪族，应该取哪一种「その3」？',
    facts: [
      {
        label: '取得地',
        text: '国税納税証明书要去税務署或 e-Tax 申请，不在市区町村；住民税才在市区町村。',
        verification: 'source-backed',
      },
      {
        label: '种类区分',
        text: '「その3」证明没有未缴税额，常分「その3の2」「その3の3」等子类，按用途选择。',
        verification: 'source-backed',
      },
    ],
    checkNote: '个人事业主、法人代表、工薪族要的子类不同；没有应纳税也可申请，但请求书需写明用途。',
    sources: [
      {
        label: '国税庁：納税証明書',
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm',
      },
      {
        label: '国税庁：納税証明書の交付請求手続',
        url: 'https://www.nta.go.jp/taxes/nozei/nozei-shomei/01.htm',
      },
    ],
  },
  {
    id: 'pension-social-insurance-proof-materials',
    title: '年金·社保 缴纳证明（申请用）',
    summary: '永住 / 归化 / 部分续签会要 24 个月以上缴纳记录；先决定走 ねんきんネット 还是年金事务所。',
    category: '年金',
    factCardIds: [
      'kokumin-nenkin-menjo',
      'rishoku-kokumin-nenkin-kirikae',
      'shakai-hoken-kanyu',
      'eijuu-nenkin-2year-shomei-method',
      'maina-hoken-2024-12',
      'kokuho-shutoku-shoumei-2years',
      'shougai-nenkin-overview',
      'zairyu-shitsugyo-hosho-pension',
    ],
    relatedTopicIds: [
      'permanent-residence-application-materials',
      'pension-after-leaving-job',
      'renewal-review-factors',
    ],
    aliases: ['年金证明', '社保证明', 'ねんきんネット', '领收证书', '缴纳记录', '永住年金'],
    deadline: '入管申请通常要求 3 个月以内取得；缴纳记录通常要覆盖最近 24 个月以上。',
    whereToGo: 'ねんきんネット（オンライン）/ 年金事務所 / 勤務先（社保部分）。',
    prepare: [
      '年金番号 或 マイナンバー',
      'ねんきんネット 登録资料（推荐先注册）',
      '领収证书 / 通帳的写し（国民年金缴纳记录）',
      '社保加入证明（勤务先 or 年金事务所发行）',
      '被保险者记录照会回答票（年金事务所取得）',
    ],
    askPrompt: '我有未缴期间 / 申请过免除 / 海外缴过年金，想确认证明该怎么准备。',
    facts: [
      {
        label: '获取方式',
        text: 'ねんきんネット 可下载缴纳记录；纸版可以申请「被保险者记录照会回答票」。',
        verification: 'source-backed',
      },
      {
        label: '免除≠未缴',
        text: '保险料免除·猶予期间是合法状态，不等于未缴；申请时要在表上正确反映。',
        verification: 'source-backed',
      },
    ],
    checkNote: '海外缴纳期间（社保协定国）、补缴行为、免除期间多少，会影响审查方向；本页不给具体追溯月数的断言。',
    sources: [
      {
        label: '日本年金機構：ねんきんネット',
        url: 'https://www.nenkin.go.jp/n_net/index.html',
      },
      {
        label: '日本年金機構：保険料の納付の確認',
        url: 'https://www.nenkin.go.jp/service/kokunen/hokenryo/hokenryo.html',
      },
    ],
  },
  {
    id: 'immigration-notice-supplement-response',
    title: '收到入管通知 / 补正 / 补充材料',
    summary: '先看通知标题、找日期、找期限；不要凭印象判断这封信是哪一类。',
    category: '更新变更',
    factCardIds: [
      'zairyu-expiry-renewal-change',
      'shinseichu-zairyu-keizoku',
    ],
    relatedTopicIds: [
      'renewal-review-factors',
      'deemed-reentry',
      'permanent-residence-application-materials',
    ],
    aliases: ['入管通知', '补正', '补充材料', '不许可', '受付通知', '处分通知', 'はがき'],
    deadline: '通知里会写回复期限（常见 14 日 / 1 个月）；先按通知上的日期算。',
    whereToGo: '通知里指定的入管窗口或邮送地址；不许可后再申请的，回到原入管。',
    prepare: [
      '入管寄来的原件（はがき / メール / 公文书）',
      '申请受理书 / 申请人编号',
      '原申请提交材料的复印件',
      '通知里指定的补正 / 补充资料',
    ],
    askPrompt: '我收到一份入管通知，不知道是哪一类，想先确认是什么 + 期限。',
    facts: [
      {
        label: '先看类型',
        text: '入管文书有受理通知、补正通知、补充资料要求、处分通知等不同类型，做法完全不同。',
        verification: 'source-backed',
      },
      {
        label: '不要忽略',
        text: '不回复 / 忽略通知，可能被视为取下或直接走不许可处分；先确认期限再决定怎么处理。',
        verification: 'source-backed',
      },
    ],
    checkNote: '不许可通知不能上诉，但可以再申请，要分析理由再走；自己回 vs 找行政书士/弁护士，建议先评估。',
    sources: [
      {
        label: '出入国在留管理庁：申請手続関係',
        url: 'https://www.moj.go.jp/isa/applications/index.html',
      },
    ],
    // TODO: needs FACT card for immigration notice taxonomy + nonpermission no-appeal pack
  },
  {
    id: 'address-change-residence-card-materials',
    title: '搬家 + 在留卡 住址变更',
    summary: '搬家后到新住所的市区町村办住民票 + 在留卡住址变更，原则 14 日以内。',
    category: '在留卡',
    factCardIds: [
      'zairyu-address-change',
      'jyumin-hyo-gaijin',
      'jukyochi-90days-torikeshi',
    ],
    relatedTopicIds: [
      'address-change',
      'resident-tax-certificate-materials',
      'renewal-review-factors',
    ],
    aliases: ['搬家', '住址变更', '転入届', '転居届', '住所変更', '住民票'],
    deadline: '搬到新住所后原则 14 日以内。',
    whereToGo: '新住所的市区町村役所。',
    prepare: [
      '在留卡',
      '原住所市区町村发行的転出証明書（跨市区町村搬家时）',
      '本人确认资料',
      '家族同行时各人的在留卡',
    ],
    askPrompt: '我跨都道府县搬家了，想确认転入届和在留卡住址变更的顺序。',
    facts: [
      {
        label: '期限',
        text: '在留卡住居地变更和住民票転入届都是原则 14 日以内。',
        verification: 'source-backed',
      },
      {
        label: '一次办理',
        text: '在市区町村窗口办住民票変更时，可以一并办在留卡背面的住居地记载变更。',
        verification: 'source-backed',
      },
    ],
    checkNote: '同一市内的転居、跨市区町村的転入転出、家族一起搬，办理顺序略有不同。',
    sources: [
      {
        label: '出入国在留管理庁：住居地の変更届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html',
      },
    ],
  },
  {
    id: 'job-change-notification-materials',
    title: '换工作 14 日届出材料',
    summary: '退职或新契约成立后，14 日内向入管做所属机关届出；这是届出不是审查。',
    category: '工作',
    factCardIds: [
      'tensyoku-zairyu',
      'gaikokujin-koyo-todokede',
      'koyou-keiyaku-rouken-tsuchi',
    ],
    relatedTopicIds: [
      'job-change',
      'retirement-risk',
      'work-qualification-certificate-materials',
    ],
    aliases: ['14日届出', '所属機関届出', '届出', '転職届出', '契约机关变更'],
    deadline: '事由发生后 14 日以内。',
    whereToGo: '入管窗口、郵送或电子届出（出入国在留管理庁オンライン）。',
    prepare: [
      '在留卡',
      '退职日 / 入职日',
      '新旧雇主名称、地址、法人番号',
      '雇用契约或内定资料（窗口要求时）',
    ],
    askPrompt: '我换了工作 / 公司被合并 / 派遣公司变了，想确认届出怎么写。',
    facts: [
      {
        label: '届出义务',
        text: '中长期在留者所属机关发生变化时，原则 14 日以内届出。',
        verification: 'source-backed',
      },
      {
        label: '届出 vs 变更',
        text: '14 日届出只是登记事实；如果新工作内容超出现资格范围，要另行做资格变更或资格外活动许可。',
        verification: 'source-backed',
      },
    ],
    checkNote: '雇主侧的 Hello Work 外国人雇用届出 是另一条线，由公司负责，不能替代本人的入管届出。',
    sources: [
      {
        label: '出入国在留管理庁：所属（契約）機関に関する届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html',
      },
    ],
  },
  {
    id: 'card-loss-reissue-materials',
    title: '在留卡丢失 / 再交付 材料',
    summary: '先取得遗失届/盗难届受理证明，再向入管申请再交付，14 日以内。',
    category: '在留卡',
    factCardIds: [
      'zairyu-card-loss-reissue',
      'zairyu-card-keitai-gimu',
    ],
    relatedTopicIds: [
      'card-loss',
      'card-carry',
      'permanent-resident-card-renewal',
    ],
    aliases: ['在留卡丢了', '再交付', '补办', '遗失届', '盗难届'],
    deadline: '知道丢失、盗难、灭失等事实后原则 14 日以内。',
    whereToGo: '先到警察署/交番取遗失届或盗难届受理证明；再到入管申请再交付。',
    prepare: [
      '遗失届受理证明 / 盗难届受理证明 / 灾害证明等',
      '护照或身份确认资料',
      '写真',
      '再交付申请书',
    ],
    askPrompt: '我的在留卡丢了，想确认第一步去警察还是入管。',
    facts: [
      {
        label: '期限',
        text: '原则 14 日以内向入管申请再交付。',
        verification: 'source-backed',
      },
      {
        label: '材料',
        text: '通常需要警察发行的遗失届/盗难届受理证明等疏明资料。',
        verification: 'source-backed',
      },
    ],
    checkNote: '在海外丢失、卡片破损、未成年不能本人到场，处理路径会不同。',
    sources: [
      {
        label: '出入国在留管理庁：紛失等による在留カードの再交付申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html',
      },
    ],
  },
  {
    id: 'return-home-procedures-materials',
    title: '永久回国前的手续',
    summary: '永久回国不是 みなし再入国；要办転出届、年金脱退一時金、住民税、在留卡返納等多条线。',
    category: '出入境',
    factCardIds: [
      'kitaku-tetsuzuki',
      'jumin-zei-shutsukoku',
      'nenkin-dattai-ichijikin',
    
      'eijuu-after-kika-card',],
    relatedTopicIds: [
      'address-change',
      'pension-after-leaving-job',
      'health-insurance-after-leaving-job',
      'deemed-reentry',
    ],
    aliases: ['回国', '永久回国', '帰国', '転出届', '脱退一時金', '在留卡返納'],
    deadline: '転出届原则出国前 14 日内；在留卡在出国时机场返納；脱退一時金通常出国后 2 年内申请。',
    whereToGo: '市区町村（転出届/住民税）/ 年金事務所（年金）/ Hello Work（雇用保险）/ 机场入管（在留卡返納）。',
    prepare: [
      '在留卡',
      'マイナンバー卡（如有）',
      '年金手帳 / 年金番号',
      '雇用保险被保険者证（如有）',
      '银行账户和携帯解约预定',
      '住民税清算或纳税管理人选定',
    ],
    askPrompt: '我打算 X 月回国不再回来，想确认手续顺序和漏掉什么。',
    facts: [
      {
        label: '住民税不会自动消失',
        text: '1 月 1 日在住产生当年度住民税；出国后未缴会留有未払。',
        verification: 'source-backed',
      },
      {
        label: '在留卡返納',
        text: '永久出国时在留卡通常要在机场入管处返納，不能带回国。',
        verification: 'source-backed',
      },
      {
        label: '脱退一時金',
        text: '年金脱退一時金需要主动申请，常以出国后 2 年内为期限。',
        verification: 'source-backed',
      },
    ],
    checkNote: '回国后还可能有未払住民税 → 要事先选纳税管理人；带子女回国还要办出生证明/学籍移管。',
    sources: [
      {
        label: '日本年金機構：脱退一時金',
        url: 'https://www.nenkin.go.jp/service/jukyu/sonota-kyufu/dattai-ichiji/20150406.html',
      },
      {
        label: '出入国在留管理庁：在留カードに関する各種届出',
        url: 'https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html',
      },
    ],
  },
  {
    id: 'health-insurance-leaving-job-materials',
    title: '离职后健保 材料',
    summary: '要在任意继续（20 日内）、国保（市区町村）、家族扶养三条路里选一条。',
    category: '社保',
    factCardIds: [
      'rishoku-kenko-hoken',
      'kokumin-kenko-hoken-kanyu',
      'kenpo-hifuyousha',
    ],
    relatedTopicIds: [
      'health-insurance-after-leaving-job',
      'retirement-risk',
      'pension-after-leaving-job',
    ],
    aliases: ['离职健保', '任意継続', '国保', '扶养加入', '健康保险'],
    deadline: '任意继续原则退职后 20 日以内；国保按市区町村规则尽快。',
    whereToGo: '任意继续：原协会健保 or 健保组合；国保：住所地市区町村；扶养：家人所在的健保。',
    prepare: [
      '退职日 / 资格丧失日',
      '健康保险资格丧失证明',
      '本人确认资料',
      '收入证明（扶养加入时）',
      '退职後の収入見込み資料',
    ],
    askPrompt: '我退职了，想确认任意继续、国保、扶养该选哪个。',
    facts: [
      {
        label: '任意继续',
        text: '协会健保任意继续通常退职后 20 日以内申请，期间常为 2 年。',
        verification: 'source-backed',
      },
      {
        label: '国保',
        text: '没有加入其他健康保险时，通常向住所地市区町村加入国民健康保险。',
        verification: 'source-backed',
      },
    ],
    checkNote: '保险料、扶养条件、家庭成员状况，三条路的金额差别可能很大；先核对退职日和资格丧失日。',
    sources: [
      {
        label: '全国健康保険協会：任意継続',
        url: 'https://www.kyoukaikenpo.or.jp/g3/cat310/',
      },
      {
        label: '厚生労働省：国民健康保険制度',
        url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken01/index.html',
      },
    ],
  },
  {
    id: 'national-pension-after-leaving-materials',
    title: '离职后国民年金 材料',
    summary: '退职日翌日起 14 日内到市区町村办国民年金 1 号切换。',
    category: '年金',
    factCardIds: [
      'rishoku-kokumin-nenkin-kirikae',
      'kokumin-nenkin-menjo',
      'zairyu-shitsugyo-hosho-pension',
    ],
    relatedTopicIds: [
      'pension-after-leaving-job',
      'retirement-risk',
      'pension-social-insurance-proof-materials',
    ],
    aliases: ['离职年金', '国民年金', '第1号', '免除', '猶予'],
    deadline: '退职日翌日起 14 日以内。',
    whereToGo: '住所地市区町村窗口。',
    prepare: [
      '年金番号 或 マイナンバー',
      '資格喪失日が確認できる資料（离职票等）',
      '退职日',
      '收入资料（申请免除/猶予时）',
    ],
    askPrompt: '我退职后没找到下家，想确认国民年金和免除该怎么办。',
    facts: [
      {
        label: '期限',
        text: '退职日翌日起 14 日以内到市区町村办国民年金切换。',
        verification: 'source-backed',
      },
      {
        label: '免除·猶予',
        text: '收入下降时可申请保险料免除或纳付猶予，但要主动申请，不会自动适用。',
        verification: 'source-backed',
      },
    ],
    checkNote: '马上加入新公司的厚生年金、转为配偶扶养第 3 号、或申请免除，路径不同。',
    sources: [
      {
        label: '日本年金機構：会社を退職したときの国民年金の手続き',
        url: 'https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-03.html',
      },
      {
        label: '日本年金機構：国民年金保険料の免除制度',
        url: 'https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html',
      },
    ],
  },
  {
    id: 'work-qualification-certificate-materials',
    title: '就労資格証明書 材料',
    summary: '换工作时可选的安心确认书；不是必办，但常在转职后续签前用。',
    category: '工作',
    factCardIds: [
      'shuro-shikaku-shomeisho',
      'gijinkoku-job-mismatch',
      'shuro-shoumeisho-fee-2000',
    ],
    relatedTopicIds: [
      'job-change',
      'job-change-notification-materials',
      'gijinkoku-renewal-materials',
    ],
    aliases: ['就劳资格证明书', '就労資格証明書', '転職後確認', '资格证明'],
    deadline: '没有期限要求；常在转职后、续签前申请。',
    whereToGo: '入管窗口或电子申请。',
    prepare: [
      '在留卡',
      '护照',
      '新雇主的雇用契约 / 内定通知',
      '岗位说明书',
      '前公司退职证明',
      '最新课税·纳税证明（推荐准备）',
    ],
    askPrompt: '我换了新公司，想确认新工作是不是还在我的在留资格范围内。',
    facts: [
      {
        label: '不是义务',
        text: '就労資格証明書 的申请不是法定义务；用于换工作后提前确认就劳适格性。',
        verification: 'source-backed',
      },
      {
        label: '与14日届出区别',
        text: '14 日所属机关届出 是义务；就労資格証明書 是任意；两者不能互相替代。',
        verification: 'source-backed',
      },
    ],
    checkNote: '即使取得了就労資格証明書，下一次续签也不等于自动通过；只是一个有力的参考。',
    sources: [
      {
        label: '出入国在留管理庁：就労資格証明書交付申請',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00008.html',
      },
    ],
  },
  {
    id: 'dependent-work-permit-materials',
    title: '家族滞在 资格外活动许可 材料',
    summary: '家族滞在打工要先拿包括许可（28 时/周），不要先打再补。',
    category: '工作',
    factCardIds: [
      'shikakugai-fukugyou',
      'ryugakusei-baito-28jikan',
      'kazoku-taizai-yoken',
    ],
    relatedTopicIds: [
      'part-time-permission',
      'family-stay-renewal-materials',
    ],
    aliases: ['家族滞在打工', '资格外活动', '包括许可', '28小时', '配偶打工'],
    deadline: '原则要在开始打工前取得许可。',
    whereToGo: '入管窗口；办在留资格相关手续时常可同窗口申请。',
    prepare: [
      '资格外活动许可申请书',
      '护照 + 在留卡',
      '本人确认资料',
    ],
    askPrompt: '我是家族滞在，想打工但不确定时间能算多少。',
    facts: [
      {
        label: '包括许可上限',
        text: '家族滞在的包括许可通常以每周 28 小时为上限。',
        verification: 'source-backed',
      },
      {
        label: '请负·业务委託',
        text: '难以确定劳动时间的请负、业务委託等，可能需要个别许可，不在包括许可范围内。',
        verification: 'source-backed',
      },
    ],
    checkNote: '风俗业相关、多个雇主合计时间、不符合家族滞在主旨的全职劳动，会有问题；先按情况确认。',
    sources: [
      {
        label: '出入国在留管理庁：資格外活動許可',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html',
      },
    ],
  },
  {
    id: 'study-abroad-shikakugai-materials',
    title: '留学 资格外活动许可 材料',
    summary: '留学生打工要先拿包括许可（28 时/周；长假另算）。',
    category: '工作',
    factCardIds: [
      'ryugakusei-baito-28jikan',
      'shikakugai-fukugyou',
      'ryugaku-shikakugai-individual-permission',
    
      'shikakugai-30jikan-rural',],
    relatedTopicIds: [
      'part-time-permission',
      'student-renewal-materials',
    ],
    aliases: ['留学生打工', '留学资格外', '28小时', '长假打工', '夏休み打工'],
    deadline: '原则要在开始打工前取得许可。',
    whereToGo: '入管窗口；新规来日时可在机场入管同时申请。',
    prepare: [
      '资格外活动许可申请书',
      '护照 + 在留卡',
      '在学证明（窗口要求时）',
    ],
    askPrompt: '我是留学生，想打工但不确定夏休期间能多打多少。',
    facts: [
      {
        label: '上限',
        text: '留学的包括许可通常以每周 28 小时为上限；学校的长假期间常允许 1 日 8 小时。',
        verification: 'source-backed',
      },
      {
        label: '休学期间',
        text: '休学期间的打工不在通常包括许可范围内，需要按学校状态另行确认。',
        verification: 'source-backed',
      },
    ],
    checkNote: '风俗业相关、多个雇主合计时间、毕业后等待续签期间、退学后，规则都会变。',
    sources: [
      {
        label: '出入国在留管理庁：「留学」の資格外活動許可',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html',
      },
    ],
  },
  {
    id: 'minashi-reentry-materials',
    title: 'みなし再入国 出国前材料',
    summary: '短期回国前在机场柜台勾選「みなし再入国」即可；要带有效在留卡 + 护照。',
    category: '出入境',
    factCardIds: [
      'minashi-sainyuukoku',
      'sainyukoku-kyoka',
      'saiyuukoku-kyoka-1year-5year',
    
      'eijuu-takeoff-risk',],
    relatedTopicIds: [
      'deemed-reentry',
      'permanent-resident-card-renewal',
      'return-home-procedures-materials',
    ],
    aliases: ['みなし再入国', '再入国', '1年内回国', '临时回国'],
    deadline: '出国后通常 1 年以内再入国；特别永住者通常 2 年以内；在留期限早于此时以期限为准。',
    whereToGo: '出国机场/港口的入管柜台办出国手续时勾选。',
    prepare: [
      '有效护照',
      '有效在留卡',
      '预计出国和返日日期',
      '再入国 ED 卡（出国时机场提供）',
    ],
    askPrompt: '我下个月回国一周，想确认能不能用 みなし再入国 + 要做什么准备。',
    facts: [
      {
        label: '基本规则',
        text: '持有效护照和在留卡者，出国后通常 1 年以内再入国，原则上不需要通常的再入国许可。',
        verification: 'source-backed',
      },
      {
        label: '例外',
        text: '「3 月」以下在留期间、短期滞在等不属于みなし再入国通常对象。',
        verification: 'source-backed',
      },
    ],
    checkNote: '在留期限早于 1 年、需要长期出境、有再入国许可限制时，要先取通常的再入国许可。',
    sources: [
      {
        label: '出入国在留管理庁：再入国許可',
        url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00006.html',
      },
    ],
  },
  {
    id: 'minor-school-enrollment-materials',
    title: '外国人子女 入学手续 材料',
    summary: '公立小中学校接收外国人子女；先到市区町村教育委员会问就学相談。',
    category: '生活',
    factCardIds: [
      'kodomo-gakko-nyugaku',
      'kodomo-zairyu-shinsei',
      'jyumin-hyo-gaijin',
      'koukou-mukyo-shogakukin',
      'yochi-en-hoiku-gaikoku',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
    ],
    aliases: ['孩子入学', '小学入学', '公立学校', '就学相談', '日本語指導'],
    deadline: '搬入新住所或新学年开始前先和教育委员会预约就学相談。',
    whereToGo: '住所地市区町村的教育委员会 / 学校教育课。',
    prepare: [
      '住民票',
      '在留卡（家长 + 孩子）',
      '本国学校的在学证明 / 成绩证明（如有）',
      '健康诊断资料 / 预防接种记录（如有）',
    ],
    askPrompt: '我要让孩子进日本公立小学/中学，想确认入学流程。',
    facts: [
      {
        label: '入学权利',
        text: '外国人子女有进入日本公立小中学校的入学机会；公立学费基本无偿。',
        verification: 'source-backed',
      },
      {
        label: '日本語指導',
        text: '部分市区町村对日本語不熟练的学生有特别支援/取出指导制度。',
        verification: 'source-backed',
      },
    ],
    checkNote: '私立学校、国际学校、外国人学校 入学手续完全不同；高中入学还要看入试制度。',
    sources: [
      {
        label: '文部科学省：外国人の子供の就学支援',
        url: 'https://www.mext.go.jp/a_menu/shotou/clarinet/main7_a2.htm',
      },
    ],
  },
  {
    id: 'driving-license-conversion-materials',
    title: '外国免许切替 材料',
    summary: '本国驾照在日本切换叫「外免切替」；要先取得译文，再到运转免许中心申请。',
    category: '生活',
    factCardIds: [
      'unten-menkyo-gaijin',
      'gaimen-kirikae-process',
      'unten-menkyo-gaijin-1year',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
    ],
    aliases: ['外免切替', '驾照', '运转免许', '国外免许', '驾照换', 'JAF译文'],
    deadline: '没有期限上限；但本国免许取得后必须在本国实际有过 3 个月以上居住实绩。',
    whereToGo: '住所地都道府县的运転免許試験場 / 运転免許センター。',
    prepare: [
      '本国驾照原件（仍有效）',
      '驾照的日文翻译文（JAF 等机关）',
      '护照（含历年出入境记录）',
      '住民票（含本籍/国籍记载）',
      '本人确认资料',
      '写真',
    ],
    askPrompt: '我有中国驾照，想确认能不能切日本驾照、流程要走多久。',
    facts: [
      {
        label: '基本路径',
        text: '本国驾照 + 译文 + 住民票 + 出入境记录 是基本组合；某些国家需要笔試 + 实技。',
        verification: 'source-backed',
      },
      {
        label: '国别差异',
        text: '部分国家（瑞士、德国、法国、台湾等）和日本互认，免试切换；中国大陆驾照通常需要笔试 + 实技。',
        verification: 'source-backed',
      },
    ],
    checkNote: '本国取得后是否实际居住 3 个月以上、护照是否有相应出入境记录，是常见挂点；译文谁出也有指定。',
    sources: [
      {
        label: '警察庁：外国の運転免許証から日本の運転免許への切替え',
        url: 'https://www.npa.go.jp/policies/application/license_renewal/switch.html',
      },
    ],
  },
  {
    id: 'mynumber-card-materials',
    title: 'マイナンバー卡 申请·更新 材料',
    summary: '中长期在留者也能办マイナンバーカード；卡的有效期通常和在留期限连动。',
    category: '生活',
    factCardIds: [
      'mynumber-gaikokujin',
      'mainaroka-kenkou-hoken',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
      'resident-tax-certificate-materials',
    ],
    aliases: ['マイナンバーカード', 'My Number', '个人番号卡', 'マイナ', '健保连动'],
    deadline: '没有申请期限；在留期限延长后，要在卡有效期满前更新。',
    whereToGo: '住所地市区町村役所；部分流程线上 + 邮送。',
    prepare: [
      '通知卡 或 個人番号通知書',
      '本人确认资料（在留卡 + 1 项）',
      '写真（线上申请可用手机自拍）',
      '受取通知（取卡时）',
    ],
    askPrompt: '我刚搬到日本 / 在留延长了，想确认マイナンバーカード该怎么办。',
    facts: [
      {
        label: '外国人也能办',
        text: '住民票登录的外国人也会被分配マイナンバー，并可申请マイナンバーカード。',
        verification: 'source-backed',
      },
      {
        label: '有效期连动',
        text: '中长期在留者的マイナンバーカード有效期常和在留期限连动；在留延长后卡也要更新。',
        verification: 'source-backed',
      },
    ],
    checkNote: '短期滞在、外交/公用资格者不在对象；マイナ保险证利用还要另行设定。',
    sources: [
      {
        label: '総務省：マイナンバー制度とマイナンバーカード',
        url: 'https://www.soumu.go.jp/kojinbango_card/',
      },
    ],
  },
  {
    id: 'juminhyo-foreign-materials',
    title: '外国人 住民票 取得材料',
    summary: '中长期在留者持住民票；要在窗口申请「住民票の写し」时带在留卡。',
    category: '生活',
    factCardIds: [
      'jyumin-hyo-gaijin',
      'zairyu-tokubetsu-eijuusha',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
      'resident-tax-certificate-materials',
      'mynumber-card-materials',
    ],
    aliases: ['住民票', '住民票の写し', '世帯全员', 'マイナ番号入り', '国籍記載'],
    deadline: '没有期限；提交方常要求 3 个月内取得。',
    whereToGo: '住所地市区町村役所；部分市区町村可コンビニ取得（マイナカード必要）。',
    prepare: [
      '在留卡',
      'マイナンバーカード（コンビニ取得时）',
      '本人确认资料',
      '手数料（1 通 200-400 円）',
      '委任状（代办时）',
    ],
    askPrompt: '我要开住民票，想确认本人/家属/含マイナ番号 哪种最合适。',
    facts: [
      {
        label: '记载选项',
        text: '住民票可选「世帯全员/一部」、「国籍·在留资格记载」、「マイナンバー記載」等不同版本。',
        verification: 'source-backed',
      },
      {
        label: '入管申请用',
        text: '入管申请时常要求「世帯全员表示」+ 「国籍·在留资格记载」+「不含 マイナ番号」。',
        verification: 'needs-check',
      },
    ],
    checkNote: '具体记载项目按用途选择；入管/银行/学校 要的版本不同，最好先问对方。',
    sources: [
      {
        label: '総務省：住民票の写し等の交付請求',
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/daityo.html',
      },
    ],
  },
  {
    id: 'childbirth-allowances-materials',
    title: '出産育児一時金 / 児童手当 材料',
    summary: '健保给的一時金通常 50 万円，加上市区町村的児童手当；都要主动申请。',
    category: '生活',
    factCardIds: [
      'kosodate-ichijikin',
      'jidou-teate-gaikokujin',
      'shussei-todoke-14days',
      'kazoku-taizai-shussan-shutoku',
      'shussan-ichijikin-50man',
      'shussan-teate-3day-deno',
      'yochi-en-hoiku-gaikoku',
    ],
    relatedTopicIds: [
      'health-insurance-leaving-job-materials',
    ],
    aliases: ['出産育児一時金', '児童手当', '产子', '育儿', '50万円', '直接支払'],
    deadline: '出産育児一時金通常按医院的直接支払制度；児童手当原则出生后 15 日以内申请。',
    whereToGo: '出産育児一時金：加入的健保（或医院走直接支払）；児童手当：住所地市区町村。',
    prepare: [
      '健康保险证',
      '母子手帳',
      '出生証明 / 出生届',
      '本人和子女的在留卡',
      '银行账户',
      'マイナンバー卡或番号通知',
    ],
    askPrompt: '我快生孩子了 / 孩子刚出生，想确认要申请哪些给付。',
    facts: [
      {
        label: '出産育児一時金',
        text: '2023 年 4 月起，1 子原则 50 万円；常通过医院的直接支払制度自动抵扣。',
        verification: 'source-backed',
      },
      {
        label: '児童手当',
        text: '住民登录的外国人家庭也是対象；2024 年 10 月起所得制限废止，覆盖到高校生年代。',
        verification: 'source-backed',
      },
    ],
    checkNote: '孩子在留资格（在日出生 30 日内登录）+ 健保加入状态 + 国籍 都会影响细节，先确认。',
    sources: [
      {
        label: '厚生労働省：出産育児一時金',
        url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken12/index.html',
      },
      {
        label: 'こども家庭庁：児童手当',
        url: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/',
      },
    ],
  },
  {
    id: 'childcare-leave-materials',
    title: '育休·产休 + 育児休業給付 材料',
    summary: '雇用保险加入者育休期间可领給付，原则 67% → 50%；要由公司提交 Hello Work 手续。',
    category: '社保',
    factCardIds: [
      'ikuji-sangyo-kyugyo-zairyu',
      'koyo-hoken-kyufu',
      'sangyou-gakuei-naniwakai-tetsuzuki',
      'shussan-teate-3day-deno',
    ],
    relatedTopicIds: [
      'childbirth-allowances-materials',
      'job-change-notification-materials',
    ],
    aliases: ['育休', '产休', '育児休業給付', '产前产后休业', '育休基金'],
    deadline: '育児休業給付通常以 2 个月单位申请；公司侧要在指定期限内代办。',
    whereToGo: '公司人事 → Hello Work（公司代办）；本人需要配合提交相关资料。',
    prepare: [
      '母子手帳 / 出生証明',
      '健保资料',
      '雇用保险被保険者证',
      '本人确认资料',
      '银行账户',
    ],
    askPrompt: '我是技人国 + 公司员工，想确认育休能不能拿满 + 在留资格会不会被取消。',
    facts: [
      {
        label: '法律权利',
        text: '产前 6 周、产后 8 周的休业 + 子 1 岁前后的育休对外国人也适用，禁止国籍歧视。',
        verification: 'source-backed',
      },
      {
        label: '给付率',
        text: '育児休業給付原则育休开始 180 日内 67%，之后 50%（雇用保险加入 12 个月以上）。',
        verification: 'source-backed',
      },
      {
        label: '与在留资格',
        text: '育休期间是合法的休业；和在留资格取消的「3 个月以上无活动」之间的处理，要个案确认。',
        verification: 'needs-check',
      },
    ],
    checkNote: '派遣、契约社员、试用期、孕期换工作，育休资格和金额会不同；提前问 Hello Work 或公司人事。',
    sources: [
      {
        label: '厚生労働省：育児休業給付について',
        url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/koyou_roudou/koyouhoken/ikuji.html',
      },
    ],
  },
  {
    id: 'rental-housing-foreigner-materials',
    title: '外国人租房 材料',
    summary: '一般要求保証会社 + 在留资格 + 收入证明；外国人差別在法律上禁止，但实务上仍常被审查更严。',
    category: '生活',
    factCardIds: [
      'gaikokujin-chintai',
      'chintai-hoshou-gaikokujin',
      'jutaku-shikikin-rekkin-shuukan',
      'kobun-jutaku-jutsu-kushu',
      'zairyu-card-online-failure-information',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
      'bank-account-opening-materials',
    ],
    aliases: ['租房', '保証人', '保証会社', '入居審査', '緊急連絡先', '初期費用'],
    deadline: '没有期限；通常入居前 1-2 个月开始找房。',
    whereToGo: '不动产仲介公司 / 大家直接 / UR / 公社住宅。',
    prepare: [
      '护照',
      '在留卡（有效期足够长）',
      '在职证明 / 雇用契约 / 学生证',
      '最近 1-3 个月源泉徴収票 或 课税证明',
      '紧急联络人（日本国内）',
      '保証人 或 保証会社使用同意',
      '初期費用（敷金/礼金/前家賃/仲介手数料）',
    ],
    askPrompt: '我刚来日本，想确认租房要的材料和能不能不用保証人。',
    facts: [
      {
        label: '在留资格审查',
        text: '不动产/保証会社通常要看在留资格类型 + 在留期限；期限快到时常被劝先续签。',
        verification: 'source-backed',
      },
      {
        label: '差別禁止与现实',
        text: '法律上禁止外国人差別，但实务上不少业者仍会要求更高的初期费用或更严的审查。',
        verification: 'source-backed',
      },
    ],
    checkNote: 'UR、公社住宅、外国人 OK 物件、社宅，门槛差别很大；不接受时可换业者，必要时走外国人住宅相談窗口。',
    sources: [
      {
        label: '国土交通省：外国人の民間賃貸住宅入居',
        url: 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000077.html',
      },
    ],
  },
  {
    id: 'bank-account-opening-materials',
    title: '外国人 银行开户 材料',
    summary: '一般要在留卡 + マイナンバー + 6 个月以上滞在记录；短期滞在通常不能开。',
    category: '生活',
    factCardIds: [
      'ginko-kouza-gaijin',
      'mynumber-gaikokujin',
      'ginko-account-gaijin-6months',
    ],
    relatedTopicIds: [
      'address-change-residence-card-materials',
      'mynumber-card-materials',
    ],
    aliases: ['银行开户', '口座開設', '口座', '送金', '振込', '通帳'],
    deadline: '没有期限；很多银行要求来日 6 个月以上。',
    whereToGo: '银行窗口（メガバンク / 地方银行 / 信用金庫 / ゆうちょ / ネット银行）。',
    prepare: [
      '在留卡',
      'マイナンバー卡 或 通知书',
      '住所证明（住民票或公共料金请求书）',
      '印鑑（部分银行需要）',
      '在职证明 / 在学证明 / 雇用契约（部分银行要）',
    ],
    askPrompt: '我刚来日本 3 个月，想确认能不能开户、哪家最容易。',
    facts: [
      {
        label: '短期滞在',
        text: '短期滞在（90 天内）资格通常不能开普通账户。',
        verification: 'source-backed',
      },
      {
        label: '6 个月规则',
        text: '不少银行按「特定取引」要求在留 6 个月以上才能开户；ゆうちょ 等部分窗口规则宽松。',
        verification: 'source-backed',
      },
    ],
    checkNote: '送金/海外汇款 + 持有外币账户 + 法人账户，要求和审查完全不同；先确认用途再选银行。',
    sources: [
      {
        label: '金融庁：外国人の銀行口座開設',
        url: 'https://www.fsa.go.jp/news/r2/ginkou/20210507/20210507.html',
      },
    ],
  },
  {
    id: 'unemployment-benefit-materials',
    title: '失業給付（雇用保险基本手当） 材料',
    summary: '退职后到 Hello Work 申请，被保险者 12 个月以上 + 求职意愿是基本条件。',
    category: '社保',
    factCardIds: [
      'koyo-hoken-kyufu',
      'shitsugyo-zairyu-risk',
      'kaiko-yokoku-30days',
      'rousai-hoken-foreign-worker',
      'foreigner-employment-info-portal',
      'zairyu-shitsugyo-hosho-pension',
    ],
    relatedTopicIds: [
      'retirement-risk',
      'health-insurance-leaving-job-materials',
      'national-pension-after-leaving-materials',
    ],
    aliases: ['失業給付', '基本手当', 'Hello Work', 'ハローワーク', '失業保険', '雇用保险'],
    deadline: '原则离职翌日起 1 年以内（受給期间内）求职活动 + 申请。',
    whereToGo: '住所地的 Hello Work（公共职业安定所）。',
    prepare: [
      '离职票（公司发行）',
      '雇用保险被保険者证',
      '在留卡',
      '本人确认资料 + マイナ番号',
      '写真',
      '银行账户',
      '印鑑',
    ],
    askPrompt: '我退职了，想确认能不能领失業給付 + 对在留资格有什么影响。',
    facts: [
      {
        label: '受給资格',
        text: '原则离职前 2 年内被保险者期间 12 个月以上（会社都合时 1 年内 6 个月以上）。',
        verification: 'source-backed',
      },
      {
        label: '给付制限',
        text: '自己都合退职通常有约 2 个月给付制限；会社都合无制限。',
        verification: 'source-backed',
      },
      {
        label: '与在留资格',
        text: '失業給付是合法权利，但在留资格里「无活动 3 个月以上」可能进入取消判断，要保留求职记录。',
        verification: 'needs-check',
      },
    ],
    checkNote: '求职活动实绩、给付日数（被保险年数和年龄决定）、外国人特别情形（在留期限即将到期），要个案确认。',
    sources: [
      {
        label: '厚生労働省（ハローワーク）：雇用保険手続きのご案内',
        url: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_procedure.html',
      },
    ],
  },
  {
    id: 'company-incorporation-materials',
    title: '外国人 法人登记 材料',
    summary: '设立株式会社要决定商号·目的·本店·资本金；外国人代表者还要考虑经営管理资格。',
    category: '工作',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'gijinkoku-koushin-shorui',
      'startup-visa-meti-fukuoka',
      'shoukibo-jigyou-zei',
    ],
    relatedTopicIds: [
      'keiei-kanri-renewal-materials',
      'national-tax-certificate-sono3-materials',
    ],
    aliases: ['法人登记', '设立', '株式会社', '合同会社', '资本金', '社长'],
    deadline: '没有统一期限；法人成立到税务申告（设立届出）有 2 个月。',
    whereToGo: '本店所在地的法務局；税务署 / 都道府县税事務所 / 市区町村 / 年金事務所 / Hello Work 分别要做设立届。',
    prepare: [
      '商号·本店所在地·目的·资本金等基本事项',
      '定款（公証役場で认证）',
      '代表者 + 出资者的印鑑証明（外国人用署名证明书或印鑑证明）',
      '法人印鑑',
      '资本金的払込资料',
      '法務局申请书一式',
    ],
    askPrompt: '我想自己设立公司做生意，想确认登记流程和经営管理资格的关系。',
    facts: [
      {
        label: '基本流程',
        text: '决定基本事项 → 作成定款 → 公証役場认证 → 资本金払込 → 法務局登记申请。',
        verification: 'source-backed',
      },
      {
        label: '与在留资格',
        text: '法人成立本身和取得「経営·管理」在留资格是两件事；外国人作为代表者要兼顾两边。',
        verification: 'needs-check',
      },
    ],
    checkNote: '资本金、事業所、人员等 2025 年経営管理改革后的新基准要按公司情况个案确认，本页不给结论。',
    sources: [
      {
        label: '法務局：会社・法人の登記',
        url: 'https://houmukyoku.moj.go.jp/homu/static/homu_homu53.html',
      },
      {
        label: '出入国在留管理庁：「経営・管理」',
        url: 'https://www.moj.go.jp/isa/applications/status/keieikanri.html',
      },
    ],
  },
]

export function getQuickReferenceTopic(id: string) {
  return QUICK_REFERENCE_TOPICS.find(topic => topic.id === id)
}

export function getQuickReferenceTopicHref(id: string) {
  return `/quick-reference/${encodeURIComponent(id)}`
}

export function getRelatedQuickReferenceTopics(topic: QuickReferenceTopic) {
  const idSet = new Set(topic.relatedTopicIds ?? [])
  if (idSet.size === 0) return []
  return QUICK_REFERENCE_TOPICS.filter(item => idSet.has(item.id))
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
