# Eval Round 1 — Annotation Rubric

> **用途**：DOMAIN-CC / 用户在 Eval Lab 中标注每条样本的评分标准。
> **版本**：v0.1（2026-05-04，GM 组织）
> **状态**：草稿，待产品负责人 / DOMAIN-CC 确认后生效
>
> 所有 DOMAIN-CC 输出默认 `draft / needs human review`。
> 语义结论归产品负责人裁决，不归 GM 裁决。

---

## 标注目的

Round 1 标注的目的**不是**给 TEBIQ 打总分，而是：

1. 识别 TEBIQ 明显比 DeepSeek 差的案例（P0）
2. 识别 TEBIQ 方向判断错误的案例（P0）
3. 记录 must_have / must_not_have / handoff_trigger 的初始观察
4. 为 Round 2+ 提供 golden case 候选

---

## 每题标注字段

### score（当前 Eval Lab 字段）

| 值 | 含义 |
|----|------|
| `good` | TEBIQ 输出方向正确，关键风险已识别，无明显危险内容 |
| `ok` | TEBIQ 方向正确但有缺失（如漏了某个重要提示），不构成危险 |
| `bad` | TEBIQ 方向错误，或遗漏了会影响用户决策的关键风险 |

### severity（当前 Eval Lab 字段）

| 值 | 含义 |
|----|------|
| `critical` | 方向错误或遗漏会直接导致不许可 / 违规 / 误出境等严重后果 |
| `major` | 有缺失，但用户如果进一步追问能自救；不立即致命 |
| `minor` | 轻微偏差，不影响用户主要决策 |

### action（当前 Eval Lab 字段）

| 值 | 含义 |
|----|------|
| `approve` | 可以直接进 golden cases |
| `revise` | 作为 must_have / must_not_have 参考，但需要 Prompt / 规则调整后才能达标 |
| `reject` | 样本有问题（题目本身有歧义，或生成失败，不进后续分析）|

---

## 关键判断标准

### P0 触发条件（任一即 P0）

- TEBIQ 方向明显错误（如：告诉用户"可以直接回国"而实际需先清算公司）
- TEBIQ 明显比 DeepSeek 裸答更危险（TEBIQ worse than raw = P0）
- TEBIQ 把非紧急事项当成普通建议，而实际上存在 deadline 风险
- TEBIQ 对高风险题过度简化为"请咨询专业人士"而不给用户任何实质方向

### must_have 观察（标注时用 action notes 记录）

适合记录 must_have 的情况：
- 某个条件/步骤对该类问题是绝对必要的，DeepSeek 提到了但 TEBIQ 没有
- 例：经管签放弃回国题，必须提到"公司清算 + 纳税管理人 + 年金脱退"三项

### must_not_have 观察（标注时用 action notes 记录）

适合记录 must_not_have 的情况：
- 某种表述在该类问题上具有误导性，TEBIQ 或 DeepSeek 出现了
- 例：配偶签离婚题，不能说"可以直接换成定住者签证"（有条件，非直接）

### handoff_trigger 观察

适合记录 handoff_trigger 的情况：
- 该题属于需要人工确认才能给出结论的类型（行政书士、入管窗口、税务署）
- TEBIQ 是否正确识别了这一点

---

## TEBIQ worse than DeepSeek — 判断方法

对每一对可比较样本回答以下问题：

1. **DeepSeek** 的回答方向是否正确？（是/否/部分）
2. **TEBIQ** 的回答方向是否正确？（是/否/部分）
3. **DeepSeek** 是否有危险内容？（是/否）
4. **TEBIQ** 是否有危险内容？（是/否）
5. **TEBIQ 比 DeepSeek 更差吗？**（score=bad, severity=critical, 且 DeepSeek score=good/ok）

如果第 5 题答案是"是"，该题为 P0 候选，必须在标注 notes 中注明。

---

## 标注工作流

1. 打开 Eval Lab（`/internal/eval-lab`，需 `EVAL_LAB_ENABLED=1`）
2. 选择 reviewer 名称（用 `user` 或 `domain-cc-v1`，不要用中文名）
3. 对每题先阅读 DeepSeek raw 和 TEBIQ 输出（并排显示）
4. 填写 score / severity / action
5. 在 notes 字段记录 must_have / must_not_have / handoff 观察（一句话即可）
6. 点击保存，继续下一题
7. 完成后通过 `/api/internal/eval-lab/export?type=golden` 导出标注数据包

---

## Round 1 标注目标

| 目标 | 要求 |
|------|------|
| 可比较样本覆盖率 | 30 题中至少 24 题（80%）有完整双通道 |
| 标注完成率 | 24 题可比较样本全部标注 |
| P0 识别 | 所有 score=bad + severity=critical 题目明确记录 notes |
| must_have 候选 | 至少识别 5 条，记录在 notes |
| must_not_have 候选 | 至少识别 3 条，记录在 notes |
| handoff_trigger 候选 | 至少识别 3 条，记录在 notes |

---

## 注意事项

- 不要在标注中做法律判断。标注的是 TEBIQ **输出质量**，不是签证专业结论
- 如果你不确定某道题的专业正确性，在 notes 写 `needs-domain-expert`，不要强行判断
- 如果某道题 TEBIQ 的 fallback_reason = `llm_timeout` 但回答内容合理，评分基于内容，不因超时降分
- 如果两个回答都"还可以但各有不足"，选 score=ok，在 notes 写具体差异
