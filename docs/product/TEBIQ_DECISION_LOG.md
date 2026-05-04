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
