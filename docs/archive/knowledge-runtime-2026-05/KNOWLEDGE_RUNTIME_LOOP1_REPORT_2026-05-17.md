# Knowledge Runtime Expansion Goal — Loop 1 Report

Date: 2026-05-17  
Owner: Codex Production Lead / AI Engineering Lead  
Production deploys:
- PR #152 `e4f2b64` — `feat(knowledge): loop1 runtime promotions`
- PR #153 `ddef088` — `fix(route): catch PR nonpermission reapply after departure`

## 1. Loop Goal

Loop 1 is the first operating cycle under the Knowledge Runtime Expansion Goal:

- process 30-50 quarantined cards;
- use FACT + DOMAIN + AQL/QA review before promotion;
- promote only cards whose source and professional boundary are sufficiently safe;
- bind usable cards into answer runtime and materials where appropriate;
- run DB sync, answer regression, materials regression, QA audit, and production smoke;
- continue to the next loop if no P0 remains.

## 2. Input Scope

Candidate pack: `docs/ops/KNOWLEDGE_RUNTIME_LOOP1_CANDIDATES_2026-05-17.md`

Reviewed candidates: 50

Focus areas:
- COE / 更新 / 変更 / 永住 fee and procedure basics;
- 永住 tax / pension / guarantee related materials;
- resident tax / insurance / pension;
- employment and student-family basics;
- civil notification / resident-card basics;
- online application / paper form basics.

## 3. Review Method

Three review lanes ran before implementation:

1. FACT source verification
   - checked official source URL fit and source/claim alignment;
   - identified source mismatches, dead sources, stale counts, and weak sources.

2. DOMAIN boundary review
   - classified cards into product buckets;
   - distinguished safe official facts from practice-sensitive advice;
   - blocked cards that mixed incorporation facts, immigration strategy, or stale government data.

3. AQL/QA regression design
   - supplied answer regression and materials regression acceptance criteria;
   - set product scoring focus: correct direction, safety, actionability, material bridge, readability.

## 4. Bucket Result

| Bucket | Count | Notes |
|---|---:|---|
| ANSWER_RUNTIME promoted | 13 | FACT source verified or fixed + DOMAIN safe-to-promote |
| MATERIALS_ONLY binding | 2 | Added to existing material entities without promoting to answer runtime |
| L5_ONLY | 2 | Identified but not newly wired in this loop because L5 registry already covers adjacent families |
| REJECT / disabled | 2 | Wrong/stale enough that keeping as quarantine was unsafe |
| NEEDS_REWRITE / UNKNOWN / held | 33 | Not promoted due source mismatch, dead URL, weak source, stale data, or practice sensitivity |

## 5. Promoted Runtime Cards

These moved from `ai_extracted` to `ai_verified` and gained `injection_format` blocks:

| fact_id | Why promoted |
|---|---|
| `coe-validity-3months` | COE validity source corrected from update page to COE page; official fact safe |
| `coe-email-receipt-2023` | Official email receipt / COE handling fact safe |
| `henkou-shinsei-fee-6000` | Source corrected to status-change page; fee fact safe |
| `koushin-shinsei-fee-6000` | Source corrected to renewal page; fee / timing fact safe |
| `eijuu-application-fee-10000` | Official fee fact safe |
| `eijuu-guideline-10years` | Official guideline baseline; answer must not reduce PR to years-only |
| `koyo-hoken-31days-20hours` | Employment insurance eligibility fact safe |
| `koyo-hoken-kihon-teate-12months` | Basic benefit contribution-period fact safe |
| `kazoku-taizai-target-status` | Dependent-status target-status fact safe |
| `tanki-taizai-overview` | Short-stay overview fact safe after DOMAIN boundary |
| `zairyu-card-reissue-14days` | Residence-card reissue deadline fact safe |
| `zairyu-card-validity-renewal` | Residence-card validity renewal fact safe |
| `shozoku-online-system-todokede` | Online notification route fact safe |

## 6. Materials Binding

Materials entity updates:

- `kenpo-shikaku-kakunin`
  - added `kokuho-shutoku-shoumei-2years` as a material reference.
- `zairyu-card-passport`
  - added `zairyu-card-reissue-14days`;
  - corrected an over-specific / likely wrong fee sentence into a procedure-specific confirmation sentence.

No new material entity was added in this loop. This was a runtime expansion loop, not a Materials Universe expansion loop.

## 7. Rejected / Disabled Cards

| fact_id | Action | Reason |
|---|---|---|
| `houjin-touki-overview` | disabled | source/claim mismatch; mixed company-form facts with immigration strategy |
| `visa-menjo-69-country` | disabled | stale visa-waiver country count; must be re-fetched from current MOFA source |

## 8. Important Holds

Several DOMAIN-positive cards were intentionally not promoted because FACT found weak or mismatched sources:

- `eijuu-renew-not-required`
- `jumin-zei-jan1-criterion`
- `maina-hoken-2024-12`
- `koyou-keiyaku-rouken-tsuchi`
- `kakutei-shinkoku-deadline-march15`
- `aoiro-shinkoku-65`
- `iryouhi-kojo-200000`
- `ryugaku-naitei-tokutei-katsudou`
- `ryugaku-kishu-katsudo-tokkatsu`
- `zairyu-card-carry-obligation`
- `shussei-todoke-14days`

This is the main quality lesson from Loop 1: DOMAIN plausibility is not enough; promotion requires source fit.

## 9. Production Verification

Fact sync:

```text
npm run fact-layer:sync
fact-layer-sync: scanned=269 upserted=269 errors=0
```

Card audit after sync:

```text
filesystem total=269
database total=269
ai_verified=101
human_reviewed=5
ai_extracted=160
disabled=3
missingInDb=[]
extraInDb=[]
materials missing=[]
```

Runtime-eligible count after Loop 1:

```text
ai_verified + human_reviewed = 106
```

Production deploys verified:

```text
e4f2b64 feat(knowledge): loop1 runtime promotions
ddef088 fix(route): catch PR nonpermission reapply after departure
```

## 10. Answer Regression

20-question production answer regression ran concurrently against production.

Initial result after PR #152:

```text
19/20 pass
```

The only miss was `R14`:

```text
上次永住申请不许可了，可以出国再回来重新申请吗？
```

Substance was safe, but the answer did not consistently route the user to professional confirmation. Root cause: route gate recognized "再申请" but not real-user phrasing like "出国再回来重新申请".

Fix in PR #153:

- expanded `nonpermission-no-ordinary-appeal-no-grace` trigger terms;
- added regression test `matches PR nonpermission leave-and-reapply trap`;
- production retest confirmed professional handoff appears and no dangerous shortcut appears.

Retest:

```text
R14 http=200 terminal=completed
has professional handoff=true
has dangerous reject=false
```

P0 found: 0

## 11. Materials Path Regression

Checked production material / quick-reference paths:

```text
/materials                                           200
/materials/kenpo-shikaku-kakunin                    200
/materials/zairyu-card-passport                      200
/materials/shashin-shinseisho                        200
/materials/nenkin-kiroku                             200
/materials/mimoto-hoshou-sho                         200
/materials/kokuzei-nouzei-sono3                      200
/quick-reference                                     200
/quick-reference/card-loss-reissue-materials         200
/quick-reference/permanent-resident-card-renewal     200
/quick-reference/national-tax-certificate-sono3-materials 200
/quick-reference/pension-social-insurance-proof-materials 200
```

## 12. QA / §5.3 Audit

Pre-report audit passed:

```text
git_status_clean      PASS
npm_lint              PASS
tsc_noemit            PASS
npm_test              PASS (257/257)
production_url_smoke  PASS (70/70 checked)
OVERALL: PASS (5/5)
```

Additional verification:

```text
npm run fact-layer:sync:dry  -> scanned=269 errors=0
npm run qa:card-import-audit -> DB and filesystem aligned
```

## 13. Product Scores After Loop 1

These are internal operating estimates, not Founder/user acceptance scores.

| Dimension | Before Loop 1 | After Loop 1 | Reason |
|---|---:|---:|---|
| Card quality of newly promoted cards | — | 90+ | promoted only FACT+DOMAIN-safe subset |
| Answer product score | 78-82 | 80-83 | runtime coverage increased; R14 route gap fixed |
| Materials Tab score | 75-80 | 77-82 | small binding and fee correction, but no new material universe batch |
| Overall knowledge runtime maturity | 55-62 | 60-65 | runtime assets grew from 93-ish to 106; quarantine still large |

The 85+ answer/material goal is not reached yet. It becomes realistic only after several more loops, especially Materials Universe and L5-focused loops.

## 14. Next Loop Direction

Loop 2 should continue the existing 160 `ai_extracted` pool, but with a different focus:

1. source-repair batch for cards held due FACT mismatch;
2. materials-heavy promote/binding batch for resident tax, national insurance, pension, employment contracts, civil proof documents;
3. keep runtime promotions conservative;
4. build toward 130-150 runtime-eligible assets and visibly richer material pages.

Do not treat all 50 candidates as equal. The Loop 1 rule is now fixed:

```text
DOMAIN can say "promotable", but FACT source mismatch still blocks runtime.
```

## 15. Final Loop 1 Verdict

Loop 1 completed successfully with no P0:

- 50 cards reviewed;
- 13 promoted to answer runtime;
- 2 materials bindings improved;
- 2 rejected/disabled;
- production DB synced;
- production answer regression and materials path regression run;
- route gap found and fixed;
- §5.3 audit passed.

Proceed to Loop 2.
