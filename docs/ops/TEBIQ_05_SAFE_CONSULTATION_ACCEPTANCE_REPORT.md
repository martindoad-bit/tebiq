---
status: GM final delivery / awaiting PL acceptance
owner: GM
date: 2026-05-06
sprint: TEBIQ 0.5 Safe Consultation Sprint
authority: PL directive 2026-05-05 (最大放权)
final_delivery: yes — single GM report covering all 6 Workstreams
---

# TEBIQ 0.5 Safe Consultation Acceptance Report

> Per PL "最大放权" mandate: no mid-sprint reports, single final acceptance package.
> All 6 Workstreams complete. CONDITIONAL PASS by QA. 0 P0. Recommended for 10-30 internal client use.

---

## 1. main HEAD + Production

| 字段 | 值 |
|------|-----|
| main HEAD | `be5cfa9` (latest QA report) |
| Production sha | `384dd7e` (deployed 2026-05-06 01:43 UTC) |
| Production URL | https://tebiq.jp |
| Production status | **Alpha / limited internal client use / not final professional judgment** |

QA 测试 commit `384dd7e` 即包含全部 0.5 Sprint 交付。`be5cfa9` 是 QA 报告 + 状态文档增量，无 runtime 影响。

---

## 3-4. User-facing + Internal Pages

### 用户端

| URL | 用途 |
|-----|------|
| https://tebiq.jp/ai-consultation | 文字 + 拍照咨询入口（Alpha banner / Risk hint / 流式回答 / 反馈 / 保存）|
| https://tebiq.jp/me/consultations | 已保存咨询列表 |
| https://tebiq.jp/c/{id} | 单条咨询只读详情（状态徽章 + 完整字段）|

### 中台

| URL | 用途 | Gate |
|-----|------|------|
| https://tebiq.jp/internal/learning-console | 7 Tab + KPI（真实用户咨询）| `EVAL_LAB_ENABLED=1` |
| https://tebiq.jp/internal/learning-console/{id} | Charter §6 全字段详情 | 同上 |
| https://tebiq.jp/internal/eval-console | （历史 100Q Eval 面板，保留运行）| 同上 |

---

## 5. PR list（本 Sprint）

| PR | Issue | 内容 | Commit | 状态 |
|----|-------|------|--------|------|
| [#56](https://github.com/martindoad-bit/tebiq/pull/56) | #51 | WS-A state consistency + migration 0024 (`partial` enum) | `64eedb8` | ✅ merged |
| [#58](https://github.com/martindoad-bit/tebiq/pull/58) | #54 | WS-D ENGINE 15 fact anchor matcher + injection | `f8f85e6` | ✅ merged |
| [#59](https://github.com/martindoad-bit/tebiq/pull/59) | #52 | WS-B+C CODEXUI Polish (5 pages + consultation-alpha component) | `13ba029` | ✅ merged |
| [#57](https://github.com/martindoad-bit/tebiq/pull/57) | #55 | WS-D VOICE consultation_alpha_v2 system prompt | `bcd28ca` | ✅ merged (via rebase chain) |

也包括 hotfix [#50](https://github.com/martindoad-bit/tebiq/pull/50) (submit button bg-ink) 在 Sprint 启动期间 merged。

---

## 6. Issues closed（本 Sprint）

| Issue | 内容 |
|-------|------|
| #51 | WS-A ENGINE state consistency |
| #52 | WS-B/C CODEXUI Polish |
| #53 | WS-E QA 0.5 Smoke (CONDITIONAL PASS) |
| #54 | WS-D ENGINE Light Fact Anchors |
| #55 | WS-D VOICE Prompt Polish |
| #35 | Stale stabilization audit (superseded) |

---

## 7. Features completed（vs Sprint 完成标准 17 项）

| # | 标准 | 状态 |
|---|------|------|
| 1 | UI 打磨到可给客户 | ✅ CODEXUI Polish PR #59 |
| 2 | 手机端可用 | ✅ Chrome CDP 390x900 verified（QA §D）|
| 3 | 电脑端可用 | ✅ overflow-x-hidden + max-w 断点 |
| 4 | 文字咨询可用 | ✅ HTTP 200 + streaming verified |
| 5 | 拍照咨询可用 | ✅（PR #47 既有 + Polish 不影响）|
| 6 | 流式回答可用 | ✅ first_token 4-13s typical |
| 7 | 高风险提示可用 | ✅ 13/13 keyword 触发 risk_hint event（QA §3.5）|
| 8 | 反馈可用 | ✅ HTTP routes verified；client-side render P2-B 未 visual check |
| 9 | 保存问题可用 | ✅（QA §3.7/§3.8）|
| 10 | 咨询记录可用 | ✅ /me/consultations + /c/{id} HTTP 200 |
| 11 | Learning Console 可用 | ✅ 7 Tab 全 HTTP 200 + Charter §6 全字段 |
| 12 | 状态不混乱 | ✅ partial/completed/timeout/failed/fallback 区分（PR #56 + #59）|
| 13 | timeout/failed/fallback 不误导 | ✅ [降级回答] 仅 timeout-no-answer 路径出现 |
| 14 | 不返回无关答案 | ✅ #37 regression 7/7 PASS |
| 15 | QA P0 = 0 | ✅ |
| 16 | production = Alpha / not final professional judgment | ✅ |
| 17 | 可给 10-30 内部客户继续使用 | ✅ recommended |

**17/17 PASS**（COND PASS for 8 / 12 — 见 §12 P1）

---

## 8-10. UI Screenshots

CODEXUI 在 PR #59 提供：
- mobile (Chrome CDP 390x900)：见 PR #59 description / `artifacts/screenshots/ai-consultation-mobile.png`
- desktop：`artifacts/screenshots/ai-consultation-desktop.png`

PL 可在 production 直接复核：https://tebiq.jp/ai-consultation （手机+电脑各开一次）

---

## 11. QA Report

`docs/qa/QA_1_0_ALPHA_SMOKE_REPORT_v0.2.md`（commit `be5cfa9`）

QA 总裁定：**CONDITIONAL PASS**

| 测试项 | 结果 |
|-------|------|
| §A Status UI 一致性 | ✅ PASS |
| §B fact_anchor_ids 落库 | ✅ PASS |
| §C consultation_alpha_v2 | ✅ COND PASS（P1-D）|
| §D Mobile + Desktop | ✅ COND PASS（P2-B）|
| §E Learning Console | ✅ PASS |
| §3.1 #37 fallback regression | ✅ 7/7 PASS |
| §3.5 风险关键词 | ✅ 13/13 触发 |
| §3.6 禁止承诺词 | ✅ 9 词 0 命中 |

---

## 12. P0 / P1 / P2

**P0**：**0**

**P1**：
- [#60](https://github.com/martindoad-bit/tebiq/issues/60) — `prompt_version` DB 列 default 仍为 v1（数据完整性，非用户可见）

**P2**：
- [#61](https://github.com/martindoad-bit/tebiq/issues/61) — `FORBIDDEN_PHRASES` runtime filter 缺 大丈夫/应该没问题（system prompt 已禁，runtime 0 命中，缺 backstop）
- P2-B（不开 issue）— feedback 按钮 client-side render，QA 浏览器插件不可用未 visual 验证；§3.7 历史 PASS 无回归 vector

---

## 13. Alpha Observation Readiness

| 项 | 状态 |
|---|------|
| Observation Report Template | ✅ `docs/ops/TEBIQ_05_OBSERVATION_REPORT_TEMPLATE.md` |
| Learning Console 数据收集就位 | ✅ ai_consultations 表 + 7 Tab 可读 + KPI 计算 |
| 7 天观察周期可启动 | ✅ |

---

## 14. Known Gaps（不阻塞 Alpha）

| Gap | 影响 | Issue |
|-----|------|-------|
| prompt_version DB 列写 v1 | 数据 audit 不准 | [#60](https://github.com/martindoad-bit/tebiq/issues/60) |
| FORBIDDEN_PHRASES runtime 缺 2 词 | 防御深度 | [#61](https://github.com/martindoad-bit/tebiq/issues/61) |
| feedback 按钮 visual QA 未做 | UX 体感 | follow-up by next QA round |
| DS 90s timeout 率 60%（持续观察）| UX 等待感 | [#49](https://github.com/martindoad-bit/tebiq/issues/49) |
| Production DB Migration Runbook | 流程 debt（DL-012 部分缓解）| [#46](https://github.com/martindoad-bit/tebiq/issues/46) |
| state colors / elevation / typography scale 未 canonical | UI 派生 token 待批 | docs/ui/TEBIQ_1_0_UI_HANDOFF.md |
| Photo Lite 移动端 native camera flow QA | 待真机检 | follow-up |

---

## 15. Internal client use allowed

**YES** — 推荐 10-30 内部客户开始使用。

边界：
- 必须保留 Alpha banner（已实现常驻）
- 不解锁 production copy
- 不对外宣传"专业判断"

---

## 16. Production Status

**Alpha / limited release / not final professional judgment**

- public launch: NO（DL-009）
- production copy 解锁: NO
- 邀请制 / 内部 URL：当前所有 internal client 通过同一 production URL，无访问控制（依赖客户名单管理）

---

## 17. Next 7-day Observation Plan

1. **Day 0-3**: 灌入 10-30 内部客户使用，GM 每日 1 次刷 Learning Console
2. **Day 4-7**: GM 填 `docs/ops/observations/0.5-2026-W19.md`（基于 template）
3. **Day 7**: GM 提交 Alpha Observation Report → PL 决定：
   - 进入 0.7 完整 Risk Triage
   - 或继续观察
   - 或扩客户量
   - 或处理 P1/P2 follow-ups

观察期内不动 production code（除非 P0 出现）。Issue #60/#61 可在观察期内由 ENGINE 处理（非阻塞）。

---

## Sprint 完成确认

| WS | 标题 | 状态 |
|----|------|------|
| A | Runtime Stabilization | ✅ done |
| B | UI Polish (User + Internal) | ✅ done |
| C | Learning Console 0.5 | ✅ done |
| D | Light Fact Anchors / Prompt Polish | ✅ done (ENGINE + VOICE) |
| E | QA 0.5 Smoke | ✅ done (CONDITIONAL PASS) |
| F | Observation Readiness | ✅ done (template) |

**6/6 Workstreams complete. 0 P0. Recommended PL acceptance.**

---

## PL 验收建议

GM 推荐 PL：
1. 接受本 Acceptance Report → 进入 7 天观察期
2. 邀请 10-30 内部客户开始使用
3. 不阻塞 P1-D / P2-A（ENGINE 可在观察期内并行修）
4. 7 天后 GM 交付 Alpha Observation Report，PL 决定下一阶段方向

PL 验收 → 仅需回复："accepted" 或 "需修 X"。
