# TEBIQ 0.8 Loop2F AQL/QA Read-Only Review

Generated: 2026-05-15

Reviewer: AQL/QA subagent

Scope:

- `docs/eval/TEBIQ_0_8_LOOP2F_FACT_GUARDRAIL_INTEGRATION.md`
- `lib/consultation/route-gates.ts`
- `lib/consultation/guardrail-validator.ts`
- `lib/consultation/route-gates.test.ts`
- `lib/consultation/guardrail-validator.test.ts`
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2F.json`

## Conclusion

Loop2F can be described as:

```text
deterministic protection ready for provider smoke
```

It cannot be described as release-ready. Provider-backed answer generation remains blocked, and there is no generated-answer evidence yet for Loop2F.

## P0/P1 Risk Review

No P0 was found where Loop2F turns a DOMAIN positive judgement into an ENGINE conclusion.

The six new validator findings are P1. They are deterministic safety checks and are not terminal-gated as P0 findings by default.

P1 usability cautions:

- `titp-ikusei-shuro-transition-boundary`: good for blocking automatic-switch/new-old-same myths, but user questions about whether 育成就労 can be applied for before 2027 approach positive route judgement. Provider smoke should ensure the answer gives useful next steps without inventing a current route.
- `hsp-points-income-and-pr-shortcut-boundary`: safe for blocking overtime / housing / commuting allowance and 70-point immediate-PR mistakes, but complex income such as bonus, overseas pay, and group-company payment must remain DOMAIN/professional review.
- `ssw1-ssw2-boundary`: safe for blocking 1号 automatic 2号, 1号 family accompaniment, 2号 all-sector, and multi-employer myths. Industry transfer, family alternative routes, and care-sector future routes remain DOMAIN territory.

## Suitable For Provider Smoke

Proceed to provider-backed smoke when provider env is valid:

- `ssw1-ssw2-boundary`: `TEBIQ-0.8-GR2-RUS-001/002/003`
- `hsp-points-income-and-pr-shortcut-boundary`: `TEBIQ-0.8-GR2-RUS-004/005/006`
- `tokutei-katsudo-naitei-kyushoku-work-boundary`: `TEBIQ-0.8-GR2-RUS-007/008`
- `titp-ikusei-shuro-transition-boundary`: `TEBIQ-0.8-GR2-RUS-009/010`, with AQL caution on `010`
- `hsp2-not-automatic-not-pr`: `TEBIQ-0.8-GR2-RUS-011`
- `torikiji-applicant-responsibility-boundary`: `TEBIQ-0.8-GR2-RUS-012`

## Keep Out Of Deterministic Outcomes

Do not expand these as deterministic answer conclusions before DOMAIN review:

- 育成就労 2027-before/after practical application availability, transition, and transfer details.
- HSP income involving bonuses, overseas pay, group-company pay, stock/options, or variable compensation.
- 特定技能2号 sector-transfer details, care-sector alternatives, and family route substitutes.
- Individual 指定書 exceptions under 内定者/求職者 特定活動.
- Detailed 申請取次 eligibility by company/school/person type.

## Action

Loop2F may enter provider smoke once valid provider access is available. It still requires AQL close-read of generated answers before any 0.8 release claim.
