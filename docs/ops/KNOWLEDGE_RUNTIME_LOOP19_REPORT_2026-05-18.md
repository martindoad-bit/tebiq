# Knowledge Runtime Expansion Loop19 — Quarantine Bucket Finalization

Date: 2026-05-18  
Branch: `codex/knowledge-runtime-loop19`  
Scope: remaining 33 `ai_extracted` cards after Loop18

## Goal

Loop19 processed the remaining quarantine inventory as one controlled batch.
The target was not to maximize runtime count blindly, but to land every card in
a clear product bucket:

- `ANSWER_RUNTIME` for narrow official facts that improve ordinary answers;
- `MATERIALS_ONLY` for useful checklist / material navigation assets;
- `L5_ONLY` for high-risk practical route questions;
- `NEEDS_REWRITE` for cards with value but insufficient source shape.

## Review Inputs

Three subagents reviewed the same 33-card set:

| Reviewer | Role | Result |
|---|---|---|
| FACT source verifier | Official-source strength and link check | 28 unique official URLs returned 200 with browser UA; MOJ bare curl 403 treated as bot/UA behavior, not dead links |
| DOMAIN boundary reviewer | Administrative-scrivener-assistant boundary review | Strongly separated narrow facts from high-risk route / permission strategy cards |
| AQL / QA reviewer | User-question and product impact review | Prioritized cards that remove common myths without creating false certainty |

## Actions

### Promoted To `ANSWER_RUNTIME`

10 cards moved from `ai_extracted` to `ai_verified`:

| fact_id | Product value |
|---|---|
| `eijuu-shotoku-200man-myth` | Removes fixed-income-line myth for permanent residence |
| `gijinkoku-major-job-match` | Clarifies major / work-experience relevance for 技人国 |
| `kazoku-taizai-shotoku-280` | Removes fixed-income-line myth for 家族滞在 support ability |
| `ryugaku-shusseki-ritsu-80` | Removes fixed 80% attendance-line myth and points to official form fields |
| `keiei-kanri-existing-3year-transition` | Adds official 2025 reform transition period for existing business-manager holders |
| `zairyu-irrelevent-jutsu` | Reinforces status-change-before-out-of-scope-activity boundary |
| `shakai-hoken-kyotei-bilateral` | Adds social security agreement / pension aggregation country-check fact |
| `eijuu-kashikuken-bekkyo` | Adds permanent residence "longest status period" guideline fact |
| `eijuu-jukyo-period-overseas` | Adds continuous-residence caution without false 3-month / 180-day hard line |
| `yuigon-koseishousho-jutsu` | Adds Japanese notarial-will material fact for foreign residents with Japan assets |

Each promoted card now has an `injection_certain_block`; high-risk promoted
cards include direct, user-visible, non-domain-pending evidence.

### Kept As `MATERIALS_ONLY`

3 cards remain in quarantine but are product-bound as material navigation:

| fact_id | Landing surface |
|---|---|
| `eijuu-haigusha-visa` | `eijuu-haigusha-materials` |
| `kazoku-taizai-henko` | `kazoku-taizai-henko-materials` |
| `nihonjin-haigusha-visa` | `japanese-spouse-renewal-materials` |

### Explicitly Marked `L5_ONLY`

15 cards were explicitly kept out of ordinary answer runtime:

| fact_id | Reason |
|---|---|
| `eijuu-nenkin-risk` | General-applicant lookback, exemption, and gap treatment need rewrite |
| `eijuu-payment-strict-2024` | Permanent-residence cancellation / tax nonpayment requires caution |
| `eijuusha-haigusha-divorce` | Divorce/death route judgment |
| `kazoku-yobi-naitei-haigusha` | Pre-employment family COE timing has no direct official yes/no line |
| `keiei-kanri-capital-asset-3000man-criterion` | Guardrail against old 500万 myth, not standalone positive eligibility |
| `minashi-sainyuukoku` | Long departure / status-lapse edges remain too high-risk |
| `nihonjin-haigusha-divorce-teijusha` | Divorce-to-long-term-resident route judgment |
| `nyukoku-kyohi-jiyu` | Landing denial / special permission risks |
| `overstay-self-report-route` | Overstay self-report / departure-order route judgment |
| `overstay-taisho` | Overstay / special permission strategy risk |
| `teijusha-koshikai-vs-koshigai` |告示外定住 route risk |
| `zaijuu-haigusha-6months` | Spouse-status activity non-continuation and cancellation risk |
| `zairyu-pl-after-shibetsu` | Death-of-spouse route judgment |
| `zairyu-shikaku-torikeshi-jiyu-10` | Cancellation grounds require careful framing |
| `zairyu-tokubetsu-kyoka` | Special permission to stay is not an ordinary route |

### Left As `NEEDS_REWRITE`

5 cards are useful, but current source shape is not enough:

| fact_id | Rewrite needed |
|---|---|
| `eijuu-bbq-criminal-record` | Separate direct conduct guideline from practice-level criminal-record thresholds |
| `eijuu-jukyo-check-tax-shomeisho` | Narrow to official tax-certificate requirements; avoid unsupported previous-address mechanics |
| `keiei-kanri-jimu-bessho-requirement` | Split official office requirement from virtual/shared/home-office practice |
| `kodo-senmon-shoku-points` | Refresh point-table and permanent-residence-shortening sources |
| `koukou-mukyo-shogakukin` | Rewrite for current high-school tuition support reform state |

## Materials / Quick Reference Changes

- Added `foreign-will-notary-materials` for foreign residents preparing a
  Japanese notarial will.
- Added a quick search chip / alias group for `遗言`.
- Linked permanent residence materials to new answer-runtime facts:
  `eijuu-shotoku-200man-myth`, `eijuu-kashikuken-bekkyo`,
  `eijuu-jukyo-check-tax-shomeisho`, and `eijuu-nenkin-risk`.
- Linked family COE materials to `kazoku-taizai-shotoku-280`.

Materials topics increased from 46 to **47**.
Material references increased from 226 to **232**.

## Production Sync And Validation

Loop19 was merged to `main` in PR #195 and deployed to production as
`gitSha=1cd09334cb1533179a0e06b8b4bad23662367b54`.

After deployment:

| Check | Result |
|---|---|
| production DB sync | `fact-layer-sync: scanned=269 upserted=269 errors=0` |
| card import audit | filesystem and DB aligned: `ai_verified=233`, `ai_extracted=23`, `disabled=8`, `human_reviewed=5` |
| materials audit | 47 topics, 232 references, no missing references |
| production URL smoke | 70/70 pass |
| production answer smoke | 25/25 pass after R25 redline calibration |

The first post-merge rerun reached all 25 questions with HTTP 200 but produced
one R25 redline false positive because the answer explicitly said the 2028
transition does **not** mean "完全不管". The R25 regex was tightened in the
follow-up validation branch so that safe negated language such as "但并非完全不管"
does not fail the redline. A full rerun then passed **25/25**.

## Knowledge Counts After Production Sync

| State | Count |
|---|---:|
| `ai_verified` | 233 |
| `human_reviewed` | 5 |
| `ai_extracted` | 23 |
| `disabled` | 8 |
| Total fact cards | 269 |

Runtime-injectable cards after this branch and production sync: **238**.

Remaining `ai_extracted` cards are no longer an undifferentiated backlog:

| Bucket | Count |
|---|---:|
| `L5_ONLY` | 15 |
| `MATERIALS_ONLY` | 3 |
| `NEEDS_REWRITE` | 5 |

## Validation Before Merge

| Check | Result |
|---|---|
| FACT URL check | 28 unique official URLs returned 200 with browser UA |
| PDF spot check | `930004106.pdf` extracted with `pdfplumber`; form contains 出席状況 / 遵守状況 / 学習状況等の管理体制 |
| fact-layer dry sync | `scanned=269 upserted=0 errors=0` |
| unit tests | 265/265 pass |
| TypeScript | pass |
| lint | pass |
| card import audit | filesystem `ai_verified=233`, `ai_extracted=23`, `disabled=8`, `human_reviewed=5`; DB remains Loop18 until sync |
| materials audit | 47 topics, 232 references, no missing references |

## Product Impact

Loop19 is the first loop where the quarantine pool becomes product-governed
rather than merely smaller. The remaining 23 quarantine cards are deliberately
tagged: most are L5 or rewrite, not forgotten inventory.

Answer product improvement is concentrated in common user myths:

- "永住 must be fixed income X";
- "家族滞在 needs fixed income X";
- "留学更新 is simply an 80% line";
- "経営管理 existing holders instantly need full new criteria";
- "changing into out-of-scope activity can start before permission";
- "3 months / 180 days is an official permanent-residence hard line."

Materials improvement is concentrated in reusable life-material navigation:

- foreign resident notarial will;
- permanent-residence tax / pension / income / residence sub-facts;
- family-stay COE support-capacity sub-fact.

## Remaining Risks

- `eijuu-nenkin-risk` is still the most important rewrite candidate. It needs
  general permanent-residence source periods and exemption/gap framing before
  any runtime promotion.
- Business-manager office requirement should be split into a narrow official
  card and an L5 practice card.
- HSP point card needs current point-table / permanent-residence shortening
  source refresh.
- High-risk overstay, special permission, cancellation, divorce/death route
  cards must stay L5 until DOMAIN writes safer route-specific content.

## Next Loop Direction

Loop20 should focus on the 5 `NEEDS_REWRITE` cards and one or two high-value
L5 panels, especially:

1. `eijuu-nenkin-risk` rewrite using general permanent-residence application
   source;
2. `keiei-kanri-jimu-bessho-requirement` split into official office requirement
   + L5 office-practice caution;
3. `kodo-senmon-shoku-points` source refresh;
4. `eijuu-bbq-criminal-record` conduct-guideline rewrite;
5. `koukou-mukyo-shogakukin` current reform rewrite.
