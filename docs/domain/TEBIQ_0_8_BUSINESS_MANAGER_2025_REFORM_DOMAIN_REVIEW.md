# TEBIQ 0.8 Business Manager 2025 Reform DOMAIN Review

Review date: 2026-05-15
Reviewer role: 在留资格语义复核 / 行政书士助理型审查者
Scope: pre-release semantic safety review for 経営・管理 2025 reform facts and user routes.

## Executive Conclusion

Current business-manager reform cards must not be injected wholesale as positive-answer facts for 0.8.

They may be used as:

- high-risk negative boundaries;
- route-gate context;
- professional-confirmation routing;
- prompts to collect missing dates, status type, and application type.

The main issue is not a single wrong number. The unsafe pattern is mixing:

- pre-reform criteria;
- post-2025-10-16 criteria;
- existing-holder renewal transition;
- 特定活動 44号 / 51号 transition rules;
- evidence documents vs eligibility criteria.

## Official Sources Checked

- ISA reform page: https://www.moj.go.jp/isa/applications/resources/10_00237.html
- ISA reform overview PDF: https://www.moj.go.jp/isa/content/001448231
- ISA reform guideline PDF: https://www.moj.go.jp/isa/content/001448070.pdf

## Unsafe Statements

| statement | DOMAIN judgment |
|---|---|
| 500万円 has no official/source basis at all | Unsafe. The official overview identifies 500万円 as a previous requirement context. Safe wording: 500万円 belongs to pre-reform context and must not be used as the ordinary post-2025-10-16 rule. |
| Current rule is 3000万円 or two full-time employees | P0 unsafe. This mixes old substitute structure with new criteria. |
| 3000万円 is enough / guarantees permission | P0 unsafe. It is only one criterion. Other criteria include full-time employee, Japanese ability, business/education background, expert-reviewed business plan, office, activity substance, and compliance records. |
| One full-time employee and two full-time employees are interchangeable | P0 unsafe. New ordinary application context uses one or more eligible full-time employees. Two-employee language belongs to old structure and should not enter current positive answer. |
| Any full-time employee counts | P0 unsafe. The business-scale full-time employee category is limited to Japanese nationals, special permanent residents, and Table II status holders. Table I status holders do not count for that staffing criterion. The Japanese-ability criterion uses a different scope and must not be conflated. |
| Existing business-manager holders must immediately satisfy 3000万円 at renewal | P0 unsafe. Existing holders have transition treatment before the three-year post-enforcement point. |
| Transition period means renewal is safe / no need to satisfy the new criteria | P0 unsafe. Transition is not an exemption. Business condition and prospect of meeting the new criteria remain relevant. |
| Startup special activity always follows old rule or always follows new rule | P0/P1 unsafe. 44号 and 51号 have different transition routes and dates. |
| Company dormancy/closure then change to HSP/Gijinkoku is a safe shortcut | P0 unsafe. This may implicate activity non-performance, cancellation risk, company/tax handling, and status-change eligibility. |

## Safe Route Semantics

| user wording | route label | safe semantic boundary |
|---|---|---|
| 500万能不能办经管 | need_more_facts + professional_confirmation | Do not answer "500万円 is enough." First identify application type, filing date, current status, and whether a transition rule applies. |
| 现在是不是3000万 | general_direction | For ordinary post-2025-10-16 new/change context, 3000万円 is a core threshold, but not the only condition. |
| 已经有经管要续签怎么办 | need_more_facts + professional_confirmation | Existing-holder renewal is not the same as a new application. Transition treatment may apply, but it does not guarantee renewal. |
| 公司休眠/注销后转高才/技人国怎么办 | professional_confirmation | Treat as high-risk company-disposition and activity-status issue. Do not recommend a fixed sequence. |
| startup visa / 创业特定活动转经管 | need_more_facts | First identify whether it is 特定活動44号, 51号, or another startup-related designated activity. Do not generalize. |

## Must Not Say

- 现在经营管理还是500万就能办。
- 3000万和2名常勤二选一。
- 有3000万就一定许可。
- 既存经管也马上必须凑齐3000万，否则续不了。
- 过渡期内不用满足也没事。
- 特定活动转经管一律走旧基准或一律走新基准。
- 公司休眠或注销后，直接转技人国/高才即可。
- AI can judge permission outcome without professional review.

## Safe Wording

- 按当前官方改正信息，2025年10月16日以后的一般新规申请/在留资格变更，不能再按“500万即可”理解。
- 3000万是重要条件之一，但经管不是只看资金；还要看常勤职员、申请人经历或学历、日语能力、事业计划、事务所和实际经营。
- 如果你已经持有经管并申请更新，和新申请不是同一条路；过渡期间会综合看经营状况和改善见通し。
- 如果涉及特定活动44号/51号，需要先确认具体告示号和关键日期，再判断适用旧基准还是新基准。
- 公司已经停业、休眠或准备注销时，先不要把它当成普通转签问题；这可能同时涉及经管活动实态、取消风险、更新/变更可否和税社保处理。

## 0.8 DOMAIN Blockers

P0:

- Business-manager old/new rule separation: remove "500万円 has no basis", "3000万円 or 2 employees", and one/two employee conflation.
- Existing-holder renewal transition: block both "immediate full new criteria or impossible" and "transition guarantees renewal".
- 特定活動44号/51号 to business manager: route separately.
- Company dormancy/closure before HSP/Gijinkoku change: route as deep-water status/company disposition risk.

P1:

- Use the official phrasing for the transition endpoint: 施行日から3年を経過する日（2028年10月16日）までの間.
- Separate full-time employee scope for business-scale criterion from the person used for Japanese-ability proof.
- Update business-plan expert confirmation from "uncertain" to confirmed source-backed requirement where applicable.
- Keep materials-tab checklists separate from permission-likelihood wording.

## Engineering Response

Implemented in runtime safety layer:

- route gate: `business-manager-2025-reform-hard-fact-boundary`;
- answer validator: `answer-business-manager-2025-reform-mixed-hard-facts`;
- tests for:
  - old 500万円 shortcut language;
  - false "500万円 has no source" language;
  - mixed "3000万円 or 2 employees" language;
  - safe old/new/transition-separated wording.

This does not make the business-manager cards production-positive. It only prevents the most dangerous mixed-hard-fact outputs while FACT audit and DOMAIN route review continue.
