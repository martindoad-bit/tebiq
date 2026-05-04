# TEBIQ 当前状态

> 短期工程快照。最多 150 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `ec8ad27` |
| `main_head_title` | feat(domain): semantic review infrastructure v0.1 + 100Q risk map |

---

## 当前阶段标签

**Multi-Track Parallel Mode v0.2 — M1 Internal Console Alpha**

规则：单线阻塞不等于全项目阻塞。6 track 独立推进。

---

## 6 Track 状态总览

| Track | 名称 | 状态 | 阻塞 |
|-------|------|------|------|
| **A** | Answer Quality / Eval Round 1A | 🔴 Blocked | DeepSeek API timeout + Routing fix |
| **B** | Internal Console / 100Q 可視化 | 🟡 Active | **最优先** — ENGINE Issue #19 |
| **C** | Routing Safety Gate (R01–R05) | 🟡 Active | ENGINE Issue #18 |
| **D** | User Preview / Matter Draft | ⏸ Standby | M1 完成後啟動 |
| **E** | DOMAIN Assets / 100Q Risk Map | 🟡 Active | 不等 FULL_COMPARABLE |
| **F** | Ops / Release Readiness | 🟡 Active | 按里程碑推進 |

```
哪条 track 在动：    B（Internal Console, ENGINE Issue #19）+ C（Routing fix, Issue #18）+ E（DOMAIN 100Q 风险图谱）
哪条 track blocked： A（DeepSeek API timeout + R01-R05 pending）
CEO 当前能看到什么：  https://tebiq.jp + /internal/eval-lab（100 题种子）
                    目标：CEO 能打开 Internal Console，看见 100 问和每题状态
下一步谁自主推进：   ENGINE → Issue #19（最優先）→ Issue #18 完成後 DOMAIN Track E Phase 2
```

---

## Track B — Internal Console（最優先）

| 任务 | 状态 | 说明 |
|------|------|------|
| Work Packet 发布 | ✅ 完成 | `docs/eval/EVAL_INTERNAL_CONSOLE_PACK.md` |
| Issue #19 创建 | ✅ 完成 | ENGINE 待实现 |
| `/internal/eval-console` 实现 | ⏳ ENGINE | 100 题可视化 + 分级标签 + 重跑按钮 |

## Track C — Routing Safety Gate

| 任务 | 状态 | 说明 |
|------|------|------|
| Work Packet 发布 | ✅ 完成 | `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` |
| Issue #18 创建 | ✅ 完成 | ENGINE 待实现 |
| R01–R05 实现 | ⏳ ENGINE | P0: R01/R02/R03/R04；P1: R05（I08 按 P0）|
| 7/7 回归测试通过 | ⏳ 等待 ENGINE | Step 1 of `run-round1-phased.sh` |

## Track A — Eval Round 1A（阻塞中）

| 任务 | 状态 | 说明 |
|------|------|------|
| LLM Health Check | ⏳ 等待 DeepSeek API 恢复 | `health-check.sh` 就绪 |
| Formal Round 1A Phased Rerun | ⏳ 等待 Health Check + Routing Gate | `run-round1-phased.sh`（6 步）就绪 |
| DOMAIN 正式标注 | ⏳ 等待 FULL_COMPARABLE ≥ 24 | Work Packet 已就绪但未激活 |
| Round 1A 决策包 | ⏳ 等待标注完成 | — |

参见：
- `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` — 30 题选单 + 样本分级 v0.3
- `docs/eval/EVAL_ROUND1A_RECOVERY_PLAN.md` — 恢复路径（Option B 推荐）
- `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` — R01–R05 Work Packet（Issue #18）
- `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` — 7 条 OOS 路由专项

## Track E — DOMAIN Assets（Phase 1 完成）

| 任务 | 状态 | 说明 |
|------|------|------|
| 100Q 风险图谱 Work Packet | ✅ 完成 | `docs/eval/EVAL_DOMAIN_100Q_PACK.md` |
| TEBIQ_100Q_RISK_MAP.md | ✅ 完成（`ec8ad27`）| P0×20 / P1×60 / P2×20 + 20 P0 详案卡 + 10 高风险场景库 |
| 7条 OOS routing regression 关联表 | ✅ 完成 | docs/domain/ 内，draft |
| PR #10 merge | ✅ 完成（`ec8ad27`）| — |
| Phase 2：7条 routing 回归语义复核 | ⏳ 等待 ENGINE Issue #18 完成 | GM 提供回归数据后 DOMAIN 执行 |

---

## 里程碑状态

| 里程碑 | 名称 | 状态 |
|--------|------|------|
| M0 | 项目规则重置 + 并行模式启动 | ✅ 完成 |
| M1 | Internal Console Alpha（CEO 可見 100 題）| ⏳ ENGINE |
| M2 | Routing Safety Gate（7/7 回归通过）| ⏳ ENGINE |
| M3 | Answer Quality Baseline（≥24 FULL_COMPARABLE）| ⏳ 等待 |
| M4 | User Preview Alpha（CEO 可操作）| ⏳ M1 后 |
| M5 | Matter v0（风险评估 + 行动路径）| ⏳ M3 后 |
| M6 | Private Beta Readiness | ⏳ M2+M4 |
| M7 | Public Soft Launch | ⏳ M5+M6 |

详见 `docs/ops/TEBIQ_PROJECT_MILESTONES.md`。

---

## 当前 Production 状态

main（`572b0e3`）已包含：

- Eval Lab V1（DB-backed，100 题，`EVAL_LAB_ENABLED=1` 已启用到 Production）
- DeepSeek V4 Pro 主回答源（3 段式）
- Matter Draft V0
- V07 Quiet Brow VI
- Answer Core 安全外壳
- Context OS + GM 正式试运行组织模式

Production URL：`https://tebiq.jp`（Vercel 部署 `572b0e3`）

---

## Eval Round 1A — Technical Dry Run 记录（已归档）

| 字段 | 值 |
|------|-----|
| `batch_id` | `round1-20260504-231231` |
| `TEBIQ channel` | 30/30 returned |
| `DeepSeek raw` | 0/30 |
| `FULL_COMPARABLE` | 0 |
| `TEBIQ fallback=llm_timeout` | 17/30 |
| `TEBIQ out_of_scope` | 7/30 |

**归档理由**：DeepSeek raw 全部失败（payload bug 已修复，但底层原因为 API timeout）；TEBIQ 17/30 走 llm_timeout 降级路径，不代表真实 LLM pipeline 输出。此批数据不交给 DOMAIN 做正式标注。

---

## 当前 Active PR / Branch

| PR / Branch | 状态 | 等待 |
|----|------|------|
| [#19](https://github.com/martindoad-bit/tebiq/issues/19) | 🟡 ENGINE: Internal Console v1（**最優先**）| 100 题可视化 + 重跑按钮 |
| [#18](https://github.com/martindoad-bit/tebiq/issues/18) | 🔴 ENGINE: R01–R05 routing fix | 7/7 regression pass → Phased Rerun unlock |
| [#10](https://github.com/martindoad-bit/tebiq/pull/10) | ✅ merged（`ec8ad27`）| Track E Phase 1 完成 |
| [#11](https://github.com/martindoad-bit/tebiq/pull/11) | Product docs 增量（暂不 merge）| 产品负责人裁决：close or 提取小 patch |
| [#4](https://github.com/martindoad-bit/tebiq/pull/4) | answer envelope-first v0.2（暂停）| 产品裁决：后续检查是否 stale |

---

## 当前不做的事

- 盲修用户端回答页（无 Eval 数据支撑）
- 在标注数据闭环建立前调 Prompt
- 完整后台 / Partner Workspace / 原生 App / BI dashboard
- Autonomous agent 架构
- Track D（User Preview）在 M1 前动工

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
