# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/answer-seed-v1 完成）

## CCB(内容)状态

- 当前任务: Answer Seed v1（强化 v0 100 条，让用户问题更易命中答案）
- 当前分支: `content/answer-seed-v1`（基于 `origin/content/answer-seed-v0`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 v1 brief：在 v0 100 条 answer seed 基础上做 4 项强化（不增删 Q / 不重写 summary / 仅强化可命中性 + 高风险题透明度）。

### 修改文件（5 个）

| 文件 | 修改 |
|---|---|
| `answer_seed_001-025.md` | aliases 补全 + test_queries + 7 条 first_screen_answer + 7 条 high-risk 字段 |
| `answer_seed_026-050.md` | aliases 补全 + test_queries + 11 条 first_screen_answer + 6 条 high-risk 字段 |
| `answer_seed_051-075.md` | aliases 补全 + test_queries + 5 条 first_screen_answer + 6 条 high-risk 字段 |
| `answer_seed_076-100.md` | aliases 补全 + test_queries + 7 条 first_screen_answer + 7 条 high-risk 字段 |
| `ANSWER_SEED_V1_REPORT.md` | 新建（v1 强化报告） |

### 关键统计

| 指标 | v0 | v1 | 增量 |
|---|---|---|---|
| Q 总数 | 100 | 100 | 0 |
| aliases 总条数 | ~425 | **837** | +412 |
| test_queries 总条数 | 0 | **350** | +350 |
| first_screen_answer | 0 | **30** | TOP30 全 |
| why_not_simple_answer | 0 | **26** | 高风险全 |
| expert_handoff | 部分 | **26** | 统一格式 |

### Schema 增量（v0 → v1）

新增字段：
- `test_queries` text[] — 自动测试用查询
- `first_screen_answer` text — 首屏 ≤ 300 字答案（仅 TOP30）
- `why_not_simple_answer` text — 高风险题特有
- `expert_handoff` jsonb — {trigger[], who, why}（v1 统一格式）

## 给 CCA 的接入建议

### answer engine 自动测试套件

用 100 条 Q 的 350 条 test_queries 跑：
- Tier 1 命中（top1）目标 ≥ 80%
- Tier 2 命中（top3）目标 ≥ 95%
- 误触发率 ≤ 5%

### 前端 UI 三档展示

- low-risk：仅 first_screen_answer
- medium-risk：first_screen_answer + boundary_note
- high-risk：first_screen_answer + why_not_simple_answer + expert_handoff CTA → ¥9,800 咨询

### 双咨询题处理

9 条题需「两位专家联合」（如 Q029 行政書士+税理士、Q065 行政書士+弁護士+DV センター、Q099 弁護士+行政書士）。`expert_handoff.who` 字段已具体到职业。

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q 标注 + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed + report
- **content/answer-seed-v1：v0 强化版（aliases 837 / test_queries 350 / TOP30 first_screen / 26 高风险题透明度）**
