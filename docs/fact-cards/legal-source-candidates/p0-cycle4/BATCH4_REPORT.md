# P0 Cycle 4 Batch 4 — Permanent-Resident Card, Reentry, and Deportation Boundaries

**Date**: 2026-05-12
**State**: completed as `ai_extracted`
**Cards**: 13
**Production gate**: all candidate cards remain `drop`

---

## Scope

Batch 4 burns down the highest-risk confusion around permanent residence after Batch 3:

- 永住者の在留カード有効期間 is not permanent-residence status renewal.
- The card renewal window, early-application exception, no-fee boundary, and under-16 card expiry are explicit card-procedure facts.
- Special reentry, ordinary reentry, and departure without reentry permission are status-continuity boundaries.
- Special reentry requires intent expression at departure and can be unavailable for people in cancellation proceedings.
- Permanent-residence cancellation, deportation, and ex officio status change must not be collapsed into one answer.

This batch is deliberately a disambiguation layer. It does not answer what happens in an individual expired-card, overstay, reentry-over-deadline, cancellation, or deportation case.

---

## Official Source Registry

| Source | URL | Use |
|---|---|---|
| e-Gov 入管法 | https://laws.e-gov.go.jp/law/326CO0000000319 | Article 19-5, 19-11, 22-4, 24 and permanent-resident period anchors |
| ISA 在留カードの有効期間の更新申請 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html | permanent-resident card renewal target, window, early application, materials, no fee |
| ISA 再入国許可 | https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html | ordinary reentry permission and status-continuity rule |
| ISA みなし再入国許可 | https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html | special reentry one-year limit, required card/intent, exclusion scope |
| ISA 永住許可制度の適正化 Q&A | https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html | permanent-resident cancellation / deportation / ex officio change boundaries |
| ISA 在留資格の取消し | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | cancellation aftermath and departure-period boundary |

---

## Added Candidate Cards

| fact_id | Purpose |
|---|---|
| `permanent-resident-card-validity-seven-year-law` | anchors seven-year residence-card validity for adult permanent residents |
| `permanent-resident-card-under-sixteen-before-birthday` | anchors under-16 permanent-resident card expiry timing |
| `permanent-resident-card-renewal-window-procedure` | anchors two-month / six-month card-renewal filing window |
| `permanent-resident-card-renewal-early-application-exception` | supports early card-renewal application when long overseas stay prevents normal filing |
| `permanent-resident-card-renewal-no-fee-materials-boundary` | separates card-renewal materials from permanent-residence application materials |
| `permanent-resident-card-expiry-not-pr-period-renewal-boundary` | prevents “card expiry = permanent residence renewal / loss” wording |
| `permanent-resident-long-absence-special-reentry-one-year` | anchors one-year special-reentry limit for permanent residents |
| `permanent-resident-long-absence-ordinary-reentry-five-year` | anchors ordinary reentry permission max five-year boundary |
| `permanent-resident-no-reentry-departure-status-extinguishes` | anchors status extinguishment when departing without reentry/special reentry |
| `special-reentry-intent-expression-and-card-required` | anchors passport/card and departure-intent expression requirements |
| `special-reentry-excluded-cancellation-proceeding` | prevents telling cancellation-procedure users that special reentry is available |
| `permanent-resident-deportation-separate-from-cancellation` | separates permanent-residence cancellation from deportation |
| `residence-cancellation-to-deportation-ground-boundary` | separates cancellation grounds that connect to deportation from departure-period cases |

---

## Test Coverage

Added:

- [`scripts/test/test-p0-cycle4-batch4-dry-run-fixtures.ts`](../../../../scripts/test/test-p0-cycle4-batch4-dry-run-fixtures.ts)

Checks:

- all 13 cards exist on disk
- all 13 cards stay `state=ai_extracted`
- all injection blocks remain empty
- no user-visible internal labels leak
- no overcertain wording in user-visible fields
- 13 positive dry-run routing fixtures
- 10 broad negative fixtures
- 10 production-regression fixtures
- production prediction keeps all Batch 4 cards out

Latest result:

```text
Cycle 4 Batch 4 dry-run fixtures: 49/49 checks passed
```

---

## Protected Production Cards

Batch 4 intentionally does not replace these already-live or already-reviewed cards:

- `eijuu-card-koushin`
- `eijuu-zairyu-kikan`
- `eijuu-nenkin-risk`
- `eijuu-shinsei-shorui`
- `zairyu-expiry-renewal-change`
- `shinseichu-zairyu-keizoku`
- `minashi-sainyuukoku`
- `sainyukoku-kyoka`
- `kitaku-tetsuzuki`
- `zairyu-card-loss-reissue`
- `zairyu-card-keitai-gimu`
- `zairyu-shikaku-torikeshi`
- `spouse-divorce-separation`
- `shitsugyo-zairyu-risk`
- `keiei-kanri-existing-holder-update`

The new cards remain candidate anchors for promotion review and retrieval testing only.

---

## Still Needs Review

| Issue | Why it remains blocked |
|---|---|
| Consequences after permanent-resident card expiry | official sources anchor the renewal procedure, not every penalty or recovery path |
| Overseas permanent resident whose card or reentry period expired | requires individual facts and border practice review |
| Special reentry missed deadline | high-risk recovery / loss analysis is outside this batch |
| Permanent-residence reform effective-date handling | official Q&A exists, but production certainty needs effective-date and statute confirmation |
| Ex officio change destination after PR cancellation trigger | Q&A says many cases may receive `定住者`, not all cases |
| Cancellation vs deportation path | depends on the specific statutory ground and facts |

---

## Next Batch

Batch 5 should close Cycle 4 with integration work:

1. duplicate merge and conflict scan across Cycle 4
2. promotion queue candidates for DOMAIN review
3. production-card rewrite candidates where current cards are too thin
4. A/B fixture set for permanent residence / cancellation / reentry questions
