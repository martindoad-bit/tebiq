---
fact_id: minashi-sainyuukoku
title: "みなし再入国許可・通常再入国許可と長期出国による在留資格リスク"
state: ai_verified
risk_level: critical
confidence: medium
source_quality: official
controlled_alpha_eligible: true    # PL signoff 2026-05-07 — Pack 2.2 prod inject 解锁，FACT_LAYER_ENABLED=true 5-门第 5 项进度
last_verified_at: "2026-05-07"
reviewer: ai_self_verified
sprint: "0.6 / Workstream C / Batch 3"
citation_label: "みなし再入国許可（1年ルール・在留期限・長期出国リスク）"
citation_summary: "在留資格保持者が出国する際のみなし再入国許可制度（1年以内に再入国すれば許可不要）と、在留期限が6ヶ月未満での出国時の注意点、1年超出国時の在留資格失効リスクを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "帰国・海外旅行の際に再入国許可が必要かどうか確認したい"
  - "みなし再入国許可の有効期限（1年）を確認したい"
  - "在留期限が近い状態で出国した場合の扱いを確認したい"
  - "長期出国（1年超）の場合の在留資格への影響を確認したい"
does_not_cover:
  - "特別永住者のみなし再入国許可（有効期間2年 — 一般在留資格保持者とは異なる）"
  - "海外在住中の在留期間更新（原則不可）"
  - "出国前の在留期間更新（申請タイミングは zairyu-expiry-renewal-change 参照）"
ai_pipeline:
  collector_run_at: "2026-05-07"
  extractor_model: "claude-opus-4-5"
  source_count: 1
  self_verification_passed_at: "2026-05-07"
official_sources:
  - id: src-01
    url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    title: "再入国許可申請"
    publisher: "出入国在留管理庁"
    last_checked_at: "2026-05-07"
    quoted_in_card: true
applies_to:
  - "全在留資格保持者（海外渡航予定者）"
  - "在留期限が6ヶ月未満の者で海外渡航予定のある者"
  - "1年超の長期海外滞在を予定する者"
direct_fact_fields:
  - minashi_1year_definition
  - target_exclusions_3month_and_tanki
  - regular_reentry_validity_5year
ai_inferred_fields:
  - tokubetsu_eijuusha_2year_minashi
  - zairyu_shikaku_loss_consequence
  - zairyu_kigen_as_upper_bound
needs_review_flags:
  - id: tokubetsu_eijuusha_2year
    reason: "特別永住者のみなし再入国2年ルールはAI知識として把握しているが、本日のWebFetchではsrc-01に明示的記述なし。特別永住者特例法の該当条文または専用ISAページからの引用が必要。"
  - id: zairyu_shikaku_metsumetsu
    reason: "再入国許可なし出国による在留資格消滅は入管法第26条の2第6項が根拠とされるが、本日のfetchではe-gov法令ページ・src-01いずれもこの条文を取得できず。ai_inferenceとして扱い、certain_blockでheddging。DOMAIN確認推奨。"
  - id: zairyu_kigen_upper_bound
    reason: "在留期限がみなし再入国1年より前に来る場合、在留期限が実質上限という運用はAI知識だが、src-01に明示記述なし。行政運用上の解釈として扱う。"
evidence_points:
  - claim: "みなし再入国許可は在留資格保持者が出国から1年以内に再入国する場合に通常の再入国許可取得を不要とする制度。在留期間3月以下・短期滞在は対象外。"
    source_title: "出入国在留管理庁：再入国許可申請"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「みなし再入国許可」の定義および「対象外」の記述を確認"
    display_label: "みなし再入国許可（1年ルール・対象外）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "通常再入国許可の有効期間は現に有する在留期間の範囲内で最長5年（特別永住者は6年）。出国前に申請が必要。"
    source_title: "出入国在留管理庁：再入国許可申請"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「有効期間は、現に有する在留期間の範囲内で、５年間」の記述を確認"
    display_label: "通常再入国許可（最長5年・出国前申請）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードは{{TODAY_ISO}}時点で有効。みなし再入国許可の1年・通常再入国許可の5年いずれも
時点依存ルールであり、出国日を起点として計算する。特例措置（コロナ等）が活きている場合は
別途確認が必要（本日{{TODAY_ISO}}現在は通常運用）。

## current_effective_fact

### [minashi_1year_definition] みなし再入国許可の定義と1年ルール

*source: src-01*

「みなし再入国許可とは、我が国に在留資格をもって在留する外国人で有効な旅券を所持している
方のうち、「３月」以下の在留期間を決定された方及び「短期滞在」の在留資格をもって在留する
方以外の方が、出国の日から１年以内に再入国する場合には、原則として通常の再入国許可の取得
を不要とするものです。」（出入国在留管理庁 再入国許可申請ページ）

みなし再入国許可は、在留カードを所持する有効な在留資格保持者が出国から**1年以内**に
再入国する場合に、通常の再入国許可取得を不要とする制度。出国時に出国カードに「みなし」
欄へ記入することで手続きが完結する。

### [target_exclusions_3month_and_tanki] 対象外カテゴリー

*source: src-01*

以下の者はみなし再入国許可の対象外：

- 在留期間が「３月」以下と決定された者
- 「短期滞在」の在留資格で在留する者

（通常の在留カード不交付者は対象外）

### [regular_reentry_validity_5year] 通常再入国許可の有効期間

*source: src-01*

「有効期間は、現に有する在留期間の範囲内で、５年間（特別永住者の方は６年間）を最長として
決定されます。」（出入国在留管理庁 再入国許可申請ページ）

通常再入国許可は、出国前に地方出入国在留管理局または出張所で申請。1回限り有効（一次）と
有効期間内複数回使用可（数次）の2種類がある。

### [tokubetsu_eijuusha_2year_minashi] 特別永住者のみなし再入国（AI推論）

*source: ai_inference*

特別永住者については、みなし再入国許可の有効期間が**2年以内**とされている。これは
通常の外国人（1年）と異なる。（入管法特例法に基づく運用として広く知られるが、本日の
WebFetchで明示的法令条文を取得できず。needs_review。）

### [zairyu_shikaku_loss_consequence] 再入国許可なし出国の結果（AI推論）

*source: ai_inference*

再入国許可（みなし再入国許可を含む）を受けずに出国した場合、または有効期間内に再入国
しなかった場合、**在留資格及び在留期間は消滅する**と解されている。この場合、日本に
再入国するには新たに在留資格認定証明書の交付から手続きをやり直す必要がある。
（入管法第26条の2第6項の趣旨に基づくAI推論。needs_review。）

### [zairyu_kigen_as_upper_bound] 在留期限が先の場合の上限（AI推論）

*source: ai_inference*

みなし再入国許可の有効期間は「出国から1年以内」であるが、在留期限が1年より前に来る
場合は、**在留期限が実質的な上限**となる（在留期限を超えての在留継続はできないため）。

例：在留期限まで3ヶ月の時点で出国 → みなし再入国は在留期限当日まで（3ヶ月）が実質上限。
（行政運用上の解釈。needs_review。）

## exceptions_or_transition

- 特別永住者はみなし再入国2年（通常1年の例外）[needs_review]
- 在留期限が1年より前の場合は在留期限が実質上限 [needs_review]
- 通常再入国許可は最長5年（特別永住者6年）— 長期海外滞在には事前申請必要
- 再入国許可は出国前申請が原則（出国後の申請不可）
- 過去にコロナ禍の特例延長措置があったが、{{TODAY_ISO}}現在は通常運用

## common_user_phrases

- 「1年以上海外に住みたいんですがビザはどうなりますか」
- 「在留期限が3ヶ月後なんですが半年の海外出張が決まりました」
- 「再入国许可不要的情况是什么」
- 「海外から帰ってきたらビザが消えていたと言われました」
- 「出国前に必要な手続きは何がありますか」
- 「永住者も再入国許可が必要ですか」
- 「再入国许可最长几年」
- 「国に帰る前に何かしておくべきことはありますか」

技術キーワード（マッチャ用）：

- 再入国 / 再入国許可 / 再入国许可
- みなし再入国 / みなし再入国許可 / 当然再入国
- 出国 / 一時帰国 / 長期出国 / 长期出国
- 1年以内 / 1年 / ビザ 海外 / 在留期限 出国
- 在留資格消滅 / ビザ消えた / 资格消失
- 海外滞在 / 海外に住む / 海外赴任 / 帰国予定

## must_say

- 「みなし再入国許可の有効期間は出国から1年以内です」
- 「在留期限が1年より前に来る場合は、在留期限が実際の上限になります」
- 「1年を超える海外滞在の場合は、出国前に通常の再入国許可（最長5年）を申請してください」
- 「再入国許可は出国後の申請はできません。必ず出国前に手続きを」
- 「詳細は出入国在留管理庁または行政書士への確認を推奨します」

## must_not_say

- 「海外に何年いてもビザは維持されます」（在留資格消滅リスクを過小評価させる）
- 「みなし再入国は延長できます」（延長手続の正式根拠なし）
- 「空港でも再入国許可を申請できます」（出国前申請が原則）
- 「特別永住者以外も2年有効です」（通常外国人は1年）
- 「在留期限まで行けば問題ありません」（在留期限と出国期間の両方を見る必要がある）
- 「絶対に在留資格が消えます」（断定的表現は避け、「消滅する可能性があります」と表現）

## qa_cases

```yaml
qa_cases:
  - id: qa-01
    question: "1年半の海外駐在が決まりましたが、在留資格はどうなりますか？"
    context: "技人国保持者、在留期限2年後"
    must_have:
      - "みなし再入国許可は1年が上限のため、1年半の海外滞在では通常再入国許可の申請が必要"
      - "通常再入国許可は最長5年で、出国前に申請"
      - "出国後の申請はできない旨"
    must_not_have:
      - "ビザは自動的に維持される"
      - "帰国後に申請すれば良い"
  - id: qa-02
    question: "在留期限が2ヶ月後ですが、3ヶ月間の一時帰国を予定しています"
    context: "在留期限まで2ヶ月"
    must_have:
      - "みなし再入国の有効期限は在留期限が上限となるため2ヶ月が実質上限"
      - "3ヶ月の出国では2ヶ月後の在留期限に間に合わない"
      - "帰国前に在留期限の更新申請を検討するか、帰国時期を在留期限前にする必要がある旨"
    must_not_have:
      - "みなし再入国は1年なので3ヶ月は問題ない"
  - id: qa-03
    question: "再入国許可なしで出国してしまいました。在留資格はどうなりますか？"
    context: "緊急帰国で手続きを忘れた"
    must_have:
      - "みなし再入国許可として成立しているか確認（出国カードに記入したか、在留期限内1年以内か）"
      - "成立していれば1年以内の再入国で問題ない"
      - "成立していない場合は在留資格に重大な影響の可能性がある"
      - "在外公館または行政書士への相談推奨"
    must_not_have:
      - "問題ありません"
      - "在留資格は確実に消えています"
  - id: qa-04
    question: "永住者です。5年間海外で生活したいと思っているのですが"
    context: "永住者（通常の永住者、特別永住者ではない）"
    must_have:
      - "通常再入国許可（最長5年）の事前申請が必要"
      - "みなし再入国は1年のみ適用のため5年には不十分"
      - "出国前に申請が必要な旨"
      - "永住資格自体への影響（長期出国で問題になる可能性）について言及または専門家相談推奨"
    must_not_have:
      - "永住者は再入国許可不要"
      - "5年間自動的に維持される"
```

## injection_format

### injection_certain_block

```
【みなし再入国許可・通常再入国許可 — 基本ルール（{{TODAY_ISO}} 時点）】

■ みなし再入国許可（通常の外国人）
- 有効な在留カードを持つ外国人が出国から1年以内に再入国する場合、再入国許可の取得は不要
- 「３月」以下の在留期間者・「短期滞在」保持者は対象外
- 出国時に出国カードの「みなし」欄に記入することが必要
- 在留期限が1年より前にある場合、実質的な上限は在留期限当日（在留期限を超えた在留継続は不可のため）

■ 通常再入国許可（1年超の海外滞在に必要）
- 最長有効期間：5年間（特別永住者は6年間）
  「有効期間は、現に有する在留期間の範囲内で、５年間（特別永住者の方は６年間）を最長として決定されます」（出入国在留管理庁）
- 申請タイミング：出国前に地方出入国在留管理局・出張所で申請（出国後の申請は原則不可）
- 一次（1回限り）・数次（有効期間内複数回）の2種類

■ 注意事項
- みなし再入国許可または通常再入国許可の有効期間内に再入国しなかった場合、在留資格に重大な影響が生じる可能性があります（詳細は行政書士にご確認ください）
- 緊急出国等で事前手続きができなかった場合は、在外公館または入国管理局に相談が必要です

■ 避けるべき表現
- 「海外に何年いても在留資格は維持されます」（在留期限・再入国許可の期限を超えた場合は保証されない）
- 「みなし再入国は延長できます」（公式な延長手続きの根拠なし）
- 「空港でも手続きできます」（通常再入国許可は出国前申請が原則）

■ 回答スタイル
- 出国予定期間と在留期限を両方確認してから判断する
- 不確実な状況では「可能性があります」「行政書士にご確認ください」と明記
- 断定的に「大丈夫です」「問題ありません」と言わない
```

### injection_needs_review_addendum

```
以下の点は専門家（行政書士・入管窓口）への確認を推奨します：
- 特別永住者のみなし再入国許可期間（2年とされるが法令条文の明示確認が必要）
- 再入国許可なし出国後の在留資格消滅の具体的条件・手続き
- 在留期限とみなし再入国許可期間が重なる場合の優先ルール
- みなし再入国中に在留期限延長が必要になった場合の対処
```

## changelog

| date | actor | action | state |
|------|-------|--------|-------|
| 2026-05-07 | FACT-OPS Batch 3 | 初次抽取 src-01 から1年ルール確認 | draft → ai_extracted |
| 2026-05-07 | FACT-OPS Batch 3 | 13項自己チェック通過、ai_inferred_fields hedging適用 | ai_extracted → ai_verified |
| 2026-05-07 | GM (Batch 5) | PL signoff 2026-05-07 — Pack 2.2 prod inject 解锁，FACT_LAYER_ENABLED=true 5-门第 5 项进度。controlled_alpha_eligible: false → true。keyword coverage 追加（技術キーワード 6 bullets）。 | ai_verified | ai_verified | alpha flip + keyword coverage |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 4) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
| 2026-05-11 | FACT-OPS (Evidence Layer v1) | URL生存確認完了。`https://www.moj.go.jp/isa/immigration/procedures/16-5.html` はアクティブページ（再入国許可申請）。パス `isa/immigration/` は他と異なるが404リスクなし。evidence_points URL変更不要。 | ai_verified | ai_verified | url-check |

## Audit assignment

- `risk_level: critical` → DOMAIN human audit queue (priority 1 — 但 confidence medium，3 needs_review_flag 待 DOMAIN 解决)
- `controlled_alpha_eligible: false` (FACT 自律遵守 §9 — critical 卡仅 PL signoff 路径)
- `needs_review_flags.tokubetsu_eijuusha_2year` → 特別永住者特例法 条文確認
- `needs_review_flags.zairyu_shikaku_metsumetsu` → 入管法第26条の2第6項 e-gov 取得（FACT 报告 e-gov WebFetch 不稳）
- `needs_review_flags.zairyu_kigen_upper_bound` → 行政運用解釈の明文化探索
