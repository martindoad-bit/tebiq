# Knowledge Runtime Expansion — Loop 5 Runtime/Materials Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop5-general`

## Scope

Loop 5 processed 42 quarantine candidates from the existing fact-card pool. The goal was to keep moving toward the 400+ knowledge-asset target while avoiding high-risk practice-law judgment.

This loop focused on low/medium-risk official facts across:

- tax and public procedures;
- health insurance, pension, welfare, and child-related benefits;
- study / work-adjacent official procedures;
- reusable Materials Tab support facts.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 35 | Promoted from `ai_extracted` to `ai_verified` with `injection_certain_block` |
| `MATERIALS_ONLY` | 0 | No card was limited to materials-only in this loop |
| `L5_ONLY` | 0 | No deep-water/practice-signal-only card was promoted |
| `NEEDS_REWRITE` | 5 | Source dead or official URL moved; keep quarantined |
| `UNKNOWN` | 2 | Source mismatch or inferred field risk; keep quarantined |
| `REJECT` | 0 | No permanent reject in this loop |

## Promoted Cards

| fact_id | Product use |
|---|---|
| `gaikokujin-soudan-center` | Answer runtime |
| `hometown-tax-furusato` | Answer runtime |
| `ikuji-kyugyo-shotoku-67` | Answer runtime |
| `iryouhi-kojo-200000` | Answer runtime |
| `jidou-teate-overview` | Answer runtime |
| `jukyochi-mynumber-renke-juminhyo` | Answer runtime + material support |
| `jumin-zei-no-shukyou-3types` | Answer runtime + Materials tax support |
| `jutaku-loan-kojyo-overview` | Answer runtime |
| `kaigo-hoken-40-65` | Answer runtime |
| `kogaku-iryo-foreigner-resident` | Answer runtime |
| `kogaku-ryoyo-hi-self-pay` | Answer runtime |
| `kyoiku-visa-overview` | Answer runtime |
| `mynumber-card-application` | Answer runtime |
| `yukyu-kyuka-rokei` | Answer runtime |
| `yuujin-hyo-tokutei-jukuyou` | Answer runtime + Materials住民票 support |
| `zairyu-hardship-payment` | Answer runtime |
| `zairyu-online-system` | Answer runtime |
| `zairyu-self-check-sheet` | Answer runtime |
| `zairyu-shinsei-form-paper-online` | Answer runtime + Materials申請書 support |
| `aoiro-shinkoku-65` | Answer runtime |
| `dattai-ichijikin-2years` | Answer runtime + Materials年金 support |
| `eijuu-letterofunderstanding-2021` | Answer runtime + Materials理由書/了解書 support |
| `eijuu-vs-kika-key-diff` | Answer runtime |
| `hoshou-jin-eijuu` | Answer runtime + Materials身元保証書 support |
| `kazoku-yobi-yose-shorui` | Answer runtime |
| `ryugaku-naitei-tokutei-katsudou` | Answer runtime + 留学 scenario support |
| `ryugaku-shikakugai-individual-permission` | Answer runtime + 打工/留学 scenario support |
| `saiteichingin-2026` | Answer runtime |
| `shuro-shoumeisho-fee-2000` | Answer runtime + 就労資格証明書 materials support |
| `zeimu-shomeisho-3types` | Answer runtime + 国税その3 materials support |
| `zairyu-kekkan-renew-document` | Answer runtime + 更新 materials support |
| `zaiyu-card-validity-by-status` | Answer runtime + 在留カード materials support |
| `ryugaku-kishu-katsudo-tokkatsu` | Answer runtime + 留学 scenario support |
| `shouhi-zei-1000man-jigyousha` | Answer runtime |
| `hi-kyojusha-tax-20-42` | Answer runtime |

## Held Back

| fact_id | Bucket | Reason |
|---|---|---|
| `kibyou-teate-3day-byouki` | `NEEDS_REWRITE` | Official source URL returns 404; card overlaps an existing verified `kenpo-kizubyou-teate` card |
| `shussan-ichijikin-50man` | `NEEDS_REWRITE` | Official MHLW source URL returns 404 |
| `shussan-teate-3day-deno` | `NEEDS_REWRITE` | Official source URL returns 404; likely should be rewritten against current 協会けんぽ/Japan Health Insurance source |
| `yobi-yose-shinseki-houmon` | `NEEDS_REWRITE` | MOFA URL did not pass stable source check in this environment |
| `zairyu-tokubetsu-eijuusha` | `NEEDS_REWRITE` | Official ISA source URL returns 404 |
| `zairyu-card-online-failure-information` | `UNKNOWN` | Card title claims invalid-card lookup, but current source URL points to special-period page; source mismatch suspected |
| `zairyu-kikan-5years-default` | `UNKNOWN` | Current fact contains “initial one-year is common” practice inference; keep out of runtime until rewritten as narrow official period options |

## FACT Verification

All promoted cards have at least one official source that returned HTTP 200 during Loop 5 source checks.

Notes:

- `moj.go.jp` often requires a browser-like User-Agent; bare curl produced false 403, while `Mozilla/5.0` source checks returned 200.
- Cards with 404 sources were not promoted.
- Cards with source/content mismatch were not promoted.

## DOMAIN Boundary

Promoted cards were restricted to direct official facts and low/medium-risk procedural explanations. The `injection_certain_block` was generated only from:

- `current_effective_fact`;
- `must_say`;
- first official source URL.

`ai_inferred_fields` and `needs_review_flags` were deliberately not injected into runtime.

## Materials Binding

Loop 5 also updated Materials/Quick Reference bindings:

- Resident tax material entities now reference `jumin-zei-no-shukyou-3types`.
- National tax material entity references `zeimu-shomeisho-3types`.
- Pension record material entity references `dattai-ichijikin-2years`.
- Residence-card material entity references `zaiyu-card-validity-by-status`.
- Quick-reference topics for tax, PR materials, student renewal, part-time permission, and work qualification certificate now include the new supporting facts.

## Verification

Completed locally before commit:

- `npm run fact-layer:sync:dry` — PASS, scanned 269, errors 0
- `npm test` — PASS, 257/257

Pending after commit/merge:

- `npm run lint`
- `npx tsc --noEmit --pretty false`
- `npm run qa:card-import-audit`
- targeted production DB sync for the 35 promoted cards
- answer/material production regression
- `npm run qa:pre-report-audit`

## Current Waterline After Filesystem Change

Expected filesystem state after Loop 5:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 161 |
| `human_reviewed` | 5 |
| runtime eligible | 166 |
| `ai_extracted` quarantine | 100 |
| disabled | 3 |

Production DB targeted sync completed after PR merge:

- targeted sync: 35/35 upserted
- post-sync `npm run qa:card-import-audit`: filesystem and database both match at 269 total cards
- production runtime eligible: 166 (`ai_verified` 161 + `human_reviewed` 5)

## Post-Deploy Notes

Production deployment reached SHA `3f5f993093468b17737889b3f8ca22316035c595`.

Materials path probes confirmed the new bindings render on production pages, including:

- `/quick-reference/national-tax-certificate-sono3-materials`
- `/quick-reference/student-renewal-materials`
- `/quick-reference/permanent-residence-application-materials`
- `/materials/kokuzei-nouzei-sono3`
- `/materials/juminzei-kazei-shomei`
- `/materials/mimoto-hoshou-sho`

Production answer smoke initially reported 16/20, but two redline failures were verified as regex false positives:

- R12 answer correctly said `不可以先入职再办理在留资格变更`;
- R13 answer correctly said `离婚后的14日内届出义务独立存在，再婚不能免除这项义务`.

The smoke regex was calibrated to avoid treating explicit negations as dangerous affirmative answers.

The second answer-smoke run passed R1-R14 after regex calibration, then hit a transient `fetch failed` on R15. The answer-smoke runner was hardened to retry transport-level fetch failures before marking the case failed. Dangerous answer content still fails normally.

The runner was also hardened with a per-question stream timeout (`SMOKE_STREAM_TIMEOUT_MS`, default 120s). This prevents a single stalled provider stream from hanging an entire knowledge-expansion loop.

Final post-hardening production answer smoke result:

- `npm run smoke:production-answer` — PASS, 20/20
- build-info: `3f5f993093468b17737889b3f8ca22316035c595`
- all 15 redline cases and 5 negative controls completed with terminal `completed`

Pre-report URL smoke also exposed that `/quick-reference` can legitimately take more than 15s under production edge latency. The URL-smoke timeout was raised to 30s by default while keeping retry behavior and hard-failing real 404/5xx responses.
