---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Sprint Directive §5
issue: https://github.com/martindoad-bit/tebiq/issues/41
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# Engineering Work Packet — 1.0 Alpha Learning Console

> 1.0 中台 — 区别于 `/internal/eval-console`（Eval 数据面板）。
> Learning Console 用途：让 CEO 看到真实用户问了什么、DS 怎么答、用户怎么反馈、哪些问题值得做 0.7。

## 1. Scope

新建 `/internal/learning-console`（与现有 `/internal/eval-console` 共存，gate 同 EVAL_LAB_ENABLED 或独立 env）。

## 2. 数据源

读取 §1.0 streaming consultation pipeline 落库的 consultation 表 / answer_drafts 扩字段。

## 3. 字段（每行）

```
question_id              用户问题原文           是否含图片  图片摘要
ai_answer_text          model='deepseek-v4-pro' prompt_version='consultation_alpha_v1'
fact_anchor_ids         risk_keyword_hits      latency_ms total_latency_ms
stream_started_at       first_token_at         first_token_latency_ms
completed_at            completion_status      partial_answer_saved
final_answer_text       timeout_reason         feedback_type
saved_question          human_confirm_clicked  follow_up_count
created_at
```

## 4. Tabs（7 个）

| Tab | 过滤条件 |
|-----|---------|
| 1. 全部咨询 | 全部 |
| 2. 图片咨询 | `has_image=true` |
| 3. 命中高风险词 | `risk_keyword_hits.length > 0` |
| 4. 不准确反馈 | `feedback_type='不准确'` |
| 5. 想人工确认 | `human_confirm_clicked=true` 或 `feedback_type='想找人工确认'` |
| 6. 已保存问题 | `saved_question=true` |
| 7. 超时 / 失败 | `completion_status in ('timeout','failed')` |

## 5. UI 要求（最小可用）

- 列表表格（按 created_at desc）
- 每行可点开看详情（user_question + ai_answer + 全部字段）
- 顶部 KPI：今日咨询数 / 今日图片数 / 高风险命中数 / 不准确率 / timeout 率
- 不需要 Eval Console 的 stats cards / provider health panel（那是 eval-console）
- 不实现复杂筛选 / 排序 / 导出（保留为 0.7+）

## 6. Acceptance

| 项 | 要求 |
|----|------|
| A | `/internal/learning-console` HTTP 200 |
| B | 7 个 Tab 均能切换 + 正确过滤 |
| C | 详情页显示所有 §3 字段 |
| D | 时间戳排序正确 |
| E | KPI 数字准确（与底层 query 一致）|
| F | 与 eval-console 路由不混淆（CEO 能区分两个用途）|
| G | DS down 时 Learning Console 仍正常显示历史记录 |

## 7. Out of Scope

- 不实现 Eval Lab 标注交互
- 不实现 DOMAIN annotation 流程
- 不实现导出 / 批量操作
- 不与 eval_answers 表合并（独立数据流）

## 8. Sensitive Path

**允许**：
- 新建 `app/internal/learning-console/`
- 新建 `app/api/internal/learning-console/`
- 数据 query 复用 §1.0 streaming pack 的 schema

**不可触及**：
- `app/internal/eval-console/`（独立路径）
- `eval_answers` schema

## 9. 完成回报

同 streaming pack §12。
