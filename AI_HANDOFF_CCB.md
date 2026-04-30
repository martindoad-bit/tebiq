# AI Handoff - CCB

最后更新: 2026-04-29（CCB content/index-and-review-registry 完成）

## CCB(内容)状态

- 当前任务: **内容整理模式**（不再写新 batch）
- 当前分支: `content/index-and-review-registry`
- 当前 worktree: /tmp/cc-b-batch-04（共用，分支切换）
- 状态: **awaiting_merge**
- 最近一次 push: index/registry 4 索引文件 + 1 处强词修订（见本次 commit）

## 本次交付（content/index-and-review-registry 分支）

按创始人指令切回内容整理模式 — 不写 batch-08，把已完成内容沉淀为可接入、可复核、可检索的资产。

### 4 个新建索引文件（位于 `docs/knowledge-seed/`）

| 文件 | 用途 |
|---|---|
| `CONTENT_INDEX.md` | 内容资产总索引（4 batch / 155 篇 / 路径 / 用途 / 当前合入状态） |
| `REVIEW_REGISTRY.md` | 全部 58 处 ⚠️ 复核点登记 + 复核类型分类 + 上线后优先级建议 |
| `SOURCE_INDEX.md` | 47 个唯一域名 / 约 340 条 url / 按机构分级（一手 / 半官方 / 民间公式） |
| `SCHEMA_RECOMMENDATIONS.md` | 给 CCA 的 schema 建议（4 类语义层 + importer 路由 + requires_review 自动化 + 复核后台 UI） |

### 强词修订（极少量）

按用户指定清单（危险 / 高危 / 一定 / 必定 / 拒签概率）扫描全部 95 篇内容：
- 危险（3 处）— 全部为 DV 议题「身体危险」客观陈述，**保留**
- 高危 / 必定 / 拒签概率 — 0 处
- 一定（10 处）— 全部为日文「一定数 / 一定基準」中日混合术语，**保留**

补扫强词清单：拒签 / 绝不 / 完蛋 / 全废 / 再无机会 / 无法挽回 — 0 处。

**仅 1 处修订**：
- `scenarios/china-return-prep.md` 第 62 行「→ 不可逆」改为「后通常无法撤回，需要重新走永住申请流程」

### 整体结论

batch-05 / 06 / 07 三批的 voice 已严格遵守产品哲学 v1（克制 / 工具感 / 不戏剧化），强词污染极低。⚠️ 复核块全部以 blockquote 形式留在文件正文顶部，**不删除、不硬改**，等上线后行政書士消化。

## 给 CCA 的待办（schema + importer + 复核后台）

### 立即可做（不阻断）

1. **batch-05 merge**：与 batch-04 同 schema，可直接 merge `content/knowledge-batch-05` + 跑现有 dimensions importer
2. **content/index-and-review-registry merge**：仅含 4 索引文件 + 1 处文本修订，无 schema 影响

### 需 CCA 决策（参考 SCHEMA_RECOMMENDATIONS.md）

3. **batch-06 schema**：建议新建 `documents` 表（拍照识别用，envelope_keywords / has_payment / sender_type 等）
4. **batch-07 schema**：建议新建 `scenarios` 表（决策清单用，timeline_stages / required_actions / pitfalls 等）
5. **公共字段升级**：建议 `articles` / `check_dimensions` / `documents` / `scenarios` 4 表都加 3 列：
   - `requires_review` boolean — importer 扫 `⚠️` 自动判定
   - `review_notes` text — 复核备注
   - `source_urls` text[] — importer 抽 markdown 链接

### Importer 路由建议（详见 SCHEMA_RECOMMENDATIONS.md §5）

```
docs/knowledge-seed/*.md                          → articles
docs/knowledge-seed/check-dimensions/*/*.md       → check_dimensions
docs/knowledge-seed/dimensions-visa-specific/*.md → check_dimensions
docs/knowledge-seed/documents/*.md                → documents (new)
docs/knowledge-seed/scenarios/*.md                → scenarios (new)
```

### 复核后台 UI（建议）

行政書士复核界面：列出 `requires_review = true` 条目 → 按 category / 批次 过滤 → 编辑 → 提交后 `requires_review` → false + 填 `review_notes`。

## 文件路径汇总

- `docs/knowledge-seed/CONTENT_INDEX.md` — 内容总索引
- `docs/knowledge-seed/REVIEW_REGISTRY.md` — 复核登记表
- `docs/knowledge-seed/SOURCE_INDEX.md` — 来源索引
- `docs/knowledge-seed/SCHEMA_RECOMMENDATIONS.md` — schema 建议
- `docs/knowledge-seed/scenarios/china-return-prep.md` — 1 处强词修订

## 历次交付

- batch-01：初始化基础知识种子（已 merge）
- batch-02：50 篇旧结构 P0 内容（已 merge）
- batch-03：30 篇 P1 档案中心化内容（已 merge）
- batch-04：60 篇 CleanB 续签自查 P0 通用维度卡（已 merge）
- batch-05：25 篇 visa-specific 维度卡（awaiting_merge，schema 兼容）
- batch-06：50 篇高频文书逐封解读（awaiting_merge，需 documents 表）
- batch-07：20 篇场景化决策清单（awaiting_merge，需 scenarios 表）
- **content/index-and-review-registry：4 索引文件 + 强词修订（awaiting_merge）**

**累计：155 篇 batch-04+ 内容 + 240 篇 batch-01/02/03 = 共约 395 篇（含旧批次）+ 完整 4 类语义层（articles / check_dimensions / documents / scenarios）+ 索引 / registry / source / schema 4 类元数据。**
