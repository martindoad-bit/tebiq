# TEBIQ 0.8 FACT Audit — Business Manager 2025 Reform

Audit date: 2026-05-15
Scope: 経営・管理 2025 reform hard facts before 0.8 release.
Result: P0 quarantine for current G57/G103 positive-answer use.

## Executive Conclusion

Current G57 / G103 business-manager reform cards contain P0 mixed old/new rule errors and must not enter production fact injection as positive answer material.

Runtime can keep a narrow guardrail:

- block "500万円 is still enough";
- block "500万円 has no source at all";
- block "3000万円 or 2 employees";
- block "one employee alone is enough";
- force existing-holder / startup-designated-activity transition routing.

## Official Sources

- ISA reform page: https://www.moj.go.jp/isa/applications/resources/10_00237.html
- e-Gov landing criteria ordinance: https://laws.e-gov.go.jp/law/402M50000010016
- e-Gov API: https://laws.e-gov.go.jp/api/1/lawdata/402M50000010016
- ISA business-manager status page: https://www.moj.go.jp/isa/applications/status/businessmanager.html
- ISA reform guideline PDF: https://www.moj.go.jp/isa/content/001448070.pdf

## Verified Facts

- Effective date: 2025-10-16.
- Post-reform: one or more full-time employees is required.
- Post-reform: 3,000万円以上 of capital etc. is required.
- This is not "3,000万円 OR one/two full-time employees."
- Full-time employee scope for the employment criterion is limited to Japanese nationals, special permanent residents, and Table II status holders. Table I status holders do not count for this employment criterion.
- Japanese ability requirement: applicant or full-time employee needs B2-equivalent ability; official paths include JLPT N2, BJT 400, 20 years as a mid/long-term resident, Japanese higher education graduation, Japanese compulsory education + high school graduation.
- Background requirement: applicant needs relevant doctorate/master/professional degree or at least three years' business management/administration experience.
- Business plan: at status decision, the business plan needs expert confirmation by 中小企業診断士, 公認会計士, 税理士, etc.
- Transition: applications accepted by 2025-10-15 and still under review use pre-reform criteria.
- Existing-holder renewal: until 2028-10-16, even if not fully conforming to new criteria, ISA judges based on business condition and prospect of meeting the new criteria. After 2028-10-16, new criteria generally apply, while official notes still mention comprehensive factors such as good business condition, corporate-tax compliance, and prospect of meeting criteria before next renewal.

## Error List

| id | local position | issue | error type | production disposition |
|---|---|---|---|---|
| KEIEI-P0-001 | `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keieikanri-joken-shorei.md` | "3,000万円 OR one or more full-time employees" appears as post-reform structure. | wrong_fact / mixed_old_new_rule | quarantined |
| KEIEI-P0-002 | same file | Source refs and body repeatedly use old "2 full-time employees OR 3,000万円" structure for the post-reform card. | mixed_old_new_rule | quarantined |
| KEIEI-P0-003 | same file | "500万円 source/basis unconfirmed" is overbroad; 500万円 exists as previous-requirement context in the official reform overview. | wrong_fact / source_gap | needs_domain |
| KEIEI-P0-004 | same file | Japanese-equivalent remuneration appears as a current hard landing criterion without renewed source confirmation. | source_gap / overgeneralized | needs_domain |
| KEIEI-P0-005 | same file | Safe answer omits 2025-10-16, 2028-10-16, existing-holder transition, Japanese ability, background, and expert business-plan confirmation. | transition_missing / source_gap | quarantined |
| KEIEI-P0-006 | `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md` | Same "3,000万円 OR two employees" mixed-rule statement appears. | mixed_old_new_rule | quarantined |
| KEIEI-P1-007 | `docs/fact-cards/keiei-kanri-capital-asset-3000man-criterion.md` | "business property total includes capital/investment" can mislead corporate applicants into including capital reserves, retained earnings, wages, or office costs. | overgeneralized | guardrail_only |
| KEIEI-P0-008 | `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md` | Progress summary repeated the mixed old/new G57/G103 claims, risking downstream reviewer contamination. | mixed_old_new_rule | quarantined |

## Safe Facts To Retain

- Do not say "500万円 is enough" for ordinary post-2025-10-16 business-manager applications/changes.
- Company formation does not automatically grant business-manager residence status.
- Post-2025-10-16 new criteria include 3,000万円以上 capital etc., but that fact must appear with the full criteria matrix.
- Existing business-manager holders are not automatically forced to fully meet the new criteria on 2025-10-16, but transition treatment is not a guarantee.

## Runtime Response

Already implemented:

- route gate: `business-manager-2025-reform-hard-fact-boundary`;
- validator: `answer-business-manager-2025-reform-mixed-hard-facts`;
- real-user coverage pack: `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json`.

Current runtime position:

- Use business-manager reform facts as guardrails only.
- Do not present G57/G103 as a positive eligibility card until rewritten and re-reviewed.

## Next 10 Hard-Fact Audit Topics

1. Full business-manager 2025 reform eligibility matrix.
2. Business-manager transition rules: 2025-10-15, 2025-10-16, 2028-10-16, existing holders, pending applications.
3. Source and current boundary of the old 500万円 criterion.
4. 3,000万円 calculation: corporation vs sole proprietor; capital reserves, retained earnings, wages, equipment, office expenses.
5. Full-time employee definition: eligible statuses, 30h/5 days/217 days, dispatch/secondment/contract exclusions.
6. Business-manager reform impact on HSP1-ha, HSP2, and permanent-residence routes.
7. 特定活動44号/51号 to business-manager transition.
8. Business-manager renewal documents around tax, labor, social insurance, public dues.
9. 2026-04-15 additional materials on `businessmanager.html`.
10. Business-manager office rules: home office, shared office, fixed facility, sufficient area.
