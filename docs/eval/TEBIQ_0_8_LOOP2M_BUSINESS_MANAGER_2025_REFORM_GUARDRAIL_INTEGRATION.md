# TEBIQ 0.8 Loop2M Business Manager 2025 Reform Guardrail Integration

Date: 2026-05-15
Scope: respond to FACT/DOMAIN discovery that business-manager 2025 reform cards mixed old and new criteria.

## 1. Problem

The existing local business-manager reform facts contained a P0 mixed-rule error:

- old 500万円 context was treated as if it had no source at all;
- post-2025-10-16 criteria were mixed with old "3,000万円 or two full-time employees" structure;
- existing-holder renewal transition was under-specified;
- 特定活動44号/51号 transition was not safely separated;
- 3,000万円 was at risk of being used as a standalone positive eligibility fact.

This made G57/G103 unsafe for positive production answer injection.

## 2. Inputs

DOMAIN review:

```text
docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md
```

FACT audit:

```text
docs/fact-cards/audit/TEBIQ_0_8_FACT_AUDIT_BUSINESS_MANAGER_2025_REFORM.md
```

Quarantined local cards:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md
docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md
```

## 3. Engineering Changes

Added route gate:

- `business-manager-2025-reform-hard-fact-boundary`

Added answer validator:

- `answer-business-manager-2025-reform-mixed-hard-facts`

The validator catches:

- "500万円 is enough" for current business-manager application;
- "500万円 has no source at all";
- "3,000万円 or 2 employees";
- "one employee alone is enough";
- "transition means existing holders can ignore the new rule".

The route gate forces the answer to ask/check:

- application type: new / change / renewal / existing holder;
- filing date before/after 2025-10-16;
- whether existing-holder renewal falls before the 2028-10-16 transition point;
- whether 特定活動44号/51号 transition applies;
- whether the user asks eligibility or document checklist.

## 4. Document Quarantine

Updated:

- G57 state: `quarantined`;
- G103 state: `quarantined`;
- 3,000万円 card state: `guardrail_only`;
- `FACT_PROGRESS.md` G57/G103 summaries rewritten as quarantine warnings.

This prevents downstream windows from treating the old summaries as production-safe.

## 5. Real-User Coverage

Added:

```text
docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json
```

Coverage includes:

- old 500万円 myth;
- 3,000万円 / employee-count confusion;
- existing-holder renewal transition;
- startup designated activity transition;
- company dormancy/closure before status change;
- full-time employee scope confusion;
- 3000万円 is not a guarantee;
- full-time employee timing before/after application;
- startup designated activity number/date uncertainty;
- existing-holder transition is not a safe-renewal guarantee.

Real User Simulator reviewed the first 6 prompts, found them realistic, and recommended expanding into the added natural-language prompts. The final Loop2M pack contains 14 prompts.

## 6. AQL / QA Review Response

AQL found four P0 deterministic gaps and one P1 false-positive risk:

- missing validator coverage for "existing holders must immediately satisfy all new criteria or cannot renew";
- missing validator coverage for "3000万円 alone is enough / basically safe";
- missing validator coverage for one-size-fits-all 特定活動44号/51号 transition answers;
- missing validator coverage for counting 技人国 / 留学 / 特定技能 / arbitrary foreign workers as the new business-manager full-time employee;
- business-manager company-disposition route gate was too broad and could catch ordinary company-sponsored Gijinkoku changes.

Engineering response:

- expanded `answer-business-manager-2025-reform-mixed-hard-facts`;
- added tests for all four P0 patterns;
- narrowed `business-manager-disposition-no-auto-success` to require business-manager + company-disposition + transition/update terms;
- added a negative-control test for ordinary company-sponsored Gijinkoku change.

## 7. Verification

Commands run:

```text
npm test
npx tsx scripts/eval/check-guardrail-real-user-coverage.ts --input=docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json
```

Results:

- `npm test`: passed, 171/171.
- Loop2M real-user route coverage: passed, 14/14.
- `npm run build`: passed after Loop2M.
- Local production smoke on `127.0.0.1:3010`: quick-reference / topic / material / Eval Lab returned 200; admin pages and admin APIs failed closed without the correct `ADMIN_KEY`; correct `ADMIN_KEY` returned 200.

## 8. Not Proven

This loop does not make the business-manager reform cards production-positive.

Still not proven:

- provider-backed answers do the right thing in all business-manager reform cases;
- rewritten FACT cards pass a full second review;
- DOMAIN has approved the final positive route wording for 特定活動44号/51号 transitions and existing-holder renewal.

## 9. Current Release Position

For 0.8, business-manager 2025 reform should remain:

- `guardrail_only` for unsafe myths;
- `professional_confirmation` for positive route decisions;
- not a positive deterministic eligibility answer.

0.8 can only ship this area as a safety improvement, not as a full business-manager reform advisory product.
