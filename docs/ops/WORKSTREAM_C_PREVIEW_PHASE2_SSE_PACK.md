# Engineering Work Packet — Workstream C: Preview Phase 2 Controlled Event Streaming

对象：ENGINE
任务标题：Workstream C — /internal/preview 受控事件流（SSE Phase 2）
背景：Phase 1（非流式状态机）已上线（PR #30）。Phase 2 用 SSE 替换 setTimeout 模拟，让前端实时接收后端实际推进状态，消除模拟延迟感。核心要求：优先 stream 系统事件，不裸流模型 token；高风险场景必须先完成 routing/risk/human_review 判断后再展示内容。
产品裁决来源：2026-05-05 产品负责人指令 §4.2 Phase 2 + 本轮直接批准（"B"）

---

## 必须读取

1. `app/internal/preview/` — Phase 1 实现（PR #30）
2. `app/api/questions/` — 现有提问 API（了解当前 answer 生成流程）
3. `docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md` — 状态文案（所有 copy 引用此文件）
4. `docs/voice/TEBIQ_STATUS_LANGUAGE_TEMPLATES.md` — `provider_timeout` / `fallback` 规则
5. `docs/voice/TEBIQ_HUMAN_REVIEW_LANGUAGE.md` — high-risk 场景处理规则

---

## 要做什么

### C1 — SSE 端点（必须）

新建 `/api/internal/preview/stream` SSE 端点：

**事件序列**：

```
question_received      → 立即（0ms）
routing_started        → 立即
routing_done           → routing 完成时
risk_detected          → 有风险信号时（可选，有则 emit）
clarification_needed   → status=clarification_needed
human_review_required  → handoff_trigger 命中
generation_started     → LLM 开始生成时
generation_done        → LLM 完成时
fallback_triggered     → fallback_reason 非空时
provider_timeout       → 25s 超时时
final_answer_ready     → 成功完成时（携带 answer_id）
```

**事件格式**（SSE standard）：

```
data: {"event":"routing_done","domain":"admin_general","ts":1234567890}
data: {"event":"final_answer_ready","answer_id":"xxx","ts":1234567890}
```

**高风险保护（必须）**：
- REGRESSION_SET 7 题或 DOMAIN risk_level=HIGH：`generation_done` 后不 emit `final_answer_ready`，改 emit `human_review_required`
- DeepSeek raw text **不得**出现在任何 SSE 事件的 payload 中
- `final_answer_ready` payload 只携带 `answer_id`，不携带 answer 内容

### C2 — 前端改造（必须）

将 Phase 1 的 `setTimeout` 状态机替换为 SSE client：

- 连接 `/api/internal/preview/stream`
- 按事件推进状态机（状态逻辑复用 Phase 1 的 `classifySubmitOutcome`）
- `final_answer_ready` → `router.push('/answer/${answer_id}')`
- `provider_timeout` / `error` → 显示对应状态，提供重试

**降级策略**：SSE 连接失败时降级到 Phase 1 非流式行为，不崩溃。

### C3 — Stream Gating（必须）

```typescript
// 低风险场景：routing_done 后可开始流式显示状态
// 高风险场景：必须等 human_review 判断完成后才展示受控内容
// DeepSeek raw：永远不 stream 给前端
function shouldStreamContent(riskLevel: 'HIGH' | 'MEDIUM' | 'LOW', isRegressionSet: boolean): boolean {
  if (isRegressionSet) return false  // 强制 human_review
  if (riskLevel === 'HIGH') return false  // 等受控判断
  return true  // MEDIUM/LOW 可在 generation_done 后展示
}
```

---

## 不能做什么

- 不裸流 DeepSeek token（任何场景）
- 不在 high-risk 场景跳过 routing/risk 判断直接展示内容
- 不改 `lib/answer/` 或 `app/answer/`
- 不改 eval_answers DB schema
- 不引入新环境变量
- `final_answer_ready` payload 不包含 answer 正文

---

## 验收标准

- [ ] SSE 端点 `/api/internal/preview/stream` 可连接
- [ ] 事件序列在 DevTools Network → EventStream 可见
- [ ] `question_received` ≤1s 到达
- [ ] HIGH risk / REGRESSION_SET 题：emit `human_review_required`，不 emit `final_answer_ready`
- [ ] `provider_timeout` 事件在 25s 后触发，前端显示 timeout 状态
- [ ] fallback 时 emit `fallback_triggered`，前端显示 fallback 标注
- [ ] SSE 失败时降级到 Phase 1 行为
- [ ] DeepSeek raw text 不出现在任何 SSE payload
- [ ] `tsc --noEmit` clean

---

## 完成后回报格式

```
Workstream C Preview Phase 2 SSE — 实现报告

C1 SSE 端点: ✅/❌（实现了哪些事件）
C2 前端 SSE client: ✅/❌
C3 Stream Gating: ✅/❌

高风险保护验证：
  - REGRESSION_SET 题不 emit final_answer_ready：
  - DeepSeek raw 不在 payload：
  - SSE 失败降级：
PR：#XX
```

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
**高风险 stream gating 不得妥协。**
