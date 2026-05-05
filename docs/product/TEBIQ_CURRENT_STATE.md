# TEBIQ 当前状态

> 短期工程快照。最多 150 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-05 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` + 用户最新事实 |
| `main_head` | `b6ffbe9` |
| `main_head_title` | Merge PR #48 — 1.0 Alpha Learning Console (Issue #41) |

---

## 当前阶段标签

**TEBIQ 1.0 Alpha Sprint — 方向切换（DL-011）+ #37 P0 fix verified**

**关键变化（2026-05-05）**：
1. PL 切换 1.0 定义为 **AI 在留咨询 Alpha**（不是完整 Risk Management）。Charter: `docs/product/TEBIQ_1_0_ALPHA_CHARTER.md`。
2. PR #38 merged（`1ba2fea`），#37 P0 fix **verified on production**：D05 现返回 `engine_version=answer-core-v1.1-fallback` + `status=clarification_needed` + `[降级回答]` 标记。
3. Streaming 升 P0：1.0 Alpha 用户端必须真流式正文，不允许只做 loading（PL 补充指令）。
4. M3-A/B/C 不再阻塞 1.0；改为 Alpha 数据回流后再做。
5. 5 Issues 下发：#39 (ENGINE streaming) / #40 (ENGINE photo) / #41 (ENGINE console) / #42 (DOMAIN anchors) / #43 (QA smoke)。

规则：单线阻塞不等于全项目阻塞。6 track 独立推进。

---

## 里程碑状态（v0.2 精确格式）

| Milestone | Status | 备注 |
|-----------|--------|------|
| M0 | accepted | Artifact-first + Context OS |
| M1 Internal Console | **accepted / monitoring** | CEO 验收 2026-05-05；camelCase fix in main |
| M2 Routing Safety | **implemented + semantic draft / E2E PASSED** | code merged (PR #23) + DOMAIN 7/7 ✅ + E2E 7/7 ✅（2026-05-05 rerun）|
| **M3-A** Routing Safety Baseline | routing structure: pass · **answer_text content safety: BLOCK by #37** | DL-010 修订方法学；不再标 PASS 直至 #37 修复 + QA/DOMAIN 复核 |
| **M3-B** TEBIQ Self-output Baseline | **BLOCK by #37** | fallback 路径会产生 unrelated answered content，临时通过标准失效 |
| **M3-C** DeepSeek Comparison Baseline | infra ready · **DO NOT RUN until #37 fixed** | PR #36 merged `98474c9`；DS raw route 90s；执行会被 fallback 污染 |
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
| 无 open PR | — | 上轮 7 个 open PR：#29 ✅ #33 ✅ #36 ✅ #38 ✅ #4 ✗ #11 ✗ #31 ✗ |

## 当前 Active Issues

| Issue | 类型 | 说明 |
|-------|------|------|
| [#43](https://github.com/martindoad-bit/tebiq/issues/43) | QA 1.0 Alpha | §3.1-3.3 / 3.5-3.8 PASS；§3.4 (image) + §3.9 (learning console) ready to run |
| [#49](https://github.com/martindoad-bit/tebiq/issues/49) | P1 | DeepSeek 90s timeout rate ~60% (Alpha UX issue, not P0) |
| [#46](https://github.com/martindoad-bit/tebiq/issues/46) | DEBT P1 | Production DB Migration Runbook / Automation Strategy |
| [#13](https://github.com/martindoad-bit/tebiq/issues/13) | QA audit pending | PR #12 Context OS audit，待激活 |

已 close：#34 · #35 · #37 · #39（PR #44 `4de9eda`）· [#40](https://github.com/martindoad-bit/tebiq/issues/40)（PR #47 `a6b22a3`）· [#41](https://github.com/martindoad-bit/tebiq/issues/41)（PR #48 `b6ffbe9`）· #42 · #15

## 当前 Open PR

| PR | 状态 | 说明 |
|----|------|------|
| 无 open PR | — | 上轮 6 PR：#29 ✅ #33 ✅ #36 ✅ #38 ✅ #44 ✅ #45 ✅ |

## 1.0 Alpha 状态

| 项 | 状态 |
|----|------|
| user-facing 入口 `/ai-consultation` | ✅ HTTP 200 |
| streaming `/api/consultation/stream` | ✅ SSE token-by-token，first_token 实测 7.1s |
| TEBIQ system prompt 体感 | ✅ 咨询语气，给下一步，不长篇 |
| DB `ai_consultations` 表 | ✅ migration 0023 pre-applied 5/5 verified |
| 用户已保存列表 `/me/consultations` | ✅ HTTP 200 |
| 受控查看 `/c/[id]` | ✅ 404 for fake id（正确）|
| feedback / save routes | ✅ 400 for invalid（正确） |
| Photo Lite (#40) | ✅ merged PR #47 `a6b22a3`（vision via Bedrock; hash-only ephemeral storage; 0 PII bytes persisted; 10 contract tests + 154 regression）|
| Learning Console (#41) | ✅ merged PR #48 `b6ffbe9`（7 Tab + KPI；EVAL_LAB_ENABLED=1 gate；零 DS 依赖；17 contract tests + 154 regression）|
| QA §3.1-3.3, 3.5-3.8 | ✅ PASS（report `31f5e50`）|
| QA §3.4 (image) + §3.9 (console) | 🟡 ready to run（PR #47/#48 已 deploy）|

---

## CEO 可见 Surface

| URL | 状态 | 用途 |
|-----|------|------|
| `https://tebiq.jp/internal/eval-console` | ✅ | M1 — 100 题状态总览 |
| `https://tebiq.jp/internal/eval-lab` | ✅ | 标注工具（不要混淆为 console）|
| `https://tebiq.jp/internal/preview` | ✅ | M4 Phase 1+2 — 阶段反馈 + SSE |

---

## UI Brand Source Status

| 项 | 值 |
|----|-----|
| Brand direction | **V07 Quiet Brow（locked，不重设计）** |
| Tokens canonical | `docs/product/tebiq-v07-tokens.json`（colors / typography / sizes / forbidden）|
| Logo / Icon canonical | `public/brand/tebiq-v07/`（svg/ + app-icon/ + android/ ios/ pwa/）|
| Code-level tokens | `components/ui/design-tokens.ts` + `tailwind.config.ts` |
| Brand docs index | `docs/brand/`（4 files: PACKAGE / LOGO_USAGE / COLOR_TOKENS / TYPOGRAPHY，新建 2026-05-05）|
| Registry updated | yes — Brand 资产区块 |
| CODEXUI can enter visual implementation | **yes**，前提：只读 Registry 标记的 canonical；不发明色 / 字体 / logo；derived tokens 必须 `needs review` |
| Known gaps | state colors（hover/active/focus/error）/ elevation+shadow / typography scale / dark mode 全色板 / print guideline — CODEXUI 在 1.0 UI Phase 2 提派生 token 提案，**不直接当 production token 使用** |

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
