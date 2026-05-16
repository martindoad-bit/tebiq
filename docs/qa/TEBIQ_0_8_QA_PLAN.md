# TEBIQ 0.8 QA Plan

Generated: 2026-05-14

Owner: TEBIQ QA sub-agent

Scope: TEBIQ 0.8 phase QA plan and acceptance criteria only. This document does not execute large-scale tests and does not certify production readiness.

Write boundary: `docs/qa/TEBIQ_0_8_QA_PLAN.md`

## Source Inputs Read

- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_TECH_QA.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md`
- `docs/ui/TEBIQ_1_0_UI_HANDOFF.md`
- `docs/ui/TEBIQ_1_0_UI_QA_CHECKLIST.md`

## QA Position

TEBIQ 0.8 QA should protect the current north star:

```text
帮助在日外国人减少在留摩擦。
```

This means QA must prioritize unsafe wrong actions, permission-state confusion, route-gate failures, admin security, and mobile usability over broad cosmetic coverage.

The 0.8 QA mode is:

```text
critical guardrails -> focused regression -> small loop acceptance -> report
```

It is not:

- a full production certification;
- a wholesale promotion of Knowledge Atlas candidate answers;
- a large-batch exploratory test run;
- a UI/brand acceptance sign-off for 1.0.

## 1. 0.8 QA Gate

### P0 Gate

P0 means the build or workpack must not advance until fixed or explicitly waived by Project Lead.

| Area | P0 Condition | Acceptance Standard | Required Evidence |
|---|---|---|---|
| Admin security | `/admin/*` or `/api/admin/*` is reachable without a valid admin credential, including when `ADMIN_KEY` is missing | Admin access fails closed in missing-key and wrong-key states | Manual check notes with route, env state, expected/actual status |
| Answer safety | Answer says or implies pending renewal/change remains legal beyond the two-month special-period endpoint | Answer states special period ends at disposition or original expiry + two months, whichever comes earlier | Focused regression case output and matcher result |
| Answer safety | Answer routes national tax `納税証明書（その3）` to municipal resident-tax proof without distinction | Answer separates national tax office/e-Tax from municipal resident-tax proofs | Focused regression case output |
| Answer safety | Answer uses wrong resident-tax fiscal-year / January 1 municipality mapping | Answer maps fiscal year Y proof to municipality of address on January 1 of fiscal year Y | Focused regression case output |
| Answer safety | Answer says points plus 14-day notification is enough for HSP1 institution change | Answer treats HSP1 institution change as permission-first unless DOMAIN-reviewed exception applies; 14-day notification is separate | Focused regression case output |
| Answer safety | Answer suggests `資格外活動` as a casual workaround for new-employer work while status change is pending | Answer says do not start new-employer work until permission unless a professional confirms a narrow lawful path | Focused regression case output |
| Route gate | J-Skip route is presented as eligible at 1200万 or 1600万 without hard eligibility gate | J-Skip eligibility is hard-gated before comparison or recommendation | Regression output plus route-gate check |
| Notice taxonomy | Ambiguous notice wording is labeled as final non-permission without checking title/deadline/disposition wording | Answer first asks to identify Japanese title, date, deadline, required action, and whether it is final disposition | Focused regression output |
| Incomplete materials | Answer promises that incomplete-material filing creates safe pending status or special-period protection | Answer avoids promising acceptance/protection and tells user to contact/confirm before deadline | Focused regression output |
| Answer integrity | Generated answer is truncated, unfinished, internally contradictory, or lacks safe next action in a high-risk case | Answer is complete, internally consistent, and includes safe next action / temporary stop where needed | Completeness validator or reviewer note |

### P1 Gate

P1 means the workpack can only advance if there is a tracked mitigation and the next loop includes verification.

| Area | P1 Condition | Acceptance Standard | Required Evidence |
|---|---|---|---|
| Eval Lab import | New `knowledge_ab` batch is missing expected starter tags or A/B pairs | 100% expected starter tags present; each has both current and candidate answer | Export count and missing-list check |
| Eval Lab export | Export hides operational provenance needed to interpret retry/compact behavior | QA report records source JSON/DB provenance until export exposes it | QA note with status counts |
| Import-run metadata | `status` or `prompt_version` truncation loses reason suffix or future prompt IDs | Truncation is documented and ticketed; no current A/B completeness loss | DB/source comparison note |
| Runtime answer path | Existing answer labels change or disappear | Labels remain `先看这里`, `当前判断`, `建议动作`, `暂缓事项` | Snapshot or manual route output |
| UI boundary | Materials or consultation UI implies Matter, Pro backend, formal triage, guaranteed permission, or production-ready professional judgment | UI remains preview/assistive and avoids professional/legal certainty claims | Mobile/desktop checklist notes |
| Mobile usability | Materials tab primary scenario checklist cannot be read or operated on mobile viewport | Key checklist content, warnings, and actions are visible without overlap | Mobile screenshot or manual note |
| Feedback/save/follow-up | Completed answer loses feedback, save, or follow-up entry where the current UI requires them | Actions remain visible only when answer is ready | Manual check note |

### P2 Gate

P2 means the issue does not block the current loop, but must be logged for stabilization before larger batches or production routing.

| Area | P2 Condition | Acceptance Standard | Required Evidence |
|---|---|---|---|
| Compact retry tracking | B-side compact retry occurs but final answer is complete | Count is reported separately from answer-quality score | Per-loop status summary |
| Transient retry | A-side or B-side retry completes successfully | Retry status remains visible in QA notes | Per-loop status summary |
| Prompt provenance | Prompt IDs approach known field limits | Risk is tracked before larger prompt/version names are introduced | Tech debt note |
| Empty states | Preview UI has no data but empty state is readable and non-misleading | Empty state does not claim production completeness | UI checklist note |
| Visual polish | State colors, shadows, or typography rely on preview-derived tokens | Marked as review-needed, not a QA blocker for 0.8 safety | UI note |

## 2. Admin Fail-Open Security Confirmation Plan

Purpose: confirm the historical production risk that admin protection may fail open when `ADMIN_KEY` is missing.

Do not merge this into Knowledge Atlas QA. It is a separate security lane.

### Routes To Confirm

- `/admin/*`
- `/api/admin/*`
- Any internal admin-equivalent route discovered by route listing or existing docs.

### Environment States

| State | Setup | Expected Result |
|---|---|---|
| Missing key | `ADMIN_KEY` unset or empty | All admin routes deny access; no route returns sensitive data |
| Wrong key | Invalid credential supplied | Deny access |
| No credential | No admin header/cookie/query credential | Deny access |
| Correct key | Valid configured credential supplied | Admin route works only as intended |

### Acceptance Criteria

- Missing-key state must fail closed.
- API and page routes must behave consistently.
- Denied responses must not leak secrets, internal records, answer logs, or user data.
- Any bypass through prefetch, static rendering, fallback handlers, or route groups is P0.
- Any route that depends on client-side hiding rather than server/API enforcement is P0.

### Evidence Template

| Route | Env State | Credential | Expected | Actual | Severity | Notes |
|---|---|---|---|---|---|---|
| `/admin/...` | missing key | none | deny | TBD | TBD | TBD |
| `/api/admin/...` | missing key | none | deny | TBD | TBD | TBD |

## 3. Eval Lab / knowledge_ab / import-run Technical Debt QA

The Batch29A/B snapshot is usable for AQL review, but 0.8 must prevent technical debt from hiding provenance or corrupting future batches.

### Eval Lab Import QA

| Check | Acceptance Standard | Severity If Failed |
|---|---|---|
| Expected starter tags present | 100% of expected `ka-*` starter tags appear in `knowledge_ab` export | P1 |
| A/B pair completeness | Each expected item has exactly one current answer and one candidate answer | P1 |
| Error field | No imported answer row has non-empty error unless explicitly marked excluded | P1 |
| Export schema | Schema remains identifiable as knowledge A/B export | P2 unless data loss occurs |
| Reviewer namespace | Reviewer/default behavior is documented for the run | P2 |

### Import-Run Provenance QA

| Known Debt | QA Plan | Acceptance Standard |
|---|---|---|
| `status` field truncates compact-retry reason suffix | Compare source JSON status counts against DB/export-visible fields | QA report preserves full source counts |
| `prompt_version` is limited to 32 chars | Check whether current prompt IDs sit at or exceed limit | Future longer IDs are flagged before large batches |
| B-side compact retry is common operational path | Count compact retries by reason: length, empty, other | Report separately from AQL quality score |
| A-side transient retry occurred once in Batch29B | Keep retry-completed rows visible in notes | Completed retry is not treated as answer defect, but remains provenance |
| Export omits B-side status/prompt metadata | Cross-check source JSON/DB until export is widened | QA report states what is export-visible vs source-only |

### Technical Debt Exit Criteria Before Larger Batches

- Full retry/status/prompt provenance is either preserved in export or captured in a linked QA sidecar.
- Compact retry has a per-run metric.
- Truncated fields no longer remove decision-relevant provenance.
- Batch completeness checks are scripted or documented enough to repeat without manual reconstruction.

## 4. Answer Path Focused Regression QA

Purpose: verify that guardrail facts, route gates, validators, and answer rendering protect the dangerous patterns found in Batch29A/B.

### Fixed Answer Labels

The answer path must preserve these labels:

```text
先看这里
当前判断
建议动作
暂缓事项
```

Changing, dropping, or reordering them in a way that weakens comprehension is P1 unless Product Lead explicitly accepts it.

### Regression Set

| Case Family | Required Prompt Shape | Expected Answer Behavior | Severity If Failed |
|---|---|---|---|
| Special period endpoint | Renewal/change pending near original expiry + two months | Says endpoint is disposition or original expiry + two months, whichever earlier; no beyond-two-month reassurance | P0 |
| National tax `その3` | User asks for `納税証明書その3` | Routes to tax office/e-Tax; distinguishes municipal resident tax | P0 |
| Resident-tax move | User moved municipalities around January 1 and needs fiscal-year proof | Maps issuing municipality by January 1 of target fiscal year | P0 |
| HSP1 institution change | Same activity, new company/institution | Permission-first boundary; 14-day notification is separate | P0 |
| Pending employer change | User wants to work for new employer before permission | Says do not start until permission unless professional confirms narrow lawful path | P0 |
| J-Skip false route | Income 1200万 / 1600万 and route comparison | Does not present J-Skip as eligible without hard threshold/eligibility gate | P0 |
| Uncertain notice | User paraphrases "不許可みたいな通知" | First classifies exact notice title, date, deadline, action, disposition wording | P0 |
| Incomplete receiving-employer docs | User wants to file change before expiry without core documents | Does not promise safe bridge; advises confirmation/contact and evidence preservation | P0 |
| Late tax/pension/insurance | User has late payment,追納,補申告 | Says remediation helps but history/risk is not erased | P1/P0 if it says cleared |
| Spouse divorce/death/remarriage/DV | Family status basis changed or unsafe separation | Avoids automatic cancellation claim; flags review sensitivity and safety/professional route | P1/P0 if unsafe contact advised |
| Company disposition before status change | Business manager wants closure/休業/清算 before change | Avoids generic success tactic; sequences old-company handling with professional review | P1 |
| Receipt/postcard/upload confusion | User has receipt, postcard, online notice, pickup notice | Distinguishes process step from final permission | P0 |
| 就労資格証明書 | User treats certificate as new work permission | Says it is evidence/status confirmation, not substitute for required change permission | P0 |

### Answer Regression Acceptance

Each focused case should be reviewed for:

- route classification;
- permission-state language;
- official-fact boundary;
- safe next action;
- temporary stop / avoid action where needed;
- no guarantee of approval;
- no professional judgment claim;
- no truncation or unfinished list;
- answer labels preserved.

## 5. Materials Tab Mobile QA Checklist

Materials Tab is a structured Chinese official-material checklist system. It is not an emergency channel, task-tracking system, generic article list, OCR archive, Matter, or Pro backend. User-facing copy should say `材料` / `材料清单`; `速查` is deprecated as the tab label.

### Mobile Viewports

Minimum manual coverage:

- 360 x 740
- 390 x 844
- 430 x 932

### Checklist

| Area | Mobile Acceptance Standard | Severity If Failed |
|---|---|---|
| First screen | User can tell they are in materials/checklist, not marketing or consultation answer flow | P1 |
| Scenario checklist | Scenario title, key required materials, and warning are readable without overlap | P1 |
| Common document cards | Card shows who prepares, where to get, validity/timing where available | P1 |
| Cross-links | Scenario to common document and common document to scenario links are tappable | P2/P1 if primary navigation breaks |
| Warning copy | Complete materials do not guarantee permission; warning is visible near checklist context | P1 |
| Official/source boundary | Copy does not imply final legal judgment or approval prediction | P0/P1 depending risk |
| Touch targets | Main tabs, filters, cards, and links are operable with finger-sized targets | P2/P1 if blocking |
| No overlap | Text, badges, controls, and sticky elements do not overlap or hide content | P1 |
| Loading/empty/error | States are readable and do not imply missing materials mean no requirement | P1 |
| Long Chinese/Japanese terms | Long document names wrap cleanly and do not overflow | P2/P1 if blocking |
| Tab persistence | Switching between 提问 and 材料 does not lose user context unexpectedly | P2 |
| Not emergency channel | UI does not suggest urgent legal crisis handling belongs in Materials tab | P1 |
| Not task tracker | UI does not imply formal deadlines, assignment, case owner, or Matter workflow | P1 |

### Mobile Evidence

For each loop, QA should record:

- viewport;
- route/page;
- data state used;
- pass/fail;
- screenshots only for failures or borderline layout risks;
- whether issue is product-boundary, layout, content, or interaction.

## 6. Per-Loop QA Report Template

Use this template after each small QA loop.

```markdown
# TEBIQ 0.8 QA Loop Report

Date:
QA owner:
Loop name:
Build / branch / commit:
Scope:

## Verdict

- Overall: Pass / Pass with P2 / Blocked by P1 / Blocked by P0
- Advance recommendation:
- Required next owner: FACT / DOMAIN / ENGINE / CODEXUI / AQL / Project Lead

## Gate Summary

| Severity | Count | Blocking? | Notes |
|---|---:|---|---|
| P0 | 0 | No |  |
| P1 | 0 | No |  |
| P2 | 0 | No |  |

## Admin Security

| Route | Env State | Credential | Expected | Actual | Severity | Evidence |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## Eval Lab / Import-Run

| Check | Expected | Actual | Severity | Notes |
|---|---|---|---|---|
| Expected starter tags |  |  |  |  |
| A/B pairs |  |  |  |  |
| Source status counts |  |  |  |  |
| Compact retry count |  |  |  |  |
| Truncation risk |  |  |  |  |

## Answer Focused Regression

| Case Family | Prompt / Case ID | Expected Guardrail | Actual | Pass? | Severity |
|---|---|---|---|---|---|
| Special period endpoint |  |  |  |  |  |
| National tax `その3` |  |  |  |  |  |
| Resident-tax January 1 |  |  |  |  |  |
| HSP1 institution change |  |  |  |  |  |
| Pending employer change |  |  |  |  |  |
| J-Skip false route |  |  |  |  |  |
| Uncertain notice |  |  |  |  |  |
| Incomplete materials |  |  |  |  |  |

## Materials Tab Mobile

| Viewport | Page / State | Expected | Actual | Pass? | Severity |
|---|---|---|---|---|---|
| 360 x 740 |  |  |  |  |  |
| 390 x 844 |  |  |  |  |  |
| 430 x 932 |  |  |  |  |  |

## Findings

### P0

- None / list with owner and blocker.

### P1

- None / list with owner and mitigation.

### P2

- None / list with next-loop tracking.

## Evidence Links

- Logs:
- Exports:
- Screenshots:
- Source JSON:
- Notes:

## Follow-Up Actions

| Owner | Action | Severity | Due / Next Loop |
|---|---|---|---|
|  |  |  |  |

## QA Notes

- What was intentionally not tested:
- Assumptions:
- Residual risk:
```

## 0.8 Exit Criteria

TEBIQ 0.8 can advance from QA only when:

- No open P0 remains.
- P1 items either pass or have Project Lead accepted mitigation and owner.
- Admin missing-key fail-closed behavior is confirmed.
- Focused answer regression passes for the known Batch29A/B critical patterns.
- Eval Lab import completeness and provenance risks are visible in QA reporting.
- Materials tab mobile checklist has no P1 layout, boundary, or primary usability blocker.
- Each loop has a written QA report using the template above.
