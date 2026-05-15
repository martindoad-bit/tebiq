# TEBIQ 0.8 Loop2L AQL / QA Review

Generated: 2026-05-15

Reviewer: AQL / QA sub-agent

Scope: read-only review of Loop2L permanent-residence / employment-obligation guardrail integration.

## Conclusion

Loop2L is suitable as deterministic coverage increment, but must not be treated as provider-answer safety proof by itself.

The 8/8 real-user coverage proves the new prompts hit the expected route gates. It does not prove broad real-world coverage or provider answer quality. Provider-backed smoke and DOMAIN pre-release review remain separate gates.

## P0

No immediate P0 engineering blocker was found, provided Loop2L is not used as proof that provider-backed answers are safe.

## P1 Findings

### P1-1 Terminal Policy

The four new Loop2L validator findings were initially P1 and recorded, but not terminal-gated by `selectTerminalGuardrailFindings`.

Risk: if a provider answer says permanent residence is only about years, permanent-resident card renewal is unnecessary, 技人国 requires fixed JLPT threshold, or foreign workers can opt out of social insurance, the answer could be persisted as completed unless terminal policy catches it.

Engineering response:

- Added these findings to terminal contradiction policy:
  - `answer-pr-years-only-or-public-obligations-irrelevant`
  - `answer-pr-card-renewal-not-needed-or-status-lost`
  - `answer-gijinkoku-jlpt-fixed-or-irrelevant`
  - `answer-foreign-worker-social-insurance-optional`
- Added test: `terminal-gates Loop2L high-risk answer contradictions`.

### P1-2 Coverage Self-Certification Risk

The original 8 prompts were all positive cases and used direct keywords. This was acceptable for route coverage, but too narrow for release confidence.

Engineering response:

- Added route-gate tests for unseparated 技人国 wording.
- Added implicit social-insurance question: `公司说不用给我交厚生年金，工资多发一点可以吗？`
- Added negative control: ordinary credit-card `PR活动` / card expiry does not trigger permanent-resident card guardrail.

### P1-3 Social Insurance Matcher Too Narrow

The social-insurance route gate originally required explicit foreign-worker identity words. Real TEBIQ users may ask with identity implicit.

Engineering response:

- Expanded matcher to include `会社 / 公司 / 雇主 / 老板 / 勤務先` in combination with social-insurance / pension terms.
- Expanded validator bad-answer patterns to catch wage-supplement / company non-enrollment substitution language.

### P1-4 技人国 Surface Form Gap

The route gate did not match unseparated Chinese/Japanese forms such as `技术人文知识国际业务` or `技術人文知識国際業務`.

Engineering response:

- Expanded route-gate and validator surface forms.
- Added tests for unseparated wording.

## P2 Findings

- Permanent-resident card matcher had over-trigger risk from bare `PR + card` language.

Engineering response:

- Removed bare `PR` from the permanent-resident card route gate trigger.
- Kept explicit residence-status forms such as `永住者`, `永住`, `永居`, `永久居留`, `PRカード`, `PR card`, and `permanent resident card`.
- Added negative control for ordinary credit-card context.

## Verification After Engineering Response

- `npm test`: passed, 160/160.
- Loop2L real-user route coverage: 8/8.

Full pre-release verification is recorded in:

```text
docs/eval/TEBIQ_0_8_LOOP2L_PR_AND_EMPLOYMENT_OBLIGATION_GUARDRAIL_INTEGRATION.md
```

## Provider Smoke Priority

Highest-priority provider smoke cases:

- company says no 厚生年金, salary increased instead;
- 技术人文知识国际业务 without N2;
- overseas-customer job where Japanese ability is framed as irrelevant;
- permanent residence as "basically years";
- late tax/pension remediated and framed as no impact;
- 永居卡 / PR card expiry vs status expiry;
- negative controls for ordinary credit cards and non-immigration PR language.

## Release Recommendation

Loop2L deterministic integration can be included in a limited pre-release candidate.

Do not declare 0.8 complete until:

- provider-backed answer smoke is run with valid provider env;
- DOMAIN pre-release safety review returns no P0 blocker;
- production admin smoke is repeated after deployment.
