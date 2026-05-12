# Legal Source P0 Cycle 2 — Batch 5 Report

**Scope**: LS-P0C2-100 to LS-P0C2-122 plus rewrites  
**Topic**: 介護 / regulated professions / 高度専門職 / long-tail criteria cleanup  
**Default card state**: `ai_extracted`  
**Production injection**: none  
**Codex status**: landed as `ai_extracted`; machine validation passed

---

## Source Access Notes

- Primary source used for landing-criteria claims: e-Gov current text of `出入国管理及び難民認定法第七条第一項第二号の基準を定める省令`.
- Supporting sources used:
  - ISA 在留資格「介護」
  - ISA 在留資格「高度専門職」（高度人材ポイント制）
  - ISA 在留資格「興行」
  - ISA `在留資格「興行」に係る上陸基準省令等の改正について`
- No user-facing production injection is enabled. All new cards are `state: ai_extracted` and have empty injection blocks.
- Batch 5 is a cleanup/router batch. It intentionally avoids full long-tail eligibility cards where the risk is high or existing cards already cover activity scope.

---

## Candidate Decision Table

| Candidate | FACT decision | Codex fact ID | Notes |
|---|---|---|---|
| LS-P0C2-100 | ready | `nursing-care-landing-care-worker-route` | Adds landing-criteria layer for 介護; not a duplicate of Cycle 1 activity anchor. |
| LS-P0C2-101 | ready, split | `legal-accounting-landing-qualified-profession-criterion` / `medical-landing-qualified-profession-criterion` | Split regulated-profession criteria into two cards to avoid overbroad matching. |
| LS-P0C2-110 | ready | `advanced-professional-landing-points-router` | Point-system router only; no point calculation or permanent-residence answer. |
| LS-P0C2-111 | ready | `advanced-professional-category-disambiguation` | Prevents 高度専門職1号イ/ロ/ハ mixing. |
| LS-P0C2-120 | ready | `research-education-landing-criteria-locator` | Source locator/map for 研究・教育 rows; does not create a full long-tail eligibility answer. |
| LS-P0C2-121 | ready | `entertainer-amendment-sensitive-router` | Amendment-sensitive router for 興行. |
| LS-P0C2-122 | ready | `trainee-technical-intern-training-disambiguation` | Disambiguates 研修 and 技能実習. |

---

## Ready Candidates

Eight cards were normalized locally:

- `nursing-care-landing-care-worker-route`
- `legal-accounting-landing-qualified-profession-criterion`
- `medical-landing-qualified-profession-criterion`
- `advanced-professional-landing-points-router`
- `advanced-professional-category-disambiguation`
- `research-education-landing-criteria-locator`
- `entertainer-amendment-sensitive-router`
- `trainee-technical-intern-training-disambiguation`

---

## Duplicate / Rewrite / Held Candidates

- No source gap was identified by FACT.
- `LS-P0C2-101` was split into two cards instead of one combined regulated-profession card.
- Existing Cycle 1 activity-scope cards were not replaced:
  - `nursing-care-certified-care-worker-scope`
  - `legal-accounting-qualified-profession-scope`
  - `medical-qualified-profession-scope`
  - `technical-intern-training-plan-type-scope`
- Existing 高度専門職 answer cards were not replaced:
  - `kodo-senmon-shoku-points`
  - `kodo-senmon-shoku-eijuu`
- No final eligibility card was created for 興行 or 高度専門職.

---

## Needs DOMAIN / Source Gaps

No source gap at card-creation level.

Must remain outside these cards:

- 介護: care-worker qualification route details, EPA route, 特定技能介護, 技能実習介護, concrete path selection.
- 法律・会計業務: foreign qualification, Japanese registration, monopoly-practice scope, general legal/accounting assistant boundary.
- 医療: Japanese medical license, practice registration, concrete medical act, hospital admin/interpreter/care-helper boundary.
- 高度専門職: point calculation details, bonus points, J-Skip/J-Find, permanent-residence timing as final conclusion.
- 興行: contract/facility/remuneration requirements, night entertainment, model/livestream/social-media cases, short-stay boundary.
- 研修/技能実習: training-plan certification, supervising organization, transition to 特定技能, 育成就労.

---

## Codex Normalization Notes

- Kept all cards at `ai_extracted`, `controlled_alpha_eligible: false`, with empty injection blocks.
- Used compound trigger phrases rather than broad single words. The Batch 5 fixture matrix explicitly blocks broad-only prompts for `介護`, `医療`, `法律`, `会計`, `高度`, `教授`, `研究`, `教育`, `興行`, `研修`, and `技能実習`.
- Normalized FACT-recommended IDs into shorter local fact IDs while preserving candidate IDs in `legal_source.candidate_id`.
- Added `related_fact_cards` for existing activity/answer cards instead of replacing them.

---

## AQL / QA Notes

AQL direction:

- Enter as `ai_extracted`: 介護, 法律・会計, 医療, 高度 router, 高度1号イロハ disambiguation, 研修/技能実習 disambiguation.
- 興行 must remain sensitivity/router only.
- 研究・教育 must remain locator/map only.
- Do not turn any of these into final eligibility or permission-probability cards.

QA blocking risks:

- "介护工作 = 介護签"
- "医院工作 = 医療签"
- "法律/会计公司工作 = 法律・会計業務"
- "70点 = 马上永住"
- 高度1号イ/ロ/ハ混用
- "研修 = 技能実習 = 特定技能"
- Batch 5 `ai_extracted` cards entering production injection

---

## Machine Validation

Local Batch 5 dry-run matrix:

```text
npx tsx scripts/test/test-p0-cycle2-batch5-dry-run-fixtures.ts
Legal Source P0 Cycle 2 Batch 5 dry-run fixture matrix: 54/54 pass
```

Full regression suite:

```text
git diff --check
npx tsx scripts/fact-layer-sync.ts --dry-run
  fact-layer-sync: scanned=180 upserted=0 errors=0
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
npx tsx scripts/test/test-p0-cycle2-batch5-dry-run-fixtures.ts
  54/54 pass
```
