# TEBIQ 0.8 Loop2J Public-Obligation And Notice Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate four additional high-frequency public-obligation / procedure-state guardrail families into deterministic route-gate / validator coverage. This loop focuses on late tax/social-payment remediation myths, national-pension exemption confusion, 家族滞在 work-permission boundaries, and result-notice / postcard misconceptions.

## 1. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-late-payment-not-erased` | `late-payment-remediation-not-erased` | `answer-late-payment-remediation-erases-history` |
| `guardrail-kokumin-nenkin-menjo-zairyu` | `pension-exemption-not-arrears-not-free-pass` | `answer-pension-exemption-equals-arrears-or-free-pass` |
| `guardrail-kazoku-taizai-shuro-seigen` | `dependent-work-permission-required` | `answer-dependent-can-work-without-permit` |
| `guardrail-result-postcard-pickup-boundary` | `result-postcard-not-permission` | `answer-postcard-or-exam-complete-equals-permission` |

These are negative safety guardrails only:

- Do not say late payment, 追納, 補申告, 修正申告, or a currently obtainable certificate erases the original late-payment / late-filing history.
- Do not say officially granted 国民年金免除 / 猶予 / 学生納付特例 is the same as unpaid arrears.
- Do not say pension exemption is automatically safe for every immigration / PR scenario.
- Do not say foreigners can ignore 国民年金.
- Do not say 家族滞在 can work without 資格外活動許可.
- Do not say 家族滞在 can start work while the permission application is merely pending.
- Do not say a result postcard, 審査完了 notice, or pickup notice itself equals permission.
- Do not say the user can start a new activity, new job, or rely on a new status before receiving the new residence card / written permission.

## 2. Real-User Matcher Corrections

Real User Simulator prompts exposed two useful wording gaps:

- `副业收入忘了报 / 税务署 / 修正申告 / 补税` did not initially hit the late-payment remediation gate. The matcher now includes tax-office and filing terms, not just resident-tax / pension payment terms.
- `审查结束，还没去拿新卡，想先出国` initially hit only an older residence-card/status-period gate. The result-notice matcher now covers `审查结束 / 審査終了`, travel-before-pickup language, and result-pickup wording.

These corrections were made to the matcher rather than weakening the real-user prompts.

## 3. Not Integrated As Conclusions

These remain DOMAIN / professional questions:

- actual weight of a particular late payment, late filing, correction filing, or remediation record in a concrete renewal/change/PR case;
- whether a specific pension exemption / deferment record creates risk for a specific PR route;
- whether unpaid family-company help counts as work in a concrete factual pattern;
- result-notice interpretation when the user has the exact Japanese notice but it contains unusual wording;
- whether travel during a pending / result-ready state is procedurally safe in a concrete timeline.

## 4. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json --run-id=tebiq-0.8-guardrail-rus-loop2j
```

Results:

- `npm test`: passed, 134/134.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- Loop2J real-user guardrail coverage: 8/8 passed.
- Loop2J provider dry-run sidecar written.

Current deterministic coverage:

- route-gate families: 42
- answer-validator findings: 51

## 5. Real User Simulator Coverage

Real User Simulator produced 8 realistic prompts for these four guardrail families.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json
```

Result:

- 8/8 realistic prompts hit their expected route gates.

Dry-run provider sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2j-production-answer-results.json
```

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2J.json --run-id=tebiq-0.8-guardrail-rus-loop2j --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 6. Follow-Up

AQL / QA review found no P0 and two P1 answer-validator coverage gaps. Both were patched after review:

- `修正申告 / 补税済み + 不影响 / 已处理完` language is now caught by `answer-late-payment-remediation-erases-history`;
- `審査終了 / 审查结束 + 未领新卡 / 出国 / 出境` language is now caught by `answer-postcard-or-exam-complete-equals-permission`.

Review report:

```text
docs/eval/TEBIQ_0_8_LOOP2J_AQL_QA_REVIEW.md
```

Verification after AQL patch:

- `npm test`: passed, 136/136.

Provider-backed answer generation remains blocked by provider auth in the current local environment. Loop2J is ready for provider smoke and AQL close-read once a valid provider environment is available, but this deterministic integration does not make TEBIQ 0.8 release-ready by itself.
