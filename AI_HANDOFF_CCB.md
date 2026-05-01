# AI Handoff - CCB

最后更新: 2026-05-01（CCB content/answer-gold-standard-v1 完成）

## CCB(内容)状态

- 当前任务: Answer Gold Standard v1（10 个 benchmark 金标准答案）
- 当前分支: `content/answer-gold-standard-v1`（基于 `origin/content/answer-copy-rewrite-v1`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：建立 10 个 benchmark 的金标准答案，让 CCA answer engine 有明确对照。不写新问题 / 不扩展 100 条 / 不写长文章。

### 新建文件

| 文件 | 用途 |
|---|---|
| `docs/answer-gold-standard/BENCHMARK_ANSWER_GOLD_V1.md` | 10 个 GOLD answer（每题 18 字段）|
| `docs/answer-gold-standard/ANSWER_GOLD_STANDARD_V1_REPORT.md` | 修改摘要 + Q1/Q9 修正说明 + Q2 表格化 + CCA 接入 |

### 10 个 GOLD answer

| GOLD ID | 主题 | risk_level | requires_review |
|---|---|---|---|
| GOLD-01 | 公司休眠 → 国民年金 | medium | false |
| GOLD-02 | 办公室搬迁 | medium | false |
| GOLD-03 | 永住带父母 | high | **true** |
| GOLD-04 | 老板雇错签证 | high | **true** |
| GOLD-05 | 特定技能 1 号 → 工作签 | medium | false |
| GOLD-06 | 住民税晚交 + 永住影响 | medium | false |
| GOLD-07 | 公司没上社保 | high | **true** |
| GOLD-08 | 搬家在留卡地址 | low | false |
| GOLD-09 | 経営・管理 资本金不够 | high | **true** |
| GOLD-10 | 留学转工作签 | medium | false |

每题 18 字段：
question / aliases / intent_keywords / must_not_match / answer_type / risk_level /
applies_when / does_not_apply_when / 最紧的两件 / 步骤 / 去哪办 / 要带什么 /
期限 / 不做会怎样 / 要找专家的情况 / 复制给客户（≤150 字）/ source_hint / requires_review

### 重点修正

**GOLD-01 公司休眠 → 国民年金**：
- ✓ 主答个人年金义务（不是签证）
- ✓ 经管签证副答标记为「另一条线」

**GOLD-09 经管资本金不够**：
- ✓ 4 路径表格化（增资 / 借款 / 计划 / 変更）
- ✓ must_not_match 含「资本金 多少合适」避开 Q047

**GOLD-02 办公室搬迁**：
- ✓ 步骤字段用 markdown 5 列表格
- ✓ 7 个机关 + 7 个关键概念全覆盖

## 给 CCA 的待办

### 新 schema：`benchmark_answer_gold` 表（priority 最高）

```sql
gold_id PRIMARY KEY  -- GOLD-01 到 GOLD-10
question / aliases / intent_keywords / must_not_match
answer_type / risk_level
applies_when / does_not_apply_when
most_urgent_two / steps / where_to_go / documents
timing / consequences / expert_trigger
customer_message / source_hint / requires_review
```

### Importer 路由

`docs/answer-gold-standard/BENCHMARK_ANSWER_GOLD_V1.md` → 用 `## GOLD-XX` 切分 + yaml-parser → `benchmark_answer_gold` 表

### 命中 priority

```
1. benchmark_answer_gold (10 GOLD)        ← 本次新增 优先级最高
2. benchmark_overrides (10 BM v2 QA)      ← 已有
3. question_seeds (100 答案 seed)         ← 已有
4. articles 知识库其他                    ← fallback
```

### 前端渲染

按 v2 final 7 个 section 名（最紧的两件 / 步骤 / 要带什么 / 期限 / 不做会怎样 / 要找专家的情况 / 来源与说明）+ 底部按钮「复制给客户」。

GOLD-02 步骤含 markdown 表格 → 前端需支持 markdown table 渲染。

### 复制给客户文案规范

10 条全部 ≤150 字 + 不出现内部字段名 / source_grade / 「这个问题不能简单回答」+ 高风险题柔和明确。

### 必须人工复核 4 题

GOLD-03 / GOLD-04 / GOLD-07 / GOLD-09 — 上线高级展示前需行政書士 / 弁護士 / 社労士 复核。

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化（aliases 837 / test_queries 350 / TOP30 / 26 高风险）
- content/answer-copy-rewrite-v1：TOP 50 action_answer + Q032 重点
- content/product-copy-v1：BIBLE + HOMEPAGE 3 版 + customer_facing_answer
- content/answer-copy-qa-v2：10 个 BM benchmark + must_match 规则
- content/app-copy-final-v2：APP_COPY_FINAL + 删冗词 77 处
- **content/answer-gold-standard-v1：10 个 GOLD 金标准答案 + 4 条必须复核**
