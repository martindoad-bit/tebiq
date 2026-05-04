> **状态：** draft / preview-only / not production
> **版本：** v0.1
> **日期：** 2026-05-05
> **作者：** TEBIQ-VOICE
> **禁止 production 使用：** 是
> **待验收：** DOMAIN + 项目负责人

# Preview State Copy Map v0.1

本文件定义 `/internal/preview` 阶段用于内部测试反馈的用户端文案。  
面向：CEO / GM 在内部预览时看到的界面文字。

不是最终用户文案。不得在 production 或 public beta 中使用。

---

## 使用规则

- `state`：系统状态标识符
- `user_facing_copy`：用户端显示的实际文字
- `tone_note`：VOICE 对语气的说明（不进 UI）
- `forbidden`：该状态下禁止出现的表达（不进 UI）

---

## 状态条目

| state | user_facing_copy | tone_note | forbidden |
|-------|-----------------|-----------|-----------|
| `question_received` | 正在处理你的问题… | 中性，无额外承诺 | "马上就好""一秒钟" |
| `answer_returned` | （直接展示回答内容）| 回答本身决定语气，无前置说明文字 | "AI 为你分析了""智能识别到" |
| `answer_returned_with_risk_flag` | 这个问题有一些需要先确认的条件，处理方式可能因具体情况不同。| 引导注意，不恐吓 | "情况很严重""危险""重大风险" |
| `human_review_required_advisory` | 这类情况 TEBIQ 可以提供方向，但建议同时由专业人士确认具体适用性。| 说明原因，不推销 | "立即预约""专家帮你搞定""不用担心" |
| `human_review_required_mandatory` | 这类情况超出 TEBIQ 自动判断范围，建议直接由专业人士处理，不建议仅凭自动回答决定。| 清楚传达必要性，无推销语气 | "立即联系""一键预约""守护你的在留" |
| `clarification_needed` | TEBIQ 需要先确认一个情况，才能判断下一步。（+ 具体问题）| 单刀直入，不铺垫 | "为了更好地帮助你""能否请你告诉我" |
| `out_of_scope` | 这个问题目前超出 TEBIQ 的判断范围。（+ 具体说明或引导）| 简洁，给出方向 | "请换一种方式描述""TEBIQ 暂时无法回答" |
| `routing_failure` | TEBIQ 需要先确认你的情况，再判断下一步。可以告诉我你目前的在留资格类别吗？| 把缺口定义为 TEBIQ 需要的信息，不推给用户 | "请换一种问法""你的问题不够清楚" |
| `provider_timeout` | 当前模型响应超时，不是你的输入问题。可以稍后重试。| 中性说明，不道歉，不推卸 | "服务器繁忙请稍候""非常抱歉""系统开小差了" |
| `matter_save_fallback` | （条件性显示，见下方说明）| — | — |

---

## `matter_save_fallback` 条件说明

**Patch 3 修正：**

`matter_save_fallback` 不是固定文案，是条件性逻辑：

| 条件 | 处理 |
|------|------|
| routing / risk_check 已完成 + 有效 matter 已识别 | 可保存 Matter 草稿，展示保存确认文字："已保存到你的事项记录，可随时查看。" |
| routing 未完成（routing_failure / out_of_scope）| 不触发 matter 保存，不展示任何保存文字 |
| llm_timeout 降级路径 | 不触发 matter 保存，不展示任何保存文字 |
| 用户取消或无有效在留风险识别 | 不触发 matter 保存 |

Matter 保存确认文案（仅在满足条件时显示）：
> 已保存到你的事项记录，可随时查看。

禁止出现：
- "你的案件已安全保存"（过重）
- "放心，我帮你记住了"（陪伴语言）
- 无条件在所有状态下展示保存提示

---

## 附：Patch 修正记录

| Patch | 修正内容 |
|-------|---------|
| Patch-2 | `provider_timeout` 文案：由系统道歉表述改为"当前模型响应超时，不是你的输入问题。" |
| Patch-3 | `matter_save_fallback`：由固定文案改为条件性逻辑，仅在 routing/risk_check 完成且有效 matter 识别后触发 |
