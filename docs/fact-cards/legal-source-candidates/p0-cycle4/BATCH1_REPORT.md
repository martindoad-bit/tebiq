# P0 Cycle 4 Batch 1 Report — 永住許可 / 在留資格取消入口

**Date**: 2026-05-12
**Cards added**: 20
**State**: `ai_extracted`
**Injection blocks**: empty

---

## Scope

Batch 1 adds the first high-risk status-stability backbone:

- 永住許可 is separate from 在留期間更新
- 永住許可 legal three-part core
- 永住許可ガイドライン anchors
- principle residence-year framework and exception routers
- public obligations and late-payment risk signal
- current period-of-stay and current-status-fit conditions
- permanent-residence application does not extend the current status
- 在留資格取消 trigger entry points
- cancellation procedure is not automatic immediate expiry

These cards are source-spine and routing cards. They do not replace existing production cards such as `eijuu-zairyu-kikan`, `eijuu-nenkin-risk`, `eijuu-shinsei-shorui`, `eijuu-card-koushin`, `spouse-divorce-separation`, `shitsugyo-zairyu-risk`, or `zairyu-shikaku-torikeshi`.

---

## Cards

| ID | Claim Type | Source | Role |
|---|---|---|---|
| `permanent-residence-permission-separate-from-renewal` | disambiguation | Immigration Act Art. 22 / ISA PR page | separates permanent residence permission from residence-period renewal |
| `permanent-permission-legal-three-part-core` | eligibility_core | Immigration Act Art. 22(2) | legal core: good conduct, independent livelihood, national-interest suitability |
| `permanent-good-conduct-requirement` | eligibility_guideline | PR guideline 1(1) | guideline explanation of good conduct |
| `permanent-independent-livelihood-requirement` | eligibility_guideline | PR guideline 1(2) | guideline explanation of independent livelihood |
| `permanent-national-interest-framework` | eligibility_guideline | PR guideline 1(3) | multi-factor national-interest framework |
| `permanent-10-year-5-year-general-residence` | residence_period_rule | PR guideline 1(3)ア | principle 10-year / 5-year framework |
| `permanent-spouse-child-exception-router` | exception_router | PR guideline 2(1) | spouse/child exception route |
| `permanent-long-term-resident-5-year-router` | exception_router | PR guideline 2(2) | long-term resident 5-year route |
| `permanent-highly-skilled-points-router` | exception_router | PR guideline 2(6)-2(8) | HSP point exception route |
| `permanent-public-obligations-tax-pension-health` | duty_requirement | PR guideline 1(3)イ | tax/pension/medical-insurance/public-duty anchor |
| `permanent-late-payment-negative-evaluation` | risk_signal | PR guideline 1(3)イ note | late payment is generally negative even if paid by application time |
| `permanent-current-longest-period-requirement` | status_condition | PR guideline 1(3)ウ | current longest period condition |
| `permanent-three-year-transitional-handling` | transitional_rule | PR guideline note 1 | 3-year period handling until 2027-03-31 |
| `permanent-current-status-landing-criteria-fit` | current_status_fit | PR guideline 1(3)エ / note 2 | current status criteria fit remains relevant |
| `permanent-application-does-not-extend-current-status` | procedure_guardrail | ISA application notice | PR application does not extend current period |
| `residence-cancellation-fraud-false-application-entry` | cancellation_trigger | Immigration Act Art. 22-4 / ISA cancellation page | false or improper application entry point |
| `residence-cancellation-activity-nonperformance` | cancellation_trigger | Immigration Act Art. 22-4 / ISA cancellation page | nonperformance of authorized activity entry point |
| `residence-cancellation-spouse-status-six-months` | cancellation_trigger | Immigration Act Art. 22-4 / ISA cancellation page | spouse-activity six-month entry point |
| `residence-cancellation-address-notification-risk` | cancellation_trigger | Immigration Act Art. 22-4 / ISA cancellation page | residence-address notification 90-day entry point |
| `residence-cancellation-procedure-not-automatic` | procedure_guardrail | Immigration Act Art. 22-4 / ISA cancellation page | cancellation requires procedure and is not automatic immediate expiry |

---

## Important Boundaries

- Do not call 永住許可申請 “永住更新”.
- Do not say permanent-residence application extends the current period of stay.
- Do not answer public-obligation documents as approval guarantees.
- Do not decide 年金免除・猶予 treatment from these cards.
- Do not treat spouse/HSP/long-term-resident exception routes as mechanical approval formulas.
- Do not treat divorce, unemployment, company closure, or address-delay facts as automatic cancellation.
- Do not mix 在留資格取消, 更新不許可, 変更不許可, and 永住不許可.
- Do not flatten law, guideline, material page, and practice signals into one authority layer.

---

## QA Coverage

Added `scripts/test/test-p0-cycle4-batch1-dry-run-fixtures.ts`.

Coverage:

- 21 positive dry-run fixtures
- 10 broad false-positive fixtures
- 10 production regression fixtures
- internal-term leakage guard
- `ai_extracted` / empty-injection / production-drop gate checks

Expected result:

```text
Cycle 4 Batch 1 dry-run fixtures: 65/65 checks passed
```

---

## DOMAIN / Promotion Notes

Do not promote these cards as a batch. Promotion should be by narrow claim:

- Lower-friction candidates: permanent residence is separate from renewal; permanent application does not extend current status; cancellation is not automatic immediate expiry.
- Review-sensitive candidates: public obligations, late payment, three-year transition, current-status fit, activity nonperformance, spouse six-month risk.
- Continue DOMAIN queue for 年金免除・猶予 and 2027-03-31 transition wording.
