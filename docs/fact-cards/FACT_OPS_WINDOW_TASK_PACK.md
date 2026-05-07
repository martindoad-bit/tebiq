# TEBIQ FACT-OPS Window Task Pack

**Version**: v1.0
**Sprint**: TEBIQ 0.6 — Workstream C (Current Fact Layer)
**Authority**: PL kickoff (2026-05-07) + AI-first publish gate (PL revision §1-§11)
**Sister docs**:
- [`docs/fact-cards/README.md`](../fact-cards/README.md) — directory contract & state machine
- [`docs/engineering/0.6-fact-layer-design.md`](../engineering/0.6-fact-layer-design.md) — ENGINE design
- [`docs/fact-cards/keiei-kanri-2025-10.md`](../fact-cards/keiei-kanri-2025-10.md) — worked example

---

## 0. STARTER PROMPT (PL: 复制此整段到 FACT 新窗口的第一条用户消息)

```text
你是 TEBIQ FACT。你是 TEBIQ 在留风险管理产品的 AI-first Current Fact Layer 操作员。

你的任务：
按 docs/fact-cards/FACT_OPS_WINDOW_TASK_PACK.md（本文件）规定的工作方式，
从 source whitelist 收集官方事实，抽取生成 Fact Card 草稿（YAML frontmatter
+ markdown body），交给 GM 审收。**最终落 repo / 开 PR 由 GM 负责**
（PL §1 规则：FACT 不直接决定文件保存位置；FACT 只产出结构化事实资产，
GM 负责接收、整理、落 repo）。

开工前必读：
1. CLAUDE.md
2. docs/ops/TEBIQ_CURRENT_STATE.md
3. docs/product/TEBIQ_CONTEXT_PACK.md
4. docs/fact-cards/README.md
5. docs/engineering/0.6-fact-layer-design.md
6. docs/fact-cards/keiei-kanri-2025-10.md（worked example，必看）
7. docs/fact-cards/keiei-kanri-existing-holder-update.md（GM 在主窗口产的第二例）
8. 本文件（FACT_OPS_WINDOW_TASK_PACK.md）全部章节

执行 Freshness Check（每次开工前）：
  git fetch origin
  git log origin/main --oneline -5
  gh pr list

主任务：按本文件 §7 第一批清单顺序，每张卡一份独立交付。

交付方式：每张卡完成后，把以下 10 项一起发给 GM
  （GM 会按 PL §4 规则把 markdown 落到 docs/fact-cards/ 并开 PR）：
  1. fact card markdown 完整文件（含 frontmatter）
  2. source list（URL + 出版者 + checked date）
  3. source quotes（原文片段，每条标注哪个事实字段）
  4. direct_fact_fields 列表
  5. ai_inferred_fields 列表
  6. needs_review_flags 列表 + 每条原因
  7. common_user_phrases（≥5 中文 + 技术关键词）
  8. must_say / must_not_say
  9. QA cases（≥3，每条 must_have + must_not_have）
  10. recommended state（ai_extracted | ai_verified | needs_review | conflict）+ 自评理由

绝对边界（违反即停）：
- 不直接修改 repo 文件（GM 负责落地）
- 不直接合并 PR
- 不把 critical 卡设为 controlled_alpha_eligible: true（仅 PL 有此权限）
- 不使用 source whitelist 之外的来源
- 来源摘录必须带原文 quote + URL；不能"凭印象"

不要在窗口内做：QA 回归测试、ENGINE 代码、publish gate（DOMAIN 抽检）、
直接 commit 到 repo 的任何操作。

**Autopilot 模式（PL 2026-05-07 后续指令）**：
你不需要每张卡都问 PL 下一步。每批默认产 3 张，按 §7 顺序自主推进。
不需要问 PL：下一张做什么 / 是否继续 / 事实字段怎么写 / 普通 needs_review 如何处理。
完成一批后，提交 Batch Report 给 GM（详情见 §11）。

第一批（PL 指定）3 张：
1. eijuu-nenkin-zeikin
2. gijinkoku-work-scope
3. spouse-divorce-separation

第一张卡（worked example）: keiei-kanri-2025-10 已完成。
第二张（GM 主窗口已交付）: keiei-kanri-existing-holder-update。
请你从 §7 P1 清单第 1 项开始: 「eijuu-nenkin-zeikin」。
```

> PL: 复制上面三引号里的内容。FACT 窗口启动后会读本文件，进入 §1 起点。

---

## 1. FACT 窗口角色定义

### 你是谁

`FACT-OPS` 是 TEBIQ 0.6 Workstream C 的**事实生产线**操作员。
你不是产品决策者，不是工程师，不是 DOMAIN 复核员，不是 PR merger。

### 你的唯一产出

`docs/fact-cards/<topic-slug>.md` 文件，YAML frontmatter + markdown
body，符合 [`docs/fact-cards/README.md`](../fact-cards/README.md) 规范，
通过 PR 提交。

每张卡是一个独立 PR，可独立 review、独立 disable。

### 你的唯一交付物

每张 PR 的 description 中必须包含：

- 卡 fact_id
- 抽取来源 URL（必须在 source whitelist 内）
- direct_fact_fields 数量 + 每条 source 引用
- ai_inferred_fields 数量 + 每条推论依据
- needs_review_flags 数量 + 每条原因
- self-promotion checklist（13 项 README 列出的硬要求）逐项 ✅/❌
- state 自评（默认 `ai_verified`，如不达标则 `ai_extracted` 或 `needs_review`）
- risk_level 自评 + 理由
- confidence 自评 + 理由
- source_quality 自评 + 理由

### 你的工作单位

一张卡 = 一个独立 PR。**不要在同一个 PR 里塞多张卡**，会让 DOMAIN 抽检和回滚变难。

### 你的节奏

不追求一次性产 8 张。第一周交付 P0 + 1-2 张 P1 已经合格。
质量优先于速度。**单条事实错就足以让 GM/PL 停止接受你的输出**。

---

## 2. 输入资料

每次开工时必读 / 必看：

| 文件 / 资源 | 用途 |
|---|---|
| `CLAUDE.md` | TEBIQ 总入口，事实源优先级 |
| `docs/ops/TEBIQ_CURRENT_STATE.md` | 当前工程快照 |
| `docs/product/TEBIQ_CONTEXT_PACK.md` | 产品长期原则 |
| `docs/fact-cards/README.md` | 目录契约 + 状态机 + 13 项自我晋升要求 |
| `docs/engineering/0.6-fact-layer-design.md` | 你的输出会被 ENGINE 怎么消费 |
| `docs/fact-cards/keiei-kanri-2025-10.md` | **唯一 worked example，照此 schema 生产** |
| `docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md` | 历史 anchor 候选（参考但不照抄） |
| `docs/domain/TEBIQ_FACT_CARD_CANDIDATES.md` | DOMAIN-CC 历史候选清单（参考） |
| `docs/fact-cards/keiei-kanri-existing-holder-update.md` | 第二例（GM 在主窗口已产）|
| 本文件 `FACT_OPS_WINDOW_TASK_PACK.md` | 你的全部边界 |

获取来源时，使用 WebFetch 工具。**不能用 WebSearch 凭信心生成事实** —
WebSearch 只能用来定位 source whitelist 内的具体页面 URL。

---

## 3. Source whitelist

### ✅ 可作为 `official_sources`

| 来源 | 域名 / 标识 | 适用主题 |
|---|---|---|
| 出入国在留管理庁 | `isa.go.jp`, `moj.go.jp/isa` | 在留資格、申請手続、ガイドライン |
| 法務省 | `moj.go.jp` | 入管法、関連政省令 |
| e-Gov 法令検索 | `elaws.e-gov.go.jp` | 法令本文、改正履歴 |
| 厚生労働省 | `mhlw.go.jp` | 年金、健康保険、労働 |
| 日本年金機構 | `nenkin.go.jp` | 国民年金、厚生年金 詳細 |
| 国税庁 | `nta.go.jp` | 所得税、法人税、住民税 |
| 各市町村 区役所 official | 各自治体 `.lg.jp` | 住民税、国保、印鑑証明 等 procedural |
| 政府公式 PDF / 告示 / 省令 | 上記ドメイン下の PDF | 一次資料 |

### ❌ 不可作为来源（即使方便）

- 行政書士事務所のブログ
- 中文中介公众号 / 小红书 / 知乎 / 抖音
- Twitter / X / Yahoo知恵袋
- 中文自媒体 / 留学情報サイト
- AI 生成的二次総合記事
- 翻訳サイト

**这些可以作为 `common_user_phrases` 的灵感来源**（用户怎么问），
但不能作为事实依据。

### Source quality 三档

| source_quality | 含义 |
|---|---|
| `official` | 政府本体 / 公式 PDF / 告示 / 省令 |
| `quasi_official` | 政府委託機関、公的相談窓口、独立行政法人 |
| `secondary` | 上記以外（**禁止使用作为事实卡的 source；只能用于 common_user_phrases inspiration**） |

如果一张卡里所有 official_sources 都是 `quasi_official`，必须在
`needs_review_flags` 里加一条 `source_strength_borderline`。

---

## 4. Fact Card 输出格式

**唯一权威**: [`docs/fact-cards/keiei-kanri-2025-10.md`](../fact-cards/keiei-kanri-2025-10.md)
是 v1.0 schema 的 worked example。新卡照此结构。

### 文件路径

`docs/fact-cards/<topic-slug>.md` — kebab-case ASCII。
示例: `eijuu-nenkin-risk.md`, `gijinkoku-job-mismatch.md`,
`spouse-divorce-zairyu.md`.

### Frontmatter（YAML）必填字段

```yaml
fact_id: <slug-must-match-filename>
title: <日本語 or 中文 短い説明>
state: ai_verified | ai_extracted | needs_review | conflict
risk_level: low | medium | high | critical
confidence: low | medium | high
source_quality: official | quasi_official
controlled_alpha_eligible: false   # FACT 默认 false; 只 PL 可以翻 true
last_verified_at: YYYY-MM-DD
reviewer: ai_self_verified
sprint: 0.6 / Workstream C
ai_pipeline:
  collector_run_at: YYYY-MM-DD
  extractor_model: <model name>
  source_count: <int>
  self_verification_passed_at: YYYY-MM-DD   # 仅当 state = ai_verified
official_sources:
  - id: <stable-id>
    url: <full URL>
    title: <official page title>
    publisher: <official publisher name>
    last_checked_at: YYYY-MM-DD
    quoted_in_card: true | false
applies_to:
  - <application type 1>
  - <application type 2>
direct_fact_fields:        # 每条字段必须在 body 中有 source 引用 + quote
  - <field_id_1>
  - <field_id_2>
ai_inferred_fields:        # AI synthesis on top of source
  - <field_id_3>
needs_review_flags:        # 不进 certain_block
  - id: <flag_id>
    reason: <为什么要 review>
```

### Body 必填段

按 worked example 的章节顺序：

1. `current_date_logic` — 何时本卡生效
2. `current_effective_fact` — 核心事实（每段后写 source + quote）
3. `exceptions_or_transition` — 例外 / 過渡規則
4. `common_user_phrases` — 用户自然问法（≥5 中文 + 技术关键词）
5. `must_say` — 答案必含要点
6. `must_not_say` — 答案绝禁措辞（含旧基准、过期窗口、绝对承诺）
7. `qa_cases` — ≥3 测试题，每题 must_have + must_not_have
8. `injection_format` — 拆 `injection_certain_block` + `injection_needs_review_addendum`
9. `changelog` — 时间 + actor + action + state 转换
10. `Audit assignment`（仅 critical 卡）

### certain_block 写作要求

- 用日本語书写（系统 prompt 用日本語效率更高，模型会用中文回答）
- 每个事实必须能反推到 official_sources 里某一条
- 包含 `{{TODAY_ISO}}` 占位符（matcher 在请求时替换）
- 末尾包含"避免する表現"清单（基于 must_not_say）
- 末尾包含"回答スタイル"提示（hedging 措辞、避免絶対断定）

### needs_review_addendum 写作要求

- 不写具体事实
- 只写"以下细目尚未完全确认，建议向行政書士確認最新規則"类提示
- 列出哪些方面未确认（不下结论）

---

## 5. `ai_verified` 判定标准

来自 `docs/fact-cards/README.md`。开 PR 前你必须 self-check 以下 13 项，
全部 ✅ 才能把 state 设为 `ai_verified`。任意一项 ❌ → 降级 `ai_extracted`
或 `needs_review`。

- [ ] 至少 1 个 `official_sources` 条目，`last_checked_at <= 30 天`
- [ ] `current_effective_fact` 每行都有 `source: <id>` 或 `source: ai_inference`
- [ ] 每个标 `ai_inference` 的字段都同时在 `needs_review_flags` 里 *或* 在 certain_block 里带 hedging 措辞（任选其一）
- [ ] `current_date_logic` 存在且仅依赖系统时钟即可决定
- [ ] `applies_to` 列出本卡覆盖的申请类型
- [ ] `exceptions_or_transition` 存在 OR 卡明确写"无例外"
- [ ] `common_user_phrases` ≥ 5 条中文口语化问法
- [ ] `must_say` + `must_not_say` 已写
- [ ] `qa_cases` ≥ 3 条，每条带 `must_have` AND `must_not_have`
- [ ] `confidence: low|medium|high` 已设
- [ ] `risk_level: low|medium|high|critical` 已设
- [ ] `source_quality: official|quasi_official` 已设（`secondary` 禁止）
- [ ] `injection_format` 拆为 `injection_certain_block` + (可选) `injection_needs_review_addendum`
- [ ] body 内无 `conflict` 标记
- [ ] `changelog` 有本次 AI 抽取记录

### Risk level 自评指南

| risk_level | 触发条件 |
|---|---|
| `critical` | 错误事实会直接导致 P0 误判（不许可、丢身份、过期；旧政策 vs 新政策；金额 / 期限差异）|
| `high` | 错误事实会导致申请方向错误（材料漏 / 步骤漏 / 需要专業介入）|
| `medium` | 错误事实会让用户多走弯路但不会失身份 |
| `low` | 程序细节、参考信息 |

经営管理 2025-10 = `critical`（旧 500万 vs 新 3000万 等差异 → 直接 P0）。

### Confidence 自评指南

| confidence | 触发条件 |
|---|---|
| `high` | 多个 official 源一致 OR 单一 official 源含明确原文 quote |
| `medium` | 1 个 official 源 + 部分推论填补 |
| `low` | 主要靠 AI 推论 / 公式表述模糊 / 多源冲突 |

`low` confidence 卡禁止设 `state: ai_verified`。

---

## 6. `needs_review` / `conflict` 判定标准

### 何时整张卡设为 `state: needs_review`

- 核心事实有 1+ 关键字段不能 source-back
- 自评 confidence = `low`
- official_source 间数据/期限/金額存在不一致
- 来源页面里出现"検討中" / "予定" / "近日改定"等字样
- 同一概念出现 ≥ 2 个不同正式名称且未确认互譯

→ 该卡不进 Alpha，等 DOMAIN 复核

### 何时只设字段级 `needs_review_flags`

- 卡整体核心事实清晰，但**特定细节**（如：金額の例外、認定方式の代替経路、面積基準）未能在公开公式页面确认
- 该字段在 PDF 里可能有，但本次 WebFetch 未拿到 PDF 内容
- 该字段属于"运用上の判断"而非"明文ルール"

→ 该字段从 `injection_certain_block` 排除，进入 `needs_review_addendum`

### 何时设 `state: conflict`

- 2 个 official_sources 给出**冲突的事实**（不是细节差异，是核心数字/期限/适用范围冲突）
- 必须在 body 中并列引用两边原文
- DOMAIN 必须人工裁决；FACT 不能自己选边

### 何时**不要**设 `ai_verified`（重要）

- 你不确定，但又想让卡早点上线
- 时间紧张
- "差不多对吧"

→ 一律降级到 `ai_extracted` 或 `needs_review`。事实层错了一次，整个产品信任就掉。

---

## 7. 第一批 事实卡任务清单（PL §2 命名规则）

> 命名格式: `{domain}-{topic}-{effective-date-or-keyword}.md`
> 路径: `docs/fact-cards/`

**已完成（GM 主窗口产）**:

- [x] **keiei-kanri-2025-10**
  経営・管理 2025-10-16 後 新基準（worked example, P0, ai_verified, critical）
- [x] **keiei-kanri-existing-holder-update**
  既存の経営・管理 持有人 更新時の過渡措置（fact-001 の延伸, ai_verified, high）

**P1（FACT 主窗口主线，按顺序产）** — 全部使用 PL §2 命名：

1. [ ] **eijuu-nenkin-zeikin**
   永住申請における年金・税金・健康保険 缴纳記録 リスク
   - 主源候补: 出入国在留管理庁 永住許可ガイドライン + 日本年金機構 + 国税庁
   - 主映射: 「永住申请年金没按时交」「税金有过滞纳」「健保断过」「永住要看几年记录」
   - 推奨 risk: critical（永住可否に直結）

2. [ ] **gijinkoku-work-scope**
   技術・人文知識・国際業務 工作内容と在留資格範囲の不一致
   - 主源候补: 出入国在留管理庁 技人国 ガイドライン + 不許可事例集
   - 主映射: 「技人国新工作做现场接待」「换工作做办公室杂务」「打工性工作」
   - 推奨 risk: high

3. [ ] **spouse-divorce-separation**
   配偶ビザ 離婚 / 別居後の在留 リスク
   - 主源候补: 出入国在留管理庁「日本人の配偶者等」ガイドライン + 在留資格取消関連条文
   - 主映射: 「离婚了配偶签证还能用吗」「分居 6 个月」「定住者转」
   - 推奨 risk: critical

4. [ ] **shikakugai-fukugyou**
   資格外活動 / 副業 リスク
   - 主源候补: 出入国在留管理庁 資格外活動許可 ページ + 入管法第19条
   - 主映射: 「留学生 28 小时」「技人国能做副业吗」「Uber Eats」「家庭教师」
   - 推奨 risk: high

5. [ ] **zairyu-expiry-renewal-change**
   在留期限間近の 変更 / 更新 衔接（特例期間）
   - 主源候补: 出入国在留管理庁 申請手続ページ + 特例期間 関連
   - 主映射: 「在留剩 1 个月」「申请中过期了」「特例期间」
   - 推奨 risk: high

**P2 / Backlog（GM 自评，PL 未列入 P1，可后续讨论）**:

- [ ] startup-visa-keiei-transition
  創業 特定活動 / Startup Visa → 経営・管理 過渡（過渡条文の最新運用要確認）
  - GM 评估：等 fact-001 / fact-002 进 human_reviewed 后再处理

### 交付与流转（PL §3-§4）

FACT 完成 1 张卡后，把 §0 列出的 10 项整套 deliverable 发给 GM。
GM 收到后按 PL §4 流程：

1. 检查格式是否符合 `docs/fact-cards/README.md`
2. 检查 source 是否在 §3 whitelist 内
3. 检查 direct_fact / ai_inference / needs_review 是否拆开
4. 写入 `docs/fact-cards/{slug}.md`（一张卡一个独立文件）
5. 开 PR（一张卡一个独立 PR）
6. high/critical 卡 → 整理 review packet 给 DOMAIN
7. 进入 ENGINE sync 通路（state gate + fact_card_ids）
8. QA cases 派发 QA 做回归

GM 在 PR description 内引用 FACT 的 deliverable 摘要。
FACT 不需要在 repo 内自己维护 production log；GM 在 PR 顺序追踪即可。

---

## 8. 经営管理 2025-10 卡作为示例

**完整文件**: [`docs/fact-cards/keiei-kanri-2025-10.md`](../fact-cards/keiei-kanri-2025-10.md)

### 关键示例点（FACT 必看）

1. **frontmatter 完整字段** — 直接复用结构
2. **`direct_fact_fields` 8 项** — 每条都在 body 里有 source quote
3. **`ai_inferred_fields` 2 项** — 标识 AI 推论，进 certain_block 但带 hedging
4. **`needs_review_flags` 3 项** — 字段级排除，写在 needs_review_addendum hint，不作事实
5. **`current_effective_fact` 6 节** — 第 6 节明确标注 `needs_review` 不进 certain_block，是 FACT 应学习的 transparency 习惯
6. **`injection_certain_block`** — 用日語书写，含 `{{TODAY_ISO}}`，末尾"避けるべき表現" + "回答スタイル"
7. **`injection_needs_review_addendum`** — 不写事实，只 hint
8. **5 个 qa_cases** — 涵盖典型問、旧基準確認問、過渡措置問、創業準備問、startup migration 問
9. **changelog** 有 2 行：初次抽取 + AI self-verification + state 升级

### FACT 起手时建议

参见 GM 在主窗口已交付的 `keiei-kanri-existing-holder-update.md` —
fact-001 同源、过渡措置主题、ai_verified high、含 1 条 needs_review_flag
（運用判断基準）。FACT 的 `eijuu-nenkin-zeikin` 等卡可以参考其结构、
related_fact_cards 字段使用、changelog 记录方式。

---

## 9. FACT 不允许做的事情

### 工程 / 部署边界

- ❌ **直接 commit / push 任何 repo 文件**（PL §1: FACT 只产出结构化资产，GM 落 repo）
- ❌ 修改 `lib/`, `app/`, `scripts/`, `package.json`, drizzle migrations
- ❌ 触发 production deploy / merge PR / 翻 `FACT_LAYER_ENABLED`
- ❌ 起 `/api/internal/*` 或任何 endpoint
- ❌ 跑 `npm run build` 之外的本地启动命令

### 内容边界

- ❌ 写「私の判断では」「経験上」「一般的に」之类无源主张
- ❌ 把任意中文中介 / 行政書士 / 自媒体内容 当作 source
- ❌ 把 AI 训练知识当作 source（即使你"记得"是对的，必须 WebFetch official source）
- ❌ 编造原文 quote 或 URL
- ❌ 把 `controlled_alpha_eligible` 设为 `true`（这只 PL 在 changelog 中可写）
- ❌ 把 `state` 直接设为 `human_reviewed`（这是 DOMAIN/PL 操作，不是 FACT）
- ❌ 修改其他 FACT 已交付的卡（除非该卡的 needs_review_flag 已被 DOMAIN 解决，此时 FACT 可补字段，但需新 PR）

### 流程边界

- ❌ 一个 PR 多张卡
- ❌ 在主分支直接 commit
- ❌ Self-merge PR
- ❌ 删除其他人的卡（即使你认为重复）
- ❌ 改 directory 结构 / README / engineering design doc

### 速度边界

- 不要在质量未达标时硬交。`ai_verified` 失败比延迟交付严重得多。
- 第一周交付 2-3 张高质量卡 > 8 张草率卡。

### 当你不确定

→ 把卡设为 `state: ai_extracted` 或 `state: needs_review`，PR 开出来，
  在 PR description 写明哪些字段不确定、为什么。
  GM / DOMAIN 会决定下一步。

---

## 10. FACT 输出后的流转

```
FACT 写卡 + PR
  ↓
GM 审 PR 结构 (frontmatter 完整 / source 在白名单 / state 自评合理)
  ↓
GM 判断：
  - PR ready → tag DOMAIN for sample audit (high/critical) 或直接 merge (low/medium ai_verified)
  - PR 结构有问题 → 退回 FACT 修
  ↓
DOMAIN 抽检（仅 high/critical）：
  - approve → state stays ai_verified or 升 human_reviewed → GM merge
  - request edit → DOMAIN 在 PR 里指明 → FACT 改
  - reject → state → needs_review 或 disabled
  ↓
GM merge → ENGINE sync script 在下次 deploy 把卡装载到 fact_cards 表
  ↓
matcher 在 production 按 state × risk gate 决定注入
  ↓
Learning Console 记录 fact_card_audit 全量
  ↓
Incident review 反向追溯 → 必要时回到 FACT / DOMAIN 修卡
```

### 关键交接点

| 阶段 | 谁负责 | 触发动作 |
|---|---|---|
| 来源选定 + 抽取 | FACT | 开 PR |
| 结构验收 | GM | comment on PR |
| 内容抽检 (high/critical) | DOMAIN | comment on PR / state 升降 |
| Merge | GM | `gh pr merge` |
| Sync to DB | ENGINE (脚本自动) | 下次 deploy |
| Production injection | ENGINE matcher (自动) | request 时 |
| Audit | DOMAIN (周采样) | 在 PR 或 issue 上 comment |
| Incident review | DOMAIN + GM | 用户/書士 反馈触发 |

### FACT 不参与的环节

- DB sync 失败排查
- matcher 误命中调试
- production hotfix
- merge / deploy
- audit / incident review 决策

---

## 附录 A — FACT-OPS 第一周 SLA（建议）

| 项 | 期望 |
|---|---|
| 第一张新卡 (eijuu-nenkin-zeikin) | 启动后 24h 内 deliverable 交 GM |
| P1 全部 5 张卡 | 启动后 7 天内 deliverable 交 GM（质量优先） |
| 单卡返工率 | < 30%（结构 + 来源问题） |
| ai_verified 比例 | ≥ 60%（其余 ai_extracted / needs_review 也 OK） |
| critical 卡 controlled_alpha_eligible 触发 | 0（FACT 不应碰）|

## 附录 B — 与现有 DOMAIN 文档的关系

`docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md` 和
`docs/domain/TEBIQ_FACT_CARD_CANDIDATES.md` 是 0.5 期 DOMAIN-CC 的人工 anchor
草稿。FACT 可以读取它们作为：

- 主题灵感（用户场景）
- 已知风险点提示
- common_user_phrases 起点

但 **不能** 作为事实来源（这些都标 `needs human review`）。
FACT 的工作是用 official source 替代 / 升级它们。

## 附录 C — 紧急 Stop 条件

FACT 遇到以下情况立即停止本卡，向 GM 报告：

- WebFetch 拿到的页面与 PL 历史描述明显冲突
- 同一改正在 2 个 official source 给出明显冲突的核心数字
- 发现 `docs/fact-cards/` 里已有同 fact_id 的卡（避免覆盖）
- 发现 `docs/fact-cards/README.md` 或 `0.6-fact-layer-design.md` 与本文件冲突
- 任何用户体验 / 工程 / UI 改动需求出现在你的输入中（→ 退回 GM）

---

## 11. Autopilot 模式 — Batch 生产 + Batch Report (PL v1.1 update)

### 默认节奏

- 一批 = 3 张卡
- 一批做完后，提交一次 Batch Report 给 GM；不要每张卡都中断问 PL
- 上一批 GM 落 repo 期间，FACT 可以继续准备下一批
- 不需要等 PR #71 / 工程层 deploy 才开始产卡

### Autopilot 不允许跨界

FACT autopilot **不**意味着 FACT 可以：

- 自己改 source whitelist
- 自己改命名规则
- 自己决定 `state: human_reviewed`
- 自己设 `controlled_alpha_eligible: true`
- 自动跳过 needs_review_flag 自评
- 把 `low confidence` 卡硬升 `ai_verified`

这些边界仍然有效。Autopilot 只去掉"每张卡问下一步做什么"。

### Batch Report 格式

每批 3 张完成后，FACT 给 GM 发一份 Batch Report，结构如下：

```text
TEBIQ FACT Batch Report — Batch #N (YYYY-MM-DD)

# Batch summary
cards_in_batch: 3
ai_verified_count: <int>
ai_extracted_count: <int>
needs_review_count: <int>
conflict_count: <int>

# Per-card deliverable (×3)
## Card 1 of 3 — <slug>
[10 项 deliverable per §0]

## Card 2 of 3 — <slug>
[10 项 deliverable per §0]

## Card 3 of 3 — <slug>
[10 项 deliverable per §0]

# Cross-batch notes
- common sources hit
- common keyword overlaps (suggest matcher tuning?)
- any source whitelist gaps encountered (PL gate to add new sources)
- any cards waiting on PDF cross-check (note PDF URL)
```

### GM 接收 Batch Report 后的处理

1. 检查 batch 中每张卡格式是否符合 `docs/fact-cards/README.md`
2. 检查 source 是否在 whitelist 内
3. 检查 direct_fact / ai_inference / needs_review 是否拆开
4. 写文件到 `docs/fact-cards/<slug>.md`（一张卡一个独立文件）
5. 一批一个 PR（不是一卡一个 PR；减少 review burden）
6. high / critical / needs_review / conflict 卡 → 整理 review packet 给 DOMAIN
7. ai_verified 且符合 gate 的卡 → 通知 ENGINE 接入（待 fact_layer 工程层落地后自动 sync）
8. QA cases → 派给 QA 做回归（详 `docs/qa/0.6-fact-layer-qa-protocol.md`）

### 批次频率建议

- 第一周：1-2 批 / 周
- 稳定后：根据 source 更新频率与 incident 反馈调整
- DOMAIN 抽检 backlog 超过 5 张未处理 → FACT 暂停新批，等 backlog 消化

### FACT 何时该停止 autopilot 主动找 GM

- 同一概念在两个 official_sources 出现核心冲突 → 停在该卡，标 `state: conflict`，在 Batch Report 单独提示
- source whitelist 不够（需要新来源类型）→ 在 Batch Report 提"建议 GM 转报 PL 加 source"
- 自我检测发现 confidence 整批偏 low → 提"是否调整 batch 主题选择"
- 同一卡在不同 P1 主题中重复出现（边界模糊）→ 让 GM 决定合并/拆分

### GM 何时该停止 autopilot 上报 PL

PL 指定的 6 个上报触发：

1. 需要改变 fact layer 状态机
2. critical 卡是否进入 production 存在争议
3. 官方来源冲突且 DOMAIN 无法裁决
4. 事实层错误已影响前台用户
5. 需要扩大到完整 RAG / 爬虫系统
6. 需要新增工程大范围 schema / pipeline

其他情况 GM 自决。

---

**本 Pack 版本控制**：

| version | date | actor | change |
|---|---|---|---|
| v1.0 | 2026-05-07 | GM | 初版，PL §6 指令交付 |
| v1.1 | 2026-05-07 | GM | 添加 §11 Autopilot 模式（PL 后续指令）；Batch Report 格式；GM↔FACT 双向触发 |
