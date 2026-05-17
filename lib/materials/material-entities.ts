/**
 * Material Entities (WB-D — Materials Universe)
 *
 * Each entry is a reusable "material" entity (a document users actually obtain
 * and submit). Multiple scenarios (existing quick-reference topics) reuse the
 * same material — instead of duplicating the description per scenario, each
 * material has one canonical entry that scenarios link into.
 *
 * Scope rules:
 * - User-facing copy: 中文为主，日文术语括号或并列。
 * - 不写法律解读 / 不写许可保证 / 不写「材料齐了就能通过」类话术。
 * - factCardIds must reference fact_id values that exist in docs/fact-cards/*.md.
 * - reusedIn references existing topic ids in lib/quick-reference/topics.ts.
 * - 任何"是否影响审查 / 是否需要 / 多少年"类不确定结论必须落到 ASK bridge。
 */

export interface MaterialSourceLink {
  url: string
  label: string
}

export interface MaterialEntity {
  /** stable url-safe id (kebab-case) */
  id: string
  /** 用户看到的中文名（含日文术语） */
  title: string
  /** 搜索 alias：日文同义词、口语别称 */
  aliases: string[]
  /** 一句话「这是什么」 */
  whatItIs: string
  /** 谁开 / 谁出（市区町村 / 税務署 / 年金事務所 / 雇用主 / 本人 etc） */
  whoIssues: string
  /** 在哪取 / 怎么取 */
  whereToObtain: string
  /** 手数料（有就写、口径含「窗口而异」） */
  fee?: string
  /** 有效期 / 时间点（如「発行3か月以内」「最新年度」） */
  validity?: string
  /** 复用在哪些手续（topic id 数组，引 lib/quick-reference/topics.ts 已有 id） */
  reusedIn: string[]
  /** 常见踩坑 */
  commonMistakes: string[]
  /** 相关材料 entity id（互引） */
  relatedMaterials: string[]
  /** 跳问 TEBIQ 的提示文案 */
  askTebiqBridge: string
  /** 关联 fact_id（必须存在于 docs/fact-cards/*.md） */
  factCardIds: string[]
  /** 官方来源链接（可选）— 仅放权威页面 */
  sourceUrls?: MaterialSourceLink[]
}

export const MATERIAL_ENTITIES: MaterialEntity[] = [
  // ───────────────────────────── 1 / 15
  {
    id: 'juminhyo',
    title: '住民票（住民票の写し）',
    aliases: [
      '住民票',
      '住民票謄本',
      '住民票の写し',
      '住民登録証',
      '住民票記載事項証明書',
      'jūminhyō',
      '住所证明',
    ],
    whatItIs:
      '记录本人住所、世帯结构、在留信息等的市区町村官方证明，常用于在留申请、银行、租房等场景。',
    whoIssues: '住所所在的市区町村役所（区役所 / 市役所 / 町村役场）。',
    whereToObtain:
      '本人住民登録地的市区町村窗口、コンビニ交付（持マイナンバーカード）、或邮寄申请。',
    fee: '通常每份 200〜400 円（市区町村而异；コンビニ交付一般略便宜）。',
    validity: '在留 / 永住申请通常要求発行 3 か月以内；银行、租房窗口可能更短。',
    reusedIn: [
      'address-change',
      'tax-certificate',
      'permanent-residence-application-materials',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'family-stay-renewal-materials',
      'japanese-spouse-renewal-materials',
      'juminhyo-foreign-materials',
      'mynumber-card-materials',
      'bank-account-opening-materials',
      'rental-housing-foreigner-materials',
    ],
    commonMistakes: [
      '只取了「本人のみ」省略 →在留/永住申请通常要求「世帯全員・続柄・国籍記載あり」。',
      'マイナンバー記載 vs 非記載 弄反：在留申请一般要求**マイナンバー記載なし**。',
      '取了旧住所的住民票，搬家后没在新住所重新办住所变更就申请。',
    ],
    relatedMaterials: [
      'juminzei-kazei-shomei',
      'juminzei-nouzei-shomei',
      'koseki-tohon-konin-shusshou',
      'zairyu-card-passport',
    ],
    askTebiqBridge:
      '想确认这次申请到底要「世帯全員」「マイナンバー記載」哪种住民票？可以直接问 TEBIQ。',
    factCardIds: ['jukyochi-mynumber-renke-juminhyo'],
    sourceUrls: [
      {
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/zairyu/index.html',
        label: '総務省 — 外国人住民の住民基本台帳制度',
      },
    ],
  },

  // ───────────────────────────── 2 / 15
  {
    id: 'juminzei-kazei-shomei',
    title: '住民税課税（非課税）証明書',
    aliases: [
      '課税証明書',
      '住民税課税証明',
      '非課税証明書',
      '所得証明書',
      'kazei shōmeisho',
      '收入证明',
    ],
    whatItIs:
      '证明前年所得额、住民税课税额（或非课税）的市区町村证明书，是在留更新、永住申请、租房常用的「收入/纳税状况」凭证。',
    whoIssues: '住所所在的市区町村役所（住民票がある自治体）。',
    whereToObtain:
      '市区町村窗口、コンビニ交付（持マイナンバーカード，部分自治体）、邮寄申请。',
    fee: '通常每份 200〜400 円（自治体而异，每年度・每份单独计费）。',
    validity:
      '一般「最新年度」+ 申请窗口可能追加要求过往若干年；具体年数因在留资格・申请类型不同，需向窗口或专业人士确认。',
    reusedIn: [
      'tax-certificate',
      'resident-tax-certificate-materials',
      'permanent-residence-application-materials',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'family-stay-renewal-materials',
      'japanese-spouse-renewal-materials',
      'rental-housing-foreigner-materials',
    ],
    commonMistakes: [
      '把「課税証明書」当「納税証明書」交：前者证明收入与课税额，后者证明是否实际付清。',
      '年度搞错：通常按「日本年度」（4 月起），1 月 1 日住所地不同会换发行自治体。',
      '只取最新一年，但永住等申请可能要 3〜5 年份。',
    ],
    relatedMaterials: [
      'juminzei-nouzei-shomei',
      'kokuzei-nouzei-sono3',
      'juminhyo',
    ],
    askTebiqBridge:
      '想确认这次申请要几年份「課税証明」「納税証明」分别准备？可以直接问 TEBIQ。',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'eijuu-jukyo-check-tax-shomeisho',
      'jumin-zei-jan1-criterion',
      'jumin-zei-no-shukyou-3types',
    ],
    sourceUrls: [
      {
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html',
        label: '総務省 — 個人住民税',
      },
    ],
  },

  // ───────────────────────────── 3 / 15
  {
    id: 'juminzei-nouzei-shomei',
    title: '住民税納税証明書',
    aliases: [
      '納税証明書',
      '住民税納税証明',
      '完納証明',
      'nōzei shōmeisho',
      '住民税缴税证明',
    ],
    whatItIs:
      '证明住民税是否按时全部缴清的市区町村证明书，与「課税証明書」不同：这里关注的是「实际有没有付清」。',
    whoIssues: '住所所在的市区町村役所。',
    whereToObtain: '市区町村窗口、邮寄、部分自治体支持コンビニ交付。',
    fee: '通常每份 200〜400 円（自治体而异）。',
    validity:
      '一般要求発行 3 か月以内；申请类型不同所需年数也不同（看窗口指示）。',
    reusedIn: [
      'tax-certificate',
      'resident-tax-certificate-materials',
      'permanent-residence-application-materials',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'family-stay-renewal-materials',
    ],
    commonMistakes: [
      '有未缴 / 滞纳的话窗口可能拒发完納証明；先去税务窗口处理纳付或分割。',
      '只看「課税」证明而漏看「納税」证明：在留申请审查重视「实际是否付清」。',
      '夫妻共同申请时只取了一方的纳税证明，但要求是世帯全员。',
    ],
    relatedMaterials: [
      'juminzei-kazei-shomei',
      'kokuzei-nouzei-sono3',
      'juminhyo',
    ],
    askTebiqBridge:
      '有住民税未缴、或不确定窗口要哪种「納税証明」？可以直接问 TEBIQ。',
    factCardIds: [
      'juminzei-kazei-shomeisho',
      'eijuu-jukyo-check-tax-shomeisho',
      'jumin-zei-jan1-criterion',
      'jumin-zei-no-shukyou-3types',
    ],
    sourceUrls: [
      {
        url: 'https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-inhabitant-tax.html',
        label: '総務省 — 個人住民税',
      },
    ],
  },

  // ───────────────────────────── 4 / 15
  {
    id: 'kokuzei-nouzei-sono3',
    title: '国税納税証明書 その3（未納がないこと）',
    aliases: [
      '納税証明書その3',
      '国税納税証明書',
      'その3',
      '未納なし証明',
      'sono san',
      '国税完税证明',
    ],
    whatItIs:
      '由税务署发行的、证明「指定税目に未納がない」的国税证明书，永住申请等场合常被要求。',
    whoIssues: '所辖税务署（管轄税務署），或通过 e-Tax 在线申请。',
    whereToObtain: '税务署窗口（书面）、邮寄、e-Tax 在线。',
    fee:
      '每份 400 円（窗口・邮寄），e-Tax 在线请求一般为 370 円（具体以国税庁公式为准）。',
    validity:
      '一般要求発行 3 か月以内；申请方说明书要求「直近〇年分」的不同组合，看窗口指示。',
    reusedIn: [
      'tax-certificate',
      'national-tax-certificate-sono3-materials',
      'permanent-residence-application-materials',
    ],
    commonMistakes: [
      '把「その1（納付すべき税额）」当「その3（未納がない）」交。',
      '在 e-Tax 申请时税目选漏（所得税 / 消費税 / 申告所得税 etc.）。',
      '滞纳已结清但未拿到「未納なし」状態：付清后到税务署确认账户更新再申请。',
    ],
    relatedMaterials: [
      'juminzei-kazei-shomei',
      'juminzei-nouzei-shomei',
      'kessan-sho',
    ],
    askTebiqBridge:
      '想确认这次申请要「その1 / その2 / その3」哪几种？或不确定如何处理过去的滞纳，可以直接问 TEBIQ。',
    factCardIds: ['zeimu-shomeisho-3types', 'eijuu-jukyo-check-tax-shomeisho'],
    sourceUrls: [
      {
        url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm',
        label: '国税庁 — 納税証明書',
      },
    ],
  },

  // ───────────────────────────── 5 / 15
  {
    id: 'nenkin-kiroku',
    title: '年金記録（ねんきんネット / ねんきん定期便 / 加入期間証明）',
    aliases: [
      '年金記録',
      'ねんきんネット',
      'ねんきん定期便',
      '加入期間証明',
      '被保険者記録照会回答票',
      '年金履历',
    ],
    whatItIs:
      '记录国民年金 / 厚生年金保険的加入期间与纳付状況的证明类资料；永住申请要求确认直近 2 年的纳付状況等场合常用。',
    whoIssues: '日本年金機構（年金事務所）。',
    whereToObtain:
      'ねんきんネット 在线（マイナンバー連携可）、邮寄到家的「ねんきん定期便」、年金事務所窗口请求「被保険者記録照会回答票」等。',
    fee: '本人请求一般无料（年金事務所窗口・ねんきんネット）。',
    validity:
      '具体「直近 2 年」「直近 1 年」哪个区间，按申请类型 / 窗口指示。',
    reusedIn: [
      'pension-after-leaving-job',
      'retirement-risk',
      'pension-social-insurance-proof-materials',
      'permanent-residence-application-materials',
      'national-pension-after-leaving-materials',
    ],
    commonMistakes: [
      '只看「ねんきん定期便」（按生日寄）但里面不一定显示最近月份。',
      '老说「我交了」但不能给出具体「直近 24 か月」纳付状況；建议直接 ねんきんネット 截图或窗口请求。',
      '把「加入していた期間」当「保険料を払った期間」：未納や免除月份要分清。',
    ],
    relatedMaterials: [
      'kenpo-shikaku-kakunin',
      'juminzei-nouzei-shomei',
    ],
    askTebiqBridge:
      '想确认这次申请要交「ねんきんネット 截图」「定期便」还是窗口照会回答票？可以直接问 TEBIQ。',
    factCardIds: [
      'eijuu-nenkin-2year-shomei-method',
      'eijuu-nenkin-risk',
      'ryuugaku-nenkin-tokurei',
      'nenkin-dattai-ichijikin',
      'dattai-ichijikin-2years',
    ],
    sourceUrls: [
      {
        url: 'https://www.nenkin.go.jp/n_net/',
        label: '日本年金機構 — ねんきんネット',
      },
    ],
  },

  // ───────────────────────────── 6 / 15
  {
    id: 'kenpo-shikaku-kakunin',
    title: '健康保険資格確認書（旧 健康保険証 / マイナ保険証関連）',
    aliases: [
      '健康保険証',
      '資格確認書',
      '健康保険資格確認書',
      'マイナ保険証',
      '保险证',
    ],
    whatItIs:
      '证明本人健康保険加入资格的资料；2024 年 12 月后纸质保險證渐次废止，过渡期内通过「資格確認書」或マイナ保険証作为替代。',
    whoIssues:
      '加入的健康保険組合 / 全国健康保険協会（協会けんぽ）/ 市区町村（国民健康保険）。',
    whereToObtain:
      '通常由保険者主动寄发（資格確認書），或通过マイナンバーカードに保険証機能を紐付（マイナ保険証）。',
    fee: '本人取得通常无料（再发行可能収费）。',
    validity: '看保険者发的有効期限或在留期间。',
    reusedIn: [
      'health-insurance-after-leaving-job',
      'pension-social-insurance-proof-materials',
      'health-insurance-leaving-job-materials',
    ],
    commonMistakes: [
      '离职后忘记 14 日内国民健康保険切替 → 出现空白期。',
      '以为「マイナ保険証」可以完全替代纸质，但部分医疗机关 / 窗口仍要求纸质或資格確認書。',
      '搬家跨自治体后没在新住所重新加入国民健康保険。',
    ],
    relatedMaterials: [
      'nenkin-kiroku',
      'zaishoku-shomeisho',
    ],
    askTebiqBridge:
      '离职 / 搬家 / 切换雇主前后不确定怎么衔接保险？可以直接问 TEBIQ。',
    factCardIds: [
      'maina-hoken-2024-12',
      'mainaroka-kenkou-hoken',
      'kokumin-kenko-hoken-14days',
      'kokuho-shutoku-shoumei-2years',
      'rishoku-kenko-hoken',
      'shakai-hoken-kanyu',
    ],
    sourceUrls: [
      {
        url: 'https://www.mhlw.go.jp/stf/newpage_08277.html',
        label: '厚生労働省 — マイナンバーカードの健康保険証利用',
      },
    ],
  },

  // ───────────────────────────── 7 / 15
  {
    id: 'zaishoku-shomeisho',
    title: '在職証明書（在勤証明書）',
    aliases: [
      '在職証明書',
      '在勤証明書',
      '勤務証明書',
      'zaishoku shōmeisho',
      '在职证明',
    ],
    whatItIs:
      '由雇主开的证明本人在该公司继续在职、岗位、入社年月、雇用形態等内容的文件，在留更新、租房等场合常用。',
    whoIssues: '雇用主（人事 / 总务部门）。',
    whereToObtain: '向所属公司人事 / 总务部门索取，通常 1〜2 周可拿到。',
    fee: '一般无料（公司内开具）。',
    validity: '常要求発行 3 か月以内。',
    reusedIn: [
      'job-change',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'permanent-residence-application-materials',
      'work-qualification-certificate-materials',
      'rental-housing-foreigner-materials',
      'job-change-notification-materials',
    ],
    commonMistakes: [
      '在職証明書 ≠「労働条件通知書 / 雇用契約書」：在留申请常常要两类一起交。',
      '入社不久就提申请，公司开的在職証明里没体现完整月份。',
      '小公司没有标准模板时，要让公司至少写明：会社名・代表・所在地・本人氏名・职务・入社日・雇用形態・年収。',
    ],
    relatedMaterials: [
      'koyo-keiyaku-roudou-tsuuchi',
      'juminzei-kazei-shomei',
      'touki-jikou-shomeisho',
    ],
    askTebiqBridge:
      '在职但雇主不愿意 / 来不及开证明？或想确认在留更新要不要追加？可以直接问 TEBIQ。',
    factCardIds: ['shuro-shikaku-shomeisho', 'gaikokujin-koyo-todokede'],
  },

  // ───────────────────────────── 8 / 15
  {
    id: 'koyo-keiyaku-roudou-tsuuchi',
    title: '雇用契約書 / 労働条件通知書',
    aliases: [
      '雇用契約書',
      '労働条件通知書',
      '労条通',
      '内定通知書',
      '劳动合同',
    ],
    whatItIs:
      '记录工种、劳动时间、工资、契约期间等核心劳动条件的文件；劳基法上雇主有书面交付义务。',
    whoIssues: '雇用主（公司 / 法人 / 个人事业主）。',
    whereToObtain: '入社时由公司交付；丢失可向人事请求再发行。',
    fee: '一般无料。',
    validity:
      '通常没有「失效日期」；但在留申请审查时倾向看最新版本，与现实岗位匹配。',
    reusedIn: [
      'job-change',
      'gijinkoku-renewal-materials',
      'permanent-residence-application-materials',
      'work-qualification-certificate-materials',
      'dependent-work-permit-materials',
      'job-change-notification-materials',
    ],
    commonMistakes: [
      '只交「内定通知書」，但入管要的是已经签署的劳动条件 / 雇用契約。',
      '日本本土雇主有「书面交付」义务，但派遣 / 业务委托型时实际文件可能不齐，要补充说明。',
      '换岗或调薪后没拿到「変更後」的劳条通，但提交的还是旧版本。',
    ],
    relatedMaterials: [
      'zaishoku-shomeisho',
      'touki-jikou-shomeisho',
      'riyu-setsumei-sho',
    ],
    askTebiqBridge:
      '雇主不肯开 / 内容与现实工作有差异？想确认这种情况能不能直接提交，可以直接问 TEBIQ。',
    factCardIds: [
      'koyou-keiyaku-rouken-tsuchi',
      'koyo-hoken-kanyu-gijmu',
    ],
  },

  // ───────────────────────────── 9 / 15
  {
    id: 'touki-jikou-shomeisho',
    title: '登記事項証明書（法人 / 不動産）',
    aliases: [
      '登記事項証明書',
      '登記簿謄本',
      '商業登記',
      '法人登記',
      '不動産登記',
      'tōki jikō shōmeisho',
      '公司登记 / 不动产登记',
    ],
    whatItIs:
      '法務局出具的、记录法人 / 不动产登记事项的官方证明；经营管理签证、公司变更、不动产相关申请常用。',
    whoIssues: '法務局（登記所）。',
    whereToObtain:
      '法務局窗口、邮寄、または 登記情報提供サービス / 登記・供託オンライン申請システム。',
    fee:
      '窗口・邮寄通常 600 円 / 通，在线请求一般更低（具体以法務省公式为准）。',
    validity: '一般要求発行 3 か月以内（特别经营管理申请）。',
    reusedIn: [
      'keiei-kanri-renewal-materials',
      'company-incorporation-materials',
      'permanent-residence-application-materials',
    ],
    commonMistakes: [
      '「現在事項証明」vs「履歴事項全部証明」搞混：经营管理审査通常要「履歴事項全部証明書」。',
      '本社所在地变更后没更新到登记，但申请书上写新地址，对不上。',
      '不动产证明书只交了「土地」忘了「建物」（或相反）。',
    ],
    relatedMaterials: [
      'kessan-sho',
      'koyo-keiyaku-roudou-tsuuchi',
    ],
    askTebiqBridge:
      '不确定要「履歴事項全部証明」「現在事項証明」哪种？或公司刚成立 / 刚搬迁怎么办？可以直接问 TEBIQ。',
    factCardIds: [
      'houjin-touki-overview',
      'keiei-kanri-2025-10',
    ],
    sourceUrls: [
      {
        url: 'https://www.moj.go.jp/MINJI/minji06.html',
        label: '法務省 — 商業・法人登記',
      },
    ],
  },

  // ───────────────────────────── 10 / 15
  {
    id: 'kessan-sho',
    title: '決算書（貸借対照表・損益計算書・確定申告書写し）',
    aliases: [
      '決算書',
      '貸借対照表',
      '損益計算書',
      'B/S',
      'P/L',
      '確定申告書',
      'kessan-sho',
      '财务报表',
    ],
    whatItIs:
      '法人 / 个人事业主一年度的财务状況汇总；经营管理签证、家族滞在收入证明、永住申请等场合常被审查。',
    whoIssues:
      '本人 / 法人（实际制作通常委托税理士 / 会計事務所）；提交时附「税務署受付印」或 e-Tax 受信通知。',
    whereToObtain:
      '本人 / 税理士手中保留；丢失时可通过税務署「閲覧申請」获取确定申告书的副本。',
    fee: '本人持有无料；税务署阅覧申请部分免费部分收费。',
    validity: '最新结算期 + 申请窗口可能要求前 2〜3 期一并提交。',
    reusedIn: [
      'keiei-kanri-renewal-materials',
      'company-incorporation-materials',
      'permanent-residence-application-materials',
    ],
    commonMistakes: [
      '只交了「P/L」漏交「B/S」或反过来；通常成套提交。',
      '没有「税務署受付印」或 e-Tax 受信通知，被入管退回要求补正。',
      '青色申告 vs 白色申告区别没说明，影响收入审查印象。',
    ],
    relatedMaterials: [
      'touki-jikou-shomeisho',
      'kokuzei-nouzei-sono3',
      'juminzei-kazei-shomei',
    ],
    askTebiqBridge:
      '刚开公司 / 还没第一期决算？或决算赤字担心审查？可以直接问 TEBIQ。',
    factCardIds: [
      'keiei-kanri-2025-10',
      'aoiro-shinkoku-65',
      'shoukibo-jigyou-zei',
    ],
  },

  // ───────────────────────────── 11 / 15
  {
    id: 'mimoto-hoshou-sho',
    title: '身元保証書',
    aliases: [
      '身元保証書',
      '身元保証人',
      'mimoto hoshōsho',
      '担保人证明',
    ],
    whatItIs:
      '由日本人或永住者作为「身元保証人」签署的、对申请人在日本的「滞在費・帰国旅費・法令遵守」等做道义性保証的文件；永住・日本人配偶等 / 定住者 等申请常用。',
    whoIssues: '保証人本人（日本人 / 永住者）。',
    whereToObtain: '使用入管指定的样式（出入国在留管理庁公式 HP 可下载）。',
    fee: '无料。',
    validity:
      '通常没有明确「失効日」，但要附保証人的「住民票」「在職証明 / 課税証明」等支持资料，这些资料有 3 か月有効期限。',
    reusedIn: [
      'permanent-residence-application-materials',
      'japanese-spouse-renewal-materials',
    ],
    commonMistakes: [
      '把「身元保証」当成「连带保証 / 法的金钱保证」：实际是道义性、不直接负无限连带债务。',
      '保証人本人没准备好「住民票・在職証明・課税証明」，导致整体材料退回。',
      '保証人是「非永住的中长期在留外国人」→ 通常不符合永住申请的保証人要件。',
    ],
    relatedMaterials: [
      'juminhyo',
      'juminzei-kazei-shomei',
      'zaishoku-shomeisho',
      'riyu-setsumei-sho',
    ],
    askTebiqBridge:
      '找不到合适的身元保証人？或保証人也是外国人不确定能不能用？可以直接问 TEBIQ。',
    factCardIds: ['hoshou-jin-eijuu'],
    sourceUrls: [
      {
        url: 'https://www.moj.go.jp/isa/applications/procedures/16-4.html',
        label: '出入国在留管理庁 — 永住許可申請',
      },
    ],
  },

  // ───────────────────────────── 12 / 15
  {
    id: 'riyu-setsumei-sho',
    title: '理由書 / 説明書（含 了解書）',
    aliases: [
      '理由書',
      '説明書',
      '了解書',
      'letter of understanding',
      '情况说明书',
    ],
    whatItIs:
      '由本人或代理人撰写、向入管说明申请背景、过去经历、家族关系、收入或纳付情况等的自由格式补充文件；永住、变更、再申请等场合常用。',
    whoIssues: '本人（必要时由行政書士・弁護士协助起草，最终署名仍是本人）。',
    whereToObtain: '本人撰写。日文为原则；要附署名・日付。',
    validity: '与申请书同期提交即可（一般没有独立有効期限）。',
    reusedIn: [
      'permanent-residence-application-materials',
      'immigration-notice-supplement-response',
      'japanese-spouse-renewal-materials',
      'family-stay-renewal-materials',
    ],
    commonMistakes: [
      '写得过于情绪化 / 中文直译，反而难以传达事实。',
      '把不利事项（违法、滞纳）藏起来不写：入管通常掌握历史信息，主动说明更稳。',
      '签名 / 日付漏掉，材料被退回补正。',
    ],
    relatedMaterials: [
      'mimoto-hoshou-sho',
      'koseki-tohon-konin-shusshou',
      'juminzei-nouzei-shomei',
    ],
    askTebiqBridge:
      '不确定该不该写理由書 / 要怎么写不踩雷？可以直接问 TEBIQ。',
    factCardIds: ['eijuu-letterofunderstanding-2021', 'eijuu-shinsei-shorui'],
  },

  // ───────────────────────────── 13 / 15
  {
    id: 'koseki-tohon-konin-shusshou',
    title: '戸籍謄本 / 婚姻・出生関係証明',
    aliases: [
      '戸籍謄本',
      '婚姻届受理証明',
      '出生届受理証明',
      '婚姻関係証明書',
      '出生証明書',
      '日本国戸籍',
      '中国结婚证',
      '中国出生证',
      '公证书',
    ],
    whatItIs:
      '证明申请人 / 配偶 / 子女间身份关系的官方证明；日本人配偶者等、家族滞在、子供出生在留申请等场合必需。',
    whoIssues:
      '日本人方：本籍地市区町村役所。外国人方：本国大使館・領事館 / 中国民政局（结婚证・出生证 + 公证）等。',
    whereToObtain:
      '日本籍：本籍地役所窗口・邮寄・コンビニ交付（持マイナンバーカード）。中国籍：本国管轄部门 + 日本語翻訳（翻訳者署名）。',
    fee:
      '日本戸籍謄本通常 450 円 / 通；中国侧公证・翻訳费按当地行情而异。',
    validity:
      '一般要求発行 3 か月以内（中国侧公证・翻訳也按这个标准准备）。',
    reusedIn: [
      'japanese-spouse-renewal-materials',
      'family-stay-renewal-materials',
      'childbirth-allowances-materials',
      'minor-school-enrollment-materials',
      'permanent-residence-application-materials',
    ],
    commonMistakes: [
      '只交「結婚証明」忘了「翻訳文」与「翻訳者署名」。',
      '日本戸籍：取了「抄本」（个人）而入管要的是「謄本」（全员）。',
      '中国结婚证 / 出生证未做「公证 + 認証 / アポスティーユ」就直接提交。',
    ],
    relatedMaterials: [
      'juminhyo',
      'riyu-setsumei-sho',
      'zairyu-card-passport',
    ],
    askTebiqBridge:
      '中日两国结婚 / 出生证明怎么搭配？需不需要公证 / 翻訳？可以直接问 TEBIQ。',
    factCardIds: [
      'nihonjin-haigusha-visa',
      'haigusha-todokede-14days',
      'kekkon-todoke-procedure',
      'shussei-todoke-14days',
      'kazoku-taizai-shussan-shutoku',
    ],
  },

  // ───────────────────────────── 14 / 15
  {
    id: 'zairyu-card-passport',
    title: '在留カード / パスポート（本人確認・提示資料）',
    aliases: [
      '在留カード',
      '在留卡',
      'パスポート',
      '护照',
      '在カ',
      '本人確認資料',
    ],
    whatItIs:
      '在留外国人最基础的身份与在留资格证明：在留カードは身分証 + 在留管理工具，パスポート是国籍身份证明。所有在留申请、変更、届出场合都要提示或附复印件。',
    whoIssues:
      '在留カード：出入国在留管理庁。パスポート：本国（如中国 = 公安部出入境管理）。',
    whereToObtain:
      '在留カード：新规・再交付・更新时由地方出入国管理局交付（部分手续支持オンライン受取）。パスポート：本国公民按本国规定办理 / 更新。',
    fee:
      '在留カードの手数料は手続種類で不同。紛失等の再交付や永住者カード有効期間更新は無料と案内されるものがあり、個別ページで確認する。',
    validity:
      '在留カード：到「在留期限」当日。パスポート：到「有効期限」当日；申请时通常要求残存期间 ≥ 6 か月。',
    reusedIn: [
      'card-loss',
      'card-carry',
      'permanent-resident-card-renewal',
      'card-loss-reissue-materials',
      'address-change-residence-card-materials',
      'permanent-residence-application-materials',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'family-stay-renewal-materials',
      'japanese-spouse-renewal-materials',
      'student-renewal-materials',
      'deemed-reentry',
      'mynumber-card-materials',
      'driving-license-conversion-materials',
    ],
    commonMistakes: [
      '在留カード没随身携带（16 岁以上原则上需要持参）。',
      '在留期间过了 1 日才办更新 → 已变成 over-stay，处理路线完全不同。',
      'パスポート残存期间不足 6 か月就提申请，被窗口建议先更新护照。',
    ],
    relatedMaterials: [
      'juminhyo',
      'shashin-shinseisho',
    ],
    askTebiqBridge:
      '在留卡丢失 / 损坏 / 在留期间将至？想确认下一步去哪办，可以直接问 TEBIQ。',
    factCardIds: [
      'zairyu-card-keitai-gimu',
      'zairyu-card-carry-obligation',
      'zairyu-card-reissue-14days',
      'zairyu-card-validity-renewal',
      'zairyu-card-loss-reissue',
      'zairyu-card-loss-overseas',
      'zairyu-card-return-gimu',
      'online-zairyu-card-uketori',
      'zaiyu-card-validity-by-status',
    ],
    sourceUrls: [
      {
        url: 'https://www.moj.go.jp/isa/applications/guide/zairyucard.html',
        label: '出入国在留管理庁 — 在留カード',
      },
    ],
  },

  // ───────────────────────────── 15 / 15
  {
    id: 'shashin-shinseisho',
    title: '写真 / 申請書（規格写真 + 入管申請書類）',
    aliases: [
      '申請書',
      '在留資格申請書',
      '永住許可申請書',
      '在留資格変更申請書',
      '在留期間更新申請書',
      '証明写真',
      '規格写真',
      '入管照片',
    ],
    whatItIs:
      '由出入国在留管理庁規定様式的各类申請書 + 規格写真（一般 4cm × 3cm，6 か月以内撮影）。所有在留申请的基础底盘。',
    whoIssues:
      '申請書：出入国在留管理庁公式 HP 提供 PDF / オンラインフォーム。写真：本人在写真馆 / 自动证件机 / 自己拍后打印。',
    whereToObtain:
      '申請書：moj.go.jp 公式下载 / オンライン申請システム。写真：写真館・証明写真機・自宅打印（确保符合規格）。',
    fee:
      '申請書本身无料；写真按拍摄方式 0〜2,000 円左右。许可下时按申请种类另行缴納（更新 6,000 円、変更 6,000 円、永住 10,000 円 等）。',
    validity:
      '写真：撮影后 6 か月以内。申請書：使用「最新版本」（公式 HP 偶有更新）。',
    reusedIn: [
      'card-loss',
      'permanent-resident-card-renewal',
      'gijinkoku-renewal-materials',
      'keiei-kanri-renewal-materials',
      'family-stay-renewal-materials',
      'japanese-spouse-renewal-materials',
      'student-renewal-materials',
      'permanent-residence-application-materials',
      'card-loss-reissue-materials',
      'minor-school-enrollment-materials',
    ],
    commonMistakes: [
      '写真规格不对：尺寸 / 背景 / 露耳 / 表情 / 撮影时期 → 一律退回。',
      '下载了旧版申請書（公式 HP 时常微改），导致字段对不上。',
      '在线申請时把附件大小 / 格式弄错，提交不成功但以为已成功。',
    ],
    relatedMaterials: [
      'zairyu-card-passport',
      'riyu-setsumei-sho',
    ],
    askTebiqBridge:
      '不确定要用哪个版本的申請書 / 这次申请要不要交照片 / 收費多少？可以直接问 TEBIQ。',
    factCardIds: [
      'zairyu-shinsei-form-paper-online',
      'zairyu-shinsei-category',
      'koushin-shinsei-fee-6000',
      'henkou-shinsei-fee-6000',
      'eijuu-application-fee-10000',
    ],
    sourceUrls: [
      {
        url: 'https://www.moj.go.jp/isa/applications/procedures/index.html',
        label: '出入国在留管理庁 — 各種申請手続き',
      },
    ],
  },
]

// ───────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────

export function getMaterialEntity(id: string): MaterialEntity | undefined {
  return MATERIAL_ENTITIES.find(entity => entity.id === id)
}

export function getMaterialEntityHref(id: string): string {
  return `/materials/${encodeURIComponent(id)}`
}

export function getRelatedMaterialEntities(
  entity: MaterialEntity,
): MaterialEntity[] {
  const idSet = new Set(entity.relatedMaterials ?? [])
  if (idSet.size === 0) return []
  return MATERIAL_ENTITIES.filter(item => idSet.has(item.id))
}

/**
 * Given a quick-reference topic id, return material entities that declare
 * `reusedIn` containing that topic. Useful to render "this scenario uses these
 * materials" block on /quick-reference/[id].
 */
export function getMaterialEntitiesForTopic(
  topicId: string,
): MaterialEntity[] {
  return MATERIAL_ENTITIES.filter(entity => entity.reusedIn.includes(topicId))
}
