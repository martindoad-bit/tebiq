# Knowledge Runtime Expansion — Loop 8 Rewrite / Materials Report

Date: 2026-05-17
Branch: `codex/knowledge-runtime-loop8-rewrite-promotions`

## Scope

Loop 8 processed 40 rewrite-heavy and boundary-heavy candidates left after Loop 7. This batch intentionally avoided broad promotion. It focused on:

- rewriting narrow official facts that DOMAIN considered safe for answer runtime;
- separating answer-runtime claims from materials-only references and L5-only practice signals;
- fixing risky card wording where the internal fact id carried an unsafe old myth;
- increasing Materials Universe bindings without pretending those cards are all answer-runtime safe.

## Bucket Result

| Bucket | Count | Meaning |
|---|---:|---|
| `ANSWER_RUNTIME` | 12 | Promoted to `ai_verified` with narrow `injection_certain_block` |
| `MATERIALS_ONLY` | 16 | Bound into Materials / quick-reference surfaces, but not promoted for answer runtime in this loop |
| `L5_ONLY` | 10 | Useful as deep-water or practice-signal candidates, not ordinary answer facts |
| `NEEDS_REWRITE` | 12 | Source, scope, or professional-boundary risk remains |
| `UNKNOWN` | 0 | No unresolved unknown after DOMAIN bucket review |
| `REJECT` | 0 | No new permanent reject in this loop |

## Promoted Cards

| fact_id | Product use | Safety note |
|---|---|---|
| `eijuu-3000man-shisan-myth` | Answer runtime | Narrows PR independent-livelihood framing; no official fixed 3,000万円 asset threshold |
| `eijuu-after-kika-card` | Answer runtime + material binding | Residence-card return after naturalization only; other civil-record steps require separate confirmation |
| `eijuu-junior-15-eligibility` | Answer runtime | Child PR framing only; no approval prediction |
| `eijuu-takeoff-risk` | Answer runtime + reentry topics | PR status does not remove reentry/absence risk; no fixed “safe absence” threshold |
| `fuhou-shurou-employer` | Answer runtime | Employer-side illegal-work risk only; no criminal-law strategy |
| `gijinkoku-shihon-jugyou-strict` | Answer runtime + 技人国 topics | Manual/simple-labor boundary with individualized-role caveat |
| `kazoku-shanzaihon-imin` | Answer runtime | Family-stay ordinary scope is spouse/child; parent support is not ordinary family-stay route |
| `kika-6-conditions` | Answer runtime | Nationality Act naturalization baseline only; no permission guarantee |
| `kodo-senmon-70-points-eijuu-3years` | Answer runtime | HSP 70-point PR shortening as route condition, not PR guarantee |
| `kodo-senmon-shoku-1go-to-2go` | Answer runtime | HSP1/HSP2 distinction only; no automatic advancement |
| `rikon-todoke-procedure` | Answer runtime + spouse/divorce topics | Separates municipal divorce notification from ISA spouse notification |
| `shikakugai-30jikan-rural` | Answer runtime + student/part-time topics | Rewritten in place to 28-hour rule; explicitly rejects the old “地方30時間” myth |

Important naming note: `shikakugai-30jikan-rural` keeps the historical `fact_id` to avoid reference churn, but its title and runtime injection now describe the official 28-hour rule and warn against the unsupported 30-hour local exception claim.

## Materials-Only / Held Runtime

The following cards gained or kept Materials Universe / quick-reference references, but were not promoted to answer runtime in this loop:

- `eijuu-jukyo-check-tax-shomeisho`
- `eijuu-nenkin-risk`
- `eijuu-shinsei-shorui`
- `eijuu-zeikin-payment`
- `nenkin-tsuinou-10years`
- `nihonjin-haigusha-visa`
- `eijuu-haigusha-visa`
- `gijinkoku-job-mismatch`
- `gijinkoku-major-job-match`
- `kazoku-taizai-henko`
- `kazoku-taizai-shotoku-280`
- `kazoku-yobi-naitei-haigusha`
- `keiei-kanri-jimu-bessho-requirement`
- `ryugaku-shusseki-ritsu-80`
- `eijuu-after-kika-card`
- `rikon-todoke-procedure`

Some of these are still `ai_extracted`; material references are intentionally broader than answer-runtime injection and are guarded by page context. They must not be read as “all promoted to runtime.”

## L5-Only Candidates

These should inform deep-water routing or practice-signal work, not ordinary answer injection:

- `eijuu-payment-strict-2024`
- `eijuusha-haigusha-divorce`
- `keiei-kanri-2025-4-requirements`
- `keiei-kanri-capital-asset-3000man-criterion`
- `keiei-kanri-existing-3year-transition`
- `kihaku-shippai-saido-strategy`
- `nihonjin-haigusha-divorce-teijusha`
- `nyukoku-kyohi-jiyu`
- `overstay-self-report-route`
- `overstay-taisho`

## Needs Rewrite / Quarantine

| fact_id | Reason |
|---|---|
| `eijuu-bbq-criminal-record` | Criminal-history impact is fact-pattern sensitive; not safe as generic answer card |
| `eijuu-haigusha-visa` | Needs route-specific rewrite for spouse PR vs spouse status |
| `eijuu-jukyo-period-overseas` | Overseas-stay and residence-continuity analysis is too broad |
| `eijuu-shotoku-200man-myth` | Income myth card needs safer route-specific income/tax framing |
| `gijinkoku-job-mismatch` | Previously downgraded; role-fit analysis remains too easy to over-answer |
| `gijinkoku-major-job-match` | Needs official-source split between学歴/職務関連性 and practice judgment |
| `kazoku-taizai-henko` | Status-change strategy for family stay needs route-specific rewrite |
| `kazoku-taizai-shotoku-280` | Income-number myth needs source and route separation |
| `kazoku-yobi-naitei-haigusha` | COE/timing strategy remains practice-sensitive |
| `keiei-kanri-jimu-bessho-requirement` | Office requirement needs updated business-manager route split |
| `nihonjin-haigusha-visa` | Spouse route needs separate municipal/ISA/practice layers |
| `ryugaku-shusseki-ritsu-80` | Attendance-rate numeric threshold must not be presented as official hard line |

## Materials Binding

Loop 8 updated:

- `lib/materials/material-entities.ts`
  - increased material references for PR application, tax certificates, pension records, divorce/family registry documents, 技人国 employment materials, student part-time permission, and business-management office documents.
- `lib/quick-reference/topics.ts`
  - connected Loop8 facts to PR, deemed reentry, part-time permission, student, job-change, 技人国 renewal, family-stay renewal, Japanese-spouse renewal, and related material topics.

Materials references increased from 177 to 193 with no missing fact-card references.

## Verification Before Commit

Completed before commit:

- `npm run fact-layer:sync:dry` — PASS, scanned 269, errors 0
- `npm run qa:card-import-audit` — PASS
- `npm run lint` — PASS
- `npx tsc --noEmit --pretty false` — PASS
- `npm test` — PASS, 257/257

Current filesystem waterline before production DB sync:

| Metric | Count |
|---|---:|
| total fact cards | 269 |
| `ai_verified` | 198 |
| `human_reviewed` | 5 |
| runtime eligible | 203 |
| `ai_extracted` quarantine | 63 |
| disabled | 3 |
| material references | 193 |

Production DB is not synced until after PR merge. The pre-merge database still reflects Loop 7 (`ai_verified` 186, `ai_extracted` 75).

## Expected Post-Merge Actions

After merge, run targeted production sync for the 12 promoted cards:

- `eijuu-3000man-shisan-myth`
- `eijuu-after-kika-card`
- `eijuu-junior-15-eligibility`
- `eijuu-takeoff-risk`
- `fuhou-shurou-employer`
- `gijinkoku-shihon-jugyou-strict`
- `kazoku-shanzaihon-imin`
- `kika-6-conditions`
- `kodo-senmon-70-points-eijuu-3years`
- `kodo-senmon-shoku-1go-to-2go`
- `rikon-todoke-procedure`
- `shikakugai-30jikan-rural`

Then verify:

- post-sync `npm run qa:card-import-audit`
- production build-info equals merged SHA
- `npm run smoke:production-answer`
- material route probes for PR, deemed reentry, part-time permission, student, job-change, 技人国, family-stay, Japanese-spouse, and material entity pages.

## Loop 9 Candidate Direction

Loop 9 should continue from the remaining 63 `ai_extracted` cards, but prioritize:

- route-specific rewrites for PR tax/pension/income cards;
- spouse/family-stay route split cards;
- 技人国 role-fit cards as L5/practice-signal rather than direct answer injection;
- business-manager 2025 cards as L5-only unless official-source wording is narrow enough;
- source repair for any card still carrying stale ISA/MHLW URLs.

