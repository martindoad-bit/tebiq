# TEBIQ Intent Examples — Part 4 / 75

> 写手 4：文书识别 + 婚姻育儿 + 紧急 + 长尾类（Q226-Q300）
>
> 编号：Q226-Q300（共 75 条）
> 主题：文书识别（15）/ 婚姻离婚（15）/ 育儿子女（10）/ 紧急风险（10）/ 出国回国（10）/ 复合个案（15）

---

## 文书识别 / 督促 · 通知类（Q226-Q240）

- query: "刚收到一封日文信，写着督促状，红字盖着印，看不懂是不是要交钱"
  expected_intent: document-recognition
  domain: document-id
  current_status: 在留中（具体在留资格不明）
  target_status: --
  subject: 本人
  template: doc-recognition-tax-or-pension
  must_not_match: [tax-payment-howto, pension-arrears-payment]

- query: "信封上印的是「最終催告書」，里面是中文翻译都没有，这是什么"
  expected_intent: document-recognition
  domain: document-id
  current_status: 在留中
  target_status: --
  subject: 本人
  template: doc-recognition-final-notice
  must_not_match: [tax-payment-howto]

- query: "年金事務所寄来的纸，上面写「未納のお知らせ」，是不是没交年金"
  expected_intent: document-recognition
  domain: social-insurance
  current_status: 在留中（国民年金加入者）
  target_status: --
  subject: 本人
  template: doc-recognition-pension-unpaid
  must_not_match: [pension-exemption-application]

- query: "区役所来的封信叫「住民税納税通知書」，金额十几万，是要一次交吗"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中（有工作收入）
  target_status: --
  subject: 本人
  template: doc-recognition-resident-tax-notice
  must_not_match: [tax-filing-howto]

- query: "入管寄来一张明信片说「ご来庁のお願い」，是不是要被遣返了"
  expected_intent: document-recognition
  domain: visa
  current_status: 在留中
  target_status: --
  subject: 本人
  template: doc-recognition-immigration-summon
  must_not_match: [unauthorized-stay-self-report, deportation-procedure]

- query: "这张纸是「在留資格認定証明書」吗？背面有 MOJ 印章"
  expected_intent: document-recognition
  domain: visa
  current_status: 海外（招聘中的家族 / 雇员）
  target_status: 来日入国
  subject: 雇主 / 家族
  template: doc-recognition-coe
  must_not_match: [coe-application-flow]

- query: "国保来的邮件标题「滞納処分」，是不是要扣我账户"
  expected_intent: document-recognition
  domain: social-insurance
  current_status: 在留中（国保加入者）
  target_status: --
  subject: 本人
  template: doc-recognition-kokuho-enforcement
  must_not_match: [kokuho-arrears-howto]

- query: "信里有「差押予告」四个字，下面写了银行账户和工资，怎么办"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中（有滞纳）
  target_status: --
  subject: 本人
  template: doc-recognition-seizure-warning
  must_not_match: [tax-arrears-negotiation]

- query: "税务署寄来的信封红字写「申告のお願い」，我没工资也要申告吗"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中（无给与所得）
  target_status: --
  subject: 本人
  template: doc-recognition-kakutei-shinkoku-request
  must_not_match: [year-end-adjustment-vs-shinkoku]

- query: "入管的通知写「在留期間更新許可申請の受付について」，这是受理还是不许可"
  expected_intent: document-recognition
  domain: visa
  current_status: 更新申請中
  target_status: 在留更新
  subject: 本人
  template: doc-recognition-visa-renewal-receipt
  must_not_match: [visa-renewal-result-check]

- query: "邮箱收到一封「e-Tax 還付金のお知らせ」，是骗子还是真的退税"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中（已申告者）
  target_status: --
  subject: 本人
  template: doc-recognition-etax-refund-or-scam
  must_not_match: [tax-refund-procedure]

- query: "公司 HR 给我一张「給与所得者の扶養控除等申告書」，要怎么填"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中（雇员）
  target_status: --
  subject: 雇员
  template: doc-recognition-fuyou-koujo-form
  must_not_match: [year-end-adjustment-howto]

- query: "刚收到「課税証明書交付申請のご案内」是要我自己去开还是会寄来"
  expected_intent: document-recognition
  domain: tax
  current_status: 在留中
  target_status: --
  subject: 本人
  template: doc-recognition-kazei-shoumei-request
  must_not_match: [tax-certificate-issuance]

- query: "上面写「在留カード番号変更のお知らせ」，我之前换过卡，是不是要重新登录"
  expected_intent: document-recognition
  domain: visa
  current_status: 在留中（在留卡换发后）
  target_status: --
  subject: 本人
  template: doc-recognition-zairyu-number-change
  must_not_match: [zairyu-card-update-procedure]

- query: "市役所来的信「マイナンバー通知カード」丢了，是这张吗，看着像废纸"
  expected_intent: document-recognition
  domain: document-id
  current_status: 在留中
  target_status: --
  subject: 本人
  template: doc-recognition-mynumber-notice
  must_not_match: [mynumber-reissue-procedure]

---

## 婚姻 / 离婚（Q241-Q255）

- query: "上周刚和日本人结婚，听说要 14 天内还是 30 天内去入管申请变更"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 技人国（婚姻成立后未变更）
  target_status: 日本人配偶
  subject: 本人
  template: marriage-30day-procedure
  must_not_match: [spouse-visa-application-general]

- query: "我和老公已经领证了，但区役所说还要去使馆办手续，到底先做哪步"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 在留中（已婚未变更）
  target_status: 日本人配偶
  subject: 本人
  template: marriage-document-order
  must_not_match: [embassy-document-issuance]

- query: "国际婚姻，老公是中国人但拿日本永驻，我现在留学生，能直接换永驻配偶吗"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 留学
  target_status: 永驻者配偶
  subject: 本人
  template: marriage-permanent-resident-spouse
  must_not_match: [permanent-residence-application]

- query: "结婚 4 年终于离婚了，听说有 6 个月期限，过了就不能保留配偶签了"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶
  target_status: 定住者 or 其他在留
  subject: 本人
  template: divorce-6month-rule
  must_not_match: [marriage-30days-checklist, permanent-residence-application]

- query: "离婚一个月了，想留在日本工作，但现在是配偶签，能不能直接换成技人国"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶（离婚后）
  target_status: 技人国
  subject: 本人
  template: divorce-to-work-visa
  must_not_match: [work-visa-new-application]

- query: "和日本人离婚但孩子由我抚养，孩子是日本籍，我能拿定住吗"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶（离婚后）
  target_status: 定住者
  subject: 本人
  template: divorce-with-japanese-child-teiju
  must_not_match: [child-zairyu-application, marriage-30days-checklist]

- query: "老公一直家暴，我躲到 shelter 了，听说有 DV 特别措施，我现在不敢去入管"
  expected_intent: dv-protection-special-permit
  domain: visa
  current_status: 日本人配偶（DV 受害中）
  target_status: 定住者 or DV 特例措施
  subject: 本人
  template: dv-victim-special-procedure
  must_not_match: [divorce-visa-change-6months, spouse-marriage-authenticity]

- query: "DV 申诉了警察也有保护令，但我没离婚也不想回国，签证要怎么保住"
  expected_intent: dv-protection-special-permit
  domain: visa
  current_status: 日本人配偶（DV 中 / 未离婚）
  target_status: DV 特例措施 / 定住者
  subject: 本人
  template: dv-victim-without-divorce
  must_not_match: [divorce-visa-change-6months, marriage-renewal-howto]

- query: "结婚不到一年就要离婚，会不会被怀疑假结婚被遣返"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶
  target_status: 其他在留
  subject: 本人
  template: short-marriage-divorce-risk
  must_not_match: [spouse-marriage-authenticity, deportation-procedure]

- query: "我老婆是中国国籍但拿了高才签，我作为家族滞在的，离婚后还能留下吗"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 家族滞在
  target_status: 技人国 or 其他
  subject: 本人
  template: divorce-from-koujin-spouse
  must_not_match: [koujin-application]

- query: "已经分居两年但没正式离婚，想去入管说明情况，会不会出问题"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶（事实上分居）
  target_status: 其他在留
  subject: 本人
  template: separation-without-divorce-explain
  must_not_match: [marriage-30days-checklist, dv-protection-special-permit]

- query: "我是配偶签，老公去年突然去世了，我现在该办什么手续"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶（配偶死亡）
  target_status: 定住者
  subject: 本人
  template: spouse-death-status-change
  must_not_match: [divorce-visa-change-6months, inheritance-procedure]

- query: "再婚的对象也是日本人，前夫的孩子是中国籍，能跟我一起留下吗"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 日本人配偶（再婚）
  target_status: 日本人配偶 + 子女在留
  subject: 家族
  template: remarriage-with-foreign-child
  must_not_match: [child-zairyu-application]

- query: "中国结的婚但还没在日本登记，签证按什么算？还是按未婚"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 海外结婚未登记
  target_status: 配偶在留
  subject: 本人
  template: marriage-china-not-registered-japan
  must_not_match: [coe-application-flow]

- query: "老公是日本人现在要派往美国 3 年，我能跟着去吗，签证怎么办"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 日本人配偶
  target_status: 维持在留或暂停
  subject: 本人
  template: spouse-overseas-relocation-impact
  must_not_match: [reentry-permission-howto]

---

## 育儿 / 子女（Q256-Q265）

- query: "孩子在日本生的，14 天内要去区役所登记，签证怎么办"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 在留中（家族滞在 / 永驻 / 技人国）
  target_status: 子女在留资格取得
  subject: 家族
  template: birth-30day-procedure
  must_not_match: [marriage-30days-checklist]

- query: "孩子下个月出生，我和老婆都是技人国，孩子能拿什么签证"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 技人国
  target_status: 家族滞在（子女）
  subject: 家族
  template: child-of-work-visa-status
  must_not_match: [marriage-30days-checklist]

- query: "孩子日本出生但没办在留资格取得，超过 60 天会怎样"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 子女出生超 60 日未申请
  target_status: 子女在留
  subject: 家族
  template: child-zairyu-overdue
  must_not_match: [unauthorized-stay-self-report]

- query: "孩子今年要从国内来日本上小学，能直接进公立吗，签证怎么办"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 技人国 / 永驻
  target_status: 家族滞在 + 公立小学入学
  subject: 家族
  template: child-school-entry-from-overseas
  must_not_match: [coe-application-flow]

- query: "我儿子在国内上完小学想转到日本读初一，要准备什么"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 永驻 / 技人国
  target_status: 家族滞在 + 中学转学
  subject: 家族
  template: child-school-transfer
  must_not_match: [child-school-entry-from-overseas]

- query: "区役所说能领児童手当，但我是家族滞在，也能领吗"
  expected_intent: birth-zairyu-application
  domain: social-insurance
  current_status: 家族滞在
  target_status: --
  subject: 家族
  template: jido-teate-eligibility
  must_not_match: [tax-payment-howto]

- query: "申请保育園被排队，听说有政策能优先，我是单亲妈妈"
  expected_intent: birth-zairyu-application
  domain: misc
  current_status: 永驻 / 定住（单亲）
  target_status: 保育园入园
  subject: 本人 / 家族
  template: hoikuen-priority-rules
  must_not_match: [jido-teate-eligibility]

- query: "孩子高中毕业想自己留下找工作，能从家族滞在转技人国吗"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 家族滞在（成年子女）
  target_status: 技人国 or 特定活动
  subject: 家族
  template: family-dependent-to-work-visa
  must_not_match: [koujin-application]

- query: "孩子日本国籍但我离婚了想带回中国，有日本户籍能办什么"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 日本人配偶（离婚后）
  target_status: 子女回中国 / 母亲签证
  subject: 家族
  template: japanese-child-back-to-china
  must_not_match: [divorce-visa-change-6months]

- query: "二胎在日本生，听说要重新登录住民票，孩子签证申请窗口在哪"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 在留中（已有一胎）
  target_status: 二胎在留 + 住民登录
  subject: 家族
  template: second-child-procedure
  must_not_match: [birth-30day-procedure]

---

## 紧急 / 风险类（Q266-Q275）

- query: "我签证过期半年了一直没敢去入管，现在想自首，会不会直接被关起来"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 不法滞在
  target_status: 出国命令 or 在留特别许可
  subject: 本人
  template: unauthorized-stay-shutougainei
  must_not_match: [visa-renewal-howto, deportation-procedure]

- query: "我是留学生但偷偷在按摩店打工，听说被举报了，会不会被遣返"
  expected_intent: unauthorized-employment-impact
  domain: visa
  current_status: 留学（资格外活动违反）
  target_status: --
  subject: 本人
  template: unauthorized-work-consequence
  must_not_match: [shikakugai-katsudou-howto, deportation-procedure]

- query: "公司被入管摘発，我是技人国但工作内容不符，怎么办"
  expected_intent: unauthorized-employment-impact
  domain: visa
  current_status: 技人国（实际工作不符）
  target_status: 在留更新或在特
  subject: 本人 / 雇主
  template: workplace-raid-employee-impact
  must_not_match: [job-change-notification]

- query: "入管寄来「出頭通知書」叫我下周去，要不要带律师"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 在留中（被入管传唤）
  target_status: --
  subject: 本人
  template: shutoutsuu-tsuuchi-response
  must_not_match: [doc-recognition-immigration-summon, deportation-procedure]

- query: "在车站被警察查身份证发现签证过期，被带走了，家人能做什么"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 不法滞在（已被收容）
  target_status: 假放免 or 出国命令
  subject: 家族
  template: detained-family-response
  must_not_match: [unauthorized-stay-self-report]

- query: "公司说我没在签证许可范围工作要被罚款，我可能被吊销签证吗"
  expected_intent: unauthorized-employment-impact
  domain: visa
  current_status: 技人国 / 留学
  target_status: --
  subject: 本人
  template: out-of-scope-work-penalty
  must_not_match: [shikakugai-katsudou-howto]

- query: "退去强制令下来了，但我有日本籍小孩，还能不能再争取"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 退去强制（有日本国籍子女）
  target_status: 在留特别许可
  subject: 本人
  template: deportation-with-japanese-child
  must_not_match: [japanese-child-back-to-china, divorce-visa-change-6months]

- query: "听说不法滞在被抓罚金最高 300 万日元，是真的吗"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 不法滞在
  target_status: --
  subject: 本人
  template: fubou-taizai-fine-info
  must_not_match: [doc-recognition-final-notice]

- query: "出国命令制度听说能保留 1 年内再入境，但我有滞纳金会影响吗"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 不法滞在（无前科）
  target_status: 出国命令
  subject: 本人
  template: shukkoku-meirei-eligibility
  must_not_match: [tax-arrears-negotiation, return-permission-vs-reentry]

- query: "在留特别许可申请下去要等多久，等不到工作能维持吗"
  expected_intent: unauthorized-stay-self-report
  domain: visa
  current_status: 不法滞在（在特申请中）
  target_status: 在留特别许可
  subject: 本人
  template: zaitoku-waiting-period-rules
  must_not_match: [unauthorized-employment-impact]

---

## 出国 / 回国（Q276-Q285）

- query: "明年回国不再回日本，永驻签是放弃就行还是要去入管交回"
  expected_intent: return-permission-vs-reentry
  domain: visa
  current_status: 永驻
  target_status: 永驻放弃
  subject: 本人
  template: permanent-residence-relinquish
  must_not_match: [reentry-permission-howto]

- query: "回国超过 1 年但不到 2 年，永驻还能保住吗，要办什么手续"
  expected_intent: return-permission-vs-reentry
  domain: visa
  current_status: 永驻
  target_status: 维持永驻
  subject: 本人
  template: reentry-permit-1year-vs-5year
  must_not_match: [permanent-residence-relinquish]

- query: "みなし再入国 1 年内不回来会怎样，要重新申请永驻吗"
  expected_intent: return-permission-vs-reentry
  domain: visa
  current_status: 永驻 / 技人国
  target_status: 维持在留
  subject: 本人
  template: minashi-reentry-rules
  must_not_match: [permanent-residence-application]

- query: "想回国办爸妈短期签证来日本看孙子，准备什么材料"
  expected_intent: parents-short-term-visit
  domain: visa
  current_status: 在留中
  target_status: 父母短期滞在
  subject: 家族
  template: parents-short-term-visa-prep
  must_not_match: [coe-application-flow]

- query: "父母 70 多了想长期在日本陪我，有没有签证可以申请"
  expected_intent: parents-short-term-visit
  domain: visa
  current_status: 永驻 / 高才
  target_status: 特定活动（父母赡养）
  subject: 家族
  template: parents-long-term-koujin
  must_not_match: [parents-short-term-visa-prep, family-dependent-to-work-visa]

- query: "回国清算房子和车子要办什么税，最后离境前要交吗"
  expected_intent: return-permission-vs-reentry
  domain: tax
  current_status: 在留中（准备永久回国）
  target_status: --
  subject: 本人
  template: leaving-japan-tax-cleanup
  must_not_match: [permanent-residence-relinquish, tax-payment-howto]

- query: "永驻者出境了 3 年没回，签证还有效吗，还能再入境吗"
  expected_intent: return-permission-vs-reentry
  domain: visa
  current_status: 永驻（已超期出境）
  target_status: --
  subject: 本人
  template: permanent-residence-lapsed
  must_not_match: [reentry-permit-1year-vs-5year]

- query: "5 年再入国许可办了之后能在国外生几个孩子再回来吗"
  expected_intent: return-permission-vs-reentry
  domain: visa
  current_status: 永驻 / 技人国
  target_status: --
  subject: 本人 / 家族
  template: reentry-and-foreign-birth
  must_not_match: [birth-zairyu-application]

- query: "回国前年金一次性返还（脱退一時金）能拿多少，怎么申请"
  expected_intent: return-permission-vs-reentry
  domain: social-insurance
  current_status: 在留中（准备出国）
  target_status: --
  subject: 本人
  template: dattai-ichijikin-procedure
  must_not_match: [pension-arrears-payment]

- query: "父母签证拒签过一次，现在再办还要等多久才能再申请"
  expected_intent: parents-short-term-visit
  domain: visa
  current_status: 在留中（家族被拒签）
  target_status: 父母短期滞在再申请
  subject: 家族
  template: parents-visa-redo-after-refusal
  must_not_match: [parents-short-term-visa-prep]

---

## 复合个案（Q286-Q300）

- query: "经管签 3 年了想换永驻，但今年刚换妻子是日本人，走配偶通道还是经管 10 年通道更快"
  expected_intent: permanent-residence-application
  domain: visa
  current_status: 经营管理 + 日本人配偶
  target_status: 永驻
  subject: 本人
  template: pr-via-spouse-vs-manager
  must_not_match: [marriage-30days-checklist, manager-visa-renewal]

- query: "技人国 5 年想申请帰化，但去年漏交住民税 3 个月，现在要等几年才能申请"
  expected_intent: naturalization-application
  domain: visa
  current_status: 技人国（有税滞纳记录）
  target_status: 帰化
  subject: 本人
  template: naturalization-with-tax-arrears
  must_not_match: [tax-arrears-negotiation, permanent-residence-application]

- query: "高才 1 年快到了想直接申请永驻，同时怀孕了，孩子能跟我一起拿永驻吗"
  expected_intent: permanent-residence-application
  domain: visa
  current_status: 高度专门职 1 号
  target_status: 永驻 + 子女在留
  subject: 本人 / 家族
  template: koujin-pr-with-newborn
  must_not_match: [birth-zairyu-application, koujin-application]

- query: "经管签想雇老婆做事务，老婆现在是家族滞在，要先变更哪步"
  expected_intent: spouse-work-from-family-visa
  domain: visa
  current_status: 家族滞在（配偶为经管者）
  target_status: 技人国 / 资格外活动
  subject: 家族
  template: spouse-from-family-to-work
  must_not_match: [shikakugai-katsudou-howto]

- query: "我打算永驻 + 帰化都准备，听说同时进行不可以，要先做哪个"
  expected_intent: naturalization-application
  domain: visa
  current_status: 在留中（永驻申请准备中）
  target_status: 永驻 or 帰化
  subject: 本人
  template: pr-vs-naturalization-priority
  must_not_match: [permanent-residence-application]

- query: "夫妻一起开公司，老公是经管，老婆做財務，我们怎么交税最划算"
  expected_intent: tax-filing-howto
  domain: tax
  current_status: 经管 + 家族滞在 / 技人国
  target_status: --
  subject: 本人 / 家族
  template: couple-business-tax-strategy
  must_not_match: [year-end-adjustment-howto]

- query: "前夫不抚养孩子，我离婚后想给孩子改姓再帰化，顺序怎么安排"
  expected_intent: naturalization-application
  domain: visa
  current_status: 日本人配偶（离婚后）
  target_status: 帰化 + 子女改姓
  subject: 本人 / 家族
  template: naturalization-with-child-rename
  must_not_match: [divorce-visa-change-6months, japanese-child-back-to-china]

- query: "我永驻了但老公在国内，想把他和孩子一起接来，要怎么走"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 永驻
  target_status: 家族（配偶 + 子女）COE
  subject: 家族
  template: pr-bringing-family-from-china
  must_not_match: [coe-application-flow, parents-short-term-visit]

- query: "经营管理签到期前公司亏损要关掉，怎样不影响在留更新"
  expected_intent: company-closure-visa-impact
  domain: visa
  current_status: 经营管理（公司亏损）
  target_status: 在留更新 or 转技人国
  subject: 本人 / 雇主
  template: business-shutdown-and-visa
  must_not_match: [manager-visa-renewal]

- query: "刚拿到在特，想申请配偶来日本，要等几年才能保人"
  expected_intent: marriage-30days-checklist
  domain: visa
  current_status: 在留特别许可（定住）
  target_status: 家族（配偶）COE
  subject: 家族
  template: zaitoku-after-family-invite
  must_not_match: [coe-application-flow]

- query: "我帰化了但孩子还是中国籍，他能继续读公立学校吗，要换什么签证"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 已帰化（子女中国籍）
  target_status: 子女在留资格变更
  subject: 家族
  template: child-status-after-parent-naturalization
  must_not_match: [naturalization-application, child-school-transfer]

- query: "高才 80 分但年金有 2 年没交，现在补交还能用 80 分通道走永驻吗"
  expected_intent: permanent-residence-application
  domain: visa
  current_status: 高度专门职 1 号（年金滞纳）
  target_status: 永驻
  subject: 本人
  template: koujin-pr-with-pension-arrears
  must_not_match: [pension-arrears-payment, koujin-pr-with-newborn]

- query: "我换工作刚 3 个月，现在签证更新和经管转换同时要做，要先报哪个"
  expected_intent: job-change-notification
  domain: visa
  current_status: 技人国（转职后）
  target_status: 经营管理 / 在留更新
  subject: 本人
  template: job-change-and-status-change-overlap
  must_not_match: [manager-visa-application]

- query: "孩子在日本生，我老公中国出差碰上疫情回不来，孩子签证 60 天快到了"
  expected_intent: birth-zairyu-application
  domain: visa
  current_status: 在留中（配偶滞留海外）
  target_status: 子女在留 + 配偶再入境
  subject: 家族
  template: child-zairyu-with-spouse-abroad
  must_not_match: [reentry-permission-howto, child-zairyu-overdue]

- query: "想离婚但还在配偶签，我已经怀孕了打算自己带，签证 + 育儿 + 出生通知怎么排"
  expected_intent: divorce-visa-change-6months
  domain: visa
  current_status: 日本人配偶（怀孕中 / 拟离婚）
  target_status: 定住者 + 子女在留
  subject: 本人 / 家族
  template: divorce-pregnant-comprehensive
  must_not_match: [birth-zairyu-application, dv-protection-special-permit]
