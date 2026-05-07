# Work Packet — ENGINE Pack 2 (0.6 Sprint)

**对象**: ENGINE
**任务标题**: Fact Layer 工程层（migrations + matcher + sync + dry-run + injection）+ `/api/consultation/follow-up`
**Sprint**: TEBIQ 0.6 / Wave 2
**Issued by**: GM
**Issued at**: 2026-05-07
**Pre-condition**: ENGINE Pack 1 (PR #79) merged

---

## 背景

Pack 1 已落地 KEYWORD_BUCKETS / SSE routing_status / 根路由。Pack 2 完成 Workstream C (Fact Layer) 工程层 + Workstream D (受控追问)。

落地后效果：
- FACT 自主交付的 ai_verified fact card 通过 sync 加载到 DB
- matcher 在用户提问时按 state × risk_level gate 决定 inject / hint / drop
- 注入 fact_card.injection_certain_block 到 LLM system prompt
- consultation 行记录 fact_card_ids + fact_card_audit
- Learning Console 显示命中卡 + 完整 audit
- 内部 dry-run endpoint 让 QA 在 production 之前验证 matcher
- 用户可在同一咨询下"补充情况"（最多 3 轮，summary-based 不无限聊天）

## 产品裁决来源

- PL 0.6 Sprint kickoff §4 (Workstream C Fact Layer) + §5 (Workstream D 受控追问)
- AI-first publish gate 状态机 (`docs/fact-cards/README.md`)
- 工程设计 (`docs/engineering/0.6-fact-layer-design.md`)
- PL §9 (post Pack 1)：Pack 2 包含 fact_layer 全套 + follow-up endpoint

## 必须读取

| 顺序 | 文件 |
|---|---|
| 1 | `CLAUDE.md` |
| 2 | `docs/ops/TEBIQ_AGENT_WORKFLOW.md` |
| 3 | `docs/roles/TEBIQ_ENGINE_ROLE.md` |
| 4 | `docs/ops/TEBIQ_CURRENT_STATE.md` |
| 5 | 本 Work Packet |
| 6 | `docs/engineering/0.6-fact-layer-design.md` (主设计) |
| 7 | `docs/fact-cards/README.md` (state machine + risk gating) |
| 8 | `docs/fact-cards/keiei-kanri-2025-10.md` (worked example) |
| 9 | `docs/fact-cards/eijuu-nenkin-risk.md` + `gijinkoku-job-mismatch.md` + `spouse-divorce-separation.md` (Batch 1 cards) |
| 10 | `lib/answer/intent/keyword-buckets.ts` + `match-buckets.ts` (Pack 1 复用) |
| 11 | `app/api/consultation/stream/route.ts` (注入点 + audit 写入) |
| 12 | `lib/db/` (drizzle schema 当前结构) |
| 13 | `app/c/[id]` + `app/me/consultations/` (Learning Console 显示层) |

## 要做什么

### 1. Drizzle migration `0025_fact_cards.sql`

按 `docs/engineering/0.6-fact-layer-design.md` §"Runtime table"：

```sql
CREATE TABLE fact_cards (
  fact_id text PRIMARY KEY,
  title text NOT NULL,
  state text NOT NULL,                   -- draft|ai_extracted|ai_verified|human_reviewed|needs_review|conflict|disabled
  risk_level text NOT NULL,              -- low|medium|high|critical
  confidence text NOT NULL,              -- low|medium|high
  source_quality text NOT NULL,          -- official|quasi_official|secondary
  controlled_alpha_eligible boolean NOT NULL DEFAULT false,
  applies_to jsonb NOT NULL,
  trigger_keywords jsonb NOT NULL,
  injection_certain_block text NOT NULL,
  injection_needs_review_addendum text,
  needs_review_flags jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_urls jsonb NOT NULL,
  reviewer text,
  last_verified_at timestamptz NOT NULL,
  approved_at timestamptz,
  approved_by text,
  filesystem_path text NOT NULL,
  content_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX fact_cards_state_idx ON fact_cards(state);
CREATE INDEX fact_cards_risk_idx ON fact_cards(risk_level);
CREATE INDEX fact_cards_state_risk_idx ON fact_cards(state, risk_level);
```

### 2. Drizzle migration `0026_consultation_fact_cards.sql`

```sql
ALTER TABLE ai_consultations
  ADD COLUMN fact_card_ids   jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN fact_card_audit jsonb NOT NULL DEFAULT '[]'::jsonb;
```

`fact_card_audit[i]` 形状：

```typescript
{
  fact_id: string,
  fact_card_state: string,
  risk_level: string,
  confidence: string,
  source_quality: string,
  official_sources: string[],     // urls
  injected_fields: string[],      // direct_fact_field names that went into certain_block
  needs_review_flags: string[],   // ids that were withheld
  decision: 'inject' | 'hint_only' | 'drop'
}
```

### 3. Sync script `scripts/fact-layer-sync.ts`

按 `docs/engineering/0.6-fact-layer-design.md` §"Sync pipeline"：

- glob `docs/fact-cards/*.md` (排除 `README.md` / `FACT_OPS_WINDOW_TASK_PACK.md`)
- parse YAML frontmatter + body (split certain_block / needs_review_addendum)
- compute content_hash (sha256)
- upsert into `fact_cards` table by `fact_id`
- hard-fail if `state: human_reviewed` but missing required field
- hard-fail if `official_sources[].url` outside whitelist (whitelist 从 `docs/fact-cards/README.md` §3 解析或 hardcode)
- hard-fail if `injection_certain_block` 为空但 `state` ∈ {`ai_verified`, `human_reviewed`}
- run on Vercel deploy (post-build hook in `package.json` "build" script) + manual CLI

### 4. Matcher `lib/answer/fact-layer/matcher.ts`

按 `docs/engineering/0.6-fact-layer-design.md` §"Matcher"：

```typescript
export type GateDecision = 'inject' | 'hint_only' | 'drop';

export interface FactCardMatch {
  fact_id: string;
  matched_keywords: string[];
  score: number;
  state: string;
  risk_level: string;
  confidence: string;
  source_quality: string;
  decision: GateDecision;  // 由 state × risk_level × controlled_alpha_eligible 决定
}

export async function matchFactCards(
  question: string,
  options: { include_dry_run_states?: boolean; today?: Date } = {}
): Promise<FactCardMatch[]>;
```

策略：
- 候选集：`state ∈ ('ai_verified', 'human_reviewed', 'needs_review')`，dry-run 时也含 `ai_extracted`
- 对每张卡 keyword substring scan (复用 Pack 1 的 normalize 逻辑)
- score = matched / total_keywords (capped 1.0)
- 阈值：score >= 0.15 OR (risk ∈ {high, critical} AND any keyword matched)
- gate decision per `docs/fact-cards/README.md` state machine 表
- top 3 by (risk_level rank, score) — risk_level rank: critical=4, high=3, medium=2, low=1
- max 2 cards 注入 (prompt budget)

### 5. Injection point in stream route

修改 `app/api/consultation/stream/route.ts`：

按 `docs/engineering/0.6-fact-layer-design.md` §"Injection point" 落实：

- Pack 1 已注入 routing_status；Pack 2 在 routing_status 之后、first_token 之前调用 matchFactCards
- 把 decision='inject' 的卡的 certain_block 替换 `{{TODAY_ISO}}` 后拼到 system prompt（追加新 system message，不修改 alpha v1 prompt）
- emit SSE `fact_cards_injected` event with full audit payload (per design §"SSE event")
- 在 completeAiConsultation / failAiConsultation 写 `fact_card_ids` + `fact_card_audit` 到 ai_consultations row

### 6. Internal dry-run endpoint `app/api/internal/fact-layer/dry-run/route.ts`

按 `docs/engineering/0.6-fact-layer-design.md` §"Internal dry-run endpoint"：

- POST `{question, state_filter?, risk_filter?, include_dry_run_states?}`
- 调 matchFactCards + 返回 `{matches, certain_block, needs_review_addendum, would_inject_in_prod, gate_decisions}`
- 不调 LLM
- 由 `EVAL_LAB_ENABLED` env 关
- 永不 reachable from user-facing app

### 7. `FACT_LAYER_ENABLED` env flag

```typescript
// In stream route, gate the matchFactCards call:
if (process.env.FACT_LAYER_ENABLED === 'true') {
  // ... matcher + injection + audit
}
```

默认 `false`。GM 验证 sync + matcher + dry-run 都 OK 后翻 true。

### 8. Learning Console / `/c/[id]` display

- `/c/[id]` 显示该 consultation 的 `fact_card_ids` + `fact_card_audit` 摘要
- "Current Facts referenced" section 列每张 `fact_id` → `title` → 链接到 GitHub permalink (`docs/fact-cards/<slug>.md` at `git_sha`)
- Learning Console: weekly aggregation of fact_card hits

### 9. `/api/consultation/follow-up` (Workstream D)

按 PL §5 + `docs/engineering/0.6-fact-layer-design.md` §"Workstream D integration"：

- 同一 consultation 下接受"补充情况"
- 维护 `consultation_summary` (jsonb on consultation row)：
  ```typescript
  {
    current_status: string,
    user_goal: string,
    known_facts: string[],
    missing_facts: string[],
    last_answer_key_points: string[],
    latest_user_addition: string
  }
  ```
- Schema migration `0027_consultation_followup.sql`:
  ```sql
  ALTER TABLE ai_consultations
    ADD COLUMN consultation_summary jsonb,
    ADD COLUMN follow_up_count integer NOT NULL DEFAULT 0;
  ```
- 默认每个咨询最多 3 次补充
- LLM 调用 input：summary + 最新补充 (NOT 完整 history)
- summary 由 LLM 在每轮回答后生成/更新（轻量 call，可与 main answer call 并行 or 后置）
- 同样走 fact_layer matcher (matcher input 可用 `summary.user_goal + known_facts + latest_user_addition`，不是无限 history)
- consultation 行的 `fact_card_ids` 是各轮 union

### 10. UI 占位 (B-UI 接入由 CODEXUI Pack 2 处理)

ENGINE 不动 UI。但要确认：
- `app/api/consultation/stream` 的 SSE 增 `fact_cards_injected` event ✅
- CODEXUI 后续会消费此 event 显示"今日有效事实命中"提示

CODEXUI B-UI 派工 GM 处理。

## 不能做什么

- ❌ 不修改 `lib/answer/prompt/consultation-alpha-v1.ts` (Pro thinking prompt 不变)
- ❌ 不修改 `lib/answer/core/llm-deepseek-provider.ts` (sensitive zone)
- ❌ 不在 production 默认 enable `FACT_LAYER_ENABLED` (默认 false)
- ❌ 不让 dry-run endpoint reachable from user-facing app
- ❌ 不写 fact card 内容
- ❌ 不修改 `docs/fact-cards/README.md` state machine
- ❌ 不修改 `docs/voice/` canonical
- ❌ 不修改 brand
- ❌ 不在一个 PR 塞全部 9 项；建议拆 3 个 PR：
  - **Pack 2.1**: migrations 0025/0026 + sync script + matcher + dry-run endpoint (无 production 影响，gated by FACT_LAYER_ENABLED=false)
  - **Pack 2.2**: stream route injection + Learning Console display
  - **Pack 2.3**: follow-up endpoint + summary + 0027 migration
- ❌ 不绕过 GM 联系 PL / FACT / DOMAIN / QA / CODEXUI

## 验收标准

### 单元

- 每张已 commit 的 fact card (4 张：keiei-kanri-2025-10, keiei-kanri-existing-holder-update, eijuu-nenkin-risk, gijinkoku-job-mismatch, spouse-divorce-separation) sync 后能被 matcher 命中预期 question
- gate decision 按 state × risk_level 表正确
- needs_review_flags 字段不进 certain_block

### 集成 (dry-run endpoint)

- POST `{question}` 返回 expected matches + certain_block 内含 source quote + audit 字段齐全
- include_dry_run_states=true 时含 ai_extracted 卡

### Production 集成 (FACT_LAYER_ENABLED=true 后)

- 4 题（QA WS-A baseline 同 4 题）跑 production stream，验证：
  - SSE 含 `fact_cards_injected` event
  - 答案中含 fact card must_have 关键词
  - 答案不含 must_not_have 关键词
  - consultation row `fact_card_ids` + `fact_card_audit` 正确写入
  - first_token / total latency 不显著恶化（< +30% baseline）

### Workstream D follow-up

- 创建 consultation 后调 follow-up endpoint，返回新答案
- 第 4 次补充触发限制提示
- summary 字段在 consultation row 正确维护
- fact_card_ids union 跨轮累积

### 工程

- `tsc --noEmit` clean
- `npm run lint` clean
- `npm run build` clean (含 sync 脚本运行)
- Vercel preview SUCCESS

## 完成后回报格式

按 `docs/roles/TEBIQ_ENGINE_ROLE.md` 标准格式回 GM (3 个 PR 各一份完成回报)。

## 需要产品负责人裁决的问题

如果 ENGINE 在执行中发现以下，必须停下来回 GM 升 PL：

1. fact_card injection 显著恶化 first_token (≥ +30%)
2. summary maintenance 需要额外 LLM call 让 total cost 翻倍
3. follow-up summary schema 需要超出本 packet 描述的字段
4. 任何 schema 改动需要 backfill production data (本 packet 假设零 backfill)
5. `FACT_LAYER_ENABLED=true` 翻开后跑 4 题验收时发现 must_not_have 命中
6. 任何 production 数据 / 用户隐私问题
7. dry-run endpoint 设计需要 expose 用户敏感数据

否则 ENGINE 自决，按本 packet 推进。

---

## ENGINE 起步建议

1. 读完所有"必须读取"文件
2. Freshness check
3. 起 branch `feat/0.6-engine-pack-2-1-fact-layer-foundation` (Pack 2.1)
4. migrations 0025/0026 + sync script + matcher + dry-run endpoint + 单元/集成测试 → PR
5. PR merge 后起 `feat/0.6-engine-pack-2-2-fact-injection-and-console`
6. stream injection + Learning Console display + 集成测试 → PR
7. Pack 2.2 PR merge 后起 `feat/0.6-engine-pack-2-3-follow-up`
8. follow-up endpoint + summary + 0027 migration + 集成测试 → PR

预计 3-5 个 working session 完成 (3 个 PR)。
