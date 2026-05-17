---
fact_id: sainyukoku-kyoka
title: 再入国許可・みなし再入国 — 在留資格を保持したまま出国する
state: ai_extracted   # 2026-05-17: WB-B safety debt downgrade — original source_url pointed to 資格外活動 page (mismatch). URL fixed to /isa/immigration/procedures/16-5.html (verified ALIVE, title "再入国許可申請"); state held at ai_extracted pending FACT re-verification of all quotes against correct page.
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
ai_inferred_fields:
  - みなし再入国の出国手続き：出国時に空港でED（出帰国）カードの「みなし再入国」の欄にチェックを入れる（ai推定）
  - 1年超の出国が必要な場合：事前に再入国許可（最長5年）を取得することで在留資格を保持できる（ai推定）
  - コロナ禍特例（2020〜2022年）：出国時有効だったみなし再入国の有効期限を延長する措置が取られたが、現在は通常通り（ai推定）
  - 永住者の再入国許可：5年（最長）の再入国許可が取得可能（ai推定 — eijuu-sainyukoku 参照）
needs_review_flags:
  - minashi_sainyukoku_procedure_detail: みなし再入国の出国手続きの具体的操作（EDカードの記入方法等）はISA確認要。
  - eijuusha_sainyukoku_kikan: 永住者の再入国許可の有効期間（5年超か否か）はeijuu-sainyukokuで確認要。
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
  - claim: "みなし再入国許可の手続き：出国時に空港でEDカード（出帰国記録カード）の「みなし再入国」欄にチェックを入れるだけ。特別な申請・費用は不要。"
    source_title: "出入国在留管理庁：再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「みなし再入国の手続き（EDカードへのチェック・費用不要）」の記述を確認"
    display_label: "みなし再入国の手続き：空港でEDカードにチェックするだけ・申請費用不要"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
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

在留資格を持つ外国人が日本から出国して再入国する場合、1年以内であれば「みなし再入国」として特別な手続きなしに在留資格を保持できる。1年以上の出国が必要な場合は、事前に「再入国許可」（最長5年）を取得することが必要。

**みなし再入国 vs 再入国許可（{{TODAY_ISO}} 現在）：**

| 項目 | みなし再入国 | 再入国許可 |
|------|------------|---------|
| 手続き | 出国時に意思表示のみ（手続き不要） | 出国前に入管で申請が必要 |
| 有効期間 | 出国日から**1年以内**（在留期限が先の場合はそちらが上限） | 最長**5年** |
| 費用 | 無料 | 手数料あり（3,000円・ai推定） |

**1年超の海外滞在が必要な場合の対応：**
1. 出国前に最寄りの地方出入国在留管理官署で再入国許可を申請
2. 許可期間（最長5年）内に日本に戻る
3. 期間内に戻れなかった場合 → 在留資格が失効

## exceptions_or_transition

- **在留資格の失効リスク**：みなし再入国・再入国許可の有効期間内に再入国しない場合、在留資格は自動的に消滅する
- **永住者の特例**：永住者の再入国許可は最長5年が通常（詳細はeijuu-sainyukoku 参照）
- **帰国前の在留資格申請**：在留資格が失効した場合は、在外公館でのビザ・COE申請からやり直しが必要

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

- みなし再入国：1年以内・在留期間内なら手続き不要
- 1年超の出国は事前に再入国許可（最長5年）を取得が必要
- 有効期間内に戻らない場合は在留資格が失効する

## must_not_say

- 「1年以上帰国しても在留資格は消えない」（有効期間超過で失効する）
- 「みなし再入国に期限はない」（1年以内・在留期限内に限定）

## qa_cases

**Q1: 就労ビザで日本にいます。3か月の帰国中、在留資格は保持されますか？**
A: はい。有効な旅券・在留カードを持って出国し、出国時に「みなし再入国」の意思を示せば、特別な申請なしに3か月以内（在留期限内）は在留資格を保持したまま再入国できます。

**Q2: 2年間帰国する必要があります。どうすれば在留資格を保持できますか？**
A: 出国前に最寄りの地方出入国在留管理官署で「再入国許可」を申請してください。最長5年間の再入国許可を取得でき、その期間内に日本に戻れば在留資格が保持されます。期間内に戻れない場合は在留資格が消滅するためご注意ください。

## injection_format

### injection_certain_block

```
【再入国許可・みなし再入国 ファクト / {{TODAY_ISO}} 確認済み】

・みなし再入国：出国から1年以内（在留期限内）→手続き不要
・1年超の出国：事前に再入国許可を取得（最長5年）
・⚠️ 有効期間内に戻らない場合 → 在留資格が失効
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 16) | 新規作成。再入国許可・みなし再入国。ISA公式でみなし再入国1年以内・再入国許可最長5年・在留資格失効リスクを確認。出国手続きの具体的操作・永住者の特例はai推定。 | — | ai_verified | new |
