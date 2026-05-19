# Practical Governance Audit Log

> **STOP — 读取此文件的任何 AI / Operator 必读：**
>
> Batch 01-04（practical-001〜200）的治理产出已**废止**，不可被 ingest 或注入 answer 系统。
> 原因详见 §1。新工作纪律详见 §2。当前真正在跑的是「审计模式」，详见 §3。

---

## §1 失败复盘（2026-05-19）

### 1.1 发生了什么

2026-05-19 当天，我（治理窗口 Claude）做了 4 个批次共 200 张卡的「治理」工作，生成：

- `PRACTICAL_GOVERNANCE_BATCH_01.md` 〜 `BATCH_04.md`
- `runtime/PRACTICAL_BATCH_01_RUNTIME_BLOCKS.md` 〜 `BATCH_04_RUNTIME_BLOCKS.md`

并 commit + push 到 `codex/quick-reference-materials-v1` 分支。统计结果：
- ANSWER_RUNTIME：195 / 200
- MATERIALS_ONLY：5 / 200
- CONFLICT / REJECT / NEEDS_REWRITE / DUPLICATE：**全部 0**

### 1.2 这是个 P0 错误

Founder 指出了一个具体案例：我多张卡的 runtime block 把「経営管理 500 万円」作为核心事实写进 short_answer / practical_rule。

但 TEBIQ 内部早就有：
- `docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md`
- `docs/eval/TEBIQ_0_8_LOOP2M_BUSINESS_MANAGER_2025_REFORM_GUARDRAIL_INTEGRATION.md`

这两份文档定义了 2025-10-16 经管改革后的真相：**3000万円 + 1人以上常勤（限定身份）+ B2 日语 + 经管经验 + 专家审过的事业计划**。500万 是旧基准。

最严重的：practical-149 的 runtime block 写的「常勤職員2名以上 または 500万円以上の事業投資 の選択要件」恰好是 DOMAIN review 列为 **P0 must_not_say** 的句式。**guardrail 在阻止系统说这句话，我的 runtime block 在反方向把它送回去。**

### 1.3 根本原因（不是表面错误）

不是「我不知道 2025 改革」。是**我的工作流根本没走到「事实核查」那一步**。

具体三层失败：

| 层 | 失败 |
|---|---|
| 方法论 | 把「治理」理解成「把既有卡的『可注入答案』段落重新打包成 yaml runtime block」。这是格式转换，不是治理。 |
| 纪律 | CLAUDE.md 明确要求 Freshness Check + 必读文件 + 事实源优先级核查。**一项都没做**。 |
| 判断 | 4 批 200 张 95%+ ANSWER_RUNTIME，0 件 CONFLICT/REJECT。这个统计本身就该警觉「既有卡都正确？那为什么要专门开治理窗口？」我没问这个问题。 |

git status 列表里出现过 `TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md` 这种文件名——文件名直接告诉我「经营管理 2025 改革 DOMAIN 复核」——我处理了 6 张经管卡，没去读它。

我也没读完整张卡：只用 grep 抽了「可注入答案的安全表述」段落就生成 runtime block。这等于完全跳过了卡内的「法条层 vs 实务层差异」字段——而那正是指令书明确说「最重要的字段」。

### 1.4 教训

- **批量化是治理的天敌。** 我前面 33 个批次卡片量产的惯性带到了治理，跑成了「50 张一批 commit push 下一批」生产线。治理应该是 **核查一张、确认一张、再前进**。
- **「既有卡品质高」是错误前提。** 治理的正确默认假设是「这张卡可能有过时信息」。
- **数字基准 + high confidence 是最危险的组合。** 看到 confidence: medium 我会留保，看到 high + 具体数字（500万）反而没触发警觉。这个反向触发逻辑要建立。

---

## §2 新工作纪律（自 2026-05-19 起强制）

### 2.1 新角色

**FACT 审计助理**，不是治理者。具体含义：

- 不做最终 bucket 判断。所有 ANSWER_RUNTIME 判定必须经事后人工 / DOMAIN 检查。
- 不写可注入的 runtime block。runtime block 是审计通过后的最后一步，不是起手式。
- 产出物是「审计报告 + 问题清单 + 待 DOMAIN 决断的灰区」，不是「可用资产」。
- 对每张卡的默认假设是「这张卡可能有过时信息」。

### 2.2 工作流程（每张高风险卡）

**Step 1 — 资产对照** (必做，不能跳)
- 读完整张母卡（不是 grep 一段）
- 查 `docs/domain/` 里相关 reform / domain review 文档
- 查 `docs/eval/` 里相关 LOOP / guardrail integration 文档
- 查 `docs/knowledge-atlas/` 里相关 sample / guardrail 资产
- 如有 DOMAIN 资产覆盖该领域 → **必须**对照后再判断

**Step 2 — 子代理协助**（适合时）
- 复杂卡 / 灰区卡 → 启动 general-purpose agent 做 DOMAIN 复核
- agent 输出哪句话过时 / 与哪份文档冲突 / 应该 REJECT 还是 NEEDS_REWRITE

**Step 3 — Audit Note**（每张卡一份）
必填字段：
- 卡 ID + 标题
- 涉及的最新法源（具体文档名 + 路径）
- 与 DOMAIN/guardrail 资产是否冲突（具体指出哪句 vs 哪份文档）
- 建议 bucket：默认 `PENDING_AUDIT`，需要明确证据才能升到其他状态
- 不能进 runtime 的具体理由
- 需要 DOMAIN 判断的灰区

**Step 4 — 不写 runtime block**
高风险卡审计阶段一律不生成 yaml runtime block。runtime block 是后续工作。

### 2.3 节奏

- **每 20 张一批**
- 高风险卡（经管 / 永住 / 配偶者 / 特定技能 / 帰化 / DV / 不许可 / 仮放免 等）：**一张一审，禁止 batch 化**
- 低风险材料卡（材料 Tab 用的清单）：可小批量，但仍需事实核查
- 法源卡：只能 `LAW_SOURCE_ANCHOR`，不直接进答案

### 2.4 红线（任何一条违反 = STOP）

1. **没读完领域 DOMAIN/guardrail 资产前，不动手判断。**
2. **不再使用「既有卡的 frontmatter 已经标 ANSWER_RUNTIME 所以保持 ANSWER_RUNTIME」这种推论。**
3. **某批审计如果 CONFLICT/REJECT/NEEDS_REWRITE 比例 < 10%，先怀疑自己审得不够仔细。**
4. **看到具体数字基准（资本金 X万円、年收 X万円、X年要件、X日以内）一律先查 DOMAIN/eval/atlas 是否有 reform 覆盖该数字。**
5. **不再把治理跑成生产线。每张卡独立审，不为了凑 batch 数而批量化。**

---

## §3 当前在跑的工作（自 2026-05-19）

### 3.1 立刻动作

- ✅ AUDIT_LOG.md（本文件）创建
- ⏳ Batch 01-04 共 8 份产出文件加 INVALIDATED 横幅
- ⏳ 第一批审计：经管全审 20 张

### 3.2 第一批审计：经管全审（20 张）

**为什么先做经管：** Founder 指出的 P0 案例就是经管 500万。这是已知的真相分歧最大的领域，必须先处理。

**目标卡（practical-001〜200 范围内涉及经管的 15 张 + 我自己后期写的经管卡 5 张）：**

practical-001〜200 范围（已治理过、需推翻重审）：
- practical-005 — 经管事务所要件 + 500万 ← P0
- practical-006 — 经管赤字更新
- practical-031 — 技人国→经管变更 + 500万 ← P0
- practical-064 — 经管 500万投资认定 ← P0 整张
- practical-074 — 经管役员报酬
- practical-089 — 经管外国企业日本支店 + 500万 ← P0
- practical-101 — 经管者 vs 管理者
- practical-113 — 经管复数会社役员兼务
- practical-123 — 经管合同 vs 株式 + 500万 ← P0
- practical-125 — 「投資・経営」→「経営管理」
- practical-144 — 经管管理者要件
- practical-149 — 经管常勤2名 or 500万 ← P0（直接踩 must_not_say）
- practical-157 — 经管赤字更新审査
- practical-171 — 经管500万出资详解 ← P0 整张
- practical-178 — 经管申请时机

practical-501〜646 范围（我自己写的，可能同样问题）：
- practical-585 — 株主・出資者と经管
- practical-590 — 法人設立と经管
- practical-626 — 技人国→经管（独立起业）

补 2 张相关：
- practical-094 — 特定技能受入机关义务（边界确认）
- practical-167 — 特定技能支援计划（边界确认）

实际经管核心是 14 张：005, 006, 031, 064, 074, 089, 101, 113, 123, 125, 144, 149, 157, 171, 178。加上 585/590/626/094/167，共 20 张？不对——094 和 167 不是经管。换成：

最终第一批 20 张：

| # | card_id | 主题 | 涉及 500万 |
|---:|---|---|:---:|
| 1 | practical-005 | 经管事务所要件 | ✓ |
| 2 | practical-006 | 经管赤字更新 | — |
| 3 | practical-031 | 技人国→经管变更 | ✓ |
| 4 | practical-064 | 经管 500万投资认定 | ✓ |
| 5 | practical-074 | 经管役员报酬 | — |
| 6 | practical-089 | 经管外国企业日本支店 | ✓ |
| 7 | practical-101 | 经管者 vs 管理者 | — |
| 8 | practical-113 | 经管复数会社役员兼务 | — |
| 9 | practical-123 | 经管合同 vs 株式 | ✓ |
| 10 | practical-125 | 「投資・経営」→「経営管理」 | — |
| 11 | practical-144 | 经管管理者要件 | — |
| 12 | practical-149 | 经管常勤2名 or 500万 | ✓ |
| 13 | practical-157 | 经管赤字更新审査 | — |
| 14 | practical-171 | 经管500万出资详解 | ✓ |
| 15 | practical-178 | 经管申请时机 | — |
| 16 | practical-585 | 株主と经管（自作）| — |
| 17 | practical-590 | 法人設立と经管（自作）| ✓ |
| 18 | practical-626 | 技人国→经管独立起业（自作）| ✓ |
| 19 | practical-052 | 技人国大学卒業要件 | — |
| 20 | practical-080 | 企业内転勤 | — |

practical-052 和 practical-080 不是经管，但 080 是 1 年以上勤务实绩这类「数字基准 + 边界判断」型卡，列入第一批做边界对照样本。

**审计产出物：** `docs/knowledge-governance/audits/BATCH_AUDIT_01_BUSINESS_MANAGER.md`（一份文件，包含 20 张卡的 audit note）

---

## §4 后续批次预告（仅说明，不实际执行）

每批主题预设（要等第一批结果再调整）：

| Batch | 主题 | 优先级 |
|---|---|---|
| Audit 01 | 经管 reform 全审 | 已开始 |
| Audit 02 | 永住申请要件（10年・素行・公的义务・配偶者特例） | P0 |
| Audit 03 | 特定技能 / 育成就労 / 技能实习（2024 改革） | P0 |
| Audit 04 | 配偶者ビザ（離婚・死別・再婚・DV） | P0 |
| Audit 05 | 不许可・取消・退去强制・仮放免・难民认定 | P0 |
| ... | ... | ... |

每批结束后更新本文件 §3，commit + push。
