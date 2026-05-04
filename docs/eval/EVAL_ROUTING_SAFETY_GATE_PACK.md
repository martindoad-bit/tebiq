# Engineering Work Packet — Routing Safety Gate v1

对象：ENGINE
任务标题：Routing Safety Gate v1 — 7 条高风险路由回归修复
背景：Technical Dry Run 发现 7 条高风险题被 TEBIQ 路由为 `out_of_scope`，其中多条属于 TEBIQ 核心覆盖场景（紧急在留期限、配偶离婚身份变化、公司清算回国风险、在留+工作不一致）。这些题在正式 Round 1A 重跑中不得再出现路由失败。
产品裁决来源：2026-05-05 产品负责人 Eval Round 1A Recovery 阶段任务指令

---

## 必须读取

1. `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` — 7 条 OOS 题目详情 + 路由初判
2. `docs/product/TEBIQ_CONTEXT_PACK.md §1` — TEBIQ 是什么 / 不是什么
3. `docs/product/TEBIQ_QA_GATES.md` — 现有 QA Gate 定义（避免冲突）

---

## 背景：7 条路由失败样本

| # | starter_tag | 题目 | 当前状态 | 风险级别 |
|---|-------------|------|---------|---------|
| 1 | eval-lab-v1-J04 | 我被公司解雇了，在留怎么办？ | out_of_scope | HIGH |
| 2 | eval-lab-v1-J08 | 我的在留资格和现在实际工作不一致怎么办？ | out_of_scope | HIGH |
| 3 | eval-lab-v1-J03 | 我签证快到期了，但材料还没准备好怎么办？ | out_of_scope | HIGH |
| 4 | eval-lab-v1-I08 | 公司还没清算，我可以直接回国吗？ | out_of_scope | HIGH |
| 5 | eval-lab-v1-D05 | 日本人配偶签离婚后还能留在日本吗？ | out_of_scope | MEDIUM |
| 6 | eval-lab-v1-D06 | 配偶签离婚后多久要处理在留问题？ | out_of_scope | MEDIUM |
| 7 | eval-lab-v1-D09 | 家人的在留资格跟我有关，我换签证会影响他们吗？ | out_of_scope | MEDIUM |

---

## 要做什么：5 条路由规则（R01–R05）

### R01 — 时间敏感在留问题不得路由为 out_of_scope

**目标题**：J03（签证快到期）、F01/F02/F08（材料/通知书期限类）

**判定条件**：
- 包含时间敏感信号：「签证快到期」「到期」「期限」「赶不上」「过了」「通知书」「补材料」
- 且包含在留主题信号

**期望行为**：
- `status` 不得为 `out_of_scope`
- 应路由为 `clarification_needed`（需要了解具体在留类型）或 `preliminary`
- 若无法判断具体类型，`clarification_needed` 是正确兜底

---

### R02 — 配偶者离婚后在留问题桥接为身份变更场景

**目标题**：D05（配偶签离婚后留日）、D06（离婚后多久处理在留）、A09（配偶签离婚后转定住）

**判定条件**：
- 包含「配偶签」或「日本人配偶」
- 包含「离婚」

**期望行为**：
- 识别为家族/身份变更路径（domain: kazoku 或 mibun-henko）
- `status` 应为 `clarification_needed` 或 `preliminary`，不得为 `out_of_scope`
- clarification 方向：确认当前在留状況 + 离婚时间点

---

### R03 — 公司/清算/経営语境推断経管 domain

**目标题**：I08（公司没清算直接回国）、B07（经管签放弃回国）

**判定条件**：
- 包含「公司」「清算」「法人」「経営」「回国」中至少两项
- 且不包含明显非在留信号

**期望行为**：
- domain 推断为 `keiei-kanri`
- `status` 不得为 `out_of_scope`
- 对「能不能直接回国」类问题应传达风险（未清算/未注销直接离境有在留后果）

---

### R04 — 在留+工作不一致或解雇场景推断技人国或 clarification_needed

**目标题**：J04（被公司解雇）、J08（在留资格和工作不一致）

**判定条件**：
- 「解雇」「失业」「工作与在留不一致」「活動と違う」
- 或「在留资格」+「现在的工作」

**期望行为**：
- J04（解雇）：应路由为 `clarification_needed`（需确认在留类型、离职日期、下一步打算）
- J08（不一致）：应路由为 `clarification_needed` 或 `preliminary`
- 不得 `out_of_scope`

---

### R05 — 离境/回国问题识别在留连带风险

**目标题**：I08（清算回国）、B07（放弃经管回国）

**判定条件**：
- 「回国」「離日」「出境」「帰国」
- 且包含在留/公司/签证相关语境

**期望行为**：
- 识别为有在留连带风险的场景，不得直接出 `out_of_scope`
- 至少路由为 `clarification_needed` 以确认情况，或 `preliminary` 并提示风险

---

## 验收标准

**回归测试集**：以下 7 个 `starter_tag` 对应题目，通过 TEBIQ 通道后均不得返回 `out_of_scope`：

```
eval-lab-v1-J04
eval-lab-v1-J08
eval-lab-v1-J03
eval-lab-v1-I08
eval-lab-v1-D05
eval-lab-v1-D06
eval-lab-v1-D09
```

具体检查项：
- [ ] 7/7 TEBIQ status ≠ `out_of_scope`
- [ ] 7/7 fallback_reason ≠ `out_of_scope`
- [ ] J03/J04/J08/I08（4 条 HIGH 风险）：status = `clarification_needed` 或 `preliminary`
- [ ] D05/D06（离婚类）：domain 推断为家族/身份变更相关
- [ ] 不引入新的 regression（其他已通过的题目不因此改变为 out_of_scope 或 bad status）

---

## 不能做什么

- **不修改产品定位**：不扩大 TEBIQ scope，只修正路由误判
- **不修改用户可见的 Prompt 结构**：只改 scope 判断逻辑
- **不盲改 30 题全部**：只修复 7 条已知失败题
- **不触发 QA Gates 变更**：路由修复完成后交 QA 复测

---

## 完成后回报格式（回报给 GM）

```
Routing Safety Gate v1 — 实现报告

已实现规则：R01 / R02 / R03 / R04 / R05（哪条实现了，哪条未实现）
回归测试结果：X/7 pass
  - J04: pass/fail (status=...)
  - J08: pass/fail (status=...)
  - J03: pass/fail (status=...)
  - I08: pass/fail (status=...)
  - D05: pass/fail (status=...)
  - D06: pass/fail (status=...)
  - D09: pass/fail (status=...)
新 regression 引入：none / （具体说明）
PR: #XX
```

---

## 需要产品负责人裁决的问题

- R02（配偶离婚 → 定住者/身份変更）的 domain label 命名：`kazoku` / `mibun-henko` / 其他？
- 若 7 条中有 1-2 条在修复后 domain/QA 专家认为确实超出 TEBIQ scope，裁决路径为何？

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
**不得在回归测试未 pass 前 merge routing 代码。**
