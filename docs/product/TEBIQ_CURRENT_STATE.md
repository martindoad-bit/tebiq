# TEBIQ 当前状态

> 短期工程快照。最多 100 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-04 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `444ca4a` |
| `main_head_title` | docs(state): main_head → c83093f (GM org mode rules) |

---

## 当前主线

**Eval-driven 数据闭环。当前不继续盲修用户端回答页。**

> DeepSeek 裸答 → TEBIQ 当前输出 → DOMAIN / 用户语义标注
> → golden cases / must_have / must_not_have / handoff_trigger / fact_card_candidates
> → 反推 Prompt / QA / 事实卡 / 用户端策略

**当前阶段任务：Eval Round 1 — Answer Quality Baseline v0.1**

目标：生成 30 题可比较样本（DeepSeek raw + TEBIQ output），完成首轮标注，产出决策包。
参见：`docs/eval/EVAL_ROUND1_SAMPLE_PACK.md`、`docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md`

---

## 当前 Production 状态

main（`444ca4a`）已包含：

- DeepSeek V4 Pro 主回答源（3 段式）
- Matter Draft V0（SaveMatterButton + `/my/matters`）
- V07 Quiet Brow VI
- Answer Core 安全外壳
- Context OS（AGENTS.md / 工作流 / GM Operating Principles / 产品文档重构 / templates）
- GM 正式试运行组织模式（任务出口规则 / Work Packet 格式 / 反馈汇总格式）

未在 main：

- Eval Lab V1（PR #9，DB-backed，100 题，env-gated）— P1 已修复，待用户 preview 验收
- Domain 语义复核基础设施（PR #10）
- Product docs 增量重构（PR #11，暂不 merge，待 diff 评估）

---

## Eval Round 1 进度

| 步骤 | 状态 | 阻塞 |
|------|------|------|
| PR #9 P1 修复 | ✅ 完成（8cebfe3） | — |
| QA 复测（小批 3 题） | ✅ PASS | — |
| 30 题样本包组织 | ✅ 完成（docs/eval/） | — |
| PR #9 merge | ⏳ 等待 | 用户 preview 验收（EVAL_LAB_ENABLED=1）|
| 30 题 TEBIQ 通道生成 | ⏳ 等待 | PR #9 merge |
| 30 题 DeepSeek 通道生成 | ⏳ 等待 | PR #9 merge + DeepSeek API 恢复 |
| DOMAIN / 用户标注 | ⏳ 等待 | 双通道生成完成 |
| Round 1 决策包 | ⏳ 等待 | 标注完成 |

DeepSeek API 状态：2026-05-04 QA 时出现 transient 504，属上游问题。  
TEBIQ 通道独立可用，可先生成后等 DeepSeek 补跑。

---

## 当前 Active PR

| PR | 状态 | 等待 |
|----|------|------|
| [#9](https://github.com/martindoad-bit/tebiq/pull/9) | Eval Lab V1（P1 已修复）| 用户 preview 验收（`EVAL_LAB_ENABLED=1`）|
| [#10](https://github.com/martindoad-bit/tebiq/pull/10) | Domain 语义复核基础设施 v0.1 | 用户内容审核 |
| [#11](https://github.com/martindoad-bit/tebiq/pull/11) | Product docs 增量（暂不 merge）| 产品负责人裁决：diff 对比后 close or 提取小 patch |
| [#4](https://github.com/martindoad-bit/tebiq/pull/4) | answer envelope-first v0.2（暂停）| 产品裁决：后续检查是否 stale |

---

## 当前不做的事

- 继续盲修用户端回答页（未有 Eval 数据支撑）
- 在标注数据闭环建立前扩展 Prompt 规则
- 完整后台 / Partner Workspace / AI Control / 原生 App / BI dashboard
- Autonomous agent 架构

---

## 当前阻塞

1. **PR #9（Eval Lab V1）等待用户 preview 人工验收** → 解除后 Eval Round 1 可立即开始

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
