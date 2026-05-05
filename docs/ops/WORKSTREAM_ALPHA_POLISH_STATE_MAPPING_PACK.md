---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Polish Sprint v0.1 §2
issue: https://github.com/martindoad-bit/tebiq/issues/51
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# Engineering Work Packet — Alpha State Consistency Fix

> Alpha Polish Sprint §2: 修正回答状态一致性 — DB / API 层。
> CODEXUI 同步在做 UI 层渲染（独立 Polish Work Packet），本 Pack 只管 schema + stream route + tests。

## 1. Bug 现象（PL 已观察）

页面同时显示：
- "回答：生成超时"
- "[降级回答]" 标签
- 但下方展示完整或部分回答正文

冲突点：status='timeout' + 有 answer_text → UI 不知道该显示 fallback 还是 partial。

## 2. Root cause

- `ai_consultation_status` enum 现有：`streaming | completed | timeout | failed`
- 90s 硬超时触发时，无论 `partial_answer_saved` 是否为 true，status 都设为 `'timeout'`
- 真"无答案 timeout"（partial 长度 0）和"有答案但中断"（partial > 0）共用同一个 status 值
- UI 层无法正确区分 → 现在错误地把所有 timeout 当 fallback 来渲染

## 3. Scope（必须实现）

### §3.1 Schema migration 0024（additive）

```sql
ALTER TYPE "public"."ai_consultation_status" ADD VALUE 'partial';
```

仅一行。**不**改任何现有值。**不**改其他 schema。drizzle journal 自动维护 0024 entry。

### §3.2 Stream route 状态分支

`app/api/consultation/stream/route.ts` 在 90s 硬超时 watchdog 触发时：

```ts
const status = partial.length > 0 ? 'partial' : 'timeout'
const reason = partial.length > 0 ? 'hard_timeout_90s_with_partial' : 'hard_timeout_90s_no_partial'
```

写入 DB 的 `completion_status` 字段使用上述 status。

### §3.3 stream-protocol 状态联合更新

`lib/consultation/stream-protocol.ts`：
- ConsultationStatus union 加 `'partial'`
- 关联类型 / helper（如 `isTerminalEvent`）覆盖新值

### §3.4 SSE event payload

如需让前端知道是 partial 而非 timeout，可在现有 `event: 'timeout'` 之外或同事件内加字段 `partial_with_answer: boolean`。具体协议由 ENGINE 决定，但要让 CODEXUI 的 UI 能区分。

或者：直接复用现有 `event: 'timeout'` + `partial_answer_saved: boolean`（已有），CODEXUI 在 UI 层 derive。两者皆可。

### §3.5 Charter 状态映射对齐

PL §2 spec：
- A. 完整回答 → `completion_status = 'completed'`，无 [降级回答]
- B. 部分回答中断 → `completion_status = 'partial'`，"回答可能不完整"（**不**是 [降级回答]）
- C. 完全无答案 → `completion_status = 'timeout'`，[降级回答] canonical
- D. 真 fallback canonical → 同 C
- failed → `completion_status = 'failed'`

stream route 必须按此映射写 DB。

### §3.6 Tests

- `scripts/test/test-consultation.ts` 扩展或新增 contract test：
  - timeout 触发 + partial.length > 0 → status='partial'
  - timeout 触发 + partial.length === 0 → status='timeout'
  - completed 路径 status='completed'，无 'timeout' / 'partial' 误标
  - failed 路径不污染上述

## 4. Out of Scope

- ❌ 不做 UI 渲染（CODEXUI Polish PR 负责）
- ❌ 不改 `app/api/internal/eval-lab/*`
- ❌ 不改 eval_answers schema
- ❌ 不改 DS prompt / consultation_alpha_v1
- ❌ 不实现新 Charter feature
- ❌ 不引入新 env var

## 5. Sensitive path

允许：
- `lib/db/schema.ts`（enum 扩值）
- `lib/db/migrations/0024_*.sql`（生成）
- `lib/consultation/stream-protocol.ts`
- `app/api/consultation/stream/route.ts`
- `scripts/test/test-consultation.ts`

不可触：
- `app/api/internal/eval-lab/*`
- `eval_answers` schema
- `lib/answer/prompt/consultation-alpha-v1.ts`（除非 prompt 本身需调整，先回 GM）

## 6. Migration deploy

migration 0024 = 单行 ALTER TYPE ADD VALUE，纯加性。
按 Issue #46 流程：GM 在 PL 机器上 pre-migrate 后再 merge PR。

## 7. Acceptance（PL §2 Verification）

| # | 标准 | 检测方法 |
|---|------|----------|
| A | 完整回答时 status='completed'，无 [降级回答] | 跑 LLM 完成的 query → DB row 检查 |
| B | partial 时 status='partial'，UI 应显示「可能不完整」 | 90s timeout + partial.length>0 触发 |
| C | 无答案 timeout 时 status='timeout'，UI 显示 fallback canonical | 90s timeout + partial.length===0 |
| D | failed 时 status='failed' | 模拟 stream error |
| E | 中台 Learning Console status 列与前端展示一致 | 与 CODEXUI Polish PR 对齐验证 |

## 8. 完成回报

```
PR: #XX
Commit: <sha>
Migration 0024: applied to production via GM/PL coordination per #46
Tests: tsc/lint/build clean + new partial-state contract tests
SSE protocol: <unchanged | added field XX>
CODEXUI handshake: <inform CODEXUI 团队 status 字段值变化>
```

## 9. 与 CODEXUI Polish 协调

CODEXUI Polish Work Packet §4 列出 7 状态（completed / partial / streaming / timeout_waiting / timeout / failed / fallback）。

ENGINE 仅负责 DB 层 5 个值（completed / partial / streaming / timeout / failed）。
CODEXUI 在 UI 层可以引入额外渲染状态（如 `timeout_waiting` = streaming + 25s 后），不需要 DB 字段。

如 CODEXUI 需要更多 DB 状态字段，回 GM 评估再扩 scope。
