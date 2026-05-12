# Legal Source P0 Cycle 2 — Batch 2 Report

**Scope**: LS-P0C2-030 to LS-P0C2-039  
**Topic**: 経営・管理 2025 amended landing criteria and transition boundary  
**Default card state**: `ai_extracted`  
**Production injection**: none  
**Codex status**: FACT extraction received; AQL/QA validation received; 6 draft cards normalized as `ai_extracted`

---

## Source Access Notes

| Source | Access | Notes |
|---|---|---|
| C2-S1 e-Gov 上陸基準省令 | readable | API/text confirms the 経営・管理 row. |
| C2-S1-API | readable | `https://laws.e-gov.go.jp/api/1/lawdata/402M50000010016` used for stable quote locators. |
| C2-S3 ISA 改正 page | readable | `https://www.moj.go.jp/isa/applications/resources/10_00237.html`; page confirms 2025-10-16 enforcement and user-facing amendment explanations. |
| Existing cards | readable | `keiei-kanri-2025-10` and `keiei-kanri-existing-holder-update` already cover parent/transition answers. |

---

## Candidate Decision Table

| Candidate | Decision | Landing |
|---|---|---|
| LS-P0C2-030 | duplicate_with_existing | No new card; parent is `keiei-kanri-2025-10`. |
| LS-P0C2-031 | ready | `keiei-kanri-full-time-employee-criterion` |
| LS-P0C2-032 | ready | `keiei-kanri-capital-asset-3000man-criterion` |
| LS-P0C2-033 | ready | `keiei-kanri-office-establishment-criterion` |
| LS-P0C2-034 | hold | Not landed. AQL rejected top-level landing-criteria treatment; should become a scoped procedure/material card only after DOMAIN boundary review. |
| LS-P0C2-035 | ready | `keiei-kanri-degree-or-three-year-experience-criterion` |
| LS-P0C2-036 | ready | `keiei-kanri-japanese-language-criterion` |
| LS-P0C2-037 | ready | `keiei-kanri-management-remuneration-criterion` |
| LS-P0C2-038 | duplicate_with_existing | No new card; transition is covered by `keiei-kanri-existing-holder-update`. |
| LS-P0C2-039 | duplicate_with_existing | No new card; existing-holder routing is covered by `keiei-kanri-existing-holder-update`. |

---

## Ready Candidates

Landed as top-level `docs/fact-cards/*.md` files, all with `state: ai_extracted` and empty injection blocks:

| Fact card | Key claim | Safety boundary |
|---|---|---|
| `keiei-kanri-full-time-employee-criterion` | 改正後の事業規模基準 includes full-time staff in Japan other than management/administration persons. | Do not apply directly to existing-holder renewal transition. Do not decide concrete employment status. |
| `keiei-kanri-capital-asset-3000man-criterion` | Business property used for the business, including capital/investment totals, must be at least 3000万円. | Do not say 3000万円 guarantees permission; do not calculate concrete asset eligibility. |
| `keiei-kanri-office-establishment-criterion` | Business office must exist in Japan, or facility must be secured for an unstarted business. | Do not invent fixed area thresholds; do not absolutize home-office cases. |
| `keiei-kanri-degree-or-three-year-experience-criterion` | Applicant route includes relevant doctoral/master/professional degree or 3+ years management/administration experience. | Do not treat any ordinary work experience as qualifying. |
| `keiei-kanri-japanese-language-criterion` | Applicant or a non-part-time person engaged in the business must have B2-equivalent Japanese ability signal. | Do not say only the applicant personally must have N2; do not merge with the staff-count criterion. |
| `keiei-kanri-management-remuneration-criterion` | When the applicant will engage in business administration, remuneration must be Japanese-comparable. | Do not expand into a fixed-salary rule for all business owners or all employees. |

---

## Held / Needs DOMAIN / Source Gaps

| Item | Status | Reason |
|---|---|---|
| LS-P0C2-034 business plan expert confirmation | held | Source support exists in ISA application-handling layer, but AQL rejected treating it as a C2-S1 landing-criteria body card. Needs DOMAIN on application type and renewal boundary before product use. |
| LS-P0C2-038 transition handling | duplicate + DOMAIN queue | Existing human-reviewed transition card covers the main route. Practical meaning of improvement outlook remains DOMAIN territory. |
| LS-P0C2-039 existing-holder renewal router | duplicate | Existing human-reviewed card should remain the route owner for existing-holder renewal. |

---

## Codex Normalization Notes

- Codex landed 6 granular cards, not 7. `keiei-kanri-business-plan-expert-confirmation` was drafted briefly, then removed after AQL rejected it as a top-level card.
- All new cards are `ai_extracted` with no injection block, so production remains fail-closed for these candidates.
- Added trigger phrases only where dry-run showed natural questions were not observable. Trigger changes are combinations such as `经管 3000万`, `经管 常勤职员`, `经管 N2`, not broad bare `经管`.
- Existing `keiei-kanri-2025-10` and `keiei-kanri-existing-holder-update` remain parent/production cards.

---

## AQL / QA Notes

AQL accepted: 031, 032, 033, 035, 036, 037 as `ai_extracted`.

AQL held: 034. It should not be presented as a C2-S1 landing-criteria body condition, and must not be generalized to all renewals.

QA required a separate script:

- `scripts/test/test-p0-cycle2-batch2-dry-run-fixtures.ts`

QA blocking cases covered:

- state drift above `ai_extracted`;
- accidental production injection;
- internal term leakage;
- old 500万円 answer regression;
- existing-holder renewal incorrectly forced into immediate full new criteria;
- full-time staff scope confusion;
- office fixed-area invention;
- Japanese-language subject confusion;
- management remuneration over-expansion;
- held 034 accidentally added as a top-level card.

---

## Machine Validation

Current local validation after normalization:

```text
git diff --check
pass

npx tsx scripts/fact-layer-sync.ts --dry-run
scanned=153 upserted=0 errors=0

npx tsx scripts/test/test-fact-layer.ts
0.6 Pack 2.1 fact-layer foundation contract: 46/46 pass

npx tsx scripts/test/test-fact-injection-smoke.ts
0.6 Pack 2.2 fact-injection 11-question smoke: 18/18 pass

npx tsx scripts/test/test-p0-cycle1-dry-run-fixtures.ts
Legal Source P0 Cycle 1 dry-run fixture matrix: 61/61 pass

npx tsx scripts/test/test-p0-cycle2-dry-run-fixtures.ts
Legal Source P0 Cycle 2 Batch 1 dry-run fixture matrix: 40/40 pass

npx tsx scripts/test/test-p0-cycle2-batch2-dry-run-fixtures.ts
Legal Source P0 Cycle 2 Batch 2 dry-run fixture matrix: 44/44 pass
```
