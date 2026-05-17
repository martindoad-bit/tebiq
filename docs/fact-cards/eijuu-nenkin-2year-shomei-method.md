---
fact_id: eijuu-nenkin-2year-shomei-method
title: 永住申請 — 年金納付証明（ねんきん定期便/被保険者記録）
state: ai_verified   # LOOP2 2026-05-17: FACT direct source + DOMAIN material-safe; promoted for narrow PR material routing
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住年金2年分証明方法"
citation_summary: "永住申請の年金2年分納付証明は、年金事務所発行の被保険者記録照会回答票またはねんきん定期便の全期間表示画面の写しで提出可。"
source_display_names:
  - "日本年金機構/ISA"
applies_when:
  - "永住 年金 何で証明"
  - "ねんきん定期便"
does_not_cover:
  - "未納分の追納方法（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 直近2年分の納付証明
  - 方法①：年金事務所発行の被保険者記録照会回答票
  - 方法②：ねんきん定期便（全期間表示画面の写し）
  - 方法③：ねんきんネットの画面コピー
  - 厚生年金加入者は給与明細の保険料控除も補強
ai_inferred_fields:
  - ねんきんネットの画面コピーは新しい方が良い
needs_review_flags:
  - nenkin_net_screenshot_official_acceptance
  - kousai_nenkin_kanyu_jisha_specific
  - taishoku_kokumin_kirikae_seriously
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "年金2年"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請の年金2年分納付証明は、年金事務所発行の被保険者記録照会回答票またはねんきん定期便の全期間表示画面の写しで提出可。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "年金2年"
    display_label: "永住年金証明方法"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住年金：被保険者記録照会 or ねんきん定期便で証明。

## must_say

- 2年分必須
- 被保険者記録照会 or 定期便
- ねんきんネット画面も可

## injection_format

### injection_certain_block

```text
- 永住許可申請では、公的年金の納付状況を確認する資料として、直近2年分の年金記録が重要になる。
- 代表的な提出資料は、年金事務所発行の「被保険者記録照会回答票」、または「ねんきん定期便」の全期間表示画面の写し。
- ねんきんネットの画面印刷を使う場合もあるが、未納・免除・猶予の表示を自分で都合よく省略しない。
- 出典: 出入国在留管理庁「永住許可申請」 https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 直近2年分の年金証明資料として狭くruntime昇格。 | ai_extracted | ai_verified | promote |
