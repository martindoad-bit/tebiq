# Engineering Work Packet — DOMAIN 100Q Risk Map v1

对象：DOMAIN-CC
任务标题：Track E — 100 题在留风险图谱 + Pattern 梳理（不等 FULL_COMPARABLE）
背景：Eval Lab 已有 100 题种子数据（A-J 场景）。当前 Eval Round 1A（Track A）因 DeepSeek API timeout 阻塞，但 DOMAIN 的语义分析工作不依赖 FULL_COMPARABLE 数据，可直接从 100 题题目本身展开。本任务产出在留风险图谱 + 高优先 Pattern 梳理，作为 M5 Matter v0 和 Prompt 调优的 DOMAIN 底座。
产品裁决来源：2026-05-05 项目运行规则 v0.2 Rule 10：各 track 独立推进，DOMAIN 不等 FULL_COMPARABLE。

---

## 必须读取

1. `docs/product/TEBIQ_CONTEXT_PACK.md §1` — TEBIQ 是什么 / 不是什么
2. `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` — 100 题 A-J 场景定义 + 样本分级
3. `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` — 7 条 OOS 路由专项（已识别高风险）
4. `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` — R01-R05 路由规则（了解已知误判模式）

**数据获取**：`/api/internal/eval-lab/state?reviewer=eval-round1`（返回 100 题题目 + scenario 分类）

---

## 要做什么

### 产出 1 — 100 题在留风险分类矩阵（必须）

对每道题目从 DOMAIN 视角标注：

| 字段 | 说明 |
|------|------|
| `starter_tag` | 题目标识 |
| `scenario` | A-J 场景 |
| `risk_level` | HIGH / MEDIUM / LOW |
| `primary_domain` | 在留资格类型主分类（技人国 / 経管 / 家族 / 身份変更 / 通用…）|
| `trigger_pattern` | 触发本题的核心在留风险信号（关键词/语境）|
| `must_surface` | TEBIQ 必须传达的核心风险点（1-2 条）|
| `must_not_assert` | TEBIQ 不得断言的内容（法律结论 / 不确定事项）|
| `handoff_needed` | 是否需要推进到行政书士/律师咨询（yes/no/conditional）|
| `notes` | DOMAIN 备注（异常、边界案例、需人工确认的点）|

**格式**：输出为 `docs/domain/DOMAIN_100Q_RISK_MATRIX.md` 表格。

### 产出 2 — 在留风险 Pattern 梳理（必须）

从 100 题中提炼高频在留风险 Pattern，按优先级列出：

| Pattern ID | 描述 | 题数 | 优先级 | 与 R01-R05 的关系 |
|-----------|------|------|--------|-----------------|
| P01 | 时间敏感期限（签证到期/通知书/手续期）| N | HIGH | R01 |
| P02 | 身份変更（离婚/换东家/升学）| N | HIGH | R02/R04 |
| P03 | 経営管理（公司清算/放弃/回国）| N | HIGH | R03/R05 |
| P04 | 在留 + 就労不一致 | N | HIGH | R04 |
| P05 | 家族在留连带风险 | N | MEDIUM | — |
| ... | ... | ... | ... | ... |

**格式**：输出为 `docs/domain/DOMAIN_RISK_PATTERNS.md`。

### 产出 3 — Pre-Eval Hypothesis 更新（可选）

在已有 `docs/domain/` 假设包基础上，更新或补充：
- 新识别的 must_have / must_not_have 候选
- 新识别的 handoff_trigger 候选
- 与 R01-R05 路由规则对齐的语义验证

---

## 不能做什么

- **不等 FULL_COMPARABLE 数据**：本任务只需题目文本 + scenario 分类，不需要答案
- **不做正式标注**：正式 Round 1A 标注任务（`EVAL_ROUND1A_DOMAIN_WORK_PACKET.md`）未激活
- **不做最终法律判断**：所有输出默认 `draft / needs human review`
- **不触碰生产 Prompt**：DOMAIN 产出为草稿，不直接推进到 Prompt 修改
- **不裁决路由规则**：R01-R05 由 ENGINE 实现，DOMAIN 只做语义参考

---

## 验收标准

- [ ] `docs/domain/DOMAIN_100Q_RISK_MATRIX.md` 存在，覆盖 ≥80 题（允许部分题 DOMAIN 认为无特殊风险）
- [ ] `docs/domain/DOMAIN_RISK_PATTERNS.md` 存在，P01-P05 以上均有覆盖
- [ ] 每道 HIGH risk 题均有 `must_surface` 和 `must_not_assert` 填写
- [ ] 输出说明：哪些点需要人工确认（admin 行政书士层面）
- [ ] 所有文件头部声明 `draft / needs human review`

---

## 完成后回报格式（回报给 GM）

```
Track E DOMAIN 100Q — 实现报告

产出文件：
  - docs/domain/DOMAIN_100Q_RISK_MATRIX.md（覆盖 N 题）
  - docs/domain/DOMAIN_RISK_PATTERNS.md（N 条 Pattern）
HIGH risk 题数：N
发现的新 must_have 候选：（列举）
发现的新 handoff_trigger 候选：（列举）
需要人工确认的边界案例：（列举）
PR：#XX
```

---

**DOMAIN 所有输出默认 draft / needs GM + 产品负责人 review。**
**不依赖 FULL_COMPARABLE，可立即开工。**
