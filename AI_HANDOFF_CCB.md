# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/answer-copy-qa-v2 完成）

## CCB(内容)状态

- 当前任务: Answer Copy QA v2（只修 10 个 benchmark 答案）
- 当前分支: `content/answer-copy-qa-v2`（基于 `origin/content/answer-copy-rewrite-v1`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：100 位测试指出 10 个 benchmark 答案质量不稳定。本轮**只修这 10 个 benchmark**，不增删 100 条 / 不动其他答案。

### 新建文件

| 文件 | 内容 |
|---|---|
| `docs/answer-seed/benchmark_overrides.md` | 10 个 benchmark 最终标准答案（19 字段 schema） |
| `docs/answer-seed/ANSWER_COPY_QA_V2_REPORT.md` | 修改摘要 + 重点修正说明 + must_match 规则建议 |

### 10 个 benchmark

| BM | 主题 | 重点修正 |
|---|---|---|
| BM01 | 公司休眠 → 国民年金 | **重写**：主答个人年金（不是签证）|
| BM02 | 办公室搬迁 | **表格化**：7 步 5 列 |
| BM03 | 永住直近 5 年纳税 | 标准 |
| BM04 | 永住者带父母 | misconception 表格化 |
| BM05 | 14 日届出 超期 | risk_chain |
| BM06 | 公司倒闭在留资格 | misconception 14 日 + 3 月 |
| BM07 | 经管 2025/10/16 改正 | decision_card 4 状态 |
| BM08 | 搬家在留卡地址 | **样板答案**简洁版 |
| BM09 | 经管资本金不够 | **重写**：4 路径表格 |
| BM10 | 离婚不满 3 年定住 | needs_expert 3 例外 |

## 给 CCA 的待办

### 新 schema：`benchmark_overrides` 表

```sql
benchmark_id              text PRIMARY KEY  -- BM01-BM10
question / aliases / must_match_keywords / must_not_match_keywords
answer_type / answer_level
conclusion / applies_when / do_now / where_to_go / how_to_do
documents_needed / deadline_or_timing / consequences
expert_handoff / customer_message / source_hint
requires_review / review_notes
```

### Importer 路由

`docs/answer-seed/benchmark_overrides.md` → 用 `## BMxx` 切分 + yaml-parser → `benchmark_overrides` 表

### Answer Engine 路由（priority）

```python
def match(query):
    # 1. 先查 benchmark_overrides（强命中规则）
    for bm in benchmark_overrides:
        has_must_match = any(kw in query for kw in bm.must_match_keywords)
        has_must_not = any(kw in query for kw in bm.must_not_match_keywords)
        if has_must_match and not has_must_not:
            return bm
    # 2. 不命中退回 question_seeds（v1 100 条）
    return fallback_match(query)
```

### 已识别冲突 case

- 「公司休眠 经管签证还能续吗」 → BM01 + BM07 提示选择
- 「资本金 3000 万 300 万够不够」 → BM07
- 「资本金不到 3000 万 怎么办」 → BM09（不是 BM07/Q047）
- 「公司倒闭 + 年金」 → BM06 + BM01 提示选择
- 「办公室搬迁 + 在留卡地址」 → BM02 + BM08 提示选择

### 前端渲染

命中 benchmark 时：
- 优先展示 `customer_message`（短答）
- 展开 `do_now` + `where_to_go` + `how_to_do` 表格（BM02 / BM07 / BM09 含表格）
- BM04 / BM06 / BM07 / BM09 / BM10 强制展示 `expert_handoff` CTA → ¥9,800 咨询

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化（aliases 837 / test_queries 350 / TOP30 / 26 高风险）
- content/answer-copy-rewrite-v1：TOP 50 action_answer + Q032 重点
- content/product-copy-v1：BIBLE + HOMEPAGE 3 版 + TOP 50 customer_facing_answer
- **content/answer-copy-qa-v2：10 个 benchmark 最终标准答案 + must_match 规则**
