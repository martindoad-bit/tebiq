# Batch Audit 01 — Business Manager 経営管理（practical-fact-layer）

> **审计日期：** 2026-05-19
> **审计员：** FACT 审计窗口 (Claude) + DOMAIN 子代理 (general-purpose agent)
> **基线版本：** 2025-10-16 経営・管理上陸基準省令改正
> **范围：** 20 张实务卡（18 张経営管理 + 2 张边界样本）
> **目的：** 找出过时/不安全语句，**不生成** runtime block，结论待人工/DOMAIN 复核

---

## 0. 用到的真相基线（DOMAIN/guardrail 资产）

| 路径 | 用途 |
|---|---|
| `docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md` | Must Not Say 列表 / Unsafe Statements / Safe Wording |
| `docs/eval/TEBIQ_0_8_LOOP2M_BUSINESS_MANAGER_2025_REFORM_GUARDRAIL_INTEGRATION.md` | route gate + answer validator 已部署的口径 |
| `docs/knowledge-atlas/phase2/batch29b/business-manager/doc-business-manager-2025-reform-checkpoints.md` | 改正后的检查点 / 关键日期 / common_mistakes |
| `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-keiei-kanri-joken-shorei.md` | 经管要件 guardrail |
| `docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-kaisha-setsuritsu-keieikanri.md` | 会社設立から経管申请 guardrail |

## 1. 真相基线摘要（必读）

**2025-10-16 施行的経営・管理上陸基準省令改正後の現行新规一般申请基準：**

| 检查点 | 现行基准 |
|---|---|
| 事業規模 | **3,000 万円**以上の資本金または出資の総額 |
| 常勤職員 | **1 名以上**（限定為日本人・特別永住者・別表第二資格保有者）|
| 日本語能力 | 申請者または常勤職員の一人が B2 相当（JLPT N2 / BJT 400 等）|
| 経営管理能力 | 学歴または 3 年以上の経営・管理経験 |
| 事業計画 | 中小企業診断士・公認会計士・税理士 等の専門家による合理性レビュー必要 |

**关键日期：**
- `2025-10-16`: 改正施行
- `2026-04-15`: ISA 経管页面 category 3/4 追加书类适用开始
- `2028-10-16`: 改正施行 3 年経過日（既有持有人过渡期终点）

**关键 must_not_say（DOMAIN_REVIEW §Must Not Say）：**
- 「500 万就能办」P0
- 「3000 万 or 2 名常勤 二选一」P0
- 「有 3000 万就一定许可」P0
- 「既存经管马上必须凑齐 3000 万、否则续不了」P0
- 「过渡期内不用满足也没事」P0
- 「公司休眠 or 注销后直接转技人国/高才即可」P0

---

## 2. 审计目标（20 张）

practical-005, 006, 031, 064, 074, 089, 101, 113, 123, 125, 144, 149, 157, 171, 178, 585, 590, 626 + 边界样本 practical-052, 080。

---

## 3. 分桶汇总

| Bucket | 卡数 | card_ids |
|---|---:|---|
| **REJECT** | 3 | practical-064, practical-149, practical-171 |
| **CONFLICT (P0)** | 5 | practical-005, practical-031, practical-089, practical-590, practical-626 |
| **NEEDS_REWRITE** | 10 | practical-006, practical-074, practical-101, practical-113, practical-123, practical-125, practical-144, practical-157, practical-178, practical-585 |
| **KEEP（边界样本）** | 2 | practical-052, practical-080 |

**Must Not Say 直接命中**：practical-149 / practical-064 / practical-171

**P0 quarantine 立即对象**：practical-005, 031, 064, 089, 149, 171, 178, 590, 626（9 张）

---

## 4. 每张卡审计明细

### REJECT 组

#### practical-064 — 経営管理：500万円投資要件の認定実務
- **过时/Must-Not-Say 违反句：**
  - 第 23 行 (核心事実)：「経営管理の在留資格申請における500万円以上の投資要件は…」
  - 第 27 行 (法的根拠)：「事業規模（500万円以上の投資等）が基準の一つ」
  - 第 83 行 (可注入答案)：「500万円以上の実態ある投資が必要です」
- **冲突资产：**
  - DOMAIN_REVIEW §Unsafe Statements：「500万円 is enough」/「3000万円 or 2 employees」P0 unsafe
  - guardrail-keieikanri-joken-shorei §Must Not Say：「資本金500万円あれば経営管理ビザは取れる」（省令上の根拠なし）
- **建议 bucket：** REJECT（整张卡的母题就是过时基准）
- **注入风险：** P0
- **重写方向：** 整张作废。如果保留「見せ金 / 借入金 / 現物出資」实务讨论，须重写为不指具体金额的一般论 + 路由到 DOMAIN。具体数字交 reform-aware 新卡承担。
- **DOMAIN 灰区：** 是 — pre-reform 既存案件的 500 万円「歴史的脈絡」如何与 reform 后口径衔接。

#### practical-149 — 常勤2名 or 500万 要件
- **过时/Must-Not-Say 违反句（重点）：**
  - 第 23 行 (核心事実)：「経営管理ビザには「2人以上の常勤職員」または「500万円以上の事業投資」のいずれかを満たすことが必要（選択的要件）」
  - 第 29-32 行表：要件 A（常勤2名）/ 要件 B（500万投資）/ どちらか一方を満たせばよい
  - 第 84 行 (可注入答案)：「常勤職員2名以上 **または** 500万円以上の事業投資 のどちらかを満たすことが必要です」
  - 第 55 行 / 第 86 行：「ひとり会社でも500万円以上の投資があれば申請可能」
- **冲突资产：**
  - DOMAIN_REVIEW §Must Not Say：**「3000万和2名常勤二选一」P0**（本卡是该 must_not_say 的反面镜像「500万和2名常勤二选一」，同样 P0）
  - DOMAIN_REVIEW §Unsafe Statements：「3000万円 or 2 employees」P0 / 「one or two interchangeable」P0
  - reform-checkpoints §what_it_proves：常勤 1 名以上 **+** 3,000 万円資本（且常勤限定為日本人・特永・別表第二）
- **建议 bucket：** REJECT（这张卡整张就是 must_not_say 反例的具体化）
- **注入风险：** P0（**最严重的一张**）
- **重写方向：** 整张作废或彻底重写：
  1. 「500 万 or 常勤 2 名」选择式 = pre-reform 旧基准
  2. 2025-10-16 以後の新规/変更/一般更新は「3,000 万円以上資本 + 1 名以上の有資格常勤職員」を **同時に審査**（不是 or）
  3. 常勤職員資格限定（日本人・特永・別表第二）
  4. 既存持有人有過渡到 2028-10-16，但非免除
- **DOMAIN 灰区：** 是 — 重写口径必须 DOMAIN 复核，前台不可自定。

#### practical-171 — 500万出資詳解
- **过时/Must-Not-Say 违反句：**
  - 第 23 行 (核心事実)：「「事業の規模」要件として「事業の開始に必要な資金として500万円以上の出資」が審査される」
  - 第 30 行表：「金額基準 | 500万円以上（単独または共同出資合計）」
  - 第 55-58 行：「500万円要件の代替要件: 常勤職員2名以上」
  - 第 87 行 (可注入答案)：「経営管理ビザの500万円出資は…」
- **冲突资产：**
  - DOMAIN_REVIEW §Must Not Say：「500万就能办」/「3000万 or 2 employees」P0
  - reform-checkpoints：3,000 万円 + 1 名以上常勤（且限定）
- **建议 bucket：** REJECT
- **注入风险：** P0
- **重写方向：** 整张作废。如果保留「現物出資 / 借入金 / 共同出資」实务讨论，须重写为不指具体金额、改写为 reform-aware 一般论 + 路由到 DOMAIN。
- **DOMAIN 灰区：** 是 — 借入金/現物/共同出資在 reform 后是否仍计入「資本金または出資の総額」需 DOMAIN 复核。

---

### CONFLICT 组（P0）

#### practical-005 — 経営管理：事務所要件（バーチャルオフィス問題）
- **过时句：**
  - 第 55 行：「資本金500万円以上の資本金または500万円以上の売上が見込まれること（省令基準）」
  - 第 56 行：「資本金500万円未満でも許可される場合はあるが…」
  - 第 93 行 (可注入答案)：「資本金500万円以上、または同額以上の売上見込みも申請の目安となります」
- **冲突资产：** DOMAIN_REVIEW §Must Not Say / reform-checkpoints §what_it_proves
- **建议 bucket：** CONFLICT — P0 段落必须切除；事務所要件（バーチャル不可）可单独保留
- **重写方向：** 剥离 500 万段；保留 office/virtual 要件；事業規模条件改为 reform-aware：明确指 2025-10-16 以降一般新规需 3,000 万 + 1 名以上常勤等多检查点 + 专家审过事業計画。
- **DOMAIN 灰区：** 是 — pre-reform 既存持有人在 2028-10-16 過渡期内的事務所标准衔接。

#### practical-031 — 技人国→経営管理：代表取締役変更
- **过时句：**
  - 第 47-51 行：「資本金500万円以上または同額以上の売上見込み」
  - 第 93 行 (可注入答案)：「資本金500万円以上（目安）等の要件があります」
- **冲突资产：** DOMAIN_REVIEW §Must Not Say / guardrail-kaisha-setsuritsu §Must Not Say
- **建议 bucket：** CONFLICT
- **重写方向：** 500 万目安段整段删除；只保留「経営活動開始前に変更申請が必要」「技人国のまま代表取締役 = 資格外活動リスク」；事業規模交 reform-aware。
- **DOMAIN 灰区：** 是 — 「変更申請中の経営活動はグレーゾーン」表述需 DOMAIN 复核。

#### practical-089 — 経営管理：外国企業の日本支店・支社
- **过时句：**
  - 第 23 行：「500万円要件は支店・子会社の資本・設備投資で充足できる」
  - 第 41-45 行表：「外国企業の日本支店での500万円要件」
  - 第 45 行：「日本の銀行口座に支店運転資金として500万円以上を保有する証明」
  - 第 88 行 (可注入答案)：「500万円以上の投資要件は、支店の設備投資・運転資金で充足できます」
- **冲突资产：** DOMAIN_REVIEW §Must Not Say / reform-checkpoints
- **建议 bucket：** CONFLICT
- **重写方向：** 500 万相关全删；事業規模交 reform-aware；保留「企業内転勤の選択肢（外国本社1年以上勤務）」「支店 vs 子会社の手続き差」。
- **DOMAIN 灰区：** 是 — 外国法人日本支店場合の 3,000 万要件如何 mapping 到「送金残高」。

#### practical-590 — 法人設立と経管
- **过时句：**
  - 第 40 行表：「資本金 | 500万円以上（または2名以上の常勤職員の雇用）」
  - 第 84 行 (可注入答案)：「日本の事務所確保・資本金500万円以上（目安）・合理的な事業計画」が必要
  - 第 102 行 (L5)：「500万円以上の資本金（または2名以上の常勤職員）」が目安
- **冲突资产：** DOMAIN_REVIEW §Must Not Say（双重命中：500 万 + or 常勤 2 名）
- **建议 bucket：** CONFLICT
- **重写方向：** 500 万 + or 常勤 2 名 全删；事業規模指向 reform-aware；保留「合同会社 vs 株式会社設立費用比較」「司法書士 vs 行政書士分業」。
- **DOMAIN 灰区：** 否（删数字即可）。

#### practical-626 — 技人国→経管（独立起業）
- **过时句：**
  - 第 23 行 (核心事実)：「経営管理ビザの要件（事務所確保・資本金500万円以上・事業計画等）」
  - 第 33 行表：「資本金の払込 | 500万円以上の資本金を払込」
  - 第 76 行 (可注入答案)：「資本金500万円以上・事業計画の準備後に経営管理ビザへの変更申請ができます」
  - 第 94 行 (L5)：「資本金500万円以上または2名以上の常勤職員の雇用」が目安
- **冲突资产：** DOMAIN_REVIEW §Must Not Say（双重命中）
- **建议 bucket：** CONFLICT
- **重写方向：** 500 万 / 「or 常勤 2 名」全删；保留「退職前変更申請」「申請中の特例期間」「技人国のまま代表取締役 = 資格外活動リスク」；事業規模数字交 reform-aware。
- **DOMAIN 灰区：** 否（删数字即可）。

---

### NEEDS_REWRITE 组（10 张）

#### practical-006 — 経営管理：赤字継続・休眠の更新実務
- 过时点：第 55 行「月25万円以上の役員報酬」非公式目安被作为可注入；卡通篇没有写 2025-10-16 改正 + 既有持有人过渡。
- 冲突资产：DOMAIN_REVIEW §Unsafe Statements（既存持有人立刻 3000 万 / 过渡期免除两个 P0）
- 重写方向：明确「reform 后既存持有人更新会同时叠加新基準該当性 + 改善見通し」；月 25 万非公式数字降级为「行政書士相談事项」；标 `transition_rule_unclear`。
- DOMAIN 灰区：是。

#### practical-074 — 経営管理：役員報酬月額基準
- 过时点：第 23 / 第 82 行「月額20万円前後 / 月額20万円以上が目安」无省令依据数字被作为可注入。
- 冲突资产：DOMAIN_REVIEW §Safe Wording（「経管不是只看资金」）+ guardrail-keieikanri-joken-shorei §Must Say「日本人同等以上」省令原文
- 重写方向：删「月 20 万円」；可注入只留「日本人同等以上」「役員報酬ゼロは要件不充足リスク」。
- DOMAIN 灰区：否。

#### practical-101 — 経営管理：経営者 vs 管理者要件
- 过时点：通篇没具体数字，但完全没提 2025-10-16 reform、reform 后「管理者」类型实务变化没有 caveat。
- 冲突资产：reform-checkpoints §what_it_proves（経管能力 = 学歴 / 3 年以上経験等 reform 后明示化）
- 重写方向：保留经营者/管理者区分；末尾加 reform caveat — 管理者类型也需满足申请人本身的経管能力要件。
- DOMAIN 灰区：否。

#### practical-113 — 経営管理：複数会社役員兼務
- 过时点：第 44 行「複数会社の役員報酬合計が月20万円以上（目安）」；没提 reform 后多家公司情境下 3,000 万 / 常勤 / 事業計画审查口径。
- 冲突资产：DOMAIN_REVIEW §Unsafe Statements / reform-checkpoints §common_mistakes（「只看 3,000 万、忽略其他多要件」）
- 重写方向：删「月 20 万円」；加 reform caveat — 多家公司情境下事業規模/常勤/事業計画审查口径属 DOMAIN 灰区，前台不能自判。
- DOMAIN 灰区：是 — 复数会社兼務时 3,000 万 / 常勤如何分配/合算。

#### practical-123 — 合同会社 vs 株式会社
- 过时点：第 23 行「投資額」未具体说明 reform 后的 3,000 万门槛，容易被注入误导；设立費用数字本身不冲突。
- 冲突资产：reform-checkpoints §what_it_proves
- 重写方向：保留会社形态比较；明确「2025-10-16 改正後、会社形態を問わず資本金または出資総額 3,000 万円以上が事業規模要件」caveat 加入可注入；删除暗示性「ISA は 500 万円を…」类语句。
- DOMAIN 灰区：否。

#### practical-125 — 「投資・経営」→「経営管理」沿革
- 过时点：第 36 行「500万円以上の事業投資」作为「2015 年改正後の現行投資要件」；第 44 行「自ら500万円以上を投資して設立した会社の代表」；last_checked 2026-05-19 却完全没提 2025-10-16 改正。
- 冲突资产：DOMAIN_REVIEW §Must Not Say
- 重写方向：扩成三阶段沿革（投資・経営 → 2015 経営管理 → 2025-10-16 上陸基準改正）；500 万标注「2015〜2025-10-15 の実務目安、現行ではない」；新增「2025-10-16 以降」段说明 3,000 万 + 常勤 + 日本語 + 経管能力 + 事業計画レビュー。
- DOMAIN 灰区：是 — 「2015 年改正當時の 500 万円目安は省令本文に明示なし」需 DOMAIN 措辞复核。

#### practical-144 — 管理者（マネージャー）要件
- 过时点：与 101 同样问题；第 38 行「経営幹部相当の報酬」措辞模糊，可能被读者补完为「20 万円目安」。
- 冲突资产：reform-checkpoints §what_it_proves（経管能力 + 日本語 B2 reform 后明示化）
- 重写方向：可注入末尾加 reform caveat — 2025-10-16 以降「管理者」类型でも申請人本人の経管能力要件 + 日本語要件が課されるため、单凭肩书+权限不足，需多检查点对照。
- DOMAIN 灰区：否。

#### practical-157 — 経営管理：赤字継続・休眠の更新実務（詳）
- 过时点：第 46 行「赤字でも役員報酬（月20万円以上の目安）を維持する」无源数字；完全没提 reform 改正 + 过渡日期。
- 冲突资产：DOMAIN_REVIEW §Unsafe Statements（「Existing holders must immediately satisfy 3000万 at renewal」/「Transition means renewal is safe」P0）
- 重写方向：加 reform caveat — 既存持有人更新会同时叠加新基準該当性 + 改善見通し；删月 20 万；标 `transition_rule_unclear`。
- DOMAIN 灰区：是 — 既存持有人赤字 + 不满足 reform 新基準的更新走向。

#### practical-178 — 経営管理申請タイミング
- 过时点：第 38 行「資本金の準備・払込み（500万円以上）」；第 48 行「資本金の払込（500 万円以上）」。
- 冲突资产：DOMAIN_REVIEW §Must Not Say
- 重写方向：500 万数字删除；保留「短期滞在からの変更は実務上ほぼ不許可」「COE ルートが確実」「許可前の営業活動は資格外活動」这三条 — 这是本卡的最大价值。
- DOMAIN 灰区：否。

#### practical-585 — 株主・出資者と経管
- 过时点：第 71 行「経営管理ビザと株主 | 出資（500万円以上）が要件の一部として記載される場合がある」；第 97 行 L5「合同会社の設立（資本金500万円以上…）」。
- 冲突资产：DOMAIN_REVIEW §Must Not Say
- 重写方向：500 万表述全删；保留卡的核心命题「出資のみでは経管不可、経営活動実態が必要」「外為法届出」「家族滞在ビザでの業務執行社員は資格外活動リスク」— 这些 reform 无关，是本卡强项。
- DOMAIN 灰区：否。

---

### KEEP 组（边界样本）

#### practical-052 — 技人国大学卒業要件
- 与 2025-10-16 経営・管理改正无交叉。**KEEP**。

#### practical-080 — 企業内転勤
- 仅讨论企業内転勤 1 年要件 + 同一グループ要件，未涉及経管基准。**KEEP**。

---

## 5. 结构性发现

**18 张経営管理相关卡中，没有一张提到 2025-10-16 改正。**

这不是单卡 patch 能解决的问题。建议：
1. 短期：18 张卡 frontmatter 全部标 `state: quarantined`（与 LOOP2M 已隔离的本地卡同样处理）
2. 中期：在 practical-fact-layer 加入 reform-aware 母卡（指向 atlas 的 reform-checkpoints + DOMAIN）
3. 长期：所有経営管理相关卡的 last_checked 日期必须 ≥ 2025-10-16，且每张卡必须引用 reform-checkpoints 作为 cross_reference

---

## 6. 提交给 GM / Codex / DOMAIN（行动项）

| # | 行动 | 触发主体 |
|---:|---|---|
| 1 | Batch 01-04 governance report + runtime_blocks 8 份文件已加 INVALIDATED 横幅（本批次完成） | FACT 审计窗口 |
| 2 | 18 张経営管理卡的 frontmatter 全部加 `state: quarantined` + `freshness_blocker: 2025-10-16-keieikanri-reform` | Codex 主工程 / FACT 重写小队 |
| 3 | REJECT 3 张（practical-064, 149, 171）：母题就是过时基准、整张作废或彻底重写 | DOMAIN + FACT 重写小队 |
| 4 | CONFLICT 5 张（practical-005, 031, 089, 590, 626）：删除 500 万段落，保留其他可保留部分 | DOMAIN + FACT 重写小队 |
| 5 | NEEDS_REWRITE 10 张（practical-006, 074, 101, 113, 123, 125, 144, 157, 178, 585）：加 reform caveat、删无源数字 | FACT 重写小队 |
| 6 | 新建 reform-aware 母卡（practical-fact-layer 层），交叉引用 atlas reform-checkpoints | FACT |
| 7 | DOMAIN 灰区 6 项必须由 DOMAIN-CC 决断（pre-reform 既存持有人过渡处理 / 借入金现物出資计入 / 复数会社兼務分配 / 外国法人日本支店 mapping / 历史卡措辞 / 变更申请中经営活动グレーゾーン） | DOMAIN-CC |

---

## 7. Handoff Note

- 完成日：2026-05-19
- 担当：FACT 审计窗口 (Claude) + DOMAIN 子代理 (general-purpose agent)
- 累計审计进度：20 张完成 / 646 张总数 = 3.1%（但是真正的审计，不是格式转换）
- 下一批预告：Audit 02 — 永住申请要件群（10 年・素行・公的义务・配偶者特例）
- 待人工/DOMAIN 复核：本报告全部结论

**这次审计可信度的自检：** REJECT 15% + CONFLICT 25% + NEEDS_REWRITE 50% + KEEP 10% = 90% 卡有问题，10% 为 KEEP（边界样本）。这个比例对应 Founder 指出的真相："既存品质并不高"。如果这次比例再倒回 95% ANSWER_RUNTIME / 0 CONFLICT，说明审计又跑偏。
