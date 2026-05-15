# TEBIQ 0.8 Loop2E Real-User Guardrail Coverage

Generated: 2026-05-15

Owner: Real User Simulator + Codex Production Lead

Scope: convert newly integrated FACT guardrails into realistic user regression prompts and verify deterministic route-gate coverage. This does not replace provider-backed answer generation or AQL review.

## 1. Input

Real User Simulator produced 10 realistic prompts around:

- 留学資格外活動 28小时 / 长期休假 / 多个兼职 / ガールズバー;
- 搬家后住民票 / 在留卡 / 入管住居地届出;
- みなし再入国 1年上限 / 短期滞在 exclusion;
- 在留卡有效期 vs 在留资格/在留期间;
- 在留特別許可 not an ordinary application route;
- 特定活動指定书 boundary.

Saved as:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json
```

## 2. Coverage Check

Added checker:

```text
scripts/eval/check-guardrail-real-user-coverage.ts
```

Command:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts
```

Result:

- 10/10 realistic prompts hit their expected route gates.

One useful miss was found and fixed:

- The first matcher missed a real user asking about `ガールズバー` / `ホール` because it only matched formal `風俗` wording.
- The route gate now includes common user wording such as `ガールズバー`, `キャバクラ`, `スナック`, `夜店`, `端酒`, and `ホール`.
- Validator now catches answers that allow those jobs merely because the user says they are "only serving drinks" or "not entertaining customers."

## 3. Provider-Rerun Prep

Dry-run command:

```text
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json --run-id=tebiq-0.8-guardrail-rus-smoke
```

Dry-run result:

- items: 10
- sidecar: `docs/eval/tebiq-0.8-guardrail-rus-smoke-production-answer-results.json`

Provider-backed command when env is valid:

```text
npx tsx scripts/eval/run-real-user-regression.ts --execute --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json --run-id=tebiq-0.8-guardrail-rus-smoke --concurrency=1 --base-url=http://127.0.0.1:3000
```

## 4. Verification

Commands run:

```text
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts
npx tsx scripts/eval/run-real-user-regression.ts --dry-run --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS.json --run-id=tebiq-0.8-guardrail-rus-smoke
npm test
npx tsc --noEmit --pretty false
npm run lint
```

Results:

- real-user guardrail coverage: 10/10 passed.
- `npm test`: passed, 88/88.
- `npx tsc --noEmit --pretty false`: passed.
- `npm run lint`: passed.

## 5. Next Use

When provider access works again, run these 10 prompts as a separate provider-backed smoke before or alongside the full 96-case regression. AQL should judge whether answers are not only safe but still useful for ordinary users.
