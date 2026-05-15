# TEBIQ 0.8 Release Candidate Manifest

Updated: 2026-05-15 10:38 CST

Purpose: define the smallest safe 0.8 release boundary from the current dirty local branch. This file exists because the current branch contains runtime fixes, Eval Lab work, legal-source research, generated answer artifacts, and large FACT workpacks at the same time. Do not deploy by blindly shipping every changed/untracked file.

## Release Position

TEBIQ 0.8 is a safety-gated consultation release candidate, not a full legal-source advisory product.

The 0.8 runtime value is:

- admin surfaces fail closed without the correct `ADMIN_KEY`;
- consultation answers are protected by route gates and terminal guardrail validators for high-risk myths;
- Eval Lab can import, compare, annotate, and export answer runs;
- business-manager 2025 reform is treated as guardrail/professional-confirmation only, not positive eligibility advice.

The 0.8 release blocker that remains is provider-backed answer evidence. Local `.env.local` currently has no model/provider key, so provider-backed regression cannot be completed in this workspace until the provider environment is fixed.

## Runtime Release Set

These files affect production/runtime behavior and should be reviewed as the core 0.8 release set:

```text
middleware.ts
.gitignore
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

## Test And Tooling Release Set

These files are not user runtime behavior, but they are required to keep the 0.8 safety loop reproducible:

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

The `scripts/test/test-p0-cycle*.ts` scripts are legal-source / Knowledge Atlas
research gates. They depend on the bulk legal-source card set and are not part
of the minimal 0.8 runtime release slice unless the full legal-source layer is
explicitly promoted into runtime.

## Fact / Guardrail Evidence Set

These documents are part of the 0.8 safety evidence and should stay with the release branch:

```text
docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md
docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md
docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md
docs/ops/TEBIQ_ADMIN_FAIL_CLOSED_HOTFIX_2026-05-15.md
docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md
docs/eval/TEBIQ_0_8_LOOP*_*.md
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS*.json
docs/eval/TEBIQ_0_8_AQL_ACCEPTANCE_AND_REGRESSION_PROTOCOL.md
docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_QUESTIONS.json
docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md
docs/domain/TEBIQ_0_8_LOOP1_DOMAIN_ROUTE_MAP_GAPS.md
docs/qa/TEBIQ_0_8_QA_PLAN.md
docs/qa/TEBIQ_0_8_LOOP1_QA_REPORT.md
docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md
docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
```

## Do Not Ship As Runtime Yet

These areas are valuable research material, but they should not be interpreted as production-connected fact injection unless separately reviewed:

```text
docs/knowledge-atlas/samples/
docs/knowledge-atlas/phase2/batch29a/
docs/knowledge-atlas/phase2/batch29b/
docs/eval/KNOWLEDGE_ATLAS_PHASE*_ANSWER_AB.md
docs/eval/knowledge-atlas-phase*-answer-ab-results.json
docs/fact-cards/legal-source-engineering/LEGAL_SOURCE_STRUCTURE_ENGINEERING.md
```

Reason: these are research/knowledge-thickness artifacts. The 0.8 product should not ingest them wholesale until FACT/DOMAIN/AQL approval and retrieval behavior are verified.

## Local Verification Completed

Last completed verification in this workspace:

```text
npm test # 178/178
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

Provider-backed Loop2B should now be launched through the preflighted wrapper:

```text
npm run eval:provider-preflight -- --live --base-url=http://127.0.0.1:3000
npm run eval:loop2b-targeted
```

The preflight intentionally fails before execution when `DEEPSEEK_API_KEY`,
`EVAL_LAB_ENABLED=1`, `DATABASE_URL`, or the local Eval Lab route is missing.
This prevents another targeted regression from consuming all 17 cases against
an invalid provider key.

Local production smoke on `127.0.0.1:3010`:

- `/quick-reference`: 200;
- `/quick-reference/gijinkoku-koushin-materials`: 200;
- `/quick-reference/materials/juminhyo`: 200;
- `/internal/eval-lab`: 200;
- `/admin`, `/admin?key=wrong`, `/admin/scrivener-leads`, `/admin/scrivener-leads?key=wrong`: 404;
- `/admin?key=local-admin-test`, `/admin/scrivener-leads?key=local-admin-test`: 200;
- `/api/admin/stats`, `/api/admin/stats?key=wrong`: 404;
- `/api/admin/stats?key=local-admin-test`, `/api/admin/consultations?key=local-admin-test`, `/api/admin/cases?key=local-admin-test`: 200;
- `/api/build-info`: 200.

In-app browser smoke:

- `/internal/eval-lab` rendered `TEBIQ 答案质量标注台`, stats, filters, and question list;
- no browser console errors were observed during the Eval Lab smoke.

## Remaining Before External/Production Release

1. Provider-backed Loop2B answer rerun with a valid provider environment.
2. AQL review of provider-backed answers, not only deterministic route coverage.
3. DOMAIN confirmation for any final positive wording in business-manager reform, HSP1 institution change, DV/address safety, special-period end, and pending-change work start.
4. Release branch cleanup from `origin/main`; do not use the current ahead-81 dirty branch as the deploy surface without explicit review.
