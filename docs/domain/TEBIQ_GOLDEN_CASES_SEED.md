# TEBIQ Golden Cases Seed

**状态**: draft / needs human review
**版本**: v0.1
**作成**: 2026-05-04
**作成者**: TEBIQ-DOMAIN-CC
**来源**: 试岗报告Q1-Q10 + GOLD V2 (V2-01~V2-20) + BENCHMARK GOLD V1 + answer_seed_001-025
**用途**: Eval Lab黄金题库第一批候选，共30题。每题需行政書士确认后方可升级为production eval case。

**选题原则**：
- 优先选P0级（方向反/期限/危险承诺类）
- 覆盖主要签证类型（技人国/経管/家族/定住/永住/特定技能）
- 覆盖主要陷阱类型（方向反/条件遗漏/期限/handoff遗漏）
- 适合测试AI的判断能力（有明确的对/错分界线）

---

## GOLD-SEED-01

```yaml
scenario: visa-change-management-to-engineer
question: 经营管理签怎么转技术人文知识国际业务签证？
expected_direction: |
  在留資格変更（経営・管理 → 技術・人文知識・国際業務）
  核心路径：① 役員退任登記完成 ② 接收公司业务符合三领域
  ③ 学历或10年実務 ④ 雇用契約 ⑤ 変更申請
must_have:
  - 変更前必须完成役員退任登記 + 商業登記（最高频遗漏点）
  - 接收公司业务必须符合自然科学/人文科学/国際業務三领域
  - 学历（大学卒以上）或10年以上同领域実務経験
  - 雇用契約書面要件（業務内容+月給+期間明示）
must_not_have:
  - "换公司就能申请"（漏掉役員退任登記）
  - "可以同时保留経営・管理身份"
  - 对批准作确定性承诺
handoff_trigger:
  - 原公司尚未解散/役員关系复杂
  - 学历边界（専門学校卒+経験年数模糊）
  - 接收公司岗位内容边界（含販売成分）
severity_if_wrong: P0
needs_human_review: yes
review_note: 役員退任登記的时序要求需行政書士确认具体实务操作
source: GOLD V2-01 ★
```

---

## GOLD-SEED-02

```yaml
scenario: visa-change-engineer-to-management
question: 技人国签证怎么转经营管理签证？我要开公司。
expected_direction: |
  在留資格変更（技術・人文知識・国際業務 → 経営・管理）
  核心要点：新规5项条件同时满足 + 経過措置判断
must_have:
  - 2025/10/16改正后新规5项条件（必须同时满足）：
    1. 资本金3000万円以上
    2. 常勤職員1名（限日本人/特別永住者/别表第二在留者）
    3. 学历（博士/修士/専門職）或3年以上経営管理経験
    4. 申请人或常勤職員具备日语B2能力
    5. 事業計画書经专家（中小企業診断士等）确认
  - 経過措置截止：2028/10/16
must_not_have:
  - "500万円就够了"（旧规，需经過措置判断才适用）
  - "雇两名员工就行"（旧规，且常勤職員范围已限定）
  - 外国籍技人国员工可计入常勤職員（错误）
handoff_trigger:
  - 跨境资金来源（中国ODI备案）
  - 学历来自非日本机构（需认证）
  - 直近1期决算赤字
  - 共享办公室/自宅兼用形态
severity_if_wrong: P0
needs_human_review: yes
review_note: 新规5项条件细节（特别是日语能力要求的具体认定方式）需行政書士确认
source: GOLD V2-02 + keiei-kanri-basics.md
```

---

## GOLD-SEED-03

```yaml
scenario: visa-change-family-stay-to-work
question: 家族滞在想转工作签怎么办？
expected_direction: |
  在留資格変更（家族滞在 → 技人国/特定技能/経営管理等）
  必须先确认：配偶签证有效性 + 学历 + 工作offer + 目标签证要件
must_have:
  - 明确区分：资格外活動许可（仍在家族滞在）vs 在留資格変更（获得独立工作签）
  - 各目标签证的前提条件（技人国：三领域+学历；特定技能：业种+試験）
  - 配偶签证是否仍有效（家族滞在依附配偶）
must_not_have:
  - "去区役所办资格外活動许可就行了"（方向反，这不是独立工作签）
  - "家族滞在可以自动转工作签"
handoff_trigger:
  - 配偶签证即将变更（特别是変更到不适格类别，如技能実習→特定技能1号）
  - 学历不达技人国要求
  - 目标岗位内容边界模糊
severity_if_wrong: P0
needs_human_review: yes
review_note: 家族滞在→工作签的过渡期间（配偶签证状态变化时的时序）需行政書士确认
source: 试岗Q3 + family-stay-visa.md
```

---

## GOLD-SEED-04

```yaml
scenario: supplementary-document-deadline-emergency
question: 入管让我补材料，但期限快到了来不及怎么办？
expected_direction: |
  紧急处理：当日电话联系入管担当部门申请期限延长（不保证批准）
  同时先递能凑齐的材料（先启动审查），缺的后补
must_have:
  - 補材料通知期限通常14日（硬截止，不可自动延期）
  - 唯一延期途径：主动电话联系入管担当部门（不保证批准）
  - 可先递部分材料（启动受理）+后补缺项
  - 超期不递 = 通常直接不许可且留有记录
must_not_have:
  - "超期了没关系，下次再补"
  - "重新申请就行了"（留有记录，影响下次）
  - "入管一般会等的"（错误）
handoff_trigger:
  - 期限明天或今天截止
  - 缺的材料复杂（需公司/外部机关配合）
  - 上次续签拿1年（说明入管已有疑虑）
severity_if_wrong: P0
needs_human_review: yes
review_note: 延期申请的实际操作和成功率需行政書士确认；不同申请类型的期限宽松度可能不同
source: 试岗Q4 + immigration-letter-judgment.md
```

---

## GOLD-SEED-05

```yaml
scenario: application-rejected-response
question: 收到不许可通知书了怎么办？
expected_direction: |
  不许可后3个月内可提审查请求（審査請求/再申請）
  出国前必须经行政書士评估——某些情况出国会丧失审查权+触发上陆拒否
must_have:
  - 不许可后3个月内可提审查请求（行政不服申立）
  - 出国决策必须谨慎：部分情况出国=5年上陆拒否+丧失审査権
  - 不许可通知上的理由要旨是再申请的关键依据
  - 立即联系行政書士/入管専門弁護士（不是可选，是必须）
must_not_have:
  - "出国重新申请更容易"（可能触发5年上陆拒否）
  - "完了没希望了"（放弃合法救济）
  - 不提专业handoff
handoff_trigger: 任何不许可通知（没有例外）
severity_if_wrong: P0
needs_human_review: yes
review_note: 出国后的上陆拒否风险具体条件、审查请求的实际成功率需行政書士确认
source: 试岗Q5 + immigration-letter-judgment.md
```

---

## GOLD-SEED-06

```yaml
scenario: pension-gap-before-permanent-residency
question: 永住申请前发现之前有年金没交，还有救吗？
expected_direction: |
  先确认缺口长度：2年内可補缴；超2年无法追溯
  補缴后需等6-12个月稳定记录再递永住申请
must_have:
  - 国民年金補缴追溯上限：最长2年（超过部分无法补回）
  - 補缴后需等6-12个月稳定记录再递永住
  - 超2年缺口需走経緯書路径（说明非本人责任）
  - 年金记录可通过ねんきんネット确认
must_not_have:
  - "补缴了就可以立刻递永住"
  - "补多少年都没问题"（2年上限）
  - 对永住批准作任何承诺
handoff_trigger:
  - 未缴期间超过2年
  - 雇主未给上厚生年金（需社労士介入）
  - 需要写経緯書（非本人责任说明）
severity_if_wrong: P0
needs_human_review: yes
review_note: 2年追溯上限的具体适用边界（厚生年金vs国民年金）需行政書士/社労士确认
source: 试岗Q6 + pension-non-payment-consequences.md
```

---

## GOLD-SEED-07

```yaml
scenario: divorce-spouse-visa-to-teijuusha
question: 持日本人配偶签证离婚了，能转定住者吗？
expected_direction: |
  先判断婚姻年数：
  - 满3年：评估独立生計+公的義務完整→可申定住者
  - 未满3年：通常不许可（例外：抚养日本人子女/DV/死別）
  无论哪种：离婚后6个月内必须変更在留資格（硬期限）
must_have:
  - 离婚后6个月内必须変更在留资格（取消事由）
  - 定住者転換通常要求婚姻满3年+独立生計+公的義務完整
  - 例外路径：① 抚养日本人子女（接近100%下签）② DV ③ 死別
  - 不满足时需考虑其他路径（工作签/留学等）
must_not_have:
  - "离婚了可以转定住者"（未判断年数，方向危险）
  - "婚姻年数不重要"
  - 省略6个月変更义务期限
handoff_trigger:
  - 婚姻未满3年（几乎必须行政書士）
  - DV情况（需弁護士+DVセンター）
  - 有日本人子女抚养（需行政書士确认立证）
severity_if_wrong: P0
needs_human_review: yes
review_note: "接近100%下签"的说法需行政書士确认实务数据；DV认定路径的具体材料需确认
source: 试岗Q7 + GOLD V2-18 + archive-marriage-divorce.md
```

---

## GOLD-SEED-08

```yaml
scenario: management-visa-shared-office
question: 经管签证的公司想搬到共享办公室，可以吗？
expected_direction: |
  高风险。入管原则上不将工位制/热座位共享办公认定为経営実態
  即使有法人名义合同，若非独立封闭房间+専用看板，续签时极可能被认定経営実態不足
must_have:
  - 入管对共享办公室的原则立场：通常不认定経営実態
  - 最低要件（即使如此也有风险）：独立封闭房间+法人名义賃貸契約+専用看板
  - 续签时会被重点审查（现地調査风险）
  - 强烈建议先咨询行政書士确认具体合同条件
must_not_have:
  - "有合同就没问题"
  - "一般共享空间都可以"
  - 把共享办公当普通办公室搬迁处理
handoff_trigger:
  - 任何涉及共享办公室的経営・管理签续签（没有例外）
  - 在留期限剩余<6个月+正在考虑搬迁
severity_if_wrong: P0
needs_human_review: yes
review_note: 共享办公室认定的具体边界条件（独立房间的最低标准）需行政書士确认最新实务口径
source: 试岗Q8 + keiei-kanri-basics.md
```

---

## GOLD-SEED-09

```yaml
scenario: address-mismatch-urgent
question: 在留卡上的地址和实际住址不一致，怎么办？
expected_direction: |
  立即去新住所区役所更新（14日内义务）
  超期已有违反记录，但可补办；越快越好
must_have:
  - 法律义务：搬家后14日内更新（入管法19条の9）
  - 超期后果：罰金200,000円以下+续签评价不利
  - 补办路径：带在留卡+本人確認资料去新住所区役所
  - マイナンバーカード需在90日内同步更新（否则失效）
must_not_have:
  - "续签时一起改就行"
  - "地址这种小事没关系"
handoff_trigger:
  - 超过90日未更新+即将续签
  - 搬家同时伴随离婚/婚姻状态变更
severity_if_wrong: P1
needs_human_review: no
source: 试岗Q9 + GOLD V2-15 + BENCHMARK GOLD-08
```

---

## GOLD-SEED-10

```yaml
scenario: unreadable-official-notice-triage
question: 收到区役所/税务署的日文通知，看不懂，要紧吗？
expected_direction: |
  三步判断：① 寄件机关识别 ② 关键词识别 ③ 封口标识
  入管/裁判所/差押相关 = 当天处理+专业介入
  税务/区役所一般通知 = 当天拆开，识别后再决定
must_have:
  - 寄件机关优先级：入管>裁判所>税务>区役所
  - 关键危险词：不許可/出頭/督促状/差押/取消 = 当天处理
  - 含「親展」「速達」「書留」= 时限敏感，当天拆
  - Google Lens辅助翻译（关键期限和法律术语需人工确认）
must_not_have:
  - "先翻译完再说"（可能已超期）
  - "所有通知都要找专家"（大部分可自判断）
handoff_trigger:
  - 入管不利通知（不許可/出頭/取消/違反字样）
  - 裁判所文书（任何）
  - 差押/催告書
severity_if_wrong: P2
needs_human_review: no
source: 试岗Q10 + unknown-mail-judgment.md + immigration-letter-judgment.md
```

---

## GOLD-SEED-11

```yaml
scenario: dormant-company-pension-switch
question: 公司休眠了，我个人还要交国民年金吗？
expected_direction: |
  公司休眠≠个人年金义务消失
  资格丧失日起14日内必须切换国民年金第1号+国民健康保険
must_have:
  - 公司休眠不等于个人年金/健保义务消失
  - 取得「健康保険資格喪失証明書」（公司应在5日内发出）
  - 资格丧失日起14日内：国民年金第1号+国民健康保険 加入
  - 区役所国保年金課一站式办理
  - 永住审查：直近2年公的義務履行影响
must_not_have:
  - "公司停了个人就不用交了"
  - 省略14日窗口
  - 把経営・管理在留资格影响混入主答
handoff_trigger:
  - 公司过去2年以上未缴厚生年金（本人加入記録缺失）
  - 倒産特例給付申请
severity_if_wrong: P1
needs_human_review: yes
review_note: 14日期限的法律依据明确，但倒産特例的具体申请流程需社労士确认
source: GOLD V2-05 + BENCHMARK GOLD-01
```

---

## GOLD-SEED-12

```yaml
scenario: office-relocation-management-visa
question: 经管签证，公司换了新办公室，要做什么手续？
expected_direction: |
  7机关联动手续，核心是两个硬期限：
  - 法務局 本店移転登記：决议日起2週間内
  - 入管 所属機関等届出：14日内
must_have:
  - 法務局商業登記（2週間内，不办→過料100万円以下）
  - 入管所属機関等届出（14日内，不办→续签评价不利）
  - 税務署+都道府県+市町村 異動届（1ヶ月内）
  - 年金事務所変更届（5日内）
  - ハローワーク変更届（10日内）
  - 新办公室必须有法人名义合同+専用看板+独立使用可能证明
must_not_have:
  - "改个收件地址就行了"
  - 省略法務局商業登記
  - 个人搬家和公司搬迁混答
handoff_trigger:
  - 跨法務局管辖搬迁
  - 共享办公室/自宅兼用形态
  - 在留期限<6个月同时搬迁
severity_if_wrong: P1
needs_human_review: no
source: GOLD V2-16 + BENCHMARK GOLD-02
```

---

## GOLD-SEED-13

```yaml
scenario: permanent-resident-parents-long-stay
question: 我已经永住了，能不能把父母接来日本长住？
expected_direction: |
  误解纠正：家族滞在明确不包括父母
  真实路径只有3条：① 短期滞在90日（最常见）② 特定活動老親扶養（极严）③ 高度専門職親族帯同（仅高度人材）
must_have:
  - 家族滞在对象不含父母（明确纠偏）
  - 日本无中国"探亲签长居版"对应制度
  - 3条真实路径及各自的严格限制条件
  - 短期滞在超90日=不法滞在+5年上陆拒否
must_not_have:
  - "可以"或"不可以"的二元答案（必须给3条路径）
  - "家族滞在包括父母"
  - 以"日本没有这种签证"结束（用户需要知道有哪些可行路径）
handoff_trigger:
  - 父母70岁以上+有医疗看护需要（老親扶養可能性）
  - 本人为高度専門職（親族帯同路径）
  - 父母母国无其他子女可扶养
severity_if_wrong: P0
needs_human_review: yes
review_note: 老親扶養的实际下签率和条件需行政書士确认（知识库说"极严/极少下签"）
source: GOLD V2-12 + BENCHMARK GOLD-03
```

---

## GOLD-SEED-14

```yaml
scenario: employer-illegal-employment-employee-impact
question: 我的同事是黑工，公司被入管查了，我会不会被牵连？
expected_direction: |
  两条独立法律线：雇主刑责（不法就労助長罪）vs 雇员个人处分（資格外活動）
  本人持合法在留+业务符合资格→一般不受牵连，但需配合调查+续签时被重点核查
must_have:
  - 雇主刑责和雇员处分是两条独立法律线（明确区分）
  - 自查自己在留卡「就労制限」栏 vs 实际工作内容
  - 整理自己的雇用契約書+給与振込+社保加入記録
  - 区分三层风险：一般员工/役員/採用担当（后两者风险高得多）
  - 收到出頭通知→出頭前必须咨询弁護士
must_not_have:
  - "公司的事和你无关"（需要自查和配合）
  - "一定会被牵连"（错误）
  - 不提区分役員/採用担当的高风险
handoff_trigger:
  - 收到入管/警察/労基署 出頭通知
  - 本人为役員/採用担当/人事担当
  - 本人业务本身也涉嫌不符在留资格
severity_if_wrong: P0
needs_human_review: yes
review_note: 不法就労助長罪共同正犯的认定标准需弁護士确认
source: GOLD V2-11 + BENCHMARK GOLD-04
```

---

## GOLD-SEED-15

```yaml
scenario: tokutei-gino-to-engineer-change
question: 我特定技能1号还有两年，想转技人国，能行吗？
expected_direction: |
  不是自动，需满足技人国全部要件
  通算5年是法令明文上限，到期前6个月开始准备
must_have:
  - 特定技能1号通算5年是法令明文上限（不可逾越）
  - 转技人国要件：接收公司业务三领域+大学卒以上或10年実務
  - 通算5年期间内特定技能期间可计入実務年数
  - 5年到期前6个月开始準備変更申請
must_not_have:
  - "特定技能可以自动转工作签"
  - 省略通算5年上限
  - "5年到了重新申请就行"（到期不申会不法滞在）
handoff_trigger:
  - 学历不达标（无大学卒+実務年数边界）
  - 5年剩余<6个月还没找到接收公司
  - 已被不许可一次
severity_if_wrong: P1
needs_human_review: yes
review_note: 特定技能期间计入技人国実務年数的具体认定标准需行政書士确认
source: GOLD V2-03 + BENCHMARK GOLD-05
```

---

## GOLD-SEED-16

```yaml
scenario: residence-tax-late-permanent-residency
question: 住民税晚交了两个月，永住会被拒吗？
expected_direction: |
  永住直近5年公的義務履行是硬指标
  迟交=滞纳记录，即使已补缴记录仍留在証明書上
  补缴后需等6-12个月稳定再递
must_have:
  - 永住ガイドライン：直近5年公的義務履行，迟交是单项不许可理由
  - 补缴后"迟交记录"仍留在課税証明書/完納証明書上
  - 补缴→取完納証明書→等6-12个月稳定→再递永住
  - 申请时附経緯書说明迟交原因
must_not_have:
  - "迟交两个月问题不大"
  - "补缴了就没有记录了"（记录仍留存）
  - 补缴后立刻可以递（入管怀疑申請対策）
handoff_trigger:
  - 6个月以上連続未納
  - 已有差押/財産差押记录
  - 跨多个市町村（証明取得复杂）
severity_if_wrong: P1
needs_human_review: no
source: GOLD V2-14 + BENCHMARK GOLD-06
```

---

## GOLD-SEED-17

```yaml
scenario: company-no-social-insurance-permanent-residency
question: 公司三年没给我上社保，我永住怎么办？
expected_direction: |
  两件事分开处理：① 公司违法（雇主责任）② 个人永住要件（个人责任）
  永住审查只看个人公的義務履行是否完整，不管谁的责任
must_have:
  - 公司不上社保=雇主违法，但永住只看个人公的義務完整性
  - 双轨并行：① 自己立刻加入国民年金第1号+国民健康保険 ② 社労士介入协商补加入厚生年金（追溯最长2年）
  - 永住/帰化申请前准备経緯書（说明非本人责任）
  - ねんきんネット确认自己的加入記録
must_not_have:
  - "公司没上就你没有记录，永住没希望"
  - "公司违法所以你没问题"（永住还是看个人履行）
  - 省略自己立即加入国保+国民年金的步骤
handoff_trigger:
  - 公司刻意瞒报或不配合（弁護士）
  - 永住/帰化申请前（需行政書士评估経緯書）
  - 入职超过1年（社労士协商补加入）
severity_if_wrong: P1
needs_human_review: yes
review_note: 厚生年金补加入追溯2年的具体操作流程需社労士确认
source: GOLD V2-13 + BENCHMARK GOLD-07
```

---

## GOLD-SEED-18

```yaml
scenario: permanent-residency-tax-documentation
question: 永住申请要看几年的纳税记录？
expected_direction: |
  直近5年（一般路径）：課税+納税证明逐年完整
  高度人材路径：1年/3年（与积分挂钩）
must_have:
  - 直近5年課税+納税+年金+健保 全期完整（一般路径）
  - 换过市町村 → 逐个原居住地市役所取证明
  - ねんきんネット取直近2年纳付状况
  - 任何1年滞纳/迟交=单项不许可理由
must_not_have:
  - "5年任选"（必须是直近5年连续）
  - "只要近期没问题就行"
  - 把高度人材路径和一般路径混答
handoff_trigger:
  - 直近5年内有滞纳记录
  - 跨多个市町村
severity_if_wrong: P1
needs_human_review: no
source: GOLD V2-10 + answer_seed Q001
```

---

## GOLD-SEED-19

```yaml
scenario: notification-overdue-14days
question: 换工作半年了一直没去入管报告，现在补还来得及吗？
expected_direction: |
  14日届出超期≠在留资格立刻取消
  立即补办+附説明書；越早越好
  新岗位如偏离三领域→申就労資格証明書事前确认
must_have:
  - 超期不会立即取消，但会留「届出義務違反」记录
  - 立即补提「契約機関に関する届出書」（消滅+締結各别）+説明書
  - 超期6个月以上+新岗位偏离三领域 = 高风险
  - 就労資格証明書事前確認（1,200円）建议办
must_not_have:
  - "超期了没事，正常续签就行"
  - "重新报就当没超期了"（记录仍在）
handoff_trigger:
  - 超期6个月以上
  - 新岗位明显偏离原在留资格三领域
  - 已收到入管通知
severity_if_wrong: P0
needs_human_review: yes
review_note: 超期6个月的实际处理口径（是否启动取消程序）需行政書士确认
source: GOLD V2-17
```

---

## GOLD-SEED-20

```yaml
scenario: company-bankruptcy-visa-impact
question: 公司倒闭了，我的工作签会立即取消吗？
expected_direction: |
  公司倒闭≠在留资格立即取消
  两个死线：① 14日内交「契約機関終了届」② 3个月内开始就労/求职
must_have:
  - 公司倒闭不等于签证立即取消（明确纠偏）
  - 14日内交「契約機関終了届」（不交→罰金20万円以下）
  - 3个月内开始转职活动/申特定活動6ヶ月求职延长
  - 在留剩余<3个月→立即申特定活動
must_not_have:
  - "签证立刻取消了"（错误）
  - 省略3个月取消程序启动节点
  - "先等找到工作再报"（超期有罚金）
handoff_trigger:
  - 在留剩余<3个月
  - 公司有未払賃金/離職票拿不到
  - 3个月内没有找到工作且未申特定活動
severity_if_wrong: P0
needs_human_review: yes
review_note: 特定活動6ヶ月求职延长的申请条件和实际下签率需行政書士确认
source: GOLD V2-20
```

---

## GOLD-SEED-21

```yaml
scenario: dormant-company-management-visa-impact
question: 经管签证，公司决议休眠，我的签证会怎样？
expected_direction: |
  公司休眠≠签证立即取消，但续签时経営実態无法立证
  三条路径：① 重启経営 ② 転換在留資格 ③ 放棄+帰国
must_have:
  - 公司休眠≠立即取消（但影响续签）
  - 在留期限剩余<6个月+休眠→立即决策
  - 路径B（転換）容易被用户遗漏→必须明确列出
  - 商業登記変更+入管届出 14日内
must_not_have:
  - "休眠了签证没问题"（错误）
  - 把个人年金切换混入主答（另一条线）
handoff_trigger:
  - 在留期限<6个月+公司休眠（必须行政書士）
  - 路径选择复杂（三路径各有时序要求）
severity_if_wrong: P0
needs_human_review: yes
review_note: 休眠后续签时経営実態审查的实际口径需行政書士确认
source: GOLD V2-06
```

---

## GOLD-SEED-22

```yaml
scenario: management-capital-insufficient
question: 经管签证资本金不够怎么办，现在只有300万。
expected_direction: |
  先判断阶段（新申请/续签/増資前/決算后）
  4条路径：① 増資 ② 亲属/投资人増資 ③ 借款（不算资本金）④ 在留资格変更
must_have:
  - 新规3000万円（2025/10/16后），旧规500万（经過措置至2028/10/16）
  - 阶段不同路径不同（先判断阶段）
  - 借款不算资本金（重要纠偏）
  - 跨境汇款需中国ODI备案（高频陷阱）
must_not_have:
  - "借款可以当资本金"（错误）
  - 省略ODI备案
  - 对批准作任何承诺
handoff_trigger:
  - 跨境资金来源（行政書士+跨境律师）
  - 已收到補正通知/不許可通知
  - 连续赤字+净资产为负
severity_if_wrong: P0
needs_human_review: yes
review_note: ODI备案的具体要求和新规5项条件的判断边界需行政書士+税理士确认
source: GOLD V2-07 + BENCHMARK GOLD-09
```

---

## GOLD-SEED-23

```yaml
scenario: unemployed-visa-status
question: 失业了，工作签有什么影响？有没有时间限制？
expected_direction: |
  失业后约3个月内不开始就職活動→入管可启动在留资格取消程序
  需在14日内交「契約機関終了届」
must_have:
  - 14日内交「契約機関終了届」
  - 3个月节点：入管可依据失業を理由にした在留資格取消规定
  - 在留剩余<3个月→优先申特定活動（求職活動）延长
  - 失业中打黑工=资格外活動→退去强制
must_not_have:
  - "失业期间签证没问题随便等"
  - 省略3个月取消节点
handoff_trigger:
  - 失业超过1个月仍无就职活动
  - 在留剩余<3个月
  - 考虑打零工维生（资格外活動风险）
severity_if_wrong: P0
needs_human_review: yes
review_note: 3个月后入管实际启动取消程序的触发条件和实务操作需行政書士确认
source: unemployed-90-day-rule.md
```

---

## GOLD-SEED-24

```yaml
scenario: reentry-permit-departure
question: 长期出国，需要办再入国许可吗？
expected_direction: |
  みなし再入国（特例再入国）：在留期间内出国，1年内返回，可免办理
  超1年或在留期间到期前出国→需正式再入国許可
  出国前必须确认在留期限和预计返回时间
must_have:
  - みなし再入国：有效期1年（从出国日）
  - 超1年或在留期间已届满→正式再入国許可（最长5年）
  - 出国前必须确认预计返回日 vs 在留期限
  - 某些情况下出国=放棄在留資格（特别是不许可后）
must_not_have:
  - "想什么时候回来都行"
  - 省略1年時効
  - 不提不许可后出国的特别风险
handoff_trigger:
  - 出国期间超过1年
  - 在留期限即将到期
  - 正在进行在留申请审查中（不许可后）
severity_if_wrong: P0
needs_human_review: yes
review_note: みなし再入国の具体的な条件と正式再入国許可の申請手続きについては行政書士への確認が必要
source: saiyukoku-kyoka.md
```

---

## GOLD-SEED-25

```yaml
scenario: job-change-14day-notification
question: 换工作了，需要向入管报告吗？怎么报？
expected_direction: |
  是。換工作（契約機関変更）后14日内必须交届出
  同时建议申就労資格証明書事前确认新岗位是否符合原在留资格
must_have:
  - 契約機関に関する届出：消滅届+締結届 各14日内
  - 新岗位如偏离三领域→申就労資格証明書（1,200円）事前确认
  - 届出方式：オンライン/郵送/持参
  - 超期后果：「届出義務違反」记录+续签评价不利
must_not_have:
  - "换工作不用报告"
  - "续签时一起报就行"（会超期）
handoff_trigger:
  - 新岗位业务内容与原在留资格三领域差距大
  - 同时伴随职位大幅变动（一般→管理职）
severity_if_wrong: P1
needs_human_review: no
source: job-change-visa-impact.md + changing-jobs-30day-action.md
```

---

## GOLD-SEED-26

```yaml
scenario: high-skilled-permanent-residency-acceleration
question: 高度人材1年就能申永住吗？我现在多少分？
expected_direction: |
  高度専門職1号+80点→在日1年；70点→在日3年
  积分需持续保持（不是申请时一次性计算）
must_have:
  - 80点路径：在日满1年+直近1年内持续80点
  - 70点路径：在日满3年+直近3年内持续70点
  - 积分必须持续保持（转职/年収下降会影响）
  - 直近公的義務完整（与一般永住要求相同）
must_not_have:
  - "拿到高度専門職就自动可以1年永住"
  - 省略积分持续保持要求
  - 把70点和80点路径混同
handoff_trigger:
  - 转职可能影响积分
  - 年収下降可能降至70点以下
severity_if_wrong: P1
needs_human_review: yes
review_note: ポイント計算表的具体算法和各加点项认定需行政書士确认
source: GOLD V2-19 + koudo-jinzai-points.md
```

---

## GOLD-SEED-27

```yaml
scenario: new-arrival-first-14-days
question: 刚到日本，第一件事是什么？
expected_direction: |
  14日以内必须完成：① 住民登録（区役所） ② 在留カード住所登録
  同时触发：国民健康保険/国民年金加入（如不在厚生年金覆盖范围）
must_have:
  - 住民登録：到达后14日内（入管法+住民基本台帳法）
  - 在留カード住居地届出：同时在区役所办
  - 国保/国民年金：如未被厚生年金覆盖，同时申加入
  - 区役所窗口可一站式办理（住民登録+国保+年金）
must_not_have:
  - "等工作开始后再去区役所"（已超期）
  - 省略14日期限
handoff_trigger: 通常不需要，但持特殊签证（特定活動等）时需确认
severity_if_wrong: P1
needs_human_review: no
source: first-14-days-checklist.md + juuminito-roku.md
```

---

## GOLD-SEED-28

```yaml
scenario: residence-tax-brown-envelope
question: 收到一封棕色信封，写着住民税，是什么？
expected_direction: |
  棕色信封（住民税）通常是：① 납税通知（正常纳税单）② 督促状（催缴）
  督促状→不处理→差押（財産差押）→影响永住
must_have:
  - 识别区分：課税通知（正常）vs 督促状（催缴，紧急）
  - 督促状：尽快缴纳，不缴→触发差押程序
  - 差押→影响永住审查（公的義務履行不完整）
  - 分期支付可咨询市役所税務担当
must_not_have:
  - "住民税信封都是广告可以先放着"
  - 不区分通知类型（课税通知和督促状完全不同紧急程度）
handoff_trigger:
  - 已收到差押予告
  - 无法一次性缴纳（需分期协商）
  - 在申请永住/帰化准备阶段
severity_if_wrong: P1
needs_human_review: no
source: brown-envelope-juuminzei.md + tokusoku-shiyakusho.md
```

---

## GOLD-SEED-29

```yaml
scenario: student-visa-to-engineer
question: 我是留学生，明年毕业，怎么转工作签？
expected_direction: |
  留学→技人国：在留资格変更
  关键：内定+業務内容三领域+大学卒+时序（3月初递申→4月入职）
must_have:
  - 必须有内定（雇用契約）+业务内容符合三领域
  - 大学卒以上（専門学校卒有限制条件）
  - 在留期限到期前6个月开始递申
  - 4月入职→3月初递申最稳（审查1-3个月）
  - 在留期限失效后申请→不法滞在
must_not_have:
  - "毕业了可以自动转工作签"
  - 省略时序要求
  - "任何工作都行"（必须符合三领域）
handoff_trigger:
  - 専門学校卒（不是大学卒，需评估専攻関連性）
  - 内定公司决算赤字/规模小
  - 业务内容边界
severity_if_wrong: P1
needs_human_review: no
source: GOLD V2-04 + BENCHMARK GOLD-10
```

---

## GOLD-SEED-30

```yaml
scenario: spouse-visa-real-relationship-audit
question: 日本人配偶签证续签，需要准备什么证明实质婚姻？
expected_direction: |
  配偶者签证续签审查重点：实质婚姻（実態ある婚姻）
  必须证明共同生活+经济扶养+社会关系（不是婚姻证书就够了）
must_have:
  - 入管审查重点：是否为「実態ある婚姻」（不是形式婚姻）
  - 证明材料：① 同居証明（住民票同世帯） ② 送金记録/扶養証明 ③ SNS/照片/来往记录 ④ 配偶家族関係証明
  - 分居时的特别立证要求（工作原因分居需附理由书）
must_not_have:
  - "有结婚证就够了"
  - 省略实质婚姻审查这一重点
  - 对续签批准作承诺
handoff_trigger:
  - 近期分居
  - 无子女+婚姻年数短
  - 曾被不许可或拿1年
  - 配偶方收入低（扶养能力质疑）
severity_if_wrong: P1
needs_human_review: yes
review_note: 实质婚姻的具体审查标准和分居时的立证要求需行政書士确认
source: spouse-visa-real-relationship-evidence.md + spouse-visa-basics.md
```

---

## 待标注状态说明

| 状态 | 含义 |
|------|------|
| `needs_human_review: yes` | 该题的expected_direction或must_have中有政策事实需行政書士确认 |
| `needs_human_review: no` | 依据现有知识库，判断置信度高，但仍为draft |
| 全部 | 本文件为draft，所有30题的severity和must_have字段均需行政書士最终确认后才能升级为production eval case |

---

*本文件为 draft / needs human review，不得作为production-ready eval标准使用。*
