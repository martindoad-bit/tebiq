# P0 Repair Pack v3 — 报告

**生成**：2026-05-01
**分支**：`content/p0-repair-pack-v3`（基于 `origin/content/intent-examples-gold-answer-v2`）
**任务性质**：QA Agent 对 production 跑了 100 条，P0 有 35 条。本轮专修这 35 条，不写新问题 / 不写长文章 / 每条 200-500 字。

---

## 35 条 P0 修复完成情况

### 11 条创始人重点要求（brief 列出）

| # | 主题 | P0 ID | 状态 |
|---|---|---|---|
| 1 | 经管转人文 | P0-01 | ✓ |
| 2 | 技人国离职 3 个月 | P0-02 | ✓ |
| 3 | 技人国换工作入管届出 | P0-03 | ✓ |
| 4 | 留学生毕业后未找到工作 | P0-04 | ✓ |
| 5 | 配偶离婚后是否能留 | P0-05 | ✓ |
| 6 | 特定技能换会社 | P0-06 | ✓ |
| 7 | 特定技能带家属 | P0-07 | ✓ |
| 8 | 资格外活动超时打工 | P0-08 | ✓ |
| 9 | 人文签便利店收银 | P0-09 | ✓ |
| 10 | 入管补材料期限赶不上 | P0-10 | ✓ |
| 11 | 不许可通知书怎么办 | P0-11 | ✓ |

### 24 条补充（基于已交付 v0/v1/v2 高频题反推）

| # | 主题 | P0 ID | 来源 |
|---|---|---|---|
| 12 | 公司休眠 → 个人年金 | P0-12 | GOLD V2-05 |
| 13 | 公司倒闭工作签 | P0-13 | GOLD V2-20 |
| 14 | 经管资本金不够 | P0-14 | GOLD V2-07 |
| 15 | 经管 2025/10/16 改正 | P0-15 | 新整理 |
| 16 | 经管事務所搬迁 | P0-16 | GOLD V2-16 |
| 17 | 永住带父母 | P0-17 | GOLD V2-12 |
| 18 | 永住直近 5 年纳税 | P0-18 | GOLD V2-10 |
| 19 | 公司没上社保 | P0-19 | GOLD V2-13 |
| 20 | 住民税晚交永住 | P0-20 | GOLD V2-14 |
| 21 | 14 日届出超期补办 | P0-21 | GOLD V2-17 |
| 22 | 离婚不满 3 年定住 | P0-22 | GOLD V2-18 |
| 23 | 高度人材永住 1 年 | P0-23 | GOLD V2-19 |
| 24 | 老板雇错签证我会被牵连 | P0-24 | GOLD V2-11 |
| 25 | 不法滞在自首 | P0-25 | 新整理（区分 3 路径）|
| 26 | DV 受害者特例 | P0-26 | 新整理（制度路径）|
| 27 | 在留期間更新被退回 | P0-27 | 新整理（補正 vs 不许可）|
| 28 | 特定技能 1 → 2 移行 | P0-28 | 新整理 |
| 29 | 帰化前 6 个月准备 | P0-29 | 新整理 |
| 30 | 父母短期滞在 90 日 | P0-30 | 新整理 |
| 31 | 搬家在留卡地址 | P0-31 | GOLD V2-15 |
| 32 | 永住放棄 vs 再入国 | P0-32 | 新整理（3 路径）|
| 33 | 怀孕补助 | P0-33 | 新整理（4 大补助）|
| 34 | 高额疗养费 | P0-34 | 新整理（限度额 + 多数該当）|
| 35 | 育成就労 2027 改正 | P0-35 | 新整理（経過措置）|

---

## 每条 7 字段结构

每条 P0 包含：

```yaml
query: "实际用户输入"
expected_intent: <intent slug>
why_current_wrong: |
  当前系统答案错在哪 — 通常是 答非所问 / 误命中相邻 intent / 含糊 / 过强
safe_answer_direction: |
  正确答案方向（不必是完整 gold answer，但必须给关键路径）
must_not_match: [<容易误命中的 intent>]
clarification_if_unsure: |
  系统不确定时应追问的问题（让用户提供更多信息）
gold_answer_if_possible: |
  如已有 GOLD V2 答案 → 直接引用 V2-XX
  如无 → 给短答案模板（≤150 字）
```

---

## P0 修复模式分类

### 模式 1：误命中（35 条中的主要模式）— 17 条
当前系统命中相邻 intent，答非所问。
解决：明确 must_not_match 负样本。
例：P0-01（经管转人文 → 误命中续签）/ P0-02（离职 3 月 → 误命中倒闭）/ P0-12（公司休眠年金 → 误命中经管影响）

### 模式 2：含糊回答 — 8 条
当前答案泛泛「不能简单回答」/「具体看个案」。
解决：给具体期限 + 数字 + 路径。
例：P0-15（経過措置 截止 2028/10/16）/ P0-23（70 点 / 80 点）/ P0-32（みなし再入国 1 年 + 再入国 5 年）

### 模式 3：过强回答 — 5 条
当前答案断言「会被取消」/「不可能」让用户恐慌。
解决：客观陈述 + 期限节点 + 路径。
例：P0-13（公司倒闭不立即取消）/ P0-21（14 日超期不立即取消）/ P0-24（雇主与雇员两条独立线）

### 模式 4：错误回答 — 4 条
当前答案给错误路径。
解决：先纠偏 + 真实路径。
例：P0-07（特定技能 1 号 不能带家属，2 号才可）/ P0-09（技人国 不能直接做便利店）/ P0-17（永住者带父母不行）

### 模式 5：缺失关键信息 — 1 条
当前答案缺核心要点。
例：P0-31（搬家不办的 4 后果）

---

## 给 CCA 的接入建议

### 1. 新建 `p0_repairs` 表

```sql
CREATE TABLE p0_repairs (
    p0_id                    text PRIMARY KEY,    -- P0-01 到 P0-35
    query                    text NOT NULL,
    expected_intent          text,
    why_current_wrong        text,
    safe_answer_direction    text,
    must_not_match           text[],
    clarification_if_unsure  text,
    gold_answer_if_possible  text,
    repair_pattern           text,                -- 误命中 / 含糊 / 过强 / 错误 / 缺失
    created_at               timestamptz,
    updated_at               timestamptz
);
```

### 2. Importer 路由

`docs/answer-repair/P0_REPAIR_PACK_V3.md` → 用 `## P0-XX` 切分 + yaml-parser → `p0_repairs` 表

### 3. Answer Engine 调试 / 自检流程

用 35 条 P0 query 跑当前系统，对照 `expected_intent`：
- 命中正确 → ✓
- 命中错误 / 答非所问 → 标记 + 用 must_not_match 调整
- 命中正确但答案差 → 用 safe_answer_direction 改 prompt template

目标：35 条 P0 全部 top-1 命中 → 95% 命中率作为 v3 release gate。

### 4. clarification_if_unsure 给用户

当 intent classifier 置信度 < 0.7 → 触发 clarification 问句（每条已写好）。

### 5. 与 v1/v2 的关系

| 数据层 | 命中场景 |
|---|---|
| **p0_repairs（本次）** | 35 条 P0 修复 + must_not_match 调试 |
| gold_answer_v2（v2）| 20 题最高 priority answer |
| benchmark_answer_gold（v1）| 10 GOLD |
| benchmark_overrides | 10 BM v2 QA |
| question_seeds | 100 答案 seed |

p0_repairs 是「调试 + 路由参照」，不一定有完整 gold answer — 重叠的 17 条直接引用 GOLD V2-XX。

---

## 重点修复说明

### P0-01 经管转人文（创始人重点）
**修复点**：当前系统误把「想换工作」当成「续签」或「公司休眠」回答。
**关键**：必须答 5 主线（接收公司 / 三领域 / 学历経歴 / 雇用合同 / 役員退任）+ 引 GOLD V2-01。

### P0-02 技人国离职 3 个月（创始人重点）
**修复点**：当前系统误把「个人离职」当成「公司倒闭」回答。
**关键**：3 个月节点 = 法定危险期 + 立即交届出 + 求职活動証明 + 可申特定活動延长。

### P0-04 留学生毕业后未找到工作（创始人重点）
**修复点**：当前系统误答「转技人国步骤」— 但用户问的是「能待多久」。
**关键**：「特定活動 6 ヶ月（卒業後の就職活動）」+ 大学推薦書 + 求职活動証明。

### P0-08 资格外活动超时打工（创始人重点）
**修复点**：当前系统答「不会立即被发现」误导。
**关键**：客观风险链 — 当下风险低 + 续签 / 永住时被查 + 立即停止。

### P0-10 入管补材料期限赶不上（创始人重点）
**修复点**：当前系统答「补完整材料」— 但用户的核心焦虑是「来不及」。
**关键**：「補正期限延長願」+ 先交部分 + 行政書士紧急介入。

---

## 边界

- ✗ 不写 300 条新问题（按 brief）
- ✗ 不写长文章（每条 200-500 字）
- ✓ 给 safe answer + 不确定写 clarification（按 brief）
- ✓ 给 must_not_match 负样本（按 brief）
- ✓ 重叠题直接引用 GOLD V2-XX（避免重复）

---

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化
- content/answer-copy-rewrite-v1：TOP 50 action_answer
- content/product-copy-v1：BIBLE + HOMEPAGE
- content/answer-copy-qa-v2：10 BM benchmark
- content/app-copy-final-v2：删冗词 77 处
- content/answer-gold-standard-v1：10 GOLD
- content/material-lists-v1：6 类签证 + 10 类材料
- content/intent-examples-gold-answer-v2：300 intent + 20 gold
- **content/p0-repair-pack-v3：35 条 P0 修复 + must_not_match 负样本**

---

🤖 by tebiq-knowledge-base skill / p0-repair-pack-v3
