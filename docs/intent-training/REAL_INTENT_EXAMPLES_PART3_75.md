# TEBIQ Intent Examples — Part 3 (Q151–Q225)

> 写手 3（共 4 人）。范围：刚到日本 + 年金 / 税 / 社保 + 生活类。共 75 条真实问法。
> 字段：query / expected_intent / domain / current_status / target_status / subject / template / must_not_match
> domain ∈ { visa, tax, social-insurance, hr, misc }

---

## 刚到日本第 30 天问题（Q151–Q160）

- query: "我刚落地东京三天了，区役所到底要先去办啥？"
  expected_intent: first-30-days-japan
  domain: misc
  current_status: 刚入境未做住民登録
  target_status: 完成住民登録 + 国保 + 年金加入
  subject: 本人
  template: first-30-days-checklist
  must_not_match: [address-change-zairyu-card, health-insurance-switch]

- query: "在留カードの裏面什么时候要去填地址啊在线等"
  expected_intent: first-30-days-japan
  domain: visa
  current_status: 在留卡背面地址空白
  target_status: 14天内住民登録同时登记地址
  subject: 本人
  template: zairyu-address-registration
  must_not_match: [address-change-zairyu-card, zairyu-renewal]

- query: "刚来日本马来酱社保和年金是不是一起办的"
  expected_intent: first-30-days-japan
  domain: social-insurance
  current_status: 留学生 / 自由职业 刚入境
  target_status: 区役所同窗口加入国保+国民年金
  subject: 本人
  template: first-30-days-checklist
  must_not_match: [pension-kokumin-payment, health-insurance-switch]

- query: "在留卡到了但是没住民票银行不让开户怎么办"
  expected_intent: first-30-days-japan
  domain: misc
  current_status: 有在留卡无住民票
  target_status: 先办住民登録后开户
  subject: 本人
  template: first-30-days-checklist
  must_not_match: [address-change-zairyu-card]

- query: "我没印鑑能不能办手续啊真的累"
  expected_intent: first-30-days-japan
  domain: misc
  current_status: 刚到日本无印鑑
  target_status: 多数手续サイン可，部分需印鑑登録
  subject: 本人
  template: first-30-days-checklist
  must_not_match: [inkan-registration]

- query: "携帯番号没有怎么办在留手续？没号码区役所不收"
  expected_intent: first-30-days-japan
  domain: misc
  current_status: 无日本手机号
  target_status: 先办预付卡或MVNO拿号
  subject: 本人
  template: first-30-days-checklist
  must_not_match: [bank-account-opening]

- query: "国保通知书寄到家 但金额好高我才来一周也要交吗"
  expected_intent: first-30-days-japan
  domain: social-insurance
  current_status: 刚住民登録收到国保通知
  target_status: 按月数计算保险料
  subject: 本人
  template: kokuho-first-bill
  must_not_match: [health-insurance-switch, residence-tax-payment-delay]

- query: "刚来日本必须14天内去区役所是真的吗超了会咋样"
  expected_intent: first-30-days-japan
  domain: visa
  current_status: 入境第 10 天未办住民登録
  target_status: 14天内完成住民登録
  subject: 本人
  template: jyumin-touroku-deadline
  must_not_match: [zairyu-renewal, address-change-zairyu-card]

- query: "在留卡上的地址和我新住的不一样要紧吗刚租的房子"
  expected_intent: first-30-days-japan
  domain: visa
  current_status: 入境时住宿地址变更
  target_status: 区役所同时更新住民票+在留卡背面
  subject: 本人
  template: zairyu-address-registration
  must_not_match: [address-change-zairyu-card]

- query: "myna卡是什么 必须办吗 刚来一个月一直被推荐"
  expected_intent: first-30-days-japan
  domain: misc
  current_status: 刚住民登録未申请My Number卡
  target_status: 选择申请 My Number Card
  subject: 本人
  template: mynumber-card-intro
  must_not_match: [first-30-days-japan]

---

## 搬家相关（Q161–Q165）

- query: "下个月从大田区搬到世田谷 在留卡地址要去新区办还是旧区办"
  expected_intent: address-change-zairyu-card
  domain: visa
  current_status: 跨自治体搬家
  target_status: 旧区転出届 → 新区転入届14日内
  subject: 本人
  template: cross-city-move
  must_not_match: [first-30-days-japan, address-change-zairyu-card]

- query: "区内搬家在留卡背面要换吗只是楼上楼下"
  expected_intent: address-change-zairyu-card
  domain: visa
  current_status: 同一自治体内搬家
  target_status: 14日内届出更新背面地址
  subject: 本人
  template: same-city-move
  must_not_match: [zairyu-renewal]

- query: "引越しワンストップ可以一起办水电吗听说有这服务"
  expected_intent: address-change-zairyu-card
  domain: misc
  current_status: 即将搬家
  target_status: 利用引越しワンストップサービス
  subject: 本人
  template: hikkoshi-one-stop
  must_not_match: [first-30-days-japan]

- query: "搬家14天忘了去届出 已经过了20天会不会被罚款"
  expected_intent: address-change-zairyu-card
  domain: visa
  current_status: 超过 14 日未办住所変更
  target_status: 立即届出+说明遅延理由
  subject: 本人
  template: late-address-change
  must_not_match: [zairyu-renewal, residence-tax-payment-delay]

- query: "搬家以后住民税要去新区交还是老区交啊6月刚搬"
  expected_intent: address-change-zairyu-card
  domain: tax
  current_status: 搬家跨年度
  target_status: 1/1 当日所在自治体征收当年度住民税
  subject: 本人
  template: cross-city-move-tax
  must_not_match: [residence-tax-payment-delay, residence-tax-permanent-impact]

---

## 年金（Q166–Q175）

- query: "国民年金每个月要交多少 我才月薪15万真心交不起"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 国民年金加入者
  target_status: 申请保険料免除/猶予
  subject: 本人
  template: kokumin-nenkin-exemption
  must_not_match: [pension-kokumin-payment, health-insurance-switch]

- query: "从公司辞职以后年金怎么切换 厚生变国民"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 厚生年金 → 国民年金切换
  target_status: 退職 14 日内区役所届出
  subject: 本人
  template: kousei-to-kokumin
  must_not_match: [health-insurance-switch, unemployment-koyou-hoken]

- query: "年金免除申请通过的话以后还能拿钱吗 算不算交了"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 申请全额免除中
  target_status: 了解免除期間对未来年金额影响
  subject: 本人
  template: kokumin-nenkin-exemption
  must_not_match: [pension-kokumin-payment]

- query: "国民年金欠了8个月没交 现在收到催告状怎么办"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 滞纳 8 个月催告中
  target_status: 立即缴纳或申请追纳
  subject: 本人
  template: nenkin-overdue-resolution
  must_not_match: [residence-tax-payment-delay, health-insurance-switch]

- query: "厚生年金和国民年金哪个划算 老婆自己交还是入我公司的"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 配偶决定加入方式
  target_status: 第3号被保険者扶养加入
  subject: 家族
  template: pension-spouse-fuyou
  must_not_match: [health-insurance-switch]

- query: "永驻审查会查年金吗 我之前断了两个月"
  expected_intent: pension-kokumin-payment
  domain: visa
  current_status: 准备永住申请有年金断纳记录
  target_status: 补缴 + 等2年纳付实绩
  subject: 本人
  template: pension-permanent-residence-impact
  must_not_match: [residence-tax-permanent-impact, eijuu-application]

- query: "学生纳付特例怎么申请 我刚开学没钱"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 在学中の学生
  target_status: 申请学生納付特例制度
  subject: 本人
  template: gakusei-nouhu-tokurei
  must_not_match: [pension-kokumin-payment]

- query: "公司没给我交厚生年金 我才发现入职3个月了"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 雇主未加入厚生年金
  target_status: 年金事務所举报+追加入
  subject: 雇员
  template: employer-pension-violation
  must_not_match: [unemployment-koyou-hoken]

- query: "60岁还在打工要交年金吗 我准备65岁退休"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 60岁以上在职
  target_status: 厚生年金70歳まで継続
  subject: 本人
  template: pension-60plus-coverage
  must_not_match: [pension-kokumin-payment]

- query: "国民年金一括纳付有折扣吗 听说前払便宜不少"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 国民年金加入者
  target_status: 利用 2 年前納制度
  subject: 本人
  template: nenkin-prepayment-discount
  must_not_match: [pension-kokumin-payment]

---

## 住民税（Q176–Q185）

- query: "住民税6月一下子来一张13万的票 这是搞错了吗"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 普通徴収一括通知
  target_status: 4 期分割 or 一括缴纳
  subject: 本人
  template: jyuminzei-bill-explained
  must_not_match: [residence-tax-overseas-income, kakutei-shinkoku-first]

- query: "去年没工作但收到住民税通知了 这能减免吗"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 前年無收入仍被课税
  target_status: 申请 非課税申告
  subject: 本人
  template: jyuminzei-non-taxable
  must_not_match: [kakutei-shinkoku-first]

- query: "住民税滞纳半年了银行账户被冻结了怎么办"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 滞納 → 差押え
  target_status: 立即区役所相談 + 分纳协议
  subject: 本人
  template: jyuminzei-bunnou
  must_not_match: [residence-tax-permanent-impact, residence-tax-overseas-income]

- query: "公司每月扣的住民税和我自己交的有什么区别"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 想了解徴收方式
  target_status: 理解特别徴収 vs 普通徴収
  subject: 雇员
  template: tokubetsu-vs-futsuu
  must_not_match: [residence-tax-payment-delay]

- query: "想申请永住 完納証明在哪里开 还有课税证明"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 准备永住资料
  target_status: 区役所开 完納証明 + 课税証明 3 年分
  subject: 本人
  template: kanou-shoumei-eijuu
  must_not_match: [eijuu-application, residence-tax-permanent-impact]

- query: "住民税普通徴収可以分期吗 一次拿不出来"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 普通徴収一括到期
  target_status: 利用 4 期分纳 or 申请分纳
  subject: 本人
  template: jyuminzei-bunnou
  must_not_match: [residence-tax-payment-delay]

- query: "我6月辞职了 公司说住民税要一次性扣完 有这种事？"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 退職時の住民税一括徴収
  target_status: 选择 一括徴収 / 普通徴収切换
  subject: 雇员
  template: taishoku-jyuminzei
  must_not_match: [unemployment-koyou-hoken]

- query: "国外汇钱回来交住民税要申报吗 老婆每月给我打30万"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 海外汇款生活费用途
  target_status: 区分赠与/生活费 → 不课税或赠与税
  subject: 本人
  template: residence-tax-overseas-income
  must_not_match: [residence-tax-overseas-income, kakutei-shinkoku-first]

- query: "课税证明书今年的还没出 但学校要 怎么办"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 6月前需要前年度证明
  target_status: 等 6/1 后开具 or 用前々年度
  subject: 本人
  template: kazei-shoumei-timing
  must_not_match: [residence-tax-payment-delay]

- query: "住民税晚交一年了会影响永住申请吗 真担心"
  expected_intent: residence-tax-payment-delay
  domain: tax
  current_status: 滞納记录在永住申请期内
  target_status: 全额纳付+等待 + 解释書
  subject: 本人
  template: residence-tax-permanent-impact
  must_not_match: [residence-tax-permanent-impact, eijuu-application]

---

## 健康保険 / 国保（Q186–Q195）

- query: "退职了 国保和任意継続哪个便宜 一年还是半年比较好"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 退职将切换保险
  target_status: 比较任意継続 vs 国保保险料
  subject: 本人
  template: nini-keizoku-vs-kokuho
  must_not_match: [pension-kokumin-payment, unemployment-koyou-hoken]

- query: "老婆没工作怎么加我公司的健康保险扶养 收入限制是多少"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 申请家族被扶養加入
  target_status: 年收 130 万円以下扶養加入
  subject: 家族
  template: kenkouhoken-fuyou
  must_not_match: [pension-kokumin-payment]

- query: "国保和社保区别 我自由职业能选社保吗"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: フリーランス
  target_status: 国保加入(社保不可)
  subject: 本人
  template: kokuho-vs-shahoken
  must_not_match: [health-insurance-switch]

- query: "健康保険証丢了能立刻补办吗 下周要看牙医"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 保险证遗失
  target_status: 区役所/協会けんぽ 即日再交付
  subject: 本人
  template: kenkouhoken-saikoufu
  must_not_match: [health-insurance-switch]

- query: "完納証明书 国保的 永住要 在哪开"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 准备永住资料
  target_status: 区役所国保窓口开完納証明
  subject: 本人
  template: kokuho-kannou-shoumei
  must_not_match: [eijuu-application, residence-tax-payment-delay]

- query: "国保保险料每月8万 太贵了能减免吗 上个月失业了"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 失业后国保保险料过重
  target_status: 申请 非自発的失業者軽減 (倒産等)
  subject: 本人
  template: kokuho-genmen-shitsugyou
  must_not_match: [unemployment-koyou-hoken]

- query: "任意継続到期了 接下来怎么办自动转国保吗"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 任意継続 2 年期满
  target_status: 期满日切换至国保(非自动)
  subject: 本人
  template: nini-keizoku-end
  must_not_match: [health-insurance-switch]

- query: "孩子刚出生 健康保险加入要带啥去区役所"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 新生儿加入家族保险
  target_status: 出生 14 日内届出加入
  subject: 家族
  template: newborn-insurance-add
  must_not_match: [childbirth-benefits, pregnancy-benefits]

- query: "国保滞纳3个月会被取消保险吗 看病还能用卡吗"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 国保滞納中
  target_status: 短期保険証/资格証明書切换
  subject: 本人
  template: kokuho-tainou-shoumeisho
  must_not_match: [residence-tax-payment-delay]

- query: "之前是协会健保 现在跳槽到组合健保 有什么不一样"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 跳槽切换保险组合
  target_status: 新公司加入手続+旧保险証返还
  subject: 雇员
  template: kyokai-vs-kumiai
  must_not_match: [health-insurance-switch]

---

## 確定申告 / 所得税（Q196–Q205）

- query: "第一次确定申告 我有副业打工和YouTube两份收入应该咋报"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 初次申告含副业
  target_status: 雜所得+给与所得合算申告
  subject: 本人
  template: kakutei-shinkoku-fukugyou
  must_not_match: [residence-tax-payment-delay]

- query: "源泉徴収票丢了能确定申告吗 公司说重新开要等2周"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 源泉徴収票遺失
  target_status: 公司再发行 or 给与支払報告書代替
  subject: 雇员
  template: gensen-tyoushuuhyou-lost
  must_not_match: [kakutei-shinkoku-first]

- query: "副业20万以下不用申告是真的吗 我只赚了18万"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 副业雜所得 18 万円
  target_status: 所得税不要 但住民税申告必要
  subject: 本人
  template: fukugyou-20man-rule
  must_not_match: [residence-tax-payment-delay]

- query: "海外汇款100万回日本 要不要申告 是父母给的"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 海外赠与汇款受領
  target_status: 110 万超 → 贈与税申告
  subject: 本人
  template: overseas-souyo-zouyo
  must_not_match: [residence-tax-overseas-income]

- query: "确定申告期限是几号？2026年的"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 准备申告
  target_status: 3/15 之前提出
  subject: 本人
  template: kakutei-shinkoku-deadline
  must_not_match: [kakutei-shinkoku-first]

- query: "医疗费一年花了20万 听说能退税真的吗"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 医療費控除候补
  target_status: 10 万超部分医療費控除申告
  subject: 本人
  template: iryouhi-koujo
  must_not_match: [kakutei-shinkoku-first]

- query: "ふるさと納税我做了8家 还要去做确定申告吗"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: ふるさと納税 6 自治体超
  target_status: 必须确定申告(ワンストップ不可)
  subject: 本人
  template: furusato-nouzei-kakutei
  must_not_match: [kakutei-shinkoku-first]

- query: "晚了一个月才确定申告 会被罚多少"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 期限後申告
  target_status: 無申告加算税 + 延滞税
  subject: 本人
  template: kakutei-shinkoku-late
  must_not_match: [residence-tax-payment-delay]

- query: "我个人事业主第一年 青色还是白色 区别在哪"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 个人事业主开业
  target_status: 青色申告承認申請
  subject: 本人
  template: aoiro-vs-shiroiro
  must_not_match: [kakutei-shinkoku-first]

- query: "中国还有房子收租 日本要申告吗 已经在中国交税了"
  expected_intent: kakutei-shinkoku-first
  domain: tax
  current_status: 海外不动产收入
  target_status: 全世界所得申告 + 外国税额控除
  subject: 本人
  template: residence-tax-overseas-income
  must_not_match: [residence-tax-overseas-income]

---

## 公司倒闭 / 离职后（Q206–Q215）

- query: "公司倒闭了 失业保险能拿多久 我才工作1年半"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 倒産による離職
  target_status: 特定受給資格者 90~330日
  subject: 雇员
  template: tousan-tokurei
  must_not_match: [health-insurance-switch]

- query: "雇用保险离职票什么时候能到 公司说要1个月"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 等待離職票
  target_status: 退職 10 日内雇主交付
  subject: 雇员
  template: rishokuhyou-timing
  must_not_match: [unemployment-koyou-hoken]

- query: "ハローワーク第一次去要带啥 失业认定怎么搞"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 初次ハローワーク手续
  target_status: 求职申込+失业认定日确定
  subject: 雇员
  template: hellowork-first-visit
  must_not_match: [unemployment-koyou-hoken]

- query: "自己辞职的人也能拿失业金吗 听说要等3个月"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 自己都合退職
  target_status: 给付制限 2~3 ヶ月後支给
  subject: 雇员
  template: jiko-tougou-taishoku
  must_not_match: [unemployment-koyou-hoken]

- query: "公司倒闭了健康保险国保切换还是任意継続好"
  expected_intent: health-insurance-switch
  domain: social-insurance
  current_status: 倒産退職健康保险切换
  target_status: 国保軽減制度优先比较
  subject: 本人
  template: tousan-kokuho-keigen
  must_not_match: [unemployment-koyou-hoken, pension-kokumin-payment]

- query: "雇用保险被保险者期间不到1年 还能领吗"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 加入未满 12 ヶ月
  target_status: 一般受给资格不可 / 倒産特例可
  subject: 雇员
  template: koyouhoken-eligibility
  must_not_match: [unemployment-koyou-hoken]

- query: "离职后年金怎么办 公司不再给我交厚生了"
  expected_intent: pension-kokumin-payment
  domain: social-insurance
  current_status: 退职后年金切换
  target_status: 14 日内国民年金加入
  subject: 本人
  template: kousei-to-kokumin
  must_not_match: [unemployment-koyou-hoken, health-insurance-switch]

- query: "失業給付期間在留资格会被取消吗 我特定技能"
  expected_intent: unemployment-koyou-hoken
  domain: visa
  current_status: 特定技能離職中
  target_status: 3 ヶ月内転職 or 帰国
  subject: 本人
  template: tokutei-ginou-rishokuyu
  must_not_match: [zairyu-renewal]

- query: "再就職手当怎么申请 我刚找到新工作"
  expected_intent: unemployment-koyou-hoken
  domain: hr
  current_status: 失业认定中找到新工作
  target_status: 残日数 1/3 以上 + 申请再就職手当
  subject: 雇员
  template: saishuushoku-teate
  must_not_match: [unemployment-koyou-hoken]

- query: "退職金有税吗 还有住民税要不要扣"
  expected_intent: unemployment-koyou-hoken
  domain: tax
  current_status: 退職金受領
  target_status: 退職所得申告書提出 + 分離课税
  subject: 雇员
  template: taishokukin-zei
  must_not_match: [residence-tax-payment-delay, kakutei-shinkoku-first]

---

## 育儿 / 出産 / 妊娠（Q216–Q225）

- query: "刚怀孕 母子手账什么时候去拿 听说要早"
  expected_intent: pregnancy-benefits
  domain: misc
  current_status: 妊娠初期未届出
  target_status: 妊娠届出 → 母子手帳交付
  subject: 本人
  template: boshi-techou-issue
  must_not_match: [childbirth-benefits]

- query: "出産育児一時金50万直接付吗 还是先垫钱再退"
  expected_intent: childbirth-benefits
  domain: social-insurance
  current_status: 准备分娩
  target_status: 直接支払制度利用
  subject: 本人
  template: shussan-ikuji-ichijikin
  must_not_match: [pregnancy-benefits]

- query: "产前产后我能拿出産手当金吗 我是公司社员"
  expected_intent: childbirth-benefits
  domain: social-insurance
  current_status: 健康保険被保険者妊娠
  target_status: 産前 42 日 + 産後 56 日手当
  subject: 雇员
  template: shussan-teate-kin
  must_not_match: [pregnancy-benefits]

- query: "育児休業给付金一个月能拿多少 工资的多少%"
  expected_intent: childbirth-benefits
  domain: hr
  current_status: 准备育児休業
  target_status: 67% (180日内) → 50% 切换
  subject: 雇员
  template: ikukyuu-kyuufu
  must_not_match: [unemployment-koyou-hoken]

- query: "孩子0岁 児童手当怎么申请 必须出生15天内吗"
  expected_intent: childbirth-benefits
  domain: misc
  current_status: 出生后未申请児童手当
  target_status: 出生 15 日内申请(月起算特例)
  subject: 家族
  template: jidou-teate
  must_not_match: [pregnancy-benefits]

- query: "高额疗養費剖腹产可以申请吗 出生时花了70万"
  expected_intent: childbirth-benefits
  domain: social-insurance
  current_status: 帝王切開高额医療
  target_status: 高额療養費+出産育児一時金双重
  subject: 本人
  template: koukaku-ryouyou-shussan
  must_not_match: [childbirth-benefits]

- query: "妊娠14周流产 出産育児一時金能拿吗"
  expected_intent: pregnancy-benefits
  domain: social-insurance
  current_status: 妊娠 12 週後流産
  target_status: 12 週超流產可申请一時金
  subject: 本人
  template: ryuuzan-ichijikin
  must_not_match: [childbirth-benefits]

- query: "在中国生的孩子能在日本拿児童手当吗 户口不在日本"
  expected_intent: childbirth-benefits
  domain: misc
  current_status: 海外出生子女
  target_status: 子女住民登録在日 → 申请可
  subject: 家族
  template: kaigai-shussan-jidou
  must_not_match: [childbirth-benefits, pregnancy-benefits]

- query: "妊婦健診补助券一共14张 用不完会作废吗"
  expected_intent: pregnancy-benefits
  domain: misc
  current_status: 持有妊婦健診票
  target_status: 出産前使用 / 出産后失效
  subject: 本人
  template: ninpu-kenshin-ken
  must_not_match: [pregnancy-benefits]

- query: "保育園4月入园申请什么时候开始 我11月生孩子赶得上吗"
  expected_intent: childbirth-benefits
  domain: misc
  current_status: 育児中考虑保育園
  target_status: 前年 10~11 月一次募集申请
  subject: 家族
  template: hoikuen-application
  must_not_match: [childbirth-benefits]

---

## 元数据

- 写手：Part 3（共 4 人）
- 范围：Q151–Q225（75 条）
- domain 分布：visa 9 / tax 23 / social-insurance 26 / hr 9 / misc 8
- intent slug 一览：
  - first-30-days-japan (10)
  - address-change-zairyu-card (5)
  - pension-kokumin-payment (11)
  - residence-tax-payment-delay (10)
  - health-insurance-switch (11)
  - kakutei-shinkoku-first (10)
  - unemployment-koyou-hoken (8)
  - pregnancy-benefits (3)
  - childbirth-benefits (7)
