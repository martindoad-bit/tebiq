# 内容总索引（CONTENT_INDEX）

**生成时间**：2026-04-29
**分支**：`content/index-and-review-registry`
**说明**：本索引覆盖 batch-04（已 merge）+ batch-05/06/07（awaiting_merge），目的是给 CCA / 创始人 / 行政書士 一个不打开文件就能看清「内容资产全貌 / 各 batch 接入位置 / 当前合入状态」的入口。

---

## 总表

| batch | 类型 | 篇数 | 路径 | 用途 | 当前状态 |
|---|---|---|---|---|---|
| **batch-04** | check_dimension（通用维度） | 60 | `docs/knowledge-seed/check-dimensions/{visa_type}/{dimension_key}.md` | CleanB 续签自查表单 - 5 visa × 12 通用维度 | **已 merge to main** |
| **batch-05** | check_dimension（visa-specific） | 25 | `docs/knowledge-seed/dimensions-visa-specific/{visa_type}_{dimension_key}.md` | CleanB 表单 - 5 visa × 5 visa-specific 维度（与 batch-04 同 schema） | **awaiting_merge**（schema 兼容） |
| **batch-06** | document（文书逐封解读） | 50 | `docs/knowledge-seed/documents/{number}_{document_name_jp}.md` | TEBIQ 拍照识别工具语义层 - 5 大类税务/社保/在留/教育育児/生活 | **awaiting_merge**（需 documents 表） |
| **batch-07** | scenario（身份转变决策清单） | 20 | `docs/knowledge-seed/scenarios/{scenario_key}.md` | TEBIQ 决策清单工具 - 4 大类生活/家庭/工作住房/重大里程碑 | **awaiting_merge**（需 scenarios 表） |
| **合计** | | **155** | | | |

---

## batch-04（60 篇）— check_dimension 通用维度

5 个 visa_type 各 12 篇通用维度：

| visa_type | 中文 | 12 dimensions（共通） |
|---|---|---|
| `technical_humanities_international` | 技人国 | work_change, residence_tax, income_tax, health_pension, tax_certificate, entry_exit_record, violation_record, income_level, employment_contract, passport_zairyu, juuminhyou, material_preparation |
| `management` | 経営・管理 | 同上 |
| `spouse` | 配偶 | 同上 |
| `permanent_resident_preparation` | 永住准备 | 同上 |
| `specified_skilled_worker` | 特定技能 | 同上 |

---

## batch-05（25 篇）— check_dimension visa-specific 维度

5 个 visa_type 各 5 篇 visa-specific 维度：

### 技人国（5 篇）
- `technical_humanities_international_education_job_relevance.md` — 学历与职务相关性
- `technical_humanities_international_company_business_health.md` — 公司经营状态影响续签
- `technical_humanities_international_job_change_continuation_risk.md` — 转职后续签风险
- `technical_humanities_international_income_threshold.md` — 收入是否达标
- `technical_humanities_international_employment_contract_clauses.md` — 雇用契約書关键条款

### 経営・管理（5 篇）
- `management_business_substance.md` — 経営実態
- `management_corporate_tax_filing.md` — 法人税务申告
- `management_office_lease_vs_owned.md` — 事務所 賃貸 vs 自宅兼用
- `management_capital_source.md` — 出資金来源
- `management_director_change_filing.md` — 役員変更届出

### 配偶（5 篇）
- `spouse_marriage_authenticity.md` — 婚姻真实性
- `spouse_divorce_visa_path.md` — 离婚后签证转换路径
- `spouse_widowhood_visa_options.md` — 配偶死亡后签证选项
- `spouse_dv_protection_path.md` — DV 受害者保护路径
- `spouse_cross_border_marriage_docs.md` — 跨国婚姻材料

### 永住准备（5 篇）
- `permanent_resident_preparation_tax_years_verification.md` — 纳税年限要求与查证
- `permanent_resident_preparation_employment_continuity.md` — 就労資格连续性
- `permanent_resident_preparation_public_obligations_arrears.md` — 公的義務滞納清算
- `permanent_resident_preparation_criminal_traffic_record.md` — 犯罪歴 + 交通違反
- `permanent_resident_preparation_koudo_to_eijuu_path.md` — 高度人材→永住加速路径

### 特定技能（5 篇）
- `specified_skilled_worker_intern_to_skilled_transition.md` — 実習→特定技能转换
- `specified_skilled_worker_industry_14_differences.md` — 業種別差异
- `specified_skilled_worker_employer_change_filing.md` — 受入機関変更届出
- `specified_skilled_worker_skill_test_validity.md` — 試験合格証有効性
- `specified_skilled_worker_five_year_cap_strategy.md` — 5 年上限戦略

---

## batch-06（50 篇）— documents 高频文书逐封解读

| 分类 | 编号 | 主题 | 寄件人方向 |
|---|---|---|---|
| **税务类** | 01-10 | 住民税 / 国保 / 年金 / 固定資産税 / 自動車税 / 所得税 / 消費税 / 市県民税 特別徴収 / 復興特別所得税 / 確定申告案内 | 国税庁 / 市役所 / 都道府県 / 税務署 |
| **社会保障类** | 11-20 | 介護保険料 / 雇用保険受給資格 / 年金免除結果 / 児童手当現況届 / 児童扶養手当 / 健保給付 / 生活保護 / 傷病手当金 / 出産手当金 / 高額療養費 | 厚労省 / 日本年金機構 / 健保 / 福祉事務所 / ハローワーク |
| **在留類** | 21-30 | 在留更新結果 / 在留資格変更結果 / 再入国許可 / 永住結果 / 就労資格証明書 / 入管不許可 / 補正通知 / 特例期間説明 / 出頭通知 / 罰金通知 | 出入国在留管理庁 / 簡易裁判所 / 検察庁 |
| **教育・育児類** | 31-40 | 保育園入園 / 保育料 / 就学通知 / 就学援助 / 給食費 / PTA 会費 / 修学旅行費 / 奨学金 / 入学準備 / 卒業関連 | 教育委員会 / 学校 / こども家庭庁 / JASSO |
| **生活类** | 41-50 | 電気滞納 / ガス滞納 / 水道滞納 / NHK 受信料 / 賃貸契約更新 / 駐車場契約 / 共益費滞納 / 粗大ゴミ / 町内会費 / ゴミ違反 | 電力 / ガス / 水道 / NHK / 不動産 / 町内会 |

完整文件清单见 `BLOCK_BATCH06_REPORT.md`。

---

## batch-07（20 篇）— scenarios 身份转变决策清单

| 大类 | scenario_keys |
|---|---|
| **生活状态变化（5）** | first-30-days-in-japan / china-return-prep / work-visa-renewal-6months / health-pension-switch / parents-visit-visa |
| **家庭状态变化（5）** | after-marriage-30days / after-divorce-30days / after-child-birth / after-relocation / child-school-transfer |
| **工作住房状态变化（5）** | after-job-loss-30days / company-bankruptcy / unemployment-koyou-hoken / retirement-prep / housing-renewal |
| **重大里程碑 / 紧急情况（5）** | eijuu-prep-1year / kika-prep-6months / pregnancy-benefits / high-medical-cost / disaster-relief |

完整清单见 `BLOCK_BATCH07_REPORT.md`。

---

## 配套报告与索引

| 文件 | 用途 |
|---|---|
| `BLOCK_BATCH04_REPORT.md` | batch-04 60 篇通用维度卡报告（已 merge） |
| `BLOCK_BATCH05_REPORT.md` | batch-05 25 篇 visa-specific 维度卡报告 |
| `BLOCK_BATCH06_REPORT.md` | batch-06 50 篇文书报告 |
| `BLOCK_BATCH07_REPORT.md` | batch-07 20 篇场景清单报告 |
| `CONTENT_INDEX.md` | 本文件 — 内容资产总索引 |
| `REVIEW_REGISTRY.md` | 全部 ⚠️ 复核点登记（上线后人工复核） |
| `SOURCE_INDEX.md` | 政府来源索引（按机构） |
| `SCHEMA_RECOMMENDATIONS.md` | 给 CCA 的 schema 建议（4 类语义层） |

---

## 数据规模总结

| 指标 | 数字 |
|---|---|
| 内容文件总数（batch-04/05/06/07） | 155 |
| 总字符（含 frontmatter / 中日混合） | 约 78 万 |
| 唯一引用域名数 | 47（全部为政府 / 半官方 / 业界标准） |
| URL markdown 链接总数 | 约 340 |
| 复核标记总数（⚠️） | 58（详见 REVIEW_REGISTRY.md） |
| 涵盖 visa_type | 5 |
| 涵盖通用维度 | 12 |
| 涵盖 visa-specific 维度 | 25 |
| 涵盖文书 | 50（5 大类） |
| 涵盖场景 | 20（4 大类） |

---

🤖 by tebiq-knowledge-base skill / index-and-review-registry
