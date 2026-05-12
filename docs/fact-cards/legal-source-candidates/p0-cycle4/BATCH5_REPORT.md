# P0 Cycle 4 Batch 5 — Integration, Promotion Queue, and A/B Gate

**Date**: 2026-05-12
**State**: completed as `ai_extracted`
**Cards**: 9
**Production gate**: all Cycle 4 candidate cards remain `drop`

---

## Scope

Batch 5 closes P0 Cycle 4 by adding bridge cards and a full-cycle integration gate. The goal is not to expand into new doctrine, but to make the 67 cards from Batch 1-4 behave as a coherent retrieval layer:

- separate permanent-residence permission, permanent-resident card renewal, and current-status period renewal
- separate materials from eligibility evaluation
- separate public-obligation documents from public-obligation merits review
- separate current permanent-resident cancellation anchors from reform Q&A anchors
- separate card expiry, status continuity, ordinary reentry, special reentry, cancellation, departure-period, deportation, spouse notification, and spouse-status cancellation risk

All Batch 5 cards are bridge/router cards and remain `ai_extracted`.

---

## Added Candidate Cards

| fact_id | Purpose |
|---|---|
| `permanent-residence-core-procedure-router` | separates permanent residence, resident-card renewal, and period renewal |
| `permanent-residence-materials-vs-eligibility-boundary` | prevents “documents complete = permission” |
| `permanent-residence-public-obligation-document-vs-evaluation` | separates tax/pension/health-insurance documents from merits review |
| `permanent-resident-current-vs-reform-cancellation-router` | separates current cancellation anchors from permanent-residence reform Q&A |
| `permanent-resident-card-expiry-risk-router` | separates PR status body from card-expiry obligation/risk |
| `reentry-status-continuity-router` | routes status-continuity questions by reentry permission status |
| `ordinary-vs-special-reentry-boundary` | separates ordinary reentry from special reentry |
| `status-cancellation-departure-deportation-router` | separates cancellation, designated departure period, and deportation |
| `spouse-notification-vs-cancellation-risk-router` | separates spouse notification from spouse-status cancellation risk |

---

## Integration Audit

| Cluster | Keep / merge guidance |
|---|---|
| Permanent residence is not period renewal | Keep `permanent-residence-permission-separate-from-renewal` for status body; keep Batch 4 card-expiry boundary for resident-card distinction; Batch 5 card links the three procedures. |
| Permanent residence materials | Keep Batch 2 material cards as document anchors; Batch 5 adds the higher-level materials-vs-eligibility boundary. |
| Public obligations | Keep tax/pension/health-insurance cards as proof anchors; keep late-payment and exemption/deferment cards as review/gap anchors; Batch 5 links proof vs evaluation. |
| Cancellation procedure | Keep Batch 3 cancellation mechanics; Batch 5 adds a cancellation/departure/deportation integration card. |
| Permanent-resident cancellation | Keep current cancellation card separate from reform Q&A cards; reform cards remain blocked pending effective-date and domain review. |
| Reentry | Keep ordinary, special, and no-permission cards; Batch 5 adds the status-continuity and ordinary-vs-special bridge. |
| Spouse status | Keep spouse notification, 6-month cancellation risk, examples, and Article 22-5 opportunity cards; Batch 5 links notification vs cancellation risk. |

---

## Promotion Queue

| Priority | Topic | Why |
|---|---|---|
| P0 | Permanent-residence reform Q&A cards | Effective-date and current-law mapping must be confirmed before any production certainty. |
| P0 | Pension exemption / deferment impact on permanent residence | Official permanent-residence sources do not directly resolve the evaluation. |
| P0 | Public-dues backpay, installment, seizure, and after-the-fact cure | Official Q&A points to individual judgment; avoid safe/unsafe shortcuts. |
| P0 | Permanent-resident card expiry consequence wording | Safe distinction exists, but “no consequence” wording is unsafe. |
| P1 | Long overseas stay, missed special reentry, or forgotten departure intent | Official sources anchor deadlines; recovery path is individual and high risk. |
| P1 | Business-manager dormant/closed-company cancellation risk | Source supports risk routing, not business-reality judgment. |
| P1 | Spouse-status justifiable reasons outside official examples | Official examples are not exhaustive and not a safe-harbor list. |

---

## A/B Question Matrix

Batch 5 regression includes 20 AQL-designed questions spanning:

- normal permanent-residence questions
- permanent-resident card / permanent-residence status confusion
- materials vs approval confusion
- tax, pension, health-insurance proof vs evaluation
- spouse divorce and status-stability questions
- reentry and special-reentry continuity questions
- cancellation vs deportation vs ex officio change questions
- non-immigration false positives

These questions are used as a gate: Cycle 4 candidate cards may appear in dry-run, but must not surface in production prediction until promoted.

---

## Test Coverage

Added:

- [`scripts/test/test-p0-cycle4-batch5-integration-gate.ts`](../../../../scripts/test/test-p0-cycle4-batch5-integration-gate.ts)

Checks:

- all 9 Batch 5 cards exist
- all Cycle 4 cards remain `ai_extracted`
- all Cycle 4 injection blocks remain empty
- no user-visible internal labels or overcertain claims leak
- 9 Batch 5 dry-run routing fixtures
- 8 broad negative fixtures
- 20 AQL A/B questions keep Cycle 4 out of production prediction
- 10 protected production scenarios keep Cycle 4 out of production prediction

Latest result:

```text
Cycle 4 Batch 5 integration gate: 59/59 checks passed
```

---

## Completion State

P0 Cycle 4 now has:

- Batch 1: 20 cards
- Batch 2: 14 cards
- Batch 3: 20 cards
- Batch 4: 13 cards
- Batch 5: 9 cards

Total: 76 Cycle 4 cards, all `ai_extracted`, all production-gated.

Next engineering step after this commit should be Cycle 4 promotion review, not automatic promotion.
