# TEBIQ 0.8 Loop2H FACT Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate four additional high-risk negative guardrail families from FACT into deterministic route-gate / validator coverage. This loop focuses on 資格外活動許可 type confusion, notification-duty violations, renewal/change overcertainty, and social-insurance / pension non-enrollment risk.

## 1. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-shikakugai-hokatsu-vs-kobetsu` | `shikakugai-hokatsu-kobetsu-boundary` | `answer-shikakugai-hokatsu-unlimited-or-needless-application` |
| `guardrail-todoke-gimu-ihan-kekka` | `notification-duty-violation-not-harmless` | `answer-notification-duty-harmless-or-replaced` |
| `guardrail-koshin-henkou-shinsa-kijun` | `renewal-change-not-automatic-discretion` | `answer-renewal-change-guaranteed-by-docs` |
| `guardrail-shakai-hoken-mishukaku-risk` | `social-insurance-pension-not-irrelevant` | `answer-social-insurance-pension-irrelevant` |

These are negative safety guardrails only:

- Do not say 包括許可 covers any activity.
- Do not say standard student part-time work necessarily requires a separate application when the card already records 包括許可.
- Do not say late or missing immigration notification is harmless once filed later.
- Do not say employer / school / labor-insurance handling replaces the individual immigration notification duty.
- Do not say renewal or status change is guaranteed by complete documents, previous approval, or satisfying listed conditions.
- Do not say social-insurance / pension non-enrollment, non-payment, late payment, exemption, or deferment is irrelevant to immigration or PR review.

## 2. Not Integrated As Conclusions

These remain DOMAIN / professional questions:

- whether a concrete paid activity is covered by 包括許可 or requires 個別許可;
- whether 包括許可 is always automatically granted for a specific student scenario;
- actual enforcement likelihood for a short single-instance late notification;
- treatment of historical missed notifications during renewal;
- approval probability for renewal / change;
- weight of social-insurance non-enrollment in ordinary renewal/change cases;
- treatment of employer-side social-insurance non-enrollment;
- PR treatment of 免除 / 猶予 / 追納 records.

## 3. Loop2G AQL Correction Applied

AQL / QA flagged a P1 over-trigger in Loop2G: ordinary spouse separation could match `dv-address-safety-first` because `分居 / 別居` appeared in the DV trigger group.

Applied correction:

- route-gate DV trigger now requires explicit safety terms such as `DV`, `家暴`, `暴力`, `虐待`, `モラハラ`, `ストーカー`, `避难所`, or `シェルター`.
- validator question trigger was narrowed in the same way.
- added non-overblocking tests for ordinary spouse separation without safety signal.

## 4. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json --run-id=tebiq-0.8-guardrail-rus-loop2h
```

Results:

- `npm test`: passed, 118/118.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- Loop2H real-user guardrail coverage: 8/8 passed.
- Loop2H provider dry-run sidecar written.

Current deterministic coverage:

- route-gate families: 34
- answer-validator findings: 43

## 5. Real User Simulator Coverage

Real User Simulator produced 8 realistic prompts for these four guardrail families.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json
```

Result:

- 8/8 realistic prompts hit their expected route gates.

Dry-run provider sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2h-production-answer-results.json
```

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2H.json --run-id=tebiq-0.8-guardrail-rus-loop2h --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 6. Follow-Up

Provider-backed answer generation remains blocked by provider auth. Loop2H is ready for provider smoke and AQL close-read once a valid provider environment is available, but this deterministic integration does not make TEBIQ 0.8 release-ready by itself.
