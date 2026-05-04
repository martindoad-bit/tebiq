---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Internal Console Copy Map

> 本文件是 `/internal/eval-console` 的主文案参考，供 ENGINE Workstream A 集成使用。
> 所有标签双语（中文 / English），因为 CEO、QA、DOMAIN、工程师使用同一个控制台。
> 本文件为 B 层（待验证），未经 Project Lead 裁决不得视为已冻结。

---

## 1. Stats Card Labels（统计卡标签）

共 8 张统计卡。格式：`internal_code → display_label + tooltip`

| `internal_code` | `display_label` | `tooltip` |
|-----------------|-----------------|-----------|
| `total_runs` | 总运行数 / Total Runs | 当前数据集内已完成 eval 运行的总数。包含所有状态（成功、失败、超时）。 / Total eval runs in this dataset, including all states (success, failure, timeout). |
| `success_rate` | 成功率 / Success Rate | 返回有效 answer 的运行比例。不包含 fallback 和 provider_timeout。 / Percentage of runs that returned a valid answer. Excludes fallback and provider_timeout states. |
| `fallback_rate` | Fallback 率 / Fallback Rate | 触发 fallback 路径的运行比例。应持续监控；上升趋势为告警信号。 / Percentage of runs that triggered the fallback path. Rising trend is an alert signal. |
| `avg_latency_ms` | 平均延迟 / Avg Latency (ms) | 从收到用户输入到生成最终 answer 的平均时间（毫秒）。 / Average time from user input received to final answer generated, in milliseconds. |
| `provider_timeout_count` | Provider 超时数 / Provider Timeouts | DeepSeek 等 provider 超时的绝对数量。每次超时都代表一次用户等待失败。 / Absolute count of provider (e.g. DeepSeek) timeouts. Each timeout is a failed user wait. |
| `human_review_triggered` | 人工复核触发数 / Human Review Triggered | 路由到 human_review_required 状态的运行数量。 / Number of runs routed to human_review_required state. |
| `domain_coverage` | Domain 覆盖率 / Domain Coverage | 当前运行中，已标注 domain 字段的比例。标注缺失影响 Eval 分析质量。 / Percentage of runs with annotated domain field. Missing annotations reduce Eval analysis quality. |
| `deepseek_vs_tebiq_delta` | DS vs TEBIQ 对比差 / DeepSeek vs TEBIQ Delta | DOMAIN 标注中，TEBIQ 输出明显优于裸 DeepSeek 的比例 vs 明显更差的比例的差值。负值为警告。 / Delta between TEBIQ-better and TEBIQ-worse rates in DOMAIN annotations. Negative value is a warning. |

---

## 2. Table Column Headers（表格列标题）

格式：`column_id → display_text + tooltip`

| `column_id` | `display_text` | `tooltip` |
|-------------|----------------|-----------|
| `run_id` | 运行 ID / Run ID | 每次 eval 运行的唯一标识符。 / Unique identifier for each eval run. |
| `question` | 问题 / Question | 用户原始输入文本（未改写）。 / Original user input text, unmodified. |
| `domain` | 领域 / Domain | 路由层判定的 domain 分类（如 zairyu_update、zairyu_exit 等）。 / Domain classification assigned by the routing layer. |
| `routing_state` | 路由状态 / Routing State | 最终路由结果（success / fallback / out_of_scope / human_review 等）。 / Final routing outcome. |
| `deepseek_answer` | DeepSeek 裸答 / DeepSeek Raw Answer | DeepSeek 未经 TEBIQ 管线处理的原始输出。 / Raw DeepSeek output before TEBIQ pipeline processing. |
| `tebiq_answer` | TEBIQ 输出 / TEBIQ Output | 经 TEBIQ 管线处理后的最终输出。 / Final output after TEBIQ pipeline processing. |
| `domain_annotation` | DOMAIN 标注 / DOMAIN Annotation | DOMAIN-CC 对本条运行的结构化标注（severity / direction_correct / must_have 等）。 / DOMAIN-CC structured annotation for this run. |
| `latency_ms` | 延迟 (ms) / Latency (ms) | 本次运行总延迟时间（毫秒）。 / Total latency for this run in milliseconds. |
| `fallback_triggered` | Fallback 触发 / Fallback Triggered | 是否触发了 fallback 路径（是 / 否）。 / Whether the fallback path was triggered (Yes / No). |
| `created_at` | 创建时间 / Created At | 本次 eval 运行的时间戳（UTC）。 / Timestamp of this eval run (UTC). |

---

## 3. Action Button Labels（操作按钮标签）

格式：`button_id → label + disabled_label + tooltip`

| `button_id` | `label` | `disabled_label` | `tooltip` |
|-------------|---------|------------------|-----------|
| `run_eval` | 运行 Eval / Run Eval | 运行中... / Running... | 对当前数据集批量运行 eval 管线。运行中不可重复触发。 / Run the eval pipeline on the current dataset. Cannot be re-triggered while running. |
| `export_results` | 导出结果 / Export Results | 无数据可导出 / No data to export | 将当前 eval 结果导出为 CSV。需要至少一条已完成运行。 / Export current eval results as CSV. Requires at least one completed run. |
| `annotate_selected` | 标注选中项 / Annotate Selected | 请先选择条目 / Select items first | 对选中的 eval 条目打开 DOMAIN 标注面板。 / Open DOMAIN annotation panel for selected eval entries. |
| `mark_golden` | 设为 Golden Case / Mark as Golden | 需先完成标注 / Complete annotation first | 将选中的已标注条目升级为 golden_case。需要 direction_correct: yes + severity 已填写。 / Promote selected annotated entries to golden_case. Requires direction_correct: yes and severity filled. |
| `reset_filters` | 重置筛选 / Reset Filters | 无筛选条件 / No active filters | 清除所有当前激活的筛选条件。 / Clear all currently active filter conditions. |
| `compare_view` | 对比视图 / Compare View | 需选择两条运行 / Select two runs | 并排展示两条运行的 DeepSeek 裸答与 TEBIQ 输出。 / Side-by-side view of DeepSeek raw answer and TEBIQ output for two selected runs. |
| `flag_regression` | 标记为回归 / Flag as Regression | 需先选择条目 / Select items first | 将条目标记为路由回归（routing_failure），加入回归测试队列。 / Flag entry as routing regression (routing_failure), add to regression test queue. |
| `refresh` | 刷新 / Refresh | — | 重新加载当前数据集状态。 / Reload current dataset state. |

---

## 4. Provider Health Panel（Provider 健康状态面板）

每个 `status` 变体 → `display_text + impact_text`

| `status` | `display_text` | `impact_text` |
|----------|----------------|---------------|
| `healthy` | DeepSeek 正常 / DeepSeek Healthy | 当前 eval 运行可正常调用 DeepSeek。 / DeepSeek is available for eval runs. |
| `timeout` | DeepSeek 超时 / DeepSeek Timeout | DeepSeek 响应超时。受影响的运行将进入 provider_timeout 状态，不会生成 TEBIQ 输出。 / DeepSeek response timed out. Affected runs will enter provider_timeout state; no TEBIQ output will be generated. |
| `unavailable` | DeepSeek 不可用 / DeepSeek Unavailable | 无法连接 DeepSeek。新的 eval 运行将被暂停，直到服务恢复。 / Cannot reach DeepSeek. New eval runs are paused until service is restored. |
| `unknown` | 状态未知 / Status Unknown | 无法获取 DeepSeek 健康状态。建议刷新后重试；若持续出现请联系工程团队。 / Cannot retrieve DeepSeek health status. Try refreshing; if persistent, contact the engineering team. |

---

## 5. Batch Status Panel（批量状态面板）

格式：`field → display_label + format_hint`

| `field` | `display_label` | `format_hint` |
|---------|-----------------|---------------|
| `batch_id` | 批次 ID / Batch ID | 字符串，如 `eval-batch-20260505-001` / String, e.g. `eval-batch-20260505-001` |
| `total_items` | 总条目数 / Total Items | 整数 / Integer |
| `completed_items` | 已完成 / Completed | 整数 / Integer |
| `failed_items` | 失败 / Failed | 整数；点击展开失败列表 / Integer; click to expand failure list |
| `pending_items` | 排队中 / Pending | 整数 / Integer |
| `batch_status` | 批次状态 / Batch Status | `running` / `completed` / `failed` / `paused` |
| `started_at` | 开始时间 / Started At | ISO 8601 UTC 时间戳 / ISO 8601 UTC timestamp |
| `estimated_completion` | 预计完成 / Estimated Completion | ISO 8601 UTC，若未知则显示"—" / ISO 8601 UTC; show "—" if unknown |
| `provider_used` | 使用 Provider / Provider Used | 如 `deepseek-r1` / e.g. `deepseek-r1` |

---

## 6. Detail Page Sections（详情页分区）

格式：`section_id → heading + description`

| `section_id` | `heading` | `description` |
|--------------|-----------|---------------|
| `question_display` | 用户原始问题 / Original Question | 展示用户输入的未修改原文。禁止展示系统改写版本。 / Shows the unmodified user input. Do not display system-rewritten versions. |
| `routing_trace` | 路由追踪 / Routing Trace | 展示本次运行经过的路由决策链：domain → routing_state → fallback/handoff 判断。 / Shows the routing decision chain for this run. |
| `deepseek_raw` | DeepSeek 裸答 / DeepSeek Raw Answer | 未经处理的 DeepSeek 原始输出。仅供 DOMAIN/QA 内部对比，不得渲染到用户端。 / Raw unprocessed DeepSeek output. Internal use for DOMAIN/QA comparison only; must not be rendered to users. |
| `tebiq_output` | TEBIQ 输出 / TEBIQ Pipeline Output | 经完整管线处理后的输出。这是用户实际看到的版本（或 fallback 替代）。 / Output after full pipeline processing. This is what the user actually sees (or the fallback substitute). |
| `domain_annotation` | DOMAIN 标注 / DOMAIN Annotation | DOMAIN-CC 对本条目的结构化标注字段。如未标注则显示空状态。 / DOMAIN-CC structured annotation fields for this entry. Show empty state if not annotated. |
| `safety_flags` | 安全检查结果 / Safety Check Results | surface safety 层检查输出（禁用词、内部字段泄露、边界声明等）。 / Surface safety layer check outputs (forbidden words, internal field leakage, boundary statements, etc.). |
| `latency_breakdown` | 延迟分解 / Latency Breakdown | 各管线阶段耗时明细：routing / provider / safety / output 各层延迟。 / Per-stage latency breakdown: routing / provider / safety / output. |
| `regression_flags` | 回归标记 / Regression Flags | 是否被标记为路由回归或语义回归。如有，展示标记时间和操作人。 / Whether this entry is flagged as routing or semantic regression. If flagged, show timestamp and operator. |

---

## 7. Empty States（空状态）

格式：`scenario → empty_state_text`

| `scenario` | `empty_state_text` |
|------------|-------------------|
| DeepSeek 数据暂无 | DeepSeek 裸答暂无 / DeepSeek raw answer not available for this run. |
| 未生成 TEBIQ 输出 | 本次运行未生成 TEBIQ 输出（可能原因：fallback 触发 / provider 超时）。 / No TEBIQ output generated for this run (possible cause: fallback triggered or provider timeout). |
| API 不可用 | DeepSeek API 当前不可用，无法加载此条目的原始输出。 / DeepSeek API currently unavailable; cannot load raw output for this entry. |
| 无标注 | DOMAIN 标注尚未完成。 / DOMAIN annotation not yet completed. |
| 无批次数据 | 暂无批次运行数据。使用"运行 Eval"按钮开始。 / No batch run data available. Use the "Run Eval" button to start. |
| 过滤无结果 | 当前筛选条件下没有符合的条目。 / No entries match the current filter conditions. |
| 无 golden_case | 尚无 golden case 条目。需先完成标注并由产品负责人裁决升级。 / No golden case entries yet. Complete annotation and obtain Project Lead approval to promote. |
| 回归队列为空 | 当前没有标记为回归的条目。 / No entries currently flagged as regression. |

---

## 8. Error States（错误状态）

格式：`error_type → error_text + recovery_hint`

| `error_type` | `error_text` | `recovery_hint` |
|--------------|--------------|-----------------|
| `provider_connection_failed` | 无法连接 DeepSeek / Cannot connect to DeepSeek | 检查网络和 API Key 配置，或等待 provider 服务恢复后重试。 / Check network and API key configuration, or retry after provider service recovers. |
| `batch_run_failed` | 批次运行中断 / Batch Run Interrupted | 部分条目未完成。查看失败列表，确认原因后可重新运行失败条目。 / Some items did not complete. Check the failure list, diagnose the cause, then re-run failed items. |
| `annotation_save_failed` | 标注保存失败 / Annotation Save Failed | 请重试。如持续失败，检查网络连接或联系工程团队。 / Please retry. If failure persists, check network connection or contact the engineering team. |
| `export_failed` | 导出失败 / Export Failed | 请重试。如数据量过大，尝试缩小筛选范围后再导出。 / Please retry. If data is too large, narrow the filter range before exporting. |
| `detail_load_failed` | 详情加载失败 / Detail Load Failed | 刷新页面或重新选择条目。 / Refresh the page or re-select the entry. |
| `unknown_error` | 发生未知错误 / Unknown Error | 记录当前操作和时间，联系工程团队并提供 run_id。 / Record the current operation and time, then contact the engineering team with the run_id. |
