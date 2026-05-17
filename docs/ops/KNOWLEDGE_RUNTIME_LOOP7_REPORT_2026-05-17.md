# Knowledge Runtime Expansion — Loop 7 Domain-Safe Runtime / Materials Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop7-domain-safe-promotions`

## Scope

Loop 7 processed 40 remaining `ai_extracted` candidates. The batch focused on:

- hard official制度 facts that both FACT and DOMAIN considered safe for answer runtime;
- source repair for moved/dead official URLs;
- Materials Universe bindings for life-procedure and materials-heavy cards;
- conservative quarantine of cards where source support, professional boundary, or wording was not yet safe enough.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 12 | Promoted to `ai_verified` with narrow `injection_certain_block` |
| `MATERIALS_ONLY` | 14 | Useful for Materials / quick-reference, kept out of answer runtime |
| `L5_ONLY` | 1 | Deep-water signal only, not ordinary answer fact |
| `NEEDS_REWRITE` | 13 | Source mismatch, professional-boundary risk, or wording too broad |
| `UNKNOWN` | 0 | No unresolved unknown after this loop |
| `REJECT` | 0 | No permanent reject in this loop |

## Promoted Cards

| fact_id | Product use | Safety note |
|---|---|---|
| `foreigner-employment-info-portal` | Answer runtime + employment topics | Public employment-support channel only; no job/visa success promise |
| `ikusei-shuroh-overview` | Answer runtime | Future制度 overview only; keeps “施行前/予定” framing |
| `jfind-tokutei-katsudou` | Answer runtime + job/student topics | Source repaired to ISA J-Find page; no eligibility guarantee |
| `startup-visa-meti-fukuoka` | Answer runtime + company topics | Source repaired to METI startup visa page; no経営管理 guarantee |
| `gijinkoku-cefr-b2-2026` | Answer runtime + 技人国 materials | Narrow Cat3/4 + language-use work scope; no percentage rule |
| `gijinkoku-shotoku-shokuin-naka` | Answer runtime + employment materials | “日本人同等以上報酬” only; no fixed salary threshold |
| `jukyochi-90days-torikeshi` | Answer runtime + address topics | Cancellation risk, not automatic cancellation |
| `tokurei-kikan-2months` | Answer runtime + reentry topics | Period-filed applications only; no protection without filing |
| `saiyuukoku-kyoka-1year-5year` | Answer runtime + reentry topics | Source repaired to ISA re-entry permission page |
| `shitsugyou-gijinkoku-3months` | Answer runtime + retirement/job topics | Activity-gap risk with正当理由 caveat |
| `tokutei-1go-5year-limit` | Answer runtime + SSW topics | 1号通算上限 only; no automatic 2号 route |
| `tokutei-ginou-tenshoku` | Answer runtime + job-change topics | Permission-first framing; no notification-only transfer |

## Materials-Only / Held Runtime

These cards were bound to material entities or quick-reference topics, but stayed out of answer runtime because they require institution-specific, local-government, or professional review:

- `chintai-hoshou-gaikokujin`
- `gaimen-kirikae-process`
- `ginko-account-gaijin-6months`
- `jutaku-shikikin-rekkin-shuukan`
- `kaigo-hoken-day1-after-40`
- `kakkoukin-mortgage-foreigner`
- `kika-documents-list`
- `kobun-jutaku-jutsu-kushu`
- `koukou-mukyo-shogakukin`
- `shougai-nenkin-overview`
- `shoukibo-jigyou-zei`
- `yobi-yose-shinseki-houmon`
- `yochi-en-hoiku-gaikoku`
- `zairyu-shitsugyo-hosho-pension`

## L5-Only

- `tokutei-katsudo-survival` — “特定活動 as survival route” is too broad for ordinary answers; it should only help detect non-standard status-route deep water.

## Needs Rewrite / Quarantine

| fact_id | Reason |
|---|---|
| `eijuu-after-kika-card` | Source repaired for residence-card return, but card still bundles nationality/civil registry steps |
| `eijuu-junior-15-eligibility` | “Minor/parent simultaneous PR” is an eligibility inference, not a simple material fact |
| `kazoku-yobi-naitei-haigusha` | Family-stay COE timing is practice strategy |
| `shakai-hoken-kyotei-bilateral` | Source repaired to JPS, but country count and lump-sum interaction need rewrite |
| `tax-treaty-source-of-truth` | Needs country/income-type split; not safe as a generic answer card |
| `tokutei-katsudou-17go` | Source repaired, but “17号” label and target path need rewrite |
| `zairyu-kikan-5years-default` | Official period options are safe, but “initial 1-year/default” framing is practice inference |
| `gijinkoku-major-job-match` | Core issue but needs more precise guideline/source split |
| `gijinkoku-shihon-jugyou-strict` | Direction correct, but field/manual-work boundary can over-block |
| `fuhou-shurou-employer` | Needs updated employer-liability source and penalty wording |
| `shikakugai-30jikan-rural` | Card id/title conflicts with 28-hour rule; unsafe until renamed/reworked |
| `tokutei-ginou-1-vs-2` | Basic distinction useful, but field count/detail appears stale |
| `yuigon-koseishousho-jutsu` | Not promoted; inheritance/will effect belongs outside ordinary immigration answers |

## Source Repairs

Loop 7 repaired moved/dead URLs for:

- `jfind-tokutei-katsudou`
- `startup-visa-meti-fukuoka`
- `saiyuukoku-kyoka-1year-5year`
- `gaimen-kirikae-process`
- `ginko-account-gaijin-6months`
- `shakai-hoken-kyotei-bilateral`
- `shougai-nenkin-overview`
- `shoukibo-jigyou-zei`
- `tax-treaty-source-of-truth`
- `tokutei-katsudo-survival`
- `tokutei-katsudou-17go`
- `yobi-yose-shinseki-houmon`
- `yochi-en-hoiku-gaikoku`
- `eijuu-after-kika-card`

## Materials Binding

Loop 7 updated:

- `lib/materials/material-entities.ts`
  - added bank/rental/driving/childcare/pension/tax/job-change support references;
  - intentionally removed unsafe `NEEDS_REWRITE` candidates from new bindings after FACT/DOMAIN intersection.
- `lib/quick-reference/topics.ts`
  - connected Loop7 facts to address-change, deemed reentry, job-change, retirement, health insurance, pension, tax, 技人国 renewal, PR, school, driving, housing, bank, childcare, and company topics.

After conservative pruning, Materials references increased from 167 to 177 with no missing fact-card references.

## Verification

Completed before commit:

- `npm run fact-layer:sync:dry` — PASS, scanned 269, errors 0
- `npm run lint && npx tsc --noEmit --pretty false` — PASS
- `npm test` — PASS, 257/257
- `npm run qa:card-import-audit` — PASS

Current filesystem waterline before production DB sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 186 |
| `human_reviewed` | 5 |
| runtime eligible | 191 |
| `ai_extracted` quarantine | 75 |
| disabled | 3 |
| material references | 177 |

Production DB still reflects the previous Loop6 waterline until targeted sync runs after merge.

## Next Loop Candidates

Loop 8 should focus on rewrite-heavy cards rather than direct promotion:

- `shikakugai-30jikan-rural` → rename/rewrite to 28-hour rule or merge into existing資格外活動 card
- `fuhou-shurou-employer` → refresh employer penalty source
- `tokutei-ginou-1-vs-2` → update fields and family-accompaniment wording
- `gijinkoku-major-job-match` / `gijinkoku-shihon-jugyou-strict` → split safe runtime fact vs L5 boundary
- `shakai-hoken-kyotei-bilateral` / `tax-treaty-source-of-truth` → split country-specific treaty/social-security claims

