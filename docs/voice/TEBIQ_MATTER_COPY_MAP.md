---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Matter Copy Map

> Matter 是 TEBIQ 的核心输出层：识别用户没有问、但会影响结果的在留风险，并推进到下一步行动。
> 本文件定义 Matter 区块的所有展示文案。
>
> **Matter 文案为预览专用。** 上线前须 DOMAIN 复核 + Project Lead 裁决。
> 本文件所有内容为 B 层（待验证）。

---

## 总体原则

- Matter 不是"风险警告"，是"现在先做这一步"
- 不用官腔标题（"重要风险提醒"等），用具体的事情
- 风险级别用在留语境描述，不用抽象的高/中/低标签
- 每条 Matter 输出必须有对应的 next action，不允许只说风险不说下一步
- Matter 是**轻保存**（L2），不是案件管理系统——文案不用项目管理语言

---

## 1. Matter Frame Copy（Matter 区块框架文案）

### 区块标题与标签

| 元素 | 文案 |
|------|------|
| `section_heading` | 这件事还有一步 |
| `section_heading_multiple` | 有几件事需要跟进 |
| `save_action_label` | 保存这个事项 |
| `saved_state_label` | 已保存 |
| `return_to_answer_label` | 回到这个答案 |
| `continue_label` | 继续处理：{action_label} |
| `missing_one_step_label` | 还差一步：{step_description} |
| `matter_type_label` | 在留事项 |

### 区块底部边界声明

> 以上是参考，不是法律意见，也不是个案审查结论。

（此声明必须出现在 Matter 区块底部，不可省略。）

---

## 2. Risk Level Display（风险级别在留语境描述）

Matter 的风险级别不用"高/中/低"抽象标签，用在留结果语境描述。

| `risk_level` | 展示标签 | 在留语境说明 | 示例场景 |
|--------------|----------|--------------|----------|
| `HIGH` | 影响在留更新 | 这件事如果不处理，下次在留更新会受到直接影响。 | 办公室类型不合格 / 年金未纳 / 就労资格不符 |
| `HIGH_URGENT` | 期限紧迫 | 截止日期近，处理窗口不多。 | 在留卡 30 天内到期 / 离婚后 6 个月截止 |
| `MEDIUM` | 审查时容易被问到 | 这件事在审查时会被提到，现在准备好比临时应对更稳。 | 共享办公室 / 家庭成员资格联动 / 收入下降 |
| `LOW` | 建议留意 | 目前不紧迫，但有变化时需要重新确认。 | 地址变更届出 / 工作内容轻微调整 |

**注意**：`risk_level` 字段本身不对用户展示，只展示"影响在留更新"等在留语境标签。

---

## 3. Next Action Templates（下一步行动模板）

格式：`action_code → action_label + description`

---

### `apply_procedure`（申請手続き）

| 字段 | 内容 |
|------|------|
| `action_code` | `apply_procedure` |
| `action_label` | 准备申请材料 |
| `description` | 收集申请所需文件，确认截止日期，在到期前提交更新申请。 |
| `trigger_condition` | 在留更新 / 変更申請 有明确截止日期，且用户未启动 |

---

### `change_application`（変更申請）

| 字段 | 内容 |
|------|------|
| `action_code` | `change_application` |
| `action_label` | 申请在留资格变更 |
| `description` | 现有在留资格与实际状况有差异，需向入管提出变更申请，不能仅依靠更新。 |
| `trigger_condition` | 就労资格与工作内容不符 / 配偶资格后离婚 / 経管后结束经营 |

---

### `consult_gyosei`（行政書士相談）

| 字段 | 内容 |
|------|------|
| `action_code` | `consult_gyosei` |
| `action_label` | 与行政書士确认 |
| `description` | 这一步建议找行政書士确认，特别是：补材料期限、不许可通知书的回应、配偶离婚后的资格变更。 |
| `trigger_condition` | handoff_trigger 命中 / 多重在留问题叠加 / 高风险情况 |

---

### `additional_check`（追加確認）

| 字段 | 内容 |
|------|------|
| `action_code` | `additional_check` |
| `action_label` | 核对这个细节 |
| `description` | 在下一步行动前，需要核实一个影响结论的具体情况。 |
| `trigger_condition` | 路由层检测到信息不足以给出明确建议（但不到 ambiguous_routing 阈值）|

---

### `deadline_check`（期限確認）

| 字段 | 内容 |
|------|------|
| `action_code` | `deadline_check` |
| `action_label` | 确认截止日期 |
| `description` | 先确认在留卡上的到期日，以及相关手续的受理截止时间，再安排后续步骤。 |
| `trigger_condition` | 用户未明确知道到期日 / 或到期日与当前日期差距不明 |

---

## 4. Empty Matter State（无风险检出时）

当 TEBIQ 分析后未检出需要升级的在留风险，展示以下内容：

| 元素 | 文案 |
|------|------|
| `empty_state_heading` | 这次没有检出需要跟进的在留事项 |
| `empty_state_subtext` | 如果情况有变化——换工作、搬家、家庭成员资格变动——可以重新描述，我们再看一次。 |
| `empty_state_note` | 以上基于你描述的情况，不代表全面的在留风险排查结论。 |

**注意**：空状态不能说"TEBIQ 已帮你全面排查，一切正常"。只说"这次没检出"，保留用户情况变化后重新检查的路径。

---

## 5. Multiple Risk Display（多风险叠加展示）

当检出 2–3 条风险时，按以下规则展示：

### 展示顺序原则

1. `HIGH_URGENT`（期限紧迫类）永远排第一
2. `HIGH`（影响更新类）排第二
3. `MEDIUM`（审查时会被问到）排第三
4. `LOW`（建议留意）不堆叠展示，折叠或附注

### 多风险标题

> 有 {N} 件事需要跟进，从最紧的开始处理。

（N = 风险条数，只计入 HIGH_URGENT / HIGH / MEDIUM，不计 LOW）

### 多风险底部声明

> 这几件事的处理顺序会互相影响，建议找行政書士一次性理清楚，再分头处理。

（仅当同时有 2 条以上 HIGH 或 HIGH_URGENT 时附加此声明）

### 展示上限

- 用户可见的 Matter 条目不超过 3 条（超出部分折叠，标注"还有 X 件"）
- 不允许展示超过 3 条平铺的 Matter 卡片（视觉噪音 + 用户认知负担）

---

## 6. Fallback Matter（分析未完成时）

当 TEBIQ 因 provider_timeout / fallback / routing_failure 等原因无法完成 Matter 分析时，展示以下内容：

| 元素 | 文案 |
|------|------|
| `fallback_matter_heading` | 这次没能完成在留风险分析 |
| `fallback_matter_subtext` | 如果你描述了具体情况（在留资格、到期日、最近变化），可以重新提交，我们再分析一次。 |
| `fallback_matter_action` | 重新描述 / 重试 |
| `fallback_matter_note` | 如果情况紧急（在留卡快到期 / 刚收到不许可通知），建议直接联系行政書士，不要等待系统分析。 |

**注意**：
- Fallback Matter 不允许展示任何部分分析结果（"已分析了 X，但 Y 未完成"类表述）
- 不允许展示 `fallback_reason` 字段内容
- 不允许说"系统繁忙"——说具体的用户操作路径（重新描述 / 重试）

---

## 附：Matter 文案禁用词对照（专项）

| 禁止 | 原因 |
|------|------|
| 行动包 | 项目管理腔 |
| 任务 / task / TODO | 项目管理腔 |
| deadline（单独使用）| 请写"X 月 Y 日前" |
| 案件 | Matter Draft ≠ 正式案件 |
| TEBIQ 已帮你分析完毕 | 暗示 TEBIQ 做了最终判断 |
| 一切正常，放心 | 无法保证的结论 + 情绪腔 |
| 风险等级：高 | 内部字段标签暴露，用在留语境描述替代 |
| 系统检测到… | 内部逻辑外泄 |
| 严重风险 | 过度惊吓 + 无行动路径 |
| 立即咨询专家 | 导流腔 |
