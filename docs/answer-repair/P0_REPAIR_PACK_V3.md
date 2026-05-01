# P0 Repair Pack v3 — 35 条 P0 修复

**版本**：v3
**生成**：2026-05-01
**分支**：`content/p0-repair-pack-v3`（基于 `origin/content/intent-examples-gold-answer-v2`）

QA Agent 对 production 跑了 100 条，P0 有 35 条。本轮专修这 35 条。
不写新问题 / 不写长文章 / 每条 200-500 字 / 给 safe answer + must_not_match 负样本。

每条 7 字段：query / expected_intent / why_current_wrong / safe_answer_direction / must_not_match / clarification_if_unsure / gold_answer_if_possible

---

## P0-01 经管转人文

```yaml
query: "我是经营管理签证，公司不想做了想去新公司上班，能不能转技人国"

expected_intent: visa-change-management-to-engineer

why_current_wrong: |
  当前系统答非所问 — 把这条问当成「経営・管理 续签」或「公司休眠経管影响」回答，导致用户拿到的不是「转换路径」而是「续签材料清单」或「休眠 vs 不休眠决策」。
  转换路径核心轴（接收公司 / 三领域 / 学历経歴 / 雇用合同 / 役員退任登記）一个都没答。

safe_answer_direction: |
  必答 5 主线：
  1. 接收公司：找已签内定 / 雇用契約 的公司
  2. 岗位是否属于技人国：自然科学 / 人文科学 / 国際業務 三领域以内（販売 / 现场作业 / 单纯接待 不算）
  3. 学历 / 経歴 与岗位匹配：大学卒以上 + 専攻関連性，或 10 年以上同领域実務経験
  4. 雇用契約：書面 + 月給 + 業務内容 + 期間明示
  5. 原公司 / 代表关系处理：役員退任登記 + 商業登記 + 与新签証不可同时主导经营

must_not_match:
- visa-renewal-management（経営・管理 续签）
- visa-change-management-to-permanent（経管转永住）
- dormant-company-management-impact（公司休眠经管影响）
- management-capital-insufficient（资本金不够）

clarification_if_unsure: |
  如果用户问法模糊（例：「想换工作 经管签 怎么办」），追问：
  - 你打算去打工还是继续自己开公司？
  - 接收公司是日本公司还是中国公司分公司？
  - 是想完全转技人国，还是只是想短期打工保留经管？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-01
```

---

## P0-02 技人国离职 3 个月

```yaml
query: "我技人国离职3个月了 还没找到新工作 签证会被取消吗"

expected_intent: engineer-unemployment-3months

why_current_wrong: |
  当前系统答成「公司倒闭在留资格」或「转职后续签风险」— 但用户不是公司倒闭，而是个人主动离职。
  3 个月节点是法定关键期（入管法 22 条の 4「正当理由なく 3 ヶ月以上 当該活動を継続して行っていないとき」可启动取消程序），必须直接说。

safe_answer_direction: |
  3 个月节点核心：
  1. 「3 ヶ月以上 当該活動を継続して行っていない」+ 「正当な理由なし」→ 入管启动「在留资格取消」程序
  2. 你必须立即提交「契約機関に関する届出」（離職届）+ 14 日内
  3. 立即开始转职活動 — 投简历 + 面试 + 保留求职記錄
  4. 在留剩余 < 3 个月 + 还没找到 → 申「特定活動 6 ヶ月（就職活動）」延长在留（4,000 円）
  5. 求职活動証明书：ハローワーク 登録 + 求职履歴 + 面接記録

must_not_match:
- company-bankruptcy-zairyu-impact（公司倒闭）
- engineer-job-change-risk（普通转职）
- unauthorized-stay-self-report（不法滞在自首）

clarification_if_unsure: |
  - 你的在留期限还剩多久？
  - 你有在做求职活動吗？（投简历 / 面试）
  - 是公司主动解雇你还是你自己离职？（影响求职活動証明）

gold_answer_if_possible: |
  「不会自动立即取消，但 3 个月是法定危险节点。今天先做：① 14 日内交『契約機関に関する届出（離職届）』；② 立即开始求职 + 保留求职記錄；③ 在留 < 3 ヶ月 → 申『特定活動 6 ヶ月就職活動』。如果在留剩余少 / 求职証明不足，先和行政書士聊一下。」
```

---

## P0-03 技人国换工作入管届出

```yaml
query: "我换工作了入管要做什么"

expected_intent: engineer-job-change-notification

why_current_wrong: |
  当前系统答案常把这条混淆为「在留資格変更」或「在留期間更新」，但同 在留資格 内换工作不需要变更 — 只需 14 日内提交「契約機関に関する届出書」+（推荐）「就労資格証明書」事前确认。

safe_answer_direction: |
  3 件事：
  1. 14 日内提交「契約機関に関する届出書」（消滅 + 締結 各别）→ 入管法 19-16 法令义务
  2. 推荐 同时申「就労資格証明書」事前確認新岗位是否仍属技人国 三领域（手数料 1,200 円）
  3. 续签时（在留期限到期前 3 ヶ月）正常更新即可，不需要在留資格変更

  提交方式：
  - オンライン（在留申請オンラインシステム，最方便）
  - 郵送（東京出入国在留管理局 在留管理情報部門 届出受付担当）
  - 窗口（居住地管轄入管）

must_not_match:
- visa-change-engineer-to-management（转经管）
- visa-renewal-engineer（续签）
- engineer-unemployment-3months（离职 3 个月）

clarification_if_unsure: |
  - 你新公司的业务内容跟原公司一样吗？（决定要不要 就労資格証明書）
  - 14 日窗口过了没？（决定补办 vs 正常办）
  - 你打算续签时再办，还是现在就办？（推荐立即办）

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-17（14 日届出超期题）
```

---

## P0-04 留学生毕业后未找到工作

```yaml
query: "我留学毕业了还没找到工作 签证会被取消吗 还能在日本待多久"

expected_intent: student-graduation-no-job

why_current_wrong: |
  当前系统答成「留学转技人国」步骤 — 但用户的核心焦虑是「毕业了还没工作怎么办」+「在日本能待多久」，不是「怎么转工作签」。
  「特定活動 卒業後就職活動」路径未答。

safe_answer_direction: |
  3 件事：
  1. 留学 在留資格 在毕业当日不立即失效，但「在学」要件已不满足 → 必须立即决策
  2. 「特定活動 6 ヶ月（卒業後の就職活動）」是法定路径：大学 / 専門学校卒后求职活動可申，最长 1 年（6 ヶ月 + 6 ヶ月延长）
  3. 求职活動証明：大学推薦書 + ハローワーク 求职登録 + 求职履歴

  申请方式：
  - 在留期限到期前 → 居住地管轄入管 申「在留資格変更（特定活動）」
  - 申請手数料 4,000 円
  - 大学的「就職課」会出具推薦書（大部分大学免费）

must_not_match:
- visa-change-student-to-engineer（已找到工作转技人国）
- unauthorized-stay-self-report（不法滞在）
- student-resshikaku-katsudo（在学中资格外活動）

clarification_if_unsure: |
  - 你的在留期限还剩多久？
  - 你毕业的是大学还是専門学校？（影响特定活動适用）
  - 你在求职吗？（必须有求职活動証明）
  - 你有内定还是完全没头绪？（影响是否申特定活動 vs 直接转技人国）

gold_answer_if_possible: |
  「留学毕业不立即失效签证，但要立即决策。3 件事：① 大学 / 専門卒可申『特定活動 6 ヶ月（卒業後就職活動）』，最长 1 年；② 求职活動証明 = 大学推薦書 + ハローワーク 登録 + 求职履歴；③ 在留期限到期前办申請（4,000 円）。如果不确定走特定活動 vs 直接转技人国，先和行政書士聊一下。」
```

---

## P0-05 配偶离婚后是否能留

```yaml
query: "我跟日本老公离婚了 我还能继续在日本待吗"

expected_intent: spouse-divorce-stay-japan

why_current_wrong: |
  当前系统答案常把这条混淆为「永住申请」或「定住者条件」— 但用户问的是「能不能继续待」+「6 ヶ月内必须做什么」，不是直接问能否拿定住。
  入管法第 22 条の 4：日本人配偶者等 持有人在配偶 / 親 / 子等関係消滅日起 6 ヶ月以上「正当な理由なし」未從事「相当する活動」→ 可启动在留资格取消。

safe_answer_direction: |
  4 路径选择：
  1. 抚养日本人籍子女 → 申定住者（接近 100% 下签）
  2. 婚姻满 3 年 + 独立生計 + 公的義務完整 → 申定住者（普通路径）
  3. 不满 3 年 + 无子女 + 有学历経験 → 申技人国 / 経営・管理 等工作签
  4. 死別 / DV / 不可抗力 → 找有实绩的行政書士做特殊定住者
  
  时间窗口：
  - 离婚后 6 ヶ月内必须完成 在留資格変更
  - 拖到 6 ヶ月以上 + 无正当理由 → 在留资格 取消程序启动

must_not_match:
- permanent-residency-divorce-impact（永住者离婚 — 持永住不影响）
- divorce-under-3years-teijuusha（专问不满 3 年定住）
- dv-protection-special-permit（DV 特例）

clarification_if_unsure: |
  - 你婚姻持续多久？
  - 是否有日本人籍子女（你抚养？）
  - 你目前在日本工作吗？（决定能否走工作签路径）
  - 离婚日多久了？（6 ヶ月窗口）

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-18（离婚不满 3 年定住）
```

---

## P0-06 特定技能换会社

```yaml
query: "我特定技能想换公司 入管要做什么"

expected_intent: skilled-worker-employer-change

why_current_wrong: |
  当前系统答成「技人国 转职 14 日届出」— 但特定技能 雇用主変更比技人国复杂：必须有「同业种 + 受入機関要件 + 登録支援機関 持续」3 个核心要件。
  仅交 14 日届出不够，必须提前确认新雇主资格 + 同业种範圍内。

safe_answer_direction: |
  4 件事：
  1. 新雇主必须是「特定技能 受入機関」資格（不是任何公司都可雇）— 入管公开「受入機関一覽」可查
  2. 业种必须同（14-16 業種内同业种，跨業种 通常需重申）— 例如：「外食業」→「外食業」可，「外食業」→「介護」不可
  3. 14 日内提交「契約機関に関する届出」（消滅 + 締結 各别）+ 同时通知登録支援機関
  4. 推荐 同时申「就労資格証明書」事前确认（4,000 円，特定技能 也可申）

  时间表：
  - 现公司离职日 → 14 日内交终了届
  - 新公司入职日 → 14 日内交締結届
  - 之间空白期 → 不超过 1-3 个月（通算 5 年内不影响累计）

must_not_match:
- engineer-job-change-notification（技人国转职）
- skilled-worker-1-to-2-transition（1 号转 2 号）
- visa-change-skilled-to-engineer（特定技能转技人国）

clarification_if_unsure: |
  - 新公司在你 認定的業種 范围内吗？（这是关键）
  - 现公司离职日和新公司入职日间隔多久？
  - 你的「特定技能 1 号 通算 5 年」剩余多久？

gold_answer_if_possible: |
  「特定技能 换会社不是简单 14 日届出 — 必须 3 件事齐备：① 新雇主是『特定技能 受入機関』資格；② 業種同（14-16 業種 内同业种）；③ 14 日内交终了届 + 締結届 + 通知登録支援機関。推荐同时申『就労資格証明書』事前确认。如果业种边界 / 跨業种，必须先和行政書士聊。」
```

---

## P0-07 特定技能带家属

```yaml
query: "特定技能能不能把老婆孩子带过来日本"

expected_intent: skilled-worker-family-visa

why_current_wrong: |
  当前系统答案常错误暗示「家族滞在」对特定技能 适用 — 但这是 misconception。特定技能 1 号 不能带家属（除非配偶 / 子是日本人 / 永住者）；特定技能 2 号 可以带家属。

safe_answer_direction: |
  必须先纠偏：
  1. 特定技能 1 号 → 「家族滞在」不適用（入管法 別表第二 明确不含特定技能 1 号 的家族）
  2. 特定技能 2 号 → 「家族滞在」適用，可带配偶 + 子（实子 / 特别养子）
  3. 配偶 / 子是日本人 / 永住者 → 不需要走「家族滞在」，可走「日本人配偶者等」/「永住者の配偶者等」

  路径建议：
  - 现持特定技能 1 号 + 想带家属 → 优先评估能否升级到 2 号
  - 配偶 / 子来日 短期 90 日 → 短期滞在ビザ（多次入境签可）

must_not_match:
- family-visa-spouse-child（一般家族滞在）
- skilled-worker-1-to-2-transition（1 号转 2 号）
- parents-short-term-visit（父母短期）

clarification_if_unsure: |
  - 你是特定技能 1 号还是 2 号？
  - 配偶 / 子的国籍？（日本人 vs 中国人 影响路径）
  - 你打算让家属长居还是短期来访？

gold_answer_if_possible: |
  「特定技能 1 号 不能带家属（『家族滞在』不適用），2 号才可以。今天先确认：① 你是 1 号还是 2 号；② 配偶 / 子国籍。如果是 1 号 + 想长居，优先评估 1 号 → 2 号 升级路径。如果配偶 / 子来日短期，可以走短期滞在ビザ 90 日多次入境。」
```

---

## P0-08 资格外活动超时打工

```yaml
query: "我留学生上周打工超过28小时了 入管会查到吗"

expected_intent: shikaku-gai-katsudo-overtime

why_current_wrong: |
  当前系统常给「不会立即被发现」之类回答，但这是 risk_chain 题 — 必须客观说明：
  1. 当下不会立即被查到，但 续签 / 永住 / 帰化 时入管会调阅 給与記録 + 雇主税务申告
  2. 一旦超时记录留下 → 续签拒否 / 在留资格取消 风险
  3. 必须立即停止超时 + 整理证据 + 风险防控

safe_answer_direction: |
  风险链：
  1. 当下风险：低（入管不实时监控）
  2. 中期风险：续签时（雇主提供 給与支払調書 → 入管核查）→ 不许可可能
  3. 长期风险：永住 / 帰化 时直近 5 年「公的義務 + 法令遵守」审查 → 单项不许可
  4. 紧急风险：雇主被举报 / 摘発 → 同时调查 → 资格外活動 認定 → 退去强制

  立即行动：
  1. 停止超时打工
  2. 与雇主协调 — 改成 28 时间 / 周以内
  3. 整理过去 給与明細 — 看超时严重度（偶尔 1-2 次 vs 长期）
  4. 続签前 自我立证 + 経緯書

must_not_match:
- konbini-cashier-engineer（人文签便利店）
- unauthorized-employment-self（自己不法就労）
- student-graduation-no-job（毕业后求职）

clarification_if_unsure: |
  - 你超时多久了？（偶尔 vs 长期）
  - 严重超过多少？（28 → 30 vs 28 → 60）
  - 雇主有报税吗？（决定入管能否查到）

gold_answer_if_possible: |
  「资格外活動 28 时间 / 周 是法令明文。当下不立即被查到，但续签 / 永住时入管会调阅雇主給与記録。今天先做：① 立即停止超时；② 与雇主协调 28 时间内；③ 整理過去 給与明細看超时严重度；④ 续签前可附『経緯書』。如果长期严重超时（30 + 时间 / 周），先和行政書士聊一下风险评估。」
```

---

## P0-09 人文签便利店收银

```yaml
query: "我技人国签证 周末在便利店打工赚钱可以吗"

expected_intent: konbini-cashier-engineer

why_current_wrong: |
  当前系统常答「需要 资格外活動許可」— 但这是错误答案。技人国 / 経営・管理 等工作签 资格外活動 与留学不同：
  - 留学 / 家族滞在 = 资格外活動許可 後可有限工作（28 時間 / 週）
  - 工作签（技人国 等）= 资格外活動許可 通常仅适用于「明确属于本签证以外的兼职」+ 必须申请許可（手数料 4,000 円）+ 仅特定情形可
  - 便利店收银 ≠ 自然科学 / 人文科学 / 国際業務 三领域 → 不属于本签证内容
  - 即使取得 资格外活動許可，便利店收银业务仍可能不符审查（因不属于「専門技術」）

safe_answer_direction: |
  必须明确：
  1. 技人国 直接做便利店收银 = 资格外活動 + 不法就労（雇主同时违法）
  2. 想做兼职 → 必须申「資格外活動許可」+ 业务内容必须不与本职冲突
  3. 资格外活動許可 是个別審查，便利店收银 / 现场作业 等通常不许可（即使 许可金额上限内）
  4. 与现职公司业务有协同的副业（如 IT 翻译 / 設計外包）通常可申许可

  风险：
  - 不申许可直接打工 → 资格外活動 + 不法就労 → 续签时不许可 / 在留资格取消
  - 雇主不法就労助長罪 风险

must_not_match:
- shikaku-gai-katsudo-overtime（留学超时）
- unauthorized-employment-self（自己不法就労）
- engineer-side-business（技人国 副業合规）

clarification_if_unsure: |
  - 你为什么想做便利店打工？（必要性 / 经济压力）
  - 现公司有同意吗？（雇用契約 是否有兼职禁止条款）
  - 你想申请资格外活動許可还是直接打工？

gold_answer_if_possible: |
  「技人国 直接做便利店收银 = 资格外活動 + 不法就労风险。如果一定要做兼职：① 必须申『資格外活動許可』（4,000 円）；② 业务内容不能与本职冲突；③ 便利店收银通常不属于『専門技術』，许可率低。建议改成 IT 翻译 / 設計外包 等与本职协同的副业。如果经济压力大，先和行政書士聊一下其他路径。」
```

---

## P0-10 入管补材料期限赶不上

```yaml
query: "入管让我补材料 但截止日就剩 3 天 来不及怎么办"

expected_intent: hosei-tsuuchi-deadline-emergency

why_current_wrong: |
  当前系统常答「补完整材料就好」— 但用户的核心焦虑是「来不及」。必须给「期限延长」+「先交部分」+「説明書」3 个紧急路径。

safe_answer_direction: |
  紧急路径 3 件事：
  1. 立即提交「補正期限延長願」+ 説明书（哪些材料还在准备 + 预计完成日）→ 入管通常会给 1-2 周延长
  2. 先交已备齐的部分 + 加附「未提出書類 一覽」+ 説明每件未交材料的取得进度
  3. 找行政書士紧急介入 — 补正通知 后申诉 / 期限延长 / 重新审查

  绝对不能做：
  - 期限内完全不响应 → 入管按「補正不能」处理 → 不许可
  - 拖到期限当天才寄出 → 配送延迟可能逾期
  - 自己写 経緯書 但没附时间表 → 入管认为是借口

  期限延长申请书：
  - 简短书面（1 页 A4）
  - 写明：原期限日 + 申请新期限日 + 未提出材料一覽 + 取得进度 + 联系方式
  - 提交方式：オンライン / 郵送 / 持参（推荐持参 + 当場確認）

must_not_match:
- application-rejection-notice（不许可通知）
- visa-renewal-engineer（普通续签）
- documents-list-engineer-renewal（材料清单）

clarification_if_unsure: |
  - 入管要求补什么材料？
  - 还差几件 / 哪几件？
  - 期限剩几天？
  - 你已经在准备了还是完全没动？

gold_answer_if_possible: |
  「来不及不要硬交。今天立即做 3 件事：① 提交『補正期限延長願』+ 説明书（写未提出材料 + 取得进度 + 申请延长 1-2 周）；② 先交已备齐的部分 + 附『未提出書類 一覽』；③ 紧急联系行政書士介入。绝对不要拖到期限当天 / 完全不响应。延长申请书 1 页 A4 即可，推荐持参提交 + 当場確認。」
```

---

## P0-11 不许可通知书怎么办

```yaml
query: "我永住申请被拒了 收到不许可通知书 接下来怎么办"

expected_intent: application-rejection-notice

why_current_wrong: |
  当前系统常答「再申请」— 但流程不仅是再申请，必须先 3 件事：
  1. 看清不许可理由（入管会出具「説明書」or 行政書士事前面谈，了解到底为什么）
  2. 异议申立 vs 取消訴訟 vs 半年后再申请 — 3 路径选择
  3. 立即检查在留期限 — 不许可后通常 30 日内出国 / 在留期间内如剩余可继续

safe_answer_direction: |
  3 步走：
  1. 取得「不许可理由 説明書」
     - 永住不许可 → 入管会有「不許可理由要旨」
     - 不清楚的 → 通过行政書士向入管申请「事前面接」
  2. 选择路径：
     - 异议申立（行政不服審査法 14 条）→ 30 日内 / 仅事实错误时有效
     - 取消訴訟（行政訴訟法 14 条）→ 6 ヶ月内 / 高难度
     - 半年后重新申请 + 補強资料 → 实务通说推荐路径
  3. 在留期限 检查：
     - 永住不许可 ≠ 在留资格立即失效（你原签证的在留期限通常仍有效）
     - 在留期限到期 → 必须重新申「在留期間更新」

  时间表：
  - 异议申立：30 日内
  - 取消訴訟：6 ヶ月内
  - 半年后重新申请：实务推荐
  - 在留期限到期前 3 ヶ月：申「在留期間更新」（独立路径）

must_not_match:
- hosei-tsuuchi-deadline-emergency（補正期限）
- visa-renewal-engineer（续签）
- naturalization-rejection（帰化不许可，独立路径）

clarification_if_unsure: |
  - 不许可理由说明书有吗？（决定异议 vs 重申）
  - 在留期限还剩多久？（决定紧迫度）
  - 你愿意走异议申立 / 取消訴訟 还是半年后重申？

gold_answer_if_possible: |
  「永住不许可 ≠ 立即出国，但要做 3 件事：① 取得『不许可理由説明書』（必要时通过行政書士向入管申请事前面接）；② 评估 3 路径：异议申立（30 日内）/ 取消訴訟（6 ヶ月内）/ 半年后重申（实务推荐）；③ 检查在留期限 — 到期前 3 ヶ月独立办在留期間更新。如果想异议申立 / 取消訴訟，必须立即和行政書士 + 弁護士 联合咨询。」
```

---

## P0-12 公司休眠 → 个人年金

```yaml
query: "我们公司休眠了 我个人还要不要交国民年金"

expected_intent: dormant-company-personal-pension

why_current_wrong: |
  当前系统常答成「経営・管理 续签影响」— 但用户问的是个人年金义务，不是签证。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-05。核心 5 主线：
  1. 公司休眠 ≠ 个人年金义务消失
  2. 厚生年金 资格丧失日 起 14 日内
  3. 国民年金 第 1 号
  4. 国民健康保険
  5. 区役所 / 年金事务所

must_not_match:
- dormant-company-management-impact（公司休眠经管影响）
- visa-renewal-management（经管续签）

clarification_if_unsure: |
  - 公司决议休眠了吗？（vs 实际还在運営）
  - 你拿到「健康保険資格喪失証明書」了吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-05
```

---

## P0-13 公司倒闭工作签

```yaml
query: "公司倒闭了 我的工作签会立即取消吗"

expected_intent: company-bankruptcy-zairyu-impact

why_current_wrong: |
  当前系统常答「会被取消」误导用户 — 实际不会立即取消，但有 14 日 + 3 月两条死线。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-20。核心：
  - 14 日内交「契約機関 終了届」
  - 3 个月内开始就労 / 求职活动
  - 在留剩 < 3 月 → 申「特定活動 6 ヶ月（就職活動）」

must_not_match:
- engineer-unemployment-3months（个人主动离职）
- dormant-company-personal-pension（年金切换）

clarification_if_unsure: |
  - 倒闭确认日多久了？
  - 你在留剩多久？
  - 你已经开始转职了吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-20
```

---

## P0-14 经管资本金不够

```yaml
query: "经营管理资本金不够500万怎么办"

expected_intent: management-capital-insufficient

why_current_wrong: |
  当前系统常答「资本金多少合适」标准 — 但用户问的是「不够怎么办」action。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-07。核心：
  - 4 阶段区分（新申请 / 续签 / 增资前 / 决算后）
  - 4 路径（增资 / 借款不算 / 事业计划 / 在留資格変更）
  - 跨境 ODI + 资金来源 + 専家复核

must_not_match:
- management-capital-amount（资本金多少合适）
- visa-renewal-management（经管续签）

clarification_if_unsure: |
  - 你处于哪个阶段（新申请 / 续签 / 增资前 / 决算后）？
  - 资金来源是自己 / 亲属 / 投资人 / 跨境？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-07
```

---

## P0-15 经管 2025/10/16 改正

```yaml
query: "经管签证改正后 我现持的还能续吗"

expected_intent: management-revision-transition

why_current_wrong: |
  当前系统常给「具体过渡期不确定」之类含糊答案 — 必须明确：経過措置 截止 令和 10/10/16（2028/10/16）+ 既存持有人有 3 年过渡 + 補足計画建议时间表。

safe_answer_direction: |
  3 件事：
  1. 経過措置 截止：令和 10/10/16（2028/10/16）— 既存持有人 3 年过渡
  2. 過渡期内续签 → 通常按旧规审查，但部分自治体 / 入管局已开始引入新口径
  3. 補足計画建议时间表：
     - 资本金 3000 万 → 6-12 个月增资
     - 常勤職員 1 名 → 3-6 个月招聘
     - 経営学修士 / 関連学历 → 2-3 年准备

  立即行动：
  - 盘点公司当前资本金 + 常勤職員 + 自身学历 vs 新要件差距
  - 制定 12-24 个月補足計画
  - 在续签前 6 个月咨询行政書士

must_not_match:
- management-capital-insufficient（资本金不够具体怎么办）
- visa-renewal-management（普通续签）
- dormant-company-management-impact（公司休眠）

clarification_if_unsure: |
  - 你是 2025/10/16 之前还是之后取得经营管理签？
  - 公司当前资本金 + 常勤職員 数量？
  - 在留期限剩多久？

gold_answer_if_possible: |
  「经管 2025/10/16 改正后，既存持有人有 3 年経過措置 至 2028/10/16。今天先盘点 3 件事：① 公司資本金（vs 新规 3000 万円）；② 常勤職員（vs 1 名以上）；③ 自身学历（vs 経営学修士 加分）。在续签前 6-12 个月制定補足計画。如果想評估 補正策略，先和行政書士聊一下。」
```

---

## P0-16 经管事務所搬迁

```yaml
query: "经管签证 公司换了新办公室 要做什么手续"

expected_intent: office-relocation-management

why_current_wrong: |
  当前系统常答「改邮寄地址即可」— 严重错误。必须给 7 步联动 + 4 个机关 + 3 个时间窗口。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-16。核心：
  - 法務局 本店移転登記：2 週間内
  - 入管 所属機関等届出：14 日内
  - 税务 / 社保 / 雇用保険 異動届：1 ヶ月内
  - 7 步联动 + 5 列表格

must_not_match:
- address-change-zairyu-card（个人搬家）
- management-capital-insufficient（资本金）

clarification_if_unsure: |
  - 是同一管轄法務局还是跨法務局？
  - 旧办公室和新办公室都是法人名义吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-16
```

---

## P0-17 永住带父母

```yaml
query: "永住者能不能把父母接来日本养老"

expected_intent: permanent-resident-parents-long-term

why_current_wrong: |
  当前系统常含糊回答「可以」— 严重 misconception。日本「家族滞在」明确不含父母。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-12。核心：
  - 「家族滞在」对象不含父母
  - 真实 3 路径：短期滞在 90 日 / 特定活動 老親扶養 / 高度専門職 親族帯同
  - 不要硬以家族滞在名义申请

must_not_match:
- family-visa-spouse-child（配偶子女）
- parents-short-term-visit（父母短期来玩）

clarification_if_unsure: |
  - 你是普通永住还是高度専門職？
  - 父母年龄？母国还有其他子女吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-12
```

---

## P0-18 永住直近 5 年纳税

```yaml
query: "永住申请要看几年的纳税"

expected_intent: permanent-residency-tax-years

why_current_wrong: |
  当前系统常答「5 年」但不说「跨自治体证明缺失」+「迟交也算单项不许可」+「補缴后等 6-12 月」3 个关键点。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-10。核心：
  - 直近 5 年 課税 + 納税 + 完納 全期完整
  - 期间换市町村 → 各市町村分别取证明
  - 迟交记录留在課税証明書 → 補缴 + 完納証明書 + 等 6-12 个月

must_not_match:
- naturalization-tax-years（帰化 5 年）
- residence-tax-payment-delay（住民税滞納本身）

clarification_if_unsure: |
  - 直近 5 年内有迟交 / 滞納吗？
  - 期间换过市町村吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-10
```

---

## P0-19 公司没上社保

```yaml
query: "我公司一直没给我上厚生年金 永住怎么办"

expected_intent: company-no-social-insurance

why_current_wrong: |
  当前系统常答「让公司上」— 但这是个人不可控事项。必须给「双轨」— 自己加 + 协商公司补加入。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-13（基于 GOLD-07）。核心：
  - 公司违法 ≠ 个人申请要件
  - 双轨：自己加国民年金 + 国保 + 同时社労士协商公司补厚生年金（追溯 2 年）
  - 永住申请前 6-12 月稳定 + 経緯書

must_not_match:
- dormant-company-personal-pension（公司休眠）
- self-employed-kokumin-hoken（自営業）

clarification_if_unsure: |
  - 入职多久了？
  - 公司给你的 給与明細 上有源泉徴収扣社保吗？
  - 公司知道你想永住吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-13
```

---

## P0-20 住民税晚交永住影响

```yaml
query: "住民税晚交2个月 永住会被拒吗"

expected_intent: residence-tax-late-permanent-impact

why_current_wrong: |
  当前系统常答「会被拒」（过强）或「补缴就好」（过弱）— 必须客观说「迟交记录留下 + 補缴 + 等 6-12 月」。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-14。核心：
  - 直近 5 年「公的義務履行」硬指标 — 1 月迟交也是单项不许可
  - 即使补缴 → 迟交记录留在 課税証明書 / 完納証明書
  - 補缴后 等 6-12 月稳定再递

must_not_match:
- residence-tax-payment-delay（一般滞納）
- permanent-residency-tax-years（材料清单）

clarification_if_unsure: |
  - 迟交几次？
  - 已经收到督促状 / 差押了吗？
  - 已经补缴了吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-14
```

---

## P0-21 14 日届出超期补办

```yaml
query: "我换工作半年了 一直没去入管报告 现在补还来得及吗"

expected_intent: notification-14days-overdue

why_current_wrong: |
  当前系统常答「超期就完了」（过强）— 必须客观说「不会立即取消但留记录」+「立即补办」。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-17。核心：
  - 14 日超期 ≠ 在留资格立即取消
  - 「届出義務違反」记录 留 + 下次更新 / 永住时 重点核查
  - 立即补办「契約機関に関する届出」+ 補足説明書
  - 同时申「就労資格証明書」事前確認

must_not_match:
- unauthorized-stay-self-report（不法滞在）
- engineer-job-change-notification（一般转职）

clarification_if_unsure: |
  - 超期多久？
  - 新岗位与原 在留資格 三领域是否一致？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-17
```

---

## P0-22 离婚不满 3 年定住

```yaml
query: "我跟日本老公结婚2年离婚了 还能拿定住者吗"

expected_intent: divorce-under-3years-teijuusha

why_current_wrong: |
  当前系统常答「不能」— 但有 3 例外路径。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-18。核心：
  - 婚姻不满 3 年通常不许可
  - 3 例外：抚养日本人子女（接近 100%）/ 死別 / DV
  - 6 ヶ月内必须办在留資格変更

must_not_match:
- spouse-japanese-renewal（配偶续签）
- permanent-residency-divorce（永住者离婚）

clarification_if_unsure: |
  - 婚姻多久？
  - 有日本人子女抚养吗？
  - 是 死別 / DV / 一般离婚？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-18
```

---

## P0-23 高度人材永住 1 年

```yaml
query: "高度人材1年就能申永住吗 我现在多少分"

expected_intent: koudo-jinzai-permanent-acceleration

why_current_wrong: |
  当前系统常含糊「不一定」— 必须明确 70 点 3 年 / 80 点 1 年。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-19。核心：
  - 高度専門職 1 号 + 70 点 → 在日 3 年 / 80 点 → 1 年
  - ポイント計算表（学历 + 経験 + 年齢 + 年収 + 加点）
  - 持续保持 + 公的義務完整

must_not_match:
- permanent-residency-10years（普通 10 年路径）
- permanent-residency-tax-years（材料清单）

clarification_if_unsure: |
  - 你是高度专门职 1 号吗？
  - 你算过积分吗（70 点 / 80 点）？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-19
```

---

## P0-24 老板雇错签证我会被牵连

```yaml
query: "我同事是黑工 公司被入管查 我会不会被牵连"

expected_intent: employer-illegal-employment-impact

why_current_wrong: |
  当前系统常错答「会被牵连」让用户恐慌 — 必须客观说「雇主刑责 vs 雇员处分两条独立线」。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-11。核心：
  - 雇主不法就労助長罪 vs 雇员资格外活動 处分 是两条独立线
  - 自己业务符合在留资格 + 配合调查 → 一般不受牵连
  - 役員 / 採用担当 → 弁護士介入

must_not_match:
- unauthorized-employment-self（自己资格外活動）
- konbini-cashier-engineer（自己便利店打工）

clarification_if_unsure: |
  - 你的实际工作是什么？（vs 在留资格）
  - 你是普通员工 / 役員 / 採用担当？
  - 已经收到入管 / 警察 出頭通知吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-11
```

---

## P0-25 不法滞在自首

```yaml
query: "我超期1年了 现在自首会怎样"

expected_intent: unauthorized-stay-self-report

why_current_wrong: |
  当前系统常含糊「会被遣返」— 必须区分 出国命令 / 退去强制 / 在留特別許可 三独立路径。

safe_answer_direction: |
  3 路径：
  1. 出国命令制度（入管法 24-3）— 自主出頭 + 5 要件满足 → 上陸拒否 1 年
  2. 退去強制（入管法 24）— 摘発或不满足出国命令要件 → 上陸拒否 5 年（初）/ 10 年（再）
  3. 在留特別許可（独立路径）— 涉日本人配偶 / 永住者配偶 / 日本国籍子女

  立即行动：
  - 出頭前必须先咨询弁護士 + 行政書士（不要单独出頭）
  - 整理立证材料：婚姻 / 子女 / 在日歴 / 工作 / 公的義務 / 等
  - 评估「在留特別許可」可能性

  绝对不能：
  - 自己一个人去入管出頭（高风险）
  - 拖到被摘発才动手
  - 假装没事继续打工 / 不法就労

must_not_match:
- visa-renewal-engineer（普通续签）
- application-rejection-notice（不许可通知）

clarification_if_unsure: |
  - 超期多久？
  - 你有日本人配偶 / 永住者配偶 / 日本国籍子女吗？
  - 已经被入管发现 / 摘発 还是还没？

gold_answer_if_possible: |
  「不法滞在自首不是简单出頭。3 独立路径：① 出国命令（5 要件 + 上陸拒否 1 年）；② 退去強制（5/10 年）；③ 在留特別許可（涉日本人配偶 / 子女）。出頭前必须先和弁護士 + 行政書士 联合咨询，不要单独去入管。整理婚姻 / 子女 / 在日歴 / 工作 立证材料。绝对不能继续不法就労。」
```

---

## P0-26 DV 受害者特例

```yaml
query: "我被老公家暴 想离开他 签证怎么办"

expected_intent: dv-protection-special-permit

why_current_wrong: |
  当前系统常情感化「勇敢一点」— 必须严格走制度路径。

safe_answer_direction: |
  制度路径：
  1. DV 防止法 + 入管特例措施
  2. 立即拨 DV センター #8008（24 小时）+ 警察 #9110
  3. 取得 DV 公式记录：保護命令 / 警察記録 / 医療記録 / シェルター 入所証明
  4. 行政書士 + 弁護士 联合介入 — 申「在留資格変更（定住者）」+ DV 特例措施

  绝对避免：
  - 仅情感化倾诉 → 不构成 DV 立证
  - 仅 LINE 聊天记录 → 仅補助
  - 自己谈判离婚 → 危险（应通过弁護士 + 保護命令）

must_not_match:
- divorce-under-3years-teijuusha（一般离婚）
- spouse-marriage-authenticity（婚姻真实性）

clarification_if_unsure: |
  - 你目前安全吗？（如不安全立即拨 110）
  - 是否已经报警 / 去 DV センター？
  - 有医院诊断书吗？

gold_answer_if_possible: |
  「DV 是制度承认的在留特例事由。立即做：① 拨 DV センター #8008（24 小时）+ 警察 #9110；② 取得 公式记录（保護命令 / 警察記録 / 医療記録 / シェルター 入所）；③ 行政書士 + 弁護士 联合 — 申『在留資格変更（定住者）』+ DV 特例措施。仅情感证言或 LINE 聊天不够。如果你目前不安全，立即拨 110。」
```

---

## P0-27 在留期間更新被退回

```yaml
query: "我在留期間更新 被入管退回了 让我补材料 怎么办"

expected_intent: visa-renewal-hosei-tsuuchi

why_current_wrong: |
  当前系统常答「再交一次」— 但「補正通知」≠「不許可」。这是补材料阶段，必须区分。

safe_answer_direction: |
  3 件事：
  1. 確認是「補正通知」还是「不許可通知」（前者要补材料，后者要重申）
  2. 補正通知期限通常 14-30 日 — 看通知書写明
  3. 行动：
     - 期限来得及 → 立即取得材料 + 提交补正
     - 期限来不及 → 申「補正期限延長願」+ 説明書
     - 不知道补什么 → 立即联系入管 / 行政書士事前面谈

  常见补正项：
  - 課税 / 納税証明書（跨自治体缺失）
  - 雇用契約書 详细
  - 業務内容説明書（明确三领域）
  - 法人決算書 / 公司商業登記簿
  - 同居立证（婚姻 / 抚养）

must_not_match:
- application-rejection-notice（不許可）
- hosei-tsuuchi-deadline-emergency（期限来不及）

clarification_if_unsure: |
  - 通知書写的是「補正」还是「不許可」？
  - 期限是几天后？
  - 让你补什么材料？

gold_answer_if_possible: |
  「『補正通知』≠ 不許可，意思是補完材料后审查继续。3 步：① 看清通知期限（通常 14-30 日）；② 期限来得及 → 取得材料 + 提交補正；③ 期限来不及 → 申『補正期限延長願』+ 説明書。常见补正：课税证明 / 雇用契約 / 業務内容 / 同居立证。如果不知道补什么，先和行政書士聊一下。」
```

---

## P0-28 特定技能 1 → 2 移行

```yaml
query: "特定技能1号通算5年快到了 怎么转2号"

expected_intent: skilled-worker-1-to-2-transition

why_current_wrong: |
  当前系统常含糊回答 — 必须明确：必须通过「2 号特定技能評価試験」+ 业种限定 + 雇主受入機関要件。

safe_answer_direction: |
  4 件事：
  1. 通过「2 号特定技能評価試験」— 各业种独立考试，通过率不一
  2. 業种限定 — 仅部分业种可移行 1 号 → 2 号（建設 / 造船舶 / 自動車整備 / 飲食料品製造 / 等扩充中）
  3. 雇主受入機関 — 必须是 2 号認定 受入機関
  4. 通算 5 年 + 合格証 → 申「在留資格変更」（4,000 円）

  时间表：
  - 2 号合格証 取得 → 通算 5 年到期前 6 个月开始申請
  - 准备期 — 试験 + 雇主调整 + 立证書類

must_not_match:
- visa-change-skilled-to-engineer（特定技能转技人国）
- skilled-worker-employer-change（换会社）
- skilled-worker-family-visa（带家属）

clarification_if_unsure: |
  - 你是哪个業种特定技能 1 号？
  - 通算 5 年还剩多久？
  - 现公司是 2 号受入機関吗？

gold_answer_if_possible: |
  「特定技能 1 号 → 2 号 移行 4 件事：① 通过『2 号特定技能評価試験』（业种独立考试）；② 业种限定（仅部分业种可移行）；③ 雇主必须是 2 号 受入機関；④ 申『在留資格変更』（4,000 円）。今天先确认业种是否在可移行清单 + 现公司是否 2 号認定。如果业种不在清单，可能需要转工作签 / 帰国。」
```

---

## P0-29 帰化前 6 个月准备

```yaml
query: "我想申请归化 要准备什么"

expected_intent: naturalization-preparation

why_current_wrong: |
  当前系统常给「概况」— 必须给具体时间表 + 材料清单 + 日语 / 法务局考核。

safe_answer_direction: |
  必备 7 大要件：
  1. 在日 5 年以上（含工作 3 年以上）
  2. 18 岁以上 + 行為能力（特殊：日本人配偶 3 年 / 永住者 5 年 等可缩短）
  3. 素行善良（5 年内无罰金 + 5 件以上交通違反 不许可率高）
  4. 生計能力（自己 / 配偶 / 同居家族 收入稳定）
  5. 喪失国籍（中国国籍 必须放棄 — 不可双国籍）
  6. 不属于反社（不参加反社组织）
  7. 日语能力（小学 3 年级程度，法務局口头审查）

  申请流程：
  - 法務局 事前相談 → 大量书类准备 → 提交申请 → 法務省审查（1-2 年）
  - 必备书类：身分証明 / 履歴書 / 雇用関係 / 公的義務履行 / 财产 / 戸籍 等数十份

  必须做：
  - 找有帰化实绩的行政書士 + 司法書士联合介入
  - 直近 5 年 公的義務 + 法令遵守 完整

must_not_match:
- permanent-residency-checklist（永住申请）
- spouse-japanese-renewal（配偶续签）

clarification_if_unsure: |
  - 你在日多少年？
  - 是否有日本人配偶 / 永住路径？
  - 5 年内有罰金 / 交通违反吗？

gold_answer_if_possible: |
  「帰化 7 大要件：① 在日 5 年（特殊可缩短）；② 18 岁 + 行為能力；③ 素行善良；④ 生計能力；⑤ 喪失中国国籍；⑥ 不属反社；⑦ 日语能力（小学 3 年级）。申请通过法務局，审查 1-2 年。今天先做：① 自查 5 年公的義務履行 + 罰金 / 交通违反记录；② 评估生計能力（直近 3 年课税年収）；③ 联系行政書士事前相談。注意：中国国籍必须放棄，不可双国籍。」
```

---

## P0-30 父母短期滞在 90 日

```yaml
query: "想让妈妈来日本看孩子 短期签证怎么申请"

expected_intent: parents-short-term-visit

why_current_wrong: |
  当前系统常答成「家族滞在」（错误）— 必须明确「短期滞在」+ 中国侧申请。

safe_answer_direction: |
  必备：
  1. 申请方在日本侧（你）— 准备 招聘理由書 + 滞在予定表 + 在職証明書 + 課税証明書 + 戸口簿関係立証
  2. 父母在中国侧 — 持申请书 + 中国户口 + 你的招聘材料 → 在中国日本国大使館 / 領事館 申请
  3. 査証発給 1-3 周 — 通常发 90 日单次 / 多次入境签

  招聘理由書要点：
  - 訪問目的（孩子出生 / 探亲 / 看护）
  - 滞在期间 + 滞在地址
  - 你的扶養能力（年収 + 公司 + 同居住所）

  多次入境：
  - 申「数次査証」最长 5 年有効
  - 每次入境最长 90 日

must_not_match:
- permanent-resident-parents-long-term（长居）
- family-visa-spouse-child（家族滞在）

clarification_if_unsure: |
  - 父母想停留多久？（90 日内 vs 长期）
  - 你想多次入境还是一次？

gold_answer_if_possible: |
  「父母短期来日 = 短期滞在ビザ 90 日。流程：① 你（在日侧）准备 招聘理由書 + 滞在予定表 + 在職証明 + 課税証明 + 戸口簿関連立証；② 父母（中国侧）持你的招聘材料 + 中国户口 → 在中国日本国大使館 / 領事館 申请；③ 査証発給 1-3 周。可申「数次査証」最长 5 年有効。如果父母想长居（不只是探亲），路径完全不同。」
```

---

## P0-31 搬家在留卡地址

```yaml
query: "搬家了在留卡上的地址要不要改"

expected_intent: address-change-zairyu-card

why_current_wrong: |
  当前系统常答「不用改」（错误）— 必须答「14 天内必改」+ 4 后果。

safe_answer_direction: |
  详见 GOLD_ANSWER_V2.md V2-15。核心：
  - 搬家后 14 天内到新住址 区役所 / 市役所
  - 在留カード 住居地届出 + 転入届 + 国保 / 年金联动
  - 不办：罰金 ¥200,000 + 過料 ¥50,000 + マイナンバーカード 失効

must_not_match:
- office-relocation-management（公司搬迁）
- return-permission-vs-reentry（海外搬家）

clarification_if_unsure: |
  - 你跨自治体搬家还是同一自治体？
  - 持マイナンバーカード吗？

gold_answer_if_possible: 见 GOLD_ANSWER_V2.md V2-15
```

---

## P0-32 永住放棄 vs 再入国

```yaml
query: "我永住了 但想回中国发展 怎么保留永住"

expected_intent: return-permission-vs-reentry

why_current_wrong: |
  当前系统常答「放棄」（错误）— 必须区分 みなし再入国 / 再入国許可 / 永住放棄 三独立路径。

safe_answer_direction: |
  3 路径：
  1. **みなし再入国**（出国 1 年内）— 不需要申请，出境时勾「みなし再入国」+ 1 年内回日本即可保留永住
  2. **再入国許可**（出国 1-5 年）— 出国前申「再入国許可申請」（3,000 円单次 / 6,000 円複数 / 最长 5 年）
  3. **永住放棄**（不申请前两者 → 出国超 1 年）— 永住自动失效，重新申请要 10 年

  重要：
  - 出国时机场关口必须勾对「みなし再入国」选项（不勾 = 默认放棄）
  - 5 年是最长保留期 — 超过 5 年永住自动失效（无例外）
  - 出国期间 公的義務（年金 / 住民税）— 国民年金 可申「任意加入」+ 住民税 出国后无义务（住民票 转出）

must_not_match:
- permanent-residency-tax-years（直近 5 年纳税）
- naturalization-preparation（帰化）

clarification_if_unsure: |
  - 你打算出国多久？（< 1 年 / 1-5 年 / > 5 年）
  - 你有日本资产 / 业务要保留吗？

gold_answer_if_possible: |
  「永住者出国 3 路径：① 1 年内 → みなし再入国（出境时勾选项即可）；② 1-5 年 → 申『再入国許可』（出国前 3,000-6,000 円）；③ 超 5 年 → 永住自动失效。重点：出国时机场必须勾对『みなし再入国』选项（不勾 = 默认放棄）。出国期间国民年金可申『任意加入』。如果不确定 1 年内能否回，建议申『再入国許可』保险。」
```

---

## P0-33 怀孕补助

```yaml
query: "我怀孕了在日本可以申请什么补助"

expected_intent: pregnancy-benefits

why_current_wrong: |
  当前系统常给「概况」— 必须给具体补助名称 + 金额 + 申请窗口。

safe_answer_direction: |
  4 大补助：
  1. **出産育児一時金 ¥500,000**（健康保険 / 国保 加入者，2023 年 4 月起 ¥500,000，含双胞胎双倍）— 直接支払制度（医院直收）or 受取代理制度
  2. **出産手当金**（健康保険 加入者 + 雇用継続）— 産前 42 日 + 産後 56 日，每日 標準報酬月額 / 30 × 2/3
  3. **育児休業給付金**（雇用保険 加入者）— 育児休業 6 ヶ月 67% / 6 ヶ月以後 50%（2026 改正可能）
  4. **児童手当**（生後申请）— 0-2 岁 ¥15,000 / 月（第 3 子 ¥30,000） / 3 岁-中学卒 ¥10,000-15,000

  申请窗口：
  - 妊娠届 → 居住地市役所 → 取得 母子手帳
  - 出産育児一時金 → 出産前医院 直接支払合意書
  - 出産手当金 → 公司 健保組合
  - 育児休業給付金 → 公司 ハローワーク
  - 児童手当 → 出生届后 居住地市役所

must_not_match:
- childbirth-benefits-after（出生后补助）
- family-visa-spouse-child（家族滞在）

clarification_if_unsure: |
  - 你加入 健康保険 / 国保？（决定能否申出産育児一時金）
  - 你在职 + 雇用保険 加入吗？（决定育児休業給付金）

gold_answer_if_possible: |
  「怀孕 4 大补助：① 出産育児一時金 ¥500,000（健保 / 国保加入者）；② 出産手当金（健保加入者 + 雇用継続）；③ 育児休業給付金（雇用保険加入者）；④ 児童手当（生後申请）。今天先做：① 妊娠届 → 居住地市役所 → 取得母子手帳；② 出産前 与医院签 直接支払合意書（一時金直收）；③ 与公司 / 健保組合 確認 出産手当金 + 育児休業 申请。」
```

---

## P0-34 高额疗养费

```yaml
query: "我住院花了几十万 能申请高額療養費吗"

expected_intent: high-medical-cost

why_current_wrong: |
  当前系统常含糊「可以申请」— 必须给具体限度額 + 申请方式（事前 vs 事后）+ 多数該当。

safe_answer_delivery: |
  3 件事：
  1. 限度額認定証（事前申请）— 入院前向健保組合 / 国保申「限度額認定証」→ 医院直接按限度額収費 → 你只付限度額部分
  2. 自己負担限度額（年収別）：
     - 年収 770 万 以上：約 ¥250,000 / 月
     - 年収 370-770 万：約 ¥87,000 / 月
     - 年収 370 万 以下：約 ¥58,000 / 月
     - 住民税非課税：约 ¥35,000 / 月
  3. 多数該当（连续 3 月超过限度 → 第 4 月起进一步降低）+ 世帯合算（同一世帯多人合并计算）

  事后申请：
  - 已支付高额医疗费 → 2 年内向健保 / 国保 申「高額療養費 支給申請」→ 退还超过限度額 部分

must_not_match:
- pregnancy-benefits（怀孕补助）
- health-insurance-switch（国保切换）

clarification_if_unsure: |
  - 你年収多少？（决定限度额）
  - 你住院前 / 后申请？
  - 加入 健保 / 国保？

gold_answer_if_possible: |
  「高額療養費 是健保 / 国保 制度。3 件事：① 入院前向健保 / 国保 申『限度額認定証』→ 医院直接按限度额収费；② 限度额按年収别（年収 370-770 万 约 ¥87,000 / 月，年収 770+ 约 ¥250,000 / 月）；③ 多数該当（3 月超过 → 第 4 月起更低）+ 世帯合算。已支付 2 年内可事后申请 退还。今天先确认你 年収档次 + 是否在 健保 / 国保。」
```

---

## P0-35 育成就労 2027 改正

```yaml
query: "技能实习要被改成育成就労是真的吗 我现在的实习还有效吗"

expected_intent: ikusei-shurou-2027-revision

why_current_wrong: |
  当前系统常含糊「政策不确定」— 必须明确：2027/4/1 施行 + 既存技能実習继续到期 + 移行路径。

safe_answer_direction: |
  3 件事：
  1. 育成就労 2027/4/1 施行（取代技能実習）
  2. 既存技能実習者：施行后 3 年経過措置 — 现持技能実習可继续到原期限
  3. 移行路径：技能実習 修了后 → 育成就労（最长 3 年）→ 特定技能 1 号 → 2 号

  影响：
  - 转職：育成就労 比技能実習 限制少（同业种内转職可能）
  - 家族帯同：育成就労 后期 / 特定技能 2 号 可帯同
  - 永住路径：育成就労 期间不计入永住「在日 10 年」

must_not_match:
- skilled-worker-1-to-2-transition（特定技能 1 → 2）
- visa-change-skilled-to-engineer（特定技能转技人国）

clarification_if_unsure: |
  - 你是技能実習 1 号 / 2 号 / 3 号？
  - 你现在的契約 到何时？

gold_answer_if_possible: |
  「育成就労 2027/4/1 施行取代技能実習。3 件事：① 既存技能実習可继续到原期限（3 年経過措置）；② 修了后路径：技能実習 → 育成就労（最长 3 年）→ 特定技能 1 号 → 2 号；③ 育成就労 比技能実習 转职限制少 + 后期可家族帯同。育成就労 期间不计入永住『在日 10 年』。如果不确定路径，先和行政書士聊一下時機。」
```

---

🤖 by tebiq-knowledge-base skill / p0-repair-pack-v3
