# TEBIQ QA Gates

> 本文件是 QA / Codex / DOMAIN-CC 在审计 PR、页面、文案、API、Eval 数据时的**门禁基准**。
>
> 长期产品宪法见 `TEBIQ_CONTEXT_PACK.md`；当前主线状态见 `TEBIQ_CURRENT_STATE.md`；用户端文案原则见 `TEBIQ_COPY_SOURCE.md`。

---

## 0. 用途

QA 的工作是回答两个问题：

1. **它对吗？** — 技术对、语义对、领域对
2. **它真的可以送到用户面前吗？** — 用户读完是否被 TEBIQ 提升、还是被弄糊涂

**自动化 QA 通过 ≠ 可以上线。** 见 §6。

使用规则：

- 任何审计 PR / 页面 / 文案 / API 时必须读取本文件
- 本文件不替代 `TEBIQ_CONTEXT_PACK.md`，两者必须同时读取
- 与 `TEBIQ_COPY_SOURCE.md` 禁用词清单不一致时，以更严格者为准

---

## 1. QA 分层（Technical / Semantic / Domain / UX-Trust）

> **TEBIQ 的 QA 不是单一类目。** 同一个 PR 可能在 Technical 全绿、但在 Semantic 或 Domain 红。下列四类必须分别评估，不可互相抵消。

### 1.1 Technical QA

**关注**：API 契约、500、sidecar、内部字段、禁用词扫描、串域字符串。

| 检查项 | P 级 |
|---|---|
| API 返回 view_model / engine_version / safety / answer_id 等契约字段 | P0 |
| `/answer/{id}` 可打开、reload 后 sidecar 不可见 | P0 |
| 用户可见位置出现内部字段 / 枚举名 / sidecar JSON | P0 |
| 用户可见位置出现 `unknown` / `null` / `undefined` | P0 |
| 用户可见位置出现禁用词（见 §2） | P0 |
| 500 / 路由崩溃 / 路由 404（应可访问的路由） | P0 |
| 占位符痕迹（`[TBD]` / `TODO` / `___`） | P1 |

### 1.2 Semantic QA

**关注**：答案是否答用户原问题、方向是否反、是否危险承诺、是否漏关键事实。

详细 P0 列表见 §3。

### 1.3 Domain QA

**关注**：DOMAIN-CC 标注准则下的 `must_have` / `must_not_have` / `should_handoff` / `fact_card_candidate` 是否符合。

| 检查项 | P 级 |
|---|---|
| 应有的 `must_have` 缺失 | 通常 P1（高风险题 P0） |
| 命中 `must_not_have` 列表的表达 | P0 |
| 应触发 `should_handoff` 但未提示专业确认 | P0（高风险题） |
| 政策事实与 DOMAIN-CC 标注的事实卡不一致 | P0 |
| 政策事实由 AI 编造（无事实卡 / 无 DeepSeek 原文支撑） | P0 |

### 1.4 UX Trust QA

**关注**：页面是否可信、是否像工程 demo、是否把 DeepSeek 的好答案包坏。

| 检查项 | P 级 |
|---|---|
| 一个连贯回答被拆成 4+ 张卡片 | P1 |
| true_focus 标签 / icon / 颜色块视觉过重 | P1 |
| 页面读起来像 AI 产品 demo（卖萌、亲切、营销腔） | P1 |
| TEBIQ 输出在 Eval 对比中明显比 DeepSeek 裸答更危险 / 更错 | **P0** |
| TEBIQ 输出在 Eval 对比中明显比 DeepSeek 裸答更难读、信息量更少 | P1 |
| 页面显示底层模型字样（DeepSeek / GPT / ChatGPT / Claude / AI 智能…） | P0 |

---

## 2. 禁用词扫描表

每次 QA 必须全文扫描以下词句 / 字段，出现在用户可见文案中即为 **P0**：

| 禁用词 / 字段 | 类型 |
|---------------|------|
| 别担心 | 情绪 AI 腔 |
| 我懂你 | 情绪 AI 腔 |
| 我可以帮你 | 情绪 AI 腔 |
| 重要风险提醒 | 官腔标题 |
| 你没问，但要注意 | 揭穿内部逻辑 |
| AI 智能分析 | 功能噪音 |
| 一键开启专业守护 | 营销腔 |
| 严重违规 | 过度惊吓 |
| 立即预约专家 | 导流腔 |
| 我是 AI / 我是 GPT / 我是 DeepSeek / ChatGPT 帮你 / Claude 帮你 | 自暴底层模型 |
| `fallback_reason` | 内部字段泄漏 |
| `safety_gate_replaced` | 内部字段泄漏 |
| `no_source_matched` | 内部字段泄漏 |
| `out_of_scope` | 内部字段泄漏 |
| `low_confidence` | 内部字段泄漏 |
| `unknown` | 未处理状态泄漏 |
| `null` | 未处理状态泄漏 |
| `undefined` | 未处理状态泄漏 |
| `__answer_run_v1__` | 内部字段泄漏 |
| `domain` / `intent` / `safety_gate` / `cross_domain`（作为字段名出现） | 枚举名泄漏 |

---

## 3. Semantic P0（语义级阻塞）

> 以下情况一旦在用户可见输出中出现，即为 **P0**，必须阻塞 merge / canary。这些不是技术 bug，是语义 bug — Technical QA 全绿时仍可能在这里全红。

### 3.1 方向题

- **方向反**：用户问的是 A → B（如"经管 → 人文"），AI 回答的是 B → A（"人文 → 经管"）
- 转签题、续签题、放弃题的方向倒置

### 3.2 资格混淆

- 家族滞在想转工作签 → 答成"资格外活动 28 小时"（资格外活动不是转签）
- 配偶签 ↔ 经管签 ↔ 就労签 ↔ 永住 跨类型混淆
- 高度专门职 / 经营管理 / 技人国 / 永住 / 定住 之间的资格混用

### 3.3 期限题

- 入管补材料期限问题被当成普通问题处理（漏掉"必须在指定期限内"的紧迫性）
- 不许可通知书的回应窗口（再申请 / 异议 / 出国重申）轻率给出
- 在留卡到期前 / 后的处理顺序混淆

### 3.4 高风险断言

- 不许可通知书 → 轻率建议"出国后重新申请"（应至少建议先咨询）
- 永住申请年金 / 税金问题 → 给出确定性结论（"一定通过 / 一定不通过"）
- 配偶离婚转定住 → 忽略婚姻年数 / 子女 / 6 个月窗口
- 任何形式的"一定 / 绝对 / 保证"承诺

### 3.5 Hallucination

- AI 输出编造关键政策事实（手续名、期限、条件、政策依据）
- 政策事实与 DOMAIN-CC 事实卡 / 真实法令文本不一致

### 3.6 缺失专业确认

- 高风险问题（不许可、补材料、配偶离婚后转定住、永住补缴年金、放弃在留资格）未提示行政書士 / 入管 / 区役所等专业出口

### 3.7 包坏

- **TEBIQ 输出在 Eval 对比中明显比 DeepSeek 裸答更危险或更错** — 即"TEBIQ 把好答案包坏"
- 这是 Eval-driven 策略的红线（见 `TEBIQ_CONTEXT_PACK.md §2`）

---

## 4. Eval Lab Data Gate

> Eval Lab 是当前数据闭环的主力（见 `TEBIQ_CONTEXT_PACK.md §2`）。本节定义对 Eval 数据本身的 QA 准则。

### 4.1 数据存在性

- Eval Lab 必须能持续积累三类数据：`eval_questions`、`eval_answers`、`eval_annotations`
- 每条记录必须有 `schema_version`
- DeepSeek 裸答 (`answer_type='deepseek_raw'`) 和 TEBIQ 当前管线输出 (`answer_type='tebiq_current'`) **都必须保存**，不能只保存其中之一
- 同一题在同一 `answer_type` 下，新一次生成应**覆盖**旧记录（保持"最新一次生成"语义），不允许出现一题多条互相矛盾的现行记录

### 4.2 标注完整性

annotation 行必须保留以下字段（缺一即视为标注未完成）：

- `severity`（OK / P2 / P1 / P0）
- `direction_correct`（yes / no / null）
- `must_have`
- `must_not_have`
- `should_handoff`（yes / no / null）
- `action`（`golden_case` / `prompt_rule` / `fact_card_candidate` / `handoff_rule` / `ignore`）
- `reviewer`

### 4.3 字段扩展兼容

- 任何字段新增必须**保持旧数据兼容**（旧行不被破坏，未填字段 default 合理）
- 不允许修改字段语义而不升 `schema_version`
- 任何破坏性 schema 改动必须在 `TEBIQ_DECISION_LOG.md` 立条目说明

### 4.4 导出 JSON 要求

无论 full export 还是 golden export，导出 JSON 必须包含：

- `schema_version`
- `exported_at`（ISO 时间戳）
- `items`（数组形态的题目 / 答案 / 标注）

### 4.5 Eval 数据的边界

- Eval Lab 是**内部工具**，路由必须 env-gated（见 `TEBIQ_CURRENT_STATE.md` §4）
- Eval Lab 不应出现在用户可见导航
- Eval Lab 必须 `noindex`
- 标注内容（`must_have` / `must_not_have` / `reviewer_note`）**永不**直接渲染到用户端 — 它们是**反推依据**，不是用户端文案

---

## 5. Comparison Gate（任何回答路径改动必须跑对比）

> 任何涉及 **回答路径 / Prompt / DeepSeek / Answer projection / 回答页 UI** 的改动，merge 前必须有对比数据。

### 5.1 必须比较的四个维度

| 维度 | 来源 |
|------|------|
| **DeepSeek 裸答** | `eval_answers.answer_type='deepseek_raw'` |
| **TEBIQ 当前输出（修改前）** | merge 前的 main 上的 `tebiq_current` |
| **TEBIQ 输出（修改后）** | 该 PR 分支生成的 `tebiq_current` |
| **DOMAIN-CC / 用户标注** | `eval_annotations` |

### 5.2 通过条件

- 修改后的 TEBIQ 输出 **不应在任何题上比 DeepSeek 裸答更危险或更错**
- 修改后的 TEBIQ 输出 **不应在任何题上比修改前的 TEBIQ 更危险或更错**
- 如出现"在某些题上提升，在另一些题上倒退"，PR 必须在 description 里**显式列出倒退的题**与产品负责人裁决

### 5.3 例外

- Eval Lab 自身代码改动（不影响用户端答案路径）：可豁免，但必须明确标注 "no user-facing answer path change"
- 纯文档 / 注释 / 内部测试改动：豁免

---

## 6. 上线 Gate（Ship Gate）

> **自动化 QA 通过不等于可以上线。**

任何**影响用户端回答**的 PR，merge / canary 必须满足全部下列条件：

- [ ] **Technical QA**：P0 = 0
- [ ] **Semantic QA**：§3 列表逐项检查通过；P0 = 0
- [ ] **Domain QA**：DOMAIN-CC 已对**至少 10 个核心题**做人工抽查
- [ ] **UX Trust QA**：未出现"包坏"现象
- [ ] **Comparison Gate**：§5 对比数据已跑过，无倒退或倒退已被产品负责人显式接受
- [ ] **方向题 / 高风险题人工判断**：列入此 PR 的方向题、补材料题、不许可题、永住题、配偶离婚题至少各 1 道经过人工方向核对
- [ ] **产品负责人 / 用户最终裁决**：在 PR description 或 Decision Log 留痕

任一未满足，禁止 merge。

### 不影响用户端回答的 PR

如 PR description 明确声明 "no user-facing answer path change"（如纯 Eval Lab、纯内部脚本、纯 docs），可降级为：

- [ ] Technical QA：P0 = 0
- [ ] 范围声明属实（QA 抽查代码确认未触及 `lib/answer/**` / `app/api/questions/**` / 用户端回答页）

---

## 7. 旧 10 问 regression 的定位

> Answer Core V1 的 10 问 regression（配偶签离婚转定住 / 厚生年金截止日 / 家族滞在转工作签 / 经管 ↔ 人文 / 经管续签材料 / 代表取締役变更 / 入管补材料 / 不许可通知书 / 永住年金）保留，但**重新定位**：

### 这 10 问是

- **安全底线** — 触碰 answer 路径的 PR 至少不能让这 10 问回归
- **方向题代表** — 它们覆盖了 Semantic P0 §3 的多类风险
- **快速冒烟** — 在 Comparison Gate 跑全量之前，先跑这 10 问做粗筛

### 这 10 问不是

- **答案质量充分证明** — 不能再把"10 问 PASS"当作产品可上线证明
- **完备的 Eval 集** — 真正的 Eval 数据闭环要看 `eval_questions` + `eval_annotations`，不是这 10 问
- **替代 Comparison Gate** — 10 问全过仍可能在其他 90 题上倒退

### 检查矩阵（保留）

每题逐项检查 9 个维度：

| # | 检查项 | 说明 |
|---|--------|------|
| 1 | API 返回 view_model | response 中包含 `view_model` 字段 |
| 2 | engine_version 存在 | response 中包含 `engine_version` |
| 3 | safety 为 structured object | `safety` 不是字符串或 null |
| 4 | 存在 answer_id | response 中有可用 `answer_id` |
| 5 | `/answer/{id}` 可打开 | 直链可访问，不 404 |
| 6 | reload 后 sidecar 不可见 | 刷新页面后用户不见 JSON sidecar |
| 7 | 页面 visible text 无禁用词 | 见 §2 |
| 8 | 不串域 | 返回领域与问题领域一致 |
| 9 | P0/P1/P2 判断 | 填写判断结论 |

### 题目（保留）

1. 配偶签离婚后想转定住
2. 厚生年金截止日期是什么时候？
3. 家族滞在想转工作签
4. 我是经管签，想转人文签
5. 人文签转经管签怎么办
6. 经管续签材料有哪些
7. 代表取締役换人要通知入管吗
8. 入管让补材料，期限赶不上怎么办
9. 不许可通知书怎么办
10. 永住申请年金没交怎么办

---

## 8. QA 输出格式

每次 QA 完成后必须输出包含以下结构的报告：

```md
# QA Report

## Audit target
PR #X / branch / feature / page

## Branch / commit / preview
branch: ...  commit: ...  preview: ...

## QA layers used
✅ Technical QA / ✅ Semantic QA / ✅ Domain QA / ✅ UX Trust QA
（任何未做的层必须说明原因）

## Comparison Gate
是否触发：yes / no
如 yes：对比对象 + 是否倒退

## 10-Q regression
| # | 题目 | API | engine | safety | answer_id | /answer/{id} | reload sidecar | 禁用词 | 串域 | 方向 | 判断 |

## Semantic P0 列表
列出本次扫到的语义 P0；无则 none

## Domain P0 列表
列出本次扫到的领域 P0；无则 none

## P1 列表
列出所有 P1；无则 none

## P2 列表
列出所有 P2；无则 none

## Ship gate decision
PASS / BLOCK — 原因（对照 §6 清单逐项）

## Required fixes
列出 merge 前必须修复的项目
```

---

## 9. P0 / P1 / P2 总表（速查）

> 详细规则见各分节；本表是查询入口。

### P0 — 阻塞 merge / canary

- Technical：API 契约破坏 / 内部字段泄漏 / 禁用词出现 / sidecar 暴露 / 路由 500
- Semantic：方向反 / 资格混淆 / 高风险断言 / hallucination / 缺失 handoff（高风险题）
- Domain：命中 `must_not_have` / 政策事实编造 / 与 DOMAIN-CC 事实卡冲突
- UX Trust：包坏（TEBIQ 比 DeepSeek 裸答更糟） / 显示底层模型字样
- Eval：导出 JSON 缺 schema_version / 标注必填字段缺失

### P1 — 建议 merge 前修，或由产品负责人裁决

- 应有的 `must_have` 缺失（非高风险题）
- 真正重点缺失（true_focus 该有但没有）
- 用户看完不知道下一步
- 多卡片 / 标签 UI 过重 / 把答案包坏（程度未到 P0）
- 文案像 AI 产品腔
- 占位符痕迹

### P2 — 可 post-merge

- badge / heading / 按钮文案微调
- list view 不完善
- 内部注释缺失

---

## 10. Founder 50 题结构（保留）

完整题库由产品负责人维护；当前定义结构，供 QA 窗口按 block 执行。

| Block | 主题 | 题数 |
|-------|------|------|
| Block 1 | Redline regressions | 10 题 |
| Block 2 | Domain × intent matrix | 20 题 |
| Block 3 | OOS / clarification boundary | 7 题 |
| Block 4 | Adversarial / injection | 7 题 |
| Block 5 | Known bad cases regression | 6 题 |

题库填充需等产品负责人逐 block 确认后方可写入本文件。Eval Lab 内置的 100 题（按 A–J 场景分布）与本结构互补，不互替。
