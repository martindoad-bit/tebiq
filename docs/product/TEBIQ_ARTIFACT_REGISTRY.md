# TEBIQ Artifact Registry

> 所有可复用资产（VOICE / DOMAIN / QA Gates / Eval / Scripts）的集中登记表。
> **规则：聊天窗口输出只算草稿，repo 文件才算可协作资产。**
> ENGINE / QA 只读取本 registry 中已登记的 repo 路径，不读取聊天内容。

| 规则 | 说明 |
|------|------|
| 登记责任人 | GM |
| 更新触发 | 任何新资产 PR merge → GM 立即登记 |
| 消费规则 | ENGINE / QA / DOMAIN 必须读 repo 文件，不得从聊天记录读取文案 |
| 提交流程 | VOICE / DOMAIN / QA Gates → 对应窗口提交 PR → GM review → merge → 登记 |

---

## VOICE 资产

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| VOICE Principles | `docs/voice/TEBIQ_VOICE_PRINCIPLES.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | GM / ENGINE / QA | `02b8e59` | 2026-05-05 |
| Status Language Templates | `docs/voice/TEBIQ_STATUS_LANGUAGE_TEMPLATES.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Internal Console Label System | `docs/voice/TEBIQ_INTERNAL_CONSOLE_LABEL_SYSTEM.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Risk Level Vocabulary | `docs/voice/TEBIQ_RISK_LEVEL_VOCABULARY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA / DOMAIN | `02b8e59` | 2026-05-05 |
| Clarification Library | `docs/voice/TEBIQ_CLARIFICATION_LIBRARY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| Scope Exit & Routing Language | `docs/voice/TEBIQ_SCOPE_EXIT_ROUTING_LANGUAGE.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Human Review Language | `docs/voice/TEBIQ_HUMAN_REVIEW_LANGUAGE.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| User Preview Matter Copy | `docs/voice/TEBIQ_USER_PREVIEW_MATTER_COPY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| Internal Console Copy Map | `docs/voice/TEBIQ_INTERNAL_CONSOLE_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Preview State Copy Map | `docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Matter Copy Map | `docs/voice/TEBIQ_MATTER_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| QA Voice Checklist | `docs/voice/TEBIQ_QA_VOICE_CHECKLIST.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | QA | `02b8e59` | 2026-05-05 |
| DOMAIN Input Request | `docs/voice/TEBIQ_DOMAIN_INPUT_REQUEST.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN | DOMAIN / GM | `02b8e59` | 2026-05-05 |
| Voice README | `docs/voice/README.md` | GM | active | — | ENGINE / QA / DOMAIN | `02b8e59` | 2026-05-05 |

> **VOICE canonical 决策（2026-05-05 Stabilization Sprint）**：
> main `docs/voice/TEBIQ_*.md`（14 文件）为唯一 canonical。
> PR #31 `_v0.1.md` 文件已 close（main 版本更完整，patches 已集成）。
> ENGINE / QA 只消费 `TEBIQ_*.md`，不消费 PR #31 文件。
> Gap 登记：`VOICE_SYSTEM_INDEX`（索引导航）+ `HUMAN_REVIEW_TRIGGER_LIBRARY`（L1/L2 10场景）为 PR #31 唯一增量，待产品负责人决定是否提取。

---

## DOMAIN 资产

> 消费规则：所有 DOMAIN 文件保持 draft / needs human review。不得视为 production-ready。

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| 100Q Risk Map | `docs/domain/TEBIQ_100Q_RISK_MAP.md` | DOMAIN-CC | draft / needs review | Project Lead | VOICE / ENGINE / QA | `ec8ad27` | 2026-05-05 |
| Domain Agent Contract | `docs/domain/TEBIQ_DOMAIN_AGENT_CONTRACT.md` | DOMAIN-CC | draft | GM | GM / DOMAIN | `ec8ad27` | 2026-05-05 |
| Domain Review Guide | `docs/domain/TEBIQ_DOMAIN_REVIEW_GUIDE.md` | DOMAIN-CC | draft | GM | DOMAIN | `ec8ad27` | 2026-05-05 |
| Fact Card Candidates | `docs/domain/TEBIQ_FACT_CARD_CANDIDATES.md` | DOMAIN-CC | draft / needs review | Project Lead | DOMAIN / QA | `ec8ad27` | 2026-05-05 |
| Golden Cases Seed | `docs/domain/TEBIQ_GOLDEN_CASES_SEED.md` | DOMAIN-CC | draft | DOMAIN | QA / ENGINE | `ec8ad27` | 2026-05-05 |
| Handoff Triggers | `docs/domain/TEBIQ_HANDOFF_TRIGGERS.md` | DOMAIN-CC | draft / needs review | Project Lead | ENGINE / QA | `ec8ad27` | 2026-05-05 |
| Output Rubric | `docs/domain/TEBIQ_OUTPUT_RUBRIC.md` | DOMAIN-CC | draft / needs review | Project Lead | QA / DOMAIN | `ec8ad27` | 2026-05-05 |
| 100Q Risk Matrix | `docs/domain/DOMAIN_100Q_RISK_MATRIX.md` | DOMAIN-CC | draft / needs human review | Project Lead | VOICE / ENGINE / QA | `cd5cd8e` | 2026-05-05 |
| Risk Patterns | `docs/domain/DOMAIN_RISK_PATTERNS.md` | DOMAIN-CC | draft / needs human review | Project Lead | VOICE / ENGINE / QA | `cd5cd8e` | 2026-05-05 |
| 100Q Coverage Gap | `docs/domain/DOMAIN_100Q_COVERAGE_GAP.md` | DOMAIN-CC | draft | GM | GM / QA | `f41618c` | 2026-05-05 |
| Annotation Readiness | `docs/domain/DOMAIN_ANNOTATION_READINESS.md` | DOMAIN-CC | draft | GM | GM / QA | `f41618c` | 2026-05-05 |
| Console Labels | `docs/domain/DOMAIN_CONSOLE_LABELS.md` | DOMAIN-CC | draft | GM | ENGINE / QA | `f41618c` | 2026-05-05 |
| QA Gate Candidates | `docs/domain/DOMAIN_QA_GATE_CANDIDATES.md` | DOMAIN-CC | draft / needs QA | QA + Project Lead | QA | `f41618c` | 2026-05-05 |
| Routing Regression Review | `docs/domain/DOMAIN_ROUTING_REGRESSION_REVIEW.md` | DOMAIN-CC | draft — 7/7 pass | GM | GM / QA / ENGINE | `f41618c` | 2026-05-05 |
| VOICE Input Pack | `docs/domain/DOMAIN_VOICE_INPUT_PACK.md` | DOMAIN-CC | draft | VOICE | VOICE | `f41618c` | 2026-05-05 |
| VOICE P0 Input Response | `docs/domain/DOMAIN_VOICE_P0_INPUT_RESPONSE.md` | DOMAIN-CC | draft | VOICE | VOICE | `f41618c` | 2026-05-05 |

---

## Eval 资产

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| Eval Round 1 Sample Pack | `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` | GM | active | GM | ENGINE / QA / DOMAIN | `f8051b0` | 2026-05-05 |
| Routing Safety Gate Pack | `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` | GM | active (Issue #18 ✅) | — | ENGINE / QA | `f8051b0` | 2026-05-05 |
| Internal Console Pack | `docs/eval/EVAL_INTERNAL_CONSOLE_PACK.md` | GM | active (Issue #19 ✅) | — | ENGINE | `6166cf8` | 2026-05-05 |
| DOMAIN 100Q Pack | `docs/eval/EVAL_DOMAIN_100Q_PACK.md` | GM | active (Issue #20 ✅) | — | DOMAIN | `7d378fd` | 2026-05-05 |
| Round 1A Recovery Plan | `docs/eval/EVAL_ROUND1A_RECOVERY_PLAN.md` | GM | active | — | GM / ENGINE | `f8051b0` | 2026-05-05 |
| OOS Pack | `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` | GM | active | — | DOMAIN / ENGINE | `f8051b0` | 2026-05-05 |
| DOMAIN Work Packet | `docs/eval/EVAL_ROUND1A_DOMAIN_WORK_PACKET.md` | GM | pending (awaiting FULL_COMPARABLE) | GM | DOMAIN | `5ad36ea` | 2026-05-05 |
| Round 1 Annotation Rubric | `docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md` | GM | active | GM / DOMAIN / QA | — | 2026-05-05 |
| M3-A Routing Safety Baseline v0.1 | `docs/eval/M3A_ROUTING_SAFETY_BASELINE_v0.1.md` | GM | PASS（2026-05-05）| GM / DOMAIN / QA | — | 2026-05-05 |
| M3-B TEBIQ Self-output Baseline v0.1 | `docs/eval/M3B_TEBIQ_SELFOUTPUT_BASELINE_v0.1.md` | GM | superseded by 1.0 Alpha pivot (DL-011) | — | — | 2026-05-05 |
| DOMAIN M3-A/B Confirmation v0.1 | `docs/domain/DOMAIN_M3A_M3B_CONFIRMATION_v0.1.md` | DOMAIN | draft / 2 pass + 5 partial | GM | `28403df` | 2026-05-05 |
| QA Stabilization Report v0.2 | `docs/qa/QA_STABILIZATION_REPORT_v0.2.md` | QA | done / found P0 #37 | GM | `daa7b18` | 2026-05-05 |

---

## Ops / Work Packets

| 资产名称 | 路径 | Owner | Status | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|--------|--------------|-------------|
| Workstream A Console Deblock | `docs/ops/WORKSTREAM_A_CONSOLE_DEBLOCK_PACK.md` | GM | ✅ done (PR #28) | ENGINE | `2d9ecaa` | 2026-05-05 |
| Workstream B Preview Feedback | `docs/ops/WORKSTREAM_B_PREVIEW_STAGE_FEEDBACK_PACK.md` | GM | ✅ done (PR #30) | ENGINE | `2d9ecaa` | 2026-05-05 |
| Workstream C SSE Phase 2 | `docs/ops/WORKSTREAM_C_PREVIEW_PHASE2_SSE_PACK.md` | GM | ✅ done (Issue #32 / PR #33) | ENGINE | `ab019ca` | 2026-05-05 |
| QA Stabilization Pack v0.2 | `docs/ops/QA_STABILIZATION_PACK_V02.md` | GM | active (Issue #35) | QA | — | 2026-05-05 |
| M3-C DS Batch Readiness Pack | `docs/ops/WORKSTREAM_M3C_DS_BATCH_PACK.md` | GM | ✅ done (PR #36 merged `98474c9`)| ENGINE | — | 2026-05-05 |
| **1.0 Alpha Charter** | `docs/product/TEBIQ_1_0_ALPHA_CHARTER.md` | Project Lead + GM | active / Alpha sprint | all windows | — | 2026-05-05 |
| 1.0 Streaming Consultation Pack | `docs/ops/WORKSTREAM_1_0_STREAMING_CONSULTATION_PACK.md` | GM | active (Issue #39) | ENGINE | — | 2026-05-05 |
| 1.0 Photo Lite Pack | `docs/ops/WORKSTREAM_1_0_PHOTO_LITE_PACK.md` | GM | active (Issue #40) | ENGINE | — | 2026-05-05 |
| 1.0 Learning Console Pack | `docs/ops/WORKSTREAM_1_0_LEARNING_CONSOLE_PACK.md` | GM | active (Issue #41) | ENGINE | — | 2026-05-05 |
| 1.0 Fact Anchors Pack | `docs/ops/WORKSTREAM_1_0_FACT_ANCHORS_PACK.md` | GM | active (Issue #42) | DOMAIN | — | 2026-05-05 |
| 1.0 QA Alpha Smoke Pack | `docs/ops/QA_1_0_ALPHA_SMOKE_PACK.md` | GM | active (Issue #43) | QA | — | 2026-05-05 |
| **1.0 Fact Anchors v0.1** | `docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md` | DOMAIN-CC | draft / needs human review (Issue #42 ✅)| ENGINE / VOICE | `e81a095` | 2026-05-05 |
| **1.0 QA Alpha Smoke Report v0.1** | `docs/qa/QA_1_0_ALPHA_SMOKE_REPORT_v0.1.md` | QA | partial — §3.1 PASS 7/7; §3.2-3.9 BLOCKED (waiting #39)| GM / ENGINE | `b8088c3` | 2026-05-05 |

---

## Brand 资产（docs/brand/ + public/brand/ + 现有 token 文件）

> V07 Quiet Brow 已锁定方向。资产 source-locked，no redesign。
> CODEXUI / ENGINE / QA **必须**只消费本区块登记的 canonical 文件。聊天内容不算 brand source of truth。

| 资产名称 | 路径 | Owner | Status | 消费方 | Canonical for CODEXUI |
|---------|------|-------|--------|--------|----------------------|
| Brand Package Index | `docs/brand/TEBIQ_BRAND_PACKAGE.md` | GM | draft / canonical / not production redesign | CODEXUI / ENGINE / QA | yes |
| Logo Usage | `docs/brand/TEBIQ_LOGO_USAGE.md` | GM | draft / canonical / not production redesign | CODEXUI / ENGINE | yes |
| Color Tokens (doc) | `docs/brand/TEBIQ_COLOR_TOKENS.md` | GM | draft / canonical / not production redesign | CODEXUI / ENGINE | yes |
| Typography (doc) | `docs/brand/TEBIQ_TYPOGRAPHY.md` | GM | draft / canonical / not production redesign | CODEXUI / ENGINE | yes |
| Tokens JSON (canonical source) | `docs/product/tebiq-v07-tokens.json` | Project Lead + GM | canonical | CODEXUI / ENGINE | yes |
| Logo / Icon SVG + PNG | `public/brand/tebiq-v07/` | Project Lead | canonical / source-locked | ENGINE | yes |
| design-tokens.ts | `components/ui/design-tokens.ts` | ENGINE | code-canonical | ENGINE / CODEXUI | yes |
| tailwind.config.ts | `tailwind.config.ts` | ENGINE | code-canonical | ENGINE | yes |
| favicon / apple-touch | `public/favicon.ico` / `public/apple-touch-icon.png` | ENGINE | canonical | ENGINE | yes |

> **规则**：CODEXUI / ENGINE 不在 `docs/ui/` 中内联 hex / 字体名 / 自定义 logo；必须引用本区块路径或 token name。

---

## Roles 资产（docs/roles/）

> 各窗口正式角色定义。所有文件状态：draft / internal coordination / not production。

| 资产名称 | 路径 | Owner | Status | 消费方 | Last Updated |
|---------|------|-------|--------|--------|-------------|
| Project Lead Role | `docs/roles/TEBIQ_PROJECT_LEAD_ROLE.md` | GM | draft | all windows | 2026-05-05 |
| GM Role | `docs/roles/TEBIQ_GM_ROLE.md` | GM | draft | all windows | 2026-05-05 |
| ENGINE Role | `docs/roles/TEBIQ_ENGINE_ROLE.md` | GM | draft | ENGINE / GM | 2026-05-05 |
| QA Role | `docs/roles/TEBIQ_QA_ROLE.md` | GM | draft | QA / GM | 2026-05-05 |
| DOMAIN Role | `docs/roles/TEBIQ_DOMAIN_ROLE.md` | GM | draft | DOMAIN / GM | 2026-05-05 |
| VOICE Role | `docs/roles/TEBIQ_VOICE_ROLE.md` | GM | draft | VOICE / GM | 2026-05-05 |
| CODEXUI Role | `docs/roles/TEBIQ_CODEXUI_ROLE.md` | GM | draft | CODEXUI / GM | 2026-05-05 |

---

## UI 资产（docs/ui/）

> CODEXUI 窗口的 UI 设计资产。区别于 `docs/voice/`（copy）和 `docs/product/`（charter）。

| 资产名称 | 路径 | Owner | Status | 消费方 | Last Updated |
|---------|------|-------|--------|--------|-------------|
| UI Directory README | `docs/ui/README.md` | CODEXUI + GM | active | CODEXUI / ENGINE / QA | 2026-05-05 |
| 1.0 UI Role | `docs/ui/TEBIQ_1_0_UI_ROLE.md` | CODEXUI + GM | draft / Alpha-only | CODEXUI / ENGINE / QA | 2026-05-05 |
| Track D User Preview Pack | `docs/ops/TRACK_D_USER_PREVIEW_PACK.md` | GM | ✅ done (PR #24) | ENGINE | `7d378fd` | 2026-05-05 |
| Project Milestones | `docs/ops/TEBIQ_PROJECT_MILESTONES.md` | GM | active | all | `60a591a` | 2026-05-05 |
| Agent Workflow | `docs/ops/TEBIQ_AGENT_WORKFLOW.md` | GM | active | all | `6166cf8` | 2026-05-05 |
| Context Bootstrap | `docs/ops/TEBIQ_CONTEXT_BOOTSTRAP.md` | GM | active | all | — | 2026-05-05 |
| GM Operating Principles | `docs/ops/TEBIQ_GM_OPERATING_PRINCIPLES.md` | GM | active | GM | — | 2026-05-05 |

---

## 协作规则（固定）

### 资产提交流程

```
VOICE / DOMAIN / QA Gates 等可复用资产
  → 对应窗口提交 PR（到 docs/voice/ 或 docs/domain/ 等）
  → GM review
  → merge
  → GM 登记到本 registry
```

**聊天窗口输出只算草稿，不算完成。**  
**没有 repo 路径 = 没有资产。**

### ENGINE / QA 消费规则

- 必须读 registry 中已登记的 repo 路径
- 不得从聊天记录读取文案
- 如果 registry 中没有需要的资产 → 停止，向 GM 报告缺口

### GM 维护规则

| 触发 | 动作 |
|------|------|
| 新资产 PR merge | 立即登记（name / path / commit / date）|
| 资产状态变更 | 更新 status 字段 |
| 资产废弃 | 标注 `deprecated`，不删除行 |
