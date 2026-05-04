---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Internal Console Label System

> 本文件定义 `/internal/eval-console` 的标签体系。
>
> 所有标签仅在内部工程/QA/DOMAIN 视图中可见，**不得渲染到任何用户可见界面**。
>
> 标签是 Eval Lab 标注与 QA 回归管理的核心工具。所有新标签必须先在本文件登记再实现。

---

## 标签定义表

每个标签包含：`internal_code`、`display_label`（双语）、`color_hint`、`tooltip`、`visible_to`、`show_in_list`、`show_in_detail`。

---

### FULL_COMPARABLE

```yaml
internal_code: FULL_COMPARABLE
display_label: "可比较 / Comparable"
color_hint: green
tooltip: |
  本条样本具备完整的比较条件：DeepSeek 裸答和 TEBIQ 管线输出均可用、均有内容、
  可进行 DOMAIN-CC 语义标注和 Eval 对比评分。
  这是 Eval Lab 标注的理想起点状态。不代表内容质量好，只代表可以开始标注。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
rerun_policy:
  overwrite_existing: forbidden
  reason: 已有 FULL_COMPARABLE 样本具有标注价值，覆盖重跑会破坏可追溯性
  allowed:
    - 新 batch_id 下重跑（产生新记录，不覆盖旧记录）
    - 新 version 标记下重跑
  rerun_button_behavior: disabled（状态为 FULL_COMPARABLE 时，重跑按钮禁用）
```

---

### TEBIQ_FALLBACK_SAMPLE

```yaml
internal_code: TEBIQ_FALLBACK_SAMPLE
display_label: "降级回答 / Fallback"
color_hint: orange
tooltip: |
  本条 TEBIQ 输出来自 fallback 管线（主模型超时或失败后的降级分支）。
  标注时需注意：此条不代表 TEBIQ 正常管线的能力，质量通常低于正常输出。
  如果此条与 DeepSeek 裸答对比，结论仅反映 fallback 路径的表现，不能代表主路径。
  降级回答不应计入主路径 Eval 指标，应单独统计。
visible_to: [engineer, QA, DOMAIN]
show_in_list: yes
show_in_detail: yes
```

---

### TEBIQ_ROUTING_FAILURE

```yaml
internal_code: TEBIQ_ROUTING_FAILURE
display_label: "路由失败★ / Routing Failure ★"
color_hint: red
tooltip: |
  已确认的路由层回归缺陷：TEBIQ 对此类问题的路由判断出错，导致管线走错分支。
  ★ 符号标识此标签的样本属于**回归集（regression set）**，每次发布前必须在此集上跑回归断言。
  触发条件：路由分类与 DOMAIN-CC 标注的正确分类不一致，或输出明显偏离问题方向。
  此类样本必须进入 golden_cases（错误方向）+ 作为回归断言的负例。
  P0 回归：如此标签在当前版本出现率上升，必须阻塞发布。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
```

---

### TEBIQ_OOS

```yaml
internal_code: TEBIQ_OOS
display_label: "范围外（非回归）/ OOS"
color_hint: gray
tooltip: |
  管线正确判断此问题超出 TEBIQ 当前处理范围（非在留类问题），并给出了正确的 out_of_scope 响应。
  注意与 TEBIQ_ROUTING_FAILURE 的区别：OOS 是正确行为，不是失败。
  此标签的样本不计入质量回归集，不影响主路径指标。
  如果 OOS 的判断本身出错（本该处理却被判为 OOS），应同时打 TEBIQ_ROUTING_FAILURE。
visible_to: [engineer, QA, DOMAIN]
show_in_list: yes
show_in_detail: yes
```

---

### DEEPSEEK_FAILED_SAMPLE

```yaml
internal_code: DEEPSEEK_FAILED_SAMPLE
display_label: "DS 失败 / DS Failed"
color_hint: yellow
tooltip: |
  DeepSeek 裸答在本条样本中失败：超时、内容截断、拒绝回答、输出乱码、或明显方向错误。
  此标签不代表 TEBIQ 失败，只代表 DeepSeek 原始输出不可用。
  标注时注意：如 DeepSeek 失败但 TEBIQ 有降级输出，需同时打 TEBIQ_FALLBACK_SAMPLE。
  Eval 对比中，DS 失败的样本通常不能作为"TEBIQ 优于 DeepSeek"的证据。
visible_to: [engineer, QA, DOMAIN]
show_in_list: yes
show_in_detail: yes
```

---

### INVALID_SAMPLE

```yaml
internal_code: INVALID_SAMPLE
display_label: "无效 / Invalid"
color_hint: dark_gray
tooltip: |
  本条样本因以下原因之一被判为无效，不参与任何标注或统计：
  - 测试问题（明显是工程测试输入）
  - 重复样本（与已有样本内容完全相同）
  - 输入损坏（问题内容不完整、乱码、空值）
  - 属于禁止类型（法律结论类、不在日本的问题等）
  无效样本应从活跃标注队列中移除，保留原始记录备查。
visible_to: [engineer, QA]
show_in_list: no
show_in_detail: yes
```

---

### annotation_blocked

```yaml
internal_code: annotation_blocked
display_label: "标注受阻 / Annotation Blocked"
color_hint: gray
tooltip: |
  本条样本的标注工作暂时无法继续，原因可能包括：
  - DOMAIN-CC 需要更多信息才能判断
  - 问题涉及争议性在留解释，需等待官方更新
  - 样本信息缺失（无用户背景、无在留资格类型）
  - 标注者无法确认方向正确性
  打此标签时必须在 tooltip 中补充具体受阻原因，不能只留空白。
  受阻样本定期复查，不允许长期积压。
visible_to: [engineer, QA, DOMAIN]
show_in_list: yes
show_in_detail: yes
```

---

### domain_review_needed

```yaml
internal_code: domain_review_needed
display_label: "需领域复核 / Domain Review"
color_hint: purple
tooltip: |
  本条样本已完成初步标注，但涉及在留资格专业判断，需要 DOMAIN-CC 进行第二轮复核。
  触发条件包括：
  - 初标者不确定 severity 级别
  - must_have 内容涉及具体手续名或期限
  - handoff_trigger 判断有分歧
  - 跨类型在留资格问题（如经管转永住、技人国转特定技能）
  复核完成后，由 DOMAIN-CC 确认或修改标注，并移除此标签。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
```

---

### p0_candidate

```yaml
internal_code: p0_candidate
display_label: "P0 候选 / P0"
color_hint: red_border
tooltip: |
  本条样本被标注为 P0 候选问题：TEBIQ 输出在此场景下存在方向性错误或严重误导风险。
  P0 定义（来自 TEBIQ_QA_GATES.md）：TEBIQ 输出明显比 DeepSeek 裸答更危险或更错。
  P0 候选需要：(1) DOMAIN-CC 复核确认，(2) 产品负责人裁决，(3) 阻塞相关功能合并。
  候选状态不等于已确认 P0；确认后需升级为回归集条目（TEBIQ_ROUTING_FAILURE 或专项标签）。
  未经确认不得基于候选状态阻塞发布，但需标记 domain_review_needed 待复核。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
```

---

### p1_candidate

```yaml
internal_code: p1_candidate
display_label: "P1 候选 / P1"
color_hint: orange_border
tooltip: |
  本条样本被标注为 P1 候选问题：TEBIQ 输出存在明显信息遗漏或方向偏差，但不至于造成用户立即风险。
  P1 候选需要：(1) DOMAIN-CC 复核，(2) 列入下一版本修复计划。
  P1 不阻塞当前发布，但不能无限期积压。P1 候选中如出现 handoff_trigger 场景遗漏，自动升级为 P0。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
```

---

### not_generated

```yaml
internal_code: not_generated
display_label: "未生成 / Not Generated"
color_hint: light_gray
tooltip: |
  本条样本的 TEBIQ 输出尚未生成（管线未运行、任务排队中、或问题未发送到管线）。
  与 ANSWER_GENERATION_ERROR 的区别：not_generated 是还没开始，error 是已经尝试但失败。
  通常出现在批量 Eval 任务还在处理中的样本。不参与当前轮次的标注对比。
visible_to: [engineer, QA]
show_in_list: yes
show_in_detail: yes
```

---

### production_blocked

```yaml
internal_code: production_blocked
display_label: "生产受阻 / Production Blocked"
color_hint: dark_red
tooltip: |
  本条样本对应的问题类型或场景，在当前版本中被明确判定为不得进入生产环境。
  触发条件：
  - P0 已确认但修复尚未完成
  - DOMAIN-CC 标注该场景的输出方向存在错误
  - 产品负责人明确指定该场景暂停上线
  此标签不是对用户功能的限制，而是对 Eval 样本的工程管理标记。
  production_blocked 样本对应的功能路径在生产中必须确保有 fallback 或 human_review_required 出口。
visible_to: [engineer, QA, DOMAIN, CEO]
show_in_list: yes
show_in_detail: yes
```

---

## 标签组合规则

当一个样本同时符合多个标签的条件时，按以下规则处理：

### 组合优先级（高→低）

1. `production_blocked` — 如果打了此标签，在列表视图中此标签优先显示
2. `p0_candidate` / `TEBIQ_ROUTING_FAILURE` — P0 级问题
3. `p1_candidate`
4. `domain_review_needed`
5. `annotation_blocked`
6. `TEBIQ_FALLBACK_SAMPLE` / `DEEPSEEK_FAILED_SAMPLE`
7. `FULL_COMPARABLE` / `TEBIQ_OOS`
8. `not_generated` / `INVALID_SAMPLE`

### 常见合法组合

| 组合 | 含义 |
|------|------|
| `TEBIQ_ROUTING_FAILURE` + `p0_candidate` | 路由失败已确认为 P0，在等 DOMAIN 复核 |
| `FULL_COMPARABLE` + `domain_review_needed` | 可以标注但涉及专业判断，需 DOMAIN 二次复核 |
| `TEBIQ_FALLBACK_SAMPLE` + `p1_candidate` | Fallback 输出存在 P1 级信息遗漏 |
| `DEEPSEEK_FAILED_SAMPLE` + `TEBIQ_FALLBACK_SAMPLE` | DS 失败且 TEBIQ 走了降级路径 |
| `annotation_blocked` + `domain_review_needed` | 标注受阻的根本原因是需要 DOMAIN 复核 |
| `p0_candidate` + `production_blocked` | P0 已确认，对应功能路径已阻塞生产 |

### 不合法组合（矛盾标签）

| 组合 | 原因 |
|------|------|
| `FULL_COMPARABLE` + `not_generated` | 矛盾：可比较意味着输出已生成 |
| `INVALID_SAMPLE` + 任何质量标签 | 无效样本不参与质量判断 |
| `TEBIQ_OOS` + `TEBIQ_ROUTING_FAILURE` | OOS 是正确行为，路由失败是错误行为，同一样本不能同时是两者 |
| `FULL_COMPARABLE` + `DEEPSEEK_FAILED_SAMPLE` | 如果 DS 失败，则无法"完整比较" |

---

## 列表视图 vs 详情视图显示规则

### 列表视图（show_in_list: yes）

列表视图每条样本只显示优先级最高的**1个状态标签**（quality/status 类）+**所有问题标签**（p0_candidate、p1_candidate、production_blocked）。

显示上限：每条样本最多显示 3 个标签 chip。超过时折叠，点击展开。

### 详情视图（show_in_detail: yes）

详情视图显示该样本的**所有已打标签**，含 tooltip 悬浮查看。
`INVALID_SAMPLE` 的详情中需注明无效原因。

---

## 标签维护规则

- 新增标签：必须在本文件登记所有字段后，再在代码中实现
- 修改标签显示文字：GM 审批
- 修改 `visible_to` 权限：产品负责人裁决
- 废弃标签：保留 `internal_code` 历史记录，加 `deprecated: true`，从 UI 下线
- 所有标签变更须在 `TEBIQ_CURRENT_STATE.md` 更新记录
