# P0 Cycle 3 Batch 1 Report — Renewal / Change / Special Period

**Date**: 2026-05-12
**Cycle**: P0 Cycle 3 — Residence Procedure Core
**Batch**: 1
**Status**: landed as `ai_extracted`; no production injection
**Test**: `npx tsx scripts/test/test-p0-cycle3-batch1-dry-run-fixtures.ts` — 56/56 passed

---

## Scope

Batch 1 covers the procedure backbone for:

- 在留期間更新
- 在留資格変更
- 申請中特例期間
- 在留カード裏面の申請中記載 / online exception
- 変更・更新審査の基本考慮要素

This batch intentionally does not answer individual approval probability.

---

## Official Sources Used

| ID | Source | URL | Use |
|---|---|---|---|
| C3-F4 | 在留資格変更許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | change scope, target, application window, online link |
| C3-F5 | 在留期間更新許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | renewal scope, target, application window, online link |
| C3-F11 | 特例期間とは？ | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | special period, endpoint, previous activity, card-back notation |
| C3-F12 | 在留資格の変更、在留期間の更新許可のガイドライン | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html | substantial-reason review, landing-criteria relationship, tax/social insurance/notification factors |
| C3-F24 | オンラインによる在留手続 | https://www.moj.go.jp/isa/applications/online/onlineprocedures.html | online channel router |

---

## Cards Landed

| Candidate | Fact ID | Role |
|---|---|---|
| C3-001 | `residence-renewal-same-status-extension` | renewal is same-status period extension |
| C3-002 | `residence-renewal-current-activity-target` | renewal target is continuing current-status activity |
| C3-003 | `residence-renewal-application-window` | renewal application window |
| C3-005 | `residence-change-activity-purpose-change` | change is moving to another status activity |
| C3-006 | `residence-change-application-window` | change application window |
| C3-007 | `residence-change-excludes-permanent-residence` | permanent residence routes outside ordinary change page |
| C3-008 | `change-renewal-substantial-reason-review` | change/renewal are holistic review, not approval guarantee |
| C3-009 | `change-renewal-landing-criteria-relationship` | some statuses require landing-criteria conformity on change/renewal |
| C3-010 | `change-renewal-tax-social-insurance-notification-review` | tax/social insurance/notification duties as review factors |
| C3-012 | `special-period-renewal-change-applies` | special period applies to renewal/change pending at expiry |
| C3-013 | `special-period-endpoint-two-months-or-disposition` | special period endpoint |
| C3-014 | `special-period-previous-status-activity-only` | special period keeps previous status/activity only |
| C3-015 | `special-period-card-back-online-exception` | card-back pending notation and online exception |
| C3-016 | `residence-online-procedure-availability-router` | online channel router |
| C3-074 | `change-approval-before-new-activity-guardrail` | application pending is not permission for new status activity |

All 15 cards are `state: ai_extracted` and have empty injection blocks.

---

## AQL Gate

AQL emphasized three blocking risks:

1. Do not treat application submission as permission.
2. Do not treat special period as permission to start a new activity.
3. Do not merge renewal and change into one procedure.

Additional AQL hold points for later batches or DOMAIN review:

- special-period status after disposition / refusal;
- pending application plus re-entry travel;
- online application proof details;
- exact date computation;
- tax/social insurance/notification defect impact on individual approval;
- whether a changed job remains within the previous residence status scope.

---

## QA Gate

QA requested:

- dry-run observability for all Batch 1 cards;
- zero production injection for `ai_extracted` cards;
- broad-trigger negatives for `更新`, `签证`, `期限`, `工作`, `申请中`, `背面`, `线上申请`;
- production regression protection for existing cards:
  - `shinseichu-zairyu-keizoku`
  - `zairyu-expiry-renewal-change`
- leakage checks for internal engineering terms and over-certain phrases.

Implemented in:

```text
scripts/test/test-p0-cycle3-batch1-dry-run-fixtures.ts
```

---

## Verification

Batch-specific:

```text
npx tsx scripts/test/test-p0-cycle3-batch1-dry-run-fixtures.ts
=> Cycle 3 Batch 1 dry-run fixtures: 56/56 checks passed
```

Sync:

```text
npx tsx scripts/fact-layer-sync.ts --dry-run
=> scanned=195 upserted=0 errors=0
```

---

## Promotion Status

Do not promote this batch yet.

Required before any promotion:

- DOMAIN review of deadline and permission-boundary language;
- duplicate/rewrite decision against `shinseichu-zairyu-keizoku`, `zairyu-expiry-renewal-change`, `tankizai-henko`;
- A/B answer run against real renewal/change/special-period questions;
- exact-date and post-disposition handling separated into future cards or routed to DOMAIN.
