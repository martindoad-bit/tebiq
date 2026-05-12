# P0 Cycle 3 Batch 3 — 所属機関 / 配偶者届出

**Date**: 2026-05-12
**Scope**: personal organization notifications, spouse notifications, accepting-organization notifications
**Output**: 20 cards, all `ai_extracted`, empty injection blocks

---

## Sources Checked

| Source | URL | Layer | Notes |
|---|---|---:|---|
| 所属機関等に関する届出・所属機関による届出Q&A | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html | L4 ISA Q&A | personal organization/spouse notification cases; methods; deadlines; renewal/change distinction |
| 所属機関による届出手続 | https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html | L4 ISA procedure page | accepting-organization notification; no criminal penalty but careful review risk; foreign employment notification exclusion |
| 配偶者に関する届出 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | L4 ISA procedure page | divorce/death spouse notification target, deadline, method |

---

## Cards Added

| # | fact_id | Purpose |
|---:|---|---|
| 1 | `organization-notification-activity-institution-statuses` | activity-institution status group |
| 2 | `organization-notification-contract-institution-statuses` | contract-institution status group |
| 3 | `organization-notification-event-types` | disappearance/name-location change/leaving/transfer triggers |
| 4 | `organization-notification-methods-and-attachments` | online/mail/window; no supporting materials; mail card copy |
| 5 | `organization-notification-fourteen-day-deadline` | 14-day deadline from event date |
| 6 | `organization-notification-late-penalty-review-risk` | late/non/false notification risk without automatic outcome |
| 7 | `organization-notification-future-event-not-accepted` | future event date cannot be filed |
| 8 | `organization-notification-renewal-change-permit-distinction` | renewal permit still requires job-change notification; change permit does not |
| 9 | `organization-notification-contract-content-only-not-required` | same institution, contract terms only changed: no notification |
| 10 | `organization-notification-dual-work-long-term-second-organization` | short second-company work vs long-term second organization |
| 11 | `secondment-dispatch-destination-change-notification-required` | secondment and dispatch destination change router |
| 12 | `organization-notification-not-work-permission` | notification is not permission for the new activity |
| 13 | `organization-reorganization-merger-notification-router` | merger/absorption/split router by whether affiliation changed |
| 14 | `spouse-notification-divorce-death-fourteen-day` | divorce/death spouse notification deadline and target |
| 15 | `spouse-notification-not-status-change-substitute` | spouse notification does not substitute status change review |
| 16 | `spouse-notification-methods-no-divorce-certificate` | spouse notification methods; no divorce certificate required for notification |
| 17 | `institution-side-work-status-start-end-fourteen-day` | accepting organization start/end notification for work statuses |
| 18 | `institution-side-no-criminal-penalty-review-caution` | organization-side non-filing: no criminal penalty, possible careful review |
| 19 | `institution-side-foreign-employment-notification-exclusion-router` | foreign employment status notification exclusion router |
| 20 | `student-institution-start-end-periodic-notification` | education institution start/end and May/November periodic student notifications |

---

## Held / Not Done

| Item | Reason |
|---|---|
| Highly Skilled Professional designated-organization change special handling | Needs a dedicated card later; the Q&A says job change may require status change when the institution is designated. Avoided folding this into ordinary job-change logic. |
| MHLW foreign employment status notification scope | ISA page gives the exclusion, but the employer-side duty scope needs a separate MHLW source card. |
| Deep spouse post-divorce strategy | Existing production card covers divorce/separation risk. Batch 3 only adds source-spine cards and keeps them out of injection. |
| Organization reorganization legal continuity | Q&A gives routing examples, but individual corporate reorganization consequences need document review. |

---

## QA Matrix

Added `scripts/test/test-p0-cycle3-batch3-dry-run-fixtures.ts`.

Coverage:

- 21 positive fixtures for organization, spouse, and accepting-organization notifications.
- 8 broad-negative fixtures for company tax, ordinary divorce, generic online registration, dispatch wage, school applications, generic address, May 1, and Hello Work questions.
- 9 production-regression fixtures proving Batch 3 cards remain out of production prediction.
- User-visible leak guard for internal terms and overcertain claims.

Latest result:

```text
Cycle 3 Batch 3 dry-run fixtures: 62/62 checks passed
```

---

## Product Safety Notes

- Do not answer “all foreigners need the same 14-day notification.”
- Do not answer “notification equals permission for the new job/activity.”
- Do not let organization-side notification replace the foreign national's personal notification.
- Do not say late/non-filing is always harmless or always causes denial/cancellation.
- Do not say spouse notification alone solves the post-divorce/post-bereavement status problem.
