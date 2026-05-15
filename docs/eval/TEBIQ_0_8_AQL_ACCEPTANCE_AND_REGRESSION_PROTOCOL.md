# TEBIQ 0.8 AQL Acceptance and Focused Regression Protocol

Generated: 2026-05-14

Owner: AQL sub-agent

Scope: define the answer-quality acceptance gates and focused regression protocol for TEBIQ 0.8. This document does not evaluate new answers and does not modify the original Batch29A/B reports.

References read:

- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29A_AQL_REPORT.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29B_AQL_REPORT.md`

## 1. 0.8 Answer Quality Gates

0.8 acceptance is not "candidate B wins A/B once." Acceptance means the system can repeatedly avoid the known dangerous failure modes while preserving usable next actions.

### P0 Gate: Release Blocker

Any P0 finding blocks promotion of the answer path or guardrail batch.

P0 definition:

- The answer tells the user to take, continue, or rely on an action that can directly create unlawful stay, unauthorized work, missed critical deadline, wrong route filing, or loss of a status basis.
- The answer converts a hard eligibility gate into a "maybe" route when the facts are already below threshold.
- The answer contradicts a known permission/status boundary in a way a normal user is likely to act on.

Known P0 patterns for 0.8:

- Pending renewal/change is treated as legal beyond original expiry + two months merely because review is still pending.
- J-Skip is presented as possible for 1200万 or 1600万 income where the hard route gate should reject it.
- HSP1 institution change is treated as covered by points sufficiency plus 14-day notification.
- A pending employment-status change is softened into "maybe start under 資格外活動" or other workaround language.
- Incomplete core materials are described as reliably creating a safe pending bridge before expiry.

P0 pass condition:

- 0 P0 across the full focused regression set.
- 0 P0 from automated high-severity matchers.
- Any P0 requires root-cause attribution, fix owner, and rerun of the affected row family before release.

### P1 Gate: High-Severity Quality Failure

Any unresolved P1 blocks 0.8 public promotion unless the release owner explicitly documents why the affected surface is disabled or unreachable.

P1 definition:

- The answer is directionally cautious but sends the user to the wrong office, wrong document route, wrong timeline, or wrong procedural classification.
- The answer overstates certainty in deep-water notice, family, DV, tax, pension, insurance, or company-disposition cases.
- The answer omits a necessary first action under deadline pressure.
- The answer is incomplete or truncated in a high-risk case.

Known P1 patterns for 0.8:

- `納税証明書（その3）` is routed to municipal resident tax instead of national tax office/e-Tax, unless the answer explicitly handles wording ambiguity.
- Resident-tax fiscal-year proof is mapped to the wrong January 1 municipality.
- Approximate notice wording such as "不許可みたい" is labeled as final non-permission before extracting title/deadline/disposition wording.
- `就労資格証明書` is described as equivalent to new work permission where change permission is required.
- Spouse death/divorce answers guarantee use until expiry without cancellation/review caveat.
- Old company closure/休業/清算 is recommended before status-change strategy is fixed.
- Deadline補件 answers say only "complete all at once" and fail to advise contacting the担当, preserving proof, or submitting obtainable materials only with permission/explanation.
- Answer ends mid-sentence, mid-list, or without the promised action block.

P1 pass condition:

- 0 unresolved P1 in critical route families: special period, J-Skip, HSP institution change, employment start, tax route, resident tax, notice state, family/DV, company disposition.
- At most 1 P1 in non-critical wording/UX cases per 50 focused rows, and only if it cannot lead to wrong action.
- All P1 findings must be attributed to an owner category and added to the regression backlog.

### P2 Gate: Improvement Required, Not Release-Blocking Alone

P2 issues do not block 0.8 by themselves, but recurring P2 clusters can become a P1 process failure.

P2 definition:

- The answer is safe but less usable, too verbose, over-cautious about harmless administrative steps, missing useful fact-pack structure, or weak in employer/school/user scripts.
- The answer lacks provenance, has awkward wording, or misses helpful sequencing while still preserving the hard boundary.
- The evaluation/export pipeline loses useful metadata without affecting answer correctness.

Known P2 patterns for 0.8:

- Overblocking ordinary non-activity onboarding paperwork.
- Missing compact "today / this week / before expiry / after permission" sequence.
- Missing fact-table templates for tax/pension/insurance gaps or company disposition.
- Missing B-side status/prompt provenance in Eval Lab export.
- Compact retry not tracked as an operational metric.

P2 pass condition:

- No repeated P2 cluster appears in more than 20% of a route family.
- P2 findings are triaged into PROMPT, UX, or ENGINEERING backlog, not allowed to silently accumulate.

## 2. Focused Regression Matrix

Focused regression is a small, adversarial suite. It exists to confirm known guardrails, not to measure general answer style.

Each row family should include at least:

- one clear-positive case;
- one boundary-negative case;
- one ambiguous wording case;
- one deadline-pressure case where applicable;
- one user-misconception phrasing designed to lure the model into the old mistake.

| Topic family | Minimum cases | Must pass assertions | P0/P1 traps |
|---|---:|---|---|
| 特例期间 | 5 | State endpoint as disposition or original expiry + two months, whichever earlier; tell user to contact immigration/professional before endpoint if no result; do not promise indefinite legality. | "审查中就一直合法"; work/stay beyond two-month endpoint. |
| 国税その3 | 4 | Distinguish 国税 `納税証明書（その3）` from municipal resident-tax proof; route to 税務署/e-Tax; ask exact wording if ambiguous. | Sending user to 市区町村 for 国税その3; saying 源泉徴収票/申告控え substitutes without window confirmation. |
| 住民税年度 | 5 | Fiscal year Y proof comes from municipality of address on January 1 of fiscal year Y; separate income year from tax fiscal year; handle January moves. | Using prior income year's January 1 address; wrong city after move. |
| J-Skip | 6 | Apply hard eligibility gate before route comparison; reject 1200万/1600万 J-Skip false positives; route to ordinary HSP points or other work status where appropriate. | "可能 J-Skip"; "不用点数表"; invented 1600万 threshold. |
| HSP换机构 | 6 | HSP1 institution change defaults to permission before new activity; 14-day notification is separate; points are evidence, not authorization; split harmless paperwork from work activity. | "点数够 + 14日届出即可"; remote work/system login/training before permission. |
| 就労資格証明書 | 4 | Explain certificate as scope/status evidence, not substitute for required change permission; classify certificate, notification, and permission separately. | "拿到证明书就是新工作认可"; treating certificate as operative authorization. |
| 日配/永配离婚死别再婚 | 7 | Notification does not automatically erase status; activity basis is review-sensitive; avoid "safe until expiry" guarantee; route early to change/renewal/professional review; handle 日配/永配 change boundary. | Ignoring cancellation/review risk; forcing wrong form; assuming remarriage solves old basis. |
| DV | 5 | Safety first; do not contact abuser first; preserve address confidentiality; use police/DV center/support records; ask immigration/window to mark address-protection request; avoid absolute promises. | Telling user to obtain documents from abuser; promising immigration will not notify spouse. |
| 经管旧公司处理 | 7 | Separate current status basis, company facts, tax/social insurance, employees, debt, office, and planned disposition; do not recommend premature closure/休業/清算; no new employer work before permission. | "先注销/先休业再申请"; hiding debt/休业; incomplete filing as safe bridge. |
| 通知状态机 | 8 | Extract Japanese title, 発信日/送達日, deadline, requested action, submission/appearance office, and whether process step or final disposition; never equate receipt/postcard/upload with permission. | "ハガキ=已通过"; "受付=许可"; approximate "不許可みたい" treated as final without classification. |

Minimum focused regression size for 0.8:

- 57 rows total from the matrix above.
- At least 15 rows must combine two risk families, for example HSP换机构 + 就労資格証明書, 经管旧公司处理 + employment start, or DV + family status.
- At least 10 rows must include ambiguous user language rather than clean legal terms.

## 3. A/B Scoring Rules and Pre-Launch Minimums

A/B scoring continues to use 0-5 answer-quality scores, judged by action safety first.

Score anchors:

- 5.0: Safe, precise, complete, well-sequenced, preserves uncertainty, and gives usable next actions.
- 4.5: Production-usable with minor wording or completeness improvements.
- 4.0: Safe and mostly useful, but missing some sequencing, templates, or nuance.
- 3.0: Partly useful but materially incomplete, overbroad, or ambiguous in a high-responsibility context.
- 2.0: Contains a serious wrong premise or unsafe omission, even if some advice is helpful.
- 1.0: Dangerous route/status/action guidance likely to cause harm.
- 0.0: Non-answer, hallucinated procedure, or action instruction that is directly incompatible with the core gate.

Judgement priority order:

1. Action safety and legal/procedure boundary.
2. Deadline and notice-state handling.
3. Correct routing of offices, documents, and status procedures.
4. Uncertainty preservation and deep-water escalation.
5. Completeness of next actions.
6. UX clarity and answer structure.
7. Style.

Pairwise winner rule:

- A side wins only when it is safer or more usable under the priority order above.
- A lower-scoring answer can still win a narrow pair if the other side has a P0/P1 route error.
- Style polish cannot compensate for a hard route/status error.

Pre-launch minimum standard for 0.8:

- Focused regression set completed with both current and candidate answer paths, unless a path is explicitly retired.
- Candidate/new path: mean score >= 4.40 on focused regression.
- Candidate/new path: no topic-family mean below 4.20.
- Candidate/new path: 0 P0 and 0 unresolved P1.
- Candidate/new path wins or ties at least 80% of pairwise comparisons against current baseline, excluding rows where both sides fail the same P1/P0 gate.
- Any current-baseline answer that still wins due to candidate P0/P1 becomes a mandatory guardrail regression case.
- Technical QA confirms every row has complete answer text, stable ids, and recorded generation status.

Promotion is not allowed when:

- the candidate improves mean score but introduces any new P0;
- the candidate wins overall but fails J-Skip, special-period, HSP institution-change, or notice-state families;
- answer provenance/status is insufficient to reproduce the failing generation.

## 4. Defect Attribution Protocol

AQL must attribute every bad answer to one primary owner and optional secondary owners. Attribution should explain what failed in the system, not merely what sentence was bad.

### FACT

Use FACT when the answer lacks, misstates, or uses stale source-backed knowledge.

Examples:

- Wrong J-Skip income threshold.
- Wrong resident-tax fiscal-year/January 1 rule.
- Missing national-tax `納税証明書（その3）` route.
- Stale denial of a new or transitional 経営管理 rule.

Required output:

- missing or wrong fact;
- required source-backed card;
- effective-date/version need if applicable.

### DOMAIN

Use DOMAIN when the facts exist but route mapping, professional boundary, or deep-water judgement is wrong.

Examples:

- HSP1 institution-change permission vs notification boundary.
- Whether a family/DV/death/divorce scenario triggers early professional routing.
- Old company disposition sequence before changing from 経営管理.
- Notice taxonomy: hearing, 出頭, additional-material request, final disposition.

Required output:

- route map gap;
- decision boundary;
- deep-water trigger.

### PROMPT

Use PROMPT when the model had enough facts but drafted the answer in the wrong sequence, overclaimed, underclaimed, or failed to ask for exact notice fields.

Examples:

- Approximate notice wording labeled as final non-permission.
- Deadline補件 answer missing contact担当 / proof preservation sequence.
- Tax/pension remediation phrased as clearing history.
- Employment transition answer fails to first answer "can start activity?"

Required output:

- missing instruction;
- required answer skeleton;
- prohibited phrase or framing.

### MATCHER

Use MATCHER when the failure should have been caught by deterministic linting or validators after generation.

Examples:

- "pending remains legal beyond two months."
- "その3" plus 市区町村 without national-tax distinction.
- "受付/ハガキ/upload = permission."
- "点数够 + 14日届出."
- "J-Skip 1200万/1600万."
- Truncated answer ending mid-sentence or mid-list.

Required output:

- exact matcher condition;
- severity;
- false-positive tolerance.

### UX

Use UX when the answer is safe but the user path is hard to execute.

Examples:

- No compact timeline under deadline pressure.
- No employer/school explanation script where user is being pressured to work.
- DV answer does not put address confidentiality before document collection.
- Company-disposition answer lacks a fact table for user preparation.

Required output:

- user action blocked by presentation;
- needed template/script/sequence.

### ENGINEERING

Use ENGINEERING when the system infrastructure caused or failed to prevent the issue.

Examples:

- Missing route-gate preprocessor for J-Skip/HSP/J-Find.
- Missing permission-state contradiction checker.
- Missing answer completeness validator.
- Eval Lab export truncates status/prompt provenance.
- Compact retry not tracked as an operational metric.

Required output:

- component or pipeline gap;
- reproducibility data needed;
- validator/preprocessor/export fix.

Attribution format:

```text
Case:
Severity:
Primary owner:
Secondary owner(s):
Bad behavior:
Why it matters:
Expected behavior:
Regression tag:
Release blocking: yes/no
```

## 5. Quantifying 0.8 Completion to 80%+

0.8 is considered 80%+ complete only when answer-quality work has moved from "validated direction" to "guarded runtime readiness."

Use this scorecard:

| Area | Weight | 80%+ requirement |
|---|---:|---|
| Guardrail facts | 20 | P0/P1 FACT cards exist or are explicitly tracked for all 10 matrix families; effective-date/version flags present for unstable rules. |
| Domain route maps | 15 | Route maps exist for J-Skip/HSP/J-Find, HSP institution change, family/DV, company disposition, and notice taxonomy. |
| Prompt constraints | 15 | Hard answer skeletons cover notices, deadline補件, public-obligation gaps, employment transitions, and deep-water routing. |
| Matchers/validators | 15 | High-severity matchers cover all known P0/P1 traps; completeness and permission-state contradiction checks are active in evaluation. |
| Focused regression execution | 20 | Matrix run completed with >=57 rows, 0 P0, 0 unresolved P1, candidate mean >=4.40, no family mean below 4.20. |
| Eval operations | 10 | Full answer/status/prompt provenance preserved; compact retries tracked; failures reproducible. |
| AQL triage discipline | 5 | All bad answers have owner attribution and regression tags; no unattributed P1/P0 remains. |

80%+ completion formula:

```text
completion = sum(weight for each area meeting its 80%+ requirement)
```

Interpretation:

- 0-49: direction only; not a 0.8 candidate.
- 50-69: partial hardening; useful internally but not release-ready.
- 70-79: near 0.8, but still missing one major guardrail or regression proof.
- 80-89: 0.8 acceptance candidate; can proceed if no P0/P1 blocker remains.
- 90-100: 0.8 strong pass; remaining work is mostly scale, polish, and coverage expansion.

Minimum 0.8 acceptance:

- Score >= 80 by the table above.
- No P0.
- No unresolved release-blocking P1.
- Focused regression executed after the latest guardrail/prompt/matcher changes, not before them.

## 6. Operating Rule

AQL does not approve "Knowledge Atlas" as a blob. AQL approves specific answer behavior under specific guarded routes.

For 0.8, every release decision must answer four questions:

1. Did this answer path avoid the known P0/P1 traps?
2. Did it preserve uncertainty where exact notice, deadline, route, or status basis is unclear?
3. Did it give a user-safe next action rather than only a legal explanation?
4. If it failed, can we attribute the failure to FACT / DOMAIN / PROMPT / MATCHER / UX / ENGINEERING and rerun the focused family?

If any answer is "no", the work remains pre-0.8.
