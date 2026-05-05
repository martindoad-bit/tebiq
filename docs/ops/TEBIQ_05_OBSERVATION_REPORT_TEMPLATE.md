---
status: GM template / 0.5 observation period
owner: GM
date: 2026-05-05
version: v0.1
authority: TEBIQ 0.5 Safe Consultation Sprint Workstream F
purpose: Alpha 7-day observation report template for internal client use
---

# TEBIQ 0.5 Alpha Observation Report Template

> 0.5 上线后进入 7 天观察期。每天 / 每周收集 metrics，回报给 PL 决定是否进 0.7。
> 数据来源：`/internal/learning-console` + `ai_consultations` 表。

---

## Period

- start: <YYYY-MM-DD>
- end: <YYYY-MM-DD>
- days: <N>
- production sha: <sha at observation start>

---

## Volume

| Metric | Count | Note |
|--------|-------|------|
| total_consultations | | total ai_consultations rows |
| text_consultations | | has_image=false |
| photo_consultations | | has_image=true |
| follow_up_count_total | sum follow_up_count | 同 question_id 复诊次数 |
| unique_visitors | | viewer_id distinct（如可识别）|

---

## Quality / Trust

| Metric | Count | Threshold | OK? |
|--------|-------|-----------|-----|
| high_risk_keyword_hits | | — | — |
| inaccurate_feedback | | <20% | |
| human_review_clicks | | — | |
| saved_questions | | >5% | |
| forbidden_phrase_in_answer | 0 期望 | =0 | required |
| timeout_count (no answer) | | <10% | |
| failed_count | | <5% | |
| partial_count | | <30% | (Issue #49 may dominate) |

---

## Latency

| Metric | Value | Charter §8 Target |
|--------|-------|-------------------|
| avg_first_token_latency_ms | | < 10000 (P1) |
| p50_first_token_latency_ms | | — |
| p95_first_token_latency_ms | | — |
| avg_total_latency_ms | | — |
| p95_total_latency_ms | | — |
| timeout_rate | | <10% (Charter §8) |

---

## Top 20 Real Questions

| # | question (truncated) | feedback | saved | risk_keywords | status |
|---|----------------------|----------|-------|---------------|--------|
| 1 | | | | | |
| ... | | | | | |
| 20 | | | | | |

---

## Top 10 High-Risk Keywords

| # | keyword | hit_count | sample question_ids |
|---|---------|-----------|---------------------|
| 1 | | | |
| ... | | | |

---

## Top 10 Inaccurate Cases

| # | question (truncated) | answer (truncated) | reason hypothesis |
|---|----------------------|--------------------|-------------------|
| 1 | | | |
| ... | | | |

---

## Top 10 Human-Review Cases

| # | question (truncated) | risk_keywords | fact_anchor_ids | status |
|---|----------------------|---------------|-----------------|--------|
| 1 | | | | |
| ... | | | |

---

## Suggested 0.7 Risk Signal Candidates

GM 从观察期数据中提炼出值得在 0.7 阶段实现完整 risk triage 的 signal 类型。

| # | signal name | trigger pattern | proposed action | evidence |
|---|-------------|-----------------|-----------------|----------|
| 1 | | | | |
| ... | | | | |

---

## Production Status

- production status: Alpha / limited internal client use / not final professional judgment
- internal client use allowed: yes (per 0.5 acceptance)
- public launch: no
- DOMAIN formal annotation: not started (待 0.7+)
- VOICE A-layer: not approved (待 PL)

---

## P0 / P1 / P2 incidents during observation

| ID | severity | description | resolution | resolved_at |
|----|----------|-------------|------------|-------------|
| | | | | |

---

## Decisions for PL

GM 提交本报告 + 提议：

1. 是否进入 0.7（完整 Risk Triage）→ 候选 signals 见上
2. 是否扩大内部客户使用范围（10-30 → 更多）
3. 是否解锁 production copy（默认仍 blocked）
4. 是否需要 DS provider 调整（如 Issue #49 timeout 持续）
5. 其他需要 PL 裁决项

GM 推荐：<填写>

PL 裁决：<填写>

---

## 维护说明

- 本模板由 GM 在每个观察周期填充
- 报告完成后归档至 `docs/ops/observations/0.5-<period>.md`
- 模板本身保持空白（仅结构）
