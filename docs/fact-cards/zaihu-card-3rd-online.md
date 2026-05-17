---
fact_id: zaihu-card-3rd-online
title: 在留カード裏面 — 申請中表示は窓口申請のみ（オンライン申請は表示なし）
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "オンライン申請裏面表示"
citation_summary: "特例期間制度では在留カード裏面の「在留期間更新等許可申請欄」に申請中の旨が記載されるが、オンライン申請の場合は記載されない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "オンライン申請 在留カード"
  - "申請中 表示"
does_not_cover:
  - "特例期間制度（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    label: ISA — 特例期間
    accessed: "2026-05-17"
applies_to:
  - 在留更新/変更申請者
direct_fact_fields:
  - 窓口申請：在留カード裏面に申請中表示
  - オンライン申請：裏面表示なし
  - 雇用主の確認：失効情報照会ページで可
ai_inferred_fields:
  - オンライン申請者は別途証明資料保持推奨
needs_review_flags:
  - replacement_proof_for_online_filer
  - employer_check_procedure_specifics
  - kourounz-cho_check_procedure
related_links:
  - title: "ISA — 特例期間"
    url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    organization: "出入国在留管理庁"
    display_label: "特例期間"
    locator: "オンライン"
    relation: "official_reference"
evidence_points:
  - claim: "特例期間中の在留カード裏面の「在留期間更新等許可申請欄」は窓口申請のみ記載され、オンライン申請は記載されない。"
    source_title: "ISA — 特例期間"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "オンライン"
    display_label: "オンライン裏面表示なし"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

オンライン申請は在留カード裏面記載なし。

## must_say

- 窓口は裏面記載
- オンラインは記載なし
- 失効情報照会で確認可

## injection_format

### injection_certain_block

```text
- 特例期間中、窓口申請では在留カード裏面の「在留期間更新等許可申請欄」に申請中の旨が記載されるが、オンライン申請の場合は裏面記載されない。
- 裏面記載の有無だけで申請中かどうかを判断せず、オンライン申請時の案内や受付情報も確認する。
- 出典: ISA — 特例期間 https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
