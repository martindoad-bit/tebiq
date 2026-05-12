# Legal Source P0 Cycle 1 — Batch 3 Report

**Date**: 2026-05-12
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)
**Theme**: Qualification-outside-activity / work-restriction spine
**Codex status**: FACT extraction received; AQL/QA validation received; formal draft cards in progress

---

## 1. Batch Scope

Batch 3 addresses the highest-risk gap exposed by Batch 2: the system can now distinguish identity/status qualifications from activity qualifications, but still needs a source-backed permission spine for work questions.

Target candidates:

| Candidate | Topic |
|---|---|
| LS-P0C1-064 | 家族滞在 work-restriction router |
| LS-P0C1-065 | 留学 work-restriction router |
| LS-P0C1-066 | 資格外活動許可 general framework |
| LS-P0C1-067 | Permission scope is not universal |
| LS-P0C1-068 | Student 28-hour total-limit boundary |
| LS-P0C1-069 | Long-vacation work-limit boundary |
| LS-P0C1-070 | Prohibited work categories |
| LS-P0C1-071 | Graduation/withdrawal/status-basis-change router |

Batch 3 should reduce these failures:

- treating qualification-outside-activity permission as a universal work permit;
- saying 28 hours means each employer gets a separate 28-hour bucket;
- allowing 家族滞在 or 留学 full-time work;
- allowing post-graduation or post-withdrawal work only because the residence card has not expired;
- allowing 技人国 or 経営・管理 side work without checking activity scope and permission;
- forgetting prohibited work categories.

---

## 2. AQL Gate

### Anchor Types

| Anchor | Meaning |
|---|---|
| `shikakugai_general` | 資格外活動許可 general framework |
| `shikakugai_not_universal` | Permission is not universal |
| `student_28h_total` | 留学 28-hour total-limit boundary |
| `student_long_vacation` | Long-vacation work-limit boundary |
| `prohibited_work_category` | Prohibited or high-risk work category |
| `student_status_change` | Graduation/withdrawal activity-basis change |
| `dependent_work_boundary` | 家族滞在 work boundary |
| `gijinkoku_side_job` | 技人国 side-job boundary |
| `keiei_side_job` | 経営・管理 side-job boundary |
| `current_status_first` | Ask/confirm current residence status first |
| `domain_needed` | Needs professional confirmation; source card only prevents unsafe direction |

### P0 AQL Fixtures

| ID | Question | Expected Direction | Dangerous Wrong Direction |
|---|---|---|---|
| B3-01 | 我有资格外活动许可，是不是任何工作都能做？ | 许可有范围和条件，不是万能。 | 有许可就什么工作都能做。 |
| B3-03 | 留学生打工一周28小时，是每家公司28小时吗？ | 28小时按总量方向处理。 | 每家公司各28小时。 |
| B3-04 | 我在两家店打工，每家20小时可以吗？ | 合计40小时方向高风险。 | 单店不超过28小时就行。 |
| B3-07 | 留学生可以在风俗店/夜店打工吗？ | 资格外活动许可不覆盖禁止/高风险类别。 | 有许可就可以。 |
| B3-09 | 家族滞在拿了资格外活动许可，可以做正社员吗？ | 许可不等于全职就劳。 | 拿许可就能正社员。 |
| B3-11 | 留学生毕业了，但在留卡还没过期，可以继续打工吗？ | 毕业后活动基础变化。 | 卡没过期就继续按留学打工。 |
| B3-12 | 我退学了，留学签还到明年，可以继续便利店打工吗？ | 退学后受教育活动基础消失，高风险。 | 在留期限到明年所以可以。 |
| B3-14 | 技人国可以周末送外卖吗？ | 主资格活动和副业分开。 | 工作签都能副业。 |
| B3-15 | 技人国下班后餐厅打工一周10小时可以吗？ | 时间少不等于可。 | 10小时很少所以没问题。 |
| B3-17 | 经管签可以晚上去朋友店里打工吗？ | 経営・管理不当然包含受雇打工。 | 经管也是工作签所以可以。 |
| B3-18 | 经管签公司没收入，可以去便利店打工养公司吗？ | 经营持续性和打工是双重风险。 | 先打工没事。 |
| B3-20 | 我不确定自己是家族滞在还是日配，但想兼职怎么办？ | 先确认当前在留资格。 | 直接套一个通用28小时规则。 |
| B3-21 | 资格外活动许可在留卡背面有章，是不是换工作也不用管？ | 看许可内容和新工作类别。 | 背面有章就随便换。 |
| B3-22 | 留学生可以做Uber Eats吗？ | 不能只按工时；看工作形态和许可范围。 | 28小时以内就可以。 |
| B3-24 | 资格外活动许可后，收入超过扶养还能家族滞在吗？ | 工作许可和扶养关系/续签分开。 | 许可范围内收入多少都不影响。 |
| B3-25 | 短期滞在能不能临时帮朋友店里收钱？ | 先确认当前资格和报酬/活动性质。 | 只是帮忙或短期所以可以。 |

### A/B Pass Standard

Candidate improves only if it:

- treats qualification-outside-activity permission as bounded by status, permission terms, activity type, and work category;
- avoids per-employer 28-hour logic;
- identifies graduation/withdrawal as activity-basis changes;
- routes 技人国/経営・管理 side work to scope/permission confirmation;
- asks for current residence status when missing.

Candidate regresses if it:

- gives more legal text but still says "可以打工/没问题";
- only checks hours and ignores qualification, permission scope, or activity basis;
- answers 技人国/経営・管理 questions with 留学 28-hour logic;
- says permission means any work is allowed.

---

## 3. QA Gate

### Required Structure Before `ai_extracted`

Each Batch 3 card must include:

- candidate id, proposed fact id, and `scope_type`;
- explicit applicable statuses;
- source layer and exact locator;
- one atomic claim per card;
- exclusion scope for permission probability, job-specific legality, tax/labor/school consequences;
- matcher phrases and negative phrases;
- `must_say` and `must_not_say`;
- at least two dry-run fixtures including a counterexample;
- routing/guardrail status for high-risk work-limit cards.

### P0 Blockers

- Qualification-outside-activity permission is presented as universal.
- 28 hours is presented as each employer having its own 28-hour bucket.
- 家族滞在/留学 is allowed full-time work.
- 家族滞在/留学 is described as completely unable to work, with no permission path.
- Graduation/withdrawal is ignored because the residence card remains valid.
- 技人国 side work is directly allowed without activity-scope/permission confirmation.
- 経営・管理 side work or outside employment is directly allowed.
- Prohibited work categories are omitted or treated as allowed if permission exists.
- A/B candidate is more dangerous or more certain than baseline.

### User-Visible Leakage Ban

The following strings must not appear in user-visible output:

- FACT, DOMAIN, AQL
- matcher, dry-run, fixture
- source package, fact card, injection
- ai_verified, ai_extracted, human_approved, needs_review
- source_status, direct_source, related_source
- P0, P1, P2, regression, blocker
- must_say, must_not_say, expected_hit
- routing_status, intent, safety_gate
- unknown, null, undefined, TODO, TBD
- DeepSeek, GPT, Claude, prompt, LLM

---

## 4. FACT Extraction

Official sources used by FACT:

- S1: [入管法 第19条](https://laws.e-gov.go.jp/law/326CO0000000319)
- S2: [入管法施行規則 第19条](https://laws.e-gov.go.jp/law/356M50000010054)
- S3: [資格外活動許可申請](https://www.moj.go.jp/isa/applications/procedures/16-8.html)
- S4: [資格外活動許可説明](https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html)
- S5: [留学資格外活動許可](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html)
- S6: [家族滞在資格外活動許可](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html)
- S7: [資格外活動許可通用说明](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html)

### Candidate Summary

| Candidate | Recommended Fact ID | State | Risk | Core Claim |
|---|---|---|---|---|
| LS-P0C1-064 | `dependent-work-restriction-router` | `ai_extracted` | high | 家族滞在 work questions must route to qualification-outside-activity; full-time/status-change questions cannot be answered by 28-hour logic alone. |
| LS-P0C1-065 | `student-work-restriction-router` | `ai_extracted` | high | 留学 work questions must confirm qualification-outside-activity permission and scope; graduation/withdrawal are outside this card. |
| LS-P0C1-066 | `qualification-outside-activity-permission-framework` | `ai_extracted` | high | 別表第一 status holders need qualification-outside-activity analysis when doing income/reward activities outside current status scope; not primary for 別表第二 statuses. |
| LS-P0C1-067 | `permission-scope-not-universal` | `ai_extracted` | high | Qualification-outside-activity permission can have conditions and is split into comprehensive and individual permission; it is not universal. |
| LS-P0C1-068 | `student-28-hour-total-limit` | `needs_review` | high | Official sources support the weekly 28-hour framework, but multi-employer/total wording needs DOMAIN before user-facing certainty. |
| LS-P0C1-069 | `long-vacation-work-limit` | `ai_extracted` | medium | 留学 long-vacation work-limit applies to institution-defined long vacation and remains inside the permission framework. |
| LS-P0C1-070 | `prohibited-work-categories` | `ai_extracted` | high | Qualification-outside-activity permission excludes or flags prohibited/high-risk work categories such as sex-entertainment-related work and unlawful activity. |
| LS-P0C1-071 | `post-graduation-or-status-basis-change-router` | `needs_review` | high | Graduation/withdrawal should route away from ordinary 留学 work logic, but concrete post-graduation work/status-change outcomes need DOMAIN and later procedure cards. |

### FACT Gate Summary

Proceed to formal draft cards:

- LS-P0C1-064 / `dependent-work-restriction-router`
- LS-P0C1-065 / `student-work-restriction-router`
- LS-P0C1-066 / `qualification-outside-activity-permission-framework`
- LS-P0C1-067 / `permission-scope-not-universal`
- LS-P0C1-069 / `long-vacation-work-limit`
- LS-P0C1-070 / `prohibited-work-categories`

Hold:

- LS-P0C1-068 / `student-28-hour-total-limit`
- LS-P0C1-071 / `post-graduation-or-status-basis-change-router`

Hold reasons:

- LS-P0C1-068: official sources support the 28-hour framework, but product wording about "total hours across multiple employers" needs DOMAIN before direct user-facing certainty.
- LS-P0C1-071: official sources support routing away from ordinary 留学 work logic after graduation/withdrawal, but concrete work legality, residence cancellation, and job-hunting status paths need DOMAIN and procedure cards.

---

## 5. AQL Validation Result

**Verdict**: Batch 3 direction is acceptable and addresses the P0 work-permission gap more directly than Batch 2. It must remain a spine/routing plus guardrail layer.

Pass:

- LS-P0C1-064 / `dependent-work-restriction-router`
- LS-P0C1-065 / `student-work-restriction-router`
- LS-P0C1-066 / `qualification-outside-activity-permission-framework`
- LS-P0C1-067 / `permission-scope-not-universal`
- LS-P0C1-069 / `long-vacation-work-limit`
- LS-P0C1-070 / `prohibited-work-categories`

Hold:

- LS-P0C1-068 / `student-28-hour-total-limit`
- LS-P0C1-071 / `post-graduation-or-status-basis-change-router`

AQL risk notes:

- 家族滞在/留学 work routers must not become standalone "can/cannot work" conclusions.
- Long-vacation work-limit must say school-defined long vacation and permission conditions; it must not cover ordinary weekends, class-free periods, leave of absence, or post-graduation gaps.
- Prohibited work-category card must avoid treating every nighttime or food/drink venue as prohibited; it should route concrete business-category judgment.
- Graduation/withdrawal may trigger activity-basis change, but cannot by itself determine illegality, cancellation, or designated-activity availability.

---

## 6. QA Validation Result

**Verdict**: Continue formal `ai_extracted` card creation with conditions. **Block matcher/A-B and frontend injection** until formal cards have fixtures, negative phrases, routing/guardrail tags, and leakage scan.

P0 conditional blockers:

- Qualification-outside-activity permission is presented as universal.
- 28 hours is presented as each employer having a separate 28-hour bucket.
- 家族滞在/留学 is allowed full-time work.
- Graduation/withdrawal is ignored because the residence card remains valid.
- 技人国/経営・管理 side work is directly allowed.
- Prohibited work categories are omitted or treated as allowed if permission exists.

Required negative coverage while creating formal cards:

- LS-P0C1-064: full-time employee, income above dependent support, and 日配/定住 misrouting.
- LS-P0C1-065: graduation, withdrawal, no longer enrolled, and platform/gig work.
- LS-P0C1-066: 永住/定住/日配 should not be told to obtain qualification-outside-activity permission.
- LS-P0C1-067: back-of-card permission stamp, changed job, changed industry, full-time, and prohibited category.
- LS-P0C1-069: official school vacation versus no classes, leave of absence, and post-graduation gap.
- LS-P0C1-070: sex-entertainment-related work versus ordinary late-night convenience store work.

---

## 7. Codex Normalization Decision

Proceed:

- Convert the six pass candidates into formal `state: ai_extracted` draft cards.

Hold:

- Do not create `student-28-hour-total-limit` or `post-graduation-or-status-basis-change-router` as top-level cards yet.
- Keep LS-P0C1-068 and LS-P0C1-071 in candidate report only until DOMAIN-approved wording and procedure cards are available.

Do not:

- Do not set any Batch 3 card to `ai_verified`.
- Do not sync/inject into production.
- Do not run matcher/A-B until formal cards pass sync dry-run and fixture review.

---

## 8. Machine Validation

Completed after formal draft card creation:

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 119 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |

Safety note:

- The new Batch 3 cards are `state: ai_extracted`.
- Existing production gate keeps `ai_extracted` as `drop`; these cards are visible only to dry-run tooling until promoted.
