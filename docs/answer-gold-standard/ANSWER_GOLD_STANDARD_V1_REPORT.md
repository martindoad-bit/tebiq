# Answer Gold Standard v1 — 报告

**生成**：2026-05-01
**分支**：`content/answer-gold-standard-v1`（基于 `origin/content/answer-copy-rewrite-v1`）
**任务性质**：建立 10 个 benchmark 的金标准答案，让 CCA answer engine 有明确对照。

---

## 10 个 gold answer 完成情况

| # | GOLD ID | Question | answer_type | risk_level | requires_review |
|---|---|---|---|---|---|
| 1 | GOLD-01 | 公司休眠了要不要交国民年金？ | workflow | medium | false |
| 2 | GOLD-02 | 办公室搬迁要做哪些手续？ | workflow | medium | false |
| 3 | GOLD-03 | 永住者能不能带父母来日本养老？ | misconception | high | true |
| 4 | GOLD-04 | 老板雇了签证不符的人我会不会受影响？ | misconception | high | true |
| 5 | GOLD-05 | 特定技能 1 号能不能转工作签？ | decision_card | medium | false |
| 6 | GOLD-06 | 住民税晚交会影响永住吗？ | workflow | medium | false |
| 7 | GOLD-07 | 公司没有给我上社保怎么办？ | decision_card | high | true |
| 8 | GOLD-08 | 搬家后在留卡地址要不要改？ | workflow | low | false |
| 9 | GOLD-09 | 経営・管理 资本金不够怎么办？ | decision_card | high | true |
| 10 | GOLD-10 | 留学生能不能转人文签？ | workflow | medium | false |

每条 18 字段全部完整（question / aliases / intent_keywords / must_not_match / answer_type / risk_level / applies_when / does_not_apply_when / 最紧的两件 / 步骤 / 去哪办 / 要带什么 / 期限 / 不做会怎样 / 要找专家的情况 / 复制给客户 / source_hint / requires_review）。

---

## Q1（GOLD-01）公司休眠 → 国民年金 修正说明

### 修正点

之前 v0/v1 答案误把「经管续签」当主答案。本轮改成 **个人年金义务**为主。

### 必含的 6 个关键概念（全部覆盖 ✓）

- ✓ 公司休眠不等于个人年金义务消失（在「最紧的两件」第 1 行）
- ✓ 先看是否还有厚生年金覆盖（在 applies_when）
- ✓ 若资格丧失 → 国民年金第 1 号（在「步骤」第 3 步 + 复制给客户）
- ✓ 国民健康保険（在「步骤」第 3 步 + 复制给客户）
- ✓ 资格丧失日（在「步骤」第 1 步 + 「期限」起算点）
- ✓ 区役所 / 年金事务所（在「去哪办」第 1 + 第 2 项）

### 副答处理

「要找专家的情况」最后 1 项：「公司休眠后你的 経営・管理 在留資格 是否影响 → 行政書士（这是另一条线）」

把「经管签证影响」明确标为「另一条线」，不抢主答。

### must_not_match 关键词

```
- 经营管理签证还能续吗
- 经管 改正 既存
- 在留资格 取消程序
- 经营管理 续签
```

如用户 query 含这些词 → answer engine 应避开 GOLD-01，改命中其他经管类问题。

---

## Q9（GOLD-09）资本金不够 修正说明

### 修正点

之前的答案常误把「资本金多少合适」当作主答。本轮明确改成 **「不够怎么办」** 的 action 答案。

### 必含的 7 个关键概念（全部覆盖 ✓）

- ✓ 先区分新申请 / 续签 / 增资前 / 决算后（在「最紧的两件」第 1 行 + 「步骤」第 1 步）
- ✓ 增资（路径 A + B 在「步骤」第 4 步）
- ✓ 资金来源（在「要带什么」+ 「要找专家的情况」第 1 项）
- ✓ 借款（路径 C 在「步骤」第 4 步，明确「不算资本金」）
- ✓ 事业计划（在「要带什么」第 2 项）
- ✓ 新规（経過措置 + 3000 万 + 截止 2028/10/16）
- ✓ 专家复核（「要找专家的情况」列 4 条触发）

### 4 路径明示

| 路径 | 适用阶段 | 注意 |
|---|---|---|
| A 自己增资 | 新申请 / 续签前 | 资金来源说明 + 商業登記 |
| B 亲属 / 投资人増資 | 新申请 / 增资前 | 出资比率 + 経営権影响 |
| C 借款 | 决算后 / 资本金不变 | **不算資本金** |
| D 在留資格変更 | 资本金 / 常勤 都不达 | 高度専門職 / 技人国 等 |

### must_not_match 关键词

```
- 资本金 多少合适
- 公司休眠
- 办公室搬迁
```

避免命中「问标准」而非「问 action」的 query。

---

## Q2（GOLD-02）办公室搬迁 表格化说明

### 表格化方式

「步骤」字段 用 markdown 表格 + 5 列：

| 顺序 | 做什么 | 去哪办 | 期限 | 要带什么 |
|---|---|---|---|---|
| 1 | 取締役会 / 株主総会 决议本店所在地変更 | 公司内部 | 决议日即日 | 議事録 |
| 2 | 申請本店移転登記 | 法務局 | **2 週間内** | 議事録 + 登録免許税 |
| 3 | 提交「所属機関等届出書」 | 出入国在留管理庁 | **14 日内** | 届出書 |
| 4 | 提交 異動届出書 | 税務署 + 都道府県 + 市町村 | 1 ヶ月内 | 異動届 |
| 5 | 提交 適用事業所変更届 | 年金事務所 | 5 日内 | 変更届 |
| 6 | 提交 事業主事業所変更届 | ハローワーク | 翌日から 10 日内 | 変更届 |
| 7 | 銀行 / 各種許認可 / 取引先 同步更新 | 各机关 + 取引先 | 各自规定 | 各自要求 |

### 必含的 7 个机关 + 关键概念（全部覆盖 ✓）

- ✓ 法務局（步骤 2 + 去哪办 + 不做会怎样 過料 100 万円）
- ✓ 税务署（步骤 4 + 去哪办）
- ✓ 入管（步骤 3 + 去哪办）
- ✓ 年金事务所 / ハローワーク（步骤 5-6 + 去哪办）
- ✓ 租赁合同（要带什么 第 2 项 + 「法人名义 + 事業使用可」）
- ✓ 办公室照片（要带什么 第 3 项 + 「入管立证用」）
- ✓ 本店所在地（最紧的两件 + 步骤 1 + 「不办 → 過料 100 万円」）

---

## CCA 接入建议

### 新建 `benchmark_answer_gold` 表

```sql
CREATE TABLE benchmark_answer_gold (
    gold_id                     text PRIMARY KEY,    -- GOLD-01 到 GOLD-10
    question                    text NOT NULL,
    aliases                     text[],
    intent_keywords             text[],
    must_not_match              text[],
    answer_type                 text,                -- workflow / decision_card / misconception
    risk_level                  text,                -- low / medium / high
    applies_when                text[],
    does_not_apply_when         text[],
    most_urgent_two             text[],              -- 最紧的两件
    steps                       text,                -- 步骤（含 markdown 表格 GOLD-02）
    where_to_go                 text[],              -- 去哪办
    documents                   text[],              -- 要带什么
    timing                      text,                -- 期限
    consequences                text[],              -- 不做会怎样
    expert_trigger              text[],              -- 要找专家的情况
    customer_message            text,                -- 复制给客户 ≤150 字
    source_hint                 text[],
    requires_review             boolean,
    created_at                  timestamptz,
    updated_at                  timestamptz
);
```

### Importer 路由

`docs/answer-gold-standard/BENCHMARK_ANSWER_GOLD_V1.md` → 用 `## GOLD-XX` heading 切分 + yaml-parser → `benchmark_answer_gold` 表

### Answer Engine 路由（priority）

```python
def match(query):
    # 1. 先查 benchmark_answer_gold（强命中）
    for gold in benchmark_answer_gold:
        has_intent = any(kw in query for kw in gold.intent_keywords)
        has_must_not = any(kw in query for kw in gold.must_not_match)
        if has_intent and not has_must_not:
            return gold  # 命中 gold standard
    # 2. 退回 benchmark_overrides 表（v2 QA 10 个 BM）
    # 3. 退回 question_seeds 表（v1 100 条）
    return fallback_match(query)
```

### 前端渲染 — App 文案 v2 final 集成

按 `ANSWER_APP_COPY_V2.md` 的 7 个 section 渲染：

- 最紧的两件 → 取 `most_urgent_two` 数组
- 步骤 → 取 `steps`（GOLD-02 渲染 markdown 表格）
- 要带什么 → 取 `documents`
- 期限 → 取 `timing`
- 不做会怎样 → 取 `consequences`
- 要找专家的情况 → 取 `expert_trigger`
- 来源与说明 → 取 `source_hint`
- 底部按钮「复制给客户」 → 取 `customer_message`

### 复制给客户 文案规范

**全部 10 条 customer_message 已遵守**：
- ✓ ≤150 字
- ✓ 不出现 source_grade
- ✓ 不出现 answer_level / risk_level
- ✓ 不出现内部字段名
- ✓ 不出现「这个问题不能简单回答」
- ✓ 高风险题（GOLD-03/04/07/09）柔和但明确，引导专家
- ✓ 微信对话语气 + 中日混合术语保留

---

## 哪些题必须人工复核

`requires_review: true` 的 4 题：

| GOLD ID | 主题 | 复核点 |
|---|---|---|
| GOLD-03 | 永住带父母 | 「老親扶養」实务通过率 个別差异 + 多数行政書士不接此类案件 → 需有 实绩 行政書士 复核「2 号子女 / 母国无亲属」立证 |
| GOLD-04 | 老板雇错签证 | 「不法就労助長罪」共同正犯认定 + 雇员法律责任边界 → 需弁護士复核（区分役員 / 採用担当 / 一般员工 三层风险）|
| GOLD-07 | 公司没上社保 | 「补缴 + 経緯書」永住申请实绩 → 需行政書士 + 社労士复核（補缴流程 + 公司不配合时弁護士介入时机）|
| GOLD-09 | 资本金不够 | 「跨境ODI + 反洗钱」中国侧政策频繁变化 + 経過措置 細則 → 需有跨境实绩的行政書士 + 跨境律师复核 |

`requires_review: false` 的 6 题制度路径稳定，可直接上线（GOLD-01 / GOLD-02 / GOLD-05 / GOLD-06 / GOLD-08 / GOLD-10）。

---

## 与既有数据的关系

| 数据层 | 文件 | 命中优先级 |
|---|---|---|
| **gold standard**（10 题）| `docs/answer-gold-standard/BENCHMARK_ANSWER_GOLD_V1.md` | **1（最高）** |
| benchmark overrides v2 QA（10 题）| `docs/answer-seed/benchmark_overrides.md` | 2（次高）|
| answer seed v1 100 条 | `docs/answer-seed/answer_seed_*.md` | 3（次次高）|
| 知识库 articles（其他）| `docs/knowledge-seed/*.md` | 4（最低 fallback） |

CCA 实现时按 priority 顺序匹配，第 1 层命中即返回。

---

## 边界

- **不增删** 100 条 v1 answer seed
- **不修改** v0/v1/v2 任何已交付字段
- **新建** `benchmark_answer_gold` 作为 priority 最高 override 层
- 10 条 gold answer 全部 **复制给客户** ≤150 字
- 4 条 `requires_review: true` 必须人工复核才上线高级展示
- 不写「保证 / 一定 / 拒签概率 / 赶紧委托 / 我们可以帮你办」

---

🤖 by tebiq-knowledge-base skill / answer-gold-standard-v1
