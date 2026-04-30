# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/answer-seed-v0 完成）

## CCB(内容)状态

- 当前任务: Answer Seed v0（100 条可展示问答种子，给 answer engine 用）
- 当前分支: `content/answer-seed-v0`
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 v0 brief：从已有 QA 资产 + 已交付内容反推，写 100 条**可直接展示的种子答案**（不是问题清单 / 不是文章 / 不是营销）。

### 5 个新建文件（docs/answer-seed/）

| 文件 | 范围 | 主题 |
|---|---|---|
| `answer_seed_001-025.md` | Q001-Q025 | 永住（15）+ 工作签（10） |
| `answer_seed_026-050.md` | Q026-Q050 | 経営・管理（15）+ 公司设立（10） |
| `answer_seed_051-075.md` | Q051-Q075 | 特定技能（5）+ 定住者（5）+ 配偶（5）+ 离婚 / 转签（10） |
| `answer_seed_076-100.md` | Q076-Q100 | 住民税 / 年金 / 社保 / 地址 / 换工作 / 公司倒闭 / 父母来日 / 通用 |
| `ANSWER_SEED_V0_REPORT.md` | 报告 | 总数 / 类型分布 / TOP 20 / 接入建议 |

### 关键统计

- 100 条 Q
- 26 条高风险（needs_expert 16 + misconception 3 + risk_chain 7）≥ brief 要求 20 条
- 44 条 `requires_review: true`
- 64 / 35 / 1 条 source_grade A / B / C
- 100% 中日混合 + 工具感 voice

### 每条字段（统一 schema）

- aliases（2-4 个用户问法）
- question（归一化）
- answer_level（L1/L2/L3/L4）
- answer_type（info/workflow/decision_card/risk_chain/misconception/needs_expert）
- review_status（全部 unreviewed）
- source_grade（A/B/C）
- summary（1-2 句）
- sections（先确认 / 今天可以做什么 / 不能做什么 等）
- next_steps（3-5 条 todo）
- source_hint（机关名）
- boundary_note（1 句）

## 给 CCA 的待办（Block 14+）

### 建议新建 `question_seeds` 表

详见 `ANSWER_SEED_V0_REPORT.md` § 给 CCA 部分。

### Importer 路由

`docs/answer-seed/answer_seed_*.md` → 用 `## Q[number]` 切分 + yaml-parser 解析 → `question_seeds` 表。

### 前端 `/admin/questions/import` 接入

3 档展示策略：
- Tier 1（约 40 条）：直接导入 + 前端展示
- Tier 2（约 44 条）：导入 + 标「待书士复核」
- Tier 3（约 16 条 needs_expert）：导入 + 立即引导 ¥9,800 咨询
- Tier 4（约 1 条 source_grade C）：仅内部数据

### 与已有 batch 关联

可在 importer 时建立关联：
- `related_dimension_slugs[]` → batch-04/05 dimensions
- `related_document_slugs[]` → batch-06 documents
- `related_scenario_slugs[]` → batch-07 scenarios

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q 标注 + TOP 20 + 5 seed YAML
- **content/answer-seed-v0：100 条 answer seed + report（可直接接 answer engine）**
