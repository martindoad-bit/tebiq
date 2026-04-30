# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/answer-copy-rewrite-v1 完成）

## CCB(内容)状态

- 当前任务: Answer Copy Rewrite v1（把答案改成用户能照着做）
- 当前分支: `content/answer-copy-rewrite-v1`（基于 `origin/content/answer-seed-v1`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：不新增 Q / 不写新 batch / 仅给 TOP 50 加 `action_answer` 字段块，让用户看到答案就能照着做。

### 修改文件

| 文件 | TOP 50 加 action_answer |
|---|---|
| `answer_seed_001-025.md` | 17 条 |
| `answer_seed_026-050.md` | 13 条（含 Q032 重点重写）|
| `answer_seed_051-075.md` | 10 条 |
| `answer_seed_076-100.md` | 10 条 |
| `ANSWER_COPY_REWRITE_V1_REPORT.md` | 新建（重写报告） |

### action_answer 字段块（TOP 50 必填）

```yaml
action_answer:
  conclusion: <一句话明确结论 / 或「这个问题不能简单回答」>
  do_now: <用户现在 1-3 件具体可执行的事>
  where_to_go: <去哪里办：机关名 + 具体窗口>
  how_to_do: <怎么操作：编号步骤清单>
  documents_needed: [...]
  deadline_or_timing: <多久内做>
  consequences: <不做会怎样>
  expert_handoff: <什么情况必须找专家>
```

### Q032 办公室搬迁（创始人特别要求重点重写）

按 brief 8 点全覆盖：法人办公确认 + 法人名义合同 + 商業登記 + 异动届 + 社保银行许可 + 入管立证持续性 + 新旧租约照片平面图 + 仅改邮寄地址的不一致风险。

关键时间节点：
- 法務局 本店移転登記 **2 週間以内**
- 入管 所属機関等届出 **14 日以内**
- 税務 / 社保 / 雇用保険 異動届 **1 ヶ月以内**

### 高风险 16 条 ⚠️ 严格处理

Q003 / Q004 / Q005 / Q024 / Q026 / Q029 / Q031 / Q036 / Q040 / Q050 / Q057 / Q065 / Q081 / Q091 / Q098 / Q099

统一 conclusion = 「这个问题不能简单回答」+ 明确专家分类 + 客观陈述。

### 语气合规

- ✗ 不写「保证 / 一定（肯定式）/ 拒签概率 / 赶紧委托 / 我们可以帮你办」
- ✓ 写「通常 / 一般 / 需要先确认 / 需要先整理 / 如果涉及个别事实，建议咨询专业人士」

无法确定的字段 → 写「需要先确认」，不留空。

## 给 CCA 的接入建议

### 前端 UI 三层渲染

| 命中类型 | 渲染主体 |
|---|---|
| 命中 TOP 50 题 | 优先展 `action_answer`（可执行清单 8 字段） |
| 命中 TOP 50 外（TOP 30） | 展 `first_screen_answer`（v1 已有 4 段）|
| 命中其他题 | 展 `summary` + `sections`（v0 已有） |

高风险题（answer_type: needs_expert / misconception）命中时强制展示 `why_not_simple_answer` + `expert_handoff` CTA → ¥9,800 咨询入口。

### Schema 增量字段

```sql
action_answer  jsonb  -- {conclusion, do_now, where_to_go, how_to_do,
                     --  documents_needed[], deadline_or_timing,
                     --  consequences, expert_handoff}
```

### 测试建议

用 v1 350 条 test_queries 跑命中：
- 命中 TOP 50 时验证 `action_answer.conclusion` 渲染优先级
- 高风险 16 条命中时验证「不能简单回答」+ 引导专家路径

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q 标注 + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed + report
- content/answer-seed-v1：v0 强化版（aliases 837 / test_queries 350 / TOP30 first_screen / 26 高风险题透明度）
- **content/answer-copy-rewrite-v1：v1 答案重写（TOP 50 + Q032 重点重写 + 16 条高风险题严格处理）**
