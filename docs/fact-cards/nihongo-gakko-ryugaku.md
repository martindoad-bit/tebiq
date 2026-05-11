---
fact_id: nihongo-gakko-ryugaku
title: 日本語学校の留学ビザ — 就学資格廃止後は「留学」在留資格
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 17)
sprint: "cycle2-new-batch17"
citation_label: "日本語学校の留学ビザ（就学廃止→留学統合・週28時間就労許可・法務省告示機関・在留期間）"
citation_summary: "日本語学校に通う外国人の在留資格が2010年以降「留学」に統合されたことを確認するカード。週28時間以内のアルバイト許可・法務省告示機関の日本語学校・在留期間の概要を含む。"
source_display_names:
  - "出入国在留管理庁"
  - "文部科学省"
applies_when:
  - "日本語学校に通うためのビザ（在留資格）を確認したい"
  - "日本語学校の留学中にアルバイトできるか確認したい"
  - "日本語学校の留学ビザの在留期間を確認したい"
  - "法務省告示機関（日本語学校）の意味を確認したい"
does_not_cover:
  - "大学・大学院・専門学校の留学ビザ（ryugakusei-baito-28jikan 参照）"
  - "日本語学校から専門学校・大学への進学（在留資格変更）"
  - "日本語学校の選び方・入学手続き（各学校の情報を参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/student.html
    label: 出入国在留管理庁 — 留学（在留資格）
    accessed: "2026-05-11"
applies_to:
  - 日本語学校に入学・在籍するために日本に在留する外国人
  - 日本語学校在籍中のアルバイト就労を検討している外国人留学生
direct_fact_fields:
  - 在留資格：2010年7月の改正入管法施行により「就学」廃止→日本語学校も「留学」に統合
  - アルバイト：資格外活動許可を取得すれば週28時間以内の就労が可能（長期休暇中は1日8時間以内）
  - 法務省告示機関：入国管理局が適正と認定した日本語学校（告示機関）に在籍することで在留資格が認定される
  - 在留期間：通常1年・6か月・3か月（日本語学校の修業年限・コース期間に応じる）
  - 風俗営業関連業種でのアルバイトは禁止
ai_inferred_fields:
  - 在留資格認定証明書（COE）申請：日本語学校が代理申請するのが通常（ai推定）
  - 留学（日本語学校）からの在留資格変更：専門学校・大学進学時に在留資格変更が必要（ai推定）
  - 法務省告示機関以外の語学学校：告示外の語学学校は「留学」在留資格の対象外（短期滞在での参加となる）（ai推定）
  - 日本語学校の留学：大学・大学院等の「留学」と同じ在留資格だが、修業機関の種類が異なる（ai推定）
needs_review_flags:
  - nihongo_gakko_coe_procedure: 日本語学校でのCOE申請の具体的な手続き（申請主体・必要書類）はISA確認要。
  - kokunaizairyu_henko_procedure: 日本語学校在籍中から専門学校・大学への進学時の在留資格変更の具体的な手続きはDOMAIN確認要。
related_links:
  - title: "出入国在留管理庁 — 留学（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/student.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 留学（在留資格）"
    locator: "ページ内で「日本語学校」「留学」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "日本語学校に通う外国人の在留資格：2010年の改正入管法で「就学」廃止・大学・専門学校等と同じ「留学」に統合。資格外活動許可で週28時間以内のアルバイト可（長期休暇中は1日8時間以内）。法務省告示機関の日本語学校への入学が前提。在留期間：1年・6か月・3か月等。風俗業禁止。"
    source_title: "出入国在留管理庁：留学（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/student.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「留学（日本語学校含む）」「就学廃止（2010年）」「資格外活動許可（週28時間）」「告示機関」の記述を確認"
    display_label: "日本語学校留学ビザ：2010年に就学廃止→留学に統合・週28h以内バイト可・告示機関に限定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "法務省告示機関（日本語学校）：告示機関に在籍することが「留学」在留資格取得の前提条件。告示外の語学学校は短期滞在での参加となる。"
    source_title: "出入国在留管理庁：留学（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/student.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「法務省告示機関（日本語学校）の要件」「告示外の語学学校は留学在留資格の対象外」の記述を確認"
    display_label: "法務省告示機関が「留学」資格の前提条件・告示外語学学校は短期滞在扱い"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "2010年7月施行の改正入管法により、日本語学校の在留資格が「就学」から「留学」に統合。就学ビザは廃止され、日本語学校も大学・専門学校と同じ「留学」在留資格に一本化された。"
    source_title: "出入国在留管理庁：留学（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/student.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「就学ビザ廃止（2010年7月施行）」「日本語学校も留学に統合」の記述を確認"
    display_label: "2010年改正：日本語学校の在留資格が就学から留学に統合・就学ビザは廃止"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。

## current_effective_fact

日本語学校に通う外国人の在留資格は「留学」。2010年の改正入管法施行により「就学」は廃止され、日本語学校も大学・専門学校と同じ「留学」に統合された。週28時間以内のアルバイトは資格外活動許可を取得すれば可能。

**日本語学校の留学ビザ概要（{{TODAY_ISO}} 現在）：**

| 項目 | 内容 |
|------|------|
| 在留資格 | **留学**（2010年以降、就学廃止→留学に統合） |
| 就労 | 資格外活動許可で**週28時間以内**（長期休暇中は1日8時間以内） |
| 禁止業種 | 風俗営業関連 |
| 在留期間 | 1年・6か月・3か月（修業年限による） |
| 入学条件 | **法務省告示機関**の日本語学校への入学が必要 |

## exceptions_or_transition

- **法務省告示機関以外**：告示機関以外の語学学校は「留学」在留資格の対象外（短期滞在での参加となる）
- **専門学校・大学進学**：日本語学校を修了して進学する場合は在留資格変更申請が必要（または継続して「留学」）
- **週28時間超のアルバイト**：資格外活動違反になり、在留資格取消の対象になる可能性あり

## common_user_phrases

- 日本語学校に行くビザはどうやって取りますか
- 日本語学校の留学中にアルバイトできますか
- 日本語学校の在留資格はどのくらいの期間ですか
- 日本語学校から専門学校に進学する場合のビザはどうなりますか

技術キーワード（マッチャ用）：

- 日本語学校 ビザ / 日本語学校 留学 / 日本語学校 在留資格
- 日本語学校 アルバイト / 就学ビザ 廃止 / 日本語学校 就労
- 告示機関 日本語学校 / 日本語学校 週28時間

## must_say

- 日本語学校は「留学」在留資格（就学は2010年に廃止）
- 資格外活動許可で週28時間以内のアルバイト可
- 法務省告示機関の日本語学校への入学が要件

## must_not_say

- 「日本語学校は就学ビザ」（2010年以降は留学ビザに統合）
- 「日本語学校では働けない」（資格外活動許可があれば週28時間以内可）

## qa_cases

**Q1: 日本語学校に通うためのビザはどれですか？**
A: 「留学」在留資格です。2010年に「就学」は廃止され、日本語学校も大学・専門学校と同じ「留学」に統合されました。入学する日本語学校が「法務省告示機関」である必要があります。

**Q2: 日本語学校に通いながらアルバイトはできますか？**
A: 資格外活動許可を取得すれば、週28時間以内のアルバイトが可能です（長期休暇中は1日8時間以内）。風俗営業関連の業種での就労は禁止されています。

## injection_format

### injection_certain_block

```
【日本語学校の留学ビザ ファクト / {{TODAY_ISO}} 確認済み】

・在留資格：「留学」（2010年に就学廃止→統合）
・アルバイト：資格外活動許可で週28時間以内
・要件：法務省告示機関の日本語学校への入学
・在留期間：1年・6か月・3か月（修業年限による）
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 17) | 新規作成。日本語学校の留学ビザ。ISA公式で就学廃止→留学統合（2010年）・週28h就労許可・告示機関要件を確認。COE申請手続き・進学時の変更手続きはai推定。 | — | ai_verified | new |
