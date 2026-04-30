# Answer Seed v0 — 报告（ANSWER_SEED_V0_REPORT）

**生成**：2026-04-30
**分支**：`content/answer-seed-v0`
**任务性质**：不写文章 / 不写营销 / 不写完整长答案 — 准备 answer engine 可直接匹配 + 展示的种子答案

---

## 总数

**100 条**（Q001-Q100，分 4 个文件）：

| 文件 | 范围 | 主题 |
|---|---|---|
| `answer_seed_001-025.md` | Q001-Q025 | 永住（15）+ 工作签（10） |
| `answer_seed_026-050.md` | Q026-Q050 | 経営・管理（15）+ 公司设立（10） |
| `answer_seed_051-075.md` | Q051-Q075 | 特定技能（5）+ 定住者（5）+ 配偶（5）+ 离婚 / 转签（10） |
| `answer_seed_076-100.md` | Q076-Q100 | 住民税 / 年金 / 社保 / 地址 / 换工作 / 公司倒闭 / 父母来日 / 等 |

---

## 类型分布（answer_type）

按 brief 7 类标准取值（已标准化）：

| 类型 | 数量 | 占比 | 含义 |
|---|---|---|---|
| `decision_card` | 32 | 32% | 多路径分歧 → 推荐方向 + 解释为什么不选其他 |
| `workflow` | 24 | 24% | 单一线性流程 → 步骤 + 必备材料 |
| `info` | 18 | 18% | 事实说明 / 概念定义 |
| `needs_expert` | 16 | 16% | 必须专家介入（不能简单回答）|
| `risk_chain` | 7 | 7% | 用户当前状态 + 不处理后果链 |
| `misconception` | 3 | 3% | 认知纠偏 |

**高风险类型合计：26 条**（needs_expert 16 + misconception 3 + risk_chain 7）— 超过 brief 要求的 20 条。

---

## L1/L2/L3/L4 分布

| 等级 | 数量 | 占比 | 说明 |
|---|---|---|---|
| L1 — 1 句话事实 | 8 | 8% | 制度定义 / 期限 / 金額 |
| L2 — 多步骤流程 | 34 | 34% | workflow 类标准答案 |
| L3 — 多路径决策 | 39 | 39% | decision_card 类条件分歧 |
| L4 — 复杂个案 / 需专家 | 19 | 19% | 个案审查 + expert_handoff |

---

## requires_review 数量

**44 条**（44%）含 `requires_review: true`。

主要复核点分布：
- 经管 2025/10/16 改正 实施细则 / 経過措置（Q026-Q028, Q032）
- 永住法 2026/2/24 改正 公的義務 評価口径（Q005, Q083）
- 特定技能 業種数 / 試験有効性 实务通说（Q051, Q053, Q055）
- 定住者 不满 3 年路径 / DV / 死别 个案性（Q057, Q065）
- 経管 续签 决算赤字 个案救济（Q040）
- 出资金 跨境 ODI 备案（Q036，中国侧政策频繁变化）

---

## source_gap 数量

**0 条** 显式标 `source_gap: true`。

部分条目 `source_grade: B` 因实务通说性质（非政府明文）：
- 35 条 source_grade B（实务通说 / 业界公认 / 部分官方公示）
- 64 条 source_grade A（政府公式 + 现行）
- 1 条 source_grade C（个案 / 难取证 / 跨境）

---

## TOP 20 高价值答案（按合规 + 高频 + 差异化筛选）

| # | Q | 主题 | answer_type | source_grade |
|---|---|---|---|---|
| 1 | Q017 | 换工作 14 日届出 + 後果 | workflow | A |
| 2 | Q024 | 公司倒闭 在留资格 立即取消？(misconception) | misconception | A |
| 3 | Q003 | 永住者带父母来日（misconception） | misconception | A |
| 4 | Q091 | 老板雇错签证 我会被牵连吗 | needs_expert | A |
| 5 | Q057 | 离婚不满 3 年定住者 路径 | needs_expert | B |
| 6 | Q099 | 不法滞在 自首：出国命令 vs 退去强制 | needs_expert | A |
| 7 | Q010 | 永住放棄 / 再入国 / みなし再入国 区别 | info | A |
| 8 | Q026 | 経管 改正 既存持有人 应对 | decision_card | B |
| 9 | Q081 | 公司休眠 → 厚生年金 → 国民年金 切换 | needs_expert | A |
| 10 | Q082 | 国保 / 社保 切换空白防止 | workflow | A |
| 11 | Q036 | 経管 出资金 中国汇入 ODI 备案 | needs_expert | C |
| 12 | Q031 | 経管 公司休眠 在留资格 | needs_expert | B |
| 13 | Q065 | DV 受害者 在留特例措施 | needs_expert | A |
| 14 | Q058 | 抚养日本人子女 → 定住者（接近 100%） | workflow | A |
| 15 | Q029 | 経管 续签 法人税务 跨地域証明 | needs_expert | B |
| 16 | Q066 | 离婚后 6 ヶ月 在留資格変更 義務 | workflow | A |
| 17 | Q050 | 法人事業税 / 法人住民税 / 消費税 三税时机 | needs_expert | B |
| 18 | Q098 | 在留期間更新 不许可 → 補正 → 异议 | needs_expert | A |
| 19 | Q040 | 経管 续签 決算赤字 救济路径 | needs_expert | B |
| 20 | Q097 | 拍照识别催缴信（TEBIQ 差异化） | workflow | A |

### TOP 20 整体特征

- 高风险题（needs_expert / misconception）占 13 / 20 = 65%
- 这些是 **TEBIQ 必须能优雅回应「不能简单回答」的题**
- 与 ChatGPT / 通用 AI 的核心差异化：不替用户做行政决定 + 引向专家咨询

---

## 5 个 seed card 状态（v1 已交付，v0 沿用）

v0 不重写 seed cards，沿用 v1 已交付的 5 个完整 YAML（在 `docs/decision-seed-cards/` 内，已 push 到 `content/real-question-data-v1`）：

| Slug | 类型 | 字段完整 | 关联 case |
|---|---|---|---|
| `pension-switch-company-dormant.yaml` | decision_card | ✓ | 潘先生（Q081 关联） |
| `management-office-relocation.yaml` | workflow | ✓ | 顾夏夏（Q032 / Q092 关联） |
| `address-change-order.yaml` | workflow + decision | ✓ | 卢向阳（Q084 / Q086 关联） |
| `bring-parents-to-japan.yaml` | misconception | ✓ | 永住带父母（Q003 / Q093-Q095 关联） |
| `employment-violation-risk-chain.yaml` | risk_chain | ✓ | 老板雇错签证（Q091 关联） |

如需 v0 分支也含 seed cards，可由 CCA cherry-pick `content/real-question-data-v1` 的 `docs/decision-seed-cards/`。

---

## 哪些可直接导入 `/admin/questions/import`

按 review_status + source_grade 双轴判断：

### Tier 1 — 直接导入（review_status: unreviewed + source_grade: A + 不需要专家）

约 **40 条**。这些事实层面清晰，CCA 可直接调用 importer 入库 + 前端公开展示（带「未经书士复核」小标签）。

举例：
- Q010 永住放棄 / 再入国 / みなし再入国 区别
- Q012 永住后还要在留期間更新吗
- Q017 换工作 14 日届出
- Q076 住民税 何时该交 + 期限
- Q079 国民年金 vs 厚生年金 区别
- Q084 搬家 14 日届出 顺序
- Q086 在留カード 住居地届出 14 日 期限失效后果
- Q093 父母短期滞在 90 日 招聘理由書
- 等等

### Tier 2 — 导入但前端标「需复核」（requires_review: true + source_grade: A 或 B）

约 **44 条**。可入库但前端显示「待书士复核」标识，不影响展示。

### Tier 3 — 导入但前端标「需专家咨询」（answer_type: needs_expert）

约 **16 条**。展示 summary + 立即引导 ¥9,800 咨询入口。

举例：
- Q003 永住者带父母（misconception 路径替代 + 引导）
- Q031 経管 公司休眠
- Q057 离婚不满 3 年定住
- Q065 DV 特例
- Q091 老板雇错签证（雇主 / 雇员双方风险）
- Q099 不法滞在 自首

### Tier 4 — 不导入 / 后台仅做内部数据（source_grade: C 或 source_gap: true）

约 **1 条**。仅作内部数据，不公开展示。

举例：
- Q036 ODI 跨境（中国侧政策变化频繁）

---

## 哪些需要专家复核

**16 条 needs_expert + 3 条 misconception = 19 条**强制专家介入。

具体复核分工建议：

### 行政書士（在留管理）
- Q003 永住带父母
- Q020 雇用契約 到期未续
- Q024 公司倒闭 在留资格
- Q031 経管 公司休眠
- Q032 経管 事務所搬迁
- Q057 离婚不满 3 年定住
- Q091 老板雇错签证
- Q098 在留期間更新 不许可
- Q099 不法滞在 自首
- Q100 帰化 6 个月准备

### 弁護士（刑事 / 訴訟）
- Q091 不法就労助長罪 + 量刑
- Q099 退去強制 異議申立 + 取消訴訟
- Q065 DV 保護命令

### 税理士 / 社労士
- Q029 経管 法人税务 跨地域証明
- Q040 経管 決算赤字
- Q050 法人三税 时机
- Q081 厚生年金 → 国民年金 切换 + 倒産特例
- Q083 年金滞纳清算 + 永住影响

---

## 给 CCA 的接入建议

### Schema 建议（`question_seeds` 表）

```sql
slug                         text     primary key
question_id                  text     -- 'Q001' 等
aliases                      text[]   -- 用户提问别名
question                    text     -- 归一化提问
answer_level                 text     -- L1 | L2 | L3 | L4
answer_type                  text     -- info | workflow | decision_card |
                                       --   risk_chain | misconception |
                                       --   needs_expert | cannot_determine
review_status                text     -- unreviewed | reviewed | flagged
source_grade                 text     -- A | B | C
source_gap                   boolean
requires_review              boolean
summary                      text
sections                     jsonb    -- [{heading, body}]
next_steps                   text[]
source_hint                  text[]
boundary_note                text
created_at                   timestamptz
updated_at                   timestamptz
```

### Importer 路由

`docs/answer-seed/answer_seed_*.md` → `question_seeds` 表

每条 Q 用 `## Q[number]` 切分，YAML-like fields 解析为 column。`sections:` 用 yaml-parser 入 jsonb。

### 前端 `/admin/questions/import` 调用

后端读 `question_seeds` 表 + 按 alias / question 模糊匹配。前端展示 summary + 各 sections。`needs_expert` / `misconception` 类直接展示「这个问题不能简单回答」+ 引导 ¥8,800 咨询。

### 与已有 batch 关联

- Q017 / Q084 / Q086 等 → 关联 batch-04/05 dimensions
- Q010 / Q024 / Q093 等 → 关联 batch-07 scenarios
- Q076 / Q078 / Q082 等 → 关联 batch-06 documents

可在 importer 时建立 `related_dimension_slugs` / `related_document_slugs` / `related_scenario_slugs` 关联表（参考 `SCHEMA_RECOMMENDATIONS.md`）。

---

## 边界

- 本批次**不写完整答案** — 仅 summary + 3-4 sections 简短指引
- 100 条全部 `review_status: unreviewed` — 等行政書士 / 税理士 / 社労士 复核
- ⚠️ 复核点不阻断上线（按创始人「上线后复核」原则）
- 不替用户做行政决定 — 复杂题引向 ¥9,800 咨询入口

---

🤖 by tebiq-knowledge-base skill / answer-seed-v0
