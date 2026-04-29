# BLOCK 13+ 知识库 batch-05 完成报告（CCB）

**生成时间**：2026-04-29
**分支**：`content/knowledge-batch-05`（基于 origin/main HEAD `4d2a325`）
**状态**：push 完成，**未 merge**（CCA 决策 schema 是否需要再扩 / 直接 merge 用 batch-04 同 schema）

---

## 完成情况

### 25 篇 visa-specific 维度卡（5 visa × 5 维度）

| visa_type | 中文 | 维度数 |
|---|---|---|
| `technical_humanities_international` | 技人国 | 5 |
| `management` | 経営・管理 | 5 |
| `spouse` | 日本人 / 永住者 配偶者等 | 5 |
| `permanent_resident_preparation` | 准备申请 永住者 | 5 |
| `specified_skilled_worker` | 特定技能 1 号 / 2 号 | 5 |

### 总字符数

- 25 篇文件总字符：**159,698**（含 frontmatter / 中日混合 / markdown 链接）
- 平均每篇约 6,400 字符（正文 800-1500 中文字范围内合规）

### 政府来源引用

每篇 ≥1 个真实 .go.jp / .moj.go.jp / .mhlw.go.jp / .nta.go.jp / .nenkin.go.jp / .elaws.e-gov.go.jp 等政府公式 markdown 链接 + 取得日 2026-04-29。
单篇引用数范围：**2-6 个**。25 篇 × 平均 3.6 = **约 90 个政府来源引用**。

---

## 25 篇清单

### 技人国（5 篇）

| # | dimension_key | 主题 |
|---|---|---|
| 1 | `education_job_relevance` | 学历与职务相关性 / 「理由書」必备项 |
| 2 | `company_business_health` | 公司经营状态影响续签 / 决算赤字 / 解雇风险 |
| 3 | `job_change_continuation_risk` | 转职后续签风险 / 就労資格証明書 申请判断 |
| 4 | `income_threshold` | 收入是否达标 / 年収下限 + 産休育休 + 副業 |
| 5 | `employment_contract_clauses` | 雇用契約書 关键条款 / 職務 + 給与 + 期間 + 転勤 + 副業 |

### 経営・管理（5 篇）

| # | dimension_key | 主题 |
|---|---|---|
| 6 | `business_substance` | 経営実態 / 办公室、雇佣、営業実績 |
| 7 | `corporate_tax_filing` | 法人税務申告 / 青色 vs 白色、決算期 |
| 8 | `office_lease_vs_owned` | 事務所 賃貸 vs 自宅兼用 |
| 9 | `capital_source` | 出資金 / 資本金 来源说明 |
| 10 | `director_change_filing` | 役員変更 / 任期満了 → 商業登記 + 入管届出 |

### 配偶（5 篇）

| # | dimension_key | 主题 |
|---|---|---|
| 11 | `marriage_authenticity` | 婚姻真实性 / 同居実態 + 入管面谈 |
| 12 | `divorce_visa_path` | 离婚后签证转换路径 / 6 ヶ月届出義務 + 在留資格変更 |
| 13 | `widowhood_visa_options` | 配偶死亡后签证选项 / 死別 + 在留資格変更 |
| 14 | `dv_protection_path` | DV 受害者保护路径 / DV防止法 + 入管特例措施 |
| 15 | `cross_border_marriage_docs` | 中日跨国婚姻材料 / 結婚証 + 認証 + 翻訳 |

### 永住准备（5 篇）

| # | dimension_key | 主题 |
|---|---|---|
| 16 | `tax_years_verification` | 纳税年限 / 直近 5 年 課税・納税証明書 |
| 17 | `employment_continuity` | 就労資格 连续性 / 跳槽 + 失业空白对永住影响 |
| 18 | `public_obligations_arrears` | 公的義務 滞纳清算 / 年金 + 健保 + 介護保険 |
| 19 | `criminal_traffic_record` | 犯罪歴 + 交通違反 / 反則金 vs 罰金 区别 |
| 20 | `koudo_to_eijuu_path` | 高度専門職 → 永住 路径加速 / 70 点・80 点 |

### 特定技能（5 篇）

| # | dimension_key | 主题 |
|---|---|---|
| 21 | `intern_to_skilled_transition` | 技能実習 → 特定技能 / 在籍証明 + 試験免除 |
| 22 | `industry_14_differences` | 業種別 試験 + 日本語 基準差异 |
| 23 | `employer_change_filing` | 受入機関 変更 / 14 日 届出 + 登録支援機関 |
| 24 | `skill_test_validity` | 試験合格証 有効性 + 紛失再発行 |
| 25 | `five_year_cap_strategy` | 1 号 通算 5 年 上限 + 2 号 移行 + 家族帯同 |

---

## ⚠️ 需创始人 / 書士复核的不确定点

按 brief 安全准则「质量优先于速度」，6 篇文件包含 ⚠️ 复核块（在 frontmatter 之后、正文开头作为 blockquote）：

| 文件 | 不确定点 |
|---|---|
| `management_business_substance.md` | 2025/10/16 経営・管理 改正：「常勤職員 1 名以上」「資本金 3000 万円」的实施细则 + 経過措置期限以入管最新告示为准 |
| `management_capital_source.md` | 2025/10/16 改正後「資本金 3000 万円」の 経過措置 详细 |
| `specified_skilled_worker_intern_to_skilled_transition.md` | 技能実習 2 号 / 3 号 修了 → 特定技能 1 号 同職種 試験免除 範囲（業種・職種 対応表）+ 育成就労 2027 改正过渡 |
| `specified_skilled_worker_industry_14_differences.md` | 業種数 14 / 16（2024 改正后增加業種）+ 各試験 運営団体 |
| `specified_skilled_worker_skill_test_validity.md` | 合格証 有効期間 业种別 取扱（实务通说，无法定明文）|
| `specified_skilled_worker_five_year_cap_strategy.md` | 1 号 通算 5 年 算定方法（一時帰国 / 在留資格変更 期间是否计入）+ 2 号 業種 拡大 |

### 未在 ⚠️ 块标记，但建议書士复核的「实务通说」

由 永住准备 agent 在报告中显式说明（不属于法定明文，属于实务通说）：

- 反則金 5 件以上 / 5 年内 = 不许可：实务通说，非法定数字
- 罰金以上 5-10 年内事实上不可能：实务区间
- 直近 1 年同一公司 = 实务心证基準
- 公的義務履行 直近 2 年 = 2026/2/24 改正精神方向，但「2 年」具体数字为实务通说

写作时已用客观陈述（「实务上一般认为」「书士实务通说」）而非作为法定数字硬塞。

### 「年収 300 万円下限」处理

`technical_humanities_international_income_threshold.md` 已明确区分「法令上没有明文下限，但实务运用上 300 万円 是 1 つの目安」+ 引用永住ガイドライン 实质運用基準。这一处理符合「不确定数据不硬写」原则。

---

## 哲学 + 结构合规

### Voice 铁律（每篇都自查通过）

- ✓ 工具感 voice：「已归档 / 已识别 / 期限冲突 / 不许可可能」
- ✓ 不撒娇 / 不温情 / 不戏剧化 / 不 emoji
- ✓ 「行政書士」三个字仅在第 4 段红档引流句出现一次（+ frontmatter `result_actions.red` 中可重复，符合 batch-04 格式）
- ✓ 中日混合：在留期間更新 / 在留資格 / 在留カード / 経営・管理 / 特定技能 / 技能実習 / 配偶者 / 永住 / 出入国在留管理庁 / 法務省 / 厚生労働省 / 国税庁 等保留日文

### 结构 6 段（每篇都有）

1. `## 这是什么`（事实层面，引法条 / 制度）
2. `## 为什么重要`（与续签 / 永住 / 帰化 关联）
3. `## 判断标准`（绿 / 黄 / 红 三档说明）
4. `## 处理建议`（绿 / 黄 / 红 三档分别给步骤；红档末尾唯一引流句）
5. `## 相关材料`
6. `## 信息来源`（markdown 链接 + 取得日 2026-04-29）

### Frontmatter 字段（沿用 batch-04 schema）

```yaml
slug / title / visa_type / dimension_key / dimension_version / priority /
expiry_days / estimated_read_time_minutes / scenario_tags / applies_to /
urgency_level / questions / result_logic / result_actions
```

**未引入新字段** — 与 batch-04 完全兼容，CCA 在 Block 13 已为 batch-04 写过 importer，batch-05 应可直接复用。

---

## DV 议题特殊处理

`spouse_dv_protection_path.md` 严格走制度路径：
- 制度引用：DV防止法 / 配偶者からの暴力被害者の保護に関する法律 / 入管特例措置
- 引导节点：警察 110 / DV 相談ナビ #8008 / 配偶者暴力相談支援センター / 法テラス / 弁護士
- 不写「勇敢离开」「保护自己」等情感化语言
- 不替用户做行政决定 — 给制度 + 一般动作 + 复杂时引向専家

---

## 给 CCA 的待办

### Schema / Importer

batch-05 frontmatter **完全沿用 batch-04 schema**，CCA 不需要新增 column / 不需要改 importer。

merge 顺序建议：
1. CCA 先确认 batch-04（content/knowledge-batch-04）merge 状态
2. 然后 merge batch-05（content/knowledge-batch-05）
3. 跑 import-knowledge / import-dimensions（统一脚本）

### CleanB 表单消费

batch-05 = batch-04 的扩展（visa-specific 维度）。CleanB 表单逻辑：
- 用户选 visa_type → 加载 该 visa_type 下所有 dimension（通用 12 + visa-specific 5 = 17）
- visa-specific 通常 priority: must_see + urgency_level: high
- 其余消费逻辑（questions evaluate / result_logic / result_actions）与 batch-04 一致

---

## batch-06 / batch-07 预告

按 brief 三批节奏：
- batch-06：50 篇高频文书逐封解读（不同 schema：documents 类，frontmatter 含 `document_type` / `sender_type` / `triggers` 等新字段）
- batch-07：20-30 篇场景化决策清单（不同 schema：scenarios 类，frontmatter 含 `scenario_key` / `timeline_stages` 等新字段）

batch-06 / batch-07 启动前先等创始人对 batch-05 review。

---

## 文件位置

- 25 篇 markdown：`docs/knowledge-seed/dimensions-visa-specific/{visa_type}_{dimension_key}.md`
- 本报告：`docs/knowledge-seed/BLOCK_BATCH05_REPORT.md`

🤖 by tebiq-knowledge-base skill (Block 13+ batch-05 / product-philosophy v1)
