---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Scope Exit & Routing Language

> 本文件定义范围退出（out-of-scope）与路由场景下的文案。
> 用户可见文案必须通过 DOMAIN 复核 + Project Lead 裁决后方可上线。
> 内部状态文案（routing_failure）**永不对用户展示**。

---

## 使用规则

- 所有用户可见 `user_copy` 均为 B 层（待验证），不得视为已冻结
- `routing_failure` 相关内容为内部专用，任何进入用户可见渲染路径的情况均为 P0
- 文案不允许出现禁用词（见 `TEBIQ_COPY_SOURCE.md §5`）
- 所有用户可见文案不得暴露内部字段名（`out_of_scope`、`domain`、`intent`、`fallback_reason` 等）

---

## 状态一：out_of_scope_correct

**定义**：TEBIQ 经路由判断，该问题真正不在服务范围内（例如：刑事法律、税务诉讼策略、纯商业合同等与在留无关的领域）。

| 字段 | 内容 |
|------|------|
| `state_code` | `out_of_scope_correct` |
| `internal_label` | 范围外（路由正确） |
| `urgency_level` | — |

### user_copy（中文）

> 这个问题的核心不在在留手续范围内，TEBIQ 暂时帮不上忙。
>
> 如果涉及在留期限、资格变更、手续截止、家庭成员在留关联，可以重新描述，我们可以从这些角度帮你看清楚。
>
> 这类问题建议直接咨询{{specialist}}或对应专业窗口——他们能处理跨领域的实际情况。

### internal_note

- 触发条件：路由层 `domain` 判定为非在留领域，置信度超过阈值
- 用户文案不得出现"超出范围"、"我们不支持"、"这不是我们的服务"等表述
- 必须给出具体的替代路径（{{specialist}} / 对应专业窗口）
- 必须留出用户重新描述的空间（"如果涉及在留……"）

### what_engineer_sees

```
state: out_of_scope_correct
routing_confidence: [float, 0.0–1.0]
domain_detected: [string, e.g. "tax_litigation" | "criminal_law" | "commercial_contract"]
fallback_shown: false
user_copy_key: SCOPE_EXIT_CORRECT_V1
internal_note: "Correct routing. User shown redirect copy. No fallback triggered."
```

---

## 状态二：routing_failure

**定义**：已知回归——TEBIQ 误将在留相关问题路由为 out_of_scope。此状态为**内部专用，永不对用户展示**。

| 字段 | 内容 |
|------|------|
| `state_code` | `routing_failure` |
| `internal_label` | 路由失败（已知回归） |
| `urgency_level` | P0（阻塞合并） |

### user_copy

**不适用。此状态不允许有用户可见文案。**

如果在任何用户可见界面检测到此状态代码的渲染，视为 P0 bug，立即阻塞。

### internal_note

- 此状态表示路由层将属于在留管理范围的问题错误判断为 out_of_scope
- 需进入 Eval Lab 标注队列，标注为 `direction_correct: no`
- 触发回归测试覆盖
- 严禁以任何形式透传给用户：不展示"暂时无法处理"类降级文案，必须在技术层面拦截
- 如暂无修复方案，启用 `ambiguous_routing` 降级路径（见下）

### what_engineer_sees

```
state: routing_failure
routing_confidence: [float]
domain_detected: [string]
expected_domain: "zairyu_related"
regression_flag: true
action_required: "Add to Eval Lab regression queue. Block user display path. Do NOT surface fallback copy."
alert_level: P0
internal_note: "Known regression: in-scope question routed out. Must not reach user."
```

---

## 状态三：ambiguous_routing

**定义**：TEBIQ 无法以足够置信度判断问题属于哪个路由分支，降级为向用户请求澄清。

| 字段 | 内容 |
|------|------|
| `state_code` | `ambiguous_routing` |
| `internal_label` | 路由不确定（澄清降级） |
| `urgency_level` | — |

### user_copy（中文）

> 描述这个问题需要多了解一点你的情况——不同的在留资格和时间节点，处理方式差别很大。
>
> 可以告诉我：你现在的在留资格是什么？以及这件事跟在留期限或资格更新有关系吗？

### internal_note

- 触发条件：路由层置信度低于阈值，多个 `domain` 评分接近
- 用户文案定位为"需要更多信息"，而非"你的问题有问题"
- 澄清问题必须具体（在留资格、时间节点），不得用泛化的"请描述更多细节"
- 用户回答澄清问题后，重新进入路由管线，不得跳过
- 此降级不等于 `routing_failure`，不应触发 P0 告警

### what_engineer_sees

```
state: ambiguous_routing
routing_confidence: [float, below threshold]
domain_candidates: [array of strings, e.g. ["zairyu_update", "zairyu_exit", "family_zairyu"]]
clarification_shown: true
user_copy_key: ROUTING_AMBIGUOUS_CLARIFY_V1
internal_note: "Confidence below threshold. Clarification UI triggered. Awaiting user input to re-route."
re_route_on_input: true
```

---

## 附：禁用表达对照表（本文件专项）

| 禁止写法 | 原因 | 推荐方向 |
|----------|------|----------|
| 这不是我们的服务范围 | 否定用户 | 说 TEBIQ 能做什么 |
| 超出我的处理能力 | 暴露系统局限 | 给出具体替代路径 |
| 请联系人工客服 | 无意义 + 无路径 | 指向具体专业窗口（{{specialist}}等） |
| 您的问题无法处理 | 把系统失败甩给用户 | 说明需要更多哪方面信息 |
| 重要提示：超出范围 | 官腔标题感 | 直接说，不加标题 |
| 系统路由失败 | 内部字段外泄 | 此信息永不对用户展示 |
