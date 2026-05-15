# TEBIQ 0.8 Loop2F FACT Guardrail Integration

Generated: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

Scope: integrate the next safe negative guardrails from FACT Batch 005/006 into deterministic route-gate / validator coverage. This is runtime protection only; it does not promote new legal conclusions or replace DOMAIN review.

## 1. FACT Scan

FACT progress scan:

- completed guardrail cards: 39
- in progress: 0
- blocked: 0
- needs DOMAIN: 113
- latest completed batch: Batch 006

Progress file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
```

## 2. Integrated Cards

Integrated into `lib/consultation/route-gates.ts` and `lib/consultation/guardrail-validator.ts`:

| FACT card | Route gate | Validator finding |
|---|---|---|
| `guardrail-tokutei-gino-1go-2go-boundary` | `ssw1-ssw2-boundary` | `answer-ssw-auto-or-family-overreach` |
| `guardrail-hsp-points-miscalculation` | `hsp-points-income-and-pr-shortcut-boundary` | `answer-hsp-income-or-pr-shortcut-overreach` |
| `guardrail-tokutei-katsudo-naitei-kyushoku` | `tokutei-katsudo-naitei-kyushoku-work-boundary` | `answer-naitei-kyushoku-work-overreach` |
| `guardrail-ikusei-shuro-ginou-jisshu-haishi` | `titp-ikusei-shuro-transition-boundary` | `answer-titp-ikusei-auto-switch` |
| `guardrail-hsp2-henkou-youken` | `hsp2-not-automatic-not-pr` | `answer-hsp2-automatic-or-pr-equivalent` |
| `guardrail-honin-vs-torikijisha-shinsei` | `torikiji-applicant-responsibility-boundary` | `answer-torikiji-removes-applicant-responsibility` |

These are negative safety guardrails only:

- Do not say 特定技能1号 automatically becomes 2号, 1号 can generally bring family, 2号 covers all sectors, or 特定技能 allows multi-employer work.
- Do not count overtime, commuting allowance, or housing allowance as HSP point-system annual income.
- Do not say 70 HSP points means immediate PR eligibility without the residence-period condition.
- Do not say 内定者特定活動 allows immediate employment at the offer employer.
- Do not say 求職者特定活動 can be extended indefinitely or used for unlimited work.
- Do not say current 技能実習 holders automatically switch to 育成就労 in 2027, or that the two systems are the same.
- Do not say HSP1 automatically becomes HSP2 after 3 years, or HSP2 is the same as PR.
- Do not say 申請取次 shifts application truthfulness/content responsibility away from the applicant.

## 3. Real User Simulator Coverage

Real User Simulator produced 12 realistic prompts for these guardrail families.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json
```

Coverage command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json
```

Result:

- 12/12 realistic prompts hit their expected route gates.

Dry-run provider sidecar:

```text
docs/eval/tebiq-0.8-guardrail-rus-loop2f-production-answer-results.json
```

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json --run-id=tebiq-0.8-guardrail-rus-loop2f --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 4. Verification

Commands run:

```text
npm test
npx tsc --noEmit --pretty false
npm run lint
for f in scripts/test/test-p0-cycle*.ts; do npx tsx "$f" || exit 1; done
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json --run-id=tebiq-0.8-guardrail-rus-loop2f
```

Results:

- `npm test`: passed, 100/100.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.
- all `scripts/test/test-p0-cycle*.ts` scripts: passed.
- Loop2F real-user guardrail coverage: 12/12 passed.
- Loop2F provider dry-run sidecar written.

## 5. Current Blocker

Provider-backed answer generation remains blocked by provider auth. The prior temporary credential returned `deepseek_http_401`; no new generated-answer evidence should be claimed until a valid provider environment is available.
