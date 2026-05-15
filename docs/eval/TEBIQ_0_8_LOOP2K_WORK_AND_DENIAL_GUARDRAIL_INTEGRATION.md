# TEBIQ 0.8 Loop2K Work And Denial Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate four additional high-risk action guardrail families into deterministic route-gate / validator coverage. This loop focuses on short-stay work prohibition, side jobs under work-status visas, 特定技能 job-change boundaries, and post-nonpermission response myths.

## 1. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-tanki-taizai-shuro-kinshi` | `short-stay-no-work-no-shikakugai` | `answer-short-stay-work-or-shikakugai-safe` |
| `guardrail-fukugyo-kengyo-zairyu-seigen` | `work-status-side-job-scope-boundary` | `answer-work-status-side-job-unrestricted` |
| `guardrail-tokutei-gino-tenshoku-joken` | `ssw-job-change-not-free` | `answer-ssw-job-change-free-or-notification-only` |
| `guardrail-fuhyoka-go-taiou` | `nonpermission-no-ordinary-appeal-no-grace` | `answer-nonpermission-appeal-or-grace-period` |

These are negative safety guardrails only:

- Do not say 短期滞在 / tourist / business stay permits paid work, trial work, or entry into employment.
- Do not say 短期滞在 holders can solve work permission through 資格外活動許可.
- Do not say work-status visa holders can freely add any side job, or that small income removes immigration risk.
- Do not say 資格外活動許可 / 28h student-style framing solves work-status side jobs outside the current status scope.
- Do not say 特定技能 workers can freely change employer / sector without procedures.
- Do not say cross-sector 特定技能 transfer can be handled by notification alone.
- Do not say nonpermission can be challenged through ordinary 行政不服 / 審査請求 or that appeal-like filing extends lawful stay.
- Do not say nonpermission creates a new grace period, or that reapplication has a fixed mandatory waiting period.

## 2. Not Integrated As Conclusions

These remain DOMAIN / professional questions:

- whether overseas-client remote work while physically in Japan on 短期滞在 is unlawful employment in a specific pattern;
- whether交通费-only or unpaid trial work is work in a specific employment setup;
- whether a same-field freelance side job by a 技人国 holder is inside the current status scope;
- notification duties for legitimate secondary employment within the same 技人国 scope;
- sector/category compatibility and timing for a specific 特定技能 transfer;
- employer-closure gap handling for 特定技能;
- how to obtain and interpret nonpermission reasons;
- reapplication strategy after nonpermission.

## 3. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json --run-id=tebiq-0.8-guardrail-rus-loop2k
```

Results:

- `npm test`: passed, 144/144.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- Loop2K real-user guardrail coverage: 8/8 passed.
- Loop2K provider dry-run sidecar written.

Current deterministic coverage:

- route-gate families: 46
- answer-validator findings: 55

## 4. Real User Simulator Coverage

Real User Simulator produced 8 realistic prompts for these four guardrail families.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json
```

Result:

- 8/8 realistic prompts hit their expected route gates.

Dry-run provider sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2k-production-answer-results.json
```

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2K.json --run-id=tebiq-0.8-guardrail-rus-loop2k --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 5. Follow-Up

AQL / QA review found no P0 and one P1 over-trigger risk. The issue was patched after review:

- `客户 / クライアント` is no longer a standalone short-stay work trigger;
- short-stay matching now relies on work-risk terms such as `有偿 / 有償 / 项目 / 案件 / プロジェクト`;
- an ordinary short-stay business meeting / client visit regression test was added.

Review report:

```text
docs/eval/TEBIQ_0_8_LOOP2K_AQL_QA_REVIEW.md
```

Verification after AQL patch:

- `npm test`: passed, 145/145.
- Loop2K real-user coverage remains 8/8.

Provider-backed answer generation remains blocked by provider auth in the current local environment. Loop2K is ready for provider smoke and AQL close-read once a valid provider environment is available, but this deterministic integration does not make TEBIQ 0.8 release-ready by itself.
