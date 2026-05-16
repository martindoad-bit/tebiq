# TEBIQ 0.8.5 FACT RC Support Report

Status: FACT support / Program 1 RC
Date: 2026-05-16
Owner: FACT / Current Fact Layer Operator

This report supports Program 1 of `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`.
It is not AQL scoring, not DOMAIN final judgement, and not user-facing copy.

Inputs read:

- `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`
- `docs/ops/TEBIQ_CARD_IMPORT_TO_PRODUCT_PLAN.md`
- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/eval/TEBIQ_0_8_5_AQL_TEST_PLAN.md`
- `docs/eval/TEBIQ_0_8_5_CARD_IMPORT_FIRST24.json`
- `docs/eval/TEBIQ_0_8_5_FIRST24_RUN_RESULT.json`
- `docs/domain/TEBIQ_0_8_5_IMPORT_DOMAIN_REVIEW.md`
- `docs/fact-cards/` current sync-scannable card set
- `lib/quick-reference/topics.ts`

Verification snapshot:

- `npm run qa:card-import-audit` passes for filesystem/DB/material references.
- Fact cards: 101 filesystem cards, 101 DB rows, no DB drift.
- Materials: 13 quick-reference topics, 21 fact-card references, no missing references.
- Route-gate source registry debt remains: 52 route gate patterns, 53 source asset ids, 50 unresolved ids.
- First24 provider-backed result: 24/24 completed, 0 validator findings, 21/24 with fact-card audit rows.

## 1. RC-Blocking Or RC-Risk Source Gaps

These are the FACT-side gaps most likely to block the move from First24 to a 50-60 provider-backed matrix. "Block" here means: the model may answer safely through route gates, but the answer cannot be cleanly traced to concrete official-source assets or may accidentally inject an adjacent positive card.

| Priority | Gap | AQL/First24 pressure | Current state | FACT action needed |
|---:|---|---|---|---|
| P0 | National tax `納税証明書その3` lacks a dedicated positive/source-only fact card | A05 and future tax/PR cases | Runtime has route gate `national-tax-certificate-sono3-route`; First24 injected `juminzei-kazei-shomeisho`, which is adjacent but not the national-tax source asset | Create or map a source-only / positive-narrow card for NTA/e-Tax `その3`; keep resident-tax and national-tax materials separate |
| P0 | Immigration notice taxonomy lacks a concrete fact/source card | B12, C08, E04, notice negative controls | First24 B05 had zero fact cards; route gate is runtime-connected but `guardrail-immigration-notice-taxonomy` is unresolved in source registry | Add a source-only notice taxonomy asset with official ISA paper/online notice locators; do not make it positive outcome logic |
| P0 | Nonpermission / no ordinary appeal / post-result deadline facts are route-only | C07, C05, nonpermission matrix expansion | First24 C05 had zero fact cards; route gates work but source ids are unresolved | Add source-only pack for nonpermission notice handling, special-period end, and appeal/re-application distinction; keep deep-water |
| P0 | Business-manager 2025 cards can still inject as positive cards | A11, B02, C11, E03 | First24 B02 and C07 injected `keiei-kanri-2025-10` and `keiei-kanri-existing-holder-update`; DOMAIN says not wholesale positive | Quarantine from positive injection for RC or force guardrail-only use until metadata/body conflict is resolved |
| P0 | Business-manager company disposition source is route-only | C11, E09 | `business-manager-disposition-no-auto-success` exists, but source asset unresolved | Keep route gate; add source-only locator pack for ISA business-manager status, change/renewal, cancellation/activity non-performance. No positive route |
| P0 | Special-period departure is deep-water without official positive source | C02 and Loop2N-style expansion | Route gate/validator exist; official source does not settle departure consequence | Keep deep-water only; record source gap explicitly. Do not create positive fact unless official text supports it |
| P0 | HSP1 institution change lacks product-grade source asset mapping | C04/C03 and HSP follow-ups | Route gate works; First24 C03 injected `kodo-senmon-shoku-points` and `eijuu-zairyu-kikan`, which can dilute the stop boundary | Add source-only HSP1 institution-change locator asset; suppress unrelated positive HSP/PR facts in this trap family if possible |
| P0 | DV/address-safety source asset is unresolved | C10, E02/E05 | Route gate works; `spouse-divorce-separation` injects, but DV support/source facts are not a concrete fact card | Add source-only DV/address-safety pack from Cabinet Office / municipal DV support / ISA; keep route as safety-first deep-water |
| P1 | Late tax/payment remediation not erased is route-only | E02 and tax/PR bucket | First24 E01 only had `eijuu-nenkin-risk` hint_only; route source unresolved | Add source-only or guardrail card for late-payment history, proof collection, and no approval prediction |
| P1 | Resident-tax fiscal year / Jan 1 municipality is not a concrete route-gate source file | A06, B03, D06 | `juminzei-kazei-shomeisho` exists; route gate source unresolved | Add locator mapping or source-only asset for fiscal-year/Jan 1 issuing municipality examples |
| P1 | Incomplete material filing before expiry is route-only | C03/C02/E06 | First24 C02 injected `zairyu-expiry-renewal-change` only; missing-material source asset unresolved | Add source-only incomplete-material / online return-status / special-period interaction asset; no positive "safe bridge" |
| P1 | Short-stay meeting negative control still trips a route gate | D01 | First24 D01 had `short-stay-no-work-no-shikakugai` route but no fact cards; roadmap says answer was safe after fixes | Add narrow short-stay business-meeting source-only card or tighten route expectation; avoid hard illegal-work conclusion |
| P1 | Materials pages lack scenario-specific source packs for several B bucket questions | B01-B12 expansion | Quick Reference has 13 topics, but no specific 技人国 renewal materials, PR materials, family renewal, business-manager materials, notice materials, return-home materials pages | FACT should supply official materials source packs before Materials Tab expansion |

## 2. High-Risk Theme Check

### 2.1 経営管理 2025

Current files:

- `docs/fact-cards/keiei-kanri-2025-10.md`
- `docs/fact-cards/keiei-kanri-existing-holder-update.md`
- `docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md`
- `docs/fact-cards/startup-visa-keiei-transition.md`
- `docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md`
- `docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md`

FACT RC position:

- `keiei-kanri-2025-10` and `keiei-kanri-existing-holder-update` should not be used as broad positive injected cards in Program 1. First24 shows they currently inject in B02/C07.
- `keiei-kanri-capital-asset-3000man-criterion` is `ai_extracted` and `production_disposition: guardrail_only`; do not positive-inject.
- `startup-visa-keiei-transition` is `ai_extracted`; keep deep-water.
- G57/G103 knowledge-atlas files are already quarantined and must not become positive-answer assets.

Needed source support:

- Full 2025 reform eligibility matrix with official locators.
- Existing-holder transition locators separated from new/change applications.
- Startup/designated activity 44/51 transition locators.
- Company disposition before status change source-only pack.

### 2.2 Special Period

Current runtime:

- `special-period-two-month-boundary`
- `special-period-departure-deepwater`
- `nonpermission-special-period-ended-boundary`
- cards: `shinseichu-zairyu-keizoku`, `zairyu-expiry-renewal-change`, `sainyukoku-kyoka`, `minashi-sainyuukoku`

FACT RC position:

- Positive facts may cover the basic endpoint only: disposition date or original expiry + two months, whichever is earlier, where officially sourced.
- Departure during special period remains deep-water. Do not answer "safe to leave" or "definitely terminated" from current cards.
- First24 A04 injected `sainyukoku-kyoka` and `zairyu-expiry-renewal-change`, while `minashi-sainyuukoku` was hint_only. That is acceptable only if answer preserves the shorter-of-one-year/current-expiry boundary and does not answer special-period departure.

Needed source support:

- Source-only locator for special-period endpoint.
- Deep-water note for special-period departure source absence.
- Nonpermission endpoint source pack.

### 2.3 HSP1 Institution Change

Current runtime:

- `hsp1-institution-change-permission-first`
- validators for notification-as-permission, certificate-as-route, workaround before permission.

FACT RC position:

- Keep negative guardrail only.
- Do not let `kodo-senmon-shoku-points` or `kodo-senmon-shoku-eijuu` become the main positive cited fact in HSP1 institution-change trap cases.
- No FACT card should decide onboarding, training, remote work, account login, same-group transfer, or already-started remediation.

Needed source support:

- HSP1 status/change permission official source locator.
- Source-only map separating 14-day notification, points evidence, status-change permission, and work start.

### 2.4 Japanese Spouse / DV

Current runtime:

- `spouse-divorce-separation`
- `dv-address-safety-first`
- related cards: `nihonjin-haigusha-visa`, `eijuu-haigusha-visa`

FACT RC position:

- `spouse-divorce-separation` may support direct official facts like 14-day notification and cancellation-risk framework, but not post-divorce route outcome.
- DV/address safety must be source-only/deep-water. Do not instruct the user to contact a potentially unsafe spouse for materials.
- `nihonjin-haigusha-visa` and `eijuu-haigusha-visa` should not be used to decide separation, remarriage, 定住者 route, or substitute-material sufficiency.

Needed source support:

- DV support/window locators.
- ISA spouse notification/cancellation locators.
- Materials-only pack for ordinary spouse renewal versus separated/DV cases.

### 2.5 Tax / Pension

Current runtime:

- `juminzei-kazei-shomeisho`
- `kokumin-nenkin-menjo`
- `eijuu-nenkin-risk`
- `rishoku-kenko-hoken`
- `rishoku-kokumin-nenkin-kirikae`
- `jumin-zei-shutsukoku`

FACT RC position:

- Materials/procedure facts are usable.
- Approval impact and lookback period specifics must stay withheld unless the direct source applies to the exact applicant type.
- `eijuu-nenkin-risk` has a long confidence comment and inference caveat; keep it hint/guardrail unless source fields are split.

Needed source support:

- National tax `その3` source card.
- Resident-tax Jan 1/fiscal-year locator.
- Late-payment not-erased source-only card.
- PR/public-obligation proof source pack, separated from permission prediction.

### 2.6 技人国 Work Scope

Current runtime:

- `gijinkoku-job-mismatch`
- `gijinkoku-koushin-shorui`
- `tensyoku-zairyu`
- `shuro-shikaku-shomeisho`
- route: `gijinkoku-work-scope-not-any-job`

FACT RC position:

- `gijinkoku-job-mismatch` can support negative boundary against manual/onsite non-scope work, but should not classify every mixed duty as illegal.
- `gijinkoku-koushin-shorui` supports materials, but CEFR/application-scope flags must not enter positive injection.
- `shuro-shikaku-shomeisho` is safe for definition, not permission.

Needed source support:

- Work-scope source locator for 技人国 status page and excluded/manual activity boundary.
- Materials source pack for renewal/change and company category.
- Existing dangling internal ref `gijinkoku-job-change-notification` should be mapped to `tensyoku-zairyu` or a source-only notification card.

### 2.7 Supplemental Request / Nonpermission

Current runtime:

- `immigration-notice-taxonomy-first`
- `incomplete-materials-before-expiry-no-safe-bridge`
- `result-postcard-not-permission`
- `nonpermission-no-ordinary-appeal-no-grace`
- `nonpermission-special-period-ended-boundary`

FACT RC position:

- Keep extraction-first.
- No positive fact should classify a vague "通知/ハガキ/メール" as final permission or nonpermission.
- No answer should invent the deadline, accepted submission method, or safe bridge from incomplete materials.

Needed source support:

- Official notice taxonomy source pack.
- Supplemental material response source-only asset.
- Nonpermission / no formal appeal / post-result special-period end source pack.

## 3. Cards Directly Usable For RC Positive/Narrow Facts

These cards can support Program 1 provider-backed tests as positive or narrow factual citations, subject to the existing matcher gate and with `needs_review_flags` excluded from injection.

| Card | RC use | Notes |
|---|---|---|
| `zairyu-address-change` | positive procedural fact | Strong low-risk candidate; avoid overmatching "通知" from A01 |
| `zairyu-card-loss-reissue` | positive procedural fact | Strong; card-loss workflow |
| `rishoku-kenko-hoken` | positive materials/procedure | Use for health-insurance after leaving job |
| `rishoku-kokumin-nenkin-kirikae` | positive materials/procedure | Use for pension switch after leaving job |
| `juminzei-kazei-shomeisho` | positive resident-tax material fact | Do not use for national-tax `その3` |
| `gijinkoku-koushin-shorui` | materials/narrow procedure | Exclude CEFR/details in needs_review |
| `eijuu-shinsei-shorui` | materials/narrow procedure | Exclude applicant-type and outcome inferences |
| `jyumin-hyo-gaijin` | common material | Use for住民票 / municipality window |
| `kokumin-nenkin-menjo` | positive distinction | Exemption/猶予 is not the same as unfiled arrears; no PR prediction |
| `shuro-shikaku-shomeisho` | definition fact | Certificate is evidence/confirmation, not new permission |
| `zairyu-nintei-shomeisho` | definition/procedure | COE flow/validity, no entry guarantee |
| `eijuu-card-koushin` | positive procedural fact | Card validity separate from PR status |
| `kitaku-tetsuzuki` | materials/procedure | Return-home materials support, not re-entry safety |
| `jumin-zei-shutsukoku` | materials/procedure | Return-home tax handling |
| `nenkin-dattai-ichijikin` | materials/procedure | Pension lump-sum withdrawal; keep flags withheld |
| `kazoku-taizai-yoken` | narrow materials/context | Family-stay work/sponsor material context; no approval prediction |
| `gijinkoku-job-mismatch` | narrow negative fact | Work-scope boundary, not final illegal-work finding |
| `zairyu-expiry-renewal-change` | basic renewal/special-period structure | Use carefully; no "incomplete filing safe" claim |

## 4. Cards / Source Assets That Must Stay Guardrail Or Deep-Water

| Card or route asset | Use | Reason |
|---|---|---|
| `keiei-kanri-2025-10` | guardrail/deep-water for RC | Current positive injection risk; metadata/body and audit conflict |
| `keiei-kanri-existing-holder-update` | guardrail/deep-water for RC | Transition fact only; no positive renewal safety |
| `keiei-kanri-capital-asset-3000man-criterion` | guardrail-only | Explicit `production_disposition: guardrail_only`, `ai_extracted` |
| `startup-visa-keiei-transition` | deep-water | `ai_extracted`; startup transition unresolved |
| `shinseichu-zairyu-keizoku` | guardrail/narrow special-period | Basic fact only; activity and departure remain deep-water |
| `minashi-sainyuukoku` | guardrail/deep-water | Critical; no over-one-year or special-period-departure certainty |
| `zairyu-shikaku-torikeshi` | guardrail/deep-water | Critical cancellation consequences |
| `overstay-taisho` | deep-water | Overstay/investigation/legal consequence |
| `spouse-divorce-separation` | guardrail/deep-water, with narrow direct facts | Do not decide route after divorce/separation/DV |
| `nihonjin-haigusha-visa` | materials/context only | Separation/DV/remarriage route cannot be positive |
| `eijuu-haigusha-visa` | materials/context only | Same |
| `kodo-senmon-shoku-points` | source/context only in HSP traps | Points do not authorize HSP1 institution change |
| `kodo-senmon-shoku-eijuu` | source/context only | No PR shortcut prediction |
| `shikakugai-fukugyou` | guardrail/narrow definition | No workaround for work-start/status change |
| `eijuu-nenkin-risk` | hint/guardrail | Critical + confidence/source caveat |
| `gijinkoku-job-mismatch` | guardrail/narrow negative fact | Work-scope trap; avoid overclassification |

## 5. Suggested Quarantine / Downgrade For RC

These do not require deleting cards. They should be quarantined from positive-answer injection or treated as source-only until reviewed.

| Asset | Suggested RC disposition | Reason |
|---|---|---|
| `docs/fact-cards/keiei-kanri-2025-10.md` | quarantine from positive injection | First24 injected it; audit says business-manager reform facts are guardrails only until rewrite/re-review |
| `docs/fact-cards/keiei-kanri-existing-holder-update.md` | quarantine from positive injection or add RC guardrail-only handling | Transition can be stated, but not as renewal safety; current runtime injects it in B02/C07 |
| `docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md` | keep `guardrail_only`; no positive use | Already marked `ai_extracted` and guardrail-only |
| `docs/fact-cards/startup-visa-keiei-transition.md` | keep `ai_extracted`; no positive use | Startup/designated-activity transition unresolved |
| `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md` | keep quarantined | Contains mixed old/new rule errors |
| `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md` | keep quarantined except company-formation separate-procedure boundary | Contains unsafe 2025 criteria text |
| `docs/fact-cards/eijuu-nenkin-risk.md` | hint-only or guardrail for RC | Critical card; source caveat in confidence; not suitable for exact positive lookback claims |
| `docs/fact-cards/kodo-senmon-shoku-points.md` | avoid injection in HSP1 institution-change traps | Can distract from permission-before-work boundary |
| `docs/fact-cards/kodo-senmon-shoku-eijuu.md` | avoid injection in HSP1 institution-change traps | HSP/PR shortcut not relevant to work-start authorization |

## 6. Materials Source Packs Needed Before 56-Question Expansion

The Materials Tab currently has 13 topics in `lib/quick-reference/topics.ts`. For the B bucket and follow-up cases, FACT should provide official-source packs for:

| Needed materials pack | Test pressure | Current status |
|---|---|---|
| 技人国 renewal materials | B01, E01 | Fact card exists; no dedicated quick-reference topic |
| 永住 materials and tax/pension proof | B03, E02 | Fact cards exist; source boundaries need PR/public-obligation split |
| 家族滞在 renewal sponsor materials | B04, A10 | Fact card exists; no dedicated materials topic |
| Spouse renewal / separation materials | B05, E05, E02 | Cards exist but deep-water; need ordinary vs separated/DV split |
| 経営管理 renewal/change materials | B02, B10, E03, E09 | Current management check-dimension docs include risky/source-thin claims; needs official source pack |
| Immigration notice / supplemental materials | B12, C03, C08, E04, E06 | No fact card; route-only |
| Nonpermission response fact pack | C07 | No fact card; route-only |
| Return-home admin materials | B11 | `kitaku`, tax, pension cards exist; no single materials topic |
| National tax `その3` | A05, B03, tax bucket | No dedicated fact card; tax quick-reference mixes resident tax and national tax |
| Resident-tax fiscal year / Jan 1 municipality | A06, D06 | Card exists; route source unresolved; needs clearer source locator |

## 7. FACT Recommendation For Program 1

For 0.8.5 RC, FACT should support the 50-60 provider-backed matrix with three controlled moves:

1. Keep current low-risk positive facts active: address, card loss, health/pension switch, resident-tax materials, 技人国 materials, PR materials, COE/certificate definitions.
2. Add source-only / materials-source packs for the gaps above, especially `その3`, notices, nonpermission, HSP1 institution change, DV/address safety, and business-manager disposition.
3. Quarantine business-manager 2025 and startup-transition assets from positive injection until the card metadata, body, audit, and DOMAIN position are aligned.

Do not promote any unresolved `needs_review_flags`, `ai_extracted`, `guardrail_only`, `quarantined`, or source-registry-only content into positive frontend certainty.
