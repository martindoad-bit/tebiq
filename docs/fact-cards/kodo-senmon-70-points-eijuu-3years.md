---
fact_id: kodo-senmon-70-points-eijuu-3years
title: 高度専門職70点 — 永住申請3年短縮ルート / 80点1年ルート
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高度専門職永住短縮ルート"
citation_summary: "高度専門職ポイント70点以上は在留3年で永住申請可、80点以上は1年で永住申請可。永住申請時の所得証明は直近3年分（通常の5年分と異なる）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问高度人才多久能申永住"
  - "用户问70点和80点的区别"
  - "用户问HSP的永住申请要几年所得证明"
does_not_cover:
  - "ポイント計算の詳細項目（別カード参照）"
  - "高度専門職1号→2号の変更（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html
    label: ISA — 高度人材永住申請
    accessed: "2026-05-17"
applies_to:
  - 高度専門職保持者または70点以上のポイント保持者
direct_fact_fields:
  - 70点ルール：申請3年前から70点以上継続で永住申請可
  - 80点ルール：申請1年前から80点以上継続で永住申請可
  - 所得証明：直近3年分（通常永住申請の5年分とは異なる）
  - 年金・健保：直近2年分の納付証明
  - ポイント計算表の提出必須
  - 提出書類セルフチェックシート推奨
direct_fact_fields_extra:
  - 高度専門職本人だけでなく高度人材活動相当の在留資格保持者も対象
ai_inferred_fields:
  - 過去のポイント保持証明（過去3年/1年継続）が実務上の壁
needs_review_flags:
  - past_point_evidence_method
  - hsp_dependent_eijuu_route
  - point_recalc_at_application
related_links:
  - title: "ISA — 高度人材永住申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 高度人材永住申請"
    locator: "ページ内「70点」「80点」"
    relation: "official_reference"
evidence_points:
  - claim: "高度専門職ポイント70点以上は3年、80点以上は1年で永住申請可能。所得証明は直近3年分、年金・健保は直近2年分。ポイント計算表とその疎明資料が必須。"
    source_title: "ISA — 高度人材永住申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「70点」「3年」「80点」「1年」"
    display_label: "70点3年・80点1年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

高度人材は70点なら3年、80点なら1年で永住申請可能。所得証明3年分は通常永住の5年分と異なる重要点。

## common_user_phrases

- 高度人材 永住 何年
- 80点 1年 永住
- 70点 3年 永住
- HSP 永住 所得証明

## must_say

- 70点→3年、80点→1年
- 過去継続的にそのポイント保持の証明必要
- 所得証明3年分（通常永住と異なる）

## must_not_say

- 「ポイントが取れれば即永住」（過去の継続保持が必要）

## qa_cases

**Q: 高度専門職で80点持っています。永住はいつ申請できますか？**
A: 申請1年前から継続して80点以上のポイントを保有していることを証明できれば、在留1年で永住申請可能です。所得証明は直近3年分、年金・健保は直近2年分を準備してください。

## injection_format

### injection_certain_block

```
【高度人材永住短縮／ {{TODAY_ISO}} 公式】
・70点：3年継続保持で永住申請可
・80点：1年継続保持で永住申請可
・所得証明：3年分（通常5年分と差異）
・年金健保：2年分
・ポイント計算表＋疎明資料必須
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
