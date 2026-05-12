# P1 Cycle 1 Batch 1 Report

**Date**: 2026-05-12
**Scope**: 定住者告示 / 特定活動告示 first router layer
**Cards added**: 17
**State**: all `ai_extracted`

---

## Added Cards

| ID | Fact ID | Role |
|---|---|---|
| P1C1-001 | `long-term-resident-notice-source-anchor` | 定住者告示 source anchor |
| P1C1-002 | `long-term-resident-special-reason-status-scope` | 定住者 status-scope anchor |
| P1C1-003 | `long-term-resident-minor-child-age-eighteen` | under-18 child path anchor |
| P1C1-004 | `long-term-resident-nikkei-third-generation-router` | Nikkei 3rd-generation router |
| P1C1-005 | `long-term-resident-nikkei-spouse-router` | Nikkei spouse router |
| P1C1-006 | `long-term-resident-dependent-minor-child-router` | dependent minor child router |
| P1C1-007 | `long-term-resident-under-six-adopted-child-router` | under-six adopted child router |
| P1C1-008 | `long-term-resident-spouse-divorce-case-router` | spouse-status transition case router |
| P1C1-009 | `designated-activities-notice-source-anchor` | 特定活動告示 source anchor |
| P1C1-010 | `designated-activities-isa-type-list-router` | 特定活動 subtype-list router |
| P1C1-011 | `designated-activities-job-offer-before-start-router` | job-offer-before-start router |
| P1C1-012 | `designated-activities-graduate-job-hunting-router` | graduate job-hunting router |
| P1C1-013 | `designated-activities-graduate-startup-router` | graduate startup router |
| P1C1-014 | `designated-activities-j-find-router` | J-Find router |
| P1C1-015 | `designated-activities-digital-nomad-router` | digital nomad router |
| P1C1-016 | `designated-activities-nikkei-fourth-generation-router` | Nikkei 4th-generation router |
| P1C1-017 | `designated-activities-ssw-transition-prep-router` | SSW transition preparation router |

---

## Source Notes

- `定住者告示` and `特定活動告示` are maintained from the ISA legal-index page.
- The ISA status pages are used as L4 routing sources for user-facing subtype discovery.
- The PDF texts were downloaded and parsed, but vertical Japanese extraction is noisy; Batch 1 therefore uses the HTML legal-index, notice pages, and ISA subtype pages as the stable locators.

---

## Hold / Review Queue

| Topic | Reason |
|---|---|
| 定住者告示 full numbered paths | needs detailed PDF normalization and DOMAIN review |
| 配偶者等から定住者への変更 | official case PDF exists, but approval/non-approval reasoning cannot be generalized |
| 日系4世 | must remain separate from 定住者; page is 特定活動 / resource layer |
| 特定活動 subtypes | each subtype needs its own detail card before answer generation |
| digital nomad | 2024+ style page with separate告示 numbers; needs careful update tracking |
