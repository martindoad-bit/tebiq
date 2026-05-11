---
fact_id: zairyu-card-loss-reissue
title: 中長期在留者 — 在留カード紛失・盗難時の再交付申請
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-10
reviewer: ai_self_verified
sprint: Cycle 1 Quality Flywheel / v2
citation_label: "在留カード紛失・再交付（14日以内・入管申請）"
citation_summary: "在留カードを紛失・盗難・滅失した場合の再交付申請手続き（14日以内・地方出入国在留管理局）と、警察への遺失届の手順を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留カードを紛失・盗難・滅失した場合の手続きを確認したい"
  - "在留カード再交付の申請期限を確認したい"
  - "在留カード再交付の申請先・必要書類を確認したい"
  - "在留カードをなくした場合どこに届けるか確認したい"
does_not_cover:
  - "在留カードの住所変更（zairyu-address-change 参照 — 14日以内・市区町村）"
  - "在留カードの記載事項変更（氏名・国籍等の変更 — 入管窓口）"
  - "在留期間更新中に在留カードをなくした場合の具体的対処（入管窓口相談要）"
ai_pipeline:
  collector_run_at: 2026-05-10
  extractor_model: codex-aql-cycle1
  source_count: 2
  self_verification_passed_at: 2026-05-10
official_sources:
  - id: moj-isa-card-loss-reissue
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    title: 紛失等による在留カードの再交付申請
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-10
    quoted_in_card: true
  - id: moj-isa-new-system-faq
    url: https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html
    title: 出入国港での手続 / 市区町村での手続 / 地方出入国在留管理官署での手続
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-10
    quoted_in_card: true
applies_to:
  - 中長期在留者
  - 在留カード紛失
  - 在留カード盗難
  - 在留カード滅失
direct_fact_fields:
  - reissue_deadline_14_days
  - reissue_at_regional_immigration
  - police_report_acceptance_number_required_for_loss_theft_statement
  - possible_lost_property_certificate
  - required_documents_application_photo_passport
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "在留カードを紛失・盗難・滅失した事実を知った日から14日以内に地方出入国在留管理官署へ再交付申請が必要。"
    source_title: "出入国在留管理庁：紛失等による在留カードの再交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「申請期間」欄を確認"
    display_label: "在留カード再交付（14日以内）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "紛失・盗難の場合は警察への届出受理番号が必要。申請内容に応じて遺失届出証明書等の提出を求められる場合がある。"
    source_title: "出入国在留管理庁：紛失等による在留カードの再交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「紛失・盗難に係る陳述書」および「遺失届出証明書」の記述を確認"
    display_label: "警察届出受理番号・遺失証明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "再交付申請先は地方出入国在留管理官署（市区町村役所ではない）。"
    source_title: "出入国在留管理庁：出入国港/市区町村/地方出入国在留管理官署での手続FAQ"
    source_url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「地方出入国在留管理官署での手続」→「在留カードの再交付申請」を確認"
    display_label: "申請先：地方入管（役所ではない）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 中長期在留者 — 在留カード紛失・盗難時の再交付申請

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
紛失等による在留カード再交付申請は入管法第19条の12に基づく。
```

---

## current_effective_fact

### 紛失等を知った日から14日以内に再交付申請

> 「当該事実を知った日（本邦から出国している間に当該事実を知った場合は、その後最初に入国した日）から１４日以内」
> source: moj-isa-card-loss-reissue

### 申請先は地方出入国在留管理官署

> 「在留カードの紛失、盗難、滅失、著しい汚損又は毀損等をした場合には、地方出入国在留管理官署に再交付を申請してください。」
> source: moj-isa-new-system-faq

### 紛失・盗難の場合は警察への届出受理番号が必要

> 「紛失・盗難に係る陳述書（紛失や盗難の場合は警察へ届出の上、届出受理番号が必要です。）」
> source: moj-isa-card-loss-reissue

### 遺失届出証明書等を求められる場合がある

> 「申請内容に応じて遺失届出証明書等の資料の提出をお願いする場合があります。」
> source: moj-isa-card-loss-reissue

### 主要な提出・提示書類

> 「在留カード再交付申請書」
> source: moj-isa-card-loss-reissue

> 「写真　１葉」
> source: moj-isa-card-loss-reissue

> 「旅券（又は在留資格証明書）を提示」
> source: moj-isa-card-loss-reissue

---

## exceptions_or_transition

| 状況 | 適用される判断 |
|------|--------------|
| 紛失・盗難 | まず警察へ届出を出し、届出受理番号を控える。必要に応じて遺失届出証明書等も用意。その後、14日以内に地方出入国在留管理官署で再交付申請 |
| 災害で滅失 | り災証明書等が必要になる場合がある |
| 14日を超えた | 理由等を記載した書類が別途必要となる。早急に入管へ相談 |
| 古いカードが後で見つかった | 再交付後に旧カードを発見した場合は返納手続きが必要 |

---

## common_user_phrases

主要トリガー（中文）：

- 在留卡丢了怎么办
- 在留卡不见了第一步做什么
- 在留卡被偷了怎么办
- 在留卡紛失了要去哪里
- 在留卡丢失要去役所吗
- 在留卡丢了要报警吗
- 在留卡丢了多久内要补办
- 在留卡再交付需要什么材料
- 遗失届受理番号是什么
- 在留卡丢失后可以先去区役所吗

技術キーワード（マッチャ用）：

- 在留卡丢 / 在留卡丟 / 在留卡丢失 / 在留卡遺失 / 在留カード紛失 / 在留カードなくした
- 在留卡被偷 / 在留カード盗難
- 在留卡再交付 / 在留卡补办 / 在留卡補辦 / 在留カード再交付
- 在留卡丢了要报警 / 在留卡丢失要报警
- 遺失届受理番号 / 届出受理番号 / 遺失届出証明書
- 紛失・盗難に係る陳述書

---

## must_say

1. 在留カードを紛失・盗難した場合、再交付申請の期間はその事実を知った日から14日以内
2. 再交付申請先は地方出入国在留管理官署
3. 紛失・盗難の場合は警察へ届出を出した上で、届出受理番号が必要
4. 申請内容により遺失届出証明書等の提出を求められる場合がある
5. 主な書類は再交付申請書、写真、旅券提示、紛失・盗難に係る陳述書等
6. 第一歩は「警察/交番で遺失・盗難届」→「入管で再交付申請」

## must_not_say

- ❌ 「まず市区町村役所へ行く」と案内する
- ❌ 入管への再交付申請を省略する
- ❌ 14日以内の期限を言わない
- ❌ 紛失・盗難で警察への届出受理番号に触れない
- ❌ 「在留カードがなくてもそのままで大丈夫」と安心させる

---

## qa_cases

### QA-1 — 在留カード紛失

**user**: 在留卡丢了怎么办？

**must_have**:
- 第一歩は警察/交番で遺失届を出し、届出受理番号を控える
- その事実を知った日から14日以内に地方出入国在留管理官署で再交付申請
- 申請書、写真、旅券、紛失・盗難に係る陳述書等

**must_not_have**:
- 第一歩を市区町村役所にする
- 期限を示さない

**good_answer_criteria**: 用户能马上知道先去警察/交番，再去入管再交付，并知道14日窗口。

### QA-2 — 遗失届受理番号

**user**: 在留卡丢了，入管说要受理番号，是什么？

**must_have**:
- 紛失・盗難の場合、警察へ届出の上、届出受理番号が必要
- 受理番号是警察受理遗失/盗难届后的编号
- 需要在再交付申请的陈述书/材料中使用

**must_not_have**:
- 说受理番号由区役所开具

**good_answer_criteria**: 明确受理番号来自警察而不是役所。

### QA-3 — 14日超過

**user**: 在留卡丢了已经超过14天了，怎么办？

**must_have**:
- 14日是原则申请期间
- 超过期间时可能需要说明理由等
- 立即准备警察届出、必要资料并联系入管窗口

**must_not_have**:
- 说超过14天不能补办
- 说不需要处理

**good_answer_criteria**: 不恐吓、不放任，行动收束到马上补办和说明理由。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 在留カード紛失・盗難時の再交付申請】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

【期限】
在留カードを紛失・盗難・滅失した場合、再交付申請はその事実を知った日から14日以内。

【申請先】
再交付申請先は地方出入国在留管理官署。市区町村役所ではない。

【紛失・盗難時の第一歩】
紛失・盗難の場合は、警察へ届出を出した上で「届出受理番号」が必要。
申請内容に応じて、遺失届出証明書等の提出を求められる場合もある。

【主な書類】
在留カード再交付申請書、写真1葉、旅券提示、紛失・盗難に係る陳述書等。

回答時の注意：
- 第一歩を「市区町村役所」と案内しない
- 「警察/交番で遺失・盗難届」→「入管で再交付申請」の順に案内する
- 14日以内の期限を必ず伝える
```

### injection_needs_review_addendum

```
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-10 | Codex (Cycle 1 self-cycle) | official source extraction + scenario mapping + QA cases | — | ai_verified | Fixes AQL P0 G04 wrong-office regression; risk=high so single explicit loss/reissue trigger can inject; official source only |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 4) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
