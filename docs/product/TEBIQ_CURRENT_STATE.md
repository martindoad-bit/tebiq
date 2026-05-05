# TEBIQ 当前状态

> 短期工程快照。最多 150 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` + 用户最新事实 |
| `main_head` | `98474c9` |
| `main_head_title` | Merge PR #36 — M3-C DS batch readiness (timeout 25→90s, scripts, skeleton) |

---

## 当前阶段标签

**Stabilization Sprint v0.3 完成 + QA P0 finding active — Issue #37 P0 hotfix 待 ENGINE 处理**

**关键变化（2026-05-05）**：QA Issue #35 发现 P0 — D05/D06 LLM timeout fallback 命中 `answer-core-v1` legacy matcher 返回不相关内容。M3-A 修订为「routing PASS / content BLOCK」。Production 仍 blocked（DL-009）。

规则：单线阻塞不等于全项目阻塞。6 track 独立推进。

---

## 里程碑状态（v0.2 精确格式）

| Milestone | Status | 备注 |
|-----------|--------|------|
| M0 | accepted | Artifact-first + Context OS |
| M1 Internal Console | **accepted / monitoring** | CEO 验收 2026-05-05；camelCase fix in main |
| M2 Routing Safety | **implemented + semantic draft / E2E PASSED** | code merged (PR #23) + DOMAIN 7/7 ✅ + E2E 7/7 ✅（2026-05-05 rerun）|
| **M3-A** Routing Safety Baseline | **routing PASS / content BLOCK** | 修订：QA #35 + GM 复现 P0；DOMAIN 2 pass + 5 partial 是更准确判定；P0 ticket #37 |
| **M3-B** TEBIQ Self-output Baseline | **PASS（临时标准，scope: VOICE 合规层）** | 报告：`docs/eval/M3B_TEBIQ_SELFOUTPUT_BASELINE_v0.1.md`；P0 #37 修复后需重新评估 |
| **M3-C** DeepSeek Comparison Baseline | **infra ready / 等 P0 #37 修复** | PR #36 merged `98474c9`；DS raw route 已 90s；m3c-phased-run.sh 骨架 ready |
| M4 Phase 1 (Stage Feedback) | **accepted** | PR #30 in main |
| M4 Phase 2 (SSE) | **merged / QA pending** | PR #33 in main `501c147` |
| M5 Matter v0 | ⏳ 等 M3 结论 | — |
| M6 Private Beta Readiness | ⏳ M2+M4 ✅, 等 QA + M3-C | — |
| M7 Public Soft Launch | ⏳ — | — |

---

## VOICE / DOMAIN / QA / DeepSeek 状态（v0.2 格式）

```
VOICE:
  canonical source: docs/voice/TEBIQ_*.md (14 files, commit 02b8e59)
  superseded:       PR #31 closed (DL-008)
  production:       none approved
  delta gaps:       VOICE_SYSTEM_INDEX, HUMAN_REVIEW_TRIGGER_LIBRARY (待裁决)

DOMAIN:
  merged assets:    docs/domain/ 16 files (Phase 1+2+3 in main)
  open assets:      none
  draft status:     all 16 files draft / needs human review
  formal annotation: blocked (awaiting M3-C FULL_COMPARABLE)
  production allowed: no

QA:
  Issue #35 verdict:    BLOCK (P0 active in production)
  M1 Console:           CONDITIONAL PASS (静态 ✅ / browser smoke 待 CEO)
  M4 Preview Phase1+2:  CONDITIONAL PASS (静态 ✅ / SSE EventStream browser 验收 pending)
  Routing E2E:          BLOCK (5/7 pass / 2/7 P0: D05+D06 命中错误 cached answer)
  VOICE Compliance:     BLOCK (S-02 + S-07 fired due to P0 content pollution)
  P0 ticket:            Issue #37 (ENGINE answer-core-v1 fallback hotfix)
  P1 ticket:            VOICE S-07 fallback marker (含在 #37 acceptance §2.3)
  formal report:        docs/qa/QA_STABILIZATION_REPORT_v0.2.md (commit daa7b18)
  Issue #13 audit:      pending (PR #12 Context OS audit 待激活)

DeepSeek:
  fast health (25s):  slow_not_interactive (1/5 ok)
  batch health (90s): healthy_batch (PR #36 merged — DS raw route now 90s)
  UX health:          ✅ preview shows stages
  recommended:        interactive=25s+fallback；batch eval=90s；concurrency=1
  status:             infra-ready, M3-C 阻塞改为「等 P0 #37 修复」（修复前重跑 100Q 仍被 fallback bug 污染）
```

---

## 6 Track 状态总览

| Track | 名称 | 状态 | 阻塞 |
|-------|------|------|------|
| **A** Eval | 🔴 P0 #37 阻塞 M3 升级 | M3-A routing ✅ / content BLOCK | answer-core-v1 fallback hotfix |
| **B** Internal Console | ✅ 稳定 (M1 accepted) | ✅ | — |
| **C** Routing Safety | ✅ routing 层 / 🔴 内容层 P0 | M2 视为「routing implemented + semantic draft」，E2E 待 #37 修复后复跑 | #37 |
| **D** User Preview | ✅ Phase 1+2 in main / browser SSE QA pending | 🟡 | CEO/operator browser smoke |
| **E** DOMAIN | ✅ Phase 1+2+3 in main (16+1 文件 draft) | ✅ | — |
| **F** Ops/Release | 🔴 production blocked | DL-009 + #37 P0 | #37 + 产品负责人裁决 |

---

## 当前 Active PR

| PR | 状态 | 说明 |
|----|------|------|
| 无 open PR | — | 上轮 6 个 open PR：#29 ✅ #33 ✅ #36 ✅ #4 ✗ #11 ✗ #31 ✗ |

## 当前 Active Issues

| Issue | 类型 | 说明 |
|-------|------|------|
| [#37](https://github.com/martindoad-bit/tebiq/issues/37) | **P0 ENGINE Hotfix** | answer-core-v1 LLM timeout fallback 返回不相关 cached answer (D05/D06 reproducible) |
| [#15](https://github.com/martindoad-bit/tebiq/issues/15) | Eval Round 1 | 30Q baseline，依赖 #37 + M3-C 完成 |
| [#13](https://github.com/martindoad-bit/tebiq/issues/13) | QA audit pending | PR #12 Context OS audit，待产品负责人激活 |

已 close：[#34](https://github.com/martindoad-bit/tebiq/issues/34) (PR #36 merged) · [#35](https://github.com/martindoad-bit/tebiq/issues/35) (QA report landed)

---

## CEO 可见 Surface

| URL | 状态 | 用途 |
|-----|------|------|
| `https://tebiq.jp/internal/eval-console` | ✅ | M1 — 100 题状态总览 |
| `https://tebiq.jp/internal/eval-lab` | ✅ | 标注工具（不要混淆为 console）|
| `https://tebiq.jp/internal/preview` | ✅ | M4 Phase 1+2 — 阶段反馈 + SSE |

---

## 待产品负责人裁决（P1）

| # | 事项 |
|---|------|
| P1-01 | DS eval route timeout 调整（25s → 90s）— 启动 M3-C |
| P1-02 | M3-B 通过标准（routing+VOICE 合规 vs 完整 LLM 答案） |
| P1-03 | VOICE delta（INDEX + HUMAN_REVIEW_TRIGGER_LIBRARY）是否提取 |
| P1-04 | REGRESSION_SET force human_review 何时放开 |
| P1-05 | Issue #13 QA audit 正式激活时机 |

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
