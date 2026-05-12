# P0 Cycle 3 Batch 4 Report — 在留カード / 住居地 / 返納

**Date**: 2026-05-12
**Cards added**: 19
**State**: `ai_extracted`
**Injection blocks**: empty

---

## Scope

Batch 4 adds the procedural backbone for common in-Japan residence-card and residence-address questions:

- 住居地以外の在留カード記載事項変更
- 新たに中長期在留者となった場合の住居地届出
- 転居後の住居地変更届出
- 在留カード紛失等再交付
- 在留カード有効期間更新
- 在留カード返納

These cards are source-spine and routing cards. They do not replace existing production cards such as `zairyu-address-change`, `zairyu-card-loss-reissue`, `zairyu-card-keitai-gimu`, or `eijuu-card-koushin`.

---

## Cards

| ID | Claim Type | Source | Role |
|---|---|---|---|
| `resident-card-non-address-change-scope` | procedure_scope | ISA 00009 | separates non-address card item changes from address changes |
| `resident-card-non-address-change-fourteen-day` | deadline_window | ISA 00009 | 14-day deadline for name/nationality/sex/date-of-birth changes |
| `resident-card-non-address-change-immigration-office-router` | procedure_router | ISA 00009 | routes non-address card item changes to regional immigration |
| `resident-card-non-address-change-evidence-documents` | required_document | ISA 00009 | captures proof-of-change document requirement |
| `residence-address-notification-new-mid-long-term-scope` | procedure_scope | ISA 00022 | new mid/long-term resident address notification |
| `residence-address-notification-new-landing-fourteen-day` | deadline_window | ISA 00021 | new-landing mid/long-term resident address notification |
| `residence-address-notification-fourteen-day-municipality` | deadline_window | ISA 00022 | 14-day window from determining residence |
| `residence-address-change-fourteen-day-municipality` | deadline_window | ISA 00023 | moving-address notification window and municipal office route |
| `residence-address-notification-deemed-by-municipality` | procedure_method | ISA 00021/00022/00023 | municipal filing with residence card deemed as residence notification |
| `resident-card-loss-reissue-fourteen-day` | deadline_window | ISA 00010 | loss/theft/destruction reissue window |
| `resident-card-loss-police-report-number` | required_document | ISA 00010 | police report acceptance number for loss/theft |
| `resident-card-damaged-reissue-router` | procedure_router | ISA 00012 | damaged/soiled/IC-damaged card reissue route |
| `resident-card-validity-renewal-targets` | procedure_scope | ISA 00011 | PR/HSP2/under-16 card validity renewal targets |
| `resident-card-validity-renewal-window` | deadline_window | ISA 00011 | 2-month / 6-month application windows |
| `resident-card-validity-vs-residence-period-boundary` | procedure_boundary | ISA 00011 | separates card validity renewal from residence period renewal |
| `resident-card-return-expiry-triggers` | procedure_trigger | ISA 00020 | card invalidation and return triggers |
| `resident-card-return-deadline-by-trigger` | deadline_window | ISA 00020 | return deadline varies by trigger |
| `resident-card-return-mail-or-office-method` | procedure_method | ISA 00020 | direct return or mail return route |
| `resident-card-found-old-card-return-after-reissue` | deadline_window | ISA 00020 | old card found after reissue must be returned within 14 days |

---

## Important Boundaries

- 在留カードの有効期間更新 is not 在留期間更新許可申請.
- 在留カード紛失等再交付 is not permission to wait until the next renewal.
- 住居地変更 is normally routed to the municipal office, while non-address resident-card item changes are routed to regional immigration.
- 在留カード返納 must distinguish permanent departure / no re-entry from temporary departure under re-entry permission.
- Late filing or failure-to-return consequences are not automatic answer claims; they remain review-sensitive.

---

## QA Coverage

Added `scripts/test/test-p0-cycle3-batch4-dry-run-fixtures.ts`.

Coverage:

- 20 positive dry-run fixtures
- 8 broad false-positive fixtures
- 8 production regression fixtures
- internal-term leakage guard
- `ai_extracted` / empty-injection / production-drop gate checks

Result:

```text
Cycle 3 Batch 4 dry-run fixtures: 59/59 checks passed
```

---

## DOMAIN / Promotion Notes

Do not promote these cards as a batch. Promotion should be by narrow claim:

- Low-friction candidates: non-address change scope/deadline/router; address notification route; card loss deadline/police number; damaged-card reissue route.
- Review-sensitive candidates: late filing consequences; temporary lodging vs residence; return failure penalties; card expiry after deadline.
- Cross-route candidates must be checked against existing production cards before promotion.
