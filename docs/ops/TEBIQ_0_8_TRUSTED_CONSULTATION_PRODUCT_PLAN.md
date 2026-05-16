# TEBIQ 0.8 — Trusted Consultation Product Plan

Created: 2026-05-14

Owner: Codex Production Lead / AI Engineering Lead

Status: active operating plan; 0.8 shipped, now in post-release convergence

## Stage Name

```text
TEBIQ 0.8: 可信咨询产品成型阶段
```

This stage is not "more cards" and not "answer polish." It is the stage where TEBIQ becomes a credible AI-native consultation product with boundaries, materials, evaluation, and a learning loop.

## North Star

```text
帮助在日外国人减少在留摩擦。
```

The product should help users:

- avoid dangerous wrong actions;
- understand their current procedure/status/material state;
- separate official facts from practical uncertainty;
- prepare better questions and fact packs for immigration windows or scriveners;
- use structured official-material checklists instead of scattered advice.

## 80%+ Completion Definition

TEBIQ reaches 0.8 when:

1. Ordinary users can safely handle most common residence-friction questions.
2. High-risk cases are not answered with dangerous certainty.
3. Materials Tab is thick enough to support real preparation behavior.
4. Eval Lab can sustain a quality flywheel from user questions -> A/B -> AQL/QA -> FACT/DOMAIN/ENGINE tasks.
5. Deep-water cases are identified and routed, not improvised.

Not required for 0.8:

- AI predicting immigration approval;
- every residence status covered;
- L5 practical signal layer;
- all Knowledge Atlas cards in runtime retrieval;
- replacing scriveners.

## Product Surfaces

### 提问 Tab

Required state:

- answer summary labels remain `先看这里 / 当前判断 / 建议动作 / 暂缓事项`;
- P0/P1 guardrails block dangerous shortcuts;
- answer distinguishes receipt, notice, postcard, pickup, permission, and non-permission;
- answer separates immigration, municipality, tax office, pension, health insurance, company, school, and Hello Work roles;
- deep-water cases route to professional/official confirmation with a useful fact pack.

### 材料 Tab

Required state:

- becomes a materials/checklist system, not a thin "速查" page;
- scenario pages for common procedures;
- reusable common material cards;
- cross-links from scenario to common documents and back;
- mobile default collapsed state;
- clear "ask TEBIQ" bridge for case-specific questions;
- no claim that complete materials guarantee permission.

### Eval Lab / 中台

Required state:

- can review A/B answer snapshots;
- can import/export focused regression sets;
- preserves provenance and retry status;
- supports founder/AQL/scrivener annotation;
- converts P0/P1 findings into workpacks.

### 找书士 / Admin

Required state:

- admin access protection confirmed fail-closed;
- deep-water answer paths can create better human-review leads;
- lead desk never exposes private information publicly.

## Workstreams

### W1 — P0/P1 Guardrail Knowledge

Owner: FACT, orchestrated by Codex.

Current active work:

- `docs/knowledge-atlas/phase2/guardrails-p0p1/WORKPACK_001.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md`

Target:

- 10 core guardrail cards completed;
- continuation candidates started if possible;
- DOMAIN queue populated;
- ready for route-gate engineering.

### W2 — Route Gates / Validators

Owner: Codex Engineering.

Targets:

- special-period endpoint validator;
- tax-certificate route checker;
- resident-tax fiscal-year/address checker;
- J-Skip eligibility gate;
- J-Find / employment-status transition bridge gate;
- HSP1 institution-change gate;
- work qualification certificate boundary checker;
- notice uncertainty classifier;
- answer completeness validator.

### W3 — Focused Regression

Owner: Real User Simulator + AQL + QA.

Targets:

- 80-120 realistic user questions;
- focused A/B after guardrails;
- AQL P0/P1 gate;
- QA import/export and completeness checks.

### W4 — Materials Tab Thickness

Owner: CODEXUI + FACT + Codex.

Targets:

- scenario-first IA;
- common material cards;
- cross-reference model;
- mobile collapsed behavior;
- first 6-8 scenario pages.

### W5 — Eval Lab Flywheel

Owner: Codex + QA.

Targets:

- preserve B-side status/prompt provenance;
- compact-retry metric;
- batch comparison views;
- annotation and export improvements.

### W6 — Admin / Production Safety

Owner: Codex + QA.

Targets:

- verify `/admin/*` and `/api/admin/*` fail-closed in production;
- preserve lead privacy;
- document result.

Status 2026-05-15:

- completed through PR #130;
- production no-key/wrong-key smoke now returns 404 for `/admin` and `/api/admin/stats`;
- see `docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md`.

## Active Subagent Sync

This section is updated by Codex as subagents complete.

| Workstream | Agent | Output | Status |
|---|---|---|---|
| W1 FACT | FACT guardrail worker | `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md` | completed |
| W3 AQL | AQL protocol worker | `docs/eval/TEBIQ_0_8_AQL_ACCEPTANCE_AND_REGRESSION_PROTOCOL.md` | completed |
| W3 User Simulation | Real User Simulator | `docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_QUESTIONS.json` | completed |
| W3 QA | QA plan worker | `docs/qa/TEBIQ_0_8_QA_PLAN.md` | completed |
| W4 CODEXUI | Materials Tab UI worker | `docs/ui/TEBIQ_0_8_MATERIALS_TAB_PRODUCT_UI_PLAN.md` | restored / active |
| W2 ENGINE | Engineering explorer | no file; reports to Codex | completed |

## Current First Loop

The first 0.8 loop is:

1. Complete guardrail core batch G6-G10.
2. Finalize AQL/QA/User regression protocols.
3. Use engineering explorer report to choose route-gate insertion points.
4. Implement the smallest safe validator set.
5. Run focused regression.
6. AQL/QA judge results.
7. Produce next loop workpack.

## Current Loop2 State

Loop2A engineering hotfix is completed:

- added `jfind-employment-transition-no-shikakugai-bridge`;
- added P0 validator for `J-Find` + `資格外活動` employment bridge;
- added terminal-blocking P1 validator for HSP1 `就労資格証明書` alternate-route wording;
- added P2 validator for `国税その3` mislabeled as income proof;
- verified by unit tests, typecheck, lint, P0 cycle scripts, and private replay over Loop1 AQL package.

Loop2B targeted rerun was prepared, then executed after a valid provider environment became available:

- prep doc: `docs/eval/TEBIQ_0_8_LOOP2B_TARGETED_RERUN_PREP.md`;
- final composite private AQL packet: `/tmp/tebiq-0.8-rur-loop2b-final-composite-20260515-aql.json`;
- final result: 17/17 completed, terminal guardrail findings 0;
- AQL/QA result: release PASS, no release-blocking P0/P1.

0.8 production release then shipped through:

- PR #131: `TEBIQ 0.8 release candidate safety gates`;
- PR #132: `fix: protect internal admin surfaces`.

Current post-release focus:

1. System convergence and technical-debt cleanup.
2. Production observation and small safety fixes only.
3. FACT/DOMAIN quality control before more legal-source cards are connected to runtime.

## Stop / Escalation Conditions

Codex may continue without asking for routine choices.

Escalate only if:

- official sources contradict each other on a P0/P1 guardrail;
- DOMAIN-level practical judgement is required before engineering can safely proceed;
- a production privacy/security issue is confirmed;
- a planned implementation would change user-facing answer behavior without a regression path.
