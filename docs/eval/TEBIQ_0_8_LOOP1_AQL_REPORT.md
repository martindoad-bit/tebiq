# TEBIQ 0.8 Loop1 AQL Report

Generated: 2026-05-15

Role: TEBIQ 0.8 AQL sub-agent

Scope: AQL review of Loop1 real-user regression answers. This is an answer-quality release assessment, not a legal judgement and not a prediction of any immigration outcome.

Inputs read:

- `docs/eval/TEBIQ_0_8_AQL_ACCEPTANCE_AND_REGRESSION_PROTOCOL.md`
- `docs/eval/TEBIQ_0_8_LOOP1_EXEC_REPORT.md`
- `docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_NOTES.md`
- `/Users/martin/Documents/Codex/2026-05-14/codex-tebiq-codex-production-lead-ai/private-aql/tebiq-0.8-rur-loop1-aql.json`

Private package reread stamp:

- `exported_at`: `2026-05-14T16:23:33.513Z`
- 96 total cases, 96 answers present.
- 62 cases had `route_gate_ids` or `guardrail_findings`.
- AQL close-read all 62 flagged cases and targeted the remaining cases for the named high-risk traps. Old `raw_payload` evidence was not used for P0 judgement.

## Release Conclusion

Do not allow TEBIQ 0.8 public release/promotion from this Loop1 answer path.

Primary blockers:

1. One manual answer P0 remains: `TEBIQ-0.8-RUR-037` offers a `資格外活動`/J-Find workaround as a possible way to start employment before the proper work-status path is resolved.
2. Multiple unresolved P1s remain in critical route families: HSP institution-change route wording, high-risk truncations, missing fixed summary label, and deadline/material answers ending incomplete.

Internal iteration can continue, but 0.8 promotion should wait for fixes and rerun of affected row families.

## Coverage Summary

Route-gate coverage in the reread package:

| Route gate | Count |
|---|---:|
| `immigration-notice-taxonomy-first` | 39 |
| `special-period-two-month-boundary` | 10 |
| `hsp1-institution-change-permission-first` | 10 |
| `incomplete-materials-before-expiry-no-safe-bridge` | 7 |
| `national-tax-certificate-sono3-route` | 4 |
| `resident-tax-fiscal-year-january-1` | 2 |
| `j-skip-hard-eligibility-gate` | 2 |
| `work-qualification-certificate-not-permission` | 2 |

Automated guardrail findings in the reread package:

| Severity | Finding | Cases |
|---|---|---|
| P1 | `answer-no-terminal-punctuation` | `RUR-019`, `RUR-023`, `RUR-029`, `RUR-054` |
| P1 | `answer-missing-label-暂缓事项` | `RUR-085` |
| P2 | `answer-no-terminal-punctuation` | `RUR-046`, `RUR-056`, `RUR-060`, `RUR-065` |

Manual AQL overrides:

- `RUR-033`: PASS for J-Skip hard gate. The answer rejects 1200万 J-Skip and routes to ordinary HSP points.
- `RUR-041`: PASS as answer quality and automated guardrail. The answer says not to treat `就労資格証明書` as permission, and the latest package no longer reports a P0 finding.
- `RUR-065`: escalated from automated P2 to AQL P1 because the answer ends immediately after opening the core `経営管理` to `技人国` activity-basis explanation.

## Findings

| Severity | Case | Topic family | Issue summary | Answer problem | Owner attribution | Release blocking |
|---|---|---|---|---|---|---|
| P0 | `TEBIQ-0.8-RUR-037` | J-Skip/HSP/J-Find | J-Find workaround for employment start | The answer correctly says J-Find can change directly to HSP, but then offers a fallback to apply for 技人国 while using J-Find `資格外活動許可` to start employment. This is too close to the known P0 pattern of softening a pending employment-status change into a workaround. | DOMAIN primary; PROMPT secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-035` | J-Skip/HSP/J-Find | HSP1 institution-change route ambiguity | The answer preserves the "do not start work" boundary, but suggests confirming `指定書変更許可申請` "or" getting `就労資格証明書`. For HSP1 institution change, certificate language must not appear as an alternate route. It also has a visible "12天" typo where the user asked about 14 days. | DOMAIN primary; PROMPT secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-019` | 补件 | Truncated public-obligation answer | The answer ends after the health-insurance proof section with a dangling markdown marker. The user asked which年金/健保 documents and periods to prepare; the final action block is missing. | ENGINE primary; PRODUCT COPY secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-023` | 补件 / 经管转技人国 | Truncated company-status补件 answer | The answer safely warns not to file a new 休業届 just to make things look clear, but ends after "除非你的行政书士看过全部资料后". This cuts off the professional-boundary caveat in a high-risk company-disposition case. | ENGINE primary; PROMPT secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-029` | 税/年金/健保 | Truncated pension-special-exemption answer | The answer distinguishes 学生納付特例 from 未納, but ends at "下一步：登录ねんきん". The user loses the concrete next action and evidence pack. | ENGINE primary; PRODUCT COPY secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-054` | 日配/永配离婚再婚死别 | Truncated family-status answer | The answer reaches the 14-day届出 action but cuts off before completing the filing path. This is a high-risk family/dependent status case. | ENGINE primary; PRODUCT COPY secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-065` | 经管转技人国/HSP | Truncated core route explanation | The answer says not to wait for company liquidation, then stops at the core explanation of what matters in `経営管理` to `技人国` change. Automated severity was P2, but AQL treats this as P1 because it is a critical route family. | ENGINE primary; DOMAIN secondary | Yes |
| P1 | `TEBIQ-0.8-RUR-085` | 材料清单使用 | Missing fixed summary label | The answer lacks `暂缓事项`. The substance is mostly safe, but the fixed four-label contract is a 0.8 answer requirement and this was caught by validator. | PROMPT primary; ENGINE secondary | Yes |
| P2 | `TEBIQ-0.8-RUR-046` | 换工作 | Low-impact truncation | The answer safely says not to start first and ask later, but the materials list cuts off at `派遣`. Core safety is preserved. | ENGINE primary | No |
| P2 | `TEBIQ-0.8-RUR-056` | 日配/永配离婚再婚死别 | Low-impact truncation | The answer preserves work-scope and early route review after spouse death, but ends mid-risk sentence. | ENGINE primary | No |
| P2 | `TEBIQ-0.8-RUR-060` | DV | Low-impact truncation | The DV answer correctly prioritizes address protection and not contacting the abuser, but cuts off during the evidence-material list. | ENGINE primary; PRODUCT COPY secondary | No |
| P2 | `TEBIQ-0.8-RUR-064` | DV / 特例期间 | Special-period wording should be tightened | The answer says accepted change filing enters special period, but the endpoint wording should explicitly say "disposition or original expiry + two months, whichever earlier." Current phrasing is understandable but not protocol-tight. | PROMPT primary | No |
| P2 | `TEBIQ-0.8-RUR-087` | 材料清单使用 / 国税その3 | Wrong parenthetical for `その3` | The route is correct: tax office/e-Tax for national tax and city office for resident tax. But it calls `国税の納税証明書その3` "所得金額用"; that label belongs to a different certificate concept and can confuse window requests. | FACT primary; PRODUCT COPY secondary | No |
| P2 | `TEBIQ-0.8-RUR-093` | 经管转技人国/HSP | Company-disposition language too absolute | The answer safely tells the user not to ignore old-company facts, but phrases the route as old company activity needing to be "确实结束 / 活动实体消失." This can over-narrow the decision map and should be softened into fact-table preparation plus professional review. | DOMAIN primary; PROMPT secondary | No |

## Named Trap Review

### 特例期间两个月

General result: mostly pass.

The answers for `RUR-001`, `RUR-003`, `RUR-005`, `RUR-006`, `RUR-011`, `RUR-080`, and `RUR-089` preserve the hard endpoint as disposition or original expiry plus two months. No manual P0 was found for "审查中就一直合法." `RUR-064` needs P2 wording tightening on "whichever earlier."

### 国税その3

General result: route pass with one copy/fact defect.

`RUR-018`, `RUR-031`, and `RUR-087` correctly route national-tax `その3` to 税務署/e-Tax and distinguish municipal resident tax. `RUR-087` should not describe `その3` as "所得金額用."

### J-Skip

General result: J-Skip hard gate passed.

`RUR-033` rejects 1200万 and `RUR-034` rejects 1600万 for J-Skip. No J-Skip false positive should be counted from old raw payload. The release blocker in this family is instead `RUR-037`, where J-Find/qualification-outside-activity is used as a possible employment-start bridge.

### HSP1 Institution Change

General result: not release-ready.

`RUR-039` and `RUR-090` correctly state permission before new HSP1 activity and reject 14-day届出 as a substitute. `RUR-035` has route ambiguity by mentioning `就労資格証明書` as an alternate confirmation path in the action line. This needs a hard skeleton: permission/change route first, certificate only as evidence if applicable and never as authorization.

### 就労資格証明書

General result: pass.

`RUR-041` explains that the certificate is scope evidence, not new-work permission. The latest private package no longer reports the old automated P0 false positive.

### Notice Taxonomy

General result: mostly pass.

The notice-state answers (`RUR-073` to `RUR-080`, `RUR-091`) generally ask for title, deadline, action line, and distinguish postcard/receipt/upload from final permission. No manual notice-taxonomy P0/P1 was found, though the family remains dependent on exact wording extraction.

### Materials Not Complete

General result: safe direction, but release blocked by truncation.

`RUR-017`, `RUR-020`, `RUR-021`, `RUR-024`, `RUR-089`, `RUR-092`, and `RUR-094` generally avoid the unsafe "just submit anything and you are protected" pattern. The answer skeleton correctly says to contact the 담당/window, preserve proof, and avoid assuming incomplete materials create special-period protection. However `RUR-019`, `RUR-023`, and `RUR-065` show that incomplete output can still remove essential final steps.

### Fixed Titles And Truncation

General result: fail for 0.8 promotion.

The fixed-label contract is not stable enough. `RUR-085` misses `暂缓事项`, and eight answers have terminal punctuation/truncation findings. Several are high-risk enough to be P1. This is an answer-path reliability issue, not only style.

## Required Fixes Before Rerun

1. Patch the J-Find/HSP/employment transition skeleton to prohibit `資格外活動` as a bridge to start full-time or substantive new employment while a change path is unresolved.
2. Patch HSP1 institution-change wording so `就労資格証明書` never appears as an alternate to permission/change approval.
3. Fix stream/terminal handling so truncated answers cannot persist as completed answers in Eval Lab sidecars.
4. Fix the fixed-label output contract so `先看这里 / 当前判断 / 建议动作 / 暂缓事项` always appear.
5. Correct `国税その3` copy so it is described as the national-tax no-unpaid-tax certificate, not income-amount proof.

## Rerun Requirement

Before any 0.8 promotion decision, rerun at minimum these families:

- J-Find / employment start / qualification-outside-activity: include `RUR-036`, `RUR-037`, `RUR-024`, and a new "pending change + employer wants start" row.
- HSP1 institution change: include `RUR-035`, `RUR-039`, `RUR-090`.
- 就労資格証明書 regression: include `RUR-041` and one affirmative bad-answer fixture to preserve negation-aware matching.
- Truncation/fixed-label canary: rerun all cases with current terminal punctuation or missing-label findings.
- 国税その3 copy: rerun `RUR-018`, `RUR-031`, `RUR-087`.

Acceptance for rerun:

- 0 manual P0.
- 0 automated P0.
- 0 unresolved P1 in special period, J-Skip/HSP/J-Find, HSP institution change, employment start, tax route, notice taxonomy, family/DV, company disposition, and fixed-title/truncation families.
