# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/app-copy-final-v2 完成）

## CCB(内容)状态

- 当前任务: App Copy Final v2（不写文案，删文案）
- 当前分支: `content/app-copy-final-v2`（基于 `origin/content/answer-copy-qa-v2`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：TEBIQ 是 App，不是内容页。删 v1 长 H1 / 解释型文案，建立 App 文案准则。

### 4 个新建文件 + 5 个文件冗词清理

| 文件 | 用途 |
|---|---|
| `docs/product-copy/APP_COPY_FINAL_V2.md` | App 文案准则（核心规则 + 禁用词 + 允许词）|
| `docs/product-copy/HOMEPAGE_APP_COPY_V2.md` | 首页最终文案（取代 v1 三版方向）|
| `docs/product-copy/ANSWER_APP_COPY_V2.md` | 答案页最终 section 名 + 句首替换 |
| `docs/product-copy/APP_COPY_FINAL_V2_REPORT.md` | 报告 |
| 5 个 answer_seed*.md + benchmark_overrides.md | 删 77 处冗词 |

### 最终首页文案

```
TEBIQ
材料有问题，问 TEBIQ
你的问题
[厚生年金截止日期是什么时候？]
[ 看下一步 ]
最近常问 / 拍照 / 续签检查 / 提醒
```

### 最终答案页 section 名（7 个 + 底部按钮）

```
最紧的两件
步骤
要带什么
期限
不做会怎样
要找专家的情况
来源与说明
```

底部按钮：`复制给客户`

### 删除冗词总数

| 禁用词 | 修改前 | 修改后 |
|---|---|---|
| 这个问题不能简单回答 | 68 | **0** |
| 建议先（4 变体）| 9 | **0** |
| 其他禁用词（结论：/ 今天先做 / 完整步骤 / 使用边界 / 这部分需要进一步确认）| 0 | **0** |
| **合计修改** | | **77 处** |

## 给 CCA 的接入建议

### 前端字段映射（不改 yaml schema）

```python
SECTION_MAPPING = {
    "conclusion": "最紧的两件",
    "do_now": "步骤",
    "how_to_do": "步骤",
    "documents_needed": "要带什么",
    "deadline_or_timing": "期限",
    "consequences": "不做会怎样",
    "expert_handoff": "要找专家的情况",
    "source_hint": "来源与说明",
    "customer_message": None,  # 底部按钮「复制给客户」
}
```

### 句首替换

```python
SENTENCE_REPLACE = {
    "这个问题不能简单回答": "先看这几个条件",
    "这部分需要进一步确认": "还要确认：身份、日期、是否逾期、是否收到通知",
    "建议咨询专家": "出现以下情况时，找行政书士/社労士确认",
}
```

### v1 文档作废清单

- ✗ `HOMEPAGE_COPY_V1.md` 三版长 H1（A/B/C）
- ✗ `PRODUCT_COPY_BIBLE.md` 部分文案方向（保留 voice + 中日混合 + 高风险题处理）

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化（aliases 837 / test_queries 350 / TOP30 / 26 高风险）
- content/answer-copy-rewrite-v1：TOP 50 action_answer + Q032 重点
- content/product-copy-v1：BIBLE + HOMEPAGE 3 版 + customer_facing_answer
- content/answer-copy-qa-v2：10 个 benchmark + must_match 规则
- **content/app-copy-final-v2：APP_COPY_FINAL + HOMEPAGE_APP + ANSWER_APP（短句 / 删冗词 77 处）**
