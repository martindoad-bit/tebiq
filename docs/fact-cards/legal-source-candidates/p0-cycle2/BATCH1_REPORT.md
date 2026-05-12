# Legal Source P0 Cycle 2 — Batch 1 Report

**Date**: 2026-05-12  
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md)  
**Theme**: 上陸基準省令 source-role anchors + 技術・人文知識・国際業務 criteria  
**Codex status**: FACT extraction received; AQL/QA validation received; formal draft cards committed as `ai_extracted`

---

## 1. Batch Scope

Batch 1 covers LS-P0C2-001 to LS-P0C2-019.

Target failures:

- treating landing criteria as approval guarantee;
- confusing landing criteria with material checklists;
- answering 技人国 only by job title;
- saying no university degree always blocks 技人国;
- ignoring the 10-year experience path;
- ignoring international-services experience requirements and exceptions;
- ignoring remuneration comparability;
- overextending IT exam exceptions;
- using landing-criteria cards to answer side-work questions.

---

## 2. Source Access Notes

| Source | Access | Notes |
|---|---|---|
| C2-S1 | readable | e-Gov current law page/API readable: `出入国管理及び難民認定法第七条第一項第二号の基準を定める省令`. Latest effective date remains `needs_confirm`. |
| C2-S1-API | readable | `https://laws.e-gov.go.jp/api/1/lawdata/402M50000010016` can provide XML. 技人国 row can be located. |
| C2-S4 | readable | ISA HTML readable. Page identifies 平成25年法務省告示437号, with last amendment shown as 令和2年7月20日法務省告示118号. |

---

## 3. Candidate Decision Table

| Candidate | Recommended Fact ID | Status | Risk | Core Claim | Source Locator | Duplicate / Overlap |
|---|---|---|---|---|---|---|
| LS-P0C2-001 | `landing-criteria-ordinance-source-role` | `ready` | medium | 上陸基準省令 defines the 入管法第7条1項2号 criteria layer | C2-S1 main provision | none |
| LS-P0C2-002 | `landing-criteria-not-approval-guarantee` | `ready` | high | landing criteria are one condition, not approval guarantee | 入管法7条 + C2-S1 | Cycle 1 permission boundary |
| LS-P0C2-003 | `landing-criteria-not-material-checklist` | `source_gap` | high | landing criteria differ from material checklist | C2-S1 + L4 needed | needs fixed L4 material sources |
| LS-P0C2-004 | `landing-criteria-read-by-status-row` | `ready` | medium | ordinance table must be read by activity/status row | C2-S1 table | none |
| LS-P0C2-010 | `gijinkoku-background-relevance-required` | `ready` | high | 技人国 requires relation between work and required technology/knowledge/background | C2-S1 技人国 row 1号 | Cycle 1 技人国 scope parent |
| LS-P0C2-011 | `gijinkoku-degree-or-equivalent-route` | `ready` | high | natural/humanities route includes university graduation or equivalent education | C2-S1 技人国 row 1号イ | none |
| LS-P0C2-012 | `gijinkoku-ten-year-experience-route` | `ready` | high | natural/humanities route has 10-year practical-experience alternative | C2-S1 技人国 row 1号ハ | none |
| LS-P0C2-013 | `gijinkoku-international-services-cultural-basis` | `ready` | high | international-services route requires work based on foreign culture | C2-S1 技人国 row 2号 | Cycle 1 技人国 scope parent |
| LS-P0C2-014 | `gijinkoku-international-services-three-year-experience` | `ready` | high | international-services route generally requires at least 3 years related practical experience | C2-S1 技人国 row 2号ロ | none |
| LS-P0C2-015 | `gijinkoku-translation-interpreting-language-instruction-exception` | `ready` | medium | university graduates doing translation/interpreting/language instruction are excepted from the 3-year requirement | C2-S1 技人国 row 2号ロ proviso | none |
| LS-P0C2-016 | `gijinkoku-remuneration-japanese-comparable` | `ready` | high | remuneration must be at least comparable to Japanese workers doing similar work | C2-S1 技人国 row 3号 | none |
| LS-P0C2-017 | `gijinkoku-it-exam-qualification-exception` | `ready` | medium | listed information-processing exams/qualifications can trigger an exception | C2-S1 + C2-S4 | none |
| LS-P0C2-018 | `gijinkoku-job-title-not-enough-simple-labor-router` | `needs_domain` | high | job title is insufficient, but simple-labor/on-site service wording needs DOMAIN | C2-S1 + Cycle 1 | overlaps 技人国 scope cards |
| LS-P0C2-019 | `gijinkoku-criteria-not-side-work-answer` | `duplicate_with_existing` | high | side-work questions should route to 資格外活動, not a landing-criteria card | Cycle 1 Batch 3 | duplicate with qualification-outside cards |

---

## 4. Codex Normalization Decision

Proceed:

- Convert LS-P0C2-001, 002, 004, 010, 011, 012, 013, 014, 015, 016, 017 into formal `state: ai_extracted` draft cards.

Hold:

- LS-P0C2-003: hold until fixed L4 material/procedure sources are attached.
- LS-P0C2-018: hold for DOMAIN-approved wording on simple labor / on-site service boundary.
- LS-P0C2-019: no new card; route to existing Cycle 1 qualification-outside-activity and permission-scope cards.

Do not:

- Do not set any Batch 1 card to `ai_verified`.
- Do not sync/inject into production.
- Do not use Batch 1 cards to answer approval probability.

---

## 5. DOMAIN Queue

| Candidate | Reason |
|---|---|
| LS-P0C2-018 | Official criteria support relevance/knowledge framing, but user-facing wording for simple labor, on-site service, convenience-store/restaurant examples, and job-title myths needs DOMAIN review. |
| LS-P0C2-017 | The exception exists, but product wording must not imply any IT certificate is enough. Full exam catalog extraction may become a follow-up card. |
| LS-P0C2-002 | The boundary "criteria are not approval guarantee" is product-critical; DOMAIN should review before any future promotion. |

---

## 6. AQL / QA Seed Fixtures

| Question | Expected Direction | Dangerous Direction |
|---|---|---|
| 文科毕业能做销售吗？ | 技人国 criteria + job-content relevance | job title alone decides |
| 专业不完全一致一定不行吗？ | relevance question, not absolute shortcut | exact-match myth or no-relation myth |
| 没有大学学历但有经验可以做人文签吗？ | 10-year practical-experience route if source-backed | unconditional yes/no |
| 国际业务需要几年经验？ | 3-year route and exception check | all international jobs same |
| 大学毕业做翻译要3年经验吗？ | proviso exception for translation/interpreting/language instruction | exception expanded to all international services |
| 技人国工资比日本人低一点可以吗？ | remuneration comparability criterion | ignore remuneration |
| 基本情报能替代学历吗？ | listed exam/qualification check | all IT certificates qualify |
| 符合上陆基准是不是一定下签？ | one condition, not guarantee | approval guarantee |

---

## 7. Machine Validation

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 147 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |
| `npx tsx scripts/test/test-p0-cycle1-dry-run-fixtures.ts` | pass; 61/61 |
| `npx tsx scripts/test/test-p0-cycle2-dry-run-fixtures.ts` | pass; 40/40 |

Safety note: all new Batch 1 cards are `state: ai_extracted`; the production-state prediction keeps these cards out of injection.

---

## 8. Validation Notes

AQL accepted the 11 ready candidates entering `ai_extracted` and agreed with holding LS-P0C2-003, LS-P0C2-018, and LS-P0C2-019.

QA required a separate Cycle 2 dry-run fixture script instead of extending the Cycle 1 fixture script. Codex implemented:

- `scripts/test/test-p0-cycle2-dry-run-fixtures.ts`

Additional normalization changes made after fixture testing:

- removed an overly broad bare `技人国` trigger from `gijinkoku-background-relevance-required`;
- added `文科毕业` / `大学学历` trigger coverage to `gijinkoku-degree-or-equivalent-route`;
- raised `gijinkoku-translation-interpreting-language-instruction-exception` risk to `high` so the exception is not buried by broader international-services cards.
