# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/product-copy-v1 完成）

## CCB(内容)状态

- 当前任务: Product Copy Bible + Answer Rewrite v2（建立产品文案规范 + 首页文案 + 客户转发版）
- 当前分支: `content/product-copy-v1`（基于 `origin/content/answer-copy-rewrite-v1`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付（5 个 work packages）

### WP1：PRODUCT_COPY_BIBLE.md（产品文案规范）

`docs/product-copy/PRODUCT_COPY_BIBLE.md` — 10 节规范

核心：「在日本遇到手续问题，TEBIQ 帮你整理下一步。」

禁用词清单：问 AI / 智能判断 / 秒懂 / 拒签概率 / 一定通过 / 一键解决 / 焦虑 / 让 X 变简单 / 等
推荐词清单：整理下一步 / 准备材料 / 通常 / 一般 / 需要先确认 / 需要专家确认的情况 / 等

### WP2：HOMEPAGE_COPY_V1.md（首页 3 版文案）

`docs/product-copy/HOMEPAGE_COPY_V1.md` — 3 版方向

| 版本 | hero | 推荐 |
|---|---|---|
| **A 情况入口** | 在日本遇到手续问题，先把情况说清楚 | **默认上线** |
| B 下一步导向 | 不知道下一步做什么时，先来 TEBIQ 整理 | A/B 候选 |
| C 文书 + 手续 | 日文文书和日本手续，先整理成下一步 | 拍照入口对比 |

每版 7 组件（hero / subtitle / input / placeholder / chips / tools / footer）。

### WP3：TOP 50 customer_facing_answer

50 / 50 全部加完。9 字段结构（含 customer_message ≤150 字客户经理转发版）。

| 文件 | TOP 50 | 高风险 |
|---|---|---|
| answer_seed_001-025 | 17 | 4 |
| answer_seed_026-050 | 13 | 6 |
| answer_seed_051-075 | 10 | 2 |
| answer_seed_076-100 | 10 | 4 |
| **合计** | **50** | **16** |

### WP4：Q032 办公室搬迁特别重写

按 brief 8 点全覆盖：
- 法務局 本店移転登記 **2 週間以内**
- 入管 所属機関等届出 **14 日以内**
- 税務 / 社保 / 雇用保険 異動届 **1 ヶ月以内**

### WP5：高风险 16 条严格处理

Q003 / Q004 / Q005 / Q024 / Q026 / Q029 / Q031 / Q036 / Q040 / Q050 / Q057 / Q065 / Q081 / Q091 / Q098 / Q099

统一 `conclusion: 这个问题不能简单回答` + `expert_trigger` 列 3 条具体条件 + `customer_message` 含「建议先和 [专家] 聊一下」

特殊处理：
- Q099：严格区分 出国命令 / 退去強制 / 在留特別許可 三独立路径
- Q091：雇主刑责 vs 雇员处分严格分线
- Q065：DV 制度路径，不情感化
- Q024：misconception，14 日 + 3 月两条死线

## 给 CCA 的接入建议

### codexUI 首页

**推荐默认：版本 A 情况入口**（最克制，最贴用户心智）

### CCA answer engine UI 三档渲染

```
if (Q in TOP 50):
    render customer_facing_answer.customer_message  # 首屏短答 ≤150 字
    expand → customer_facing_answer.* (8 字段)
elif (Q has first_screen_answer):
    render first_screen_answer                       # TOP 30
else:
    render summary + sections                        # 其他

if (answer_type in [needs_expert, misconception]):
    强制展示 why_not_simple_answer + expert_handoff CTA → ¥9,800
```

### 客户经理 CRM

直接调 `customer_facing_answer.customer_message`（150 字以内微信版可复制粘贴）。

### Schema 增量

```sql
customer_facing_answer  jsonb  -- {conclusion, applies_when, do_today, where_to_go,
                               --  documents[], timing, consequences,
                               --  expert_trigger, customer_message}
```

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q 标注 + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed + report
- content/answer-seed-v1：v0 强化版（aliases 837 / test_queries 350 / TOP30 first_screen / 26 高风险题透明度）
- content/answer-copy-rewrite-v1：v1 答案重写（TOP 50 + Q032 重点 + 16 条高风险）
- **content/product-copy-v1：PRODUCT_COPY_BIBLE + HOMEPAGE_COPY_V1（3 版） + TOP 50 customer_facing_answer + customer_message ≤150 字**
