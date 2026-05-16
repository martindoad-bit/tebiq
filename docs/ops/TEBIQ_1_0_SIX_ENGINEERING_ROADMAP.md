# TEBIQ 1.0 Six Engineering Roadmap

**Status:** active / production-lead execution plan  
**Owner:** Codex Production Lead / AI Engineering Lead  
**Created:** 2026-05-16  
**Last updated:** 2026-05-16  
**Consumers:** FACT, DOMAIN, AQL, QA, ENGINE, CODEXUI, Product Copy, future Codex windows

This file is the current execution memory for moving TEBIQ from 0.8.5 internal
validation to 1.0 release. If the conversation context is compressed or lost,
read this file before resuming work.

---

## 0. Product Definition

TEBIQ 1.0 is not "more pages" and not "AI replaces an administrative scrivener".

TEBIQ 1.0 means:

```text
An app-like residence-friction reduction system for foreigners in Japan.
```

It should help users:

- understand what kind of residence / procedure / material problem they are in;
- avoid dangerous wrong actions;
- prepare common documents and procedures without reading scattered Japanese pages;
- identify deep-water cases early;
- route to the right human or official window with a cleaner fact pack;
- keep consultation and materials experience stable on mobile.

The product has three current surfaces:

1. **提问 Tab**: safe AI consultation with fixed answer-summary labels.
2. **材料 Tab**: scenario-first official-material checklist system.
3. **Eval Lab / internal quality loop**: trace, score, annotate, and repair answer quality.

The answer-summary labels are frozen only for TEBIQ frontend answers:

```text
先看这里
当前判断
建议动作
暂缓事项
```

Do not use those four labels as the Codex-to-founder work-report style.

---

## 1. Current Starting Point

Starting state as of 2026-05-16:

- Production 0.8 is live and admin/internal protection has been fixed.
- Local 0.8.5 Batch A has connected the first governed card-import path.
- Runtime fact cards: 101 filesystem cards and 101 DB rows in the current local
  `.env.local` target.
- First24 provider-backed 0.8.5 run completed:
  - `24/24 completed`;
  - `0` validator findings after targeted fixes;
  - `21/24` carried fact-card audit rows;
  - remaining empty rows are expected route / negative-control samples.
- Materials Tab has 13 topics and stable `/quick-reference/[id]` pages, but it
  is still thin.
- Eval Lab can show fact ids, route gate ids, and validator finding counts.
- Larger legal-source / knowledge assets exist, but only a governed subset is
  runtime-connected.

Important documents:

- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/ops/TEBIQ_CARD_IMPORT_TO_PRODUCT_PLAN.md`
- `docs/eval/TEBIQ_0_8_5_AQL_TEST_PLAN.md`
- `docs/eval/TEBIQ_0_8_5_CARD_IMPORT_FIRST24.json`
- `docs/eval/TEBIQ_0_8_5_FIRST24_RUN_RESULT.json`
- `docs/domain/TEBIQ_0_8_5_IMPORT_DOMAIN_REVIEW.md`
- `docs/engineering/TEBIQ_0_8_5_CARD_IMPORT_ENGINEERING_REVIEW.md`
- `docs/product/TEBIQ_COPY_CANON.md`

---

## 2. Execution Rule

Proceed through six large engineering programs in order:

```text
1. 0.8.5 Release Candidate
2. Knowledge Asset Import
3. Materials Tab Tooling
4. Deep-Water Routing And Professional Boundary
5. Eval Lab Quality Flywheel
6. 1.0 Release
```

Rules:

- Do not skip ahead because a page "looks fine".
- If a program blocks, loop locally: diagnose, patch, test, re-run AQL / DOMAIN
  or QA as needed.
- Do not ask the founder to resolve ordinary engineering or QA blockers.
- If a blocker is genuinely business/domain-level, record it in this file and
  continue other non-conflicting work.
- When Program 6 passes all release gates, deploy to `tebiq.jp` without another
  confirmation request. If deployment credentials or provider state are missing,
  record that as a release blocker instead of pretending deployment happened.

---

## 3. Program 1: 0.8.5 Release Candidate

**Goal:** Prove the current card-backed answer path is stable beyond the First24
sample.

### Scope

- Expand First24 to a 50-60 question real-user matrix.
- Use real provider-backed TEBIQ answers through Eval Lab / production-stream
  path, not prompt-only simulation.
- Cover:
  - address / moving / residence card;
  - job change / institution notification;
  - spouse / divorce / remarriage / DV signals;
  - 技人国 work-scope traps;
  - 経営管理 company disposition and 2025 reform risk;
  - 永住, tax, pension, social insurance;
  - 留学 and qualification-outside-activity;
  - notices, missing materials, nonpermission;
  - negative controls.

### Window responsibilities

- **AQL:** create / extend real-user test matrix, score answers, identify why
  an answer is not good enough.
- **DOMAIN:** review only high-risk semantic boundaries and positive safe routes.
- **ENGINE / Codex:** run provider tests, repair matcher / route gates /
  validators / prompt, update docs.
- **QA:** verify technical path, persistence, audit events, and negative controls.
- **FACT:** only supply missing official-source facts if a failure is caused by
  source absence.

### Acceptance

- 50-60 provider-backed samples completed.
- P0 = 0.
- No unresolved P1 without a concrete route-gate / validator / DOMAIN action.
- Negative controls do not overmatch.
- `npm test`, `npm run lint`, `npx tsc --noEmit --pretty false`,
  `npm run qa:card-import-audit`, and targeted eval scripts pass.
- Result report is written under `docs/eval/`.

---

## 4. Program 2: Knowledge Asset Import

**Goal:** Turn cards from inventory into governed product assets.

### Scope

- Inventory fact cards, legal-source cards, guardrail cards, materials cards,
  and deep-water candidates.
- Classify each usable asset as:
  - positive answer fact;
  - negative guardrail;
  - materials checklist;
  - deep-water detection;
  - source-only evidence;
  - quarantine.
- Resolve source registry debt where route gates point to ids that cannot be
  mapped to concrete assets.
- Ensure official-source, state, risk, scope, and review flags are preserved.
- Keep 2025 経営管理 reform materials separated from old 500万円 shorthand and
  unresolved transition-practice issues.

### Window responsibilities

- **FACT:** source integrity, card metadata, missing official locators.
- **DOMAIN:** high-risk semantic classification and quarantine decisions.
- **ENGINE / Codex:** schemas, sync / audit scripts, matcher gates, source-id
  registry repair.
- **AQL:** confirm imported cards improve answers without making them rigid or
  overconfident.
- **QA:** drift audit and regression.

### Acceptance

- Every runtime-connected card has a declared product destination.
- Unreviewed / conflicted cards cannot produce positive frontend certainty.
- Source registry unresolved count is reduced to a release-acceptable level or
  documented with non-runtime status.
- Sync / dry-run / card-import audit passes.

---

## 5. Program 3: Materials Tab Tooling

**Goal:** Make Materials a practical repeated-use checklist tool, not a thin
source list.

### Scope

Prioritize 10-15 user-important topics:

- address change / moving;
- job change / institution notification;
- 技人国 renewal / change;
- 経営管理 renewal / change;
- family stay renewal;
- Japanese spouse renewal and divorce / remarriage boundaries;
- student renewal;
- permanent residence;
- resident tax certificates;
- national tax certificate `その3`;
- pension / social insurance documents;
- notices / missing materials / nonpermission response.

Each topic should include:

-适用对象;
- material cards;
- who prepares it;
- where to get it;
- timing / validity when source-backed;
- conditional materials;
- common mistakes;
- related checklist links;
- "ask TEBIQ" bridge for case-specific uncertainty;
- clear warning that complete materials do not guarantee permission.

### Window responsibilities

- **FACT:** official materials source pack and source locators.
- **DOMAIN:** mark where materials become judgement / deep-water.
- **Product Copy:** fixed app-like microcopy only.
- **CODEXUI / ENGINE:** mobile structure, collapsed cards, related links,
  no card-inside-card clutter.
- **QA:** mobile / desktop visual QA and content smoke.

### Acceptance

- Core materials pages are useful on mobile without long scrolling fatigue.
- Default collapsed behavior works for nested material details.
- Related materials and scenarios can be reached without scanning the full list.
- User-facing copy says `材料` / `材料清单`, not `速查`.
- No material page implies approval guarantee.

---

## 6. Program 4: Deep-Water Routing And Professional Boundary

**Goal:** Make TEBIQ reliably know when not to hard-answer.

### Scope

High-priority deep-water families:

- possible overstay / special-period end;
- pending status change and new work start;
- HSP1 institution change and already-started work;
- DV / address safety;
- spouse divorce / remarriage / status cancellation risk;
- business-manager to employment-status change with company closure / transfer;
- PR pending while current status expires;
- late tax / pension / social insurance remediation;
- nonpermission and notices;
- incomplete materials before expiry;
- 技人国 work-scope ambiguity.

### Window responsibilities

- **DOMAIN:** define safe positive route where possible; define must-not-answer
  boundary where not possible.
- **AQL:** judge whether deep-water answers are actually useful or just
  generic disclaimers.
- **ENGINE / Codex:** route gates, validators, extraction prompts, Eval Lab labels.
- **FACT:** source support for official parts only.
- **QA:** trap questions and follow-up regressions.

### Acceptance

- P0 deep-water cases do not produce confident legal / permission conclusions.
- Answers still give a useful safe next action.
- Professional routing distinguishes 行政书士, 入管, 弁護士, 市区町村,
  税务署, 年金事务所 where relevant.
- Deep-water routes are covered by tests and Eval Lab samples.

---

## 7. Program 5: Eval Lab Quality Flywheel

**Goal:** Make answer improvement systematic rather than memory-dependent.

### Scope

- Batch generation for candidate / current answers.
- AQL scoring and reviewer notes.
- DOMAIN risk labels.
- External scrivener annotation path where available.
- Same-question version comparison.
- Filters by issue family, visa/status, risk, route gate, finding, card id.
- Failure-to-fix loop:
  - new fact card;
  - route gate;
  - validator;
  - prompt rule;
  - materials page improvement;
  - quarantine.

### Window responsibilities

- **AQL:** scoring rubric and quality diagnosis.
- **DOMAIN:** safety tags and high-risk route review.
- **ENGINE / Codex:** Eval Lab UI / API / persistence / export.
- **QA:** batch run reliability, annotation persistence, data integrity.
- **FACT:** source follow-up only when an answer failure needs source work.

### Acceptance

- A failed answer can be traced to a concrete owner and repair type.
- Re-run after repair is easy.
- Review outputs become durable docs or DB records, not chat-only memory.
- Eval Lab remains admin/internal protected.

---

## 8. Program 6: 1.0 Release

**Goal:** Publicly release TEBIQ 1.0 only after safety, content, materials, QA,
and production gates pass.

### Scope

- Production DB fact-card sync.
- Production env flag verification, especially `FACT_LAYER_ENABLED`.
- Admin/internal fail-closed smoke.
- Main consultation path smoke.
- Materials Tab mobile QA.
- Consultation record / supplement / share QA.
- Eval Lab / internal access QA.
- Scrivener lead admin QA if touched.
- Copy canon audit.
- Final docs and rollback plan.
- Deploy to `tebiq.jp` after all gates pass.

### Acceptance

- 50-60 question RC matrix passes release standard.
- Materials core pages pass mobile QA.
- P0 / P1 release blockers are closed or deep-water-routed.
- Production smoke passes after deploy.
- `docs/product/TEBIQ_CURRENT_STATE.md`, this file, and artifact registry are
  updated to the released state.

---

## 9. Live Execution Log

| Date | Program | Status | Notes |
|---|---|---|---|
| 2026-05-16 | Program 1 | in progress | Six-program roadmap created. Next step is extending First24 to the 50-60 question RC matrix and assigning agents. |

