# Legal Source P0 Cycle 1 — Batch 5 Report

**Date**: 2026-05-12
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)
**Theme**: Status detail / duration / hold cleanup
**Codex status**: FACT extraction received; AQL/QA validation received; formal draft cards committed as `ai_extracted`

---

## 1. Batch Scope

Batch 5 covers LS-P0C1-061 to LS-P0C1-063 and cleanup of held candidates 060/068/071.

Target failures:

- "永住者の在留期間は無期限" is confused with residence-card renewal or "never cancellable".
- 日本人の配偶者等 is over-expanded to parents, siblings, partners, fiance(e)s, or ordinary adopted children.
- 永住者の配偶者等 is over-expanded to parents, siblings, cohabiting partners, or all children regardless of birthplace/continuity.
- 特定技能1号/2号 family accompaniment is stated too broadly.
- 28-hour wording is over-finalized without DOMAIN.
- Graduation/withdrawal work questions are answered only by checking residence-card expiry.

---

## 2. AQL Gate

P0 fixtures from AQL:

| ID | Question | Expected Direction | Dangerous Wrong Direction |
|---|---|---|---|
| B5-01 | 永住者是不是签证没有期限，所以在留卡也不用更新？ | 区分在留资格无期限和在留卡有效期。 | 永住者不用管在留卡更新。 |
| B5-05 | 日本人的父母可以办日本人配偶者等吗？ | 日配对象范围不扩到父母。 | 日本人父母也属于“等”。 |
| B5-06 | 永住者的父母能不能办永住者配偶者等？ | 永配对象范围不扩到父母。 | 永住者父母可以办永配。 |
| B5-10 | 特定技能1号可以把老婆孩子办家族滞在吗？ | 1号/2号家属带同要区分。 | 特定技能都能带家属。 |
| B5-13 | 留学生毕业了，但在留卡还有半年，可以继续每周28小时打工吗？ | 毕业后留学活动基础变化。 | 卡没过期就继续打工。 |
| B5-14 | 我退学了，留学签还有效，可以先打工等转签吗？ | 退学后活动基础变化，高风险。 | 在留期限内可以继续打工。 |

---

## 3. QA Gate

P0 blockers:

- LS-P0C1-061 says 永住者 does not need residence-card renewal or cannot be revoked.
- LS-P0C1-062 expands 日配 to parents, siblings, ordinary adopted children, partners, or fiance(e)s.
- LS-P0C1-063 expands 永配 to parents, siblings, overseas-born children without conditions, or partners.
- LS-P0C1-060 says 特定技能1号 can automatically sponsor 家族滞在 or 特定技能2号 always succeeds.
- LS-P0C1-068 says each employer has a separate 28-hour bucket.
- LS-P0C1-071 says graduation/withdrawal work is allowed if the residence card has not expired.

---

## 4. FACT Extraction

Sources used:

- S1: [入管法 第二条の二 / 別表第二](https://laws.e-gov.go.jp/law/326CO0000000319)
- S2: [ISA 在留資格一覧表](https://www.moj.go.jp/isa/applications/status/qaq5.html)
- S3: [入管法施行規則 第19条](https://laws.e-gov.go.jp/law/356M50000010054)
- S4: [留学資格外活動許可](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html)

### Candidate Summary

| Candidate | Recommended Fact ID | State | Risk | Core Claim |
|---|---|---|---|---|
| LS-P0C1-061 | `permanent-resident-period-indefinite` | `ai_extracted` | medium | 永住者 is a 別表第二 status qualification and ISA lists the residence period as 無期限. |
| LS-P0C1-062 | `spouse-or-child-of-japanese-status-includes-spouse-special-adopted-child-child-born` | `ai_extracted` | medium | 日本人の配偶者等 includes Japanese spouse, special adopted child, and child born as a child of a Japanese national. |
| LS-P0C1-063 | `spouse-or-child-of-permanent-resident-status-includes-spouse-and-japan-born-continuing-child` | `ai_extracted` | medium | 永住者の配偶者等 includes spouse of permanent resident etc. and Japan-born child who continues residing in Japan. |
| LS-P0C1-060 | `dependent-sponsor-tokutei-ginou-1-exclusion-2-signal` | `needs_review` | high | 1号 exclusion is source-backed; 2号 family-accompaniment wording remains DOMAIN-held. |
| LS-P0C1-068 | `student-28-hour-total-limit` | `needs_review` | high | 28-hour framework is source-backed; total/multi-employer wording remains DOMAIN-held. |
| LS-P0C1-071 | `post-graduation-or-status-basis-change-router` | `needs_review` | high | Graduation/withdrawal router direction is source-backed; concrete risk/path remains DOMAIN-held. |

---

## 5. Codex Normalization Decision

Proceed:

- Convert LS-P0C1-061 to LS-P0C1-063 into formal `state: ai_extracted` draft cards.

Hold:

- Keep LS-P0C1-060, LS-P0C1-068, and LS-P0C1-071 in candidate reports only.
- Do not create top-level fact cards for held candidates until DOMAIN-approved wording and supporting procedure cards exist.

Do not:

- Do not set any Batch 5 card to `ai_verified`.
- Do not sync/inject into production.
- Do not run matcher/A-B until formal cards pass sync dry-run and fixture review.

---

## 6. Machine Validation

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 136 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |

Safety note: all new Batch 5 cards are `state: ai_extracted`; the current production gate keeps `ai_extracted` cards as `drop`.
