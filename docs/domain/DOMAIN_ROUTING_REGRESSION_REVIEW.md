# DOMAIN Routing Regression 语义复核 v0.1

> **状態**：draft / needs GM review
> **版本**：v0.1（2026-05-05，DOMAIN-CC）
> **来源**：PR #23 routing fix 后的 domain 值 + round1-20260504-231231 dry run 数据
> **任务依据**：`docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md`
>
> DOMAIN 只做语义判断，不做技术实现判断。
> 所有结论为草稿，以 FULL_COMPARABLE 实际输出为准。

---

## 数据基准说明

| 数据源 | 内容 | 状态 |
|---|---|---|
| round1-20260504-231231 | 修复前 7 题的 status/domain/understood_question | ✅ 已读 |
| PR #23 回报 | 修复后 7 题的 domain 值（unit test 结果）| ✅ 已读 |
| 实际 E2E 输出（status / visible_text） | 需 Vercel Preview + EVAL_LAB_ENABLED=1 | ❌ 未获得 |

**注**：本复核基于 PR #23 报告的 domain 值做语义判断。status（`clarification_needed` / `preliminary`）的最终确认依赖 E2E 运行，DOMAIN 以 unit test 结果为基础做合理性评估。

---

## 7 条 Routing Regression 语义复核

---

### J03 — 我签证快到期了，但材料还没准备好怎么办？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed）|
| domain | unknown | **admin_general** |
| understood_question（修复前）| 「从「签证即将到期，材料未准备完成」转为「完成续签或延期，合法居留状态」需要满足什么条件」| — |

**DOMAIN 语义判断**：

- **domain = `admin_general` 是否合理**：✅ **合理**。题目未明示在留资格类型，`admin_general` 是正确的兜底域。理想状态下若用户补充了资格类型应推进到具体 domain，但初步识别 `admin_general` 可接受。
- **understood_question 方向（修复前）**：部分正确。正确识别了「期限 + 更新未完成」的核心场景，但缺少对「申请中 vs 未申请」的识别——这是 J03 最关键的分岔点（申请中 → 特例期间适用；未申请 → 紧急）。这属于 LLM 输出质量问题，超出 routing 层修复范围。
- **是否应为 out_of_scope**：❌ **否**。签证期限临近 + 材料未备是 TEBIQ 核心覆盖场景（R01 明确保护类型）。不应 out_of_scope。
- **Pass standard 达成**：domain ≠ unknown ✅；预期 status = clarification_needed ✅（待 E2E 确认）

**残留风险**（routing 层外）：understood_question 在正式输出中是否能区分「申请中」vs「未申请」，待 FULL_COMPARABLE 后验证。

---

### J04 — 我被公司解雇了，在留怎么办？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed）|
| domain | unknown | **admin_general** |
| understood_question（修复前）| 「我被公司解雇了，在留怎么办？」（原文直译）| — |

**DOMAIN 语义判断**：

- **domain = `admin_general` 是否合理**：✅ **合理**。解雇题理想应推断为技人国/人文域（最常见情形），但因题目未明示资格类型，`admin_general` 是正确的兜底选择。
- **understood_question 方向（修复前）**：⚠️ **有明显改善空间**。修复前 understood_question 是原文直译，未转化为 TEBIQ 视角。期望的 TEBIQ 语义应识别：「解雇 → 在留活动中断风险 → 技人国 3ヶ月ルール / 14日届出义务 / 次のステップ」。这是 LLM 输出质量问题，routing 层无法独立解决。
- **是否应为 out_of_scope**：❌ **否**。解雇 + 在留处理是 TEBIQ 核心场景（R04 明确覆盖），且属于 HIGH 风险（活动中断 + 届出义务）。
- **Pass standard 达成**：domain ≠ unknown ✅；预期 status = clarification_needed ✅（待 E2E）

**残留风险**：正式输出中的 clarification 问题是否包含「在留资格类型」和「离职日期」的确认，待 FULL_COMPARABLE 验证。

---

### J08 — 我的在留资格和现在实际工作不一致怎么办？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed 或 preliminary）|
| domain | unknown | **admin_general** |
| understood_question（修复前）| 「我的在留资格和现在实际工作不一致怎么办？」（原文直译）| — |

**DOMAIN 语义判断**：

- **domain = `admin_general` 是否合理**：✅ **合理，但有更精准选项**。在留资格与就労不一致是技人国/人文的核心风险场景，`技人国` domain 更精准。但在题目未明示资格类型的情况下，`admin_general` 可接受。
- **understood_question 方向（修复前）**：⚠️ **原文直译，未发现隐藏风险**。TEBIQ 期望的语义应识别：「在留与就労不一致 → 不法就労リスク（刑事罰）→ 業務内容確認が必要」。understood_question 停留在表面问题，没有推进到风险核心。这是 LLM 输出质量问题。
- **是否应为 out_of_scope**：❌ **否**。在留与实际业务不一致是最高级别的不法就労风险，TEBIQ 必须接住（R04 核心场景）。
- **Pass standard 达成**：domain ≠ unknown ✅；预期 status = clarification_needed/preliminary ✅（待 E2E）

**残留风险（高优先）**：J08 的 understood_question 在正式输出中是否包含「活動範囲外の不法就労リスク」的识别，这是产品负责人设定的 pass standard 核心。待 FULL_COMPARABLE 优先验证。

---

### I08 — 公司还没清算，我可以直接回国吗？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 preliminary 或 clarification_needed）|
| domain | unknown | **business_manager** |
| understood_question（修复前）| 「从「公司未清算，本人仍在日本」转为「直接回国（离境日本）」需要满足什么条件」| — |

**DOMAIN 语义判断**：

- **domain = `business_manager` 是否合理**：✅ **优秀**。公司清算 + 回国 = 经营管理签证的核心风险场景，`business_manager` 精准识别。R03 期望行为达成。
- **understood_question 方向（修复前）**：✅ **方向基本正确**。「公司未清算 → 回国条件」是正确的场景识别。虽然未直接点出「在留取消リスク」，但场景理解框架是准确的。这是修复前 7 条中 understood_question 质量最好的之一。
- **是否应为 out_of_scope**：❌ **否**。经管签持有者清算未完了回国是 TEBIQ 最高级别风险场景（P0），且是 7 条中产品负责人明确指定为 P0 的案件。
- **Pass standard 达成**：domain = business_manager ✅；预期 status = preliminary（帰国リスク伝達）✅（待 E2E）

**DOMAIN 评分**：I08 是 7 条中 routing 修复效果最完整的一条。domain 精准，场景识别正确，残留风险最低。

---

### D05 — 日本人配偶签离婚后还能留在日本吗？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed）|
| domain | unknown | **long_term_resident** |
| understood_question（修复前）| 「你目前持有「配偶者」，TEBIQ 还需要你告知具体想办的手续」| — |

**DOMAIN 语义判断**：

- **domain = `long_term_resident` 是否合理**：✅ **合理**。配偶者離婚後の変更先としては定住者（長期在留）が最も一般的な経路であり、`long_term_resident` は適切な domain ラベル。身份変更 path として R02 の期待と一致する。
- **understood_question 方向（修复前）**：❌ **方向明显错误**。修复前只识别「持有配偶者签」，完全忽略了「离婚」这个核心风险信号。正确的 understood_question 应识别：「配偶者离婚 → 在留根拠喪失 → 6ヶ月以内の変更申請が必要かどうか」。这是 7 条中 understood_question 问题最严重的案例之一（与 D06 并列）。
- **是否应为 out_of_scope**：❌ **否**。配偶者离婚后的在留变更是 TEBIQ 核心覆盖场景（R02 明确目标，产品负责人 P0 裁决）。
- **Pass standard 达成**：domain ≠ unknown ✅；domain bridged to 定住者方向 ✅；预期 status = clarification_needed ✅（待 E2E）

**残留风险（高优先）**：正式输出中 understood_question 是否能识别「离婚」而非停留在「配偶者签续签」，以及是否引导用户确认「当前在留状況 + 离婚时间点」。这是 pass standard 核心，待 FULL_COMPARABLE 优先验证。

---

### D06 — 配偶签离婚后多久要处理在留问题？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed）|
| domain | unknown | **long_term_resident** |
| understood_question（修复前）| 「你目前持有「配偶者」，TEBIQ 还需要你告知具体想办的手续」（与 D05 完全相同）| — |

**DOMAIN 语义判断**：

- **domain = `long_term_resident` 是否合理**：✅ **合理**（与 D05 同理）。
- **understood_question 方向（修复前）**：❌ **双重问题**：
  1. 与 D05 完全相同的 understood_question → **intent deduplication failure 确认**。D06 的核心 intent 是「いつ（期限）」，D05 是「できるか（可否）」，两者不同但系统给出了相同理解。
  2. 两条都忽视了「离婚」信号，只停留在「持有配偶者签」层面。
- **是否应为 out_of_scope**：❌ **否**。配偶签离婚后的在留期限（6ヶ月）是高风险时限场景（R01 + R02 双重覆盖）。
- **Pass standard 达成（关键）**：产品负责人明确要求 D06 的 understood_question 不得与 D05 相同。Domain 层修复（`long_term_resident`）已达成。但 understood_question 的 intent 分离需要 E2E 确认。

**残留风险（最高优先）**：
- D06 必须在正式输出中体现「6ヶ月期限」方向，而非与 D05 给出相同的「配偶者在留状况确认」。
- 这是产品负责人明确锁定的 pass standard，DOMAIN 将在 FULL_COMPARABLE 后专项验证。

---

### D09 — 家人的在留资格跟我有关，我换签证会影响他们吗？

| 字段 | 修复前 | 修复后（PR #23）|
|---|---|---|
| status | out_of_scope | ⏳ 待 E2E 确认（预期 clarification_needed）|
| domain | unknown | **family_stay** |
| understood_question（修复前）| 「家人的在留资格跟我有关，我换签证会影响他们吗？」（基本原文）| — |

**DOMAIN 语义判断**：

- **domain = `family_stay` 是否合理**：✅ **优秀**。家族の在留资格と主資格の連動を問うシナリオとして `family_stay` は精確。R05 の期待通り（出境/回国 ではなく 家族連帯 の方向で正確に識別）。
- **understood_question 方向（修复前）**：✅ **方向基本正确**。「家人资格跟我有关 → 换签证影响」的场景识别是准确的。虽然未点出「主資格変更による家族滞在への連動リスク」这个具体机制，但问题方向没有偏离。
- **是否应为 out_of_scope**：❌ **否**。家族连带风险是 TEBIQ 核心价值主张（发现用户没问到的隐藏风险）。
- **Pass standard 达成**：domain = family_stay ✅；预期 status = clarification_needed ✅（待 E2E）

**DOMAIN 评分**：D09 是 7 条中 routing 效果第二完整的案例（次于 I08）。domain 精准，场景识别方向正确，残留风险最低。

---

## 综合评定

### DOMAIN 7 条 Routing 语义复核结论

| starter_tag | domain（修复后）| domain 合理性 | understood_question 方向 | 是否应 out_of_scope | 残留风险等级 |
|---|---|---|---|---|---|
| J03 | admin_general | ✅ 合理 | ⚠️ 有改善空间（缺申请状态识别）| ❌ 否 | MEDIUM |
| J04 | admin_general | ✅ 合理 | ⚠️ 原文直译（缺隐藏风险识别）| ❌ 否 | MEDIUM |
| J08 | admin_general | ✅ 合理（技人国更精准）| ⚠️ 原文直译（缺不法就労识别）| ❌ 否 | **HIGH** |
| I08 | business_manager | ✅ **优秀** | ✅ 方向正确 | ❌ 否 | LOW |
| D05 | long_term_resident | ✅ 合理 | ❌ 方向错误（忽视离婚信号）| ❌ 否 | **HIGH** |
| D06 | long_term_resident | ✅ 合理 | ❌ 与 D05 重复（intent dedup failure）| ❌ 否 | **CRITICAL** |
| D09 | family_stay | ✅ **优秀** | ✅ 方向基本正确 | ❌ 否 | LOW |

**DOMAIN 结论：7/7 均不应为 out_of_scope。routing 修复方向正确。**

---

### 残留问题分级（routing 层外，待 FULL_COMPARABLE 验证）

| 优先级 | 问题 | 影响题目 | 涉及层级 |
|---|---|---|---|
| **P0** | D06 的 understood_question 是否仍与 D05 完全相同 | D06 | LLM output 层 |
| **P0** | J08 的正式输出是否识别不法就労风险 | J08 | LLM output 层 |
| P1 | D05 的正式输出是否识别「离婚」并引导确认离婚时间点 | D05 | LLM output 层 |
| P1 | J03 的正式输出是否区分「申请中」vs「未申请」 | J03 | LLM output 层 |
| P1 | J04 的正式输出是否提及活动中断 + 届出义务 | J04 | LLM output 层 |
| P2 | J08 的 domain 是否可精化为技人国（非 admin_general）| J08 | routing 层优化 |

---

### 向产品负责人提请裁决

1. **D06 的 intent 分离**（产品负责人已锁定 pass standard）：正式 E2E 运行后，若 D06 的 understood_question 仍与 D05 相同，是在 routing 层补充 intent 分离逻辑，还是接受 `clarification_needed` 方向相同但 domain/visible_text 内容不同？
2. **J08 的 domain 精化**：`admin_general` → `technical_humanities`（技人国）的精化是否列入 Issue #18 的后续优化，还是等 FULL_COMPARABLE 验证后再处理？

---

## 版本管理

| バージョン | 日付 | 変更内容 |
|---|---|---|
| v0.1 | 2026-05-05 | 初版。PR #23 domain 值的语义复核。draft / needs GM review |

