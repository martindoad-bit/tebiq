# AI Handoff - CCB

最后更新: 2026-04-29（CCB Block 13+ batch-05 完成）

## CCB(内容)状态

- 当前任务: Block 13+ 知识 batch-05（25 篇 visa-specific 维度卡）
- 当前分支: content/knowledge-batch-05
- 当前 worktree: /tmp/cc-b-batch-04（共用，不同分支）
- 状态: **awaiting_merge**
- 最近一次 push: batch-05 25 篇 visa-specific 维度卡 + 报告（见本次 commit）

## 给 CCA 的待办（batch-05 merge）

### Schema / Importer

batch-05 frontmatter **完全沿用 batch-04 schema** — 不需要新增 column / 不需要改 importer。
CCA 在 Block 13 已为 batch-04 写过 importer (`articles` 表的 dimension importer)，batch-05 直接复用。

### Merge 顺序建议

1. 确认 batch-04 (`content/knowledge-batch-04`) merge 状态（如未 merge，先 merge）
2. 然后 merge batch-05 (`content/knowledge-batch-05`)
3. 跑 import-knowledge / import-dimensions

### batch-05 内容统计

- 25 篇 .md 文件，5 visa × 5 visa-specific 维度
- 总字符 159,698，平均每篇 6,400 字符
- 政府来源引用约 90 条（每篇 2-6 个 .go.jp / .moj.go.jp / .nta.go.jp 等）
- 6 篇标 ⚠️ 需创始人 / 書士复核（経営・管理 2025/10/16 改正实施细则 + 特定技能 業種・試験 实务）

### 文件路径

`docs/knowledge-seed/dimensions-visa-specific/{visa_type}_{dimension_key}.md`

## CCB 后续 batch（按 brief）

- **batch-06**：50 篇高频文书逐封解读（document 类）— 等 batch-05 创始人 review 后启动；可能需要新 schema 字段（document_type / sender_type / triggers）
- **batch-07**：20-30 篇场景化决策清单（scenario 类）— 等 batch-06 完成后启动；可能需要新 schema 字段（scenario_key / timeline_stages）

## 历史交付

- batch-01：初始化基础知识种子
- batch-02：50 篇旧结构 P0 内容
- batch-03：30 篇 P1 档案中心化内容（已 merge to main）
- batch-04：60 篇 CleanB 续签自查 P0 维度卡（已 merge to main，含 dimensions importer）
- **batch-05：25 篇 visa-specific 维度卡（awaiting_merge）**
