> **状态：** draft / preview-only / not production
> **版本：** v0.1
> **日期：** 2026-05-05
> **作者：** TEBIQ-VOICE
> **禁止 production 使用：** 是
> **待验收：** DOMAIN + 项目负责人

# Internal Console Copy Map v0.1

本文件定义 `/internal/eval-console` 中所有系统状态的中台语言。  
中台语言面向：CEO / GM / QA / DOMAIN。不得原样暴露给最终用户。

所有条目格式为 YAML block，供 ENGINE 直接消费（GM merge 后）。

---

## 使用规则

- 每个 state 对应一个系统状态
- `console_label`：列表页显示的状态标签（短）
- `console_detail`：详情页展开说明（中等长度）
- `action_available`：该状态下操作按钮说明
- `eval_allowed`：是否允许进入 eval 流程
- `domain_annotation_allowed`：是否允许 DOMAIN 做专业标注
- `answer_quality_eval_allowed`：是否允许进入答案质量评估
- `notes`：VOICE 备注，不进 UI

---

## 状态条目

```yaml
state: answer_returned
console_label: "已返回答案"
console_detail: "TEBIQ 已生成回答，LLM pipeline 正常完成。"
action_available: "查看回答 / 重新运行"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: true
notes: "正常完成状态。可进入 DOMAIN 标注和答案质量评估。"
```

```yaml
state: answer_returned_with_risk_flag
console_label: "已返回答案（风险标记）"
console_detail: "TEBIQ 生成了回答，并触发了风险等级标记（P0 或 P1）。"
action_available: "查看回答 / 查看风险标记 / 重新运行"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: true
notes: "优先进入 DOMAIN 标注。风险等级须由 DOMAIN 复核确认，不以系统自动标记为最终。"
```

```yaml
state: full_comparable
console_label: "FULL_COMPARABLE"
console_detail: "TEBIQ 和参照源均已返回有效输出，可进入对比评估。"
action_available: "进入评估 / 新建批次重跑"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: true
notes: |
  Patch 1 修正：FULL_COMPARABLE 状态允许以新批次或新版本重跑，
  不允许覆盖已有 FULL_COMPARABLE 评估记录。
  重跑必须创建新 batch_id，不得修改已有条目。
```

```yaml
state: not_comparable_tebiq_only
console_label: "不可比较（仅 TEBIQ）"
console_detail: "TEBIQ 有输出，参照源无输出或超时。无法进行并排对比评估。"
action_available: "查看 TEBIQ 单侧回答 / 等待参照源恢复后重跑"
eval_allowed: false
domain_annotation_allowed: true
answer_quality_eval_allowed: false
notes: "TEBIQ 单侧输出可交 DOMAIN 做方向性标注，但不进入答案质量对比评估。"
```

```yaml
state: not_comparable_reference_only
console_label: "不可比较（仅参照源）"
console_detail: "参照源有输出，TEBIQ 无输出或走降级路径。无法进行对比评估。"
action_available: "查看参照源回答 / 调查 TEBIQ 失败原因"
eval_allowed: false
domain_annotation_allowed: false
answer_quality_eval_allowed: false
notes: "优先排查 TEBIQ 失败原因（llm_timeout / routing_failure / out_of_scope）。"
```

```yaml
state: llm_timeout
console_label: "LLM 超时"
console_detail: "主 LLM 未在规定时间内返回响应。已触发降级路径或返回超时提示。"
action_available: "重新运行 / 查看降级记录"
eval_allowed: false
domain_annotation_allowed: false
answer_quality_eval_allowed: false
notes: "不计入有效评估批次。需确认 API 状态后重跑。"
```

```yaml
state: routing_failure
console_label: "路由失败"
console_detail: "TEBIQ 无法将输入匹配到有效路由。未进入答案生成流程。"
action_available: "查看失败原因 / 标记为 routing_regression / 重新运行"
eval_allowed: false
domain_annotation_allowed: true
answer_quality_eval_allowed: false
notes: |
  DOMAIN 可标注路由失败的语义原因（ambiguous_input / missing_context / unsupported_scenario）。
  不把路由失败责任转给用户，用 TEBIQ 视角描述原因。
```

```yaml
state: out_of_scope
console_label: "超出范围"
console_detail: "TEBIQ 判断该问题超出当前支持的在留风险管理范围。"
action_available: "查看 OOS 分类 / 标记为 regression_candidate / 重新运行"
eval_allowed: false
domain_annotation_allowed: true
answer_quality_eval_allowed: false
notes: |
  7 条 OOS 路由回归场景单独追踪，见 docs/domain/OOS_ROUTING_REGRESSION_MAP.md。
  DOMAIN 可复核是否真正 OOS 或属于 bridgeable 场景。
```

```yaml
state: human_review_required
console_label: "需要人工确认"
console_detail: "TEBIQ 判断该问题超出自动判断范围，需要专业人工介入。"
action_available: "查看触发原因 / 标记为 L1 Advisory 或 L2 Mandatory"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: conditional
notes: |
  Patch 4 修正：
  - allowed_for_domain_annotation: yes（DOMAIN 可标注触发合理性）
  - allowed_for_answer_quality_eval: conditional
    条件：如 TEBIQ 在触发前已生成方向性说明，可评估方向说明质量；
    如 TEBIQ 直接触发 human_review 无任何方向性内容，不进入答案质量评估。
  L1（Advisory）和 L2（Mandatory/Strong）分别处理，见 HUMAN_REVIEW_TRIGGER_LIBRARY。
```

```yaml
state: clarification_needed
console_label: "需要澄清"
console_detail: "TEBIQ 判断信息不足，已向用户发出 clarification 请求。"
action_available: "查看 clarification 问题 / 等待用户回复"
eval_allowed: false
domain_annotation_allowed: true
answer_quality_eval_allowed: false
notes: "DOMAIN 可评估 clarification 问题质量（是否问对了、是否超过 2 个问题）。"
```

```yaml
state: p0_candidate
console_label: "P0 候选"
console_detail: "系统自动标记为潜在高优先级场景，待 DOMAIN 复核。"
action_available: "进入 DOMAIN 复核 / 降级为 P1"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: conditional
notes: |
  P0_candidate 是系统推断标记，不是 DOMAIN 确认结论。
  P0 确认须由 DOMAIN 显式标注后才能视为 confirmed P0。
  不得向用户界面暴露"P0"标签。
```

```yaml
state: fallback_triggered
console_label: "已触发降级"
console_detail: "主路径失败，系统走降级输出路径（如缓存回答或简化提示）。"
action_available: "查看降级类型 / 查看主路径失败原因"
eval_allowed: false
domain_annotation_allowed: false
answer_quality_eval_allowed: false
notes: "降级输出不代表 TEBIQ 正常 pipeline 质量，不进入任何评估流程。"
```

```yaml
state: matter_draft_saved
console_label: "事项草稿已保存"
console_detail: "本次问答已触发 Matter 保存流程，事项草稿已写入。"
action_available: "查看 Matter 草稿 / 进入评估"
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: true
notes: "Matter 保存不影响答案评估流程。两者独立推进。"
```

```yaml
state: question_received_processing
console_label: "处理中"
console_detail: "问题已接收，正在处理中。"
action_available: "等待 / 强制刷新"
eval_allowed: false
domain_annotation_allowed: false
answer_quality_eval_allowed: false
notes: "中间过渡状态，不进入任何评估。超时后转为 llm_timeout。"
```

---

## 附：Patch 修正记录

| Patch | 修正内容 |
|-------|---------|
| Patch-1 | `full_comparable` 状态：允许新批次重跑，禁止覆盖已有评估记录 |
| Patch-4 | `human_review_required` 状态：`eval_allowed` 拆分为 `allowed_for_domain_annotation: yes` + `allowed_for_answer_quality_eval: conditional`（有方向性内容可评，无内容不评）|
