# AI Handoff - CCB

最后更新: 2026-05-01（CCB content/p0-repair-pack-v3 完成）

## CCB(内容)状态

- 当前任务: P0 Repair Pack v3（35 条 P0 修复，不写新问题）
- 当前分支: `content/p0-repair-pack-v3`（基于 `origin/content/intent-examples-gold-answer-v2`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：QA Agent 跑 100 条，P0 有 35 条。本轮专修 P0，每条 200-500 字 + 给 safe answer + must_not_match 负样本。

### 新建文件

| 文件 | 内容 |
|---|---|
| `docs/answer-repair/P0_REPAIR_PACK_V3.md` | 35 条 P0 修复（每条 7 字段）|
| `docs/answer-repair/P0_REPAIR_PACK_V3_REPORT.md` | 报告（修复模式分类 + 接入建议）|

### 35 条 P0

11 条创始人重点（brief 列出）：
1. 经管转人文
2. 技人国离职 3 个月
3. 技人国换工作入管届出
4. 留学生毕业后未找到工作
5. 配偶离婚后是否能留
6. 特定技能换会社
7. 特定技能带家属
8. 资格外活动超时打工
9. 人文签便利店收银
10. 入管补材料期限赶不上
11. 不许可通知书怎么办

24 条补充（基于 v0/v1/v2 高频题）：公司休眠 / 公司倒闭 / 经管资本金 / 经管改正 / 经管搬迁 / 永住带父母 / 永住纳税 / 公司没社保 / 住民税晚交 / 14 日届出超期 / 离婚定住 / 高度人材 / 老板雇错 / 不法滞在自首 / DV / 補正退回 / 特定技能 1→2 / 帰化 / 父母短期 / 搬家在留卡 / 永住放棄 vs 再入国 / 怀孕补助 / 高额疗养 / 育成就労 2027

### 每条 7 字段

```yaml
query / expected_intent / why_current_wrong / safe_answer_direction /
must_not_match / clarification_if_unsure / gold_answer_if_possible
```

### 修复模式分类

- 模式 1：误命中（17 条）— 命中相邻 intent
- 模式 2：含糊（8 条）— 给具体期限 + 数字
- 模式 3：过强（5 条）— 客观陈述
- 模式 4：错误（4 条）— 先纠偏
- 模式 5：缺失（1 条）— 补关键信息

## 给 CCA 的待办

### 新 schema：`p0_repairs` 表

```sql
p0_id PRIMARY KEY  -- P0-01 到 P0-35
query / expected_intent / why_current_wrong / safe_answer_direction
must_not_match[] / clarification_if_unsure / gold_answer_if_possible
repair_pattern  -- 误命中 / 含糊 / 过强 / 错误 / 缺失
```

### Importer 路由

`docs/answer-repair/P0_REPAIR_PACK_V3.md` → `## P0-XX` 切分 → `p0_repairs` 表

### Answer Engine 调试流程

用 35 条 P0 query 跑当前系统：
- top-1 命中正确 → ✓
- 误命中 → 用 must_not_match 调整
- 命中但答差 → 用 safe_answer_direction 改 prompt template

**Release gate**：35 条 P0 top-1 命中率 ≥ 95%。

### clarification_if_unsure 触发条件

intent classifier 置信度 < 0.7 → 触发 clarification 问句（每条已写）。

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
