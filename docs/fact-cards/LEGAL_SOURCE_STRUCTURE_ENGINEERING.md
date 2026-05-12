# TEBIQ Legal Source Structure Engineering

**Version**: v0.1  
**Date**: 2026-05-12  
**Owner**: Codex Production Lead / Current Fact Layer Operator  
**Status**: planning source of truth  

---

## 0. Purpose

TEBIQ 法源结构化工程不是“搬法律”，也不是把法条批量塞进知识库。

它的目标是建立一层稳定的 **法源骨架**，让前台 AI 咨询、速查材料、深水区识别、A/B 答案评估都能挂在同一套可追踪、可测试、可更新的官方事实资产上。

核心产物不是长文解释，而是可被系统调用的原子事实：

```text
official source
→ atomic claim
→ authority level
→ applicable scope
→ exclusions
→ evidence locator
→ matcher signal
→ answer QA cases
```

---

## 1. Authority Layers

所有卡必须声明自己属于哪一层。不同层级不能混成同等权威。

| Layer | Meaning | Examples | Product Use |
|---|---|---|---|
| L1 Law | 法律本文 / 基本权利义务 / 在留资格骨架 | 入管法、別表第一・第二 | 判断活动范围、身份资格、法定手续入口 |
| L2 Ordinance | 省令 / 基准 / 施行细节 | 上陸基準省令、入管法施行規則 | 判断准入基准、提交资料、程序要求 |
| L3 Notice / Guideline | 告示、官方指南、运用说明 | 定住者告示、特定活動告示、永住許可ガイドライン | 补足具体路径和审查重点 |
| L4 ISA Page / PDF | ISA 官方页面、申请页、材料页、FAQ | 在留資格一覧表、资格页、提交资料清单 | 用户可操作的手续、材料、窗口说明 |
| L5 Practice Signal | 实务备注 / deep-water signal | DOMAIN 审查、书士经验、冲突记录 | 只用于识别风险和路由，不单独作为确定法源 |

**Rule**: 当 L1/L2 与 L4 表述不同，卡片必须保留层级差异，不能写成“官方都这么说”。  
**Rule**: L5 不能单独产出确定答案，只能触发“需确认 / deep-water candidate / handoff”。

---

## 2. Source Universe Inventory

### P0 — Core Legal Backbone

P0 是第一阶段必须完成的法源骨架。没有 P0，后续扩张会变成零散 fact 增产。

| Priority | Source | Role in TEBIQ |
|---|---|---|
| P0 | 出入国管理及び難民認定法 / 入管法 | 在留资格、更新、变更、资格外、届出、永住、取消、退去等总骨架 |
| P0 | 入管法別表第一・別表第二 | 资格允许活动 / 身份地位的第一层定义 |
| P0 | 上陸基準省令 | 各资格准入基准，尤其技人国、经管、留学、家族滞在、特定技能等 |
| P0 | 入管法施行規則 | 申请手续、提交资料、别表、程序细节 |
| P0 | 入管法施行令 | 执行、机关、委任、程序补充 |
| P0 | ISA 在留資格一覧表 | 用户可理解的资格列表、活动范围、在留期间映射 |

P0 的产品目标：

- 建立“在留资格是什么 / 能做什么 / 不能做什么”的骨架。
- 建立“申请某资格的核心基准是什么”的骨架。
- 建立“更新、变更、资格外、届出、永住等通用手续”的骨架。
- 为速查材料清单提供上位法源锚点。
- 为 deep-water 识别提供第一批冲突与沉默信号。

### P1 — High-Impact Specialty Sources

| Priority | Source | Role in TEBIQ |
|---|---|---|
| P1 | 高度専門職省令 / 高度人材ポイント制相关告示・指南 | 高度人才、永住缩短、J-Skip / J-Find |
| P1 | 特定技能相关省令・告示・运用要领 | 特定技能契约、支援计划、分野别基准 |
| P1 | 定住者告示 | 定住者路径、日系、离婚后路径等 |
| P1 | 特定活動告示 | 告示内/外、ワーホリ、毕业后活动、スタートアップ等 |
| P1 | 永住許可ガイドライン | 永住审查重点、税、年金、在留期间、身元保证等 |
| P1 | ISA 各在留资格说明页 / 申请页 / 提出资料页 | 手续和材料的官方操作层 |

### P2 — Supporting Legal Domains

| Priority | Source | Role in TEBIQ |
|---|---|---|
| P2 | 国民年金法 / 厚生年金保険法 | 永住年金、公司社保、免除・猶予风险 |
| P2 | 健康保険法 / 国民健康保険法 | 永住健康保险、资格确认、マイナ保険証 |
| P2 | 地方税法 / 所得税法 / 法人税法 | 住民税、国税、公租公课、经管税务 |
| P2 | 住民基本台帳法 / 戸籍法 | 住民票、户籍謄本、世帯、关系证明 |
| P2 | 民法 | 婚姻、离婚、亲子、养子、扶养 |
| P2 | 会社法 / 商業登記法 | 经管、资本金、役员、登记、事业实态 |
| P2 | 労働基準法 / 労働契約法 / 労働者派遣法 / 職業安定法 | 技人国派遣、劳动条件、雇佣合同、特定技能契约 |

### P3 — Deep-Water / Edge Sources

| Priority | Source | Role in TEBIQ |
|---|---|---|
| P3 | 行政手続法 / 行政不服審査法 / 行政事件訴訟法 | 不许可、理由、救济、再申请、诉讼 |
| P3 | 国籍法 | 归化相关；暂不进入普通在留咨询核心 |
| P3 | 難民・補完的保護相关条文和指南 | 高风险领域，只做 deep-water routing |
| P3 | 技能実習法 / 育成就労相关改正法源 | 制度转换期，先地图化，后续谨慎产品化 |

---

## 3. P0 Completion Target

P0 完成不是“写完某个 PDF”，而是完成一套可运行的法源骨架。

### Expected Size

P0 预计不是 100 张小卡，而是一个中型工程：

```text
Target: 220-300 legal source cards
Minimum acceptable pilot: 160 cards
Expansion gate: only expand to P1 after P0 matcher/AQL passes
```

### P0 Definition of Done

P0 完成必须同时满足：

1. P0 sources 全部建档，且每个 source 有稳定 URL、authority layer、checked date。
2. 入管法別表第一/第二的主要在留资格都被拆成 activity-scope cards。
3. 高频资格的上陸基準核心 claim 已拆成 cards。
4. 更新、变更、资格外、届出、在留期间、永住等通用程序已有 cards。
5. 每张卡都有 matcher phrases、must_say、must_not_say、QA cases。
6. dry-run 能显示命中原因、排除原因、authority layer。
7. AQL 对一组真实问题跑 baseline vs candidate。
8. QA 确认用户可见答案不泄漏内部字段。
9. DOMAIN 抽检 high / critical / deep-water candidate。

---

## 4. P0 Card-Count Production Loops

每一轮以卡数量为单位扩张。每轮都必须完整走完：

```text
scope selection
→ FACT extraction
→ Codex normalization
→ duplicate/conflict scan
→ matcher dry-run
→ AQL baseline vs candidate
→ QA leakage/regression
→ DOMAIN high-risk review
→ promote / hold / rewrite
```

### P0 Prep — Schema and Source Registry

**Card target**: 0 production cards  
**Purpose**: 先固定结构，防止大批量生产后返工。  

Deliverables:

- `legal_source_type`
- `authority_layer`
- `law_article_ref`
- `source_locator`
- `claim_type`
- `applicable_statuses`
- `application_type`
- `exclusion_scope`
- `deep_water_candidate`
- `source_quote`
- `matcher_phrases`
- `qa_cases`

Exit gate:

- FACT、Codex、AQL、QA、DOMAIN 都接受同一 schema。

### P0 Cycle 1 — Status Activity Skeleton

**Card target**: 50-70 cards  
**Sources**: 入管法別表第一・第二 + ISA 在留資格一覧表  
**Goal**: 建立“每个资格能做什么 / 是活动资格还是身份资格”的骨架。

Card families:

- 別表第一：就劳资格 activity-scope cards
- 別表第一：非就劳资格 activity-scope cards
- 別表第一：特定活動 / 技能実習 / 特定技能 special cards
- 別表第二：永住者、日配、永配、定住者 status-scope cards
- cross-card: 別表第一 vs 別表第二 work restriction distinction

Validation set examples:

- “家族滞在可以工作吗？”
- “永住者需要资格外活动许可吗？”
- “技人国能做餐饮现场吗？”
- “特定技能1号能带家属吗？”
- “经营管理可以给别人打工吗？”

Exit gate:

- matcher can hit correct status-scope card.
- AQL confirms answers no longer confuse activity qualification and status qualification.

### P0 Cycle 2 — Landing Criteria Core

**Card target**: 60-80 cards  
**Sources**: 上陸基準省令 + current ISA amendment pages where needed  
**Goal**: 建立高频资格的准入基准骨架。

Priority statuses:

- 技術・人文知識・国際業務
- 経営・管理
- 留学
- 家族滞在
- 特定技能 1号 / 2号
- 企業内転勤
- 技能
- 介護
- 高度専門職 core hooks only

Card families:

- education / work experience / field relevance
- company contract / institution requirement
- support / dependent relationship
- financial / study institution requirement
- business manager 2025 amended requirements
- special exclusions and “does not determine permission” notes

Validation set examples:

- “我文科毕业能做人文签吗？”
- “经管现在还是500万吗？”
- “留学续签一定要银行流水吗？”
- “家族滞在转工作能不能先上班？”

Exit gate:

- no old-rule hallucination such as outdated 500万 standard.
- high-risk criteria cards are queued for DOMAIN.

### P0 Cycle 3 — Residence Procedure Core

**Card target**: 60-80 cards  
**Sources**: 入管法 + 入管法施行規則 + ISA procedure pages  
**Goal**: 建立在留中最常见手续的法源骨架。

Card families:

- 在留期間更新
- 在留資格変更
- 在留資格取得
- 資格外活動許可
- 所属機関等届出
- 配偶者関係届出
- 在留カード相关手续
- 再入国 / みなし再入国
- 申請中特例期間

Validation set examples:

- “签证快到期了还能补材料吗？”
- “换工作14天届出怎么做？”
- “配偶离婚后多久要处理在留？”
- “家族滞在拿到工作 offer 后能不能先上班？”

Exit gate:

- time-sensitive / deadline-sensitive questions trigger correct cautious routing.
- no answer implies permission before approval where approval is required.

### P0 Cycle 4 — Permanent Residence and Cancellation Anchors

**Card target**: 40-60 cards  
**Sources**: 入管法 + 入管法施行規則 + 永住 guideline as linked source  
**Goal**: 建立永住、在留取消、身份资格风险的骨架。

Card families:

- 永住许可 statutory basis
- 永住 guideline anchors
- tax / pension / insurance as linked requirements
- status loss and residence cancellation triggers
- spouse status change / divorce signal
- deep-water candidates where legal source is silent or guideline-based

Validation set examples:

- “年金免除影响永住吗？”
- “日配离婚还能续签吗？”
- “永住申请需要几年税？”
- “经营管理公司停了会不会取消在留？”

Exit gate:

- AQL confirms “not enough information / needs specialist” is triggered where source is silent.
- DOMAIN reviews high-risk permanent-residence and cancellation cards.

### P0 Cycle 5 — P0 Integration and Burn-Down

**Card target**: 20-40 cards plus rewrites  
**Sources**: all P0 sources  
**Goal**: 清理冲突、补洞、做 A/B，决定 P0 是否可以进入 production candidate。

Work:

- duplicate merge
- conflict cards
- exclusion-scope correction
- matcher false-positive burn-down
- AQL answer regression set
- QA user-visible leakage check
- DOMAIN unresolved queue

Exit gate:

- P0 source registry complete.
- candidate fact set improves answer quality without increasing unsafe certainty.
- unresolved high-risk facts are held, not injected.

---

## 5. Agent and Window Roles

### Internal to Codex Orchestration

| Role | Current / Expected Operator | Responsibility |
|---|---|---|
| Production Lead | Codex main window | scope, schema, normalization, repo integration, dry-run, deployment |
| Current Fact Layer Operator | FACT subagent / Russell | official source extraction, atomic claims, source quotes, card draft |
| AQL | AQL subagent | baseline vs candidate answer quality and misuse detection |
| QA | QA subagent | matcher leakage, UI/user-visible leakage, regression checks |
| CODEXUI | CODEXUI subagent | only if dry-run / observation UI changes are needed |
| Product Copy | Product Copy subagent | user-visible labels only; not legal content |

### External Independent Windows

| Role | Must Remain External? | Reason |
|---|---|---|
| DOMAIN | Yes | legal/practice boundary review, high/critical cards, deep-water signals |
| Independent AQL | Yes | final quality balance; avoids Codex self-grading |
| Founder / PL | Yes | product strategy, expansion/stop decision |

---

## 6. Promotion Rules

No P0 card enters production injection just because it exists.

The existing fact-layer state machine in `docs/fact-cards/README.md` remains authoritative. This project may use planning labels such as `candidate` or `needs_domain` in reports, but they must be mapped back to existing states before any repo/runtime integration.

| Working Label | Existing State Mapping | Meaning | Production Use |
|---|---|---|
| `extracted` | `ai_extracted` | source-backed draft, not yet normalized or tested | dry-run only |
| `candidate` | `ai_extracted` | normalized and has QA cases, but not promoted | dry-run / A/B only |
| `verified` | `ai_verified` | passed AI verification and low/medium risk | injection allowed per existing fact-layer gate |
| `needs_domain` | `needs_review` | high-risk or legal/practice uncertainty | no factual injection |
| `reviewed` | `human_reviewed` | DOMAIN/PL approved | injection allowed |
| `conflict` | `conflict` | official sources conflict or interpretation gap | no injection; deep-water signal only |

Critical rule:

```text
Wrong fact card is worse than no fact card.
```

When uncertain, card should still exist as source evidence, but its fact claim must not be injected as certainty.

---

## 7. First P0 Operating Instruction

The first production move is not “make 300 cards”.

The first move is:

1. Freeze schema.
2. Ask FACT to produce a P0 source registry and Cycle 1 card candidate list.
3. Codex normalizes the card list into batches.
4. Only then start P0 Cycle 1 extraction.

Recommended first FACT instruction:

```text
Read docs/fact-cards/LEGAL_SOURCE_STRUCTURE_ENGINEERING.md.
Do not produce cards yet.
Produce P0 Source Registry Draft:
- official source title
- URL
- authority_layer
- legal_source_type
- latest effective date if visible
- relevant P0 scope
- expected card families
- source access notes
Then propose P0 Cycle 1 card list, target 50-70 cards.
```

---

## 8. Primary Reference Links

- ISA 在留資格一覧表: <https://www.moj.go.jp/isa/applications/status/qaq5.html>
- ISA 出入国管理関係法令等: <https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html>
- 入管法 / Immigration Control and Refugee Recognition Act: <https://www.japaneselawtranslation.go.jp/en/laws/view/1934>
- 経営・管理に係る上陸基準省令等の改正: <https://www.moj.go.jp/isa/applications/resources/10_00237.html>
- e-Gov law data API reference: <https://laws.e-gov.go.jp/docs/law-data-basic/607318a-lawtypes-and-lawid/>
