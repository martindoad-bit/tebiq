# TEBIQ 当前状态

> 短期工程快照。最多 100 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `5ad36ea` |
| `main_head_title` | feat(eval): Round 1A recovery — health check, phased batch, dry run archive |

---

## 当前主线

**Eval Round 1A Recovery — LLM Health Check + Routing Safety Gate + Phased Rerun**

目标：修复路由 P0 问题，通过 LLM Health Check，完成 Phased Rerun 生成 ≥24 FULL_COMPARABLE 样本，进入 DOMAIN 正式标注。

参见：
- `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` — 30 题选单 + 样本分级定义
- `docs/eval/EVAL_ROUND1A_RECOVERY_PLAN.md` — 恢复路径 + Option B phased batch
- `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` — Routing P0 修复 Work Packet（ENGINE）
- `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` — 7 条 OOS 路由专项分析

---

## 当前 Production 状态

main（`5ad36ea`）已包含：

- Eval Lab V1（DB-backed，100 题，`EVAL_LAB_ENABLED=1` 已启用到 Production）
- DeepSeek V4 Pro 主回答源（3 段式）
- Matter Draft V0
- V07 Quiet Brow VI
- Answer Core 安全外壳
- Context OS + GM 正式试运行组织模式

Production URL：`https://tebiq.jp`（Vercel 部署 `5ad36ea`）

---

## Eval Round 1A 进度

### Technical Dry Run 记录（已归档）

| 字段 | 值 |
|------|-----|
| `batch_id` | `round1-20260504-231231` |
| `formal_product_eval` | `not_started` |
| `TEBIQ channel` | 30/30 returned |
| `DeepSeek raw` | 0/30 |
| `FULL_COMPARABLE` | 0 |
| `TEBIQ_ONLY_TECH_SAMPLE` | 30 |
| `TEBIQ fallback=llm_timeout` | 17/30 |
| `TEBIQ out_of_scope` | 7/30 |

**归档理由**：DeepSeek raw 全部失败（payload bug 已修复，但底层原因为 API timeout）；TEBIQ 17/30 走 llm_timeout 降级路径，不代表真实 LLM pipeline 输出。此批数据不交给 DOMAIN 做正式标注。

注：7 条 out_of_scope 样本（D05/D06/D09/I08/J03/J04/J08）已单独记录，待 DOMAIN 做路由专项分析（见 `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md`）。

### 当前执行状态

| 步骤 | 状态 | 说明 |
|------|------|------|
| PR #9 merge | ✅ 完成（398d55e） | 2026-05-04 13:58 JST |
| EVAL_LAB_ENABLED → Production | ✅ 完成 | Vercel env 已设置；c39a4e3 触发重部署 |
| Production 部署就绪 | ✅ 完成 | — |
| Batch script payload 修复 | ✅ 完成 | `question` 字段已补入 DeepSeek payload |
| Technical Dry Run 归档 | ✅ 完成 | round1-20260504-231231 |
| PR #16 merge | ✅ 完成（5ad36ea） | 2026-05-05 health-check + phased-batch + dry run archive |
| Routing Safety Gate Work Packet | ✅ 完成 | `EVAL_ROUTING_SAFETY_GATE_PACK.md` + Issue（ENGINE 待实现）|
| LLM Health Check | ⏳ 等待 DeepSeek API 恢复 | `health-check.sh` 就绪，需 5/5 pass |
| Routing regression set | ⏳ 等待 ENGINE 实现 R01-R05 | 7 条 OOS 不再路由失败才可进入 Phased Rerun |
| Formal Round 1A Phased Rerun | ⏳ 等待 Health Check + Routing gate | `run-round1-phased.sh`（6 步流程）就绪 |
| DOMAIN 标注 | ⏳ 等待 FULL_COMPARABLE ≥ 24 | — |
| Round 1A 决策包 | ⏳ 等待标注完成 | — |

---

## DOMAIN v0.1 状态说明

PR #10（Domain 语义复核基础设施）的任何输出目前为：

**Pre-Eval Hypothesis Pack（预标注假设包）**，不是 Round 1A 正式结论。

用途：指导标注重点 / P0 观察清单 / must_have 候选 / handoff_trigger 候选。

不可直接触发：生产 Prompt 修改 / 用户端改版 / QA Gates 更新 / Fact Cards 上线。

**当前约束**：DOMAIN 正式标注任务（`EVAL_ROUND1A_DOMAIN_WORK_PACKET.md`）尚未激活。
激活前提：Health Check 3/3 pass + Formal Round 1A 生成完成 + ≥24 FULL_COMPARABLE 确认。

---

## 当前 Active PR / Branch

| PR / Branch | 状态 | 等待 |
|----|------|------|
| [#16](https://github.com/martindoad-bit/tebiq/pull/16) | ✅ merged（5ad36ea） | — |
| `claude/eval-routing-gate` | Routing Safety Gate + sample 分类更新 + phased script v2 | PR + merge |
| [#10](https://github.com/martindoad-bit/tebiq/pull/10) | Domain 语义复核基础设施 v0.1 | 等 Formal Round 1A 完成后激活 |
| [#11](https://github.com/martindoad-bit/tebiq/pull/11) | Product docs 增量（暂不 merge）| 产品负责人裁决：close or 提取小 patch |
| [#4](https://github.com/martindoad-bit/tebiq/pull/4) | answer envelope-first v0.2（暂停）| 产品裁决：后续检查是否 stale |

---

## 当前不做的事

- 盲修用户端回答页（无 Eval 数据支撑）
- 在标注数据闭环建立前调 Prompt
- 完整后台 / Partner Workspace / 原生 App / BI dashboard
- Autonomous agent 架构

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
