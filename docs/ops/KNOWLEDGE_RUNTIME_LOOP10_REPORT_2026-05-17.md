# Knowledge Runtime Expansion — Loop 10 Source Repair / Life Procedure Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop10-source-repair`

## Scope

Loop 10 processed 40 cards with two goals:

- promote low-risk official life/procedure cards that improve everyday answer coverage;
- repair stale or mismatched source URLs in cards that are already useful for Materials or L5, without promoting risky immigration strategy cards into ordinary answer runtime.

This loop deliberately rolled back one apparent runtime candidate. DOMAIN initially accepted `tokutei-katsudou-17go`, but FACT found the source page supports an “内定後、採用まで” route rather than “卒業後の単なる就職活動継続.” It therefore stays `ai_extracted`.

## Candidate Set

The 40-card batch:

`chintai-hoshou-gaikokujin`, `gaiko-souzoku-kokusai`, `gaimen-kirikae-process`, `ginko-account-gaijin-6months`, `jutaku-shikikin-rekkin-shuukan`, `kaigo-hoken-day1-after-40`, `kakkoukin-mortgage-foreigner`, `kika-documents-list`, `kobun-jutaku-jutsu-kushu`, `koukou-mukyo-shogakukin`, `shougai-nenkin-overview`, `shoukibo-jigyou-zei`, `tax-treaty-source-of-truth`, `tokutei-katsudo-survival`, `tokutei-katsudou-17go`, `yobi-yose-shinseki-houmon`, `yochi-en-hoiku-gaikoku`, `yuigon-koseishousho-jutsu`, `zairyu-kikan-5years-default`, `zairyu-shitsugyo-hosho-pension`, `nenkin-tsuinou-10years`, `eijuusha-haigusha-divorce`, `zairyu-pl-after-shibetsu`, `zairyu-irrelevent-jutsu`, `zairyu-tokubetsu-kyoka`, `overstay-self-report-route`, `nyukoku-kyohi-jiyu`, `shakai-hoken-kyotei-bilateral`, `minashi-sainyuukoku`, `sainyukoku-kyoka`, `zairyu-card-loss-overseas`, `zairyu-shikaku-torikeshi-jiyu-10`, `overstay-taisho`, `zaijuu-haigusha-6months`, `teijusha-koshikai-vs-koshigai`, `kazoku-taizai-henko`, `gijinkoku-major-job-match`, `gijinkoku-job-mismatch`, `keiei-kanri-jimu-bessho-requirement`, `startup-visa-keiei-transition`.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 5 | Promoted to `ai_verified` with narrow `injection_certain_block` |
| `MATERIALS_ONLY` | 5 | Kept out of answer runtime, but useful for document / material preparation |
| `L5_ONLY` | 15 | Practice-signal/deep-water cards only |
| `NEEDS_REWRITE` | 15 | Source, wording, route split, or professional-boundary risk remains |
| `REJECT` | 0 | No permanent reject in this batch |
| `UNKNOWN` | 0 | No unknown after FACT/DOMAIN review |

## Promoted Cards

| fact_id | Product use | Safety note |
|---|---|---|
| `gaimen-kirikae-process` | Answer runtime + 外免材料页 | Narrow official procedure: aptitude / knowledge / skill checks, exemptions vary by country and local police. |
| `kaigo-hoken-day1-after-40` | Answer runtime + pension/social-insurance material context | Rewritten away from exact payroll-rate claims; only says 40+ enters care-insurance system and 40-64 pay with medical insurance. |
| `shougai-nenkin-overview` | Answer runtime + pension material context | Narrow disability-pension overview; no decision on entitlement, grade, or amount. |
| `shoukibo-jigyou-zei` | Answer runtime + tax material context | Individual enterprise tax: 290万円 deduction, legal business categories, prefectural tax; business-category classification remains individual confirmation. |
| `yochi-en-hoiku-gaikoku` | Answer runtime + child/school material context | Nursery/kindergarten fee-waiver baseline; route-specific eligibility and foreign-household confirmation remain municipal checks. |

## Rollback / Held Candidate

`tokutei-katsudou-17go` was initially considered for runtime, but FACT review found its source does not support the card’s old “卒業後就活継続” framing. The card was rewritten as a source-repair draft and kept `ai_extracted`.

Key correction:

- old framing: “日本の大学等卒業後の就職活動継続”
- held framing: “企業から内定を受け、採用まで引き続き在留するための特定活動”

It should not be promoted until the route is split from ordinary post-graduation job-search special activity.

## Source Repairs

Loop 10 repaired source URLs and/or evidence wording while keeping the cards out of runtime where appropriate:

| fact_id | Repair |
|---|---|
| `zairyu-shitsugyo-hosho-pension` | Replaced wrong ISA PR source with 日本年金機構免除・猶予 source; removed “永住で免除も納付実績扱い” as an inferred claim. |
| `nenkin-tsuinou-10years` | Replaced wrong ISA PR source with 日本年金機構追納 source; removed PR-repair promise. |
| `eijuusha-haigusha-divorce` | Replaced wrong `00020` return-card URL with spouse notification URL `00016`. |
| `zairyu-pl-after-shibetsu` | Replaced wrong `00020` return-card URL with spouse notification URL `00016`. |
| `zairyu-irrelevent-jutsu` | Replaced old generic change URL with current ISA status-change procedure URL. |
| `zairyu-tokubetsu-kyoka` | Replaced generic procedure URL with ISA deportation / special-permission page. |
| `overstay-self-report-route` | Replaced generic procedure URL with ISA departure-order procedure page. |
| `nyukoku-kyohi-jiyu` | Replaced generic procedure URL with ISA landing-refusal page. |
| `kaigo-hoken-day1-after-40` | Switched to a more targeted MHLW source for 40-64 care-insurance framing. |
| `shoukibo-jigyou-zei` | Switched to the current Tokyo Metropolitan Tax individual enterprise tax page. |

## Held Materials-Only

- `kika-documents-list`
- `yobi-yose-shinseki-houmon`
- `zairyu-card-loss-overseas`
- `nenkin-tsuinou-10years`
- `zairyu-shitsugyo-hosho-pension`

These are useful for material preparation, but they should not inject into ordinary answers until route-specific wording is separated.

## L5-Only

- `eijuusha-haigusha-divorce`
- `zairyu-pl-after-shibetsu`
- `zairyu-irrelevent-jutsu`
- `zairyu-tokubetsu-kyoka`
- `overstay-self-report-route`
- `nyukoku-kyohi-jiyu`
- `minashi-sainyuukoku`
- `sainyukoku-kyoka`
- `zairyu-shikaku-torikeshi-jiyu-10`
- `overstay-taisho`
- `zaijuu-haigusha-6months`
- `teijusha-koshikai-vs-koshigai`
- `kazoku-taizai-henko`
- `gijinkoku-job-mismatch`
- `startup-visa-keiei-transition`

These are not ordinary factual answer cards. They should feed deep-water routing, L5 preparation prompts, or future route-specific rewrites.

## Needs Rewrite

| fact_id | Reason |
|---|---|
| `chintai-hoshou-gaikokujin` | Useful rental context, but “guarantee company required / cost percentage” is practice-generalization. |
| `gaiko-souzoku-kokusai` | International inheritance is over-simplified; needs source split and legal boundary. |
| `ginko-account-gaijin-6months` | Banking 6-month rule is AML/bank-practice dependent, not a simple universal law. |
| `jutaku-shikikin-rekkin-shuukan` | Rental initial costs vary by region/contract; should be rewritten as reference range. |
| `kakkoukin-mortgage-foreigner` | Mortgage requirements are financial-institution dependent; current source does not support the claim. |
| `kobun-jutaku-jutsu-kushu` | Public housing/UR/public corporation routes need institution-specific conditions. |
| `koukou-mukyo-shogakukin` | Source and income-threshold framing are time-sensitive; needs 2026 policy refresh. |
| `tax-treaty-source-of-truth` | Treaty application is country- and income-type-specific. |
| `tokutei-katsudo-survival` | Designated activity cannot be turned into a generic “survival route.” |
| `tokutei-katsudou-17go` | Source supports内定後採用まで, not generic job-search continuation. |
| `yuigon-koseishousho-jutsu` | Public-notary will source mismatch and international-inheritance scope risk. |
| `zairyu-kikan-5years-default` | “3 months as warning signal” is practice inference, not official fact. |
| `shakai-hoken-kyotei-bilateral` | Country count and bilateral agreement scope changed; needs 2025/2026 refresh. |
| `gijinkoku-major-job-match` | Education/work relatedness is real, but job-fit judgment remains practice-heavy. |
| `keiei-kanri-jimu-bessho-requirement` | Office requirement is useful, but virtual/shared/residence office handling needs updated source split. |

## Materials Binding

Loop 10 did not increase the material reference count overall. Many relevant Loop10 cards had already been bound in earlier Materials work, and `tokutei-katsudou-17go` was removed from the two tentative bindings after FACT review.

Current material reference count remains 198 with no missing fact-card references.

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
| `ai_verified` | 205 |
| `human_reviewed` | 5 |
| runtime eligible | 210 |
| `ai_extracted` quarantine | 56 |
| disabled | 3 |
| material references | 198 |

Current production DB waterline before this loop sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 200 |
| `human_reviewed` | 5 |
| runtime eligible | 205 |
| `ai_extracted` quarantine | 61 |
| disabled | 3 |

The DB is intentionally behind until this loop is merged and targeted sync runs.

## Post-Merge Checklist

After merge:

1. Target-sync the five promoted cards:
   - `gaimen-kirikae-process`
   - `kaigo-hoken-day1-after-40`
   - `shougai-nenkin-overview`
   - `shoukibo-jigyou-zei`
   - `yochi-en-hoiku-gaikoku`
2. Also target-sync source-repaired non-runtime cards if full sync is still unreliable:
   - `zairyu-shitsugyo-hosho-pension`
   - `nenkin-tsuinou-10years`
   - `eijuusha-haigusha-divorce`
   - `zairyu-pl-after-shibetsu`
   - `zairyu-irrelevent-jutsu`
   - `zairyu-tokubetsu-kyoka`
   - `overstay-self-report-route`
   - `nyukoku-kyohi-jiyu`
3. Run `npm run qa:card-import-audit` and confirm DB/file match.
4. Wait for production build-info to match the merge SHA.
5. Run `npm run smoke:production-answer`.
6. Probe routes:
   - `/quick-reference/driving-license-conversion-materials`
   - `/quick-reference/pension-social-insurance-proof-materials`
   - `/quick-reference/tax-certificate`
   - `/quick-reference/minor-school-enrollment-materials`
   - `/materials/nenkin-kiroku`
   - `/materials/kenpo-shikaku-kakunin`
   - `/materials/shashin-shinseisho`

## Loop 11 Direction

Loop 11 should continue from 56 remaining `ai_extracted` cards. Recommended order:

1. rewrite low/medium lifestyle cards where FACT already identified source mismatch (`chintai`, `ginko`, `jutaku`, `kakkoukin`, `kobun`, `koukou`, `yuigon`);
2. avoid runtime promotion for overstay, status cancellation, spouse divorce, 技人国 job-fit, and business-manager office cards until L5 route wording is built;
3. split `tokutei-katsudou-17go` from ordinary post-graduation job-search special activity before any future promotion.
