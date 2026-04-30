# AI Handoff - CCB

最后更新: 2026-04-30（CCB content/real-question-data-v1 完成）

## CCB(内容)状态

- 当前任务: 真实问题数据化 v1（不写文章，只整理问题）
- 当前分支: `content/real-question-data-v1`
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 v1 brief：从 QA 高频问答 9 个 docx（合并 439 行 / 142 个 Q）+ 已交付内容反推 10 个 = 共 152 个 Q，沉淀为可标注、可分类、可生成 Decision Card 的数据。

### 5 个新建文件

| 文件 | 说明 |
|---|---|
| `docs/real-questions/SOURCE_QA_RAW.md` | QA 源文件（439 行，9 节） |
| `docs/real-questions/QUESTION_TAXONOMY_V1.md` | 11 字段分类体系（visa_type / life_event / urgency / answer_level / card_type 等）|
| `docs/real-questions/REAL_QUESTIONS_BACKLOG_V1.md` | 152 个 Q 标注表 + 分类小结 + source_gap 风险 |
| `docs/real-questions/HIGH_VALUE_QUESTIONS_TOP20.md` | TOP 20 高价值问题（按 6 项优先级判定）|
| `docs/real-questions/REAL_QUESTION_DATA_V1_REPORT.md` | 总报告（数量 / 分布 / 5 seed card 状态 / 下一步建议） |

### 5 个 decision-seed-cards/*.yaml（按 brief 任务 4 指定 slug）

| Slug | 类型 | 关联 case |
|---|---|---|
| `pension-switch-company-dormant.yaml` | decision_card | 潘先生 |
| `management-office-relocation.yaml` | workflow | 顾夏夏 |
| `address-change-order.yaml` | workflow + decision hybrid | 卢向阳 |
| `bring-parents-to-japan.yaml` | misconception | 永住带父母 |
| `employment-violation-risk-chain.yaml` | risk_chain | 老板雇错签证 |

每个 YAML 含完整字段（slug / title / card_type / answer_level / visa_types / trigger / user_state / decision_options / recommended_direction / why_not_other_options / steps / today_actions / related_documents / related_check_dimensions / source_refs[A/B/C] / last_verified_at / requires_review / requires_review_after_days / expert_handoff / fallback / boundary_note / body_markdown）。

## 给 CCA 的待办（schema + importer）

### 建议新建 `decision_cards` 表

详见 `REAL_QUESTION_DATA_V1_REPORT.md` § 给 CCA 部分。
schema 字段（建议）：
- card_type / answer_level / decision_options(jsonb) / recommended_direction
- expert_handoff(jsonb) / fallback(text[]) / boundary_note(text)
- related_documents(text[]) / related_check_dimensions(text[]) — 关联表
- source_refs(jsonb) / requires_review_after_days(int)

### Importer 路由

`docs/decision-seed-cards/*.yaml` → `decision_cards` 表（用 yaml-parser，不再用 gray-matter）

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge（content/knowledge-batch-05/06/07）
- content/index-and-review-registry：4 索引文件（CONTENT/REVIEW/SOURCE/SCHEMA）+ 1 强词修订
- **content/real-question-data-v1：152 个 Q 标注 + TOP 20 + 5 seed YAML + report**
