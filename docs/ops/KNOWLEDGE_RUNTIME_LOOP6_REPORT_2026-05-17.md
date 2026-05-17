# Knowledge Runtime Expansion — Loop 6 Source Repair / Materials Binding Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop6-source-repair`

## Scope

Loop 6 processed 40 remaining `ai_extracted` candidates. The batch focused on:

- low/medium-risk life-procedure cards that can safely become answer runtime facts;
- source-repair for cards whose official URLs had moved;
- material-universe bindings for cards that are useful in Materials but too contextual for answer injection;
- conservative rejection of practice-law, market-practice, and source-mismatch cards.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 13 | Promoted to `ai_verified` with narrow `injection_certain_block` |
| `MATERIALS_ONLY` | 14 | Bound to materials/topics, kept out of runtime injection |
| `L5_ONLY` | 3 | Kept out of runtime; only useful as professional-boundary signal |
| `NEEDS_REWRITE` | 9 | Source dead/moved, source mismatch, or practice inference too broad |
| `UNKNOWN` | 1 | Official source not accessible enough to classify safely |
| `REJECT` | 0 | No permanent reject in this loop |

## Promoted Cards

| fact_id | Product use | Notes |
|---|---|---|
| `eijuu-haigusha-zairyu-1year` | Answer runtime + PR materials | Spouse-route PR guideline, no permission guarantee |
| `eijuu-renew-not-required` | Answer runtime + PR card materials | Separates permanent status from residence-card validity |
| `online-zairyu-card-uketori` | Answer runtime + residence-card materials | Online application card receipt basics |
| `sangyou-gakuei-naniwakai-tetsuzuki` | Answer runtime + childcare materials | Postnatal paternity leave overview |
| `tokutei-ginou-shien-keikaku` | Answer runtime + employment topics | SSW1 support-plan obligation, no sufficiency judgment |
| `unten-menkyo-gaijin-1year` | Answer runtime + driving materials | International license / foreign-license conversion overview |
| `zaihu-card-3rd-online` | Answer runtime + residence-card materials | Online filings do not receive back-side in-process notation |
| `kibyou-teate-3day-byouki` | Answer runtime + health-insurance materials | Source repaired to current協会けんぽ page |
| `shussan-ichijikin-50man` | Answer runtime + childbirth materials | Source repaired to current MHLW childbirth page |
| `shussan-teate-3day-deno` | Answer runtime + childbirth/leave materials | Source repaired to current協会けんぽ maternity allowance page |
| `tokutei-katsudou-46-target` | Answer runtime + job-change/student topics | Source repaired to current ISA designated-activities page |
| `zairyu-card-online-failure-information` | Answer runtime + residence-card/rental materials | Source repaired to ISA RCC support page |
| `zairyu-tokubetsu-eijuusha` | Answer runtime + resident-record/residence-card topics | Source repaired to special permanent resident certificate page |

## Materials-Only / Held Runtime

These cards were useful for Materials, but kept out of answer runtime because the source was broad, market-practice-based, or the advice would vary by institution:

- `chintai-hoshou-gaikokujin`
- `eijuu-after-kika-card`
- `eijuu-junior-15-eligibility`
- `foreigner-employment-info-portal`
- `gaimen-kirikae-process`
- `ikusei-shuroh-overview`
- `jfind-tokutei-katsudou`
- `jutaku-shikikin-rekkin-shuukan`
- `kobun-jutaku-jutsu-kushu`
- `koukou-mukyo-shogakukin`
- `kakkoukin-mortgage-foreigner`
- `kazoku-yobi-naitei-haigusha`
- `tokutei-katsudou-17go`
- `zairyu-kikan-5years-default`

## L5-Only / Professional Boundary

These should not become normal answer facts without professional review:

- `gaiko-souzoku-kokusai` — international inheritance / governing law
- `tax-treaty-source-of-truth` — treaty application requires country/income/timing analysis
- `yuigon-koseishousho-jutsu` — will validity and international inheritance effects

## Needs Rewrite / Unknown

| fact_id | Reason |
|---|---|
| `ginko-account-gaijin-6months` | Original FSA URL dead; “6 months” rule needs a current official source |
| `shakai-hoken-kyotei-bilateral` | Source points to ISA PR procedure, not JPS/MHLW social-security agreement source |
| `shougai-nenkin-overview` | Source mismatch; needs JPS/MHLW disability pension source |
| `shoukibo-jigyou-zei` | Original MIC source dead; needs live national/prefectural official source |
| `startup-visa-meti-fukuoka` | METI URL moved and current rules changed; needs refreshed wording |
| `tokutei-katsudo-survival` | “survival” framing is too broad; rewrite around指定書 scope |
| `yobi-yose-shinseki-houmon` | MOFA source returned 403 in verification; keep unknown |
| `yochi-en-hoiku-gaikoku` | Source points to child allowance, not early-childhood free education |
| `zairyu-shitsugyo-hosho-pension` | Needs Japan Pension Service unemployment exemption source and PR-risk separation |

## Materials Binding

Loop 6 updated:

- `lib/materials/material-entities.ts`
  - added health-insurance/childbirth facts to `kenpo-shikaku-kakunin`;
  - added pension/unemployment facts to `nenkin-kiroku`;
  - added residence-card/online/特別永住 facts to `zairyu-card-passport`;
  - added family/PR/civil-status facts to `koseki-tohon-konin-shusshou`;
  - added employment, rental, bank, and visa-preparation facts to `zaishoku-shomeisho` / `koyo-keiyaku-roudou-tsuuchi`.
- `lib/quick-reference/topics.ts`
  - added Loop6 facts to 23 scenario topics, including PR materials, PR card renewal, job change, foreign employment notification, driving-license conversion, rental housing, bank account opening, childbirth allowances, childcare leave, pension/social-insurance proof, company incorporation, tax certificates, minor school enrollment, and special-permanent-resident resident-record topics.

After this loop, Materials references increased to 167 with no missing fact-card references.

## Verification

Completed before commit:

- `npm run fact-layer:sync:dry` — PASS, scanned 269, errors 0
- `npm test` — PASS, 257/257
- `npm run lint && npx tsc --noEmit --pretty false` — PASS
- `npm run qa:card-import-audit` — PASS

Current filesystem waterline before production DB sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 174 |
| `human_reviewed` | 5 |
| runtime eligible | 179 |
| `ai_extracted` quarantine | 87 |
| disabled | 3 |
| material references | 167 |

Production DB still reflects the previous Loop5 waterline until targeted sync runs after merge.

## Next Loop Candidates

Loop 7 should prioritize source repair for:

- `ginko-account-gaijin-6months`
- `shakai-hoken-kyotei-bilateral`
- `shougai-nenkin-overview`
- `shoukibo-jigyou-zei`
- `startup-visa-meti-fukuoka`
- `yochi-en-hoiku-gaikoku`
- `zairyu-shitsugyo-hosho-pension`

High-risk immigration-practice cards remain intentionally quarantined until a DOMAIN-specific loop.
