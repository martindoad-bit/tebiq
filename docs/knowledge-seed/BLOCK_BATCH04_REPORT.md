# BLOCK 12 知识库 batch-04 完成报告（CCB）

**生成时间**：2026-04-27
**分支**：`content/knowledge-batch-04`（基于 origin/main HEAD `6b97586`）
**状态**：push 完成，**未 merge**（等 CCA Block 13 时统一处理 schema + importer）

---

## 完成情况

### 第一批 60 篇 P0 维度卡（核心通用维度）

5 个 visa_type × 12 个通用维度 = **60 篇**（全部完成）

| visa_type | 中文 | 数量 |
|---|---|---|
| `technical_humanities_international` | 技人国 | 12 |
| `management` | 経営・管理 | 12 |
| `spouse` | 日本人 / 永住者 配偶者等 | 12 |
| `permanent_resident_preparation` | 准备申请 永住者 | 12 |
| `specified_skilled_worker` | 特定技能 1 号 / 2 号 | 12 |

### 第二批（visa-specific 17-24 篇）

**未做**。原因：第一批 60 篇 + 报告 + handoff 已是稳健交付边界；
第二批 visa-specific 维度建议在 CCA 完成 Block 13 schema + importer 后下一批次再做。

---

## 12 个通用维度（universal dimensions）

每个 visa_type 目录下都有同名 `.md`：

| # | dimension_key | 主题 |
|---|---|---|
| 1 | `work_change` | 工作变更 / 所属机构届出 |
| 2 | `residence_tax` | 住民税 缴纳 |
| 3 | `income_tax` | 所得税 / 確定申告 |
| 4 | `health_pension` | 健康保険 / 年金 加入与缴纳 |
| 5 | `tax_certificate` | 課税証明書 / 納税証明書 |
| 6 | `entry_exit_record` | 出入国 履历 / 再入国許可 |
| 7 | `violation_record` | 违规记录 / 罚金 / 入管警告 |
| 8 | `income_level` | 收入水平 / 年收 |
| 9 | `employment_contract` | 雇用契約 / 契約機関 状态 |
| 10 | `passport_zairyu` | 護照 + 在留カード 有效期 |
| 11 | `juuminhyou` | 住民票 / 住所 一致性 |
| 12 | `material_preparation` | 续签材料 准备清单 |

---

## 文件路径

```
docs/knowledge-seed/check-dimensions/
├── technical_humanities_international/
│   └── {12 dimensions}.md
├── management/
│   └── {12 dimensions}.md
├── spouse/
│   └── {12 dimensions}.md
├── permanent_resident_preparation/
│   └── {12 dimensions}.md
└── specified_skilled_worker/
    └── {12 dimensions}.md

docs/knowledge-seed/BLOCK_BATCH04_REPORT.md  ← 本文件
```

---

## Frontmatter 结构（每篇 60 篇都有）

```yaml
---
slug: check-{visa_type_key}-{dimension_key}
title: "<场景化标题>"
visa_type: technical_humanities_international | management | spouse | permanent_resident_preparation | specified_skilled_worker
dimension_key: <见 12 维度表>
dimension_version: 1
priority: must_see | normal
expiry_days: <int 30-180>
estimated_read_time_minutes: <int 3-7>
scenario_tags: ["续签前", "工作变动", ...]
applies_to: ["技人国", ...]
urgency_level: low | medium | high

questions:
  - id: q1
    text: "..."
    type: yes_no | yes_no_unknown | choice
    show_if: "..." (optional)
  - id: q2
    ...

result_logic:
  green: "<DSL 表达式>"
  yellow: "<DSL 表达式>"
  red: "<DSL 表达式>"

result_actions:
  red: ["...", "..."]
  yellow: ["...", "..."]
---
```

---

## 正文结构

每篇 60 篇都有：

1. `## 这是什么`（事实层面，引法条 / 制度）
2. `## 为什么重要`（与续签 / 永住 / 帰化 的关联）
3. `## 判断标准`（绿 / 黄 / 红 三档）
4. `## 处理建议`（按绿 / 黄 / 红 三档分别给步骤）
5. `## 相关材料`（清单）
6. `## 价值 expiry 说明`（为什么 expiry_days 是这个数字）

复杂 case 在「处理建议 → 红」末尾用唯一引流句：
> 建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

---

## 哲学合规（Block 11 product-philosophy v1）

- ✓ 工具感 voice：`已归档 / 已识别 / 期限冲突 / 第 N 件 X 类文书`
- ✓ 不撒娇 / 不温情 / 不戏剧化 / 不 emoji
- ✓ 中日混合：在留期間更新 / 住民税 / 確定申告 / 在留カード / 入国管理局 / 経営・管理 / 出入国在留管理庁 等保留日文
- ✓ 「行政書士」仅在「处理建议 → 红」末尾引流句出现
- ✓ 不替用户做行政决定 — 给制度 + 一般动作 + 复杂时引向 ¥9,800 咨询

---

## 给 CCA 的待办（Block 13 schema 设计）

batch-04 引入 **新 frontmatter 字段**，articles 表 schema 需扩展：

| 字段 | 类型 | 说明 |
|---|---|---|
| `visa_type` | text | 5 种 visa_type 之一 |
| `dimension_key` | text | 12 个通用维度 + 后续 visa-specific 维度 |
| `dimension_version` | int | 维度 schema 版本 |
| `priority` | text | `must_see` / `normal` |
| `expiry_days` | int | 检测结果有效期（天） |
| `questions` | jsonb | 问题数组（id / text / type / show_if） |
| `result_logic` | jsonb | green / yellow / red DSL 表达式 |
| `result_actions` | jsonb | green / yellow / red action 数组 |

### 是否新建表

CCA 自行决策：
- **方案 A**：扩展现有 `articles` 表（加 column）— 简单
- **方案 B**：新建 `check_dimensions` 表（与 articles 解耦）— 解耦清晰，CleanB 表单消费

CCB 这次 push **不写 importer**。等 CCA Block 13 schema 设计落地后，importer / adapter 一并处理。

### CleanB 表单消费

batch-04 的 60 篇 = CleanB 表单的 60 个维度卡。
- 用户选 visa_type → 加载该目录下 12 篇
- 表单按 `priority: must_see` 优先 + `expiry_days` 排序展示
- 用户答 questions → 按 `result_logic` 表达式 evaluate → 出 green / yellow / red 结果
- 红 / 黄 → 拉出 `result_actions` 数组渲染为 action 步骤

---

## 待补的 17-24 篇 visa-specific 维度（建议下批次）

| visa_type | 待补维度建议 |
|---|---|
| 技人国 | `job_visa_match`, `working_hours`, `employer_stability`（3-4 篇） |
| 経営・管理 | `capital_investment`, `full_time_staff`, `office_entity`, `business_plan`, `corporate_tax`, `business_cash_flow`, `new_regulation_transition`（5-7 篇） |
| 配偶者 | `marriage_continuity`, `cohabitation`, `spouse_income`, `relationship_evidence`（3-4 篇） |
| 特定技能 | `accumulated_years`, `support_organization`, `skill_test_validity`, `work_scope_match`（3-4 篇） |
| 永住准备 | `continuous_residence`, `public_obligations`, `savings_assets`, `guarantor`（3-5 篇） |

---

🤖 by tebiq-knowledge-base skill (Block 12 batch-04, product-philosophy v1)
