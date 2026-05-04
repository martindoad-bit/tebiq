# Engineering Work Packet — Workstream A: Internal Console Deblocking

对象：ENGINE
任务标题：Workstream A — Internal Console 去阻塞 + 可见性增强 v2
背景：/internal/eval-console 当前实现在 DeepSeek API 不可用时行为未知（可能空白/spinner/error）。产品负责人裁决：Internal Console 必须在 DeepSeek down 时仍正常显示，并清楚展示 provider 不可用的事实及其影响范围。本任务不依赖 DeepSeek API，不依赖 FULL_COMPARABLE，不等 M3。
产品裁决来源：2026-05-05 产品负责人指令 §2 Internal Console 去阻塞 + §3 最低验收标准

---

## 必须读取

1. `app/internal/eval-console/` — 当前实现（了解已有功能）
2. `app/api/internal/eval-lab/` — state / export / health-check 端点
3. `docs/eval/EVAL_INTERNAL_CONSOLE_PACK.md` — 原 v1 Work Packet（不重复实现已有功能）
4. `docs/product/TEBIQ_CURRENT_STATE.md` — 当前项目状态

---

## 要做什么

### A1 — Provider Health Panel（必须）

在页面顶部增加 Provider Status 区块：

```
DeepSeek API
  status: unavailable / timeout / healthy / unknown
  last_checked_at: <时间戳>（从最近一次 eval_answers 记录推断，或独立 probe）
  impact_blocked:
    - FULL_COMPARABLE 生成
    - M3 Answer Quality Baseline
  impact_not_blocked:
    - 100 问浏览
    - routing 状态查看
    - DOMAIN 风险地图
    - Internal Console 本身
```

实现要求：
- **不得实时调用 DeepSeek**——从 DB 最近 eval_answers 记录推断状态（last `deepseek_raw` answer 的 error/ok 字段）
- 若近 24h 无记录：显示 `unknown`
- 若近 24h 有 ≥1 条 `deepseek_timeout`：显示 `timeout`
- 若近 24h 最新一条 ok=true：显示 `healthy`

### A2 — 每题状态扩展（必须）

在每题行新增以下字段支持（前端计算或从 DB 读取，不新增 API）：

新增支持的 status 标签（在现有 sample class 基础上补充显示）：

| status | 触发条件 | 颜色建议 |
|--------|---------|---------|
| `annotation_blocked` | TEBIQ ok + DS failed，无法进 FULL_COMPARABLE | 灰 |
| `domain_review_needed` | starter_tag 在 DOMAIN 100Q risk matrix 中有 HIGH risk 标记 | 紫 |
| `p0_candidate` | risk_level=HIGH（从 DOMAIN risk matrix 读取，如已进 main）| 红边 |
| `p1_candidate` | risk_level=MEDIUM | 橙边 |
| `routing_failure` | 已有 ✅（REGRESSION_SET + out_of_scope）| — |

**数据来源**：
- `docs/domain/DOMAIN_100Q_RISK_MATRIX.md` 已进 main（PR #25），可在构建时静态引入或前端 fetch
- 不新增 DB schema

### A3 — Per-Question Detail 页（必须）

点击每题行，展开或跳转到 detail 视图，显示：

| 字段 | 来源 |
|------|------|
| original_question | DB |
| TEBIQ output（如有）| eval_answers |
| DeepSeek output（如有）| eval_answers |
| fallback_reason | eval_answers |
| routing_reason / domain 推断 | eval_answers rawPayload |
| sample_classification | 前端计算（现有逻辑）|
| DOMAIN note（如有）| DOMAIN_100Q_RISK_MATRIX.md |
| annotation status | 前端推断（FULL_COMPARABLE → eligible；其余 → blocked + 原因）|
| 是否可进入正式 Eval | 前端推断 |

不能进入正式 Eval 时，必须显示原因（fallback / routing_failure / ds_failed 等）。

### A4 — Batch 状态栏（必须）

在统计行下方增加 Batch Status 区块：

| 字段 | 来源 |
|------|------|
| latest_batch_id | eval_answers 中最新 batch_id |
| last_run_at | eval_answers 中最新 created_at |
| total_questions | 100 |
| generated（TEBIQ）| 统计 |
| full_comparable | 统计 |
| tebiq_fallback | 统计 |
| deepseek_failed | 统计 |
| routing_failure | 统计 |
| annotation_blocked | 统计 |

数据来源：从现有 `/api/internal/eval-lab/state` 聚合，不新增 API。

### A5 — DeepSeek Down 时页面保护（必须）

确保以下行为：
- 首屏不发出任何实时 DeepSeek 请求
- `/state` API 返回错误时，页面仍渲染已有 DB 数据，不显示空白
- 加载中使用 skeleton，不使用无限 spinner
- API 错误时显示 "数据加载失败，显示最近缓存" 而非空白页

---

## 不能做什么

- 不实时调用 DeepSeek（首屏）
- 不新增 DB schema
- 不触碰 `app/answer/`、`lib/answer/`
- 不等 DeepSeek API 恢复才能开工

---

## 验收标准

- [ ] DeepSeek API 模拟不可用时，`/internal/eval-console` 仍正常显示 100 题列表
- [ ] Provider Health Panel 显示 DeepSeek 状态 + 影响范围（阻塞 M3，不阻塞中台）
- [ ] 每题行显示 `p0_candidate` / `domain_review_needed` 标签（从 DOMAIN risk matrix）
- [ ] 点击每题可看 detail（TEBIQ output / DS output / fallback_reason / 是否可进 Eval）
- [ ] Batch 状态栏显示 latest_batch_id / 各类计数
- [ ] `npx tsc --noEmit` clean
- [ ] 无用户端 answer path 改动

---

## 完成后回报格式

```
Workstream A Console Deblocking — 实现报告

A1 Provider Health Panel: ✅/❌
A2 Per-question status 扩展: ✅/❌（新增 N 个 status）
A3 Per-question Detail 页: ✅/❌
A4 Batch 状态栏: ✅/❌
A5 DS down 保护: ✅/❌

验收测试：
  - DS 模拟不可用时页面行为：
  - Detail 页可追溯性：
PR：#XX
```

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
