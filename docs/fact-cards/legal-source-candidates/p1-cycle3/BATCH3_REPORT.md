# P1 Cycle 3 Batch 3 Report — 特定技能申請・更新材料结构

**Date**: 2026-05-13
**Scope**: 特定技能 certificate/change/renewal material-table structure, applicant-side tax/social-insurance/pension materials, and field-table boundaries.
**State**: all 19 cards remain `ai_extracted`; no production injection.

## Cards Added

| Count | Area | Cards |
|---:|---|---|
| 4 | application table structure | `ssw-certificate-application-table-structure-source`, `ssw-change-application-table-structure-source`, `ssw-renewal-application-table2-not-required-source`, `ssw-renewal-field-table-three-way-source` |
| 6 | applicant and contract materials | `ssw1-certificate-change-table1-support-plan-required-source`, `ssw2-certificate-change-table1-support-plan-not-listed-source`, `ssw-table1-employment-contract-required-source`, `ssw-table1-employment-conditions-language-source`, `ssw-table1-health-check-required-source`, `ssw-table1-remuneration-explanation-conditional-source` |
| 5 | tax, insurance, pension, public obligations | `ssw-change-applicant-tax-docs-conditional-source`, `ssw-renewal-applicant-tax-docs-conditional-source`, `ssw-applicant-national-health-insurance-conditional-source`, `ssw-applicant-national-pension-conditional-source`, `ssw-public-obligation-pledge-arrears-source` |
| 4 | field, submitter, and permission boundaries | `ssw-field-docs-council-membership-source`, `ssw-agriculture-fishery-employment-type-table-source`, `ssw-submitter-identity-proof-source`, `ssw-change-renewal-materials-not-permission-guarantee-source` |

## Official Sources Used

- ISA 在留資格「特定技能」 page.
- ISA 「特定技能1号 / 2号」に係る提出書類一覧表 xlsx files for recognition, status change, and renewal.
- ISA renewal field tables for all fields except agriculture/fishery, agriculture, and fishery.

The material tables were checked from current official links on the ISA status page. The xlsx tables indicate `令和8年4月1日改定`.

## Main Product Meaning

This batch makes the 特定技能 material layer usable for checklist-style routing:

- recognition and status-change applications use applicant / organization / field tables;
- renewal applications do not use 第2表 in the status-page material structure;
- renewal field materials split into all-fields-except-agriculture/fishery, agriculture, and fishery;
- SSW1 support-plan materials and SSW2 materials must not be collapsed into one list;
- applicant-side tax, national health insurance, national pension, and public-obligation pledge questions become visible routing points instead of generic "bring tax documents" text.
- change/renewal material lists are separated from permission guarantees.

## DOMAIN Review Queue

- Whether the SSW2 "support plan not listed" card should remain a table-boundary card only, or become a broader legal-scope card.
- Tax, national health insurance, national pension, arrears, payment deferral, and pledge treatment in change/renewal outcomes.
- Agriculture/fishery dispatch material tables versus substantive dispatch eligibility.
- When 第2表 omission in renewal still leaves room for additional document requests.
- Whether field council membership evidence should be split into high-frequency field-specific cards in Batch 5.
- Whether the SSW-specific permission-boundary card should remain as a pointer to the general change/renewal guideline or be merged with the global card before promotion.

## AQL / QA Targets

- Positive coverage: 23 direct fixture questions.
- Negative coverage: generic tax, pension, health insurance, contract, agriculture, spouse, dependent-family, company-health-insurance, company-pension, and prior Batch 1/2 SSW questions.
- Production isolation: all 18 cards must remain dropped under production gate.
- User-visible text leakage: no internal workflow labels in title/citation/evidence/injection fields.
