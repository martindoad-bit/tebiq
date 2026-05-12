# P0 Cycle 4 Batch 2 Report — 永住税務・年金・医保・材料边界

**Date**: 2026-05-12
**Cards added**: 14
**State**: `ai_extracted`
**Injection blocks**: empty

---

## Scope

Batch 2 turns the permanent-residence materials page into source-backed boundary cards:

- resident-tax and national-tax evidence
- pension and public medical-insurance evidence
- business-owner social-insurance evidence
- guarantor and understanding-letter operation-layer documents
- material-route and material-shortage boundaries
- self-checksheet no-approval-guarantee boundary
- pension exemption / deferment source gap

These cards are not a new approval engine. They make the answer layer distinguish:

- official materials;
- public-duty evaluation signals;
- source silence;
- individual approval or refusal judgment.

---

## Cards

| ID | Claim Type | Source | Role |
|---|---|---|---|
| `permanent-residence-resident-tax-five-year-materials` | materials_evidence | ISA PR application 7(1)ア | resident-tax certificate 5-year material anchor |
| `permanent-residence-resident-tax-timing-evidence` | materials_evidence | ISA PR application 7(1)イ | timely resident-tax payment evidence anchor |
| `permanent-residence-national-tax-certificate-materials` | materials_evidence | ISA PR application 7(2) | national-tax certificate material anchor |
| `permanent-residence-pension-two-year-record-materials` | materials_evidence | ISA PR application 8(1) | pension two-year record material router |
| `permanent-residence-national-pension-receipts-materials` | materials_evidence | ISA PR application 8(1)ウ | national-pension receipt evidence anchor |
| `permanent-residence-health-insurance-two-year-materials` | materials_evidence | ISA PR application 8(2) | public medical-insurance two-year material router |
| `permanent-residence-health-insurance-card-transition-materials` | materials_evidence | ISA PR application 8(2) note | My Number health-insurance card / qualification certificate material anchor |
| `permanent-residence-business-owner-social-insurance-materials` | materials_evidence | ISA PR application 8(3) | business-owner establishment-side social-insurance material anchor |
| `permanent-residence-guarantor-document-boundary` | materials_boundary | ISA PR application 12 | guarantor document as material, not approval guarantee |
| `permanent-residence-understanding-letter-required` | materials_boundary | ISA PR application 15 | understanding letter required from 2021-10-01 |
| `permanent-residence-materials-by-status-checksheet` | materials_router | ISA PR application important note 1 | materials differ by current status / identity route |
| `permanent-residence-material-shortage-review-delay-risk` | materials_boundary | ISA PR application notes | missing materials can delay review or lead to disadvantage |
| `permanent-residence-self-checksheet-no-approval-guarantee` | permission_boundary | ISA PR application important note 2 | self-checksheet does not guarantee permission |
| `permanent-residence-public-obligation-exemption-deferment-gap` | source_gap | PR guideline + PR application page | pension exemption / deferment remains non-deterministic from checked sources |

---

## Important Boundaries

- Do not turn any material list into an approval guarantee.
- Do not say late payment is erased just because it was paid before application.
- Do not decide pension exemption / deferment as safe or unsafe.
- Do not merge resident tax, national tax, pension, and medical insurance into one generic "tax paid" answer.
- Do not say guarantor documents determine approval probability.
- Do not treat the understanding letter as the whole cancellation system.
- Do not apply work-status applicant material years to all permanent-residence routes.
- Do not let ordinary tax, pension, health-insurance, rental-guarantor, or school-guarantor questions match these permanent-residence cards.

---

## Deferred Candidates

FACT suggested several additional atoms that are useful but deferred to later batches or P1/P2 normalization:

- resident-tax special-collection exception as a standalone card;
- national-tax certificate period-designation details;
- bankbook / Web bankbook evidence boundary;
- sensitive-number redaction for pension and insurance documents;
- detailed NTA / Japan Pension Service request workflows;
- health-insurance reduction or installment-plan effects;
- guarantor legal-responsibility doctrine beyond the ISA material page.

---

## QA Coverage

Added `scripts/test/test-p0-cycle4-batch2-dry-run-fixtures.ts`.

Coverage:

- 15 positive dry-run fixtures
- 10 broad false-positive fixtures
- 10 production regression fixtures
- user-visible leakage / overcertainty scan
- `ai_extracted` / empty-injection / production-drop gate checks

Expected result:

```text
Cycle 4 Batch 2 dry-run fixtures: 53/53 checks passed
```

---

## DOMAIN / Promotion Notes

Do not promote this batch as a block. Lower-friction promotion candidates are the pure material anchors:

- resident-tax 5-year materials;
- national-tax certificate materials;
- understanding letter required;
- materials differ by current status route.

Keep review-sensitive candidates in DOMAIN queue:

- resident-tax timing evidence;
- pension and health-insurance two-year materials;
- business-owner social-insurance materials;
- self-checksheet no-approval guarantee;
- pension exemption / deferment source gap.
