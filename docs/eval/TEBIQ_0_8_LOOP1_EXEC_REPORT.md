# TEBIQ 0.8 Loop1 Execution Report

Generated: 2026-05-14

Owner: Codex Production Lead / AI Engineering Lead

Scope: first closed loop after the Knowledge Atlas Batch29 A/B result. This report covers minimal runtime guardrails, focused tests, real-user regression execution, and the remaining release blockers. It is not a legal judgement, not an AQL certification, and not permission to promote Knowledge Atlas candidate answers wholesale.

North star:

```text
帮助在日外国人减少在留摩擦。
```

Answer summary labels remain required:

```text
先看这里
当前判断
建议动作
暂缓事项
```

## 1. Context Stamp

Branch:

```text
codex/quick-reference-materials-v1
```

Baseline interpretation:

- `docs/product/TEBIQ_CURRENT_STATE.md` is older than the 2026-05-14 local handoff and was treated as stale context.
- The active 0.8 sources are the local ops, Knowledge Atlas, AQL, QA, real-user regression, and Materials Tab planning documents.
- The worktree already contained many uncommitted docs/eval/Knowledge Atlas assets. They were preserved as valid work assets.

Subagent work status synced:

- FACT guardrail batch: completed 11 cards total; Batch 001 core 10/10, Batch 002 continuation 1.
- AQL protocol: completed.
- QA plan: completed.
- Real User Simulator: completed 96 regression questions.
- CODEXUI Materials Tab plan: completed.

The production plan document was updated to mark those subagent lanes completed:

- `docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md`

## 2. What Changed

### Runtime route gates

Added:

- `lib/consultation/route-gates.ts`
- `lib/consultation/route-gates.test.ts`

Implemented pure question-side P0/P1 route gates for:

- `special-period-two-month-boundary`
- `national-tax-certificate-sono3-route`
- `resident-tax-fiscal-year-january-1`
- `j-skip-hard-eligibility-gate`
- `hsp1-institution-change-permission-first`
- `work-qualification-certificate-not-permission`
- `immigration-notice-taxonomy-first`
- `incomplete-materials-before-expiry-no-safe-bridge`

These gates do not decide legal outcome. They inject conservative constraints into the answer path so the model first separates status, procedure, material, office, notice state, and activity permission.

### Answer validator

Added:

- `lib/consultation/guardrail-validator.ts`
- `lib/consultation/guardrail-validator.test.ts`

Implemented pure answer-side checks for:

- empty, too-short, unfinished, open-list, or trailing-connector answers;
- missing fixed answer labels;
- dangerous permission/status contradictions for the known P0/P1 patterns.

The validator was adjusted after regression review to avoid two string-level false positives:

- J-Skip answer that explicitly says `1200万` is not eligible.
- `就労資格証明書` answer that explicitly says the certificate is not permission.

Added stream terminal-selection logic so high-risk incomplete endings, P0 contradictions, and missing fixed labels are no longer allowed to silently pass as `completed` in the primary answer stream.

Post-report hardening also added:

- DeepSeek stream `finish_reason === "length"` is now treated as `partial`/`timeout`, not as a completed answer.
- Follow-up answers now receive the same route-gate prompt context and terminal guardrail validation as the primary stream.
- The consultation prompt no longer says `暂缓事项` can be omitted; the fixed four-label contract is internally consistent.

### Consultation stream integration

Updated:

- `app/api/consultation/stream/route.ts`

Integration shape:

- run `matchRouteGates` before generation;
- append route-gate context as a system message after FACT context and before the final output guard;
- validate completed text for truncation/completeness, fixed labels, and known permission-state contradictions;
- on terminal guardrail findings, emit a partial timeout status and persist a failed consultation reason.

No prompt body version bump, database migration, or SSE protocol expansion was introduced in this loop.

Follow-up route note:

- `app/api/consultation/follow-up/route.ts` now applies route gates against the composed follow-up matcher input, so short follow-ups such as "那我可以先上班吗" can inherit the root question context.
- It also records DeepSeek length stops and terminal guardrail findings as partial results instead of completed follow-up answers.

### Eval Lab instrumentation

Updated:

- `app/api/internal/eval-lab/tebiq-answer/route.ts`

The internal Eval Lab answer endpoint now returns:

- `route_gate_ids`
- `guardrail_findings`

This makes focused regression output inspectable without manually opening every answer.

### Real-user regression runner

Added:

- `scripts/eval/run-real-user-regression.ts`
- `scripts/eval/export-real-user-regression-aql.ts`

Runner modes:

- `--dry-run`
- `--import-only`
- `--execute`
- `--resume`

The runner imports the 96 realistic questions into Eval Lab, executes the real production consultation answer path through `/api/internal/eval-lab/tebiq-answer`, and writes a sidecar with provenance, route-gate ids, guardrail findings, answer length, and answer hash. It intentionally does not write full answer text into the sidecar.

The AQL export script is a private extraction helper. It reads `eval_questions`/`eval_answers` for a specific `real_user_regression` run and requires an explicit `--output` path before writing full question and answer text. By default it refuses to write full answer text under `docs/eval`.

Generated sidecars:

- `docs/eval/tebiq-0.8-rur-loop1-dry-production-answer-results.json`
- `docs/eval/tebiq-0.8-rur-loop1-smoke-production-answer-results.json`
- `docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json`

### Admin fail-closed shell

Added:

- `lib/admin/access-control.ts`
- `lib/admin/access-control.test.ts`
- `middleware.ts`

This loop added a minimal fail-closed guard for `/admin/*` and `/api/admin/*` when `ADMIN_KEY` is missing or wrong. This is a separate production-security lane and should still receive manual route verification.

## 3. Verification

Commands run:

```text
npm test
npm run lint
npx tsc --noEmit --pretty false
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f"; done
ADMIN_KEY=local-admin-test EVAL_LAB_ENABLED=0 npm run dev -- --hostname 127.0.0.1 --port 3000
ADMIN_KEY= EVAL_LAB_ENABLED=0 npm run dev -- --hostname 127.0.0.1 --port 3000
```

Result:

- `npm test`: passed, 44 tests.
- `npm run lint`: passed.
- `npx tsc --noEmit --pretty false`: passed after mechanical compatibility fixes in older `scripts/test/test-p0-cycle*` scripts.
- `scripts/test/test-p0-cycle*.ts`: passed, 16/16 scripts.
- Admin middleware local check:
  - configured key: `/admin` no key `404`, wrong key `404`, correct key `200`;
  - configured key: `/api/admin/stats` wrong key `404`, correct key `200`;
  - empty key: `/admin`, `/admin?key=anything`, `/api/admin/stats`, `/api/admin/stats?key=anything` all `404`.

Real-user regression execution:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --run-id=tebiq-0.8-rur-loop1 --concurrency=2 --base-url=http://127.0.0.1:3000
npx tsx scripts/eval/run-real-user-regression.ts --execute --run-id=tebiq-0.8-rur-loop1 --resume --concurrency=1 --base-url=http://127.0.0.1:3000
```

First pass:

- 95/96 completed.
- 1 partial timeout on `TEBIQ-0.8-RUR-069`.

Resume pass:

- 96/96 completed.
- 0 failed in the final sidecar.

Latency:

- min: 19,619 ms
- p50: 42,849 ms
- p90: 56,585 ms
- max: 74,098 ms

## 4. Regression Result

Final sidecar:

- `docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json`

Total:

- 96 cases.
- 96 completed.
- 0 failed final cases.

Route-gate coverage:

| Route gate | Count |
|---|---:|
| `immigration-notice-taxonomy-first` | 39 |
| `special-period-two-month-boundary` | 10 |
| `hsp1-institution-change-permission-first` | 10 |
| `incomplete-materials-before-expiry-no-safe-bridge` | 7 |
| `national-tax-certificate-sono3-route` | 4 |
| `resident-tax-fiscal-year-january-1` | 2 |
| `j-skip-hard-eligibility-gate` | 2 |
| `work-qualification-certificate-not-permission` | 2 |

Automated guardrail findings after manual false-positive correction:

| Finding | Count | Cases |
|---|---:|---|
| `P1:answer-no-terminal-punctuation` | 4 | `RUR-019`, `RUR-023`, `RUR-029`, `RUR-054` |
| `P2:answer-no-terminal-punctuation` | 4 | `RUR-046`, `RUR-056`, `RUR-060`, `RUR-065` |
| `P1:answer-missing-label-暂缓事项` | 1 | `RUR-085` |

Manual review notes added to the sidecar:

- `TEBIQ-0.8-RUR-033`: the answer explicitly rejected J-Skip at `1200万`; an earlier regex false positive was removed.
- `TEBIQ-0.8-RUR-041`: the answer explicitly said `就労資格証明書` is not permission; an earlier regex false positive was removed.

## 5. What Improved

This loop moved TEBIQ from "we know the dangerous patterns" to "the runtime can identify many of them before and after generation."

Concrete improvements:

- The production answer path now receives route-gate context for the exact P0/P1 patterns found in Batch29 AQL.
- Eval Lab can now show which guardrails were triggered for a real production answer, instead of only storing opaque answer text.
- The 96-question real-user suite is runnable and resumable, so future loops can compare answer-path changes against the same input set.
- The validator caught real truncation/incomplete-output risk in high-risk cases instead of letting those look like normal successful answers.
- Fixed labels are now machine-checkable, including `暂缓事项`.

Safety-specific result:

- No final automated P0 contradiction finding remained after validator false-positive correction.
- This does not mean the answers are legally certified. It only means the current string-level validator did not catch the known P0 contradiction patterns in this run.

## 6. Remaining Blockers

### P1 release blockers

The following must not be treated as production-ready:

- `RUR-019`, `RUR-023`, `RUR-029`, `RUR-054`: high-risk answers ended without complete terminal punctuation and appear truncated or unfinished.
- `RUR-085`: answer missed the required `暂缓事项` label.

These block public promotion of the guarded answer path unless the affected answer families are disabled or explicitly waived with AQL/QA sign-off.

Post-report engineering patch: the stream terminal gate now treats high-risk `answer-no-terminal-punctuation` and missing fixed labels as partial/failure conditions. The original Loop1 sidecar still records the pre-patch run; a new 96-question rerun is required to verify the blocker count drops.

Additional post-report hardening:

- DeepSeek `finish_reason=length` is now a partial result.
- Follow-up answers are covered by route gates and terminal guardrails.
- Focused local tests now cover short follow-up route-gate inheritance from root/prior context.
- AQL can extract full answer text through a private DB-backed script rather than committing sensitive full-output packets.

### Engineering blockers

- Follow-up answer routes were integrated after the original Loop1 run and have local route-gate inheritance tests, but they still need provider-backed follow-up generation regression because the 96-case sidecar only covers root answers.
- The original Loop1 96-case sidecar predates the follow-up/length-stop hardening and should not be used as evidence that those patches work.
- The validator is intentionally conservative string logic. It should be treated as a tripwire, not a full correctness judge.

### AQL/QA blockers

- The 96 production answers have not yet received full AQL scoring.
- The automated result shows no final P0 string contradiction, but AQL still needs to review whether route sequence, office routing, and deep-water uncertainty are substantively correct.
- Admin middleware passed local fail-closed checks, but production deployment should still receive a final smoke check after env deployment.

## 7. DOMAIN Queue

The following remain DOMAIN-owned and should not be converted into deterministic user-facing conclusions by ENGINE alone:

- Notice taxonomy: receipt, online notice, result postcard, pickup notice, additional document request, hearing, final non-permission, cancellation, and 出頭 must become a decision map with extraction fields.
- HSP1 institution change: split harmless onboarding/admin paperwork from activity start, system login, training, remote work, and official work start.
- Business-manager to employment-status route: old company closure, suspension, liquidation, debts, employees, office, tax/social insurance, and status-basis timing.
- Family status changes: 日配/永配 divorce, death, remarriage, DV separation, address protection, and cancellation/review sensitivity.
- Incomplete materials before expiry: define which missing materials are core receiving conditions vs supplemental proof, and when window confirmation is mandatory.
- J-Find, J-Skip, ordinary HSP, 技人国 route comparison: keep hard eligibility gates separate from practical recommendation.

## 8. Not Allowed To Go Live Yet

Do not promote 0.8 guardrails as production-complete while any of the following remain true:

- high-risk answers can end mid-sentence or mid-list without automatic retry/recovery;
- fixed answer labels can be omitted;
- current verification commands stop passing;
- AQL has not scored the 96 real-user outputs;
- DOMAIN has not reviewed the deep-water route maps listed above;
- production admin fail-closed behavior has not been smoke-tested after deployment;
- Knowledge Atlas candidate answers are still being treated as whole-answer replacements instead of fact/route inputs.

## 9. Next Work Order

### ENGINE

1. Add generation retry or compact-repair for `answer-no-terminal-punctuation`, `answer-open-list-marker`, and `answer-trailing-connector`.
2. Make fixed-label omission a retryable answer-integrity failure.
3. Add focused follow-up regression cases for route-gate inheritance from root question to short follow-up.
4. Add a sidecar summary command to the real-user regression runner.
5. Re-run the 96-question suite after retry/repair and compare guardrail finding deltas against `tebiq-0.8-rur-loop1`.

### AQL

1. Score the 96 Loop1 production answers using the 0.8 AQL protocol.
2. Start with all cases that triggered route gates and all cases with guardrail findings.
3. Attribute each defect to FACT, DOMAIN, PROMPT, ENGINE, or PRODUCT COPY.
4. Produce a Loop1 AQL report with P0/P1/P2 counts and promotion decision.

### QA

1. Verify admin fail-closed behavior manually.
2. Verify the four fixed answer labels on primary consultation outputs.
3. Re-run the 96-question regression after ENGINE retry/repair.
4. Preserve sidecar provenance and check that no answer text is silently truncated.

### DOMAIN

1. Produce the notice-state decision map and required extraction fields.
2. Review HSP1 institution-change activity boundary.
3. Review company-disposition sequence before status change.
4. Review family/DV deep-water routing.
5. Review incomplete-material safe/unsafe filing language.

### FACT

1. Continue Batch 002 only after DOMAIN marks which cards can become runtime constraints.
2. Prioritize source-backed cards that support the DOMAIN maps above.
3. Keep `needs_domain` cards out of deterministic user-facing conclusions until reviewed.

## 10. Decision

Loop1 succeeded as a first closed loop:

- minimal P0/P1 route gates exist;
- answer validators exist;
- Eval Lab exposes route-gate and validator output;
- 96 real-user questions can run against the real production answer path;
- the run found concrete answer-integrity blockers.

Loop1 does not certify 0.8 for release.

The next loop should fix answer truncation/label recovery first, then run AQL on the 96 outputs, then decide which guardrails can remain in runtime and which require DOMAIN escalation.
