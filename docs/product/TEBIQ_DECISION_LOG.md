# TEBIQ 重大决策日志

> Append-only。只记录重大决策和战略转向。
> 轻微技术决定写在 PR body 里。
> 撤销或变更已有决策时，追加新条目，**不删除旧条目**。
> 每条必须包含：date / background / decision / rationale / impact / owner。

---

## DL-001 · 停止继续盲修用户端，转向 Eval-driven 数据闭环

| 字段 | 值 |
|------|-----|
| date | 2026-05-03 |
| owner | CEO / 用户 |
| status | active |

### Background

L0-L2 Launch 版本（PR #8）上线后暴露出语义和 UI 问题：
- Answer 引擎回答与 TEBIQ 定位（风险推进）存在偏差
- 自动 QA 绿灯不能证明语义正确
- 多次迭代后仍无法确认"好答案"的判定标准
- 没有 golden cases 基线，改进无法验证

### Decision

当前主线转为 Eval-driven 数据闭环。不再继续盲修用户端回答页。

流程：
> DeepSeek 裸答 → TEBIQ 当前输出 → DOMAIN/用户人工语义标注 → golden cases / must_have / must_not_have / handoff_trigger / fact_card_candidates → 反推 Prompt / QA Gates / 事实卡 / 用户端策略

### Rationale

1. **先有标准，再有改进** — 没有 golden cases 基线，任何代码修改都是猜测
2. **DeepSeek 自然能力应被保留而非包坏** — Answer Core 是安全外壳，不是内容本体
3. **闭环的目的是反推** — 标注结果直接驱动 Prompt / QA / 事实卡，不是凭感觉调参

### Impact

| 角色 | 影响 |
|------|------|
| ENGINE | 暂停用户端新功能；主要工作是维持 Eval Lab 可用 |
| QA | 重心从纯代码 QA 转向语义 QA；参与 Eval 数据验证 |
| DOMAIN-CC | 首次成为主线工作流参与者；负责 Eval Lab 语义标注 |
| 用户端 | 不改动，保持 main 当前状态（PR #8）|

---

## DL-002 · 第一版不做 Autonomous Agent

| 字段 | 值 |
|------|-----|
| date | 2026-05-03 |
| owner | 产品负责人 / CEO |
| status | active |

### Background

AI agent 架构的吸引力大，但在在留资格领域错误成本极高：判断一个方向错误可能导致用户被拒签 / 不许可。DeepSeek 等模型在此领域的 hallucination 率不可接受。

### Decision

当前采用受控 workflow（rule_based → DeepSeek → legacy_seed → safe-clarification 等明确管线节点）。

Agentic 能力只能作为**未来局部能力**（如通知书整理 / 事项摘要），且必须在对应场景 Eval 数据闭环成熟后，由产品负责人显式裁决，逐场景开放。

不允许：
- 模型自动决定签证结果
- 模型自动决定案件策略
- 模型自动决定用户对外动作（提交 / 撤回 / 上诉）
- "先做 agent 框架，以后再加约束"

### Rationale

- 行政书士法 / 业务边界要求 AI 不做最终判断
- Eval 数据尚未积累到能放手给模型决定的程度
- 受控 workflow 可以逐步 Agentic 化；反过来则代价太高

### Impact

ENGINE 不做 autonomous agent 框架；所有改动必须在现有 workflow 管线内进行。

---

## DL-003 · DOMAIN-CC 作为行政书士助理型语义复核窗口

| 字段 | 值 |
|------|-----|
| date | 2026-05-03 |
| owner | 产品负责人 |
| status | active |

### Decision

DOMAIN-CC 是 TEBIQ 的**在留语义复核窗口**，定位为行政书士助理型审查者（非最终行政书士）。

职责：
- 在 Eval Lab 中标注 DeepSeek 裸答 vs TEBIQ 输出
- 输出：`severity` / `direction_correct` / `must_have` / `must_not_have` / `should_handoff` / `action`
- 识别 golden cases / handoff_trigger / fact_card_candidates

边界：
- **所有 DOMAIN-CC 输出默认 `draft / needs human review`**
- **不发布最终行政书士判断**
- **不直接落用户端文案**（文案由 VOICE + 产品负责人裁决）

### Rationale

TEBIQ 不能没有语义审核，但 TEBIQ 自己也无权替代专业判断。DOMAIN-CC 提供"足够好的参考草稿"，用户/行政书士做最终确认。

---

## DL-004 · Context Pack 与短期状态文档分离

| 字段 | 值 |
|------|-----|
| date | 2026-05-04 |
| owner | GM（工程总经理）|
| status | active |

### Decision

产品文档严格分层：

| 文档 | 性质 | 更新频率 |
|------|------|----------|
| `TEBIQ_CONTEXT_PACK.md` | **长期产品宪法** — 定位、Eval-driven 策略、角色、Voice、边界 | 极低（仅原则级变化）|
| `TEBIQ_CURRENT_STATE.md` | **短期工程快照** — 当前 PR / 阻塞 / 主线 / 谁在等谁 | 高（PR 级）|
| `TEBIQ_DECISION_LOG.md` | **重大决策记录** — 战略转向 / 关键裁决 + 时间戳 + 原因 | 中（重大决策时）|

**禁止**：把 PR 编号 / commit hash / preview URL / 当周状态 写入 Context Pack。

### Rationale

旧 Context Pack 在多个 worktree 版本中混入了 PR #5 commit hash、feature branch 名、当前阻塞等短期信息，导致每个窗口读到的"事实"不同。分离后，长期原则稳定，短期状态可独立快速更新。

---

## DL-005 · 30 秒风险检查题目结构降级为 CANDIDATE

| 字段 | 值 |
|------|-----|
| date | 2026-05-04 |
| owner | 产品负责人 |
| status | active — 修正旧裁决 |

### Background

旧 Context Pack / Copy Source 将 30 秒风险检查的 5 道题目结构标记为"已冻结，不允许修改"。

### Decision

该标记**废除**。5 道题目降级为 `CANDIDATE / HISTORICAL DESIGN`。

后续是否进入 MVP 及具体题目文案，需基于 Eval Lab 结果和用户验证重新确认，由产品负责人裁决。

AI 窗口不得将这 5 题写成"不允许改动的已冻结内容"。

### Rationale

当前阶段通过 Eval Lab 建立标注数据，用户端结构（包括 30 秒检查）应由数据和用户验证驱动，不应提前锁死。

---

## DL-006 · Answer Core 是安全外壳，不是智能本体

| 字段 | 值 |
|------|-----|
| date | 2026-05-02 |
| owner | 产品负责人 / CEO |
| status | active |

### Decision

Answer Core V1 的定位是安全外壳（cross-domain gate / parser hardening / observability / surface safety），不是内容本体。

- **负责**：防串域、防内部字段泄漏、防 sidecar 暴露
- **不负责**：生成高质量答案内容 / 判断 true_focus / 决定 handoff_trigger

高质量内容应通过 Eval Lab → golden cases → Prompt 规则驱动，而不是通过安全外壳内置逻辑。

### Rationale

DeepSeek 的自然回答能力通常优于规则包装后的输出。过度包装导致"把好答案包坏"——这是 P0（见 `TEBIQ_QA_GATES.md §3.7`）。

---

## DL-007 · M3 拆分为 A/B/C 三层，DeepSeek 不再单一阻塞 M3

| 字段 | 值 |
|------|-----|
| date | 2026-05-05 |
| owner | 产品负责人 / Project Lead |
| status | active |

### Background

M3 Answer Quality Baseline 原定义为 ≥24 FULL_COMPARABLE。DeepSeek API 在 25s timeout 下大量超时，整个 M3 被错误标为 blocked，多个独立子任务被搁置。DS 90s batch 探测确认健康（实测返回 2480 字符正确答案）。

### Decision

M3 拆为三层独立推进：
- **M3-A** Routing / Safety Baseline — 不依赖 DeepSeek
- **M3-B** TEBIQ Self-output Baseline — 不依赖 DeepSeek raw
- **M3-C** DeepSeek Comparison Baseline — 依赖 DeepSeek raw

正确说法："M3-C blocked by DS interactive timeout；M3-A/B 可推进；M3-C 等 batch timeout 调整"。

### Rationale

M3-A 已有 unit test 7/7 + DOMAIN 7/7 语义复核 + E2E 验证 3/7（J03/J04/I08 PASS）。M3-B 有 25 条非 fallback TEBIQ 答案可评。仅 M3-C 等 DS batch timeout。

### Impact

- Track A 从 🔴 Blocked 改为 🟡 M3-A/B 可推进
- ENGINE 需调整 eval-lab `deepseek-raw` 路由 timeout 从 25s 至 90s（不影响前台 interactive）
- 前台 interactive 保持 25s + fallback；只 batch eval 用 90s
- Production 仍 blocked

---

## DL-008 · VOICE canonical 锁定为 main `docs/voice/TEBIQ_*.md`，PR #31 关闭

| 字段 | 值 |
|------|-----|
| date | 2026-05-05 |
| owner | 产品负责人 + GM |
| status | active |

### Background

main `docs/voice/TEBIQ_*.md`（14 文件，`02b8e59`）与 PR #31 `*_v0.1.md`（13 文件）并存。前者更长更完整且已集成 5 项 patch；后者为更早草稿。

### Decision

锁定 main `TEBIQ_*.md` 为唯一 canonical。PR #31 已关闭。delta 项（VOICE_SYSTEM_INDEX、HUMAN_REVIEW_TRIGGER_LIBRARY 10场景 L1/L2）登记为 Registry gap，未来若提取必须以小 patch 形式合并到现有 TEBIQ_ 文件，不得新建第二套命名。

### Rationale

避免 ENGINE/QA 在两套不一致命名间游走。命名分裂是 source of truth 不稳定的根本原因之一。

### Impact

- ENGINE / QA 只读 `TEBIQ_*.md`
- VOICE 后续不写 `_v0.1.md` 命名
- 任何 voice 增量必须以小 PR 修改 TEBIQ_ 文件

---

## DL-009 · Internal Alpha 阶段 production 仍 blocked

| 字段 | 值 |
|------|-----|
| date | 2026-05-05 |
| owner | 产品负责人 / Project Lead |
| status | active |

### Background

M1 ✅ M2 ✅ M4 Phase1+2 ✅ 后，可能产生"准备 production"的误判。

### Decision

不进入 public launch。不解锁 production copy。不做外部用户开放。当前目标：Internal Alpha 稳定 + Preview 验收 + M3-A/B 启动 + M3-C 等 DS batch。

### Rationale

production 解锁前置条件未满足：M3-C 未完成；QA 未完整补位；DOMAIN/VOICE 仍 draft；production copy none approved。

### Impact

VOICE / DOMAIN / ENGINE 任何 production-facing 改动需先经过 QA 正式补位 + 产品负责人裁决。

---

## DL-010 · M3-A baseline methodology revised — routing-only PASS ≠ M3-A PASS

| 字段 | 值 |
|------|-----|
| date | 2026-05-05 |
| owner | 产品负责人 / Project Lead |
| status | active |

### Background

GM 在 Sprint v0.3 输出 M3A_ROUTING_SAFETY_BASELINE_v0.1.md 标记 PASS 7/7。判定仅基于 routing 字段（domain ≠ unknown / status ≠ out_of_scope / fallback_reason）。

QA Issue #35 在 production live curl 复现 P0：D05/D06 在 LLM timeout 后落到 `answer-core-v1` legacy matcher，返回与原问题完全无关的 cached answer（divorce → "换工作半年"），且 status=answered，无降级标记。

DOMAIN 在 7 行确认中给出 2 pass + 5 partial 的判定（含 D05/D06 partial），方法学上比 GM 的 routing-only PASS 更准确。

### Decision

M3-A 评价标准修订：

1. **Routing structure pass** ≠ **M3-A pass**。
2. M3-A 必须同时验证：
   - routing 字段（domain / status / fallback_reason）正确
   - answer_text 内容与 original_question 相关
   - fallback 路径不得返回 unrelated cached content
3. DOMAIN 的「partial」判定（routing 正确但内容未验证）正式纳入 M3-A 评价标准。
4. GM 后续不得再以 routing-only 标准声明 M3-A PASS；仅可标记 "routing-structure pass"。
5. 真 M3-A PASS = routing-structure pass + content safety pass + fallback-no-pollution pass + DOMAIN/QA 复核。

### Rationale

routing 字段正确不等于用户看到的内容正确。fallback 路径如果命中 legacy matcher 返回任意 cached answer，对用户的实际危害（被错误指引）反而比 out_of_scope 更高（用户不知道答案错了）。M3-A 的 "Safety" 必须涵盖到内容层。

### Impact

- M3A_ROUTING_SAFETY_BASELINE_v0.1.md 已加 corrigendum，状态修订为 routing PASS / content BLOCK
- M3-A 在 Issue #37 修复 + QA / DOMAIN 复核完成前不得标 PASS
- M3-B 通过标准（v0.3 §5 临时口径）需在 #37 修复后重评估（fallback 不污染前提下）
- 后续所有 M3-x baseline 必须包含 answer_text 内容验证步骤

---

## DL-011 · TEBIQ 1.0 重新定义为 AI 在留咨询 Alpha（不是完整 Risk Management）

| 字段 | 值 |
|------|-----|
| date | 2026-05-05 |
| owner | 产品负责人 / Project Lead |
| status | active |

### Background

在 M3-C / DOMAIN formal annotation / 完整 Matter / Pro 后台 / Risk Triage 等多线推进过程中，1.0 完成路径变得不可控。同时真实用户咨询数据缺失，闭环无法启动。

### Decision

TEBIQ 1.0 重新定义为 **AI 在留咨询 Alpha**。

产品公式：
DeepSeek V4 Pro + TEBIQ 咨询风格 system prompt + 轻事实锚点 + 文字/拍照咨询入口 + 高风险轻提示 + 用户反馈 + 保存问题 + 咨询记录中台。

目标：让真实用户开始问问题，开始收集真实咨询数据。

**不作为 1.0 blocker**（保留 0.7 / 0.9 / 1.0+）：
- 完整 M3-C DeepSeek Comparison
- 完整 DOMAIN formal annotation
- 完整 Risk Triage
- 完整 Matter
- 完整 Human Review Gate
- Pro 后台 / Partner Workspace
- OCR 完整文书系统

**仍是 1.0 blocker**：Issue #37 P0（LLM timeout legacy fallback 修复）。

Charter：`docs/product/TEBIQ_1_0_ALPHA_CHARTER.md`

### Rationale

1.0 必须可上线、可让用户体验、可让 CEO 看到真实问题。完整 Risk Management 路径在缺真实用户数据情况下无法验证设计假设。先发 Alpha 收集数据，再驱动 0.7+ 的完整功能设计。

### Impact

- M3-A/B/C 不再阻塞 1.0；改为 Alpha 数据 → 后续路线
- DOMAIN formal annotation / Matter v0 / Pro 后台 全部推迟到 0.7+
- 1.0 Sprint Work Packets 落地：用户端文字+拍照咨询 / Learning Console / Fact Anchors / QA Smoke
- production 状态：Alpha / limited release / **not final professional judgment**（不解锁 production copy 完全）
- VOICE / DOMAIN canonical 仍 draft，但允许用于 Alpha（user-visible copy 须含 Alpha 提示）

---

## DL-012 · 加性 DB migration 默认授权 GM 在 PL 机器执行

| 字段 | 值 |
|------|-----|
| date | 2026-05-06 |
| owner | 产品负责人 / Project Lead |
| status | active |

### Background

Issue #46（Production DB Migration Runbook debt）未消。当前每次 schema PR 都需要 PL 一次性授权 GM 用 `.env.local` 跑 `db:migrate`（PR #44 / PR #56 两次先例）。0.5 Safe Consultation Sprint 推进过程中可能多次 schema 变更，逐次询问 PL 与 PL "最大放权 + 不做中间汇报" 矛盾。

### Decision

**默认授权 GM 在 PL 机器一次性运行所有未来 additive migration**（仅 additive — 包括 ALTER TYPE ADD VALUE / CREATE TABLE / CREATE INDEX / 加 nullable column / 加 enum value 等不动现有数据的操作）。

**仍需 PL 显式授权**：
- destructive migration（DROP / ALTER COLUMN type 改 / 删 enum value / 改 NOT NULL 约束 / TRUNCATE / DELETE / UPDATE-SET 等会动现有数据的操作）
- 任何 PL 0.5 Sprint §4 escalation list 中的事项

### Rationale

- additive migration 风险极低（最坏 → revert PR + DROP 新建 object）
- 每次询问 PL 增加 GM 操作摩擦 + PL 中断成本
- PL 已通过 Issue #46 debt 流程明示信任 GM 在其机器跑 migration
- Issue #46 自动化方案落地前，blanket authorization 是最优 stopgap

### Impact

- GM 自驱：发现 additive migration → 走 GM 自己审 + 在 PL 机器执行 + 验证 + merge 流程
- ENGINE 仍按 Issue #46 §流程发 PR（不擅自 db:migrate / 在 CI 跑）
- 验证流程（5 项 SQL）保持不变
- 凭据使用：仍只在执行的临时 worktree 内 cp .env.local + 立即 cleanup
- Audit：每次 GM 执行都在 commit message / CURRENT_STATE 留痕（migration sha + verification PASS 记录）

### Out of Scope

- destructive migration 仍要 PL 显式审批
- DEBT Issue #46（最终自动化方案）继续保持 open，blanket auth 不替代自动化设计
