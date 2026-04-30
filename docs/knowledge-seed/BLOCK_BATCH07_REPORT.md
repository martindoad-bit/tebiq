# BLOCK 13+ 知识库 batch-07 完成报告（CCB）

**生成时间**：2026-04-29
**分支**：`content/knowledge-batch-07`（基于 origin/main HEAD `4d2a325`）
**状态**：push 完成，**未 merge**（CCA 决策 schema migration 是否需要 + importer 改造）

---

## 完成情况

### 20 篇场景化决策清单（按用户身份转变）

按 brief 4 大类：

| 大类 | scenario_keys | 篇数 |
|---|---|---|
| **生活状态变化** | first-30-days-in-japan / china-return-prep / work-visa-renewal-6months / health-pension-switch / parents-visit-visa | 5 |
| **家庭状态变化** | after-marriage-30days / after-divorce-30days / after-child-birth / after-relocation / child-school-transfer | 5 |
| **工作住房状态变化** | after-job-loss-30days / company-bankruptcy / unemployment-koyou-hoken / retirement-prep / housing-renewal | 5 |
| **重大里程碑 / 紧急情况** | eijuu-prep-1year / kika-prep-6months / pregnancy-benefits / high-medical-cost / disaster-relief | 5 |

### 总字符数

- 20 篇文件总字符：**173,232**
- 平均每篇约 8,660 字符（含 frontmatter / 中日混合 / 时间线分阶段 / markdown 链接）

### 政府来源引用

每篇 ≥1 个真实 .go.jp 政府公式 markdown 链接 + 取得日 2026-04-29。
20 篇覆盖：法務省 / 出入国在留管理庁 / 厚生労働省 / こども家庭庁 / 日本年金機構 / 文部科学省 / 国土交通省 / 内閣府 防災 / 警察庁 / 総務省 / 法務局 帰化 / e-Gov 法令 / ハローワーク 等。

### ⚠️ 复核标记

20 篇中 **12 篇含 ⚠️ blockquote 复核块**（在 frontmatter 之后、正文前）。

主要复核点（汇总）：
- 永住申请：2026/2/24 永住法 改正 公的義務不履行 → 取消运用基准
- 帰化申请：中国驻日大使馆「退出中国国籍许可」具体手续
- 怀孕：2026 年度 育児休業給付金 改定（最初 28 日 80%）施行状况
- 高額療養費：2025/8 / 2027/8 段階引上げ施行状况
- 灾害救助：地域別 義援金 配分基準 / 自治体独自支援
- 中国回国：脱退一時金 5 年分上限 + 日中社保协定通算
- 父母探亲：マルチ査証最新条件 + JVAC 指定旅行代理店経由义务
- 結婚 / 離婚：日本人配偶者等 申請 3 ヶ月以内 受理 实务期待 + 日本人配偶者等 → 定住者 申請的不文律
- 出生：2024.10 児童手当 第 3 子 定义
- 搬家：マイナンバーカード 特例転出 最新运用
- 转学：帰国生 学年判定 自治体差

---

## 20 篇清单

### 生活状态变化（5 篇）

| # | scenario_key | 主题 |
|---|---|---|
| 01 | `first-30-days-in-japan` | 刚来日本第 1-30 天必办（住民登録 / 在留カード / 国保 / 銀行 / 印鑑 / 携帯） |
| 02 | `china-return-prep` | 中国回国前在日清算（永住放棄 vs 再入国 / 税金 / 家具 / 住所抹消） |
| 03 | `work-visa-renewal-6months` | 工作签证到期前 6 个月准备 |
| 04 | `health-pension-switch` | 国保 / 社保 切换情景与加入空白防止 |
| 05 | `parents-visit-visa` | 父母来日探亲签证前后准备 |

### 家庭状态变化（5 篇）

| # | scenario_key | 主题 |
|---|---|---|
| 06 | `after-marriage-30days` | 结婚后 30 日内必办清单 |
| 07 | `after-divorce-30days` | 离婚后 30 日内必办（入管 6 ヶ月内届出 / 在留資格変更 検討） |
| 08 | `after-child-birth` | 孩子出生后必办（出生届 / 在留資格 取得 / 児童手当 / 出産育児一時金） |
| 09 | `after-relocation` | 搬家后必办 13 桩事 |
| 10 | `child-school-transfer` | 孩子日本学校转学手续 |

### 工作住房状态变化（5 篇）

| # | scenario_key | 主题 |
|---|---|---|
| 11 | `after-job-loss-30days` | 离职 / 被裁员后 30 日内必办（雇用保険 / 国保 / 入管 14 日届出） |
| 12 | `company-bankruptcy` | 公司倒闭后必看（倒産特例給付 / 未払い賃金立替制度） |
| 13 | `unemployment-koyou-hoken` | 失业了雇用保険申請（待期 7 日 / 給付制限 2 ヶ月 / 28 日認定サイクル） |
| 14 | `retirement-prep` | 退休前后清单（60 歳前後） |
| 15 | `housing-renewal` | 房屋租赁合同到期更新（更新料 / 礼金 / 退去清算） |

### 重大里程碑 / 紧急情况（5 篇）

| # | scenario_key | 主题 |
|---|---|---|
| 16 | `eijuu-prep-1year` | 永住申请前 1 年准备清单 |
| 17 | `kika-prep-6months` | 帰化申请前 6 个月准备清单 |
| 18 | `pregnancy-benefits` | 怀孕期间补助申请（妊娠届 / 母子手帳 / 出産育児一時金 ¥500,000） |
| 19 | `high-medical-cost` | 高额疗养费申请（限度額認定証 / 多数該当） |
| 20 | `disaster-relief` | 灾害发生后救助申请（罹災証明書 / 義援金 / 災害弔慰金） |

---

## Frontmatter 新 schema 字段（CCA）

batch-07 引入 **新 frontmatter 字段（scenario 类专用）**：

```yaml
slug: scenario-{scenario_key}
title: ...
scenario_key: <key>
scenario_type: state_change | milestone | preparation | emergency
triggered_by: text[]    # 触发事件
priority: must_see | normal
estimated_read_time_minutes: int
scenario_tags: text[]
applies_to: text[]
urgency_level: low | medium | high
timeline_stages: text[]   # 时间线阶段 key 数组（"第 1 日" / "第 7 日" / "12 月前" 等）
last_verified_at: date
sources_count: int

# 兼容旧字段
requires_shoshi_review: null
last_reviewed_by_name: null
last_reviewed_by_registration: null
review_notes: null
```

---

## 给 CCA 的待办（Block 14+）

### 方案选择

- **方案 A**：扩展 `articles` 表加 column（scenario_key / scenario_type / triggered_by / timeline_stages 等）
- **方案 B（推荐）**：新建 `scenarios` 表（与 articles / check_dimensions / documents 解耦）

### 时间线消费逻辑

batch-07 是 TEBIQ「身份转变 / 决策清单」工具的语义层：
1. 用户选场景（结婚 / 搬家 / 退休等） → 加载 scenario
2. 渲染 5 段（适用场景 / 时间线 / 必办事项 / 容易遗漏 / 信息来源）
3. 时间线阶段（timeline_stages）→ 倒计时提醒（如「12 月前 / 6 月前 / 3 月前 / 1 月前」可与 user 在留期限 联动）
4. 每条「必办事项」→ 可触发拍照识别（batch-06 documents）+ 维度自查（batch-04/05 dimensions）
5. 归档到 user 时间线（产品哲学 v1）

### Importer 改造

- 新增 `scenarios` 表 schema migration
- 改造 import 脚本支持 `docs/knowledge-seed/scenarios/*.md` 路径
- 新建 `getScenarioByKey(key)` / `getScenariosByVisaType(visa_type)` 查询函数

### 与 batch-06 的关联

scenario 内的「必办事项」常对应 batch-06 的 document：
- 「結婚届 提出」→ batch-06 #14（児童手当 / 戸籍関係）
- 「在留資格変更」→ batch-06 #22
- 「住所変更届」→ batch-06 + 国保 / 年金 / 銀行
- 等等

可在数据层做 `scenario.required_actions[].linked_document_id` 关联。

---

## 哲学 + 结构合规

### Voice 铁律（每篇都自查通过）

- ✓ 工具感 voice：「已归档 / 已识别 / 期限冲突 / 倒計時 / 公的義務不履行」
- ✓ 不撒娇 / 不温情 / 不戏剧化 / 不 emoji
- ✓ 「行政書士」/「弁護士」/「社労士」三个字仅在最后段「信息来源」末尾唯一引流句出现
- ✓ 中日混合：术语全保留日文原文（在留資格 / 在留カード / 雇用保険 / 厚生年金 / 国民年金 / 国保 / 児童手当 / 出産育児一時金 / 高額療養費 / 罹災証明書 / 帰化 / 永住 / 婚姻届 / 離婚届 / 出生届 / 転入届 / 在留期間更新 / 等）

### 结构 5 段（每篇都有）

1. `## 适用场景`（3 行 — 谁该看 / 触发 / 不适用）
2. `## 时间线`（按日期梯度分阶段）
3. `## 必办事项`（每条 3 要素：在哪办 / 要什么材料 / 不办的后果）
4. `## 容易遗漏的事`（在日华人常踩 2-3 个坑）
5. `## 信息来源`

### 法定 vs 实务区分

每篇严格区分「法定数字（法令明文）」vs「实务通说（書士实操）」，模糊数字标 ⚠️。

### 特殊处理

- **永住 / 帰化**：写制度 + 流程，不写「该选哪个」
- **離婚 + DV**：DV 议题引导制度路径（弁護士 / DV 相談所），不情感化
- **公司倒闭 / 失业**：制度 + 路径，不评价雇主
- **灾害救助**：制度 + 申請流程，不戏剧化

---

## 总结：batch-05 + 06 + 07 三批合计

| batch | 主题 | 篇数 | 字符 | schema |
|---|---|---|---|---|
| batch-05 | visa-specific 维度卡 | 25 | 159,698 | 沿用 batch-04 |
| batch-06 | 高频文书逐封解读 | 50 | 332,267 | 新 schema（documents 表） |
| batch-07 | 场景化决策清单 | 20 | 173,232 | 新 schema（scenarios 表） |
| **合计** | | **95** | **665,197** | |

---

## 文件位置

- 20 篇 markdown：`docs/knowledge-seed/scenarios/{scenario_key}.md`
- 本报告：`docs/knowledge-seed/BLOCK_BATCH07_REPORT.md`

🤖 by tebiq-knowledge-base skill (Block 13+ batch-07 / product-philosophy v1)
