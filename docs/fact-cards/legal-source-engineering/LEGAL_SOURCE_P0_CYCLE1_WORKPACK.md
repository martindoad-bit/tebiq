# Legal Source Engineering — P0 Cycle 1 Workpack

**Date**: 2026-05-12  
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)  
**Scope**: 入管法別表第一・第二 + ISA 在留資格一覧表  
**Goal**: activity/status skeleton for residence status scope and work restriction distinction  
**Status**: cycle completed as internal `ai_extracted` draft cards; see [`CYCLE1_SUMMARY.md`](../legal-source-candidates/p0-cycle1/CYCLE1_SUMMARY.md)

---

## 1. Cycle Goal

P0 Cycle 1 is not a bulk card-writing exercise. Its goal is to prove that TEBIQ can correctly distinguish:

- 別表第一 = activity-based residence statuses
- 別表第二 = status/residence-based residence statuses
- activity scope vs permission probability
- work restriction vs identity/status risk
- qualification scope vs material checklist

Primary risk to eliminate:

```text
The system must not confuse activity qualification and status qualification.
```

---

## 2. P0 Source Registry Draft

| ID | Official Source Title | URL | Authority Layer | Legal Source Type | Latest Effective Date | P0 Scope | Expected Card Families | Access Notes |
|---|---|---|---|---|---|---|---|
| S1 | 出入国管理及び難民認定法 | https://laws.e-gov.go.jp/law/326CO0000000319 | L1 Law | statute_current_text | `needs_confirm` | 別表第一・第二、在留資格总骨架 | qualification distinction, activity scope, status scope | e-Gov HTML/API usable |
| S1-API | 出入国管理及び難民認定法 lawdata | https://laws.e-gov.go.jp/api/1/lawdata/326CO0000000319 | L1 Law | statute_xml | `needs_confirm` | machine extraction of 別表第一・第二 | evidence locator, quote locator | API v1 provides current law XML |
| S2 | 在留資格一覧表 | https://www.moj.go.jp/isa/applications/status/qaq5.html | L4 ISA Page | official_status_list_html | `needs_confirm` | user-readable status/activity/duration mapping | activity cards, status cards, matcher phrases | HTML readable; useful for product-facing names/examples |
| S3 | 在留資格一覧表及び在留期間一覧表 | https://www.moj.go.jp/isa/content/930002477.pdf | L4 ISA PDF | official_status_list_pdf | `needs_confirm` | cross-check HTML table and durations | duration locator, table locator | secondary confirmation; do not flatten against S1/S2 |
| S4 | 法令API Version 1 docs | https://laws.e-gov.go.jp/docs/law-data-basic/8529371-law-api-v1/ | Access Method | source_access_protocol | current docs page, not legal effective source | extraction method only | no fact card | confirms current-law XML and article/table endpoints |
| S5 | 出入国管理関係法令等 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja | Source Hub | official_law_index | `needs_confirm` | source discovery only | no fact card unless specific linked source used | registry hub; final cards cite underlying source |

### Registry Notes

- Cycle 1 formal cards should prioritize S1/S2.
- S3 is useful for cross-checking duration/table labels, but not as the only source when S1/S2 conflict.
- Effective date and source version must remain `needs_confirm` until extracted from e-Gov or source metadata.
- S4/S5 are source-access/reference hubs, not user-facing fact sources.

---

## 3. Candidate Card List

Target: 63 candidate cards.  
State: candidate list only, no formal card body.

| ID | Title | Source | Claim Type | Applicable Statuses | Matcher Phrases |
|---|---|---|---|---|---|
| LS-P0C1-001 | 別表第一是活动资格骨架 | S1/S2 | qualification_distinction | 別表第一全体 | 活动资格, 就劳资格, 能做什么 |
| LS-P0C1-002 | 別表第二是身份/地位资格骨架 | S1/S2 | qualification_distinction | 別表第二全体 | 居住资格, 身份签, 能不能工作 |
| LS-P0C1-003 | 活动资格与身份资格的工作限制差异 | S1/S2 | status_vs_activity | 全体 | 永住能打工吗, 家族滞在工作 |
| LS-P0C1-004 | 別表第一一の表：就劳资格 | S2 | category_scope | 一の表 | 就劳资格, 教授, 艺术 |
| LS-P0C1-005 | 別表第一二の表：就劳资格且有上陆基准 | S2 | category_scope | 二の表 | 技人国, 经管, 特定技能 |
| LS-P0C1-006 | 別表第一三・四の表：非就劳资格 | S2 | category_scope | 文化活動/短期/留学/研修/家族 | 非就劳, 留学能打工吗 |
| LS-P0C1-007 | 特定活動是个别指定活动 | S1/S2 | special_designation_scope | 特定活動 | 特定活动, 告示, 个别指定 |
| LS-P0C1-008 | 在留期间字段只定位期间，不判断许可 | S2 | duration_locator | 全体 | 5年签, 在留期间, 能拿几年 |
| LS-P0C1-009 | 外交活动范围 | S1/S2 | activity_scope | 外交 | 外交官, 大使馆家属 |
| LS-P0C1-010 | 公用活动范围 | S1/S2 | activity_scope | 公用 | 国际机构, 公务派遣 |
| LS-P0C1-011 | 教授活动范围 | S1/S2 | activity_scope | 教授 | 大学教授, 研究指导 |
| LS-P0C1-012 | 芸術活动范围 | S1/S2 | activity_scope | 芸術 | 作曲家, 画家, 艺术收入 |
| LS-P0C1-013 | 宗教活动范围 | S1/S2 | activity_scope | 宗教 | 传教士, 宗教团体 |
| LS-P0C1-014 | 報道活动范围 | S1/S2 | activity_scope | 報道 | 记者, 摄影记者 |
| LS-P0C1-015 | 高度専門職1号イ活动范围 | S1/S2 | activity_scope | 高度専門職1号イ | 高度人才研究, 教育 |
| LS-P0C1-016 | 高度専門職1号ロ活动范围 | S1/S2 | activity_scope | 高度専門職1号ロ | 高度人才技术, 专门知识 |
| LS-P0C1-017 | 高度専門職1号ハ活动范围 | S1/S2 | activity_scope | 高度専門職1号ハ | 高度人才经营, 管理 |
| LS-P0C1-018 | 高度専門職2号活动范围 | S1/S2 | activity_scope | 高度専門職2号 | 高度2号, 无期限, 多活动 |
| LS-P0C1-019 | 経営・管理活动范围 | S1/S2 | activity_scope | 経営・管理 | 经营管理, 开公司, 管理者 |
| LS-P0C1-020 | 法律・会計業務活动范围 | S1/S2 | activity_scope | 法律・会計業務 | 律师, 会计士, 资格业务 |
| LS-P0C1-021 | 医療活动范围 | S1/S2 | activity_scope | 医療 | 医生, 护士, 医疗资格 |
| LS-P0C1-022 | 研究活动范围 | S1/S2 | activity_scope | 研究 | 研究员, 企业研究 |
| LS-P0C1-023 | 教育活动范围 | S1/S2 | activity_scope | 教育 | 中学老师, 语学教师 |
| LS-P0C1-024 | 技術・人文知識・国際業務活动范围 | S1/S2 | activity_scope | 技人国 | 工程师, 翻译, 市场 |
| LS-P0C1-025 | 企業内転勤活动范围 | S1/S2 | activity_scope | 企業内転勤 | 海外调职, 公司内转勤 |
| LS-P0C1-026 | 介護活动范围 | S1/S2 | activity_scope | 介護 | 介护福祉士, 介护签 |
| LS-P0C1-027 | 興行活动范围 | S1/S2 | activity_scope | 興行 | 演出, 运动员, 艺能 |
| LS-P0C1-028 | 技能活动范围 | S1/S2 | activity_scope | 技能 | 厨师, 飞行员, 熟练技能 |
| LS-P0C1-029 | 特定技能1号活动范围 | S1/S2 | activity_scope | 特定技能1号 | 特定技能1号, 14分野 |
| LS-P0C1-030 | 特定技能2号活动范围 | S1/S2 | activity_scope | 特定技能2号 | 特定技能2号, 熟练技能 |
| LS-P0C1-031 | 技能実習1号イ活动范围 | S1/S2 | activity_scope | 技能実習1号イ | 企业单独型, 技能实习1号 |
| LS-P0C1-032 | 技能実習1号ロ活动范围 | S1/S2 | activity_scope | 技能実習1号ロ | 团体监理型, 技能实习1号 |
| LS-P0C1-033 | 技能実習2号活动范围 | S1/S2 | activity_scope | 技能実習2号 | 技能实习2号 |
| LS-P0C1-034 | 技能実習3号活动范围 | S1/S2 | activity_scope | 技能実習3号 | 技能实习3号 |
| LS-P0C1-035 | 文化活動活动范围 | S1/S2 | activity_scope | 文化活動 | 文化研究, 无收入活动 |
| LS-P0C1-036 | 短期滞在活动范围 | S1/S2 | activity_scope | 短期滞在 | 旅游, 探亲, 商务会议 |
| LS-P0C1-037 | 留学活动范围 | S1/S2 | activity_scope | 留学 | 留学, 大学, 日本语学校 |
| LS-P0C1-038 | 研修活动范围 | S1/S2 | activity_scope | 研修 | 研修生, 技能修得 |
| LS-P0C1-039 | 家族滞在活动范围 | S1/S2 | activity_scope | 家族滞在 | 配偶孩子, 被扶养 |
| LS-P0C1-040 | 永住者身份范围 | S1/S2 | status_scope | 永住者 | 永住, 永住者能工作吗 |
| LS-P0C1-041 | 日本人の配偶者等身份范围 | S1/S2 | status_scope | 日本人の配偶者等 | 日配, 日本人孩子 |
| LS-P0C1-042 | 永住者の配偶者等身份范围 | S1/S2 | status_scope | 永住者の配偶者等 | 永配, 永住者孩子 |
| LS-P0C1-043 | 定住者身份范围 | S1/S2 | status_scope | 定住者 | 定住者, 日系, 定住理由 |
| LS-P0C1-044 | 高度専門職1号可附带相关事业活动 | S1/S2 | activity_scope_detail | 高度専門職1号 | 高度人才副业, 相关事业 |
| LS-P0C1-045 | 高度専門職2号可覆盖多类活动 | S1/S2 | activity_scope_detail | 高度専門職2号 | 高度2号工作范围 |
| LS-P0C1-046 | 経営・管理排除需法律会计资格的业务 | S1/S2 | exclusion_scope | 経営・管理 | 经管能做会计吗, 律师业务 |
| LS-P0C1-047 | 技人国需要本邦机构契约 | S1/S2 | activity_scope_detail | 技人国 | 雇佣合同, 委托合同 |
| LS-P0C1-048 | 技人国三类知识/文化基础范围 | S1/S2 | activity_scope_detail | 技人国 | 理工, 人文, 国际业务 |
| LS-P0C1-049 | 技人国排除其他明确资格活动 | S1/S2 | exclusion_scope | 技人国 | 技人国能经营吗, 能当老师吗 |
| LS-P0C1-050 | 企業内転勤限于海外事业所到日本事业所 | S1/S2 | activity_scope_detail | 企業内転勤 | 海外公司调日本 |
| LS-P0C1-051 | 介護以介護福祉士资格活动为核心 | S1/S2 | activity_scope_detail | 介護 | 介护福祉士资格 |
| LS-P0C1-052 | 法律・会計業務以法定资格业务为核心 | S1/S2 | activity_scope_detail | 法律・会計業務 | 外国法事务律师 |
| LS-P0C1-053 | 医療以法定医疗资格业务为核心 | S1/S2 | activity_scope_detail | 医療 | 医师资格, 护士资格 |
| LS-P0C1-054 | 特定技能1号以指定分野和相当知识经验为核心 | S1/S2 | activity_scope_detail | 特定技能1号 | 相当程度, 特定产业分野 |
| LS-P0C1-055 | 特定技能2号以熟练技能为核心 | S1/S2 | activity_scope_detail | 特定技能2号 | 熟练技能, 2号分野 |
| LS-P0C1-056 | 技能実習按计划类型区分 | S1/S2 | activity_scope_detail | 技能実習 | 企业单独, 团体监理 |
| LS-P0C1-057 | 文化活動是不伴随收入的研究/修得活动 | S1/S2 | exclusion_scope | 文化活動 | 文化活动能打工吗 |
| LS-P0C1-058 | 短期滞在覆盖观光探亲会议等短期活动 | S1/S2 | activity_scope_detail | 短期滞在 | 短期商务, 观光 |
| LS-P0C1-059 | 家族滞在扶养者资格范围 | S1/S2 | status_dependency_scope | 家族滞在 | 家族滞在谁能带 |
| LS-P0C1-060 | 家族滞在包含特定技能2号扶养，不含1号信号 | S2 | exclusion_signal | 家族滞在/特定技能 | 特定技能1号能带家属吗 |
| LS-P0C1-061 | 永住者在留期间为无期限 | S2 | duration_locator | 永住者 | 永住期限, 无期限 |
| LS-P0C1-062 | 日本人配偶者等包含配偶者/特别养子/出生子 | S1/S2 | status_scope_detail | 日本人の配偶者等 | 日配, 特别养子 |
| LS-P0C1-063 | 永住者配偶者等包含配偶者及日本出生继续在留子 | S1/S2 | status_scope_detail | 永住者の配偶者等 | 永配孩子, 日本出生 |
| LS-P0C1-064 | 家族滞在工作限制路由候选 | S1 + later L2/L4 | work_restriction_router | 家族滞在 | 家族滞在打工, 正社员, 资格外活动 |
| LS-P0C1-065 | 留学工作限制路由候选 | S1 + later L2/L4 | work_restriction_router | 留学 | 留学生打工, 28小时, 毕业后打工 |

---

## 4. Batch Plan

Cycle 1 should be extracted in batches that preserve validation value.

| Batch | Candidate IDs | Purpose |
|---|---|---|
| Batch 1 | LS-P0C1-001 to LS-P0C1-008 | qualification skeleton and duration boundary |
| Batch 2 | LS-P0C1-019, 024, 028, 037, 039, 041, 043, 064, 065 | high-frequency status/activity anchors plus work-restriction routers |
| Batch 3 | LS-P0C1-046 to LS-P0C1-060 | exclusion and risk-sensitive details |
| Batch 4 | Remaining activity-scope status cards | full coverage and long tail |
| Batch 5 | LS-P0C1-061 to LS-P0C1-063 plus rewrites | duration/status detail and cleanup |

Batch 1 must land before any formal expansion. It is the minimum skeleton that lets matcher explain “why this is an activity/status issue”.

---

## 5. AQL Evaluation Set

These are baseline vs candidate questions. They test whether the legal source layer improves answers without increasing unsafe certainty.

| # | Question | Expected Hit Family | Must Say | Must Not Say | Risk |
|---|---|---|---|---|---|
| 1 | 我是永住者，可以随便换工作吗？ | table2_status_scope | 永住者属身份/居住资格，通常没有就劳活动范围限制；仍要遵守一般劳动/税社保规则 | 不要说需要资格外活动许可；不要说只能做某类工作 | P0 |
| 2 | 日本人配偶者签证能打工吗？ | table2_status_scope | 日本人配偶者等属別表第二身份资格，通常无就劳活动限制 | 不要误当家族滞在；不要说一周28小时 | P0 |
| 3 | 永住者的配偶者签证能开公司吗？ | table2_status_scope | 属身份系资格，通常不按活动资格限制就劳/经营；个案仍看真实身份关系 | 不要说必须转经管才能开公司 | P1 |
| 4 | 定住者可以做便利店夜班吗？ | table2_status_scope | 定住者属別表第二，通常无就劳活动限制 | 不要套技人国/特定技能范围 | P0 |
| 5 | 我是家族滞在，可以打工吗？ | dependent_scope / shikakugai_distinction | 家族滞在是受扶养配偶者/子日常活动；打工通常要资格外活动许可并受范围限制 | 不要说家族滞在本来就能全职工作 | P0 |
| 6 | 家族滞在可以做正社员吗？ | dependent_scope | 不能只按“有工作”回答；要区分资格外活动和变更就劳资格 | 不要说拿到打工许可就能做全职正社员 | P0 |
| 7 | 特定技能1号能把老婆孩子办家族滞在吗？ | dependent_scope / tokutei_ginou_scope | 家族滞在 sponsor 范围要核对；特定技能2号与1号不能混同 | 不要把特定技能1号直接说成可带家族滞在 | P0 |
| 8 | 特定技能2号的家属能不能来日本长期住？ | dependent_scope / tokutei_ginou_scope | 应命中特定技能2号与家族滞在 sponsor 关系；仍需看家属资格申请 | 不要混成特定技能1号 | P1 |
| 9 | 技人国签证可以去餐厅做服务员吗？ | gijinkoku_scope / table1_activity_scope | 技人国是活动资格，要看专业性业务和雇佣合同；单纯现场服务通常高风险 | 不要说有工作合同就行；不要直接断言一定可/不可许可 | P0 |
| 10 | 技人国能做销售吗？ | gijinkoku_scope | 要看具体销售内容是否需要人文/国际业务等专业性，不能只按职位名判断 | 不要把“销售”一律说可以或不可以 | P1 |
| 11 | 我是技人国，想开公司自己经营，需要换经管吗？ | gijinkoku_scope / keiei_kanri_scope | 技人国和经管是不同活动资格；经营管理活动通常要另行确认资格变更 | 不要说技人国可以直接经营管理公司 | P0 |
| 12 | 经管签可以去别的公司打工吗？ | keiei_kanri_scope / shikakugai_distinction | 经管活动是经营/管理；其他公司雇佣劳动不当然包含在内，需确认资格外或变更 | 不要说经管等于任何工作都能做 | P0 |
| 13 | 经管签公司没生意，可以先去便利店打工吗？ | keiei_kanri_scope / shikakugai_distinction | 要区分经管活动持续性和额外打工；这是高风险，建议专业确认 | 不要给“先打工没事”的安慰结论 | P0 |
| 14 | 留学生毕业后可以继续打工等找工作吗？ | table1_activity_scope / shikakugai_distinction | 留学活动是受教育；毕业后活动基础变化，求职/就劳需确认对应资格 | 不要说留学签没过期就可以继续自由打工 | P0 |
| 15 | 留学签打工一周28小时，是每家公司28小时吗？ | shikakugai_distinction | 应说明通常是总量限制，不是每家公司分别算；具体按许可条件确认 | 不要说多家公司各28小时 | P0 |
| 16 | 短期滞在可以线上给中国公司远程办公吗？ | table1_activity_scope / shikakugai_distinction | 短期滞在是短期活动，涉及报酬/工作需谨慎确认活动范围 | 不要简单说“人在日本就不能/可以”，不要强答许可 | P1 |
| 17 | 技能实习可以换成特定技能吗？ | table1_activity_scope / tokutei_ginou_scope | 技能实习和特定技能是不同活动资格；需要看制度路径、领域、考试/评价等 | 不要把技能实习等同特定技能 | P1 |
| 18 | 特定技能1号可以做办公室文员吗？ | tokutei_ginou_scope / gijinkoku_scope | 特定技能按指定产业领域和技能业务；办公室文员可能更接近技人国但需个案 | 不要说特定技能可以做任何雇佣工作 | P0 |
| 19 | 高度人才是不是想做什么工作都可以？ | table1_activity_scope | 高度専門職也是活动资格，但范围比普通活动资格复杂；需看1号/2号和指定活动 | 不要误说等同永住 | P1 |
| 20 | 我拿日配，但现在离婚了，还能继续工作吗？ | table2_status_scope / status_basis_change | 就劳限制和身份基础变化要分开；离婚触发在留风险/届出/资格变更确认 | 不要只回答“能工作”忽略身份基础风险 | P0 |
| 21 | 永住者父母能不能办家族滞在？ | table2_status_scope / dependent_scope | 家族滞在是特定活动资格持有者扶养的配偶者/子，不应直接套父母 | 不要说永住者可以给父母办家族滞在 | P0 |
| 22 | 我是定住者，父母可以作为家族滞在来吗？ | table2_status_scope / dependent_scope | 定住者属別表第二；家族滞在 sponsor/对象不能简单套父母 | 不要说“定住者有身份资格所以家人都能来” | P0 |
| 23 | 工作签换公司后，签证种类没变就不用管吗？ | table1_activity_scope / gijinkoku_scope | 活动资格要看新活动是否仍符合范围，另有届出/更新时材料问题 | 不要说只要在留卡没过期就没事 | P0 |
| 24 | 我有资格外活动许可，可以做任何副业吗？ | shikakugai_distinction | 资格外活动许可有许可范围/条件，不等于任何副业都可 | 不要说拿到许可就无限制 | P0 |
| 25 | 经营管理签证是不是也属于工作签？ | table1_activity_scope / keiei_kanri_scope | 可说明它是別表第一活动资格中的经营/管理类，不是普通雇佣型工作范围 | 不要混成技人国或身份系资格 | P1 |
| 26 | 永住申请中，可以换工作或开公司吗？ | table2_status_scope / no_permission_probability | 要区分当前在留资格的活动范围和永住审查影响；不能只凭申请中状态判断 | 不要说申请中就不能/一定可以；不要给许可可能性断言 | P0 |

### AQL Improvement Criteria

Candidate improves answers when:

- 別表第一 activity qualification and 別表第二 status qualification are stable.
- 身份系资格 no longer receives qualification-outside-activity or 28-hour limits.
- 技人国、经管、留学、家族滞在、特定技能 answers first state scope, then individual confirmation.
- permission/cancellation questions are not answered with false certainty.

Candidate regresses when:

- 別表第一 and 別表第二 are mixed.
- 家族滞在、留学、短期滞在 are described as freely employable.
- 经管 is described as free employment, or 技人国 as free company management.
- 特定技能1号 and 2号 family treatment are mixed.
- legal source cards make answers more legalistic but less useful.

---

## 6. QA Gate

### Matcher Dry-Run Requirements

- Fixed fixtures, not ad hoc human judgment.
- Each fixture declares `question`, `expected_primary_hit`, `expected_excluded_hits`, `expected_category`, `expected_user_visible_policy`, `severity_if_wrong`.
- Clear status questions must hit corresponding skeleton.
- 身份系资格 questions must not hit qualification-outside-activity rules as primary.
- Aliases must normalize: 人文签 / 技人国 / 技术人文知识国际业务.
- Negative tests must separate 永住申请 from 永住者身份, 家族滞在变更 from 28-hour permission, and 技人国材料 from 技人国活动范围.
- Ambiguous questions must request current residence status before answering work limits.

### User-Visible Leakage Ban

Never show these in user-facing answers:

- `matcher`, `dry-run`, `skeleton`, `source package`, `fact card`, `injection`
- `source_status`, `ai_inferred`, `direct_source`, `related_source`
- `needs_domain`, `needs_review`, `human_approved`, `ai_extracted`
- `intent`, `domain`, `safety_gate`, `routing_status`, `fallback_reason`
- `unknown`, `null`, `undefined`, `TODO`, `TBD`
- model/system terms: DeepSeek, GPT, Claude, prompt, LLM
- QA terms: P0, P1, regression, blocker, must_have, must_not_have

### Blocking Conditions

Block Cycle 1 promotion if:

- any 身份系资格 is wrongly told to obtain qualification-outside-activity permission;
- any 活动系资格 is wrongly described as having no work/activity restriction;
- 家族滞在 / 留学 / 技人国 / 经管 work restriction direction is reversed;
- matcher cannot explain why a near skeleton was excluded;
- A/B candidate answer is more dangerous than baseline;
- user-facing output leaks internal fields;
- DOMAIN has not reviewed high-risk boundaries selected for injection.

---

## 7. Current Next Move

Cycle 1 extraction has landed as internal `ai_extracted` draft cards.

The next move is not more answer generation. Build the fixed dry-run fixture matrix described in [`CYCLE1_SUMMARY.md`](../legal-source-candidates/p0-cycle1/CYCLE1_SUMMARY.md), then use the same questions for baseline vs candidate answer A/B after the matcher gate is stable.
