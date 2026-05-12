---
fact_id: kazoku-taizai-yoken
title: "家族滞在ビザ 対象主ビザ要件・特定技能1号の除外・活動範囲"
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-07"
reviewer: ai_self_verified
sprint: "0.6 / Workstream C / Batch 3"
citation_label: "家族滞在ビザ（対象主ビザ要件・特定技能1号除外・活動範囲）"
citation_summary: "家族滞在（配偶者・子）として在留できる主ビザの種別と、特定技能1号が対象外であることを確認するカード。家族滞在者の就労活動は原則禁止（資格外活動許可が必要）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家族を日本に帯同する場合の在留資格（家族滞在）の対象条件を確認したい"
  - "特定技能1号の保有者が家族滞在ビザで家族を呼べるか確認したい"
  - "家族滞在ビザの活動範囲・就労の可否を確認したい"
does_not_cover:
  - "家族滞在者のアルバイト（資格外活動許可）の申請手続き（shikakugai-fukugyou 参照）"
  - "永住者の配偶者等・日本人の配偶者等（別の在留資格）"
  - "特定技能2号の家族帯同（別途在留資格ページで確認要）"
ai_pipeline:
  collector_run_at: "2026-05-07"
  extractor_model: "claude-opus-4-5"
  source_count: 1
  self_verification_passed_at: "2026-05-07"
official_sources:
  - id: src-01
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    title: "家族滞在（在留資格）"
    publisher: "出入国在留管理庁"
    last_checked_at: "2026-05-07"
    quoted_in_card: true
applies_to:
  - "就労系・留学系在留資格保持者で家族を帯同したい者"
  - "特定技能1号保持者で家族帯同を検討している者"
  - "家族滞在ビザ保持者の就労・活動範囲確認"
direct_fact_fields:
  - qualifying_sponsor_visa_types
  - tokuteiginou_1go_exclusion
  - permitted_activities_daily
  - maximum_period_5year
ai_inferred_fields:
  - work_requires_shikakugai_kyoka
  - income_requirement_practical
needs_review_flags:
  - id: minimum_income_threshold
    reason: "扶養に足りる収入の具体的閾値は src-01 に数値記載なし。住民税証明書等の書類提出が必要とされているが、審査基準の数値は公開されていない。"
  - id: adult_child_age_limit
    reason: "「子」の範囲（成人後の扶養家族の扱い）については src-01 に明示記述なし。"
related_links:
  - title: "家族滞在（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在（在留資格）"
    locator: "ページ内で「家族滞在（在留資格）」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在の対象となる主ビザ（就労系・留学・文化活動等）：教授、芸術、宗教、報道、高度専門職、経営・管理、法律・会計業務、医療、研究、教育、技術・人文知識・国際業務、企業内転勤、介護、興行、技能、特定技能2号、文化活動、留学。特定技能1号は含まれない。在留期間：「5年、3年、1年、6月または3月のうち、法務大臣が指定する期間」。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「対象者（在留資格の種類）」「在留期間」の記述を確認"
    display_label: "家族滞在：対象主ビザ一覧・特定技能1号除外・在留期間最長5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "家族滞在ビザ保持者の許可活動は「この在留資格をもって在留する者の扶養を受ける配偶者又は子として行う日常的な活動」。就労（アルバイト含む）は日常的な活動に含まれず、別途資格外活動許可が必要（ai推定）。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「活動内容」「日常的な活動」の記述を確認"
    display_label: "家族滞在：日常的な活動のみ可・就労は資格外活動許可が必要"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
  - claim: "家族滞在の扶養申請には扶養能力を証明する書類（住民税課税証明書・収入を証する文書等）の提出が必要。具体的な最低収入基準の数値は公式には示されていない（審査基準の数値は未公表）。扶養者の収入水準・家族構成を踏まえた審査が行われる（ai推定）。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「扶養」「収入を証する文書」「住民税課税証明書」の記述から推論（具体的収入閾値は未公表のためai推定）"
    display_label: "家族滞在申請：扶養能力証明書類が必要・具体的収入基準は非公表（ai推定）"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードは{{TODAY_ISO}}時点で有効。特定技能2号の対象職種拡大（2023年以降）に伴い、
家族滞在対象主ビザに特定技能2号が追加されている状態。{{TODAY_ISO}}現在、特定技能1号は
引き続き家族滞在の対象主ビザから除外されている。

## current_effective_fact

### [qualifying_sponsor_visa_types] 家族滞在の対象となる主ビザ種別

*source: src-01*

家族滞在（扶養される配偶者・子）を持つことができる在留資格（扶養者側）：

**別表第一の一（外交・文化活動系）**
教授、芸術、宗教、報道

**別表第一の二（就労系）**
高度専門職、経営・管理、法律・会計業務、医療、研究、教育、技術・人文知識・国際業務、
企業内転勤、介護、興行、技能、**特定技能2号**

**別表第一の三（その他）**
文化活動、**留学**

（src-01 の在留資格欄から直接抽出）

### [tokuteiginou_1go_exclusion] 特定技能1号は家族滞在の対象外

*source: src-01*

**特定技能1号** は上記リストに含まれていない。

src-01 のテーブルには特定技能2号（「特定技能2号」として明示）のみが掲載されており、
特定技能1号は家族滞在の扶養者になれない。

これは実務上の大きな落とし穴：特定技能1号として日本で働く外国人は、
配偶者や子を「家族滞在」として帯同することができない。

（また、技能実習・技術実習も対象主ビザに含まれない。）

### [permitted_activities_daily] 家族滞在ビザ保持者の許可活動範囲

*source: src-01*

「この在留資格をもって在留する者の扶養を受ける配偶者又は子として行う日常的な活動」

「日常的な活動」には就労は含まれない。就労（アルバイト含む）は別途「資格外活動許可」
の取得が必要（週28時間上限等の条件あり）。

### [maximum_period_5year] 在留期間の上限

*source: src-01*

「5年、3年、1年、6月又は3月のうち、法務大臣が指定する期間」

最長5年。実際の在留期間は扶養者の在留期間に合わせて決定されることが多い。

### [work_requires_shikakugai_kyoka] 就労には資格外活動許可が必要（AI推論）

*source: ai_inference*

家族滞在ビザは「日常的な活動」のみが許可されており、アルバイト・パート等の就労には
「資格外活動許可」を取得する必要がある。週28時間の上限がある（資格外活動許可に関する
詳細は別ファクトカード `shikakugai-fukugyou` を参照）。

（ai_inference: 資格外活動許可のルール詳細は src-01 記載外。）

### [income_requirement_practical] 扶養能力証明の実務（AI推論）

*source: ai_inference*

家族滞在申請には扶養能力を証明する書類（住民税課税証明書・収入を証する文書等）が必要。
具体的な最低収入基準の数値は公式には示されていないが、一般的に家族全員を扶養できる
収入水準であることが審査される。（ai_inference: 具体的審査基準は needs_review。）

## exceptions_or_transition

- 特定技能1号: 家族帯同不可（特定技能2号は可）
- 留学ビザ保持者は家族滞在の扶養者になれる（ただし学生が家族を扶養できるか収入証明が課題）
- 技能実習: 家族帯同不可（技能実習制度は廃止・特定技能等への移行が進行中）
- 家族滞在ビザから他のビザへの変更: 要件を満たせば他在留資格への変更申請可能

## common_user_phrases

- 「特定技能1号で妻（夫）を呼べますか」
- 「家族滞在签证怎么申请」
- 「留学生の家族は家族滞在ビザを取れますか」
- 「家族滞在ビザでアルバイトはできますか」
- 「技人国で家族を連れてきたい」
- 「配偶者を日本に連れてくるにはどんなビザが必要ですか」
- 「家族滞在怎么转成工作签证」
- 「家族滞在的家人能打工吗」

技術キーワード（マッチャ用）：

- 家族滞在 / 家族ビザ / 家族签证 / 扶養ビザ
- 家族帯同 / 妻を呼ぶ / 夫を呼ぶ / 子どもを連れてくる
- 特定技能1号 / 特定技能 / 家族帯同不可
- 留学 / 留学生の家族 / 扶養者
- アルバイト / 就労 / 資格外活動許可
- 帯同 / 呼び寄せ / 家族来日

## must_say

- 「特定技能1号の方は、現状では家族滞在ビザで家族を日本に呼ぶことはできません」
- 「特定技能2号は家族滞在の対象主ビザに含まれます」
- 「家族滞在ビザは就労不可です。アルバイト等には資格外活動許可が必要です」
- 「留学ビザ保持者も扶養者として家族滞在の対象になります」

## must_not_say

- 「特定技能でも家族を呼べます」（特定技能1号は不可、2号は可。混同を招く表現は危険）
- 「家族滞在ビザで働けます」（資格外活動許可なしには就労不可）
- 「技能実習者も家族を呼べます」（技能実習は対象外）
- 「収入○○円以上で家族を呼べます」（具体的数値基準は公式未公表）

## qa_cases

```yaml
qa_cases:
  - id: qa-01
    question: "特定技能1号で日本で働いていますが、妻と子どもを日本に呼べますか？"
    context: "特定技能1号保持者"
    must_have:
      - "特定技能1号は家族滞在の対象主ビザではないため、現状では家族を家族滞在で帯同できない"
      - "特定技能2号であれば家族滞在が可能な旨"
      - "行政書士への相談推奨（他の在留資格への変更等も含めた検討）"
    must_not_have:
      - "特定技能でも家族を呼べます"
      - "申請すれば大丈夫です"
  - id: qa-02
    question: "留学しているのですが、妻に家族滞在ビザで来てもらえますか？"
    context: "留学ビザ保持者"
    must_have:
      - "留学は家族滞在の対象主ビザに含まれるため、原則可能"
      - "扶養能力を証明する書類が必要（留学生が扶養者として認められるか確認が必要）"
    must_not_have:
      - "留学生は家族を呼べません"
  - id: qa-03
    question: "家族滞在ビザを持っている妻にアルバイトをさせたいのですが"
    context: "配偶者が家族滞在ビザ保持"
    must_have:
      - "家族滞在ビザは就労不可のため、資格外活動許可の申請が必要"
      - "資格外活動許可を取得すれば週28時間以内での就労が可能"
    must_not_have:
      - "家族滞在ビザで働けます"
      - "許可なしで働いても問題ありません"
  - id: qa-04
    question: "技人国から他の会社に転職した場合、家族の家族滞在ビザはどうなりますか？"
    context: "技人国保持者が転職"
    must_have:
      - "主ビザ（技人国）が維持される限り家族の家族滞在ビザも原則維持"
      - "転職に伴う就労資格の「活動内容の変更」に注意（技人国カードの活動内容と新職務の整合性確認）"
    must_not_have:
      - "転職したら家族のビザも更新が必要です"
```

## injection_format

### injection_certain_block

```
【家族滞在ビザ 対象主ビザ・活動範囲（{{TODAY_ISO}} 時点）】

出典：出入国在留管理庁「家族滞在（在留資格）」

■ 家族滞在の対象となる主ビザ（扶養者の在留資格）
就労系：教授、芸術、宗教、報道、高度専門職、経営・管理、法律・会計業務、医療、
        研究、教育、技術・人文知識・国際業務、企業内転勤、介護、興行、技能、
        特定技能２号
その他：文化活動、留学

■ 特定技能1号は対象外（重要）
特定技能1号の在留資格は上記リストに含まれていない。
特定技能1号保持者は、配偶者・子を「家族滞在」ビザで帯同することができない。
（特定技能２号は対象内）

■ 家族滞在ビザ保持者の許可活動
「この在留資格をもって在留する者の扶養を受ける配偶者又は子として行う日常的な活動」
→ 就労は「日常的な活動」に含まれない。アルバイト等は「資格外活動許可」が必要。

■ 在留期間
最長5年（法務大臣が指定する期間）。扶養者の在留期間に連動することが多い。

■ 避けるべき表現
- 「特定技能でも家族を呼べます」（特定技能1号は不可）
- 「家族滞在ビザで働けます」（資格外活動許可なしには就労不可）
- 「技能実習者も家族を連れてこられます」（技能実習は対象外）

■ 回答スタイル
- まず扶養者の在留資格を確認する
- 特定技能1号/2号の違いを明確に伝える
- 就労の可否については必ず資格外活動許可の必要性に言及する
```

### injection_needs_review_addendum

```
以下の点は確認推奨：
- 扶養能力の具体的な収入基準（審査基準の数値は公開されていない）
- 成人した子の家族滞在継続可否（年齢制限の詳細）
- 技能実習制度廃止後の新制度（育成就労）での家族帯同ルール（2024年以降の変化を確認）
```

## changelog

| date | actor | action | state |
|------|-------|--------|-------|
| 2026-05-07 | FACT-OPS Batch 3 | src-01（ISA 家族滞在ページ）から全direct_fact確認 | draft → ai_extracted |
| 2026-05-07 | FACT-OPS Batch 3 | 13項チェックリスト通過 | ai_extracted → ai_verified |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified (no change) |

## Audit assignment

- `risk_level: high` → DOMAIN human audit queue (priority 2 — 4 direct_fact 全 source-quoted, 2 needs_review 非 blocking)
- `controlled_alpha_eligible: false` (FACT 自律遵守 §9)
- `needs_review_flags.minimum_income_threshold` → 審査基準の収入数値（公式未公表，DOMAIN/書士 経験値）
- `needs_review_flags.adult_child_age_limit` → 子の年齢制限詳細
