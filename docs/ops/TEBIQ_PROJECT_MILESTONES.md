# TEBIQ Project Milestones — M0–M7

> 工程里程碑定义和当前状态。
> 由 GM 维护。里程碑进入/完成须产品负责人确认。

---

## 里程碑状态总览

| 里程碑 | 名称 | 状态 | 解锁条件 |
|--------|------|------|---------|
| **M0** | 项目规则重置 + 并行模式启动 | ✅ 完成（2026-05-05）| — |
| **M1** | Internal Console Alpha | ⏳ ENGINE | Issue #19 验收通过 |
| **M2** | Routing Safety Gate | ⏳ ENGINE | Issue #18 7/7 回归通过 |
| **M3** | Answer Quality Baseline | ⏳ 等待 | ≥24 FULL_COMPARABLE + DOMAIN 标注完成 |
| **M4** | User Preview Alpha | ⏳ M1 后 | M1 完成 + Track D Work Packet 批准 |
| **M5** | Matter v0 | ⏳ M3 后 | M3 完成 + 风险图谱 v1 |
| **M6** | Private Beta Readiness | ⏳ M2+M4 | M2 + M4 + QA Gate 全通过 |
| **M7** | Public Soft Launch | ⏳ M5+M6 | M5 + M6 + 产品负责人/CEO 验收 |

---

## M0 — 项目规则重置 + 并行模式启动

**状态**：✅ 完成（2026-05-05）

**完成内容**：
- 项目运行规则 v0.2（GM 自主权、多线并行、仅 7 条件上升产品负责人）
- 6 Track 并行结构定义
- AGENTS.md v0.2 更新
- CURRENT_STATE.md 6-track 格式
- GM 正式试运行模式上线

---

## M1 — Internal Console Alpha

**状态**：⏳ ENGINE（Issue #19）

**目标**：CEO 能打开 Internal Console，看见 100 问和每题状态。

**验收标准**：
- [ ] `/internal/eval-console` 或 eval-lab 增强页面在 `EVAL_LAB_ENABLED=1` 下可访问
- [ ] 顶部统计行：Total / TEBIQ Answered / DS Answered / FULL_COMPARABLE / Fallback / Routing Failure / OOS / DS Failed
- [ ] 每题行：starter_tag / questionText / TEBIQ status / fallback_reason / DS status / 分类色标
- [ ] TEBIQ 重跑按钮 + DeepSeek 重跑按钮（failed/none/fallback 时可用）
- [ ] TypeScript 类型检查通过（`npx tsc --noEmit`）
- [ ] 无用户端 answer path 改动

**不解锁 M1 时**：Track D (User Preview) 不得动工。

---

## M2 — Routing Safety Gate（7/7 回归通过）

**状态**：⏳ ENGINE（Issue #18）

**目标**：7 条已知高风险路由误判全部修复，回归测试通过。

**验收标准**：
- [ ] 7/7 TEBIQ status ≠ `out_of_scope`（J03/J04/J08/I08/D05/D06/D09）
- [ ] J03/J04/J08/I08（HIGH 风险）：status = `clarification_needed` 或 `preliminary`
- [ ] D05/D06 离婚类：domain 推断为家族/身份変更相关
- [ ] 无新 regression（其他题不因此变为 out_of_scope）
- [ ] `run-round1-phased.sh` Step 1 自动验证通过

**解锁**：Formal Round 1A Phased Rerun（Track A）。

---

## M3 — Answer Quality Baseline

**状态**：⏳ 等待（依赖 DeepSeek API + M2）

**目标**：Eval Round 1A 正式数据生成 + DOMAIN 标注完成。

**前提**：
1. LLM Health Check 5/5 pass（`health-check.sh`）
2. M2 Routing Safety Gate 通过
3. Formal Round 1A Phased Rerun 完成（≥24 FULL_COMPARABLE）
4. DOMAIN 正式标注激活（Work Packet `EVAL_ROUND1A_DOMAIN_WORK_PACKET.md`）

**解锁**：M5（Matter v0）；Prompt 调优（基于标注数据）。

---

## M4 — User Preview Alpha

**状态**：⏳ M1 后

**目标**：CEO 可操作的用户端预览（真实在留风险场景，非生产流量）。

**前提**：M1 完成 + Track D Work Packet 产品负责人批准。

**范围**（待产品裁决）：
- 用户端答案页轻量更新
- Matter Draft V0 可见
- 不触碰 Prompt / 路由逻辑（M3 前不做）

---

## M5 — Matter v0

**状态**：⏳ M3 后

**目标**：风险评估 + 下一步行动路径完整呈现。

**前提**：M3 完成 + 100Q 风险图谱 v1（Track E）。

---

## M6 — Private Beta Readiness

**状态**：⏳ M2+M4

**前提**：M2 + M4 + QA Gate 全通过 + CEO 验收。

---

## M7 — Public Soft Launch

**状态**：⏳ M5+M6

**前提**：M5 + M6 + 产品负责人/CEO 最终批准。

---

## 里程碑更新规则

| 触发 | 动作 |
|------|------|
| 里程碑达成 | GM 更新状态 → 产品负责人确认 → CURRENT_STATE.md 同步 |
| 里程碑阻塞 | GM 记录阻塞原因 + 建议解法 → 异步汇报 |
| 里程碑 scope 变化 | 产品负责人裁决 → GM 更新本文件 |
