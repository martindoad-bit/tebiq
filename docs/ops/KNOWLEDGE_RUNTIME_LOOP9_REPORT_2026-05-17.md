# Knowledge Runtime Expansion — Loop 9 Tax / Family / Boundary Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop9-tax-family-boundaries`

## Scope

Loop 9 processed 40 remaining `ai_extracted` candidates with a deliberately conservative standard. The batch focused on:

- tax / pension / PR cards that are easy to overstate;
- spouse / family-stay cards that quickly become L5 practice-signal work;
- status-change, cancellation, overstay, reentry, and entry-refusal boundary cards;
- Materials Universe references that help users navigate documents without turning practice judgment into ordinary answer injection.

This loop originally considered 7 possible runtime promotions, but DOMAIN review reduced the final answer-runtime set to 2. The five over-broad candidates were reverted to non-runtime before commit. That rollback is intentional and is the main quality outcome of this loop.

## Candidate Set

The 40-card batch:

`eijuu-jukyo-check-tax-shomeisho`, `eijuu-shotoku-200man-myth`, `eijuu-zeikin-payment`, `nenkin-tsuinou-10years`, `eijuu-kashikuken-bekkyo`, `eijuu-jukyo-period-overseas`, `eijuu-bbq-criminal-record`, `eijuu-haigusha-visa`, `nihonjin-haigusha-visa`, `nihonjin-haigusha-divorce-teijusha`, `eijuusha-haigusha-divorce`, `zaijuu-haigusha-6months`, `zairyu-pl-after-shibetsu`, `kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`, `kazoku-taizai-henko`, `gijinkoku-major-job-match`, `gijinkoku-job-mismatch`, `zairyu-irrelevent-jutsu`, `keiei-kanri-jimu-bessho-requirement`, `keiei-kanri-2025-4-requirements`, `keiei-kanri-capital-asset-3000man-criterion`, `keiei-kanri-existing-3year-transition`, `startup-visa-keiei-transition`, `minashi-sainyuukoku`, `sainyukoku-kyoka`, `zairyu-card-loss-overseas`, `zairyu-touriku-after-zaijuu`, `zairyu-period-3months-warning`, `zairyu-shikaku-torikeshi-jiyu-10`, `zairyu-tokubetsu-kyoka`, `overstay-taisho`, `overstay-self-report-route`, `nyukoku-kyohi-jiyu`, `teijusha-koshikai-vs-koshigai`, `ryugaku-shusseki-ritsu-80`, `tokutei-ginou-1-vs-2`, `shakai-hoken-kyotei-bilateral`, `tax-treaty-source-of-truth`, `ginko-account-gaijin-6months`.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 2 | Promoted to `ai_verified` with narrow `injection_certain_block` |
| `MATERIALS_ONLY` | 3 | Useful for document/material navigation, but not ordinary answer injection |
| `L5_ONLY` | 14 | Practice-signal/deep-water candidates only |
| `NEEDS_REWRITE` | 20 | Source, wording, route split, or professional-boundary risk remains |
| `REJECT` | 0 | No permanent reject in this batch |
| `UNKNOWN` | 0 | No unknown after FACT/DOMAIN review |

## Promoted Cards

| fact_id | Product use | Safety note |
|---|---|---|
| `zairyu-touriku-after-zaijuu` | Answer runtime + address/material pages | New landing long-term residents must notify residence within 14 days after deciding residence; source URL repaired to the ISA residence-notification page. |
| `tokutei-ginou-1-vs-2` | Answer runtime + job-change topic | Narrows to the 1号/2号 distinction: 1号 has a stay-period cap and ordinary family-accompaniment limitation; 2号 may allow spouse/child accompaniment, but no automatic transition. Field-count wording was removed to avoid stale “14分野” drift. |

## Material / Navigation Binding

Loop 9 updated:

- `lib/materials/material-entities.ts`
  - `juminhyo` now references `zairyu-touriku-after-zaijuu`.
  - `zairyu-card-passport` now references `zairyu-touriku-after-zaijuu`.
- `lib/quick-reference/topics.ts`
  - address-change topics now reference `zairyu-touriku-after-zaijuu`;
  - card-loss reissue materials now reference `zairyu-card-loss-overseas` as a non-runtime material hint;
  - job-change now references `zairyu-irrelevent-jutsu` and `tokutei-ginou-1-vs-2`.

These references are broader than answer-runtime promotion. A referenced fact card may still be `ai_extracted`; that does not mean it is safe for ordinary answer injection.

## Held Cards

### Materials-Only

- `eijuu-jukyo-check-tax-shomeisho`
- `eijuu-zeikin-payment`
- `nenkin-tsuinou-10years`

These help users understand document preparation, but they must not be promoted until route-specific PR/tax/pension wording is rewritten and source references are repaired where needed.

### L5-Only

- `nihonjin-haigusha-divorce-teijusha`
- `eijuusha-haigusha-divorce`
- `zaijuu-haigusha-6months`
- `zairyu-pl-after-shibetsu`
- `zairyu-irrelevent-jutsu`
- `keiei-kanri-2025-4-requirements`
- `keiei-kanri-capital-asset-3000man-criterion`
- `keiei-kanri-existing-3year-transition`
- `startup-visa-keiei-transition`
- `zairyu-shikaku-torikeshi-jiyu-10`
- `zairyu-tokubetsu-kyoka`
- `overstay-taisho`
- `overstay-self-report-route`
- `nyukoku-kyohi-jiyu`

Several of these received narrower draft text or injection-format scaffolding during the loop, but they remain `ai_extracted`. They should be used only as future L5/domain material unless and until a separate review promotes them.

### Needs Rewrite

| fact_id | Reason |
|---|---|
| `eijuu-shotoku-200man-myth` | Official PR guideline supports independent-livelihood framing, not fixed income thresholds. |
| `eijuu-kashikuken-bekkyo` | Longest-period and transition handling can be described, but the current wording is too practice-heavy. |
| `eijuu-jukyo-period-overseas` | Overseas-stay thresholds are not directly supported by official source. |
| `eijuu-bbq-criminal-record` | Criminal-record and good-conduct evaluation cannot be reduced to generic examples. |
| `eijuu-haigusha-visa` | Needs route split between status eligibility and PR route. |
| `nihonjin-haigusha-visa` | Needs route split between status eligibility, marriage reality, and income/support review. |
| `kazoku-taizai-shotoku-280` | Income-number myth unsupported. |
| `kazoku-yobi-naitei-haigusha` | COE/timing strategy is practice-sensitive. |
| `kazoku-taizai-henko` | Status-change strategy must separate permission-before-work from document path. |
| `gijinkoku-major-job-match` | Education/work relatedness is supported, but role-fit judgment remains practice-heavy. |
| `gijinkoku-job-mismatch` | Remains too easy to over-answer as ordinary runtime. |
| `keiei-kanri-jimu-bessho-requirement` | Office requirement needs updated official wording and virtual-office caveat. |
| `minashi-sainyuukoku` | Needs source repair and reentry-limit route split. |
| `sainyukoku-kyoka` | Needs source repair and ordinary/deemed reentry split. |
| `zairyu-period-3months-warning` | “3 months as warning signal” is not an official fact. |
| `teijusha-koshikai-vs-koshigai` | Long-term resident告示/告示外 distinction can be described only with careful source framing. |
| `ryugaku-shusseki-ritsu-80` | Numeric attendance threshold cannot be shown as official hard line. |
| `shakai-hoken-kyotei-bilateral` | Source count and country scope need update. |
| `tax-treaty-source-of-truth` | Treaty use requires country-specific handling; generic “source of truth” wording is too broad. |
| `ginko-account-gaijin-6months` | Banking practice claims need official and financial-institution separation. |

## Source Repairs / FACT Notes

FACT review caught two important source-quality issues before commit:

- `zairyu-touriku-after-zaijuu` had the correct residence-notification concept but the wrong ISA URL (`nyuukokukanri10_00016`, spouse notification). It was repaired to `nyuukokukanri10_00022`.
- `tokutei-ginou-1-vs-2` carried stale “14分野” wording. The runtime card now avoids exact field count and says only that field/business-category requirements must be confirmed.

FACT also marked several non-runtime cards as source-mismatch or insufficient. Those remain out of runtime and should drive later rewrite loops:

- `nenkin-tsuinou-10years`
- `eijuusha-haigusha-divorce`
- `zairyu-pl-after-shibetsu`
- `zairyu-irrelevent-jutsu`
- `zairyu-tokubetsu-kyoka`
- `overstay-self-report-route`
- `nyukoku-kyohi-jiyu`
- `shakai-hoken-kyotei-bilateral`

## Verification Before Commit

Completed locally before commit:

- `npm run fact-layer:sync:dry` — PASS, scanned 269, errors 0
- `npm run qa:card-import-audit` — PASS
- `npm run lint` — PASS
- `npx tsc --noEmit --pretty false` — PASS
- `npm test` — PASS, 257/257

Current filesystem waterline before production DB sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 200 |
| `human_reviewed` | 5 |
| runtime eligible | 205 |
| `ai_extracted` quarantine | 61 |
| disabled | 3 |
| material references | 198 |

Current production DB waterline before this loop sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 198 |
| `human_reviewed` | 5 |
| runtime eligible | 203 |
| `ai_extracted` quarantine | 63 |
| disabled | 3 |

The DB is intentionally behind until this loop is merged and targeted sync runs.

## Post-Merge Checklist

PR #170 merged to `main` as `85e236ed14fc90ec3f6034ff5ba2835e16a42648`.

Production targeted sync:

- `zairyu-touriku-after-zaijuu` — synced as `ai_verified`
- `tokutei-ginou-1-vs-2` — synced as `ai_verified`

Post-sync `npm run qa:card-import-audit` confirmed filesystem and DB match:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 200 |
| `human_reviewed` | 5 |
| runtime eligible | 205 |
| `ai_extracted` quarantine | 61 |
| disabled | 3 |
| material references | 198 |

Production build-info:

- `gitSha=85e236ed14fc90ec3f6034ff5ba2835e16a42648`
- `branch=main`
- `version=answer-core-v1.1-llm`

Production material / quick-reference route probes:

| Route | Result |
|---|---|
| `/quick-reference/address-change` | 200 |
| `/quick-reference/address-change-residence-card-materials` | 200 |
| `/quick-reference/card-loss-reissue-materials` | 200 |
| `/quick-reference/job-change` | 200 |
| `/materials/juminhyo` | 200 |
| `/materials/zairyu-card-passport` | 200 |

Production answer smoke:

- `npm run smoke:production-answer`
- result: `20/20 passed`
- build under test: `85e236ed14fc90ec3f6034ff5ba2835e16a42648`

## Loop 10 Direction

Loop 10 should continue from the 61 remaining `ai_extracted` cards, but should not chase count. Best next targets:

- source repair for cards FACT marked `dead_or_mismatch`;
- route-specific PR tax/pension/income rewrites;
- spouse/family status route split;
- L5 signal registry work for status cancellation, overstay, reentry, and business-manager transition issues;
- materials-only binding for document cards after URL repair.
