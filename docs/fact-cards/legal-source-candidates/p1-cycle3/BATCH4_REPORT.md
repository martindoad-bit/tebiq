# P1 Cycle 3 Batch 4 Report — 特定技能届出・登録支援機関边界

**Date**: 2026-05-13
**Scope**: 特定技能所属機関届出、受入れ困難、支援実施困難、年1回定期届出、登録支援機関の登録・変更・更新・休廃止。
**State**: all 22 cards remain `ai_extracted`; no production injection.

## Cards Added

| Count | Area | Cards |
|---:|---|---|
| 7 | employer-side ad hoc notifications | `ssw-notification-ad-hoc-and-annual-deadline-source`, `ssw-notification-noncompliance-penalty-risk-source`, `ssw-org-notification-not-delegable-to-rso-source`, `ssw-employment-contract-notification-14day-source`, `ssw-employment-contract-end-acceptance-difficulty-boundary-source`, `ssw-support-plan-change-notification-14day-source`, `ssw-support-contract-notification-14day-source` |
| 3 | acceptance difficulty | `ssw-acceptance-difficulty-notification-14day-source`, `ssw-acceptance-difficulty-one-month-inactivity-source`, `ssw-acceptance-difficulty-missing-person-source` |
| 3 | standards and support implementation difficulty | `ssw-standard-nonconformity-notification-14day-source`, `ssw-support-implementation-difficulty-notification-source`, `ssw-support-implementation-difficulty-attachments-source` |
| 2 | annual periodic reporting and outsourced support | `ssw-periodic-notification-integrated-annual-form-source`, `ssw-outsourced-support-periodic-report-via-host-source` |
| 7 | registered support organization | `ssw-rso-registration-change-14day-source`, `ssw-rso-suspend-abolish-restart-notification-source`, `ssw-rso-office-change-vs-suspension-boundary-source`, `ssw-rso-registration-scope-and-period-source`, `ssw-rso-renewal-window-source`, `ssw-rso-renewal-lapse-no-support-source`, `ssw-rso-notification-nonperformance-cancellation-risk-source` |

## Official Sources Used

- ISA 特定技能所属機関・登録支援機関による届出（提出書類） page.
- ISA 特定技能関係手続 hub.
- ISA procedure pages for employment-contract notification, support-plan change, support outsourcing contract, acceptance difficulty, standards nonconformity, support implementation difficulty, registered-support-organization registration change, support-business suspension/abolition/restart, registration application, and renewal application.
- ISA 特定技能制度における運用改善 page for the 2025-04-01 periodic-notification transition and integrated annual report.

## Main Product Meaning

This batch makes employer/support-organization operations visible as a legal-source layer:

- 特定技能 company-side questions can route into notification type, deadline, and responsibility instead of generic "14-day notification" advice;
- contract end, acceptance difficulty, one-month inactivity, and missing-person cases are separated;
- support-plan change, support outsourcing contract change, support implementation difficulty, and standards nonconformity are separated;
- annual periodic reporting is updated to the current year-once integrated report model rather than the old quarterly model;
- registered support organization questions now have source-backed boundaries for registration scope, 5-year period, renewal window, renewal lapse, registration changes, support-business suspension/abolition/restart, partial office changes, and notification nonperformance risk.

## DOMAIN Review Queue

- Employer change / contract notification / status-change permission sequencing when the accepting organization changes.
- Contract end, acceptance difficulty, one-month inactivity, and missing-person routing.
- Whether support-plan change, support outsourcing contract change, support implementation difficulty, and standards nonconformity should be combined in some answers or kept separate.
- 2025-04-01 and 2026 first annual periodic-report transition, including remaining old-form cases.
- Full outsourcing to registered support organizations: which data is prepared by the support organization versus submitted through the accepting organization.
- Registered support organization renewal lapse and existing entrusted cases.
- Partial office suspension versus whole support-business suspension or abolition.

## AQL / QA Targets

- Positive coverage: 35 direct fixture questions, including Chinese and mixed-language operational questions.
- Negative coverage: generic labor contract, 技人国 job-change, generic support-plan, generic sick leave, generic missing-person, non-SSW organization changes, business-manager closure, generic annual report, generic penalty, prior Batch 1/2/3 SSW questions, HSP, and unrelated registration-renewal questions. Pure generic questions must not hit any Batch 4 card.
- Production isolation: all 22 cards must remain dropped under production gate.
- User-visible text leakage: no internal workflow labels in title/citation/evidence/injection fields.
