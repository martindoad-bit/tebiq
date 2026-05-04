# TEBIQ 当前状态

> 短期工程快照。最多 100 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-04 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `c83093f` |
| `main_head_title` | docs(ops): GM 正式试运行组织模式 — 任务出口规则、Work Packet 格式、反馈汇总格式 |

---

## 当前主线

**Eval-driven 数据闭环。当前不继续盲修用户端回答页。**

> DeepSeek 裸答 → TEBIQ 当前输出 → DOMAIN / 用户语义标注
> → golden cases / must_have / must_not_have / handoff_trigger / fact_card_candidates
> → 反推 Prompt / QA / 事实卡 / 用户端策略

当前阶段聚焦 **L0（可用回答）+ L1（语义风险识别）** — 以 Eval 数据为前提，不先堆 UI。

---

## 当前 Production 状态

main（`9571fda`）已包含：

- DeepSeek V4 Pro 主回答源（3 段式）
- Matter Draft V0（SaveMatterButton + `/my/matters`）
- V07 Quiet Brow VI
- Answer Core 安全外壳
- Context OS（AGENTS.md / 工作流 / GM Operating Principles / 产品文档重构 / templates）

未在 main：

- Eval Lab V1（PR #9，DB-backed，100 题，env-gated）
- Domain 语义复核基础设施（PR #10）
- Product docs 增量重构（PR #11，暂不 merge，待 diff 评估）

---

## 当前 Active PR

| PR | 状态 | 等待 |
|----|------|------|
| [#9](https://github.com/martindoad-bit/tebiq/pull/9) | Eval Lab V1（PR title 已过期显示 V0）| 用户 preview 验收（`EVAL_LAB_ENABLED=1`）|
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

1. **PR #9（Eval Lab V1）等待用户 preview 人工验收** → 阻塞标注循环启动

---

## 下一步等待谁

| 事项 | 等待 |
|------|------|
| PR #9 merge | 用户：`EVAL_LAB_ENABLED=1` preview 验收 |
| PR #11 处置 | 产品负责人：diff 对比 #12 后 close or 提取 patch |
| PR #4 处置 | 产品负责人：是否 stale，close or 激活 |
| 第一批标注 | PR #9 merge 后，用户 + DOMAIN-CC 执行 |

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
