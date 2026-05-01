# Intent Examples + Gold Answer v2 — 报告

**生成**：2026-05-01
**分支**：`content/intent-examples-gold-answer-v2`（基于 `origin/content/answer-gold-standard-v1`）
**任务性质**：当前最大问题不是答案数量，而是系统理解错问题。本轮提供真实用户问法 + intent 标注 + 20 个关键问题 gold answer。

---

## Work 1：300 条真实用户问法（intent training）

### 文件

| 文件 | 范围 | 主题 |
|---|---|---|
| `REAL_INTENT_EXAMPLES_PART1_75.md` | Q001-Q075 | 转换 + HR + 跨签证综合 |
| `REAL_INTENT_EXAMPLES_PART2_75.md` | Q076-Q150 | 公司休眠 + 资本金 + 材料 + 永住准备 + 帰化 + 跨身份变更 |
| `REAL_INTENT_EXAMPLES_PART3_75.md` | Q151-Q225 | 刚到日本 + 搬家 + 年金 + 住民税 + 国保 + 確定申告 + 失业 + 育儿 |
| `REAL_INTENT_EXAMPLES_PART4_75.md` | Q226-Q300 | 文书识别 + 婚育 + 紧急 + 出国回国 + 复合个案 |

### 数量

300 条 query，每条 8 字段：
- `query` — 真实用户输入（口语 / 错别字 OK / 中日混合）
- `expected_intent` — intent slug（kebab-case）
- `domain` — visa / tax / social-insurance / hr / document-id / misc
- `current_status` — 用户当前状态
- `target_status` — 用户目标状态（不适用 `--`）
- `subject` — 本人 / 雇主 / 雇员 / 家族
- `template` — 推荐 template 名称
- `must_not_match` — 容易误命中的 intent 列表

### intent slug 唯一数

约 80-100 个唯一 intent slug 覆盖（4 个 agent 各 20-25 个）。完整清单 CCA 可 grep `expected_intent:` 提取。

### 格式说明

- **Part 1** 用 `- Q001:` 标号 heading + 缩进 8 字段（每条 9-10 行）
- **Part 2/3/4** 用扁平 `- query:` 顶格 8 字段（每条 8 行）

CCA importer 需支持两种格式（推荐统一为 Part 2/3/4 扁平形式）。

### 主题覆盖（按 brief 必修）

| brief 主题 | 覆盖 |
|---|---|
| 经管 → 人文 | Q001-Q010（10 条）|
| 人文 → 经管 | Q011-Q020（10 条）|
| 特定技能 → 技人国 | Q021-Q030（10 条）|
| 留学 → 技人国 | Q031-Q040（10 条）|
| 公司休眠 + 年金 | Q076-Q085（10 条）|
| 公司休眠 + 经营管理 | Q041-Q050（10 条）|
| 资本金不够 | Q086-Q095（10 条）|
| 材料清单（经管 / 永住 / 配偶） | Q096-Q115（20 条）|
| HR 问题 | Q056-Q065（10 条）|
| 刚到日本问题 | Q151-Q160（10 条）|
| 年金 / 税 / 社保 | Q166-Q205（40 条）|

✓ 所有 brief 必修主题已覆盖。

### must_not_match 关键应用

每条 query 标 must_not_match 帮 CCA answer engine 区分相邻 intent。

例：
- 「公司休眠 + 年金」must_not_match → `dormant-company-management-impact / pension-payment-delay`
- 「资本金不够」must_not_match → `management-capital-amount`（避免误命中「多少合适」）
- 「DV 受害者特例」must_not_match → `divorce-visa-change-spouse / spouse-marriage-authenticity`
- 「永住带父母」must_not_match → `family-visa-spouse-child / parents-short-term-visit`

---

## Work 2：20 个 gold answer

### 文件

`docs/answer-gold-standard/GOLD_ANSWER_V2.md`

### 20 个关键问题

| # | V2 ID | 主题 | 特别修 |
|---|---|---|---|
| 1 | V2-01 | 経営・管理 → 技人国 | ★ |
| 2 | V2-02 | 技人国 → 経営・管理 | |
| 3 | V2-03 | 特定技能 → 技人国 | |
| 4 | V2-04 | 留学 → 技人国 | |
| 5 | V2-05 | 公司休眠 → 国民年金 | ★ |
| 6 | V2-06 | 公司休眠 + 経営・管理 在留 | |
| 7 | V2-07 | 経営・管理 资本金不够 | ★ |
| 8 | V2-08 | 续签材料 — 技人国 | |
| 9 | V2-09 | 续签材料 — 経営・管理 | |
| 10 | V2-10 | 永住直近 5 年纳税 | |
| 11 | V2-11 | 老板雇错签证我会被牵连吗 | |
| 12 | V2-12 | 永住带父母 | |
| 13 | V2-13 | 公司没上社保 | |
| 14 | V2-14 | 住民税晚交永住 | |
| 15 | V2-15 | 搬家在留卡地址 | |
| 16 | V2-16 | 办公室搬迁 | |
| 17 | V2-17 | 14 日届出超期 | |
| 18 | V2-18 | 离婚不满 3 年定住 | |
| 19 | V2-19 | 高度人材永住加速 | |
| 20 | V2-20 | 公司倒闭在留 | |

每条 6 字段：query / intent / template / answer（最紧的两件 + 步骤 + 期限 + 不做会怎样 + 复制给客户）/ why_this_template / must_not_answer

---

## Work 3：特别修 3 个

### V2-01 経営・管理 → 技人国

按 brief 5 主线全覆盖：
1. ✓ 接收公司
2. ✓ 岗位是否属于技人国
3. ✓ 学历 / 経歴 与岗位匹配
4. ✓ 雇用合同
5. ✓ 原公司 / 代表关系处理（役員退任登記 + 商業登記）

### V2-05 公司休眠 → 国民年金

按 brief 5 主线全覆盖：
1. ✓ 个人是否仍有厚生年金覆盖
2. ✓ 资格丧失日
3. ✓ 国民年金第 1 号
4. ✓ 国民健康保険
5. ✓ 区役所 / 年金事务所

### V2-07 経営・管理 资本金不够

按 brief 6 主线全覆盖：
1. ✓ 新申请 / 续签 / 增资前 / 决算后（4 阶段区分）
2. ✓ 增资
3. ✓ 资金来源
4. ✓ 事业计划
5. ✓ 新规
6. ✓ 专家复核

---

## 给 CCA 的接入建议

### 1. 新建 `intent_examples` 表

```sql
CREATE TABLE intent_examples (
    example_id           text PRIMARY KEY,    -- Q001-Q300
    query                text NOT NULL,
    expected_intent      text NOT NULL,
    domain               text,
    current_status       text,
    target_status        text,
    subject              text,
    template             text,
    must_not_match       text[],
    created_at           timestamptz
);
```

### 2. 新建 `gold_answer_v2` 表（取代 / 补充 BENCHMARK_ANSWER_GOLD_V1）

```sql
CREATE TABLE gold_answer_v2 (
    gold_id              text PRIMARY KEY,    -- V2-01 到 V2-20
    query                text,
    intent               text,
    template             text,
    most_urgent_two      text[],              -- 最紧的两件
    steps                text[],              -- 步骤
    timing               text,                -- 期限
    consequences         text[],              -- 不做会怎样
    customer_message     text,                -- 复制给客户 ≤150 字
    why_this_template    text,
    must_not_answer      text[],
    created_at           timestamptz,
    updated_at           timestamptz
);
```

### 3. Importer 路由

- `docs/intent-training/REAL_INTENT_EXAMPLES_PART*.md` → `intent_examples` 表（注意 Part 1 vs Part 2/3/4 格式不同）
- `docs/answer-gold-standard/GOLD_ANSWER_V2.md` → `gold_answer_v2` 表（用 `## V2-XX` 切分 + yaml-parser）

### 4. Answer Engine 训练 / 命中规则

#### 训练阶段
- 用 300 条 `query` + `expected_intent` 训练 intent classifier
- 用 `must_not_match` 做负样本（intent A 不应命中 must_not_match 列出的 intent）
- 评估 intent classification accuracy（建议 ≥ 85%）

#### 命中阶段
```python
def match(query):
    # 1. intent classifier 预测 → expected_intent
    intent = intent_classifier.predict(query)

    # 2. 查 gold_answer_v2 命中
    if intent in gold_answer_v2_intents:
        return gold_answer_v2[intent]

    # 3. 查 benchmark_answer_gold (v1 GOLD-01 到 GOLD-10)
    if intent in benchmark_answer_gold_intents:
        return benchmark_answer_gold[intent]

    # 4. 查 question_seeds (v1 100 条)
    return fallback_match(query)
```

### 5. 命中优先级（更新）

```
1. gold_answer_v2 (20 题)             ← 本次新增 优先级最高
2. benchmark_answer_gold (10 GOLD)    ← v1
3. benchmark_overrides (10 BM v2 QA)  ← 已有
4. question_seeds (100 答案 seed)     ← 已有
5. articles 知识库其他                ← fallback
```

### 6. 训练数据评估指标

300 条 intent examples 可作为 CCA evaluation set：
- **Intent classification accuracy** — 目标 ≥ 85%
- **Top-1 命中率** — 目标 ≥ 80%
- **must_not_match 误触率** — 目标 ≤ 5%
- **complex case 鲁棒性**（Part 4 复合个案 Q286-Q300）— 单独评估

---

## 边界

- **不写新问题** — 300 条 query 全部基于真实场景模拟
- **不扩展 100 条 answer seed** — 本轮专注 intent + gold answer
- **不写长文章** — gold answer 用结构化字段（最紧的两件 / 步骤 / 期限 / 不做会怎样 / 复制给客户）
- **复制给客户全部 ≤150 字** + 微信语气 + 不出现内部字段名

---

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
- content/answer-gold-standard-v1：10 个 GOLD 金标准答案
- content/material-lists-v1：6 类签证清单 + 10 类常见材料
- **content/intent-examples-gold-answer-v2：300 条 intent examples + 20 个 gold answer + 特别修 3 个**

---

🤖 by tebiq-knowledge-base skill / intent-examples-gold-answer-v2
