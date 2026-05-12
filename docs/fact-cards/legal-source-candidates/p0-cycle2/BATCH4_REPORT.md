# Legal Source P0 Cycle 2 — Batch 4 Report

**Scope**: LS-P0C2-070 to LS-P0C2-074, LS-P0C2-080 to LS-P0C2-092  
**Topic**: 特定技能 / 企業内転勤 / 技能 landing criteria and disambiguation  
**Default card state**: `ai_extracted`  
**Production injection**: none  
**Codex status**: landed as `ai_extracted`; machine validation passed

---

## Source Access Notes

- Primary source used for this batch: e-Gov current text of `出入国管理及び難民認定法第七条第一項第二号の基準を定める省令`.
- Supporting source for disambiguation/router cards: e-Gov current text of `出入国管理及び難民認定法`.
- No user-facing production injection is enabled. All cards are `state: ai_extracted` and have empty injection blocks.
- Batch 4 is deliberately granular: it extracts criteria/router boundaries only, not field-specific operation guidelines or individual eligibility conclusions.

---

## Candidate Decision Table

| Candidate | Fact ID | Decision | Notes |
|---|---|---|---|
| LS-P0C2-070 | `ssw1-skill-evaluation-criterion` | ready | 特定技能1号 skill evaluation criterion. Keeps 技能実習2号良好修了 relation as boundary, not conclusion. |
| LS-P0C2-071 | `ssw1-japanese-ability-criterion` | ready | 特定技能1号 Japanese ability criterion. Does not list concrete test names/levels. |
| LS-P0C2-072 | `ssw1-contract-support-plan-router` | ready | Router for contract, accepting organization, and support-plan framework. Does not extract Article 2-5 details. |
| LS-P0C2-073 | `ssw2-landing-criteria-differs-from-ssw1` | ready | Disambiguates SSW2 from SSW1; blocks automatic-upgrade framing. |
| LS-P0C2-074 | `ssw-field-specific-criteria-source-router` | ready | Router for field-specific SSW criteria; prevents general row overreach. |
| LS-P0C2-080 | `intra-company-transfer-one-year-overseas-office` | ready | Captures one-year overseas-office transfer requirement; blocks ordinary job-change framing. |
| LS-P0C2-081 | `intra-company-transfer-gijinkoku-equivalent-work` | ready | Captures 技人国-equivalent activity scope for intra-company transfer. |
| LS-P0C2-082 | `intra-company-transfer-japanese-comparable-pay` | ready | Captures Japanese-comparable remuneration criterion; no salary calculation. |
| LS-P0C2-090 | `skilled-labor-occupation-specific-criteria` | ready | Locator/structure card for occupation-specific Skilled Labor criteria. |
| LS-P0C2-091 | `skilled-labor-foreign-cuisine-ten-year-route` | ready | Foreign cuisine/food-manufacturing 10-year route. Does not count concrete experience. |
| LS-P0C2-092 | `skilled-labor-ssw-titp-disambiguation` | ready | Disambiguates 技能 / 特定技能 / 技能実習. |

---

## Ready Candidates

All 11 candidates were normalized as `ai_extracted` cards:

- `ssw1-skill-evaluation-criterion`
- `ssw1-japanese-ability-criterion`
- `ssw1-contract-support-plan-router`
- `ssw2-landing-criteria-differs-from-ssw1`
- `ssw-field-specific-criteria-source-router`
- `intra-company-transfer-one-year-overseas-office`
- `intra-company-transfer-gijinkoku-equivalent-work`
- `intra-company-transfer-japanese-comparable-pay`
- `skilled-labor-occupation-specific-criteria`
- `skilled-labor-foreign-cuisine-ten-year-route`
- `skilled-labor-ssw-titp-disambiguation`

---

## Held / Needs DOMAIN / Source Gaps

No candidate was held at card-creation level.

The following details remain outside Batch 4 card scope and must not be answered as final user-facing conclusions from these cards alone:

- 特定技能1号: concrete field-specific exam names, accepted test levels, and 技能実習2号良好修了 relation for a specific field.
- 特定技能1号: Article 2-5 details for contract, accepting organization, registered support organization, and support plan.
- 特定技能2号: concrete field availability and field-specific SSW2 tests.
- 企業内転勤: concrete corporate relationship qualification and salary comparability calculation.
- 技能: complete occupational row breakdown, Thailand-Japan EPA exception, and concrete experience-counting.

---

## Codex Normalization Notes

- Kept every new card at `state: ai_extracted`, `controlled_alpha_eligible: false`, with empty injection blocks.
- Added compound Chinese/Japanese user phrases for the main ambiguity clusters:
  - SSW1 Japanese/skill overanswer;
  - SSW1 vs SSW2 confusion;
  - field-specific SSW transfer;
  - intra-company transfer vs ordinary job change;
  - 技能 vs 特定技能 vs 技能実習.
- Added broad-trigger negative fixtures so single words like `技能`, `日语`, `支援`, `分野`, `报酬`, and `转勤` do not fire Batch 4 cards by themselves.

---

## AQL / QA Notes

AQL accepted all 11 Batch 4 cards as `ai_extracted` with two guardrails:

- Router/disambiguation cards (`ssw1-contract-support-plan-router`, `ssw-field-specific-criteria-source-router`, `skilled-labor-ssw-titp-disambiguation`) must route to source areas and block overreach, not generate final eligibility conclusions.
- Source locators must stay explicit. If Article 2-5 or field-specific criteria are not extracted, the card must say so through exclusion scope and needs-review flags.

QA focus:

- SSW1 must not become "Japanese passed" or "skill exam passed" = approval.
- SSW2 must not become automatic extension of SSW1.
- Field-specific SSW rules must not be inferred from general SSW row or another field.
- Intra-company transfer must not become ordinary overseas-experience/job-change route.
- Skilled Labor must not absorb SSW/TITP language or apply the foreign-cuisine 10-year route to every skilled occupation.

---

## Machine Validation

Local Batch 4 dry-run matrix:

```text
npx tsx scripts/test/test-p0-cycle2-batch4-dry-run-fixtures.ts
Legal Source P0 Cycle 2 Batch 4 dry-run fixture matrix: 49/49 pass
```

Full regression suite:

```text
git diff --check
npx tsx scripts/fact-layer-sync.ts --dry-run
  fact-layer-sync: scanned=172 upserted=0 errors=0
npx tsx scripts/test/test-fact-layer.ts
  46/46 pass
npx tsx scripts/test/test-fact-injection-smoke.ts
  18/18 pass
npx tsx scripts/test/test-p0-cycle1-dry-run-fixtures.ts
  61/61 pass
npx tsx scripts/test/test-p0-cycle2-dry-run-fixtures.ts
  40/40 pass
npx tsx scripts/test/test-p0-cycle2-batch2-dry-run-fixtures.ts
  44/44 pass
npx tsx scripts/test/test-p0-cycle2-batch3-dry-run-fixtures.ts
  46/46 pass
npx tsx scripts/test/test-p0-cycle2-batch4-dry-run-fixtures.ts
  49/49 pass
```
