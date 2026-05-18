# Knowledge Runtime Expansion — Loop12 Report

Date: 2026-05-18
Branch: `codex/knowledge-runtime-loop12-clean-promote`
Scope: 43 official-source `ai_extracted` cards reviewed by FACT/DOMAIN subagent + materials/AQL subagent.

## Goal Fit

Loop12 continues the long-running Knowledge Runtime Expansion Goal:

- Process 30-50 knowledge assets per loop.
- Do not promote cards merely to increase count.
- Split assets into `ANSWER_RUNTIME`, `MATERIALS_ONLY`, `L5_ONLY`, `NEEDS_REWRITE`, `REJECT`, or `UNKNOWN`.
- Increase answer accuracy and materials thickness without making TEBIQ pretend it can replace行政書士 judgment.

## Subagent Inputs

Two read-only subagents were used.

| Subagent | Role | Output used |
|---|---|---|
| FACT/DOMAIN review | Reviewed all 43 official-source `ai_extracted` cards and recommended buckets. | Safe promote list: short-stay family invitation, residence-period candidates, naturalization documents, unemployment pension exemption, pension追納, rental / housing / bank account low-risk cards. High-risk immigration strategy cards were kept out of normal runtime. |
| Materials/AQL/QA review | Mapped material and quick-reference gaps. | Added six material entities and tightened three high-frequency materials topics: qualification-outside activity,離職/雇用保険,マイナンバー, bank account, rental application, permanent return checkout. |

## Card Actions

### Promoted To Narrow `ANSWER_RUNTIME`

These cards moved from `ai_extracted` to `ai_verified`, but only after narrowing their claims and adding `injection_certain_block` text.

| fact_id | Risk | Why safe enough now | Runtime boundary |
|---|---:|---|---|
| `zairyu-kikan-5years-default` | low | Removed all practice guesses about initial 1-year, stable 3/5-year progression, and 3-month warnings. | Only says official pages list period candidates and actual period is individually decided. |
| `yobi-yose-shinseki-houmon` | low | Removed visa-exempt-country inference. | Only lists short-stay family invitation document categories; no visa issuance guarantee. |
| `kika-documents-list` | medium | Reframed as a document list. | No naturalization eligibility or approval judgment. |
| `zairyu-shitsugyo-hosho-pension` | medium | Reframed as public pension exemption /猶予 procedure. | Immigration / permanent-residence evaluation explicitly withheld. |
| `nenkin-tsuinou-10years` | high | Removed "永住対策" framing and kept the exact pension追納 rule. | Does not say追納 erases permanent-residence risk. |
| `chintai-hoshou-gaikokujin` | low | Rewritten as rental-screening document variability. | No tenant acceptance judgment. |
| `jutaku-shikikin-rekkin-shuukan` | low | Rewritten as rental initial-cost checklist. | No nationwide fee/month standard. |
| `kobun-jutaku-jutsu-kushu` | low | Rewritten as public-housing support overview. | No individual eligibility judgment. |
| `ginko-account-gaijin-6months` | medium | Removed absolute 6-month rule framing. | Says banks differ by institution/account type; no "always possible/impossible". |

### Rejected / Disabled

| fact_id | Action | Reason |
|---|---|---|
| `kakkoukin-mortgage-foreigner` | `ai_extracted` → `disabled` | Mortgage approval conditions had source gaps and were too easy to generalize. It must be rebuilt from official / financial-institution sources before any user path uses it. |

### Reviewed But Not Promoted

The remaining official `ai_extracted` cards were intentionally not promoted. Buckets:

| Bucket | Examples | Reason |
|---|---|---|
| `L5_ONLY` | `eijuusha-haigusha-divorce`, `nihonjin-haigusha-divorce-teijusha`, `nyukoku-kyohi-jiyu`, `overstay-self-report-route`, `zairyu-tokubetsu-kyoka`, `keiei-kanri-capital-asset-3000man-criterion` | Useful as deep-water signals, but too dangerous for ordinary answer runtime. |
| `NEEDS_REWRITE` | `keiei-kanri-2025-4-requirements`, `ryugaku-shusseki-ritsu-80`, `tax-treaty-source-of-truth`, `tokutei-katsudo-survival`, `startup-visa-keiei-transition` | Contains old framing, source gaps, or likely over-specific practice thresholds. |
| `MATERIALS_ONLY` / deferred | `eijuu-jukyo-check-tax-shomeisho`, `shakai-hoken-kyotei-bilateral`, `koukou-mukyo-shogakukin` | Useful for material pages after source/date cleanup, but not yet reliable enough for answer injection. |

## Materials Universe Actions

Added six reusable material entities:

| material_id | Product role |
|---|---|
| `shikakugai-katsudo-permit` | Gives留学/家族滞在打工 topics a real material anchor instead of only a scene page. |
| `rishokuhyo-koyo-hoken-docs` | Connects退職,失業給付,国保,国民年金 paths through the documents users actually need. |
| `mynumber-card` | Separatesマイナンバーカード as a reusable material from住民票. |
| `bank-account-opening-docs` | Gives bank-account opening a reusable document bundle and removes absolute 6-month framing. |
| `rental-application-docs` | Turns rental screening into a document checklist instead of broad claims about foreigners. |
| `return-home-checkout-docs` | Turns permanent return into a multi-window checkout bundle:転出,税,年金,在留カード. |

Also tightened quick-reference copy:

- `national-pension-after-leaving-materials`: linked `nenkin-tsuinou-10years`, added caution that permanent-residence evaluation is separate.
- `mynumber-card-materials`: linked application and health-insurance card facts.
- `rental-housing-foreigner-materials`: softened overbroad "foreign discrimination / strict screening" wording into document variability.
- `bank-account-opening-materials`: removed absolute "6 months" requirement wording and replaced it with institution/account-type variability.
- `unemployment-benefit-materials`: linked the 12-month employment-insurance fact.

## Current Local Knowledge Counts

After Loop12 local edits:

| State | Count |
|---|---:|
| `ai_verified` | 217 |
| `human_reviewed` | 5 |
| `ai_extracted` | 42 |
| `disabled` | 5 |
| Total | 269 |

This count is local repo state after multiple loops. Production DB still needs sync after merge.

## Verification

Local checks:

| Check | Result |
|---|---|
| `npm run fact-layer:sync:dry` | PASS — scanned=269, errors=0 |
| `npm test -- --runInBand` | PASS — 257/257 |
| `npx tsc --noEmit --pretty false` | PASS |
| `npm run lint` | PASS |

## Product Impact

Answer runtime gets safer coverage for:

- Residence period questions.
- Short-stay family invitation document questions.
- Naturalization document list questions.
- Pension exemption /猶予 during unemployment.
- Pension追納, with permanent-residence risk withheld.
- Rental, public housing, and bank-account opening life-procedure questions.

Materials Tab gets visibly thicker through six new reusable materials. These should improve "a user opens TEBIQ repeatedly while preparing documents" behavior without needing the answer model to decide legal outcomes.

## Remaining Risks

No P0 found in this loop. Remaining known risks:

- `nenkin-tsuinou-10years` is safe only as a pension procedure fact. It must not be used to say追納 fixes永住 risk.
- `ginko-account-gaijin-6months` still depends on institution-level policy. It must not produce a universal bank-opening rule.
- `L5_ONLY` cards need a dedicated signal-binding loop; they should not be promoted as ordinary runtime.
- `NEEDS_REWRITE` cards need separate rewrite loops, especially经营管理 2025,留学出席率,租税条約, and startup →经营管理 transition.

## Next Loop Recommendation

Loop13 should focus on L5_ONLY binding, not more ordinary runtime promotion:

1. Convert the safest 8-12 `L5_ONLY` cards into explicit L5 signals or deep-water route support.
2. Keep normal answer runtime stable.
3. Run answer smoke around spouse divorce, overstay, refusal,経営管理, andみなし再入国.

Loop14 should focus on `NEEDS_REWRITE` high-value cards:

1.经营管理 2025 / existing-holder transition.
2.留学出席率 without numeric myth.
3.租税条約 as official query-entry card.
4.特定活動 survival route renamed and split.
