# Work Packet — ENGINE Pack 2.3 (Controlled Follow-up Endpoint)

**对象**: ENGINE
**任务标题**: 受控补充 / 追问 endpoint + consultation_summary + 3 轮上限
**Sprint**: TEBIQ 0.6 / Wave 3
**Issued by**: GM (per PL 2026-05-07 §3 directive)
**Pre-condition**: Pack 2.1 merged。本 Pack 与 2.2 可并行（无相互依赖）。

---

## 背景

PL §3 观察：

> 「继续补充情况」看起来像在原咨询下追加背景，但实际体验像回到新问题页面，用户会觉得上下文断掉。

后端层面的根因：当前 stream 路由把每个 POST 都当作独立 consultation。没有 "在已有 consultation 上 append" 的语义。CODEXUI 给的"继续补充"按钮只是触发新 stream，丢失了上一轮答案 + 用户已知事实。

## 当前问题

1. 同一咨询无法保留上下文 → 用户感觉跟"新问题"无差别
2. 没有摘要机制 → 即使 ENGINE 想传上下文也无 token-efficient 方式
3. 无轮数限制 → 一旦做出"continue chat"会变成普通 AI 聊天产品（PL 不要）

## 目标

- 用户提"补充情况" → 系统继承上一轮 consultation 的 user_goal / known_facts / last_answer_key_points
- LLM 调用看到的不是无限 history，而是 summary + latest addition
- 默认 3 轮上限，超出后引导：保存 / 找人工 / 提新问题
- 不变成普通多轮聊天

## 产品裁决来源

- PL 0.6 §3 受控补充
- `docs/engineering/0.6-fact-layer-design.md` §"Workstream D integration"（早期设计草案）

## 必读

| 顺序 | 文件 |
|---|---|
| 1 | `CLAUDE.md` |
| 2 | `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md` |
| 3 | `docs/roles/TEBIQ_ENGINE_ROLE.md` |
| 4 | 本 Work Packet |
| 5 | `docs/engineering/0.6-fact-layer-design.md` §"Workstream D integration" |
| 6 | `app/api/consultation/stream/route.ts` |
| 7 | `lib/db/schema.ts` ai_consultations 表 |
| 8 | `lib/db/queries/aiConsultations.ts` |

## 要做什么

**ENGINE 自决具体实现**。下面是必须达成的目标 + 必备 invariant。

### 1. Schema migration `0027_consultation_followup.sql`

```sql
ALTER TABLE ai_consultations
  ADD COLUMN parent_consultation_id text,
  ADD COLUMN follow_up_count integer NOT NULL DEFAULT 0,
  ADD COLUMN consultation_summary jsonb;

CREATE INDEX ai_consultations_parent_idx ON ai_consultations(parent_consultation_id);
```

字段说明：

- `parent_consultation_id`: 如果是补充，指向第一轮 consultation_id；第一轮 NULL
- `follow_up_count`: 当前 consultation 是第几轮补充（0 = 第一轮原问题；1-3 = 补充）
- `consultation_summary`: jsonb，schema 由 ENGINE 决定，建议含：
  - `user_goal`: string
  - `known_facts`: string[]
  - `missing_facts`: string[]
  - `last_answer_key_points`: string[]

Migration additive。drizzle schema.ts 同步更新。

### 2. `/api/consultation/follow-up` endpoint

新 POST endpoint。Request body:

```typescript
{
  parent_consultation_id: string  // 第一轮 consultation_id
  user_addition: string            // 用户补充内容
}
```

Response: 同 `/api/consultation/stream` SSE 流（received / risk_hint / routing_status / fact_cards_injected / first_token / answer_chunk / completed）。

不复用 stream endpoint — 拆开端点便于 audit + rate limit。

### 3. Summary maintenance

**第一轮 (原问题) 完成时**：在 `completeAiConsultation` 后，触发轻量 LLM 调用生成 initial summary 写入 ai_consultations row（可异步，不阻塞 stream completion）。

**补充轮**：
- 读 parent consultation 的 summary
- 拼 LLM input：summary + user_addition（不传完整 history）
- 答案完成后更新 summary（合并 user_addition 进 known_facts，更新 last_answer_key_points）

LLM 用什么模型生成 summary 由 ENGINE 决定（建议同 deepseek-v4-pro，但可以 thinking off + 短 prompt 节省成本）。

### 4. 3 轮上限

- 第 1 轮（原问题）: `follow_up_count=0`
- 第 2-4 轮（补充）: `follow_up_count=1,2,3`
- 第 5 轮（即第 4 次补充）触发：

```json
{
  "event": "follow_up_limit_reached",
  "ts": <ms>,
  "message": "这个问题已经包含多轮补充，建议保存咨询、整理材料后再继续，或考虑人工确认。"
}
```

返回 200 + SSE 流仅含此 event + completed。CODEXUI 渲染引导。

### 5. fact_layer matcher 复用

补充轮 matcher 输入：`summary.user_goal + known_facts + latest_user_addition`（不是无限 history）。

consultation 行的 `fact_card_ids` 跨轮累积（union），`fact_card_audit` 也累积（每轮一组）。

### 6. Audit + tracing

每轮 consultation 都是独立 row（不同 consultation_id），通过 `parent_consultation_id` 链接。`/c/[id]` 详情页可显示同 chain 的历史轮。

### 7. Rate limit / abuse guard

ENGINE 自决：可加 IP-based rate limit、parent_consultation_id 必须最近 24h 内创建 等。

## 不能做什么

- ❌ 不让本端点变成无限多轮聊天（4 轮硬阻塞）
- ❌ 不传完整 history 到 LLM（仅 summary + latest addition）
- ❌ 不修改 `/api/consultation/stream` 行为
- ❌ 不修改 `lib/answer/prompt/consultation-alpha-v1.ts`
- ❌ 不修改 brand / UI tokens
- ❌ 不绕过 GM 联系 PL / FACT / DOMAIN / QA / CODEXUI

## 验收

| 验收项 | 必须 |
|---|---|
| Migration 0027 additive | ✅ |
| `tsc --noEmit` / lint / build clean | ✅ |
| 同一 chain 的 4 轮全部 success completed | ✅ |
| 第 5 轮触发 follow_up_limit_reached event | ✅ |
| LLM input 不含完整 history（log 截屏证明）| ✅ |
| 补充轮答案明显继承第一轮上下文（QA 主观判断）| ✅ |
| fact_card_ids 跨轮累积 | ✅ |
| 不影响 /api/consultation/stream first_token latency | ✅ |
| Vercel preview SUCCESS | ✅ |

## 完成回报

19 字段 + 4 轮对话样例（user message + system response + summary 演化）。

## 何时停下找 GM

- summary 生成 LLM 调用 latency 让总响应超出 baseline + 5 秒
- 任何 schema 改动超出本 Pack（需要 backfill 等）
- 任何用户隐私 / data exposure 问题

---

**版本**: v1.0 / 2026-05-07 / GM (per PL 0.6 §3)
