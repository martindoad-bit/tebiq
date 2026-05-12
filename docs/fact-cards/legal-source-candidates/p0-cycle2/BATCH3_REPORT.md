# Legal Source P0 Cycle 2 — Batch 3 Report

**Scope**: LS-P0C2-050 to LS-P0C2-063  
**Topic**: 留学 / 家族滞在 landing criteria  
**Default card state**: `ai_extracted`  
**Production injection**: none  
**Codex status**: FACT extraction received; AQL/QA validation received; 8 draft cards normalized as `ai_extracted`

---

## Source Access Notes

| Source | Access | Notes |
|---|---|---|
| C2-S1 e-Gov 上陸基準省令 | readable | 留学 row and 家族滞在 row extracted from current law API/text. |
| C2-S1-API | readable | `https://laws.e-gov.go.jp/api/1/lawdata/402M50000010016` used for source locators. |
| ISA 留学 page | readable | Used only as status/product context, not as replacement for C2-S1. |
| ISA 家族滞在 page | readable | Used only as status/product context, not as replacement for C2-S1. |
| Existing cards | readable | Existing student/dependent cards were checked for overlap and production-routing risk. |

---

## Candidate Decision Table

| Candidate | Decision | Landing |
|---|---|---|
| LS-P0C2-050 | ready | `student-landing-education-institution-category` |
| LS-P0C2-051 | ready | `student-living-expense-support-criterion` |
| LS-P0C2-052 | ready | `student-enrollment-or-admission-criterion` |
| LS-P0C2-053 | ready with review flags | `student-japanese-language-education-source-row` |
| LS-P0C2-054 | ready | `student-criteria-not-renewal-attendance-materials` |
| LS-P0C2-055 to 059 | hold | Workpack undefined; no cards created. |
| LS-P0C2-060 | ready | `dependent-spouse-child-landing-relationship` |
| LS-P0C2-061 | ready | `dependent-support-received-criterion` |
| LS-P0C2-062 | ready with review flags | `dependent-sponsor-status-row-check` |
| LS-P0C2-063 | duplicate_with_existing | No new card; parent/ordinary-route boundary stays with existing dependent scope cards and new 060/062 tests. |

---

## Ready Candidates

Landed as top-level `docs/fact-cards/*.md` files, all with `state: ai_extracted` and empty injection blocks:

| Fact card | Key claim | Safety boundary |
|---|---|---|
| `student-landing-education-institution-category` | 留学 landing criteria must be read by education institution/category branch. | Do not say any school admission is enough. |
| `student-living-expense-support-criterion` | 留学 includes sufficient means to cover living expenses, including assets/scholarship/other means, with third-party support handled separately. | Do not invent fixed balance or income thresholds. |
| `student-enrollment-or-admission-criterion` | 留学 centers on entering an education institution and receiving education; research/auditor cases have specific admission/listening-time conditions. | Do not generalize the 10-hour condition to all students. |
| `student-japanese-language-education-source-row` |専ら日本語教育 must be checked under the specific Japanese-language education branch. | Do not generalize every language school or private course. |
| `student-criteria-not-renewal-attendance-materials` | Landing criteria, renewal materials, and attendance review are separate layers. | Do not turn attendance rate into a fixed landing threshold. |
| `dependent-spouse-child-landing-relationship` | 家族滞在 is for dependent spouse or child. | Do not include parents/siblings/fiancés as ordinary family-stay objects. |
| `dependent-support-received-criterion` | 家族滞在 requires staying while receiving support. | Do not create fixed income thresholds or confuse health-insurance support. |
| `dependent-sponsor-status-row-check` | Sponsor status must be checked against the 家族滞在 row; student sponsors have row limitations. | Do not say all students or all legal residents can sponsor. |

---

## Held / Needs DOMAIN / Source Gaps

| Item | Status | Reason |
|---|---|---|
| LS-P0C2-053 | landed with review flags | Japanese-language education institution row references designated/certified institutions and transition notes. Needs specialist wording before any promotion. |
| LS-P0C2-062 | landed with review flags | Sponsor-status row is complex, especially student sponsors. It is a locator card, not a full sponsor matrix. |
| LS-P0C2-055 to 059 | hold | Not defined in workpack; no source-backed candidate created. |
| LS-P0C2-063 | duplicate | No top-level card created. Parent/family-member boundary is already covered by dependent scope cards and Batch3 060/062. |

---

## Codex Normalization Notes

- Codex landed 8 cards. All remain `ai_extracted` and therefore drop in production matching.
- No existing production card was modified in this batch. AQL recommended future locator/negative-use strengthening for the parent-dependent scope card, but that should be its own review because existing production behavior is involved.
- Trigger phrases avoid bare `留学`, `家族滞在`, and `扶养` as much as possible; most are paired phrases such as `留学 上陆基准 学校类别`, `出席率和上陆基准区别`, `家族滞在 sponsor status row`.
- A production regression revealed that a health-insurance dependent question can currently be captured by an unrelated higher-risk card. This predates Batch3 and is recorded as a future matcher-quality risk, not fixed in this batch.

---

## AQL / QA Notes

AQL accepted 050-054 and 060-062 as `ai_extracted`.

AQL held 055-059 and recommended not creating 063.

QA required a separate script:

- `scripts/test/test-p0-cycle2-batch3-dry-run-fixtures.ts`

QA blocking cases covered:

- state drift above `ai_extracted`;
- accidental production injection;
- internal term leakage;
- material checklist confused with eligibility;
- attendance/renewal review confused with landing criteria;
- Japanese-language school row generalized to all language schools;
- fixed living-expense or income thresholds invented;
- parents/siblings/fiancés included as ordinary 家族滞在 objects;
- student sponsors generalized;
- existing production cards for work/renewal/invitation paths displaced by Batch3 cards.

---

## Machine Validation

Current local validation after normalization:

```text
git diff --check
pass

npx tsx scripts/fact-layer-sync.ts --dry-run
scanned=161 upserted=0 errors=0

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

npx tsx scripts/test/test-p0-cycle2-batch3-dry-run-fixtures.ts
Legal Source P0 Cycle 2 Batch 3 dry-run fixture matrix: 46/46 pass
```
