# TEBIQ 0.8 Loop1 QA Report

Generated: 2026-05-15

Owner: TEBIQ 0.8 QA sub-agent

Scope: Loop1 QA verification only. This report reviews evidence sufficiency, known gaps, P0/P1/P2 status, and release gate for TEBIQ 0.8 public promotion.

Write boundary: `docs/qa/TEBIQ_0_8_LOOP1_QA_REPORT.md`

## 1. Source Inputs Read

Required inputs reviewed:

- `docs/qa/TEBIQ_0_8_QA_PLAN.md`
- `docs/eval/TEBIQ_0_8_LOOP1_EXEC_REPORT.md`
- `lib/consultation/route-gates.ts`
- `lib/consultation/guardrail-validator.ts`
- `app/api/consultation/stream/route.ts`
- `app/api/consultation/follow-up/route.ts`
- `middleware.ts`
- `scripts/eval/run-real-user-regression.ts`
- `scripts/eval/export-real-user-regression-aql.ts`

Additional local evidence inspected:

- `docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json`
- `docs/eval/tebiq-0.8-rur-loop1-smoke-production-answer-results.json`
- `docs/eval/tebiq-0.8-rur-loop1-dry-production-answer-results.json`
- `lib/admin/access-control.ts`
- `lib/admin/access-control.test.ts`

## 2. Local QA Commands Run

Commands run in `/Users/martin/Documents/tebiq` without external provider keys:

```text
npm test
npm run lint
npx tsc --noEmit --pretty false
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
```

Result:

- `npm test`: passed, 44/44 tests after adding focused route-gate inheritance checks.
- `npm run lint`: passed, no ESLint warnings or errors.
- `npx tsc --noEmit --pretty false`: passed.
- `scripts/test/test-p0-cycle*.ts`: passed with exit code 0.

No command requiring `DEEPSEEK_API_KEY`, another provider key, or a production service key was run.

## 3. Evidence Sufficiency Review

| Evidence Area | Status | QA Assessment |
|---|---|---|
| `npm test` | Sufficient for local unit coverage | Covers admin access-control, route gates, guardrail validator, terminal finding selection, and related local constraints. Passed in this QA pass. |
| `npm run lint` | Sufficient for static lint gate | Passed in this QA pass. |
| `tsc --noEmit` | Sufficient for TypeScript compile gate | Passed in this QA pass. |
| P0 cycle scripts | Sufficient for local legal-source dry-run/injection protection | Passed in this QA pass. This supports no obvious regression in the scripted P0 card protection lane. |
| Admin local checks | Partially sufficient | Execution report records local dev route checks for configured-key and empty-key states. Unit tests also verify fail-closed logic. QA did not rerun `npm run dev` to avoid runtime artifacts outside the report write boundary. Production smoke remains required after deploy. |
| 96 real-user sidecar | Insufficient for final release | Sidecar proves the suite can run and reached 96/96 completed before later hardening, but it predates follow-up guardrails, `finish_reason=length` handling, and terminal guardrail enforcement. It still contains P1/P2 answer-integrity findings. |
| AQL export helper | Sufficient as tooling, not as scoring evidence | Script refuses unsafe default full-answer output and supports private AQL packets, but there is no completed 96-case AQL score in the reviewed evidence. |

## 4. Implementation QA Notes

### Route Gates

`lib/consultation/route-gates.ts` implements deterministic matchers for the main Loop1 P0 route families:

- special-period two-month endpoint;
- national tax `納税証明書その3`;
- resident tax fiscal year / January 1 municipality;
- J-Skip hard eligibility gate;
- HSP1 institution change permission-first boundary;
- `就労資格証明書` is not a new permission;
- immigration notice taxonomy first;
- incomplete-materials before expiry no safe bridge.

QA assessment: local unit tests and code review support that the gates exist and inject conservative constraints. They are keyword gates, not correctness proof. They should be treated as tripwires and prompt constraints, not DOMAIN-certified decision maps.

### Guardrail Validator

`lib/consultation/guardrail-validator.ts` checks answer completeness, fixed labels, and known dangerous contradictions. The terminal selector now blocks P0 findings, empty/open-list/trailing-connector endings, P1 missing punctuation, and missing fixed labels.

QA assessment: this is an appropriate Loop1 safety net. It does not certify substantive legal correctness, and it can miss paraphrased unsafe advice outside the regex surface.

### Primary Stream Route

`app/api/consultation/stream/route.ts` now:

- computes route gates before generation;
- injects route-gate context before the final output guard;
- treats DeepSeek `finish_reason === "length"` as partial/timeout instead of completed;
- validates final text and persists terminal guardrail failures as partial results.

QA assessment: design matches the Loop1 safety goal. The missing evidence is a post-hardening 96 rerun with provider access.

### Follow-up Route

`app/api/consultation/follow-up/route.ts` now:

- composes matcher input from latest follow-up, root question, and summary facts;
- applies route gates to that composed context;
- validates terminal output like the primary stream route;
- treats provider length stops as partial/timeout.

QA assessment: code-level integration exists, but there is no focused follow-up regression evidence. This remains a P1 verification gap because short follow-ups such as "那我可以先上班吗" are a known safety surface.

### Admin Middleware

`middleware.ts` protects `/admin/:path*` and `/api/admin/:path*` through `isAdminKeyAccepted`. `lib/admin/access-control.ts` fails closed when `ADMIN_KEY` is missing or empty, rejects missing/wrong keys, and accepts the configured key.

QA assessment: local logic is sound and unit-tested. Execution report records manual local route checks. Production deployment smoke is still required because middleware behavior depends on deployed env and routing.

## 5. 96 Sidecar Review

Reviewed sidecar:

```text
docs/eval/tebiq-0.8-rur-loop1-production-answer-results.json
```

Summary:

- run id: `tebiq-0.8-rur-loop1`
- mode: `execute`
- total cases: 96
- completed: 96
- partial: 0
- failed: 0
- updated at: `2026-05-14T15:58:34.717Z`
- source sha256: `f819da48a883728e597acd0c168991e032fe4c2c22d468d6bb0e29a7c8c45c76`

Route-gate coverage in the final sidecar:

| Route Gate | Count |
|---|---:|
| `immigration-notice-taxonomy-first` | 39 |
| `special-period-two-month-boundary` | 10 |
| `hsp1-institution-change-permission-first` | 10 |
| `incomplete-materials-before-expiry-no-safe-bridge` | 7 |
| `national-tax-certificate-sono3-route` | 4 |
| `resident-tax-fiscal-year-january-1` | 2 |
| `j-skip-hard-eligibility-gate` | 2 |
| `work-qualification-certificate-not-permission` | 2 |

Guardrail findings:

| Finding | Count | Cases |
|---|---:|---|
| `P1:answer-no-terminal-punctuation` | 4 | `TEBIQ-0.8-RUR-019`, `TEBIQ-0.8-RUR-023`, `TEBIQ-0.8-RUR-029`, `TEBIQ-0.8-RUR-054` |
| `P2:answer-no-terminal-punctuation` | 4 | `TEBIQ-0.8-RUR-046`, `TEBIQ-0.8-RUR-056`, `TEBIQ-0.8-RUR-060`, `TEBIQ-0.8-RUR-065` |
| `P1:answer-missing-label-暂缓事项` | 1 | `TEBIQ-0.8-RUR-085` |

QA interpretation:

- The 96 sidecar is valuable as a Loop1 baseline and regression harness proof.
- It is not sufficient as release evidence because it predates later stream/follow-up hardening.
- The P1 answer-integrity findings block public promotion unless fixed and rerun, or explicitly waived with QA/AQL/Product sign-off.
- The absence of automated P0 contradiction findings is not the same as a substantive AQL pass.

## 6. Known Gap Assessment

| Gap | Severity | QA Assessment |
|---|---|---|
|补强后的 96 没有重跑，因为当前环境没有可安全使用的 provider key | P1 release blocker | Accepted as an environment constraint for this QA pass. It blocks public promotion because the exact hardened runtime has not been verified across the 96-case suite. |
| follow-up guardrail 缺少端到端 provider rerun | P1 release blocker | Added local focused route-gate inheritance tests for short follow-up context, but no provider-backed follow-up generation regression has run yet. |
| 生产 admin 还需部署后 smoke | P1 release blocker | Local fail-closed evidence is good, but production env/routing smoke is required before public exposure of admin surfaces. |
| 96 outputs lack full AQL scoring | P1 release blocker | Automated tripwires are not a legal/content QA substitute. AQL must review routed high-risk cases and all finding cases. |
| DOMAIN deep-water maps are still pending | P1/P2 depending route family | Notice taxonomy, HSP1 activity boundary, family/DV, incomplete materials, and company-disposition routes still need DOMAIN-owned maps before broad claims. |

## 7. P0 / P1 / P2 QA Conclusion

### P0

Current QA did not find a new open P0 release blocker in the local code/test evidence.

Important limitation: this is not a P0 content certification. The post-hardening runtime was not rerun against the 96 real-user questions, and no full AQL scoring was available.

### P1

Open P1 blockers remain:

- Post-hardening 96 real-user regression has not been rerun.
- Follow-up route has local route-gate inheritance tests, but no provider-backed follow-up generation regression.
- Production admin fail-closed smoke has not been performed after deployment.
- 96 production answers have not received full AQL scoring.
- The baseline 96 sidecar contains P1 answer-integrity findings: four high-risk missing terminal punctuation cases and one missing fixed label case.

### P2

Open P2 / stabilization items:

- P2 missing terminal punctuation cases remain in the baseline sidecar.
- Regression sidecar is useful but lacks a built-in summarized delta command.
- Validator remains regex/string based and should be expanded carefully as AQL finds new paraphrase failures.
- AQL export is private-safe by default, but full provenance remains split across DB/export/sidecar.

## 8. Release Gate

QA release decision:

```text
DO NOT PUBLIC PROMOTE TEBIQ 0.8 YET.
```

Allowed status:

```text
Loop1 engineering guardrails can remain in limited/internal validation.
```

Blocked status:

```text
0.8 is not ready for public promotion.
```

Minimum gate to reconsider public promotion:

1. Re-run the full 96 real-user regression against the post-hardening stream and follow-up code with a safe provider key.
2. Add and pass focused follow-up guardrail regression for inherited high-risk context.
3. Complete AQL scoring for the 96 outputs, prioritizing all route-gated and guardrail-finding cases.
4. Perform production admin fail-closed smoke after deployment with missing, wrong, no, and correct credential states.
5. Confirm no P0 findings and no unwaived P1 answer-integrity findings remain.

## 9. Final QA Position

Loop1 is a successful safety-engineering loop, not a release certification.

The current evidence supports that the local route gates, validators, admin fail-closed logic, lint, TypeScript, unit tests, and P0 cycle scripts are in good shape. The evidence does not yet support public promotion because the exact hardened runtime has not been proven on the full 96-case suite, follow-up safety is unregressed, AQL scoring is incomplete, and production admin smoke is still pending.
