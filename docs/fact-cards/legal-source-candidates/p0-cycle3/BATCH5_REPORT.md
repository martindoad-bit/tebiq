# P0 Cycle 3 Batch 5 Report — 再入国 / みなし再入国 / オンライン申請境界

**Date**: 2026-05-12
**Cards added**: 20
**State**: `ai_extracted`
**Injection blocks**: empty

---

## Scope

Batch 5 adds the procedure backbone for departure and online-application boundary questions:

- 通常再入国許可
- みなし再入国許可
- 再入国許可なし出国
- 更新・変更申請中の出国
- 短期滞在と再入国制度
- 在留申請オンラインシステムの利用範囲
- オンライン申請後の在留カード受領中の出国リスク
- 出国中に旅券・在留カードを紛失した場合の期限証明

These cards are source-spine and routing cards. They do not replace existing production cards such as `minashi-sainyuukoku`, `sainyukoku-kyoka`, `kitaku-tetsuzuki`, or `shinseichu-zairyu-keizoku`.

---

## Cards

| ID | Claim Type | Source | Role |
|---|---|---|---|
| `reentry-permit-status-continuity` | procedure_effect | ISA C3-F21 | explains visa exemption and continuity treatment when re-entering with permission |
| `no-reentry-departure-status-extinguishes` | permission_boundary | ISA C3-F21 | separates temporary departure with permission from departure without re-entry permission |
| `ordinary-reentry-before-departure` | procedure_timing | ISA C3-F22 | ordinary re-entry permit must be applied for before departure |
| `ordinary-reentry-single-vs-multiple` | procedure_option | ISA C3-F21 | ordinary re-entry has single-use and multiple-use types |
| `ordinary-reentry-validity-limit` | validity_limit | ISA C3-F21 | ordinary re-entry is within current period and max 5 years, special PR max 6 |
| `ordinary-reentry-online-simultaneous-only` | online_scope | ISA C3-F22 / Online Q&A | online re-entry permit application is simultaneous-only |
| `special-reentry-eligibility-valid-passport-card` | procedure_scope | ISA C3-F23 | base eligibility: valid passport, residence card for mid/long-term residents, not 3 months or temporary visitor |
| `special-reentry-one-year-or-status-expiry` | validity_limit | ISA C3-F23 | 1 year from departure or status expiry if earlier |
| `special-reentry-no-overseas-extension` | extension_boundary | ISA FAQ Q57 | special re-entry period cannot be extended abroad |
| `special-reentry-excluded-persons` | exclusion_scope | ISA C3-F23 | cancellation procedure, departure confirmation deferral, detention order, specific refugee-applicant status, etc. |
| `special-reentry-departure-intent-ed-card` | procedure_method | ISA C3-F23 | departure-time intent indication and ED card checkbox |
| `special-permanent-resident-special-reentry-two-years` | validity_limit | ISA C3-F23 | special permanent resident special re-entry period is 2 years |
| `pending-application-reentry-period-boundary` | permission_boundary | ISA FAQ Q61 / Online Q&A | renewal/change pending departure requires 1-year and special-period boundary checks |
| `temporary-visitor-not-reentry-target` | exclusion_scope | ISA C3-F23 / FAQ Q62 | temporary visitor is outside special re-entry and generally outside ordinary re-entry |
| `online-application-not-from-abroad` | online_scope | ISA Online Q&A Q4-17/Q4-36 | online applications cannot be made while abroad |
| `online-final-day-not-available` | online_scope | ISA Online application page | online application is unavailable on final day of period of stay |
| `online-pr-card-procedures-excluded` | online_scope | ISA Online Q&A Q1-5 | permanent residence and residence-card procedures are outside online application system |
| `online-application-channel-not-permission` | procedure_boundary | ISA C3-F24 | online application is a submission channel, not a relaxation of permission criteria |
| `online-card-mail-receipt-special-reentry-boundary` | permission_boundary | ISA Online Q&A Q6-3 | no special re-entry departure when the residence card is not at hand during mail receipt |
| `reentry-permit-document-lost-passport-card-abroad` | procedure_router | ISA C3-F22 | certificate route when passport/card is lost abroad during re-entry/special re-entry departure |

---

## Important Boundaries

- Do not answer “1 year” for みなし再入国 without checking whether the current period of stay expires earlier.
- Do not say みなし再入国 can be extended while abroad.
- Do not equate a valid residence card with a valid re-entry period or guaranteed landing.
- Do not treat ordinary re-entry permit and みなし再入国 as the same procedure.
- Do not answer temporary short trips as residence-card return obligations.
- Do not treat online application as relaxed criteria, easier approval, or permission.
- Do not say a person abroad can file renewal/change online.
- Do not say a person can depart under みなし再入国 while the residence card is away for mail receipt.

---

## QA Coverage

Added `scripts/test/test-p0-cycle3-batch5-dry-run-fixtures.ts`.

Coverage:

- 21 positive dry-run fixtures
- 10 broad false-positive fixtures
- 10 production regression fixtures
- internal-term leakage guard
- `ai_extracted` / empty-injection / production-drop gate checks

Expected result:

```text
Cycle 3 Batch 5 dry-run fixtures: 65/65 checks passed
```

---

## DOMAIN / Promotion Notes

Do not promote these cards as a batch. Promotion should be by narrow claim:

- Lower-friction candidates: ordinary re-entry before-departure timing, single/multiple types, ordinary validity limit, short-stay exclusion, online final-day rule.
- Review-sensitive candidates: no-permission departure consequences, missed departure intent, pending-application departure, overseas lost-card route, card mail-receipt departure.
- The existing production cards for `minashi-sainyuukoku` and `sainyukoku-kyoka` contain older mixed claims. Promotion should probably rewrite those cards around these narrower claims rather than adding parallel injected text.
