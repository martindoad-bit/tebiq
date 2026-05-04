# TEBIQ Golden Cases Seed

**状态**: draft / needs human review
**版本**: v0.2
**作成**: 2026-05-04
**更新**: 2026-05-04（v0.2：新增 aliases + eval_method 字段，补强P0案例）
**作成者**: TEBIQ-DOMAIN-CC
**来源**: 试岗报告Q1-Q10 + GOLD V2 (V2-01~V2-20) + BENCHMARK GOLD V1 + answer_seed_001-025
**用途**: Eval Lab黄金题库第一批候选，共30题。需行政書士确认后方可升级为production eval case。

---

## 字段说明（v0.2格式）

```
scenario:           场景分类（用于Eval Lab分组）
question:           标准问法（用于标注基准）
aliases:            用户真实表达变体（用于intent分类测试）
expected_direction: 正确回答方向（不是答案，是审查基准）
must_have:          合格答案必须包含的要素
must_not_have:      绝对不能出现的表述
handoff_trigger:    必须触发专业确认的条件
severity_if_wrong:  P0 / P1 / P2
eval_method:        Eval Lab判断方法（pass/fail标准 + 关键词检查）
needs_human_review: yes/no
review_note:        需真人行政書士确认的具体内容
source:             来源文件
```

**选题原则**：P0优先 → 覆盖主要签证类型 → 覆盖主要陷阱类型 → 适合自动化测试

---

## P0级案例（SEED-01 ~ SEED-10）

---

### GOLD-SEED-01

```yaml
scenario: visa-change-management-to-engineer
question: 经营管理签怎么转技术人文知识国际业务签证？
aliases:
  - 经管签怎么转技人国
  - 我有经营管理签证想去打工怎么转签
  - 公司要关门了我有经管签想转工作签
  - 経営管理から技人国に変更したい
  - 经管签可以转技术签吗
expected_direction: |
  在留資格変更（経営・管理 → 技術・人文知識・国際業務）
  核心陷阱：変更前必须完成役員退任登記+商業登記
  路径：① 役員退任登記 ② 接收公司三领域业务内定 ③ 学历/実務 ④ 雇用契約 ⑤ 変更申請
must_have:
  - 変更前必须完成役員退任登記+商業登記（最高频遗漏点，遗漏即P0）
  - 接收公司业务必须符合自然科学/人文科学/国際業務三领域
  - 学历（大学卒以上）或10年以上同领域実務経験
  - 雇用契約書面要件（業務内容+月給+期間明示）
must_not_have:
  - "换公司就能申请"（漏掉役員退任登記）
  - "可以同时保留経営・管理身份"
  - 对批准结果作确定性承诺
handoff_trigger:
  - 原公司尚未解散/役員关系复杂
  - 学历边界（専門学校卒+経験年数不足10年）
  - 接收公司岗位含販売/サービス等三领域边界
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 役員退任登記 / 役員退任 / 役員変更
  - 提及 三領域 / 自然科学 / 人文科学 / 国際業務
  - 提及 在留資格変更許可申請
  Fail（P0失败）：
  - 未提及 役員退任登記 → 严重遗漏
  - 出现"换公司就行" "公司换一下就可以申请" → 方向半错
  - 对申请结果作"可以通过""一定能拿"类承诺 → 危险承诺
  Keywords: [役員退任, 商業登記, 三領域, 在留資格変更, 雇用契約]
needs_human_review: yes
review_note: 役員退任登記の「変更申請前完成」の明文法的根拠を行政書士に確認
source: GOLD V2-01 + keiei-kanri-basics.md
```

---

### GOLD-SEED-02

```yaml
scenario: visa-change-engineer-to-management
question: 技人国签证怎么转经营管理签证？我要开公司。
aliases:
  - 技人国怎么转经管
  - 我想自己开公司签证怎么变
  - 工作签转经营管理签怎么弄
  - 技术签证转经管签
  - 技人国から経営管理ビザに変えたい
  - 在日本自己开公司需要什么签证
expected_direction: |
  在留資格変更（技術・人文知識・国際業務 → 経営・管理）
  关键：2025/10/16新规5项条件同时满足；経過措置至2028/10/16
must_have:
  - 2025/10/16改正后新规5项条件（必须同时满足，缺一不可）：
    1. 資本金3,000万円以上
    2. 常勤職員1名（限日本人/特別永住者/别表第二在留者）
    3. 申请人博士/修士/専門職学位或3年以上経営管理経験
    4. 申请人或常勤職員具备日語B2能力（JLPT N2/BJT400分以上）
    5. 事業計画書经専門知識者（中小企業診断士等）确认
  - 経過措置截止：2028/10/16
must_not_have:
  - "资本金500万円就够了"（旧规，不适用于新申请）
  - "雇用2名就行"（旧规）
  - 外国籍技人国员工可计入常勤職員（错误）
  - 省略経過措置
handoff_trigger:
  - 跨境资金来源（中国ODI备案）
  - 学历来自非日本机构（需认证）
  - 直近1期决算赤字
  - 共享办公室/自宅兼用
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 3000万円 / 新規要件 / 2025/10/16
  - 提及 経過措置 / 2028/10/16
  - 提及 常勤職員の範囲限定
  Fail（P0失败）：
  - 出现 "500万円" 作为新申请的资本金要求 → 旧规混淆
  - 出现 "外国人従業員も常勤職員になれる" → 明显错误
  - 省略全部5项条件，只说"开公司就能申" → 严重遗漏
  Keywords: [3000万円, 経過措置, 2028/10/16, 常勤職員, 新規要件]
needs_human_review: yes
review_note: 新規5項条件のうち日本語能力要件の具体的な認定方法を行政書士に確認
source: GOLD V2-02 + keiei-kanri-basics.md
```

---

### GOLD-SEED-03

```yaml
scenario: visa-change-family-stay-to-work
question: 家族滞在想转工作签怎么办？
aliases:
  - 家族签想转工作签
  - 家族滞在から就労ビザに変えたい
  - 我是配偶签证想自己工作
  - 家属签证能转工作签吗
  - 扶養者签证怎么转可以工作的签证
  - 家族滞在で独立して働きたい
expected_direction: |
  在留資格変更（家族滞在 → 技人国/特定技能/経営管理等）
  关键区分：资格外活動许可（继续在家族滞在下打工）≠ 在留資格変更（获得独立签证）
must_have:
  - 明确区分两个路径：资格外活動许可（28小时，仍是家族滞在）vs 在留資格変更（独立工作签）
  - 目标签证的具体要件（技人国：三领域+学历；特定技能：業種+試験）
  - 配偶扶養者签证是否仍有效（家族滞在依附性说明）
must_not_have:
  - "去区役所办资格外活動许可就行了"（方向反，这不是独立工作签）
  - "家族滞在可以自动转工作签"
  - 省略对依附性的说明
handoff_trigger:
  - 配偶扶養者签证临近变更/不稳定
  - 学历不达技人国要求且无特定技能業種选项
  - 目标岗位内容边界模糊
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 在留資格変更 / 変更許可申請
  - 明确区分 資格外活動許可（28時間）和独立签证
  - 提及目标签证的要件（三領域/学歴 or 特定技能）
  Fail（P0失败）：
  - 仅说"去办资格外活動" / "28小时以内工作就行" → 方向反
  - 未说明两条路径的区别 → 用户会误以为28小时许可=转签
  Keywords: [在留資格変更, 資格外活動許可, 28時間, 三領域, 家族滞在]
needs_human_review: yes
review_note: 扶養者签证変更时家族滞在的过渡期间处理（时序安排）需行政書士确认
source: 试岗Q3 + family-stay-visa.md
```

---

### GOLD-SEED-04

```yaml
scenario: supplementary-document-deadline-emergency
question: 入管让我补材料，但期限快到了来不及怎么办？
aliases:
  - 入管から資料提出通知が来たが期限に間に合わない
  - 补材料通知书期限来不及
  - 资料提出通知 期限 过了怎么办
  - 入管に書類を出す期限がもうすぐ切れる
  - 补材料截止日到了还差一张证明
  - 提出期限を延ばせますか
expected_direction: |
  紧急操作：当日电话联系入管担当部门申请延期（不保证批准）
  同时先递可凑齐的部分（启动受理），缺项后补
must_have:
  - 補材料通知期限通常14日（硬截止，不可自动延期）
  - 延期唯一途径：主动电话联系入管担当部门（不保证批准）
  - 可先递部分材料（启动受理状态）+后补缺项（补正方式）
  - 超期不递=通常直接不许可，且留有记录影响下次
must_not_have:
  - "超期了没关系，下次再补"
  - "重新申请就行了"（留记录）
  - "入管一般会等的"
handoff_trigger:
  - 期限今天/明天截止
  - 缺的材料需要外部机关配合且来不及
  - 上次续签拿1年（说明审查方已有疑虑）
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及具体期限（14日 / 通常14日以内）
  - 提及电话/连络入管申请延期
  - 提及先递部分材料（分割提出）
  - 明确说明超期后果（直接不许可）
  Fail（P0失败）：
  - 未说期限后果 / 说"等等没关系" → 误导用户拖延
  - 建议"重新申请就好" → 忽略记录残留问题
  Keywords: [14日, 期限, 電話で連絡, 資料提出, 不許可リスク]
needs_human_review: yes
review_note: 延期申請の実務的な成功率・手続き方法を行政書士に確認
source: 试岗Q4 + immigration-letter-judgment.md
```

---

### GOLD-SEED-05

```yaml
scenario: application-rejected-response
question: 收到不许可通知书了怎么办？
aliases:
  - 不許可通知書が届いた
  - 签证申请被拒了怎么办
  - 永住不许可了下一步
  - 在留申請が不許可になった
  - 不许可后还能怎么办
  - 入管で拒否された 出国すればいいか
expected_direction: |
  不许可后3个月内可提审查请求（行政不服申立）
  出国前必须经行政書士评估——出国可能触发5年上陆拒否+丧失审查权
must_have:
  - 不许可后3个月内可提审查請求（行政不服申立法）
  - 出国决策必须谨慎：部分情况出国=5年上陆拒否+丧失审査権
  - 不许可通知上的理由要旨是再申请的关键依据（要保存）
  - 立即联系行政書士/入管専門弁護士（不是建议，是必须）
must_not_have:
  - "出国重新申请更容易"（可能触发5年上陆拒否）
  - "完了没希望了"（放弃合法救济）
  - 不提专业handoff
  - "3个月以后再考虑"（可能超过审查请求期限）
handoff_trigger: 任何不许可通知（无例外）
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 3个月 / 3ヶ月 / 審査請求
  - 提及出国风险（5年拒否 / 上陸拒否）
  - 明确建议行政書士/弁護士介入
  Fail（P0失败）：
  - 出现"出国重申" / "出境后重新申请更简单" → 危险建议
  - 未提审查请求期限（3个月）→ 用户可能超期
  - 未提handoff → 用户自己处理高风险情况
  Keywords: [審査請求, 3ヶ月, 行政不服申立, 上陸拒否, 行政書士]
needs_human_review: yes
review_note: 不許可後の出国が上陸拒否につながる具体的な要件範囲を入管専門弁護士に確認
source: 试岗Q5 + immigration-letter-judgment.md
```

---

### GOLD-SEED-06

```yaml
scenario: pension-gap-before-permanent-residency
question: 永住申请前发现之前有年金没交，还有救吗？
aliases:
  - 永住前に年金を払っていない期間がある
  - 国民年金未納 永住申請 どうすれば
  - 永住申请年金没缴完
  - 年金未払い 永住 間に合うか
  - 永住を申請したいが年金が抜けている
  - 以前の年金を今から払えるか
expected_direction: |
  先确认缺口长度：2年内可補缴；超2年无法追溯
  補缴后需等6-12个月稳定记录再递永住
must_have:
  - 国民年金補缴追溯上限：最长2年（超过部分制度上无法补回）
  - 補缴后需等6-12个月稳定记录再递永住申请
  - 超2年缺口需走経緯書路径（说明非本人责任+期待了解）
  - 年金记录确认路径：ねんきんネット / 年金事務所
must_not_have:
  - "补缴了就可以立刻递永住"
  - "想补多少年都行"（2年上限）
  - 对永住批准作任何承诺
handoff_trigger:
  - 未缴期间超过2年
  - 雇主未给上厚生年金（需社労士介入）
  - 需要写経緯書
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 2年 / 追納上限 / 遡及2年以内
  - 提及 6-12ヶ月 稳定期 / 安定した納付記録
  - 提及 ねんきんネット / 年金事務所 确认路径
  Fail（P0失败）：
  - 未提2年追溯上限 → 用户误以为可以无限补缴
  - 出现"补缴了就没问题" / "补完就能申" → 省略等待期
  Keywords: [2年, 追納, 遡及, ねんきんネット, 安定した納付, 経緯書]
needs_human_review: yes
review_note: 免除期間の追納（最大10年）と通常追納（2年）の区別を社労士に確認
source: 试岗Q6 + pension-non-payment-consequences.md
```

---

### GOLD-SEED-07

```yaml
scenario: divorce-spouse-visa-to-teijuusha
question: 持日本人配偶签证离婚了，能转定住者吗？
aliases:
  - 日本人の配偶者ビザで離婚した後どうなる
  - 配偶签证离婚后能不能转定住
  - 离婚后签证怎么办
  - 結婚2年で離婚した 定住者になれるか
  - 日本人配偶签离婚转签证
  - 离婚したら在留資格はどうなる
expected_direction: |
  先判断婚姻年数：
  - 满3年：评估独立生計+公的義務完整 → 可申定住者
  - 未满3年：通常不许可（例外：抚养日本人子女/DV/死別）
  无论哪种：离婚后6个月内必须変更在留資格（硬期限）
must_have:
  - 离婚后6个月内必须変更在留資格（取消事由，硬期限）
  - 定住者転換通常条件：婚姻满3年+独立生計+公的義務完整
  - 例外路径：① 抚养日本人子女 ② DV ③ 死別
  - 不满足时需考虑其他路径（工作签/留学/回国）
must_not_have:
  - "离婚了可以转定住者"（未判断婚姻年数，方向危险）
  - 省略6个月変更义务期限
  - "DV就一定能拿"（极难）
handoff_trigger:
  - 婚姻未满3年（几乎必须行政書士）
  - DV情况（弁護士+DVセンター+行政書士）
  - 有日本人子女抚养（行政書士确认立证）
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及婚姻年数判断（3年 / 3年以上）
  - 提及 6ヶ月 / 6個月内変更義務
  - 提及例外路径（子どもの養育 / DV / 死別）中至少一项
  Fail（P0失败）：
  - 未判断婚姻年数直接说"可以转定住" → 方向反（对婚姻<3年者）
  - 省略6个月期限 → 用户可能错过取消事由触发点
  - 建议"DV就能申" → 误导极难情形
  Keywords: [3年, 6ヶ月, 定住者, 婚姻期間, 日本人の子, 在留資格変更]
needs_human_review: yes
review_note: 婚姻3年以上の条件の具体的な法令根拠と日本人子の養育実務成功率を行政書士に確認
source: 试岗Q7 + GOLD V2-18 + archive-marriage-divorce.md
```

---

### GOLD-SEED-08

```yaml
scenario: management-visa-shared-office
question: 经管签证的公司想搬到共享办公室，可以吗？
aliases:
  - WeWorkに移転して経管ビザを更新できますか
  - 共享办公室对经管续签有影响吗
  - シェアオフィスで経営管理ビザは通りますか
  - 经营管理签证换到coworking space
  - 共有オフィスで経管ビザ問題ないか
  - 经管签证可以用虚拟办公室吗
expected_direction: |
  高风险。入管原则上不将工位制/热座位共享办公认定为経営実態
  需满足最低条件（独立封闭房间+法人名义合同+専用看板）且即使满足也有审查风险
must_have:
  - 入管对共享办公室的原则立场：工位制/フリーアドレス通常不认定経営実態
  - 最低要件（即使如此也有风险）：独立封闭房间+法人名義賃貸契約+専用看板
  - 续签时会被重点审查（現地調査リスク）
  - 强烈建议先咨询行政書士确认具体合同条件
must_not_have:
  - "有合同就没问题"
  - "一般共享空间都可以"
  - 把共享办公当普通搬迁处理
handoff_trigger:
  - 任何涉及共享办公室的経営・管理签续签（无例外）
  - 在留期限剩余<6个月+正在考虑搬迁
severity_if_wrong: P0
eval_method: |
  Pass（通过）：
  - 提及 経営実態 / 実態認定 / 入管の審査
  - 提及共享办公室的风险（通常不認定 / 不許可リスク）
  - 提及最低条件（専用個室 / 法人名義 / 表札）
  - 建议咨询行政書士
  Fail（P0失败）：
  - 出现"有合同没问题" / "シェアでも大丈夫" → 方向严重错误
  - 未提経営実態认定风险 → 把高风险当普通问题处理
  Keywords: [経営実態, シェアオフィス, 専用個室, 法人名義, 現地調査]
needs_human_review: yes
review_note: 共有オフィスの経営実態認定の現行実務口径（地域差・審査官差）を行政書士に確認
source: 试岗Q8 + keiei-kanri-basics.md
```

---

### GOLD-SEED-09

```yaml
scenario: address-mismatch-urgent
question: 在留卡上的地址和实际住址不一致，怎么办？
aliases:
  - 在留卡地址没有更新
  - 引越し後に在留カードの住所を変えていない
  - 搬家了在留卡还是旧地址
  - 在留卡住所が実際と違う
  - 住所変更をしていない 在留カード
  - 在留卡地址过期了怎么处理
expected_direction: |
  立即去新住所区役所更新（14日内义务）
  超期已有违反记录，越快补办越好
must_have:
  - 法律义务：搬家后14日内（入管法19条の9）
  - 超期后果：罰金200,000円以下+续签评价不利
  - 补办路径：带在留卡+本人確認资料去新住所区役所
  - マイナンバーカード需在90日内同步更新（否则失效）
must_not_have:
  - "续签时一起改就行"
  - "地址这种小事没关系"
  - 省略14日期限
handoff_trigger:
  - 超过90日未更新+即将续签
  - 搬家同时伴随离婚/婚姻状态变更
severity_if_wrong: P1
eval_method: |
  Pass（通过）：
  - 提及 14日 / 14日以内
  - 提及 罰金 / 罰則 / 20万円
  - 提及 区役所 / 市役所で届出
  Fail（P1失败）：
  - 未提14日期限 → 用户不知道紧迫程度
  - 说"以后再改也行" → 降低紧迫感导致违反记录积累
  Keywords: [14日, 住居地届出, 区役所, マイナンバーカード, 罰金]
needs_human_review: no
source: 试岗Q9 + GOLD V2-15 + BENCHMARK GOLD-08
```

---

### GOLD-SEED-10

```yaml
scenario: unreadable-official-notice-triage
question: 收到区役所/税务署的日文通知，看不懂，要紧吗？
aliases:
  - 日本語の公文書が届いたが読めない
  - 区役所から手紙が来た 何か
  - 看不懂的日本信件怎么判断
  - 税務署から封筒が届いた どうする
  - 日文信件不知道是不是重要的
  - 政府から通知が来た 中国語で説明してほしい
expected_direction: |
  三步判断：① 寄件机关识别 ② 关键词识别 ③ 封口标识
  入管/裁判所/差押相关=当天处理；税务/区役所一般通知=当天拆开后再判断
must_have:
  - 寄件机关优先级识别（入管>裁判所>税务>区役所）
  - 关键危险词：不許可/出頭/督促状/差押 = 当天处理
  - 含「親展」「速達」「書留」= 时限敏感
  - Google Lens辅助翻译（关键期限和法律术语须人工再确认）
must_not_have:
  - "先翻译完再说"（可能已超期）
  - "所有通知都要找专家"（大多数可自判断）
handoff_trigger:
  - 入管不利通知（不許可/出頭/取消/違反字样）
  - 裁判所文书（任何）
  - 差押/催告書
severity_if_wrong: P2
eval_method: |
  Pass（通过）：
  - 提及机关分类或优先级
  - 提及关键词识别（督促状/不許可/出頭）
  - 有「当天拆开」的行动建议
  Fail（P2失败）：
  - 把所有通知都说成"找专家" → 过度handoff，降低产品可用性
  - 完全没有分类判断 → 用户不知道如何处理
  Keywords: [出入国在留管理庁, 督促状, 差押, 親展, 裁判所, 期限]
needs_human_review: no
source: 试岗Q10 + unknown-mail-judgment.md + immigration-letter-judgment.md
```

---

## P1级案例（SEED-11 ~ SEED-22）

*v0.2注：以下案例字段完整，aliases和eval_method将在v0.3中补充。*

---

### GOLD-SEED-11

```yaml
scenario: dormant-company-pension-switch
question: 公司休眠了，我个人还要交国民年金吗？
aliases:
  - 公司停业了年金怎么办
  - 会社が休眠になった 個人の年金は
  - 公司不运营了还要交年金吗
must_have:
  - 公司休眠不等于个人年金/健保义务消失
  - 取得「健康保険資格喪失証明書」（公司应在5日内发出）
  - 资格丧失日起14日内：国民年金第1号+国民健康保険加入
  - 区役所国保年金課一站式办理
  - 永住审查直近2年公的義務履行影响
must_not_have:
  - "公司停了个人就不用交了"
  - 省略14日窗口
  - 把経営・管理在留资格影响混入主答
handoff_trigger:
  - 公司过去2年以上未缴厚生年金（本人加入記録缺失）→ 社労士
  - 倒産特例給付申请 → 社労士
severity_if_wrong: P1
eval_method: |
  Pass：提及14日 + 資格喪失証明書 + 区役所手続
  Fail：未提14日窗口 / 说"公司停了个人不用交"
  Keywords: [14日, 資格喪失証明書, 国民年金, 国民健康保険, 区役所]
needs_human_review: yes
review_note: 倒産特例軽減の具体的な申請条件を社労士に確認
source: GOLD V2-05 + BENCHMARK GOLD-01
```

---

### GOLD-SEED-12

```yaml
scenario: office-relocation-management-visa
question: 经管签证，公司换了新办公室，要做什么手续？
aliases:
  - 経営管理ビザで会社が引越した
  - 经管签公司搬家要去入管报告吗
  - 法人の本店を移転した場合の手続き
  - 公司本店搬迁经管签证怎么办
must_have:
  - 法務局本店移転登記（决议日起2週間内，不办→過料100万円以下）
  - 入管所属機関等届出（14日内，不办→续签评价不利）
  - 税務署+都道府県+市町村異動届（1ヶ月内）
  - 年金事務所変更届（5日内）
  - ハローワーク変更届（10日内）
  - 新办公室必须有法人名义合同+専用看板
must_not_have:
  - "改个收件地址就行了"
  - 省略法務局商業登記
  - 个人搬家和公司搬迁混答
handoff_trigger:
  - 跨法務局管辖搬迁
  - 共享办公/自宅兼用
  - 在留期限<6个月同时搬迁
severity_if_wrong: P1
eval_method: |
  Pass：提及2週間（法務局）+ 14日（入管）+ 届出机关列表
  Fail：只说"改地址就行" / 省略商業登記
  Keywords: [法務局, 2週間, 所属機関届出, 14日, 移転登記]
needs_human_review: no
source: GOLD V2-16 + BENCHMARK GOLD-02
```

---

### GOLD-SEED-13

```yaml
scenario: permanent-resident-parents-long-stay
question: 我已经永住了，能不能把父母接来日本长住？
aliases:
  - 永住者が親を呼べるか
  - 永住取得したら親を日本に住まわせたい
  - 永住者父母签证
  - 永住后能帮父母办长期签证吗
must_have:
  - 家族滞在对象不含父母（明确纠偏）
  - 3条真实路径：短期滞在90日/特定活動老親扶養（极严）/高度専門職親族帯同
  - 短期滞在超90日=不法滞在+5年上陆拒否
must_not_have:
  - "可以"或"不可以"的二元答案（需给3条路径）
  - "家族滞在包括父母"
  - 以"没有这种签证"结束
handoff_trigger:
  - 父母70岁以上+有医疗看护需要
  - 本人为高度専門職
severity_if_wrong: P0
eval_method: |
  Pass：提及家族滞在不含父母 + 至少1条真实路径
  Fail：说"可以通过家族滞在呼来" / 只说"不行"
  Keywords: [家族滞在, 短期滞在, 老親扶養, 高度専門職, 父母]
needs_human_review: yes
review_note: 老親扶養特定活動の実際の下签率と認定条件を行政書士に確認
source: GOLD V2-12 + BENCHMARK GOLD-03
```

---

### GOLD-SEED-14

```yaml
scenario: employer-illegal-employment-employee-impact
question: 我的同事是黑工，公司被入管查了，我会不会被牵连？
aliases:
  - 同僚が不法就労 私は大丈夫か
  - 公司有非法员工对我的签证有影响吗
  - 雇主雇了签证不合规的人我有问题吗
  - 不法就労助長罪 一般従業員 巻き込まれるか
must_have:
  - 雇主刑责（不法就労助長罪）vs 雇员处分（資格外活動）是两条独立法律线
  - 本人持合法在留+业务符合资格→一般不受牵连
  - 自查在留カード「就労制限」栏 vs 实际工作内容
  - 区分风险层次：一般员工/役員/採用担当
must_not_have:
  - "公司的事和你无关"（需要配合调查+自查）
  - "一定会被牵连"（错误）
  - 不区分役員/採用担当的高风险层次
handoff_trigger:
  - 收到入管/警察/労基署出頭通知
  - 本人为役員/採用担当
severity_if_wrong: P0
eval_method: |
  Pass：区分两条法律线 + 提及自查建议
  Fail：说"完全无关不用担心" / 未区分役員风险
  Keywords: [不法就労助長罪, 資格外活動, 就労制限, 役員, 出頭通知]
needs_human_review: yes
review_note: 共同正犯認定の具体的な条件を刑事弁護士に確認
source: GOLD V2-11 + BENCHMARK GOLD-04
```

---

### GOLD-SEED-15

```yaml
scenario: tokutei-gino-to-engineer-change
question: 我特定技能1号还有两年，想转技人国，能行吗？
aliases:
  - 特定技能1号から技人国に変更できますか
  - 特定技能转工作签怎么弄
  - 特定技能1号 技人国 移行
  - 特定技能5年期限前に技人国に転換したい
must_have:
  - 特定技能1号通算5年は法令明文上限（不可逾越）
  - 転換要件：接收公司业务三领域+大学卒以上或10年実務
  - 5年到期前6个月开始準備変更申請
  - 5年到期不申请→在留期限失效→不法滞在リスク
must_not_have:
  - "特定技能可以自动转技人国"
  - 省略通算5年上限
  - "5年到了重新申就行"（到期不申会不法滞在）
handoff_trigger:
  - 学历不达标+実務年数边界
  - 5年剩余<6个月还没找到接收公司
  - 曾被不许可一次
severity_if_wrong: P1
eval_method: |
  Pass：提及通算5年上限 + 転換要件（学歴/三領域）
  Fail：未提5年期限 / 说"可以自动转"
  Keywords: [通算5年, 技人国, 三領域, 在留資格変更, 大学卒]
needs_human_review: yes
review_note: 特定技能期間の技人国実務経験への算入方法を行政書士に確認
source: GOLD V2-03 + BENCHMARK GOLD-05
```

---

### GOLD-SEED-16

```yaml
scenario: residence-tax-late-permanent-residency
question: 住民税晚交了两个月，永住会被拒吗？
aliases:
  - 住民税を遅れて払った 永住に影響あるか
  - 住民税滞纳永住影响
  - 住民税迟交2个月能申请永住吗
  - 住民税 督促状 永住申請
must_have:
  - 永住ガイドライン：直近5年公的義務履行，迟交是单项不许可理由
  - 补缴后「迟交记录」仍留在課税証明書/完納証明書上
  - 补缴→取完納証明書→等6-12个月稳定→再递
  - 申请时附経緯書说明迟交原因
must_not_have:
  - "迟交两个月问题不大"
  - "补缴了就没有记录了"（记录仍留存）
  - 补缴后立刻可以递
handoff_trigger:
  - 6个月以上連続未納
  - 已有差押/財産差押记录
severity_if_wrong: P1
eval_method: |
  Pass：提及记录留存 + 6-12个月等待期 + 経緯書
  Fail：说"迟交没影响" / 说"补缴后记录消失"
  Keywords: [滞納記録, 完納証明書, 6-12ヶ月, 経緯書, 永住ガイドライン]
needs_human_review: no
source: GOLD V2-14 + BENCHMARK GOLD-06
```

---

### GOLD-SEED-17

```yaml
scenario: company-no-social-insurance-permanent-residency
question: 公司三年没给我上社保，我永住怎么办？
aliases:
  - 会社が社会保険に入れてくれなかった 永住は
  - 雇主没上厚生年金永住影响
  - 公司未加入社保对我的永住有什么影响
  - 社保未加入 永住申請
must_have:
  - 公司违法≠个人永住要件，两件事分开处理
  - 双轨并行：① 自己立刻加入国民年金第1号+国民健康保険 ② 社労士介入协商补加入厚生年金（追溯最长2年）
  - 永住/帰化申请前准备経緯書（非本人责任说明）
  - ねんきんネット确认自己加入記録
must_not_have:
  - "公司没上所以你永住没希望"（错误）
  - "公司违法所以你没问题"（永住还是看个人履行）
  - 省略自己立即加入国保+国民年金的步骤
handoff_trigger:
  - 公司刻意瞒报或不配合 → 弁護士
  - 永住/帰化前 → 行政書士评估経緯書
severity_if_wrong: P1
eval_method: |
  Pass：提及双轨处理 + ねんきんネット + 経緯書
  Fail：说"没上社保永住没希望" / 只说"找公司理论"
  Keywords: [国民年金, 国民健康保険, ねんきんネット, 経緯書, 双轨]
needs_human_review: yes
review_note: 厚生年金補加入（追溯2年）の実務手続きを社労士に確認
source: GOLD V2-13 + BENCHMARK GOLD-07
```

---

### GOLD-SEED-18

```yaml
scenario: permanent-residency-tax-documentation
question: 永住申请要看几年的纳税记录？
aliases:
  - 永住申請に何年分の税金が必要
  - 永住审查税单要几年
  - 永住直近5年の課税証明
  - 永住申請の納税証明書は何年分
must_have:
  - 直近5年課税+納税+年金+健保全期完整（一般路径）
  - 换过市町村→逐个原居住地市役所取证明（缺一不可）
  - 任何1年滞纳/迟交=单项不许可理由
  - 高度人材路径：80点→1年，70点→3年（需确认最新口径）
must_not_have:
  - "5年任选"（必须是直近连续5年）
  - "只要近期没问题就行"
  - 把高度人材和一般路径混答
handoff_trigger:
  - 直近5年内有滞纳
  - 跨多个市町村
severity_if_wrong: P1
eval_method: |
  Pass：明确说5年 + 连续 + 各市町村要分别取
  Fail：说"3年够了" / 没提市町村跨地的情况
  Keywords: [直近5年, 課税証明書, 納税証明書, 各市町村, 完納]
needs_human_review: yes
review_note: 2026/2/24永住法改正後の審査期間変更の有無を行政書士に確認
source: GOLD V2-10 + answer_seed Q001
```

---

### GOLD-SEED-19

```yaml
scenario: notification-overdue-14days
question: 换工作半年了一直没去入管报告，现在补还来得及吗？
aliases:
  - 転職届けを14日以内に出し忘れた
  - 换工作忘记向入管报告
  - 転職してから半年 届出まだ出していない
  - 契約機関の届出を忘れた
must_have:
  - 超期不会立即取消，但会留「届出義務違反」记录
  - 立即补提「契約機関に関する届出書」（消滅+締結各别）+説明書
  - 超期6个月以上+新岗位偏离三领域=高风险
  - 就労資格証明書事前確認（1,200円）建议办
must_not_have:
  - "超期了没事，正常续签就行"
  - "重新报就当没超期了"（记录仍在）
handoff_trigger:
  - 超期6个月以上
  - 新岗位明显偏离三领域
  - 已收到入管通知
severity_if_wrong: P0
eval_method: |
  Pass：提及立即補届 + 記録が残る + 就労資格証明書
  Fail：说"过了没关系" / 说"重新申请就好"
  Keywords: [届出義務違反, 契約機関届出, 就労資格証明書, 補届]
needs_human_review: yes
review_note: 6ヶ月超過後の入管の実際の処理対応を行政書士に確認
source: GOLD V2-17
```

---

### GOLD-SEED-20

```yaml
scenario: company-bankruptcy-visa-impact
question: 公司倒闭了，我的工作签会立即取消吗？
aliases:
  - 会社が倒産した 在留資格はどうなる
  - 公司破产签证还有效吗
  - 雇主倒闭我的工作签取消了吗
  - 会社が潰れた ビザ 大丈夫か
must_have:
  - 公司倒闭≠签证立即取消（明确纠偏）
  - 14日内交「契約機関終了届」（不交→罰金20万円以下）
  - 3个月内开始转职活动/申特定活動6ヶ月求职延长
  - 在留剩余<3个月→立即申特定活動
must_not_have:
  - "签证立刻取消了"（错误）
  - 省略3个月取消程序启动节点
  - "先找到工作再报"（超期有罚金）
handoff_trigger:
  - 在留剩余<3个月
  - 公司有未払賃金/離職票拿不到
  - 3个月内没有找到工作且未申特定活動
severity_if_wrong: P0
eval_method: |
  Pass：提及不立即取消 + 14日终了届 + 3个月节点
  Fail：说"签证取消了" / 未提两个死线
  Keywords: [終了届, 14日, 3ヶ月, 特定活動, 在留資格取消]
needs_human_review: yes
review_note: 特定活動6ヶ月求职延长の申請条件と下签率を行政書士に確認
source: GOLD V2-20
```

---

### GOLD-SEED-21

```yaml
scenario: dormant-company-management-visa-impact
question: 经管签证，公司决议休眠，我的签证会怎样？
aliases:
  - 経営管理ビザで会社を休眠にした場合
  - 经管签证公司休眠影响
  - 会社休眠中に経管ビザはどうなる
must_have:
  - 公司休眠≠签证立即取消（但続签时経営実態无法立证）
  - 在留期限<6个月+休眠→立即决策
  - 三条路径：①重启経営 ②転換在留資格 ③放棄+帰国
  - 路径B（転換）容易被遗漏→必须明确列出
must_not_have:
  - "休眠了签证没问题"（错误）
  - 只说"联系行政書士"而不给任何路径方向
handoff_trigger:
  - 在留期限<6个月+公司休眠（必须行政書士）
severity_if_wrong: P0
eval_method: |
  Pass：提及不立即取消 + 三条路径 + 在留期限节点
  Fail：说"休眠没影响" / 只给一条路径
  Keywords: [経営実態, 休眠, 在留資格変更, 重启経営, 帰国]
needs_human_review: yes
review_note: 休眠後の続更审查口径を行政書士に確認
source: GOLD V2-06
```

---

### GOLD-SEED-22

```yaml
scenario: management-capital-insufficient
question: 经管签证资本金不够怎么办，现在只有300万。
aliases:
  - 経営管理ビザの資本金が不足している
  - 资本金300万经管签能申请吗
  - 経管ビザ 資本金 3000万に満たない
  - 增资怎么办经管签
must_have:
  - 新规3000万円（2025/10/16后），旧规500万（経過措置至2028/10/16）
  - 阶段不同路径不同（先判断阶段）
  - 借款不算资本金（高频误解）
  - 跨境汇款需中国ODI备案（高频陷阱）
must_not_have:
  - "借款可以当资本金"（错误）
  - 省略ODI备案风险
  - 对批准作任何承诺
handoff_trigger:
  - 跨境资金来源
  - 已收到補正/不許可通知
  - 連続赤字+净资产为负
severity_if_wrong: P0
eval_method: |
  Pass：提及3000万円新规 + 経過措置 + 借款不算資本金
  Fail：说"借款当资本金就行" / 给出旧规500万
  Keywords: [3000万円, 経過措置, 借款, ODI備案, 資本金]
needs_human_review: yes
review_note: ODI備案の具体的要件と資金来源説明の立証方法を行政書士+税理士に確認
source: GOLD V2-07 + BENCHMARK GOLD-09
```

---

## P2级及补充案例（SEED-23 ~ SEED-30）

*v0.2注：以下案例保持v0.1格式，aliases和eval_method将在v0.3中补充。*

---

### GOLD-SEED-23

```yaml
scenario: unemployed-visa-status
question: 失业了，工作签有什么影响，有没有时间限制？
must_have:
  - 14日内交「契約機関終了届」
  - 3个月节点（入管可依据规定启动取消程序）
  - 在留剩余<3个月→立即申特定活動（求職活動）延长
  - 失业中打黑工=資格外活動→退去強制
must_not_have:
  - "失业期间签证没问题随便等"
  - 省略3个月取消节点
handoff_trigger:
  - 失业超过1个月仍无就职活动
  - 在留剩余<3个月
severity_if_wrong: P0
needs_human_review: yes
review_note: 3ヶ月後の取消手続き実際の発動条件を行政書士に確認
source: unemployed-90-day-rule.md
```

---

### GOLD-SEED-24

```yaml
scenario: reentry-permit-departure
question: 长期出国，需要办再入国许可吗？
must_have:
  - みなし再入国：有効期1年（从出国日起算）
  - 超1年→需正式再入国許可（最长5年）
  - 不许可后的出国必须行政書士评估
  - 出国前确认在留期限 vs 预计返回日
must_not_have:
  - "想什么时候回来都行"
  - 省略1年时效
  - 不提不许可后出国的特别风险
handoff_trigger:
  - 出国超1年
  - 在留期限即将到期
  - 在审查中（不许可后）
severity_if_wrong: P0
needs_human_review: yes
review_note: みなし再入国の具体的条件と不許可後の出国リスクを入管専門弁護士に確認
source: saiyukoku-kyoka.md
```

---

### GOLD-SEED-25

```yaml
scenario: job-change-14day-notification
question: 换工作了，需要向入管报告吗？怎么报？
must_have:
  - 「契約機関に関する届出」：消滅届+締結届 各14日内
  - 新岗位如偏离三领域→申就労資格証明書事前确认（1,200円）
  - 超期后果：「届出義務違反」记录+续签评价不利
must_not_have:
  - "换工作不用报告"
  - "续签时一起报就行"（会超期）
handoff_trigger:
  - 新岗位业务内容与原三领域差距大
severity_if_wrong: P1
needs_human_review: no
source: job-change-visa-impact.md
```

---

### GOLD-SEED-26

```yaml
scenario: high-skilled-permanent-residency-acceleration
question: 高度人材1年就能申永住吗？我现在多少分？
must_have:
  - 80点路径：在日满1年+直近1年内持续80点
  - 70点路径：在日满3年+直近3年内持续70点
  - 积分必须持续保持（转职/年収下降会影响）
  - 直近公的義務完整
must_not_have:
  - "拿到高度専門職就自动1年永住"
  - 省略积分持续保持要求
handoff_trigger:
  - 转职可能影响积分
  - 年収下降可能降至70点以下
severity_if_wrong: P1
needs_human_review: yes
review_note: ポイント計算表の最新版と各加点项認定を行政書士に確認
source: GOLD V2-19 + koudo-jinzai-points.md
```

---

### GOLD-SEED-27

```yaml
scenario: new-arrival-first-14-days
question: 刚到日本，第一件事是什么？
must_have:
  - 住民登録+在留カード住居地届出：到达后14日内（区役所）
  - 国保/国民年金：如未被厚生年金覆盖，同时办
  - 区役所窗口可一站式办（住民登録+国保+年金）
must_not_have:
  - "等工作开始后再去区役所"（已超期）
  - 省略14日期限
handoff_trigger: 通常不需要
severity_if_wrong: P1
needs_human_review: no
source: first-14-days-checklist.md + juuminito-roku.md
```

---

### GOLD-SEED-28

```yaml
scenario: residence-tax-brown-envelope
question: 收到一封棕色信封，写着住民税，是什么？
must_have:
  - 识别区分：課税通知（正常）vs 督促状（催缴，紧急）
  - 督促状：尽快缴纳，不缴→触发差押程序
  - 差押→影响永住审查（公的義務履行不完整）
must_not_have:
  - "住民税信封可以先放着"
  - 不区分通知类型
handoff_trigger:
  - 已收到差押予告
  - 在永住/帰化准备阶段
severity_if_wrong: P1
needs_human_review: no
source: brown-envelope-juuminzei.md
```

---

### GOLD-SEED-29

```yaml
scenario: student-visa-to-engineer
question: 我是留学生，明年毕业，怎么转工作签？
must_have:
  - 必须有内定（雇用契約）+业务内容符合三领域
  - 大学卒以上（専門学校卒有限制条件）
  - 在留期限到期前6个月开始递申
  - 4月入职→3月初递申最稳
  - 在留期限失效后申请→不法滞在
must_not_have:
  - "毕业了自动转工作签"
  - 省略时序要求
handoff_trigger:
  - 専門学校卒（需评估専攻関連性）
  - 内定公司规模小/决算赤字
severity_if_wrong: P1
needs_human_review: no
source: GOLD V2-04 + BENCHMARK GOLD-10
```

---

### GOLD-SEED-30

```yaml
scenario: spouse-visa-real-relationship-audit
question: 日本人配偶签证续签，需要准备什么证明实质婚姻？
must_have:
  - 入管审查重点：実態ある婚姻（非形式婚姻）
  - 证明材料：同居証明+送金记録+SNS/照片+配偶家族关系证明
  - 分居时需附理由书（工作原因分居）
must_not_have:
  - "有结婚证就够了"
  - 省略実質婚姻审查重点
handoff_trigger:
  - 近期分居
  - 无子女+婚姻年数短
  - 曾被拒或拿1年
severity_if_wrong: P1
needs_human_review: yes
review_note: 実質婚姻の具体的な審査基準と分居時の立証方法を行政書士に確認
source: spouse-visa-real-relationship-evidence.md
```

---

## 升级路线图

| 版本 | 状态 | 主要变更 |
|------|------|---------|
| v0.1 | 完成 | 基础30题，含must_have/must_not/handoff/severity |
| v0.2 | 当前 | P0案例全量补充aliases+eval_method；P1/P2案例部分补充 |
| v0.3 | 计划 | P1/P2案例补充aliases+eval_method；行政書士审查结果回填 |
| v1.0 | 待定 | 行政書士全量确认后升级为production eval cases |

---

*本文件为 draft / needs human review，不得作为production-ready eval标准使用。*
