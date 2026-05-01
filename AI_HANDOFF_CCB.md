# AI Handoff - CCB

最后更新: 2026-05-01（CCB content/intent-examples-gold-answer-v2 完成）

## CCB(内容)状态

- 当前任务: Intent Examples + Gold Answer v2（300 条真实问法 + 20 gold answer + 特别修 3 题）
- 当前分支: `content/intent-examples-gold-answer-v2`（基于 `origin/content/answer-gold-standard-v1`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：当前最大问题不是答案数量，而是系统理解错问题。本轮重点提供训练数据 + 关键题金标准。

### 新建文件

| 文件 | 内容 |
|---|---|
| `docs/intent-training/REAL_INTENT_EXAMPLES_PART1_75.md` | Q001-Q075 转换 + HR + 跨签证 |
| `docs/intent-training/REAL_INTENT_EXAMPLES_PART2_75.md` | Q076-Q150 公司休眠 + 资本金 + 材料 + 永住准备 |
| `docs/intent-training/REAL_INTENT_EXAMPLES_PART3_75.md` | Q151-Q225 刚到日本 + 年金 / 税 / 社保 + 育儿 |
| `docs/intent-training/REAL_INTENT_EXAMPLES_PART4_75.md` | Q226-Q300 文书 + 婚育 + 紧急 + 出国 + 复合 |
| `docs/intent-training/INTENT_EXAMPLES_GOLD_ANSWER_V2_REPORT.md` | 报告 |
| `docs/answer-gold-standard/GOLD_ANSWER_V2.md` | 20 个 V2 gold answer |

### 数据规模

- **300 条** intent examples（每条 8 字段）
- **20 个** gold answer（每条 6 字段，含 ≤150 字复制给客户）
- 约 80-100 个唯一 intent slug

### 特别修 3 题

★ V2-01 経営・管理 → 技人国（5 主线全覆盖）
★ V2-05 公司休眠 → 国民年金（5 主线全覆盖）
★ V2-07 経営・管理 资本金不够（6 主线全覆盖）

## 给 CCA 的待办

### Repo loader 优先

本轮 CCA 先用 repo loader 接入，不建表、不跑生产 migration。

### 后续 schema 建议

```sql
-- intent classifier 训练 + 评估
CREATE TABLE intent_examples (
    example_id, query, expected_intent, domain,
    current_status, target_status, subject, template, must_not_match[]
);

-- gold answer v2（priority 最高）
CREATE TABLE gold_answer_v2 (
    gold_id, query, intent, template,
    most_urgent_two[], steps[], timing, consequences[],
    customer_message, why_this_template, must_not_answer[]
);
```

### Answer Engine 命中 priority（更新）

```txt
1. gold_answer_v2 (20 题)
2. benchmark_answer_gold (10 GOLD v1)
3. benchmark_overrides (10 BM v2 QA)
4. question_seeds (100 答案 seed v1)
5. articles 知识库
```

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化（aliases 837 / test_queries 350）
- content/answer-copy-rewrite-v1：TOP 50 action_answer
- content/product-copy-v1：BIBLE + HOMEPAGE
- content/answer-copy-qa-v2：10 BM benchmark
- content/app-copy-final-v2：删冗词 77 处
- content/answer-gold-standard-v1：10 GOLD
- content/material-lists-v1：6 类签证 + 10 类常见材料
- **content/intent-examples-gold-answer-v2：300 intent examples + 20 gold + 特别修 3 题**
