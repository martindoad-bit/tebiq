# TEBIQ Delegation Principles

> 多窗口协作通用原则。所有 Work Packet 的底层规则。
> **任何 GM、ENGINE、CODEXUI、DOMAIN、FACT、QA、VOICE 窗口开始工作前必须读取本文件。**
> Authority: PL directive 2026-05-07

---

## 0. 一句话原则

```
派问题，不派按钮；
派目标，不派堆料；
派边界和验收，不替专业窗口做专业判断。
```

---

## 1. 通用 Work Packet 模板（所有派工必须含此 7 项）

| # | 字段 | 说明 |
|---|---|---|
| 1 | **背景** | 这件事为什么现在做？历史 context？ |
| 2 | **当前问题** | 真实观察到的问题（不是想象的需求）|
| 3 | **用户/业务目标** | 解决后用户/业务的状态变化 |
| 4 | **约束和边界** | 不要做的、不能改的、必须保留的 |
| 5 | **source of truth** | 必读的 canonical 文档/代码路径 |
| 6 | **验收标准** | 怎么算完成（结果导向，不是步骤导向）|
| 7 | **停止条件 / 上报条件** | 什么情况停下来找 GM 或 PL |

**禁止**: 在 Work Packet 中写"组件清单"、"按钮清单"、"字段清单"、"逐步实现清单"，**除非属于 §6 例外场景**。

---

## 2. 各窗口专业判断权

每个专业窗口在自己的领域内有完整判断权。GM 不替代它做专业决策。

### 2.1 CODEXUI — UI/UX 专业判断

**必须读取**:
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`

**GM 给**:
- 用户场景
- 当前体验问题
- 产品目标
- 品牌/范围约束
- 验收标准

**GM 不给**:
- 按钮数量
- 布局方式
- 像素/间距/字号
- 组件排列
- 文案具体措辞
- 折叠/展开判断

### 2.2 DOMAIN — 在留专业风险复核

**GM 给**:
- 待审事实
- 用户场景
- 风险边界
- 需要判断的问题
- 输出格式 (verdict 类型 / changelog 形式)

**GM 不给**:
- 预设的专业结论 (不能让 DOMAIN 背书 GM 已写好的判断)
- 如何写法律解释
- 如何分级风险 (DOMAIN 自决 risk_level)

### 2.3 FACT — 事实层生产

**GM 给**:
- source whitelist
- fact card schema
- 状态机
- 风险等级规则
- batch 规则
- 交付格式

**GM 不给**:
- PL/DOMAIN 手写的事实字段（FACT 自主从官方源抽取）
- 具体哪条事实必须含哪些字句
- 主观推论（FACT 自评 ai_inference vs direct_fact）

### 2.4 ENGINE — 工程实现

涉及用户端 UI / app shell / evidence / answer rendering 时，**必须读取**:
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`

**GM 给** (默认):
- 目标行为
- 接口边界
- 验收 case
- 回滚要求
- out-of-scope (sensitive zone) 清单

**GM 不写代码级微指令**，**除非属于 §6 例外**。

### 2.5 QA — 质量验证 + 失败归因

涉及用户端体验时，**必须读取**:
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`

**GM 给** (要求 QA 验):
- 用户路径是否成立
- P0 / P1 / P2 风险分级
- 事实是否回归
- 状态是否混乱
- 移动端是否可用
- production 是否安全

**GM 不让 QA 只验**"功能有没有做"。

### 2.6 VOICE — 文案 canonical

**GM 给**:
- voice anchor 修正方向（"不安慰，不陪伴，给方向" 等）
- 禁词清单
- canonical doc 位置

**GM 不给**: 具体改成什么字。

---

## 3. GM 自身边界

### GM 是

```
1. 任务路由器
2. 上下文一致性守门人
3. source of truth 维护者
4. scope 控制者
5. PR / 状态 / 阻塞管理者
6. 跨窗口信息同步协调者
7. 真正需要 PL 裁决事项的上报者
```

### GM 不是

```
ENGINE
CODEXUI
DOMAIN
FACT
QA
VOICE
```

**除非 PL 明确授权临时兼任**，否则不要把专业窗口工作揽到 GM 身上。

如果 PL 临时授权 GM 兼任某专业窗口，必须：
- 在 Decision Log 留 DL 条目
- 明确何时结束兼任
- 兼任期间 GM 在该领域的输出仍按该窗口标准

---

## 4. GM 主动提醒义务

如果 GM 收到 PL 的指令本身已经过度组件化（按钮清单 / 字段清单 / 像素规定），GM **必须先回 PL**:

```
这个任务更适合给目标和验收，让专业窗口自行设计方案。
要我转换成 problem-statement 派工吗？
```

**不要**把错误的派工方式继续放大到执行窗口。

例外：当 PL 明确表态"我就是要这个具体实现，不要专业窗口判断"时，GM 按 PL 指示派工，但需在 Work Packet 标注"PL 直接指定，专业窗口不重新判断"，让窗口知道决策来源。

---

## 5. PL 直派窗口的处理

PL 偶尔会直接派任务给专业窗口（绕过 GM）。组织规则上不鼓励，但实际会发生。

GM 收到通知后：
- 不要重派一份覆盖
- 不要跟专业窗口说"PL 那个任务无效"
- 同步认可 PL 派的任务，并把它纳入 GM 的 status 跟踪
- 如果 PL 派的任务存在 §1-§4 违规（比如组件清单），GM 在下次 PL 同步时回报，不当场拦截

---

## 6. 例外场景 — 可以给精确指令

以下场景 GM **必须**给精确到字段、接口、状态、回滚路径的指令（不是 problem statement，是 specification）:

| 场景 | 必须精确到 |
|---|---|
| **P0 hotfix** | 修复点、回归测试、回滚命令 |
| **security / privacy** | 哪些字段不能 expose、auth 边界、加密要求 |
| **DB schema** | 字段名、类型、约束、index、migration 顺序、backfill 策略 |
| **API contract** | endpoint 路径、method、request/response shape、error code、rate limit |
| **生产发布 gate** | 部署顺序、env flag 翻转时机、dry-run 验证步骤、rollback runbook |
| **rollback / runbook** | 步骤精确到命令行 |
| **fact layer state gate** | state machine 转换条件、谁可以翻、changelog 要求 |
| **用户数据暴露风险** | 哪些数据不能日志、不能传 LLM、不能 share |

这些场景给 problem statement 反而危险——会留出歧义解释空间。

---

## 7. 派工质量自检 checklist

GM 起 Work Packet 前自查：

- [ ] §1 7 项字段齐全？
- [ ] 是否在某段写成了"按钮清单 / 字段清单 / 步骤清单"？如是，该段属于 §6 例外吗？不是 → 重写
- [ ] 是否替专业窗口预设了结论？
- [ ] 是否给了停止条件 / 上报条件？
- [ ] 是否用了内部词（Sprint / Workstream / Pack）但目标读者是用户端？
- [ ] 验收标准是否结果导向（不是步骤导向）？
- [ ] 是否明确了 source of truth？

如果任一不通过 → 改 Work Packet，再派。

---

## 8. 反例（不要这样派）

### ❌ 错误派工（CODEXUI）

> "加保存按钮 / 加复制链接 / 加分享按钮 / 加我的记录按钮 / 加继续补充按钮 / 加帮助页"

→ 后果：CODEXUI 实现成功能控制台，缺少设计判断。

### ✅ 正确派工（CODEXUI）

> "用户读完一个 800-1500 字的咨询答案后，处于消化心智状态。当前 UI 在回答下方堆了 6+ 个近同级按钮，像后台面板。目标：用户知道接下来最自然的 1 个动作；如果需要，也能找到次动作；但不被一堆按钮打断。约束：不改 brand / 不改回答速度 / 不暴露内部词。验收：10 项 checklist (附后)。"

### ❌ 错误派工（FACT）

> "请按 PL 给的字段写经管签 fact card：施行日 2025-10-16、资本金 3000 万、常勤职员 1 人..."

→ 后果：FACT 变成 PL 手稿录入员，丧失 source 验证 + 状态机自评能力。

### ✅ 正确派工（FACT）

> "Source whitelist 内有 moj.go.jp/isa 経営管理改正页。请按 fact-cards/README.md schema 抽取 + 自评 state/risk/confidence + 标 needs_review_flags + 给 QA cases。Batch Report 交 GM。"

### ❌ 错误派工（ENGINE）

> "在 stream/route.ts 第 234 行后插入 const matches = matchFactCards(question)，然后在 245 行 push system message..."

→ 后果：ENGINE 变成代码誊写员，丧失实现层判断。

### ✅ 正确派工（ENGINE）

> "在 /api/consultation/stream 中，after routing_status / before first_token，调用 fact_layer matcher 并把命中卡的 certain_block 注入 system prompt + 写 audit 到 consultation row。Schema 见 fact-layer-design.md。Out of scope: lib/answer/prompt/, lib/answer/core/llm-deepseek-provider.ts。"

### ❌ 错误派工（DOMAIN）

> "请审 PR #73 的 3 张卡，verdict 都是 APPROVE 直接翻 human_reviewed。"

→ 后果：DOMAIN 变成橡皮图章，丧失专业风险复核。

### ✅ 正确派工（DOMAIN）

> "请按 DOMAIN_AUDIT_PROTOCOL_v1.md §2 10-section checklist 审 PR #73 的 3 张卡。verdict 自决（APPROVE / REQUEST_EDIT / REJECT / CONFLICT）。重点关注 source 实地核对 + ai_inference 推论合理性 + needs_review_flag 校验。"

### ❌ 错误派工（QA）

> "请验证保存按钮、复制按钮、分享按钮、我的记录按钮是否能点击。"

→ 后果：QA 变成功能勾勾员，错过用户路径不成立 / 内部词泄露 / 状态混乱。

### ✅ 正确派工（QA）

> "请验证：用户在咨询完成后，能否在 30s 内自然找到保存路径？过程中是否暴露内部词？iPhone Safari/Chrome/微信内置都验。状态切换 (completed/partial/failed/timeout) 是否清晰？"

---

## 9. 版本

| version | date | actor | change |
|---|---|---|---|
| v1.0 | 2026-05-07 | GM (per PL directive) | 初版。多窗口协作通用原则，所有 Work Packet 底层规则 |
