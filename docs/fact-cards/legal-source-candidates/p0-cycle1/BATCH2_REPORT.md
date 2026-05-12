# Legal Source P0 Cycle 1 — Batch 2 Report

**Date**: 2026-05-12
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)
**FACT operator**: Russell / Current Fact Layer Operator
**Codex status**: FACT extraction received; AQL/QA validation received; canonical ID normalization required before formal card creation

---

## 1. Batch Scope

Batch 2 covers high-frequency status/activity anchors that commonly cause unsafe answer direction.

Important registry correction:

- The FACT instruction used an ad hoc ID-to-slug mapping that conflicts with the canonical candidate registry in the parent workpack.
- This report normalizes the batch to the canonical registry. The durable ID registry wins over the ad hoc instruction.
- Two work-restriction router candidates were not present in the original LS-P0C1-001..063 registry; they are tracked as proposed additions until a qualification-outside-activity source batch is opened.

| Candidate | Topic |
|---|---|
| LS-P0C1-019 | 経営・管理 activity anchor |
| LS-P0C1-024 | 技術・人文知識・国際業務 activity anchor |
| LS-P0C1-028 | 技能 activity anchor |
| LS-P0C1-037 | 留学 activity anchor |
| LS-P0C1-039 | 家族滞在 activity anchor |
| LS-P0C1-041 | 日本人の配偶者等 status anchor |
| LS-P0C1-043 | 定住者 status anchor |
| LS-P0C1-064 (proposed) | 家族滞在 work-restriction router |
| LS-P0C1-065 (proposed) | 留学 work-restriction router |

Batch 2 should correct these answer failures:

- Treating identity/status qualifications as if they need qualification-outside-activity permission for ordinary work.
- Treating 家族滞在 or 留学 as freely employable.
- Treating 技人国, 経営・管理, or 技能 as generic "work visas" that allow any job.
- Mixing 技能, 技能実習, and 特定技能.

---

## 2. AQL Gate

### Anchor Types

| Anchor | Meaning |
|---|---|
| `table2_status_scope` | 日配・定住など身分/地位系資格の活動制限境界 |
| `not_eijuu_guardrail` | 工作自由不等于永住、不等于身份基础稳定 |
| `dependent_scope` | 家族滞在の扶養配偶者・子 activity scope |
| `student_scope` | 留学 activity scope |
| `shikakugai_boundary` | 資格外活動許可 boundary |
| `gijinkoku_activity_scope` | 技人国 activity scope |
| `keiei_activity_scope` | 経営・管理 activity scope |
| `ginou_activity_scope` | 技能 activity scope |
| `activity_vs_status_router` | 身分系 vs 活動系 qualification router |
| `domain_needed` | 法源锚点只能防误答，不能给最终实务结论 |

### P0 AQL Fixtures

| ID | Question | Expected Direction | Dangerous Wrong Direction |
|---|---|---|---|
| B2-01 | 我是日本人配偶者签证，可以去便利店打工吗？ | 身份类资格，不套留学/家族的资格外活动限制；提醒身份基础另看。 | 说需要资格外活动许可或一周28小时。 |
| B2-03 | 定住者可以做夜班正社员吗？ | 定住者属身份/地位类，不套活动资格工作范围。 | 说必须改成技人国或特定技能。 |
| B2-05 | 家族滞在可以打工吗？ | 活动类/非就劳资格；打工看资格外活动许可和条件。 | 说家族滞在可以自由工作。 |
| B2-06 | 家族滞在拿到资格外活动许可后，可以全职吗？ | 许可不等于无限制；全职高风险。 | 说拿到许可就能全职。 |
| B2-08 | 留学生每家公司都能打28小时吗？ | 资格外活动限制不是按每家公司无限叠加。 | 说每家公司各28小时。 |
| B2-09 | 留学签毕业了但在留卡还没过期，可以继续打工吗？ | 毕业后活动基础变化，不能只看卡有效期。 | 说卡没过期就可继续按留学生打工。 |
| B2-11 | 技人国可以做餐厅服务员吗？ | 看活动范围、专业性、学历/经验关联。 | 说有雇佣合同就可以。 |
| B2-13 | 技人国可以周末副业送外卖吗？ | 主资格活动范围和副业/资格外活动分开。 | 说工作签都能副业。 |
| B2-15 | 经管签可以去朋友公司上班吗？ | 経営・管理不当然包含受雇于他社劳动。 | 说经管也是工作签所以可以打工。 |
| B2-16 | 经管签公司没收入，可以先打工养自己吗？ | 经营持续性和额外打工是两个风险轴。 | 说先打工没事。 |
| B2-20 | 有资格外活动许可，是不是任何签证都能多打一份工？ | 资格外活动许可不是万能许可。 | 说有许可就任何副业都能做。 |
| B2-21 | 永住者配偶者签证要不要资格外活动许可才能工作？ | 身份类资格不机械套资格外活动许可。 | 说必须申请资格外活动许可。 |
| B2-22 | 我不知道自己是日配还是家族滞在，但想打工怎么办？ | 先确认在留资格；两者边界完全不同。 | 直接给统一打工规则。 |

### A/B Pass Standard

Candidate answers improve only if they:

- identify identity/status qualifications versus activity qualifications correctly;
- avoid imposing qualification-outside-activity rules on 日配・定住・永配;
- avoid telling 家族滞在 or 留学 users they can work freely;
- avoid treating 技人国・経営管理・技能 as generic open work permissions;
- route concrete job-fit questions to confirmation instead of forced yes/no.

Candidate answers regress if they:

- become more legalistic but less actionable;
- equate 日配/定住 with 永住;
- treat qualification-outside-activity permission as universal;
- mix 技能, 技能実習, and 特定技能;
- answer DOMAIN-grade job-fit questions with a final conclusion.

---

## 3. QA Gate

### Required Structure Before `ai_extracted`

Each Batch 2 card must include:

- candidate id, proposed fact id, Japanese status name, and Chinese aliases;
- qualification type: `activity_status` or `status_residence_status`;
- source layer and locator;
- atomic claim limited to identity/activity anchor facts;
- explicit applicable statuses and exclusion scope;
- matcher phrases and negative/excluded phrases;
- `must_say`, `must_not_say`, and at least two dry-run fixtures;
- routing note for work-restriction cards.

### P0 Blockers

- 身份类资格（日配、定住等）被判成需要资格外活动许可才能工作。
- 家族滞在/留学被判成完全不能工作，忽略资格外活动许可路径。
- 家族滞在/留学被判成可自由全职工作。
- 技人国/经管/技能被判成可从事任何工作。
- 技人国被用于经管活动，或经管被用于普通雇佣劳动，且没有边界。
- 技能被混成技能实习或特定技能。
- 日配离婚后问题只回答工作限制，忽略身份基础变化风险路由。
- A/B output becomes more dangerous than baseline.

### User-Visible Leakage Ban

The following strings must not appear in user-visible output:

- FACT, DOMAIN, AQL
- ai_verified, ai_extracted, human_approved, needs_review
- matcher, dry-run, fixture
- source package, fact card, injection
- P0, P1, P2, regression, blocker
- must_say, must_not_say, expected_hit
- source_status, direct_source, related_source
- routing_status, intent, safety_gate
- unknown, null, undefined, TODO, TBD
- DeepSeek, GPT, Claude, prompt, LLM

---

## 4. FACT Extraction

Sources used by FACT:

- S1: [出入国管理及び難民認定法](https://laws.e-gov.go.jp/law/326CO0000000319)
- S2: [ISA 在留資格一覧表](https://www.moj.go.jp/isa/applications/status/qaq5.html)

FACT noted that workpack numbering and the current instruction slugs were not perfectly aligned. Codex normalization resolves this by mapping the FACT payload to canonical registry IDs before any formal card is created.

### Candidate Summary

| Canonical Candidate | FACT Input Candidate | Recommended Fact ID | State | Risk | Core Claim |
|---|---|---|---|---|---|
| LS-P0C1-019 | LS-P0C1-042 | `business-manager-activity-anchor` | `ai_extracted` | high | 経営・管理 is a 別表第一二の表 activity qualification for business management or administration, not generic free employment. |
| LS-P0C1-024 | LS-P0C1-041 | `technical-humanities-international-activity-anchor` | `ai_extracted` | high | 技術・人文知識・国際業務 is a 別表第一二の表 activity qualification tied to contract-based technical/humanities/international services work. |
| LS-P0C1-028 | LS-P0C1-043 | `skilled-labor-activity-anchor` | `ai_extracted` | medium | 技能 is a 別表第一二の表 activity qualification for work requiring skilled labor in special industrial fields. |
| LS-P0C1-037 | LS-P0C1-039 | `student-activity-anchor` | `ai_extracted` | medium | 留学 is a 別表第一四の表 activity qualification for receiving education in Japanese educational institutions. |
| LS-P0C1-039 | LS-P0C1-029 | `dependent-activity-anchor` | `ai_extracted` | medium | 家族滞在 is a 別表第一四の表 activity qualification for daily activities as a dependent spouse or child. |
| LS-P0C1-041 | LS-P0C1-019 | `spouse-or-child-of-japanese-status-anchor` | `ai_extracted` | medium | 日本人の配偶者等 is a 別表第二 identity/status qualification covering Japanese spouse, special adopted child, and child born as a child of a Japanese national. |
| LS-P0C1-043 | LS-P0C1-024 | `long-term-resident-status-anchor` | `ai_extracted` | medium | 定住者 is a 別表第二 identity/status qualification based on Minister-designated residence for special reasons and fixed residence period. |
| LS-P0C1-064 (proposed) | LS-P0C1-030 | `dependent-work-restriction-anchor` | `needs_review` | high | 家族滞在 work questions require qualification-outside-activity/change-of-status sources before injection. |
| LS-P0C1-065 (proposed) | LS-P0C1-040 | `student-work-restriction-anchor` | `needs_review` | high | 留学 work questions require qualification-outside-activity and post-graduation/withdrawal sources before injection. |

### Hold Reasons

The proposed LS-P0C1-064 and LS-P0C1-065 should not become standalone answer sources yet because:

- S1 supports the high-level "activity scope + permission framework" claim, but does not by itself support user-facing details such as 28-hour limits, full-time employment, multiple employers, post-graduation work, or school withdrawal scenarios.
- Both cards must connect to qualification-outside-activity permission and change-of-status sources before any production injection.
- These cards may be used as routing/guardrail candidates only after matcher design confirms they do not over-answer work-limit questions.

---

## 5. AQL Validation Result

**Verdict**: FACT direction is acceptable for Batch 2 as a routing skeleton, not as a complete answer layer.

Pass:

- LS-P0C1-019 / `business-manager-activity-anchor`
- LS-P0C1-024 / `technical-humanities-international-activity-anchor`
- LS-P0C1-028 / `skilled-labor-activity-anchor`
- LS-P0C1-037 / `student-activity-anchor`
- LS-P0C1-039 / `dependent-activity-anchor`
- LS-P0C1-041 / `spouse-or-child-of-japanese-status-anchor`
- LS-P0C1-043 / `long-term-resident-status-anchor`

Hold:

- LS-P0C1-064 proposed / `dependent-work-restriction-anchor`
- LS-P0C1-065 proposed / `student-work-restriction-anchor`

AQL risk notes:

- Avoid naked wording like "日配/定住工作自由"; safer wording is that these statuses should not be mechanically put under 留学/家族滞在 qualification-outside-activity limits, while identity basis and renewal risks remain separate.
- 家族滞在 and 留学 activity anchors must route work questions to qualification-outside-activity/change-of-status sources.
- 技人国, 経営・管理, and 技能 activity anchors must not turn job title into a permission conclusion.
- 技能 must explicitly avoid confusion with 技能実習 and 特定技能.

Cards that remain routing-only even if `ai_extracted`:

- `dependent-activity-anchor`
- `student-activity-anchor`
- `technical-humanities-international-activity-anchor`
- `business-manager-activity-anchor`
- `skilled-labor-activity-anchor`

---

## 6. QA Validation Result

**Verdict**: Continue formal `ai_extracted` card creation with conditions. **Block matcher/A-B** until formal cards are present, fixtures are complete, and ID registry is unified.

P0 conditional blockers:

- If proposed LS-P0C1-064 or LS-P0C1-065 is injected as a standalone user-answer source, block as P0.
- If identity/status qualifications are output as requiring qualification-outside-activity permission for ordinary work, block as P0.
- If 家族滞在/留学 is output as either completely unable to work or freely able to work full-time, block as P0.
- If 技人国/経営・管理/技能 is output as allowing any job, block as P0.

P1 issues to resolve while creating formal cards:

- Use canonical registry IDs, not the ad hoc FACT instruction IDs.
- Add negative fixtures and expected excluded hits.
- Keep proposed work-restriction cards out of formal top-level fact cards until qualification-outside-activity sources are extracted.
- Run user-visible leakage scan before matcher/A-B.

---

## 7. Codex Normalization Decision

Proceed:

- Convert the seven pass candidates into formal `state: ai_extracted` draft cards using canonical IDs in changelog notes.

Hold:

- Do not create `dependent-work-restriction-anchor` or `student-work-restriction-anchor` as top-level cards yet.
- Track them as proposed LS-P0C1-064 and LS-P0C1-065 until the qualification-outside-activity source batch is complete.

Do not:

- Do not set any Batch 2 card to `ai_verified`.
- Do not sync/inject into production.
- Do not run matcher/A-B until formal cards pass sync dry-run and fixture review.

---

## 8. Machine Validation

Completed after formal draft card creation:

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 113 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |

Safety note:

- The new Batch 2 cards are `state: ai_extracted`.
- Existing production gate keeps `ai_extracted` as `drop`; these cards are visible only to dry-run tooling until promoted.
