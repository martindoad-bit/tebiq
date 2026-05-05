# TEBIQ 当前状态

> 短期工程快照。最多 150 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` + 用户最新事实 |
| `main_head` | TBD（pending push）|
| `main_head_title` | Stabilization Sprint v0.3 — M3-A/B reports + QA + ENGINE work packets |

---

## 当前阶段标签

**Project Stabilization Sprint v0.3 完成 — M3-A PASS / M3-B PASS（临时）/ M3-C 工作包就位 / QA 工作包就位**

规则：单线阻塞不等于全项目阻塞。6 track 独立推进。

---

## 里程碑状态（v0.2 精确格式）

| Milestone | Status | 备注 |
|-----------|--------|------|
| M0 | accepted | Artifact-first + Context OS |
| M1 Internal Console | **accepted / monitoring** | CEO 验收 2026-05-05；camelCase fix in main |
| M2 Routing Safety | **implemented + semantic draft / E2E PASSED** | code merged (PR #23) + DOMAIN 7/7 ✅ + E2E 7/7 ✅（2026-05-05 rerun）|
| **M3-A** Routing Safety Baseline | **PASS** | 报告：`docs/eval/M3A_ROUTING_SAFETY_BASELINE_v0.1.md`；7/7 regression E2E 验证 |
| **M3-B** TEBIQ Self-output Baseline | **PASS（临时标准）** | 报告：`docs/eval/M3B_TEBIQ_SELFOUTPUT_BASELINE_v0.1.md`；37 checked / 8 valid / 0 P0 / 0 P1 真实命中 |
| **M3-C** DeepSeek Comparison Baseline | **blocked / Work Packet 就位** | Issue #34 + `docs/ops/WORKSTREAM_M3C_DS_BATCH_PACK.md`；等 ENGINE 调整 timeout |
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
  M1 Console:        PASS (GM curl 验证 + CEO 验收)
  M4 Preview Phase1: PASS (HTTP 200, stage states 可见)
  M4 Preview Phase2: PASS at code level (76/76 tests); browser SSE QA pending — Issue #35
  Routing E2E:       PASS (GM rerun 7/7, 2026-05-05 04:37-04:41 UTC); QA E2E 复验 — Issue #35
  VOICE Compliance:  PASS B-layer (GM 扫描)；QA 正式复验 — Issue #35
  formal QA cycle:   Work Packet docs/ops/QA_STABILIZATION_PACK_V02.md (Issue #35)
  Issue #13 audit:   pending (PR #12 Context OS audit 待激活)

DeepSeek:
  fast health (25s):  slow_not_interactive (1/5 ok in 5-probe sample)
  batch health (90s): healthy_batch (1+ confirmed; J03/J04 通过 60s 完成)
  UX health:          ✅ preview shows received/routing/generating/fallback states
  recommended:        interactive=25s+fallback；batch eval=90s；concurrency=1
```

---

## 6 Track 状态总览

| Track | 名称 | 状态 | 阻塞 |
|-------|------|------|------|
| **A** Eval | M3-A ✅ / M3-B 可推进 / M3-C 等 batch timeout | 🟡 推进中 | M3-C: ENGINE eval-lab DS route timeout 调整 |
| **B** Internal Console | ✅ 稳定 (M1 accepted) | ✅ | — |
| **C** Routing Safety | ✅ E2E 7/7 PASS | ✅ | — |
| **D** User Preview | ✅ Phase 1+2 in main | 🟡 | browser SSE QA |
| **E** DOMAIN | ✅ Phase 1+2+3 in main (16 文件 draft) | ✅ | — |
| **F** Ops/Release | 🔴 production blocked | DL-009 | M3-C + QA + 产品负责人裁决 |

---

## 当前 Active PR

| PR | 状态 | 说明 |
|----|------|------|
| 无 open PR | — | 上轮 5 个 open PR：#29 ✅ #33 ✅ #4 ✗ #11 ✗ #31 ✗ |

## 当前 Active Issues

| Issue | 类型 | 说明 |
|-------|------|------|
| [#34](https://github.com/martindoad-bit/tebiq/issues/34) | ENGINE Work Packet | M3-C DS Batch Readiness — `docs/ops/WORKSTREAM_M3C_DS_BATCH_PACK.md` |
| [#35](https://github.com/martindoad-bit/tebiq/issues/35) | QA Work Packet | Stabilization Audit v0.2 — `docs/ops/QA_STABILIZATION_PACK_V02.md` |
| [#15](https://github.com/martindoad-bit/tebiq/issues/15) | Eval Round 1 | 30Q baseline，依赖 M3-C 完成后启动 |
| [#13](https://github.com/martindoad-bit/tebiq/issues/13) | QA audit pending | PR #12 Context OS audit，待产品负责人激活 |

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
