---
status: draft / DOMAIN review / not final legal advice
role: Russell / DOMAIN 在留资格语义复核
date: 2026-05-16
scope: TEBIQ 0.8.5 card import safety boundary
---

# TEBIQ 0.8.5 Import Domain Review

## Executive Judgment

0.8.5 的导入策略方向正确：卡片进入产品前必须先分成 positive fact、negative guardrail、materials checklist、deep-water candidate、source-only evidence。DOMAIN 的补充意见是：首批导入不得以“卡片数量”作为目标，而要以“哪些字段可以安全进入正面结论”作为最小单位。

首批上线可以正面引用低风险、程序性、来源明确、适用范围窄的事实。涉及许可结果、在留基础消失、出国再入国、特例期间、不许可后行动、HSP1 机构变更、经营管理 2025 改正、配偶/DV 的内容，默认只做 guardrail / deep-water，除非该行事实同时满足 source-backed、scope-clear、no-needs-review、no-individual-outcome 四个条件。

参考文件：

- `docs/ops/TEBIQ_CARD_IMPORT_TO_PRODUCT_PLAN.md`
- `docs/fact-cards/README.md`
- `docs/domain/DOMAIN_CLAIM_GUARDRAILS.md`
- `docs/domain/TEBIQ_0_8_LOOP1_DOMAIN_ROUTE_MAP_GAPS.md`
- `docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md`

## 1. Positive Fact Allowed

以下主题可以作为正面答案引用，但只限 direct / certain 字段，不得扩展到许可预测。

| Theme | Positive answer boundary | Examples |
|---|---|---|
| 基础程序期限 | 官方直接支持的期限、机关、手续入口 | 搬家 14 日届出、更新大约 3 个月前、在留卡有效期限更新 |
| 机关分工 | 告诉用户去哪类机关办什么，不判断结果 | 区役所、税务署、年金事务所、入管、Hello Work 的职责区分 |
| 申请材料清单 | 材料准备范围、谁准备、去哪取、有效期 | 課税証明書、納税証明書、住民票、在職証明書 |
| 定义性事实 | 在留资格、证书、通知、制度的定义 | 就労資格証明書不是新许可；COE 不是入国保证 |
| 窄范围状态事实 | 官方直接说明且不涉及个案裁量 | みなし再入国 1 年原则、通常再入国许可最长期限、特例期间最长期限 |
| 已 human reviewed 且无 unresolved field 的卡 | 仍必须按适用范围引用 | `spouse-divorce-separation` 的 14 日届出、6 个月取消风险事实；`zairyu-expiry-renewal-change` 的特例期间基本结构 |

正面引用时必须同时满足：

- `state` 是 `human_reviewed`，或 `ai_verified` 且风险门允许；
- 引用来自 `injection_certain_block` 或明确 direct fact；
- 不包含 `needs_review_flags`、`ai_inferred_fields`、DOMAIN-only judgement；
- 卡片的 `applies_when / does_not_cover` 与用户问题匹配；
- 只讲一般制度和下一步，不替用户判断许可可能性。

## 2. Guardrail / Deep-Water Only

以下主题首批不得作为正面结论，只能用于禁止危险表达、追问事实、或专业路由。

| Theme | Runtime use | Reason |
|---|---|---|
| 経営・管理 2025 改正混合规则 | guardrail + deep-water | 旧 500 万、新 3000 万、常勤人数、既存者过渡、startup 特定活动容易混用 |
| `keiei-kanri-capital-asset-3000man-criterion` | guardrail only | 文件本身标注 `production_disposition: guardrail_only`，不能单独正面回答“有 3000 万即可” |
| startup visa 转经营管理 | deep-water | `state: ai_extracted`，起业完成定义、2025 改正适用、认定机构列表均未解 |
| 特例期间中出国 | deep-water | FACT_PROGRESS 记录 G93 为 P0 推论，官方文本确认不足 |
| HSP1 机构变更 | negative guardrail only | 不能把点数、届出、受理当作新机构活动许可 |
| 配偶者/DV 路线判断 | deep-water | 涉及安全、地址保密、替代材料、定住者路线、婚姻实态，不可由卡决定 |
| 不许可后行动 | deep-water | 通知书期限、审查请求、再申请、出国、上陆拒否条件必须分支 |
| 补材料期限/不完整提交 | guardrail + deep-water | “先交一点保住特例”可能误导 |
| 永住公的义务瑕疵 | guardrail + materials only | 可讲证明材料和未纳/迟纳区别，不预测是否许可 |
| 活动范围/资格外活动/已开始工作 | guardrail + handoff | 错误会导致不法就労或取消风险 |

工程上可以命中这些主题，但命中结果应是：

- `must_ask` missing facts；
- `do_not_say` validator；
- `handoff`；
- materials checklist；
- source citation for context；
- Eval / audit label。

不应生成“你的情况可以/不可以”“这样就安全”“这样会被拒”的正面结论。

## 3. Batch A Required Conditions

### 3.1 Must-Not-Say

首批导入至少设置以下 must-not-say：

1. 经营管理：
   - 现在普通新申请仍然 500 万即可。
   - 3000 万和 2 名常勤二选一。
   - 有 3000 万就一定许可。
   - 既存经营管理持有人马上必须完全满足新基准，否则不能更新。
   - 过渡期内不用满足新基准也没关系。
   - 技人国身份下先开始实质经营，之后补经营管理变更。
2. 特例期间和出国：
   - 申请中或特例期间可以放心出国。
   - 特例期间是原在留期限后固定多出来的安全期。
   - 不许可后仍可用特例期间继续停留。
   - みなし再入国可以解决特例期间出国的所有问题。
3. HSP1 机构变更：
   - 点数够加 14 日届出即可先入社。
   - HSP1 换公司只做所属机构届出即可。
   - 同职位或同工作内容就不用变更许可。
   - 届出受理、申请受理、明信片、審査完了等于新活动许可。
4. 配偶/DV：
   - 离婚或死别当天签证自动失效。
   - 通知了就一定没事，可以待到在留期限。
   - 离婚后在留期限还有几年，所以安全用到到期。
   - 再婚后原来的配偶者资格自动接到新配偶者。
   - DV 情况下先联系加害配偶者拿材料。
   - 有 DV 就一定能改定住者或获批。
5. 不许可后：
   - 出国再申请更简单。
   - 准备材料再申请即可，不需要看审查请求。
   - 期限内自主出国本身必然导致 5 年上陆拒否。
   - 不许可后还能继续用原特例期间。
   - AI 可以判断审查请求胜算。

### 3.2 Must-Ask

首批导入必须让模型先抽取以下事实，未抽取不得正面结论。

| Topic | Must ask / extract |
|---|---|
| 经营管理 2025 | 新规/变更/更新/既存持有/特定活动转经管；申请或更新日期；是否 2025-10-15 前受理；是否在 2028-10-16 前更新；资本、常勤员工身份、日语能力、学历/经验、事务所、事业计划 |
| 500万/3000万 | 用户是在问新申请、变更、既存更新还是旧信息确认；是否把 3000 万当许可保证；是否涉及资产计算 |
| 特例期间出国 | 当前在留期限、是否已申请、申请类型、是否已过原期限、特例期间终点、是否已有结果/通知、出国日期、回国日期、再入国许可类型 |
| HSP1 机构变更 | 当前 HSP1/HSP2/技人国；HSP subtype；旧/新机构；活动内容；合同结束/开始日；是否已开始培训、远程、入社、领薪；是否已获变更许可；是否仅做了 14 日届出 |
| 配偶/离婚/DV | 当前资格；离婚/死别/别居日期；14 日届出状态；当前期限；是否有孩子/监护/扶养；是否 DV、避难、地址保密、对方控制文件 |
| 不许可后 | 通知书标题、受领日、申请类型、通知书写的期限、原在留期限、是否想审查请求/再申请/将来再来、是否已有不法滞在/不法就労疑虑 |
| 补材料/通知 | 通知书准确标题、期限、要求材料、提交方式、是否联系担当、是否缺核心材料、谁控制材料、当前在留期限或特例期间终点 |

### 3.3 Handoff

以下条件触发 handoff，不允许只用卡片继续正面回答：

| Trigger | Handoff target | Timing |
|---|---|---|
| 不许可通知、取消通知、退去强制、出头、意见听取 | 行政書士 + 入管专业弁護士，退去强制偏弁護士 | 当日 |
| 不许可后想出国、再申请、审查请求、将来再入国 | 行政書士，复杂时入管专业弁護士 | 出国前/当日 |
| 特例期间中或原期限已过还想出国 | 行政書士 | 出国前 |
| HSP1 已经在新机构开始工作/培训/远程任务/领薪 | 行政書士，严重时弁護士 | 当日 |
| 经营管理 2025 个案适用、既存者过渡、startup 特定活动转经管 | 行政書士 | 申请前 |
| 公司休眠、清算、注销、代表退任后转签 | 行政書士 + 司法書士 + 税理士，复杂时弁護士 | 申请或处分前 |
| 配偶离婚后 6 个月临近、14 日届出已迟、定住者路线、孩子/监护 | 行政書士 | 早急 |
| DV、地址保密、对方控制材料、避难中 | DV センター + 弁護士 + 行政書士 | 安全优先，当日 |
| 补材料期限已过或 7 日内、核心材料缺失 | 行政書士/入管窗口 | 当日 |

## 4. Special Review

### 4.1 経営・管理 2025

DOMAIN 判断：

- `keiei-kanri-2025-10` 可引用为 human-reviewed 的改革框架，但必须与用户场景匹配。
- `keiei-kanri-existing-holder-update` 可引用既存者过渡事实，但不得把过渡期说成许可保证。
- `keiei-kanri-capital-asset-3000man-criterion` 只能 guardrail，不得单独进入正面 eligibility answer。
- `startup-visa-keiei-transition` 仍是 deep-water，不得正面注入。
- knowledge-atlas 的 G57/G103 已 quarantine，不能 wholesale 正面使用。

允许正面说的范围：

- 2025-10-16 后普通新规/变更不能按旧 500 万即可理解。
- 经营管理新规不只看资本，还涉及常勤员工、申请人背景、日语、事务所、事业实态等。
- 既存持有人更新与新申请不是同一路线，过渡期间需看经营状况和改善见通し。

必须 guardrail 的范围：

- 500 万是否仍有个别历史/过渡意义；
- 3000 万资产如何计算；
- 常勤员工身份是否可计入；
- 1 名和 2 名常勤的旧新规则混用；
- 2028-10-16 前后更新策略；
- 特定活动 44/51 或 startup visa 的转换；
- HSP1ハ/HSP2/PR shortcut 与经营管理改正的联动。

### 4.2 特例期间出国

可正面引用：

- 在留期限内提交更新/变更后，若期限前未处分，特例期间至处分日或满了日后 2 个月中较早者。
- 特例期间中原则上只能继续従前活动。
- 不许可处分下达时特例期间结束。

只能 deep-water：

- 特例期间中出国是否导致特例结束或再入国失败；
- PR pending 是否保护当前在留；
- 已在海外收到不许可；
- 原期限已过、特例终点临近或已过；
- みなし再入国与特例期间叠加。

### 4.3 HSP1 机构变更

首批只做 negative guardrail：

- block “点数 + 14 日届出 = 新机构许可”；
- block “同岗位不用变更”；
- block “受理/明信片/審査完了 = 可开工”。

不得让卡片判断哪些 onboarding、training、remote work 是安全的。该部分仍是 DOMAIN route-map gap。

### 4.4 配偶 / DV

可正面引用：

- 离婚/死别后 14 日届出义务。
- 6 个月以上没有配偶者活动可能成为取消事由。
- 取消前有意见听取等程序，不是离婚当天自动失效。

只能 deep-water：

- 定住者路线是否可行；
- 别居是否构成“正当理由”或婚姻实态不足；
- DV 替代材料、地址保密效果、是否联系配偶；
- 再婚后是否能沿用原资格；
- 配偶者签、家族滞在、孩子身份混合情形。

DV 回答顺序必须是安全与地址暴露风险优先，然后官方/支援窗口，之后才是入管事实包。

### 4.5 不许可后

可正面引用：

- 收到不许可通知后要确认通知书标题、受领日、期限、申请类型、原在留期限。
- 审查请求可能有 3 个月窗口，但个案策略不得由 AI 判断。
- 期限内自主出国本身通常不应被说成“必然 5 年上陆拒否”。

只能 deep-water：

- 是否出国；
- 是否审查请求或再申请；
- 出国后是否影响再来日；
- 已过期限、不法滞在、不法就労、退去强制疑虑；
- 通知书期限具体天数和行动策略。

## 5. Import Safety Gate

工程导入前安全门：

如果卡或答案满足以下任一条件，绝对不能进入用户端正面结论，只能作为 guardrail、missing-fact extraction、materials checklist、source-only evidence 或 handoff：

1. 引用行来自 `needs_review_flags`、`ai_inferred_fields`、DOMAIN 草稿判断、quarantined card、或空的 `injection_certain_block`。
2. 卡片本身标注 `guardrail_only`、`deep_water_candidate`、`ai_extracted`、`needs_review`、`conflict`、`disabled`、`quarantined`。
3. 答案会判断许可/不许可、胜算、是否安全、是否可以继续工作、是否可以出国、是否会被拒绝入境。
4. 用户缺少日期、通知书标题、申请类型、当前在留期限、当前资格、是否已受理、是否已处分等关键事实。
5. 内容涉及经营管理 2025 改正、特例期间出国、HSP1 机构变更、配偶/DV、不许可后路径、公司清算/休眠、补材料期限、活动范围外就劳。
6. 该行事实的适用范围依赖过渡期、旧新规则、个人身份、员工身份、机构类别、指定书、通知书文字或窗口实务。
7. 模型输出把“handoff trigger”写成“法律后果”，例如把“出国前确认”推成“否则 5 年拒否”。
8. materials 内容可能被读成“材料齐了就会许可”。

一句话原则：

> 宁可不引用卡，也不要把未确认字段、过渡规则、风险提醒、专业确认触发器，包装成用户个案的正面法律或许可结论。

## 6. DOMAIN Recommendation For Batch A

Batch A 建议先导入三类低爆炸半径内容：

1. Positive fact：搬家/地址、基础更新时点、普通材料清单、机关分工、证书定义、低风险程序事实。
2. Guardrail：经营管理 500 万/3000 万误说、HSP1 通知即许可、PR pending 替代更新、材料齐了就许可、不许可后出国重申。
3. Deep-water extraction：不许可通知、特例期间出国、配偶/DV、经营管理既存者过渡、公司休眠/清算、补材料期限。

不建议 Batch A 正面导入：

- startup visa 转经营管理；
- 经营管理 3000 万资产计算；
- HSP1 机构变更的可工作边界；
- DV 替代材料和地址保密效果；
- 不许可后具体出国/审查请求策略；
- 特例期间中出国的安全性判断。

本报告是 DOMAIN Batch A 审查草稿，不是最终法律意见，也不是 production-ready 法务标准。上线前仍需 AQL/QA 通过回放，且高风险命中必须保留 `fact_card_ids`、`injected_fields`、`route_gate_ids`、`guardrail_findings` 审计轨迹。
