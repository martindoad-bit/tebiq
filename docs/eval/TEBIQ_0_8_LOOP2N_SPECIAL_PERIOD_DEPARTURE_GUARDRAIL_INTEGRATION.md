# TEBIQ 0.8 Loop2N Special-Period Departure Guardrail Integration

Date: 2026-05-15

## 1. Why This Loop Exists

DOMAIN pre-release review flagged `特例期間中の出国` as a P0 source/route gap.

The risk is not ordinary `みなし再入国` handling. The danger is that a user in renewal/change special-period posture may leave Japan before their result, assume ordinary reentry rules are enough, and then face reentry/status consequences that TEBIQ should not simplify.

## 2. Product Position

0.8 does not answer this area with a deterministic yes/no.

Safe route:

- identify it as a high-risk deep-water situation;
- separate special-period posture from ordinary reentry permission;
- require confirmation with the immigration bureau or an immigration professional before departure;
- avoid both overconfident directions: "it is fine" and "it always terminates."

## 3. Engineering Changes

Added route gate:

```text
special-period-departure-deepwater
```

Source asset:

```text
guardrail-tokureikikan-chushutsu-risk
```

Added validator:

```text
answer-special-period-departure-overconfidence
```

The validator catches:

- "with みなし再入国 it is fine";
- "departure does not affect the special period";
- "special period definitely continues after departure";
- "departure always terminates the special period" stated as an unsupported certainty;
- "within the two-month special period, coming back is fine";
- "application stamp / residence-card back stamp means reentry is fine";
- "departure does not affect the renewal/change application";
- "while abroad, receiving the result notice means returning for pickup is fine."

## 4. Real User Simulator Input

Real User Simulator generated 8 realistic prompts covering:

- planned temporary departure;
- result-notice-before-departure uncertainty;
- already departed before realizing the risk;
- みなし再入国 misunderstanding;
- urgent family return;
- company-requested business trip;
- school-requested return for paperwork;
- result notice arriving while the user is abroad.

The prompts are stored in:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2N.json
```

## 5. AQL / QA Review

AQL/QA reviewed the first Loop2N implementation and found no P0 blocker, but identified two P1 gaps:

- route gate was too narrow for colloquial Chinese user phrasing;
- validator safeEvidence could wrongly pass answers that first said "yes / no problem" and only later added "confirm with immigration."

Applied corrections:

- expanded trigger wording for `续签中`, `申请更新中`, `旧签证到期后`, `出日本`, `离境`, `回老家`, `入境日本`, `机场`, and `被海关拦`;
- tightened safeEvidence so "yes + confirm" remains blocked;
- added tests for "two-month return is fine", "application stamp is enough", and "application is unaffected" myths.

## 6. Verification

Results:

- `npm test`: passed, 178/178.
- `npx tsc --noEmit --pretty false`: passed after route/validator addition.
- `npm run lint`: passed.
- Loop2N real-user route coverage: passed, 10/10.
- All guardrail real-user coverage packs through Loop2N passed.
- `npm run build`: passed.
- Local production smoke after restart on `127.0.0.1:3010`: quick-reference / topic / material / Eval Lab returned 200; admin pages and admin APIs failed closed without the correct `ADMIN_KEY`; correct `ADMIN_KEY` returned 200.

## 7. Release Position

For 0.8, special-period departure should ship only as:

- route-gate / deep-water warning;
- answer validator protection against overconfident instructions;
- not a positive travel/reentry advisory.

Provider-backed answer behavior still needs rerun once a valid provider environment is available.
