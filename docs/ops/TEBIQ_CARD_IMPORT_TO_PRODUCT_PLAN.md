# TEBIQ Card Import To Product Plan

**Status:** active / operating plan
**Owner:** Codex Production Lead
**Last updated:** 2026-05-16
**Consumers:** ENGINE, FACT, DOMAIN, AQL, QA, CODEXUI

> This document defines how large card collections enter the product. It is not
> a license to inject every card into user answers. The goal is to turn cards
> into safe, traceable product behavior.

---

## 0. Goal

TEBIQ is building a card-backed consultation and materials system, but the unit
of success is not "more cards cited".

The goal is:

```text
source-backed cards -> governed runtime use -> answer/material improvement that
can be tested, audited, and rolled back.
```

The product must still:

- answer in the frozen sections `先看这里 / 当前判断 / 建议动作 / 暂缓事项`;
- separate official fact, procedure, material preparation, and professional
  judgement;
- route deep-water cases instead of pretending the AI can decide immigration
  practice;
- keep user-facing copy app-like, not engineering-like.

---

## 1. Asset Types

Cards must be classified before import. Do not treat all cards as the same kind
of knowledge.

| Type | Runtime Destination | Can Produce Positive Answer? | Notes |
|---|---|---:|---|
| Positive fact card | `fact_cards` DB -> matcher -> prompt injection + audit | yes, if gated | Source-backed, scoped, no unresolved `needs_review_flags` in injected lines |
| Negative guardrail | route gate / validator | no | Blocks unsafe wording or routes to fact extraction / professional confirmation |
| Materials checklist | Materials Tab / checklist data | no approval prediction | Shows what to prepare, who prepares it, where to get it, source links |
| Deep-water candidate | route / extraction / handoff | no | Detects high-risk situation; asks missing facts or routes out |
| Source-only evidence | Eval Lab / audit / future source card | no | Keeps official source and locator without changing user-facing behavior |

One official source can create multiple assets. Example: a business-manager
reform source can create a positive procedural fact, a negative 500万 guardrail,
a materials checklist note, and a deep-water trigger. These must stay separate.

---

## 2. Promotion Rules

### Positive Fact Promotion

A fact card may enter positive answer context only when all are true:

1. `state` is `ai_verified` or `human_reviewed`;
2. `risk_level` passes the existing matcher gate;
3. the injected text is from `injection_certain_block`;
4. injected lines do not include unresolved `needs_review_flags`,
   `ai_inferred_fields`, or DOMAIN-only judgement;
5. the card has direct user-visible evidence for high/critical facts;
6. the scope is clear enough that the matcher can avoid obvious false positives.

### Guardrail Promotion

A card or source finding should become a route gate / validator when:

- the safe behavior is mostly "do not say X";
- the source supports a boundary but not a complete user route;
- the situation is high risk, time-sensitive, or commonly misunderstood;
- a wrong answer could cause illegal work, missed deadline, wrong office,
  unsafe address disclosure, or bad departure/re-entry behavior.

### Materials Promotion

Materials content should go to the Materials Tab when it answers:

- what the user usually prepares;
- who prepares it;
- where it is obtained;
- validity period / timing if source-backed;
- which scenario uses it.

Materials must not imply:

```text
材料齐了 = 会被许可
```

### Deep-Water Promotion

Deep-water candidates should not be converted into deterministic positive
answers. They should produce:

- missing-fact extraction;
- professional / official-window routing;
- safe next action;
- optional Eval Lab annotation labels.

---

## 3. Current State As Of 2026-05-16

### Source Assets

- `docs/fact-cards/*.md`: 101 sync-scannable fact cards.
- Current file states from `npm run fact-layer:sync:dry`:
  - `ai_verified`: 94
  - `human_reviewed`: 5
  - `ai_extracted`: 2
- Risk mix:
  - `critical`: 6
  - `high`: 54
  - `medium`: 28
  - `low`: 13
- `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md` records 124
  guardrail cards and 292 DOMAIN queue items, but it is a progress ledger, not
  a runtime source.

### Runtime Connections

- `scripts/fact-layer-sync.ts` syncs `docs/fact-cards/*.md` to `fact_cards`.
- `lib/answer/fact-layer/matcher.ts` reads `fact_cards` and returns up to two
  injected cards plus hint-only matches.
- `/api/consultation/stream` and `/api/consultation/follow-up` can emit
  `fact_cards_injected` and persist `fact_card_ids` / `fact_card_audit`.
- Runtime injection is behind `FACT_LAYER_ENABLED=true`.
- route gates and validators are currently hard-coded in:
  - `lib/consultation/route-gates.ts`
  - `lib/consultation/guardrail-validator.ts`
- Materials Tab data is currently static in `lib/quick-reference/topics.ts`;
  it cross-references fact cards with `factCardIds`, not a DB join.

### Observed Import Gaps

- DB currently has 101 fact cards, matching the filesystem inventory after
  `npm run fact-layer:sync` on 2026-05-16.
- Plain address-change questions were not matching `zairyu-address-change`
  because the low-risk threshold required too many keyword hits. The matcher now
  has an opt-in per-card lower threshold plus a required context guard for this
  low-risk procedural card.
- `scripts/qa/fact-layer-qa-runner.ts` was still listening for the old
  `fact_cards` SSE event. It now listens to `fact_cards_injected` and supports
  local `http://` targets.

---

## 4. Import Loop

Each import loop is a small closed circuit. Do not run a giant one-shot import.

### Loop Shape

1. **Inventory**
   - Count filesystem cards, DB cards, states, risks, and missing/extra rows.
   - Run `npm run fact-layer:sync:dry`.

2. **Classify**
   - Assign each batch to positive fact, guardrail, materials, deep-water, or
     source-only.
   - Mark any mixed-rule topic as guardrail/deep-water first.

3. **Connect**
   - Positive facts: sync to `fact_cards`.
   - Guardrails: route gate / validator.
   - Materials: Materials Tab topic/common-material mapping.
   - Deep-water: route / extraction / Eval Lab label.

4. **Dry Run**
   - Use `/api/internal/fact-layer/dry-run` or direct matcher checks.
   - Verify expected hit and expected non-hit.

5. **Answer Test**
   - Use Eval Lab / production stream path, not a separate prompt-only model.
   - Capture `fact_card_audit`, `route_gate_ids`, `guardrail_findings`.

6. **AQL / DOMAIN / QA Review**
   - AQL checks answer quality and regression.
   - DOMAIN checks semantic safety for high-risk topics.
   - QA checks technical path, events, persistence, and negative controls.

7. **Promote Or Quarantine**
   - Promote only when tests pass.
   - Quarantine or downgrade if a card causes overreach.

---

## 5. Test Gate

Before enabling a larger card batch in product behavior:

- `npm run fact-layer:sync:dry` passes;
- targeted matcher dry-run has expected hits;
- negative controls avoid obvious false positives;
- `npm test` passes;
- `npx tsc --noEmit --pretty false` passes;
- `npm run lint` passes;
- at least one Eval Lab / production-stream sample proves audit data appears;
- high-risk changes have AQL and DOMAIN review.

Recommended focused evaluation before broad release:

- 20 known P0/P1 trap questions;
- 12 card-positive-hit questions;
- 8 negative-control questions;
- 8 real-user phrasing questions.

Acceptance:

- 0 P0;
- 0 unresolved P1;
- negative-control false positives close to 0;
- candidate win/tie at least 80% against baseline;
- every failure can be traced to card, route gate, matcher, prompt, provider,
  or UX.

---

## 6. Special Risk Topics

These topics must prefer guardrail / deep-water treatment unless specifically
reviewed:

1. `経営・管理` 2025 reform, old/new rule mixing, 500万 shorthand, 3000万,
   employees, existing-holder transition;
2. company closure /休眠 / liquidation before status change;
3. special period, departure/re-entry, non-permission, overstay;
4. HSP1 institution change and permission-before-work boundaries;
5. pending status change and work-start boundaries;
6. spouse divorce/death/remarriage, separation, DV and address safety;
7. permanent residence public obligations, late payment, pension/insurance;
8. notices, postcards, receipt, result pickup, incomplete materials;
9. short stay, specific activities, side job /資格外活動 boundaries;
10. school attendance, study status, and student work limits.

Rule:

```text
宁可不引用卡，也不要把未确认字段、过渡规则、风险提醒、专业确认触发器包装成用户个案正面结论。
```

---

## 7. Immediate Work Queue

### Done In This Loop

- Defined card import layers and promotion gates.
- Confirmed `fact-layer:sync:dry` passes for 101 filesystem cards.
- Synced the current fact-card filesystem inventory into the configured DB:
  101 scanned, 101 upserted, 0 errors.
- Fixed the QA runner event drift from `fact_cards` to `fact_cards_injected`.
- Fixed low-risk address-change matcher miss for ordinary moving questions
  without globally lowering matcher thresholds.
- Added `npm run qa:card-import-audit` to report filesystem cards, DB cards,
  Materials `factCardIds`, and route-gate source asset coverage.
- Fixed a Materials Tab bridge mapping that referenced the non-existent
  `gijinkoku-job-change-notification` fact card.

### Next Safe Engineering Steps

1. Run DB sync only after confirming the target DB is the intended environment.
2. Verify `FACT_LAYER_ENABLED=true` in the intended runtime before expecting
   user-visible `fact_cards_injected` references.
3. Expand Materials `factCardIds` mappings only after the Materials Tab UI
   structure is stable.
4. Decide whether unresolved route-gate `sourceAssetIds` should remain
   code-only IDs, be mirrored into Knowledge Atlas files, or be mapped to
   fact-card audit records.
