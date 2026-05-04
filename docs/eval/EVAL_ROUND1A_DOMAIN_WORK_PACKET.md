# Work Packet

对象：DOMAIN-CC
任务标题：Eval Round 1A — 首批 30 题语义标注
背景：Eval Round 1A 批量生成完成后，产生了一批 FULL_COMPARABLE 样本（DeepSeek raw + TEBIQ 当前输出）。本任务要求 DOMAIN-CC 对这些样本进行语义标注，产出 Round 1A 决策包所需的数据。

产品裁决来源：2026-05-04 产品负责人 Eval Round 1A 阶段任务指令（Issue #15）

---

必须读取：

1. `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` — 30 题结构与类型分类
2. `docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md` — 评分标准（score/severity/action/notes）
3. `docs/product/TEBIQ_CONTEXT_PACK.md §1` — TEBIQ 是什么 / 不是什么
4. `docs/product/TEBIQ_CONTEXT_PACK.md §2` — Eval-driven 策略（当前阶段不盲调 Prompt）

---

要做什么：

**前提**：等 GM 确认以下条件均满足后才开始：
- [ ] 批量生成完成（TEBIQ 通道 30/30 成功）
- [ ] DeepSeek 通道已补跑（至少 24 题成功，即 ≥80% FULL_COMPARABLE）
- [ ] Full export 已确认完整（schema_version, q=100, answers≥48, annotations 字段完整）

**标注步骤**：

1. 打开 Eval Lab UI：`https://tebiq.jp/internal/eval-lab`（需 EVAL_LAB_ENABLED=1 production）
2. 选择 reviewer = `domain-cc-v1`（或产品负责人指定的名称）
3. 按 `EVAL_ROUND1_SAMPLE_PACK.md` 中 30 题顺序依次标注
4. 对每题：
   - 阅读 DeepSeek raw 和 TEBIQ 输出（并排）
   - 填写 score（good/ok/bad）
   - 填写 severity（critical/major/minor）
   - 填写 action（approve/revise/reject）
   - 在 notes 字段记录以下任何观察（1-2 句话）：
     - 是否 TEBIQ worse than DeepSeek（P0 候选）
     - must_have 候选（DeepSeek 有但 TEBIQ 没有的关键信息）
     - must_not_have 候选（任一回答中出现的危险表述）
     - handoff_trigger 候选（需要行政书士 / 入管窗口的场景）
     - fact_card_candidate（高频事实点，可整理为参考卡片）
5. 完成全部标注后通知 GM

---

不能做什么：

- **不在标注中做法律判断**：标注的是 TEBIQ 输出质量，不是签证专业结论
- **不直接触发 Prompt 修改**：发现的 must_have/must_not_have 是候选，待产品负责人裁决后才进 Prompt
- **不跳过 TEBIQ 更差的题**：P0 候选必须明确在 notes 中标注
- **不把 TEBIQ_ONLY_TECH_SAMPLE 题作为正式质量结论**（无 DeepSeek 对比的样本不能评 bad/good）
- 所有 DOMAIN-CC 输出默认 `draft / needs human review`

---

验收标准：

- [ ] 所有 FULL_COMPARABLE 样本（目标 ≥24 题）完成 score/severity/action 标注
- [ ] 所有 score=bad 题目有 notes 说明具体原因
- [ ] P0 候选（score=bad + severity=critical）已明确标记
- [ ] must_have 候选 ≥ 3 条记录在 notes
- [ ] must_not_have 候选 ≥ 2 条记录在 notes
- [ ] handoff_trigger 候选 ≥ 2 条记录在 notes
- [ ] Golden export 完整（可用 `/api/internal/eval-lab/export?type=golden` 验证）

---

完成后回报格式（回报给 GM）：

```
DOMAIN Round 1A 标注完成报告

已标注数量：X / Y（FULL_COMPARABLE）
P0 候选：N 条（题号：...）
P1 候选：N 条
TEBIQ worse than DeepSeek：N 条（题号：...）
must_have 候选：N 条（示例：...）
must_not_have 候选：N 条（示例：...）
handoff_trigger 候选：N 条（示例：...）
fact_card_candidate：N 条
human_review_required 题目：（题号 + 原因）
export 状态：ok / failed
```

---

需要产品负责人裁决的问题（标注中发现时暂记，不直接执行）：

- 任何 must_not_have 候选如果涉及当前已在 Prompt 的内容，需产品负责人裁决是否修改
- 任何 P0 候选的 remediation 路径（是改 Prompt、是加 handoff、还是加 fact card）
- handoff_trigger 阈值：哪些题型"始终应该 handoff" vs "视情况 handoff"

---

**DOMAIN-CC 所有输出默认 `draft / needs human review`。**
**语义结论归产品负责人裁决，不归 GM 裁决。**

> 文件状态：等待批量生成完成后激活，未激活前不发给 DOMAIN。
