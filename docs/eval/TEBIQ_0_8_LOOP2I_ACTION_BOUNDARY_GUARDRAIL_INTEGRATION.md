# TEBIQ 0.8 Loop2I Action-Boundary Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate four additional high-frequency action-boundary guardrail families into deterministic route-gate / validator coverage. This loop focuses on 技人国 work-scope myths, 技人国 startup / management activity boundaries, CoE misconceptions, and renewal filing timing.

## 1. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-gijinkoku-gyomu-youken-boundary` | `gijinkoku-work-scope-not-any-job` | `answer-gijinkoku-any-job-or-manual-work-safe` |
| `guardrail-gijinkoku-dokuritsu-keieikanri` | `gijinkoku-startup-management-change-first` | `answer-gijinkoku-startup-management-safe-without-change` |
| `guardrail-zairyu-nintei-shomeisho-coe` | `coe-not-entry-guarantee-three-month` | `answer-coe-guarantees-entry-or-long-validity` |
| `guardrail-koshin-shinsei-timing` | `renewal-filing-window-not-after-expiry` | `answer-renewal-timing-special-period-after-expiry` |

These are negative safety guardrails only:

- Do not say 技人国 / 人文签 allows any employer-assigned work.
- Do not say factory production-line, simple on-site work, or retail cashier work is automatically safe under 技人国.
- Do not say a 技人国 holder can start substantive own-company management first and change to 経営管理 later.
- Do not say nominal director / representative title is always harmless without checking real management participation.
- Do not say CoE guarantees entry, is valid for six months / one year, or can be used after expiry.
- Do not say an overseas applicant can directly apply to Japanese immigration for a long-term residence status without the CoE route.
- Do not say the renewal special period protects a filing made after the original expiry.
- Do not say renewal can be filed six months early or that last-week filing is automatically safe.

## 2. Not Integrated As Conclusions

These remain DOMAIN / professional questions:

- whether a mixed 技人国 role still primarily falls within 技術 / 人文知識 / 国際業務;
- remediation when the user has already performed out-of-scope work;
- nominal director vs substantive management participation boundaries;
- simultaneous 技人国 employment plus own-business activity;
- changed circumstances after CoE issuance, including offer withdrawal or school cancellation;
- electronic CoE edge cases;
- exact handling of same-day renewal filing, counter return, or post-acceptance document-return scenarios.

## 3. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json --run-id=tebiq-0.8-guardrail-rus-loop2i
```

Results:

- `npm test`: passed, 126/126.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- Loop2I real-user guardrail coverage: 8/8 passed.
- Loop2I provider dry-run sidecar written.

Current deterministic coverage:

- route-gate families: 38
- answer-validator findings: 47

## 4. Real User Simulator Coverage

Real User Simulator produced 8 realistic prompts for these four guardrail families.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json
```

Result:

- 8/8 realistic prompts hit their expected route gates.

Dry-run provider sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2i-production-answer-results.json
```

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2I.json --run-id=tebiq-0.8-guardrail-rus-loop2i --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 5. Follow-Up

Provider-backed answer generation remains blocked by provider auth. Loop2I is ready for provider smoke and AQL close-read once a valid provider environment is available, but this deterministic integration does not make TEBIQ 0.8 release-ready by itself.
