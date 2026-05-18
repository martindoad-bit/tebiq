# Knowledge Runtime Expansion Loop18 — Source Repair + Materials Binding

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop18`  
Scope: Loop17 source-repair candidates and Materials Universe binding gaps

## Goal

Loop18 continued the Knowledge Runtime Expansion Goal after Loop17. The focus
was not a broad batch of new cards, but two high-value repairs:

1. repair the remaining source-unstable startup / family invitation cards;
2. make the Loop17 materials-only spouse / family cards actually reachable from
   the Materials / Quick Reference surface.

## Candidate Set

| Candidate | Loop17 status | Loop18 action |
|---|---|---|
| `startup-visa-keiei-transition` | Source repair deferred | Rewritten into narrow `ANSWER_RUNTIME` fact |
| `kazoku-yobi-naitei-haigusha` | Source repair deferred | Rewritten as `L5_ONLY` / material planning card |
| `eijuu-haigusha-visa` | MATERIALS_ONLY | Bound to new `eijuu-haigusha-materials` topic and material entities |
| `kazoku-taizai-henko` | MATERIALS_ONLY | Bound to new `kazoku-taizai-henko-materials` topic and material entities |
| `nihonjin-haigusha-visa` | MATERIALS_ONLY | Kept on Japanese-spouse material topic; cross-linked with new spouse route |

## Fact Card Actions

### `startup-visa-keiei-transition`

Moved from `ai_extracted` to `ai_verified` with
`runtime_bucket: ANSWER_RUNTIME`.

The rewrite only injects official-source facts:

- startup visa / foreign entrepreneur activity is under recognized body
  management and support;
- the activity period is up to two years;
- after startup activity is completed, the user applies for a status change to
  `経営・管理`;
- for `特定活動44号` startup-visa holders changing to `経営・管理`, the 2025
  reform page separates old/new criteria by confirmation-certificate date:
  confirmation certificate issued by 2025-10-15 -> old criteria; issued on/after
  the revised notification enforcement date -> new criteria.

The card still refuses to decide:

- whether a user's startup activity is "completed";
- what happens if startup activity is not completed within two years;
- edge cases involving confirmation certificate, renewed confirmation
  certificate, correction periods, and the actual change-application timing.

### `kazoku-yobi-naitei-haigusha`

Kept as `ai_extracted`, but moved to `runtime_bucket: L5_ONLY` and rewritten to
remove the earlier unsafe implication that a job offer alone can support family
COE timing.

The rewritten card states only:

- 家族滞在 is for a spouse or child supported by a person with an eligible status;
- job-offer / pre-employment timing, simultaneous COE filing, and substitute
  documents are not directly answered by the official page and need individual
  confirmation;
- product usage should ask about the sponsor's status, COE / residence status,
  start date, support capacity, overseas COE vs domestic status change, and
  whether the path is actually 家族滞在 or a spouse-status route.

## Materials / Quick Reference Actions

Added three user-facing material scenes:

| Topic id | Purpose |
|---|---|
| `eijuu-haigusha-materials` | 永住者・特別永住者の配偶者等 route, distinct from 日本人配偶者等 and 永住申請 |
| `kazoku-taizai-henko-materials` | Domestic status change into 家族滞在 |
| `family-stay-coe-materials` | Overseas spouse / child invitation through 家族滞在 COE |

Also updated:

- Quick Reference search chips and aliases for `永配`, `永住者配偶者等`, and
  family COE / 呼寄せ.
- Material entity `reusedIn` links so shared materials like 住民票, 住民税証明,
  戸籍 / 婚姻・出生証明, 在留カード, 在職証明, and 身元保証書 point to the new
  family / spouse scenes.
- Topic contract test to prove the Loop17 materials-only cards bridge to
  distinct material scenes.

## Current Knowledge Counts

After Loop18 file edits:

| State | Count |
|---|---:|
| `ai_verified` | 223 |
| `human_reviewed` | 5 |
| `ai_extracted` | 33 |
| `disabled` | 8 |
| Total fact cards | 269 |

Runtime-injectable cards are now **228** (`ai_verified` + `human_reviewed`).

Materials topics increased from 43 to **46**. Material references increased
from 215 to **226**.

Production DB still showed the Loop17 count before merge/sync:
`ai_verified=222`, `ai_extracted=34`. Sync must run after merge.

## Validation Before Merge

Commands run:

```bash
npm run fact-layer:sync:dry
npm run qa:card-import-audit
npm test
npm run lint
npx tsc --noEmit --pretty false
```

Results:

| Check | Result |
|---|---|
| fact-layer dry sync | `scanned=269 upserted=0 errors=0` |
| card import audit | filesystem `ai_verified=223`, `ai_extracted=33`, `disabled=8`, `human_reviewed=5`; DB still Loop17 until sync |
| materials audit | 46 topics, 226 references, no missing references |
| route-gate unresolved source assets | 1 known unresolved AQL-origin asset: `aql-rur-037-jfind-employment-bridge` |
| unit tests | 265/265 pass |
| lint | pass |
| TypeScript | pass |

## Product Impact

Loop18 improves both answer runtime and Materials Tab:

- answer runtime gains one narrow, useful startup-visa transition card;
- a previously risky inner-timing family COE card is explicitly kept out of
  ordinary answer runtime;
- Materials / Quick Reference now distinguishes:
  - 日本人配偶者等;
  - 永住者の配偶者等;
  - 家族滞在 domestic change;
  - 家族滞在 overseas COE invitation.

This directly addresses the "cards exist but do not land in the product" gap.

## Remaining Risks

- Startup visa completion criteria and failure-to-complete handling remain
  DOMAIN / administrative-scrivener questions.
- 家族COE timing before sponsor employment remains L5-only; the product should
  ask clarifying facts rather than answer "yes/no" from a job offer.
- The new material topics are structurally useful, but can still be deepened
  later with PDF-level checklist extraction.

## Next Loop Direction

Recommended Loop19:

1. Deepen the new `eijuu-haigusha-materials`, `kazoku-taizai-henko-materials`,
   and `family-stay-coe-materials` topics with PDF-level source extraction where
   available.
2. Add source/url verification tests for the new PDF-backed material sources.
3. Continue expansion with high-frequency material entities rather than
   practice-threshold cards.
