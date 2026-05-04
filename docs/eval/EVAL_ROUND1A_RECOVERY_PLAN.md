# Eval Round 1A — Recovery Plan

> **GM 产出**：2026-05-05
> **来源**：Technical Dry Run `round1-20260504-231231` 失败分析
> **受众**：产品负责人（裁决），ENGINE（执行参考）

---

## 失败根因总结

| 根因 | 类型 | 状态 |
|------|------|------|
| 批量脚本 payload bug（`question` 字段缺失）| 工程 bug | ✅ 已修复（commit 60521da）|
| DeepSeek raw API timeout（`deepseek-v4-pro`）| Provider 不可用 | ⏳ 待恢复 |
| TEBIQ pipeline 内部 DeepSeek timeout (17/30) | Provider 不可用 | ⏳ 待恢复 |

两个问题独立。payload bug 已修复；API timeout 是当前唯一阻塞。

---

## LLM Health Check 设计

**执行方式**：`bash scripts/eval/health-check.sh`（已就绪，无需 ENGINE 介入）

**5 个 Gate（全部 pass 才允许运行正式批量）**：

| Gate | 检查项 | Pass 标准 |
|------|--------|----------|
| 1 | Eval Lab access | /seed 返回 200/405（非 404）|
| 2 | TEBIQ channel | 3/3 ok=true |
| 3 | TEBIQ no fallback | 0/3 llm_timeout |
| 4 | DeepSeek channel | ≥2/3 ok=true |
| 5 | FULL_COMPARABLE pairs | ≥1 对 (TEBIQ non-fallback + DS ok) |

输出格式：
```
LLM Health Status:
  DeepSeek raw:     pass/FAIL (X/3)
  TEBIQ LLM:        pass/FAIL (X/3)
  Fallback rate:    X/3 llm_timeout
  FULL_COMPARABLE:  X/3
  Timeout root cause: provider / route / env / payload / unknown
  Recommended action: ...
HEALTH CHECK RESULT: PASS / FAIL
```

---

## 正式重跑 Preconditions

以下条件全部满足后，才可触发 `run-round1-phased.sh`：

| # | 条件 | 验证方式 |
|---|------|---------|
| 1 | DeepSeek raw health check 连续 3/3 pass | `health-check.sh` |
| 2 | TEBIQ LLM health check 连续 3/3 pass | `health-check.sh` |
| 3 | TEBIQ fallback_reason=llm_timeout ≤ 1/3 | `health-check.sh` Gate 3 |
| 4 | 单题响应时间在可接受范围（DS <35s, TEBIQ <65s）| `health-check.sh` 输出 latency |
| 5 | Eval Lab access gate 确认 | `health-check.sh` Gate 1 |
| 6 | 脚本 payload 修复已确认 | commit 60521da (✅ done) |
| 7 | 样本分类使用新 5 级定义 | `run-round1-phased.sh` (✅ done) |

---

## 恢复方案对比

### Option A：等待 DeepSeek 恢复 + 单次重试

**操作**：
1. 等 DeepSeek API 恢复
2. 运行 `health-check.sh`，确认 5/5 Gate pass
3. 运行 `run-round1-phased.sh`

**优点**：最简单；现有脚本已支持；无额外工程工作。

**风险**：
- 无法主动检测 DeepSeek 何时恢复（需手动触发 health check）
- 若 API 间歇性可用，可能在批量中途再次超时
- 无自动 fallback 机制

**成功标准**：health-check 5/5 pass → run-round1-phased Phase 1 通过 → ≥24 FULL_COMPARABLE。

**GM 推荐度**：⭐⭐⭐（最可能执行路径；风险可接受）

---

### Option B：分阶段批量 + 质量门控（当前默认方案）

**已实现**：`scripts/eval/run-round1-phased.sh`

**操作**：
1. `health-check.sh` pass
2. `run-round1-phased.sh`（自动执行 4 阶段）

**阶段结构**：

| 阶段 | 题数 | 通过门控 |
|------|------|---------|
| Phase 1: Probe | 3 | 3/3 FULL_COMPARABLE（严格）|
| Phase 2: Mini | 5 | ≥4/5 FULL_COMPARABLE |
| Phase 3: Batch10 | 10 | ≥8/10 FULL_COMPARABLE |
| Phase 4: Complete | 12 | 无门控（前 3 阶段已验证）|

**优点**：
- 任何阶段失败立即 abort，不浪费 API 调用
- Phase 1 失败 = 快速发现 Provider 问题（3 题，约 3 分钟）
- 最终产出 summary.json 含完整 5 级分类

**风险**：Phase 1 失败后需重新触发（手动）。

**成功标准**：4 阶段全部通过，FULL_COMPARABLE ≥ 24。

**GM 推荐度**：⭐⭐⭐⭐⭐（**推荐，已实现**）

---

### Option C：自动周期性 Health Check + 等待恢复后触发

**需要工作**：Engineering Work Packet（非当前 GM 权限范围内的代码改动）

**操作**：用 cron / 脚本轮询 health-check.sh，DeepSeek 恢复后自动触发 run-round1-phased.sh。

**优点**：无需手动等待；DeepSeek 恢复后自动跟进。

**风险**：
- 需要 cron 基础设施或 CI trigger
- 自动触发 30 题生成存在无人监控风险
- 非当前阶段优先级

**GM 判断**：本轮不执行 Option C。当前量级不需要自动化触发，手动 health-check → phased batch 足够。

**GM 推荐度**：⭐⭐（后续 Scale-up 阶段可考虑）

---

## GM 结论与执行路径

**推荐路径**：Option B（已实现）

```
Step 1: 等待 DeepSeek API 恢复信号
Step 2: bash scripts/eval/health-check.sh
Step 3: 如 PASS → bash scripts/eval/run-round1-phased.sh
Step 4: 确认 FULL_COMPARABLE ≥ 24
Step 5: 导出 export?type=full 存档
Step 6: 激活 DOMAIN Work Packet
```

**需要产品负责人裁决的问题**：

1. `temp-org-rules` 分支（含修复 + health-check + phased-batch）是否批准 merge 到 main？
2. 是否接受 FULL_COMPARABLE ≥ 24（而非 30/30）作为 DOMAIN 标注启动门槛？
3. out_of_scope 7 条专项分析优先级：在 Round 1A 之前 / 同步 / 之后？

---

**所有 GM 产出默认 `draft / needs product owner review`。**
**工程执行决策归产品负责人裁决，代码变更归 ENGINE 执行。**
