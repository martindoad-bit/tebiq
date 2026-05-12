# P0 Cycle 4 Batch 3 — Cancellation and Status-Stability Risk Signals

**Date**: 2026-05-12
**State**: completed as `ai_extracted`
**Cards**: 20
**Production gate**: all candidate cards remain `drop`

---

## Scope

Batch 3 adds the first dedicated status-stability layer for high-risk questions where users often collapse different legal procedures into one sentence:

- 在留資格取消 is not automatic loss of status.
- False applications, false documents, other-activity intent, non-performance of the original activity, and false address reporting are distinct cancellation entrances.
- Job loss, business stop, divorce, and spouse separation are risk routers, not instant conclusions.
- Spouse 6-month cancellation risk has official examples of justifiable reasons, but the examples are not a safe harbor list.
- Permanent residence is not outside residence management, but current-status cancellation, reform cancellation grounds, and card renewal must not be mixed.
- Cancellation, renewal denial, permanent-residence denial, and notification breach are separate procedures.

This batch is designed to protect answers from overclaiming, not to make individual cancellation predictions.

---

## Official Source Registry

| Source | URL | Use |
|---|---|---|
| ISA 在留資格の取消し | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | cancellation overview, reasons, hearing, departure-period boundary |
| e-Gov 入管法 | https://laws.e-gov.go.jp/law/326CO0000000319 | statutory anchors for Article 22-4 / 22-5 references |
| 法務省 配偶者取消しを行わない具体例 PDF | https://www.moj.go.jp/isa/content/920000161.pdf | spouse justifiable-reason examples and change/permanent-application opportunity |
| ISA 配偶者に関する届出 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | spouse divorce/death 14-day notification boundary |
| ISA 所属機関等届出 Q&A | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html | notification breach vs cancellation / renewal-review boundary |
| ISA 永住許可制度の適正化 Q&A | https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html | permanent-residence management, reform nonpayment/criminal/family/change boundaries |

---

## Added Candidate Cards

| fact_id | Purpose |
|---|---|
| `residence-cancellation-minister-can-cancel-discretion` | prevents “cancellation reason = automatic status loss” |
| `residence-cancellation-false-document-no-intent` | separates false documents from ordinary mistakes |
| `residence-cancellation-other-activity-intent-trigger` | anchors non-original activity / intended other activity |
| `residence-cancellation-opinion-hearing-rights` | anchors opinion hearing / evidence submission rights |
| `residence-cancellation-deportation-vs-departure-period` | separates immediate deportation target vs designated departure period |
| `residence-cancellation-table1-statuses-scope` | limits activity non-performance rules to Table 1 activity statuses |
| `job-loss-cancellation-not-automatic-router` | routes job-loss questions without saying automatic cancellation |
| `business-manager-activity-stop-risk-router` | routes business stop / dormant-company risk without deciding the case |
| `spouse-divorce-notification-cancellation-distinction` | separates divorce/death notification from cancellation/status change |
| `spouse-child-exclusion-from-six-month-rule` | protects children/special adopted-child scope under spouse-status rules |
| `spouse-justifiable-reason-examples-not-exhaustive` | adds official examples without turning them into safe harbor |
| `spouse-cancellation-change-or-pr-opportunity` | anchors Article 22-5 application-opportunity guardrail |
| `residence-cancellation-false-address-trigger` | anchors false address reporting as a cancellation entrance |
| `cancellation-vs-renewal-or-pr-denial-boundary` | separates cancellation, renewal denial, PR denial, and notification breach |
| `permanent-resident-current-cancellation-basic` | rejects “permanent residence is absolutely untouchable” |
| `permanent-resident-reform-intentional-nonpayment-boundary` | frames intentional public-dues nonpayment under the reform Q&A |
| `permanent-resident-reform-not-automatic-change-option` | separates cancellation from ex officio change option |
| `permanent-resident-family-not-automatic-affected` | prevents “family members are automatically affected” |
| `permanent-resident-reform-criminal-violation-boundary` | limits criminal-law reform trigger to serious intentional offenses |
| `permanent-resident-tax-social-cancellation-review-boundary` | keeps tax/social-insurance cancellation questions in review mode |

---

## Test Coverage

Added:

- [`scripts/test/test-p0-cycle4-batch3-dry-run-fixtures.ts`](../../../../scripts/test/test-p0-cycle4-batch3-dry-run-fixtures.ts)

Checks:

- all 20 cards exist on disk
- all 20 cards stay `state=ai_extracted`
- all injection blocks remain empty
- no user-visible internal labels leak
- no overcertain wording in user-visible fields
- 20 positive dry-run routing fixtures
- 8 broad negative fixtures
- 8 production-regression fixtures
- production prediction keeps all Batch 3 cards out

Latest result:

```text
Cycle 4 Batch 3 dry-run fixtures: 59/59 checks passed
```

---

## Protected Production Cards

Batch 3 intentionally does not replace these already-live or already-reviewed cards:

- `spouse-divorce-separation`
- `shitsugyo-zairyu-risk`
- `zairyu-shikaku-torikeshi`
- `zairyu-expiry-renewal-change`
- `shinseichu-zairyu-keizoku`
- `keiei-kanri-existing-holder-update`
- `keiei-kanri-2025-10`
- `residence-renewal-current-activity-target`
- `change-renewal-substantial-reason-review`
- `spouse-notification-divorce-death-fourteen-day`
- `spouse-notification-not-status-change-substitute`

The new cards are retrieval and boundary candidates for the next promotion review.

---

## Still Needs Review

| Issue | Why it remains blocked |
|---|---|
| What counts as `正当な理由` for 3-month activity non-performance | official sources provide the exception but not a general safe list |
| Job-loss / business-stop start date for the 3-month clock | needs case and practice review |
| Dormant, suspended, loss-making, or minimally active business-manager companies | official source supports risk routing, not case judgment |
| Spouse separation / divorce / litigation facts | official examples exist, but individual facts decide |
| Permanent-residence tax/social-insurance cancellation under reform | needs effective-date and individual-circumstance review before any production certainty |
| PR card renewal vs permanent-residence cancellation | scheduled for Batch 4 disambiguation hardening |

---

## Next Batch

Batch 4 should burn down the remaining disambiguation gaps:

1. permanent residence vs permanent-resident card renewal
2. permanent residence cancellation vs deportation vs ex officio change
3. special reentry / ordinary reentry impact on status continuity
4. residual source gaps from cancellation and status-stability cards
