---
fact_id: keiei-kanri-2025-10
title: 経営・管理ビザ 2025年10月16日 改正後 新基準
state: human_reviewed
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: true   # PL §7+§11 (2026-05-07): 確定字段允许 controlled Alpha 使用
last_verified_at: 2026-05-07
reviewer: DOMAIN-CC
approved_at: 2026-05-07
approved_by: DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507)
sprint: 0.6 / Workstream C
citation_label: "経営管理ビザ（2025年10月以降の新基準・5要件）"
citation_summary: "2025年10月16日以降に適用される経営管理在留資格の許可基準改定（ビジネス規模・実績・継続性等5要件）を確認するカード。旧500万円基準との主な違いを含む。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "経営管理ビザの新規申請・変更申請を2025年10月以降に行う場合"
  - "2025年10月以降の経営管理ビザの許可基準（5要件）を確認したい"
  - "旧500万円資本金・売上要件と新基準の違いを確認したい"
  - "経営管理ビザの事業実態・継続性・規模要件を確認したい"
does_not_cover:
  - "2025年10月以降の既存保有者の更新過渡措置（keiei-kanri-existing-holder-update 参照）"
  - "スタートアップビザ・特定活動から経営管理への移行（startup-visa-keiei-transition 参照）"
  - "経営管理ビザの更新書類一覧の詳細（ISA手続きページ参照）"
ai_pipeline:
  collector_run_at: 2026-05-07
  extractor_model: deepseek-v4-pro (extraction via Claude Opus 4.7 / WebFetch)
  source_count: 1
  self_verification_passed_at: 2026-05-07
official_sources:
  - id: moj-isa-10-00237
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁 (法務省)
    last_checked_at: 2026-05-07
    quoted_in_card: true
  - id: moj-isa-001448231
    url: https://www.moj.go.jp/isa/content/001448231.pdf
    title: 改正概要 PDF
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-07
    quoted_in_card: false
    needs_human_fetch: true
  - id: moj-isa-001448070
    url: https://www.moj.go.jp/isa/content/001448070.pdf
    title: 改正ガイドライン PDF
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-07
    quoted_in_card: false
    needs_human_fetch: true
applies_to:
  - 新規上陸申請（在留資格認定証明書交付申請）
  - 在留資格変更許可申請（人文知識・国際業務 → 経営・管理 等）
  - 経営・管理 在留期間更新許可申請（過渡措置を経過した後）
direct_fact_fields:        # backed by official source quote (injectable)
  - effective_date_2025_10_16
  - capital_3000_man_yen
  - jouyukin_1_jin_ijou
  - jouyukin_zairyu_shikaku_genteilist
  - applicant_gakureki_or_3y_keiken
  - nihongo_n2_souto_either_party
  - jigyoshou_jitaku_kenyou_genri_fuka
  - keika_sochi_3y_for_existing_holders
ai_inferred_fields:        # AI synthesis on top of source (injectable but lower confidence)
  - new_basis_supersedes_old_500man_for_new_apps
  - applicants_should_consult_gyousei_shoshi
needs_review_flags:        # NOT injected as facts; appear in needs_review_addendum hint only
  - id: jigyou_keikakusho_expert_check
    reason: DOMAIN-CC v0.2 候補カードで5項目目として挙がっていたが、公式公表ページ抜粋に明示なし。改正ガイドライン PDF (moj-isa-001448070) で要確認。
  - id: jlpt_alternatives_completeness
    reason: B2相当の代替経路（JLPT N2 / BJT 400+ / 20年在留 / 高等教育卒 / 義務教育+高校卒）の網羅性は要 PDF 確認。
  - id: jimusho_menseki_kijun
    reason: 「自宅兼用は原則不可」のみ確認。具体面積基準は「一律に答え難し」とのみ記載。運用例は要追加調査。
---

# 経営・管理ビザ 2025年10月16日 改正後 新基準

> **AI extraction status**: `ai_extracted` — pulled from MOJ-ISA
> official page on 2026-05-07. Awaiting human publish gate.
> **Production injection**: BLOCKED until `state: human_approved`.

---

## current_date_logic

```
今日 (TODAY) >= 2025-10-16 → 默认按【改正後 新基準】回答。
今日 (TODAY) <  2025-10-16 → 不适用本卡（历史快照）。
```

ユーザーが「過渡措置に該当する明示的シグナル」を出さない限り、
**新基準を既定とする**。AIから「あなたは2025-10-15以前ですか？」と
先回りで聞いてはならない。

過渡措置該当シグナル（明示されたら過渡規則を説明）：

- 「2025年10月15日までに申請を提出した／受理された」
- 「すでに経営・管理ビザを持っていて更新する」
- 「特定活動（スタートアップビザ）から移行する」
- 「審査中の申請がある」

---

## current_effective_fact

改正施行日：**2025年10月16日（令和7年10月16日）**

新基準（**新規申請時に同時に満たすべき要件**）：

### 1. 資本金または出資の総額

**3,000万円以上**

> 原文: 「３，０００万円以上の資本金等が必要になります」
> source: moj-isa-10-00237

旧基準（500万円以上 または 常勤2名以上）は **新規申請には適用されない**。

### 2. 常勤職員 1名以上の雇用

> 原文: 「１人以上の常勤職員を雇用することが必要になります」
> source: moj-isa-10-00237

**雇用可能な常勤職員の範囲（限定）**：

- 日本人
- 特別永住者
- 法別表第二の在留資格保持者：永住者 / 日本人の配偶者等 / 永住者の配偶者等 / 定住者

> 原文: 「日本人、特別永住者及び法別表第二の在留資格をもって在留する外国人…に限り」
> source: moj-isa-10-00237

技人国・留学生・特定技能等の在留者は **常勤職員要件にカウントされない**。

### 3. 申請者本人の学歴 OR 経験

**いずれか一方**：

- 経営・管理に関する**博士・修士・専門職学位**を取得している、または
- 事業の経営または管理について **3年以上の経験**を有する

> 原文: 「博士、修士若しくは専門職の学位…を取得していること、又は、事業の経営又は管理について３年以上の経験…を有する必要があります」
> source: moj-isa-10-00237

### 4. 日本語能力 B2 相当 (JLPT N2 以上)

申請者**または**常勤職員のうち**いずれか1名**が満たせばよい。

> 原文: 「申請者又は常勤職員…のいずれかが相当程度の日本語能力…を有することが必要」
> source: moj-isa-10-00237

認定方式（公式ページに記載されている代替経路）：

- JLPT N2 合格
- BJT ビジネス日本語能力テスト 400点以上
- 20年以上の長期在留
- 日本の高等教育機関を卒業
- 日本の義務教育＋高校卒業
> source: moj-isa-10-00237 (合格証等の具体は要 PDF 確認)

### 5. 事業所要件 — 自宅兼用は原則不可

> 原文: 「自宅を事業所と兼ねることは、原則として認められません」
> source: moj-isa-10-00237

具体面積基準は「一律に答えることは困難」、事業規模に応じて判断。

### 6. 事業計画書の専門家確認 【needs_review — NOT INJECTED】

> **不確定。`needs_review_flags.jigyou_keikakusho_expert_check` で除外。
> 確認されるまで本卡は新基準として注入しない。**

DOMAIN-CC v0.2 の事前候補カードでは「事業計画書が専門知識を有する者
（中小企業診断士等）によって確認済」が5項目目として挙げられている。
本AI抽出セッションでは公式ページに明示を確認できず。
**改正ガイドライン PDF (moj-isa-001448070) で要確認**。

確認方法：
- AI 後続パスで PDF 抽出 → 確認できれば本セクションを direct_fact_fields に昇格
- DOMAIN/書士 抽検で確認されれば同上 + state を `human_reviewed` に昇格

---

## exceptions_or_transition

> source: moj-isa-10-00237

| 該当者 | 適用される基準 |
|---|---|
| **2025-10-15 までに申請を受付・審査継続中** | 改正前の旧基準 |
| **既存の経営・管理ビザ保持者の更新（施行日から3年以内、〜2028-10-15）** | 改正後の新基準に**完全には適合しなくても**、経営状況・改善見通しを総合考量して許可可能 |
| **施行日から3年経過後（2028-10-16以降）の更新** | 改正後の新基準に**完全に適合**することが必要 |
| 新規上陸申請（2025-10-16 以降） | 改正後の新基準（猶予なし） |

---

## common_user_phrases

> AI-generated by C3 Scenario Mapper. Reviewer should add or correct.

主要トリガー（中文）：

- 我是人文签，我想转经管签
- 我想申请经营管理签
- 经营管理签现在需要多少钱
- 我想开公司办签证
- 公司签证现在要多少钱
- 经营管理签要不要员工
- 资本金不够怎么办
- 我想创业办签证
- 在日本注册公司办经管签
- 500 万还能办经管签吗

副次トリガー（過渡措置該当の可能性）：

- 我已经有经管签了，怎么续
- 我去年就提交了经管签申请
- startup visa 怎么转经管
- 创业特定活动签证 转经管
- 我的经管签要更新

技術キーワード（マッチャ用）：

- 経営管理 / 经营管理 / 经管 / 經管
- 経管ビザ / 经管签证 / 经管签 / 经营管理签证
- 投資経営 (旧名称、誤用検出用)
- 資本金 / 资本金 / 出資 / 出资
- 法人設立 / 設立公司 / 注册公司
- スタートアップビザ / startup visa / 創業ビザ
- 特定活動 創業

---

## must_say

回答に**必ず含めるべき要点**（高優先順）：

1. **新基準は既に施行されている**事実を明示する（2025年10月16日施行）
2. **資本金 3,000万円以上**（新規申請の場合）
3. **常勤職員 1名以上**、その範囲が日本人・特別永住者・別表第二在留者に限定されること
4. **申請者の学歴または3年以上の経営管理経験**要件
5. **日本語 N2 相当**（申請者または常勤職員のいずれか）
6. 過渡措置に該当する可能性がある場合のみ、その情形を簡潔に説明
7. 出入国在留管理庁の公式ページを参照リンクとして提示する
8. 高リスク事案（既に申請準備が進んでいる、資本金不足、人員不足等）には
   「行政書士に確認することを推奨」を添える

## must_not_say

以下の表現は**絶対に出してはならない**：

- ❌ 「通常 500万円以上で申請できます」
- ❌ 「資本金 500万円か、常勤2名のいずれかでOKです」
- ❌ 「2025年10月15日までに提出すれば旧基準で間に合います」
- ❌ 「旧政策窓口がまだ開いています」
- ❌ 「常勤職員は外国人留学生でもアルバイトでも構いません」
- ❌ 「日本語要件はありません」
- ❌ 「自宅を事務所として登記すれば問題ありません」
- ❌ 「必ず許可されます」「絶対通ります」「100%大丈夫」
- ❌ 過渡措置該当性を確認せずに「あなたは旧基準で申請できます」と断定

---

## qa_cases

> AI-generated by C4 QA Generator. Use as production regression suite.

### QA-1 — 人文知識から経営管理への変更（典型）

**user**: 我是人文签，我想转经管签。

**must_have**:

- 提及 2025年10月16日 改正
- 提及 3,000万円 資本金
- 提及 常勤職員 1名 + 限定された在留資格範囲
- 提及 申請者本人の学歴 OR 経営管理経験 3年以上
- 提及 日本語 N2 相当
- 推奨：行政書士に確認

**must_not_have**:

- 「500万円」を旧基準として推奨する語気
- 「2025-10-15 までに急いで提出」誘導
- 「通常」で旧基準を要約

### QA-2 — 旧基準での金額確認

**user**: 经营管理签现在还是 500 万日元就可以吗？

**must_have**:

- 「現在の新規申請では 500万円基準は適用されない」
- 「2025年10月16日以降、3,000万円以上が必要」
- 過渡措置（既存保持者の更新）の説明（簡潔）
- 公式ページ参照

**must_not_have**:

- 「現在も 500万円で可能」
- 過渡措置を新規申請者にも適用するかのような曖昧な表現

### QA-3 — 創業準備中の典型相談

**user**: 我想开公司申请经营管理签，现在需要准备多少钱？

**must_have**:

- 資本金 3,000万円以上
- 資金以外の要件（常勤職員・学歴経験・日本語）も同時に必須であること
- 単に資金だけ揃えても許可されない旨
- 行政書士相談の推奨

**must_not_have**:

- 「500万円から始められます」
- 資金要件のみ回答して他要件を省略

### QA-4 — 過渡措置該当者

**user**: 我已经有经管签了，明年要更新，需要凑齐 3000 万吗？

**must_have**:

- 既存保持者の更新については施行日から3年（〜2028-10-15）の経過措置あり
- その期間内は新基準に完全適合しなくても、経営状況・改善見通しを総合考量
- 2028-10-16 以降の更新では完全適合が必要
- 早めの行政書士相談推奨

**must_not_have**:

- 「既存保持者にも即座に 3,000万円が必須」
- 経過措置の存在を完全に省略

### QA-5 — Startup visa からの移行

**user**: 我现在是创业特定活动签证，要转经管签，怎么办？

**must_have**:

- スタートアップビザ（特定活動）からの移行は過渡措置の検討対象
- ただし具体的な過渡措置の適用可否は要確認
- 公式ページ・行政書士確認の推奨
- 新基準の概要も提示

**must_not_have**:

- 「自動的に旧基準で申請できる」
- 移行ルートを断定的に保証する

---

## injection_format (for ENGINE C6)

The matcher splits this card into two blocks:

- `injection_certain_block` — **injected as facts** when card passes
  state × risk gate (see README.md state machine). Contains only
  `direct_fact_fields` (with source quote in body) plus minimal AI
  inference labeled inline.
- `injection_needs_review_addendum` — **NOT injected as facts**.
  May surface as a generic hint via Workstream G.

### injection_certain_block

```text
【今日の有効な事実 — 経営・管理ビザ 2025年10月16日改正】

以下は出入国在留管理庁の公式公表（moj.go.jp/isa/applications/resources/10_00237.html）に基づく現行基準である。
今日の日付は {{TODAY_ISO}} であり、施行日 (2025-10-16) を既に経過している。

普通の新規申請・在留資格変更の場合、以下を同時に満たす必要がある：

1. 資本金または出資の総額が 3,000万円以上
2. 常勤職員 1名以上を雇用
   （日本人、特別永住者、または法別表第二の在留資格保持者
    ＝永住者・日本人配偶者等・永住者配偶者等・定住者 に限定）
3. 申請者本人が、経営・管理に関する博士／修士／専門職学位を有する、
   または事業の経営・管理について 3年以上の経験を有する
4. 申請者または常勤職員のいずれかが日本語 N2 相当以上の能力を有する
   （JLPT N2 等の認定方式の詳細は最新の改正ガイドラインで確認推奨）
5. 事業所は原則として自宅と兼用不可

過渡措置：
- 2025-10-15 までに申請が受付・審査継続中の案件のみ、改正前の旧基準が適用される
- 既存の経営・管理ビザ保持者の更新については、施行日から3年（〜2028-10-15）の間、
  改正後の基準に完全には適合しなくとも、経営状況・改善見通しを総合考量して許可可
- 2028-10-16 以降の更新は完全適合が必要

回答時に避けるべき表現：
- 「通常 500万円以上で申請可」と新規申請者に対して言及しない
- 「2025-10-15 までに急いで提出すれば旧基準で間に合う」と新規申請者を誘導しない
- 上記の中核5要件のいずれかを完全に省略しない

回答スタイル：
- 「根据当前已确认的官方信息、…」のような hedged 表現を使用
- 「絶対に」「100%」「必ず通る／通らない」を使わない
- 細目（事業計画書専門家確認の有無、N2 代替認定の網羅性、事業所面積基準）は
  最新の改正ガイドラインや行政書士に確認するよう推奨
```

### injection_needs_review_addendum (NOT injected as facts; hint-only)

When this card matches and the matcher decides to surface a
`needs_review_addendum` hint to the frontend (Workstream G), use:

```text
本回答に関連して、改正後の細目（例：事業計画書の専門家確認の要否、
日本語能力認定の代替経路の網羅性、事業所の具体的面積基準）は、
最新の改正ガイドラインや行政書士に確認することを推奨します。
```

This text is **never** added to the LLM system prompt as fact. It
is a frontend-side conservative hint only.

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-07 | AI (Claude Opus 4.7 via WebFetch + manual extraction) | initial AI extraction | — | ai_extracted | source: moj-isa-10-00237 |
| 2026-05-07 | AI self-verification (post PL §11 update) | split certain vs needs_review fields; populated direct_fact_fields, ai_inferred_fields, needs_review_flags; defined certain_block + needs_review_addendum | ai_extracted | ai_verified | risk=critical, controlled_alpha_eligible=true per PL §7 + §11 explicit allowance |
| 2026-05-07 | DOMAIN-CC (audit-full-20260507) | §2 full checklist PASS; all 5 core 2025-10-16 改正 requirements sourced; 3 needs_review_flags appropriately isolated to PDF; injection_certain_block confirmed safe | ai_verified | human_reviewed | APPROVE — controlled_alpha_eligible:true confirmed for Alpha injection |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 4) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | human_reviewed | human_reviewed | patch |

## Audit assignment

- `risk_level: critical` → enters DOMAIN/PL human audit queue (priority 1)
- `controlled_alpha_eligible: true` → may inject in Alpha frontend with the certain_block above
- Once a human reviewer audits the card and the certain_block is verified, set `state: human_reviewed`
- If any direct_fact_field is contested by a 書士 / official source change, set `state: needs_review` and re-extract
