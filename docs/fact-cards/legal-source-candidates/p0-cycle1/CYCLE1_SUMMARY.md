# Legal Source P0 Cycle 1 — Summary Ledger

**Date**: 2026-05-12  
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)  
**Scope**: 入管法別表第一・第二 + ISA 在留資格一覧表 + minimum work-restriction bridge sources  
**Cycle status**: complete as internal draft source layer; no production injection

---

## 1. Cycle Goal Reminder

P0 Cycle 1 was designed to prove the first legal-source backbone, not to maximize card count.

The core goal was to make TEBIQ distinguish:

- 別表第一 = activity-based residence statuses
- 別表第二 = status/residence-based residence statuses
- activity scope vs permission probability
- work restriction vs identity/status basis risk
- qualification scope vs material checklist

The primary failure this cycle must prevent:

```text
The system must not confuse activity qualification and status qualification.
```

---

## 2. Output Count

| Batch | New `ai_extracted` Cards | Main Theme | Commit |
|---|---:|---|---|
| Batch 1 | 6 | skeleton for 別表第一/第二 and category groups | `c7151d2` |
| Batch 2 | 7 | high-frequency status/activity anchors | `be944bc` |
| Batch 3 | 6 | qualification-outside-activity and work-restriction spine | `140cc97` |
| Batch 4 | 14 | activity boundary, exclusion, and similar-status disambiguation | `c869a6d` |
| Batch 5 | 3 | status detail, duration boundary, and hold cleanup | `667e8c9` |
| **Total** | **36** | internal draft legal-source cards |  |

All 36 new cards are `state: ai_extracted`.

Safety note: current production candidate-state gating keeps `ai_extracted` cards as `drop`, so these cards are not injected into production answers.

---

## 3. Formal Card Families Landed

### Legal skeleton

- `legal-status-table1-activity-skeleton`
- `legal-status-table2-status-skeleton`
- `legal-status-table1-section1-work-activity`
- `legal-status-table1-section2-work-landing-criteria`
- `legal-status-table1-sections3-4-nonwork-activity`
- `legal-status-designated-activities-individual-designation`

### High-frequency anchors

- `business-manager-activity-anchor`
- `technical-humanities-international-activity-anchor`
- `skilled-labor-activity-anchor`
- `student-activity-anchor`
- `dependent-activity-anchor`
- `spouse-or-child-of-japanese-status-anchor`
- `long-term-resident-status-anchor`

### Work-restriction spine

- `dependent-work-restriction-router`
- `student-work-restriction-router`
- `qualification-outside-activity-permission-framework`
- `permission-scope-not-universal`
- `long-vacation-work-limit`
- `prohibited-work-categories`

### Boundary and exclusion layer

- `business-manager-excludes-legal-accounting-qualified-business`
- `gijinkoku-requires-contract-with-japan-organization`
- `gijinkoku-three-knowledge-cultural-basis-scope`
- `gijinkoku-excludes-other-listed-status-activities`
- `intra-company-transferee-foreign-office-to-japan-office`
- `nursing-care-certified-care-worker-scope`
- `legal-accounting-qualified-profession-scope`
- `medical-qualified-profession-scope`
- `specified-skilled-worker-1-designated-field-skill-scope`
- `specified-skilled-worker-2-skilled-scope`
- `technical-intern-training-plan-type-scope`
- `cultural-activities-non-remunerated-research-scope`
- `temporary-visitor-short-stay-activity-scope`
- `dependent-sponsor-and-family-member-scope`

### Status detail and duration boundary

- `permanent-resident-period-indefinite`
- `spouse-or-child-of-japanese-status-includes-spouse-special-adopted-child-child-born`
- `spouse-or-child-of-permanent-resident-status-includes-spouse-and-japan-born-continuing-child`

---

## 4. Held Candidate Registry

These items remain in candidate reports only. Do not create top-level fact cards until wording and scope are resolved.

| Candidate | Working Name | Hold Reason | Next Owner |
|---|---|---|---|
| LS-P0C1-003 | activity/status work restriction difference | Too broad as one card; partially decomposed by later work-restriction and status cards | Codex/AQL, after fixture matrix |
| LS-P0C1-008 | residence period field boundary | Duration field must not imply approval probability; needs better source/fixture design | Codex/AQL |
| LS-P0C1-060 | dependent sponsor: 特定技能1号 exclusion / 2号 signal | 1号 exclusion is source-backed; 2号 family-accompaniment wording needs DOMAIN | DOMAIN |
| LS-P0C1-068 | student 28-hour total limit | Source supports the framework; total/multi-employer wording remains high-risk | DOMAIN |
| LS-P0C1-071 | post-graduation or withdrawal router | Direction is source-backed; concrete work legality/path must not be answered from expiry alone | DOMAIN |

Resolved note: the original Batch 2 work-restriction router candidates for 家族滞在 and 留学 were normalized into LS-P0C1-064 and LS-P0C1-065, then landed in Batch 3.

---

## 5. DOMAIN Queue

DOMAIN should review only high-risk promotion candidates and wording boundaries, not every draft card.

Priority queue:

| Topic | Why It Matters | Related Cards/Candidates |
|---|---|---|
| 特定技能1号/2号 family accompaniment | Avoid telling 1号 holders they can sponsor 家族滞在; avoid overstating 2号 outcomes | LS-P0C1-060; `dependent-sponsor-and-family-member-scope` |
| 留学 28-hour total wording | Avoid "each employer has 28 hours" and avoid overclaiming without permission-condition nuance | LS-P0C1-068; `student-work-restriction-router`; `long-vacation-work-limit` |
| Graduation/withdrawal after 留学 | Avoid answering work legality from residence-card expiry alone | LS-P0C1-071; `student-activity-anchor` |
| 技人国 side-work / mismatch | Scope is source-backed, but practical examples need controlled wording | `gijinkoku-*`; existing `gijinkoku-job-mismatch` |
| 経営管理 extra employment | Activity scope is source-backed; side employment and business continuity are high-risk | `business-manager-*`; existing `shikakugai-fukugyou` |
| 短期滞在 remote work | Source gives short-stay activity examples; remote work requires careful non-overclaiming | `temporary-visitor-short-stay-activity-scope` |
| Regulated professional boundaries | Avoid treating legal/accounting/medical regulated work as ordinary business/work status | `legal-accounting-*`; `medical-*`; `business-manager-excludes-*` |

---

## 6. Latest Machine Validation

Validation after Batch 5:

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 136 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |
| `npx tsx scripts/test/test-p0-cycle1-dry-run-fixtures.ts` | pass; 61/61 |

---

## 7. Next Engineering Gate

Do not start answer A/B immediately.

Before A/B, keep the fixed dry-run fixture matrix green:

- user question
- expected primary hit
- expected secondary hit, if any
- expected excluded hit
- expected category
- user-visible policy
- severity if wrong

Implemented fixture gate:

- script: `scripts/test/test-p0-cycle1-dry-run-fixtures.ts`
- scope: Cycle 1 legal-source candidates only
- fixtures: 29 user-question scenarios / 61 assertions
- required behavior: Cycle 1 cards can be observed by dry-run matcher, but remain `decision='drop'` and never appear in production-state prediction
- leakage guard: user-visible card fields must not expose internal process terms

Minimum matrix coverage now included:

- 別表第一 vs 別表第二
- 身份系资格 must not route to 資格外活動 as primary
- 家族滞在 and 留学 work-restriction router
- 技人国 / 経営管理 scope distinction
- 特定技能1号 vs 2号 family question
- 留学 graduation/withdrawal risk
- 永住者 period vs residence-card renewal
- 日配 / 永配 family-scope over-expansion
- 短期滞在 work/remote-work ambiguity

Only after this dry-run matrix stays stable should the same question set be used for baseline vs candidate answer A/B.

Known next risk: the full-stack matcher overlay can still rank older production cards above Cycle 1 legal-source candidates. That is acceptable for this candidate-layer gate, but must be measured before any Cycle 1 card promotion.

---

## 8. Promotion Rule

Cycle 1 cards may move beyond `ai_extracted` only after:

- dry-run fixtures pass;
- high-risk DOMAIN queue items are resolved or explicitly held;
- AQL confirms candidate answers are safer and more useful than baseline;
- user-facing output is checked for internal-term leakage;
- no card claims approval probability, success likelihood, or individual legal conclusion.
