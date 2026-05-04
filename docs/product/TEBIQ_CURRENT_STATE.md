# TEBIQ 当前状态

> 短期工程快照。最多 100 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-04 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `1fe6b9e` |
| `main_head_title` | Merge pull request #8 — L0-L2 Launch (DeepSeek + true_focus UI + Matter Draft V0 + V07 VI) |

---

## 当前主线

**Eval-driven 数据闭环。当前不继续盲修用户端回答页。**

流程（见 `TEBIQ_DECISION_LOG.md` DL-001）：

> DeepSeek 裸答 → TEBIQ 当前输出 → DOMAIN / 用户语义标注
> → golden cases / must_have / must_not_have / handoff_trigger / fact_card_candidates
> → 反推 Prompt / QA / 事实卡 / 用户端策略

当前阶段聚焦 **L0（可用回答）+ L1（语义风险识别）** — 以 Eval 数据为前提，不先堆 UI。

---

## 当前 Production 状态

main（`1fe6b9e`）已包含：

- DeepSeek V4 Pro 作为主回答源（3 段式结构：直答 → true_focus → 下一步）
- Matter Draft V0（SaveMatterButton + `/my/matters` 页面）
- V07 Quiet Brow VI（VI tokens 已合入）
- Answer Core 安全外壳（surface safety / sidecar / cross-domain gate）

未在 main：

- Eval Lab V1（PR #9，DB-backed，100 题，env-gated 内部工具）— 未在 main
- Domain 语义复核基础设施（PR #10）
- Product docs Eval-driven 重构（PR #11）
- Context OS / AGENTS.md / 工作流文档（PR #12）

---

## 当前 Active PR

| PR | 标题 | 分支 | 等待 |
|----|------|------|------|
| [#9](https://github.com/martindoad-bit/tebiq/pull/9) | Eval Lab **V1** — DB-backed persistence + 100-question pack（PR title 仍显示 V0，已过期）| `feat/internal-eval-lab` | 用户 preview 验收（EVAL_LAB_ENABLED=1）|
| [#10](https://github.com/martindoad-bit/tebiq/pull/10) | Domain 语义复核基础设施 v0.1 | `claude/magical-poincare-04e7d0` | 用户内容审核 |
| [#11](https://github.com/martindoad-bit/tebiq/pull/11) | Product docs Eval-driven 重构 | `docs/product-strategy-refresh` | 产品负责人 / 用户审核 |
| [#12](https://github.com/martindoad-bit/tebiq/pull/12) | Context OS（本 PR） | `claude/nervous-engelbart-62fd6c` | 产品负责人 / 用户审核 |
| [#4](https://github.com/martindoad-bit/tebiq/pull/4) | answer envelope-first v0.2 | `claude/llm-answer-v0-2-envelope-first` | 产品裁决：继续 or 关闭 |

**注意：PR #11 与 PR #12 均触碰 `docs/product/` 文件，合并顺序需协调。建议先 merge #12，#11 作为后续增量。**

---

## 当前不做的事

- 继续盲修用户端回答页（未有 Eval 数据支撑）
- 在标注数据闭环建立前扩展 Prompt 规则
- 完整后台 / Partner Workspace / AI Control / 原生 App / BI dashboard
- Autonomous agent 架构

---

## 当前阻塞

1. **PR #9（Eval Lab）等待用户 preview 人工验收** → 阻塞标注循环启动
2. **PR #10 / #11 / #12 等待审核** → docs 体系未完整进入 main

---

## 下一步等待谁

| 事项 | 等待 |
|------|------|
| PR #9 merge | 用户：`EVAL_LAB_ENABLED=1` preview 验收 |
| PR #12 merge | 产品负责人 / 用户审核本 PR |
| PR #4 命运 | 产品负责人裁决：关闭 or 激活 |
| 第一批标注 | PR #9 merge 后，用户 + DOMAIN-CC 执行 |

---

## 需要产品负责人裁决的问题

- PR #4（envelope-first）是继续推进还是关闭？
- PR #11 与 PR #12 的合并顺序？
- 第一批 Eval Lab 标注优先哪些题目场景？

---

## Current State 维护规则

**本文件的定位：** 短期工程快照，不是长期策略，不是决策日志。

| 规则 | 说明 |
|------|------|
| 最多 100 行 | 超过即拆分到 Decision Log 或 Context Pack |
| PR merge → 立即更新 | GM 负责；不得等到下次会话 |
| Active PR 变化 → 更新 | 新开 / 关闭 / merge 均需反映 |
| 阻塞变化 → 更新 | 阻塞消除或新增阻塞时更新 |
| 未确认状态 → 写 unknown | 宁可写 unknown，不得推断写错 |
| last_verified > 3 天 | 任何窗口必须标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类 / QA 窗口必须停止，不得继续 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准；要求 GM 更新本文件 |
| 长期原则 / 策略变化 | 不写到本文件 → 写到 `TEBIQ_CONTEXT_PACK.md` |
| 重大决策 | 不写到本文件 → 写到 `TEBIQ_DECISION_LOG.md` |
