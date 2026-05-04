# TEBIQ Context Pack

> 本文件是 TEBIQ 的**长期产品宪法**：定位、阶段策略原则、产品分层、角色分工、Voice、自治边界、文档系统的根。
>
> 不写短期 PR、commit、preview、branch、当周状态。短期状态写到 `TEBIQ_CURRENT_STATE.md`，重大决策写到 `TEBIQ_DECISION_LOG.md`。

---

## 0. 文档元信息

| 字段 | 值 |
|------|-----|
| 文档名 | TEBIQ Context Pack |
| 文档性质 | **长期产品宪法** |
| 更新触发 | 仅在产品定位、阶段策略原则、产品分层、角色分工、Voice、QA 原则发生**原则级**变化时 |
| 适用窗口 | Claude Code / Codex / VOICE / UI / QA / DOMAIN-CC |
| 必读 | 是。所有 AI 窗口在开始工作前必须读取本文件 |

**如果无法读取本文件，必须停止，不要凭记忆执行任务。**

### 文档系统分工

| 文档 | 内容 | 更新频率 |
|------|------|----------|
| `TEBIQ_CONTEXT_PACK.md`（本文） | 长期原则：定位、Eval-driven 策略、L0-L5、角色、Voice、自治边界 | 极低 |
| `TEBIQ_CURRENT_STATE.md` | 当前主线 PR、阶段目标、in-flight 工程状态 | 高（PR 级） |
| `TEBIQ_DECISION_LOG.md` | 战略转向、关键裁决的时间戳 + 原因 | 中（重大决策时） |
| `TEBIQ_COPY_SOURCE.md` | 用户端文案与回答呈现原则、文案来源流程 | 中 |
| `TEBIQ_QA_GATES.md` | Technical / Semantic / Domain / UX-Trust 四类 QA 准则 | 中 |

**写入纪律：**

- PR 状态 / commit hash / branch 名 / Preview URL → `TEBIQ_CURRENT_STATE.md`
- 战略转向（如"暂停 X，转向 Y"）→ `TEBIQ_DECISION_LOG.md`
- 阶段切换、当前主线变化 → `TEBIQ_CURRENT_STATE.md`
- 流水账、当天状态、本周打算 → 不要进任何文档；写到 issue / PR description

---

## 1. TEBIQ 当前定位

### TEBIQ 是

> 面向在日外国人的**在留风险管理服务系统**。

把用户的问题还原成真实风险，并推进到下一步。

### TEBIQ 不是

- AI 签证问答 App
- 签证知识库
- 行政书士官网
- 拍照翻译工具
- 传统咨询导流页

### 核心句

- 不是回答，而是推进
- 前台轻如聊天，后台重如案件
- 把事情看清楚，把坑点出来，把下一步摆到用户面前

### 与普通 AI 问答的差别（举例）

**用户问**：经管签搬办公室要通知哪里？  
**真实重点**：新办公室能不能撑住下次经营管理签更新。

**用户问**：放弃经管签回国，以后办旅游签。  
**真实重点**：公司清算、纳税管理人、海外转出届、在留卡返纳、出境方式、未来旅游签审查记录。

**用户问**：永住前年金没交怎么办？  
**真实重点**：未纳时间、补缴情况、申请时点、家庭成员、收入稳定性、是否应延后申请。

DeepSeek / ChatGPT / Claude 可以回答用户问的问题。  
TEBIQ 要发现用户**没有问、但会影响结果**的地方，并转成下一步行动。

---

## 2. Eval-driven Product Strategy（当前阶段策略原则）

> 这是当前阶段的**策略原则**，不是临时计划。它会持续生效，直到 Eval 数据闭环产出足以支撑下一阶段策略转向（届时会在 `TEBIQ_DECISION_LOG.md` 立条目推翻）。

### 原则

**当前阶段不再继续盲修用户端回答页。**

当前主线是建立**Eval-driven 数据闭环**：

1. 收集真实 / 高价值问题
2. 让 DeepSeek 生成裸答
3. 生成 TEBIQ 当前管线输出
4. 由 DOMAIN / 用户进行语义标注
5. 形成 `golden_cases` / `must_have` / `must_not_have` / `handoff_trigger` / `fact_card_candidates`
6. **再反推** Prompt、用户端回答页、Matter Draft、人工确认入口

### 配套约束

- **不先幻想复杂结构去约束 DeepSeek。** 没有标注数据时，任何 prompt / 管线 / 回答页结构调整都是盲调。
- **先观察 DeepSeek 真实能力和失败模式**，再设计 TEBIQ 的最少必要约束。
- **不允许 TEBIQ 产品层把 DeepSeek 的好答案包坏。** 任何 TEBIQ 输出，如果在 Eval 对比中明显比 DeepSeek 裸答更危险或更错，是 P0（见 `TEBIQ_QA_GATES.md`）。
- **任何用户端回答路径改动，必须先有 Eval 对比数据。** 没有数据支撑的改动不进 main。

### 暂停 / 减速的工作

- 用户端回答页结构性 UI 改动
- 直觉式 prompt 微调
- 复杂 true_focus 标签 UI
- 完整行动包 / 项目管理风格的 Matter UI
- 大规模知识库扩写

这些不是永久冻结，是**等数据**。

---

## 3. 产品分层：L0–L5

> 本节定义层级**含义本身**。当前阶段聚焦在哪一层、是否暂停某一层，写到 `TEBIQ_CURRENT_STATE.md`。
>
> **长期产品地图 vs 当前工程主线：**
> L0–L5 是**长期产品地图**，不是工程 sprint 顺序。以下历史候选设计不是当前工程任务，ENGINE 不得理解为"待实现的 backlog item"：
>
> | 候选 / 历史设计 | 状态 | 来源 |
> |----------------|------|------|
> | 6 屏完整 UI 结构 | CANDIDATE / HISTORICAL | 等 Eval 数据支撑 + 产品负责人裁决 |
> | 30 秒风险检查 5 题 | CANDIDATE / HISTORICAL | 见 `TEBIQ_DECISION_LOG.md` DL-005 |
> | 复杂 true_focus 标签 UI / 独立卡片 | 暂停 — 等 Eval 数据 | §2 |
> | 完整行动包 / Matter V1+ | 暂停 — L2 当前仅做轻保存 | §2 |
>
> 如以上内容重新纳入工程主线，须在 Decision Log 立条目 + 产品负责人裁决。

### L0 — 可用回答

**目标**：回答用户的原问题，方向不能反。

- DeepSeek 是主回答源
- TEBIQ 负责轻量安全（surface safety、内部字段隐藏、禁用词）、边界（不法律承诺）、和"不把答案包坏"
- 第一目标是答对用户问的事，其次才是 TEBIQ 的加值
- 不要求结构化、不要求 true_focus、不要求多卡片

### L1 — 语义风险识别

**目标**：知道哪些问题真正需要 TEBIQ 介入、哪些应该让 DeepSeek 直接答。

- 不急着做复杂 true_focus UI
- 通过 Eval Lab 和 DOMAIN 标注，定义什么是真正风险、`must_have`、`must_not_have`、`handoff_trigger`
- 标注积累到一定量后，反推 prompt 加固 / 知识补强 / handoff 路由
- 用户端是否显式呈现"真正重点"取决于标注数据 — **不是先决定 UI 再找内容**

### L2 — Matter Draft / 保存事项雏形

**目标**：从"看完答案"推进到"继续处理"，但只做最薄一层。

- 第一版仅是：**保存答案草稿、回到原答案、帮助用户继续处理**
- 不是完整行动包
- 不是 deadline engine
- 不是 evidence system
- 不是项目管理软件

### L3 — 专业确认 / 咨询入口

**目标**：高风险问题进入人工 / 专业确认。

- AI 不做最终法律判断
- `handoff_trigger` 命中时，明确建议用户找行政书士 / 对应窗口
- 此层是**功能边界**，而不是导流入口

### L4 — 内部工作台

**目标**：给内部团队处理咨询 / 案件。

- 不在当前阶段
- 不允许 AI 窗口主动扩展到此层

### L5 — Partner Workspace

**目标**：与行政书士事务所协作。

- 长期方向，**当前冻结**
- 不允许 AI 窗口主动扩展到此层

### 长期冻结（任何阶段都不做）

- 完整后台
- AI Control 大屏
- 原生 App
- 复杂会员体系
- 完整权限系统
- BI dashboard
- 大规模知识库扩写

---

## 4. Autonomous Agent 边界

> TEBIQ **不以 autonomous agent 作为主架构**。

### 原则

- 当前采用**受控 workflow**（rule_based → DeepSeek-LLM → legacy_seed → safe-clarification 等明确管线节点）
- Agentic 能力只能作为**未来局部能力**，例如：
    - 通知书整理（OCR + 结构化）
    - 事项摘要
    - 材料缺口提示
    - 单事项的下一步建议
- **不允许**模型自动决定：
    - 签证结果
    - 案件策略
    - 正式法律判断
    - 用户的对外动作（提交、撤回、上诉等）

### 为什么不是 agent-first

- 在留资格领域的判断成本极高，错一个方向用户可能被拒签 / 不许可
- DeepSeek 等模型在此领域的 hallucination 率仍然不可接受
- 行政书士法 / 业务边界要求 AI 不能做最终判断
- Eval-driven 还没有积累到能放手让模型决定的程度

### 演进路径

Agentic 能力**只能在某个场景的 Eval 数据闭环成熟后**，由产品负责人裁决，逐场景开放。不允许"先做个 agent 框架以后再加约束"。

---

## 5. 角色分工

| 角色 | 职责 | 不做什么 |
|------|------|----------|
| **用户 / CEO** | 业务专家、最终裁决、阶段目标定义 | — |
| **GPT 产品负责人** | 战略、阶段目标、P0/P1/P2 标准、路线复盘 | 不写代码、不发明事实 |
| **TEBIQ-GM**（工程总经理） | 协调 Issue / PR / QA / Current State，串通各 AI 窗口 | 不做产品定位裁决 |
| **ENGINE** | 实现：代码、迁移、API、UI 落地 | 不做产品定位裁决；不发明政策事实；不擅自扩张冻结范围 |
| **QA** | Technical / Semantic / Domain / UX-Trust 四类审计；回归断言 | 不做产品定位裁决 |
| **DOMAIN-CC** | 在留语义复核 / 行政书士助理型审查者；负责 `golden_cases` / `must_have` / `must_not_have` / `handoff_trigger` / `fact_card_candidates`；DOMAIN 字段标注 | 不做最终法律判断；不直接落用户端文案 |
| **VOICE** | **暂不常驻**。仅在具体 Task Card（见 `TEBIQ_COPY_SOURCE.md` §4）下被调用，处理某一段用户端表达 | 不能一次写完整 6 屏；没 Task Card 时停止 |

### 角色互相调用规则

- **ENGINE ↔ QA**：ENGINE 自测后，QA 独立复核；QA 发现 P0 阻塞 merge
- **ENGINE ↔ DOMAIN-CC**：涉及在留 / 政策事实的改动，ENGINE 必须取 DOMAIN-CC 的标注或裁决，不得自己发明事实
- **DOMAIN-CC ↔ 产品负责人**：标注分歧、新增类目、handoff 阈值由产品负责人裁决
- **VOICE ↔ DOMAIN-CC**：VOICE 输出的文案如涉及专业事实，必须先有 DOMAIN-CC 标注的 `must_have` / `must_not_have` 作为约束

---

## 6. TEBIQ Voice（长期文案锚点）

> 这是 voice 的**原则**。具体页面文案与流程在 `TEBIQ_COPY_SOURCE.md`。

### Voice 定义

TEBIQ voice 是：

- 冷静
- 可靠
- 懂日本规矩
- 边界清楚
- 不慌
- 不卖萌
- 不装亲切
- 不像 AI 产品
- 不像行政书士官网
- 不像政务宣传

### Voice 锚点

> TEBIQ 不在教你，也不在展示自己聪明；TEBIQ 在描述事情真正的样子。

### 推荐句式

- 真正容易漏的不是 X，而是 Y。
- 这件事的关键点其实在 Z。
- 比 X 更要紧的是 Y。
- X 是表面，审查看的是 Y。
- 现在先做这一步。

### 禁止表达（任何用户可见位置）

| 禁止词 | 原因 |
|--------|------|
| 别担心 | 情绪 AI 腔 |
| 我懂你 | 情绪 AI 腔 |
| 我可以帮你 | 情绪 AI 腔 |
| 重要风险提醒 | 官腔标题感 |
| 你没问，但要注意 | 揭穿内部逻辑 |
| AI 智能分析 | 功能噪音 |
| 一键开启专业守护 | 营销腔 |
| 严重违规 | 过度惊吓 |
| 立即预约专家 | 导流腔 |
| 我是 AI / 我是 GPT / 我是 DeepSeek / ChatGPT 帮你 | 自暴底层模型 |

### 内部字段：不得出现在任何用户可见位置

- `fallback_reason`
- `safety_gate_replaced`
- `no_source_matched`
- `out_of_scope`
- `low_confidence`
- `unknown` / `null` / `undefined`
- `__answer_run_v1__`
- `domain` / `intent` / `safety_gate` / `cross_domain` 等枚举字段名
- 任何 sidecar JSON 原文

如本节与 `TEBIQ_COPY_SOURCE.md` 或 `TEBIQ_QA_GATES.md` 的禁用词表不一致，**以更严格者为准**，并要求同步更新三个文件保持一致。

---

## 7. Logo / Brand 长期裁决

- V07 Quiet Brow 是当前固定 Logo 方向
- Logo 可以轻度拟人化
- **产品 voice 不能拟人化**
- 不允许出现：小T、TEBIQ君、猫头鹰说话、机器人助手、可爱 mascot

AI 窗口不需要主动处理 Logo 相关任务；如遇相关请求，停止并通知产品负责人。

---

## 8. AI 窗口使用规则

任何 Claude Code / Codex / VOICE / QA / DOMAIN-CC 窗口开始工作前，必须先读取：

- `docs/product/TEBIQ_CONTEXT_PACK.md`（本文件，必读 — 长期原则）
- `docs/product/TEBIQ_CURRENT_STATE.md`（必读 — 当前主线 PR、目标、in-flight 状态）
- `docs/product/TEBIQ_DECISION_LOG.md`（必读 — 重大裁决与转向的时间线）
- `docs/product/TEBIQ_COPY_SOURCE.md`（与文案 / 用户端表达任务相关时读取）
- `docs/product/TEBIQ_QA_GATES.md`（与 QA / PR 审计相关时读取）

**如果无法读取，必须停止，不要凭记忆执行。**

### 不允许的行为

- 在没有标注数据的情况下调 prompt
- 在没有 DOMAIN-CC 标注的情况下发明政策事实
- 把 Eval Lab 的内部观测字段（`engine_version`、`fallback_reason` 等）暴露到用户端
- 把 DeepSeek 自然回答的可读性"包坏"成多卡片 / 标签林立 / 充满系统术语的形态
- 把短期状态、PR 编号、commit hash 写入本文件
- 单方面把产品分层、长期冻结范围、autonomous-agent 边界改写

---

## 9. 更新规则（本文件 = 长期原则）

**仅当以下情况发生时才修改本文件：**

- 战略定位（"TEBIQ 是 / 不是"）变化
- Eval-driven 策略原则变化（含废止 / 替代）
- 产品分层（L0–L5）框架本身变化
- Autonomous Agent 边界变化
- 角色分工（增 / 删 / 重命名）
- Voice 锚点 / 推荐句式 / 禁用词列表变化
- 内部字段禁渲染清单变化
- QA 四层划分本身变化
- Logo / Brand 长期裁决变化
- 长期冻结范围变化

**不要写到本文件的内容：**

- 当前 sprint / 当前阶段目标 → `TEBIQ_CURRENT_STATE.md`
- 具体 PR 编号、commit、branch、Preview URL → `TEBIQ_CURRENT_STATE.md`
- 战略转向的时间戳 → `TEBIQ_DECISION_LOG.md`
- 哪一层"现在做 / 现在不做" → `TEBIQ_CURRENT_STATE.md`
- 当周 / 当天状态 → 不进任何文档

Claude Code / ENGINE 可以提出更新建议，但**不能擅自改产品定位、L0–L5 含义、Autonomous 边界、角色分工**。  
所有原则级变更必须由产品负责人 / 用户裁决后方可写入本文件。
