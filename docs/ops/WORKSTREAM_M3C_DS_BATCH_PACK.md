---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ Project Lead Directive v0.3 §3
issue: https://github.com/martindoad-bit/tebiq/issues/34
---

# Engineering Work Packet — M3-C DeepSeek Batch Readiness

> 本 Work Packet 是 GM 给 ENGINE 的正式工程任务包。
> ENGINE 只执行本 packet 描述的工作。
> 不接受聊天指令。
> 涉及 sensitive path（`lib/answer`/`app/answer`/`app/api/questions`/eval-lab route/DeepSeek provider）必须 follow §6 Sensitive Path Clearance。

## 1. 任务来源 / Authority

- 上级指令：TEBIQ Project Lead Directive v0.3 §3
- 协调者：GM
- 执行者：ENGINE
- 目标：拆分 DeepSeek timeout — 25s interactive vs 90s batch eval

---

## 2. 背景 / Context

### 2.1 已知事实

- DS 25s interactive：5 探针 1/5 ok = `slow_not_interactive`（GM 实测 2026-05-05）
- DS 90s batch：1+/1 ok = `healthy_batch`（实测返回 2480 字符正确答案）
- 当前 eval-lab 路由（`/api/internal/eval-lab/deepseek-raw`）使用 25s timeout，导致 batch eval 大量 timeout fallback
- M3-A E2E 7/7 PASS，M3-B 通过临时标准
- DL-007 / DL-009 已记录

### 2.2 核心拆分原则

| 路径 | 用途 | 推荐 timeout |
|------|------|-------------|
| `/internal/preview`（user-facing） | interactive fallback | **保留 25s + fallback** — 不动 |
| `lib/answer/` 主回答 pipeline | user-facing | **保留 25s + fallback** — 不动 |
| `/api/internal/eval-lab/deepseek-raw` | batch eval 后台 | **调整为 90s** |
| `/api/internal/eval-lab/tebiq-answer` | TEBIQ pipeline 给 eval lab | **保留 25s**（与 user-facing 一致） |

**核心约束**：90s batch timeout **只能** 用于 eval-lab batch generation，**不得** 影响前台 interactive。

---

## 3. 工程任务

### 3.1 eval-lab DeepSeek raw route timeout 调整（最优先）

**Touched files**（预期）：
- `app/api/internal/eval-lab/deepseek-raw/route.ts`
- 可能涉及 `lib/eval-lab/` 内 DS client wrapper（如有）
- `vercel.json` 或 route 内 `export const maxDuration = ...`

**Acceptance Criteria**：
- DS raw 调用 timeout 从 25s 调整到 90s
- 仅影响 `app/api/internal/eval-lab/deepseek-raw/route.ts`
- 不动 `lib/answer/`，不动 `app/answer/`，不动 `app/api/questions/`
- `app/api/internal/eval-lab/tebiq-answer/route.ts` **保持 25s**（与 user-facing pipeline 一致，避免污染）
- 输出 JSON 中保留：`latency_ms` / `timeout_ms`（新增）/ `provider_status`（新增 - timeout/healthy/error）/ `ok` / `error`
- 5 条不同长度问题验证：≥4/5 在 90s 内 ok=true
- 不改 DeepSeek prompt
- 不改 eval_answers DB schema

**Out of Scope**：
- 不改 `/internal/preview` interactive 路径 timeout
- 不改 user-facing answer page
- 不改 DS provider 配置
- 不引入新环境变量

### 3.2 Batch Health Probe Script

**Touched files**：
- `scripts/eval/health-check.sh`（已存在，需修复 macOS bash 3.x 兼容 + 增加 batch 探针）
- 可选：新增 `scripts/eval/health-check-batch.sh`（90s 批次专用）

**Acceptance Criteria**：
- `health-check.sh` 在 macOS bash 3.x 下不再因 `declare -A` 报错（改用普通 array 或 jq）
- 新增 batch probe：5 条不同长度问题（短 / 中 / 长），timeout 90s，concurrency 1
- 输出报告含：fast_interactive_status / batch_generation_status / average_latency / success_count / timeout_count / recommended_concurrency / ready_for_M3_C
- 不改 user-facing 路径
- 不改 DeepSeek prompt

**Out of Scope**：
- 不实际跑 100Q 批次（M3-C 阶段才做）
- 不写新的 monitoring dashboard

### 3.3 M3-C Phased Run 准备（不直接执行）

**任务**：准备 M3-C 阶段化运行的脚本骨架，**不直接大规模跑**。

**Touched files**（新增）：
- `scripts/eval/m3c-phased-run.sh`（新增）— 仅骨架，不默认执行批量

**Acceptance Criteria**：
- 脚本支持三阶段参数：`--phase=5q | 20q | 100q`
- 默认不执行（需显式参数）
- 每一步产出：FULL_COMPARABLE count / DS failed / TEBIQ fallback / invalid sample / latency distribution / contamination check
- batch_id / version 可追溯（写入 eval_answers.metadata_json）
- 不改 DB schema
- 不改 prompt
- 不改 user-facing

**Out of Scope**：
- 不直接跑 100Q（GM 在 §3.1+§3.2 验收完成后另发 Work Packet 决定何时启动）
- 不引入新 env var

---

## 4. QA Plan

每个 task 完成后，ENGINE 自检：

| Task | QA |
|------|-----|
| §3.1 DS route timeout | curl POST 测试 5 条问题，验证 ≥4/5 在 90s 内 ok=true；同时验证 `/internal/preview` 仍然 25s + fallback |
| §3.2 Batch health script | 在 macOS bash 3.x 跑通；输出符合格式 |
| §3.3 Phased run skeleton | `--phase=5q` 跑通并产出报告字段 |

GM 安排 QA 二次验收：M4 Preview QA（验证 user-facing 不受影响）+ DS Batch Health Report 验收。

---

## 5. Context Impact

| 影响项 | 状态 |
|-------|------|
| user-facing answer pipeline | 不影响 |
| `/internal/preview` Phase 1+2 | 不影响 |
| eval_answers DB schema | 不影响（只新增 metadata_json key）|
| DeepSeek prompt | 不改 |
| 环境变量 | 不新增 |
| Vercel function maxDuration | §3.1 内单 route 调整为 90s（仅 deepseek-raw route）|

---

## 6. Sensitive Path Clearance

| 路径 | 是否触及 | 说明 |
|------|---------|------|
| `lib/answer/` | ❌ 不触及 | — |
| `app/answer/` | ❌ 不触及 | — |
| `app/api/questions/` | ❌ 不触及 | — |
| `app/api/internal/eval-lab/deepseek-raw/route.ts` | ✅ 触及 | §3.1 唯一允许触及的 route |
| `app/api/internal/eval-lab/tebiq-answer/route.ts` | ❌ 不触及 | 保持 25s |
| `lib/eval-lab/` | ⚠️ 可能 | 如有 DS client wrapper 需调整 timeout，必须只用于 batch 路径 |
| DeepSeek prompt / provider config | ❌ 不改 | — |
| eval_answers schema | ❌ 不改 | — |

---

## 7. Rollback

如出现 P0：
- §3.1 rollback：单文件 revert（`app/api/internal/eval-lab/deepseek-raw/route.ts`）
- §3.2 / §3.3 rollback：删除新增脚本即可
- 不影响 user-facing pipeline

---

## 8. 完成回报格式

```
ENGINE Work Packet Completion — M3-C DS Batch Readiness

§3.1 DS route timeout: ✅/❌
  - touched files:
  - 5-probe result: <ok_count>/5
  - latency p50/p95:
§3.2 Batch health script: ✅/❌
  - macOS bash 3.x compatible:
  - sample report excerpt:
§3.3 Phased run skeleton: ✅/❌
  - --phase=5q dry-run output:

Out of scope verified:
  - lib/answer/: untouched ✓
  - app/answer/: untouched ✓
  - tebiq-answer route: still 25s ✓
  - DS prompt: unchanged ✓

PR: #XX
Commit: <sha>
Vercel: SUCCESS / FAILED

ready_for_M3_C: yes/no
```

---

## 9. ENGINE 不可单方面做的事

- 触及上述 sensitive path 中标记 ❌ 的路径（必须先回 GM 申请新 Work Packet）
- 改 DS prompt
- 改 user-facing copy
- 改 env vars
- 实际启动 100Q M3-C 大规模运行（必须等 GM 在 §3.1+§3.2 验收后另发指令）
