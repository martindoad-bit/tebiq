# AI Handoff - CCB

最后更新: 2026-04-29（CCB Block 13+ batch-05 / 06 / 07 全部完成）

## CCB(内容)状态

- 当前任务: Block 13+ 知识 batch-07（20 篇场景化决策清单）
- 当前分支: content/knowledge-batch-07
- 当前 worktree: /tmp/cc-b-batch-04（共用，分支切换）
- 状态: **awaiting_merge**
- 最近一次 push: batch-07 20 篇 scenarios + 报告（见本次 commit）

## 三批合计交付（batch-05 + 06 + 07）

| batch | 分支 | 主题 | 篇数 | 字符 | schema |
|---|---|---|---|---|---|
| batch-05 | content/knowledge-batch-05 | visa-specific 维度卡 | 25 | 159,698 | 沿用 batch-04 |
| batch-06 | content/knowledge-batch-06 | 高频文书逐封解读 | 50 | 332,267 | 新 schema（建议新建 documents 表） |
| batch-07 | content/knowledge-batch-07 | 场景化决策清单 | 20 | 173,232 | 新 schema（建议新建 scenarios 表） |
| **合计** | | | **95** | **665,197** | |

## 给 CCA 的待办（schema + importer）

### batch-05（最简单）

- frontmatter 完全沿用 batch-04 schema — **不需要 schema migration / importer 改造**
- 直接 merge + 跑现有 dimensions importer 即可

### batch-06（建议新建 documents 表）

新 frontmatter 字段（document 类）：
```
document_type / document_name_jp / document_number / sender_type /
envelope_keywords (jsonb) / has_payment / has_deadline /
typical_amount_range / action_window_days / priority /
estimated_read_time_minutes / scenario_tags / applies_to /
urgency_level / last_verified_at / sources_count
```

**消费场景**：TEBIQ 拍照识别工具的语义层 + 时间线归档
1. OCR / vision → 提取信封关键词
2. 匹配 `envelope_keywords` 或 `document_name_jp` → 找到对应 document
3. 渲染 8 段（信封长什么样 / 是什么 / 为什么收到 / 关键栏 / 后果 / 路径 / 续签影响 / 来源）
4. 归档到 user 时间线

### batch-07（建议新建 scenarios 表）

新 frontmatter 字段（scenario 类）：
```
scenario_key / scenario_type / triggered_by (text[]) / priority /
estimated_read_time_minutes / scenario_tags / applies_to /
urgency_level / timeline_stages (text[]) / last_verified_at /
sources_count
```

**消费场景**：TEBIQ「身份转变 / 决策清单」工具
1. 用户选场景（结婚 / 搬家 / 退休 等） → 加载 scenario
2. 渲染 5 段（适用场景 / 时间线 / 必办事项 / 容易遗漏 / 信息来源）
3. 时间线阶段 → 倒计时提醒（与 user 在留期限 联动）
4. 必办事项 → 可触发拍照识别（batch-06）+ 维度自查（batch-04/05）
5. 归档到 user 时间线

### Importer 改造点

- 新增 `documents` + `scenarios` 表 schema migration
- 改造 import 脚本支持新路径：
  - `docs/knowledge-seed/dimensions-visa-specific/*.md` → check_dimensions 表（同 batch-04）
  - `docs/knowledge-seed/documents/*.md` → 新 documents 表
  - `docs/knowledge-seed/scenarios/*.md` → 新 scenarios 表
- 新建查询函数：
  - `getDocumentByEnvelopeMatch(keywords[])`
  - `getScenarioByKey(key)`
  - `getScenariosByVisaType(visa_type)`
- 数据层关联：`scenario.required_actions[].linked_document_id`（可选）

### Merge 顺序建议

1. batch-05（schema 兼容，最简单）
2. CCA 决策 documents / scenarios 表方案 + 写 migration
3. batch-06（含 documents schema migration）
4. batch-07（含 scenarios schema migration）
5. 跑统一 importer

## 文件路径汇总

- batch-05: `docs/knowledge-seed/dimensions-visa-specific/{visa_type}_{dimension_key}.md` (25 篇)
- batch-06: `docs/knowledge-seed/documents/{number}_{document_name_jp}.md` (50 篇)
- batch-07: `docs/knowledge-seed/scenarios/{scenario_key}.md` (20 篇)
- 报告：`docs/knowledge-seed/BLOCK_BATCH0{5,6,7}_REPORT.md`

## 历史交付

- batch-01：初始化基础知识种子
- batch-02：50 篇旧结构 P0 内容
- batch-03：30 篇 P1 档案中心化内容（已 merge）
- batch-04：60 篇 CleanB 续签自查 P0 通用维度卡（已 merge）
- batch-05：25 篇 visa-specific 维度卡（awaiting_merge）
- batch-06：50 篇高频文书逐封解读（awaiting_merge，需新 documents 表）
- batch-07：20 篇场景化决策清单（awaiting_merge，需新 scenarios 表）

**累计：210 篇 P0/P1 内容 + 30 篇 P1 + 95 篇 batch-05/06/07 = 共约 305+ 篇 + 系统化覆盖（articles + dimensions + documents + scenarios 4 类语义层）。**
