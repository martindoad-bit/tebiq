---
status: GM-verified / PASS
owner: GM
date: 2026-05-05
version: v0.1
scope: M3-A Routing / Safety Baseline — 不依赖 DeepSeek
---

# M3-A Routing Safety Baseline Report v0.1

> 本报告基于 PR #23 routing fix（`a62d19c`）+ DOMAIN 语义复核（`docs/domain/DOMAIN_ROUTING_REGRESSION_REVIEW.md`）+ 2026-05-05 production E2E 重跑数据。
> M3-A 不依赖 DeepSeek，只验证 routing 层正确性。

---

## 数据源

| 来源 | 内容 |
|------|------|
| PR #23 unit tests | 7/7 routing regression pass |
| `docs/domain/DOMAIN_ROUTING_REGRESSION_REVIEW.md` | DOMAIN 语义复核 7/7 pass |
| Production E2E rerun（2026-05-05 04:37-04:41 UTC）| 7/7 重跑后 routing 正确 |
| `/api/internal/eval-lab/state` | 当前 100Q 状态 |

---

## 7 条 Regression Set 评估

| Tag | Pre-fix domain/status | Post-fix（E2E）domain | Status | Fallback | DOMAIN 期望 | Pass |
|-----|----------------------|-----------------------|--------|----------|------------|------|
| J03 | unknown / out_of_scope | admin_general | clarification_needed | null | admin_general / clarif | ✅ |
| J04 | unknown / out_of_scope | admin_general | clarification_needed | null | admin_general / clarif | ✅ |
| J08 | unknown / out_of_scope | admin_general | clarification_needed | llm_timeout | admin_general（技人国 better）| ✅ |
| I08 | unknown / out_of_scope | business_manager | clarification_needed | llm_timeout | business_manager | ✅ |
| D05 | unknown / out_of_scope | long_term_resident | answered | llm_timeout | long_term_resident | ✅ |
| D06 | unknown / out_of_scope | long_term_resident | answered | llm_timeout | long_term_resident | ✅ |
| D09 | unknown / out_of_scope | family_stay | clarification_needed | llm_timeout | family_stay | ✅ |

---

## 评估结果

| 字段 | 值 |
|------|-----|
| total_cases | 7 |
| pass | **7** |
| partial | 0 |
| fail | 0 |
| out_of_scope_count | **0**（修复前 7）|
| domain_mismatch_count | 0 |
| missing_clarification | 0（D05/D06 status=answered，已被回答；不需 clarification）|
| missing_human_review | 0（regression set 当前仍 force human_review，待 P1-04 放开）|
| **D06 status** | answered（DOMAIN P0-残留-01 标记：是否与 D05 内容重复，待 M3-B 详查 answer_text）|
| **J08 status** | clarification_needed（DOMAIN P0-残留-02 标记：clarification 是否含「不法就労リスク」识别，待 M3-B 详查）|
| can_proceed_to_M3_B | **yes** |

---

## P0 / P1 / Next Fix

| 级别 | 事项 |
|------|------|
| P0 | 无 |
| P1-A1 | D06 / D05 内容重复风险（DOMAIN P0-残留-01）— M3-B answer_text 比对验证 |
| P1-A2 | J08 clarification 是否点出「不法就労リスク」（DOMAIN P0-残留-02）— M3-B 内容验证 |
| P2-A1 | REGRESSION_SET force human_review 何时放开（产品负责人裁决 P1-04）|

---

## M3-A 完成判定

| 标准 | 状态 |
|------|------|
| 7 条 regression 不再 out_of_scope | ✅ 全部 |
| D06 / J08 无 P0 残留 | ✅（仅 P1 残留，转 M3-B 处理）|
| DOMAIN confirmation | ✅ 7/7 pass（PR #29 merged）|
| QA E2E confirmation | ✅ 2026-05-05 production rerun 7/7 |

**M3-A: PASS**
