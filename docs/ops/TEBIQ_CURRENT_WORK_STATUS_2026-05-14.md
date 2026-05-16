# TEBIQ Current Work Status — 2026-05-14

Owner: Codex Production Lead / AI Engineering Lead

Purpose: give new FACT / DOMAIN / AQL / QA / ENGINE / CODEXUI windows one current map of the work. This document does not replace `docs/product/TEBIQ_CURRENT_STATE.md`; it records the current local workstream state around Knowledge Atlas, Materials Tab, and answer-quality evaluation.

## 2026-05-15 Post-Release Update

TEBIQ 0.8 is now live on production through `origin/main`.

Current production:

- `main_head`: `6676652` (`fix: protect internal admin surfaces (#132)`)
- production `/api/build-info`: `6676652e8a5be3058f389c73130397d563e6eb45`, built at `2026-05-15T12:35:34.362Z`
- PR #131 shipped the 0.8 safety-gated consultation release candidate.
- PR #132 protected `/admin/*`, `/api/admin/*`, `/internal/*`, and `/api/internal/*` with fail-closed middleware and admin cookie support.
- Provider-backed Loop2B composite evidence reached 17/17 completed with 0 terminal guardrail findings, and AQL/QA gave release PASS.
- Production smoke after #132 confirmed public pages 200, uncredentialed admin/internal routes 404, and 5/5 representative answer smoke completed.

This file is retained as a workstream map. For current deployment truth, read `docs/product/TEBIQ_CURRENT_STATE.md` first.

## 2026-05-16 Path To 1.0 Update

The current long-running execution plan is now:

```text
docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md
```

TEBIQ 1.0 is defined as a stable residence-friction reduction system, not as a
generic AI Q&A site and not as a replacement for administrative scriveners.

The six ordered engineering programs are:

1. **0.8.5 Release Candidate**: expand First24 to a 50-60 question real-user
   provider-backed matrix, with AQL / DOMAIN / QA review and no unresolved P0/P1.
2. **Knowledge Asset Import**: classify and govern fact cards, legal-source
   cards, guardrails, materials cards, deep-water candidates, and source-only
   evidence before runtime use.
3. **Materials Tab Tooling**: turn Materials into practical mobile checklist
   pages with where-to-get / who-prepares / timing / related links / ask bridge.
4. **Deep-Water Routing And Professional Boundary**: detect high-risk cases and
   route them safely without pretending to decide immigration practice.
5. **Eval Lab Quality Flywheel**: make bad-answer diagnosis, AQL scoring,
   DOMAIN review, and repair loops durable.
6. **1.0 Release**: complete production sync, QA, smoke, docs, rollback, and
   deploy to `tebiq.jp` only after gates pass.

If a future window forgets the latest chat context, resume from the roadmap file
and the live execution log in that file.

## 2026-05-16 Card Import Governance Update

Large card collections must now be imported through the active governance plan:

```text
docs/ops/TEBIQ_CARD_IMPORT_TO_PRODUCT_PLAN.md
```

Current rule:

- `docs/fact-cards/*.md` can become positive answer facts only through
  `fact_cards` sync, matcher gate, audit, and regression;
- P0/P1 guardrail findings should become route gates / validators, not
  positive claims;
- Materials cards should enter the Materials Tab as scenario/common-material
  checklists, not as approval predictions;
- deep-water candidates are for extraction and professional routing, not for
  deterministic answers.

2026-05-16 check:

- filesystem fact cards: 101 sync-scannable cards;
- DB fact cards: 101 rows in the current `.env.local` target after
  `npm run fact-layer:sync`;
- DB drift: none reported by `npm run qa:card-import-audit`;
- `npm run fact-layer:sync:dry` passes for all 101 filesystem cards;
- `scripts/qa/fact-layer-qa-runner.ts` now listens to `fact_cards_injected`
  instead of the old `fact_cards` event;
- `zairyu-address-change` now has a narrow matcher exception so ordinary
  moving/address questions can cite the source-backed low-risk card without
  globally lowering matcher thresholds.
- `npm run qa:card-import-audit` now reports filesystem/DB drift, Materials
  fact-card references, and route-gate source asset coverage.
- Materials `job-change` no longer references the non-existent
  `gijinkoku-job-change-notification` card.

## 2026-05-16 TEBIQ 0.8.5 Batch A Update

0.8.5 target:

```text
知识接入稳定化 + 材料产品化 + Eval Lab 可观察性。
```

Batch A completed locally:

- FACT / DOMAIN / AQL / ENGINE agents were re-engaged for 0.8.5:
  - DOMAIN review: `docs/domain/TEBIQ_0_8_5_IMPORT_DOMAIN_REVIEW.md`;
  - AQL plan: `docs/eval/TEBIQ_0_8_5_AQL_TEST_PLAN.md`;
  - ENGINE review: `docs/engineering/TEBIQ_0_8_5_CARD_IMPORT_ENGINEERING_REVIEW.md`;
  - FACT returned a first import list: 20 positive candidates, 10 Materials
    mount points, 15 guardrail/deep-water cards.
- Materials now has stable single-topic pages at `/quick-reference/[id]`;
  answer-to-material bridges now open the topic page instead of a long-list
  hash anchor.
- Materials topics now support `relatedTopicIds`, so one scenario can point to
  adjacent checklists without forcing the user to scan the full page.
- Live consultation completion actions now include a clear `新问题` action next
  to `补充` and `分享`.
- Eval Lab answer columns now show a compact knowledge trace from
  `raw_payload_json`: fact-card ids, route-gate ids, and validator finding
  count.
- `fact_cards_injected` audit rows now carry optional matcher diagnostics:
  `matched_keywords`, `score`, and `decision_reason`.
- AQL first-run pack was written to
  `docs/eval/TEBIQ_0_8_5_CARD_IMPORT_FIRST24.json` and imported into the
  local Eval Lab DB (`received=24`, `inserted=24` on first import).
- `npm run eval:0.8.5:first24-routes` checks the 0.8.5 first-24 route-gate
  expectations; current result is `15/15`.
- Matcher aliases/context guards were expanded so ordinary user phrasing
  retrieves more useful procedural/material cards while reducing broad
  high-risk overmatch on 永住/技人国/更新.
- First24 provider-backed TEBIQ run completed on local production start with
  `EVAL_LAB_ENABLED=1` and `FACT_LAYER_ENABLED=true`:
  - result file: `docs/eval/TEBIQ_0_8_5_FIRST24_RUN_RESULT.json`;
  - `24/24 completed`;
  - `0` guardrail validator findings after rerunning corrected samples;
  - `21/24` answers carried fact-card audit rows;
  - the 3 answers without fact-card rows are expected route-gate/negative-control
    cases: immigration notice taxonomy, nonpermission appeal, short-stay meeting.
- Two validator false positives were fixed with regression tests:
  - negative/contrast wording for national tax `納税証明書その3` vs municipal
    resident-tax certificates;
  - short-stay business meeting wording that explicitly stays inside meeting /
    business-contact scope.
- One renewal/materials validator false positive was fixed:
  - `材料齐备不代表许可` is now safe evidence, while guaranteed-permission
    language remains blocked.
- Local smoke:
  - `/quick-reference`, `/quick-reference/address-change`,
    `/quick-reference/job-change`, and `/internal/eval-lab?key=...` returned 200;
  - fact-layer dry-run for a moving/address question returned only
    `zairyu-address-change` after adding a context guard for `tensyoku-zairyu`.
- AQL focused re-check after targeted fixes:
  - First24 status improved from `yellow` to `green-ish internal pass`;
  - P1s closed for `E01-late-tax-followup`, `C02-incomplete-material-before-expiry`,
    and `C08-gijinkoku-restaurant-help`;
  - remaining issues are P2 copy/prompt precision: avoid overfitting incomplete
    material answers to a specific visa, and avoid implying that qualification-
    outside-activity permission is a simple fix for 技人国 mixed duties.
- The two P2 prompt precision issues above were also tightened in route gates and
  targeted rerun:
  - `C02` now says the visa type is unknown and frames the issue around formal
    acceptance by the window, not an assumed 経営管理 update;
  - `C08` now avoids both the wrong 特定技能 food-manufacturing example and the
    “just get shikakugai” shortcut.

Known remaining 0.8.5 work:

- The first-24 exact fact-card expectation is much better, but not fully
  perfect under the current `MAX_INJECTED=2` cap: one return-home materials
  prompt expects three related facts, while the runtime can inject only two.
- Route-gate `sourceAssetIds` still include code/ledger ids that the audit
  cannot resolve to concrete files. This remains a registry cleanup task, not
  a runtime blocker.
- Production visibility still depends on target runtime having
  `FACT_LAYER_ENABLED=true` and a synced `fact_cards` table.

## North Star

TEBIQ is not trying to make AI "beat immigration practice" or replace scriveners.

Current north star:

```text
帮助在日外国人减少在留摩擦。
```

That means:

- help users avoid dangerous wrong actions;
- separate official facts, procedure state, materials, and practical uncertainty;
- identify deep-water situations early;
- route to a scrivener / official window with a better fact pack;
- make common materials and procedures readable in Chinese.

## Product Surfaces

### 提问 Tab

Current role:

- understand the user's situation;
- give safe next actions;
- avoid overclaiming permission / approval / legality;
- preserve deep-water uncertainty;
- route high-risk cases to human/professional review.

Answer summary labels must remain:

```text
先看这里
当前判断
建议动作
暂缓事项
```

### 材料 Tab

Current direction:

- not an emergency channel;
- not a heavy task-tracking companion;
- not a generic article list;
- a structured Chinese official-material checklist system for "小明用户" who roughly know what they are preparing.
- user-facing name should be `材料` / `材料清单`; `速查` is an old shorthand and should not be reintroduced as the tab label.

The next improvement is not random UI copy. It is materials thickness:

- scenario-based checklist pages;
- reusable common document cards;
- where-to-get / who-prepares / validity / timing;
- cross-links between common materials and application scenarios;
- explicit warnings that complete materials do not guarantee permission.

## Knowledge Atlas Status

The Knowledge Atlas / legal-source direction has been validated by a real A/B test.

Latest evaluation:

- Batch29A + Batch29B: 54 real A/B questions.
- A = current TEBIQ answer.
- B = candidate answer with Knowledge Atlas context.
- Technical QA: no P0/P1 blocker.
- Eval Lab import: 54/54 new starter tags imported, all with A/B answer pairs.
- AQL result: B won 47/54, A won 7/54.
- Mean score moved from about 3.63 to about 4.37.

Reference reports:

- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_TECH_QA.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29A_AQL_REPORT.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29B_AQL_REPORT.md`

Interpretation:

- Knowledge Atlas improves answer safety, especially procedure boundaries and public-obligation handling.
- The candidate answer must not be promoted wholesale.
- Before production runtime use, TEBIQ needs P0/P1 guardrails, route gates, and answer validators.

## Critical Risks Found By AQL

Current TEBIQ A exposed:

- special period two-month boundary error;
- national tax `納税証明書その3` misrouted to municipal resident tax;
- resident-tax fiscal-year / January 1 address mapping error;
- HSP1 institution-change boundary reversed;
- unsafe `資格外活動` workaround framing while change is pending.

Knowledge Candidate B exposed:

- J-Skip route false positives around 1200万 / 1600万;
- overclassification of ambiguous notices as non-permission;
- overstating incomplete-material filing as a safe bridge.

These must become guardrail facts and validators before broader runtime connection.

## Current Work Mode

We are moving from:

```text
produce more cards
```

to:

```text
produce critical guardrails -> test with focused regressions -> then expand again
```

Do not turn this into one giant FACT task. Use small loops.

Recommended loop:

1. FACT creates a 10-20 card guardrail batch with official sources.
2. FACT writes progress to a fixed progress document.
3. DOMAIN reviews only the uncertain/high-risk questions.
4. ENGINE turns stable guardrails into route gates / validators.
5. QA runs technical and regression checks.
6. AQL reviews focused answer pairs.
7. Codex summarizes and decides the next workpack.

## Window Responsibilities

| Window | Owns | Must Not Own |
|---|---|---|
| Codex Production Lead | orchestration, engineering, QA routing, integration, reports | final legal/professional judgement |
| FACT | official source-backed facts, cards, source logs, DOMAIN queue | user-facing answer copy, approval prediction, practical-law conclusion |
| DOMAIN | legal/practice boundary review, deep-water judgement | engineering implementation |
| AQL | answer quality judgement and defect attribution | source-card production |
| QA | technical QA, path checks, regression integrity | product strategy |
| Product Copy | fixed UI copy | legal/domain judgement |
| CODEXUI | UI structure and implementation | changing legal/answer content |
| Real User Simulator | realistic user questions | scoring professional correctness |

## Immediate Priority

Start FACT Guardrail Workpack 001 core batch:

- special period boundary;
- national tax `納税証明書（その3）`;
- resident-tax fiscal-year / January 1 address;
- late payment /追納 /補申告 not erasing history;
- J-Skip hard eligibility gate.
- HSP1 institution change boundary;
- `就労資格証明書` boundary;
- spouse divorce/death/remarriage;
- DV separation/address safety;
- business-manager company disposition before status change.

FACT progress file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
```

Codex should scan this file periodically instead of requiring long chat summaries.

## Current Production Reminder

Historical P0/P1 security reminder from the takeover:

- production admin protection had been observed as fail-open when `ADMIN_KEY` was missing;
- `/admin/*` and `/api/admin/*` access protection must be confirmed separately;
- do not let Knowledge Atlas work hide this production security check.

2026-05-15 update: production admin fail-open was confirmed and hotfixed first through PR #130, then broadened through PR #132 to include internal Eval Lab surfaces. After deployment, `/admin`, `/api/admin/stats`, `/internal/eval-lab`, and `/api/internal/eval-lab/state` return 404 with no key or wrong key. See:

```text
docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md
```

## 2026-05-15 Loop2A / Loop2B Update

Loop1 engineering landed runtime route gates, answer validators, Eval Lab regression runner, follow-up route protection, and admin fail-closed middleware. AQL then blocked 0.8 promotion because `TEBIQ-0.8-RUR-037` still had a P0: it offered `J-Find` + `資格外活動許可` as an employment-start bridge while the proper work-status route was unresolved.

Loop2A completed a targeted engineering hotfix:

- added route gate `jfind-employment-transition-no-shikakugai-bridge`;
- added validator `P0:answer-jfind-shikakugai-employment-bridge`;
- added terminal-blocking validator `P1:answer-hsp1-certificate-as-alternate-route`;
- added `P2:answer-sono3-income-proof-label`;
- tightened route-gate prompt context for `国税その3` and HSP1 institution change;
- verified old Loop1 bad answers are now caught by the new validator.

Loop2A report:

```text
docs/eval/TEBIQ_0_8_LOOP2A_ENGINE_HOTFIX_REPORT.md
```

Loop2B preparation completed and was later executed with a valid provider environment:

- `scripts/eval/run-real-user-regression.ts` now supports `--ids=RUR-036,RUR-037`;
- targeted 17-case rerun set prepared, including `RUR-006` as a safe pending-change false-positive canary;
- sidecar summary script added at `scripts/eval/summarize-real-user-regression-sidecar.ts`;
- dry-run sidecar written to `docs/eval/tebiq-0.8-rur-loop2b-targeted-production-answer-results.json`.

Loop2B preparation report:

```text
docs/eval/TEBIQ_0_8_LOOP2B_TARGETED_RERUN_PREP.md
```

Loop2C AQL/QA read-only review:

```text
docs/eval/TEBIQ_0_8_LOOP2C_AQL_QA_READONLY_REVIEW.md
```

Final release evidence now supersedes the earlier "provider missing" blocker:

- `/tmp/tebiq-0.8-rur-loop2b-final-composite-20260515-aql.json`: 17/17 completed, guardrail findings total 0.
- AQL/QA final review: PASS, no release-blocking P0/P1.
- Production answer smoke after deploy: 5/5 completed.

Loop2D FACT guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2D_FACT_GUARDRAIL_INTEGRATION.md
```

Loop2E real-user guardrail coverage:

```text
docs/eval/TEBIQ_0_8_LOOP2E_REAL_USER_GUARDRAIL_COVERAGE.md
```

Loop2F FACT guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2F_FACT_GUARDRAIL_INTEGRATION.md
```

Loop2G high-risk guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2G_HIGH_RISK_GUARDRAIL_INTEGRATION.md
```

Loop2G AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2G_AQL_QA_REVIEW.md
```

Loop2H FACT guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2H_FACT_GUARDRAIL_INTEGRATION.md
```

Loop2H AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2H_AQL_QA_REVIEW.md
```

Loop2I action-boundary guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2I_ACTION_BOUNDARY_GUARDRAIL_INTEGRATION.md
```

Loop2I AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2I_AQL_QA_REVIEW.md
```

Loop2J public-obligation / notice guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2J_PUBLIC_OBLIGATION_AND_NOTICE_GUARDRAIL_INTEGRATION.md
```

Loop2J AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2J_AQL_QA_REVIEW.md
```

Loop2K work / denial guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2K_WORK_AND_DENIAL_GUARDRAIL_INTEGRATION.md
```

Loop2K AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2K_AQL_QA_REVIEW.md
```

Loop2L PR / employment-obligation guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2L_PR_AND_EMPLOYMENT_OBLIGATION_GUARDRAIL_INTEGRATION.md
```

Loop2L AQL / QA review:

```text
docs/eval/TEBIQ_0_8_LOOP2L_AQL_QA_REVIEW.md
```

Loop2M business-manager 2025 reform guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2M_BUSINESS_MANAGER_2025_REFORM_GUARDRAIL_INTEGRATION.md
```

Loop2N special-period departure guardrail integration:

```text
docs/eval/TEBIQ_0_8_LOOP2N_SPECIAL_PERIOD_DEPARTURE_GUARDRAIL_INTEGRATION.md
```

0.8 release-candidate boundary:

```text
docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md
```

0.8 pre-release P0 closure matrix:

```text
docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md
```

Business-manager 2025 reform DOMAIN and FACT audit:

```text
docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md
docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md
```

FACT scan as of 2026-05-15:

- guardrail cards completed: 124;
- latest completed batch: Batch 023;
- `needs_domain`: 292;
- progress source: `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md`.
- G57/G103 business-manager reform cards are now quarantined for positive-answer use after P0 mixed old/new rule audit.
- `keiei-kanri-capital-asset-3000man-criterion` is now guardrail-only, not a standalone positive eligibility fact.

Latest verification after Loop2N, refreshed on 2026-05-15:

- `npm test`: 178/178;
- `npx tsc --noEmit --pretty false`: passed;
- `npm run lint`: passed;
- all `scripts/test/test-p0-cycle*.ts` scripts: passed;
- all guardrail real-user coverage packs through Loop2N: passed;
- `npm run build`: passed;
- local production smoke on `127.0.0.1:3010` after Loop2N corrections: `/quick-reference` 200, `/quick-reference/gijinkoku-koushin-materials` 200, `/quick-reference/materials/juminhyo` 200, `/internal/eval-lab` 200, `/admin` no-key/wrong-key 404, `/admin/scrivener-leads` no-key/wrong-key 404, admin correct-key 200, admin API no-key/wrong-key 404, admin API correct-key 200, `/api/build-info` 200.
- in-app browser smoke for `/internal/eval-lab`: rendered `TEBIQ 答案质量标注台`, stats, filters, and question list; no browser console errors observed.

Clean release cutover status:

- clean worktree: `/Users/martin/Documents/tebiq-0-8-release`;
- branch: `codex/tebiq-0-8-release`;
- draft PR: `https://github.com/martindoad-bit/tebiq/pull/131`;
- release slice contains 74 files and excludes bulk Knowledge Atlas research, generated answer result dumps, `.claude/`, and legal-source P0 cycle scripts;
- clean release slice verification: `npm test` 175/175, `npx tsc --noEmit --pretty false`, `npm run lint`, all guardrail real-user packs through Loop2N, `npm run build`, `npm run qa:release-slice -- --all-changed`, staged `npm run qa:release-slice`, and `git diff --cached --check`;
- local production smoke on `127.0.0.1:3011`: quick-reference / Eval Lab / build-info 200; admin pages and admin APIs fail closed without the correct `ADMIN_KEY`; correct `ADMIN_KEY` returns 200.
- production smoke on `https://tebiq.jp` after updating `scripts/test/smoke-production-answer.ts` to use `/api/consultation/stream`: admin no-key/wrong-key still fail closed, `/api/build-info` 200, and 5/5 redline answer probes completed successfully.

Current blocker:

- provider-backed Loop2B has not produced usable answer evidence.
- A temporary provider key was tried on 2026-05-15 without writing it to files; the rerun produced `0/17 completed`, with `16` `deepseek_http_401` failures and `1` network `fetch failed`.
- This is infrastructure/provider-auth failure, not answer-quality failure.
- Loop2B remains blocked until a valid provider environment is available.

Runner hardening added after the failed provider attempt:

- `scripts/eval/run-real-user-regression.ts` aborts remaining cases by default when it detects provider-auth failure.
- `scripts/eval/summarize-real-user-regression-sidecar.ts` reports error counts without answer text.
- `scripts/eval/preflight-provider-env.ts` checks `DATABASE_URL`, `DEEPSEEK_API_KEY`, `EVAL_LAB_ENABLED=1`, optional local Eval Lab route reachability, and optional live DeepSeek health before running provider-backed regression.
- `scripts/eval/run-loop2b-targeted.sh` wraps the Loop2B targeted rerun, runs provider preflight first, then executes the 17-case run, prints a sidecar summary, and writes the private AQL packet to `/tmp` by default.
- package scripts added: `npm run eval:provider-preflight` and `npm run eval:loop2b-targeted`.

Follow-up guardrail hardening added:

- route-gate tests now cover short J-Find and pending-change follow-ups where the route family comes from root context;
- validator tests now cover J-Find `資格外活動` bridge language in short follow-up context;
- validator tests now explicitly preserve the safe case where a pending-change user continues current/previous permitted activity.

FACT guardrail integration added:

- `student-shikakugai-28h-long-vacation-limit` from `guardrail-shikaku-gai-katsudo-28h-limit`;
- `address-change-card-window-dual-duty` from `guardrail-address-change-dual-obligation`;
- `minashi-reentry-one-year-limit` from `guardrail-minashi-sainyukoku-one-year-limit`;
- `residence-card-expiry-vs-status-period` from `guardrail-zairyu-card-expiry-vs-status-period`;
- `tokubetsu-kyoka-not-normal-route` from `guardrail-tokubetsu-kyoka-not-normal-route`;
- `tokutei-katsudo-designation-scope-boundary` from `guardrail-tokutei-katsudo-scope-boundary`;
- `kika-eijuu-different-authority-and-effect` from `guardrail-kika-eijuu-different-authority-and-effect`;
- `individual-duty-not-replaced-by-third-party` from `guardrail-third-party-cannot-replace-immigration-duty`;
- `status-cancellation-before-expiry-boundary` from `guardrail-status-cancellation-before-expiry`;
- `application-truthfulness-no-false-info` from `guardrail-application-truthfulness-no-false-info`;
- `ssw1-ssw2-boundary` from `guardrail-tokutei-gino-1go-2go-boundary`;
- `hsp-points-income-and-pr-shortcut-boundary` from `guardrail-hsp-points-miscalculation`;
- `tokutei-katsudo-naitei-kyushoku-work-boundary` from `guardrail-tokutei-katsudo-naitei-kyushoku`;
- `titp-ikusei-shuro-transition-boundary` from `guardrail-ikusei-shuro-ginou-jisshu-haishi`;
- `hsp2-not-automatic-not-pr` from `guardrail-hsp2-henkou-youken`;
- `torikiji-applicant-responsibility-boundary` from `guardrail-honin-vs-torikijisha-shinsei`;
- `pr-pending-current-status-not-auto-protected` from `guardrail-pr-pending-vs-current-status-renewal`;
- `nonpermission-special-period-ended-boundary` from `guardrail-fuhyo-go-zairyu-kikan`;
- `business-manager-disposition-no-auto-success` from `guardrail-business-manager-disposition-before-change`;
- `dv-address-safety-first` from `guardrail-dv-separation-address-safety`;
- `shikakugai-hokatsu-kobetsu-boundary` from `guardrail-shikakugai-hokatsu-vs-kobetsu`;
- `notification-duty-violation-not-harmless` from `guardrail-todoke-gimu-ihan-kekka`;
- `renewal-change-not-automatic-discretion` from `guardrail-koshin-henkou-shinsa-kijun`;
- `social-insurance-pension-not-irrelevant` from `guardrail-shakai-hoken-mishukaku-risk`;
- `gijinkoku-work-scope-not-any-job` from `guardrail-gijinkoku-gyomu-youken-boundary`;
- `gijinkoku-startup-management-change-first` from `guardrail-gijinkoku-dokuritsu-keieikanri`;
- `coe-not-entry-guarantee-three-month` from `guardrail-zairyu-nintei-shomeisho-coe`;
- `renewal-filing-window-not-after-expiry` from `guardrail-koshin-shinsei-timing`;
- `late-payment-remediation-not-erased` from `guardrail-late-payment-not-erased`;
- `pension-exemption-not-arrears-not-free-pass` from `guardrail-kokumin-nenkin-menjo-zairyu`;
- `dependent-work-permission-required` from `guardrail-kazoku-taizai-shuro-seigen`;
- `result-postcard-not-permission` from `guardrail-result-postcard-pickup-boundary`;
- `short-stay-no-work-no-shikakugai` from `guardrail-tanki-taizai-shuro-kinshi`;
- `work-status-side-job-scope-boundary` from `guardrail-fukugyo-kengyo-zairyu-seigen`;
- `ssw-job-change-not-free` from `guardrail-tokutei-gino-tenshoku-joken`;
- `nonpermission-no-ordinary-appeal-no-grace` from `guardrail-fuhyoka-go-taiou`;
- `pr-basic-requirements-not-years-only` from `guardrail-eijuu-shinsei-kihon-yoken`;
- `pr-card-renewal-still-required` from `guardrail-eijusha-card-kosin-soko`;
- `gijinkoku-jlpt-not-formal-not-irrelevant` from `guardrail-gijinkoku-nihongo-youken`;
- `foreign-worker-social-insurance-not-optional` from `guardrail-shakai-hoken-gaikokujin-gimu`;
- `business-manager-2025-reform-hard-fact-boundary` from quarantined G57/G103 and the new FACT/DOMAIN audit;
- route-gate families now total 52;
- answer validator findings now total 61;
- validators now catch long-vacation unlimited/full-time language, per-job 28h language, prohibited adult/entertainment-side work language, address-change auto-completion without card-presentation caveat, みなし再入国 over-1-year/short-stay errors, residence-card/status-period confusion, 在留特別許可 fallback framing, 特定活動 catch-all work framing, 永住/帰化 confusion, third-party-replaces-individual-duty framing, remaining-period-cures-cancellation-risk framing, false-application-is-safe-after-permission framing, 特定技能1号/2号 conflation, HSP income/PR shortcut overreach, 内定者/求職者特定活動 work overreach, 技能実習/育成就労 automatic-switch myths, HSP2 automatic/PR-equivalence myths, 申請取次 responsibility-transfer myths, PR-pending-replaces-current-renewal myths, post-non-permission special-period myths, business-manager company-disposition shortcut myths, business-manager 2025 reform mixed hard facts, DV contact/address-safety mistakes, 資格外活動包括/個別 confusion, notification-duty harmlessness/replacement myths, renewal/change guaranteed-by-docs myths, social-insurance/pension irrelevance myths, 技人国-any-job / manual-work myths, 技人国-startup-management-before-change myths, CoE entry-guarantee / long-validity myths, renewal timing / post-expiry special-period myths, late-payment remediation-erases-history myths, pension exemption vs arrears / foreigner free-pass myths, 家族滞在 work-without-permission myths, result-postcard / exam-complete equals permission myths, short-stay work / shikakugai workaround myths, work-status side-job freedom myths, 特定技能 free-transfer / notification-only myths, nonpermission appeal / grace-period myths, 永住 years-only / public-obligation-irrelevant myths, 永住者在留カード renewal myths, 技人国 JLPT fixed-threshold myths, and foreign-worker social-insurance optional myths.

Loop2G AQL correction applied:

- `dv-address-safety-first` no longer triggers on ordinary `分居 / 別居` alone;
- DV safety route-gate now requires explicit safety terms such as `DV`, `家暴`, `暴力`, `虐待`, `モラハラ`, `ストーカー`, `避难所`, or `シェルター`;
- validator trigger was narrowed in the same way;
- tests now preserve ordinary spouse-separation cases without DV safety signal.

Loop2J AQL correction applied:

- `answer-postcard-or-exam-complete-equals-permission` now covers `審査終了 / 审查结束`, travel-before-pickup language, and `未领取 / 新卡 / 结果` ordering variants;
- `answer-late-payment-remediation-erases-history` now covers `税务署 / 税務署 / 所得税 / 申告`, `补税 / 補税`, and “修正申告済み / 已处理完，所以更新/永住没有影响” language;
- tests now cover both P1 gaps found by AQL.

Loop2K AQL correction applied:

- `short-stay-no-work-no-shikakugai` no longer uses `客户 / クライアント` as a standalone trigger;
- short-stay matching now relies on actual work-risk terms such as `有偿 / 有償 / 项目 / 案件 / プロジェクト`;
- tests now preserve ordinary short-stay business meeting / client-visit questions without injecting the P0 short-stay work guardrail.

Loop2L engineering correction applied:

- `pr-basic-requirements-not-years-only` now matches practical `1年 / 3年 / 5年` permanent-residence timing questions;
- `gijinkoku-jlpt-not-formal-not-irrelevant` now matches Chinese surface form `人文知识国际业务`;
- `answer-pr-years-only-or-public-obligations-irrelevant` no longer treats `永住只看年数` as safe merely because nearby text also contains `税金年金`.

Loop2L AQL correction applied:

- Loop2L four high-risk P1 validator findings now enter terminal guardrail policy;
- social-insurance matching now covers implicit TEBIQ-context questions using `会社 / 公司 / 雇主 / 老板 / 勤務先` plus insurance/pension terms;
- 技人国/JLPT matching now covers `技术人文知识国际业务` and `技術人文知識国際業務`;
- permanent-resident card route gate no longer uses bare `PR` as trigger, reducing ordinary credit-card / non-immigration PR false positives;
- tests now include implicit社保, unseparated技人国, terminal Loop2L contradictions, and PR-card negative control.

Loop2M FACT / DOMAIN / AQL correction applied:

- G57 and G103 business-manager reform cards are quarantined for positive-answer fact injection;
- `keiei-kanri-capital-asset-3000man-criterion` is guardrail-only;
- `business-manager-2025-reform-hard-fact-boundary` now forces old/new/transition distinction before answering 500万円, 3,000万円, one/two-employee, existing-holder, and startup-designated-activity questions;
- `answer-business-manager-2025-reform-mixed-hard-facts` now terminal-catches 500万円 current shortcut language, false "500万円 has no source" language, 3,000万円-or-2-employees mixed language, 3,000万円-alone confidence, existing-holder immediate-full-new-rule overstrictness, startup 特定活動44/51 one-size-fits-all transition myths, and full-time employee status-scope overreach;
- `business-manager-disposition-no-auto-success` was narrowed so ordinary company-sponsored 技人国 changes do not get routed as business-manager company disposition.

Loop2N AQL correction applied:

- `special-period-departure-deepwater` now covers colloquial forms such as `续签中`, `申请更新中`, `旧签证到期后`, `出日本`, `离境`, `回老家`, `入境日本`, `机场`, and `被海关拦`;
- `answer-special-period-departure-overconfidence` no longer treats "可以/没问题 + 再向入管确认" as safe evidence;
- validator now catches "两个月内回来就行", "申请中章/卡背面章即可再入国", "不影响更新/变更申请", and "人在国外收到通知后回来取卡没问题" wording.

Real-user guardrail coverage added:

- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json` contains 10 realistic prompts from Real User Simulator.
- `scripts/eval/check-guardrail-real-user-coverage.ts` verifies they hit expected route gates.
- Coverage currently passes 10/10.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json` contains 12 more realistic prompts from Real User Simulator.
- Loop2F coverage currently passes 12/12.
- Loop2F dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2f-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2G.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2G coverage currently passes 8/8.
- Loop2G dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2g-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2H coverage currently passes 8/8.
- Loop2H dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2h-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2I coverage currently passes 8/8.
- Loop2I dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2i-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2J coverage currently passes 8/8.
- Loop2J dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2j-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2K coverage currently passes 8/8.
- Loop2K dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2k-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2L.json` contains 8 more realistic prompts from Real User Simulator.
- Loop2L coverage currently passes 8/8.
- Loop2L dry-run sidecar written to `docs/eval/tebiq-0.8-guardrail-rus-loop2l-production-answer-results.json`.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json` contains 14 realistic business-manager 2025 reform prompts reviewed by Real User Simulator.
- Loop2M coverage currently passes 14/14.
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2N.json` contains 10 realistic special-period departure prompts generated by Real User Simulator and expanded after AQL review.
- Loop2N coverage currently passes 10/10.

Latest verification after these FACT guardrail integrations:

- `npm test`: 178/178;
- `npx tsc --noEmit --pretty false`: passed;
- `npm run lint`: passed;
- `for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done`: passed;
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts`: 10/10.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json`: 12/12.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2G.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2L.json`: 8/8.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json`: 14/14.
- `npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2N.json`: 10/10.
- `npm run build`: passed.
- local production smoke after Loop2N on `127.0.0.1:3010`: quick-reference / topic / material / Eval Lab all 200; admin pages and admin APIs fail closed without the correct `ADMIN_KEY`; correct `ADMIN_KEY` returns 200.

Next action when key/env is available:

```text
npm run eval:provider-preflight -- --live --base-url=http://127.0.0.1:3000
npm run eval:loop2b-targeted
```
