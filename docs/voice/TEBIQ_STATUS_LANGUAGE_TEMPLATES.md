---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Status Language Templates

> 本文件定义系统管线所有状态的语言模板。
>
> 每个状态提供：`state_code`、`internal_label`（工程/QA 可见）、`user_copy`（用户可见中文）、`tooltip`（QA/内部注释）、`severity_hint`、`forbidden_substitutions`。
>
> 所有 `user_copy` 均为 B 层（待验证），未经 DOMAIN-CC 标注 + 产品负责人裁决前不得升为 A 层。

---

## 使用规则

- `user_copy` 是**用户界面渲染的文字**，不允许包含任何内部字段名、状态码、枚举值
- `internal_label` 只出现在 `/internal/eval-console` 和工程日志，不出现在任何用户可见界面
- `tooltip` 仅用于 QA 和工程确认，不对用户渲染
- `severity_hint` 影响 UI 颜色/权重，不直接呈现为文字
- 如果实际状态没有在本文件中定义，必须先在本文件登记，不允许在代码中直接硬编码未登记的用户文案

---

## 状态模板

---

### STATE: received

```yaml
state_code: received
internal_label: RECEIVED
user_copy: "已收到你的问题。"
tooltip: |
  问题已进入管线队列，尚未开始任何路由或处理。
  通常持续时间极短（<500ms）。如用户长时间看到这个状态，说明管线卡在入口。
severity_hint: none
forbidden_substitutions:
  - "我们已经收到了你的问题" — 主语不必要
  - "问题已提交成功" — 软件提交感，不符合 TEBIQ voice
  - "正在处理中，请稍候" — 过早跳到 routing 语义，不准确
```

---

### STATE: routing

```yaml
state_code: routing
internal_label: ROUTING
user_copy: "正在确认这个问题属于哪类在留事项。"
tooltip: |
  管线正在执行分类路由：判断 domain、intent、是否属于跨领域问题、是否命中 cross_domain_gate。
  用户不需要知道"路由"这个词，文案描述的是对用户有意义的操作：确认问题类型。
severity_hint: none
forbidden_substitutions:
  - "正在路由" — 暴露内部术语
  - "正在分析你的问题" — AI 产品腔
  - "AI 正在理解你的意图" — 严重违反禁止模式
  - "稍等，AI 在努力工作" — 拟人腔
```

---

### STATE: risk_check

```yaml
state_code: risk_check
internal_label: RISK_CHECK
user_copy: "正在检查是否涉及期限、身份变化或工作资格风险。"
tooltip: |
  管线在执行在留风险维度检查：包括 deadline proximity、status change detection、employment eligibility flags。
  文案列出的三个维度（期限、身份变化、工作资格）是当前检查器覆盖的主要风险维度，如检查器范围变化，文案需同步更新。
  此状态文案可以让用户感受到 TEBIQ 在做什么——比 routing 更有实质感，但不能说"我发现了风险"。
severity_hint: none
forbidden_substitutions:
  - "正在识别风险" — 过于宽泛，且"识别"是 AI 功能描述腔
  - "AI 正在为你排查隐患" — AI 营销腔 + 拟人
  - "检测到可能的风险" — 在状态阶段不能预告结论
  - "正在分析签证风险" — "签证"一词不准确，TEBIQ 处理的是在留资格
```

---

### STATE: generating

```yaml
state_code: generating
internal_label: GENERATING
user_copy: "正在生成回答。"
tooltip: |
  DeepSeek（或 fallback 管线）正在生成回答正文。
  文案保持极简，不暗示内容，不暗示来源，不暗示速度。
  如需要更长的等待提示（如超过 10s），可在 UI 层加二次提示，但文案仍应简单，不走营销腔。
severity_hint: none
forbidden_substitutions:
  - "AI 正在思考" — 拟人腔
  - "DeepSeek 正在处理" — 暴露底层模型
  - "正在为你生成专属回答" — 营销腔
  - "请稍候，马上就好" — 口语化，不符合 TEBIQ voice
  - "正在生成 AI 分析结果" — 暴露系统性质
```

---

### STATE: clarification_needed

```yaml
state_code: clarification_needed
internal_label: CLARIFICATION_NEEDED
user_copy: "需要再确认一个信息，才能继续处理这件事。"
tooltip: |
  管线判断当前可用信息不足，无法可靠地完成路由或风险检查，进入 clarification 分支。
  用户文案保持中性，不暗示"你填错了"或"你遗漏了什么"，而是说"需要补一个信息"。
  具体的 clarification 问题由 TEBIQ_CLARIFICATION_LIBRARY.md 中的模板生成，本状态只是入口提示。
severity_hint: low
forbidden_substitutions:
  - "信息不完整，请补充" — 指责感
  - "你没有提供足够信息" — 指责感
  - "无法处理，请重新提问" — 令用户感到被拒绝
  - "需要更多信息才能分析" — AI 分析腔
```

---

### STATE: human_review_required

```yaml
state_code: human_review_required
internal_label: HUMAN_REVIEW_REQUIRED
user_copy: "这个问题涉及的情况比较复杂，建议找{{specialist}}确认，不适合只依赖这里的参考。"
specialist_default: 行政書士
specialist_override:
  by: DOMAIN
  options: [入管専門弁護士, 税理士, 社労士, 司法書士, 相关专业人士]
  rule: VOICE 不自行决定专业人士类型；默认使用行政書士；特定场景由 DOMAIN 在 DR 中指定
tooltip: |
  handoff_trigger 命中，管线判断此问题超出 AI 参考边界，需要专业人工确认。
  触发条件包括：补材料期限类问题、不许可通知书回应、配偶离婚后资格变更、公司清算时的在留处理。
  用户文案不说"我们转给了专业人士"（TEBIQ 目前没有这个能力），而是明确建议用户自己找专业人士。
  不允许在这个状态说"TEBIQ 已经帮你处理"或"专家正在审核"——那是 L4/L5 的能力，当前未实现。
severity_hint: high
eval_allowed:
  allowed_for_domain_annotation: yes
  allowed_for_answer_quality_eval: conditional
  answer_quality_eval_condition: |
    仅当 DOMAIN 已对该题做语义复核且确认 human_review 是合理路由时，才纳入正式 Answer Quality Eval。
    未经 DOMAIN 复核的 human_review_required 题目，不得混入 FULL_COMPARABLE 计数。
forbidden_substitutions:
  - "已转给专家处理" — 不实，当前没有这个能力
  - "人工客服正在审核" — 不实
  - "我们无法回答这个问题" — 令用户感到被拒绝，且不准确
  - "这超出了 AI 的能力范围" — 暴露底层是 AI
  - "立即预约专家" — 导流腔，严格禁止
```

---

### STATE: fallback (llm_timeout)

```yaml
state_code: fallback
internal_label: LLM_TIMEOUT_FALLBACK
user_copy: "当前模型响应不完整，这条回答不能作为正式判断。"
tooltip: |
  主模型（DeepSeek）超时或返回不完整内容，管线降级到 fallback 分支（可能是 legacy_seed 或截断输出）。
  用户文案必须明确：(1) 这条回答是降级产出，(2) 不能用于正式判断。
  不能让用户以为这是正常质量的回答。这是一个诚实边界。
  fallback_reason 字段不得暴露给用户；"不完整"是对用户有意义的描述，不是技术原因。
severity_hint: medium
save_matter: conditional
save_matter_rules:
  - condition: routing_completed == true AND risk_check_completed == true AND identified_matters.length > 0
    action: 允许保存为"待确认事项"（不是"已处理事项"）
    save_label: "待确认事项（回答未完成）"
  - condition: routing_completed == false OR risk_check_completed == false
    action: 不允许保存
    reason: routing/risk_check 未完成意味着 TEBIQ 尚未识别出有效事项，保存无意义
forbidden_substitutions:
  - "回答生成遇到了一点问题" — 轻描淡写，不诚实
  - "当前回答可能不够完整" — "可能"过于模糊，用户不知道风险
  - "模型超时，请重试" — 暴露技术信息
  - "fallback 模式已激活" — 暴露内部状态
  - "AI 遇到了错误" — 拟人 + 技术腔混合
```

---

### STATE: provider_timeout

```yaml
state_code: provider_timeout
internal_label: PROVIDER_TIMEOUT
user_copy: "当前模型响应超时，不是你的输入问题。你可以稍后重试；如果已识别出相关事项，也可以先保存继续处理。"
tooltip: |
  API provider（DeepSeek 或其他）整体超时，非模型内容问题，是网络/服务可用性问题。
  与 fallback 的区别：fallback 有部分输出但质量降级；provider_timeout 是完全没有输出。
  文案明确说明不是用户输入导致的问题，避免用户以为自己提问有误。
  "保存继续处理"为 conditional：仅当 routing 和 risk_check 已完成（有已识别事项）时启用；
  若 routing 未完成，仅显示"稍后重试"选项。
save_matter: conditional
save_matter_condition: routing_completed == true AND identified_matters.length > 0
severity_hint: medium
forbidden_substitutions:
  - "网络错误，请检查你的网络" — 错误归因（可能是服务器问题，不是用户网络）
  - "DeepSeek 服务不可用" — 暴露底层模型
  - "请联系客服" — TEBIQ 当前无即时客服
  - "服务维护中" — 未经确认不能说维护
  - "服务器繁忙" — 未经确认不能说繁忙
```

---

### STATE: error

```yaml
state_code: error
internal_label: ANSWER_GENERATION_ERROR
user_copy: "当前回答生成失败，可以稍后重试，或先保存事项继续处理。"
tooltip: |
  管线在生成阶段遇到未预期错误（非超时，非 fallback）。可能是程序错误、输入解析失败、sidecar 生成异常等。
  文案与 provider_timeout 接近，但语义上是"失败"而不是"超时"。
  错误代码、堆栈信息、内部异常类型不得展示给用户。
  两个选项（重试 / 保存）同样须确认 UI 有对应入口。
severity_hint: medium
forbidden_substitutions:
  - "发生了未知错误" — 技术腔，对用户无帮助
  - "Error 500" — 技术错误码不对用户暴露
  - "系统异常，请联系管理员" — 当前没有客服/管理员入口
  - "AI 出了点问题" — 拟人腔
  - "糟糕，出错了！" — 轻浮语气
```

---

### STATE: final_answer

```yaml
state_code: final_answer
internal_label: FINAL_ANSWER
user_copy: "以上是参考信息，不是法律意见，也不是个案审查结论。"
tooltip: |
  管线完成全部生成，输出已呈现给用户。此状态消息附加在回答末尾，作为边界声明。
  注意：这不是免责声明，是边界说明。写法上直接告知事实，不用"仅供参考"这类官腔。
  如 handoff_trigger 命中，这条文案需与 human_review_required 一并出现，不能独立替代 handoff 提示。
severity_hint: none
forbidden_substitutions:
  - "以上仅供参考，不构成法律意见" — 法务声明腔，不符合 TEBIQ voice
  - "本内容由 AI 生成" — 暴露底层
  - "如有问题请咨询专业人士" — 过于套话，不如直接说"找行政书士确认"
  - "TEBIQ 不对任何损失负责" — 免责声明体，不适合用户端
```

---

### STATE: out_of_scope_correct

```yaml
state_code: out_of_scope_correct
internal_label: TEBIQ_OOS
user_copy: "这个问题不在 TEBIQ 当前处理范围内。如果是在留资格相关的事，可以换一种方式再问。"
tooltip: |
  管线正确判断此问题超出 TEBIQ 处理范围（非在留类问题）。这是一个正确行为，不是失败。
  文案要让用户明白：(1) 为什么无法处理，(2) 如果真的是在留相关，怎么调整。
  不能让用户感到被驱逐，但也不能假装 TEBIQ 可以处理任何问题。
  "当前处理范围"措辞保留了未来扩展的空间，比"TEBIQ 无法处理"更准确。
severity_hint: none
forbidden_substitutions:
  - "这不是 TEBIQ 能回答的问题" — 拒绝感过强
  - "out_of_scope" — 内部字段名不对用户暴露
  - "请使用其他工具" — 含义模糊，且有推卸感
  - "这超出了 AI 的能力范围" — 暴露底层是 AI
```

---

### STATE: routing_failure

```yaml
state_code: routing_failure
internal_label: TEBIQ_ROUTING_FAILURE
user_copy: "这个问题的处理方向出现了判断偏差，当前回答不完整。建议稍后重试，或先保存事项。"
tooltip: |
  已知回归缺陷：路由模块对特定问题类型的分类出错，导致后续管线走错分支，输出不可用。
  这是 P0/P1 回归 case，不应该大量出现在生产环境。出现时必须记录到 Eval Lab 回归集。
  用户文案不说"路由失败"，也不说"系统错误"，而是说"判断偏差"——这是对用户有意义的表达。
  ★ 此状态是回归集标记状态（见 TEBIQ_INTERNAL_CONSOLE_LABEL_SYSTEM.md），内部需★标注。
severity_hint: high
forbidden_substitutions:
  - "路由失败" — 暴露内部术语
  - "TEBIQ_ROUTING_FAILURE" — 暴露内部状态码
  - "系统错误，请联系开发团队" — 用户不应该看到这个
  - "AI 走错了方向" — 拟人腔
  - "无法处理" — 过于简短，缺乏指引
```

---

## 状态文案更新规则

1. 新增状态必须先在本文件登记，包含所有字段，再实现 UI
2. 修改 `user_copy` 需 GM 确认，高风险状态（high/critical severity）需 DOMAIN 复核
3. 修改 `forbidden_substitutions` 须有真实触发案例
4. `internal_label` 和 `tooltip` 由 ENGINE 维护，不需要 VOICE 审批
5. 所有 `user_copy` 均为 B 层，升为 A 层须有 Eval Lab 标注 + 产品负责人裁决
