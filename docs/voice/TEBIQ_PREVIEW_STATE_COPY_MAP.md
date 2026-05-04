---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Preview State Copy Map

> 本文件是 `/internal/preview` 阶段反馈的主文案参考，供 ENGINE Workstream B 集成使用。
> 本文件为 B 层（待验证），未经 Project Lead 裁决不得视为已冻结。
>
> 此文件中的文案仅供内部预览使用，任何内容均不得直接作为正式产品文案上线。

---

## 1. State Transitions（状态转换文案）

各状态定义用户界面在每个管线节点的展示内容。

---

### `received`

| 字段 | 内容 |
|------|------|
| `state_code` | `received` |
| `headline` | 已收到你的问题 / Question received |
| `subtext` | — |
| `progress_indicator` | 步骤 1/5（或进度条 5%）|
| `auto_advance` | yes，delay_ms: 300 |
| `user_action_available` | none |

---

### `routing`

| 字段 | 内容 |
|------|------|
| `state_code` | `routing` |
| `headline` | 正在判断问题类型 / Identifying question type |
| `subtext` | — |
| `progress_indicator` | 步骤 2/5（或进度条 20%）|
| `auto_advance` | yes，delay_ms: 0（完成即推进）|
| `user_action_available` | none |

---

### `risk_check`

| 字段 | 内容 |
|------|------|
| `state_code` | `risk_check` |
| `headline` | 正在核对在留风险点 / Checking residency risk signals |
| `subtext` | — |
| `progress_indicator` | 步骤 3/5（或进度条 45%）|
| `auto_advance` | yes，delay_ms: 0（完成即推进）|
| `user_action_available` | none |

---

### `generating`

| 字段 | 内容 |
|------|------|
| `state_code` | `generating` |
| `headline` | 正在生成回答 / Generating answer |
| `subtext` | 通常需要 10–30 秒 / Usually takes 10–30 seconds |
| `progress_indicator` | 步骤 4/5（或进度条 65%，动态 loading）|
| `auto_advance` | yes，delay_ms: 0（完成即推进）|
| `user_action_available` | none |

---

### `clarification_needed`

| 字段 | 内容 |
|------|------|
| `state_code` | `clarification_needed` |
| `headline` | 需要多一点信息 / A bit more information needed |
| `subtext` | 不同在留状况，处理方式有差别 / Processing varies depending on your residency status |
| `progress_indicator` | 步骤 3/5（暂停，等待用户输入）|
| `auto_advance` | no |
| `user_action_available` | proceed（回答澄清问题后继续）|

---

### `human_review_required`

| 字段 | 内容 |
|------|------|
| `state_code` | `human_review_required` |
| `headline` | 这个情况建议找专业人士确认 / This situation calls for professional review |
| `subtext` | 以下内容供参考，不是最终判断 / The following is for reference only, not a final determination |
| `progress_indicator` | 步骤 5/5（完成，但升级路径）|
| `auto_advance` | no |
| `user_action_available` | contact（联系行政書士 / 专业窗口）|

---

### `fallback`

| 字段 | 内容 |
|------|------|
| `state_code` | `fallback` |
| `headline` | 当前模型响应不完整，这条回答不能作为正式判断 / Model response incomplete — not for formal use |
| `subtext` | 建议稍后重试获取完整回答 |
| `progress_indicator` | 步骤 5/5（完成，带「降级回答」标识）|
| `auto_advance` | no |
| `user_action_available` | retry / save_matter（conditional：routing + risk_check 完成且有已识别事项时，可保存为"待确认事项"）|
| `fallback_banner_required` | yes — 显示「⚠️ 降级回答 · 不能作为正式判断」标识，不得省略 |

---

### `provider_timeout`

| 字段 | 内容 |
|------|------|
| `state_code` | `provider_timeout` |
| `headline` | 当前模型响应超时，不是你的输入问题 / Model response timed out — not caused by your input |
| `subtext` | 你可以稍后重试；如果已识别出相关事项，也可以先保存继续处理 |
| `progress_indicator` | 进度中断（超时标识）|
| `auto_advance` | no |
| `user_action_available` | retry（默认）/ save_matter（conditional：仅当 routing + risk_check 已完成时显示）|

---

### `error`

| 字段 | 内容 |
|------|------|
| `state_code` | `error` |
| `headline` | 出现了一个问题 / Something went wrong |
| `subtext` | 请重试，或换一种方式描述问题 / Please retry, or rephrase your question |
| `progress_indicator` | 进度中断（错误标识）|
| `auto_advance` | no |
| `user_action_available` | retry |

---

### `final_answer`

| 字段 | 内容 |
|------|------|
| `state_code` | `final_answer` |
| `headline` | — （不显示单独的 headline，直接展示回答内容）|
| `subtext` | — |
| `progress_indicator` | 步骤 5/5（完成）|
| `auto_advance` | no |
| `user_action_available` | proceed（保存事项 / 继续）|

---

## 2. Preview Page Frame（预览页面框架文案）

| 元素 | 文案 |
|------|------|
| `page_header` | 内部预览 / Internal Preview |
| `disclaimer` | 以下内容为 TEBIQ 管线预览输出，仅供内部评估使用。不构成正式法律意见，不代表最终产品形态，不得对外展示或引用。 / The following is TEBIQ pipeline preview output for internal evaluation only. It does not constitute formal legal advice, does not represent the final product, and must not be shared externally or cited. |
| `scenario_list_heading` | 选择测试场景 / Select Test Scenario |
| `free_input_placeholder` | 输入你想测试的在留问题… / Enter the residency question you want to test… |
| `submit_button_label` | 运行预览 / Run Preview |
| `loading_indicator_text` | 处理中，请稍候 / Processing, please wait |

---

## 3. Fallback Display Rules（Fallback 展示规则）

### Fallback banner text

> 参考信息 / General Reference — 以下回答基于通用在留知识，未针对你的具体情况生成。实际情况以入管官方渠道为准。

### 展示规则

| 规则 | 说明 |
|------|------|
| 必须显示 fallback banner | 任何 fallback 状态的回答，banner 必须在回答内容上方显示，不可隐藏或折叠 |
| 不显示 fallback_reason 字段 | `fallback_reason` 为内部字段，永不对用户展示 |
| 不显示 provider 来源 | 不显示"DeepSeek 裸答"、"通用模型输出"等标注 |
| 不显示内部状态代码 | `fallback`、`provider_timeout`、`no_source_matched` 等状态代码不对用户展示 |
| fallback 回答必须带边界声明 | 回答末尾必须附加：以上为参考信息，不是个案审查结论。 |

### fallback 答案必须带的标签

在回答内容区域显示（非 banner，而是嵌入内容的标注）：

> 参考信息 / General Reference

---

## 4. Final Answer Display（最终回答展示规则）

### 回答归属表达

- 回答页面的输出以 TEBIQ 输出呈现，不标注底层模型
- 不出现"DeepSeek"、"AI"、"GPT"、"Claude"等字样
- 不出现"AI 为您分析"、"智能生成"等表述
- 正确表达方向：直接展示内容，不贴来源标签

### 预览免责声明（必须伴随任何 final_answer 展示）

> 以下内容为 TEBIQ 内部预览输出，仅供评估参考。
> 不构成正式法律意见，不代表个案审查结论。
> 涉及具体手续、期限、材料，以入国管理局官方渠道为准。
>
> This is TEBIQ internal preview output for evaluation purposes only.
> It does not constitute formal legal advice or an individual case assessment.
> For specific procedures, deadlines, and documents, refer to official immigration authority channels.

### 展示时机

- 此免责声明在预览环境中必须始终可见，不得因滚动而消失（sticky 或置顶展示）
- 生产环境中的免责声明形态由 Project Lead 单独裁决，不以此文件为准
