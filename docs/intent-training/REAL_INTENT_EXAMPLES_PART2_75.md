# TEBIQ Intent Examples — Part 2 (Q076–Q150)

> 75 条真实用户问法 — 公司经营 + 材料清单 + 永住准备 类
> 写手 2 / 4。每条 8 字段：query / expected_intent / domain / current_status / target_status / subject / template / must_not_match

---

## 公司休眠 + 年金 (Q076–Q085)

- query: "我把会社休眠了，国民年金还要继续交吗"
  expected_intent: dormant-company-personal-pension
  domain: social-insurance
  current_status: 経営・管理 / 公司休眠中
  target_status: --
  subject: 本人
  template: dormant-company-personal-impact
  must_not_match: [dormant-company-management-impact, pension-payment-delay, social-insurance-switch]

- query: "公司不开了准备休眠 厚生年金怎么办我自己的年金"
  expected_intent: dormant-company-personal-pension
  domain: social-insurance
  current_status: 経営・管理 / 准备休眠
  target_status: --
  subject: 本人
  template: dormant-company-personal-impact
  must_not_match: [company-dissolution-procedure, koseinenkin-withdrawal, dormant-company-management-impact]

- query: "会社休眠后我从厚生年金切换到国保和国民年金需要去哪里办"
  expected_intent: dormant-company-pension-switch-procedure
  domain: social-insurance
  current_status: 経営・管理 / 公司休眠
  target_status: 国保 + 国民年金
  subject: 本人
  template: insurance-switch-procedure
  must_not_match: [resignation-insurance-switch, kokuho-enrollment-foreigner]

- query: "公司休眠了社保停了 我老婆和孩子的扶养咋办"
  expected_intent: dormant-company-family-dependents
  domain: social-insurance
  current_status: 経営・管理 / 公司休眠
  target_status: --
  subject: 家族
  template: dormant-company-family-impact
  must_not_match: [family-visa-dependents, kenko-hoken-dependent-add]

- query: "公司休眠期间没收入 国民年金可以申请免除吗"
  expected_intent: pension-exemption-no-income
  domain: social-insurance
  current_status: 経営・管理 / 公司休眠 / 无收入
  target_status: --
  subject: 本人
  template: pension-exemption-application
  must_not_match: [pension-payment-delay, dormant-company-personal-pension]

- query: "会社解散了 之前交的厚生年金能拿回来吗 还是要继续等到65岁"
  expected_intent: koseinenkin-after-dissolution
  domain: social-insurance
  current_status: 公司已解散
  target_status: --
  subject: 本人
  template: pension-after-company-end
  must_not_match: [pension-lump-sum-withdrawal, dattai-ichijikin]

- query: "公司休眠中 想自己一个人重新开个体户 年金从哪里继续"
  expected_intent: dormant-company-pension-self-employed-switch
  domain: social-insurance
  current_status: 経営・管理 / 休眠 / 准备个人事业
  target_status: 个人事业主 + 国民年金
  subject: 本人
  template: pension-switch-self-employed
  must_not_match: [koseinenkin-continue, dormant-company-personal-pension]

- query: "我休眠会社一年了 这一年没交年金 现在补交可以吗"
  expected_intent: pension-back-payment-after-dormant
  domain: social-insurance
  current_status: 経営・管理 / 休眠满 1 年
  target_status: --
  subject: 本人
  template: pension-back-payment
  must_not_match: [pension-payment-delay, pension-exemption-no-income]

- query: "公司休眠了我老公社保也没了 健康保险卡怎么办 看病急用"
  expected_intent: dormant-company-health-insurance-urgent
  domain: social-insurance
  current_status: 配偶为経営・管理 / 公司休眠
  target_status: 国保
  subject: 家族
  template: health-insurance-emergency-switch
  must_not_match: [kenko-hoken-card-lost, family-visa-medical]

- query: "経営管理签证我打算让公司睡两年 国民年金这两年欠的影响以后永住吗"
  expected_intent: dormant-company-pension-permanent-impact
  domain: social-insurance
  current_status: 経営・管理 / 计划休眠 2 年
  target_status: 永住
  subject: 本人
  template: dormant-company-permanent-impact
  must_not_match: [permanent-residency-pension-record, dormant-company-personal-pension]

---

## 资本金不够 (Q086–Q095)

- query: "経営管理500万资本金现在只有380万了 续签会被拒吗"
  expected_intent: management-capital-insufficient
  domain: visa
  current_status: 経営・管理 / 资本金 380 万
  target_status: 续签
  subject: 本人
  template: management-capital-renewal-issue
  must_not_match: [visa-renewal-management, capital-injection-procedure]

- query: "新申请経管签 资本金只有400万够不够 听说要500"
  expected_intent: management-capital-insufficient-new-application
  domain: visa
  current_status: 准备申请経営・管理
  target_status: 経営・管理 / 新申请
  subject: 本人
  template: management-capital-new-app
  must_not_match: [management-visa-requirements, capital-source-explanation]

- query: "资本金500万但账上只剩200万了 决算后续签怎么办"
  expected_intent: management-capital-after-decisan
  domain: visa
  current_status: 経営・管理 / 决算后资本金减少
  target_status: 续签
  subject: 本人
  template: management-capital-decisan-issue
  must_not_match: [decisan-procedure, management-capital-insufficient]

- query: "经管续签前增资到500万来得及吗 现在还有3个月"
  expected_intent: management-capital-injection-before-renewal
  domain: visa
  current_status: 経営・管理 / 续签前 3 个月
  target_status: 续签
  subject: 本人
  template: capital-injection-timeline
  must_not_match: [management-capital-insufficient, capital-source-explanation]

- query: "资本金从国内汇过来要怎么证明来源 入管会查吗"
  expected_intent: management-capital-source-proof
  domain: visa
  current_status: 准备申请経営・管理
  target_status: 経営・管理
  subject: 本人
  template: capital-source-proof
  must_not_match: [overseas-remittance-tax, management-capital-insufficient]

- query: "现金资本500万有了 但没办公室 还是会被拒吗"
  expected_intent: management-office-requirement
  domain: visa
  current_status: 准备申请経営・管理 / 无独立办公室
  target_status: 経営・管理
  subject: 本人
  template: management-office-issue
  must_not_match: [management-capital-insufficient, virtual-office-management]

- query: "公司亏损资本金已经变负数了 经管签还能续吗"
  expected_intent: management-capital-negative-renewal
  domain: visa
  current_status: 経営・管理 / 资本金为负
  target_status: 续签
  subject: 本人
  template: management-capital-negative
  must_not_match: [management-capital-insufficient, dormant-company-management-impact]

- query: "我用借款充资本金可以吗 后面还要还的那种"
  expected_intent: management-capital-loan-source
  domain: visa
  current_status: 准备申请経営・管理
  target_status: 経営・管理
  subject: 本人
  template: capital-loan-source-issue
  must_not_match: [management-capital-source-proof, capital-injection-procedure]

- query: "二人合伙开公司 一人250万 一共500万这样算资本金达标吗"
  expected_intent: management-capital-multiple-founders
  domain: visa
  current_status: 准备申请経営・管理 / 两人合伙
  target_status: 経営・管理
  subject: 本人
  template: capital-multi-founder
  must_not_match: [management-capital-insufficient, management-shareholder-structure]

- query: "增资从500万加到1000万 对续签和永住有帮助吗"
  expected_intent: management-capital-increase-benefit
  domain: visa
  current_status: 経営・管理 / 资本金 500 万
  target_status: 续签 / 永住
  subject: 本人
  template: capital-increase-benefit
  must_not_match: [management-capital-injection-before-renewal, permanent-residency-management]

---

## 材料清单 — 经管 (Q096–Q100)

- query: "经管续签要准备哪些材料 给我列个清单"
  expected_intent: documents-list-management-renewal
  domain: visa
  current_status: 経営・管理 / 续签
  target_status: 续签
  subject: 本人
  template: documents-management-renewal
  must_not_match: [visa-renewal-management, documents-list-permanent-residency]

- query: "经管续签 会社的决算书要几年的 一年还是两年"
  expected_intent: documents-management-renewal-decisan
  domain: visa
  current_status: 経営・管理 / 续签
  target_status: 续签
  subject: 本人
  template: documents-management-decisan-years
  must_not_match: [decisan-procedure, documents-list-management-renewal]

- query: "经管续签 自己的住民税纳税证明要去市役所还是区役所拿"
  expected_intent: documents-management-tax-cert-where
  domain: visa
  current_status: 経営・管理 / 续签
  target_status: 续签
  subject: 本人
  template: tax-cert-procedure-management
  must_not_match: [zaikin-shomei-procedure, documents-list-management-renewal]

- query: "经管续签 法定调书合計表还有源泉徴収票 公司没员工只有自己也要交吗"
  expected_intent: documents-management-no-employee
  domain: visa
  current_status: 経営・管理 / 一人会社
  target_status: 续签
  subject: 本人
  template: documents-management-solo
  must_not_match: [documents-list-management-renewal, gensen-choshu-procedure]

- query: "经管续签 需要交事业计画书吗 第一次续签和第二次续签材料一样吗"
  expected_intent: documents-management-business-plan
  domain: visa
  current_status: 経営・管理 / 续签
  target_status: 续签
  subject: 本人
  template: documents-management-business-plan
  must_not_match: [documents-list-management-renewal, management-visa-requirements]

---

## 材料清单 — 永住 (Q101–Q110)

- query: "申请永住要准备的材料清单完整版 麻烦给我一份"
  expected_intent: documents-list-permanent-residency
  domain: visa
  current_status: 各类在留资格
  target_status: 永住
  subject: 本人
  template: documents-permanent-residency
  must_not_match: [permanent-residency-timing, documents-list-management-renewal]

- query: "永住直近5年的纳税证明 是住民税还是所得税都要"
  expected_intent: documents-permanent-tax-types
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: documents-permanent-tax-detail
  must_not_match: [tax-cert-procedure, documents-list-permanent-residency]

- query: "永住需要的完納証明 从哪里开 区役所给开吗"
  expected_intent: documents-permanent-kanno-shomei
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: kanno-shomei-procedure
  must_not_match: [zaikin-shomei-procedure, documents-list-permanent-residency]

- query: "永住申请 国民年金的纳付状况 怎么证明 我之前有几个月没交"
  expected_intent: documents-permanent-pension-record
  domain: visa
  current_status: 准备申请永住 / 年金有缺
  target_status: 永住
  subject: 本人
  template: pension-record-permanent
  must_not_match: [pension-payment-delay, documents-list-permanent-residency]

- query: "永住 身元保証人书谁可以做 必须日本人吗"
  expected_intent: documents-permanent-guarantor
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: permanent-guarantor-requirement
  must_not_match: [hosho-nin-procedure, documents-list-permanent-residency]

- query: "永住申请 銀行残高証明 要存多少才够 听说要有一定金额"
  expected_intent: documents-permanent-bank-balance
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: permanent-bank-balance
  must_not_match: [zankin-shomei-procedure, documents-list-permanent-residency]

- query: "永住 履历书 要写到几岁开始 中国的高中工作经历也要写吗"
  expected_intent: documents-permanent-rireki
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: permanent-rireki-detail
  must_not_match: [documents-list-permanent-residency, naturalization-rireki]

- query: "永住的理由书要写多长 用日语写吗 中文行吗"
  expected_intent: documents-permanent-reason-letter
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: permanent-reason-letter
  must_not_match: [documents-list-permanent-residency, naturalization-reason-letter]

- query: "永住申请 直近5年的源泉徴収票 我换了3家公司 每家都要去要吗"
  expected_intent: documents-permanent-gensen-multiple-jobs
  domain: visa
  current_status: 准备申请永住 / 多次换工作
  target_status: 永住
  subject: 本人
  template: permanent-gensen-multi-employer
  must_not_match: [gensen-choshu-procedure, documents-list-permanent-residency]

- query: "永住 健康保险被保险者证 复印件可以吗 还是要原件"
  expected_intent: documents-permanent-health-insurance-card
  domain: visa
  current_status: 准备申请永住
  target_status: 永住
  subject: 本人
  template: permanent-insurance-card-detail
  must_not_match: [documents-list-permanent-residency, kenko-hoken-card-procedure]

---

## 材料清单 — 配偶 / 定住 (Q111–Q115)

- query: "日本人の配偶者ビザ申请要哪些材料 老婆是日本人"
  expected_intent: documents-list-spouse-japanese
  domain: visa
  current_status: 短期 / 海外 / 准备申请配偶签
  target_status: 日本人の配偶者等
  subject: 本人
  template: documents-spouse-japanese
  must_not_match: [spouse-visa-requirements, documents-list-permanent-residency]

- query: "配偶签更新 婚姻还在 但是分居了 材料怎么准备"
  expected_intent: documents-spouse-renewal-separated
  domain: visa
  current_status: 日本人の配偶者等 / 分居中
  target_status: 续签
  subject: 本人
  template: spouse-renewal-separated
  must_not_match: [divorce-visa-change-spouse, documents-list-spouse-japanese]

- query: "定住者签证更新需要哪些材料 离婚后拿的定住"
  expected_intent: documents-list-teijusha-renewal
  domain: visa
  current_status: 定住者 / 离婚后
  target_status: 续签
  subject: 本人
  template: documents-teijusha-renewal
  must_not_match: [divorce-visa-change-spouse, teijusha-requirements]

- query: "配偶签首次申请 中国结婚证还要拿到日本翻译公证吗"
  expected_intent: documents-spouse-marriage-cert-translation
  domain: visa
  current_status: 海外 / 短期 / 准备配偶签
  target_status: 日本人の配偶者等
  subject: 本人
  template: marriage-cert-translation
  must_not_match: [documents-list-spouse-japanese, marriage-procedure-japan]

- query: "配偶签材料 质问书一共几页 怎么写 写错了能改吗"
  expected_intent: documents-spouse-questionnaire
  domain: visa
  current_status: 准备配偶签
  target_status: 日本人の配偶者等
  subject: 本人
  template: spouse-questionnaire-detail
  must_not_match: [documents-list-spouse-japanese, fake-marriage-suspicion]

---

## 永住准备类 (Q116–Q130)

- query: "技术签证拿了4年了 还差多久能申请永住"
  expected_intent: permanent-residency-timing-engineer
  domain: visa
  current_status: 技術・人文知識・国際業務 / 4 年
  target_status: 永住
  subject: 本人
  template: permanent-timing-by-status
  must_not_match: [permanent-residency-timing, visa-renewal-engineer]

- query: "我老婆是日本人 结婚3年 可以申请永住了吗"
  expected_intent: permanent-residency-timing-spouse
  domain: visa
  current_status: 日本人の配偶者等 / 婚姻 3 年
  target_status: 永住
  subject: 本人
  template: permanent-timing-spouse
  must_not_match: [permanent-residency-timing, naturalization-vs-permanent]

- query: "高度人材70分 听说1年就能永住 真的吗 我现在多少分"
  expected_intent: koudo-jinzai-permanent-acceleration
  domain: visa
  current_status: 各类工作签 / 考虑高度人材
  target_status: 永住
  subject: 本人
  template: koudo-jinzai-fast-track
  must_not_match: [permanent-residency-timing, koudo-jinzai-points-calculation]

- query: "高度人材80分 现在已经满1年 永住可以马上申请吗 在留卡剩多久不重要吧"
  expected_intent: koudo-jinzai-80-permanent
  domain: visa
  current_status: 高度専門職 80 分 / 满 1 年
  target_status: 永住
  subject: 本人
  template: koudo-jinzai-80-fast-track
  must_not_match: [koudo-jinzai-permanent-acceleration, permanent-residency-timing]

- query: "永住要在留期限3年以上才能申请吗 我现在是1年的"
  expected_intent: permanent-residency-zairyu-period-requirement
  domain: visa
  current_status: 在留 1 年签
  target_status: 永住
  subject: 本人
  template: permanent-zairyu-period
  must_not_match: [permanent-residency-timing, visa-renewal-3year]

- query: "经管签拿了10年 中间有3年公司亏损 永住会受影响吗"
  expected_intent: permanent-residency-management-loss-history
  domain: visa
  current_status: 経営・管理 / 10 年 / 中间亏损
  target_status: 永住
  subject: 本人
  template: permanent-management-history
  must_not_match: [permanent-residency-timing, management-renewal-no-profit]

- query: "永住 工资要多少 年收入低于300万有戏吗"
  expected_intent: permanent-residency-income-requirement
  domain: visa
  current_status: 各类工作签 / 年收入低
  target_status: 永住
  subject: 本人
  template: permanent-income-requirement
  must_not_match: [permanent-residency-timing, low-income-visa-renewal]

- query: "永住申请期间 在留卡到期了怎么办 要先续签还是直接等永住下来"
  expected_intent: permanent-residency-during-renewal
  domain: visa
  current_status: 永住申请中 / 在留即将到期
  target_status: 永住 / 续签并行
  subject: 本人
  template: permanent-app-renewal-overlap
  must_not_match: [permanent-residency-timing, visa-renewal-procedure]

- query: "永住准备阶段 出国超过90天 要重新算居住期间吗"
  expected_intent: permanent-residency-overseas-days
  domain: visa
  current_status: 准备永住 / 出国天数多
  target_status: 永住
  subject: 本人
  template: permanent-overseas-days-impact
  must_not_match: [permanent-residency-timing, mineiji-period]

- query: "永住申请前 我的国民年金有2个月忘了交 现在补会不会还是被拒"
  expected_intent: permanent-residency-pension-gap-recovery
  domain: visa
  current_status: 准备永住 / 年金 2 个月断
  target_status: 永住
  subject: 本人
  template: permanent-pension-gap-fix
  must_not_match: [pension-back-payment, permanent-residency-timing]

- query: "我和老公都是中国人 经管签 一起申请永住 家人也能一起拿吗"
  expected_intent: permanent-residency-family-together
  domain: visa
  current_status: 経営・管理 / 全家中国国籍
  target_status: 全家永住
  subject: 家族
  template: permanent-family-application
  must_not_match: [permanent-residency-timing, family-visa-permanent]

- query: "永住 直近1年的换工作 影响吗 我现在跳槽到一家小公司"
  expected_intent: permanent-residency-recent-job-change
  domain: visa
  current_status: 准备永住 / 近期跳槽
  target_status: 永住
  subject: 本人
  template: permanent-job-change-impact
  must_not_match: [permanent-residency-timing, visa-renewal-job-change]

- query: "永住交了2年没下来 听说有的人要等3年 真的吗"
  expected_intent: permanent-residency-processing-time
  domain: visa
  current_status: 永住申请中
  target_status: 永住
  subject: 本人
  template: permanent-processing-duration
  must_not_match: [permanent-residency-timing, visa-application-status-check]

- query: "永住被拒过一次 隔多久能重新申请 上次理由是收入不稳定"
  expected_intent: permanent-residency-rejection-reapply
  domain: visa
  current_status: 永住被拒 1 次
  target_status: 永住 / 重新申请
  subject: 本人
  template: permanent-reject-reapply
  must_not_match: [permanent-residency-timing, visa-rejection-reason]

- query: "我是技人国 现在年收350万 永住差50万 怎么提前规划"
  expected_intent: permanent-residency-income-planning
  domain: visa
  current_status: 技人国 / 年收 350 万
  target_status: 永住
  subject: 本人
  template: permanent-income-planning
  must_not_match: [permanent-residency-income-requirement, permanent-residency-timing]

---

## 帰化准备类 (Q131–Q135)

- query: "永住和帰化区别在哪里 我快10年了哪个先申请合适"
  expected_intent: naturalization-vs-permanent
  domain: visa
  current_status: 各类签证 / 接近 10 年
  target_status: 永住 or 帰化
  subject: 本人
  template: naturalization-vs-permanent
  must_not_match: [permanent-residency-timing, naturalization-procedure]

- query: "帰化申请 直近5年的纳税材料 包括住民税和所得税都要吗"
  expected_intent: naturalization-tax-documents
  domain: visa
  current_status: 准备帰化
  target_status: 帰化
  subject: 本人
  template: naturalization-tax-detail
  must_not_match: [documents-permanent-tax-types, naturalization-vs-permanent]

- query: "永住已经拿了3年 现在想申请帰化 最快什么时候可以"
  expected_intent: naturalization-after-permanent-timing
  domain: visa
  current_status: 永住 / 3 年
  target_status: 帰化
  subject: 本人
  template: naturalization-from-permanent
  must_not_match: [naturalization-vs-permanent, naturalization-procedure]

- query: "帰化要放弃中国国籍这件事 法务局会怎么查"
  expected_intent: naturalization-china-nationality-renounce
  domain: visa
  current_status: 准备帰化
  target_status: 帰化
  subject: 本人
  template: naturalization-renounce-china
  must_not_match: [naturalization-procedure, naturalization-vs-permanent]

- query: "帰化和永住 哪个对孩子上学有好处 孩子在日本出生"
  expected_intent: naturalization-vs-permanent-children
  domain: visa
  current_status: 各类签 / 孩子日本出生
  target_status: 永住 or 帰化
  subject: 家族
  template: naturalization-permanent-children
  must_not_match: [naturalization-vs-permanent, child-japanese-nationality]

---

## 跨身份变更类 (Q136–Q150)

- query: "和日本人离婚了 配偶签还能用多久 不想马上回国"
  expected_intent: divorce-visa-change-spouse
  domain: visa
  current_status: 日本人の配偶者等 / 已离婚
  target_status: 定住者 or 工作签
  subject: 本人
  template: divorce-spouse-visa-change
  must_not_match: [documents-spouse-renewal-separated, teijusha-after-divorce]

- query: "日本人配偶离婚后想换定住者 需要什么条件 一定要小孩吗"
  expected_intent: teijusha-after-divorce-conditions
  domain: visa
  current_status: 日本人の配偶者等 / 离婚
  target_status: 定住者
  subject: 本人
  template: teijusha-divorce-conditions
  must_not_match: [divorce-visa-change-spouse, documents-list-teijusha-renewal]

- query: "永住下来后想申请帰化 时间能合并算吗 还是要重新算"
  expected_intent: naturalization-from-permanent-residency-period
  domain: visa
  current_status: 永住
  target_status: 帰化
  subject: 本人
  template: naturalization-period-calculation
  must_not_match: [naturalization-after-permanent-timing, naturalization-vs-permanent]

- query: "技人国转经管签 公司刚开 在留卡换的时候要交什么材料"
  expected_intent: change-engineer-to-management
  domain: visa
  current_status: 技術・人文知識・国際業務
  target_status: 経営・管理
  subject: 本人
  template: change-engineer-to-management
  must_not_match: [documents-list-management-renewal, management-visa-requirements]

- query: "留学生毕业了想转经管自己开公司 要先转技人国还是直接转经管"
  expected_intent: change-student-to-management
  domain: visa
  current_status: 留学
  target_status: 経営・管理
  subject: 本人
  template: change-student-management
  must_not_match: [change-engineer-to-management, student-to-work-visa]

- query: "经管转技人国 因为公司不开了 我想去打工 这种情况怎么办"
  expected_intent: change-management-to-engineer
  domain: visa
  current_status: 経営・管理 / 公司将停
  target_status: 技術・人文知識・国際業務
  subject: 本人
  template: change-management-to-engineer
  must_not_match: [dormant-company-personal-pension, change-engineer-to-management]

- query: "和日本人离婚有1个孩子 孩子日本国籍 我可以拿定住吗 抚养权在我"
  expected_intent: teijusha-divorce-with-child
  domain: visa
  current_status: 日本人の配偶者等 / 离婚 / 抚养孩子
  target_status: 定住者
  subject: 本人
  template: teijusha-with-child
  must_not_match: [teijusha-after-divorce-conditions, divorce-visa-change-spouse]

- query: "丈夫去世了 我配偶签 还能在日本待吗 想换定住"
  expected_intent: spouse-death-visa-change
  domain: visa
  current_status: 日本人の配偶者等 / 配偶死亡
  target_status: 定住者
  subject: 本人
  template: spouse-death-teijusha
  must_not_match: [divorce-visa-change-spouse, teijusha-after-divorce-conditions]

- query: "永住者和日本人离婚了 永住会被取消吗"
  expected_intent: permanent-resident-divorce-impact
  domain: visa
  current_status: 永住者 / 离婚
  target_status: 永住保持
  subject: 本人
  template: permanent-divorce-impact
  must_not_match: [divorce-visa-change-spouse, permanent-residency-revoke]

- query: "经管签证转高度人材 我硕士学位+年收700万够分吗"
  expected_intent: change-management-to-koudo-jinzai
  domain: visa
  current_status: 経営・管理
  target_status: 高度専門職
  subject: 本人
  template: change-management-koudo
  must_not_match: [koudo-jinzai-points-calculation, koudo-jinzai-permanent-acceleration]

- query: "家族滞在签证 老公拿到永住了 我想换工作签自己上班 怎么办"
  expected_intent: change-dependent-to-work-visa
  domain: visa
  current_status: 家族滞在 / 配偶永住
  target_status: 工作签 / 永住者の配偶者等
  subject: 本人
  template: change-dependent-work
  must_not_match: [eijusha-no-haigusha, family-visa-renewal]

- query: "永住者の配偶者等 离婚了 还能继续待吗 拿到才2年"
  expected_intent: eijusha-haigusha-divorce
  domain: visa
  current_status: 永住者の配偶者等 / 离婚
  target_status: 定住者 or 工作签
  subject: 本人
  template: eijusha-haigusha-divorce
  must_not_match: [divorce-visa-change-spouse, permanent-resident-divorce-impact]

- query: "技能签变工作签 中餐厨师做了8年 现在想换技人国 可能吗"
  expected_intent: change-ginou-to-engineer
  domain: visa
  current_status: 技能 / 8 年
  target_status: 技術・人文知識・国際業務
  subject: 本人
  template: change-ginou-engineer
  must_not_match: [change-engineer-to-management, ginou-visa-renewal]

- query: "特定技能2号转永住 听说现在可以了 时间怎么算"
  expected_intent: change-tokutei-2-to-permanent
  domain: visa
  current_status: 特定技能 2 号
  target_status: 永住
  subject: 本人
  template: tokutei-2-permanent
  must_not_match: [permanent-residency-timing, change-tokutei-engineer]

- query: "归化下来后 经管公司还能继续开吗 还是要重新办理什么"
  expected_intent: naturalization-management-company-continue
  domain: hr
  current_status: 経営・管理 / 帰化下来
  target_status: 帰化 / 公司继续
  subject: 本人
  template: naturalization-company-continue
  must_not_match: [naturalization-after-permanent-timing, change-management-to-engineer]
