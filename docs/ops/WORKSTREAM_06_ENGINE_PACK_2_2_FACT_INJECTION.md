# Work Packet — ENGINE Pack 2.2 (Fact Layer Production Injection)

**对象**: ENGINE
**任务标题**: Fact Layer 在 production stream route 中的注入 + audit + 灰度 + card-level disable
**Sprint**: TEBIQ 0.6 / Wave 3
**Issued by**: GM (per PL 2026-05-07 §2 directive — fact layer 步子迈大)
**Pre-condition**:
- Pack 2.1 (PR #84) merged — schema/migrations/sync/matcher/dry-run 在 main
- PR #89 hotfix schema 注释已生效（要 follow-up PR 重新 add schema.ts 列声明）
- Runbook §1-§3 prod ops 已执行（GM 同回合协调）
- 11 张 fact card 已通过 fact-layer:sync 写入 prod fact_cards 表

---

## 背景

PL 0.6 §2 裁决修正 fact layer 策略：

> 现有 fact cards 应尽快进入 Alpha 使用。行政书士也是去官方网页和资料里找答案；官方事实层比模型裸记忆更可靠。

不再"critical 一律挡 production injection 外"。所有 `state ∈ (ai_verified, human_reviewed)` 卡原则上都进 controlled Alpha。但必须保留：可追踪 / 可回滚 / 可审计 / 可灰度 / 关键错误可停用。

## 当前问题

1. 用户提"经管 500万" → 模型仍按训练数据答旧基准（fact 层未注入）
2. fact_cards 表已有 11 张卡，但 stream route 未读 / 未注入到 LLM prompt
3. consultation row 未记 fact_card_ids / fact_card_audit
4. PR #89 hotfix 注释了 schema.ts 两行 → 需要 follow-up 重新 add（DB 列已有）

## 目标

用户一旦提涉及 fact card 主题（经管 / 永住年金 / 配偶离婚 / 在留期限 / 副业 / 家族滞在等）的问题：

- 模型回答含命中 fact card 的 certain_block 内容（用户感受得到事实层介入）
- consultation 详情页能看到 "本回答参考了 X 张事实卡"（用户可信任审计路径）
- 错卡可在 1 分钟内 disable（运维可控）
- 整个 fact_layer 可在 5 秒内 kill switch（环境变量）

## 产品裁决来源

- PL 2026-05-07 §2 fact layer 加速纳入
- DL-014 AI-first Fact Layer + Publish Gate
- `docs/fact-cards/README.md` state machine + risk gating
- DL-016 (proposed) Schema-before-migration lesson

## 必读

| 顺序 | 文件 |
|---|---|
| 1 | `CLAUDE.md` |
| 2 | `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md` |
| 3 | `docs/roles/TEBIQ_ENGINE_ROLE.md` |
| 4 | 本 Work Packet |
| 5 | `docs/engineering/0.6-fact-layer-design.md` (含 SSE event + injection point 设计) |
| 6 | `docs/fact-cards/README.md` |
| 7 | `lib/answer/fact-layer/matcher.ts` (Pack 2.1 已实现) |
| 8 | `lib/db/schema.ts` (注意 fact_card_ids/audit 列被注释 — 本 Pack 第一步重新 add) |
| 9 | `lib/db/migrations/0026_consultation_fact_cards.sql` |
| 10 | `app/api/consultation/stream/route.ts` (现有 SSE 流 + KEYWORD_BUCKETS routing_status) |

## 要做什么

**ENGINE 自决具体实现**。下面是必须达成的目标 + 必备 invariant，不是按钮清单。

### 1. Schema re-add（Pack 2.2 起步前置）

PR #89 注释了 schema.ts 中 fact_card_ids / fact_card_audit 两行。这两列在 prod DB 中已通过 migration 0026 添加（前提：Runbook §1 已跑）。

需要 ENGINE 第一个 commit：取消注释 + 验证 drizzle .returning() 不再 column-not-exist 报错。

### 2. Stream route fact_layer 调用

在 `app/api/consultation/stream/route.ts` 中 `routing_status` event 后、`first_token` 前：
- 调用 matcher 获取 hit cards
- 决定 inject / hint / drop（按 README state × risk 表）
- 把 inject 卡的 certain_block 拼到 LLM system prompt（不动 alpha v1 prompt 本体，新增 system message append）
- 触发 SSE `fact_cards_injected` event with full audit payload
- 在 completeAiConsultation / failAiConsultation 写 fact_card_ids + fact_card_audit

### 3. Feature flag (kill switch)

`FACT_LAYER_ENABLED` env var：
- `true` → 上述注入流程激活
- `false` 或 unset → 完全 bypass（current behavior）

切换 < 5 秒（Vercel env var 改 + redeploy 不需要，应在请求时读 env）。

### 4. Card-level disable

不需要新 endpoint。仅靠两条路径之一：
- 在 `docs/fact-cards/<slug>.md` frontmatter 改 `state: disabled` → 下次 fact-layer:sync 后即生效
- 直接 DB UPDATE: `UPDATE fact_cards SET state='disabled' WHERE fact_id='<id>'` → 即时生效

ENGINE 必须验证：matcher 的 candidate set 永不含 `state='disabled'` 卡。

### 5. Audit trail

per-consultation audit (写入 ai_consultations 行)：

```typescript
fact_card_ids: string[]            // dedup 命中卡 ids (含 hint_only 和 dropped — 但 dropped 可省)
fact_card_audit: Array<{
  fact_id: string
  fact_card_state: string          // 'ai_verified' | 'human_reviewed' | 'needs_review' (matched but hint_only)
  risk_level: string
  confidence: string
  source_quality: string
  official_sources: string[]       // urls
  injected_fields: string[]        // direct_fact_field names that went into certain_block
  needs_review_flags: string[]     // ids withheld
  decision: 'inject' | 'hint_only' | 'drop'
}>
```

### 6. SSE `fact_cards_injected` event

在 routing_status 之后、first_token 之前发出。CODEXUI 后续消费做"今日有效事实命中"提示（不是本 Pack 范围）。

### 7. Learning Console / `/c/[id]` display

- `/c/[id]` 显示 "本回答参考了 X 张事实卡" + 列每张卡 `fact_id` 链接到 GitHub permalink at git_sha
- `/me/consultations` 列表项含 fact_card 数量 badge

### 8. QA smoke (本 Pack 自带)

ENGINE 在合并前用 dry-run endpoint 验证：
- 4 题 baseline (经管 / 技人国 / 永住年金 / 经管厚生年金) + 7 题 (覆盖各 fact card 主题)
- 每题预期命中卡 vs 实际命中
- 必须 must_have 在答案中出现 / must_not_have 不出现

### 9. Live verify (post-merge)

ENGINE 在 PR description 提供 4 + 7 = 11 题对 production preview 的 verification 结果（before/after fact_layer enable）。

## 不能做什么

- ❌ 不修改 `lib/answer/prompt/consultation-alpha-v1.ts`（fact 注入用追加 system message）
- ❌ 不修改 `lib/answer/core/llm-deepseek-provider.ts`
- ❌ 不删除或重命名既有 SSE event（received / risk_hint / routing_status / first_token / answer_chunk / completed / partial / failed / timeout）
- ❌ 不让 `state: ai_extracted / draft / conflict / disabled / needs_review` 卡注入 facts（needs_review 可触发保守 hint，但不作为事实）
- ❌ 不让 dry-run endpoint 出现在 user-facing route
- ❌ 不破坏 first_token latency（fact_layer 调用必须 < 100ms total，matcher.ts 是 pure substring + DB read）
- ❌ 不在没 `FACT_LAYER_ENABLED=true` 时影响任何 user-facing 行为
- ❌ 不绕过 GM 联系 PL / FACT / DOMAIN / QA / CODEXUI

## 验收

| 验收项 | 必须 |
|---|---|
| schema.ts 两行重新加 | ✅ |
| `tsc --noEmit` clean | ✅ |
| `npm run lint` clean | ✅ |
| `npm run build` clean | ✅ |
| Vercel preview SUCCESS | ✅ |
| 全部 277/277+新加测试 pass | ✅ |
| `FACT_LAYER_ENABLED=false`（默认）→ user-facing 行为零变化 | ✅ |
| `FACT_LAYER_ENABLED=true` + dry-run endpoint 4+7 题 must_have 全部出现 | ✅ |
| disabled 卡永不命中 matcher | ✅ |
| consultation row 写 fact_card_ids + fact_card_audit | ✅ |
| `/c/[id]` 显示命中卡（基础版，深度展示由 CODEXUI 后续 Pack）| ✅ |
| first_token p50 latency 不超过 fact_layer 关闭 baseline + 1 秒 | ✅ |

## 完成回报

按 `docs/roles/TEBIQ_ENGINE_ROLE.md` 19 字段 + per-§ 验收 + before/after 11 题对比表。

## 何时停下找 GM

- 4+7 题验证发现 must_have 缺失或 must_not_have 命中
- DB schema 改动需扩展（本 Pack 假定 0026 列已可用）
- 任何 user-facing 行为变化超出"FACT_LAYER_ENABLED=true 时注入 fact"
- first_token p50 latency 超出 baseline + 1 秒
- 任何 production 数据隐私问题

## 灰度上线建议（非阻塞 PR merge）

PR merge 不等于 prod 启用。GM 决定 enable 时机。建议序列：
1. PR merge → Vercel 部署 → `FACT_LAYER_ENABLED=false`（默认）
2. GM 在 Vercel preview env 翻 `FACT_LAYER_ENABLED=true` 跑 11 题 smoke
3. QA 验证（用 11 题）
4. GM 通报 PL → PL approval → prod env 翻 `FACT_LAYER_ENABLED=true`
5. 监控 24h（任何 wrong fact 报告 → disable 涉事卡 + 调查）

## ENGINE 起步建议

1. 必读完
2. Freshness check
3. branch `feat/0.6-engine-pack-2-2-fact-injection`
4. Commit 1: re-add schema.ts 两行 + tsc verify
5. Commit 2: matcher 调用 + injection + audit 写入
6. Commit 3: SSE event + display in /c/[id]
7. Commit 4: 4+7 题 dry-run smoke + integration tests
8. PR + 完成回报

预计 1-2 个工作 session。

---

**版本**: v1.0 / 2026-05-07 / GM (per PL 0.6 sprint Wave 3)
