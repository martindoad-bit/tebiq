---
fact_id: keiei-kanri-jimu-bessho-requirement
title: 経営・管理 — 事業所確保と自宅兼用の原則
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
reviewer: Codex Knowledge Runtime Loop20
sprint: "knowledge-runtime-loop20"
citation_label: "経営管理 事業所"
citation_summary: "経営・管理では、改正後の規模等に応じた経営活動を行うための事業所を確保する必要がある。自宅を事業所と兼ねることは原則として認められず、必要な広さは一律に判断できない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "経営・管理で事業所をどう準備すべきか確認したい"
  - "自宅兼事務所で経営管理を申請・更新できるか確認したい"
  - "シェアオフィスやバーチャルオフィスの扱いが気になる"
does_not_cover:
  - "バーチャルオフィス・シェアオフィスの個別可否判断"
  - "事業所写真・平面図・賃貸借契約書の提出戦略"
  - "経営管理の他要件（資本金・常勤職員・日本語・事業計画等）"
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    label: 出入国在留管理庁 — 在留資格「経営・管理」に係る上陸基準省令等の改正について
    accessed: "2026-05-18"
applies_to:
  - 経営・管理の新規申請・変更申請・更新申請を検討する者
direct_fact_fields:
  - 改正後の規模等に応じた経営活動を行うため、事業所を確保する必要がある
  - 自宅を事業所と兼ねることは原則として認められない
  - 事業所の広さは一律に答えることが困難で、経営活動に必要かつ十分な広さが必要
ai_inferred_fields: []
needs_review_flags:
  - id: virtual_or_shared_office
    reason: 公式ページは自宅兼用と広さについて明記するが、バーチャルオフィス・シェアオフィスの全類型を一律判断していない。
  - id: evidence_package
    reason: 写真、平面図、賃貸借契約書、使用許諾などの実務資料の出し方は個別判断。
related_links:
  - title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "経営管理改正"
    locator: "ページ内「事業所」「自宅を事業所と兼ねる」"
    relation: "official_reference"
evidence_points:
  - claim: "改正後の規模等に応じた経営活動を行うための事業所を確保する必要があり、自宅を事業所と兼ねることは原則として認められない。"
    source_title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q20 自宅を事業所と兼ねることは認められますか"
    display_label: "経営管理：自宅兼事業所は原則不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "事業所の広さは一律に答えることが困難で、改正後の規模等に応じた経営活動を行うために必要かつ十分な広さの事業所を確保する必要がある。"
    source_title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q21 事業所の広さ"
    display_label: "経営管理：事業所の広さは規模・活動に応じて判断"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

経営・管理では、経営活動を行うための事業所を確保する必要がある。出入国在留管理庁は、改正後の規模等に応じた経営活動を行うための事業所を確保する観点から、自宅を事業所と兼ねることは原則として認められないと説明している。

必要な広さは一律に答えられず、経営活動に必要かつ十分な広さかどうかを見られる。バーチャルオフィス、シェアオフィス、自宅兼用などの具体的可否は、契約内容、使用実態、独立性、業種、事業規模を確認する。

## must_say

- 経営・管理では事業所確保が重要。
- 自宅を事業所と兼ねることは原則として認められない。
- 事業所の広さや形態は、事業規模・活動内容に応じて確認する。
- バーチャルオフィスやシェアオフィスの一律可否は AI で断定しない。

## must_not_say

- 自宅兼事務所でも問題ない。
- バーチャルオフィスなら必ず可、または必ず不可。
- シェアオフィスなら問題ない。
- 契約書と写真があれば許可される。

## common_user_phrases

- 経営管理でバーチャルオフィスは使えるか
- 自宅兼事務所で申請したい
- シェアオフィスで経営管理
- 事務所の写真があればいいか
- 事業所の広さはどれくらい必要か

## injection_format

### injection_certain_block

```text
【経営・管理 事業所ファクト／{{TODAY_ISO}} 公式】
・経営・管理では、改正後の規模等に応じた経営活動を行うための事業所確保が必要。
・出入国在留管理庁は、自宅を事業所と兼ねることは原則として認められないと説明している。
・事業所の広さは一律に答えられず、経営活動に必要かつ十分な広さかを確認する。
・バーチャルオフィス、シェアオフィス、住居兼用の具体的可否は、AIで一律判断せず、契約・使用実態・業種・事業規模を確認する。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop20 | 公式 Q20/Q21 に基づき、自宅兼用原則不可・必要十分な事業所という narrow runtime card に改写。 | ai_extracted | ai_verified | loop20-rewrite |
| 2026-05-18 | Codex Loop17 | バーチャル/住居兼用の一律可否を削除し、事業所確保と使用実態の個別確認カードへ降温。 | ai_extracted | ai_extracted | loop17-rewrite |
