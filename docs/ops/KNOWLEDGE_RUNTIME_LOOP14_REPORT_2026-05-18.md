# Knowledge Runtime Expansion Loop14 — Conservative Landing / Nonpermission Smoke Repair

Date: 2026-05-18  
Branches:
- `codex/knowledge-runtime-loop14`
- `codex/knowledge-runtime-loop14-report`

Merged PRs:
- [#186](https://github.com/martindoad-bit/tebiq/pull/186) `knowledge: land loop14 narrow runtime card`
- [#187](https://github.com/martindoad-bit/tebiq/pull/187) `fix: require professional route for nonpermission reapply`

Production SHA after final verification: `8fa94e204680b8275dc9dfb6dc3d89317ecbdc07`

## Goal Fit

Loop14 processed the remaining 42 normalized `ai_extracted` candidates after Loop13. The loop deliberately optimized for precision over count:

- promote only narrow official facts that both FACT and DOMAIN could support;
- keep materials-useful but answer-risky cards out of normal runtime;
- disable cards where official-source support was not strong enough;
- verify the answer layer on production after DB sync.

This means Loop14 increases runtime by only one card, but reduces false confidence in two unsafe cards and fixes one production smoke failure.

## Candidate Set

42 cards reviewed:

`eijuu-bbq-criminal-record`, `eijuu-haigusha-visa`, `eijuu-jukyo-check-tax-shomeisho`, `eijuu-jukyo-period-overseas`, `eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`, `eijuu-payment-strict-2024`, `eijuu-shotoku-200man-myth`, `eijuusha-haigusha-divorce`, `gijinkoku-job-mismatch`, `gijinkoku-major-job-match`, `kazoku-taizai-henko`, `kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`, `keiei-kanri-2025-4-requirements`, `keiei-kanri-capital-asset-3000man-criterion`, `keiei-kanri-existing-3year-transition`, `keiei-kanri-jimu-bessho-requirement`, `kihaku-shippai-saido-strategy`, `kodo-senmon-shoku-points`, `koukou-mukyo-shogakukin`, `minashi-sainyuukoku`, `nihonjin-haigusha-divorce-teijusha`, `nihonjin-haigusha-visa`, `nyukoku-kyohi-jiyu`, `overstay-self-report-route`, `overstay-taisho`, `ryugaku-shusseki-ritsu-80`, `sainyukoku-kyoka`, `shakai-hoken-kyotei-bilateral`, `startup-visa-keiei-transition`, `tax-treaty-source-of-truth`, `teijusha-koshikai-vs-koshigai`, `tokutei-katsudo-survival`, `tokutei-katsudou-17go`, `yuigon-koseishousho-jutsu`, `zaijuu-haigusha-6months`, `zairyu-irrelevent-jutsu`, `zairyu-period-3months-warning`, `zairyu-pl-after-shibetsu`, `zairyu-shikaku-torikeshi-jiyu-10`, `zairyu-tokubetsu-kyoka`.

## Bucket Result

| Bucket | Count | Cards |
|---|---:|---|
| `ANSWER_RUNTIME` | 1 | `tokutei-katsudou-17go` |
| `MATERIALS_ONLY` existing bindings audited | 3 | `eijuu-jukyo-check-tax-shomeisho`, `shakai-hoken-kyotei-bilateral`, `yuigon-koseishousho-jutsu` |
| `MATERIALS_ONLY` deferred | 1 | `koukou-mukyo-shogakukin` |
| `L5_ONLY` retained | 15 | `eijuu-bbq-criminal-record`, `eijuusha-haigusha-divorce`, `keiei-kanri-capital-asset-3000man-criterion`, `keiei-kanri-existing-3year-transition`, `kodo-senmon-shoku-points`, `minashi-sainyuukoku`, `nihonjin-haigusha-divorce-teijusha`, `nyukoku-kyohi-jiyu`, `overstay-self-report-route`, `overstay-taisho`, `zaijuu-haigusha-6months`, `zairyu-irrelevent-jutsu`, `zairyu-pl-after-shibetsu`, `zairyu-shikaku-torikeshi-jiyu-10`, `zairyu-tokubetsu-kyoka` |
| `NEEDS_REWRITE` | 19 | `eijuu-haigusha-visa`, `eijuu-jukyo-period-overseas`, `eijuu-kashikuken-bekkyo`, `eijuu-nenkin-risk`, `eijuu-shotoku-200man-myth`, `gijinkoku-job-mismatch`, `gijinkoku-major-job-match`, `kazoku-taizai-henko`, `kazoku-taizai-shotoku-280`, `kazoku-yobi-naitei-haigusha`, `keiei-kanri-2025-4-requirements`, `keiei-kanri-jimu-bessho-requirement`, `nihonjin-haigusha-visa`, `ryugaku-shusseki-ritsu-80`, `sainyukoku-kyoka`, `startup-visa-keiei-transition`, `tax-treaty-source-of-truth`, `teijusha-koshikai-vs-koshigai`, `tokutei-katsudo-survival` |
| `REJECT` / `disabled` | 2 | `kihaku-shippai-saido-strategy`, `zairyu-period-3months-warning` |
| `UNKNOWN` | 1 | `eijuu-payment-strict-2024` |

## Actions

### 1. Narrow runtime promotion

`tokutei-katsudou-17go` moved from `ai_extracted` to `ai_verified`.

Safety boundary:

- The card no longer presents this as ordinary post-graduation job-search continuation.
- The injected block is limited to "内定後、採用まで" 特定活動.
- It explicitly withholds individual questions about documents, work permission, internship permission, hiring delay, and designated-activity scope.
- The ordinary `job-change` topic no longer references this card, so job-change users do not get an irrelevant post-student special-activity link.

Official source was checked against the ISA page title and body:

- 出入国在留管理庁「大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在をご希望のみなさまへ」
- URL: `https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html`

### 2. Unsafe cards disabled

| fact_id | Why disabled |
|---|---|
| `kihaku-shippai-saido-strategy` | FACT found source mismatch / unsupported strategy framing. Nonpermission response is already covered by route gates and L5 handoff. |
| `zairyu-period-3months-warning` | "3-month period = warning signal" is a practice inference, not a direct official fact. General residence-period facts stay in `zairyu-kikan-5years-default`. |

### 3. Materials path audited

No new material entity was added in this loop. Existing bindings were audited:

- `eijuu-jukyo-check-tax-shomeisho` remains useful in resident-tax / permanent-residence material paths, but not answer runtime.
- `shakai-hoken-kyotei-bilateral` remains useful in pension/social-insurance material context, but not answer runtime.
- `yuigon-koseishousho-jutsu` remains in family-relation / document context, but international inheritance effect stays out of answer runtime.
- `koukou-mukyo-shogakukin` remains deferred until the 2026 high-school support scheme wording is rewritten.

`npm run qa:card-import-audit` confirmed:

- fact-card filesystem total: 269
- Materials topics: 43
- Materials references: 215
- Missing material fact references: 0

### 4. Production smoke repair

After PR #186, `smoke:production-answer` found one failure:

| Smoke id | Failure | Fix |
|---|---|---|
| `R14-nonpermission-strategy` | The answer was not dangerous, but it did not explicitly name 行政書士 / 入管 / 弁護士 / 専門家 for "永住不许可后出国再回来重新申请". | PR #187 tightened `nonpermission-no-ordinary-appeal-no-grace` `mustSay` to require professional / 入管 confirmation for reapply, departure/reentry, or continued-stay sequencing. |

After PR #187, production answer smoke passed 25/25.

## Current Knowledge Counts

After PR #186 and production DB sync:

| State | Count |
|---|---:|
| `ai_verified` | 218 |
| `human_reviewed` | 5 |
| `ai_extracted` | 39 |
| `disabled` | 7 |
| Total | 269 |

Production DB sync result:

```text
fact-layer-sync: scanned=269 upserted=269 errors=0
```

## Verification

Local verification before PR #186:

- `npm run fact-layer:sync:dry` — PASS, scanned=269, errors=0
- `npm run qa:card-import-audit` — PASS, missing material references=0
- `npm test -- --runInBand` — PASS, 264/264
- `npm run lint` — PASS
- `npx tsc --noEmit --pretty false` — PASS

Production verification:

- Build #186 deployed at `7bcbe148868f8146dc637ff20ab58714550dd36c`
- Production DB sync — PASS, scanned=269, upserted=269, errors=0
- `npm run qa:production-smoke` — PASS, 70/70 checked routes
- Initial `smoke:production-answer` after #186 — 24/25, R14 failed missing professional route wording
- Build #187 deployed at `8fa94e204680b8275dc9dfb6dc3d89317ecbdc07`
- Final `PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer` — PASS, 25/25

## Product Impact

Answer layer:

- +1 narrow official runtime card for 内定者のための特定活動.
- -2 unsafe candidates removed from future accidental promotion.
- Stronger nonpermission handoff behavior for "不许可后出国再回来重新申请".

Materials layer:

- No new entity count increase.
- Existing material references remain valid with 0 missing fact IDs.
- The ordinary job-change material path no longer points to the 内定者特定活動 card.

Risk posture:

- P0: 0
- Known P1/P2: remaining `NEEDS_REWRITE` cards should not be promoted until source and practice framing are split.

## Next Loop

Loop15 should stop revisiting the same 39 `ai_extracted` cards as a raw promotion pool. Most remaining cards are either:

1. practice-sensitive and already better handled as L5 signals;
2. route-specific cards requiring rewrite before promotion;
3. non-immigration life/material cards needing current-source refresh.

Recommended Loop15 shape:

- pick 30-50 cards from outside the current leftover set, or
- rewrite a smaller group of the 19 `NEEDS_REWRITE` cards into new narrow cards before review.

Priority rewrite candidates:

- `eijuu-shotoku-200man-myth`
- `gijinkoku-major-job-match`
- `kazoku-taizai-shotoku-280`
- `ryugaku-shusseki-ritsu-80`
- `tax-treaty-source-of-truth`
- `teijusha-koshikai-vs-koshigai`

