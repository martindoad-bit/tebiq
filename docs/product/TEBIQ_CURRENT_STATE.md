# TEBIQ 当前状态

> 短期工程快照。最多 150 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `501c147` |
| `main_head_title` | Merge PR #33 SSE Phase 2 + PR #29 DOMAIN Phase 3 + eval-console camelCase fix |

---

## 当前阶段标签

**Project State Stabilization Sprint v0.1 完成 — M1 ✅ M2 ✅ M4-Phase1 ✅ → M3-A/B 可推进，M3-C 等 DS batch**

规则：单线阻塞不等于全项目阻塞。6 track 独立推进。

---

## 6 Track 状态总览

| Track | 名称 | 状态 | 阻塞 |
|-------|------|------|------|
| **A** | Answer Quality / Eval | 🟡 M3-A/B 可推进 | M3-C：DS fast(25s) down；batch(90s) ✅ |
| **B** | Internal Console | ✅ 稳定 | M1 CEO 验收 2026-05-05 |
| **C** | Routing Safety Gate | ✅ 完成 | R01-R05 ✅ DOMAIN 复核 ✅ |
| **D** | User Preview | ✅ Phase 1+2 上线 | PR #33 SSE merged `501c147` |
| **E** | DOMAIN Assets | ✅ Phase 1+2+3 in main | PR #29 merged `f41618c` |
| **F** | Ops / Release Readiness | 🟡 Internal Alpha 稳定 | 不进 production（QA 未完整补位） |

```
哪条 track 在动：    A（M3-A/B 可开始）+ F（QA 补位 Issue #13）
哪条 track blocked： A-M3-C（DS fast timeout）
CEO 当前能看到什么：  /internal/eval-console（100题 ✅）+ /internal/eval-lab（标注）
                    + /internal/preview（SSE Phase 2 ✅）
下一步 GM 自主推进：  Issue #13 QA audit 激活；M3-A/B 启动；DS batch 健康检查
```

---

## Track B — Internal Console ✅

| 任务 | 状态 | 说明 |
|------|------|------|
| `/internal/eval-console` | ✅ CEO 验收（2026-05-05）| 100 题 + stats + provider health |
| camelCase fix | ✅ `469e2ea` | Drizzle→snake_case 映射修复 |

## Track C — Routing Safety Gate ✅

| 任务 | 状态 | 说明 |
|------|------|------|
| R01–R05 实现 | ✅ PR #23 `a62d19c` | 7/7 pass |
| DOMAIN 语义复核 | ✅ PR #29 `f41618c` | 7/7 pass，DOMAIN_ROUTING_REGRESSION_REVIEW.md |

## Track D — User Preview ✅ Phase 1+2

| 任务 | 状态 | 说明 |
|------|------|------|
| Phase 1 Stage Feedback | ✅ PR #30 `e9c49c6` | received→routing→generating→final |
| Phase 2 SSE | ✅ PR #33 `501c147` | 11 events + gating + fallback |

## Track E — DOMAIN Assets ✅

| 任务 | 状态 | 说明 |
|------|------|------|
| Phase 1（100Q Risk Map）| ✅ PR #10 + #25 | docs/domain/ 9 文件 |
| Phase 2（routing 复核）| ✅ PR #29 | 7/7 pass |
| Phase 3（semantic interface）| ✅ PR #29 `f41618c` | 7 new files in docs/domain/ |

## Track A — Eval / M3（重新分层）

| 层级 | 名称 | 状态 | 依赖 |
|------|------|------|------|
| M3-A | Routing / Safety Baseline | 🟢 可推进 | 无 DS 依赖 |
| M3-B | TEBIQ Self-output Baseline | 🟢 可推进 | 37 答案可用（31 fallback + 6 full）|
| M3-C | DeepSeek Comparison Baseline | 🟡 等 batch | DS batch(90s) ✅；需调高 eval 超时 |

---

## 里程碑状态

| 里程碑 | 名称 | 状态 |
|--------|------|------|
| M0 | 项目规则重置 + 并行模式启动 | ✅ 完成 |
| M1 | Internal Console Alpha | ✅ CEO 验收 2026-05-05 |
| M2 | Routing Safety Gate（7/7）| ✅ 完成 + DOMAIN 复核 ✅ |
| M3-A | Routing / Safety Baseline | 🟢 可推进 |
| M3-B | TEBIQ Self-output Baseline | 🟢 可推进 |
| M3-C | DeepSeek Comparison Baseline | 🟡 DS batch(90s) 可用 |
| M4 | User Preview Alpha（Phase 1+2）| ✅ Phase 1+2 完成 |
| M5 | Matter v0 | ⏳ 等 M3 结论 |
| M6 | Private Beta Readiness | ⏳ M2+M4 ✅，等 QA 补位 |
| M7 | Public Soft Launch | ⏳ M5+M6 |

---

## 当前 Active PR / Branch

| PR / Branch | 状态 | 等待 |
|----|------|------|
| 无 open PR | — | — |

已关闭：PR #4（stale）、PR #11（stale）、PR #31（VOICE 命名冲突，main canonical）

---

## 当前 Production 状态

main（`501c147`）已包含：

- Eval Console M1（EVAL_LAB_ENABLED=1 已设置）
- Eval Lab 标注工具
- User Preview SSE Phase 2（11 events）
- Routing Safety Gate v1（R01-R05）
- DeepSeek V4 Pro 主回答源（需 90s+ timeout for batch）
- DOMAIN Phase 3 semantic interface assets
- VOICE System v0.1（14 TEBIQ_*.md canonical files）

---

## 待产品负责人裁决

| 事项 | 优先级 |
|------|--------|
| VOICE gap：INDEX + HUMAN_REVIEW_TRIGGER_LIBRARY 是否提取入 main | P1 |
| REGRESSION_SET force human_review 何时放开 | P1 |
| Issue #13 QA audit 是否激活 | P1 |
| M3-B 启动标准（GM 自主 or 需 PL 裁决）| P1 |
| DS batch timeout 调整（25s → 90s for eval routes）| P1 |

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
