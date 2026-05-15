# TEBIQ 0.8 Loop2J AQL / QA Review

Generated: 2026-05-15

Reviewer: AQL / QA sub-agent

Scope: read-only review of Loop2J public-obligation / notice guardrail integration.

## Conclusion

Loop2J deterministic protection is ready for provider smoke.

It is not release-ready. Current evidence is local deterministic tests, real-user route-gate coverage, and dry-run sidecar only. Provider-backed answers and AQL close-read are still required.

## Findings

### P0

No P0 found.

The four Loop2J guardrails are correctly framed as negative P1 guardrails and do not appear to turn specific approval / legality outcomes into ENGINE conclusions.

### P1

Two answer-validator coverage gaps were found:

- `answer-postcard-or-exam-complete-equals-permission` did not fully cover `审查结束 / 審査終了 + 出国 / 出境 / 未领新卡` scenarios. Route-gate protection already covered the real-user prompt, but answer-side validation could miss a generated answer saying the user may travel before receiving the new card / written result.
- `answer-late-payment-remediation-erases-history` was too narrow for `修正申告 / 补税済み + 不影响 / 已处理完` language. Route-gate protection already covered the question, but answer-side validation could miss a generated answer that lightly says a corrected filing has no renewal impact.

Over-trigger risk is acceptable for provider smoke:

- `late-payment-remediation-not-erased` may hit ordinary tax-certificate material questions, but it is non-terminal and only asks the model to distinguish certificate availability from on-time performance.
- `pension-exemption-not-arrears-not-free-pass` is balanced: official exemption / deferment is not treated as arrears, while exemption is not turned into a universal safe pass.
- `dependent-work-permission-required` may hit family-company unpaid-help scenarios, but must-ask wording requires fact confirmation and preserves DOMAIN handling.

### P2

Recommended extra tests:

- formal exemption / deferment should not be called arrears;
- 家族滞在 unpaid short household/family help should not be deterministically called illegal without facts;
- ordinary pickup notice should not be framed as “danger” when the user simply follows the notice;
- `审查结束 + 出国 + 未领新卡` should be answer-validator covered.

## Engineering Response

Applied after AQL review:

- expanded `answer-postcard-or-exam-complete-equals-permission` to cover `審査終了 / 审查结束`, travel-before-pickup language, and “未领取 / 还没领 / 新卡 / 结果” ordering variants;
- expanded `answer-late-payment-remediation-erases-history` to cover `税务署 / 税務署 / 所得税 / 申告`, `补税 / 補税`, and “修正申告済み / 已处理完，所以更新/永住没有影响” language;
- added regression tests for both P1 gaps.

Verification after patch:

- `npm test`: passed, 136/136.

## Provider Smoke

Loop2J can enter provider smoke. The highest-priority close-read items are:

- `TEBIQ-0.8-GR6-RUS-002`: corrected tax filing / supplemental tax and renewal impact;
- `TEBIQ-0.8-GR6-RUS-006`: 家族滞在 unpaid or paid family-company help;
- `TEBIQ-0.8-GR6-RUS-008`: review complete, new card not picked up, travel before result pickup.

## Release

Do not release based on Loop2J alone. Provider-backed answer evidence and AQL close-read remain required.
