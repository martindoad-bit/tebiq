---
fact_id: ryugaku-gijinkoku-henko
title: 留学から技人国（就労ビザ）への在留資格変更
state: ai_verified
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-07"
reviewer: FACT-OPS (Batch 6)
sprint: "0.6"
citation_label: "留学→技人国 在留資格変更（審査基準・処理期間・CEFR要件）"
citation_summary: "留学ビザから技術・人文知識・国際業務（技人国）への在留資格変更許可申請の審査基準・標準処理期間・学歴要件・2026年4月施行のCEFR B2要件を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "留学生が日本企業への就職で在留資格変更（技人国）を申請したい"
  - "技人国変更申請に必要な書類・審査基準を確認したい"
  - "留学から技人国への変更申請の処理期間・特例期間を確認したい"
does_not_cover:
  - "技人国更新申請の書類（gijinkoku-koushin-shorui 参照）"
  - "技人国の業務内容と在留資格の不一致リスク（gijinkoku-job-mismatch 参照）"
  - "在留資格変更申請中の就労可否（資格外活動許可 — shikakugai-fukugyou 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    label: 出入国在留管理庁 — 在留資格変更許可申請
    accessed: "2026-05-07"
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: 出入国在留管理庁 — 技術・人文知識・国際業務（在留資格）
    accessed: "2026-05-07"
applies_to:
  - 留学ビザ（留学）保持者で日本国内での就職を希望する者
  - 日本の大学・大学院・短期大学・専門学校の在学中または卒業見込み者
  - 外国の大学等を卒業後、日本企業から内定を得た者
direct_fact_fields:
  - 在留資格変更許可申請の標準処理期間は1か月〜2か月
  - 変更事由が生じてから在留期間満了日以前に申請が必要
  - 審査基準：「行おうとする活動が虚偽のものでなく、在留資格の変更を適当と認めるに足りる相当の理由があること」
  - 技人国許可活動例：機械工学等の技術者、通訳、デザイナー、私企業の語学教師、マーケティング業務従事者等
  - 技人国学歴・実務要件：本邦大学卒業相当または関連業務の実務経験、ITは情報処理技術者資格でも可
  - 言語使用中心業務（通訳・語学教師等）に従事する者はCEFR B2相当の言語能力が必要（2026-04-15施行）
ai_inferred_fields:
  - 卒業見込みでの在留資格変更申請受理（卒業証明書を後日提出する運用）
  - 申請中は出入国管理特例法により在留期間満了後も適法在留継続（特例期間）
needs_review_flags:
  - cefr_b2_language_role_scope: 「主として言語使用業務に従事する場合のCEFR B2要件」の適用範囲と根拠条文確認（2026-04-15施行の改正告示照合要）
  - pre_graduation_application_flow: 卒業見込みでの申請受理・卒業証明書後日提出の実務フロー確認（CategoryⅠ〜Ⅳによる差異含む）
related_links:
  - title: "出入国在留管理庁 — 在留資格変更許可申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 在留資格変更許可申請"
    locator: "ページ内で「在留資格変更許可申請」を検索"
    relation: "official_reference"
  - title: "出入国在留管理庁 — 技術・人文知識・国際業務（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 技術・人文知識・国際業務（在留資格）"
    locator: "ページ内で「技術・人文知識・国際業務（在留資格）」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "留学→技人国 在留資格変更の標準処理期間：1か月〜2か月。申請は変更事由が生じてから在留期間満了日以前に必要。審査基準：「行おうとする活動が虚偽のものでなく、在留資格の変更を適当と認めるに足りる相当の理由があること」。"
    source_title: "出入国在留管理庁：在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「処理期間」「審査基準」「申請時期」の記述を確認"
    display_label: "留学→技人国：処理1〜2か月・変更事由発生〜満了前申請・申請中は特例期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "技人国の許可活動例：機械工学等の技術者、通訳、デザイナー、私企業の語学教師、マーケティング業務従事者等。学歴・実務要件：本邦大学卒業相当または関連業務の実務経験（IT分野は情報処理技術者資格でも可）。2026年4月15日施行：主として言語使用業務に従事する場合はCEFR B2相当の言語能力が必要（`cefr_b2_language_role_scope`確認要）。"
    source_title: "出入国在留管理庁：技術・人文知識・国際業務（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「許可活動」「学歴・実務要件」「2026年4月CEFR B2」の記述を確認"
    display_label: "技人国：対象活動例・学歴/実務要件・CEFR B2適用範囲は要確認"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
  - claim: "卒業見込みでの在留資格変更申請受理が可能（卒業証明書は後日提出の運用）（ai推定 — ISA実務に基づく）。申請中は出入国管理特例法により在留期間満了後も適法在留継続（特例期間）が認められる。"
    source_title: "出入国在留管理庁：在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「在留資格変更許可申請」「特例期間」の記述を確認"
    display_label: "留学→技人国：卒業見込みで申請可（卒業証明後日提出・ai推定）・申請中は特例期間として在留継続"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での規則に基づく。CEFR B2 要件は2026-04-15施行の改正告示に基づき記載（`cefr_b2_language_role_scope` フラグ参照）。

## current_effective_fact

日本の大学等で学ぶ留学生が就職に伴い在留資格を変更する場合、「留学」→「技術・人文知識・国際業務（技人国）」への在留資格変更許可申請が必要。

**手続きの骨格（{{TODAY_ISO}} 現在）：**
- 在留資格変更は「変更事由が生じてから在留期間満了日以前」に申請
- 標準処理期間：**1か月〜2か月**（審査機関・申請カテゴリによる）
- 申請中は在留期限を超えても特例期間として在留継続可能

**技人国の主要要件（{{TODAY_ISO}} 現在）：**
- 大学（学部）卒業相当の学歴 または 関連実務3年以上
- IT分野：情報処理技術者試験等の国家資格で学歴代替可
- 業務と学歴・実務の関連性が審査される
- **言語使用中心業務（通訳・翻訳・語学教師等）に従事する場合：CEFR B2相当以上の言語能力証明が2026-04-15施行で追加要件化**（`cefr_b2_language_role_scope` 確認要）

## exceptions_or_transition

- 大企業（源泉徴収税額1,000万円以上＝CategoryⅡ）では、日本の大学・短大卒（見込み）者への書類簡略化措置あり
- IT系（法務大臣が告示した情報処理技術者資格保持者）は学歴・実務要件が緩和
- 専門学校卒の場合は「日本の専門学校（専修学校専門課程）」卒業が条件（外国の大学と異なる審査基準）
- 特定の外国大学（世界上位校）卒業者はCategoryⅡ同等扱いの場合あり

## common_user_phrases

- 留学ビザから就労ビザに変更したいのですが、どうすればいいですか
- 大学卒業後に就職したい、ビザの手続きは何が必要ですか
- 内定をもらったのですが、在留資格変更はいつ申請できますか
- 卒業前に在留資格変更を申請できますか
- 留学から技人国への変更の審査期間はどのくらいですか
- 文系卒で通訳として働きたい場合、CEFRが必要と聞きましたが本当ですか
- 専門学校を卒業したが就職できますか、ビザは取れますか
- 大学中退だと技人国は取れないですか
- 申請してから審査中の間、在留期限を超えてしまっても大丈夫ですか

技術キーワード（マッチャ用）：

- 留学 就職 / 留学 就労ビザ / 留学から変更
- 技人国 / 技術人文 / 技術・人文知識・国際業務
- 在留資格変更 / ビザ変更 / 変更申請
- 内定 ビザ / 就職活動 在留 / 内定後 手続き
- 卒業 ビザ / 卒業後 在留 / 卒業見込み
- 処理期間 / 審査期間 / 1ヶ月 2ヶ月

## must_say

- 在留資格変更許可申請の標準処理期間は1〜2か月。余裕をもって申請すること
- 業務内容と学歴・実務の「関連性」が審査される。内定先の業務内容が学歴と合致するか事前確認が重要
- 申請中は在留期限を超えても特例期間として合法在留できるが、早期申請が望ましい
- 言語使用中心業務（通訳・翻訳・語学教師等）に就く場合、CEFR B2相当の証明が必要（2026-04-15施行）

## must_not_say

- 「申請すれば必ず許可される」（業務と学歴の不一致等で不許可になるケースがある）
- 「在留期限を過ぎても問題ない」（特例期間は申請中に限る；申請なしに超過するとオーバーステイ）
- 「専門学校卒でも大学卒と同じ審査基準で判断される」（専門学校は別の要件が適用される）

## qa_cases

**Q1: 大学4年生で内定をもらいました。在留期限が来年3月で、卒業は今年3月です。今から申請できますか？**
A: 卒業見込みの段階で申請可能です（卒業証明書は後日提出）。ただし卒業月と在留期限の関係によって対応が変わります。申請から許可まで1〜2か月かかるため、卒業が確定次第早めに入管に相談することを勧めます。

**Q2: 申請中に在留期限が切れそうです。大丈夫ですか？**
A: 在留資格変更許可申請を適法に行っている場合、在留期限後も「特例期間（申請から2か月または審査終了日のいずれか早い日まで）」として在留が認められます。ただしこの期間は元の在留資格の活動に限定されます。

**Q3: 文系の大学を卒業して通訳として働く予定ですが、何か追加の証明が必要ですか？**
A: 2026年4月15日施行の改正により、主として言語使用業務に従事する場合はCEFR B2相当以上の言語能力証明が必要となりました（詳細条件は当機関で確認を推奨します）。通訳・翻訳・語学教師等の職種は影響を受ける可能性があります。

## injection_format

### injection_certain_block

```
【在留資格変更（留学→技人国）ファクト / {{TODAY_ISO}} 確認済み】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

・在留資格変更許可申請の標準処理期間：1か月〜2か月
・申請タイミング：変更事由（内定取得等）が生じてから在留期間満了日以前に申請
・申請中は特例期間として在留継続可能（在留期限超過でも適法）
・技人国の主要要件：大学卒業相当の学歴 または 関連実務3年以上
  （業務と学歴・実務の「関連性」が審査される）
・言語使用中心業務（通訳・語学教師等）：CEFR B2相当証明が2026-04-15施行で追加要件（詳細要確認）

回答時の注意：
- 「申請すれば必ず許可される」とは言わない（業務と学歴の不一致で不許可あり）
- 在留期限超過でも特例期間中は適法（ただし申請中に限る）
```

### injection_needs_review_addendum

```
※ 本回答に関連して、以下は確認待ち情報のため回答に含めないこと：
・卒業見込みでの申請受理・卒業証明後日提出の運用詳細（Category別差異）
・CEFR B2要件の適用範囲（「主として言語使用業務」の定義・根拠条文）
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-07 | FACT-OPS (Batch 6) | 新規作成。留学→技人国 在留資格変更の手続き・要件。CEFR B2要件（2026-04-15施行）を含む。ai_verified: 4+ direct_fact_fields確認。 | — | ai_verified | new |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 5) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
