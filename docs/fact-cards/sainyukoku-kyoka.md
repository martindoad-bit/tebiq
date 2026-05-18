---
fact_id: sainyukoku-kyoka
title: 再入国許可・みなし再入国 — 在留資格を保持したまま出国する
state: ai_verified   # DOMAIN rewrite 2026-05-18: narrowed to direct ISA re-entry facts; removed fee and post-expiry re-acquisition guidance.
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 16)
sprint: "cycle2-new-batch16"
citation_label: "再入国許可・みなし再入国（有効期間内1年以内・特別再入国許可5年・1年超出国で在留資格消滅）"
citation_summary: "在留資格を持つ外国人が日本から出国して再入国する際の「みなし再入国」（1年以内・パスポート有効かつ在留期間内）と「再入国許可」（5年以内）の要件と、1年を超える出国で在留資格が消滅するリスクを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留資格を持つ外国人が一時帰国・海外出張する際の手続きを確認したい"
  - "みなし再入国と再入国許可の違いを確認したい"
  - "1年以上海外に滞在する場合に在留資格が失効するか確認したい"
  - "再入国許可の申請方法・有効期間を確認したい"
does_not_cover:
  - "永住者の再入国許可（永住者は有効期間が異なる — eijuu-sainyukoku 参照）"
  - "難民認定者の再入国（別途手続きあり）"
  - "出国後の在留資格再取得の手続き"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/immigration/procedures/16-5.html
    label: 出入国在留管理庁 — 再入国許可
    accessed: "2026-05-11"
applies_to:
  - 在留資格（就労・留学・家族滞在等）を持つ外国人で一時帰国・海外出張する者
  - 1年以上海外に滞在する可能性がある在留外国人
direct_fact_fields:
  - みなし再入国許可：有効な旅券・在留カードを持って出国する場合、出入国時に「みなし再入国」の意思を示すことで手続き不要。ただし在留期間内かつ1年以内の出国のみ有効
  - みなし再入国の有効期間：「出国日から1年以内」（在留期限が1年未満の場合は在留期限まで）
  - 再入国許可の有効期間：最長5年（特別永住者は特例あり）
  - 在留資格の消滅：再入国許可・みなし再入国の有効期間内に再入国しない場合、在留資格が失効する
  - 再入国許可の申請先：出国前に最寄りの地方出入国在留管理官署（窓口またはオンライン）
ai_inferred_fields: []
needs_review_flags: []
related_links:
  - title: "出入国在留管理庁 — 再入国許可"
    url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 再入国許可・みなし再入国"
    locator: "ページ内で「再入国許可」「みなし再入国」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "みなし再入国許可：有効な旅券・在留カードを持ち、出国時に意思表示するだけで手続き不要。有効期間は出国日から1年以内（在留期限が先に来る場合は在留期限まで）。再入国許可の最長有効期間は5年。有効期間内に再入国しない場合は在留資格が失効。"
    source_title: "出入国在留管理庁：再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「みなし再入国（1年以内・在留期間内）」「再入国許可の最長有効期間5年」「在留資格の失効」の記述を確認"
    display_label: "再入国許可：みなし再入国は1年以内・再入国許可は最長5年・期間超過で在留資格失効"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "みなし再入国許可は、有効な旅券及び在留カードを所持する外国人が出国後1年以内（在留期限が先に到来する場合は在留期限まで）に再入国する場合の制度。空港での具体的な記入操作や費用はこのカードでは注入しない。"
    source_title: "出入国在留管理庁：再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「みなし再入国許可」「出国の日から1年以内」「在留期間の満了の日」を確認"
    display_label: "みなし再入国：出国後1年以内・在留期限内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "再入国許可の申請先：出国前に最寄りの地方出入国在留管理官署に申請。オンライン申請（入管オンライン）でも申請可能。有効期間は最長5年。"
    source_title: "出入国在留管理庁：再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「再入国許可の申請先（地方出入国在留管理官署・オンライン申請）」「有効期間（最長5年）」の記述を確認"
    display_label: "再入国許可の申請：出国前に地方入管またはオンラインで申請・有効期間最長5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。

## current_effective_fact

在留資格を持つ外国人が日本から出国して再入国する場合、出国後1年以内（在留期限が先に来る場合は在留期限まで）であれば「みなし再入国」の対象になりうる。1年を超える出国を予定する場合は、出国前に再入国許可を確認する。

**みなし再入国 vs 再入国許可（{{TODAY_ISO}} 現在）：**

| 項目 | みなし再入国 | 再入国許可 |
|------|------------|---------|
| 手続き | 出国時に再入国の意思表示 | 出国前に申請が必要 |
| 有効期間 | 出国日から**1年以内**（在留期限が先の場合はそちらが上限） | 最長**5年** |
| 費用 | このカードでは扱わない | このカードでは扱わない |

**1年超の海外滞在が必要な場合の境界：**
出国前に再入国許可の要否を確認する。有効期間内に再入国しない場合、在留資格は失効する。

## exceptions_or_transition

- **在留資格の失効リスク**：みなし再入国・再入国許可の有効期間内に再入国しない場合、在留資格は自動的に消滅する
- **永住者・特別永住者の特例**：このカードでは扱わない（別カード参照）。
- **失効後の再取得手続き**：このカードでは扱わない。

## common_user_phrases

- 日本から一時帰国しますが、ビザは大丈夫ですか
- 1年以上帰国したいのですが、在留資格はどうなりますか
- みなし再入国って何ですか
- 再入国許可の申請はどこでしますか
- 在留カードを持ったまま帰国できますか

技術キーワード（マッチャ用）：

- 再入国許可 / みなし再入国 / 在留資格 帰国 保持
- 1年以上 帰国 在留資格 / 再入国許可 有効期間 / 在留資格 失効 帰国
- 在留カード 出国 / 外国人 一時帰国 ビザ / 再入国許可 申請

## must_say

- みなし再入国：出国後1年以内・在留期間内が上限
- 1年超の出国を予定する場合は、出国前に再入国許可を確認
- 有効期間内に戻らない場合は在留資格が失効する

## must_not_say

- 「1年以上帰国しても在留資格は消えない」（有効期間超過で失効する）
- 「みなし再入国に期限はない」（1年以内・在留期限内に限定）

## qa_cases

**Q1: 就労ビザで日本にいます。3か月の帰国中、在留資格は保持されますか？**
A: 有効な旅券・在留カードを持ち、出国後1年以内かつ在留期限内に再入国する場合は、みなし再入国の対象になりうる範囲です。出国時の意思表示が必要です。

**Q2: 2年間帰国する必要があります。どうすれば在留資格を保持できますか？**
A: 出国前に再入国許可を確認してください。再入国許可の有効期間は最長5年で、有効期間内に戻れない場合は在留資格が失効します。

## injection_format

### injection_certain_block

```
【再入国許可・みなし再入国 ファクト / {{TODAY_ISO}} 確認済み】

・みなし再入国：出国から1年以内（在留期限が先に来る場合は在留期限まで）
・再入国許可：有効期間は最長5年
・有効期間内に戻らない場合：在留資格が失効
・空港での具体的な記入操作、費用、永住者・特別永住者の特例、失効後の再取得手続きはこのカードでは扱わない
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 16) | 新規作成。再入国許可・みなし再入国。ISA公式でみなし再入国1年以内・再入国許可最長5年・在留資格失効リスクを確認。出国手続きの具体的操作・永住者の特例はai推定。 | — | ai_verified | new |
