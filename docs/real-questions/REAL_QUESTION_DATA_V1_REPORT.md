# 真实问题数据化 v1 — 报告（REAL_QUESTION_DATA_V1_REPORT）

**生成**：2026-04-30
**分支**：`content/real-question-data-v1`
**任务性质**：不写文章 / 不写营销话术 / 不写长篇答案 — 把真实问题沉淀成可标注、可分类、可生成 Decision Card 的数据

---

## 抽取问题数量

| 来源 | 数量 |
|---|---|
| `QA高频问答` 9 个 docx 合并源 | 142 个 Q（按源文件实际计数） |
| 基于 batch-04/05/06/07 已交付内容反推（Q143-Q152）| 10 个 Q |
| **合计** | **152 个 Q** |

源文件位置：`docs/real-questions/SOURCE_QA_RAW.md`（439 行）

---

## 各签证类型分布

按 `visa_type` 字段（含 `;` 分隔的多重身份）：

| 签证类型 | 数量 | 占比 |
|---|---|---|
| 通用（跨签证） | 64 | 42% |
| 経営・管理 | 46 | 30% |
| 定住者 | 8 | 5% |
| 技人国 | 6 | 4% |
| 永住者 | 5 | 3% |
| 日本人配偶者等 | 5 | 3% |
| 永住者の配偶者等 | 4 | 3% |
| 特定技能 | 4 | 3% |
| 技能実習 | 3 | 2% |
| 留学 | 3 | 2% |
| 家族滞在 | 4 | 3% |

> 「通用 42%」主要来自永住相关一节 — 永住基础概念（10 年要件 / 直近 1 年 / 公的義務 / 等）跨所有工作签共通。
> 「経営・管理 30%」是单一签证类型最高密度 — 主要来自新规改正一节（2025/10/16 实施细则）+ 公司设立一节。

---

## L1/L2/L3/L4 分布

| 答案等级 | 数量 | 占比 | 说明 |
|---|---|---|---|
| L1 — 1 句话事实 | 47 | 31% | 制度定义 / 期限 / 金額 |
| L2 — 多步骤流程 | 57 | 38% | workflow 类 |
| L3 — 多路径决策 | 33 | 22% | decision_card 类 |
| L4 — 复杂个案 / 需专家 | 5 | 3% | expert_handoff |
| 未明确 | 10 | 7% | Q143-Q152（补足部分）|

---

## card_type 分布

| 卡片类型 | 数量 | 占比 |
|---|---|---|
| info | 65 | 43% |
| misconception | 26 | 17% |
| risk_chain | 19 | 13% |
| workflow | 18 | 12% |
| decision_card | 14 | 9% |
| 其他 / 未明确 | 10 | 7% |

> 「info 43%」最多 — 大量制度概念性问题；可批量做成 1 段 FAQ 卡
> 「misconception 17%」次高 — 用户常见错误认知；价值密度高，建议做成纠偏卡
> 「decision_card 9%」最少但最稀缺 — 这是 TEBIQ 与 ChatGPT 真正差异化的点

---

## 紧急程度分布

| 紧急度 | 数量 | 占比 |
|---|---|---|
| high（14 日 / 不法滞在 / 期限失效） | 22 | 14% |
| medium（3-6 月 / 续签准备 / 申请准备） | 80 | 53% |
| low（多年规划 / 概念） | 40 | 26% |
| 未明确 | 10 | 7% |

---

## 是否需要专家分布

| 取值 | 数量 | 占比 |
|---|---|---|
| yes（必须专家介入） | 64 | 42% |
| no（用户可自办） | 64 | 42% |
| maybe（条件分歧） | 14 | 9% |
| 未明确 | 10 | 7% |

> 「yes 42% + maybe 9%」共 51% — 也就是说，超过一半问题需要 ¥9,800 咨询入口

---

## 是否已覆盖分布

| 状态 | 数量 | 占比 | 含义 |
|---|---|---|---|
| no（未覆盖）| 64 | 42% | 需新内容 / 新 seed card |
| partial（部分覆盖）| 51 | 34% | 已有内容能答一半 / 需补 stitch |
| yes-04 | 5 | 3% | batch-04 通用维度卡 已答 |
| yes-05 | 14 | 9% | batch-05 visa-specific 已答 |
| yes-06 | 8 | 5% | batch-06 文书已答 |
| yes-07 | 4 | 3% | batch-07 决策清单 已答 |
| 未明确 | 6 | 4% | |

> **64 个未覆盖问题 + 51 个部分覆盖 = 115 个潜在新内容点**
> 即使每天写 1 个 Decision Card，也能撑 4 个月（不算后续创始人补的 300+ 真实 Q）

---

## TOP 20 高价值问题

详见 `HIGH_VALUE_QUESTIONS_TOP20.md`。

| 排名 | Q 编号 | 主题 | 卡片类型 | 状态 |
|---|---|---|---|---|
| #1 | Q003/Q008 | 离婚定住者 3 年硬条件 | decision_card | partial（已 batch-05）|
| #2 | Q076/Q090/Q091 | 経営・管理 2025/10/16 改正过渡期 | decision_card | partial（已 batch-05 + ⚠️）|
| #3 | Q143 | 14 日届出 未交后果 | risk_chain | yes-04 |
| #4 | Q005 | 抚养日本人子女 → 定住者 | misconception | partial |
| #5 | Q082 | 経管续签 法人税务跨地域 | workflow | **no（明显 source_gap）** |
| #6 | Q146 | 永住申请不许可后再申请 | decision_card | partial |
| #7 | Q149 | 永住放棄 vs 再入国 | decision_card | yes-07 |
| #8 | Q147 | 公司倒闭 → 在留资格 | risk_chain | yes-07 |
| #9 | Q145 | 国保 / 社保 切换 | workflow | yes-07 |
| #10 | Q064 | 永住者带父母来日 | misconception | partial |
| #11 | Q120/Q113 | 経管 3 年过渡期对应 | workflow | partial（⚠️）|
| #12 | Q018-Q020 | 永住直近 1 年同公司 | decision_card | yes-05 |
| #13 | Q077 | 特定技能 → 永住 年限 | info+decision | partial（⚠️）|
| #14 | Q025 | 高度人材 1 号 → 永住 1 年 | workflow | yes-05 |
| #15 | Q150 | 父母短期滞在招聘 | workflow | yes-07 |
| #16 | Q121/Q123/Q126 | 経管资本金跨境汇入 | workflow+risk | **no** |
| #17 | Q148 | 结婚 30 日内必办 | workflow | yes-07 |
| #18 | Q078/Q124 | 役員報酬 与 経管续签 | decision_card | partial |
| #19 | Q151 | 初次 確定申告 步骤 | workflow | partial |
| #20 | Q144 | 收到日文催缴信识别 | workflow | yes-06 |

### TOP 20 状态分布

- 已覆盖（直接提取卡片）：11 个
- 部分覆盖（补卡片）：5 个
- 未覆盖（需 P0 新内容）：4 个（#5, #16, #11 实施细则, #6 部分）

---

## 5 个 seed card 状态

| Slug | 类型 | 字段完整度 | 关联 backlog Q |
|---|---|---|---|
| `pension-switch-company-dormant.yaml` | `decision_card` | 完整（含 frontmatter + body_markdown） | Q145 (类潘先生 case) |
| `management-office-relocation.yaml` | `workflow` | 完整 | 顾夏夏 case 类型 |
| `address-change-order.yaml` | `workflow` + decision hybrid | 完整 | Q009 / 卢向阳 类型 |
| `bring-parents-to-japan.yaml` | `misconception` | 完整 | Q064 / Q150 |
| `employment-violation-risk-chain.yaml` | `risk_chain` | 完整 | Q031 / 老板雇错签证 |

每个 YAML 含：
- slug / title / card_type / answer_level / visa_types
- trigger / user_state
- decision_options（仅 decision_card 类有，其他为 `[]`）
- recommended_direction / why_not_other_options（同上）
- steps / today_actions
- related_documents（关联 batch-06 doc-XX slug）
- related_check_dimensions（关联 batch-04/05 dimension slug）
- source_refs（含 url + source_grade A/B/C）
- last_verified_at / requires_review / requires_review_after_days
- expert_handoff（trigger / who / why）
- fallback / boundary_note
- body_markdown（完整渲染用 markdown）

---

## 下一步建议

### 给创始人

1. **review TOP 20 排序** — 是否符合「真实客服问题频次」？
2. **提供更多真实 case** — backlog 里 64 个未覆盖 + 51 个部分覆盖 ≈ 115 个潜在内容空白
3. **review 5 个 seed YAML** — 是否符合 Decision Card 想要的形态？
4. **决定 schema 路径** — 决策卡 schema 是否 fork batch-06 documents schema 还是单独 `decision_cards` 表

### 给 CCA（Block 14+）

1. **新建 `decision_cards` 表**（建议字段见下）
2. 或扩展 `articles` 表加 `card_type` / `answer_level` / `decision_options`（jsonb）/ `expert_handoff`（jsonb）/ `fallback`（text[]）/ `boundary_note`（text）等列
3. **importer 路由**：`docs/decision-seed-cards/*.yaml` → `decision_cards` 表（用 yaml-parser）
4. **关联表**（可选）：
   - `decision_cards.related_documents` (text[]) → JOIN documents.slug
   - `decision_cards.related_check_dimensions` (text[]) → JOIN check_dimensions.slug

### 建议 `decision_cards` schema

```sql
slug                      text     primary key
title                     text
card_type                 text     -- decision_card | workflow | risk_chain | misconception | info
answer_level              text     -- L1 | L2 | L3 | L4
visa_types                text[]
trigger                   text[]
user_state                text[]
decision_options          jsonb    -- [{id, label, when[], actions[]}]
recommended_direction     text     -- 推荐路径 id
why_not_other_options     text[]   -- 为什么不选其他路径
steps                     jsonb    -- [{step, content}]
today_actions             text[]   -- 今天就做的事
related_documents         text[]   -- 关联 documents.slug
related_check_dimensions  text[]   -- 关联 check_dimensions.slug
source_refs               jsonb    -- [{title, url, source_grade}]
last_verified_at          date
requires_review           boolean
requires_review_after_days int
expert_handoff            jsonb    -- {trigger[], who, why}
fallback                  text[]
boundary_note             text
body_markdown             text     -- 完整渲染用
created_at                timestamptz
updated_at                timestamptz
published_at              timestamptz
```

### 给 CCB（下一轮）

1. **暂停**等 创始人 review 后定下 P0 卡片清单
2. **不要主动**写 batch-08 长篇内容
3. **可做**：扩充 backlog 到 300-500 个 Q（等创始人脑海中的真实 case 倾倒）
4. **可做**：继续 seed card 写作（按创始人指定的 P0 列表）

---

## 边界说明

- 本轮**不写完整答案** — 仅做问题提取 + 标注
- backlog 备注 1 句话核心点不算"答案"
- 5 个 seed card 是 **草稿** — 等创始人 review 后再上线
- ⚠️ 标记的复核点照旧不阻断（参考 `REVIEW_REGISTRY.md` 流程）
- 不替用户做行政决定 — Decision Card 给条件 + 路径，不替选

---

🤖 by tebiq-knowledge-base skill / real-question-data-v1
