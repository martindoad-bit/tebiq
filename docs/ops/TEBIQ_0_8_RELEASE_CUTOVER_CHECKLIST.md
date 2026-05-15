# TEBIQ 0.8 Release Cutover Checklist

Updated: 2026-05-15 10:46 CST

Purpose: convert the current mixed research/engineering branch into a small,
reviewable 0.8 release branch. This is an operator checklist, not a product
spec.

## Release Principle

0.8 should ship the safety runtime and evaluation bench, not the whole research
workspace.

Ship:

- admin fail-closed protection;
- consultation route gates and terminal answer validators;
- Eval Lab import / rerun / annotation / export utilities;
- provider-backed regression tooling;
- evidence documents needed to understand the release.

Do not ship as runtime:

- bulk Knowledge Atlas research cards;
- legal-source batch A/B snapshots;
- FACT workpacks not connected to runtime;
- local `.claude` worktrees or generated answer dumps that include answer text.

## Clean Branch Procedure

Start from current `origin/main`, not from the dirty working branch:

```text
git fetch origin
git worktree add -b codex/tebiq-0-8-release ../tebiq-0-8-release origin/main
```

Then copy/cherry-pick only the reviewed 0.8 release set from the current
workspace. Do not copy directories wholesale.

## Must Include

Runtime:

```text
.gitignore
middleware.ts
lib/admin/access-control.ts
lib/admin/access-control.test.ts
lib/consultation/route-gates.ts
lib/consultation/route-gates.test.ts
lib/consultation/guardrail-validator.ts
lib/consultation/guardrail-validator.test.ts
app/api/consultation/stream/route.ts
app/api/consultation/follow-up/route.ts
lib/answer/prompt/consultation-alpha-v1.ts
app/api/internal/eval-lab/tebiq-answer/route.ts
app/api/internal/eval-lab/export/route.ts
app/api/internal/eval-lab/import-run/route.ts
app/internal/eval-lab/EvalLabClient.tsx
lib/db/queries/eval-lab.ts
package.json
```

Evaluation and QA tools:

```text
scripts/eval/check-guardrail-real-user-coverage.ts
scripts/eval/run-real-user-regression.ts
scripts/eval/summarize-real-user-regression-sidecar.ts
scripts/eval/export-real-user-regression-aql.ts
scripts/eval/preflight-provider-env.ts
scripts/eval/run-loop2b-targeted.sh
scripts/eval/import-knowledge-atlas-answer-ab-to-eval-lab.ts
scripts/qa/validate-knowledge-atlas-batch.ts
scripts/qa/check-0-8-release-slice.ts
```

Do not include `scripts/test/test-p0-cycle*.ts` in the minimal 0.8 release
slice. Those scripts are legal-source / Knowledge Atlas research gates and
require the full legal-source card set.

Evidence docs:

```text
docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md
docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md
docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md
docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md
docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md
docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md
docs/eval/TEBIQ_0_8_LOOP*.md
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS*.json
docs/eval/TEBIQ_0_8_AQL_ACCEPTANCE_AND_REGRESSION_PROTOCOL.md
docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_QUESTIONS.json
docs/domain/TEBIQ_0_8_LOOP1_DOMAIN_ROUTE_MAP_GAPS.md
docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md
docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md
```

Guardrail fact cards required by runtime tests:

```text
docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md
```

## Exclude From 0.8 Runtime Cutover

These may remain in the research branch, but should not be copied into the clean
release branch unless a later review explicitly promotes them:

```text
.claude/
docs/knowledge-atlas/samples/
docs/knowledge-atlas/phase2/batch29a/
docs/knowledge-atlas/phase2/batch29b/
docs/knowledge-atlas/workpacks/
docs/eval/KNOWLEDGE_ATLAS_PHASE*.md
docs/eval/knowledge-atlas-phase*-answer-ab-results.json
docs/eval/tebiq-0.8-*-production-answer-results.json
docs/eval/LEGAL_SOURCE_*.md
docs/eval/legal-source-*-results.json
docs/fact-cards/legal-source-candidates/
docs/fact-cards/legal-source-engineering/
docs/fact-cards/*.md
```

Exception: include only the specific fact-card files listed in "Must Include".

## Required Gates On The Clean Branch

Run from the clean release worktree:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2G.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2L.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2N.json
npm run build
npm run qa:release-slice
```

Then smoke locally with:

```text
ADMIN_KEY=local-admin-test EVAL_LAB_ENABLED=1 npm run start -- --hostname 127.0.0.1 --port 3010
```

Smoke requirements:

- public pages return 200;
- Eval Lab returns 200 only when `EVAL_LAB_ENABLED=1`;
- `/admin/*` and `/api/admin/*` return 404 with no key or a wrong key;
- admin pages and admin APIs return 200 with the correct key;
- `/api/build-info` returns 200.

## Provider-Backed Release Gate

After a valid provider key is available:

```text
npm run eval:provider-preflight -- --live --base-url=http://127.0.0.1:3000
npm run eval:loop2b-targeted
```

Acceptance:

- 17/17 targeted cases complete or any non-completion is explained by provider
  infrastructure, not answer logic;
- no terminal guardrail finding on release-target answers;
- private AQL packet exported to `/tmp` and reviewed;
- AQL reports 0 P0 and no release-blocking P1.

## Residual Release Risk

Even after deterministic tests pass, 0.8 should not be described as
provider-answer release-ready until the provider-backed Loop2B evidence exists.
The deterministic guardrails prove that known dangerous answer shapes are
blocked; they do not prove the live model always chooses the best safe wording.
